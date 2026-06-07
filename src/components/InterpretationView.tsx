import { useState } from 'react'
import type { InterpretationData } from '@/lib/utils'

const BASE_TABS = [
  { id: 'short',   label: 'Кратко'   },
  { id: 'detail',  label: 'Подробно' },
  { id: 'cards',   label: 'Карты'    },
  { id: 'spheres', label: 'Сферы'    },
] as const

type TabId = typeof BASE_TABS[number]['id']

interface Props {
  data: InterpretationData
}

export function InterpretationView({ data }: Props) {
  const [tab, setTab] = useState<TabId>('short')
  const tabs = BASE_TABS.filter((t) => t.id !== 'cards' || (data.positions && data.positions.length > 0))

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-elevated rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'flex-1 text-xs py-1.5 rounded-lg transition-all duration-200 font-medium',
              tab === t.id
                ? 'bg-mystic/20 text-mystic-light'
                : 'text-slate-500 hover:text-slate-300',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'short' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {data.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-3 py-1 rounded-full border border-mystic/30 text-mystic-light bg-mystic/10"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
          <p className="text-slate-300 text-sm leading-relaxed">{data.short}</p>
        </div>
      )}

      {tab === 'detail' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <p className="text-slate-300 text-sm leading-relaxed">{data.long}</p>
          <div className="h-px bg-border" />
          <Section label="Прямые карты" text={data.upright} />
          <Section label="Перевёрнутые карты" text={data.reversed} />
        </div>
      )}

      {tab === 'cards' && data.positions && (
        <div className="flex flex-col gap-3 animate-fade-in">
          {data.positions.map((p, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">{p.position}</p>
                <p className="text-mystic-light text-[11px] font-medium shrink-0">{p.card}</p>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{p.meaning}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'spheres' && (
        <div className="flex flex-col gap-3 animate-fade-in">
          <Section label="❤️ Любовь и отношения" text={data.love} />
          <Section label="💼 Карьера и работа" text={data.career} />
          <Section label="💰 Финансы" text={data.finance} />
        </div>
      )}
    </div>
  )
}

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-3 flex flex-col gap-1.5">
      <p className="text-slate-500 text-[10px] uppercase tracking-widest">{label}</p>
      <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
    </div>
  )
}
