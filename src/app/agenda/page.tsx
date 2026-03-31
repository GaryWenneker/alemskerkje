import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq, gte, asc } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenda',
  description: 'Bekijk alle komende activiteiten en evenementen in Het Alems Kerkje.',
}

async function getEvents() {
  try {
    return await db.query.agendaItems.findMany({
      where: eq(agendaItems.published, true),
      orderBy: [asc(agendaItems.date)],
    })
  } catch {
    return []
  }
}

export default async function AgendaPage() {
  const events = await getEvents()

  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="pt-32 pb-16 px-6 border-b border-stone-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Activiteiten</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">Agenda</h1>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center py-24 border border-stone-800">
              <p className="text-stone-500 mb-2">Geen activiteiten gepland</p>
              <p className="text-stone-600 text-sm">Kom binnenkort terug voor nieuwe evenementen.</p>
            </div>
          ) : (
            <div className="space-y-px">
              {events.map((event, i) => (
                <article
                  key={event.id}
                  className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-8 items-start p-6 md:p-8 border border-stone-800/50 hover:border-amber-600/30 hover:bg-stone-900/30 transition-all duration-200"
                >
                  {/* Datum */}
                  <div className="flex md:flex-col gap-3 md:gap-0">
                    <p className="text-3xl font-serif text-amber-400 leading-none">
                      {new Date(event.date).getDate()}
                    </p>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-stone-400">
                        {new Intl.DateTimeFormat('nl-NL', { month: 'long' }).format(new Date(event.date))}
                      </p>
                      <p className="text-xs text-stone-600">
                        {new Date(event.date).getFullYear()}
                      </p>
                    </div>
                  </div>

                  {/* Inhoud */}
                  <div>
                    <h2 className="font-serif text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {event.title}
                    </h2>
                    {event.description && (
                      <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    {event.location && (
                      <p className="text-stone-600 text-xs mt-2 tracking-wide">{event.location}</p>
                    )}
                  </div>

                  {/* Tijd */}
                  {event.timeStart && (
                    <div className="text-right">
                      <p className="text-amber-500 text-sm font-light">{event.timeStart}</p>
                      {event.timeEnd && (
                        <p className="text-stone-600 text-xs">{event.timeEnd}</p>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
