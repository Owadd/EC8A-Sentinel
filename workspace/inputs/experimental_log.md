# Experimental Log

## 1. Experimental Setup

* **Datasets:** We evaluated on the **Osun-EC8A-250** benchmark dataset, curated from authentic polling unit result sheets (Form EC8A) photographed and uploaded to the INEC Result Viewing Portal (IReV) during the Osun State Governorship Election across three contiguous Local Government Areas: `ATAKUMOSA EAST` (75 polling units), `ATAKUMOSA WEST` (75 polling units), and `AYEDAADE` (100 polling units). Each sheet is a raw 3–4 MB smartphone camera photograph captured at the polling unit and streamed from the official INEC IReV cloud cache (`inc-s3-cache.incportals.com`), paired with human-verified ground-truth transcriptions (`IamDejman/osun-decides`). In total, the evaluation spans **250 polling unit sheets**, **3,750 handwritten political party vote cells** (15 parties $\times$ 250 sheets), and **1,000 administrative accounting fields** (BVAS Accredited Voters, Total Valid Votes, Rejected Ballots, and Total Votes Cast across 250 sheets), representing **59,825 human-verified valid votes**.

* **Evaluation Metrics:**
  - `Exact Match (%)`: Percentage of handwritten party vote cells where the AI-extracted integer exactly equals the human-verified ground truth across all 3,750 cells.
  - `Hallucination (%)`: Percentage of evaluated cells where the model outputs an incorrect numeric value (`Total Errors` / 3,750).
  - `Refusal (%)`: Percentage of evaluated cells where the model returns `null` or fails to emit a valid JSON integer.
  - `Flawless Sheets (%)`: Percentage of polling unit sheets where all 15 out of 15 political party tallies are extracted with zero errors (250 sheets total).
  - `Ground Truth Votes`, `AI Extracted Votes`, and `Absolute Vote Error`: Aggregate vote sums and absolute vote variance ($\sum |\hat{v}_{i,p} - v_{i,p}|$) per political party.
  - `Sec64 Balanced (%)`: Percentage of sheets satisfying the Electoral Act Section 64(4) collation invariant ($\sum_{p=1}^{15} \hat{v}_p = \hat{V}_{\text{valid}}$).
  - `Sec51 Flagged (%)`: Percentage of sheets triggering a literal Electoral Act Section 51(2) over-voting flag ($\hat{V}_{\text{cast}} > \hat{A}_{\text{BVAS}}$), further decomposed into **Class I Benign Clerical Slips** ($\hat{V}_{\text{valid}} + \hat{V}_{\text{rejected}} \le \hat{A}_{\text{BVAS}}$ and $B_{64} = 1$) and **Class II Unresolved Over-Voting Anomalies**.

* **Baselines Compared:**
  - Published laboratory and field handwritten OCR / VLM benchmarks: `MNIST-ICR` on real electoral tally sheets (66.55% unadapted, 89.32% retrained, 10.38% error rate), `WildHandBench` handwritten table parsing (`Gemini 3.1 Pro` 60.44% Table TEDS, `Gemini 3.5 Flash` 53.63% Table TEDS, `Claude Opus 4.8` 52.27% Table TEDS, `PaddleOCR-VL-1.6` 52.41% Table TEDS), `Real5-OmniDocBench` skewed camera capture (`DeepSeek-OCR 2` 61.28%, `PP-StructureV3` 37.98%, `Marker-1.8.2` 41.27%), `Koncile Medical Registry` 49-form benchmark (85.00% field accuracy, 15.00% error rate, 6.00% hallucination rate), and `Kenya Form 34A` YOLOv5 + AWS Textract pipeline (97.00% cropped digit accuracy, 3.00% catastrophic tail error).
  - Single-pass Naive Statutory Audit (literal Section 51(2) check without Section 64(4) collation cross-checking or clerical-slip reconciliation).

