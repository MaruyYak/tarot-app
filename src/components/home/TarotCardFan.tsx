/* Tarot card fan — HomeScreen hero */

const PI = Math.PI
const cos = Math.cos
const sin = Math.sin

/* ── Corner bracket ─────────────────────────────────────── */
function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const sx = pos === 'tr' || pos === 'br' ? -1 : 1
  const sy = pos === 'bl' || pos === 'br' ? -1 : 1
  const style: React.CSSProperties =
    pos === 'tl' ? { top: 5, left: 5 }
    : pos === 'tr' ? { top: 5, right: 5 }
    : pos === 'bl' ? { bottom: 5, left: 5 }
    : { bottom: 5, right: 5 }
  return (
    <div className="absolute pointer-events-none" style={{ ...style, width: 16, height: 16 }}>
      <svg viewBox="0 0 16 16" fill="none" className="w-full h-full"
        style={{ transform: `scale(${sx}, ${sy})`, overflow: 'visible' }}>
        <path d="M2 12 L2 2 L12 2" stroke="currentColor" strokeWidth="1.3"
          strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
        <circle cx="2" cy="2" r="1.3" fill="currentColor" opacity={0.65} />
      </svg>
    </div>
  )
}

/* ── Card wrapper — CSS vars work fine in div styles ────── */
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full h-full rounded-[7px] overflow-hidden"
      style={{
        background: 'var(--card-back-bg)',
        border: '1px solid rgba(var(--color-gold) / 0.72)',
        // currentColor for all SVG children
        color: 'rgb(var(--color-gold))',
      }}
    >
      {/* Inner border */}
      <div
        className="absolute inset-[5px] rounded-[4px] pointer-events-none"
        style={{ border: '0.6px solid currentColor', opacity: 0.26 }}
      />

      {/* Corner brackets */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      {/* Top ornament lines + diamond */}
      <div className="absolute top-[18px] left-0 right-0 flex items-center px-5 gap-2 pointer-events-none">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, currentColor)', opacity: 0.3 }} />
        <svg width="6" height="6" viewBox="0 0 6 6">
          <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" opacity={0.6} />
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, currentColor)', opacity: 0.3 }} />
      </div>

      {/* Bottom ornament lines + diamond */}
      <div className="absolute bottom-[18px] left-0 right-0 flex items-center px-5 gap-2 pointer-events-none">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, currentColor)', opacity: 0.3 }} />
        <svg width="6" height="6" viewBox="0 0 6 6">
          <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="currentColor" opacity={0.6} />
        </svg>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, currentColor)', opacity: 0.3 }} />
      </div>

      {/* Illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

/* ── Compass Rose SVG (64×64) ───────────────────────────── */
function CompassRose() {
  const cx = 32, cy = 32

  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = i * 22.5 * PI / 180 - PI / 2
    const isCardinal = i % 4 === 0
    const isDiag = i % 2 === 0 && !isCardinal
    const r2 = isCardinal ? 27 : isDiag ? 20 : 14
    return (
      <line key={i}
        x1={cx + cos(angle) * 9} y1={cy + sin(angle) * 9}
        x2={cx + cos(angle) * r2} y2={cy + sin(angle) * r2}
        stroke="currentColor"
        strokeWidth={isCardinal ? 0.95 : isDiag ? 0.6 : 0.45}
        opacity={isCardinal ? 0.8 : isDiag ? 0.5 : 0.25}
      />
    )
  })

  const tips = [0, 1, 2, 3].map((i) => {
    const a = i * PI / 2 - PI / 2
    const tx = cx + cos(a) * 30
    const ty = cy + sin(a) * 30
    const px = cos(a) * 3.5, py = sin(a) * 3.5
    const nx = cos(a + PI / 2) * 2, ny = sin(a + PI / 2) * 2
    return (
      <path key={i}
        d={`M ${tx + px} ${ty + py} L ${tx + nx} ${ty + ny} L ${tx - px} ${ty - py} L ${tx - nx} ${ty - ny} Z`}
        fill="currentColor" opacity={0.85}
      />
    )
  })

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx={cx} cy={cy} r={30} stroke="currentColor" strokeWidth="0.4" opacity={0.12} />
      <circle cx={cx} cy={cy} r={19} stroke="currentColor" strokeWidth="0.4" opacity={0.2} />
      <circle cx={cx} cy={cy} r={9}  stroke="currentColor" strokeWidth="0.7" opacity={0.4} />
      {rays}
      {tips}
      <circle cx={cx} cy={cy} r={2.5} fill="currentColor" opacity={0.7} />
      <circle cx={cx} cy={cy} r={1}   fill="currentColor" opacity={1} />
    </svg>
  )
}

