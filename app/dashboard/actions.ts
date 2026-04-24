// app/dashboard/actions.ts
'use server'

import { supabase } from '@/utils/supabase'
import { revalidatePath } from 'next/cache'

export async function approveTestimonial(id: string) {
  console.log("Approbation demandée pour l'ID:", id) // <--- Regarde ton terminal !

  const { error } = await supabase
    .from('testimonials')
    .update({ is_approved: true })
    .eq('id', id)

  if (error) {
    console.error("Erreur Supabase Update:", error.message)
    return
  }

  revalidatePath('/dashboard')
}

export async function deleteTestimonial(id: string) {
  console.log("Suppression demandée pour l'ID:", id) // <--- Regarde ton terminal !

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    console.error("Erreur Supabase Delete:", error.message)
    return
  }

  revalidatePath('/dashboard')
}