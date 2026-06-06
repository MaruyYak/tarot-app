import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import OpenAI from 'openai'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

config()

const __dirname = dirname(fileURLToPath(import.meta.url))
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
    .map(
      ({ card, position, isReversed }) =>
        `Позиция «${position.nameRu}»: ${card.nameRu}${isReversed ? ' (перевёрнутая)' : ''}\n  Ключевые слова: ${card.keywords.join(', ')}`
    )
    .join('\n\n')

  const systemPrompt = `Ты — подруга, которая умеет читать таро. Отвечаешь на "ты", коротко, без воды. Максимум 3-4 предложения на всё.`

  const userPrompt = `Вопрос: «${question}»
Карты: ${cardsText}

Скажи главное что видишь в картах — 3-4 предложения, как другу. Без списков, без заголовков.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 300,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    })

    const text = completion.choices[0]?.message?.content ?? ''
    res.json({ interpretation: text })
  } catch (err) {
    console.error('OpenAI API error:', err)
    res.status(500).json({ error: 'Не удалось получить трактовку. Проверьте API-ключ.' })
  }
})

const PROMPT_AREAS = [
  'любовь и отношения', 'карьера и деньги', 'здоровье и энергия',
  'семья', 'дружба', 'творчество', 'личностный рост', 'перемены в жизни',
  'страхи и сомнения', 'мечты и цели', 'интуиция и духовность', 'финансы',
  'самооценка', 'прошлое и будущее', 'работа', 'переезд или путешествие',
]

app.get('/api/prompts', async (_req, res) => {
  const areas = [...PROMPT_AREAS].sort(() => Math.random() - 0.5).slice(0, 4).join(', ')
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 120,
      messages: [
        {
          role: 'system',
          content: 'Ты генерируешь короткие вопросы для расклада таро. Каждый вопрос — одно предложение, 4-7 слов, на русском. Отвечай ТОЛЬКО JSON-массивом из 4 строк, без пояснений.',
        },
        {
          role: 'user',
          content: `Придумай по одному вопросу для каждой темы: ${areas}. Вопросы должны быть личными (от первого лица), короткими и разными по смыслу.`,
        },
      ],
    })
    const text = completion.choices[0].message.content.trim()
    const prompts = JSON.parse(text.replace(/```json|```/g, '').trim())
    res.json({ prompts })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
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
