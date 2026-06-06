import { useParams, useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { TarotCard } from '@/components/cards/TarotCard'
import { useHistoryStore } from '@/store/historyStore'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'

export function ReadingDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { readings, deleteReading } = useHistoryStore()

  const reading = readings.find((r) => r.id === id)

  if (!reading) {
    return (
      <AppShell title="Расклад" showBack>
        <div className="flex items-center justify-center flex-1">
          <p className="text-slate-500">Расклад не найден</p>
        </div>
      </AppShell>
    )
  }

  function handleDelete() {
    deleteReading(reading!.id)
    navigate('/history', { replace: true })
  }

  return (
    <AppShell
      title={reading.spread.nameRu}
      showBack
      headerRight={
        <button onClick={handleDelete} className="p-2 text-slate-600 hover:text-red-400 transition-colors">
          <Trash2 size={18} />
        </button>
      }
    >
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-5 animate-fade-in">
        {/* Meta */}
        <div>
          <p className="text-slate-500 text-xs mb-1">{formatDate(reading.createdAt)}</p>
          <p className="text-slate-300 text-base italic font-display">«{reading.question}»</p>
        </div>

        {/* Cards */}
        <div className="-mx-5 px-5 overflow-x-auto">
          <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
            {reading.drawnCards.map((dc) => (
              <div key={dc.position.id} className="flex flex-col items-center gap-1.5">
                <TarotCard card={dc.card} isRevealed isReversed={dc.isReversed} size="sm" showLabel={false} />
                <div className="text-center w-16">
                  <p className="text-slate-500 text-[9px] uppercase tracking-wider">{dc.position.nameRu}</p>
                  <p className="text-slate-400 text-[9px]">
                    {dc.isReversed ? '↕ ' : ''}{dc.card.nameRu}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-mystic/30 to-transparent" />

        {/* Interpretation */}
        <div className="flex flex-col gap-3">
          {reading.interpretation.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-slate-300 text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <Button variant="secondary" fullWidth onClick={() => navigate('/')}>
          Новый расклад
        </Button>
      </div>
    </AppShell>
  )
}
