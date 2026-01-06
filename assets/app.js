/* basic */


/* =========================
   Agent Ops: Six-Layer Stack
   (added for training pages)
   ========================= */
(function(){
  const root = document.getElementById("mbcc-layer-stack");
  if(!root) return;

  const data = {
    1:{ pill:"Layer 1 — Execution", title:"Execution (Surface Layer)",
      desc:"What the agent did: tool calls, outputs, file writes, transactions. Visible layer where damage happens if deeper controls fail.",
      fail:["Unsafe tool use","Bad outputs shipped","Actions taken without approvals"],
      controls:["Sandboxing + least privilege tools","Rate limits / timeouts","Audit logs + kill switch"],
      training:"./module-1.html", runbook:"../runbooks/security.html"
    },
    2:{ pill:"Layer 2 — Behavior", title:"Behavior (Instruction Architecture)",
      desc:"Prompts, roles, constraints, schemas. Most ‘model problems’ are instruction architecture problems here.",
      fail:["Hallucinations from vague instructions","Inconsistent formatting","Role confusion / scope creep"],
      controls:["Prompt contracts + schemas","System rules versioning","Policy-aligned templates"],
      training:"./module-2.html", runbook:"../runbooks/onboarding.html"
    },
    3:{ pill:"Layer 3 — Decisions", title:"Decisions (Ask / Act / Stop)",
      desc:"The probability space: what the agent could do next—and what it is allowed to choose. Autonomy becomes risk without bounds.",
      fail:["Agents self-authorize risky actions","No fallback paths","Overconfidence without gating"],
      controls:["Confidence thresholds","Decision trees + escalation","Human-in-the-loop triggers"],
      training:"./module-2.html", runbook:"../runbooks/quality.html"
    },
    4:{ pill:"Layer 4 — Memory", title:"Memory (Retention + Recall)",
      desc:"Long-term context + recall. Memory must be governed, not hoarded.",
      fail:["Context bloat + drift","Wrong retrieval","Stale or sensitive recall"],
      controls:["Memory TTL + pruning","Scoped recall rules","Memory audits + reset authority"],
      training:"./module-3.html", runbook:"../runbooks/quality.html"
    },
    5:{ pill:"Layer 5 — Oversight", title:"Oversight (Control Plane)",
      desc:"Orchestration, policy engines, RBAC, approvals. Agents execute—agents do not govern.",
      fail:["No separation of duties","No approvals for high-risk actions","Compliance gaps"],
      controls:["Policy-as-code","RBAC + approvals","Full traceability + override"],
      training:"./module-3.html", runbook:"../runbooks/security.html"
    },
    6:{ pill:"Layer 6 — Purpose", title:"Purpose (Charter + Trust)",
      desc:"Values, legal limits, brand trust, red lines. Purpose constrains power and prevents metric-chasing damage.",
      fail:["Optimizing metrics while losing trust","Policy drift","Misaligned incentives"],
      controls:["System charter + red lines","Alignment reviews","Shutdown conditions"],
      training:"./index.html", runbook:"../runbooks/security.html"
    }
  };

  const layers = root.querySelectorAll(".layer");
  const pill = document.getElementById("mbcc-pill");
  const title = document.getElementById("mbcc-card-title");
  const desc = document.getElementById("mbcc-card-desc");
  const fail = document.getElementById("mbcc-fail");
  const controls = document.getElementById("mbcc-controls");
  const trainingLink = document.getElementById("mbcc-training-link");
  const runbookLink = document.getElementById("mbcc-runbook-link");

  function setLayer(n){
    const d = data[n];
    layers.forEach(l => l.classList.toggle("active", l.dataset.layer == n));
    if(pill) pill.textContent = d.pill;
    if(title) title.textContent = d.title;
    if(desc) desc.textContent = d.desc;
    if(fail) fail.innerHTML = d.fail.map(x => `<li>${x}</li>`).join("");
    if(controls) controls.innerHTML = d.controls.map(x => `<li>${x}</li>`).join("");
    if(trainingLink) trainingLink.href = d.training;
    if(runbookLink) runbookLink.href = d.runbook;
  }

  layers.forEach(l => {
    l.addEventListener("click", () => setLayer(parseInt(l.dataset.layer,10)));
    l.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); setLayer(parseInt(l.dataset.layer,10)); }
    });
  });

  setLayer(3);
})();
