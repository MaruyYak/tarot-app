import type { DrawnCard } from '@/types'

interface InterpretRequest {
  question: string
  spreadName: string
  cards: DrawnCard[]
}

export async function getInterpretation(req: InterpretRequest): Promise<string> {
  const res = await fetch('/api/interpret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error ?? 'Ошибка сервера')
  }

  return data.interpretation as string
}