/* ── All-Seeing Eye SVG (72×56) ─────────────────────────── */
function AllSeeingEye() {
  const cx = 36, cy = 28
  const ew = 26, eh = 13   // eye half-width / half-height

  // Sunburst rays (behind eye)
  const rays = Array.from({ length: 18 }, (_, i) => {
    const a = i * (360 / 18) * PI / 180
    const isMain = i % 2 === 0
    return (
      <line key={i}
        x1={cx + cos(a) * 16} y1={cy + sin(a) * 16}
        x2={cx + cos(a) * (isMain ? 27 : 22)} y2={cy + sin(a) * (isMain ? 27 : 22)}
        stroke="currentColor"
        strokeWidth={isMain ? 0.9 : 0.5}
        opacity={isMain ? 0.55 : 0.25}
      />
    )
  })

  return (
    <svg width="72" height="56" viewBox="0 0 72 56" fill="none">
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={27} stroke="currentColor" strokeWidth="0.4" opacity={0.12} />
      {/* Rays */}
      {rays}
      {/* Mid ring */}
      <circle cx={cx} cy={cy} r={16} stroke="currentColor" strokeWidth="0.4" opacity={0.18} />

      {/* Eye shape (filled dark) */}
      <path
        d={`M ${cx - ew} ${cy} Q ${cx} ${cy - eh * 2.1} ${cx + ew} ${cy} Q ${cx} ${cy + eh * 2.1} ${cx - ew} ${cy}`}
        fill="rgba(0,0,0,0.55)"
        stroke="currentColor" strokeWidth="1.2" opacity={1}
      />

      {/* Upper lashes */}
      {[-14, -6, 0, 6, 14].map((offset, i) => {
        const t = (offset + ew) / (ew * 2)
        const yOnLid = cy - Math.sin(PI * t) * eh * 2.1
        const len = i === 2 ? 7 : 4.5
        return (
          <line key={i}
            x1={cx + offset} y1={yOnLid}
            x2={cx + offset * 1.1} y2={yOnLid - len}
            stroke="currentColor" strokeWidth="0.7" opacity={0.45}
          />
        )
      })}

      {/* Iris */}
      <circle cx={cx} cy={cy} r={9} stroke="currentColor" strokeWidth="0.9" opacity={0.65} fill="rgba(0,0,0,0.4)" />

      {/* Iris lines */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const a = deg * PI / 180
        return (
          <line key={deg}
            x1={cx + cos(a) * 4} y1={cy + sin(a) * 4}
            x2={cx + cos(a) * 8.5} y2={cy + sin(a) * 8.5}
            stroke="currentColor" strokeWidth="0.5" opacity={0.3}
          />
        )
      })}

      {/* Pupil */}
      <circle cx={cx} cy={cy} r={4} fill="rgba(0,0,0,0.85)" />
      <circle cx={cx} cy={cy} r={3} stroke="currentColor" strokeWidth="0.4" opacity={0.35} fill="none" />

      {/* Highlight */}
      <circle cx={cx + 2} cy={cy - 2} r={1.2} fill="currentColor" opacity={0.75} />

      {/* Bottom arch ornament */}
      <path d={`M ${cx - 15} ${cy + 20} Q ${cx} ${cy + 17} ${cx + 15} ${cy + 20}`}
        stroke="currentColor" strokeWidth="0.7" opacity={0.35} fill="none" />
      <path d={`M ${cx - 6} ${cy + 23} Q ${cx} ${cy + 21} ${cx + 6} ${cy + 23}`}
        stroke="currentColor" strokeWidth="0.5" opacity={0.25} fill="none" />
    </svg>
  )
}

/* ── Public component ───────────────────────────────────── */
export function TarotCardFan({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '230px' }}>

      {/* Ambient gold glow behind center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '180px', height: '130px',
          background: 'radial-gradient(ellipse, rgba(var(--color-gold) / 0.14) 0%, transparent 70%)',
          filter: 'blur(20px)',
          top: '20px',
        }}
      />

      {/* Left card */}
      <button onClick={onClick} aria-label="Новый расклад"
        className="absolute transition-all duration-300 hover:brightness-110 active:scale-95"
        style={{
          width: '82px', height: '142px',
          transform: 'rotate(-18deg) translateX(-72px) translateY(22px)',
          zIndex: 1, opacity: 0.82,
          transformOrigin: 'bottom center',
        }}
      >
        <CardShell><CompassRose /></CardShell>
      </button>

      {/* Right card */}
      <button onClick={onClick} aria-label="Новый расклад"
        className="absolute transition-all duration-300 hover:brightness-110 active:scale-95"
        style={{
          width: '82px', height: '142px',
          transform: 'rotate(18deg) translateX(72px) translateY(22px)',
          zIndex: 2, opacity: 0.82,
          transformOrigin: 'bottom center',
        }}
      >
        <CardShell><CompassRose /></CardShell>
      </button>

      {/* Center card — eye, front and glowing */}
      <button onClick={onClick} aria-label="Новый расклад"
        className="absolute transition-all duration-300 hover:scale-[1.04] active:scale-95"
        style={{
          width: '90px', height: '157px',
          zIndex: 10,
          filter: 'drop-shadow(0 0 14px rgba(var(--color-gold) / 0.4)) drop-shadow(0 0 4px rgba(var(--color-gold) / 0.25))',
        }}
      >
        <CardShell><AllSeeingEye /></CardShell>
      </button>
    </div>
  )
}
