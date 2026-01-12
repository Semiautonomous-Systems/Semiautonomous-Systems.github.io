#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG_DIR="$ROOT/venom-src/public/images"
ASTRO="$ROOT/venom-src/src/pages/index.astro"
SPIDER_URL="${1:-https://upload.wikimedia.org/wikipedia/commons/9/9d/Hyllus_semicupreus_Male_Face.jpg}"
SCORP_URL="${2:-https://upload.wikimedia.org/wikipedia/commons/1/18/Euscorpius_italicus_01.jpg}"
mkdir -p "$IMG_DIR"
fetch_ok(){ curl -Ls --fail --head "$1" >/dev/null; }
grabb(){ curl -Ls --fail "$1" -o "$2"; }
resize(){ local in="$1" out="$2" w="$3"; if command -v sips >/dev/null 2>&1; then sips -Z "$w" "$in" --out "$out" >/dev/null; else cp "$in" "$out"; fi }
ensure_img(){ local url="$1" base="$2"; local tmp="$IMG_DIR/.tmp.$$"; grabb "$url" "$tmp"; [ -s "$tmp" ] || { echo "download failed: $url"; exit 1; } [ $(wc -c < "$tmp") -ge 300000 ] || { echo "too small: $url"; rm -f "$tmp"; exit 1; } mv "$tmp" "$IMG_DIR/${base}-2000.jpg"; resize "$IMG_DIR/${base}-2000.jpg" "$IMG_DIR/${base}-1200.jpg" 1200; }
fetch_ok "$SPIDER_URL" || { echo "bad spider url"; exit 1; }
fetch_ok "$SCORP_URL" || { echo "bad scorpion url"; exit 1; }
ensure_img "$SPIDER_URL" hero-spider
ensure_img "$SCORP_URL" scorpion
# ensure Astro references expected filenames (idempotent)
sed -i  -e s
