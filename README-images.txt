Moe Community Cloud · Playbooks Hub (Root Site) – With Owner + Playbook Images
=========================================================================

This package restores:
- Your square owner image card using ceo-vapor-cloud-agent-ops.jpg
- Visual cover images for each playbook tile.

FILES
-----
index.html
assets/
  ceo-vapor-cloud-agent-ops.jpg   (you may already have this in your repo)
  retail-ai-playbook.png          (Retail AI Playbook cover)
  smarthome-playbook.png          (Smart Home Automation Playbook cover)
  edge-iot-monetization-playbook.png (Edge & IoT Monetization cover)
  ai-infra-vapor-cloud.png        (AI Infrastructure & Vapor Cloud cover)
  zero-trust-playbook.png         (Zero Trust for AI cover)
  vertex-training-factory-2.png   (Vertex AI Training Factory cover – used on the tile)
  vertex-training-factory-1.png   (extra Vertex AI artwork – optional, for inner pages)
  ai-bubble-crash-playbook.png    (AI Bubble Crash Monetization artwork – optional, for future playbook)

USAGE
-----
1. Place index.html at the root of https://moecommunitycloud.com/ (replacing the old one).
2. Place the assets/ folder at the same level as index.html.
3. If you already have ceo-vapor-cloud-agent-ops.jpg in another path, you can either:
   - keep this one and overwrite, OR
   - delete this copy and update the <img src="..."> in index.html to point at your existing path.

Once deployed, you should see:
- A square owner card with your Vapor Cloud Agent Ops image.
- Rich images for each playbook tile (Vertex, Retail, Smart Home, Edge & IoT, Infra, Zero Trust).
