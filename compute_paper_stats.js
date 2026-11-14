const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'results', 'qwen_ec8a_final_results.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const parties = ['A', 'AA', 'AAC', 'ADC', 'ADP', 'APC', 'APGA', 'APM', 'APP', 'BP', 'NNPP', 'PRP', 'SDP', 'YPP', 'ZLP'];

let totalSheets = data.length;
let totalFields = totalSheets * parties.length;
let totalCorrect = 0;
let totalHallucinations = 0;
let totalRefusals = 0;
let perfectSheets = 0;
let sheets1Error = 0;
let sheets2Errors = 0;
let sheets3PlusErrors = 0;

let sec51Violations = 0;
let sec64BalancedCount = 0;
let sec64UnbalancedCount = 0;

// Clerical slip analysis among sec51Violations:
// How many sec51Violations actually have (valid + rejected <= accredited) AND (sum of party votes == valid)?
let sec51ClericalSlips = 0;
let sec51TrueOvervoting = 0;
let sec51MissingAccredited = 0;

const partyStats = {};
for (const p of parties) {
  partyStats[p] = {
    correct: 0,
    errors: 0,
    gtSum: 0,
    aiSum: 0,
    absErrorSum: 0,
    nonZeroCount: 0,
    nonZeroCorrect: 0,
    zeroCount: 0,
    zeroCorrect: 0
  };
}

const lgaStats = {};
const errorRecords = [];

for (const row of data) {
  totalCorrect += row.correctParties;
  totalHallucinations += row.hallucinations;
  totalRefusals += row.refusals;

  const errs = 15 - row.correctParties;
  if (errs === 0) perfectSheets++;
  else if (errs === 1) sheets1Error++;
  else if (errs === 2) sheets2Errors++;
  else sheets3PlusErrors++;

  const acc = Number(row.aiExtracted?.accredited || 0);
  const val = Number(row.aiExtracted?.valid || 0);
  const rej = Number(row.aiExtracted?.rejected || 0);
  const cast = Number(row.aiExtracted?.total_cast || 0);
  const partySum = parties.reduce((s, p) => s + Number(row.aiExtracted?.votes?.[p] || 0), 0);
  const gtPartySum = parties.reduce((s, p) => s + Number(row.groundTruth?.[p] || 0), 0);

  if (row.sec51Violation) {
    sec51Violations++;
    if (acc === 0) {
      sec51MissingAccredited++;
    } else if ((val + rej <= acc || gtPartySum + rej <= acc) && partySum === val) {
      sec51ClericalSlips++;
    } else {
      sec51TrueOvervoting++;
    }
  }

  if (row.sec64Balanced) sec64BalancedCount++;
  else sec64UnbalancedCount++;

  const lga = row.lga || 'UNKNOWN';
  if (!lgaStats[lga]) {
    lgaStats[lga] = { sheets: 0, correctFields: 0, totalFields: 0, perfectSheets: 0, sec51: 0, sec64Balanced: 0 };
  }
  lgaStats[lga].sheets++;
  lgaStats[lga].correctFields += row.correctParties;
  lgaStats[lga].totalFields += 15;
  if (errs === 0) lgaStats[lga].perfectSheets++;
  if (row.sec51Violation) lgaStats[lga].sec51++;
  if (row.sec64Balanced) lgaStats[lga].sec64Balanced++;

  for (const p of parties) {
    const gt = Number(row.groundTruth?.[p] ?? 0);
    const ai = Number(row.aiExtracted?.votes?.[p] ?? 0);
    partyStats[p].gtSum += gt;
    partyStats[p].aiSum += ai;
    partyStats[p].absErrorSum += Math.abs(ai - gt);
    if (gt === 0) {
      partyStats[p].zeroCount++;
      if (ai === 0) partyStats[p].zeroCorrect++;
    } else {
      partyStats[p].nonZeroCount++;
      if (ai === gt) partyStats[p].nonZeroCorrect++;
    }
    if (ai === gt) {
      partyStats[p].correct++;
    } else {
      partyStats[p].errors++;
      errorRecords.push({
        sheetId: row.sheetId,
        puCode: row.puCode,
        puName: row.puName,
        lga: row.lga,
        party: p,
        gt,
        ai,
        diff: ai - gt,
        absDiff: Math.abs(ai - gt),
        sec64Balanced: row.sec64Balanced
      });
    }
  }
}

const summary = {
  totalSheets,
  totalFields,
  totalCorrect,
  exactMatchPct: ((totalCorrect / totalFields) * 100).toFixed(2),
  totalHallucinations,
  hallucinationPct: ((totalHallucinations / totalFields) * 100).toFixed(2),
  totalRefusals,
  refusalPct: ((totalRefusals / totalFields) * 100).toFixed(2),
  perfectSheets,
  perfectSheetsPct: ((perfectSheets / totalSheets) * 100).toFixed(2),
  sheets1Error,
  sheets2Errors,
  sheets3PlusErrors,
  sec51Violations,
  sec51ViolationsPct: ((sec51Violations / totalSheets) * 100).toFixed(2),
  sec51ClericalSlips,
  sec51TrueOvervoting,
  sec51MissingAccredited,
  sec64BalancedCount,
  sec64BalancedPct: ((sec64BalancedCount / totalSheets) * 100).toFixed(2),
  sec64UnbalancedCount,
  sec64UnbalancedPct: ((sec64UnbalancedCount / totalSheets) * 100).toFixed(2),
  partyStats,
  lgaStats,
  errorRecords
};

fs.writeFileSync(path.join(__dirname, 'results', 'paper_summary_stats.json'), JSON.stringify(summary, null, 2));
console.log('Stats written successfully.');
