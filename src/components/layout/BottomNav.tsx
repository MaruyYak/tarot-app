import { NavLink } from 'react-router-dom'
import { Sparkles, Sun, BookOpen, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Таро', Icon: Sparkles },
  { to: '/daily', label: 'День', Icon: Sun },
  { to: '/history', label: 'История', Icon: BookOpen },
  { to: '/profile', label: 'Профиль', Icon: User },
]

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]"
      style={{
        background: 'rgb(var(--color-surface) / 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(37,37,69,0.8)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-mystic-light'
                  : 'text-slate-500 hover:text-slate-300',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={isActive ? 'drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]' : ''}
                />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
