/**
 * Читает извлечённый текст из книг и строит базу знаний по 78 картам Таро.
 * Запускать ПОСЛЕ extract-pdfs.mjs
 * Использует: books/extracted/3-card-meanings.txt и 4-symbolism.txt
 *
 * Результат: src/data/cardKnowledge.json
 */

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const extractedDir = path.join(__dirname, '..', 'books', 'extracted')
const outputPath = path.join(__dirname, '..', 'src', 'data', 'cardKnowledge.json')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Все 78 карт (id → русское название)
const ALL_CARDS = [
  // Старшие арканы
  { id: 'major-0',  name: 'Шут' },
  { id: 'major-1',  name: 'Маг' },
  { id: 'major-2',  name: 'Верховная Жрица' },
  { id: 'major-3',  name: 'Императрица' },
  { id: 'major-4',  name: 'Император' },
  { id: 'major-5',  name: 'Иерофант' },
  { id: 'major-6',  name: 'Влюблённые' },
  { id: 'major-7',  name: 'Колесница' },
  { id: 'major-8',  name: 'Сила' },
  { id: 'major-9',  name: 'Отшельник' },
  { id: 'major-10', name: 'Колесо Фортуны' },
  { id: 'major-11', name: 'Справедливость' },
  { id: 'major-12', name: 'Повешенный' },
  { id: 'major-13', name: 'Смерть' },
  { id: 'major-14', name: 'Умеренность' },
  { id: 'major-15', name: 'Дьявол' },
  { id: 'major-16', name: 'Башня' },
  { id: 'major-17', name: 'Звезда' },
  { id: 'major-18', name: 'Луна' },
  { id: 'major-19', name: 'Солнце' },
  { id: 'major-20', name: 'Суд' },
  { id: 'major-21', name: 'Мир' },
  // Жезлы
  { id: 'wands-1',  name: 'Туз Жезлов' },
  { id: 'wands-2',  name: 'Двойка Жезлов' },
  { id: 'wands-3',  name: 'Тройка Жезлов' },
  { id: 'wands-4',  name: 'Четвёрка Жезлов' },
  { id: 'wands-5',  name: 'Пятёрка Жезлов' },
  { id: 'wands-6',  name: 'Шестёрка Жезлов' },
  { id: 'wands-7',  name: 'Семёрка Жезлов' },
  { id: 'wands-8',  name: 'Восьмёрка Жезлов' },
  { id: 'wands-9',  name: 'Девятка Жезлов' },
  { id: 'wands-10', name: 'Десятка Жезлов' },
  { id: 'wands-11', name: 'Паж Жезлов' },
  { id: 'wands-12', name: 'Рыцарь Жезлов' },
  { id: 'wands-13', name: 'Королева Жезлов' },
  { id: 'wands-14', name: 'Король Жезлов' },
  // Кубки
  { id: 'cups-1',   name: 'Туз Кубков' },
  { id: 'cups-2',   name: 'Двойка Кубков' },
  { id: 'cups-3',   name: 'Тройка Кубков' },
  { id: 'cups-4',   name: 'Четвёрка Кубков' },
  { id: 'cups-5',   name: 'Пятёрка Кубков' },
  { id: 'cups-6',   name: 'Шестёрка Кубков' },
  { id: 'cups-7',   name: 'Семёрка Кубков' },
  { id: 'cups-8',   name: 'Восьмёрка Кубков' },
  { id: 'cups-9',   name: 'Девятка Кубков' },
  { id: 'cups-10',  name: 'Десятка Кубков' },
  { id: 'cups-11',  name: 'Паж Кубков' },
  { id: 'cups-12',  name: 'Рыцарь Кубков' },
  { id: 'cups-13',  name: 'Королева Кубков' },
  { id: 'cups-14',  name: 'Король Кубков' },
  // Мечи
  { id: 'swords-1',  name: 'Туз Мечей' },
  { id: 'swords-2',  name: 'Двойка Мечей' },
  { id: 'swords-3',  name: 'Тройка Мечей' },
  { id: 'swords-4',  name: 'Четвёрка Мечей' },
  { id: 'swords-5',  name: 'Пятёрка Мечей' },
  { id: 'swords-6',  name: 'Шестёрка Мечей' },
  { id: 'swords-7',  name: 'Семёрка Мечей' },
  { id: 'swords-8',  name: 'Восьмёрка Мечей' },
  { id: 'swords-9',  name: 'Девятка Мечей' },
  { id: 'swords-10', name: 'Десятка Мечей' },
  { id: 'swords-11', name: 'Паж Мечей' },
  { id: 'swords-12', name: 'Рыцарь Мечей' },
  { id: 'swords-13', name: 'Королева Мечей' },
  { id: 'swords-14', name: 'Король Мечей' },
  // Пентакли
  { id: 'pentacles-1',  name: 'Туз Пентаклей' },
  { id: 'pentacles-2',  name: 'Двойка Пентаклей' },
  { id: 'pentacles-3',  name: 'Тройка Пентаклей' },
  { id: 'pentacles-4',  name: 'Четвёрка Пентаклей' },
  { id: 'pentacles-5',  name: 'Пятёрка Пентаклей' },
  { id: 'pentacles-6',  name: 'Шестёрка Пентаклей' },
  { id: 'pentacles-7',  name: 'Семёрка Пентаклей' },
  { id: 'pentacles-8',  name: 'Восьмёрка Пентаклей' },
  { id: 'pentacles-9',  name: 'Девятка Пентаклей' },
  { id: 'pentacles-10', name: 'Десятка Пентаклей' },
  { id: 'pentacles-11', name: 'Паж Пентаклей' },
  { id: 'pentacles-12', name: 'Рыцарь Пентаклей' },
  { id: 'pentacles-13', name: 'Королева Пентаклей' },
  { id: 'pentacles-14', name: 'Король Пентаклей' },
]