* **Implementation Details:**
  - Model backbone: `Qwen/Qwen2.5-VL-7B-Instruct` (7.6 billion parameters) with native dynamic-resolution Vision Transformer (`NaViT`).
  - Quantization: 4-bit NormalFloat (`NF4`) via `BitsAndBytesConfig` (`load_in_4bit=True`, `bnb_4bit_quant_type="nf4"`, `bnb_4bit_compute_dtype=torch.float16`).
  - Hardware runtime: Single free-tier Google Colaboratory NVIDIA T4 GPU (16 GB GDDR6 VRAM), consuming $0.00 in external API fees.
  - Decoding configuration: Greedy deterministic decoding (`do_sample=False`, `max_new_tokens=512`), structured JSON schema output extracting all 15 party scores (`A`, `AA`, `AAC`, `ADC`, `ADP`, `APC`, `APGA`, `APM`, `APP`, `BP`, `NNPP`, `PRP`, `SDP`, `YPP`, `ZLP`) and 4 administrative ballot accounting totals per sheet. Average inference latency was ~62.97 seconds per high-resolution 3–4 MB sheet (~4.3 hours total wall-clock runtime for 250 sheets).

## 2. Raw Numeric Data

### Table 1: Overall Benchmark Performance on Osun-EC8A-250 vs. Published Handwritten Form Baselines

| Method | Dataset | Evaluated Fields | Exact Match (%) | Hallucination (%) | Refusal (%) | Flawless Sheets (%) |
|---|---|---|---|---|---|---|
| MNIST-ICR Unadapted | Electoral Tally Sheets | 64596 | 66.55 | 33.45 | 0.00 | 0.00 |
| MNIST+CVL Retrained BiLSTM | Electoral Tally Sheets | 64596 | 89.32 | 10.68 | 0.00 | 0.00 |
| Koncile Best VLM | Medical Registry Forms | 490 | 85.00 | 6.00 | 9.00 | 0.00 |
| WildHandBench Gemini 3.5 Flash | WildHandBench Tables | 500 | 53.63 | 46.37 | 0.00 | 0.00 |
| WildHandBench Gemini 3.1 Pro | WildHandBench Tables | 500 | 60.44 | 39.56 | 0.00 | 0.00 |
| WildHandBench PaddleOCR-VL-1.6 | WildHandBench Tables | 500 | 52.41 | 47.59 | 0.00 | 0.00 |
| YOLOv5 + AWS Textract | Kenya Form 34A | 46229 | 97.00 | 3.00 | 0.00 | 97.00 |
| EC8A-Sentinel (Qwen2.5-VL-7B 4-bit) | Osun-EC8A-250 | 3750 | 98.77 | 1.23 | 0.00 | 88.80 |

### Table 2: Per-Party Handwritten Vote Extraction Accuracy across 250 Polling Units

| Party | Evaluated Cells | Correct Cells | Total Errors | Exact Match (%) | Ground Truth Votes | AI Extracted Votes | Absolute Vote Error | Non-Zero Cells |
|---|---|---|---|---|---|---|---|---|
| A | 250 | 242 | 8 | 96.80 | 27939 | 27498 | 545 | 248 |
| AA | 250 | 237 | 13 | 94.80 | 171 | 155 | 16 | 104 |
| AAC | 250 | 245 | 5 | 98.00 | 129 | 123 | 6 | 83 |
| ADC | 250 | 246 | 4 | 98.40 | 818 | 809 | 9 | 209 |
| ADP | 250 | 246 | 4 | 98.40 | 199 | 260 | 71 | 121 |
| APC | 250 | 245 | 5 | 98.00 | 30965 | 30640 | 337 | 249 |
| APGA | 250 | 248 | 2 | 99.20 | 115 | 113 | 2 | 74 |
| APM | 250 | 250 | 0 | 100.00 | 15 | 15 | 0 | 14 |
| APP | 250 | 250 | 0 | 100.00 | 7 | 7 | 0 | 7 |
| BP | 250 | 250 | 0 | 100.00 | 4 | 4 | 0 | 4 |
| NNPP | 250 | 250 | 0 | 100.00 | 6 | 6 | 0 | 6 |
| PRP | 250 | 250 | 0 | 100.00 | 3 | 3 | 0 | 3 |
| SDP | 250 | 248 | 2 | 99.20 | 13 | 20 | 9 | 13 |
| YPP | 250 | 248 | 2 | 99.20 | 42 | 40 | 2 | 36 |
| ZLP | 250 | 249 | 1 | 99.60 | 199 | 206 | 7 | 110 |
| Total / Overall | 3750 | 3704 | 46 | 98.77 | 60625 | 59899 | 1004 | 1281 |

