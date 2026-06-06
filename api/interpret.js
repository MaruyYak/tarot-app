import OpenAI from 'openai'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { question, spreadName, cards } = req.body

  const cardList = cards
    .map((c) => `${c.card.nameRu}${c.isReversed ? ' (перевёрнутая)' : ''} — позиция: ${c.position.nameRu}`)
    .join('\n')

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content:
            'Ты — друг, который умеет читать таро. Отвечай по-русски, на "ты", коротко и по делу — 3-4 предложения максимум. Никакого психологического жаргона, никаких списков. Просто говори как близкий человек.',
        },
        {
          role: 'user',
          content: `Расклад: ${spreadName}\nВопрос: ${question}\nКарты:\n${cardList}`,
        },
      ],
    })

    res.json({ interpretation: completion.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
