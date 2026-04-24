// app/[username]/submit/page.tsx
import { submitTestimonial } from './actions'

export default async function SubmitPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ username: string }>,
  searchParams: Promise<{ success?: string; error?: string }> 
}) {
  const { username } = await params
  const { success, error } = await searchParams

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
        
        {/* État de Succès */}
        {success ? (
          <div className="text-center py-10 space-y-4">
            <div className="text-6xl">✨</div>
            <h1 className="text-3xl font-black text-slate-900">Merci beaucoup !</h1>
            <p className="text-slate-500">Votre témoignage a bien été envoyé et est en attente de modération par {username}.</p>
            <a href={`/${username}/submit`} className="inline-block mt-6 text-indigo-600 font-bold hover:underline">
              Envoyer un autre avis
            </a>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-black text-slate-900 mb-2 text-center tracking-tight">
              Laissez un avis pour <span className="text-indigo-600">{username}</span>
            </h1>
            <p className="text-slate-500 text-center mb-10 font-medium">Votre retour nous aide énormément !</p>

            {/* Affichage des Erreurs */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form action={submitTestimonial} className="space-y-6">
              <input type="hidden" name="username" value={username} />

              <div className="space-y-2">
                <label className="font-bold text-sm text-slate-700 ml-1">Votre message</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  className="w-full p-5 border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800"
                  placeholder="Expliquez en quelques mots votre expérience..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700 ml-1">Votre nom</label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm text-slate-700 ml-1">Titre (optionnel)</label>
                  <input
                    type="text"
                    name="customer_title"
                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800"
                    placeholder="Freelance, CEO..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-[1.5rem] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
              >
                Envoyer mon témoignage
              </button>
            </form>
          </>
        )}
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">
        Propulsé par <span className="font-bold text-slate-500 tracking-tighter">TrustFlow</span>
      </p>
    </div>
  )
}