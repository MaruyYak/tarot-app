import { useState, useEffect, useRef } from 'react'
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Ref keeps dealt fresh inside setInterval closure (avoids stale closure)
  const dealtRef = useRef<DrawnCard[]>([])

  useEffect(() => {
    if (!spread) {
      navigate('/reading/spread', { replace: true })
      return
    }
    const cards = drawCards(spread)
    dealtRef.current = cards
    setDealt(cards)
    setRevealedCount(0)
  }, [spread]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  function revealNext() {
    setRevealedCount((c) => Math.min(c + 1, dealtRef.current.length))
  }

  function revealAll() {
    if (intervalRef.current) return
    let count = revealedCount
    const total = dealtRef.current.length
    if (count >= total) return
    intervalRef.current = setInterval(() => {
      count++
      setRevealedCount(count)
      if (count >= total) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
      }
    }, 320)
  }

  const allRevealed = revealedCount === dealt.length && dealt.length > 0
  const remaining = dealt.length - revealedCount

  function handleGetInterpretation() {
    const cards = dealtRef.current
    if (!cards.length) return
    setDrawnCards(cards)
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
          {!allRevealed && dealt.length > 1 && (
            <button
              onClick={revealAll}
              className="text-xs shrink-0 px-2 py-0.5 rounded-lg border transition-colors duration-200"
              style={{
                color: 'rgb(var(--color-gold))',
                borderColor: 'rgba(var(--color-gold) / 0.35)',
                background: 'rgba(var(--color-gold) / 0.07)',
              }}
            >
              открыть все
            </button>
          )}
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
