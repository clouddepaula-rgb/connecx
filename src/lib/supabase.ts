import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbfzolrdmbhjkrdgpjbq.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiZnpvbHJkbWJoamtyZGdwamJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMjMzMzcsImV4cCI6MjA5Mzc5OTMzN30.3iJBiKt2rOZrsKy-LE46f6S1-J26PT3h03uFmmM3UIg'

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
