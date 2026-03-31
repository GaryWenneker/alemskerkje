'use server'

import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getSession } from '@/lib/session'
import { uploadImage, deleteImage } from '@/lib/blob-storage'

async function resolveImageUrl(
  formData: FormData,
  existingUrl: string | null | undefined
): Promise<string | null> {
  const file = formData.get('image') as File | null
  const deleted = formData.get('imageDeleted') === 'true'

  // Bestand geüpload: sla op in Blob Storage
  if (file && file.size > 0) {
    if (existingUrl) await deleteImage(existingUrl)
    return uploadImage(file, file.type || 'image/jpeg', 'agenda')
  }

  // Afbeelding expliciet verwijderd
  if (deleted) {
    if (existingUrl) await deleteImage(existingUrl)
    return null
  }

  // Geen wijziging: behoud bestaande URL
  return existingUrl ?? null
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export async function createAgendaItem(formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const content = formData.get('content') as string | null
  const date = formData.get('date') as string
  const timeStart = formData.get('timeStart') as string | null
  const timeEnd = formData.get('timeEnd') as string | null
  const location = formData.get('location') as string | null
  const videoUrl = formData.get('videoUrl') as string | null
  const videoType = formData.get('videoType') as string | null
  const ticketUrl = formData.get('ticketUrl') as string | null
  const published = formData.get('published') === 'true'
  const featured = formData.get('featured') === 'true'
  const slugInput = (formData.get('slug') as string | null)?.trim()

  if (!title || !date) throw new Error('Titel en datum zijn verplicht')

  const imageUrl = await resolveImageUrl(formData, null)
  const slug = slugInput || toSlug(title)

  await db.insert(agendaItems).values({
    slug,
    title,
    description: description || null,
    content: content || null,
    date: new Date(date),
    timeStart: timeStart || null,
    timeEnd: timeEnd || null,
    location: location || 'Het Alems Kerkje, Sint Odradastraat 12, Alem',
    imageUrl,
    videoUrl: videoUrl || null,
    videoType: videoType || null,
    ticketUrl: ticketUrl || null,
    published,
    featured,
    authorId: parseInt(session.id),
  })

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function updateAgendaItem(id: number, formData: FormData) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const content = formData.get('content') as string | null
  const date = formData.get('date') as string
  const timeStart = formData.get('timeStart') as string | null
  const timeEnd = formData.get('timeEnd') as string | null
  const location = formData.get('location') as string | null
  const videoUrl = formData.get('videoUrl') as string | null
  const videoType = formData.get('videoType') as string | null
  const ticketUrl = formData.get('ticketUrl') as string | null
  const published = formData.get('published') === 'true'
  const featured = formData.get('featured') === 'true'
  const slugInput = (formData.get('slug') as string | null)?.trim()

  const [existing] = await db
    .select({ imageUrl: agendaItems.imageUrl })
    .from(agendaItems)
    .where(eq(agendaItems.id, id))

  const imageUrl = await resolveImageUrl(formData, existing?.imageUrl)

  await db
    .update(agendaItems)
    .set({
      slug: slugInput || undefined,
      title,
      description: description || null,
      content: content || null,
      date: new Date(date),
      timeStart: timeStart || null,
      timeEnd: timeEnd || null,
      location: location || null,
      imageUrl,
      videoUrl: videoUrl || null,
      videoType: videoType || null,
      ticketUrl: ticketUrl || null,
      published,
      featured,
      updatedAt: new Date(),
    })
    .where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function deleteAgendaItem(id: number) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  const [existing] = await db
    .select({ imageUrl: agendaItems.imageUrl })
    .from(agendaItems)
    .where(eq(agendaItems.id, id))

  if (existing?.imageUrl) await deleteImage(existing.imageUrl)

  await db.delete(agendaItems).where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function toggleAgendaPublished(id: number, published: boolean) {
  const session = await getSession()
  if (!session) throw new Error('Niet ingelogd')

  await db
    .update(agendaItems)
    .set({ published, updatedAt: new Date() })
    .where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}
