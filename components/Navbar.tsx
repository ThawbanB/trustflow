// components/Navbar.tsx
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/auth/actions'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tighter text-indigo-600">
          TrustFlow
        </Link>

        {/* Liens */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                Mon Dashboard
              </Link>
              
              <form action={logout}>
                <button 
                  type="submit" 
                  className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                >
                  Déconnexion
                </button>
              </form>
              
              {/* Petit avatar ou initiale */}
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                Connexion
              </Link>
              <Link 
                href="/register" 
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                Essayer gratuitement
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}