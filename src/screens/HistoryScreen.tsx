import { useNavigate } from 'react-router-dom'
import { Sparkles, Trash2, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useHistoryStore } from '@/store/historyStore'
import { formatDate } from '@/lib/utils'

export function HistoryScreen() {
  const navigate = useNavigate()
  const { readings, deleteReading } = useHistoryStore()

  return (
    <AppShell title="История раскладов" showNav>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-4 gap-4 animate-fade-in">
        {readings.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-5 py-20 text-center">
            <span className="text-5xl opacity-30 animate-float">✦</span>
            <div>
              <p className="text-slate-400 font-display text-lg mb-1">Пока пусто</p>
              <p className="text-slate-600 text-sm">Сохранённые расклады появятся здесь</p>
            </div>
            <Button onClick={() => navigate('/')} variant="secondary" size="sm">
              <Sparkles size={15} />
              Сделать расклад
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {readings.map((reading) => (
              <div
                key={reading.id}
                className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-mystic/30 transition-colors"
              >
                <button
                  className="w-full text-left p-4 flex items-start gap-3"
                  onClick={() => navigate(`/history/${reading.id}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-mystic/15 text-mystic-light rounded-full px-2 py-0.5 uppercase tracking-wider shrink-0">
                        {reading.spread.nameRu}
                      </span>
                      <span className="text-slate-600 text-xs">{formatDate(reading.createdAt)}</span>
                    </div>
                    <p className="text-slate-200 text-sm font-medium truncate">{reading.question}</p>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-1">
                      {reading.drawnCards.map((dc) => dc.card.nameRu).join(' · ')}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-600 shrink-0 mt-1" />
                </button>

                {/* Delete button */}
                <div className="px-4 pb-3 flex justify-end">
                  <button
                    onClick={() => deleteReading(reading.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
