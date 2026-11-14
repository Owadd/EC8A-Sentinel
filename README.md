# EC8A-Sentinel & Osun-EC8A-250: Auditing African Election Integrity at the Edge

**An Open-Weight Forensic Vision AI Benchmark and Two-Tier Statutory Reconciliation Engine on 250 Nigerian Form EC8A Polling-Unit Result Sheets**

**Author:** Owadokun Oluwatobi Ezekiel  
[![Research Paper (PDF)](https://img.shields.io/badge/Paper-PDF_Manuscript-b91c1c)](output/EC8A_Sentinel_Research_Paper.pdf)
[![Benchmark](https://img.shields.io/badge/Benchmark-Osun--EC8A--250_(3%2C750_Cells)-1d4ed8)](#dataset-and-benchmark-overview)
[![Model](https://img.shields.io/badge/Model-Qwen2.5--VL--7B--NF4_(%240_API)-0284c7)](#key-findings)
[![Verification Gates](https://img.shields.io/badge/Verification_Gates-9%2F9_PASS-15803d)](#verification-and-reproducibility)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Quick Links:** [Read the Full Paper (PDF)](output/EC8A_Sentinel_Research_Paper.pdf) | [Inspect the 250-Sheet Interactive Explorer](results_explorer.html) | [Open the Colab GPU Notebook](qwen_ec8a_audit.ipynb)

---

## Overview

In Nigerian elections, once ballots are sorted and counted at a polling unit, the Presiding Officer records biometric voter accreditation counts (`BVAS`), ballot accounting summaries, and handwritten vote scores for each political party on the ballot ($K$ parties configured per election; $K = 15$ on the Osun State Governorship ballot) in ballpoint pen (biro) onto **INEC Form EC8A**, then photographs the sheet directly with the BVAS device camera for upload to the **INEC Result Viewing Portal (IReV)**.

**EC8A-Sentinel** pairs an open-weight, 4-bit NormalFloat (`NF4`) quantized Vision-Language Model (`Qwen/Qwen2.5-VL-7B-Instruct`) running on a single free-tier Google Colab NVIDIA T4 GPU (`$0.00` API cost) with a deterministic **Two-Tier Statutory Mathematical Reconciliation Engine** grounded in **Sections 51(2) and 64(4) of Nigeria's Electoral Act 2022**.

---

## Key Findings

Evaluated across **250 authentic Form EC8A camera photos** from three Local Government Areas in Osun State (`ATAKUMOSA EAST`, `ATAKUMOSA WEST`, and `AYEDAADE`), covering **3,750 handwritten party vote cells** (`60,625` verified votes) and **1,000 header accounting fields**:

| Metric | Result | Details |
| :--- | :--- | :--- |
| **Field-Level Exact Match** | **98.77%** | `3,704 / 3,750` handwritten party vote cells matched human ground truth |
| **Hallucination / Error Rate** | **1.23%** | Only `46` misread cells across all 250 camera-captured sheets |
| **Refusal Rate** | **0.00%** | `0` refusals across 3,750 party cells |
| **Flawless Sheets (15/15 Exact)** | **88.80%** | `222 / 250` polling units extracted with zero errors across all 15 parties |
| **Zero-Vote Cell Specificity** | **99.92%** | `2,467 / 2,469` zero/blank/dash cells accurately read as `0` |
| **Tier-1 Sec 64(4) Error Interception** | **95.65%** | `44 / 46` VLM reading errors caught autonomously without ground truth |
| **Tier-2 Sec 51(2) Clerical Slips Saved** | **65.52%** | `38 / 58` raw over-voting alerts proven to be benign Presiding Officer clerical slips |

### Forensic Discoveries
- **Zero-Sum Biro Party-Label Alteration (`PU 29/01/07/001`):** Only 2 out of 46 VLM errors escaped the Section 64(4) Collation Sum Gate, both on one sheet where `ADP` and `APC` party labels were manually overwritten backwards in blue biro (`60` votes shifted while the total stayed `170`).
- **Clerical Slip vs. True Over-Voting (`PU 29/01/01/002`, Unity Pry. School, Iwara):** Valid votes (`252`) plus rejected ballots (`3`) equal `255` physical ballots cast, matching BVAS accreditation (`255 <= 255`), proving the higher `261` header figure in "Total Number of Used Ballot Papers" was a clerical slip rather than over-voting.

---

## Dataset and Benchmark Overview

- **Benchmark Name:** `Osun-EC8A-250` (`250` uncropped 3 to 4 MB Form EC8A photos; `3,750` candidate vote cells; `1,000` administrative fields)
- **LGAs Covered:** `ATAKUMOSA EAST` (`75` sheets), `ATAKUMOSA WEST` (`75` sheets), `AYEDAADE` (`100` sheets)
- **Hardware & Cost:** Single free Google Colab NVIDIA T4 GPU (16 GB VRAM), ~5.8 GB model footprint in 4-bit `NF4`, average `62.97s` per sheet, **`$0.00` API cost**

---

## Repository Structure

```text
EC8A-Sentinel/
├── output/
│   ├── EC8A_Sentinel_Research_Paper.pdf    # Compiled 2-column academic research paper (PDF)
│   └── EC8A_Sentinel_Research_Paper.html   # Standalone interactive/print edition with SVG charts
├── workspace/                              # Complete manuscript build & verification workspace
│   ├── inputs/                             # idea.md, experimental_log.md, template.tex
│   ├── drafts/                             # intro_relwork.tex, paper.tex
│   ├── figures/                            # 300-DPI charts & captions.json
│   ├── final/                              # Promoted paper.tex & paper.pdf
│   ├── citation_pool.json & refs.bib       # 20 verified literature references (0 orphans)
│   ├── claim_evidence_report.json          # Deterministic claim-to-evidence verification report
│   └── provenance.json                     # SHA-256 hashes & 9/9 PASS gate audit log
├── results/
│   ├── qwen_ec8a_final_results.json        # Full 250-sheet VLM + statutory audit output
│   ├── qwen_ec8a_final_results.csv         # Tabular CSV export of all 250 polling units
│   └── paper_summary_stats.json            # Aggregated per-party, LGA, and error taxonomy metrics
├── dataset/                                # Field Form EC8A images & manifest
├── qwen_ec8a_audit.ipynb                   # Google Colab T4 GPU inference notebook
├── results_explorer.html                   # Interactive Polling Unit Inspector UI
├── compute_paper_stats.js                  # Recomputes benchmark summary tables from raw JSON
├── run_po_pipeline.js                      # Deterministic manuscript & claim-evidence gate runner
├── build_paper_pdf.js                      # Academic PDF & HTML compiler
├── CITATION.cff                            # GitHub & Zenodo citation metadata
└── LICENSE                                 # MIT License
```

---

## Verification and Reproducibility

All manuscript claims and citations are verified deterministically via `node run_po_pipeline.js` (`9/9 PASS`):
- `validate_inputs`: **PASS**
- `check_idea_density`: **PASS** (`930` words in `idea.md`, `5` raw tables, `579` numeric values, Jaccard `0.343`)
- `validate_outline`: **PASS** (`4` figures, `3` related-work clusters, `3` core sections)
- `figure_lint`: **PASS** (`4/4` 300-DPI figures matched to captions and `\includegraphics`)
- `citation_coverage`: **PASS** (`20/20 = 100%` verified pool cited in Introduction & Related Work)
- `orphan_cite_gate`: **PASS** (`0` orphan citations; all `20` `\cite{}` keys verified in `refs.bib`)
- `latex_sanity`: **PASS** (`braceDelta = 0`, `0` environment mismatches)
- `anti_leakage_check`: **PASS** (`0` template/double-blind leaks)
- `claim_evidence_gate`: **PASS** (`96` quantitative claims audited, `0` unsupported numeric claims)

To rebuild stats, run the verification gates, and recompile the PDF locally:

```bash
node compute_paper_stats.js
node run_po_pipeline.js
node build_paper_pdf.js
```

---

## Citation

If you use `EC8A-Sentinel` or `Osun-EC8A-250` in your research, please cite this work using [CITATION.cff](CITATION.cff):

```bibtex
@software{owadokun2026ec8asentinel,
  author  = {Owadokun, Oluwatobi Ezekiel},
  title   = {Auditing African Election Integrity at the Edge: A 250-Polling-Unit Forensic Vision AI Benchmark and Statutory Reconciliation Engine on Nigerian Form EC8A Result Sheets},
  year    = {2026},
  version = {1.0.0},
  license = {MIT},
  url     = {https://github.com/Owadd/EC8A-Sentinel}
}
```
