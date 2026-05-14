// ============================================
// lib/supabase.js — Instância global do Supabase
// Connecx — Gabriel de Paula
// ============================================

// ⚠️  URL: apenas o domínio base — SEM /rest/v1/ no final!
// ⚠️  KEY: use a "anon public" key (começa com eyJ...) em Project Settings → API
//          NÃO use a sb_publishable_... nem a service_role key!

const SUPABASE_URL = 'https://dbfzolrdmbhjkrdgpjbq.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiZnpvbHJkbWJoamtyZGdwamJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjMzMzcsImV4cCI6MjA5Mzc5OTMzN30.3iJBiKt2rOZrsKy-LE46f6S1-J26PT3h03uFmmM3UIg' // ← TROQUE pela anon key (eyJ...)

// Inicializa o cliente Supabase via CDN (importado no HTML)
const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Exporta para uso global
window.supabaseClient = supabaseClient

// ============================================
// SERVIÇOS — Site Config
// ============================================

/**
 * Busca as configurações gerais do site (linha id=1)
 * @returns {Promise<Object>} Configurações do site ou objeto vazio
 */
async function getSiteConfig() {
  const { data, error } = await supabaseClient
    .from('site_config')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.warn('[Supabase] Erro ao buscar site_config:', error.message)
    return null
  }
  return data
}

/**
 * Atualiza as configurações gerais do site
 * @param {Object} updates - Campos a atualizar
 * @returns {Promise<Object>} Dados atualizados ou null
 */
async function updateSiteConfig(updates) {
  const { data, error } = await supabaseClient
    .from('site_config')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) {
    console.error('[Supabase] Erro ao atualizar site_config:', error.message)
    alert(`Erro ao salvar no banco: ${error.message}`)
    return null
  }
  return data
}

// ============================================
// SERVIÇOS — Target Cards (Para Quem)
// ============================================

async function getTargetCards() {
  const { data, error } = await supabaseClient
    .from('target_cards')
    .select('*')
    .eq('active', true)
    .order('position')

  if (error) { console.warn('[Supabase] target_cards:', error.message); return [] }
  return data
}

async function upsertTargetCard(card) {
  const { data, error } = await supabaseClient
    .from('target_cards')
    .upsert(card)
    .select()
    .single()
  if (error) { console.error('[Supabase] upsert target_card:', error.message); return null }
  return data
}

async function deleteTargetCard(id) {
  const { error } = await supabaseClient.from('target_cards').delete().eq('id', id)
  if (error) { console.error('[Supabase] delete target_card:', error.message); return false }
  return true
}

// ============================================
// SERVIÇOS — Process Steps (Processo)
// ============================================

async function getProcessSteps() {
  const { data, error } = await supabaseClient
    .from('process_steps')
    .select('*')
    .eq('active', true)
    .order('position')

  if (error) { console.warn('[Supabase] process_steps:', error.message); return [] }
  return data
}

async function upsertProcessStep(step) {
  const { data, error } = await supabaseClient
    .from('process_steps')
    .upsert(step)
    .select()
    .single()
  if (error) { console.error('[Supabase] upsert process_step:', error.message); return null }
  return data
}

async function deleteProcessStep(id) {
  const { error } = await supabaseClient.from('process_steps').delete().eq('id', id)
  if (error) { console.error('[Supabase] delete process_step:', error.message); return false }
  return true
}

// ============================================
// SERVIÇOS — Differentials (Diferencial)
// ============================================

async function getDifferentials() {
  const { data, error } = await supabaseClient
    .from('differentials')
    .select('*')
    .eq('active', true)
    .order('position')

  if (error) { console.warn('[Supabase] differentials:', error.message); return [] }
  return data
}

async function upsertDifferential(diff) {
  const { data, error } = await supabaseClient
    .from('differentials')
    .upsert(diff)
    .select()
    .single()
  if (error) { console.error('[Supabase] upsert differential:', error.message); return null }
  return data
}

async function deleteDifferential(id) {
  const { error } = await supabaseClient.from('differentials').delete().eq('id', id)
  if (error) { console.error('[Supabase] delete differential:', error.message); return false }
  return true
}

// ============================================
// SERVIÇOS — Portfolio Projects
// ============================================

async function getPortfolioProjects() {
  const { data, error } = await supabaseClient
    .from('portfolio_projects')
    .select('*')
    .eq('active', true)
    .order('position')

  if (error) { console.warn('[Supabase] portfolio_projects:', error.message); return [] }
  return data
}

async function upsertPortfolioProject(project) {
  const { data, error } = await supabaseClient
    .from('portfolio_projects')
    .upsert(project)
    .select()
    .single()
  if (error) { console.error('[Supabase] upsert portfolio_project:', error.message); return null }
  return data
}

