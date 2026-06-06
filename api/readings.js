import { createClient } from '@libsql/client'

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

export default async function handler(req, res) {
  const db = getDb()
  const userId = req.headers['x-user-id']

  if (!userId) {
    return res.status(400).json({ error: 'Missing x-user-id header' })
  }

  // GET — загрузить историю
  if (req.method === 'GET') {
    const result = await db.execute({
      sql: 'SELECT * FROM readings WHERE user_id = ? ORDER BY created_at DESC LIMIT 100',
      args: [userId],
    })
    const readings = result.rows.map((r) => ({
      id: r.id,
      question: r.question,
      spread: JSON.parse(r.spread),
      drawnCards: JSON.parse(r.drawn_cards),
      interpretation: r.interpretation,
      createdAt: r.created_at,
    }))
    return res.json({ readings })
  }

  // POST — сохранить расклад
  if (req.method === 'POST') {
    const { id, question, spread, drawnCards, interpretation, createdAt } = req.body
    await db.execute({
      sql: 'INSERT INTO readings (id, user_id, question, spread, drawn_cards, interpretation, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [id, userId, question, JSON.stringify(spread), JSON.stringify(drawnCards), interpretation, createdAt],
    })
    return res.status(201).json({ ok: true })
  }

  // DELETE — удалить расклад
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (id) {
      await db.execute({ sql: 'DELETE FROM readings WHERE id = ? AND user_id = ?', args: [id, userId] })
    } else {
      await db.execute({ sql: 'DELETE FROM readings WHERE user_id = ?', args: [userId] })
    }
    return res.json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
