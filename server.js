import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import OpenAI from 'openai'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

config()

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const cardKnowledge = require(join(__dirname, 'src', 'data', 'cardKnowledge.json'))
const isProd = existsSync(join(__dirname, 'dist'))

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json())

// Serve built frontend in production
if (isProd) {
  app.use(express.static(join(__dirname, 'dist')))
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/api/interpret', async (req, res) => {
  const { question, spreadName, cards } = req.body

  if (!question || !Array.isArray(cards) || cards.length === 0) {
    return res.status(400).json({ error: 'Недостаточно данных для трактовки' })
  }

  const cardsText = cards
    .map(({ card, position, isReversed }) => {
      const k = cardKnowledge[card.id]
      const knowledgeBlock = k
        ? `  Суть: ${k.essence}\n  Прямая: ${k.upright}\n  Перевёрнутая: ${k.reversed}`
        : `  Ключевые слова: ${card.keywords.join(', ')}`
      return `Позиция «${position.nameRu}»: ${card.nameRu}${isReversed ? ' (перевёрнутая)' : ''}\n${knowledgeBlock}`
    })
    .join('\n\n')

  const systemPrompt = `Ты — профессиональный таролог. Отвечаешь по-русски, на "ты", живым языком без жаргона.
Для каждой карты тебе дана её суть и классические значения из книг — используй эти знания как основу трактовки, но формулируй своими словами, применяя к конкретному вопросу.
Верни ТОЛЬКО валидный JSON со следующими полями:
{
  "keywords": ["3-5 ключевых слова для всего расклада"],
  "short": "Краткий ответ на вопрос — 2-3 предложения как другу",
  "long": "Развёрнутый ответ — 4-5 предложений с нюансами и деталями",
  "upright": "Что говорят прямые карты в этом раскладе (если есть перевёрнутые — можно упомянуть контраст)",
  "reversed": "Что означают перевёрнутые карты в контексте вопроса (если все прямые — напиши об энергии расклада)",
  "love": "Как этот расклад отвечает в сфере любви и отношений",
  "career": "Как этот расклад отвечает в сфере карьеры и работы",
  "finance": "Как этот расклад отвечает в сфере финансов и денег",
  "positions": [
    { "position": "название позиции из расклада", "card": "название карты", "meaning": "1-2 предложения: что именно эта карта говорит в этой позиции для данного вопроса" }
  ]
}
Массив positions должен содержать ровно по одному объекту для каждой карты в раскладе, в том же порядке.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1400,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Расклад: ${spreadName}\nВопрос: «${question}»\nКарты:\n${cardsText}` },
      ],
    })

    const interpretation = JSON.parse(completion.choices[0]?.message?.content ?? '{}')
    res.json({ interpretation })
  } catch (err) {
    console.error('OpenAI API error:', err)
    res.status(500).json({ error: 'Не удалось получить трактовку. Проверьте API-ключ.' })
  }
})


// SPA fallback — все неизвестные маршруты отдают index.html
if (isProd) {
  app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
  })
}

const PORT = Number(process.env.PORT) || 3001
app.listen(PORT, () => {
  console.log(`✦ Server listening on http://localhost:${PORT}`)
  if (isProd) console.log('   Running in production mode (serving dist/)')
})
