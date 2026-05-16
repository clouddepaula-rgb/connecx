/**
 * Cliente Supabase — SERVER ONLY
 *
 * Usa variáveis de ambiente SEM o prefixo NEXT_PUBLIC_, portanto
 * NUNCA são incluídas no bundle enviado ao browser.
 * Importe este módulo apenas em Server Components, Route Handlers e
 * Server Actions.
 */
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '[Connecx] Variáveis SUPABASE_URL e SUPABASE_ANON_KEY não encontradas. ' +
    'Crie o arquivo .env.local com essas variáveis. Veja .env.example para referência.'
  )
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
  global: {
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  },
})

export const ConnecxDB = {
  async getSiteConfig() {
    const { data } = await supabase.from('site_config').select('*').eq('id', 1).single()
    return data
  },
  async getTargetCards() {
    const { data } = await supabase.from('target_cards').select('*').eq('active', true).order('position')
    return data || []
  },
  async getProcessSteps() {
    const { data } = await supabase.from('process_steps').select('*').eq('active', true).order('position')
    return data || []
  },
  async getDifferentials() {
    const { data } = await supabase.from('differentials').select('*').eq('active', true).order('position')
    return data || []
  },
  async getPortfolioProjects() {
    const { data } = await supabase.from('portfolio_projects').select('*').eq('active', true).order('position')
    return data || []
  },
  async insertLead(lead: { name: string; phone: string; source: string }) {
    const { data } = await supabase.from('leads').insert(lead).select().single()
    return data
  }
}
