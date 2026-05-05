const storageKey = "ris-control-demo-v1";

const users = {
  ana: { id: "u1", name: "Ana Souza", role: "Gerente", sector: "Gerencia" },
  bruno: { id: "u2", name: "Bruno Lima", role: "Funcionario", sector: "Professores" },
  carla: { id: "u3", name: "Carla Nunes", role: "Lider", sector: "Limpeza" },
  diego: { id: "u4", name: "Diego Martins", role: "Administrador", sector: "Administracao" }
};

const state = {
  currentUser: null,
  view: "dashboard",
  data: loadData()
};

function defaultData() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  return {
    ris: [
      {
        id: "RIS-1001",
        title: "Esteira 03 fazendo barulho estranho",
        description: "Aluno informou ruido forte ao aumentar velocidade. Equipamento ainda liga, mas precisa avaliacao.",
        reporterId: "u2",
        sector: "Equipamentos",
        location: "Sala de musculacao",
        category: "Equipamentos",
        severity: "Alta",
        urgency: "Hoje",
        assignedToId: "u1",
        dueAt: today + "T18:00",
        status: "Em execucao",
        evidenceName: "esteira-03.jpg",
        solution: "",
        createdAt: today + "T09:10"
      },
      {
        id: "RIS-1002",
        title: "Banheiro masculino sem sabonete",
        description: "Reposicao pendente no dispenser da pia central.",
        reporterId: "u3",
        sector: "Limpeza",
        location: "Banheiro masculino",
        category: "Limpeza",
        severity: "Media",
        urgency: "Hoje",
        assignedToId: "u3",
        dueAt: today + "T12:00",
        status: "Reportado",
        evidenceName: "",
        solution: "",
        createdAt: today + "T08:35"
      },
      {
        id: "RIS-1003",
        title: "Catraca falhou no horario de pico",
        description: "Leitor travou por alguns minutos e recepcao precisou liberar acesso manual.",
        reporterId: "u1",
        sector: "Recepcao",
        location: "Entrada principal",
        category: "Catraca/acesso",
        severity: "Critica",
        urgency: "Imediata",
        assignedToId: "",
        dueAt: today + "T10:30",
        status: "Aguardando responsavel",
        evidenceName: "",
        solution: "",
        createdAt: today + "T07:50"
      }
    ],
    tasks: [
      {
        id: "T-2001",
        title: "Verificar esteira 03",
        description: "Avaliar ruido, testar inclinacao e registrar evidencia depois da verificacao.",
        assignedToId: "u1",
        sector: "Equipamentos",
        dueAt: today + "T18:00",
        status: "Em andamento",
        requiresEvidence: true,
        evidenceName: "",
        risId: "RIS-1001"
      },
      {
        id: "T-2002",
        title: "Repor sabonete do banheiro masculino",
        description: "Repor dispenser e anexar foto do item concluido.",
        assignedToId: "u3",
        sector: "Limpeza",
        dueAt: today + "T12:00",
        status: "Pendente",
        requiresEvidence: true,
        evidenceName: "",
        risId: "RIS-1002"
      },
      {
        id: "T-2003",
        title: "Conferir pesos espalhados",
        description: "Organizar halteres e anilhas antes do pico da noite.",
        assignedToId: "u2",
        sector: "Professores",
        dueAt: today + "T17:00",
        status: "Pendente",
        requiresEvidence: false,
        evidenceName: "",
        risId: ""
      }
    ],
    checklists: [
      {
        id: "C-3001",
        title: "Recepcao - Abertura",
        sector: "Recepcao",
        assignedToId: "u1",
        items: [
          { title: "Ligar luzes", done: true, evidence: false },
          { title: "Testar catraca", done: false, evidence: false },
          { title: "Conferir WhatsApp", done: true, evidence: false },
          { title: "Verificar bebedouro", done: false, evidence: false }
        ]
      },
      {
        id: "C-3002",
        title: "Professores - Turno",
        sector: "Professores",
        assignedToId: "u2",
        items: [
          { title: "Conferir organizacao dos equipamentos", done: false, evidence: true },
          { title: "Verificar alunos novos", done: true, evidence: false },
          { title: "Reportar equipamentos com defeito", done: false, evidence: false },
          { title: "Finalizar checklist do turno", done: false, evidence: false }
        ]
      },
      {
        id: "C-3003",
        title: "Limpeza - Diario",
        sector: "Limpeza",
        assignedToId: "u3",
        items: [
          { title: "Limpar banheiros", done: false, evidence: true },
          { title: "Repor papel", done: true, evidence: false },
          { title: "Limpar espelhos", done: false, evidence: true },
          { title: "Retirar lixo", done: false, evidence: false }
        ]
      }
    ],
    audit: [
      { id: "A-1", text: "Ana atribuiu RIS-1001 para acompanhamento", user: "Ana Souza", at: today + "T09:20" },
      { id: "A-2", text: "Bruno abriu RIS-1001", user: "Bruno Lima", at: today + "T09:10" },
      { id: "A-3", text: "Carla abriu RIS-1002", user: "Carla Nunes", at: today + "T08:35" }
    ]
  };
}

