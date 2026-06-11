#!/usr/bin/env bash
# WiVViW document inventory migration — 2026-06-10
# Moves/routes assess folders into repo taxonomy. No src/ changes.
set -euo pipefail

REPO="/Users/oraclevision/Developer/applications/WiVViW"
FOLD="$REPO/FOLD ASSESS"
DOC="$REPO/DOC ASSESS"
MANIFEST="$REPO/08_ARCHIVE/INVENTORY_2026-06-10.md"
DESKTOP_NBLM="$HOME/Desktop/GALAXY_PLATFORM/Raw_Inputs/NotebookLM"

MOVED=0
DEDUPED=0
SKIPPED=0
COPIED=0

log_action() {
  echo "$1|$2|$3" >> "$REPO/08_ARCHIVE/_inventory_actions.tmp"
}

mkdir -p \
  "$REPO/00_CANON" \
  "$REPO/01_RAW_INPUTS/brandle_os_v2.5" \
  "$REPO/01_RAW_INPUTS/wivviw_brandle" \
  "$REPO/01_RAW_INPUTS/notebooklm_rounds" \
  "$REPO/01_RAW_INPUTS/galaxy_notebooklm/parts" \
  "$REPO/02_CONSOLIDATED_REPORTS/forensic_audits" \
  "$REPO/02_CONSOLIDATED_REPORTS/architecture" \
  "$REPO/02_CONSOLIDATED_REPORTS/final_master_reports" \
  "$REPO/05_BUSINESS/platform" \
  "$REPO/06_BUILD/cursor_buildpack" \
  "$REPO/06_BUILD/interview" \
  "$REPO/06_BUILD/ui_shell" \
  "$REPO/08_ARCHIVE/consolidated_snapshots" \
  "$REPO/08_ARCHIVE/deduped_staging" \
  "$REPO/08_ARCHIVE/superseded_assess"

: > "$REPO/08_ARCHIVE/_inventory_actions.tmp"

