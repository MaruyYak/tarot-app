import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { TarotCard } from '@/components/cards/TarotCard'
import { ALL_CARDS } from '@/data/cards'
import { SPREADS } from '@/data/spreads'
import { useReadingStore } from '@/store/readingStore'
import type { DrawnCard } from '@/types'

const ONE_CARD_SPREAD = SPREADS.find((s) => s.id === 'one-card')!

const DAILY_TYPES = [
  { id: 0, label: 'Карта дня',        question: 'Что несёт мне этот день?',             icon: '✦' },
  { id: 1, label: 'Совет дня',        question: 'Какой совет мне даёт этот день?',       icon: '☽' },
  { id: 2, label: 'Текущая энергия',  question: 'Какова моя энергия сегодня?',           icon: '◈' },
  { id: 3, label: 'Главный фокус',    question: 'На чём мне сосредоточиться сегодня?',  icon: '◎' },
]

function getDailySeed(offset: number): number {
  const dateStr = new Date().toISOString().slice(0, 10)
  let hash = 0
  for (const char of dateStr) {
    hash = (hash * 31 + char.charCodeAt(0)) & 0xffffffff
  }
  return Math.abs(hash + offset * 7919)
}

export function DailyScreen() {
  const navigate = useNavigate()
  const { setQuestion, selectSpread, setDrawnCards } = useReadingStore()

  const [selectedType, setSelectedType] = useState<typeof DAILY_TYPES[number] | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const dailyCards = useMemo<DrawnCard[]>(() =>
    DAILY_TYPES.map((t) => {
      const seed = getDailySeed(t.id)
      return {
        card: ALL_CARDS[seed % ALL_CARDS.length],
        isReversed: ((seed >> 8) % 3) === 0,
        position: ONE_CARD_SPREAD.positions[0],
      }
    }), [])

  const today = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  function handleSelectType(t: typeof DAILY_TYPES[number]) {
    setSelectedType(t)
    setIsRevealed(false)
  }

  function handleGetInterpretation() {
    if (!selectedType) return
    setQuestion(selectedType.question)
    selectSpread(ONE_CARD_SPREAD)
    setDrawnCards([dailyCards[selectedType.id]])
    navigate('/reading/result')
  }

  const activeCard = selectedType ? dailyCards[selectedType.id] : null

  return (
    <AppShell showNav>
      <div className="flex flex-col flex-1 px-5 pt-6 pb-8 gap-5 animate-fade-in">

        {/* Header */}
        <div className="text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Предсказание на день</p>
          <h2 className="font-display text-white text-xl capitalize">{today}</h2>
        </div>

        {!selectedType ? (
          // ── Выбор типа ──────────────────────────────────────────────────
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <p className="text-slate-500 text-xs text-center mb-1">Выберите тип предсказания</p>
            {DAILY_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectType(t)}
                className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface hover:border-mystic/40 hover:bg-mystic/5 transition-all duration-200 text-left"
              >
                <span className="text-2xl w-8 text-center shrink-0" style={{ color: 'rgb(var(--color-accent))' }}>
                  {t.icon}
                </span>
                <div>
                  <p className="text-slate-200 font-medium text-sm">{t.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">«{t.question}»</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // ── Карта выбранного типа ────────────────────────────────────────
          <>
            <button
              onClick={() => setSelectedType(null)}
              className="text-slate-500 text-xs text-left hover:text-slate-300 transition-colors"
            >
              ← {selectedType.label}
            </button>

            <p className="text-slate-400 text-sm italic text-center">«{selectedType.question}»</p>

            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <TarotCard
                card={activeCard!.card}
                isRevealed={isRevealed}
                isReversed={activeCard!.isReversed}
                onClick={!isRevealed ? () => setIsRevealed(true) : undefined}
                size="xl"
                showLabel={false}
              />
              {isRevealed && (
                <p className="text-slate-400 text-sm text-center animate-fade-in">
                  {activeCard!.isReversed ? '↕ ' : ''}{activeCard!.card.nameRu}
                </p>
              )}
            </div>

            <div className="mt-auto">
              {!isRevealed ? (
                <Button fullWidth variant="secondary" onClick={() => setIsRevealed(true)}>
                  ✦ Открыть карту
                </Button>
              ) : (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <p className="text-slate-500 text-xs text-center">Карта открыта</p>
                  <Button fullWidth onClick={handleGetInterpretation}>
                    Получить предсказание →
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </AppShell>
  )
}