function loadData() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return defaultData();
  try {
    return JSON.parse(raw);
  } catch {
    return defaultData();
  }
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(state.data));
}

function byId(id) {
  return document.getElementById(id);
}

function userName(id) {
  return Object.values(users).find((user) => user.id === id)?.name || "Sem responsavel";
}

function isManager() {
  return ["Gerente", "Administrador", "Lider"].includes(state.currentUser?.role);
}

function canSeeAll() {
  return ["Gerente", "Administrador"].includes(state.currentUser?.role);
}

function formatDate(value) {
  if (!value) return "Sem prazo";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function isLate(item) {
  return item.dueAt && new Date(item.dueAt) < new Date() && !["Solucionado", "Concluido", "Validado", "Cancelado com justificativa"].includes(item.status);
}

function addAudit(text) {
  state.data.audit.unshift({
    id: "A-" + Date.now(),
    text,
    user: state.currentUser.name,
    at: new Date().toISOString()
  });
  state.data.audit = state.data.audit.slice(0, 40);
}

function visibleRis() {
  if (canSeeAll()) return state.data.ris;
  if (state.currentUser.role === "Lider") {
    return state.data.ris.filter((ris) => ris.sector === state.currentUser.sector || ris.reporterId === state.currentUser.id || ris.assignedToId === state.currentUser.id);
  }
  return state.data.ris.filter((ris) => ris.reporterId === state.currentUser.id || ris.assignedToId === state.currentUser.id);
}

function visibleTasks() {
  if (canSeeAll()) return state.data.tasks;
  if (state.currentUser.role === "Lider") {
    return state.data.tasks.filter((task) => task.sector === state.currentUser.sector || task.assignedToId === state.currentUser.id);
  }
  return state.data.tasks.filter((task) => task.assignedToId === state.currentUser.id);
}

function severityClass(severity) {
  if (severity === "Critica") return "red";
  if (severity === "Alta") return "amber";
  if (severity === "Media") return "blue";
  return "green";
}

function statusClass(status) {
  if (["Critica", "Atrasado", "Reprovado pela gerencia"].includes(status)) return "red";
  if (["Reportado", "Aguardando responsavel", "Pendente"].includes(status)) return "amber";
  if (["Em analise", "Em execucao", "Em andamento", "Reaberto"].includes(status)) return "blue";
  return "green";
}

function empty(text) {
  return `<div class="empty-state">${text}</div>`;
}

function render() {
  renderShell();
  renderDashboard();
  renderRis();
  renderTasks();
  renderChecklists();
  renderManager();
}

function renderShell() {
  byId("todayLabel").textContent = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  }).format(new Date());

  const titles = {
    dashboard: "Inicio",
    ris: "RIS",
    tasks: "Tarefas",
    checklists: "Checklists",
    manager: "Gerencia"
  };
  byId("viewTitle").textContent = titles[state.view];

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  byId(state.view + "View").classList.add("active-view");
  document.querySelectorAll(".manager-only").forEach((item) => {
    item.classList.toggle("hidden", !isManager());
  });
}

