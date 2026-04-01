export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import AgendaEditForm from './AgendaEditForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AgendaEditPage({ params }: Props) {
  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) notFound()

  const [event] = await db
    .select()
    .from(agendaItems)
    .where(eq(agendaItems.id, numId))

  if (!event) notFound()

  const dateString = event.date.toISOString().split('T')[0]

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Evenement bewerken</h1>
        <p className="text-gray-500 text-sm mt-1">{event.title}</p>
      </div>
      <AgendaEditForm event={{ ...event, dateString }} />
    </div>
  )
}