# --- 00_CANON: richest bible bundle (parts + pdf + json) ---
CANON_SRC="$FOLD/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19"
if [[ -d "$CANON_SRC" ]]; then
  for f in "$CANON_SRC"/*; do
    [[ -e "$f" ]] || continue
    base=$(basename "$f")
    if [[ "$base" == *" copy.txt" ]]; then
      rm -f "$f"
      log_action "$f" "(deleted)" "DEDUPED"
      DEDUPED=$((DEDUPED + 1))
      continue
    fi
    mv "$f" "$REPO/00_CANON/$base"
    log_action "$f" "$REPO/00_CANON/$base" "MOVED"
    MOVED=$((MOVED + 1))
  done
  rmdir "$CANON_SRC" 2>/dev/null || true
fi

# Full bible txt from WiVViW:_canon: (not in parts bundle)
CANON_COLON="$FOLD/WiVViW:_canon:"
if [[ -f "$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" ]]; then
  dest="$REPO/00_CANON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt"
  if [[ ! -f "$dest" ]]; then
    mv "$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" "$dest"
    log_action "$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" "$dest" "MOVED"
    MOVED=$((MOVED + 1))
  else
    rm -f "$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt"
    log_action "$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" "$dest" "DEDUPED"
    DEDUPED=$((DEDUPED + 1))
  fi
fi
# Dedup json/pdf from _canon: (already in 00_CANON from richer bundle)
for dup in json pdf; do
  f="$CANON_COLON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.$dup"
  if [[ -f "$f" ]]; then
    rm -f "$f"
    log_action "$f" "$REPO/00_CANON/$(basename "$f")" "DEDUPED"
    DEDUPED=$((DEDUPED + 1))
  fi
done
if [[ -d "$CANON_COLON" ]] && [[ -z "$(ls -A "$CANON_COLON" 2>/dev/null)" ]]; then
  rmdir "$CANON_COLON" 2>/dev/null || true
fi

# Operational bible + build manual from DOC ASSESS
for canon_doc in \
  "WIVVIW_OPERATIONAL_BIBLE_v4.0_FINAL.md" \
  "WiVViW-MANUAL.md"; do
  if [[ -f "$DOC/$canon_doc" ]]; then
    mv "$DOC/$canon_doc" "$REPO/00_CANON/$canon_doc"
    log_action "$DOC/$canon_doc" "$REPO/00_CANON/$canon_doc" "MOVED"
    MOVED=$((MOVED + 1))
  fi
done

# --- 01_RAW_INPUTS ---
BRANDLE_SRC="$FOLD/BRANDLE_OS_v2.5 XXXX (brandL I believe is now going to be wivviw)'"
if [[ -d "$BRANDLE_SRC" ]]; then
  mv "$BRANDLE_SRC" "$REPO/01_RAW_INPUTS/brandle_os_v2.5/"
  log_action "$BRANDLE_SRC" "$REPO/01_RAW_INPUTS/brandle_os_v2.5/" "MOVED"
  MOVED=$((MOVED + 1))
fi

if [[ -d "$FOLD/WiVViW_Brandle" ]]; then
  mv "$FOLD/WiVViW_Brandle" "$REPO/01_RAW_INPUTS/wivviw_brandle/"
  log_action "$FOLD/WiVViW_Brandle" "$REPO/01_RAW_INPUTS/wivviw_brandle/" "MOVED"
  MOVED=$((MOVED + 1))
fi

# DOC ASSESS → raw inputs / consolidated
route_doc_file() {
  local fname="$1"
  local dest_subdir="$2"
  if [[ -f "$DOC/$fname" ]]; then
    local dest_dir="$REPO/$dest_subdir"
    mv "$DOC/$fname" "$dest_dir/$fname"
    log_action "$DOC/$fname" "$dest_dir/$fname" "MOVED"
    MOVED=$((MOVED + 1))
  fi
}

route_doc_file "BRANDLE OS WIVVIW PLATFORM CONSOLIDATED MASTER SPECIFICATION v2 (notebookLM extracted).md" "01_RAW_INPUTS/notebooklm_rounds"
route_doc_file "WiVViW_ The Seven-Engine AI Business Operating System (extracted notebooklm).md" "01_RAW_INPUTS/notebooklm_rounds"
route_doc_file "WiVViW_ The Seven-Engine AI Business Operating System.md" "01_RAW_INPUTS/notebooklm_rounds"
route_doc_file "wivviw-landing.txt" "01_RAW_INPUTS/notebooklm_rounds"
route_doc_file "x WiVViW (community app build).md" "01_RAW_INPUTS/notebooklm_rounds"
route_doc_file "WiVViW-Architecture-Eunoia-Output.md" "02_CONSOLIDATED_REPORTS/architecture"
route_doc_file "WiVViW-Stack-Elevation-Audit.md" "02_CONSOLIDATED_REPORTS/architecture"
route_doc_file "WiVViW_Enhancement_Report_v5.md" "02_CONSOLIDATED_REPORTS/final_master_reports"

# Forensic audits
for f in "$DOC"/WiVViW\ Brand\ Intelligence\ Zero-Loss\ Forensic\ Audit*.md; do
  [[ -e "$f" ]] || continue
  base=$(basename "$f")
  mv "$f" "$REPO/02_CONSOLIDATED_REPORTS/forensic_audits/$base"
  log_action "$f" "$REPO/02_CONSOLIDATED_REPORTS/forensic_audits/$base" "MOVED"
  MOVED=$((MOVED + 1))
done

# Dedup DOC ASSESS canon + compass
if [[ -f "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19 copy.txt" ]]; then
  rm -f "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19 copy.txt"
  log_action "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19 copy.txt" "(deleted)" "DEDUPED"
  DEDUPED=$((DEDUPED + 1))
fi
if [[ -f "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" ]]; then
  rm -f "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt"
  log_action "$DOC/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" "$REPO/00_CANON/WiVViW_Canonical_Unified_Bible_v0.3_2026-02-19.txt" "DEDUPED"
  DEDUPED=$((DEDUPED + 1))
fi
for compass in \
  "WiVViW_Brand_Intelligence_OS_Compass_v1.1_2026-02-12.json.txt" \
  "WiVViW_Brand_Intelligence_OS_Compass_v1.1_2026-02-12.txt"; do
  if [[ -f "$DOC/$compass" ]]; then
    rm -f "$DOC/$compass"
    log_action "$DOC/$compass" "01_RAW_INPUTS/wivviw_brandle (FOLD bundle)" "DEDUPED"
    DEDUPED=$((DEDUPED + 1))
  fi
done

# --- 05_BUSINESS ---
if [[ -d "$FOLD/WiVViW — BUSINESS PLATFORM" ]]; then
  mv "$FOLD/WiVViW — BUSINESS PLATFORM" "$REPO/05_BUSINESS/platform/"
  log_action "$FOLD/WiVViW — BUSINESS PLATFORM" "$REPO/05_BUSINESS/platform/" "MOVED"
  MOVED=$((MOVED + 1))
fi

# --- 06_BUILD ---
if [[ -d "$FOLD/WiVViW_Cursor_BuildPack_v0.2" ]]; then
  mv "$FOLD/WiVViW_Cursor_BuildPack_v0.2" "$REPO/06_BUILD/cursor_buildpack/"
  log_action "$FOLD/WiVViW_Cursor_BuildPack_v0.2" "$REPO/06_BUILD/cursor_buildpack/" "MOVED"
  MOVED=$((MOVED + 1))
fi

if [[ -d "$FOLD/wivviw-interview" ]]; then
  # Exclude node_modules to save disk
  if [[ -d "$FOLD/wivviw-interview/node_modules" ]]; then
    rm -rf "$FOLD/wivviw-interview/node_modules"
    log_action "$FOLD/wivviw-interview/node_modules" "(deleted pre-move)" "SKIPPED"
    SKIPPED=$((SKIPPED + 1))
  fi
  mv "$FOLD/wivviw-interview" "$REPO/06_BUILD/interview/wivviw-interview"
  log_action "$FOLD/wivviw-interview" "$REPO/06_BUILD/interview/wivviw-interview" "MOVED"
  MOVED=$((MOVED + 1))
fi

for ui_file in "WiVViW_NextGalaxy_Dashboard.jsx" "WivviwLogo.tsx"; do
  if [[ -f "$DOC/$ui_file" ]]; then
    mv "$DOC/$ui_file" "$REPO/06_BUILD/ui_shell/$ui_file"
    log_action "$DOC/$ui_file" "$REPO/06_BUILD/ui_shell/$ui_file" "MOVED"
    MOVED=$((MOVED + 1))
  fi
done

# wivviw-ui dedup (inside BuildPack scaffold)
if [[ -d "$FOLD/wivviw-ui" ]]; then
  rm -rf "$FOLD/wivviw-ui/node_modules" 2>/dev/null || true
  mv "$FOLD/wivviw-ui" "$REPO/08_ARCHIVE/deduped_staging/wivviw-ui_standalone"
  log_action "$FOLD/wivviw-ui" "$REPO/06_BUILD/cursor_buildpack/.../wivviw-ui" "DEDUPED"
  DEDUPED=$((DEDUPED + 1))
fi

# wivviw-ai-interview empty stub
if [[ -d "$FOLD/wivviw-ai-interview" ]]; then
  rm -rf "$FOLD/wivviw-ai-interview/node_modules" 2>/dev/null || true
  mv "$FOLD/wivviw-ai-interview" "$REPO/08_ARCHIVE/deduped_staging/wivviw-ai-interview_stub"
  log_action "$FOLD/wivviw-ai-interview" "(stub archived)" "SKIPPED"
  SKIPPED=$((SKIPPED + 1))
fi

# Compass bundle dedup
COMPASS_BUNDLE="$FOLD/WiVViW_Brandle:Source:WiVViW_Brand_Intelligence_OS_Compass_v1.1_2026-02-12_bundle"
if [[ -d "$COMPASS_BUNDLE" ]]; then
  mv "$COMPASS_BUNDLE" "$REPO/08_ARCHIVE/deduped_staging/compass_bundle_fold"
  log_action "$COMPASS_BUNDLE" "01_RAW_INPUTS/wivviw_brandle + DOC dedup" "DEDUPED"
  DEDUPED=$((DEDUPED + 1))
fi

# --- 08_ARCHIVE consolidated snapshot ---
if [[ -d "$FOLD/WiVViW_CONSOLIDATED_20260407" ]]; then
  mv "$FOLD/WiVViW_CONSOLIDATED_20260407" "$REPO/08_ARCHIVE/consolidated_snapshots/"
  log_action "$FOLD/WiVViW_CONSOLIDATED_20260407" "$REPO/08_ARCHIVE/consolidated_snapshots/" "MOVED"
  MOVED=$((MOVED + 1))
fi

# --- Desktop GALAXY Part 1-5 copy (read-only source) ---
PART_FILES=(
  "Part 1 of 5 — BRANDLE OS_ THE MASTER ARCHITECTURE.md"
  "Part 2 of 5.md"
  "Part 3 of 5.md"
  "Part 4 of 5.md"
  "Part 5 of 5.md"
)
if [[ -d "$DESKTOP_NBLM" ]]; then
  for part in "${PART_FILES[@]}"; do
    src="$DESKTOP_NBLM/$part"
    if [[ -f "$src" ]]; then
      dest="$REPO/01_RAW_INPUTS/galaxy_notebooklm/parts/$part"
      if [[ ! -f "$dest" ]]; then
        cp -p "$src" "$dest"
        log_action "$src" "$dest" "COPIED"
        COPIED=$((COPIED + 1))
      else
        log_action "$src" "$dest" "ALREADY_PRESENT"
      fi
    fi
  done
fi

# Staging pointers
for staging in "$FOLD" "$DOC"; do
  if [[ -d "$staging" ]]; then
    cat > "$staging/README_STAGING_POINTER.md" << 'PTR'
# Staging folder — content migrated 2026-06-10

All unique content from this assess folder has been routed into the repo taxonomy.
See `08_ARCHIVE/INVENTORY_2026-06-10.md` and `docs/CANONICAL_SOURCES.md` for the manifest.

| Taxonomy | Purpose |
|----------|---------|
| `00_CANON/` | Authoritative bibles and build manuals |
| `01_RAW_INPUTS/` | Source exports, BRANDLE OS packs, NotebookLM rounds |
| `02_CONSOLIDATED_REPORTS/` | Audits, architecture reports, enhancement reports |
| `05_BUSINESS/` | Business platform docs and decks |
| `06_BUILD/` | Cursor build pack, UI shell references, interview scaffold |
| `08_ARCHIVE/` | Consolidated snapshots, deduped staging |

This folder may be deleted once you confirm the inventory.
PTR
  fi
done

echo "MIGRATION_COUNTS: MOVED=$MOVED DEDUPED=$DEDUPED SKIPPED=$SKIPPED COPIED=$COPIED"
