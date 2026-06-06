import { create } from 'zustand'
import type { Spread, DrawnCard } from '@/types'
import { getInterpretation } from '@/api/tarot'

interface ReadingStore {
  question: string
  spread: Spread | null
  drawnCards: DrawnCard[]
  interpretation: string
  isInterpreting: boolean
  error: string | null

  setQuestion: (q: string) => void
  selectSpread: (s: Spread) => void
  setDrawnCards: (cards: DrawnCard[]) => void
  fetchInterpretation: () => Promise<void>
  reset: () => void
}

const initialState = {
  question: '',
  spread: null,
  drawnCards: [],
  interpretation: '',
  isInterpreting: false,
  error: null,
}

export const useReadingStore = create<ReadingStore>((set, get) => ({
  ...initialState,

  setQuestion: (question) => set({ question }),
  selectSpread: (spread) => set({ spread }),
  setDrawnCards: (drawnCards) => set({ drawnCards }),

  fetchInterpretation: async () => {
    const { question, spread, drawnCards } = get()
    if (!spread) return

    set({ isInterpreting: true, error: null, interpretation: '' })

    try {
      const text = await getInterpretation({
        question,
        spreadName: spread.nameRu,
        cards: drawnCards,
      })
      set({ interpretation: text, isInterpreting: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Неизвестная ошибка',
        isInterpreting: false,
      })
    }
  },

  reset: () => set(initialState),
}))
