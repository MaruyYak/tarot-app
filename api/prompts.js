import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const AREAS = [
  'любовь и отношения', 'карьера и деньги', 'здоровье и энергия',
  'семья', 'дружба', 'творчество', 'личностный рост', 'переемены в жизни',
  'страхи и сомнения', 'мечты и цели', 'интуиция и духовность', 'финансы',
  'самооценка', 'прошлое и будущее', 'работа', 'переезд или путешествие',
]

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const areas = pickRandom(AREAS, 4).join(', ')

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 120,
      messages: [
        {
          role: 'system',
          content:
            'Ты генерируешь короткие вопросы для расклада таро. Каждый вопрос — одно предложение, 4-7 слов, на русском. Отвечай ТОЛЬКО JSON-массивом из 4 строк, без пояснений.',
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
}
