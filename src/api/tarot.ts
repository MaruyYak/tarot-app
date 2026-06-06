import type { DrawnCard } from '@/types'

interface InterpretRequest {
  question: string
  spreadName: string
  cards: DrawnCard[]
}

function getUserId(): string {
  let id = localStorage.getItem('tarot-user-id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('tarot-user-id', id)
  }
  return id
}

export async function getInterpretation(req: InterpretRequest): Promise<string> {
  const res = await fetch('/api/interpret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': getUserId(),
    },
    body: JSON.stringify(req),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error ?? 'Ошибка сервера')
  }

  // Сериализуем объект в строку — тип interpretation в store/DB остаётся string
  return typeof data.interpretation === 'object'
    ? JSON.stringify(data.interpretation)
    : (data.interpretation as string)
}
