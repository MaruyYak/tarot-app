export function nanoid(): string {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36)
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export interface InterpretationData {
  keywords: string[]
  short: string
  long: string
  upright: string
  reversed: string
  love: string
  career: string
  finance: string
}

export function parseInterpretation(raw: string): InterpretationData | null {
  try {
    const data = JSON.parse(raw)
    if (data && typeof data.short === 'string') return data as InterpretationData
    return null
  } catch {
    return null
  }
}
