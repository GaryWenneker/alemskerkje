'use server'

import { db } from '@/db'
import { articles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/session'
import { slugify } from '@/lib/utils'
import { uploadImage, deleteImage } from '@/lib/blob-storage'

async function resolveImageUrl(
  formData: FormData,
  existingUrl: string | null | undefined
): Promise<string | null> {
  const file = formData.get('image') as File | null
  const deleted = formData.get('imageDeleted') === 'true'

  if (file && file.size > 0) {
    if (existingUrl) await deleteImage(existingUrl)
    return uploadImage(file, file.type || 'image/jpeg', 'artikelen')
  }

  if (deleted) {
    if (existingUrl) await deleteImage(existingUrl)
    return null
  }

  return existingUrl ?? null
}

export async function createArticle(formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string | null
  const category = formData.get('category') as string | null
  const published = formData.get('published') === 'true'

  if (!title || !content) throw new Error('Titel en inhoud zijn verplicht')

  const slug = slugify(title)
  const imageUrl = await resolveImageUrl(formData, null)

  await db.insert(articles).values({
    title,
    slug,
    content,
    excerpt: excerpt || null,
    category: category || 'nieuws',
    imageUrl,
    published,
    publishedAt: published ? new Date() : null,
    authorId: parseInt(session.id),
  })

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function updateArticle(id: number, formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string | null
  const category = formData.get('category') as string | null
  const published = formData.get('published') === 'true'

  const [existing] = await db
    .select({ imageUrl: articles.imageUrl })
    .from(articles)
    .where(eq(articles.id, id))

  const imageUrl = await resolveImageUrl(formData, existing?.imageUrl)

  await db
    .update(articles)
    .set({
      title,
      content,
      excerpt: excerpt || null,
      category: category || 'nieuws',
      imageUrl,
      published,
      publishedAt: published ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function deleteArticle(id: number) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const [existing] = await db
    .select({ imageUrl: articles.imageUrl })
    .from(articles)
    .where(eq(articles.id, id))

  if (existing?.imageUrl) await deleteImage(existing.imageUrl)

  await db.delete(articles).where(eq(articles.id, id))

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function togglePublished(id: number, published: boolean) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  await db
    .update(articles)
    .set({
      published,
      publishedAt: published ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}
