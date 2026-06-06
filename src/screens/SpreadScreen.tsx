import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useReadingStore } from '@/store/readingStore'
import { SPREADS } from '@/data/spreads'
import type { Spread } from '@/types'

export function SpreadScreen() {
  const navigate = useNavigate()
  const { question, spread, selectSpread } = useReadingStore()

  function handleSelect(s: Spread) {
    selectSpread(s)
  }

  function handleNext() {
    if (!spread) return
    navigate('/reading/draw')
  }

  return (
    <AppShell title="Расклад" showBack>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-5 animate-slide-up">
        {/* Question recap */}
        <div className="bg-surface border border-border rounded-xl px-4 py-3">
          <p className="text-slate-500 text-xs mb-1">Ваш вопрос</p>
          <p className="text-slate-300 text-sm italic">«{question}»</p>
        </div>

        {/* Spread options */}
        <div className="flex flex-col gap-3">
          {SPREADS.filter((s) => s.id !== 'one-card').map((s) => {
            const isSelected = spread?.id === s.id
            return (
              <button
                key={s.id}
                onClick={() => handleSelect(s)}
                className={[
                  'text-left p-4 rounded-2xl border transition-all duration-200',
                  isSelected
                    ? 'border-mystic/60 bg-mystic/10'
                    : 'border-border bg-surface hover:border-mystic/30',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-display text-base ${isSelected ? 'text-mystic-light' : 'text-slate-200'}`}>
                        {s.nameRu}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.description}</p>
                  </div>
                  {/* Card count dots */}
                  <div className="flex flex-wrap gap-1 justify-end max-w-[60px] shrink-0 mt-0.5">
                    {Array.from({ length: Math.min(s.cardCount, 10) }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-3 rounded-sm ${isSelected ? 'bg-mystic/60' : 'bg-slate-600'}`}
                      />
                    ))}
                    {s.cardCount > 10 && (
                      <span className="text-slate-600 text-xs self-center">…</span>
                    )}
                  </div>
                </div>

                {/* Positions preview */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-mystic/20 flex flex-wrap gap-1.5">
                    {s.positions.map((p) => (
                      <span
                        key={p.id}
                        className="text-[10px] bg-mystic/15 text-mystic-light rounded-full px-2 py-0.5"
                      >
                        {p.nameRu}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <Button fullWidth onClick={handleNext} disabled={!spread} className="mt-auto">
          Тянуть карты →
        </Button>
      </div>
    </AppShell>
  )
}