### Table 3: Local Government Area (LGA) Breakdown of Vision Extraction and Statutory Audits

| Dataset | Audited Sheets | Evaluated Fields | Correct Cells | Exact Match (%) | Flawless Sheets (%) | Sec51 Flagged (%) | Sec64 Balanced (%) |
|---|---|---|---|---|---|---|---|
| ATAKUMOSA EAST | 75 | 1125 | 1100 | 97.78 | 82.67 | 22.67 | 78.67 |
| ATAKUMOSA WEST | 75 | 1125 | 1121 | 99.64 | 96.00 | 18.67 | 94.67 |
| AYEDAADE | 100 | 1500 | 1483 | 98.87 | 88.00 | 27.00 | 79.00 |
| Osun-EC8A-250 Total | 250 | 3750 | 3704 | 98.77 | 88.80 | 23.20 | 83.60 |

### Table 4: Failure Mode Taxonomy and Section 64(4) Automatic Error Interception across All 46 Misread Cells

| Failure Mode Category | Total Errors | Share of Errors (%) | Mean Absolute Vote Error | Intercepted by Sec64 Gate | Sec64 Detection Rate (%) |
|---|---|---|---|---|---|
| Sparse-Row Small-Digit Omission (1-4 read as 0) | 29 | 63.04 | 1.38 | 29 | 100.00 |
| Grid-Line Leading-Digit Truncation (-100 drop) | 5 | 10.87 | 100.00 | 5 | 100.00 |
| Stroke-Similarity Substitution (e.g. 2 vs 9, 0 vs 6) | 8 | 17.39 | 9.63 | 8 | 100.00 |
| Full-Row Vote Dropout (191 or 71 read as 0) | 2 | 4.35 | 131.00 | 2 | 100.00 |
| Hand-Altered Party Acronym Swap (Biro ADP/APC Overwrite) | 2 | 4.35 | 60.00 | 0 | 0.00 |
| Total All Errors | 46 | 100.00 | 21.83 | 44 | 95.65 |

### Table 5: Ablation of Statutory Audit Gates on Section 51(2) Over-Voting Classification and Error Leakage

| Audit Pipeline Variant | Audited Sheets | Sec51 Flagged Count | Sec51 Flagged (%) | Benign Clerical Slips Saved | Unresolved Over-VotingPct (%) | Uncaught OCR Errors Leaked | Error Interception Rate (%) |
|---|---|---|---|---|---|---|---|
| Raw VLM Extraction Only (No Statutory Gates) | 250 | 0 | 0.00 | 0 | 0.00 | 46 | 0.00 |
| + Literal Sec 51(2) Gate Only (Cast > Accredited) | 250 | 58 | 23.20 | 0 | 23.20 | 46 | 0.00 |
| + Sec 64(4) Collation Sum Gate Only | 250 | 0 | 0.00 | 0 | 0.00 | 2 | 95.65 |
| EC8A-Sentinel Full (Two-Tier Sec 51 + Sec 64 Reconciliation) | 250 | 58 | 23.20 | 38 | 8.00 | 2 | 95.65 |

## 3. Qualitative Observations

