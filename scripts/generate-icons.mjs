import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(__dirname, '..', 'public', 'The Major Arcana', 'Gold', 'Cover_gold.png')
const out = path.join(__dirname, '..', 'public')

const sizes = [
  { file: 'pwa-192.png',        size: 192 },
  { file: 'pwa-512.png',        size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

for (const { file, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(path.join(out, file))
  console.log(`✓ ${file} (${size}×${size})`)
}

console.log('Иконки созданы в public/')
