export type DeckId = 'gold' | 'purple' | 'rose'

interface DeckConfig {
  id: DeckId
  label: string
  majorFolder: string
  minorFolder?: string
  cover: string
  majorCards: Record<string, string>
  minorCards?: Record<string, string>
}

const DECKS: DeckConfig[] = [
  {
    id: 'gold',
    label: 'Gold',
    majorFolder: 'The Major Arcana/Gold',
    minorFolder: 'The Minor Arcana/Gold',
    cover: 'Cover_gold.png',
    majorCards: {
      'major-0':  'Fool_gold.jpg',
      'major-1':  'Magician_gold.jpg',
      'major-2':  'High_Priestess_gold.jpg',
      'major-3':  'Empress_gold.jpg',
      'major-4':  'Emperor_gold.jpg',
      'major-5':  'Hierophant_gold.jpg',
      'major-6':  'Lovers_gold.png',
      'major-7':  'Chariot_gold.jpg',
      'major-8':  'Strength_gold.jpg',
      'major-9':  'Hermit_gold.jpg',
      'major-10': 'Fortune_gold.jpg',
      'major-11': 'Justice_gold.jpg',
      'major-12': 'Hanged_Man_gold.jpg',
      'major-13': 'Death_gold.jpg',
      'major-14': 'Temperance_gold.jpg',
      'major-15': 'Devil_gold.jpg',
      'major-16': 'Tower_gold.jpg',
      'major-17': 'Star_gold.jpg',
      'major-18': 'Moon_gold.jpg',
      'major-19': 'Sun_gold.jpg',
      'major-20': 'Judgement_gold.jpg',
      'major-21': 'World_gold.jpg',
    },
    minorCards: {
      'wands-1':  'Ace_of_Wands_gold.jpg',
      'wands-2':  'Two_of_Wands_gold.jpg',
      'wands-3':  'Three_of_Wands_gold.jpg',
      'wands-4':  'Four_of_Wands_gold.jpg',
      'wands-5':  'Five_of_Wands_gold.jpg',
      'wands-6':  'Six_of_Wands_gold.jpg',
      'wands-7':  'Seven_of_Wands_gold.jpg',
      'wands-8':  'Eight_of_Wands_gold.jpg',
      'wands-9':  'Nine_of_Wands_gold.jpg',
      'wands-10': 'Ten_of_Wands_gold.jpg',
      'wands-11': 'Page_of_Wands_gold.jpg',
      'wands-12': 'Knight_of_Wands_gold.jpg',
      'wands-13': 'Queen_of_Wands_gold.jpg',
      'wands-14': 'King_of_Wands_gold.jpg',
      'cups-1':   'Ace_of_Cups_gold.jpg',
      'cups-2':   'Two_of_Cups_gold.jpg',
      'cups-3':   'Three_of_Cups_gold.jpg',
      'cups-4':   'Four_of_Cups_gold.jpg',
      'cups-5':   'Five_of_Cups_gold.png',
      'cups-6':   'Six_of_Cups_gold.png',
      'cups-7':   'Seven_of_Cups_gold.jpg',
      'cups-8':   'Eight_of_Cups_gold.png',
      'cups-9':   'Nine_of_Cups_gold.png',
      'cups-10':  'Ten_of_Cups_gold.jpg',
      'cups-11':  'Page_of_Cups_gold.jpg',
      'cups-12':  'Knight_of_Cups_gold.jpg',
      'cups-13':  'Queen_of_Cups_gold.jpg',
      'cups-14':  'King_of_Cups_gold.jpg',
      'swords-1':  'Ace_of_Swords_gold.jpg',
      'swords-2':  'Two_of_Swords_gold.jpg',
      'swords-3':  'Three_of_Swords_gold.jpg',
      'swords-4':  'Four_of_Swords_gold.jpg',
      'swords-5':  'Five_of_Swords_gold.jpg',
      'swords-6':  'Six_of_Swords_gold.jpg',
      'swords-7':  'Seven_of_Swords_gold.png',
      'swords-8':  'Eight_of_Swords_gold.png',
      'swords-9':  'Nine_of_Swords_gold.jpg',
      'swords-10': 'Ten_of_Swords_gold.jpg',
      'swords-11': 'Page_of_Swords_gold.png',
      'swords-12': 'Knight_of_Swords_gold.jpg',
      'swords-13': 'Queen_of_Swords_gold.png',
      'swords-14': 'King_of_Swords_gold.png',
      'pentacles-1':  'Ace_of_Pentacles_gold.jpg',
      'pentacles-2':  'Two_of_Pentacles_gold.png',
      'pentacles-3':  'Three_of_Pentacles_gold.jpg',
      'pentacles-4':  'Four_of_Pentacles_gold.png',
      'pentacles-5':  'Five_of_Pentacles_gold.jpg',
      'pentacles-6':  'Six_of_Pentacles_gold.png',
      'pentacles-7':  'Seven_of_Pentacles_gold.jpg',
      'pentacles-8':  'Eight_of_Pentacles_gold.png',
      'pentacles-9':  'Nine_of_Pentacles_gold.jpg',
      'pentacles-10': 'Ten_of_Pentacles_gold.jpg',
      'pentacles-11': 'Page_of_Pentacles_gold.png',
      'pentacles-12': 'Knight_of_Pentacles_gold.jpg',
      'pentacles-13': 'Queen_of_Pentacles_gold.jpg',
      'pentacles-14': 'King_of_Pentacles_gold.jpg',
    },
  },
  {
    id: 'purple',
    label: 'Purple',
    majorFolder: 'The Major Arcana/Purple',
    cover: 'Cover_purple.png',
    majorCards: {
      'major-0':  'Fool_purple.jpg',
      'major-1':  'Magician_purple.jpg',
      'major-2':  'High_Priestess_purple.jpg',
      'major-3':  'Empress_purple.jpg',
      'major-4':  'Emperor_purple.jpg',
      'major-5':  'Hierophant_purple.jpg',
      'major-6':  'Lovers_purple.jpg',
      'major-7':  'Chariot_purple.jpg',
      'major-8':  'Strength_purple.jpg',
      'major-9':  'Hermit_purple.jpg',
      'major-10': 'Fortune_purple.png',
      'major-11': 'Justice_purple.jpg',
      'major-12': 'Hanged_Man_purple.jpg',
      'major-13': 'Death_purple.jpg',
      'major-14': 'Temperance_purple.jpg',
      'major-15': 'Devil_purple.jpg',
      'major-16': 'Tower_purple.png',
      'major-17': 'Star_purple.jpg',
      'major-18': 'Moon_purple.png',
      'major-19': 'Sun_purple.jpg',
      'major-20': 'Judgement_purple.jpg',
      'major-21': 'World_purple.jpg',
    },
  },
  {
    id: 'rose',
    label: 'Rose',
    majorFolder: 'The Major Arcana/Rose',
    cover: 'Cover_rose.png',
    majorCards: {
      'major-0':  'Fool_rose.jpg',
      'major-1':  'Magician_rose.jpg',
      'major-2':  'High_Priestess_rose.jpg',
      'major-3':  'Empress_rose.jpg',
      'major-4':  'Emperor_rose.jpg',
      'major-5':  'Hierophant_rose.png',
      'major-6':  'Lovers_rose.jpg',
      'major-7':  'Chariot_rose.jpg',
      'major-8':  'Strength_rose.jpg',
      'major-9':  'Hermit_rose.jpg',
      'major-10': 'Fortune_rose.jpg',
      'major-11': 'Justice_rose.jpg',
      'major-12': 'Hanged_Man_rose.png',
      'major-13': 'Death_rose.jpg',
      'major-14': 'Temperance_rose.jpg',
      'major-15': 'Devil_rose.jpg',
      'major-16': 'Tower_rose.jpg',
      'major-17': 'Star_rose.jpg',
      'major-18': 'Moon_rose.jpg',
      'major-19': 'Sun_rose.jpg',
      'major-20': 'Judgement_rose.jpg',
      'major-21': 'World_rose.jpg',
    },
  },
]

export { DECKS }

export function getDeck(id: DeckId): DeckConfig {
  return DECKS.find((d) => d.id === id)!
}

export function getCardImageUrl(deckId: DeckId, cardId: string): string | null {
  const deck = getDeck(deckId)
  if (cardId.startsWith('major-')) {
    const filename = deck.majorCards[cardId]
    if (!filename) return null
    return `/${deck.majorFolder}/${encodeURIComponent(filename)}`
  }
  if (!deck.minorFolder || !deck.minorCards) return null
  const filename = deck.minorCards[cardId]
  if (!filename) return null
  return `/${deck.minorFolder}/${encodeURIComponent(filename)}`
}

export function getCoverUrl(deckId: DeckId): string {
  const deck = getDeck(deckId)
  return `/${deck.majorFolder}/${deck.cover}`
}
