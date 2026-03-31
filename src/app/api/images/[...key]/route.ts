import { type NextRequest, NextResponse } from 'next/server'
import { getImageBlob } from '@/lib/blob-storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ key: string[] }> }
) {
  const { key: keyParts } = await context.params
  const key = keyParts.join('/')

  const blob = await getImageBlob(key)

  if (!blob) {
    return new NextResponse('Afbeelding niet gevonden', { status: 404 })
  }

  return new NextResponse(blob.data, {
    headers: {
      'Content-Type': blob.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
