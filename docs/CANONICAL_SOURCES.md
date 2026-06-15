# Canonical Sources — WiVViW

Single page: what to read, what was deduped, what is still missing.
Last updated: 2026-06-14 (domain-branding reference + ethereal genesis spec).

---

## What to read

### Product & platform truth

| Need | Read |
|------|------|
| Master specification | `00_CANON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt` (+ PART_1/2, json, pdf) |
| How the business runs | `00_CANON/WIVVIW_OPERATIONAL_BIBLE_v4.0_FINAL.md` |
| How to build in Cursor | `00_CANON/WiVViW-MANUAL.md` |
| Zero-loss consolidated spec | `docs/braintrust/brand/brand_master_01.md` |
| Live app context | `docs/PROJECT-CONTEXT.md` |
| Ethereal Genesis UI spec (browse-first, domain intelligence) | `docs/superpowers/specs/2026-06-10-ethereal-genesis-design.md` |

### Architecture & audits

| Need | Read |
|------|------|
| Eunoia architecture output | `02_CONSOLIDATED_REPORTS/architecture/WiVViW-Architecture-Eunoia-Output.md` |
| Stack elevation audit | `02_CONSOLIDATED_REPORTS/architecture/WiVViW-Stack-Elevation-Audit.md` |
| Forensic zero-loss audits | `02_CONSOLIDATED_REPORTS/forensic_audits/` |
| Enhancement roadmap | `02_CONSOLIDATED_REPORTS/final_master_reports/WiVViW_Enhancement_Report_v5.md` |

### Raw inputs & legacy packs

| Need | Read |
|------|------|
| BRANDLE OS implementation packs | `01_RAW_INPUTS/brandle_os_v2.5/` |
| NotebookLM extractions | `01_RAW_INPUTS/notebooklm_rounds/` |
| Part 1–5 master architecture | `01_RAW_INPUTS/galaxy_notebooklm/parts/` |
| Brand source tree | `01_RAW_INPUTS/wivviw_brandle/` |
| Domain fusion, TLD bank, naming rubric | `01_RAW_INPUTS/domain-branding/Oracle-Vision_Extension-Menu_Domain-Branding-Reference.md` |
| Business decks & OP series | `05_BUSINESS/platform/WiVViW — BUSINESS PLATFORM/` |

### Build & UI (reference only — not production `src/`)

| Need | Read |
|------|------|
| Cursor build pack | `06_BUILD/cursor_buildpack/WiVViW_Cursor_BuildPack_v0.2/` |
| UI shell references | `06_BUILD/ui_shell/WiVViW_NextGalaxy_Dashboard.jsx`, `WivviwLogo.tsx` |
| wivviw-ui scaffold | `06_BUILD/cursor_buildpack/…/02_APP_SCAFFOLD/wivviw-ui/` |
| Interview component | `06_BUILD/interview/wivviw-interview/` |

---

## What was deduped (do not re-import)

| Item | Canonical location | Superseded / removed |
|------|-------------------|----------------------|
| Unified Bible txt | `00_CANON/…txt` | `DOC ASSESS` copy + `WiVViW:_canon:` duplicate |
| Unified Bible json/pdf | `00_CANON/` | `WiVViW:_canon:` identical MD5 |
| Compass bundle | `01_RAW_INPUTS/wivviw_brandle/` | DOC ASSESS compass txt/json; FOLD compass bundle → `08_ARCHIVE/deduped_staging/` |
| Standalone wivviw-ui | BuildPack scaffold | `FOLD ASSESS/wivviw-ui` → `08_ARCHIVE/deduped_staging/` |
| Consolidated 20260407 snapshot | `08_ARCHIVE/consolidated_snapshots/` | Duplicate of sources now in `01_RAW_INPUTS/` |
| wivviw-ai-interview | — | Empty stub; archived, not promoted |

Full manifest: `08_ARCHIVE/INVENTORY_2026-06-10.md`

---

## What is still missing

Per `brand_master_01.md` forensic gap audit — **not recoverable from uploaded sources**:

- Ultimate Brand Bible (~5000 words, Artifact A32)
- 4IELD God Mode upgrade specifications (Artifact A01)
- Engine Vault Artifacts A11–A25 (indexed, bodies blank)
- Complete 4TRESS system design (source truncated mid-sentence)
- 3:AM ARCHIVE codebase (SAFETY WARNING placeholders only)
- Rizzuals+ iOS / Android Compose skeletons

**Now found (were gaps before this migration):**

- Part 1 of 5 … Part 5 of 5 → `01_RAW_INPUTS/galaxy_notebooklm/parts/`
- `BRANDLE_OS_MasterReleasePack_v1.1` (json/txt/pdf) → `01_RAW_INPUTS/brandle_os_v2.5/`

---

## Staging folders

`FOLD ASSESS/` and `DOC ASSESS/` are empty except pointer READMEs.
All unique content has been routed. Safe to delete after you confirm the inventory.

---

## Next step

**Design approval → UI shell implementation**

1. Review `06_BUILD/ui_shell/` against canon design tokens (`00_CANON`, `brand_master_01`).
2. After approval, port shell into `src/` using BuildPack scaffold as reference.
3. Do not copy reference files into `src/` until design is signed off.
