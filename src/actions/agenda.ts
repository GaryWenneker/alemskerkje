'use server'

import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'

export async function createAgendaItem(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const date = formData.get('date') as string
  const timeStart = formData.get('timeStart') as string | null
  const timeEnd = formData.get('timeEnd') as string | null
  const location = formData.get('location') as string | null
  const imageUrl = formData.get('imageUrl') as string | null
  const published = formData.get('published') === 'true'

  if (!title || !date) throw new Error('Titel en datum zijn verplicht')

  await db.insert(agendaItems).values({
    title,
    description: description || null,
    date: new Date(date),
    timeStart: timeStart || null,
    timeEnd: timeEnd || null,
    location: location || 'Het Alems Kerkje, Sint Odradastraat 12, Alem',
    imageUrl: imageUrl || null,
    published,
    authorId: parseInt(session.user.id),
  })

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function updateAgendaItem(id: number, formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const date = formData.get('date') as string
  const timeStart = formData.get('timeStart') as string | null
  const timeEnd = formData.get('timeEnd') as string | null
  const location = formData.get('location') as string | null
  const imageUrl = formData.get('imageUrl') as string | null
  const published = formData.get('published') === 'true'

  await db
    .update(agendaItems)
    .set({
      title,
      description: description || null,
      date: new Date(date),
      timeStart: timeStart || null,
      timeEnd: timeEnd || null,
      location: location || null,
      imageUrl: imageUrl || null,
      published,
      updatedAt: new Date(),
    })
    .where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function deleteAgendaItem(id: number) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  await db.delete(agendaItems).where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}

export async function toggleAgendaPublished(id: number, published: boolean) {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')

  await db
    .update(agendaItems)
    .set({ published, updatedAt: new Date() })
    .where(eq(agendaItems.id, id))

  revalidatePath('/agenda')
  revalidatePath('/')
  revalidatePath('/admin/agenda')
}
