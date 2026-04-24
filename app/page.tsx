// app/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-black text-xl">T</span>
            </div>
            <span className="text-xl font-black tracking-tight">TrustFlow</span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Connexion
            </Link>
            <Link href="/login" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
              Essayer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-indigo-600 text-xs font-black uppercase tracking-widest">Le futur du Social Proof</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Transformez vos avis en <span className="text-indigo-600">ventes.</span>
          </h1>
          
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Récoltez, gérez et affichez vos témoignages clients en quelques secondes. Une ligne de code pour booster votre conversion.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full md:w-auto bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-100">
              Démarrer maintenant — C'est gratuit
            </Link>
            <p className="text-sm text-slate-400 font-medium">Aucune carte bancaire requise.</p>
          </div>
        </div>

        {/* IMAGE PREVIEW DU DASHBOARD */}
        <div className="max-w-6xl mx-auto mt-20 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[3rem] opacity-10 blur-3xl"></div>
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-slate-50 p-4 shadow-2xl">
            <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-inner bg-white">
              <Image 
                src="/dashboard.png" 
                alt="Aperçu du Dashboard TrustFlow" 
                fill 
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">📩</div>
              <h3 className="text-xl font-bold">Récolte simplifiée</h3>
              <p className="text-slate-500 leading-relaxed">Un lien personnalisé à envoyer à vos clients. Ils déposent leur avis en 2 clics.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">🛡️</div>
              <h3 className="text-xl font-bold">Modération totale</h3>
              <p className="text-slate-500 leading-relaxed">Gardez le contrôle. Approuvez ou rejetez les témoignages avant qu'ils ne soient publics.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">🎨</div>
              <h3 className="text-xl font-bold">Widget Caméléon</h3>
              <p className="text-slate-500 leading-relaxed">Personnalisez les couleurs et le style pour que le widget s'intègre parfaitement à votre site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Prêt à booster votre crédibilité ?</h2>
              <Link href="/login" className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-indigo-50 transition-all inline-block">
                Rejoindre TrustFlow gratuitement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">T</span>
            </div>
            <span className="font-bold text-slate-900">TrustFlow</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 TrustFlow. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 text-sm font-medium">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 text-sm font-medium">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}