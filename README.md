# FinternetOps • MBCC Agent Ops Playbook (AdSense-ready)

## Why it looked white on GitHub Pages
If your repo is deployed as a *project site* (not the root domain), paths like `/assets/styles.css` can break.
This rebuild uses correct relative paths so the dark theme always loads.

## AdSense
- Auto Ads script included in `<head>` on every page (publisher: ca-pub-8387411349417007)
- `ads.txt` at repo root:
  - google.com, pub-8387411349417007, DIRECT, f08c47fec0942fa0

## Verify after deploy
- `/ads.txt` is reachable at hosting root
- View source: AdSense script exists in `<head>`
