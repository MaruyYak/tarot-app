import { create } from 'zustand'
import type { Reading } from '@/types'

function getUserId(): string {
  let id = localStorage.getItem('tarot-user-id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('tarot-user-id', id)
  }
  return id
}

const API = '/api/readings'

function headers() {
  return { 'Content-Type': 'application/json', 'x-user-id': getUserId() }
}

interface HistoryStore {
  readings: Reading[]
  isLoading: boolean
  loadReadings: () => Promise<void>
  addReading: (r: Reading) => Promise<void>
  deleteReading: (id: string) => Promise<void>
  clearAll: () => Promise<void>
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  readings: [],
  isLoading: false,

  loadReadings: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch(API, { headers: headers() })
      const data = await res.json()
      set({ readings: data.readings ?? [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addReading: async (reading) => {
    set((s) => ({ readings: [reading, ...s.readings] }))
    await fetch(API, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(reading),
    })
  },

  deleteReading: async (id) => {
    set((s) => ({ readings: s.readings.filter((r) => r.id !== id) }))
    await fetch(`${API}?id=${id}`, { method: 'DELETE', headers: headers() })
  },

  clearAll: async () => {
    set({ readings: [] })
    await fetch(API, { method: 'DELETE', headers: headers() })
  },
}))
