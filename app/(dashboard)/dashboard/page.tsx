// app/dashboard/page.tsx
import { createClient } from '@/utils/supabase/server'
import { approveTestimonial, deleteTestimonial } from './actions'
import { logout } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import CopyButton from '@/components/CopyButton'
import WidgetCustomizer from '@/components/WidgetCustomizer'

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // 1. SÉCURITÉ : Vérifier l'utilisateur
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) redirect('/login')

  // 2. DONNÉES : Récupérer les témoignages liés à cet utilisateur
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return <div className="p-10 text-red-500 font-bold">Erreur : {error.message}</div>

  // 3. VARIABLES DYNAMIQUES
  const dynamicUsername = user.email?.split('@')[0] || "user";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trustflow-phi.vercel.app/";
  const collectUrl = `${baseUrl}/${dynamicUsername}/submit`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-32">
      
      {/* BARRE DE NAVIGATION DASHBOARD */}
      <nav className="bg-white border-b border-slate-100 mb-12">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">T</span>
            </div>
            <span className="text-lg font-black tracking-tighter">TrustFlow</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & BIENVENUE */}
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-2">Mon Espace</h1>
          <p className="text-slate-500 font-medium italic">Bienvenue, {user.email}</p>
        </div>

        {/* SECTION 1 : STATISTIQUES ET LIEN DE COLLECTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {/* Stats : Total */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-indigo-100 transition-all">
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">Avis reçus</p>
            <h3 className="text-6xl font-black tracking-tighter">{testimonials?.length || 0}</h3>
          </div>

          {/* Stats : Approuvés */}
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100 text-white flex flex-col justify-between">
            <p className="opacity-70 text-[10px] uppercase tracking-[0.2em] font-black mb-2">Approuvés</p>
            <h3 className="text-6xl font-black tracking-tighter">
              {testimonials?.filter(t => t.is_approved).length || 0}
            </h3>
          </div>

          {/* Action : Lien de collecte */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black mb-2">Page de collecte</p>
              <div className="bg-slate-50 p-3 rounded-xl mb-4 overflow-hidden">
                <p className="text-xs text-indigo-500 font-mono truncate">{collectUrl}</p>
              </div>
            </div>
            <CopyButton url={collectUrl} text="Copier le lien public ↗" />
          </div>
        </div>

        {/* SECTION 2 : GESTION DES TÉMOIGNAGES */}
        <div className="space-y-8 mb-24">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black tracking-tight">Derniers messages</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
              Flux en direct
            </span>
          </div>

          {testimonials && testimonials.length > 0 ? (
            <div className="grid gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-indigo-100 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner ${t.is_approved ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {t.is_approved ? '✓' : '!'}
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium italic text-lg leading-tight">"{t.content}"</p>
                      <p className="text-sm font-bold mt-2 text-slate-900">
                        {t.customer_name} 
                        <span className="text-slate-400 font-normal ml-2">— {t.customer_title || 'Client'}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    {!t.is_approved && (
                      <form action={approveTestimonial.bind(null, t.id)} className="flex-1 md:flex-none">
                        <button className="w-full bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all shadow-lg shadow-slate-200">
                          Approuver
                        </button>
                      </form>
                    )}
                    <form action={deleteTestimonial.bind(null, t.id)} className="flex-1 md:flex-none">
                      <button className="w-full p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all group-hover:shadow-lg shadow-red-100 flex items-center justify-center">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
              <p className="text-slate-400 font-medium">Vous n'avez pas encore reçu de témoignages.</p>
              <p className="text-sm text-slate-300 mt-2 italic flex items-center justify-center gap-2">
                Partagez votre lien de collecte pour commencer <span className="text-xl">↗</span>
              </p>
            </div>
          )}
        </div>

        {/* SECTION 3 : PERSONNALISATION DU WIDGET */}
        <div id="customize">
            <WidgetCustomizer 
              username={dynamicUsername} 
              baseUrl={baseUrl} 
            />
        </div>

      </div>
    </div>
  )
}