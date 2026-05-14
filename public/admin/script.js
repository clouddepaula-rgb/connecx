// ============================================
// admin/script.js — Lógica do Painel Admin
// Connecx — Gabriel de Paula
// ============================================

// Referências DOM
const loginOverlay  = document.getElementById('loginOverlay')
const adminLayout   = document.getElementById('adminLayout')
const loginForm     = document.getElementById('loginForm')
const loginError    = document.getElementById('loginError')
const loginBtn      = document.getElementById('loginBtn')
const logoutBtn     = document.getElementById('logoutBtn')
const sidebarToggle = document.getElementById('sidebarToggle')
const topbarMenu    = document.getElementById('topbarMenu')
const sidebar       = document.getElementById('sidebar')
const toast         = document.getElementById('toast')
const modalOverlay  = document.getElementById('modalOverlay')
const modalTitle    = document.getElementById('modalTitle')
const modalBody     = document.getElementById('modalBody')
const modalClose    = document.getElementById('modalClose')
const topbarTitle   = document.getElementById('topbarTitle')
const statusDot     = document.getElementById('statusDot')
const statusLabel   = document.getElementById('statusLabel')

// ============================================
// INIT — verifica sessão ao carregar
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  const session = await ConnecxDB.getSession()
  if (session) {
    showAdmin()
    loadDashboard()
  } else {
    // Garante que o layout administrativo esteja escondido
    adminLayout.style.display = 'none'
    showLogin()
  }
})

// ============================================
// AUTH
// ============================================
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  loginError.textContent = ''
  loginBtn.textContent   = 'Entrando...'
  loginBtn.disabled      = true

  const email    = document.getElementById('loginEmail').value.trim()
  const password = document.getElementById('loginPassword').value

  const result = await ConnecxDB.signIn(email, password)

  if (result.error) {
    loginError.textContent = 'E-mail ou senha inválidos.'
    loginBtn.textContent   = 'Entrar'
    loginBtn.disabled      = false
    return
  }

  showAdmin()
  loadDashboard()
})

logoutBtn.addEventListener('click', async () => {
  await ConnecxDB.signOut()
  adminLayout.style.display = 'none'
  showLogin()
})

function showLogin() {
  loginOverlay.style.display = 'flex'
  adminLayout.style.display  = 'none'
  loginBtn.textContent       = 'Entrar'
  loginBtn.disabled          = false
}

function showAdmin() {
  loginOverlay.style.display = 'none'
  adminLayout.style.display  = 'grid'
}

// ============================================
// SIDEBAR / NAVEGAÇÃO
// ============================================
const navItems = document.querySelectorAll('.nav-item')
const sections = document.querySelectorAll('.admin-section')

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.dataset.section
    switchSection(target)
    // fechar sidebar mobile
    sidebar.classList.remove('open')
  })
})

function switchSection(sectionId) {
  // Atualiza nav
  navItems.forEach(i => i.classList.remove('active'))
  const activeNav = document.querySelector(`.nav-item[data-section="${sectionId}"]`)
  if (activeNav) activeNav.classList.add('active')

  // Atualiza seções
  sections.forEach(s => s.classList.remove('active'))
  const activeSection = document.getElementById(`section-${sectionId}`)
  if (activeSection) activeSection.classList.add('active')

  // Atualiza título do topbar
  topbarTitle.textContent = activeNav?.textContent.trim() || sectionId

  // Carrega dados da seção
  loadSection(sectionId)
}

function loadSection(id) {
  const loaders = {
    dashboard:    loadDashboard,
    geral:        loadGeral,
    hero:         loadHero,
    'para-quem':  loadParaQuem,
    portfolio:    loadPortfolio,
    'portfolio-privado': loadPortfolioPrivado,
    processo:     loadProcesso,
    diferenciais: loadDiferenciais,
    cta:          loadCTA,
    leads:        loadLeads,
  }
  if (loaders[id]) loaders[id]()
}

// Atalhos rápidos do dashboard
document.querySelectorAll('.quick-link').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.goto))
})

// Sidebar mobile toggle
sidebarToggle.addEventListener('click', () => sidebar.classList.remove('open'))
topbarMenu.addEventListener('click', () => sidebar.classList.toggle('open'))

// ============================================
// TOAST NOTIFICATIONS
// ============================================
let toastTimer = null

