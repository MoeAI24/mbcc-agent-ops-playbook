Agent-Ops™ Playbook · UI + Lead Capture + Proposal Generator
=================================================================

This package contains a single-page HTML site for:

- Fully branded MBCC / Vapor Cloud Agent-Ops™ Playbook
- Live simulations:
  * Agent Blueprint Designer
  * Task Chain Simulator
  * Risk Radar
  * Replay Logs
- Lead capture system (localStorage-based)
- Proposal Generator that builds a full Agent-Ops™ engagement draft using:
  * Captured lead/session data
  * Agent blueprint
  * Task chain context
  * Latest risk profile (if calculated)

FILES
-----
index.html   – Drop this into the root of https://agentops.moecommunitycloud.com/

HOW THE PROPOSAL GENERATOR WORKS
--------------------------------
- Reads lead/session info from localStorage (`agentops_lead_v1`).
- Uses defined agents from the Agent Blueprint Designer.
- Uses the most recent Task Chain goal + step count (if generated).
- Uses the most recent Risk Radar profile (if calculated).
- Emits a copy-paste-ready proposal into a textarea for you to adjust and send.

You can wire this up to:
- A backend that saves proposals
- A PDF/export flow
- A CRM or deal desk system
