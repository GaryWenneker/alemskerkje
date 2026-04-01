export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import FeaturedEventCard from '@/components/FeaturedEventCard'
import EventCard from '@/components/EventCard'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenda — Het Alems Kerkje',
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

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?#&\s]+)/,
    /youtube\.com\/watch\?v=([^?#&\s]+)/,
    /youtube\.com\/embed\/([^?#&\s]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

// Alleen expliciete imageUrl gebruiken als kaartfoto.
// YouTube-thumbnails zijn onbetrouwbaar (de uploader bepaalt ze) en passen
// zelden bij het thema van het evenement; we gebruiken daarvoor de
// intelligente fallback + een video-badge op de kaart.
function getEventImage(event: {
  imageUrl?: string | null
}): string | null {
  return event.imageUrl ?? null
}

const CATEGORY_LABELS: Record<string, string> = {
  concert: 'Concert',
  yoga: 'Yoga',
  vergadering: 'Vergadering',
  tentoonstelling: 'Tentoonstelling',
  lezing: 'Lezing',
  workshop: 'Workshop',
  cursus: 'Cursus',
  huwelijk: 'Huwelijksceremonie',
  film: 'Filmavond',
  theater: 'Theater',
}

// Bevestigde foto-URL's van hetalemskerkje.nl (WordPress uploads, 200 OK getest)
const WP = 'https://www.hetalemskerkje.nl/wp-content/uploads'

// Foto-pools per categorie — lokale kerkje/Alem-foto's + echte site-foto's van hetalemskerkje.nl.
// NOOIT: lezing-1.jpg, lezing-2.jpg, kerkje-event-2024.jpg (tonen personen bij microfoon).
// Interieur-foto's (interieur-1 = zolder, interieur-2) → alleen yoga/workshop/tentoonstelling.
// Vergadering/lezing → kerkje exterieur of sfeervolle neutrale foto's (geen sprekers).
const CATEGORY_PHOTOS: Record<string, string[]> = {
  // Concerten, muziek, optreden — authentieke kerkjefoto's
  concert: [
    '/images/kerkje-concert-2024.jpg',
    '/images/activiteiten/concert-2.jpg',
    '/images/activiteiten/concert-3.jpg',
    '/images/activiteiten/concerten.jpg',
    '/images/nieuw/band.jpg',
  ],
  // Yoga, meditatie — de "zolder" met houten balken is ideaal
  yoga: [
    '/images/nieuw/interieur-1.jpg',
    '/images/activiteiten/yoga-1.jpg',
    '/images/activiteiten/yoga-2.jpg',
    '/images/nieuw/interieur-2.jpg',
  ],
  // Mannencirkel — buiten het kerkje, exterieur
  mannencirkel: [
    '/images/kerkje-sept-2023.jpg',
    '/images/nieuw/kerkje-2023-sept-2.jpg',
    '/images/church-exterior.jpg',
    '/images/nieuw/kerkje-2024-okt-2.jpg',
  ],
  // Cursussen, lessen — kerkje-interieur
  cursus: [
    '/images/activiteiten/cursussen.jpg',
    '/images/nieuw/interieur-2.jpg',
    '/images/nieuw/interieur-1.jpg',
    '/images/activiteiten/workshop-1.jpg',
    '/images/activiteiten/workshop-2.jpg',
  ],
  // Workshops — site-foto (PHOTO-2024-11) + lokale foto's
  workshop: [
    `${WP}/2024/11/PHOTO-2024-11-17-15-03-36.jpg`,
    '/images/activiteiten/workshop-1.jpg',
    '/images/activiteiten/workshop-2.jpg',
    '/images/nieuw/interieur-2.jpg',
    '/images/nieuw/interieur-1.jpg',
  ],
  // Huwelijken — site-foto (ankhesenamun) + lokale foto's
  huwelijk: [
    `${WP}/2024/10/ankhesenamun-KitGM-GDgOI-unsplash.jpg`,
    '/images/activiteiten/huwelijksceremonie.jpg',
    '/images/activiteiten/huwelijk-2.jpg',
    '/images/activiteiten/huwelijk-3.jpg',
    '/images/kerkje-ext-2024.jpg',
  ],
  // Tentoonstellingen — lokale interieur + sfeervolle site-foto
  tentoonstelling: [
    '/images/activiteiten/tentoonstelling-kerk.jpg',
    '/images/activiteiten/tentoonstellingen.jpg',
    '/images/activiteiten/tentoonstelling-2.jpg',
    '/images/activiteiten/tentoonstelling-3.jpg',
    '/images/nieuw/interieur-2.jpg',
  ],
  // Lezingen — boek + kaars sfeer, GEEN sprekers aan microfoon
  lezing: [
    '/images/activiteiten/lezing-boek.jpg',
    '/images/activiteiten/lezing-sfeer.jpg',
    '/images/nieuw/interieur-2.jpg',
    '/images/nieuw/interieur-1.jpg',
  ],
  // Vergaderingen — kerkje exterieur + beurs-foto van site
  vergadering: [
    `${WP}/2024/10/PHOTO-2024-10-19-21-22-26.jpg`,
    '/images/kerkje-ext-2024.jpg',
    '/images/nieuw/kerkje-2023-sept-1.jpg',
    '/images/nieuw/kerkje-2024-okt-1.jpg',
    '/images/kerkje-sept-2023.jpg',
  ],
  // Theater, toneel, performance — site-foto (boeket) + lokale foto's
  theater: [
    `${WP}/2024/10/boeket.jpg`,
    '/images/activiteiten/theater-1.jpg',
    '/images/activiteiten/theater-2.jpg',
    '/images/kerkje-concert-2024.jpg',
    '/images/nieuw/band.jpg',
  ],
  // Film, cinema — site-foto (Presentatie) + nachtsfeer kerkje
  film: [
    `${WP}/2024/10/Presentatie.jpg`,
    '/images/activiteiten/film-1.jpg',
    '/images/activiteiten/film-2.jpg',
    '/images/nieuw/kerkje-2021-nacht.jpg',
    '/images/kerkje-ext-2024.jpg',
  ],
}

// Trefwoorden in evenementtitel → categoriesleutel.
// "mannencirkel" heeft een eigen categorie zodat het buiten-foto's krijgt i.p.v. interieur.
const TITLE_KEYWORDS: Array<{ keywords: string[]; category: string }> = [
  { keywords: ['mannencirkel', 'mannen cirkel', 'männercirkel'], category: 'mannencirkel' },
  { keywords: ['yoga', 'meditatie', 'meditation', 'yin', 'mindful', 'spark-el', 'stilte', 'retraite', 'qi gong', 'tai chi', 'ademhaling'], category: 'yoga' },
  { keywords: ['concert', 'muziek', 'optreden', 'band', 'koor', 'orkest', 'zang', 'piano', 'gitaar', 'klassiek', 'jazz', 'folk', 'singer', 'artiest'], category: 'concert' },
  { keywords: ['cursus', 'les ', 'lessen', 'training', 'opleiding', 'module', 'leer', 'verdiepend'], category: 'cursus' },
  { keywords: ['workshop', 'praktijk', 'hands-on', 'atelier', 'maken', 'creatief'], category: 'workshop' },
  { keywords: ['huwelijk', 'trouw', 'bruiloft', 'ceremonie', 'huwelijks', 'bruid', 'verloofd'], category: 'huwelijk' },
  { keywords: ['tentoonstelling', 'expositie', 'kunst', 'galerie', 'open atelier', 'kunstenaar'], category: 'tentoonstelling' },
  { keywords: ['lezing', 'presentatie', 'talk', 'voordracht', 'spreekbeurt', 'debat'], category: 'lezing' },
  { keywords: ['vergadering', 'jaarvergadering', 'bijeenkomst', 'overleg', 'erfgoed', 'vereniging', 'gemeente', 'besloten'], category: 'vergadering' },
  { keywords: ['theater', 'toneel', 'cabaret', 'comedyshow', 'stand-up', 'podium', 'voorstelling'], category: 'theater' },
  { keywords: ['film', 'bioscoop', 'cinema', 'documentaire', 'vertoning', 'movie'], category: 'film' },
]

// Algemene pool — exterieur kerkje + echte site-foto's als uiterste fallback
const GENERAL_PHOTOS = [
  '/images/kerkje-ext-2024.jpg',
  `${WP}/2024/10/PHOTO-2024-10-19-21-22-26.jpg`,
  '/images/kerkje-sept-2023.jpg',
  `${WP}/2024/11/PHOTO-2024-11-17-15-03-36.jpg`,
  '/images/nieuw/kerkje-2021-nacht.jpg',
  '/images/nieuw/kerkje-2024-okt-1.jpg',
  '/images/kerkje-concert-2024.jpg',
  '/images/nieuw/kerkje-2023-sept-1.jpg',
  '/images/church-exterior.jpg',
]

// Kies een foto op basis van:
// 1. Exacte categorieovereenkomst
// 2. Trefwoorden in de evenementtitel (intelligent fallback)
// 3. Algemene kerkjefoto's als laatste redmiddel
function getFallbackImage(
  category: string | null | undefined,
  seed: number,
  title?: string | null,
): string {
  // 1. Directe categorieovereenkomst
  if (category) {
    const key = category.toLowerCase().trim()
    if (CATEGORY_PHOTOS[key]) {
      const pool = CATEGORY_PHOTOS[key]
      return pool[seed % pool.length]
    }
  }

  // 2. Trefwoordmatch op titel — zodat "Flow yoga" nooit een concertfoto krijgt
  if (title) {
    const lower = title.toLowerCase()
    for (const { keywords, category: cat } of TITLE_KEYWORDS) {
      if (keywords.some((kw) => lower.includes(kw))) {
        const pool = CATEGORY_PHOTOS[cat]
        return pool[seed % pool.length]
      }
    }
  }

  // 3. Algemene kerkjefoto's
  return GENERAL_PHOTOS[seed % GENERAL_PHOTOS.length]
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric' }).format(date)
}
function formatMonth(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', { month: 'short' }).format(date)
}
function formatWeekday(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', { weekday: 'long' }).format(date)
}
function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default async function AgendaPage() {
  const allEvents = await getEvents()
  const now = new Date()

  const upcoming = allEvents.filter((e) => new Date(e.date) >= now)
  const past = allEvents.filter((e) => new Date(e.date) < now).reverse()

  const featured = upcoming.find((e) => e.featured)
  const regular = upcoming.filter((e) => !e.featured || e.id !== featured?.id)

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Concertfoto — levendig en sfeervol */}
        <div className="absolute inset-0">
          <img
            src="/images/kerkje-concert-2024.jpg"
            alt="Concert in Het Alems Kerkje"
            className="w-full h-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/70 to-stone-950" />
          {/* Subtiel amber gloed bovenaan voor warmte */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-amber-900/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal direction="up" delay={200}>
          <p className="section-label mb-4">Activiteiten &amp; Evenementen</p>
          <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 leading-none">
            Agenda
          </h1>
          <p className="text-stone-300 text-lg max-w-xl leading-relaxed mb-8">
            Ontdek wat er speelt in Het Alems Kerkje — concerten, lezingen,
            yoga, tentoonstellingen en meer.
          </p>
          </ScrollReveal>

          {/* Live teller */}
          {upcoming.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30
                               text-amber-400 text-sm px-4 py-2 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {upcoming.length} {upcoming.length === 1 ? 'activiteit' : 'activiteiten'} gepland
              </span>
              {featured && (
                <span className="text-stone-500 text-sm hidden sm:block">
                  Eerstvolgende: <span className="text-stone-300 capitalize">{formatFullDate(new Date(featured.date))}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── GEEN ACTIVITEITEN ── */}
      {upcoming.length === 0 && (
        <section className="py-24 px-6">
          <ScrollReveal direction="up">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-px bg-amber-700/50 mx-auto mb-8" />
            <p className="font-serif text-2xl text-stone-300 mb-3">Nog niets gepland</p>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Er staan momenteel geen activiteiten op de agenda.<br />
              Volg ons of kom binnenkort terug voor nieuwe evenementen.
            </p>
            <Link href="/contact" className="btn-ghost">
              Stel een activiteit voor
            </Link>
          </div>
          </ScrollReveal>
        </section>
      )}

      {/* ── UITGELICHT EVENEMENT ── */}
      {featured && (() => {
        const img = getEventImage(featured) ?? getFallbackImage(featured.category, featured.id, featured.title)
        const d = new Date(featured.date)
        const videoId = featured.videoUrl && featured.videoType === 'youtube'
          ? getYouTubeId(featured.videoUrl)
          : null
        return (
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <p className="section-label mb-6">Uitgelicht evenement</p>
              <FeaturedEventCard
                title={featured.title}
                category={featured.category ?? null}
                categoryLabel={featured.category ? (CATEGORY_LABELS[featured.category] ?? featured.category) : null}
                description={featured.description ?? null}
                content={featured.content ?? null}
                timeStart={featured.timeStart ?? null}
                timeEnd={featured.timeEnd ?? null}
                formattedDate={formatFullDate(d)}
                img={img}
                videoId={videoId}
              />
            </div>
          </section>
        )
      })()}

      {/* ── KOMENDE ACTIVITEITEN ── */}
      {regular.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {featured && (
              <div className="flex items-center gap-4 mb-8">
                <p className="section-label">Alle activiteiten</p>
                <div className="flex-1 h-px bg-stone-800" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {regular.map((event, i) => {
                const img = getEventImage(event) ?? getFallbackImage(event.category, event.id, event.title)
                const d   = new Date(event.date)
                const videoId = event.videoUrl && event.videoType === 'youtube'
                  ? getYouTubeId(event.videoUrl) : null
                return (
                  <ScrollReveal key={event.id} direction="up" delay={(i % 3) * 80}>
                  <EventCard
                    id={event.id}
                    title={event.title}
                    category={event.category ?? null}
                    categoryLabel={event.category ? (CATEGORY_LABELS[event.category] ?? event.category) : null}
                    description={event.description ?? null}
                    content={event.content ?? null}
                    timeStart={event.timeStart ?? null}
                    timeEnd={event.timeEnd ?? null}
                    formattedDate={formatFullDate(d)}
                    day={formatDay(d)}
                    month={formatMonth(d)}
                    weekday={formatWeekday(d)}
                    img={img}
                    videoId={videoId}
                    hasVideo={!!event.videoUrl}
                    variant="card"
                  />
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BLOK ── */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="scale">
          <div className="relative overflow-hidden p-10 md:p-14
                          flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Achtergrond: concertfoto met amber gloed */}
            <div className="absolute inset-0">
              <img src="/images/kerkje-concert-2024.jpg" alt=""
                   className="w-full h-full object-cover brightness-[0.25]" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-950/60 via-stone-950/40 to-stone-950/70" />
            </div>
            {/* Amber grens links */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500" />

            <div className="relative z-10">
              <p className="section-label mb-2">Wilt u uw eigen activiteit organiseren?</p>
              <h2 className="font-serif text-2xl md:text-4xl text-white mb-3">
                Huur Het Alems Kerkje
              </h2>
              <p className="text-stone-300 text-sm max-w-md leading-relaxed">
                Een unieke historische locatie voor concerten, workshops,
                huwelijken en lezingen — voor maximaal 80 gasten.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/activiteiten" className="btn-gold">
                Bekijk activiteiten
              </Link>
              <Link href="/contact" className="btn-ghost">
                Neem contact op
              </Link>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AFGELOPEN ACTIVITEITEN ── */}
      {past.length > 0 && (
        <section className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-stone-800/50 pt-12">
              <ScrollReveal direction="up">
              <div className="flex items-center gap-4 mb-8">
                <div>
                  <p className="section-label mb-1">Terugblik</p>
                  <h2 className="font-serif text-2xl text-white">Afgelopen activiteiten</h2>
                </div>
              </div>
              </ScrollReveal>
              <div className="divide-y divide-stone-800/40">
                {past.slice(0, 8).map((event) => {
                  const d = new Date(event.date)
                  const img = getEventImage(event) ?? getFallbackImage(event.category, event.id, event.title)
                  const videoId = event.videoUrl && event.videoType === 'youtube'
                    ? getYouTubeId(event.videoUrl) : null
                  return (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      category={event.category ?? null}
                      categoryLabel={event.category ? (CATEGORY_LABELS[event.category] ?? event.category) : null}
                      description={event.description ?? null}
                      content={event.content ?? null}
                      timeStart={event.timeStart ?? null}
                      timeEnd={event.timeEnd ?? null}
                      formattedDate={formatFullDate(d)}
                      day={formatDay(d)}
                      month={formatMonth(d)}
                      weekday={formatWeekday(d)}
                      img={img}
                      videoId={videoId}
                      hasVideo={!!event.videoUrl}
                      variant="list"
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