function showToast(msg, type = 'success') {
  toast.textContent  = msg
  toast.className    = `toast ${type} show`
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.className = 'toast' }, 3000)
}

// ============================================
// MODAL
// ============================================
modalClose.addEventListener('click', closeModal)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal()
})

function openModal(title, bodyHTML) {
  modalTitle.textContent = title
  modalBody.innerHTML    = bodyHTML
  modalOverlay.classList.add('open')
}

function closeModal() {
  modalOverlay.classList.remove('open')
}

// ============================================
// HELPER — preenche formulário com dados do DB
// ============================================
function fillForm(formEl, data) {
  if (!data || !formEl) return
  Object.keys(data).forEach(key => {
    const el = formEl.querySelector(`[name="${key}"]`)
    if (el) el.value = data[key] ?? ''
  })
}

// ============================================
// HELPER — coleta dados do formulário
// ============================================
function collectForm(formEl) {
  const data = {}
  const fields = formEl.querySelectorAll('input, textarea, select')
  fields.forEach(f => {
    if (f.name) data[f.name] = f.value.trim()
  })
  return data
}

// ============================================
// DASHBOARD
// ============================================
async function loadDashboard() {
  // Carrega stats em paralelo
  const [leads, projects, cards] = await Promise.all([
    ConnecxDB.getLeads(),
    ConnecxDB.getPortfolioProjects(),
    ConnecxDB.getTargetCards(),
  ])

  document.getElementById('stat-leads').textContent    = leads.length
  document.getElementById('stat-projects').textContent = projects.length
  document.getElementById('stat-cards').textContent    = cards.length

  // Verifica status Supabase
  const config = await ConnecxDB.getSiteConfig()
  if (config) {
    statusDot.className   = 'status-dot'
    statusLabel.textContent = 'Supabase conectado'
  } else {
    statusDot.className   = 'status-dot offline'
    statusLabel.textContent = 'Sem conexão'
  }
}

// ============================================
// CONFIGURAÇÕES GERAIS
// ============================================
async function loadGeral() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-geral'), config)
}

document.getElementById('form-geral').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Configurações salvas!') : showToast('❌ Erro ao salvar', 'error')
})

// ============================================
// HERO
// ============================================
async function loadHero() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-hero'), config)
}

document.getElementById('form-hero').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Hero salvo!') : showToast('❌ Erro ao salvar', 'error')
})

// ============================================
// PARA QUEM — cards dinâmicos
// ============================================
async function loadParaQuem() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-para-quem-titles'), config)
  renderCards()
}

document.getElementById('form-para-quem-titles').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Títulos salvos!') : showToast('❌ Erro ao salvar', 'error')
})

