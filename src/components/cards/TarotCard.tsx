import { useState } from 'react'
import type { TarotCard as TarotCardType } from '@/types'
import { useProfileStore } from '@/store/profileStore'
import { getCardImageUrl, getCoverUrl } from '@/data/decks'

interface TarotCardProps {
  card?: TarotCardType
  isRevealed: boolean
  isReversed?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
}

const SIZES = {
  sm: { card: 'w-16 h-[7rem]',         symbol: 'text-2xl', name: 'text-[9px]' },
  md: { card: 'w-24 h-36',             symbol: 'text-4xl', name: 'text-[10px]' },
  lg: { card: 'w-[8.3rem] h-[14rem]',  symbol: 'text-5xl', name: 'text-xs' },
  xl: { card: 'w-[11rem] h-[18.5rem]', symbol: 'text-6xl', name: 'text-sm' },
}

export function TarotCard({
  card,
  isRevealed,
  isReversed = false,
  onClick,
  size = 'md',
  showLabel = true,
}: TarotCardProps) {
  const [flipping, setFlipping] = useState(false)
  const deckId = useProfileStore((s) => s.deckId)
  const sz = SIZES[size]

  const imageUrl =
    card && deckId
      ? getCardImageUrl(deckId, card.id)
      : null

  const coverUrl = deckId ? getCoverUrl(deckId) : null

  function handleClick() {
    if (!onClick || isRevealed || flipping) return
    setFlipping(true)
    setTimeout(() => {
      onClick()
      setFlipping(false)
    }, 300)
  }

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ perspective: '800px' }}>
      <div
        onClick={handleClick}
        className={[
          sz.card,
          'relative rounded-xl cursor-pointer select-none',
          'transition-transform duration-300',
          !isRevealed && !flipping ? 'hover:scale-105 hover:-translate-y-1' : '',
          flipping ? 'scale-0' : 'scale-100',
          isRevealed && isReversed ? 'rotate-180' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {isRevealed && card ? (
          imageUrl ? (
            // ── Карта с изображением из колоды ────────────────────────
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt={card.nameRu}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            // ── CSS-карточка (Minor Arcana или без колоды) ─────────────
            <div
              className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-between p-2"
              style={{ background: card.gradient }}
            >
              <div className="w-full text-center">
                <p className={`${sz.name} font-display text-white/90 font-semibold leading-tight drop-shadow`}>
                  {card.nameRu}
                </p>
              </div>
              <div className={`${sz.symbol} drop-shadow-lg`}>{card.symbol}</div>
              <div className="flex flex-wrap justify-center gap-0.5">
                {card.keywords.slice(0, 2).map((kw) => (
                  <span key={kw} className="text-[7px] text-white/70 bg-black/20 rounded px-1 py-0.5 leading-none">
                    {kw}
                  </span>
                ))}
              </div>
              <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-white/30" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          )
        ) : (
          // ── Рубашка карты ──────────────────────────────────────────
          coverUrl ? (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img
                src={coverUrl}
                alt="card back"
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover"
              />
              {!isRevealed && onClick && (
                <div className="absolute inset-0 flex items-end justify-center pb-2 bg-black/10">
                  <span className="text-[7px] text-white/60 animate-pulse">нажмите</span>
                </div>
              )}
            </div>
          ) : (
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: 'var(--card-back-bg)',
                border: '1px solid var(--card-back-border)',
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="text-2xl" style={{ color: 'var(--card-back-symbol-color)' }}>✦</span>
                <span
                  className="text-[8px] font-display tracking-widest uppercase"
                  style={{ color: 'var(--card-back-text-color)' }}
                >
                  Таро
                </span>
              </div>
              <div className="absolute inset-2 rounded-lg" style={{ border: '1px solid var(--card-back-inner-border)' }} />
              <div className="absolute inset-4 rounded"    style={{ border: '1px solid var(--card-back-inner2-border)' }} />
              {['top-1.5 left-1.5', 'top-1.5 right-1.5', 'bottom-1.5 left-1.5', 'bottom-1.5 right-1.5'].map((pos) => (
                <span key={pos} className={`absolute ${pos} text-[8px]`} style={{ color: 'var(--card-back-symbol-color)' }}>
                  ✦
                </span>
              ))}
              {!isRevealed && onClick && (
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className="text-[7px] animate-pulse" style={{ color: 'var(--card-back-text-color)' }}>
                    нажмите
                  </span>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {showLabel && card && isRevealed && (
        <p className={`${sz.name} text-slate-400 text-center max-w-[80px] leading-tight`}>
          {isReversed ? '↕ ' : ''}{card.nameRu}
        </p>
      )}
    </div>
  )
}
