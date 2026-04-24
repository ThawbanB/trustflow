// app/[username]/submit/actions.ts
'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function submitTestimonial(formData: FormData) {
  const supabase = await createClient()
  const username = formData.get('username') as string
  
  const data = {
    username,
    content: formData.get('content'),
    customer_name: formData.get('customer_name'),
    customer_title: formData.get('customer_title'),
  }

  const { error } = await supabase.from('testimonials').insert([data])

  if (error) {
    redirect(`/${username}/submit?error=${encodeURIComponent(error.message)}`)
  }

  redirect(`/${username}/submit?success=true`)
}