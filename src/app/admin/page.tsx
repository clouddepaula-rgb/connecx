import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './components/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  // Busca dados iniciais para o dashboard
  const [leadsRes, projectsRes, cardsRes] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
    supabase.from('target_cards').select('*', { count: 'exact', head: true }),
  ])

  const initialData = {
    leadsCount: leadsRes.count || 0,
    projectsCount: projectsRes.count || 0,
    cardsCount: cardsRes.count || 0,
  }

  return <AdminDashboard initialData={initialData} />
}
