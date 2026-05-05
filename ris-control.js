const storageKey = "ris-control-demo-v2";

const defaultUsers = [
  { id: "u1", login: "kurt", name: "Kurt", role: "Administrador", sector: "Administracao", permission: "full", active: true },
  { id: "u2", login: "samy", name: "Samy", role: "Gerente", sector: "Gerencia", permission: "manager", active: true },
  { id: "u3", login: "isabela", name: "Isabela Amorin", role: "Funcionario", sector: "Professores", permission: "basic", active: true },
  { id: "u4", login: "brono", name: "Brono Ferrandi", role: "Funcionario", sector: "Professores", permission: "basic", active: true },
  { id: "u5", login: "cesar", name: "Cesar", role: "Funcionario", sector: "Professores", permission: "basic", active: true },
  { id: "u6", login: "felipe", name: "Felipe Gomes", role: "Funcionario", sector: "Professores", permission: "basic", active: true },
  { id: "u7", login: "daniela", name: "Daniela", role: "Funcionario", sector: "Professores", permission: "basic", active: true },
  { id: "u8", login: "clarice", name: "Clarice", role: "Funcionario", sector: "Recepcao", permission: "basic", active: true },
  { id: "u9", login: "kelly", name: "Kelly", role: "Funcionario", sector: "Recepcao", permission: "basic", active: true },
  { id: "u10", login: "kanannda", name: "Kanannda", role: "Funcionario", sector: "Comercial", permission: "basic", active: true },
  { id: "u11", login: "deva", name: "Deva", role: "Lider", sector: "Limpeza", permission: "sector", active: true },
  { id: "u12", login: "luiz", name: "Luiz", role: "Funcionario", sector: "Limpeza", permission: "basic", active: true },
  { id: "u13", login: "paulino", name: "Paulino", role: "Prestador", sector: "Manutencao", permission: "basic", active: true },
  { id: "u14", login: "rui", name: "Rui", role: "Prestador", sector: "Manutencao", permission: "basic", active: true },
  { id: "u15", login: "thiago", name: "Thiago", role: "Prestador", sector: "Manutencao", permission: "basic", active: true }
];

const state = {
  currentUser: null,
  view: "dashboard",
  data: loadData()
};

