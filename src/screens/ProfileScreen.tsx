import { useState } from 'react'
import { Check, Pencil } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { useHistoryStore } from '@/store/historyStore'
import { useProfileStore, type AppTheme } from '@/store/profileStore'
import { DECKS, getCoverUrl, type DeckId } from '@/data/decks'
import { formatDate } from '@/lib/utils'

const THEMES: { id: AppTheme; label: string; description: string; swatches: string[] }[] = [
  {
    id: 'void',
    label: 'Космос',
    description: 'Тёмный, мистический',
    swatches: ['#8b5cf6', '#0a0a0f', '#f59e0b'],
  },
  {
    id: 'nouveau',
    label: 'Ар-нуво',
    description: 'Тёплый, золотой',
    swatches: ['#c4768a', '#1e1620', '#c9a060'],
  },
]

export function ProfileScreen() {
  const readings = useHistoryStore((s) => s.readings)
  const clearAll = useHistoryStore((s) => s.clearAll)
  const { name, joinedAt, theme, deckId, setName, setTheme, setDeckId } = useProfileStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)

  function saveEdit() {
    setName(draft.trim() || 'Странник')
    setEditing(false)
  }

  const spreadCounts = readings.reduce<Record<string, number>>((acc, r) => {
    acc[r.spread.nameRu] = (acc[r.spread.nameRu] ?? 0) + 1
    return acc
  }, {})
  const favoriteSpread = Object.entries(spreadCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

  return (
    <AppShell title="Профиль" showNav>
      <div className="flex flex-col flex-1 px-5 pt-2 pb-8 gap-6 animate-fade-in">

        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, rgb(var(--color-accent-dark)), rgb(var(--color-accent)))' }}
          >
            ✦
          </div>

          {editing ? (
            <div className="flex items-center gap-2">
              <input
                className="bg-surface border border-mystic/50 rounded-xl px-3 py-2 text-slate-100 text-center text-lg w-44 focus:outline-none font-display"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={30}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
              />
              <button onClick={saveEdit} className="p-2 text-mystic hover:text-mystic-light">
                <Check size={18} />
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 text-slate-200 font-display text-xl hover:text-white group"
              onClick={() => setEditing(true)}
            >
              {name}
              <Pencil size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
            </button>
          )}

          <p className="text-slate-600 text-xs">С нами с {formatDate(joinedAt)}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Раскладов сделано" value={String(readings.length)} />
          <Stat label="Любимый расклад" value={favoriteSpread ?? '—'} small />
        </div>

        {/* Deck selector */}
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Колода карт</p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">

            {/* No deck option */}
            <DeckOption
              isActive={deckId === null}
              onSelect={() => setDeckId(null)}
              label="CSS"
              sublabel="По умолчанию"
            >
              <div
                className="w-full h-full rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}
              >
                <span className="text-2xl opacity-50">✦</span>
              </div>
            </DeckOption>

            {/* Deck options */}
            {DECKS.map((deck) => (
              <DeckOption
                key={deck.id}
                isActive={deckId === deck.id}
                onSelect={() => setDeckId(deck.id as DeckId)}
                label={deck.label}
                sublabel="Major Arcana"
              >
                <img
                  src={getCoverUrl(deck.id)}
                  alt={deck.label}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover rounded-lg"
                />
              </DeckOption>
            ))}
          </div>
        </div>

        {/* Theme switcher */}
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Стиль оформления</p>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((t) => {
              const isActive = theme === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={[
                    'rounded-2xl p-4 text-left border transition-all duration-200',
                    isActive
                      ? 'border-mystic/60 bg-mystic/10'
                      : 'border-border bg-surface hover:border-mystic/30',
                  ].join(' ')}
                >
                  <div className="flex gap-1.5 mb-3">
                    {t.swatches.map((color) => (
                      <div key={color} className="w-5 h-5 rounded-full border border-white/10" style={{ background: color }} />
                    ))}
                  </div>
                  <p className={`text-sm font-medium mb-0.5 ${isActive ? 'text-mystic-light' : 'text-slate-300'}`}>
                    {t.label}
                  </p>
                  <p className="text-slate-500 text-xs">{t.description}</p>
                  {isActive && (
                    <div className="mt-2 flex items-center gap-1">
                      <Check size={11} className="text-mystic-light" />
                      <span className="text-mystic-light text-[10px]">активна</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Danger zone */}
        {readings.length > 0 && (
          <div className="mt-auto">
            <div className="h-px bg-border mb-4" />
            <Button
              variant="danger"
              fullWidth
              size="sm"
              onClick={() => {
                if (confirm('Удалить всю историю раскладов?')) clearAll()
              }}
            >
              Очистить историю
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  )
}

function DeckOption({
  isActive,
  onSelect,
  label,
  sublabel,
  children,
}: {
  isActive: boolean
  onSelect: () => void
  label: string
  sublabel: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onSelect}
      className={[
        'flex flex-col items-center gap-2 shrink-0 transition-all duration-200',
      ].join(' ')}
    >
      <div
        className={[
          'w-[4.5rem] h-[7.8rem] rounded-xl overflow-hidden border-2 transition-all duration-200',
          isActive ? 'border-mystic shadow-lg shadow-mystic/30' : 'border-border hover:border-mystic/40',
        ].join(' ')}
      >
        {children}
      </div>
      <div className="text-center">
        <p className={`text-xs font-medium ${isActive ? 'text-mystic-light' : 'text-slate-400'}`}>
          {label}
        </p>
        <p className="text-[9px] text-slate-600">{sublabel}</p>
        {isActive && <Check size={10} className="text-mystic-light mx-auto mt-0.5" />}
      </div>
    </button>
  )
}

function Stat({ label, value, small = false }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 text-center">
      <p className={`font-display text-white mb-1 ${small ? 'text-sm' : 'text-2xl'}`}>{value}</p>
      <p className="text-slate-500 text-xs leading-tight">{label}</p>
    </div>
  )
}
