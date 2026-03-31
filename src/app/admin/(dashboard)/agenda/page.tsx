import Link from 'next/link'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'
import { deleteAgendaItem, toggleAgendaPublished } from '@/actions/agenda'

async function getEvents() {
  return db.query.agendaItems.findMany({
    orderBy: [desc(agendaItems.date)],
  })
}

export default async function AdminAgendaPage() {
  const events = await getEvents()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Agenda</h1>
          <p className="text-gray-500 text-sm mt-1">{events.length} evenement{events.length !== 1 ? 'en' : ''}</p>
        </div>
        <Link href="/admin/agenda/nieuw" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm transition-colors">
          + Nieuw evenement
        </Link>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Titel</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Datum</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Tijd</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400 text-sm">
                  Nog geen evenementen. Voeg uw eerste evenement toe.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  {event.location && (
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{event.location}</p>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">
                  {formatDate(event.date)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                  {event.timeStart ?? '—'}{event.timeEnd ? ` – ${event.timeEnd}` : ''}
                </td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleAgendaPublished.bind(null, event.id, !event.published)}>
                    <button
                      type="submit"
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        event.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {event.published ? 'Gepubliceerd' : 'Concept'}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/agenda/${event.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                      Bewerken
                    </Link>
                    <form action={deleteAgendaItem.bind(null, event.id)}>
                      <button
                        type="submit"
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          if (!confirm('Evenement verwijderen?')) e.preventDefault()
                        }}
                      >
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
