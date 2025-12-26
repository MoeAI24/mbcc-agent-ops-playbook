(function(){
  const ids = [
    "systemName","businessOutcome","agentDoes",
    "businessOwner","techOwner","shutdownOwner","escalation",
    "approvedData","restrictedData","retentionRule",
    "allowedActions","disallowedActions","hitl",
    "riskLevel","primaryKpi","failureMode","signals","interventions",
    "simSet","phases","questions","decisions"
  ];

  const toastEl = document.getElementById("toast");
  const yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  function toast(msg){
    if(!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    window.clearTimeout(toastEl._t);
    toastEl._t = window.setTimeout(()=>toastEl.classList.remove("show"), 2400);
  }

  function readState(){
    const state = {};
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(!el) return;
      state[id] = el.value || "";
    });
    state._meta = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      tool: "MBCC Agent Ownership & Risk Mapping Canvas"
    };
    return state;
  }

  function writeState(state){
    ids.forEach(id=>{
      const el = document.getElementById(id);
      if(!el) return;
      el.value = (state && typeof state[id] === "string") ? state[id] : "";
    });
  }

  const KEY = "mbcc_agentops_canvas_v1";

  function save(){
    const s = readState();
    localStorage.setItem(KEY, JSON.stringify(s));
    toast("Saved locally in your browser.");
  }

  function load(){
    const raw = localStorage.getItem(KEY);
    if(!raw){ toast("No saved canvas found yet."); return; }
    try{
      const s = JSON.parse(raw);
      writeState(s);
      toast("Loaded your last saved canvas.");
    }catch(e){
      toast("Saved data could not be read.");
    }
  }

  function downloadJson(){
    const s = readState();
    const fileNameBase = (s.systemName || "agentops-canvas")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,"-")
      .replace(/(^-|-$)/g,"")
      .slice(0,60) || "agentops-canvas";
    const blob = new Blob([JSON.stringify(s,null,2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileNameBase + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    toast("Downloaded JSON.");
  }

  function printPdf(){
    toast("Printing… choose 'Save as PDF' in the dialog.");
    window.print();
  }

  function loadExample(){
    const example = {
      systemName: "Title Intelligence Clear-to-Close Agent",
      businessOutcome: "Cut clear-to-close delays by 25% without increasing headcount",
      agentDoes: "Ingests order data + public records signals, drafts a lien checklist, flags anomalies with citations, and proposes next actions for review.",
      businessOwner: "VP, Title Operations",
      techOwner: "Platform Lead, AI/Automation",
      shutdownOwner: "Director, IT Risk & Controls",
      escalation: "On-call: Platform rotation (24/7). Escalate to IT Risk for policy violations. SLA: 30 min acknowledgement, 2 hr mitigation plan.",
      approvedData: "- Order management system (read-only)\n- Public records API (search-only)\n- Internal policy library (approved excerpts)\n- Redaction service for PII",
      restrictedData: "No raw SSNs, bank account numbers, or full borrower packets. No external email sending. No production writes to underwriting systems.",
      retentionRule: "Logs 30 days. Redact PII. Store in BigQuery with CMEK. Tool call traces retained for audit-only access.",
      allowedActions: "Search public records, retrieve approved policy snippets, draft checklist, open a case note (internal) with approval.",
      disallowedActions: "No payments, no external outreach, no irreversible production writes, no exporting customer data.",
      hitl: "Human approval required for any change to checklist status, escalation emails, or decisions that block a close.",
      riskLevel: "High",
      primaryKpi: "Time-to-clear exceptions; false positive rate of lien flags",
      failureMode: "Agent flags the wrong lien due to mismatched parcel IDs",
      signals: "Inputs, citations, tool calls, confidence, redaction decisions, reviewer approvals, latency, error rates",
      interventions: "Kill switch; tool disable; rate limits; quarantine mode; audit-only mode; rollback to previous prompt/policy version",
      simSet: "100 historical orders, including edge cases (multi-parcel, name variants, outdated records, conflicting sources). Adversarial prompts and malformed inputs.",
      phases: "Phase 0: Shadow mode\nPhase 1: Internal pilot (10% orders)\nPhase 2: Limited production (specific counties)\nPhase 3: Broad rollout",
      questions: "Who owns the final decision to block a close? What are the regulatory logging requirements per state? Which PII fields must always be redacted?",
      decisions: "Agent remains advisory for first 60 days. All escalations require human approval. Public records calls are search-only with throttling."
    };
    writeState(example);
    toast("Example loaded. Edit anything you want.");
  }

  // Wire buttons
  const byId = (x)=>document.getElementById(x);
  byId("btnSave")?.addEventListener("click", save);
  byId("btnLoad")?.addEventListener("click", load);
  byId("btnDownloadJson")?.addEventListener("click", downloadJson);
  byId("btnPrint")?.addEventListener("click", printPdf);
  byId("btnExample")?.addEventListener("click", loadExample);

  // Autosave on blur
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener("blur", ()=> {
      try{ localStorage.setItem(KEY, JSON.stringify(readState())); }catch(e){}
    });
  });

  // Attempt to load if present
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){ writeState(JSON.parse(raw)); }
  }catch(e){}
})();
