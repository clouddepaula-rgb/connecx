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
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('site_config').update(data).eq('id', 1)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function upsertTargetCard(data: any) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('target_cards').upsert(data)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteTargetCard(id: number) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('target_cards').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function upsertPortfolioProject(data: any) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('portfolio_projects').upsert(data)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deletePortfolioProject(id: number) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updatePortfolioConfig(data: any) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('portfolio_config').update(data).eq('id', 1)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function upsertProcessStep(data: any) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('process_steps').upsert(data)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteProcessStep(id: number) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('process_steps').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function upsertDifferential(data: any) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('differentials').upsert(data)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteDifferential(id: number) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from('differentials').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Adicionar mais conforme necessário para portfólio, processos etc.
