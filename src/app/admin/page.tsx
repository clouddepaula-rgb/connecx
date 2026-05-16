import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './components/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  // Busca todos os dados para o dashboard e formulários
  const [leadsRes, projectsRes, cardsRes, configRes, portfolioConfigRes] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
    supabase.from('target_cards').select('*', { count: 'exact', head: true }),
    supabase.from('site_config').select('*').eq('id', 1).single(),
    supabase.from('portfolio_config').select('*').eq('id', 1).single(),
  ])

  const initialData = {
    leads: leadsRes.data || [],
    leadsCount: leadsRes.data?.length || 0,
    projectsCount: projectsRes.count || 0,
    cardsCount: cardsRes.count || 0,
    config: configRes.data || {},
    portfolioConfig: portfolioConfigRes.data || {},
  }

  return <AdminDashboard initialData={initialData} />
}
