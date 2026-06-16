# WiVViW Document Inventory — 2026-06-10

Migration executed from `FOLD ASSESS/` and `DOC ASSESS/` into repo taxonomy.
Desktop `GALAXY_PLATFORM/Raw_Inputs/NotebookLM/` scanned for gap items (copy-in only).

## Disk space (pre-flight)

| Volume | Size | Used | Avail | Capacity |
|--------|------|------|-------|----------|
| `/System/Volumes/Data` | 460Gi | 420Gi | **3.3Gi** | **100%** |

**Blocker note:** Disk is critically full. Migration used **moves** (not copies) within the repo to avoid duplication. Five Desktop Part files were copied (~34KB total). Free space before large imports.

## Summary counts

| Action | Count |
|--------|------:|
| MOVED | 25 |
| COPIED (Desktop → repo) | 5 |
| DEDUPED | 9 |
| SKIPPED | 2 |
| KEPT_IN_PLACE (already canonical) | 2 |

## Canon MD5 checksums (`00_CANON/`)

| File | MD5 |
|------|-----|
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt` | `6a37ccf0efc112451c40632b2e45f4cf` |
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19_PART_1.txt` | `46e6a1d69b27038542d525da49a7a705` |
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19_PART_2.txt` | `4f0d05750a2a3d0fb35ea255429d02f9` |
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.json` | `e679407043c90f5b225a978b5f7c4441` |
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.pdf` | `1d1e5260e10b772c554bb24afb4551e5` |
| `WIVVIW_OPERATIONAL_BIBLE_v4.0_FINAL.md` | `83091780fddafd924a3ae98b3adf646f` |
| `WiVViW-MANUAL.md` | `534bee0c79951c7c704f987131fdc022` |

Dedup verified: `WiVViW:_canon:` json matched FOLD canon json (`e6794070…`). DOC ASSESS bible txt matched `_canon:` full txt (`6a37ccf0…`).

---

## FOLD ASSESS routing

| Source | Destination | Action | Reason |
|--------|-------------|--------|--------|
| `WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19/` | `00_CANON/` | MOVED | Richest canon: parts + pdf + json |
| `WiVViW:_canon:/…bible.txt` | `00_CANON/…bible.txt` | MOVED | Full unified txt (not in parts bundle) |
| `WiVViW:_canon:/…json,.pdf` | `00_CANON/` (existing) | DEDUPED | Identical MD5 to FOLD canon bundle |
| `WiVViW:_canon:/` | (removed) | DEDUPED | Folder emptied after dedupe |
| `BRANDLE_OS_v2.5 XXXX…/` | `01_RAW_INPUTS/brandle_os_v2.5/` | MOVED | Raw implementation packs v2.4 + v2.5 |
| `WiVViW_Brandle/` | `01_RAW_INPUTS/wivviw_brandle/` | MOVED | Brand source tree (Docs, Source, Assets) |
| `WiVViW — BUSINESS PLATFORM/` | `05_BUSINESS/platform/` | MOVED | Business decks, OP docs, pitch materials |
| `WiVViW_Cursor_BuildPack_v0.2/` | `06_BUILD/cursor_buildpack/` | MOVED | Cursor build pack + wivviw-ui scaffold |
| `wivviw-interview/` | `06_BUILD/interview/wivviw-interview/` | MOVED | Interview component (node_modules stripped) |
| `wivviw-ui/` | `08_ARCHIVE/deduped_staging/wivviw-ui_standalone` | DEDUPED | Duplicate of BuildPack `02_APP_SCAFFOLD/wivviw-ui` |
| `wivviw-ai-interview/` | `08_ARCHIVE/deduped_staging/wivviw-ai-interview_stub` | SKIPPED | Empty stub (index.html only) |
| `WiVViW_Brandle:Source:…Compass…bundle/` | `08_ARCHIVE/deduped_staging/compass_bundle_fold` | DEDUPED | Compass already in wivviw_brandle + DOC dedup |
| `WiVViW_CONSOLIDATED_20260407/` | `08_ARCHIVE/consolidated_snapshots/` | MOVED | Redundant multi-source snapshot (~158MB) |

**FOLD ASSESS post-state:** Only `README_STAGING_POINTER.md` remains. Safe to delete folder.

---

## DOC ASSESS routing

| Source | Destination | Action | Reason |
|--------|-------------|--------|--------|
| `WIVVIW_OPERATIONAL_BIBLE_v4.0_FINAL.md` | `00_CANON/` | MOVED | Operational canon |
| `WiVViW-MANUAL.md` | `00_CANON/` | MOVED | Build manual |
| `WiVViW_Canonical_Unified_Bible…copy.txt` | — | DEDUPED | Exact duplicate — deleted |
| `WiVViW_Canonical_Unified_Bible…txt` | `00_CANON/` (existing) | DEDUPED | MD5 match — deleted from staging |
| `WiVViW_Brand_Intelligence_OS_Compass…` (×2) | wivviw_brandle bundle | DEDUPED | In FOLD Brandle tree |
| `BRANDLE OS…MASTER SPECIFICATION v2…md` | `01_RAW_INPUTS/notebooklm_rounds/` | MOVED | NotebookLM extraction |
| `WiVViW_ The Seven-Engine…` (×2) | `01_RAW_INPUTS/notebooklm_rounds/` | MOVED | Seven-engine source docs |
| `wivviw-landing.txt` | `01_RAW_INPUTS/notebooklm_rounds/` | MOVED | Landing copy source |
| `x WiVViW (community app build).md` | `01_RAW_INPUTS/notebooklm_rounds/` | MOVED | Community build notes |
| `WiVViW-Architecture-Eunoia-Output.md` | `02_CONSOLIDATED_REPORTS/architecture/` | MOVED | Architecture consolidation |
| `WiVViW-Stack-Elevation-Audit.md` | `02_CONSOLIDATED_REPORTS/architecture/` | MOVED | Stack audit |
| `WiVViW_Enhancement_Report_v5.md` | `02_CONSOLIDATED_REPORTS/final_master_reports/` | MOVED | Enhancement report |
| `WiVViW Brand Intelligence Zero-Loss Forensic Audit…` (×3) | `02_CONSOLIDATED_REPORTS/forensic_audits/` | MOVED | Forensic audit set |
| `WiVViW_NextGalaxy_Dashboard.jsx` | `06_BUILD/ui_shell/` | MOVED | UI reference (not src/) |
| `WivviwLogo.tsx` | `06_BUILD/ui_shell/` | MOVED | Logo reference (not src/) |

**DOC ASSESS post-state:** Only `README_STAGING_POINTER.md` remains. Safe to delete folder.

---

## Desktop GALAXY_PLATFORM gap copy-in

| Source (read-only) | Destination | Action |
|--------------------|-------------|--------|
| `~/Desktop/GALAXY_PLATFORM/Raw_Inputs/NotebookLM/Part 1 of 5 — BRANDLE OS_ THE MASTER ARCHITECTURE.md` | `01_RAW_INPUTS/galaxy_notebooklm/parts/` | COPIED |
| `…/Part 2 of 5.md` | same | COPIED |
| `…/Part 3 of 5.md` | same | COPIED |
| `…/Part 4 of 5.md` | same | COPIED |
| `…/Part 5 of 5.md` | same | COPIED |

---

## Already canonical (not duplicated)

| Path | Role |
|------|------|
| `docs/braintrust/brand/brand_master_01.md` | ENGRAMAESTRO zero-loss consolidation (live braintrust) |
| `docs/PROJECT-CONTEXT.md` | App stack, METHOD MOIRAI, engine map for Cursor |

---

## GAP LIST (brand_master / forensic audit)

Items flagged as missing or ghost in source materials:

| Item | Found? | Path if found | Notes |
|------|--------|---------------|-------|
| Part 1 of 5 … Part 5 of 5 (NotebookLM) | **Y** | `01_RAW_INPUTS/galaxy_notebooklm/parts/` | Copied from Desktop 2026-06-10 |
| `BRANDLE_OS_MasterReleasePack_v1.1.json` | **Y** | `01_RAW_INPUTS/brandle_os_v2.5/…/BRANDLE_OS_OutputsOnly_v2.4/` (+ v2.5 zip unpack) | Also in archived consolidated snapshot |
| Ultimate Brand Bible (~5000 words, Artifact A32) | **N** | — | Ghost header in index; body never uploaded |
| 4IELD God Mode upgrade specs (Artifact A01) | **N** | — | Marked `[NOT PRESENT IN TEXT]` in audits |
| Engine Vault Artifacts A11–A25 | **N** | — | Indexed but payloads blank |
| 4TRESS full system design (truncated source) | **Partial** | `01_RAW_INPUTS/brandle_os_v2.5/` Part packs | May be incomplete per audit |
| 3:AM ARCHIVE codebase blocks | **N** | — | SAFETY WARNING stubs only |
| Rizzuals+ iOS/Android skeletons | **N** | — | Truncated / absent in sources |
| WiVViW_Brandle Downloads extras | **N** | — | Downloads has `WiVViW DECK.png` only; no Brandle tree |

---

## Taxonomy verification (post-migration)

### `00_CANON/` (7 docs + .DS_Store)

- Unified Bible: txt, PART_1, PART_2, json, pdf
- Operational Bible v4.0
- WiVViW-MANUAL

### `01_RAW_INPUTS/` (~357 files)

- `brandle_os_v2.5/` — full BRANDLE OS v2.4/v2.5 packs
- `wivviw_brandle/` — WiVViW_Brandle source tree
- `notebooklm_rounds/` — 5 routed DOC ASSESS extracts
- `galaxy_notebooklm/parts/` — Part 1–5 from Desktop

### `02_CONSOLIDATED_REPORTS/` (8 files)

- `architecture/` — Eunoia output, Stack elevation audit
- `forensic_audits/` — 3 zero-loss forensic reports
- `final_master_reports/` — Enhancement Report v5

### `05_BUSINESS/platform/`

- `WiVViW — BUSINESS PLATFORM/` — 98 items (decks, OP series, collective parts)

### `06_BUILD/`

- `cursor_buildpack/WiVViW_Cursor_BuildPack_v0.2/` — canon stub, docs, wivviw-ui scaffold
- `interview/wivviw-interview/` — Vite interview app
- `ui_shell/` — NextGalaxy Dashboard.jsx, WivviwLogo.tsx

### `08_ARCHIVE/`

- `consolidated_snapshots/WiVViW_CONSOLIDATED_20260407/`
- `deduped_staging/` — wivviw-ui standalone, ai-interview stub, compass bundle

---

## Recommended next step

1. **Design approval** — Review `06_BUILD/ui_shell/WiVViW_NextGalaxy_Dashboard.jsx` + `WivviwLogo.tsx` against `00_CANON` design tokens.
2. **UI shell implementation** — Port approved shell into `src/` using BuildPack scaffold (`06_BUILD/cursor_buildpack/…/wivviw-ui`) as reference only.
3. **Free disk space** — Clear ≥10GB before importing additional Desktop archives.
4. **Delete staging folders** — Remove empty `FOLD ASSESS/` and `DOC ASSESS/` after owner confirms inventory.

---

*Generated: 2026-06-10. Script: `scripts/migrate_inventory_2026-06-10.sh`*
