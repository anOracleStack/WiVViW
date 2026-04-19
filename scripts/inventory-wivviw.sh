#!/usr/bin/env bash
# Find folders on your Mac whose names look like WiVViW / wivviw (case-insensitive).
# Does not modify anything. Safe to run anytime.
#
# Usage:
#   ./scripts/inventory-wivviw.sh
#   SEARCH_ROOTS="$HOME/Desktop $HOME/Downloads" ./scripts/inventory-wivviw.sh
#   ./scripts/inventory-wivviw.sh > ~/Desktop/wivviw-inventory.txt

set -euo pipefail

: "${SEARCH_ROOTS:=${HOME}/Documents ${HOME}/Desktop ${HOME}/Downloads}}"

OUT="${INVENTORY_OUT:-}"
if [[ -n "$OUT" ]]; then
  exec > >(tee "$OUT")
fi

echo "=== WiVViW folder inventory ==="
echo "Started: $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "Search roots: $SEARCH_ROOTS"
echo ""

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

for root in $SEARCH_ROOTS; do
  [[ -d "$root" ]] || continue
  # -type d: directories only; skip permission errors
  find "$root" -iname '*wivviw*' -type d 2>/dev/null >>"$TMP" || true
done

# Unique paths, sorted
sort -u "$TMP" -o "$TMP"

if [[ ! -s "$TMP" ]]; then
  echo "No matching directories found under the search roots."
  echo "Tip: add more roots, e.g. SEARCH_ROOTS=\"$HOME\" ./scripts/inventory-wivviw.sh"
  echo "     (searching all of HOME can take several minutes)"
  exit 0
fi

printf "%-8s %-12s %-20s %s\n" "FILES" "SIZE" "MODIFIED" "PATH"
printf "%s\n" "--------------------------------------------------------------------------------"

while IFS= read -r dir; do
  [[ -d "$dir" ]] || continue
  count=$(find "$dir" -type f 2>/dev/null | wc -l | tr -d ' ')
  size=$(du -sh "$dir" 2>/dev/null | awk '{print $1}')
  mtime=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$dir" 2>/dev/null || stat -c "%y" "$dir" 2>/dev/null | cut -c1-16)
  printf "%-8s %-12s %-20s %s\n" "$count" "$size" "$mtime" "$dir"
done <"$TMP"

echo ""
echo "=== Paths only (for other scripts) ==="
cat "$TMP"
