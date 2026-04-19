#!/usr/bin/env bash
# Copy every WiVViW-related folder into ONE parent directory. Nothing is deleted from originals.
# Optionally list (and mirror) duplicate files by content hash inside the consolidated tree.
#
# Usage:
#   ./scripts/consolidate-wivviw.sh                    # dry-run: show what would be copied
#   ./scripts/consolidate-wivviw.sh --run              # actually copy
#   ./scripts/consolidate-wivviw.sh --run --mirror-dupes
#   DEST="$HOME/Documents/WiVViW_ALL_20260407" ./scripts/consolidate-wivviw.sh --run
#
# Default DEST: ~/Documents/WiVViW_CONSOLIDATED_<today's date>
#
# Rsync skips heavy dirs (node_modules, .next, .git) unless FULL_COPY=1

set -euo pipefail

DRY_RUN=1
MIRROR_DUPES=0
FULL_COPY="${FULL_COPY:-0}"

for arg in "$@"; do
  case "$arg" in
    --run) DRY_RUN=0 ;;
    --mirror-dupes) MIRROR_DUPES=1 ;;
    -h|--help)
      head -20 "$0" | tail -18
      exit 0
      ;;
  esac
done

DATE=$(date +%Y%m%d)
DEST="${DEST:-${HOME}/Documents/WiVViW_CONSOLIDATED_${DATE}}"

: "${SEARCH_ROOTS:=${HOME}/Documents ${HOME}/Desktop ${HOME}/Downloads}}"

RSYNC_OPTS=( -a )
if [[ "$FULL_COPY" != "1" ]]; then
  RSYNC_OPTS+=( --exclude node_modules --exclude .next --exclude .git --exclude dist --exclude build )
fi

echo "Destination: $DEST"
echo "Mode: $([[ "$DRY_RUN" -eq 1 ]] && echo DRY-RUN || echo COPY)"
echo "Mirror duplicate file copies: $MIRROR_DUPES"
echo ""

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

for root in $SEARCH_ROOTS; do
  [[ -d "$root" ]] || continue
  find "$root" -iname '*wivviw*' -type d 2>/dev/null >>"$TMP" || true
done

sort -u "$TMP" -o "$TMP"

# Drop DEST if it sits under a search root (avoid copying into self)
if [[ -d "$DEST" ]]; then
  grep -F -v "$DEST" "$TMP" >"${TMP}.2" || true
  mv "${TMP}.2" "$TMP"
fi

n=0
while IFS= read -r src; do
  [[ -d "$src" ]] || continue
  n=$((n + 1))
  slug=$(echo "$src" | sed 's|^/||g' | tr '/:' '__' | tr -c 'A-Za-z0-9._-' '_' | cut -c1-120)
  target="${DEST}/SOURCES/$(printf '%02d' "$n")_${slug}"
  echo "[$n] $src"
  echo "    -> $target"
  if [[ "$DRY_RUN" -eq 0 ]]; then
    mkdir -p "$target"
    rsync "${RSYNC_OPTS[@]}" "$src/" "$target/"
  fi
done <"$TMP"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo ""
  echo "Dry-run only. Re-run with --run to copy. Set FULL_COPY=1 to include node_modules/.git."
  exit 0
fi

echo ""
echo "Building duplicate report (by SHA-256 of file contents) under $DEST ..."

REPORT="${DEST}/DUPLICATE_REPORT.txt"
HASHDIR="${DEST}/_DUPLICATE_FILES_BY_HASH"
mkdir -p "$HASHDIR"

MAP=$(mktemp)
DUPHASH=$(mktemp)
trap 'rm -f "$TMP" "$MAP" "$DUPHASH"' EXIT

find "$DEST/SOURCES" -type f 2>/dev/null | while IFS= read -r f; do
  h=$(shasum -a 256 "$f" 2>/dev/null | awk '{print $1}')
  [[ -n "$h" ]] && printf '%s\t%s\n' "$h" "$f"
done | sort -t $'\t' -k1,1 >"$MAP"

cut -f1 "$MAP" | sort | uniq -d >"$DUPHASH"

{
  echo "Duplicate content groups (same SHA-256). Originals stay in SOURCES/."
  echo "Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')"
  echo ""
} >"$REPORT"

while IFS= read -r hash; do
  [[ -z "$hash" ]] && continue
  paths=$(grep -F "${hash}"$'\t' "$MAP" | cut -f2- || true)
  n=$(echo "$paths" | grep -c . || true)
  echo "=== SHA256 $hash ($n files) ===" >>"$REPORT"
  echo "$paths" >>"$REPORT"
  echo "" >>"$REPORT"

  if [[ "$MIRROR_DUPES" -eq 1 ]]; then
    short="${hash:0:16}"
    dstdir="${HASHDIR}/${short}"
    mkdir -p "$dstdir"
    i=0
    while IFS= read -r fp; do
      [[ -z "$fp" ]] && continue
      i=$((i + 1))
      base=$(basename "$fp")
      cp "$fp" "${dstdir}/${i}_${base}"
    done <<<"$paths"
  fi
done <"$DUPHASH"

if [[ ! -s "$DUPHASH" ]]; then
  echo "(No identical file contents found across SOURCES.)" >>"$REPORT"
fi

echo "Done."
echo "Report: $REPORT"
[[ "$MIRROR_DUPES" -eq 1 ]] && echo "Duplicate mirrors: $HASHDIR"
echo ""
echo "Your originals are unchanged. The consolidated copy is under: $DEST/SOURCES"
