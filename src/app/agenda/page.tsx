import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'
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

function VideoIndicator() {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs text-stone-500 tracking-wide"
      title="Video beschikbaar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-3.5 h-3.5 text-amber-600"
        aria-hidden="true"
      >
        <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
      </svg>
      Video
    </span>
  )
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
              {events.map((event) => {
                const hasDetail = Boolean(event.slug)
                const hasMedia = event.imageUrl || event.videoUrl

                const CardContent = (
                  <>
                    {/* Datum */}
                    <div className="flex md:flex-col gap-3 md:gap-0 shrink-0">
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

                    {/* Thumbnail */}
                    {hasMedia && (
                      <div className="relative w-20 h-14 md:w-24 md:h-16 shrink-0 overflow-hidden bg-stone-900 hidden sm:block">
                        {event.imageUrl ? (
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        ) : event.videoUrl ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-amber-600 opacity-70 group-hover:opacity-100 transition-opacity"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Inhoud */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl text-white mb-1.5 group-hover:text-amber-300 transition-colors leading-snug">
                        {event.title}
                      </h2>
                      {event.description && (
                        <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        {event.location && (
                          <p className="text-stone-600 text-xs tracking-wide truncate">{event.location}</p>
                        )}
                        {event.videoUrl && <VideoIndicator />}
                      </div>
                    </div>

                    {/* Tijd + pijl */}
                    <div className="text-right shrink-0">
                      {event.timeStart && (
                        <>
                          <p className="text-amber-500 text-sm font-light">{event.timeStart}</p>
                          {event.timeEnd && (
                            <p className="text-stone-600 text-xs">{event.timeEnd}</p>
                          )}
                        </>
                      )}
                      {hasDetail && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-stone-600 group-hover:text-amber-500 transition-colors ml-auto mt-2"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </>
                )

                const sharedClass =
                  'group grid grid-cols-1 sm:grid-cols-[100px_auto_1fr_auto] md:grid-cols-[100px_auto_1fr_auto] gap-4 md:gap-6 items-center p-6 md:p-8 border border-stone-800/50 transition-all duration-200'

                return hasDetail ? (
                  <Link
                    key={event.id}
                    href={`/agenda/${event.slug}`}
                    className={`${sharedClass} hover:border-amber-600/30 hover:bg-stone-900/30`}
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <article key={event.id} className={sharedClass}>
                    {CardContent}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
