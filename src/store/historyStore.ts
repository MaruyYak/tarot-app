import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Reading } from '@/types'

interface HistoryStore {
  readings: Reading[]
  addReading: (r: Reading) => void
  deleteReading: (id: string) => void
  clearAll: () => void
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      readings: [],

      addReading: (reading) =>
        set((state) => ({
          readings: [reading, ...state.readings].slice(0, 100), // keep last 100
        })),

      deleteReading: (id) =>
        set((state) => ({
          readings: state.readings.filter((r) => r.id !== id),
        })),

      clearAll: () => set({ readings: [] }),
    }),
    { name: 'tarot-history' }
  )
)
