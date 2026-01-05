# Link Patch — Add Newsletter to moecommunitycloud.com

You were right: the newsletter page was packaged, but your **main hub page** (https://moecommunitycloud.com/) still needs a **visible link**.

## Option A (recommended): Add it to the "MBCC Insights" section
1) Open your repo root: `index.html`
2) Find the section:

`## MBCC Insights`

3) Under the existing insight links (where you see items like:
- "What Is Agent Operations (Agent-Ops)?"
- "Why AI Projects Fail Without Simulation"
- "View all insights"

Add this new item:

```md
### [MCC Newsletter (Daily)](/newsletter/)
Daily signals on AI, cloud, automation, and digital infrastructure — built for operators. (Subscribe via Gmail.)
```

## Option B: Add it to the footer links
Near your footer links (Privacy / Terms / Cookies), add:

```html
· <a href="/newsletter/">Newsletter</a>
```

## What you upload from this zip
- `/newsletter/index.html`
- `/newsletter/rss.xml`
- `/newsletter.html` (optional redirect helper)
- `LINK_PATCH.md` (these instructions)
- `link-snippets/` (copy/paste helpers)

After committing/pushing, the link should resolve to:
- https://moecommunitycloud.com/newsletter/
