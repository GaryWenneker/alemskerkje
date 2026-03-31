import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VideoBlock from '@/components/VideoBlock'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

async function getEvent(slug: string) {
  try {
    return await db.query.agendaItems.findFirst({
      where: and(
        eq(agendaItems.slug, slug),
        eq(agendaItems.published, true)
      ),
    })
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: 'Evenement niet gevonden' }

  return {
    title: event.title,
    description: event.description ?? undefined,
  }
}

function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default async function AgendaDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) notFound()

  const hasVideo = event.videoUrl && event.videoType
  const eventDate = new Date(event.date)

  return (
    <>
      <Navbar />

      {/* Video of foto-header */}
      {hasVideo ? (
        <div className="pt-16">
          <VideoBlock
            videoUrl={event.videoUrl!}
            videoType={event.videoType as 'youtube' | 'vimeo' | 'direct'}
            title={event.title}
          />
        </div>
      ) : (
        <section className="pt-32 pb-16 px-6 border-b border-stone-800/50">
          <div className="max-w-4xl mx-auto">
            {event.imageUrl && (
              <div className="relative w-full aspect-video mb-10 overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <p className="section-label">Evenement</p>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </section>
      )}

      {/* Evenement-details */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Meta-info balk */}
          <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-stone-800/50">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Datum</p>
              <p className="text-stone-200 capitalize">{formatEventDate(eventDate)}</p>
            </div>

            {(event.timeStart || event.timeEnd) && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Tijd</p>
                <p className="text-amber-400">
                  {event.timeStart}
                  {event.timeEnd && <span className="text-stone-500"> – {event.timeEnd}</span>}
                </p>
              </div>
            )}

            {event.location && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Locatie</p>
                <p className="text-stone-200">{event.location}</p>
              </div>
            )}

            {event.category && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Type</p>
                <p className="text-stone-200 capitalize">{event.category}</p>
              </div>
            )}
          </div>

          {/* Beschrijving */}
          {event.description && (
            <p className="text-stone-300 text-lg leading-relaxed mb-8">
              {event.description}
            </p>
          )}

          {/* Volledige content */}
          {event.content && (
            <div
              className="prose prose-invert prose-stone prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-white
                prose-p:text-stone-300 prose-p:leading-relaxed
                prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-em:text-stone-200"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          )}

          {/* Kaartje kopen */}
          {event.ticketUrl && (
            <div className="mt-12 pt-10 border-t border-stone-800/50">
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-block"
              >
                Kaarten bestellen
              </a>
            </div>
          )}

          {/* Terug */}
          <div className="mt-16 pt-8 border-t border-stone-800/50">
            <Link
              href="/agenda"
              className="text-stone-500 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                  clipRule="evenodd"
                />
              </svg>
              Terug naar agenda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
