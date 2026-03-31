'use server'

import { db } from '@/db'
import { articles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { slugify } from '@/lib/utils'

export async function createArticle(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string | null
  const category = formData.get('category') as string | null
  const imageUrl = formData.get('imageUrl') as string | null
  const published = formData.get('published') === 'true'

  if (!title || !content) throw new Error('Titel en inhoud zijn verplicht')

  const slug = slugify(title)

  await db.insert(articles).values({
    title,
    slug,
    content,
    excerpt: excerpt || null,
    category: category || 'nieuws',
    imageUrl: imageUrl || null,
    published,
    publishedAt: published ? new Date() : null,
    authorId: parseInt(session.user.id),
  })

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function updateArticle(id: number, formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string | null
  const category = formData.get('category') as string | null
  const imageUrl = formData.get('imageUrl') as string | null
  const published = formData.get('published') === 'true'

  await db
    .update(articles)
    .set({
      title,
      content,
      excerpt: excerpt || null,
      category: category || 'nieuws',
      imageUrl: imageUrl || null,
      published,
      publishedAt: published ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function deleteArticle(id: number) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  await db.delete(articles).where(eq(articles.id, id))

  revalidatePath('/nieuws')
  revalidatePath('/admin/artikelen')
}

export async function togglePublished(id: number, published: boolean) {
  const session = await auth()
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