async function renderCards() {
  const list  = document.getElementById('targetCardsList')
  const cards = await ConnecxDB.getTargetCards()

  if (!cards.length) {
    list.innerHTML = `<div class="section-card"><p class="empty-state">Nenhum card encontrado. Crie o primeiro!</p></div>`
    return
  }

  list.innerHTML = cards.map(card => `
    <div class="item-card" data-id="${card.id}">
      <div class="item-card-icon">${card.icon_emoji || '🎯'}</div>
      <div class="item-card-info">
        <strong>${card.title}</strong>
        <span>${card.description?.substring(0, 80)}...</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editCard(${card.id})" title="Editar">✏️</button>
        <button class="btn-icon danger" onclick="deleteCard(${card.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewCard').addEventListener('click', () => openCardModal(null))

function openCardModal(card) {
  const isNew = !card
  openModal(isNew ? 'Novo Card' : 'Editar Card', `
    <form id="cardForm">
      <div class="field">
        <label>Emoji do ícone</label>
        <input name="icon_emoji" value="${card?.icon_emoji || '🎯'}" placeholder="🎯">
      </div>
      <div class="field">
        <label>Título</label>
        <input name="title" value="${card?.title || ''}" placeholder="Restaurantes" required>
      </div>
      <div class="field">
        <label>Descrição</label>
        <textarea name="description" rows="3" placeholder="Descrição do card...">${card?.description || ''}</textarea>
      </div>
      <div class="field">
        <label>Posição (ordem)</label>
        <input name="position" type="number" value="${card?.position ?? 0}" min="0">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">${isNew ? 'Criar' : 'Salvar'}</button>
      </div>
    </form>
  `)

  document.getElementById('cardForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = collectForm(e.target)
    if (!isNew) data.id = card.id
    data.active   = true
    data.position = parseInt(data.position) || 0
    const result  = await ConnecxDB.upsertTargetCard(data)
    if (result) {
      showToast(isNew ? '✅ Card criado!' : '✅ Card atualizado!')
      closeModal()
      renderCards()
    } else {
      showToast('❌ Erro ao salvar card', 'error')
    }
  })
}

async function editCard(id) {
  const cards = await ConnecxDB.getTargetCards()
  const card  = cards.find(c => c.id === id)
  if (card) openCardModal(card)
}

async function deleteCard(id) {
  if (!confirm('Excluir este card?')) return
  const ok = await ConnecxDB.deleteTargetCard(id)
  ok ? (showToast('✅ Card excluído!'), renderCards()) : showToast('❌ Erro ao excluir', 'error')
}

// ============================================
// PORTFOLIO — projetos dinâmicos
// ============================================
async function loadPortfolio() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-portfolio-titles'), config)
  renderProjects()
}

document.getElementById('form-portfolio-titles').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Títulos salvos!') : showToast('❌ Erro ao salvar', 'error')
})

async function renderProjects() {
  const list     = document.getElementById('projectsList')
  const projects = await ConnecxDB.getPortfolioProjects()

  if (!projects.length) {
    list.innerHTML = `<div class="section-card"><p class="empty-state">Nenhum projeto. Adicione o primeiro!</p></div>`
    return
  }

  list.innerHTML = projects.map(p => `
    <div class="item-card" data-id="${p.id}">
      <div class="item-card-icon">💼</div>
      <div class="item-card-info">
        <strong>${p.title}</strong>
        <span>${p.category} · ${p.url_display || 'sem URL'}</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editProject(${p.id})" title="Editar">✏️</button>
        <button class="btn-icon danger" onclick="deleteProject(${p.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewProject').addEventListener('click', () => openProjectModal(null))

function openProjectModal(proj) {
  const isNew = !proj
  openModal(isNew ? 'Novo Projeto' : 'Editar Projeto', `
    <form id="projForm">
      <div class="field">
        <label>Título do projeto</label>
        <input name="title" value="${proj?.title || ''}" placeholder="Restaurante Sakura" required>
      </div>
      <div class="form-row">
        <div class="field">
          <label>Categoria</label>
          <input name="category" value="${proj?.category || ''}" placeholder="Gastronomia">
        </div>
        <div class="field">
          <label>URL exibida no browser</label>
          <input name="url_display" value="${proj?.url_display || ''}" placeholder="restaurantesakura.com.br">
        </div>
      </div>
      <div class="field">
        <label>Posição (ordem)</label>
        <input name="position" type="number" value="${proj?.position ?? 0}" min="0">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">${isNew ? 'Criar' : 'Salvar'}</button>
      </div>
    </form>
  `)

  document.getElementById('projForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = collectForm(e.target)
    if (!isNew) data.id = proj.id
    data.active   = true
    data.position = parseInt(data.position) || 0
    const result  = await ConnecxDB.upsertPortfolioProject(data)
    if (result) {
      showToast(isNew ? '✅ Projeto criado!' : '✅ Projeto atualizado!')
      closeModal()
      renderProjects()
    } else {
      showToast('❌ Erro ao salvar projeto', 'error')
    }
  })
}

async function editProject(id) {
  const projects = await ConnecxDB.getPortfolioProjects()
  const proj     = projects.find(p => p.id === id)
  if (proj) openProjectModal(proj)
}

async function deleteProject(id) {
  if (!confirm('Excluir este projeto?')) return
  const ok = await ConnecxDB.deletePortfolioProject(id)
  ok ? (showToast('✅ Projeto excluído!'), renderProjects()) : showToast('❌ Erro ao excluir', 'error')
}

// ============================================
// PROCESSO — etapas dinâmicas
// ============================================
async function loadProcesso() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-processo-titles'), config)
  renderSteps()
}

document.getElementById('form-processo-titles').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Títulos salvos!') : showToast('❌ Erro ao salvar', 'error')
})