* Observation: Across all 250 authentic polling unit sheets (3,750 party cells), 4-bit `Qwen2.5-VL-7B-Instruct` achieved 3,704 exact matches (98.77% `Exact Match (%)`), with only 46 misread cells (1.23% `Hallucination (%)`) and 0 refusals (0.00% `Refusal (%)`).
* Observation: At the sheet level, 222 out of 250 polling units (88.80% `Flawless Sheets (%)`) achieved 100.00% accuracy across all 15 political parties; 18 sheets (7.20%) had exactly 1 party error, 6 sheets (2.40%) had 2 errors, and 4 sheets (1.60%) had 3 or more errors.
* Observation: Five political parties (`APM`, `APP`, `BP`, `NNPP`, and `PRP`) achieved 100.00% `Exact Match (%)` (250 / 250 cells each) across the entire dataset. Major contesting parties `APC` (30,965 ground-truth votes across 249 non-zero polling units) and `A` (27,939 ground-truth votes across 248 non-zero polling units), which together account for 97.16% of all 60,625 ground-truth votes cast, achieved 98.00% (245 / 250) and 96.80% (242 / 250) exact match accuracy respectively.
* Observation: Across the 2,469 ground-truth zero-vote cells (`gt = 0`, often written as `0`, `00`, `-`, or left blank on Form EC8A), `Qwen2.5-VL-7B-Instruct` correctly output `0` in 2,467 cases (99.92% zero-cell specificity), hallucinating a non-zero number on only 2 cells across the entire 250-sheet corpus (both on `ADP`).
* Observation: The single largest error category (29 out of 46 errors, 63.04%) was **Sparse-Row Small-Digit Omission**, where a minor party (`AA` with 13 errors, `AAC` with 5 errors, `ADC` with 4 errors) had a single small handwritten digit (`1`, `2`, `3`, or `4`) surrounded by zero-vote rows, and the VLM defaulted to `0`.
* Observation: The second major error category in vote magnitude (5 out of 46 errors, 10.87%) was **Grid-Line Leading-Digit Truncation**, where a 3-digit tally starting with `1` had its vertical stroke written directly on top of the left vertical border of the Form EC8A score box, causing an exact `-100` vote drop: `141` read as `41` (`29/01/01/003`), `191` read as `91` (`29/01/06/002`), `198` read as `98` (`29/03/05/017`), `124` read as `24` (`29/03/07/001`), and `113` read as `13` (`29/03/08/001`).
* Observation: Enforcing the Electoral Act Section 64(4) Collation Sum Invariant ($\sum \hat{v}_p = \hat{V}_{\text{valid}}$) automatically flagged 41 unbalanced sheets (16.40% of sheets, while 209 sheets or 83.60% were balanced) and intercepted **44 out of the 46 party cell errors (95.65% error detection rate)** without any human ground truth.
* Observation: The only 2 errors (4.35%) that bypassed the Section 64(4) sum gate occurred on a single polling unit (`29/01/07/001`, `L.A. PRY. SCHOOL ONIGBOGI` in `ATAKUMOSA EAST`), where the physical Form EC8A sheet had been manually altered with a ballpoint pen (biro): an official overwrote the printed `ADP` acronym on row 5 into `APC` and overwrote the printed `APC` acronym on row 6 into `ADP`, reversing the canonical ballot order and writing `=60=` (`SIXTY`) on row 5 alongside the `APC` party agent signature (`JULIUS ADEREMI`). Because `Qwen2.5-VL-7B-Instruct` relied on its canonical positional prior (assuming row 5 is always `ADP` and row 6 is always `APC`) rather than trusting the hand-altered biro acronyms, it assigned `60` votes to `ADP` and `0` to `APC`, leaving the column sum invariant unchanged ($60 + 0 = 0 + 60 = 60$, total valid votes $170$).
* Observation: Under a literal reading of Electoral Act Section 51(2) ($\hat{V}_{\text{cast}} > \hat{A}_{\text{BVAS}}$), 58 out of 250 polling units (23.20% `Sec51 Flagged (%)`: 17 in `ATAKUMOSA EAST`, 14 in `ATAKUMOSA WEST`, and 27 in `AYEDAADE`) triggered an automatic over-voting cancellation alert.
* Observation: Applying our Two-Tier Section 51(2) Clerical-Slip Disentanglement Solver revealed that **38 out of the 58 flagged sheets (65.52% of all Section 51 alerts)** were **Class I Benign Clerical Slips**, leaving only **20 sheets (8.00% of the 250 polling units)** as **Class II Unresolved Over-Voting Anomalies**.
* Observation: A concrete forensic case study of Class I Benign Clerical Slip is Polling Unit `29/01/01/002` (`UNITY PRY. SCHOOL, IWARA` in `ATAKUMOSA EAST`): the 15 candidate vote tallies (`A`: 152, `APC`: 82, `ADC`: 8, `AA`: 5, `ZLP`: 2, `APGA`: 1, `APM`: 1, `YPP`: 1) summed to `252` (`Valid Votes` = 252), and adding `3` `Rejected Ballots` yielded `255` physical ballots cast in the ballot box, matching the `255` `BVAS Accredited Voters` ($255 \le 255$). However, the Presiding Officer wrote `261` in the "Total Ballot Papers Used" header due to a booklet serial-number subtraction slip ($261 > 255$), demonstrating that naive single-field over-voting checks would wrongly cancel 252 valid democratic votes.
