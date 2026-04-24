import { signup } from '@/app/auth/actions'
import Link from 'next/link'

export default async function RegisterPage({ searchParams }: any) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form action={signup} className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-3xl font-bold mb-6 text-center">Créer un compte</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input 
              name="email" // <--- TRÈS IMPORTANT
              type="email" 
              required 
              className="w-full p-3 rounded-xl border border-slate-200" 
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Mot de passe</label>
            <input 
              name="password" // <--- TRÈS IMPORTANT
              type="password" 
              required 
              className="w-full p-3 rounded-xl border border-slate-200" 
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Créer mon compte
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Déjà inscrit ? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Se connecter</Link>
        </p>
      </form>
    </div>
  )
}