/**
 * Seed script: upload statische kerkfoto's naar Netlify Blob Storage.
 *
 * Gebruik:
 *   NETLIFY_SITE_ID=<id> NETLIFY_AUTH_TOKEN=<token> \
 *   node --env-file=.env.local --import tsx src/scripts/seed-blob-images.ts
 *
 * Of via netlify dev (automatische auth):
 *   netlify dev -- node --import tsx src/scripts/seed-blob-images.ts
 *
 * Na uitvoer worden de blob-URL's geprint. Kopieer ze naar page.tsx.
 */

import { readFile } from 'fs/promises'
import { join } from 'path'
import { uploadImageBuffer } from '@/lib/blob-storage'

const API_PREFIX = '/api/images'

const IMAGES = [
  { file: 'church-hero.jpg', key: 'static/church-hero.jpg', contentType: 'image/jpeg' },
  { file: 'church-exterior.jpg', key: 'static/church-exterior.jpg', contentType: 'image/jpeg' },
  { file: 'church-north.jpg', key: 'static/church-north.jpg', contentType: 'image/jpeg' },
  { file: 'church-southwest.jpg', key: 'static/church-southwest.jpg', contentType: 'image/jpeg' },
  { file: 'church-2010.jpg', key: 'static/church-2010.jpg', contentType: 'image/jpeg' },
]

async function main() {
  const publicDir = join(process.cwd(), 'public', 'images')

  console.log('Uploading images to Netlify Blob Storage...\n')

  for (const img of IMAGES) {
    const filePath = join(publicDir, img.file)
    const buffer = await readFile(filePath)

    await uploadImageBuffer(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer, img.contentType, img.key)

    console.log(`✓ ${img.file}`)
    console.log(`  Key : ${img.key}`)
    console.log(`  URL : ${API_PREFIX}/${img.key}\n`)
  }

  console.log('Klaar! Gebruik deze URLs in page.tsx:')
  for (const img of IMAGES) {
    console.log(`  '${API_PREFIX}/${img.key}'`)
  }
}

main().catch((err) => {
  console.error('Fout:', err)
  process.exit(1)
})
