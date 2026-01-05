# MoeCommunityCloud.com — AdSense Repo Update (No Layout Changes)

This package contains the **only** files you need to add to your repo to finish AdSense setup **without changing site structure**.

## 1) Add `ads.txt` to the site root (required)
Place `ads.txt` in the same directory that serves your site root (same level as `index.html`).

After deploy, this URL must work:
`https://moecommunitycloud.com/ads.txt`

Expected content (exactly):
google.com, pub-8387411349417007, DIRECT, f08c47fec0942fa0

## 2) Add the AdSense script into `<head>` (recommended)
Copy/paste the contents of `adsense-head-snippet.html` into the `<head>` section of **every page** you want ads on.
Best practice: if your site uses a shared header/layout, add it there once.

✅ Must be in `<head>`
✅ Must NOT be inside an iframe

## Quick verification checklist
- `https://moecommunitycloud.com/ads.txt` returns plain text (not HTML, not 404)
- AdSense dashboard stops showing “Ads.txt was not found” (can take 24–72 hours after crawl)
- Ads begin to appear (Auto ads can take a bit to ramp)

Generated: 2026-01-05 13:11:03