function renderDashboard() {
  const ris = visibleRis();
  const tasks = visibleTasks();
  const openRis = ris.filter((item) => !["Solucionado", "Cancelado com justificativa"].includes(item.status));
  const lateCount = [...ris, ...tasks].filter(isLate).length;
  const myTasks = tasks.filter((task) => task.assignedToId === state.currentUser.id && !["Concluido", "Validado"].includes(task.status));
  const checklistCount = state.data.checklists.filter((checklist) => canSeeAll() || checklist.assignedToId === state.currentUser.id || checklist.sector === state.currentUser.sector).length;

  byId("metricOpenRis").textContent = openRis.length;
  byId("metricLate").textContent = lateCount;
  byId("metricMyTasks").textContent = myTasks.length;
  byId("metricChecklist").textContent = checklistCount;

  const priority = openRis
    .slice()
    .sort((a, b) => ["Critica", "Alta", "Media", "Baixa"].indexOf(a.severity) - ["Critica", "Alta", "Media", "Baixa"].indexOf(b.severity))
    .slice(0, 4);

  byId("priorityRisList").innerHTML = priority.length
    ? priority.map((ris) => `
      <button class="mini-item text-left" type="button" data-open-ris="${ris.id}">
        <strong>${ris.title}</strong>
        <span>${ris.id} - ${ris.sector} - prazo ${formatDate(ris.dueAt)}</span>
        <span class="pill ${severityClass(ris.severity)}">${ris.severity}</span>
      </button>
    `).join("")
    : empty("Nenhum RIS prioritario no momento.");

  byId("myTaskList").innerHTML = myTasks.length
    ? myTasks.slice(0, 4).map((task) => `
      <button class="mini-item text-left" type="button" data-open-task="${task.id}">
        <strong>${task.title}</strong>
        <span>${task.id} - ${task.sector} - prazo ${formatDate(task.dueAt)}</span>
        <span class="pill ${statusClass(task.status)}">${task.status}</span>
      </button>
    `).join("")
    : empty("Voce nao tem tarefas pendentes.");
}

function renderRis() {
  const status = byId("risStatusFilter").value;
  const severity = byId("risSeverityFilter").value;
  let ris = visibleRis();
  if (status !== "all") ris = ris.filter((item) => item.status === status);
  if (severity !== "all") ris = ris.filter((item) => item.severity === severity);

  byId("risList").innerHTML = ris.length ? ris.map((item) => `
    <article class="record-card">
      <div class="record-top">
        <div>
          <h3>${item.title}</h3>
          <p class="muted">${item.id} - ${item.location} - reportado por ${userName(item.reporterId)}</p>
        </div>
        <div class="pill-row">
          <span class="pill ${severityClass(item.severity)}">${item.severity}</span>
          <span class="pill ${statusClass(item.status)}">${item.status}</span>
          ${isLate(item) ? '<span class="pill red">Atrasado</span>' : ""}
        </div>
      </div>
      <p>${item.description}</p>
      <div class="pill-row">
        <span class="pill">Setor: ${item.sector}</span>
        <span class="pill">Responsavel: ${userName(item.assignedToId)}</span>
        <span class="pill">Prazo: ${formatDate(item.dueAt)}</span>
      </div>
      <div class="record-actions">
        <button class="ghost-action compact" type="button" data-open-ris="${item.id}">Detalhes</button>
        ${isManager() ? `<button class="primary-action compact" type="button" data-advance-ris="${item.id}">Avancar status</button>` : ""}
      </div>
    </article>
  `).join("") : empty("Nenhum RIS encontrado para este filtro.");
}

