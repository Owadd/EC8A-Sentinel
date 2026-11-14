## §1 · Core Claim and Narrative
_Written by: outline-agent, Step 1_

**Core claim:** An open-weight 7B Vision-Language Model (`Qwen2.5-VL-7B-Instruct`) quantized to 4-bit (`NF4`) on a single free-tier cloud T4 GPU achieves $98.77\%$ exact handwritten vote extraction across 250 authentic Nigerian Form EC8A election result sheets (3,750 party cells), while our deterministic Two-Tier Statutory Reconciliation Engine automatically intercepts $95.65\%$ of residual OCR errors via Electoral Act Section 64(4) and rescues $65.52\%$ of Section 51(2) over-voting flags as benign Presiding Officer clerical slips.

**Narrative tension:** African election portals (Nigeria's INEC IReV and Kenya's IEBC portal) publish hundreds of thousands of smartphone-photographed handwritten result sheets, yet traditional OCR collapses under camera skew and grid lines, commercial VLMs hallucinate on faint ink and cost thousands of dollars in API fees, and naive single-field Section 51(2) over-voting checks conflate harmless Presiding Officer subtraction errors with ballot stuffing.

**Key novelty framing:** First large-scale empirical benchmark (**Osun-EC8A-250**, 3,750 handwritten party cells) evaluating 4-bit dynamic-resolution open-weight VLM extraction paired with a Two-Tier Statutory Mathematical Solver that jointly verifies model extraction fidelity (Section 64(4)) and disentangles clerical slips from genuine over-voting (Section 51(2)).

**Outline decisions:**
- Plotting plan: 4 figures (`fig_framework_overview`, `fig_benchmark_comparison`, `fig_party_and_error_taxonomy`, `fig_statutory_reconciliation`)
- Related Work clusters: 3 clusters (Handwritten Form/Table VLMs, Physical Camera Degradations, Computational Election Auditing in Africa)
- Section structure: Methodology (3 subsections), Experiments (4 subsections), Conclusion (2 subsections)

**Potential weaknesses flagged at outline stage:**
- Adjacent-row vertical transposition (2 out of 46 errors, on sheet `29/01/07/001` where 60 votes shifted from `APC` to `ADP`) preserves the column sum and therefore bypasses a numeric-only Section 64(4) check; must be explicitly analyzed and used to motivate figure-vs-word cross-verification.


## §2 · Literature Landscape
_Written by: literature-review-agent, Step 3_

**What the literature says about the core claim:** Prior work confirms a steep accuracy cliff from isolated laboratory digits (99.00% on MNIST) to real electoral tally boxes (66.55%–89.32% in Gondere et al., 2016) and degraded handwritten tables (52.41%–60.44% Table TEDS on WildHandBench, Zhang et al., 2026), where 63.28%–90.80% of VLM errors are prior-driven hallucinations. Field deployments in Kenya (Kimani, 2022) and Nigeria (Uwakwe, 2026; Young, 2026) show that unverified OCR tail errors corrupt aggregate tallies unless paired with deterministic mathematical invariants.

**Strongest prior work (must address in the paper):**
- `zhang2026wildhandbench`: Establishes the SOTA MLLM table accuracy ceiling (60.44% Gemini 3.1 Pro, 53.63% Gemini 3.5 Flash) and Prior-Driven Error (PDE) metric on wild handwritten tables.
- `zhou2026real5omnidocbench`: Quantifies physical camera capture degradation (skew, warping/folds, shadows) across 6,775 real photos.
- `gondere2016election`: Foundational IEEE IAPR DAS benchmark on 64,596 real electoral tally sheet digits (66.55% unadapted, 89.32% retrained).
- `kimani2022using`: Closest African election deployment (46,229 Kenyan Form 34A sheets using YOLOv5 + AWS Textract at 97.00% accuracy with 3.00% catastrophic concatenation tail).

**Gaps confirmed by the literature:**
1. No open-weight zero-cost VLM benchmark exists on authentic Nigerian INEC Form EC8A camera uploads from IReV.
2. Prior statutory solvers apply a naive literal Section 51(2) check (`Total Cast > Accredited`), failing to disentangle Presiding Officer booklet subtraction slips from real over-voting.

**Baseline comparisons — verification status:**
| Baseline | In citation_pool? | Confidence tier |
|---|---|---|
| `gondere2016election` (MNIST-ICR / BiLSTM) | Yes | High (DOI verified) |
| `zhang2026wildhandbench` (WildHandBench) | Yes | High (arXiv verified) |
| `zhou2026real5omnidocbench` (Real5-OmniDocBench) | Yes | High (ECCV/arXiv verified) |
| `koncile2025ocr` (Koncile Medical Forms) | Yes | High (Benchmark verified) |
| `kimani2022using` (Kenya Form 34A) | Yes | High (Field report verified) |

**Related Work cluster coverage:**
| Cluster | Papers found | Notes |
|---|---|---|
| 2.1 Handwritten Form & Table VLMs | 9 | Covers MNIST, IAM, TrOCR, OmniDocBench, OCRBench v2, olmOCR, WildHandBench, Qwen2.5-VL, QLoRA |
| 2.2 Physical Camera Degradations | 5 | Covers Real5-OmniDocBench, ICIE Shadow/CLAHE, Multi-domain OCR, NaViT |
| 2.3 Computational Election Auditing in Africa | 6 | Covers Kenya Form 34A, Nigeria IReV Veza Investigation, Mundx, IReV-Sentinel Pro, ScanForm Malawi, Electoral Act 2022 |

**Anything the section-writing agent should know:** All 20/20 papers in `citation_pool.json` (100% coverage, exceeding the 90% minimum threshold of 18) are integrated into `intro_relwork.tex`. Preserve `intro_relwork.tex` verbatim and use the exact keys from `refs.bib` in Methodology, Experiments, and Conclusion.