function defaultData() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  return {
    users: defaultUsers.map((user) => ({ ...user })),
    ris: [
      {
        id: "RIS-1001",
        title: "Leg press travando no retorno",
        description: "Felipe percebeu que o leg press esta travando no retorno e orientou os alunos a nao usarem ate avaliacao.",
        reporterId: "u6",
        sector: "Equipamentos",
        location: "Sala de musculacao",
        category: "Equipamentos",
        severity: "Alta",
        urgency: "Hoje",
        assignedToId: "u13",
        dueAt: today + "T18:00",
        status: "Em execucao",
        evidenceName: "leg-press-travando.jpg",
        solution: "",
        createdAt: today + "T09:10",
        history: [
          { id: "H-1001-1", type: "created", title: "RIS aberto", description: "Felipe Gomes registrou a ocorrencia.", userId: "u6", at: today + "T09:10" },
          { id: "H-1001-2", type: "assigned", title: "Responsavel definido", description: "Samy delegou a verificacao para Paulino.", userId: "u2", at: today + "T09:20" },
          { id: "H-1001-3", type: "status_changed", title: "Status alterado", description: "RIS movido para Em execucao.", userId: "u2", at: today + "T09:22" }
        ]
      },
      {
        id: "RIS-1002",
        title: "Banheiro feminino com papel acabando",
        description: "Clarice recebeu aviso de aluna sobre papel quase acabando no banheiro feminino.",
        reporterId: "u8",
        sector: "Limpeza",
        location: "Banheiro feminino",
        category: "Limpeza",
        severity: "Media",
        urgency: "Hoje",
        assignedToId: "u11",
        dueAt: today + "T12:00",
        status: "Reportado",
        evidenceName: "",
        solution: "",
        createdAt: today + "T08:35",
        history: [
          { id: "H-1002-1", type: "created", title: "RIS aberto", description: "Clarice registrou o reporte da aluna.", userId: "u8", at: today + "T08:35" }
        ]
      },
      {
        id: "RIS-1003",
        title: "Camera do estacionamento sem imagem",
        description: "Kelly percebeu que a camera do estacionamento nao aparece no monitor da recepcao.",
        reporterId: "u9",
        sector: "Recepcao",
        location: "Recepcao / monitoramento",
        category: "Seguranca",
        severity: "Critica",
        urgency: "Imediata",
        assignedToId: "u15",
        dueAt: today + "T10:30",
        status: "Aguardando responsavel",
        evidenceName: "",
        solution: "",
        createdAt: today + "T07:50",
        history: [
          { id: "H-1003-1", type: "created", title: "RIS aberto", description: "Kelly registrou a falha da camera.", userId: "u9", at: today + "T07:50" },
          { id: "H-1003-2", type: "assigned", title: "Encaminhado para prestador", description: "Samy indicou Thiago para iluminacao, som e cameras.", userId: "u2", at: today + "T08:00" }
        ]
      },
      {
        id: "RIS-1004",
        title: "Aluno reclamou da demora no retorno comercial",
        description: "Kanannda registrou reclamacao de lead que aguardou retorno sobre plano familiar desde ontem.",
        reporterId: "u10",
        sector: "Comercial",
        location: "WhatsApp comercial",
        category: "Atendimento",
        severity: "Media",
        urgency: "Hoje",
        assignedToId: "u2",
        dueAt: today + "T16:00",
        status: "Em analise",
        evidenceName: "",
        solution: "",
        createdAt: today + "T10:15",
        history: [
          { id: "H-1004-1", type: "created", title: "RIS aberto", description: "Kanannda registrou reclamacao comercial.", userId: "u10", at: today + "T10:15" },
          { id: "H-1004-2", type: "status_changed", title: "Status alterado", description: "Samy iniciou analise da tratativa.", userId: "u2", at: today + "T10:25" }
        ]
      }
    ],
    tasks: [
      {
        id: "T-2001",
        title: "Avaliar leg press travando",
        description: "Verificar cabo, trilho e rolamentos. Enviar foto ou video depois da avaliacao.",
        assignedToId: "u13",
        sector: "Equipamentos",
        dueAt: today + "T18:00",
        status: "Em andamento",
        requiresEvidence: true,
        evidenceName: "",
        risId: "RIS-1001"
      },
      {
        id: "T-2002",
        title: "Repor papel do banheiro feminino",
        description: "Repor papel e conferir sabonete, lixeira e espelho. Anexar foto ao concluir.",
        assignedToId: "u11",
        sector: "Limpeza",
        dueAt: today + "T12:00",
        status: "Pendente",
        requiresEvidence: true,
        evidenceName: "",
        risId: "RIS-1002"
      },
      {
        id: "T-2003",
        title: "Organizar halteres antes do pico",
        description: "Conferir halteres, anilhas e barras antes do fluxo das 18h.",
        assignedToId: "u4",
        sector: "Professores",
        dueAt: today + "T17:00",
        status: "Pendente",
        requiresEvidence: false,
        evidenceName: "",
        risId: ""
      },
      {
        id: "T-2004",
        title: "Revisar camera do estacionamento",
        description: "Verificar camera, cabo, DVR e imagem no monitor da recepcao.",
        assignedToId: "u15",
        sector: "Manutencao",
        dueAt: today + "T10:30",
        status: "Pendente",
        requiresEvidence: true,
        evidenceName: "",
        risId: "RIS-1003"
      },
      {
        id: "T-2005",
        title: "Retornar lead do plano familiar",
        description: "Fazer contato com o lead, registrar retorno dado e avisar Samy sobre a tratativa.",
        assignedToId: "u10",
        sector: "Comercial",
        dueAt: today + "T16:00",
        status: "Pendente",
        requiresEvidence: false,
        evidenceName: "",
        risId: "RIS-1004"
      }
    ],
    checklists: [
      {
        id: "C-3001",
        title: "Recepcao - Abertura",
        sector: "Recepcao",
        assignedToId: "u8",
        items: [
          { title: "Ligar luzes", done: true, evidence: false },
          { title: "Testar catraca", done: false, evidence: false },
          { title: "Conferir WhatsApp", done: true, evidence: false },
          { title: "Verificar bebedouro", done: false, evidence: false }
        ]
      },
      {
        id: "C-3002",
        title: "Professores - Turno tarde",
        sector: "Professores",
        assignedToId: "u3",
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
        assignedToId: "u12",
        items: [
          { title: "Limpar banheiros", done: false, evidence: true },
          { title: "Repor papel", done: true, evidence: false },
          { title: "Limpar espelhos", done: false, evidence: true },
          { title: "Retirar lixo", done: false, evidence: false }
        ]
      },
      {
        id: "C-3004",
        title: "Recepcao - Fechamento",
        sector: "Recepcao",
        assignedToId: "u9",
        items: [
          { title: "Conferir catraca e acessos", done: false, evidence: false },
          { title: "Verificar pagamentos pendentes", done: true, evidence: false },
          { title: "Organizar balcao", done: false, evidence: true },
          { title: "Registrar problemas via RIS", done: false, evidence: false }
        ]
      },
      {
        id: "C-3005",
        title: "Comercial - SDR diario",
        sector: "Comercial",
        assignedToId: "u10",
        items: [
          { title: "Responder novos leads", done: true, evidence: false },
          { title: "Atualizar retornos no controle", done: false, evidence: false },
          { title: "Avisar Samy sobre reclamacoes", done: false, evidence: false },
          { title: "Conferir propostas em aberto", done: true, evidence: false }
        ]
      },
      {
        id: "C-3006",
        title: "Gerencia - Rotina diaria",
        sector: "Gerencia",
        assignedToId: "u2",
        items: [
          { title: "Verificar RIS criticos", done: true, evidence: false },
          { title: "Cobrar tarefas atrasadas", done: false, evidence: false },
          { title: "Validar checklists concluidos", done: false, evidence: false },
          { title: "Atualizar painel operacional", done: false, evidence: false }
        ]
      }
    ],
    audit: [
      { id: "A-1", text: "Samy delegou RIS-1001 para Paulino", user: "Samy", at: today + "T09:20" },
      { id: "A-2", text: "Felipe Gomes abriu RIS-1001", user: "Felipe Gomes", at: today + "T09:10" },
      { id: "A-3", text: "Clarice abriu RIS-1002", user: "Clarice", at: today + "T08:35" },
      { id: "A-4", text: "Kelly abriu RIS-1003 sobre camera", user: "Kelly", at: today + "T07:50" },
      { id: "A-5", text: "Kanannda registrou reclamacao comercial", user: "Kanannda", at: today + "T10:15" }
    ]
  };
}