async function renderSteps() {
  const list  = document.getElementById('stepsList')
  const steps = await ConnecxDB.getProcessSteps()

  if (!steps.length) {
    list.innerHTML = `<div class="section-card"><p class="empty-state">Nenhuma etapa. Adicione a primeira!</p></div>`
    return
  }

  list.innerHTML = steps.map(s => `
    <div class="item-card" data-id="${s.id}">
      <div class="item-card-icon" style="font-family:var(--font-head);font-weight:800;color:var(--accent)">${s.step_number}</div>
      <div class="item-card-info">
        <strong>${s.title}</strong>
        <span>${s.description?.substring(0, 80)}...</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editStep(${s.id})" title="Editar">✏️</button>
        <button class="btn-icon danger" onclick="deleteStep(${s.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewStep').addEventListener('click', () => openStepModal(null))

function openStepModal(step) {
  const isNew = !step
  openModal(isNew ? 'Nova Etapa' : 'Editar Etapa', `
    <form id="stepForm">
      <div class="form-row">
        <div class="field">
          <label>Número da etapa</label>
          <input name="step_number" value="${step?.step_number || '01'}" placeholder="01" required>
        </div>
        <div class="field">
          <label>Posição (ordem)</label>
          <input name="position" type="number" value="${step?.position ?? 0}" min="0">
        </div>
      </div>
      <div class="field">
        <label>Título</label>
        <input name="title" value="${step?.title || ''}" placeholder="Conversa" required>
      </div>
      <div class="field">
        <label>Descrição</label>
        <textarea name="description" rows="3" placeholder="Descrição da etapa...">${step?.description || ''}</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">${isNew ? 'Criar' : 'Salvar'}</button>
      </div>
    </form>
  `)

  document.getElementById('stepForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = collectForm(e.target)
    if (!isNew) data.id = step.id
    data.active   = true
    data.position = parseInt(data.position) || 0
    const result  = await ConnecxDB.upsertProcessStep(data)
    if (result) {
      showToast(isNew ? '✅ Etapa criada!' : '✅ Etapa atualizada!')
      closeModal()
      renderSteps()
    } else {
      showToast('❌ Erro ao salvar etapa', 'error')
    }
  })
}

async function editStep(id) {
  const steps = await ConnecxDB.getProcessSteps()
  const step  = steps.find(s => s.id === id)
  if (step) openStepModal(step)
}

async function deleteStep(id) {
  if (!confirm('Excluir esta etapa?')) return
  const ok = await ConnecxDB.deleteProcessStep(id)
  ok ? (showToast('✅ Etapa excluída!'), renderSteps()) : showToast('❌ Erro ao excluir', 'error')
}

// ============================================
// DIFERENCIAIS — cards dinâmicos
// ============================================
async function loadDiferenciais() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-diff-titles'), config)
  renderDiffs()
}

document.getElementById('form-diff-titles').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ Títulos salvos!') : showToast('❌ Erro ao salvar', 'error')
})

async function renderDiffs() {
  const list  = document.getElementById('diffsList')
  const diffs = await ConnecxDB.getDifferentials()

  if (!diffs.length) {
    list.innerHTML = `<div class="section-card"><p class="empty-state">Nenhum card. Adicione o primeiro!</p></div>`
    return
  }

  list.innerHTML = diffs.map(d => `
    <div class="item-card" data-id="${d.id}">
      <div class="item-card-icon">${d.icon_emoji}</div>
      <div class="item-card-info">
        <strong>${d.title}</strong>
        <span>${d.description?.substring(0, 80)}...</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editDiff(${d.id})" title="Editar">✏️</button>
        <button class="btn-icon danger" onclick="deleteDiff(${d.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewDiff').addEventListener('click', () => openDiffModal(null))

function openDiffModal(diff) {
  const isNew = !diff
  openModal(isNew ? 'Novo Diferencial' : 'Editar Diferencial', `
    <form id="diffForm">
      <div class="field">
        <label>Emoji do ícone</label>
        <input name="icon_emoji" value="${diff?.icon_emoji || '⚡'}" placeholder="⚡">
      </div>
      <div class="field">
        <label>Título</label>
        <input name="title" value="${diff?.title || ''}" placeholder="Entrega rápida" required>
      </div>
      <div class="field">
        <label>Descrição</label>
        <textarea name="description" rows="3" placeholder="Descrição do diferencial...">${diff?.description || ''}</textarea>
      </div>
      <div class="field">
        <label>Posição (ordem)</label>
        <input name="position" type="number" value="${diff?.position ?? 0}" min="0">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">${isNew ? 'Criar' : 'Salvar'}</button>
      </div>
    </form>
  `)

  document.getElementById('diffForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = collectForm(e.target)
    if (!isNew) data.id = diff.id
    data.active   = true
    data.position = parseInt(data.position) || 0
    const result  = await ConnecxDB.upsertDifferential(data)
    if (result) {
      showToast(isNew ? '✅ Card criado!' : '✅ Card atualizado!')
      closeModal()
      renderDiffs()
    } else {
      showToast('❌ Erro ao salvar', 'error')
    }
  })
}

async function editDiff(id) {
  const diffs = await ConnecxDB.getDifferentials()
  const diff  = diffs.find(d => d.id === id)
  if (diff) openDiffModal(diff)
}

async function deleteDiff(id) {
  if (!confirm('Excluir este card?')) return
  const ok = await ConnecxDB.deleteDifferential(id)
  ok ? (showToast('✅ Card excluído!'), renderDiffs()) : showToast('❌ Erro ao excluir', 'error')
}

// ============================================
// CTA FINAL
// ============================================
async function loadCTA() {
  const config = await ConnecxDB.getSiteConfig()
  fillForm(document.getElementById('form-cta'), config)
}

document.getElementById('form-cta').addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = collectForm(e.target)
  const result = await ConnecxDB.updateSiteConfig(data)
  result ? showToast('✅ CTA salvo!') : showToast('❌ Erro ao salvar', 'error')
})

