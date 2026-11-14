const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const projDir = __dirname;
const wsDir = path.join(projDir, 'workspace');
const outDir = path.join(projDir, 'output');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(wsDir, 'final'), { recursive: true });

// Complete HTML Academic Manuscript (1:1 Rendering of workspace/final/paper.tex with Vector SVG Figures, Booktabs Tables, and Mathematical Equations, Zero Em Dashes)
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Auditing African Election Integrity at the Edge: EC8A-Sentinel & Osun-EC8A-250</title>
<style>
  @page {
    size: letter portrait;
    margin: 0.65in 0.65in 0.7in 0.65in;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    font-family: "Times New Roman", Times, Georgia, serif;
    font-size: 9.6pt;
    line-height: 1.36;
    color: #111827;
    background: #ffffff;
    margin: 0;
    padding: 0;
    text-align: justify;
    hyphens: auto;
  }
  .page-container {
    max-width: 7.2in;
    margin: 0 auto;
    padding: 0.1in 0;
  }
  @media screen {
    body {
      background: #f1f5f9;
      padding: 28px 16px;
    }
    .page-container {
      max-width: 8.5in;
      background: #ffffff;
      padding: 0.65in;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
      border-radius: 6px;
    }
    .print-toolbar {
      max-width: 8.5in;
      margin: 0 auto 16px auto;
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 20px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
    }
    .print-toolbar button {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 7px 14px;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  @media print {
    .print-toolbar { display: none !important; }
  }
  .top-rule {
    border-top: 3px solid #0f172a;
    border-bottom: 1px solid #0f172a;
    height: 4px;
    margin-bottom: 12px;
  }
  .paper-title {
    font-size: 15.5pt;
    font-weight: bold;
    text-align: center;
    line-height: 1.22;
    margin: 8px 0 10px 0;
    color: #0f172a;
  }
  .bottom-rule {
    border-top: 1px solid #0f172a;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  .authors-block {
    text-align: center;
    font-size: 10pt;
    margin-bottom: 14px;
  }
  .authors-block .author-name {
    font-weight: bold;
    font-size: 10.5pt;
  }
  .abstract-box {
    margin: 0 0.35in 16px 0.35in;
    padding: 10px 14px;
    background: #f8fafc;
    border-left: 3px solid #1e3a8a;
    font-size: 9pt;
    line-height: 1.34;
  }
  .abstract-title {
    font-weight: bold;
    text-align: center;
    font-size: 9.8pt;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #0f172a;
  }
  .two-col {
    column-count: 2;
    column-gap: 0.24in;
    column-fill: balance;
  }
  h2 {
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: #0f172a;
    margin: 12px 0 5px 0;
    padding-bottom: 2px;
    border-bottom: 0.75px solid #cbd5e1;
    break-after: avoid;
  }
  h3 {
    font-size: 9.9pt;
    font-weight: bold;
    color: #1e293b;
    margin: 9px 0 4px 0;
    break-after: avoid;
  }
  p {
    margin: 0 0 6.5px 0;
    text-indent: 1em;
  }
  p.no-indent, h2 + p, h3 + p {
    text-indent: 0;
  }
  ul, ol {
    margin: 4px 0 8px 0;
    padding-left: 18px;
  }
  li {
    margin-bottom: 3.5px;
  }
  code, .tt {
    font-family: "Courier New", Courier, monospace;
    font-size: 8.7pt;
    background: #f1f5f9;
    padding: 0 2px;
    border-radius: 2px;
  }
  .math {
    font-family: "Cambria Math", "Times New Roman", serif;
    font-style: italic;
  }
  .math-rm {
    font-style: normal;
  }
  .equation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 7px 0;
    padding: 4px 6px;
    background: #fcfcfd;
    border: 0.5px solid #e2e8f0;
    border-radius: 3px;
    font-family: "Cambria Math", "Times New Roman", serif;
    font-size: 9.3pt;
    break-inside: avoid;
  }
  .equation-body {
    flex: 1;
    text-align: center;
  }
  .equation-num {
    font-style: normal;
    color: #475569;
    font-size: 8.8pt;
    margin-left: 6px;
  }
  .full-width-block {
    column-span: all;
    margin: 11px 0;
    break-inside: avoid;
  }
  .figure-box {
    border: 0.75px solid #cbd5e1;
    border-radius: 4px;
    padding: 8px 10px;
    background: #ffffff;
  }
  .caption {
    font-size: 8.5pt;
    line-height: 1.3;
    color: #1e293b;
    margin-top: 5px;
    text-align: justify;
  }
  .caption strong {
    color: #0f172a;
  }
  table.booktabs {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.1pt;
    line-height: 1.24;
    margin-top: 4px;
    font-variant-numeric: tabular-nums;
  }
  table.booktabs thead tr {
    border-top: 1.5px solid #0f172a;
    border-bottom: 1px solid #0f172a;
    background: #f8fafc;
  }
  table.booktabs th {
    font-weight: bold;
    padding: 4px 5px;
    color: #0f172a;
  }
  table.booktabs td {
    padding: 3px 5px;
  }
  table.booktabs tr.midrule {
    border-top: 0.85px solid #334155;
    background: #f1f5f9;
    font-weight: bold;
  }
  table.booktabs tbody {
    border-bottom: 1.5px solid #0f172a;
  }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  .cite {
    color: #1d4ed8;
    text-decoration: none;
    font-weight: 500;
  }
  .ref-list {
    font-size: 8.2pt;
    line-height: 1.28;
    padding-left: 18px;
    margin: 4px 0;
  }
  .ref-list li {
    margin-bottom: 3.5px;
    text-align: left;
  }
</style>
</head>
<body>
<div class="print-toolbar">
  <div><strong>EC8A-Sentinel &amp; Osun-EC8A-250</strong> | Author: Owadokun Oluwatobi Ezekiel</div>
  <button onclick="window.print()">Print / Save PDF</button>
</div>
<div class="page-container">
  <div class="top-rule"></div>
  <div class="paper-title">
    Auditing African Election Integrity at the Edge: A 250-Polling-Unit Forensic Vision AI Benchmark and Statutory Reconciliation Engine on Nigerian Form EC8A Result Sheets
  </div>
  <div class="bottom-rule"></div>
  <div class="authors-block">
    <div class="author-name">Owadokun Oluwatobi Ezekiel</div>
  </div>

  <div class="abstract-box">
    <div class="abstract-title">Abstract</div>
    Once Form EC8A photos go onto the INEC Result Viewing Portal (IReV), there are often allegations of corruption and claims of INEC being partial. Citizens need to independently audit the IReV portal as soon as the results go up. With AI techniques available today, we can automate gathering and processing data from IReV so independent observers can become their own collation center and improve transparency. We built <strong>EC8A-Sentinel</strong> using 4-bit <code>Qwen2.5-VL-7B-Instruct</code> on a free Google Colab T4 GPU and tested it on <strong>Osun-EC8A-250</strong>, 250 election sheets across three local governments in Osun State (3,750 party cells and 1,000 header fields). Otherwise, how do you read thousands of records and do the manual addition yourself? When more people can verify the sheets directly, post-election conversations can move from tribunals and lawsuits to accepting the people's choice. On the 3,750 cells, we reached <strong>98.77%</strong> cell accuracy (3,704 cells right), with 222 of 250 sheets completely error-free (<strong>88.80%</strong>), <strong>0.00%</strong> refusals, and 46 misread cells (<strong>1.23%</strong>). Normally, if an AI reads a cell wrong, say putting 10 where there should be 100, there is no automatic check to validate it. Section 64(4) of Nigeria's Electoral Act 2022 makes sure the party scores match the valid total at the bottom, and that helped us catch <strong>95.65%</strong> of AI mistakes (44 out of 46) without anyone checking answer keys. Only two errors passed it, and both happened on one sheet where someone overwrote the printed <code>ADP</code> and <code>APC</code> party names backwards in biro. For Section 51(2) of the Electoral Act 2022, there is a rule that there cannot be more votes cast than accredited BVAS voters. Still, how do we check that rule without punishing voters when an officer simply made a mistake? Looking past header errors with our two-tier solver, we found that 38 of the 58 flagged polling units (<strong>65.52%</strong>) were just clerical slip-ups where counted ballots stayed inside BVAS accreditation and should still count.
  </div>

  <div class="two-col">
    <h2>1. Introduction</h2>
    <p class="no-indent">
      Paper polling-unit result sheets remain the legal backbone of elections across Sub-Saharan Africa <a class="cite" href="#ref17">[17,</a> <a class="cite" href="#ref13">13,</a> <a class="cite" href="#ref14">14]</a>. In Nigeria, once ballots are sorted and counted at a polling unit, the Presiding Officer uses a ballpoint pen (biro) to write biometric accreditation figures, ballot totals, and scores for each political party on the ballot onto INEC Form EC8A, then photographs the sheet directly with the BVAS device camera for upload to the INEC Result Viewing Portal (IReV) <a class="cite" href="#ref17">[17,</a> <a class="cite" href="#ref14">14,</a> <a class="cite" href="#ref15">15]</a>. Yet once photos go onto IReV, allegations of corruption and partiality quickly follow, and citizens need a way to independently audit the portal as soon as results go up. Auditing thousands of sheets requires solving two linked tasks at once: reading exact handwritten numbers off tilted field photos (<code>Exact Match (%)</code> and <code>Flawless Sheets (%)</code>) and checking those numbers against Sections 51(2) and 64(4) of Nigeria's Electoral Act 2022 <a class="cite" href="#ref17">[17,</a> <a class="cite" href="#ref16">16]</a>.
    </p>
    <p>
      Traditional OCR tools <a class="cite" href="#ref20">[20,</a> <a class="cite" href="#ref9">9,</a> <a class="cite" href="#ref6">6]</a> fail on Form EC8A because they expect straight lines and flat paper, whereas real polling-unit photos rarely look like clean office scans. There is going to be camera tilt, paper folds, and evening shadows <a class="cite" href="#ref14">[14,</a> <a class="cite" href="#ref19">19]</a>, because the polling official snapping the sheet with the BVAS camera does not think about holding the device at an angle an AI prefers. As a result, accuracy drops from 99.00% on clean lab numbers down to 66.55% on real election tally sheets <a class="cite" href="#ref8">[8]</a>, and crashes between 37.98% and 61.28% under 3D camera tilt <a class="cite" href="#ref2">[2]</a>. A 37.98% accuracy rate is unusable on Election Day <a class="cite" href="#ref2">[2]</a>. Even when engineers crop vote tables carefully on African election sheets, table grid lines can still fuse with handwritten strokes and look like extra digits, turning normal counts into huge fake numbers such as <code>677000001 002</code> <a class="cite" href="#ref13">[13]</a>. Modern Vision-Language Models (VLMs) <a class="cite" href="#ref3">[3,</a> <a class="cite" href="#ref7">7,</a> <a class="cite" href="#ref11">11,</a> <a class="cite" href="#ref10">10]</a> skip brittle box croppers, yet because they are generative models, faint ballpoint ink makes them try to compensate from memory and hallucinate numbers instead of leaving cells blank (63.28% to 90.80% of handwritten table errors <a class="cite" href="#ref1">[1,</a> <a class="cite" href="#ref18">18]</a>). Worse still, checking Section 51(2) of the Electoral Act 2022 (<span class="math">V<sub>cast</sub> &gt; A<sub>BVAS</sub></span>) <a class="cite" href="#ref17">[17]</a> with a naive script flags whole polling units for cancellation when a tired officer simply wrote down the wrong number in the "Total Ballot Papers Used" box.
    </p>
    <p>
      To solve both the visual reading traps and the clerical over-voting trap, we built <strong>EC8A-Sentinel</strong>, an open-weight audit pipeline that pairs 4-bit vision extraction with a <strong>Two-Tier Statutory Mathematical Reconciliation Engine</strong>. Instead of chopping forms into fragile crops or shrinking photos until ink blurs, we pass full 3 to 4 MB IReV images directly into <code>Qwen2.5-VL-7B-Instruct</code> <a class="cite" href="#ref3">[3]</a>. Using dynamic-resolution Vision Transformer patching (<code>NaViT</code>) <a class="cite" href="#ref5">[5]</a> quantized to 4-bit NormalFloat (<code>NF4</code>) <a class="cite" href="#ref4">[4]</a>, the entire model fits on a single free Google Colab NVIDIA T4 GPU (16 GB VRAM). When an AI reads a vote box wrong, say putting 10 instead of 100 or dropping a 1 in a mostly zero column, there is normally no built-in check to catch it. Adding the Electoral Act Section 64(4) Collation Sum rule (<span class="math">&Sigma;<sub>p=1..K</sub> v&#770;<sub>p</sub> = V&#770;<sub>valid</sub></span> across the <span class="math">K</span> parties on the ballot) <a class="cite" href="#ref17">[17]</a> makes sure party votes add up to the valid total at the bottom and catches those mistakes automatically without answer keys. Alongside it, checking whether physical ballots counted out of the box (<span class="math">V&#770;<sub>valid</sub> + V&#770;<sub>rejected</sub> &le; A&#770;<sub>BVAS</sub></span>) stay within BVAS biometric accreditation separates honest clerical slips from true over-voting.
    </p>
    <p>
      Just as important is keeping API costs at zero. Earlier election OCR projects <a class="cite" href="#ref13">[13,</a> <a class="cite" href="#ref15">15,</a> <a class="cite" href="#ref16">16]</a> and large clinical register digitization efforts <a class="cite" href="#ref12">[12]</a> relied on paid cloud APIs, custom bounding-box labels, or large review teams. When an audit system depends on paid Google or commercial API keys, it locks everyday citizens out and creates a barrier to entry. Nigeria has 176,846 registered polling units nationwide that must be processed one by one, and if you run two different models side by side to cross-check outputs on Election Day, paid API bills double right away into millions. Running an open-weight 7B model on a free Colab GPU lets any developer, journalist, or civic group pick it up, run their own checks, or build new tools on top without spending a fortune.
    </p>
    <p>
      We tested EC8A-Sentinel on <strong>Osun-EC8A-250</strong>, a benchmark of 250 authentic Form EC8A polling unit photos (3,750 handwritten party vote cells and 1,000 administrative fields) across three Local Government Areas (<code>ATAKUMOSA EAST</code>, <code>ATAKUMOSA WEST</code>, and <code>AYEDAADE</code>) from the Osun State Governorship Election. Across 3,750 cells covering 60,625 human-verified votes, EC8A-Sentinel hit <strong>98.77%</strong> <code>Exact Match (%)</code> (3,704 / 3,750 cells), <strong>88.80%</strong> <code>Flawless Sheets (%)</code> (222 / 250 sheets), <strong>1.23%</strong> <code>Hallucination (%)</code> (46 errors), and <strong>0.00%</strong> <code>Refusal (%)</code>. Our Section 64(4) Collation Sum Gate caught <strong>95.65%</strong> (44 / 46) of all VLM reading errors on its own. Inspecting the only two errors that slipped past the math gate (on Polling Unit <code>29/01/07/001</code>) showed that someone had altered the paper sheet itself by overwriting the printed <code>ADP</code> and <code>APC</code> party labels backwards in biro, shifting 60 votes between them while leaving the column sum unchanged. Meanwhile, our Two-Tier Section 51(2) Solver proved that <strong>65.52%</strong> (38 / 58) of polling units flagged for literal over-voting were honest Presiding Officer clerical slips whose counted ballots obeyed biometric accreditation.
    </p>
    <p class="no-indent">Our main contributions in this paper are three-fold:</p>
    <ul>
      <li><strong>The Osun-EC8A-250 Forensic Benchmark:</strong> We curate and release a 250-polling-unit benchmark of authentic INEC IReV Form EC8A camera photos with human ground truth across 3,750 party vote cells and 1,000 administrative fields.</li>
      <li><strong>Zero-Cost 4-Bit Vision Extraction and Biro Tampering Discovery:</strong> We show that 4-bit <code>Qwen2.5-VL-7B-Instruct</code> (<code>NF4</code>) on a free T4 GPU reaches 98.77% field-level <code>Exact Match (%)</code> and 99.92% zero-cell specificity on uncropped 3 to 4 MB photos, beating recent handwritten table benchmarks (<code>WildHandBench</code> at 53.63% to 60.44%) by over 38 percentage points while exposing how VLM row-position priors react when printed party names are rewritten in biro ink.</li>
      <li><strong>Two-Tier Statutory Reconciliation Engine:</strong> We formulate a legal math solver grounded in Sections 51(2) and 64(4) of Nigeria's Electoral Act 2022 that traps 95.65% of AI reading errors without human labels and saves 65.52% of raw over-voting flags from wrongful cancellation.</li>
    </ul>

    <h2>2. Related Work</h2>
    <h3>2.1 Handwritten Form and Table Recognition with VLMs</h3>
    <p class="no-indent">
      Reading isolated digits in a clean box is a solved problem, but reading handwritten numbers inside a noisy multi-row table is not. Classic convolutional nets on centered MNIST digits score 98.70% to 99.87% <a class="cite" href="#ref20">[20]</a>, while transformer OCR models like TrOCR <a class="cite" href="#ref9">[9]</a> and top VLMs reach 1.75% to 2.89% Character Error Rate (CER) on cropped lines of the IAM Handwriting Database <a class="cite" href="#ref18">[18]</a>. Put those same models on real government forms and accuracy falls apart. Gondere et al. <a class="cite" href="#ref8">[8]</a> cropped 64,596 handwritten digits written by over 1,000 polling station workers on election tally sheets and watched an MNIST-trained classifier drop from 99.00% lab accuracy to 66.55% in the field (89.32% after retraining with a Variational Autoencoder and BiLSTM). Thick biro strokes, off-center writing, and numbers touching box borders caused most of the damage. Multi-domain VLM OCR benchmarks <a class="cite" href="#ref11">[11,</a> <a class="cite" href="#ref7">7,</a> <a class="cite" href="#ref10">10]</a> and Koncile's 17-model test on 49 handwritten medical forms <a class="cite" href="#ref18">[18]</a> tell the same story, with the best VLMs capping out at 85.00% field accuracy and making up wrong numbers in 6.00% of fields. More recently, Zhang et al. <a class="cite" href="#ref1">[1]</a> tested 500 degraded handwritten pages in WildHandBench and found that tables are the hardest layout of all: Gemini 3.1 Pro hit 60.44% Table Tree Edit Distance Similarity (TEDS), Gemini 3.5 Flash hit 53.63%, and PaddleOCR-VL-1.6 hit 52.41%, with 63.28% to 90.80% of errors driven by language priors overriding faint ink (Prior-Driven Error, PDE). Instead of trusting raw VLM decoding on its own, EC8A-Sentinel pairs 4-bit <code>Qwen2.5-VL-7B-Instruct</code> <a class="cite" href="#ref3">[3,</a> <a class="cite" href="#ref4">4,</a> <a class="cite" href="#ref5">5]</a> with a hard statutory sum gate that catches 95.65% of omissions and truncations right away.
    </p>

    <h3>2.2 Physical Camera Degradations and Layout Parsing in the Wild</h3>
    <p class="no-indent">
      Field photos taken at polling units add perspective tilt, uneven lighting, and paper creases on top of messy handwriting. Even on clean PDF pages in OmniDocBench <a class="cite" href="#ref6">[6]</a>, GPT-4o's edit distance jumps fourfold from 0.157 on printed text to 0.607 on handwriting. To measure real camera distortion, Zhou et al. <a class="cite" href="#ref2">[2]</a> built Real5-OmniDocBench by shooting 1,355 pages across 6,775 photos under five physical setups: flat scans, bad lighting and shadows, warped or folded paper, screen re-photography, and 3D camera skew. Multi-stage OCR pipelines crashed under 3D camera tilt and paper folds: PP-StructureV3 dropped from 84.68 to 37.98 (&minus;46.70 points), Marker-1.8.2 fell from 70.27 to 41.27 (&minus;29.00 points), and DeepSeek-OCR 2 slid from 89.59 to 61.28 (&minus;28.31 points) because curved rows break rectangular box detectors <a class="cite" href="#ref2">[2]</a>. Pratama and Hidayat <a class="cite" href="#ref19">[19]</a> similarly showed that overhead phone shadows and dim light push Character Error Rate from 14.23% to 22.71% on mobile document captures. Rather than using brittle corner detectors or box-cropping scripts that break on tilted sheets, we use native dynamic-resolution <code>NaViT</code> patching <a class="cite" href="#ref5">[5,</a> <a class="cite" href="#ref3">3]</a> across full-page Form EC8A photos and pinpoint the exact real-world failure mode that still fools visual readers: manual biro overwrites of printed party names on the paper sheet.
    </p>

    <h3>2.3 Computational Election Auditing and African Paper-Form Digitization</h3>
    <p class="no-indent">
      Every major attempt to digitize African paper records has run into clear practical limits without open-weight domain checks. During Kenya's 2022 Presidential Election across 46,229 polling stations, Kimani <a class="cite" href="#ref13">[13]</a> found that feeding full Form 34A scans into AWS Textract and Google Cloud Document AI failed because of noisy page layouts. Cropping the vote table with a custom YOLOv5 detector (0.9 IoU) raised AWS Textract digit accuracy to 97.00%, yet in the remaining 3.00% error tail, reading a printed table line together with handwritten numbers pushed counts into absurd billion-vote strings (like <code>677000001 002</code>), forcing human volunteers to step in to reach a 0.3% to 0.4% national margin <a class="cite" href="#ref13">[13]</a>. In Malawi's public health clinics, Tweya et al. <a class="cite" href="#ref12">[12]</a> digitized 3,082,406 handwritten records across 545 facilities using QED.ai ScanForm, reaching &gt;99% accuracy only because they could use custom pre-banded clinic forms and confidence-routed human review. Meanwhile in Nigeria, after a Veza News forensic investigation <a class="cite" href="#ref14">[14]</a> exposed 77% blurry Form EC8A uploads in Gombe State and manual biro alterations in Rivers State during the 2023 election, civic-tech teams explored dual-model consensus (Mundx Analytics covering 97.7% of Osun IReV uploads <a class="cite" href="#ref15">[15]</a>) and paid Gemini 2.5 Flash extraction with Electoral Act checks (IReV-Sentinel Pro 2.0 <a class="cite" href="#ref16">[16]</a>). While human reviewers remain essential for final disputed checks, systems built around paid Gemini API keys cost money that locks out everyday developers who have zero budget yet want to monitor democracy in their country, and literal single-box Section 51(2) checks <a class="cite" href="#ref17">[17,</a> <a class="cite" href="#ref16">16]</a> punish valid polling units over simple officer math slips. Our work bridges that gap: an open-weight, zero-API-cost 250-sheet Form EC8A benchmark that exposes how biro party-row swaps evade numeric column sums and separates Presiding Officer subtraction slips from genuine over-voting.
    </p>

    <!-- Figure 1: Full-Width Architecture Overview -->
    <div class="full-width-block figure-box">
      <svg viewBox="0 0 880 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e3a8a"/>
          </marker>
        </defs>
        <rect x="4" y="4" width="872" height="222" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Stage 1 -->
        <rect x="18" y="22" width="185" height="186" rx="5" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.5"/>
        <rect x="18" y="22" width="185" height="28" rx="4" fill="#1e3a8a"/>
        <text x="110" y="40" fill="#ffffff" font-family="sans-serif" font-size="10.5" font-weight="bold" text-anchor="middle">1. Osun-EC8A-250 Input</text>
        <text x="110" y="66" fill="#0f172a" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">INEC IReV Form EC8A</text>
        <text x="110" y="82" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; 250 Uncropped Photos (3-4 MB)</text>
        <text x="110" y="96" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Part A: BVAS &amp; Ballot Totals</text>
        <text x="110" y="110" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Part B: 15 Political Party Rows</text>
        <text x="110" y="124" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; 3,750 Handwritten Vote Cells</text>
        <rect x="34" y="138" width="153" height="54" rx="3" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="110" y="154" fill="#1e3a8a" font-family="monospace" font-size="8.5" font-weight="bold" text-anchor="middle">Atakumosa East (75 PUs)</text>
        <text x="110" y="168" fill="#1e3a8a" font-family="monospace" font-size="8.5" font-weight="bold" text-anchor="middle">Atakumosa West (75 PUs)</text>
        <text x="110" y="182" fill="#1e3a8a" font-family="monospace" font-size="8.5" font-weight="bold" text-anchor="middle">Ayedaade (100 PUs)</text>

        <line x1="203" y1="115" x2="229" y2="115" stroke="#1e3a8a" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Stage 2 -->
        <rect x="233" y="22" width="205" height="186" rx="5" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
        <rect x="233" y="22" width="205" height="28" rx="4" fill="#0284c7"/>
        <text x="335" y="40" fill="#ffffff" font-family="sans-serif" font-size="10.5" font-weight="bold" text-anchor="middle">2. 4-Bit NaViT Vision Engine</text>
        <text x="335" y="65" fill="#0f172a" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">Qwen2.5-VL-7B-Instruct (NF4)</text>
        <text x="335" y="81" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Native Dynamic Patching (14&times;14)</text>
        <text x="335" y="95" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; 4-bit NormalFloat (5.8 GB VRAM)</text>
        <text x="335" y="109" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Single Free T4 GPU ($0.00 API)</text>
        <text x="335" y="123" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Greedy JSON Schema Decoding</text>
        <rect x="248" y="138" width="175" height="54" rx="3" fill="#f0fdf4" stroke="#86efac"/>
        <text x="335" y="155" fill="#166534" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">98.77% Exact Match (3,704/3,750)</text>
        <text x="335" y="169" fill="#166534" font-family="sans-serif" font-size="8.5" text-anchor="middle">88.80% Flawless Sheets &bull; 0% Refusal</text>
        <text x="335" y="183" fill="#166534" font-family="sans-serif" font-size="8.5" text-anchor="middle">99.92% Zero-Cell Specificity</text>

        <line x1="438" y1="115" x2="464" y2="115" stroke="#1e3a8a" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Stage 3 -->
        <rect x="468" y="22" width="190" height="186" rx="5" fill="#ffffff" stroke="#0d9488" stroke-width="1.5"/>
        <rect x="468" y="22" width="190" height="28" rx="4" fill="#0d9488"/>
        <text x="563" y="40" fill="#ffffff" font-family="sans-serif" font-size="10.5" font-weight="bold" text-anchor="middle">3. Tier-1 Sec 64(4) Sum Gate</text>
        <text x="563" y="65" fill="#0f172a" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">Collation Checksum Invariant</text>
        <text x="563" y="83" fill="#0f172a" font-family="serif" font-style="italic" font-size="10" text-anchor="middle">&Sigma; v&#770; = V&#770;_valid (B_64 &isin; {0,1})</text>
        <text x="563" y="101" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Traps 29/29 Sparse Omissions</text>
        <text x="563" y="115" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Traps 5/5 Grid -100 Drops</text>
        <text x="563" y="129" fill="#334155" font-family="sans-serif" font-size="8.5" text-anchor="middle">&bull; Traps 10/10 Substitutions/Drops</text>
        <rect x="482" y="142" width="162" height="50" rx="3" fill="#f0fdfa" stroke="#5eead4"/>
        <text x="563" y="161" fill="#115e59" font-family="sans-serif" font-size="9.5" font-weight="bold" text-anchor="middle">95.65% Errors Caught (44/46)</text>
        <text x="563" y="177" fill="#115e59" font-family="sans-serif" font-size="8.2" text-anchor="middle">Zero Ground-Truth Labels Needed</text>

        <line x1="658" y1="115" x2="684" y2="115" stroke="#1e3a8a" stroke-width="2" marker-end="url(#arrow)"/>

        <!-- Stage 4 -->
        <rect x="688" y="22" width="174" height="186" rx="5" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
        <rect x="688" y="22" width="174" height="28" rx="4" fill="#b45309"/>
        <text x="775" y="40" fill="#ffffff" font-family="sans-serif" font-size="10.2" font-weight="bold" text-anchor="middle">4. Tier-2 Sec 51(2) Solver</text>
        <text x="775" y="65" fill="#0f172a" font-family="sans-serif" font-size="9.2" font-weight="bold" text-anchor="middle">Over-Voting Disentangler</text>
        <text x="775" y="81" fill="#334155" font-family="sans-serif" font-size="8.3" text-anchor="middle">Raw Flag: V&#770;_cast &gt; A&#770;_BVAS (58 PUs)</text>
        <text x="775" y="96" fill="#334155" font-family="sans-serif" font-size="8.3" text-anchor="middle">Reconciled: V&#770;_valid + V&#770;_rej &le; A&#770;</text>
        <rect x="700" y="108" width="150" height="40" rx="3" fill="#fef3c7" stroke="#fcd34d"/>
        <text x="775" y="124" fill="#92400e" font-family="sans-serif" font-size="8.6" font-weight="bold" text-anchor="middle">Class I: 38 Clerical Slips (65.52%)</text>
        <text x="775" y="138" fill="#92400e" font-family="sans-serif" font-size="8" text-anchor="middle">Rescued from Wrongful Cancellation</text>
        <rect x="700" y="154" width="150" height="38" rx="3" fill="#fee2e2" stroke="#fca5a5"/>
        <text x="775" y="170" fill="#991b1b" font-family="sans-serif" font-size="8.6" font-weight="bold" text-anchor="middle">Class II: 20 True Anomalies (8.00%)</text>
        <text x="775" y="183" fill="#991b1b" font-family="sans-serif" font-size="8" text-anchor="middle">Escalated for Tribunal Review</text>
      </svg>
      <div class="caption">
        <strong>Figure 1:</strong> System architecture of the <strong>EC8A-Sentinel</strong> visual-statutory election audit pipeline, showing raw 3 to 4 MB INEC IReV Form EC8A camera photo input into 4-bit quantized <code>Qwen2.5-VL-7B-Instruct</code> with dynamic-resolution <code>NaViT</code> patching, followed by the Electoral Act Section 64(4) Collation Sum Gate (catching 95.65% of VLM reading errors) and the Two-Tier Section 51(2) Clerical-Slip Solver.
      </div>
    </div>

    <h2>3. Methodology</h2>
    <h3>3.1 Problem Formulation &amp; Osun-EC8A-250 Architecture</h3>
    <p class="no-indent">
      An official Nigerian polling unit result sheet (INEC Form EC8A) is a physical paper record photographed in the field as an RGB image <span class="math">I &isin; &#8477;<sup>H&times;W&times;3</sup></span> (Figure 1). Each form has two linked sections. Part A records voter accreditation and ballot accounting figures: the number of voters accredited on the Bimodal Voter Accreditation System (<span class="math">A<sub>BVAS</sub> &isin; &#8484;<sub>&ge;0</sub></span>) alongside the ballot summary boxes <span class="math">(V<sub>valid</sub>, V<sub>rejected</sub>, V<sub>cast</sub>) &isin; &#8484;<sub>&ge;0</sub><sup>3</sup></span>. Part B is a <span class="math">K</span>-row table listing the <span class="math">K</span> political parties contesting that specific election <span class="math">P = {p<sub>1</sub>, &hellip;, p<sub>K</sub>}</span> (configured in advance for the ballot, since a given state or national election may list 8, 15, or 18 parties; in the Osun State Governorship Election, <span class="math">K = 15</span> with <span class="math">P = {<code>A</code>, <code>AA</code>, <code>AAC</code>, <code>ADC</code>, <code>ADP</code>, <code>APC</code>, <code>APGA</code>, <code>APM</code>, <code>APP</code>, <code>BP</code>, <code>NNPP</code>, <code>PRP</code>, <code>SDP</code>, <code>YPP</code>, <code>ZLP</code>}</span>) next to their handwritten figure scores <span class="math"><b>v</b> = (v<sub>1</sub>, &hellip;, v<sub>K</sub>) &isin; &#8484;<sub>&ge;0</sub><sup>K</sup></span> and written word scores <a class="cite" href="#ref17">[17]</a>. Our extraction task maps each camera photo <span class="math">I<sub>i</sub></span> (<span class="math">i &isin; {1, &hellip;, N}</span>) into a structured tuple:
    </p>
    <div class="equation">
      <div class="equation-body">
        <span class="math">f<sub>&theta;</sub>(I<sub>i</sub>) = ( <b>v&#770;</b><sub>i</sub>, A&#770;<sub>BVAS,i</sub>, V&#770;<sub>valid,i</sub>, V&#770;<sub>rejected,i</sub>, V&#770;<sub>cast,i</sub> )</span>
      </div>
      <div class="equation-num">(1)</div>
    </div>
    <p class="no-indent">
      and then runs statutory math verification on Equation (1).
    </p>
    <p>
      Because existing handwriting datasets focus on isolated lab digits <a class="cite" href="#ref20">[20,</a> <a class="cite" href="#ref8">8]</a> or general notes without legal math constraints <a class="cite" href="#ref1">[1,</a> <a class="cite" href="#ref6">6]</a>, we built the <strong>Osun-EC8A-250</strong> benchmark corpus. It holds <span class="math">N = 250</span> authentic, uncropped 3 to 4 MB BVAS camera photos of Form EC8A sheets uploaded to the INEC IReV portal during the Osun State Governorship Election across three Local Government Areas: <code>ATAKUMOSA EAST</code> (75 polling units), <code>ATAKUMOSA WEST</code> (75 polling units), and <code>AYEDAADE</code> (100 polling units). We manually verified the ground-truth counts for every image across all <span class="math">K = 15</span> political parties on the Osun ballot. In total, the benchmark covers <span class="math">250 &times; 15 = 3,750</span> handwritten party vote cells (60,625 candidate votes across 1,281 non-zero cells and 2,469 zero-vote cells) plus <span class="math">250 &times; 4 = 1,000</span> administrative accounting fields (59,825 human-verified valid votes).
    </p>

    <h3>3.2 4-Bit Quantized Dynamic-Resolution Vision Extraction (<code>Qwen2.5-VL-7B-NF4</code>)</h3>
    <p class="no-indent">
      We kept the original uncropped 3 to 4 MB Form EC8A photos because shrinking them down hurts thin ballpoint pen strokes. When an election sheet is resized too small, a thin stroke like a digit <code>1</code> can blur right into the printed box borders and throw off the reading, adding or dropping digits from a candidate's tally. In a tight, contested election, missing even one digit like that can be telling. Having our sum check at the bottom helps flag mismatched numbers later, of course, but it helps even more to read the original photo as accurately as possible in the first place. To keep full image resolution on free cloud hardware, EC8A-Sentinel runs <code>Qwen2.5-VL-7B-Instruct</code> (7.6 billion parameters) <a class="cite" href="#ref3">[3]</a> quantized to 4-bit NormalFloat (<code>NF4</code>) <a class="cite" href="#ref4">[4]</a>. For each weight matrix <span class="math"><b>W</b> &isin; &#8477;<sup>d<sub>out</sub>&times;d<sub>in</sub></sup></span>, <code>NF4</code> quantization splits <span class="math"><b>W</b></span> into blocks of size <span class="math">B = 64</span> and maps every weight <span class="math">w</span> to the nearest quantile <span class="math">q<sub>k</sub> &isin; [&minus;1, 1]</span> (<span class="math">k &isin; {0, &hellip;, 15}</span>) of a standard normal distribution <span class="math">&#8499;(0, 1)</span>, storing scale factors in 16-bit floating point while computing matrix products in <code>float16</code>:
    </p>
    <div class="equation">
      <div class="equation-body">
        <span class="math"><b>W&#770;</b><sub>NF4</sub> = <span class="math-rm">dequant</span>( <span class="math-rm">argmin</span><sub>k&isin;{0..15}</sub> | w / <span class="math-rm">max</span>|<b>W</b><sub>b</sub>| &minus; q<sub>k</sub> | )</span>
      </div>
      <div class="equation-num">(2)</div>
    </div>
    <p class="no-indent">
      This cuts the memory footprint of <code>Qwen2.5-VL-7B-Instruct</code> from over 15.2 GB in <code>float16</code> down to roughly 5.8 GB. The whole model fits easily on a single free Google Colab NVIDIA T4 GPU (16 GB GDDR6 VRAM) at $0.00 API cost.
    </p>
    <p>
      Traditional OCR tools and cropped-line readers <a class="cite" href="#ref9">[9,</a> <a class="cite" href="#ref2">2,</a> <a class="cite" href="#ref13">13]</a> fail on uncropped Form EC8A photos because square resizing crushes fine pen strokes and camera tilt warps horizontal row alignment. <code>Qwen2.5-VL-7B-Instruct</code> avoids this by using a native dynamic-resolution Vision Transformer (<code>NaViT</code>) <a class="cite" href="#ref5">[5,</a> <a class="cite" href="#ref3">3]</a>. It slices each photo <span class="math">I<sub>i</sub></span> at its native <span class="math">H &times; W</span> aspect ratio into <span class="math">14 &times; 14</span> pixel patches and merges adjacent <span class="math">2 &times; 2</span> patches into visual tokens without stretching the image. That keeps each printed party acronym on the left side of Part B visually locked to its handwritten biro score on the right, running greedy zero-shot JSON decoding (<code>do_sample=False</code>, <code>max_new_tokens=512</code>) in 62.97 seconds per sheet on average.
    </p>

    <h3>3.3 Two-Tier Statutory Mathematical Reconciliation Engine (Sections 51 &amp; 64)</h3>
    <p class="no-indent">
      Even 98%+ field accuracy is not enough for legal election collation if the remaining 1% to 2% of AI mistakes invent votes or drop leading digits <a class="cite" href="#ref13">[13,</a> <a class="cite" href="#ref1">1]</a>. At the same time, auditing the numbers written by human Presiding Officers requires separating harmless arithmetic slips from real fraud. We designed a two-tier verification engine built directly on Nigeria's Electoral Act 2022 <a class="cite" href="#ref17">[17]</a>.
    </p>
    <p>
      <strong>Tier 1: Unsupervised VLM Error Interception via Section 64(4) Collation Sum Invariant.</strong> Under Section 64(4) to (6) of the Electoral Act 2022 <a class="cite" href="#ref17">[17]</a>, a collation officer must confirm that the sum of party scores equals the total valid votes recorded on Form EC8A. We define the binary Section 64(4) Collation Balance Indicator <span class="math">B<sub>64,i</sub> &isin; {0, 1}</span> for polling unit <span class="math">i</span> as:
    </p>
    <div class="equation">
      <div class="equation-body">
        <span class="math">B<sub>64,i</sub> = &#120128;( &Sigma;<sub>p&isin;P</sub> v&#770;<sub>i,p</sub> = V&#770;<sub>valid,i</sub> ), &nbsp;&nbsp; &Delta;<sub>64,i</sub> = &Sigma;<sub>p&isin;P</sub> v&#770;<sub>i,p</sub> &minus; V&#770;<sub>valid,i</sub></span>
      </div>
      <div class="equation-num">(3)</div>
    </div>
    <p class="no-indent">
      Almost every VLM reading mistake on an election sheet, whether missing a small digit in a sparse row (<span class="math">v&#770;<sub>i,p</sub> = 0</span> when <span class="math">v<sub>i,p</sub> &isin; {1, &hellip;, 4}</span>) or dropping a leading hundred digit on a border line (<span class="math">v&#770;<sub>i,p</sub> = v<sub>i,p</sub> &minus; 100</span>), changes the party sum <span class="math">&Sigma;<sub>p</sub> v&#770;<sub>i,p</sub></span> without altering the separately read header <span class="math">V&#770;<sub>valid,i</sub></span>. Any error that does not cancel itself out forces <span class="math">&Delta;<sub>64,i</sub> &ne; 0</span> (<span class="math">B<sub>64,i</sub> = 0</span>). Equation (3) acts as an automatic checksum that traps 95.65% (44 / 46) of all VLM party-cell errors without human labels.
    </p>
    <p>
      <strong>Tier 2: Clerical-Slip Disentanglement under Section 51(2) Over-Voting Check.</strong> Section 51(2) of the Electoral Act 2022 states that <em>"where the number of votes cast at an election in any polling unit exceeds the number of accredited voters in that polling unit, the Presiding Officer shall cancel the result of the election in that polling unit"</em> <a class="cite" href="#ref17">[17]</a>. A naive script checks this rule with a single inequality:
    </p>
    <div class="equation">
      <div class="equation-body">
        <span class="math">F<sub>51,i</sub><sup>raw</sup> = &#120128;( V&#770;<sub>cast,i</sub> &gt; A&#770;<sub>BVAS,i</sub> )</span>
      </div>
      <div class="equation-num">(4)</div>
    </div>
    <p class="no-indent">
      Looking closely at the real Form EC8A sheets in Osun-EC8A-250 reveals why that single check fails so often. At the end of a long election day, tired Presiding Officers frequently fill the "Total Number of Used Ballot Papers" box (<span class="math">V&#770;<sub>cast,i</sub></span>) by subtracting unused ballot booklet serial numbers in their head instead of adding <span class="math">V&#770;<sub>valid,i</sub> + V&#770;<sub>rejected,i</sub></span>. Also, when a voter spoils a ballot paper and gets a fresh one, the count of used paper stubs goes up even though only one ballot goes into the box. To stop harmless paper-stub math slips from canceling valid polling units, we compute the <strong>Reconciled Physical Ballots Cast</strong> <span class="math">V&#771;<sub>cast,i</sub> = V&#770;<sub>valid,i</sub> + V&#770;<sub>rejected,i</sub></span> and split all polling units where <span class="math">F<sub>51,i</sub><sup>raw</sup> = 1</span> into two forensic classes:
    </p>
    <div class="equation">
      <div class="equation-body">
        <span class="math"><span class="math-rm"><b>Class I (Clerical Slip):</b></span> &nbsp; F<sub>51,i</sub><sup>raw</sup>=1 &and; B<sub>64,i</sub>=1 &and; (V&#771;<sub>cast,i</sub> &le; A&#770;<sub>BVAS,i</sub>)</span><br/>
        <span class="math"><span class="math-rm"><b>Class II (True Anomaly):</b></span> &nbsp; F<sub>51,i</sub><sup>raw</sup>=1 &and; (V&#771;<sub>cast,i</sub> &gt; A&#770;<sub>BVAS,i</sub> &or; B<sub>64,i</sub>=0)</span>
      </div>
      <div class="equation-num">(5–6)</div>
    </div>
    <p class="no-indent">
      When a polling unit satisfies Equation (5), all <span class="math">K</span> party scores on the ballot add up cleanly to <span class="math">V&#770;<sub>valid,i</sub></span> (<span class="math">B<sub>64,i</sub> = 1</span>), and the actual ballots counted out of the ballot box (<span class="math">V&#770;<sub>valid,i</sub> + V&#770;<sub>rejected,i</sub></span>) do not exceed biometric accreditation <span class="math">A&#770;<sub>BVAS,i</sub></span>. The larger number written in <span class="math">V&#770;<sub>cast,i</sub></span> is proven to be a clerical header slip, not over-voting.
    </p>

    <!-- Table 1: Full-width Benchmark Table -->
    <div class="full-width-block">
      <div class="caption" style="margin-bottom: 4px;">
        <strong>Table 1:</strong> Overall benchmark comparison of handwritten field extraction accuracy, hallucination rate, refusal rate, and sheet-level fidelity on <strong>Osun-EC8A-250</strong> against published handwritten form and table baselines.
      </div>
      <table class="booktabs">
        <thead>
          <tr>
            <th class="text-left">Method</th>
            <th class="text-left">Dataset</th>
            <th class="text-right">Evaluated Fields &uarr;</th>
            <th class="text-right">Exact Match (%) &uarr;</th>
            <th class="text-right">Hallucination (%) &darr;</th>
            <th class="text-right">Refusal (%) &darr;</th>
            <th class="text-right">Flawless Sheets (%) &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">MNIST-ICR Unadapted <a class="cite" href="#ref8">[8]</a></td>
            <td class="text-left">Electoral Tally Sheets</td>
            <td class="text-right">64596</td>
            <td class="text-right">66.55</td>
            <td class="text-right">33.45</td>
            <td class="text-right">0.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">MNIST+CVL Retrained BiLSTM <a class="cite" href="#ref8">[8]</a></td>
            <td class="text-left">Electoral Tally Sheets</td>
            <td class="text-right">64596</td>
            <td class="text-right">89.32</td>
            <td class="text-right">10.68</td>
            <td class="text-right">0.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">Koncile Best VLM <a class="cite" href="#ref18">[18]</a></td>
            <td class="text-left">Medical Registry Forms</td>
            <td class="text-right">490</td>
            <td class="text-right">85.00</td>
            <td class="text-right">6.00</td>
            <td class="text-right">9.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">WildHandBench Gemini 3.5 Flash <a class="cite" href="#ref1">[1]</a></td>
            <td class="text-left">WildHandBench Tables</td>
            <td class="text-right">500</td>
            <td class="text-right">53.63</td>
            <td class="text-right">46.37</td>
            <td class="text-right">0.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">WildHandBench Gemini 3.1 Pro <a class="cite" href="#ref1">[1]</a></td>
            <td class="text-left">WildHandBench Tables</td>
            <td class="text-right">500</td>
            <td class="text-right">60.44</td>
            <td class="text-right">39.56</td>
            <td class="text-right">0.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">WildHandBench PaddleOCR-VL-1.6 <a class="cite" href="#ref1">[1]</a></td>
            <td class="text-left">WildHandBench Tables</td>
            <td class="text-right">500</td>
            <td class="text-right">52.41</td>
            <td class="text-right">47.59</td>
            <td class="text-right">0.00</td>
            <td class="text-right">0.00</td>
          </tr>
          <tr>
            <td class="text-left">YOLOv5 + AWS Textract <a class="cite" href="#ref13">[13]</a></td>
            <td class="text-left">Kenya Form 34A</td>
            <td class="text-right">46229</td>
            <td class="text-right">97.00</td>
            <td class="text-right">3.00</td>
            <td class="text-right">0.00</td>
            <td class="text-right">97.00</td>
          </tr>
          <tr class="midrule">
            <td class="text-left">EC8A-Sentinel (Qwen2.5-VL-7B 4-bit)</td>
            <td class="text-left">Osun-EC8A-250</td>
            <td class="text-right">3750</td>
            <td class="text-right">98.77</td>
            <td class="text-right">1.23</td>
            <td class="text-right">0.00</td>
            <td class="text-right">88.80</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>4. Experiments</h2>
    <h3>4.1 Experimental Setup, Baselines, and Protocol</h3>
    <p class="no-indent">
      We ran EC8A-Sentinel across all 250 polling unit sheets (3,750 party vote cells and 1,000 administrative fields) of the <strong>Osun-EC8A-250</strong> benchmark on a single Google Colab NVIDIA T4 GPU (16 GB VRAM) using 4-bit <code>NF4</code> quantization via <code>BitsAndBytesConfig</code> <a class="cite" href="#ref4">[4]</a>. Processing all 250 high-resolution (3 to 4 MB) photos streamed from the INEC IReV archive took 4.37 hours in total (62.97 seconds per sheet) and cost $0.00 in API fees.
    </p>
    <p>
      Following standard document intelligence and election audit benchmarks <a class="cite" href="#ref8">[8,</a> <a class="cite" href="#ref1">1,</a> <a class="cite" href="#ref13">13]</a>, we evaluate seven metrics: (1) <code>Exact Match (%)</code> (&uarr;), the share of the 3,750 handwritten party cells where the AI integer matches human ground truth; (2) <code>Hallucination (%)</code> (&darr;), the share of cells where the AI outputs a wrong integer (<code>Total Errors</code> / 3,750); (3) <code>Refusal (%)</code> (&darr;), the share of cells where the model fails to return an integer; (4) <code>Flawless Sheets (%)</code> (&uarr;), the share of polling units with 15/15 (100.00%) exact party matches; (5) <code>Absolute Vote Error</code> (&darr;), the total vote difference <span class="math">&Sigma;<sub>i</sub> |v&#770;<sub>i,p</sub> &minus; v<sub>i,p</sub>|</span>; (6) <code>Sec64 Balanced (%)</code> (&uarr;), the share of sheets passing Equation (3); and (7) <code>Sec51 Flagged (%)</code> (&darr;), split into Class I Benign Clerical Slips (Equation 5) and Class II Unresolved Over-Voting Anomalies (Equation 6). We compare EC8A-Sentinel against seven published baselines spanning election tally sheets (<code>MNIST-ICR Unadapted</code> and <code>MNIST+CVL Retrained BiLSTM</code> <a class="cite" href="#ref8">[8]</a>), multi-field medical forms (<code>Koncile Best VLM</code> <a class="cite" href="#ref18">[18]</a>), wild handwritten tables (<code>WildHandBench Gemini 3.5 Flash</code>, <code>Gemini 3.1 Pro</code>, and <code>PaddleOCR-VL-1.6</code> <a class="cite" href="#ref1">[1]</a>), and cropped African election forms (<code>YOLOv5 + AWS Textract</code> on Kenya Form 34A <a class="cite" href="#ref13">[13]</a>).
    </p>

    <!-- Figure 2: Benchmark Bar Chart -->
    <div class="figure-box" style="margin: 8px 0; break-inside: avoid;">
      <svg viewBox="0 0 420 225" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="416" height="221" rx="4" fill="#ffffff"/>
        <text x="210" y="16" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#0f172a" text-anchor="middle">Handwritten Field Exact Match (%) vs. Hallucination Rate (%)</text>
        <!-- Legend -->
        <rect x="95" y="23" width="10" height="8" fill="#1d4ed8"/>
        <text x="109" y="30" font-family="sans-serif" font-size="8" fill="#334155">Exact Match (%) &uarr;</text>
        <rect x="215" y="23" width="10" height="8" fill="#dc2626"/>
        <text x="229" y="30" font-family="sans-serif" font-size="8" fill="#334155">Hallucination / Error (%) &darr;</text>
        <!-- Horizontal bars -->
        <text x="118" y="48" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">PaddleOCR-VL-1.6 [1]</text>
        <rect x="122" y="40" width="131" height="6" fill="#64748b"/>
        <text x="256" y="46" font-family="sans-serif" font-size="7.2" fill="#334155">52.41%</text>
        <rect x="122" y="47" width="119" height="5" fill="#f87171"/>

        <text x="118" y="69" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">Gemini 3.5 Flash [1]</text>
        <rect x="122" y="61" width="134" height="6" fill="#64748b"/>
        <text x="259" y="67" font-family="sans-serif" font-size="7.2" fill="#334155">53.63%</text>
        <rect x="122" y="68" width="116" height="5" fill="#f87171"/>

        <text x="118" y="90" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">Gemini 3.1 Pro [1]</text>
        <rect x="122" y="82" width="151" height="6" fill="#64748b"/>
        <text x="276" y="88" font-family="sans-serif" font-size="7.2" fill="#334155">60.44%</text>
        <rect x="122" y="89" width="99" height="5" fill="#f87171"/>

        <text x="118" y="111" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">MNIST-ICR Raw [8]</text>
        <rect x="122" y="103" width="166" height="6" fill="#64748b"/>
        <text x="291" y="109" font-family="sans-serif" font-size="7.2" fill="#334155">66.55%</text>
        <rect x="122" y="110" width="84" height="5" fill="#f87171"/>

        <text x="118" y="132" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">Koncile Best VLM [18]</text>
        <rect x="122" y="124" width="212" height="6" fill="#64748b"/>
        <text x="337" y="130" font-family="sans-serif" font-size="7.2" fill="#334155">85.00%</text>
        <rect x="122" y="131" width="15" height="5" fill="#f87171"/>

        <text x="118" y="153" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">MNIST+CVL BiLSTM [8]</text>
        <rect x="122" y="145" width="223" height="6" fill="#64748b"/>
        <text x="348" y="151" font-family="sans-serif" font-size="7.2" fill="#334155">89.32%</text>
        <rect x="122" y="152" width="27" height="5" fill="#f87171"/>

        <text x="118" y="174" font-family="sans-serif" font-size="7.8" fill="#334155" text-anchor="end">YOLOv5 + Textract [13]</text>
        <rect x="122" y="166" width="242" height="6" fill="#64748b"/>
        <text x="367" y="172" font-family="sans-serif" font-size="7.2" fill="#334155">97.00%</text>
        <rect x="122" y="173" width="8" height="5" fill="#f87171"/>

        <rect x="4" y="184" width="412" height="26" rx="3" fill="#eff6ff"/>
        <text x="118" y="198" font-family="sans-serif" font-size="8.2" font-weight="bold" fill="#1e3a8a" text-anchor="end">EC8A-Sentinel (Ours)</text>
        <rect x="122" y="189" width="247" height="7" fill="#1d4ed8"/>
        <text x="373" y="196" font-family="sans-serif" font-size="8" font-weight="bold" fill="#1e3a8a">98.77%</text>
        <rect x="122" y="198" width="4" height="5" fill="#dc2626"/>
        <text x="130" y="203" font-family="sans-serif" font-size="7.2" font-weight="bold" fill="#dc2626">1.23% Error</text>
      </svg>
      <div class="caption">
        <strong>Figure 2:</strong> Grouped bar chart comparing handwritten field extraction accuracy (<code>Exact Match (%)</code>) and error rate (<code>Hallucination (%)</code>) of EC8A-Sentinel (<code>Qwen2.5-VL-7B</code> 4-bit on Osun-EC8A-250, reaching 98.77% exact match and 1.23% hallucination) against seven published lab, medical form, and wild handwritten table baselines.
      </div>
    </div>

    <h3>4.2 Main Extraction Results: Per-Party &amp; LGA Performance</h3>
    <p class="no-indent">
      Table 1 and Figure 2 show how EC8A-Sentinel stacks up against prior handwritten form benchmarks. Across 3,750 handwritten party vote cells on 250 uncropped Form EC8A camera photos, 4-bit <code>Qwen2.5-VL-7B-Instruct</code> hits <strong>98.77%</strong> <code>Exact Match (%)</code> (3,704 / 3,750 cells), holding the error rate to <strong>1.23%</strong> (46 misread cells) with a <strong>0.00%</strong> refusal rate (0 refusals). At the full-sheet level, 222 out of 250 polling units (<strong>88.80%</strong> <code>Flawless Sheets (%)</code>) get all 15/15 political party scores right. Another 18 sheets (7.20%) have just 1 party error, 6 sheets (2.40%) have 2 errors, and only 4 sheets (1.60%) have 3 or more errors. Compared to unadapted MNIST classifiers on election tally sheets (66.55%) and retrained Variational Autoencoder BiLSTMs (89.32%) <a class="cite" href="#ref8">[8]</a>, EC8A-Sentinel improves digit accuracy by +32.22 and +9.45 percentage points without box cropping or task-specific fine-tuning. Against full-page handwritten table readers on WildHandBench (53.63% for Gemini 3.5 Flash, 60.44% for Gemini 3.1 Pro, and 52.41% for PaddleOCR-VL-1.6) <a class="cite" href="#ref1">[1]</a>, anchoring <code>Qwen2.5-VL-7B-Instruct</code> to the 15-party schema of Form EC8A yields a +38.33 to +46.36 percentage-point gain, and beats the 97.00% accuracy of YOLOv5 + AWS Textract on cropped Kenyan Form 34A sheets <a class="cite" href="#ref13">[13]</a> by +1.77 percentage points.
    </p>

    <!-- Table 2: Per-Party Table -->
    <div class="full-width-block">
      <div class="caption" style="margin-bottom: 4px;">
        <strong>Table 2:</strong> Per-party handwritten vote extraction accuracy, aggregate ground-truth versus AI-extracted vote sums, and absolute vote variance across all 15 political parties on <strong>Osun-EC8A-250</strong> (250 polling units, 3,750 evaluated cells).
      </div>
      <table class="booktabs">
        <thead>
          <tr>
            <th class="text-left">Party</th>
            <th class="text-right">Evaluated Cells &uarr;</th>
            <th class="text-right">Correct Cells &uarr;</th>
            <th class="text-right">Total Errors &darr;</th>
            <th class="text-right">Exact Match (%) &uarr;</th>
            <th class="text-right">Ground Truth Votes &uarr;</th>
            <th class="text-right">AI Extracted Votes &uarr;</th>
            <th class="text-right">Absolute Vote Error &darr;</th>
            <th class="text-right">Non-Zero Cells &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="text-left"><code>A</code></td><td class="text-right">250</td><td class="text-right">242</td><td class="text-right">8</td><td class="text-right">96.80</td><td class="text-right">27939</td><td class="text-right">27498</td><td class="text-right">545</td><td class="text-right">248</td></tr>
          <tr><td class="text-left"><code>AA</code></td><td class="text-right">250</td><td class="text-right">237</td><td class="text-right">13</td><td class="text-right">94.80</td><td class="text-right">171</td><td class="text-right">155</td><td class="text-right">16</td><td class="text-right">104</td></tr>
          <tr><td class="text-left"><code>AAC</code></td><td class="text-right">250</td><td class="text-right">245</td><td class="text-right">5</td><td class="text-right">98.00</td><td class="text-right">129</td><td class="text-right">123</td><td class="text-right">6</td><td class="text-right">83</td></tr>
          <tr><td class="text-left"><code>ADC</code></td><td class="text-right">250</td><td class="text-right">246</td><td class="text-right">4</td><td class="text-right">98.40</td><td class="text-right">818</td><td class="text-right">809</td><td class="text-right">9</td><td class="text-right">209</td></tr>
          <tr><td class="text-left"><code>ADP</code></td><td class="text-right">250</td><td class="text-right">246</td><td class="text-right">4</td><td class="text-right">98.40</td><td class="text-right">199</td><td class="text-right">260</td><td class="text-right">71</td><td class="text-right">121</td></tr>
          <tr><td class="text-left"><code>APC</code></td><td class="text-right">250</td><td class="text-right">245</td><td class="text-right">5</td><td class="text-right">98.00</td><td class="text-right">30965</td><td class="text-right">30640</td><td class="text-right">337</td><td class="text-right">249</td></tr>
          <tr><td class="text-left"><code>APGA</code></td><td class="text-right">250</td><td class="text-right">248</td><td class="text-right">2</td><td class="text-right">99.20</td><td class="text-right">115</td><td class="text-right">113</td><td class="text-right">2</td><td class="text-right">74</td></tr>
          <tr><td class="text-left"><code>APM</code></td><td class="text-right">250</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">100.00</td><td class="text-right">15</td><td class="text-right">15</td><td class="text-right">0</td><td class="text-right">14</td></tr>
          <tr><td class="text-left"><code>APP</code></td><td class="text-right">250</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">100.00</td><td class="text-right">7</td><td class="text-right">7</td><td class="text-right">0</td><td class="text-right">7</td></tr>
          <tr><td class="text-left"><code>BP</code></td><td class="text-right">250</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">100.00</td><td class="text-right">4</td><td class="text-right">4</td><td class="text-right">0</td><td class="text-right">4</td></tr>
          <tr><td class="text-left"><code>NNPP</code></td><td class="text-right">250</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">100.00</td><td class="text-right">6</td><td class="text-right">6</td><td class="text-right">0</td><td class="text-right">6</td></tr>
          <tr><td class="text-left"><code>PRP</code></td><td class="text-right">250</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">100.00</td><td class="text-right">3</td><td class="text-right">3</td><td class="text-right">0</td><td class="text-right">3</td></tr>
          <tr><td class="text-left"><code>SDP</code></td><td class="text-right">250</td><td class="text-right">248</td><td class="text-right">2</td><td class="text-right">99.20</td><td class="text-right">13</td><td class="text-right">20</td><td class="text-right">9</td><td class="text-right">13</td></tr>
          <tr><td class="text-left"><code>YPP</code></td><td class="text-right">250</td><td class="text-right">248</td><td class="text-right">2</td><td class="text-right">99.20</td><td class="text-right">42</td><td class="text-right">40</td><td class="text-right">2</td><td class="text-right">36</td></tr>
          <tr><td class="text-left"><code>ZLP</code></td><td class="text-right">250</td><td class="text-right">249</td><td class="text-right">1</td><td class="text-right">99.60</td><td class="text-right">199</td><td class="text-right">206</td><td class="text-right">7</td><td class="text-right">110</td></tr>
          <tr class="midrule">
            <td class="text-left">Total / Overall</td><td class="text-right">3750</td><td class="text-right">3704</td><td class="text-right">46</td><td class="text-right">98.77</td><td class="text-right">60625</td><td class="text-right">59899</td><td class="text-right">1004</td><td class="text-right">1281</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="no-indent">
      Table 2 breaks down extraction accuracy across all 15 political parties on the Osun ballot. Five minor parties (<code>APM</code>, <code>APP</code>, <code>BP</code>, <code>NNPP</code>, and <code>PRP</code>) hit 100.00% <code>Exact Match (%)</code> (250/250 cells each, 0 errors), and four others (<code>ZLP</code> at 99.60%, plus <code>APGA</code>, <code>SDP</code>, and <code>YPP</code> at 99.20%) have just 1 or 2 errors across all 250 sheets. For the two leading parties that together account for 97.16% of all votes cast, <code>APC</code> (30,965 ground-truth votes across 249 non-zero polling units) and Party <code>A</code> (27,939 ground-truth votes across 248 non-zero polling units), EC8A-Sentinel reaches 98.00% (245/250) and 96.80% (242/250) exact match accuracy. Across the 2,469 zero-vote cells where Presiding Officers wrote <code>0</code>, <code>00</code>, a dash <code>-</code>, or left the row blank, the model outputs 0 in 2,467 cases (<strong>99.92%</strong> zero-cell specificity), hallucinating a non-zero number on only 2 zero-vote cells in the entire dataset (both on <code>ADP</code>).
    </p>

    <!-- Table 3: LGA Breakdown -->
    <div class="full-width-block">
      <div class="caption" style="margin-bottom: 4px;">
        <strong>Table 3:</strong> Local Government Area (LGA) performance breakdown of visual extraction accuracy, sheet-level perfection, and statutory Electoral Act audit flags across <strong>Osun-EC8A-250</strong>.
      </div>
      <table class="booktabs">
        <thead>
          <tr>
            <th class="text-left">Dataset / LGA</th>
            <th class="text-right">Audited Sheets &uarr;</th>
            <th class="text-right">Evaluated Fields &uarr;</th>
            <th class="text-right">Correct Cells &uarr;</th>
            <th class="text-right">Exact Match (%) &uarr;</th>
            <th class="text-right">Flawless Sheets (%) &uarr;</th>
            <th class="text-right">Sec51 Flagged (%) &darr;</th>
            <th class="text-right">Sec64 Balanced (%) &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="text-left"><code>ATAKUMOSA EAST</code></td><td class="text-right">75</td><td class="text-right">1125</td><td class="text-right">1100</td><td class="text-right">97.78</td><td class="text-right">82.67</td><td class="text-right">22.67</td><td class="text-right">78.67</td></tr>
          <tr><td class="text-left"><code>ATAKUMOSA WEST</code></td><td class="text-right">75</td><td class="text-right">1125</td><td class="text-right">1121</td><td class="text-right">99.64</td><td class="text-right">96.00</td><td class="text-right">18.67</td><td class="text-right">94.67</td></tr>
          <tr><td class="text-left"><code>AYEDAADE</code></td><td class="text-right">100</td><td class="text-right">1500</td><td class="text-right">1483</td><td class="text-right">98.87</td><td class="text-right">88.00</td><td class="text-right">27.00</td><td class="text-right">79.00</td></tr>
          <tr class="midrule"><td class="text-left">Osun-EC8A-250 Total</td><td class="text-right">250</td><td class="text-right">3750</td><td class="text-right">3704</td><td class="text-right">98.77</td><td class="text-right">88.80</td><td class="text-right">23.20</td><td class="text-right">83.60</td></tr>
        </tbody>
      </table>
    </div>

    <p class="no-indent">
      Table 3 shows performance across the three Local Government Areas in <strong>Osun-EC8A-250</strong>. Accuracy stays high across both rural and semi-urban units: <code>ATAKUMOSA WEST</code> reaches 99.64% <code>Exact Match (%)</code> (1,121 / 1,125 cells) and 96.00% <code>Flawless Sheets (%)</code> (72 / 75 perfect sheets, with 94.67% balanced under Section 64(4)), <code>AYEDAADE</code> reaches 98.87% <code>Exact Match (%)</code> (1,483 / 1,500 cells) and 88.00% <code>Flawless Sheets (%)</code> (88 / 100 sheets), and <code>ATAKUMOSA EAST</code> reaches 97.78% <code>Exact Match (%)</code> (1,100 / 1,125 cells) and 82.67% <code>Flawless Sheets (%)</code> (62 / 75 sheets).
    </p>

    <!-- Figure 3: Dual Panel Party Accuracy & Error Taxonomy -->
    <div class="full-width-block figure-box">
      <svg viewBox="0 0 880 215" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="876" height="211" rx="4" fill="#ffffff"/>
        <!-- Left Panel: Per-Party Accuracy -->
        <text x="215" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">(a) Per-Party Handwritten Vote Extraction Accuracy (250 Sheets)</text>
        <line x1="45" y1="185" x2="415" y2="185" stroke="#334155" stroke-width="1"/>
        <!-- 15 Party vertical bars -->
        <g font-family="sans-serif" font-size="7.2" text-anchor="middle">
          <rect x="52" y="45" width="16" height="140" fill="#1d4ed8"/><text x="60" y="41" fill="#1e3a8a">96.8</text><text x="60" y="196" fill="#0f172a" font-weight="bold">A</text>
          <rect x="76" y="54" width="16" height="131" fill="#3b82f6"/><text x="84" y="50" fill="#1e3a8a">94.8</text><text x="84" y="196" fill="#0f172a" font-weight="bold">AA</text>
          <rect x="100" y="39" width="16" height="146" fill="#2563eb"/><text x="108" y="35" fill="#1e3a8a">98.0</text><text x="108" y="196" fill="#0f172a" font-weight="bold">AAC</text>
          <rect x="124" y="37" width="16" height="148" fill="#2563eb"/><text x="132" y="33" fill="#1e3a8a">98.4</text><text x="132" y="196" fill="#0f172a" font-weight="bold">ADC</text>
          <rect x="148" y="37" width="16" height="148" fill="#2563eb"/><text x="156" y="33" fill="#1e3a8a">98.4</text><text x="156" y="196" fill="#0f172a" font-weight="bold">ADP</text>
          <rect x="172" y="39" width="16" height="146" fill="#1d4ed8"/><text x="180" y="35" fill="#1e3a8a">98.0</text><text x="180" y="196" fill="#0f172a" font-weight="bold">APC</text>
          <rect x="196" y="33" width="16" height="152" fill="#0284c7"/><text x="204" y="29" fill="#0369a1">99.2</text><text x="204" y="196" fill="#0f172a" font-weight="bold">APGA</text>
          <rect x="220" y="29" width="16" height="156" fill="#0d9488"/><text x="228" y="25" fill="#0f766e">100</text><text x="228" y="196" fill="#0f172a" font-weight="bold">APM</text>
          <rect x="244" y="29" width="16" height="156" fill="#0d9488"/><text x="252" y="25" fill="#0f766e">100</text><text x="252" y="196" fill="#0f172a" font-weight="bold">APP</text>
          <rect x="268" y="29" width="16" height="156" fill="#0d9488"/><text x="276" y="25" fill="#0f766e">100</text><text x="276" y="196" fill="#0f172a" font-weight="bold">BP</text>
          <rect x="292" y="29" width="16" height="156" fill="#0d9488"/><text x="300" y="25" fill="#0f766e">100</text><text x="300" y="196" fill="#0f172a" font-weight="bold">NNPP</text>
          <rect x="316" y="29" width="16" height="156" fill="#0d9488"/><text x="324" y="25" fill="#0f766e">100</text><text x="324" y="196" fill="#0f172a" font-weight="bold">PRP</text>
          <rect x="340" y="33" width="16" height="152" fill="#0284c7"/><text x="348" y="29" fill="#0369a1">99.2</text><text x="348" y="196" fill="#0f172a" font-weight="bold">SDP</text>
          <rect x="364" y="33" width="16" height="152" fill="#0284c7"/><text x="372" y="29" fill="#0369a1">99.2</text><text x="372" y="196" fill="#0f172a" font-weight="bold">YPP</text>
          <rect x="388" y="31" width="16" height="154" fill="#0284c7"/><text x="396" y="27" fill="#0369a1">99.6</text><text x="396" y="196" fill="#0f172a" font-weight="bold">ZLP</text>
        </g>

        <line x1="435" y1="15" x2="435" y2="200" stroke="#cbd5e1" stroke-dasharray="3,3"/>

        <!-- Right Panel: Failure Mode Taxonomy & Sec 64(4) Interception -->
        <text x="655" y="18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">(b) 46 Misread Cells Taxonomy &amp; Sec 64(4) Interception (95.65%)</text>
        <g font-family="sans-serif" font-size="8.2">
          <text x="610" y="50" fill="#1e293b" text-anchor="end">Sparse Small-Digit Omission (1-4 &rarr; 0)</text>
          <rect x="616" y="39" width="174" height="14" rx="2" fill="#0d9488"/>
          <text x="795" y="50" fill="#0f766e" font-weight="bold">29 / 29 Caught (100%)</text>

          <text x="610" y="80" fill="#1e293b" text-anchor="end">Stroke-Similarity Substitution</text>
          <rect x="616" y="69" width="48" height="14" rx="2" fill="#0d9488"/>
          <text x="670" y="80" fill="#0f766e" font-weight="bold">8 / 8 Caught (100%)</text>

          <text x="610" y="110" fill="#1e293b" text-anchor="end">Grid-Line Leading-Digit Drop (-100)</text>
          <rect x="616" y="99" width="30" height="14" rx="2" fill="#0d9488"/>
          <text x="652" y="110" fill="#0f766e" font-weight="bold">5 / 5 Caught (100%)</text>

          <text x="610" y="140" fill="#1e293b" text-anchor="end">Full-Row Vote Dropout (191/71 &rarr; 0)</text>
          <rect x="616" y="129" width="14" height="14" rx="2" fill="#0d9488"/>
          <text x="636" y="140" fill="#0f766e" font-weight="bold">2 / 2 Caught (100%)</text>

          <text x="610" y="170" fill="#991b1b" font-weight="bold" text-anchor="end">Biro Party-Row Overwrite (ADP/APC)</text>
          <rect x="616" y="159" width="14" height="14" rx="2" fill="#dc2626"/>
          <text x="636" y="170" fill="#dc2626" font-weight="bold">0 / 2 Caught (0% - Sum Invariant)</text>

          <rect x="455" y="182" width="405" height="22" rx="3" fill="#f0fdfa" stroke="#5eead4"/>
          <text x="657" y="196" fill="#115e59" font-weight="bold" text-anchor="middle">Total Sec 64(4) Autonomous Error Interception: 44 / 46 Errors (95.65%)</text>
        </g>
      </svg>
      <div class="caption">
        <strong>Figure 3:</strong> Dual-panel analysis on the <strong>Osun-EC8A-250</strong> benchmark (3,750 party cells across 250 sheets) showing (a) per-party <code>Exact Match (%)</code> across all 15 political parties and (b) failure mode breakdown of the 46 misread cells with their 95.65% (44/46) automatic detection rate under the Section 64(4) Collation Sum Gate.
      </div>
    </div>

    <h3>4.3 Failure Mode Taxonomy, Section 64(4) Interception, &amp; the Biro Party-Swap Discovery</h3>
    <p class="no-indent">
      To understand why a VLM still misses occasional cells on election sheets and how statutory math catches those misses, we manually inspected all 46 misread cells out of 3,750 total cells. Table 4 and Figure 3 group all 46 errors into five failure modes and report how many are caught by the Tier 1 Section 64(4) Collation Sum Gate (Equation 3).
    </p>

    <!-- Table 4: Failure Mode Taxonomy -->
    <div class="full-width-block">
      <div class="caption" style="margin-bottom: 4px;">
        <strong>Table 4:</strong> Failure mode taxonomy across all 46 misread party vote cells on <strong>Osun-EC8A-250</strong> and automatic error interception rates achieved by the Electoral Act Section 64(4) Collation Sum Gate.
      </div>
      <table class="booktabs">
        <thead>
          <tr>
            <th class="text-left">Failure Mode Category</th>
            <th class="text-right">Total Errors &darr;</th>
            <th class="text-right">Share of Errors (%) &darr;</th>
            <th class="text-right">Mean Abs Vote Error &darr;</th>
            <th class="text-right">Intercepted by Sec64 &uarr;</th>
            <th class="text-right">Sec64 Detection Rate (%) &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="text-left">Sparse-Row Small-Digit Omission (1 to 4 read as 0)</td><td class="text-right">29</td><td class="text-right">63.04</td><td class="text-right">1.38</td><td class="text-right">29</td><td class="text-right">100.00</td></tr>
          <tr><td class="text-left">Grid-Line Leading-Digit Truncation (&minus;100 drop)</td><td class="text-right">5</td><td class="text-right">10.87</td><td class="text-right">100.00</td><td class="text-right">5</td><td class="text-right">100.00</td></tr>
          <tr><td class="text-left">Stroke-Similarity Substitution (e.g. 2 vs 9, 0 vs 6)</td><td class="text-right">8</td><td class="text-right">17.39</td><td class="text-right">9.63</td><td class="text-right">8</td><td class="text-right">100.00</td></tr>
          <tr><td class="text-left">Full-Row Vote Dropout (191 or 71 read as 0)</td><td class="text-right">2</td><td class="text-right">4.35</td><td class="text-right">131.00</td><td class="text-right">2</td><td class="text-right">100.00</td></tr>
          <tr><td class="text-left">Hand-Altered Party Acronym Swap (Biro ADP/APC Overwrite)</td><td class="text-right">2</td><td class="text-right">4.35</td><td class="text-right">60.00</td><td class="text-right">0</td><td class="text-right">0.00</td></tr>
          <tr class="midrule"><td class="text-left">Total All Errors</td><td class="text-right">46</td><td class="text-right">100.00</td><td class="text-right">21.83</td><td class="text-right">44</td><td class="text-right">95.65</td></tr>
        </tbody>
      </table>
    </div>

    <p class="no-indent">Three findings stand out from Table 4:</p>
    <ol>
      <li><strong>Sparse-Row Zero-Prior Bias (63.04% of errors):</strong> Exactly 29 out of 46 errors (averaging just 1.38 votes off) happen when a minor party (<code>AA</code> with 13 errors, <code>AAC</code> with 5 errors, <code>ADC</code> with 4 errors) gets 1 to 4 votes inside a column filled mostly with zeros or dashes, and the VLM defaults to 0. This directly mirrors the Prior-Driven Error (PDE) behavior found on WildHandBench <a class="cite" href="#ref1">[1]</a>.</li>
      <li><strong>Grid-Line Leading-Digit Truncation on 3-Digit Tallies (10.87% of errors):</strong> On 5 cells for major parties (<code>A</code> and <code>APC</code>), the Presiding Officer wrote a 3-digit score starting with <code>1</code> right on top of the left vertical border of the score box. The printed line swallowed the leading <code>1</code>, causing an exact &minus;100 vote drop: 141 &rarr; 41 (PU <code>29/01/01/003</code>), 191 &rarr; 91 (PU <code>29/01/06/002</code>), 198 &rarr; 98 (PU <code>29/03/05/017</code>), 124 &rarr; 24 (PU <code>29/03/07/001</code>), and 113 &rarr; 13 (PU <code>29/03/08/001</code>).</li>
      <li><strong>95.65% Automatic Detection via Section 64(4) and the Biro Party-Alteration Discovery:</strong> Every single Sparse-Row Omission (29/29), Grid-Line Truncation (5/5), Stroke Substitution (8/8), and Full-Row Dropout (2/2) breaks the sum rule <span class="math">&Sigma;<sub>p</sub> v&#770;<sub>i,p</sub> = V&#770;<sub>valid,i</sub></span> and gets caught immediately by the Section 64(4) Collation Sum Gate (44/46 = 95.65%). The <em>only</em> 2 errors in the entire 250-sheet benchmark that slipped past Section 64(4) occurred on one sheet: Polling Unit <code>29/01/07/001</code> (<code>L.A. PRY. SCHOOL ONIGBOGI</code> in <code>ATAKUMOSA EAST</code>). When you visually inspect the original IReV photograph for <code>29/01/07/001</code>, you see why. On a normal Form EC8A, row 5 is printed as <code>ADP</code> and row 6 is printed as <code>APC</code>. On this sheet, somebody swapped the party names with a blue ballpoint pen (biro) so that <code>APC</code> appeared before <code>ADP</code>, overwriting <code>ADP</code> on row 5 into <code>APC</code> and <code>APC</code> on row 6 into <code>ADP</code>, then wrote <code>=60=</code> (<code>SIXTY</code>) on row 5 beside the <code>APC</code> polling agent's signature (<code>JULIUS ADEREMI</code>). Because <code>Qwen2.5-VL-7B-Instruct</code> assumed the normal party order instead of reading the altered letters, the scores got recorded inversely: 60 votes shifted to <code>ADP</code> (ground truth 0, AI 60) and 0 votes went to <code>APC</code> (ground truth 60, AI 0). Even with that major error, the column total still came out right (<span class="math">&Sigma;<sub>p</sub> v&#770;<sub>i,p</sub> = 170 = V&#770;<sub>valid,i</sub></span>), so everything looked normal to the Section 64(4) sum gate. Catching this kind of swap in future work means reading the actual party labels directly alongside the written words and polling agent signatures.</li>
    </ol>

    <!-- Table 5: Ablation of Statutory Audit Gates -->
    <div class="full-width-block">
      <div class="caption" style="margin-bottom: 4px;">
        <strong>Table 5:</strong> Ablation study of statutory audit gates across 250 polling units on <strong>Osun-EC8A-250</strong>, measuring over-voting classification, benign clerical slips rescued, and uncaught OCR error leakage.
      </div>
      <table class="booktabs">
        <thead>
          <tr>
            <th class="text-left">Audit Pipeline Variant</th>
            <th class="text-right">Audited Sheets &uarr;</th>
            <th class="text-right">Sec51 Flagged &darr;</th>
            <th class="text-right">Sec51 Flagged (%) &darr;</th>
            <th class="text-right">Clerical Slips Saved &uarr;</th>
            <th class="text-right">Unresolved Over-Voting (%) &darr;</th>
            <th class="text-right">Uncaught Errors Leaked &darr;</th>
            <th class="text-right">Error Interception (%) &uarr;</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="text-left">Raw VLM Extraction Only (No Statutory Gates)</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">0.00</td><td class="text-right">0</td><td class="text-right">0.00</td><td class="text-right">46</td><td class="text-right">0.00</td></tr>
          <tr><td class="text-left">+ Literal Sec 51(2) Gate Only (Cast &gt; Accredited)</td><td class="text-right">250</td><td class="text-right">58</td><td class="text-right">23.20</td><td class="text-right">0</td><td class="text-right">23.20</td><td class="text-right">46</td><td class="text-right">0.00</td></tr>
          <tr><td class="text-left">+ Sec 64(4) Collation Sum Gate Only</td><td class="text-right">250</td><td class="text-right">0</td><td class="text-right">0.00</td><td class="text-right">0</td><td class="text-right">0.00</td><td class="text-right">2</td><td class="text-right">95.65</td></tr>
          <tr class="midrule"><td class="text-left">EC8A-Sentinel Full (Two-Tier Sec 51 + Sec 64 Reconciliation)</td><td class="text-right">250</td><td class="text-right">58</td><td class="text-right">23.20</td><td class="text-right">38</td><td class="text-right">8.00</td><td class="text-right">2</td><td class="text-right">95.65</td></tr>
        </tbody>
      </table>
    </div>

    <h3>4.4 Ablation Study &amp; Forensic Case Study: Clerical Slips vs. Over-Voting</h3>
    <p class="no-indent">
      Table 5 and Figure 4 show what happens step by step when the Two-Tier Statutory Reconciliation Engine is turned on. If an audit runs only a literal Section 51(2) check (<span class="math">V&#770;<sub>cast,i</sub> &gt; A&#770;<sub>BVAS,i</sub></span>, Equation 4), 58 out of 250 polling units (23.20% of the dataset: 17 in <code>ATAKUMOSA EAST</code>, 14 in <code>ATAKUMOSA WEST</code>, and 27 in <code>AYEDAADE</code>) get flagged for cancellation over apparent over-voting. Turning on the Two-Tier Clerical-Slip Solver (Equations 5 and 6) reveals that <strong>38 out of those 58 flagged polling units (65.52% of all Section 51 flags)</strong> are actually <strong>Class I Benign Clerical Slips</strong>. On all 38 sheets, the 15 candidate vote tallies add up to <span class="math">V&#770;<sub>valid,i</sub></span> (<span class="math">B<sub>64,i</sub> = 1</span>), and the physical ballots counted out of the ballot box (<span class="math">V&#771;<sub>cast,i</sub> = V&#770;<sub>valid,i</sub> + V&#770;<sub>rejected,i</sub></span>) stay at or below BVAS biometric accreditation (<span class="math">V&#771;<sub>cast,i</sub> &le; A&#770;<sub>BVAS,i</sub></span>). Only 20 polling units (8.00% of the 250 sheets) remain as <strong>Class II Unresolved Over-Voting Anomalies</strong> requiring closer tribunal review.
    </p>

    <!-- Figure 4: Statutory Reconciliation Chart -->
    <div class="figure-box" style="margin: 8px 0; break-inside: avoid;">
      <svg viewBox="0 0 420 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="416" height="186" rx="4" fill="#ffffff"/>
        <text x="210" y="16" font-family="sans-serif" font-size="9.2" font-weight="bold" fill="#0f172a" text-anchor="middle">Two-Tier Section 51(2) Over-Voting Disentanglement (58 Flagged PUs)</text>
        <!-- Legend -->
        <rect x="35" y="24" width="10" height="8" fill="#64748b"/>
        <text x="49" y="31" font-family="sans-serif" font-size="7.5" fill="#334155">Raw Sec 51 Flag</text>
        <rect x="135" y="24" width="10" height="8" fill="#0d9488"/>
        <text x="149" y="31" font-family="sans-serif" font-size="7.5" fill="#0f766e">Class I Clerical Slip Saved (65.52%)</text>
        <rect x="300" y="24" width="10" height="8" fill="#dc2626"/>
        <text x="314" y="31" font-family="sans-serif" font-size="7.5" fill="#991b1b">Class II Anomaly</text>

        <g font-family="sans-serif" font-size="8">
          <text x="115" y="58" fill="#1e293b" text-anchor="end">Atakumosa East (75)</text>
          <rect x="120" y="46" width="68" height="6" fill="#64748b"/><text x="192" y="52" font-size="7">17 Raw (22.7%)</text>
          <rect x="120" y="53" width="44" height="6" fill="#0d9488"/><text x="168" y="59" font-size="7" fill="#0f766e" font-weight="bold">11 Saved</text>
          <rect x="120" y="60" width="24" height="6" fill="#dc2626"/><text x="148" y="66" font-size="7" fill="#991b1b">6 Unresolved</text>

          <text x="115" y="94" fill="#1e293b" text-anchor="end">Atakumosa West (75)</text>
          <rect x="120" y="82" width="56" height="6" fill="#64748b"/><text x="180" y="88" font-size="7">14 Raw (18.7%)</text>
          <rect x="120" y="89" width="48" height="6" fill="#0d9488"/><text x="172" y="95" font-size="7" fill="#0f766e" font-weight="bold">12 Saved</text>
          <rect x="120" y="96" width="8" height="6" fill="#dc2626"/><text x="132" y="102" font-size="7" fill="#991b1b">2 Unresolved</text>

          <text x="115" y="130" fill="#1e293b" text-anchor="end">Ayedaade (100)</text>
          <rect x="120" y="118" width="108" height="6" fill="#64748b"/><text x="232" y="124" font-size="7">27 Raw (27.0%)</text>
          <rect x="120" y="125" width="60" height="6" fill="#0d9488"/><text x="184" y="131" font-size="7" fill="#0f766e" font-weight="bold">15 Saved</text>
          <rect x="120" y="132" width="48" height="6" fill="#dc2626"/><text x="172" y="138" font-size="7" fill="#991b1b">12 Unresolved</text>

          <rect x="6" y="146" width="408" height="36" rx="3" fill="#f8fafc" stroke="#cbd5e1"/>
          <text x="115" y="166" fill="#0f172a" font-weight="bold" text-anchor="end">Total Corpus (250)</text>
          <rect x="120" y="152" width="232" height="6" fill="#475569"/><text x="356" y="158" font-size="7.2" font-weight="bold">58 Raw (23.2%)</text>
          <rect x="120" y="160" width="152" height="7" fill="#0d9488"/><text x="276" y="166" font-size="7.5" fill="#0f766e" font-weight="bold">38 Saved (65.52%)</text>
          <rect x="120" y="169" width="80" height="6" fill="#dc2626"/><text x="204" y="175" font-size="7.2" fill="#991b1b" font-weight="bold">20 True Anomalies (8.00%)</text>
        </g>
      </svg>
      <div class="caption">
        <strong>Figure 4:</strong> Local Government Area (LGA) statutory audit breakdown across <code>ATAKUMOSA EAST</code> (75 sheets), <code>ATAKUMOSA WEST</code> (75 sheets), <code>AYEDAADE</code> (100 sheets), and the full <strong>Osun-EC8A-250</strong> corpus (250 sheets), showing how Two-Tier Section 51(2) reconciliation splits 58 raw over-voting flags (23.20%) into 38 Class I Benign Clerical Slips saved (65.52% of flags) and 20 Class II Unresolved Over-Voting Anomalies (8.00% of sheets).
      </div>
    </div>

    <p>
      <strong>Forensic Case Study (Polling Unit <code>29/01/01/002</code>, <code>UNITY PRY. SCHOOL, IWARA</code>):</strong> Polling Unit <code>29/01/01/002</code> (<code>UNITY PRY. SCHOOL, IWARA</code> in <code>ATAKUMOSA EAST</code>) shows clearly why a blind single-box Section 51(2) check cannot be trusted on its own. Here, EC8A-Sentinel read all 15 parties with 100.00% accuracy (15/15 exact matches). When you add up the candidate scores (<code>A</code>: 152, <code>APC</code>: 82, <code>ADC</code>: 8, <code>AA</code>: 5, <code>ZLP</code>: 2, <code>APGA</code>: 1, <code>APM</code>: 1, <code>YPP</code>: 1, and 0 for the other 7 parties), the total actually matches: 252 valid votes, matching the recorded <code>Valid Votes</code> (<span class="math">V&#770;<sub>valid</sub> = 252</span>, <span class="math">B<sub>64</sub> = 1</span>). On top of that, visual inspection shows 3 rejected ballots (<span class="math">V&#770;<sub>rejected</sub> = 3</span>). Adding the rejected ballots to the 252 valid votes gives 255, which matches the <span class="math">A&#770;<sub>BVAS</sub> = 255</span> voters who received BVAS accreditation (<span class="math">255 &le; 255</span>). Yet the Presiding Officer wrote 261 in the "Total Number of Used Ballot Papers" header (<span class="math">V&#770;<sub>cast</sub> = 261</span>), leaving observers wondering where the extra six sheets came from when voters may simply have spoiled and replaced wrong ballots or the officer made a subtraction mistake. A literal Section 51(2) check sees <span class="math">261 &gt; 255</span> and flags all 252 valid votes for cancellation. Instead, our Two-Tier Reconciliation marks <code>29/01/01/002</code> as a Class I Benign Clerical Slip, proving that those voters should still be counted.
    </p>

    <h2>5. Conclusion</h2>
    <h3>5.1 Summary of Findings &amp; Citizen Impact</h3>
    <p class="no-indent">
      <strong>EC8A-Sentinel</strong> proves that an open-weight model can read INEC Form EC8A sheets at $0 API cost, hitting 98.77% exact cell accuracy and 88.80% flawless sheets (0.00% refusals) on <strong>Osun-EC8A-250</strong>. Our Electoral Act Section 64(4) check caught 95.65% (44 of 46) of AI reading mistakes automatically, and our Two-Tier Section 51(2) solver proved 65.52% (38 of 58) of raw over-voting flags were just clerical slips. At zero API cost and an average processing time of 62.97 seconds (roughly a minute per sheet) on a free Google Colab T4 GPU, this is the closest we have gotten to letting ordinary citizens verify election results themselves. It can also grow into several practical Election Day tools: people could snap a photo with their phone to capture results directly, or civic groups could run two different models on the same sheet and flag any mismatch for a human reviewer. Combining zero API cost with roughly one-minute speed per sheet makes large-scale public auditing realistic on Election Day.
    </p>

    <h3>5.2 Scope Boundaries and Future Directions</h3>
    <p class="no-indent">
      Two clear gaps remain in this work. First, while the Section 64(4) sum gate caught 100.00% of digit omissions, grid-line cuts, stroke substitutions, and row dropouts (44 of 46 errors), a numeric sum cannot catch a zero-sum party swap when someone alters the printed party labels in biro ink, like the 60 votes shifted between <code>ADP</code> and <code>APC</code> on PU <code>29/01/07/001</code>. Right now, our pipeline assumes the party list stays in fixed row order. Next, we plan to read the actual party names directly instead of assuming fixed rows, read the handwritten votes in words (<code>Scores in Words</code>) alongside the digits and polling agent signatures, and check that all three match the totals at the bottom. Second, <strong>Osun-EC8A-250</strong> only tested IReV camera photos from Osun State, whereas parts of the 2023 presidential election saw heavily blurred uploads across other states <a class="cite" href="#ref14">[14]</a>. When a sheet comes in blurry, instead of letting one model guess blindly, we can zoom into smaller crops of the vote box for a clearer view, or deploy two open-weight models at zero API cost and flag any disagreement for a human reviewer, keeping a human in the loop on Election Day across all 36 states.
    </p>

    <h2>References</h2>
    <ol class="ref-list">
      <li id="ref1">Y. Zhang, C. Cui, and L. Du. WildHandBench: A Benchmark for Handwritten Text Understanding that Challenges MLLMs and Humans. <em>arXiv preprint arXiv:2608.22959</em>, 2026.</li>
      <li id="ref2">Y. Zhou, C. Cui, and PaddlePaddle Team. Real5-OmniDocBench: A Full-Scale Physical Reconstruction Benchmark for Robust Document Parsing in the Wild. In <em>European Conference on Computer Vision (ECCV)</em>, 2026.</li>
      <li id="ref3">S. Bai, K. Chen, X. Liu, J. Wang, W. Ge, S. Song, K. Dang, and P. Wang. Qwen2.5-VL Technical Report. <em>arXiv preprint arXiv:2502.13923</em>, 2025.</li>
      <li id="ref4">T. Dettmers, A. Pagnoni, A. Holtzman, and L. Zettlemoyer. QLoRA: Efficient Finetuning of Quantized LLMs. In <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, 2023.</li>
      <li id="ref5">M. Dehghani, J. Djolonga, B. Mustafa, P. Padlewski, J. Heek, J. Gilmer, A. Steiner, and M. Caron. Patch n' Pack: NaViT, a Vision Transformer for any Aspect Ratio and Resolution. In <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, 2023.</li>
      <li id="ref6">L. Ouyang, Y. Qu, H. Zhou, J. Zhu, R. Zhang, Q. Lin, B. Wang, and C. He. OmniDocBench: Benchmarking Diverse PDF Document Parsing with Comprehensive Annotations. In <em>IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)</em>, 2025.</li>
      <li id="ref7">L. Fu, B. Yang, Z. Kuang, J. Song, Y. Li, L. Zhu, Q. Luo, and X. Wang. OCRBench v2: An Improved Benchmark for Evaluating Large Multimodal Models on Visual Text Localization and Reasoning. In <em>Advances in Neural Information Processing Systems (NeurIPS)</em>, 2025.</li>
      <li id="ref8">M. S. Gondere, L. Schmidt-Thieme, and D. P. K. Chand. Election Tally Sheets Processing System. In <em>12th IAPR Workshop on Document Analysis Systems (DAS), IEEE</em>, 2016. doi:10.1109/DAS.2016.65.</li>
      <li id="ref9">M. Li, T. Lv, J. Chen, L. Cui, Y. Lu, D. Florencio, C. Zhang, Z. Li, and F. Wei. TrOCR: Transformer-based Optical Character Recognition with Pre-trained Models. In <em>Proceedings of the AAAI Conference on Artificial Intelligence</em>, 2023.</li>
      <li id="ref10">J. Poznanski, J. Borchardt, J. Dunkelberger, K. Lo, and L. Soldaini. olmOCR: Unlocking Trillions of Tokens in PDFs with Vision Language Models. <em>Allen Institute for AI Technical Report, arXiv:2502.18443</em>, 2025.</li>
      <li id="ref11">L. Alkhaled, S. Al-Maadeed, and A. Bouridane. Benchmarking Vision-Language Models on Optical Character Recognition in Dynamic Video and Multi-Domain Environments. <em>arXiv preprint arXiv:2502.06445</em>, 2025.</li>
      <li id="ref12">H. Tweya, S. Feldacker, C. Chawani, and QED.ai Team. Digitising HIV Testing Registers to Support National Scale-Up of Three-Test HIV Diagnostic Algorithm: A Case Study of an AI-Powered Monitoring and Evaluation System in Malawi. <em>medRxiv preprint doi:10.64898/2026.01.08.26343708</em>, 2026.</li>
      <li id="ref13">B. Kimani. Using AI to Verify Kenya Election Results: YOLOv5 and AWS Textract on Form 34A. <em>Bob.Africa Engineering Case Study (kenyaelection.live)</em>, 2022.</li>
      <li id="ref14">Veza News Investigative Desk. INEC's Broken Promises: Altered Voting Tallies and Poor Electoral Oversight Cast Doubt Over Nigeria's Presidential Elections. <em>Veza News Forensic Election Investigation Report</em>, 2024.</li>
      <li id="ref15">M. Uwakwe and Premium Times Nigeria. AI and Civic Tech Are Changing Nigeria's Election Result Tracking Landscape: Mundx Dual-Model Consensus on IReV. <em>Premium Times Nigeria Civic Technology Report</em>, 2026.</li>
      <li id="ref16">D. Young. IReV-Sentinel Pro 2.0: Zero-Trust Form EC8A Forensic Audit Engine. <em>AI4Election Hackathon Technical Documentation</em>, 2026.</li>
      <li id="ref17">Federal Republic of Nigeria. Electoral Act, 2022 (Act No. 13 of 2022), Sections 51(2), 60(4), and 64(4). <em>Official Gazette of the Federal Republic of Nigeria</em>, 2022.</li>
      <li id="ref18">Koncile Research Team. Best OCR Tools for Handwriting Recognition: Benchmark on IAM and Multi-Field Medical Registry Forms. <em>Koncile AI Document Intelligence Benchmark Report</em>, 2025.</li>
      <li id="ref19">A. Pratama and R. Hidayat. Shadow Removal and Contrast Enhancement for Mobile-Captured Document Digitization. In <em>Proceedings of the International Conference on Islamic Education (ICIE)</em>, 2026.</li>
      <li id="ref20">Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner. Gradient-Based Learning Applied to Document Recognition. <em>Proceedings of the IEEE</em>, 1998. doi:10.1109/5.726791.</li>
    </ol>
  </div>
</div>
</body>
</html>`;

const htmlPath = path.join(outDir, 'EC8A_Sentinel_Research_Paper.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('[HTML] Wrote publication-ready HTML manuscript:', htmlPath);

// Verify zero em-dashes in paper.tex and HTML
const texStr = fs.readFileSync(path.join(wsDir, 'final', 'paper.tex'), 'utf8');
const emDashCountTex = (texStr.match(/\u2014|---/g) || []).length;
const emDashCountHtml = (htmlContent.match(/\u2014|&mdash;/g) || []).length;
console.log(`[Sanitize Check] Em-dashes in paper.tex: ${emDashCountTex}, in HTML: ${emDashCountHtml}`);

// Locate Microsoft Edge or Chrome to print vector-crisp PDF
const browserCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

const browserExe = browserCandidates.find(p => fs.existsSync(p));
const pdfOutPath = path.join(outDir, 'EC8A_Sentinel_Research_Paper.pdf');
const pdfFinalPath = path.join(wsDir, 'final', 'paper.pdf');

if (browserExe) {
  console.log('[PDF] Using browser engine:', browserExe);
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const tempUserDataDir = path.join(projDir, 'output', '.edge-temp-profile');
  fs.mkdirSync(tempUserDataDir, { recursive: true });
  try {
    execFileSync(browserExe, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-extensions',
      '--disable-background-networking',
      `--user-data-dir=${tempUserDataDir}`,
      '--no-pdf-header-footer',
      `--print-to-pdf=${pdfOutPath}`,
      fileUrl
    ], { stdio: 'ignore', timeout: 25000 });
  } catch (e) {
    // Edge on Windows sometimes keeps a background crashpad child handle open after writing the PDF
  }
  try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch (e) {}

  if (fs.existsSync(pdfOutPath)) {
    fs.copyFileSync(pdfOutPath, pdfFinalPath);
    const sz = fs.statSync(pdfOutPath).size;
    console.log(`[PDF] Successfully compiled PDF (${(sz / 1024).toFixed(1)} KB):`);
    console.log('  ->', pdfOutPath);
    console.log('  ->', pdfFinalPath);
  }
} else {
  console.error('[PDF] No Chromium/Edge browser found at standard paths.');
}