function loadData() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return defaultData();
  try {
    return migrateData(JSON.parse(raw));
  } catch {
    return defaultData();
  }
}

function migrateData(data) {
  if (!data.users) {
    data.users = defaultUsers.map((user) => ({ ...user }));
  }
  data.users = data.users.map((user) => ({
    permission: permissionFromRole(user.role),
    active: true,
    ...user
  }));
  data.ris = data.ris.map((ris) => ({
    ...ris,
    history: ris.history || [
      {
        id: "H-" + ris.id + "-created",
        type: "created",
        title: "RIS aberto",
        description: `${userNameFromData(data, ris.reporterId)} registrou a ocorrencia.`,
        userId: ris.reporterId,
        at: ris.createdAt || new Date().toISOString()
      }
    ]
  }));
  return data;
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(state.data));
}

function byId(id) {
  return document.getElementById(id);
}

function activeUsers() {
  return state.data.users.filter((user) => user.active);
}

function userById(id) {
  return state.data.users.find((user) => user.id === id);
}

function userByLogin(login) {
  return state.data.users.find((user) => user.login === login);
}

function userName(id) {
  return userById(id)?.name || "Sem responsavel";
}

function userNameFromData(data, id) {
  return data.users?.find((user) => user.id === id)?.name || "Usuario";
}

function permissionFromRole(role) {
  if (role === "Administrador") return "full";
  if (role === "Gerente") return "manager";
  if (role === "Lider") return "sector";
  return "basic";
}

