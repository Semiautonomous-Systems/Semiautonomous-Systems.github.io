#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="monitor_venom.log"

while true; do
  dt=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  page=$(curl -sI https://semiautonomous.systems/venom/ | head -1 || true)
  asset=$(curl -sI https://semiautonomous.systems/venom/images/hero-spider-1200.jpg | head -1 || true)
  if curl -s https://semiautonomous.systems/venom/ | grep -q 'data:image'; then data_url=yes; else data_url=no; fi
  echo "$dt | page:$page | spider1200:$asset | data_url:$data_url" >> "$LOG_FILE"
  sleep 60
done