function renderTasks() {
  const filter = byId("taskFilter").value;
  let tasks = visibleTasks();
  if (filter === "mine") tasks = tasks.filter((task) => task.assignedToId === state.currentUser.id);
  if (filter === "open") tasks = tasks.filter((task) => !["Concluido", "Validado"].includes(task.status));
  if (filter === "late") tasks = tasks.filter(isLate);
  if (filter === "done") tasks = tasks.filter((task) => ["Concluido", "Validado"].includes(task.status));

  byId("taskList").innerHTML = tasks.length ? tasks.map((task) => `
    <article class="record-card">
      <div class="record-top">
        <div>
          <h3>${task.title}</h3>
          <p class="muted">${task.id} - ${task.sector} - responsavel ${userName(task.assignedToId)}</p>
        </div>
        <div class="pill-row">
          <span class="pill ${statusClass(task.status)}">${task.status}</span>
          ${task.requiresEvidence ? '<span class="pill amber">Exige evidencia</span>' : ""}
          ${isLate(task) ? '<span class="pill red">Atrasada</span>' : ""}
        </div>
      </div>
      <p>${task.description}</p>
      <div class="pill-row">
        <span class="pill">Prazo: ${formatDate(task.dueAt)}</span>
        ${task.risId ? `<span class="pill">Vinculo: ${task.risId}</span>` : ""}
        ${task.evidenceName ? `<span class="pill green">Evidencia: ${task.evidenceName}</span>` : ""}
      </div>
      <div class="record-actions">
        <button class="ghost-action compact" type="button" data-open-task="${task.id}">Detalhes</button>
        ${task.status !== "Concluido" && task.status !== "Validado" ? `<button class="primary-action compact" type="button" data-complete-task="${task.id}">Concluir</button>` : ""}
        ${isManager() && task.status === "Concluido" ? `<button class="ghost-action compact" type="button" data-validate-task="${task.id}">Validar</button>` : ""}
      </div>
    </article>
  `).join("") : empty("Nenhuma tarefa encontrada.");
}

function renderChecklists() {
  const checklists = state.data.checklists.filter((checklist) => canSeeAll() || checklist.assignedToId === state.currentUser.id || checklist.sector === state.currentUser.sector);
  byId("checklistList").innerHTML = checklists.map((checklist) => {
    const done = checklist.items.filter((item) => item.done).length;
    const percent = Math.round((done / checklist.items.length) * 100);
    return `
      <article class="checklist-card">
        <h3>${checklist.title}</h3>
        <p class="muted">${checklist.sector} - ${done}/${checklist.items.length} itens</p>
        <div class="check-progress"><span style="width:${percent}%"></span></div>
        ${checklist.items.map((item, index) => `
          <label class="check-item">
            <input type="checkbox" ${item.done ? "checked" : ""} data-check-item="${checklist.id}:${index}">
            <span>
              <strong>${item.title}</strong>
              ${item.evidence ? '<small class="muted">Evidencia obrigatoria</small>' : ""}
            </span>
          </label>
        `).join("")}
      </article>
    `;
  }).join("");
}

