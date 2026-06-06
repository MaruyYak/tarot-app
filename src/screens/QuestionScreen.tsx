import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useReadingStore } from '@/store/readingStore'

const FALLBACK_PROMPTS = [
  'Что меня ждёт в любви?',
  'Как развивается моя карьера?',
  'Что мне нужно отпустить?',
  'Куда двигаться дальше?',
]

export function QuestionScreen() {
  const navigate = useNavigate()
  const { question, setQuestion } = useReadingStore()
  const [localQ, setLocalQ] = useState(question)
  const [prompts, setPrompts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const fetchPrompts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/prompts')
      const data = await res.json()
      if (Array.isArray(data.prompts) && data.prompts.length > 0) {
        setPrompts(data.prompts)
      } else {
        setPrompts(FALLBACK_PROMPTS)
      }
    } catch {
      setPrompts(FALLBACK_PROMPTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPrompts() }, [fetchPrompts])

  function handleNext() {
    setQuestion(localQ.trim())
    navigate('/reading/spread')
  }

  return (
    <AppShell title="Ваш вопрос" showBack>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-6 animate-slide-up">
        <p className="text-slate-400 text-sm">
          Чем конкретнее вопрос — тем точнее ответ карт
        </p>

        {/* Textarea */}
        <textarea
          className="w-full flex-1 min-h-[160px] bg-surface border border-border rounded-2xl p-4 text-slate-100 text-base resize-none placeholder:text-slate-600 focus:outline-none focus:border-mystic/60 transition-colors leading-relaxed"
          placeholder="Напишите свой вопрос…"
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          maxLength={300}
          autoFocus
        />

        <p className="text-slate-600 text-xs text-right -mt-4">{localQ.length}/300</p>

        {/* Quick prompts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-500 text-xs uppercase tracking-widest">Или выберите тему</p>
            <button
              onClick={fetchPrompts}
              disabled={loading}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              <span className="text-[10px]">обновить</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 rounded-xl bg-surface border border-border animate-pulse" />
                ))
              : prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => setLocalQ(p)}
                    className={[
                      'text-left text-sm px-3 py-2.5 rounded-xl border transition-all duration-150',
                      localQ === p
                        ? 'border-mystic/60 bg-mystic/10 text-mystic-light'
                        : 'border-border bg-surface text-slate-400 hover:border-mystic/30',
                    ].join(' ')}
                  >
                    {p}
                  </button>
                ))}
          </div>
        </div>

        <Button fullWidth onClick={handleNext} disabled={localQ.trim().length < 5}>
          Выбрать расклад →
        </Button>
      </div>
    </AppShell>
  )
}