async function deletePortfolioProject(id) {
  const { error } = await supabaseClient.from('portfolio_projects').delete().eq('id', id)
  if (error) { console.error('[Supabase] delete portfolio_project:', error.message); return false }
  return true
}

// ============================================
// SERVIÇOS — Portfolio Privado
// ============================================

async function getPortfolioPrivado() {
  const { data, error } = await supabaseClient
    .from('portfolio_privado')
    .select('*')
    .eq('active', true)
    .order('position')

  if (error) { console.warn('[Supabase] portfolio_privado:', error.message); return [] }
  return data
}

async function upsertPortfolioPrivado(project) {
  const { data, error } = await supabaseClient
    .from('portfolio_privado')
    .upsert(project)
    .select()
    .single()
  if (error) { console.error('[Supabase] upsert portfolio_privado:', error.message); return null }
  return data
}

async function deletePortfolioPrivado(id) {
  const { error } = await supabaseClient.from('portfolio_privado').delete().eq('id', id)
  if (error) { console.error('[Supabase] delete portfolio_privado:', error.message); return false }
  return true
}

// ─── PORTFOLIO CMS ────────────────────────────────────────

async function getPortfolioConfig() {
  const { data, error } = await supabaseClient
    .from('portfolio_config')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) { console.warn('[Supabase] getPortfolioConfig:', error.message); return null }
  return data
}

async function updatePortfolioConfig(updates) {
  const { data, error } = await supabaseClient
    .from('portfolio_config')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()
  if (error) { 
    console.error('[Supabase] updatePortfolioConfig:', error.message)
    alert(`Erro ao salvar no banco: ${error.message}`)
    return null 
  }
  return data
}

async function getPortfolioSkills() {
  const { data, error } = await supabaseClient
    .from('portfolio_skills')
    .select('*')
    .eq('active', true)
    .order('position')
  if (error) { console.warn('[Supabase] getPortfolioSkills:', error.message); return [] }
  return data
}

async function upsertPortfolioSkill(skill) {
  const { data, error } = await supabaseClient.from('portfolio_skills').upsert(skill).select().single()
  if (error) { console.error('[Supabase] upsertPortfolioSkill:', error.message); return null }
  return data
}

async function deletePortfolioSkill(id) {
  const { error } = await supabaseClient.from('portfolio_skills').delete().eq('id', id)
  if (error) { console.error('[Supabase] deletePortfolioSkill:', error.message); return false }
  return true
}

async function getPortfolioProcess() {
  const { data, error } = await supabaseClient
    .from('portfolio_process')
    .select('*')
    .eq('active', true)
    .order('position')
  if (error) { console.warn('[Supabase] getPortfolioProcess:', error.message); return [] }
  return data
}

async function upsertPortfolioProcess(step) {
  const { data, error } = await supabaseClient.from('portfolio_process').upsert(step).select().single()
  if (error) { console.error('[Supabase] upsertPortfolioProcess:', error.message); return null }
  return data
}

async function deletePortfolioProcess(id) {
  const { error } = await supabaseClient.from('portfolio_process').delete().eq('id', id)
  if (error) { console.error('[Supabase] deletePortfolioProcess:', error.message); return false }
  return true
}

// ============================================
// SERVIÇOS — Leads
// ============================================

async function getLeads() {
  const { data, error } = await supabaseClient
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) { console.warn('[Supabase] leads:', error.message); return [] }
  return data
}

async function insertLead(lead) {
  const { data, error } = await supabaseClient
    .from('leads')
    .insert(lead)
    .select()
    .single()
  if (error) { console.error('[Supabase] insert lead:', error.message); return null }
  return data
}

// ============================================
// SERVIÇOS — Auth
// ============================================

async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  return { data }
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut()
  if (error) console.error('[Supabase] signOut:', error.message)
}

async function getSession() {
  const { data: { session } } = await supabaseClient.auth.getSession()
  return session
}

// Exporta todas as funções globalmente
window.ConnecxDB = {
  getSiteConfig, updateSiteConfig,
  getTargetCards, upsertTargetCard, deleteTargetCard,
  getProcessSteps, upsertProcessStep, deleteProcessStep,
  getDifferentials, upsertDifferential, deleteDifferential,
  getPortfolioProjects, upsertPortfolioProject, deletePortfolioProject,
  getPortfolioPrivado, upsertPortfolioPrivado, deletePortfolioPrivado,
  getPortfolioConfig, updatePortfolioConfig,
  getPortfolioSkills, upsertPortfolioSkill, deletePortfolioSkill,
  getPortfolioProcess, upsertPortfolioProcess, deletePortfolioProcess,
  getLeads, insertLead,
  signIn, signOut, getSession
}
