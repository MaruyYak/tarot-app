import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { TarotCard } from '@/components/cards/TarotCard'
import { useReadingStore } from '@/store/readingStore'
import { drawCards } from '@/data/cards'
import type { DrawnCard } from '@/types'

export function DrawScreen() {
  const navigate = useNavigate()
  const { question, spread, setDrawnCards } = useReadingStore()

  // Pre-deal all cards at mount, reveal one by one
  const [dealt, setDealt] = useState<DrawnCard[]>([])
  const [revealedCount, setRevealedCount] = useState(0)

  useEffect(() => {
    if (!spread) {
      navigate('/reading/spread', { replace: true })
      return
    }
    setDealt(drawCards(spread))
    setRevealedCount(0)
  }, [spread]) // eslint-disable-line react-hooks/exhaustive-deps

  function revealNext() {
    setRevealedCount((c) => Math.min(c + 1, dealt.length))
  }

  const allRevealed = revealedCount === dealt.length && dealt.length > 0
  const remaining = dealt.length - revealedCount

  function handleGetInterpretation() {
    setDrawnCards(dealt)
    navigate('/reading/result')
  }

  if (!spread) return null

  return (
    <AppShell title={spread.nameRu} showBack>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-6 animate-slide-up">
        {/* Question */}
        <p className="text-slate-400 text-sm italic text-center">«{question}»</p>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1 bg-elevated rounded-full overflow-hidden">
            <div
              className="h-full bg-mystic rounded-full transition-all duration-500"
              style={{ width: `${dealt.length ? (revealedCount / dealt.length) * 100 : 0}%` }}
            />
          </div>
          <span className="text-slate-500 text-xs shrink-0">
            {revealedCount}/{dealt.length}
          </span>
        </div>

        {/* Cards grid */}
        <div
          className={[
            dealt.length === 1
              ? 'flex items-center justify-center flex-1'
              : dealt.length > 3
              ? 'grid grid-cols-3 gap-3 w-full'
              : 'flex flex-wrap justify-center gap-4 items-start',
          ].join(' ')}
        >
          {dealt.map((dc, i) => (
            <div key={dc.position.id} className="flex flex-col items-center gap-2">
              <TarotCard
                card={dc.card}
                isRevealed={i < revealedCount}
                isReversed={dc.isReversed}
                onClick={i === revealedCount ? revealNext : undefined}
                size={dealt.length === 1 ? 'xl' : dealt.length <= 3 ? 'lg' : 'sm'}
                showLabel={false}
              />
              <div className="text-center">
                <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                  {dc.position.nameRu}
                </p>
                {i < revealedCount && (
                  <p className="text-slate-400 text-[10px] mt-0.5 max-w-[70px] truncate">
                    {dc.isReversed ? '↕ ' : ''}{dc.card.nameRu}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        {!allRevealed ? (
          <Button
            fullWidth
            onClick={revealNext}
            variant="secondary"
            className="mt-auto"
          >
            ✦ Открыть карту ({remaining} осталось)
          </Button>
        ) : (
          <div className="mt-auto flex flex-col gap-3 animate-fade-in">
            <p className="text-slate-500 text-xs text-center">Все карты открыты</p>
            <Button fullWidth onClick={handleGetInterpretation}>
              Получить трактовку →
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
