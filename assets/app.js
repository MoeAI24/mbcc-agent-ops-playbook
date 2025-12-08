
(function() {
  const agents = [];

  function renderAgents() {
    const container = document.getElementById("agent-blueprint-view");
    const label = document.getElementById("agent-count-label");
    if (!container || !label) return;

    if (agents.length === 0) {
      label.textContent = "0 agents defined";
      container.innerHTML = '<p style="font-size:12px; color:rgba(247,243,233,0.8);">Add an agent on the left to see how the blueprint builds up. In the full playbook, this blueprint becomes a version-controlled spec for prompts, tools, and deployment config.</p>';
      return;
    }

    label.textContent = agents.length + (agents.length === 1 ? " agent defined" : " agents defined");

    const rows = agents.map((a, idx) => {
      return [
        (idx + 1) + ". " + a.name + " · " + a.role,
        "Tools: " + (a.tools || "—"),
        "Memory: " + (a.memory || "—"),
        "Guardrails: " + (a.guardrails || "—")
      ].join("\n");
    });

    container.innerHTML = "<div class=\"log-view\">" + rows.join("\n\n") + "</div>";
  }

  function addAgent() {
    const name = document.getElementById("agent-name").value.trim();
    const role = document.getElementById("agent-role").value.trim();
    const tools = document.getElementById("agent-tools").value.trim();
    const memory = document.getElementById("agent-memory").value.trim();
    const guardrails = document.getElementById("agent-guardrails").value.trim();

    if (!name || !role) {
      alert("Give the agent at least a name and primary role.");
      return;
    }

    agents.push({ name, role, tools, memory, guardrails });
    renderAgents();
  }

  function clearAgents() {
    agents.splice(0, agents.length);
    renderAgents();
  }

  function generateChain() {
    const goalEl = document.getElementById("chain-goal");
    const stepsEl = document.getElementById("chain-steps");
    const view = document.getElementById("chain-view");
    if (!goalEl || !stepsEl || !view) return;

    const goal = goalEl.value.trim();
    const maxSteps = parseInt(stepsEl.value || "3", 10) || 3;

    if (!goal) {
      alert("Describe the business goal first.");
      return;
    }

    const chainAgents = agents.length > 0 ? agents.slice(0, maxSteps) : [
      { name: "Researcher", role: "Collects and summarizes raw context." },
      { name: "Planner", role: "Breaks the goal into ordered steps." },
      { name: "Executor", role: "Calls tools/APIs to complete actions." },
      { name: "Validator", role: "Checks outputs against policy and metrics." },
      { name: "Reporter", role: "Compiles outcomes for humans." }
    ];

    const used = chainAgents.slice(0, maxSteps);
    const lines = [];
    lines.push("Goal: " + goal);
    lines.push("");
    used.forEach((agent, idx) => {
      const stepNum = idx + 1;
      const aName = agent.name || ("Agent " + stepNum);
      const aRole = agent.role || "";
      let action = "";
      switch (stepNum) {
        case 1:
          action = "Interpret goal, collect background signals, build context.";
          break;
        case 2:
          action = "Turn context into a concrete plan and select tools.";
          break;
        case 3:
          action = "Execute tools, write artifacts, call external APIs.";
          break;
        case 4:
          action = "Cross-check outputs, reduce hallucinations, enforce guardrails.";
          break;
        default:
          action = "Aggregate results, notify humans, and store learnings.";
      }

      lines.push(
        "Step " + stepNum + " · " + aName,
        "  Role: " + (aRole || "—"),
        "  Action: " + action,
        "  Output: Structured artifact passed to next agent."
      );
      if (stepNum < used.length) {
        lines.push("  ↳ Handoff: " + aName + " → " + (used[stepNum].name || "Next agent"));
      }
      lines.push("");
    });

    view.innerHTML = "<div class=\"log-view\">" + lines.join("\n") + "</div>";
  }

  function calcRisk() {
    const env = document.getElementById("risk-sensitivity").value;
    const data = document.getElementById("risk-data").value;
    const autonomy = document.getElementById("risk-autonomy").value;
    const out = document.getElementById("risk-output");
    if (!out) return;

    let hallucination = 20;
    let cost = 20;
    let dataLeak = 15;
    let blastRadius = 15;

    if (env === "staging") {
      cost += 10;
      hallucination += 10;
    } else if (env === "production") {
      cost += 20;
      hallucination += 20;
      blastRadius += 20;
    }

    if (data === "internal") {
      dataLeak += 20;
    } else if (data === "pii") {
      dataLeak += 45;
      blastRadius += 25;
    }

    if (autonomy === "bounded") {
      hallucination += 10;
      cost += 10;
      blastRadius += 10;
    } else if (autonomy === "high") {
      hallucination += 30;
      cost += 25;
      blastRadius += 30;
    } else if (autonomy === "human-in-loop") {
      hallucination -= 10;
      cost += 5;
      blastRadius -= 5;
    }

    function clamp(x) { return Math.max(0, Math.min(100, x)); }
    hallucination = clamp(hallucination);
    cost = clamp(cost);
    dataLeak = clamp(dataLeak);
    blastRadius = clamp(blastRadius);

    const metrics = [
      { label: "Hallucination risk", value: hallucination },
      { label: "Cost overrun risk", value: cost },
      { label: "Data leak risk", value: dataLeak },
      { label: "Blast radius", value: blastRadius }
    ];

    const rows = metrics.map(m => {
      return (
        '<div class="metric-row">' +
          '<span>' + m.label + '</span>' +
          '<span>' + m.value.toFixed(0) + '%</span>' +
        '</div>' +
        '<div class="metric-bar-wrap">' +
          '<div class="metric-bar" style="width:' + m.value.toFixed(0) + '%;"></div>' +
        '</div>'
      );
    }).join("");

    let summary = "";
    const maxVal = Math.max(hallucination, cost, dataLeak, blastRadius);
    if (maxVal < 35) {
      summary = "Low overall risk – great environment for experiments. Still enforce basic guardrails and log everything.";
    } else if (maxVal < 65) {
      summary = "Moderate risk – safe to proceed with staged rollout if you have observability, approvals, and kill switches.";
    } else {
      summary = "High risk – treat this as a critical system. You need strict approvals, simulation tests, and tiered blast-radius controls before going live.";
    }

    out.innerHTML = rows + '<p class="tagline-inline" style="margin-top:6px;">' + summary + "</p>";
  }

  function generateLogs() {
    const view = document.getElementById("log-view");
    if (!view) return;

    const steps = [
      {
        agent: agents[0]?.name || "Researcher",
        action: "search_news",
        details: "Queried AI markets and bubble chatter across 12 sources.",
        ms: 1280,
        cost: 0.003
      },
      {
        agent: agents[1]?.name || "Planner",
        action: "draft_plan",
        details: "Structured 3-step monitoring and escalation plan.",
        ms: 820,
        cost: 0.002
      },
      {
        agent: agents[2]?.name || "Executor",
        action: "run_pipeline",
        details: "Pulled data, generated summary, and prepared CFO briefing.",
        ms: 2210,
        cost: 0.007
      },
      {
        agent: agents[3]?.name || "Validator",
        action: "policy_check",
        details: "Checked content for compliance, PII, and hallucination signals.",
        ms: 640,
        cost: 0.001
      },
      {
        agent: agents[4]?.name || "Reporter",
        action: "notify",
        details: "Sent summary to CFO channel with risk score and links.",
        ms: 430,
        cost: 0.001
      }
    ];

    const totalMs = steps.reduce((acc, s) => acc + s.ms, 0);
    const totalCost = steps.reduce((acc, s) => acc + s.cost, 0);

    const lines = [];
    lines.push("run_id: ao-" + Date.now());
    lines.push("scenario: "AI bubble crash monitoring"");
    lines.push("total_latency_ms: " + totalMs);
    lines.push("total_cost_usd: " + totalCost.toFixed(3));
    lines.push("steps:");
    steps.forEach((s, idx) => {
      lines.push("  - step: " + (idx + 1));
      lines.push("    agent: "" + s.agent + """);
      lines.push("    action: "" + s.action + """);
      lines.push("    details: "" + s.details.replace(/"/g, '\"') + """);
      lines.push("    latency_ms: " + s.ms);
      lines.push("    cost_usd: " + s.cost.toFixed(3));
    });

    view.textContent = lines.join("\n");
  }

  document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("btn-add-agent");
    const clearBtn = document.getElementById("btn-clear-agents");
    const chainBtn = document.getElementById("btn-generate-chain");
    const riskBtn = document.getElementById("btn-calc-risk");
    const logsBtn = document.getElementById("btn-generate-logs");

    if (addBtn) addBtn.addEventListener("click", addAgent);
    if (clearBtn) clearBtn.addEventListener("click", clearAgents);
    if (chainBtn) chainBtn.addEventListener("click", generateChain);
    if (riskBtn) riskBtn.addEventListener("click", calcRisk);
    if (logsBtn) logsBtn.addEventListener("click", generateLogs);

    renderAgents();
  });
})();
