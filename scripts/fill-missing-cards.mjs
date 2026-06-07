/**
 * Генерирует знания для карт, не найденных в книгах, используя экспертизу AI.
 * Запускать после build-card-knowledge.mjs если остались пропуски.
 */

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputPath = path.join(__dirname, '..', 'src', 'data', 'cardKnowledge.json')
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const ALL_CARDS = [
  { id: 'major-0', name: 'Шут' }, { id: 'major-1', name: 'Маг' },
  { id: 'major-2', name: 'Верховная Жрица' }, { id: 'major-3', name: 'Императрица' },
  { id: 'major-4', name: 'Император' }, { id: 'major-5', name: 'Иерофант' },
  { id: 'major-6', name: 'Влюблённые' }, { id: 'major-7', name: 'Колесница' },
  { id: 'major-8', name: 'Сила' }, { id: 'major-9', name: 'Отшельник' },
  { id: 'major-10', name: 'Колесо Фортуны' }, { id: 'major-11', name: 'Справедливость' },
  { id: 'major-12', name: 'Повешенный' }, { id: 'major-13', name: 'Смерть' },
  { id: 'major-14', name: 'Умеренность' }, { id: 'major-15', name: 'Дьявол' },
  { id: 'major-16', name: 'Башня' }, { id: 'major-17', name: 'Звезда' },
  { id: 'major-18', name: 'Луна' }, { id: 'major-19', name: 'Солнце' },
  { id: 'major-20', name: 'Суд' }, { id: 'major-21', name: 'Мир' },
  { id: 'wands-1', name: 'Туз Жезлов' }, { id: 'wands-2', name: 'Двойка Жезлов' },
  { id: 'wands-3', name: 'Тройка Жезлов' }, { id: 'wands-4', name: 'Четвёрка Жезлов' },
  { id: 'wands-5', name: 'Пятёрка Жезлов' }, { id: 'wands-6', name: 'Шестёрка Жезлов' },
  { id: 'wands-7', name: 'Семёрка Жезлов' }, { id: 'wands-8', name: 'Восьмёрка Жезлов' },
  { id: 'wands-9', name: 'Девятка Жезлов' }, { id: 'wands-10', name: 'Десятка Жезлов' },
  { id: 'wands-11', name: 'Паж Жезлов' }, { id: 'wands-12', name: 'Рыцарь Жезлов' },
  { id: 'wands-13', name: 'Королева Жезлов' }, { id: 'wands-14', name: 'Король Жезлов' },
  { id: 'cups-1', name: 'Туз Кубков' }, { id: 'cups-2', name: 'Двойка Кубков' },
  { id: 'cups-3', name: 'Тройка Кубков' }, { id: 'cups-4', name: 'Четвёрка Кубков' },
  { id: 'cups-5', name: 'Пятёрка Кубков' }, { id: 'cups-6', name: 'Шестёрка Кубков' },
  { id: 'cups-7', name: 'Семёрка Кубков' }, { id: 'cups-8', name: 'Восьмёрка Кубков' },
  { id: 'cups-9', name: 'Девятка Кубков' }, { id: 'cups-10', name: 'Десятка Кубков' },
  { id: 'cups-11', name: 'Паж Кубков' }, { id: 'cups-12', name: 'Рыцарь Кубков' },
  { id: 'cups-13', name: 'Королева Кубков' }, { id: 'cups-14', name: 'Король Кубков' },
  { id: 'swords-1', name: 'Туз Мечей' }, { id: 'swords-2', name: 'Двойка Мечей' },
  { id: 'swords-3', name: 'Тройка Мечей' }, { id: 'swords-4', name: 'Четвёрка Мечей' },
  { id: 'swords-5', name: 'Пятёрка Мечей' }, { id: 'swords-6', name: 'Шестёрка Мечей' },
  { id: 'swords-7', name: 'Семёрка Мечей' }, { id: 'swords-8', name: 'Восьмёрка Мечей' },
  { id: 'swords-9', name: 'Девятка Мечей' }, { id: 'swords-10', name: 'Десятка Мечей' },
  { id: 'swords-11', name: 'Паж Мечей' }, { id: 'swords-12', name: 'Рыцарь Мечей' },
  { id: 'swords-13', name: 'Королева Мечей' }, { id: 'swords-14', name: 'Король Мечей' },
  { id: 'pentacles-1', name: 'Туз Пентаклей' }, { id: 'pentacles-2', name: 'Двойка Пентаклей' },
  { id: 'pentacles-3', name: 'Тройка Пентаклей' }, { id: 'pentacles-4', name: 'Четвёрка Пентаклей' },
  { id: 'pentacles-5', name: 'Пятёрка Пентаклей' }, { id: 'pentacles-6', name: 'Шестёрка Пентаклей' },
  { id: 'pentacles-7', name: 'Семёрка Пентаклей' }, { id: 'pentacles-8', name: 'Восьмёрка Пентаклей' },
  { id: 'pentacles-9', name: 'Девятка Пентаклей' }, { id: 'pentacles-10', name: 'Десятка Пентаклей' },
  { id: 'pentacles-11', name: 'Паж Пентаклей' }, { id: 'pentacles-12', name: 'Рыцарь Пентаклей' },
  { id: 'pentacles-13', name: 'Королева Пентаклей' }, { id: 'pentacles-14', name: 'Король Пентаклей' },
]

const knowledge = JSON.parse(fs.readFileSync(outputPath, 'utf8'))
const missing = ALL_CARDS.filter(c => !knowledge[c.id])

if (missing.length === 0) {
  console.log('Все 78 карт уже есть!')
  process.exit(0)
}

console.log(`Генерирую знания для ${missing.length} карт: ${missing.map(c => c.name).join(', ')}\n`)

const BATCH = 10
for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH)
  const names = batch.map(c => c.name).join(', ')
  process.stdout.write(`Батч: ${names}...`)

  const resp = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 3000,
    response_format: { type: 'json_object' },
    messages: [{
      role: 'user',
      content: `Ты эксперт по классическому Таро Уэйта. Составь профессиональные трактовки для карт: ${names}.

Верни ТОЛЬКО валидный JSON:
{
  "Название карты": {
    "essence": "суть карты — 1 предложение",
    "upright": "прямое значение — 2-3 предложения",
    "reversed": "перевёрнутое значение — 2-3 предложения",
    "symbolism": "ключевые символы на карте и их смысл — 1-2 предложения"
  }
}`,
    }],
  })

  const result = JSON.parse(resp.choices[0].message.content)
  let found = 0
  for (const card of batch) {
    const data = result[card.name]
    if (data?.essence) {
      knowledge[card.id] = data
      found++
    }
  }
  console.log(` ✓ ${found}/${batch.length}`)
  fs.writeFileSync(outputPath, JSON.stringify(knowledge, null, 2), 'utf8')
  await new Promise(r => setTimeout(r, 800))
}

const total = ALL_CARDS.filter(c => knowledge[c.id]).length
console.log(`\nИтого: ${total}/78 карт. Сохранено в src/data/cardKnowledge.json`)
