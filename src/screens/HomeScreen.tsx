import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { TarotCardFan } from '@/components/home/TarotCardFan'
import { useHistoryStore } from '@/store/historyStore'
import { useReadingStore } from '@/store/readingStore'
import { formatDate } from '@/lib/utils'

/* Ornamental divider button — ——◆—— text ——◆—— */
function OrnamentButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center gap-3 w-full py-1 select-none focus:outline-none"
    >
      {/* Left flourish */}
      <div className="flex items-center gap-1.5 flex-1">
        <div
          className="flex-1 h-px transition-all duration-300 group-hover:opacity-80"
          style={{ background: 'linear-gradient(to right, transparent, rgba(var(--color-gold), 0.55))' }}
        />
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"
          style={{ color: 'rgba(var(--color-gold), 0.65)' }}
          className="transition-transform duration-300 group-hover:translate-x-[-2px]"
        >
          {/* Arrow pointing right */}
          <path d="M0 5 L8 5 M5 2 L9 5 L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 5 L14 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>

      {/* Text */}
      <span
        className="font-display text-lg tracking-wider whitespace-nowrap transition-all duration-300"
        style={{
          color: 'rgba(var(--color-gold-light), 0.92)',
          textShadow: '0 0 18px rgba(var(--color-gold), 0.35)',
        }}
      >
        Новый расклад
      </span>

      {/* Right flourish (mirrored) */}
      <div className="flex items-center gap-1.5 flex-1">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"
          style={{ color: 'rgba(var(--color-gold), 0.65)', transform: 'scaleX(-1)' }}
          className="transition-transform duration-300 group-hover:translate-x-[2px]"
        >
          <path d="M0 5 L8 5 M5 2 L9 5 L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 5 L14 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        </svg>
        <div
          className="flex-1 h-px transition-all duration-300 group-hover:opacity-80"
          style={{ background: 'linear-gradient(to left, transparent, rgba(var(--color-gold), 0.55))' }}
        />
      </div>
    </button>
  )
}

export function HomeScreen() {
  const navigate = useNavigate()
  const readings = useHistoryStore((s) => s.readings)
  const reset = useReadingStore((s) => s.reset)

  function handleNewReading() {
    reset()
    navigate('/reading/question')
  }

  const lastReading = readings[0]

  return (
    <AppShell showNav>
      <div className="flex flex-col items-center flex-1 px-6 pb-8 animate-fade-in" style={{ paddingTop: '2.5rem' }}>

        {/* Title */}
        <div className="flex flex-col items-center gap-3 text-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(var(--color-accent), 0.35) 0%, rgba(var(--color-accent), 0.05) 70%)' }}
          >
            <span className="text-2xl animate-float" style={{ filter: 'drop-shadow(0 0 8px rgba(var(--color-gold), 0.6))' }}>✦</span>
          </div>
          <h1 className="font-display text-4xl text-white tracking-wide">
            Твой таролог
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">
            Задайте вопрос — карты откроют то,<br />что вы уже знаете внутри
          </p>
        </div>

        {/* Card fan — clicking any card starts a reading */}
        <TarotCardFan onClick={handleNewReading} />

        {/* Ornamental CTA button */}
        <div className="w-full mt-5 mb-1">
          <OrnamentButton onClick={handleNewReading} />
        </div>

        {/* Three diamond dots */}
        <div className="flex items-center gap-3 mt-2 mb-6">
          {[0, 1, 2].map((i) => (
            <svg key={i} width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M4 0 L8 4 L4 8 L0 4 Z"
                style={{ fill: `rgba(var(--color-accent), ${i === 1 ? 0.7 : 0.4})` }}
              />
            </svg>
          ))}
        </div>

        {/* Last reading shortcut */}
        {lastReading && (
          <div className="w-full mt-auto">
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-3 text-center">
              Последний расклад
            </p>
            <button
              onClick={() => navigate(`/history/${lastReading.id}`)}
              className="w-full p-4 rounded-xl bg-surface border border-border text-left flex items-center gap-3 hover:border-mystic/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 text-sm font-medium truncate">{lastReading.question}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {lastReading.spread.nameRu} · {formatDate(lastReading.createdAt)}
                </p>
              </div>
              <ChevronRight size={16} className="text-slate-600 shrink-0" />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
