'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'E-mail ou senha inválidos.' }
  }

  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// --- CRUD Actions ---

export async function updateSiteConfig(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('site_config').update(data).eq('id', 1)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function upsertTargetCard(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('target_cards').upsert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function deleteTargetCard(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('target_cards').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function upsertPortfolioProject(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('portfolio_projects').upsert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function deletePortfolioProject(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('portfolio_projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function updatePortfolioConfig(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('portfolio_config').update(data).eq('id', 1)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function upsertProcessStep(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('process_steps').upsert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function deleteProcessStep(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('process_steps').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function upsertDifferential(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('differentials').upsert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

export async function deleteDifferential(id: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('differentials').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  return { success: true }
}

// Adicionar mais conforme necessário para portfólio, processos etc.
