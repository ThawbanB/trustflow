// app/widget/[username]/page.tsx
import { supabase } from '@/utils/supabase'

export default async function WidgetPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ username: string }>,
  searchParams: Promise<{ 
    accent?: string, 
    dark?: string, 
    radius?: string, 
    layout?: string,
    stars?: string,
    text?: string 
  }> 
}) {
  const { username } = await params
  const { 
    accent = '6366f1', 
    dark = 'false', 
    radius = '2rem', 
    layout = 'grid', 
    stars = 'true',
    text = 'base' 
  } = await searchParams

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('username', username)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (!testimonials || testimonials.length === 0) return null

  const isDark = dark === 'true'
  const isGrid = layout === 'grid'
  const accentColor = `#${accent}`

  return (
    <div className={`p-6 transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-transparent'} 
      ${isGrid ? 'flex flex-row gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory' : 'flex flex-col gap-6'}`}>
      
      {testimonials.map((t) => (
        <div 
          key={t.id} 
          style={{ borderRadius: radius }}
          className={`flex-shrink-0 snap-center p-8 border transition-all duration-300
            ${isGrid ? 'w-[350px]' : 'w-full'}
            ${isDark 
              ? 'bg-slate-800 border-slate-700 shadow-2xl shadow-black/20' 
              : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}
        >
          <div className="space-y-4">
            {stars === 'true' && (
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: accentColor }} className="text-[10px]">★</span>
                ))}
              </div>
            )}
            <p 
              style={{ fontSize: text === 'lg' ? '1.125rem' : text === 'sm' ? '0.875rem' : '1rem' }}
              className={`${isDark ? 'text-slate-200' : 'text-slate-700'} leading-relaxed font-medium`}
            >
              "{t.content}"
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100/10">
            <div 
              style={{ backgroundColor: accentColor, borderRadius: `calc(${radius} / 2.5)` }}
              className="w-10 h-10 text-white flex items-center justify-center font-black text-xs shadow-lg"
            >
              {t.customer_name.charAt(0)}
            </div>
            <div>
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.customer_name}</p>
              <p style={{ color: accentColor }} className="text-[9px] font-black tracking-widest uppercase opacity-70">
                {t.customer_title || 'Client vérifié'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}