function renderManager() {
  const statusCounts = countBy(state.data.ris, "status");
  const sectorCounts = countBy(state.data.ris, "sector");
  byId("statusBreakdown").innerHTML = Object.entries(statusCounts).map(([name, count]) => `
    <div class="breakdown-row"><strong>${name}</strong><span>${count}</span></div>
  `).join("");
  byId("sectorBreakdown").innerHTML = Object.entries(sectorCounts).map(([name, count]) => `
    <div class="breakdown-row"><strong>${name}</strong><span>${count}</span></div>
  `).join("");
  byId("auditList").innerHTML = state.data.audit.slice(0, 12).map((entry) => `
    <div class="audit-entry">
      <strong>${entry.text}</strong>
      <span class="muted">${entry.user} - ${formatDate(entry.at)}</span>
    </div>
  `).join("");
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function nextStatus(current) {
  const flow = ["Reportado", "Em analise", "Aguardando responsavel", "Em execucao", "Solucionado"];
  const index = flow.indexOf(current);
  return flow[index + 1] || "Solucionado";
}

function openRisDetail(id) {
  const ris = state.data.ris.find((item) => item.id === id);
  if (!ris) return;
  byId("detailMeta").textContent = `${ris.id} - ${ris.category} - ${ris.sector}`;
  byId("detailTitle").textContent = ris.title;
  byId("detailBody").innerHTML = `
    <div class="detail-section">
      <p>${ris.description}</p>
      <div class="detail-grid">
        <div class="field-box"><span>Status</span>${ris.status}</div>
        <div class="field-box"><span>Gravidade</span>${ris.severity}</div>
        <div class="field-box"><span>Local</span>${ris.location}</div>
        <div class="field-box"><span>Responsavel</span>${userName(ris.assignedToId)}</div>
        <div class="field-box"><span>Prazo</span>${formatDate(ris.dueAt)}</div>
        <div class="field-box"><span>Evidencia</span>${ris.evidenceName || "Nao anexada"}</div>
      </div>
      <div class="record-actions">
        ${isManager() ? `<button class="primary-action compact" type="button" data-advance-ris="${ris.id}">Avancar status</button>` : ""}
        ${isManager() ? `<button class="ghost-action compact" type="button" data-reopen-ris="${ris.id}">Reabrir</button>` : ""}
        ${isManager() ? `<button class="ghost-action compact" type="button" data-create-task="${ris.id}">Criar tarefa vinculada</button>` : ""}
      </div>
    </div>
  `;
  byId("detailDialog").showModal();
}

function openTaskDetail(id) {
  const task = state.data.tasks.find((item) => item.id === id);
  if (!task) return;
  byId("detailMeta").textContent = `${task.id} - ${task.sector}`;
  byId("detailTitle").textContent = task.title;
  byId("detailBody").innerHTML = `
    <div class="detail-section">
      <p>${task.description}</p>
      <div class="detail-grid">
        <div class="field-box"><span>Status</span>${task.status}</div>
        <div class="field-box"><span>Responsavel</span>${userName(task.assignedToId)}</div>
        <div class="field-box"><span>Prazo</span>${formatDate(task.dueAt)}</div>
        <div class="field-box"><span>RIS vinculado</span>${task.risId || "Nao vinculado"}</div>
        <div class="field-box"><span>Evidencia</span>${task.requiresEvidence ? "Obrigatoria" : "Nao obrigatoria"}</div>
        <div class="field-box"><span>Arquivo</span>${task.evidenceName || "Nao anexado"}</div>
      </div>
    </div>
  `;
  byId("detailDialog").showModal();
}

function completeTask(id) {
  const task = state.data.tasks.find((item) => item.id === id);
  if (!task) return;
  if (task.requiresEvidence && !task.evidenceName) {
    const evidence = prompt("Esta tarefa exige evidencia. Informe o nome do arquivo/foto para simular o anexo:");
    if (!evidence) return;
    task.evidenceName = evidence;
  }
  task.status = "Concluido";
  addAudit(`${state.currentUser.name} concluiu ${task.id}`);
  saveData();
  render();
}

function validateTask(id) {
  const task = state.data.tasks.find((item) => item.id === id);
  if (!task) return;
  task.status = "Validado";
  addAudit(`${state.currentUser.name} validou ${task.id}`);
  saveData();
  render();
}

function createTaskFromRis(id) {
  const ris = state.data.ris.find((item) => item.id === id);
  if (!ris) return;
  const due = ris.dueAt || new Date(Date.now() + 86400000).toISOString().slice(0, 16);
  state.data.tasks.unshift({
    id: "T-" + Date.now().toString().slice(-5),
    title: `Resolver ${ris.title}`,
    description: `Tarefa criada a partir do ${ris.id}. Registrar solucao e evidencia quando aplicavel.`,
    assignedToId: ris.assignedToId || state.currentUser.id,
    sector: ris.sector,
    dueAt: due,
    status: "Pendente",
    requiresEvidence: ["Alta", "Critica"].includes(ris.severity),
    evidenceName: "",
    risId: ris.id
  });
  addAudit(`${state.currentUser.name} criou tarefa vinculada ao ${ris.id}`);
  saveData();
  render();
}

function bindEvents() {
  byId("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.currentUser = users[byId("loginUser").value];
    byId("loginView").classList.add("hidden");
    byId("appView").classList.remove("hidden");
    if (!isManager() && state.view === "manager") state.view = "dashboard";
    render();
  });

  byId("logoutButton").addEventListener("click", () => {
    state.currentUser = null;
    byId("appView").classList.add("hidden");
    byId("loginView").classList.remove("hidden");
  });

  byId("newRisButton").addEventListener("click", () => byId("risDialog").showModal());
  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => byId("risDialog").close()));
  document.querySelectorAll("[data-close-detail]").forEach((button) => button.addEventListener("click", () => byId("detailDialog").close()));

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });

  document.body.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-view-jump]");
    if (jump) {
      state.view = jump.dataset.viewJump;
      render();
      return;
    }

    const openRis = event.target.closest("[data-open-ris]");
    if (openRis) {
      openRisDetail(openRis.dataset.openRis);
      return;
    }

    const openTask = event.target.closest("[data-open-task]");
    if (openTask) {
      openTaskDetail(openTask.dataset.openTask);
      return;
    }

    const advance = event.target.closest("[data-advance-ris]");
    if (advance) {
      const ris = state.data.ris.find((item) => item.id === advance.dataset.advanceRis);
      if (ris) {
        ris.status = nextStatus(ris.status);
        addAudit(`${state.currentUser.name} alterou ${ris.id} para ${ris.status}`);
        saveData();
        render();
        byId("detailDialog").close();
      }
      return;
    }

    const reopen = event.target.closest("[data-reopen-ris]");
    if (reopen) {
      const ris = state.data.ris.find((item) => item.id === reopen.dataset.reopenRis);
      if (ris) {
        ris.status = "Reaberto";
        addAudit(`${state.currentUser.name} reabriu ${ris.id}`);
        saveData();
        render();
        byId("detailDialog").close();
      }
      return;
    }

    const createTask = event.target.closest("[data-create-task]");
    if (createTask) {
      createTaskFromRis(createTask.dataset.createTask);
      byId("detailDialog").close();
      state.view = "tasks";
      render();
      return;
    }

    const complete = event.target.closest("[data-complete-task]");
    if (complete) {
      completeTask(complete.dataset.completeTask);
      return;
    }

    const validate = event.target.closest("[data-validate-task]");
    if (validate) {
      validateTask(validate.dataset.validateTask);
    }
  });

  document.body.addEventListener("change", (event) => {
    if (event.target.matches("#risStatusFilter, #risSeverityFilter")) renderRis();
    if (event.target.matches("#taskFilter")) renderTasks();
    if (event.target.matches("[data-check-item]")) {
      const [checklistId, index] = event.target.dataset.checkItem.split(":");
      const checklist = state.data.checklists.find((item) => item.id === checklistId);
      checklist.items[Number(index)].done = event.target.checked;
      addAudit(`${state.currentUser.name} atualizou checklist ${checklist.title}`);
      saveData();
      render();
    }
  });

  byId("risForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const id = "RIS-" + Date.now().toString().slice(-5);
    const evidence = byId("risEvidence").files[0]?.name || "";
    state.data.ris.unshift({
      id,
      title: byId("risTitle").value.trim(),
      description: byId("risDescription").value.trim(),
      reporterId: state.currentUser.id,
      sector: byId("risSector").value,
      location: byId("risLocation").value.trim(),
      category: byId("risCategory").value,
      severity: byId("risSeverity").value,
      urgency: byId("risSeverity").value === "Critica" ? "Imediata" : "Hoje",
      assignedToId: "",
      dueAt: "",
      status: "Reportado",
      evidenceName: evidence,
      solution: "",
      createdAt: new Date().toISOString()
    });
    addAudit(`${state.currentUser.name} abriu ${id}`);
    saveData();
    event.target.reset();
    byId("risDialog").close();
    state.view = "ris";
    render();
  });

  byId("resetDemo").addEventListener("click", () => {
    if (!confirm("Restaurar dados de demonstracao?")) return;
    state.data = defaultData();
    saveData();
    render();
  });
}

bindEvents();
