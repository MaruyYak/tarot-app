export function nanoid(): string {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36)
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
