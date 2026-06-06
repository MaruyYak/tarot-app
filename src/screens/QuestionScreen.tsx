import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useReadingStore } from '@/store/readingStore'

const ALL_PROMPTS = [
  'Что меня ждёт в любви?',
  'Как развивается моя карьера?',
  'Что мне нужно отпустить?',
  'Куда двигаться дальше?',
  'Что сейчас мешает мне?',
  'На что обратить внимание?',
  'Что думают обо мне близкие?',
  'Правильное ли решение я принимаю?',
  'Чего мне не хватает для счастья?',
  'Что ждёт меня в этом месяце?',
  'Как улучшить отношения с партнёром?',
  'Стоит ли мне менять работу?',
  'Что скрыто от меня в этой ситуации?',
  'Как найти баланс в жизни?',
  'Что поможет мне достичь цели?',
  'Какой урок я сейчас прохожу?',
  'Что принесёт мне этот год?',
  'Как справиться с тревогой?',
  'Что изменить в своей жизни?',
  'Куда вложить свою энергию?',
  'Что мне говорит моя интуиция?',
  'Как привлечь удачу и деньги?',
]

function pickRandom(arr: string[], n: number): string[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export function QuestionScreen() {
  const navigate = useNavigate()
  const { question, setQuestion } = useReadingStore()
  const [localQ, setLocalQ] = useState(question)
  const [prompts, setPrompts] = useState(() => pickRandom(ALL_PROMPTS, 4))

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
              onClick={() => setPrompts(pickRandom(ALL_PROMPTS, 4))}
              className="text-slate-500 hover:text-slate-300 text-[10px] transition-colors"
            >
              ↻ ещё
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {prompts.map((p) => (
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
