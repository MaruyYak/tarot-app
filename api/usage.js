import { createClient } from '@libsql/client'

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const userId = req.headers['x-user-id']
  if (!userId) return res.status(400).json({ error: 'Missing x-user-id' })

  try {
    const db = getDb()
    const result = await db.execute({
      sql: 'SELECT interpretation_count FROM usage WHERE user_id = ?',
      args: [userId],
    })
    const count = Number(result.rows[0]?.interpretation_count ?? 0)
    res.json({ count })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
