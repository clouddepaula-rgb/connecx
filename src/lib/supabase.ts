import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ''

// Não lançamos erro no nível do módulo para não quebrar o build do Next.js
// Lançaremos apenas quando as funções forem chamadas e as chaves estiverem vazias.
const isConfigured = SUPABASE_URL && SUPABASE_ANON_KEY

export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
      },
    })
  : null as any

function checkConfig() {
  if (!isConfigured) {
    throw new Error(
      '[Connecx] Erro: SUPABASE_URL ou SUPABASE_ANON_KEY não configuradas na Vercel ou no .env.local'
    )
  }
}

export const ConnecxDB = {
  async getSiteConfig() {
    checkConfig()
    const { data } = await supabase.from('site_config').select('*').eq('id', 1).single()
    return data
  },
  async getTargetCards() {
    checkConfig()
    const { data } = await supabase.from('target_cards').select('*').eq('active', true).order('position')
    return data || []
  },
  async getProcessSteps() {
    checkConfig()
    const { data } = await supabase.from('process_steps').select('*').eq('active', true).order('position')
    return data || []
  },
  async getDifferentials() {
    checkConfig()
    const { data } = await supabase.from('differentials').select('*').eq('active', true).order('position')
    return data || []
  },
  async getPortfolioProjects() {
    checkConfig()
    const { data } = await supabase.from('portfolio_projects').select('*').eq('active', true).order('position')
    return data || []
  },
  async insertLead(lead: { name: string; phone: string; source: string }) {
    checkConfig()
    const { data } = await supabase.from('leads').insert(lead).select().single()
    return data
  }
}
