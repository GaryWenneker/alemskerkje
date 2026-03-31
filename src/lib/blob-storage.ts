import { getStore } from '@netlify/blobs'

const STORE_NAME = 'images'
const API_PREFIX = '/api/images'

export function getBlobStore() {
  const siteID = process.env.NETLIFY_SITE_ID
  const token = process.env.NETLIFY_AUTH_TOKEN

  if (siteID && token) {
    return getStore({ name: STORE_NAME, siteID, token })
  }

  // In Netlify-omgeving: auto-detectie via ingebouwde env vars
  return getStore(STORE_NAME)
}

/**
 * Sla een afbeelding op in Netlify Blob Storage.
 * Geeft de publieke URL terug (/api/images/[key]).
 */
export async function uploadImage(
  file: File,
  contentType: string,
  keyPrefix = 'uploads'
): Promise<string> {
  const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg'
  const key = `${keyPrefix}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`

  const store = getBlobStore()
  await store.set(key, file, { metadata: { contentType } })

  return `${API_PREFIX}/${key}`
}

/**
 * Sla een afbeelding op via een ArrayBuffer (bijv. voor server-side seed scripts).
 */
export async function uploadImageBuffer(
  data: ArrayBuffer,
  contentType: string,
  key: string
): Promise<string> {
  const blob = new Blob([data], { type: contentType })
  const store = getBlobStore()
  await store.set(key, blob, { metadata: { contentType } })
  return `${API_PREFIX}/${key}`
}

/**
 * Verwijder een afbeelding uit Blob Storage.
 * Accepteert zowel een volledige URL (/api/images/[key]) als een kale blob-key.
 */
export async function deleteImage(urlOrKey: string): Promise<void> {
  const key = urlOrKey.startsWith(API_PREFIX)
    ? urlOrKey.slice(API_PREFIX.length + 1)
    : urlOrKey

  if (!key) return
  const store = getBlobStore()
  await store.delete(key).catch(() => {
    // stil falen – blob bestond mogelijk al niet meer
  })
}

/**
 * Haal een afbeelding op als ArrayBuffer + Content-Type.
 * Geeft null terug als de blob niet bestaat.
 */
export async function getImageBlob(
  key: string
): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  const store = getBlobStore()
  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' })

  if (!result || !result.data) return null

  return {
    data: result.data as ArrayBuffer,
    contentType: (result.metadata?.contentType as string) ?? 'image/jpeg',
  }
}
