import OpenAI from 'openai'
import { createClient } from '@libsql/client'

const FREE_LIMIT = 20
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userId = req.headers['x-user-id']
  const { question, spreadName, cards } = req.body

  // Проверяем лимит перед запросом к OpenAI
  if (userId && process.env.TURSO_DATABASE_URL) {
    try {
      const db = getDb()
      const result = await db.execute({
        sql: 'SELECT interpretation_count FROM usage WHERE user_id = ?',
        args: [userId],
      })
      const count = Number(result.rows[0]?.interpretation_count ?? 0)
      if (count >= FREE_LIMIT) {
        return res.status(429).json({
          error: `Исчерпан лимит бесплатных раскладов (${FREE_LIMIT} из ${FREE_LIMIT}).`,
          limitReached: true,
        })
      }
    } catch (err) {
      console.error('Usage check failed:', err)
    }
  }

  const cardList = cards
    .map((c) => `${c.card.nameRu}${c.isReversed ? ' (перевёрнутая)' : ''} — позиция: ${c.position.nameRu}`)
    .join('\n')

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 900,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: `Ты — таролог-друг. Отвечаешь по-русски, на "ты", живым языком без жаргона.
Верни ТОЛЬКО валидный JSON со следующими полями:
{
  "keywords": ["3-5 ключевых слова для всего расклада"],
  "short": "Краткий ответ на вопрос — 2-3 предложения как другу",
  "long": "Развёрнутый ответ — 4-5 предложений с нюансами и деталями",
  "upright": "Что говорят прямые карты в этом раскладе (если есть перевёрнутые — можно упомянуть контраст)",
  "reversed": "Что означают перевёрнутые карты в контексте вопроса (если все прямые — напиши об энергии расклада)",
  "love": "Как этот расклад отвечает в сфере любви и отношений",
  "career": "Как этот расклад отвечает в сфере карьеры и работы",
  "finance": "Как этот расклад отвечает в сфере финансов и денег"
}`,
        },
        {
          role: 'user',
          content: `Расклад: ${spreadName}\nВопрос: ${question}\nКарты:\n${cardList}`,
        },
      ],
    })

    const interpretation = JSON.parse(completion.choices[0].message.content)

    // Увеличиваем счётчик после успешного ответа
    if (userId && process.env.TURSO_DATABASE_URL) {
      try {
        const db = getDb()
        await db.execute({
          sql: `INSERT INTO usage (user_id, interpretation_count) VALUES (?, 1)
                ON CONFLICT(user_id) DO UPDATE SET interpretation_count = interpretation_count + 1`,
          args: [userId],
        })
      } catch (err) {
        console.error('Usage increment failed:', err)
      }
    }

    res.json({ interpretation })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
