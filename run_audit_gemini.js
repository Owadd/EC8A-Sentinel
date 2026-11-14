const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GEMINI_API_KEY || '';
if (!API_KEY) { throw new Error('Set GEMINI_API_KEY in your environment before running.'); }
const DATA_DIR = path.join(__dirname, 'dataset');
const MANIFEST_PATH = path.join(DATA_DIR, 'manifest.json');
const RESULTS_PATH = path.join(DATA_DIR, 'gemini_flash_audit_results.json');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// Load existing progress if any
let auditResults = [];
if (fs.existsSync(RESULTS_PATH)) {
  try {
    auditResults = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'));
    console.log(`Loaded ${auditResults.length} previously audited sheets.`);
  } catch (e) {
    auditResults = [];
  }
}

const auditedIds = new Set(auditResults.map(r => r.sheetId));

const SYSTEM_PROMPT = `You are a forensic document auditor reading an authentic Nigerian Form EC8A (Polling Unit Election Result Sheet) from Osun State.
Carefully inspect the handwritten numbers in the table for each political party:
A, AA, AAC, ADC, ADP, APC, APGA, APM, APP, BP, NNPP, PRP, SDP, YPP, ZLP.

Rules:
1. For each party, extract the integer number of votes written in figures.
2. If a party box is blank, scored through with a dash/line, has "NIL", or 0, return 0.
3. If a number is genuinely illegible due to tearing, heavy blurring, or ink blot, return null. DO NOT guess or hallucinate.
4. Also extract:
   - accredited_voters: number of accredited voters written on the sheet (or null if unreadable)
   - valid_votes: total valid votes recorded (or null)
   - rejected_votes: total rejected ballots recorded (or null)
   - total_cast: total votes cast recorded (or null)
5. Under notes, describe the visual quality (e.g. sharp, fold lines, shadow, low light, handwriting legibility).

Return ONLY valid JSON matching this schema:
{
  "votes": {
    "A": 0,
    "AA": 0,
    "AAC": 0,
    "ADC": 0,
    "ADP": 0,
    "APC": 0,
    "APGA": 0,
    "APM": 0,
    "APP": 0,
    "BP": 0,
    "NNPP": 0,
    "PRP": 0,
    "SDP": 0,
    "YPP": 0,
    "ZLP": 0
  },
  "accredited": 0,
  "valid": 0,
  "rejected": 0,
  "total_cast": 0,
  "visual_condition": "description"
}`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function auditSheet(item, attempt = 1) {
  const filePath = path.join(DATA_DIR, item.filename);
  const fileBytes = fs.readFileSync(filePath);
  const base64Data = fileBytes.toString('base64');

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: SYSTEM_PROMPT },
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: 'application/json'
    }
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.status === 429) {
      const waitTime = Math.min(60000, 15000 * Math.pow(2, attempt));
      console.warn(`[Rate Limit 429] Pacing triggered on sheet ${item.id} (${item.filename}). Waiting ${waitTime / 1000}s before retry ${attempt}...`);
      await sleep(waitTime);
      return auditSheet(item, attempt + 1);
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText.substring(0, 300)}`);
    }

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error('No text returned in candidate part');

    const parsed = JSON.parse(rawText);

    // Calculate accuracy against human ground truth
    const gt = item.groundTruthVotes || {};
    let correctParties = 0;
    let totalEvaluated = 0;
    let hallucinations = 0;
    let refusals = 0;
    let partyDiscrepancies = {};

    const parties = ['A', 'AA', 'AAC', 'ADC', 'ADP', 'APC', 'APGA', 'APM', 'APP', 'BP', 'NNPP', 'PRP', 'SDP', 'YPP', 'ZLP'];
    for (const p of parties) {
      const gtVal = gt[p] !== undefined ? gt[p] : 0;
      const aiVal = parsed.votes?.[p];
      totalEvaluated++;

      if (aiVal === null) {
        refusals++;
      } else if (aiVal === gtVal) {
        correctParties++;
      } else {
        hallucinations++;
        partyDiscrepancies[p] = { ai: aiVal, gt: gtVal, diff: aiVal - gtVal };
      }
    }

    const accuracy = ((correctParties / totalEvaluated) * 100).toFixed(1);

    const record = {
      sheetId: item.id,
      filename: item.filename,
      lga: item.lga,
      ward: item.ward,
      puCode: item.puCode,
      puName: item.puName,
      extracted: parsed,
      groundTruth: gt,
      metrics: {
        totalParties: totalEvaluated,
        correctParties,
        accuracyPercent: parseFloat(accuracy),
        hallucinations,
        refusals,
        discrepancies: partyDiscrepancies
      },
      timestamp: new Date().toISOString()
    };

    console.log(`[SUCCESS] Sheet ${item.id}/20 (${item.puName}, ${item.lga}) -> Accuracy: ${accuracy}%, Hallucinations: ${hallucinations}, Refusals: ${refusals}`);
    return record;
  } catch (err) {
    console.error(`[ERROR] Sheet ${item.id} (${item.filename}):`, err.message);
    if (attempt <= 3) {
      console.log(`Retrying sheet ${item.id} (attempt ${attempt + 1})...`);
      await sleep(10000);
      return auditSheet(item, attempt + 1);
    }
    return null;
  }
}

async function runFullAudit() {
  console.log(`=======================================================`);
  console.log(`Starting Gemini 3.5 Flash Forensic Audit on 20 Real EC8As`);
  console.log(`Pacing: 14s between calls (~4.2 RPM) to stay within free tier`);
  console.log(`=======================================================\n`);

  for (let i = 0; i < manifest.length; i++) {
    const item = manifest[i];
    if (auditedIds.has(item.id)) {
      console.log(`Sheet ${item.id} already audited, skipping.`);
      continue;
    }

    const record = await auditSheet(item);
    if (record) {
      auditResults.push(record);
      fs.writeFileSync(RESULTS_PATH, JSON.stringify(auditResults, null, 2));
    }

    // Pacing delay (14 seconds to strictly stay below 5 RPM)
    if (i < manifest.length - 1) {
      await sleep(14000);
    }
  }

  console.log(`\n=======================================================`);
  console.log(`Audit Complete! Total audited sheets: ${auditResults.length}/20`);
  console.log(`Results saved to: ${RESULTS_PATH}`);
  console.log(`=======================================================`);
}

runFullAudit();
