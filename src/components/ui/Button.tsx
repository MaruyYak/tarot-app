import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-mystic hover:bg-mystic-light active:bg-mystic-dark text-white shadow-lg shadow-mystic/30',
  secondary:
    'bg-elevated border border-border text-slate-200 hover:border-mystic/50 hover:text-white',
  ghost: 'text-slate-400 hover:text-white hover:bg-elevated',
  danger: 'bg-red-900/60 border border-red-700 text-red-300 hover:bg-red-800',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', fullWidth, loading, children, className = '', disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'rounded-xl font-medium transition-all duration-200 select-none',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
