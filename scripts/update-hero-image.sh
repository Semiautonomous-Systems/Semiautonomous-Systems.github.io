#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ASTRO_PAGE="venom-src/src/pages/index.astro"
IMG_DIR="venom-src/public/images"
mkdir -p "$IMG_DIR"
URL="${1:-https://upload.wikimedia.org/wikipedia/commons/6/69/Jumping_spider_headshot.jpg}"
curl -L --fail --silent --show-error "$URL" -o "$IMG_DIR/hero-spider-2000.jpg"
if command -v sips >/dev/null 2>&1; then
  sips -Z 1200 "$IMG_DIR/hero-spider-2000.jpg" --out "$IMG_DIR/hero-spider-1200.jpg" >/dev/null
else
  cp "$IMG_DIR/hero-spider-2000.jpg" "$IMG_DIR/hero-spider-1200.jpg"
fi
perl -0777 -pe 's|<source srcset="[^"]*" type="image/jpeg" />|<source srcset="/venom/images/hero-spider-1200.jpg 1x, /venom/images/hero-spider-2000.jpg 2x" type="image/jpeg" />|g; s|<img src="[^"]*" alt="High-definition macro photo \(spider\)"|<img src="/venom/images/hero-spider-1200.jpg" alt="High-definition macro photo (spider)"|g' "$ASTRO_PAGE" > "$ASTRO_PAGE.tmp" && mv "$ASTRO_PAGE.tmp" "$ASTRO_PAGE"
/usr/bin/git add "$ASTRO_PAGE" "$IMG_DIR/hero-spider-1200.jpg" "$IMG_DIR/hero-spider-2000.jpg"
/usr/bin/git commit -m "chore(venom): update hero image via script" || true
/usr/bin/git push || true
