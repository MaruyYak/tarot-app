import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const booksDir = path.join(__dirname, '..', 'books')
const outputDir = path.join(booksDir, 'extracted')

fs.mkdirSync(outputDir, { recursive: true })

const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.pdf'))
if (files.length === 0) {
  console.error('Нет PDF файлов в папке books/')
  process.exit(1)
}

for (const file of files) {
  process.stdout.write(`Извлекаю ${file}...`)
  const buffer = fs.readFileSync(path.join(booksDir, file))
  const { text, numpages } = await pdfParse(buffer)
  const outPath = path.join(outputDir, file.replace('.pdf', '.txt'))
  fs.writeFileSync(outPath, text, 'utf8')
  console.log(` ✓ ${numpages} стр, ${(text.length / 1000).toFixed(0)}k символов`)
}

console.log('\nГотово! Текст сохранён в books/extracted/')
