export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: string
  name: string       // English
  nameRu: string     // Russian
  arcana: Arcana
  suit: Suit | null
  number: number     // 0–21 for major; 1–14 for minor
  keywords: string[] // Russian keywords
  upright: string    // upright meaning (Russian, brief)
  reversed: string   // reversed meaning (Russian, brief)
  symbol: string     // emoji symbol for card art
  gradient: string   // CSS gradient string for card background
}

export interface SpreadPosition {
  id: string
  nameRu: string
  description: string
}

export interface Spread {
  id: string
  nameRu: string
  description: string
  cardCount: number
  positions: SpreadPosition[]
}

export interface DrawnCard {
  card: TarotCard
  position: SpreadPosition
  isReversed: boolean
}

export interface Reading {
  id: string
  question: string
  spread: Spread
  drawnCards: DrawnCard[]
  interpretation: string
  createdAt: string // ISO date string
}
