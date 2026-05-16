import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './components/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  // Busca TODOS os dados para o dashboard e formulários
  const [leadsRes, projectsRes, cardsRes, stepsRes, diffsRes, configRes, portfolioConfigRes] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('portfolio_projects').select('*').order('position'),
    supabase.from('target_cards').select('*').order('position'),
    supabase.from('process_steps').select('*').order('position'),
    supabase.from('differentials').select('*').order('position'),
    supabase.from('site_config').select('*').eq('id', 1).single(),
    supabase.from('portfolio_config').select('*').eq('id', 1).single(),
  ])

  const initialData = {
    leads: leadsRes.data || [],
    projects: projectsRes.data || [],
    cards: cardsRes.data || [],
    steps: stepsRes.data || [],
    diffs: diffsRes.data || [],
    config: configRes.data || {},
    portfolioConfig: portfolioConfigRes.data || {},
  }

  return <AdminDashboard initialData={initialData} />
}