function readExtracted(filename) {
  const p = path.join(extractedDir, filename)
  if (!fs.existsSync(p)) return null
  return fs.readFileSync(p, 'utf8')
}

function chunkText(text, maxChars = 60000) {
  const chunks = []
  for (let i = 0; i < text.length; i += maxChars) {
    chunks.push(text.slice(i, i + maxChars))
  }
  return chunks
}

async function extractCardsFromChunk(chunk, cardNames, chunkIndex, totalChunks) {
  const names = cardNames.map(c => c.name).join(', ')
  const prompt = `Ты специалист по Таро. Из текста ниже извлеки трактовки для следующих карт: ${names}.

Если карта упоминается в тексте — извлеки её значение. Если не упоминается — верни null для этой карты.

Верни ТОЛЬКО валидный JSON:
{
  "Название карты": {
    "essence": "суть карты — 1 предложение",
    "upright": "прямое значение — 2-3 предложения",
    "reversed": "перевёрнутое значение — 2-3 предложения",
    "symbolism": "ключевые символы и их смысл — 1-2 предложения"
  },
  "Другая карта": null
}

ТЕКСТ (часть ${chunkIndex + 1} из ${totalChunks}):
${chunk}`

  const resp = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 4000,
    response_format: { type: 'json_object' },
    messages: [{ role: 'user', content: prompt }],
  })

  return JSON.parse(resp.choices[0].message.content)
}

async function buildKnowledge() {
  // Загружаем все доступные извлечённые тексты (минимум 5kb — фильтруем пустые сканы)
  const txtFiles = fs.readdirSync(extractedDir).filter(f => f.endsWith('.txt'))
  if (txtFiles.length === 0) {
    console.error('Нет файлов в books/extracted/ — сначала запусти extract-pdfs.mjs')
    process.exit(1)
  }

  const texts = txtFiles
    .map(f => ({ name: f, text: readExtracted(f) }))
    .filter(({ text }) => text && text.length > 5000)

  if (texts.length === 0) {
    console.error('Все извлечённые файлы пустые или слишком малы (возможно, PDF-сканы без текста)')
    process.exit(1)
  }

  texts.forEach(({ name, text }) =>
    console.log(`${name}: ${(text.length / 1000).toFixed(0)}k символов`)
  )

  // Объединяем все источники
  const sourceText = texts.map(t => t.text).join('\n\n')
  const chunks = chunkText(sourceText, 55000)
  console.log(`Разбито на ${chunks.length} частей\n`)

  // Загружаем уже обработанные карты (для возобновления при прерывании)
  const existing = fs.existsSync(outputPath)
    ? JSON.parse(fs.readFileSync(outputPath, 'utf8'))
    : {}

  const knowledge = { ...existing }
  const remaining = ALL_CARDS.filter(c => !knowledge[c.id])

  if (remaining.length === 0) {
    console.log('Все карты уже обработаны!')
    return
  }

  console.log(`Осталось обработать: ${remaining.length} карт`)

  // Обрабатываем каждую часть текста
  for (let ci = 0; ci < chunks.length; ci++) {
    const stillMissing = remaining.filter(c => !knowledge[c.id])
    if (stillMissing.length === 0) break

    console.log(`\nЧасть ${ci + 1}/${chunks.length}: ищу ${stillMissing.length} карт...`)

    // Батчи по 15 карт за раз
    const BATCH = 15
    for (let i = 0; i < stillMissing.length; i += BATCH) {
      const batch = stillMissing.slice(i, i + BATCH)
      process.stdout.write(`  Батч ${Math.floor(i / BATCH) + 1}: ${batch.map(c => c.name).join(', ')}...`)

      try {
        const result = await extractCardsFromChunk(chunks[ci], batch, ci, chunks.length)

        let found = 0
        for (const card of batch) {
          const data = result[card.name]
          if (data && data.essence) {
            knowledge[card.id] = data
            found++
          }
        }
        console.log(` ✓ найдено: ${found}/${batch.length}`)
      } catch (e) {
        console.log(` ✗ ошибка: ${e.message}`)
      }

      // Сохраняем после каждого батча (чтобы не потерять при сбое)
      fs.writeFileSync(outputPath, JSON.stringify(knowledge, null, 2), 'utf8')

      // Пауза чтобы не превышать rate limit
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  // Итог
  const found = ALL_CARDS.filter(c => knowledge[c.id]).length
  const missing = ALL_CARDS.filter(c => !knowledge[c.id]).map(c => c.name)

  console.log(`\n✓ Готово: ${found}/78 карт`)
  if (missing.length > 0) {
    console.log(`Не найдено в книгах (${missing.length}): ${missing.join(', ')}`)
    console.log('Попробуй запустить скрипт ещё раз — он продолжит с этих карт')
  }

  fs.writeFileSync(outputPath, JSON.stringify(knowledge, null, 2), 'utf8')
  console.log(`\nСохранено: src/data/cardKnowledge.json`)
}

buildKnowledge().catch(console.error)
