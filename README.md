# Agent-Ops™ Playbook · Moe Bucks Community Cloud

**Agent-Ops™ – The DevOps of Agentic AI.**  
This repo powers the public website and simulations for the Agent-Ops™ Playbook from Moe Bucks Community Cloud (MBCC).

The goal is simple: show enterprises what it looks like to run autonomous agents with the same discipline as modern software delivery — versioned blueprints, observable chains, guardrails, and replayable logs.

## What’s in this repo

- `index.html` – Single-page site with all sections and simulations.
- `assets/styles.css` – MBCC-branded styling (red / black / gold plaid aesthetic).
- `assets/app.js` – Front-end logic for the simulations:
  - Agent Blueprint Designer
  - Task Chain Simulator
  - Risk Radar
  - Replay Logs
  - Architecture Map (static, but wired to the narrative)

## How to run locally

No build tools required.

```bash
# Clone the repo
git clone https://github.com/moeai24/mbcc-agent-ops-playbook.git
cd mbcc-agent-ops-playbook

# Open in a browser
# On macOS:
open index.html

# On Windows:
start index.html
```

## GitHub Pages setup

In the repo settings:

1. Go to **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`.
3. Choose branch: `main` (or `master`), folder: `/ (root)`.
4. (Optional) Set a custom domain, for example:

   - `agentops.moecommunitycloud.com`

You can then add a DNS CNAME record:

```text
Host:  agentops
Type:  CNAME
Data:  moeai24.github.io
```

## License

This code is licensed under the **MIT License** (see `LICENSE`).  
You’re free to adapt and extend it, including in commercial settings, provided you keep the copyright + license text.

For written content in this playbook (copy, naming, strategy), MBCC reserves branding and narrative rights — contact for partnership or white-label discussions.
