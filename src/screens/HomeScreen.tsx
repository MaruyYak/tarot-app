import { useNavigate } from 'react-router-dom'
import { Sparkles, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useHistoryStore } from '@/store/historyStore'
import { useReadingStore } from '@/store/readingStore'
import { formatDate } from '@/lib/utils'

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
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8 gap-8 animate-fade-in">
        {/* Logo / Hero */}
        <div className="flex flex-col items-center gap-4 text-center mt-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse-glow"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.05) 70%)' }}
            >
              <span className="text-5xl animate-float">✦</span>
            </div>
          </div>

          <div>
            <h1 className="font-display text-4xl text-white mb-2 tracking-wide">
              Таролог
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              Задайте вопрос — карты откроют то,<br/>что вы уже знаете внутри
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          fullWidth
          onClick={handleNewReading}
          className="animate-pulse-glow"
        >
          <Sparkles size={20} />
          Новый расклад
        </Button>

        {/* Last reading shortcut */}
        {lastReading && (
          <div className="w-full">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">
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

        {/* Decorative footer text */}
        <p className="text-slate-600 text-xs text-center mt-auto pb-4">
          ✦ ✦ ✦
        </p>
      </div>
    </AppShell>
  )
}
