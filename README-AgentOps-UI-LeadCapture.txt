Agent-Ops™ Playbook · UI Upgrade + Lead Capture
====================================================

This package contains a single-page HTML site for:

- A fully branded MBCC / Vapor Cloud Agent-Ops™ Playbook
- UI aligned with moecommunitycloud.com (colors, cards, buttons)
- Working simulations for:
  * Agent Blueprint Designer (add agents to a blueprint panel)
  * Task Chain Simulator (generate a textual agent chain)
  * Risk Radar (compute a simple risk score and guidance)
  * Replay Logs (generate a realistic sample run trace)
- Lead capture system using localStorage:
  * Shows an "Unlock the Agent-Ops™ Simulator" modal on first load
  * Captures name, email, company, role, industry, primary use case
  * Stores session info in localStorage under `agentops_lead_v1`
  * Renders captured session context in the right-hand panel

FILES
-----
index.html   – Drop this into the root of https://agentops.moecommunitycloud.com/

NOTES
-----
- No external dependencies – pure HTML, CSS, and JS.
- Lead data is LOCAL ONLY (localStorage). In a production deployment, you can:
  * Replace localStorage with a POST to your backend or CRM
  * Add real proposal/PDF export on top of the existing structures.
