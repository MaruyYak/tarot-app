import { type ButtonHTMLAttributes } from 'react'

interface TarotButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

function CornerBracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scale(-1, 1)',
    bl: 'scale(1, -1)',
    br: 'scale(-1, -1)',
  }
  const pos: Record<string, string> = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2',
    bl: 'bottom-2 left-2',
    br: 'bottom-2 right-2',
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={`absolute ${pos[position]}`}
      style={{ transform: transforms[position], color: 'rgba(var(--color-gold), 0.6)' }}
    >
      <path d="M1 9 L1 1 L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="1" cy="1" r="1.2" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

export function TarotButton({ children, className = '', disabled, ...props }: TarotButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'relative w-full group select-none focus:outline-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {/* Ambient glow behind the button */}
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: 'radial-gradient(ellipse, rgba(var(--color-accent), 0.6) 0%, transparent 70%)' }}
      />

      {/* Main body */}
      <div
        className="tarot-btn-body relative overflow-hidden rounded-xl border transition-all duration-200 active:scale-[0.98]"
        style={{
          background: 'linear-gradient(160deg, rgba(var(--color-accent-dark), 0.85) 0%, rgba(var(--color-accent), 0.65) 50%, rgba(var(--color-accent-dark), 0.85) 100%)',
          borderColor: 'rgba(var(--color-gold), 0.45)',
          boxShadow: 'inset 0 1px 0 rgba(var(--color-gold-light), 0.1)',
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(var(--color-gold-light), 0.18) 50%, transparent 70%)' }}
        />

        {/* Top ornamental rule */}
        <div className="absolute top-3 left-7 right-7 flex items-center gap-2 pointer-events-none">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--color-gold), 0.35))' }} />
          <svg width="6" height="6" viewBox="0 0 6 6" style={{ color: 'rgba(var(--color-gold), 0.55)' }}>
            <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--color-gold), 0.35))' }} />
        </div>

        {/* Bottom ornamental rule */}
        <div className="absolute bottom-3 left-7 right-7 flex items-center gap-2 pointer-events-none">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--color-gold), 0.35))' }} />
          <svg width="6" height="6" viewBox="0 0 6 6" style={{ color: 'rgba(var(--color-gold), 0.55)' }}>
            <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--color-gold), 0.35))' }} />
        </div>

        {/* Corner bracket ornaments */}
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* Content */}
        <div className="relative flex items-center justify-center gap-3 py-5 px-8">
          {children}
        </div>
      </div>
    </button>
  )
}