// ============================================
// LEADS
// ============================================
async function loadLeads() {
  const tbody = document.getElementById('leadsBody')
  tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Carregando...</td></tr>`

  const leads = await ConnecxDB.getLeads()

  if (!leads.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">Nenhum lead ainda.</td></tr>`
    return
  }

  tbody.innerHTML = leads.map(lead => {
    const date = new Date(lead.created_at).toLocaleDateString('pt-BR')
    const wa   = lead.phone
      ? `<a class="wa-link" href="https://wa.me/${lead.phone.replace(/\D/g, '')}" target="_blank">WhatsApp</a>`
      : '—'
    return `
      <tr>
        <td>${date}</td>
        <td>${lead.name || '—'}</td>
        <td>${lead.email || '—'}</td>
        <td>${lead.phone || '—'}</td>
        <td>${lead.message?.substring(0, 60) || '—'}</td>
        <td>${wa}</td>
      </tr>
    `
  }).join('')
}

// ============================================
// ADMIN PORTFÓLIO COMPLETO
// ============================================
async function loadPortfolioPrivado() {
  const config = await ConnecxDB.getPortfolioConfig()
  
  // Preenche todos os formulários de configuração
  fillForm(document.getElementById('form-portfolio-geral'), config)
  fillForm(document.getElementById('form-portfolio-hero'), config)
  fillForm(document.getElementById('form-portfolio-skills-titles'), config)
  fillForm(document.getElementById('form-portfolio-process-titles'), config)
  fillForm(document.getElementById('form-portfolio-cta'), config)
  fillForm(document.getElementById('form-portfolio-social'), config)

  // Renderiza listas
  renderPrivateProjects()
  renderPortfolioSkills()
  renderPortfolioProcess()
}

// Listeners dos formulários de config do portfólio
document.getElementById('form-portfolio-geral').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ Geral salvo!') : showToast('❌ Erro', 'error');
});

document.getElementById('form-portfolio-hero').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ Hero salvo!') : showToast('❌ Erro', 'error');
});

document.getElementById('form-portfolio-skills-titles').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ Títulos Skills salvos!') : showToast('❌ Erro', 'error');
});

document.getElementById('form-portfolio-process-titles').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ Títulos Processo salvos!') : showToast('❌ Erro', 'error');
});

document.getElementById('form-portfolio-cta').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ CTA salvo!') : showToast('❌ Erro', 'error');
});

document.getElementById('form-portfolio-social').addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await ConnecxDB.updatePortfolioConfig(collectForm(e.target));
  res ? showToast('✅ Sociais & Rodapé salvos!') : showToast('❌ Erro', 'error');
});

