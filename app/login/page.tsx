// app/login/page.tsx
import Link from 'next/link'
import { login } from '@/app/auth/actions' 

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  // On récupère les erreurs ou messages depuis l'URL
  const { error, message } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Se connecter</h2>
          <p className="text-slate-500 mt-2">Accédez à votre dashboard TrustFlow.</p>
        </div>

        <form action={login} className="space-y-6">
          {/* AFFICHAGE DES ERREURS */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              ❌ {error}
            </div>
          )}

          {/* AFFICHAGE DES MESSAGES (ex: confirmation email) */}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
              ✨ {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
            <input 
              name="email" // INDISPENSABLE
              type="email" 
              required
              placeholder="nom@exemple.com" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Mot de passe</label>
            <input 
              name="password" // INDISPENSABLE
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900" 
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
          >
            Connexion
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-indigo-600 font-bold hover:underline transition-all">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  )
}