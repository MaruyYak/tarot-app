import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, RefreshCw, AlertCircle } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { TarotCard } from '@/components/cards/TarotCard'
import { useReadingStore } from '@/store/readingStore'
import { useHistoryStore } from '@/store/historyStore'
import { nanoid } from '@/lib/utils'

export function ReadingScreen() {
  const navigate = useNavigate()
  const { question, spread, drawnCards, interpretation, isInterpreting, error, fetchInterpretation, reset } =
    useReadingStore()
  const addReading = useHistoryStore((s) => s.addReading)
  const savedRef = useRef(false)

  useEffect(() => {
    if (!spread || !drawnCards.length) {
      navigate('/reading/question', { replace: true })
      return
    }
    if (!interpretation && !isInterpreting && !error) {
      fetchInterpretation()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSave() {
    if (!spread || savedRef.current) return
    savedRef.current = true
    addReading({
      id: nanoid(),
      question,
      spread,
      drawnCards,
      interpretation,
      createdAt: new Date().toISOString(),
    })
    navigate('/history', { replace: true })
    reset()
  }

  function handleNewReading() {
    reset()
    navigate('/', { replace: true })
  }

  if (!spread) return null

  return (
    <AppShell title="Трактовка" showBack>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-6 animate-fade-in">
        {/* Question recap */}
        <p className="text-slate-400 text-sm italic text-center">«{question}»</p>

        {/* Drawn cards horizontal scroll */}
        <div className="-mx-5 px-5 overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
            {drawnCards.map((dc) => (
              <div key={dc.position.id} className="flex flex-col items-center gap-1.5">
                <TarotCard
                  card={dc.card}
                  isRevealed
                  isReversed={dc.isReversed}
                  size="sm"
                  showLabel={false}
                />
                <div className="text-center w-16">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider leading-tight">
                    {dc.position.nameRu}
                  </p>
                  <p className="text-slate-400 text-[9px] leading-tight">
                    {dc.isReversed ? '↕ ' : ''}{dc.card.nameRu}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <div className="flex-1">
          {isInterpreting && (
            <div className="flex flex-col items-center gap-4 py-12 animate-fade-in">
              <div className="text-4xl animate-float">✦</div>
              <p className="text-slate-400 text-sm text-center">
                Карты читают вашу историю…
              </p>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-mystic animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-8 animate-fade-in">
              {error.includes('лимит') ? (
                <>
                  <span className="text-5xl">✦</span>
                  <p className="text-slate-200 text-base text-center font-display">Лимит раскладов исчерпан</p>
                  <p className="text-slate-500 text-xs text-center max-w-[260px] leading-relaxed">
                    Доступно 20 бесплатных трактовок. Обратитесь к владельцу приложения для продолжения.
                  </p>
                </>
              ) : (
                <>
                  <AlertCircle size={32} className="text-red-400" />
                  <p className="text-slate-400 text-sm text-center">{error}</p>
                  <Button variant="secondary" size="sm" onClick={fetchInterpretation}>
                    Попробовать снова
                  </Button>
                </>
              )}
            </div>
          )}

          {interpretation && (
            <div className="animate-fade-in">
              <div className="h-px bg-gradient-to-r from-transparent via-mystic/30 to-transparent mb-5" />
              <div className="prose prose-sm prose-invert max-w-none">
                {interpretation.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-slate-300 text-sm leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {interpretation && (
          <div className="flex flex-col gap-3 animate-slide-up">
            <Button fullWidth onClick={handleSave}>
              <Save size={16} />
              Сохранить в историю
            </Button>
            <Button fullWidth variant="ghost" onClick={handleNewReading}>
              <RefreshCw size={16} />
              Новый расклад
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