function permissionLabel(permission) {
  const labels = {
    basic: "Basica",
    sector: "Setor",
    manager: "Gerencial",
    full: "Full"
  };
  return labels[permission] || "Basica";
}

function permissionDescription(permission) {
  const descriptions = {
    basic: "ve apenas os proprios RIS, tarefas e checklists atribuidos.",
    sector: "acompanha o setor, valida checklists e cobra pendencias do time.",
    manager: "tem visao gerencial da unidade, painel e relatorios operacionais.",
    full: "administra usuarios, perfis, permissoes e configuracoes sensiveis."
  };
  return descriptions[permission] || descriptions.basic;
}

function isManager() {
  return ["sector", "manager", "full"].includes(state.currentUser?.permission);
}

function canSeeAll() {
  return ["manager", "full"].includes(state.currentUser?.permission);
}

function hasFullPermission() {
  return state.currentUser?.permission === "full";
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

function addRisHistory(ris, type, title, description) {
  if (!ris.history) ris.history = [];
  ris.history.unshift({
    id: "H-" + Date.now(),
    type,
    title,
    description,
    userId: state.currentUser.id,
    at: new Date().toISOString()
  });
}

function formatForInputDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function visibleRis() {
  if (canSeeAll()) return state.data.ris;
  if (state.currentUser.permission === "sector") {
    return state.data.ris.filter((ris) => ris.sector === state.currentUser.sector || ris.reporterId === state.currentUser.id || ris.assignedToId === state.currentUser.id);
  }
  return state.data.ris.filter((ris) => ris.reporterId === state.currentUser.id || ris.assignedToId === state.currentUser.id);
}

function visibleTasks() {
  if (canSeeAll()) return state.data.tasks;
  if (state.currentUser.permission === "sector") {
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
  renderUsers();
  renderManager();
}

function renderShell() {
  if ((state.view === "users" || state.view === "settings") && !hasFullPermission()) {
    state.view = "dashboard";
  }
  if (state.view === "manager" && !isManager()) {
    state.view = "dashboard";
  }

  byId("todayLabel").textContent = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());

  const titles = {
    dashboard: "Central operacional",
    ris: "Ocorrencias internas",
    tasks: "Tarefas",
    checklists: "Checklists",
    users: "Usuarios",
    manager: "Gerencia",
    settings: "Ajustes"
  };
  byId("viewTitle").textContent = titles[state.view];
  if (state.currentUser) {
    byId("profileInitials").textContent = state.currentUser.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    byId("profileName").textContent = state.currentUser.name;
    byId("profileRole").textContent = `${state.currentUser.role} - ${permissionLabel(state.currentUser.permission)}`;
  }

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  byId(state.view + "View").classList.add("active-view");
  document.querySelectorAll(".manager-only").forEach((item) => {
    item.classList.toggle("hidden", !isManager());
  });
  document.querySelectorAll(".full-only").forEach((item) => {
    item.classList.toggle("hidden", !hasFullPermission());
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
        ${isManager() ? `<button class="primary-action compact" type="button" data-manage-ris="${item.id}">Gerenciar RIS</button>` : ""}
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

function renderUsers() {
  if (!hasFullPermission()) {
    byId("userList").innerHTML = empty("Apenas usuarios com permissao full podem acessar esta area.");
    return;
  }

  byId("userList").innerHTML = state.data.users.map((user) => `
    <article class="record-card user-card">
      <div class="record-top">
        <div>
          <h3>${user.name}</h3>
          <p class="muted">@${user.login} - ${user.role} - ${user.sector}</p>
        </div>
        <div class="pill-row">
          <span class="pill ${user.permission === "full" ? "green" : "blue"}">${permissionLabel(user.permission)}</span>
          <span class="pill ${user.active ? "green" : "red"}">${user.active ? "Ativo" : "Inativo"}</span>
        </div>
      </div>
      <p>Permissao operacional: ${permissionDescription(user.permission)}</p>
      <div class="record-actions">
        <button class="ghost-action compact" type="button" data-edit-user="${user.id}">Editar</button>
        <button class="ghost-action compact" type="button" data-toggle-user="${user.id}">
          ${user.active ? "Inativar" : "Ativar"}
        </button>
      </div>
    </article>
  `).join("");
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
  const history = ris.history || [];
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
        ${isManager() ? `<button class="primary-action compact" type="button" data-manage-ris="${ris.id}">Gerenciar RIS</button>` : ""}
        ${isManager() ? `<button class="ghost-action compact" type="button" data-reopen-ris="${ris.id}">Reabrir</button>` : ""}
        ${isManager() ? `<button class="ghost-action compact" type="button" data-create-task="${ris.id}">Criar tarefa vinculada</button>` : ""}
      </div>
      <div class="timeline-block">
        <div class="panel-head">
          <h3>Historico do RIS</h3>
          <span class="pill">${history.length} etapas</span>
        </div>
        <div class="timeline-list">
          ${history.length ? history.map((entry) => `
            <div class="timeline-entry">
              <span class="timeline-dot ${entry.type}"></span>
              <div>
                <strong>${entry.title}</strong>
                <p>${entry.description}</p>
                <small>${userName(entry.userId)} - ${formatDate(entry.at)}</small>
              </div>
            </div>
          `).join("") : empty("Este RIS ainda nao tem movimentacoes registradas.")}
        </div>
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
  const task = {
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
  };
  state.data.tasks.unshift(task);
  addRisHistory(ris, "task_created", "Tarefa vinculada", `${task.id} criada para ${userName(task.assignedToId)}.`);
  addAudit(`${state.currentUser.name} criou tarefa vinculada ao ${ris.id}`);
  saveData();
  render();
}

function populateManageRisUsers() {
  byId("manageRisAssigned").innerHTML = [
    '<option value="">Sem responsavel definido</option>',
    ...activeUsers().map((user) => `<option value="${user.id}">${user.name} - ${user.sector}</option>`)
  ].join("");
}

function inferRisNature(ris) {
  if (ris.nature) return ris.nature;
  if (["Atendimento", "Aluno", "Financeiro", "Comportamento de funcionario", "Comportamento de aluno"].includes(ris.category)) {
    return "Tratativa";
  }
  return "Execucao";
}

function inferAssigneeType(ris) {
  if (ris.assigneeType) return ris.assigneeType;
  const user = userById(ris.assignedToId);
  if (!user) return "Sem executor definido";
  if (user.role === "Prestador") return "Prestador externo";
  return "Funcionario interno";
}

function openManageRisDialog(id) {
  if (!isManager()) return;
  const ris = state.data.ris.find((item) => item.id === id);
  if (!ris) return;
  populateManageRisUsers();
  byId("manageRisId").value = ris.id;
  byId("manageRisTitle").textContent = `Gerenciar ${ris.id}`;
  byId("manageRisStatus").value = ris.status;
  byId("manageRisAssigned").value = ris.assignedToId || "";
  byId("manageRisDue").value = formatForInputDate(ris.dueAt);
  byId("manageRisSeverity").value = ris.severity;
  byId("manageRisNature").value = inferRisNature(ris);
  byId("manageRisAssigneeType").value = inferAssigneeType(ris);
  byId("manageRisNote").value = "";
  byId("manageRisDialog").showModal();
}

function saveManageRis() {
  if (!isManager()) return;
  const ris = state.data.ris.find((item) => item.id === byId("manageRisId").value);
  if (!ris) return;

  const changes = [];
  const next = {
    status: byId("manageRisStatus").value,
    assignedToId: byId("manageRisAssigned").value,
    dueAt: byId("manageRisDue").value,
    severity: byId("manageRisSeverity").value,
    nature: byId("manageRisNature").value,
    assigneeType: byId("manageRisAssigneeType").value
  };

  if (ris.status !== next.status) changes.push(`Status: ${ris.status} -> ${next.status}`);
  if ((ris.assignedToId || "") !== next.assignedToId) changes.push(`Responsavel: ${userName(ris.assignedToId)} -> ${userName(next.assignedToId)}`);
  if ((ris.dueAt || "") !== next.dueAt) changes.push(`Prazo: ${formatDate(ris.dueAt)} -> ${formatDate(next.dueAt)}`);
  if (ris.severity !== next.severity) changes.push(`Gravidade: ${ris.severity} -> ${next.severity}`);
  if (inferRisNature(ris) !== next.nature) changes.push(`Natureza: ${inferRisNature(ris)} -> ${next.nature}`);
  if (inferAssigneeType(ris) !== next.assigneeType) changes.push(`Tipo de responsavel: ${inferAssigneeType(ris)} -> ${next.assigneeType}`);

  Object.assign(ris, next);
  const note = byId("manageRisNote").value.trim();
  if (changes.length) {
    addRisHistory(ris, "managed", "Gestao atualizada", changes.join("; ") + ".");
  }
  if (note) {
    addRisHistory(ris, "management_note", "Observacao da gestao", note);
  }
  if (!changes.length && !note) {
    byId("manageRisDialog").close();
    return;
  }

  addAudit(`${state.currentUser.name} atualizou gestao do ${ris.id}`);
  saveData();
  byId("manageRisDialog").close();
  byId("detailDialog").close();
  render();
}

function populateLoginUsers() {
  byId("loginUser").innerHTML = activeUsers().map((user) => `
    <option value="${user.login}">${user.name} - ${user.role}</option>
  `).join("");
}

function populateAssignableUsers() {
  const options = activeUsers().map((user) => `
    <option value="${user.id}">${user.name} - ${user.sector}</option>
  `).join("");
  byId("taskAssignedInput").innerHTML = options;
  byId("checklistAssignedInput").innerHTML = options;
}

function defaultDueDateTime(hoursAhead = 4) {
  const date = new Date(Date.now() + hoursAhead * 60 * 60 * 1000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function openUserDialog(id = "") {
  if (!hasFullPermission()) return;
  const user = id ? userById(id) : null;
  byId("userDialogTitle").textContent = user ? "Editar usuario" : "Novo usuario";
  byId("userId").value = user?.id || "";
  byId("userNameInput").value = user?.name || "";
  byId("userLoginInput").value = user?.login || "";
  byId("userRoleInput").value = user?.role || "Funcionario";
  byId("userSectorInput").value = user?.sector || "Professores";
  byId("userPermissionInput").value = user?.permission || "basic";
  byId("userActiveInput").value = String(user?.active ?? true);
  byId("userDialog").showModal();
}

function saveUserFromForm() {
  if (!hasFullPermission()) return;
  const id = byId("userId").value || "u" + Date.now();
  const login = byId("userLoginInput").value.trim().toLowerCase().replace(/\s+/g, "-");
  const duplicated = state.data.users.some((user) => user.login === login && user.id !== id);
  if (duplicated) {
    alert("Ja existe um usuario com este login.");
    return;
  }

  const payload = {
    id,
    login,
    name: byId("userNameInput").value.trim(),
    role: byId("userRoleInput").value,
    sector: byId("userSectorInput").value,
    permission: byId("userPermissionInput").value,
    active: byId("userActiveInput").value === "true"
  };

  const index = state.data.users.findIndex((user) => user.id === id);
  if (index >= 0) {
    state.data.users[index] = payload;
    addAudit(`${state.currentUser.name} editou permissoes de ${payload.name}`);
  } else {
    state.data.users.push(payload);
    addAudit(`${state.currentUser.name} cadastrou usuario ${payload.name}`);
  }

  if (state.currentUser.id === payload.id) {
    state.currentUser = payload;
  }
  saveData();
  populateLoginUsers();
  populateAssignableUsers();
  byId("userDialog").close();
  render();
}

function toggleUserStatus(id) {
  if (!hasFullPermission()) return;
  const user = userById(id);
  if (!user) return;
  if (user.id === state.currentUser.id) {
    alert("Voce nao pode inativar o proprio usuario logado.");
    return;
  }
  user.active = !user.active;
  addAudit(`${state.currentUser.name} ${user.active ? "ativou" : "inativou"} ${user.name}`);
  saveData();
  populateLoginUsers();
  populateAssignableUsers();
  render();
}

function openTaskDialog() {
  if (!isManager()) return;
  populateAssignableUsers();
  byId("taskForm").reset();
  byId("taskDueInput").value = defaultDueDateTime();
  byId("taskDialog").showModal();
}

function createManualTask() {
  if (!isManager()) return;
  const assignedToId = byId("taskAssignedInput").value;
  const task = {
    id: "T-" + Date.now().toString().slice(-5),
    title: byId("taskTitleInput").value.trim(),
    description: byId("taskDescriptionInput").value.trim(),
    assignedToId,
    sector: byId("taskSectorInput").value,
    dueAt: byId("taskDueInput").value,
    status: "Pendente",
    requiresEvidence: byId("taskEvidenceInput").value === "true",
    evidenceName: "",
    risId: ""
  };
  state.data.tasks.unshift(task);
  addAudit(`${state.currentUser.name} criou tarefa ${task.id} para ${userName(assignedToId)}`);
  saveData();
  byId("taskDialog").close();
  state.view = "tasks";
  render();
}

function openChecklistDialog() {
  if (!isManager()) return;
  populateAssignableUsers();
  byId("checklistForm").reset();
  byId("checklistDialog").showModal();
}

function createChecklist() {
  if (!isManager()) return;
  const lines = byId("checklistItemsInput").value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    alert("Inclua pelo menos um item no checklist.");
    return;
  }

  const checklist = {
    id: "C-" + Date.now().toString().slice(-5),
    title: byId("checklistTitleInput").value.trim(),
    sector: byId("checklistSectorInput").value,
    type: byId("checklistTypeInput").value,
    assignedToId: byId("checklistAssignedInput").value,
    items: lines.map((line) => {
      const evidence = line.endsWith("*");
      return {
        title: evidence ? line.slice(0, -1).trim() : line,
        done: false,
        evidence
      };
    })
  };

  state.data.checklists.unshift(checklist);
  addAudit(`${state.currentUser.name} criou checklist ${checklist.title}`);
  saveData();
  byId("checklistDialog").close();
  state.view = "checklists";
  render();
}

function closeQuickCreateMenu() {
  byId("quickCreateMenu").classList.add("hidden");
  byId("quickCreateButton").setAttribute("aria-expanded", "false");
}

function closeProfileMenu() {
  byId("profileMenu").classList.add("hidden");
  byId("profileButton").setAttribute("aria-expanded", "false");
}

function toggleQuickCreateMenu() {
  const menu = byId("quickCreateMenu");
  const isHidden = menu.classList.toggle("hidden");
  byId("quickCreateButton").setAttribute("aria-expanded", String(!isHidden));
  if (!isHidden) closeProfileMenu();
}

function toggleProfileMenu() {
  const menu = byId("profileMenu");
  const isHidden = menu.classList.toggle("hidden");
  byId("profileButton").setAttribute("aria-expanded", String(!isHidden));
  if (!isHidden) closeQuickCreateMenu();
}

function closeMobileMenu() {
  byId("appView").classList.remove("mobile-menu-open");
  byId("mobileMenuOverlay").classList.add("hidden");
  byId("mobileMenuButton").setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const app = byId("appView");
  const isOpen = app.classList.toggle("mobile-menu-open");
  byId("mobileMenuOverlay").classList.toggle("hidden", !isOpen);
  byId("mobileMenuButton").setAttribute("aria-expanded", String(isOpen));
}

function bindEvents() {
  populateLoginUsers();
  populateAssignableUsers();

  byId("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.currentUser = userByLogin(byId("loginUser").value);
    if (!state.currentUser || !state.currentUser.active) {
      alert("Usuario inativo ou inexistente.");
      return;
    }
    byId("loginView").classList.add("hidden");
    byId("appView").classList.remove("hidden");
    if (!isManager() && state.view === "manager") state.view = "dashboard";
    if (!hasFullPermission() && (state.view === "users" || state.view === "settings")) state.view = "dashboard";
    render();
  });

  byId("logoutButton").addEventListener("click", () => {
    state.currentUser = null;
    byId("appView").classList.add("hidden");
    byId("loginView").classList.remove("hidden");
  });

  byId("newUserButton").addEventListener("click", () => openUserDialog());
  byId("quickCreateButton").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleQuickCreateMenu();
  });
  byId("profileButton").addEventListener("click", (event) => {
    event.stopPropagation();
    toggleProfileMenu();
  });
  byId("mobileMenuButton").addEventListener("click", () => toggleMobileMenu());
  byId("mobileMenuOverlay").addEventListener("click", () => closeMobileMenu());
  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => byId("risDialog").close()));
  document.querySelectorAll("[data-close-detail]").forEach((button) => button.addEventListener("click", () => byId("detailDialog").close()));
  document.querySelectorAll("[data-close-manage-ris]").forEach((button) => button.addEventListener("click", () => byId("manageRisDialog").close()));
  document.querySelectorAll("[data-close-user]").forEach((button) => button.addEventListener("click", () => byId("userDialog").close()));
  document.querySelectorAll("[data-close-task]").forEach((button) => button.addEventListener("click", () => byId("taskDialog").close()));
  document.querySelectorAll("[data-close-checklist]").forEach((button) => button.addEventListener("click", () => byId("checklistDialog").close()));

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      closeMobileMenu();
      render();
    });
  });

  document.body.addEventListener("click", (event) => {
    if (!event.target.closest(".action-menu")) {
      closeQuickCreateMenu();
    }
    if (!event.target.closest(".profile-menu")) {
      closeProfileMenu();
    }

    const jump = event.target.closest("[data-view-jump]");
    if (jump) {
      state.view = jump.dataset.viewJump;
      render();
      return;
    }

    const openRisForm = event.target.closest("[data-open-ris-form]");
    if (openRisForm) {
      byId("risDialog").showModal();
      closeQuickCreateMenu();
      return;
    }

    const openTaskForm = event.target.closest("[data-open-task-form]");
    if (openTaskForm) {
      openTaskDialog();
      closeQuickCreateMenu();
      return;
    }

    const openChecklistForm = event.target.closest("[data-open-checklist-form]");
    if (openChecklistForm) {
      openChecklistDialog();
      closeQuickCreateMenu();
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

    const manageRis = event.target.closest("[data-manage-ris]");
    if (manageRis) {
      openManageRisDialog(manageRis.dataset.manageRis);
      return;
    }

    const reopen = event.target.closest("[data-reopen-ris]");
    if (reopen) {
      const ris = state.data.ris.find((item) => item.id === reopen.dataset.reopenRis);
      if (ris) {
        const oldStatus = ris.status;
        ris.status = "Reaberto";
        addRisHistory(ris, "reopened", "RIS reaberto", `${oldStatus} -> Reaberto.`);
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
      return;
    }

    const editUser = event.target.closest("[data-edit-user]");
    if (editUser) {
      openUserDialog(editUser.dataset.editUser);
      return;
    }

    const toggleUser = event.target.closest("[data-toggle-user]");
    if (toggleUser) {
      toggleUserStatus(toggleUser.dataset.toggleUser);
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
    const now = new Date().toISOString();
    const ris = {
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
      createdAt: now,
      history: [
        {
          id: "H-" + Date.now(),
          type: "created",
          title: "RIS aberto",
          description: `${state.currentUser.name} registrou a ocorrencia como Reportado.`,
          userId: state.currentUser.id,
          at: now
        }
      ]
    };
    if (evidence) {
      ris.history.unshift({
        id: "H-" + Date.now() + "-evidence",
        type: "evidence_added",
        title: "Evidencia anexada",
        description: evidence,
        userId: state.currentUser.id,
        at: now
      });
    }
    state.data.ris.unshift(ris);
    addAudit(`${state.currentUser.name} abriu ${id}`);
    saveData();
    event.target.reset();
    byId("risDialog").close();
    state.view = "ris";
    render();
  });

  byId("userForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveUserFromForm();
  });

  byId("manageRisForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveManageRis();
  });

  byId("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    createManualTask();
  });

  byId("checklistForm").addEventListener("submit", (event) => {
    event.preventDefault();
    createChecklist();
  });

  byId("resetDemo").addEventListener("click", () => {
    if (!confirm("Restaurar dados de demonstracao?")) return;
    state.data = defaultData();
    saveData();
    populateLoginUsers();
    populateAssignableUsers();
    render();
  });
}

bindEvents();
