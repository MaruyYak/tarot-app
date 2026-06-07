import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DeckId } from '@/data/decks'

export type AppTheme = 'void' | 'nouveau' | 'emerald' | 'parchment'

interface ProfileStore {
  name: string
  joinedAt: string
  theme: AppTheme
  deckId: DeckId | null  // null = CSS-карточки
  setName: (name: string) => void
  setTheme: (theme: AppTheme) => void
  setDeckId: (id: DeckId | null) => void
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      name: 'Странник',
      joinedAt: new Date().toISOString(),
      theme: 'parchment',
      deckId: null,
      setName: (name) => set({ name }),
      setTheme: (theme) => set({ theme }),
      setDeckId: (deckId) => set({ deckId }),
    }),
    { name: 'tarot-profile' }
  )
)