// PROJETOS (Existente, mantido e ajustado se necessário)
async function renderPrivateProjects() {
  const list     = document.getElementById('privateProjectsList')
  const projects = await ConnecxDB.getPortfolioPrivado()

  if (!projects.length) {
    list.innerHTML = `<p class="empty-state">Nenhum projeto privado. Adicione o primeiro!</p>`
    return
  }

  list.innerHTML = projects.map(p => `
    <div class="item-card" data-id="${p.id}">
      <div class="item-card-icon">🔒</div>
      <div class="item-card-info">
        <strong>${p.title}</strong>
        <span>${p.subtitle} · ${p.url_display || 'Sem URL'}</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editPrivateProject(${p.id})" title="Editar">✏️</button>
        <button class="btn-icon danger" onclick="deletePrivateProject(${p.id})" title="Excluir">🗑️</button>
      </div>
    </div>
  `).join('')
}

// SKILLS
async function renderPortfolioSkills() {
  const list = document.getElementById('portfolioSkillsList')
  const skills = await ConnecxDB.getPortfolioSkills()
  if (!skills.length) {
    list.innerHTML = `<p class="empty-state">Nenhuma skill adicionada.</p>`
    return
  }
  list.innerHTML = skills.map(s => `
    <div class="item-card">
      <div class="item-card-icon">${s.icon}</div>
      <div class="item-card-info">
        <strong>${s.title}</strong>
        <span>${s.tools}</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editPortfolioSkill(${s.id})">✏️</button>
        <button class="btn-icon danger" onclick="deletePortfolioSkill(${s.id})">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewPortfolioSkill').addEventListener('click', () => openSkillModal(null))

function openSkillModal(skill) {
  const isNew = !skill
  openModal(isNew ? 'Nova Skill' : 'Editar Skill', `
    <form id="skillForm">
      <div class="form-row">
        <div class="field"><label>Ícone (Emoji)</label><input name="icon" value="${skill?.icon || '🤖'}"></div>
        <div class="field"><label>Título</label><input name="title" value="${skill?.title || ''}" required></div>
      </div>
      <div class="field"><label>Descrição</label><textarea name="description">${skill?.description || ''}</textarea></div>
      <div class="field"><label>Ferramentas (Ex: Tool1, Tool2)</label><input name="tools" value="${skill?.tools || ''}"></div>
      <div class="field"><label>Posição</label><input name="position" type="number" value="${skill?.position ?? 0}"></div>
      <div class="form-actions"><button type="submit" class="btn-primary">Salvar</button></div>
    </form>
  `)
  document.getElementById('skillForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = collectForm(e.target);
    if (!isNew) data.id = skill.id;
    await ConnecxDB.upsertPortfolioSkill(data);
    closeModal(); renderPortfolioSkills(); showToast('✅ Skill salva!');
  });
}

// PROCESSO
async function renderPortfolioProcess() {
  const list = document.getElementById('portfolioProcessList')
  const steps = await ConnecxDB.getPortfolioProcess()
  if (!steps.length) {
    list.innerHTML = `<p class="empty-state">Nenhuma etapa adicionada.</p>`
    return
  }
  list.innerHTML = steps.map(s => `
    <div class="item-card">
      <div class="item-card-icon" style="font-weight:bold; color:var(--accent)">${s.step_num}</div>
      <div class="item-card-info">
        <strong>${s.title}</strong>
        <span>${s.description.substring(0, 50)}...</span>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon" onclick="editPortfolioStep(${s.id})">✏️</button>
        <button class="btn-icon danger" onclick="deletePortfolioStep(${s.id})">🗑️</button>
      </div>
    </div>
  `).join('')
}

document.getElementById('btnNewPortfolioStep').addEventListener('click', () => openPortfolioStepModal(null))

function openPortfolioStepModal(step) {
  const isNew = !step
  openModal(isNew ? 'Nova Etapa' : 'Editar Etapa', `
    <form id="portfolioStepForm">
      <div class="form-row">
        <div class="field"><label>Número</label><input name="step_num" value="${step?.step_num || '01'}" required></div>
        <div class="field"><label>Título</label><input name="title" value="${step?.title || ''}" required></div>
      </div>
      <div class="field"><label>Descrição</label><textarea name="description">${step?.description || ''}</textarea></div>
      <div class="field"><label>Posição</label><input name="position" type="number" value="${step?.position ?? 0}"></div>
      <div class="form-actions"><button type="submit" class="btn-primary">Salvar</button></div>
    </form>
  `)
  document.getElementById('portfolioStepForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = collectForm(e.target);
    if (!isNew) data.id = step.id;
    await ConnecxDB.upsertPortfolioProcess(data);
    closeModal(); renderPortfolioProcess(); showToast('✅ Etapa salva!');
  });
}

// PROJETOS PRIVADOS (Ajuste das funções de abertura de modal se necessário)
document.getElementById('btnNewPrivateProject').addEventListener('click', () => openPrivateProjectModal(null))

function openPrivateProjectModal(proj) {
  const isNew = !proj
  openModal(isNew ? 'Novo Projeto Privado' : 'Editar Projeto Privado', `
    <form id="privateProjForm">
      <div class="form-row">
        <div class="field">
          <label>Título do projeto</label>
          <input name="title" value="${proj?.title || ''}" placeholder="ArbDash Monitor" required>
        </div>
        <div class="field">
          <label>Subtítulo</label>
          <input name="subtitle" value="${proj?.subtitle || ''}" placeholder="Dashboard · Real-time" required>
        </div>
      </div>
      <div class="form-row">
        <div class="field">
          <label>URL Display (Barra do browser)</label>
          <input name="url_display" value="${proj?.url_display || ''}" placeholder="arbdash-monitor.netlify.app">
        </div>
        <div class="field">
          <label>Link Real (Href botão visitar)</label>
          <input name="url_href" value="${proj?.url_href || ''}" placeholder="https://euphonious-starship...">
        </div>
      </div>
      <div class="field">
        <label>HTML Content (Renderizado no iframe/preview)</label>
        <textarea name="html_content" rows="6" placeholder="<div class='...'></div>">${proj?.html_content || ''}</textarea>
      </div>
      <div class="field">
        <label>Posição (ordem)</label>
        <input name="position" type="number" value="${proj?.position ?? 0}" min="0">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-primary">${isNew ? 'Criar' : 'Salvar'}</button>
      </div>
    </form>
  `)

  document.getElementById('privateProjForm').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = collectForm(e.target)
    if (!isNew) data.id = proj.id
    data.active   = true
    data.position = parseInt(data.position) || 0
    const result  = await ConnecxDB.upsertPortfolioPrivado(data)
    if (result) {
      showToast(isNew ? '✅ Projeto Privado criado!' : '✅ Projeto Privado atualizado!')
      closeModal()
      renderPrivateProjects()
    } else {
      showToast('❌ Erro ao salvar projeto', 'error')
    }
  })
}

async function editPrivateProject(id) {
  const projects = await ConnecxDB.getPortfolioPrivado()
  const proj     = projects.find(p => p.id === id)
  if (proj) openPrivateProjectModal(proj)
}

async function deletePrivateProject(id) {
  if (!confirm('Excluir este projeto privado?')) return
  const ok = await ConnecxDB.deletePortfolioPrivado(id)
  ok ? (showToast('✅ Projeto excluído!'), renderPrivateProjects()) : showToast('❌ Erro ao excluir', 'error')
}

// Helpers extras para Skills e Process
async function editPortfolioSkill(id) {
  const skills = await ConnecxDB.getPortfolioSkills();
  const skill = skills.find(s => s.id === id);
  if (skill) openSkillModal(skill);
}
async function deletePortfolioSkill(id) {
  if (confirm('Excluir skill?')) { await ConnecxDB.deletePortfolioSkill(id); renderPortfolioSkills(); }
}
async function editPortfolioStep(id) {
  const steps = await ConnecxDB.getPortfolioProcess();
  const step = steps.find(s => s.id === id);
  if (step) openPortfolioStepModal(step);
}
async function deletePortfolioStep(id) {
  if (confirm('Excluir etapa?')) { await ConnecxDB.deletePortfolioProcess(id); renderPortfolioProcess(); }
}

// Expõe funções chamadas via onclick no HTML dinâmico
window.editCard    = editCard
window.deleteCard  = deleteCard
window.editProject = editProject
window.deleteProject = deleteProject
window.editPrivateProject = editPrivateProject
window.deletePrivateProject = deletePrivateProject
window.editStep    = editStep
window.deleteStep  = deleteStep
window.editDiff    = editDiff
window.deleteDiff  = deleteDiff
window.editPortfolioSkill = editPortfolioSkill
window.deletePortfolioSkill = deletePortfolioSkill
window.editPortfolioStep = editPortfolioStep
window.deletePortfolioStep = deletePortfolioStep

