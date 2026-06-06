import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Home } from 'lucide-react'
import { BottomNav } from './BottomNav'

interface AppShellProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  showNav?: boolean
  headerRight?: ReactNode
}

export function AppShell({
  children,
  title,
  showBack = false,
  showNav = false,
  headerRight,
}: AppShellProps) {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen w-full max-w-[430px] mx-auto flex flex-col relative overflow-x-hidden"
      style={{ background: 'var(--bg-app)' }}
    >
      {(showBack || title) && (
        <header className="flex items-center gap-3 px-4 pt-12 pb-4 min-h-[72px]">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-elevated border border-border text-slate-400 hover:text-white transition-colors shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {title && (
            <h1 className="font-display text-xl text-slate-100 flex-1 leading-tight">
              {title}
            </h1>
          )}
          {headerRight && <div className="ml-auto">{headerRight}</div>}
          {showBack && (
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-elevated border border-border text-slate-400 hover:text-white transition-colors shrink-0 ml-auto"
            >
              <Home size={16} />
            </button>
          )}
        </header>
      )}

      <main className={['flex-1 flex flex-col', showNav ? 'pb-24' : ''].join(' ')}>
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  )
}
