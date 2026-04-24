"use client"
import { useState } from 'react'
import CopyButton from './CopyButton'

export default function WidgetCustomizer({ username, baseUrl }: { username: string, baseUrl: string }) {
  const [accent, setAccent] = useState("6366f1")
  const [dark, setDark] = useState(false)
  const [radius, setRadius] = useState("2rem")
  const [layout, setLayout] = useState("grid") // grid ou list
  const [textSize, setTextSize] = useState("base") // sm, base, lg
  const [showStars, setShowStars] = useState(true)
  const [shadow, setShadow] = useState("xl") // none, sm, xl

  const cleanAccent = accent.replace('#', '')
  
  // URL avec tous les nouveaux paramètres
  const widgetUrl = `${baseUrl}/widget/${username}?accent=${cleanAccent}&dark=${dark}&radius=${radius}&layout=${layout}&text=${textSize}&stars=${showStars}&shadow=${shadow}`
  
  const iframeCode = `<iframe src="${widgetUrl}" width="100%" height="${layout === 'grid' ? '500px' : '800px'}" frameborder="0"></iframe>`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 border-t border-slate-200 pt-16">
      
      {/* PANNEAU DE CONTRÔLE */}
      <div className="space-y-10">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Design Studio</h3>
          <p className="text-slate-500 font-medium mt-2">Créez un widget qui ressemble à votre marque.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Couleur d'accent */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Couleur</label>
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
              <input type="color" value={`#${cleanAccent}`} onChange={(e) => setAccent(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent" />
              <span className="font-mono text-sm font-bold">#{cleanAccent}</span>
            </div>
          </div>

          {/* Style des coins */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Coins ({radius})</label>
            <input type="range" min="0" max="3" step="0.5" value={parseFloat(radius)} onChange={(e) => setRadius(`${e.target.value}rem`)} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
          </div>
        </div>

        {/* Options de Layout & Toggle */}
        <div className="space-y-6">
           <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setLayout('grid')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${layout === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
              >
                Grille Horizontale
              </button>
              <button 
                onClick={() => setLayout('list')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${layout === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
              >
                Liste Verticale
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">Mode Sombre</span>
                <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                <span className="text-sm font-bold text-slate-700">Afficher étoiles</span>
                <input type="checkbox" checked={showStars} onChange={(e) => setShowStars(e.target.checked)} className="w-5 h-5 accent-indigo-600" />
              </div>
           </div>
        </div>

        {/* Code Output */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Prêt à copier</p>
          <code className="text-[11px] block bg-white/5 p-4 rounded-xl mb-6 font-mono break-all leading-relaxed text-indigo-200">
            {iframeCode}
          </code>
          <CopyButton url={iframeCode} text="Copier le code magique 📋" />
        </div>
      </div>

      {/* PRÉVISUALISATION DYNAMIQUE */}
      <div className="sticky top-24 h-fit">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Aperçu direct</p>
        <div className={`border-[12px] border-slate-100 rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-500 ${dark ? 'bg-slate-900 shadow-indigo-500/10' : 'bg-white'}`}>
          <iframe 
            key={widgetUrl} 
            src={widgetUrl} 
            width="100%" 
            height={layout === 'grid' ? '450px' : '600px'} 
            frameBorder="0"
            className="transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  )
}