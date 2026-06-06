import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void:    'rgb(var(--color-void)    / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        elevated:'rgb(var(--color-elevated)/ <alpha-value>)',
        border:  'rgb(var(--color-border)  / <alpha-value>)',
        mystic: {
          DEFAULT: 'rgb(var(--color-accent)       / <alpha-value>)',
          light:   'rgb(var(--color-accent-light)  / <alpha-value>)',
          dark:    'rgb(var(--color-accent-dark)   / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--color-gold)       / <alpha-value>)',
          light:   'rgb(var(--color-gold-light)  / <alpha-value>)',
          dark:    'rgb(var(--color-gold-dark)   / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'mystic-gradient': 'radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0a0a0f 70%)',
      },
    },
  },
  plugins: [],
} satisfies Config
