export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventVideoHero from '@/components/EventVideoHero'
import Link from 'next/link'
import { db } from '@/db'
import { agendaItems } from '@/db/schema'
import { desc, eq, and, isNotNull } from 'drizzle-orm'
import { formatDateShort } from '@/lib/utils'

async function getFeaturedVideoEvent() {
  try {
    return await db.query.agendaItems.findFirst({
      where: and(
        eq(agendaItems.published, true),
        isNotNull(agendaItems.videoUrl)
      ),
      orderBy: [desc(agendaItems.featured), desc(agendaItems.date)],
    })
  } catch {
    return null
  }
}

async function getUpcomingEvents() {
  try {
    return await db.query.agendaItems.findMany({
      where: (items) =>
        eq(items.published, true),
      orderBy: [desc(agendaItems.date)],
      limit: 3,
    })
  } catch {
    return []
  }
}

const activiteitenItems = [
  {
    // Echte tentoonstellingsfoto: art gallery interieur
    image: '/images/activiteiten/tentoonstelling-2.jpg',
    title: 'Tentoonstellingen',
    description:
      'Kunst, fotografie, erfgoed of natuur. De stenen muren vertellen al drie eeuwen verhalen — laat uw werk het volgende hoofdstuk schrijven.',
    href: '/activiteiten',
    accentColor: 'bg-amber-400',
  },
  {
    // Huwelijksceremonie in een kerk — correct
    image: '/images/activiteiten/huwelijksceremonie.jpg',
    title: 'Huwelijksceremonie',
    description:
      'Trouw op een locatie met ziel. De intieme sfeer van een kerk uit 1719 als decor voor jullie mooiste dag.',
    href: '/activiteiten',
    accentColor: 'bg-rose-400',
  },
  {
    // Concert in het Alems Kerkje — correct
    image: '/images/activiteiten/concerten.jpg',
    title: 'Concerten',
    description:
      'Akoestisch meesterwerkje. Kleinschalige concerten met een uitzonderlijke akoestiek in een historische setting.',
    href: '/activiteiten',
    accentColor: 'bg-purple-400',
  },
  {
    // Echte workshop/yoga foto
    image: '/images/activiteiten/yoga-1.jpg',
    title: 'Cursussen & Workshops',
    description:
      'Yoga, zang, mindfulness of schilderen. Leer, groei en ervaar in een omgeving die rust en inspiratie uitstraalt.',
    href: '/activiteiten',
    accentColor: 'bg-emerald-400',
  },
]

export default async function HomePage() {
  const [events, featuredVideo] = await Promise.all([
    getUpcomingEvents(),
    getFeaturedVideoEvent(),
  ])

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Foto van het Alems Kerkje met Ken Burns zoom-animatie */}
        <div className="absolute inset-0 hero-kenburns">
          <img
            src="/api/images/static/church-hero.jpg"
            alt="Het Alems Kerkje"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Overlay-lagen voor contrast en diepte */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

        {/* Hero tekst */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-text-1 section-label mb-6">
            Alem · Gelderland · Sinds 1719
          </p>

          <h1 className="hero-text-2 font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6">
            Waar geschiedenis
            <span className="block text-amber-300">het decor is</span>
          </h1>

          <p className="hero-text-3 text-stone-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Het Alems Kerkje is een unieke historische locatie voor uw huwelijk,
            concert, tentoonstelling of evenement — op een steenworp van de Maas.
          </p>

          <div className="hero-text-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/activiteiten" className="btn-gold">
              Ontdek de mogelijkheden
            </Link>
            <Link href="/contact" className="btn-ghost">
              Plan een bezoek
            </Link>
          </div>
        </div>

        {/* Scroll-indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* ── UITGELICHT VIDEO-EVENEMENT ── */}
      {featuredVideo?.videoUrl && featuredVideo.videoType && (
        <section className="border-b border-stone-800/50">
          <div className="max-w-7xl mx-auto">
          <EventVideoHero
            title={featuredVideo.title}
            videoUrl={featuredVideo.videoUrl}
            videoType={featuredVideo.videoType as 'youtube' | 'vimeo' | 'direct'}
            date={new Date(featuredVideo.date)}
            timeStart={featuredVideo.timeStart}
            timeEnd={featuredVideo.timeEnd}
            location={featuredVideo.location}
            ticketUrl={featuredVideo.ticketUrl}
            slug={featuredVideo.slug}
            description={featuredVideo.description}
            content={featuredVideo.content}
          />
          </div>
        </section>
      )}

      {/* ── AGENDA ── */}
      <section className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label">Komende activiteiten</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Agenda</h2>
            </div>
            <Link href="/agenda" className="text-amber-500 hover:text-amber-400 text-xs tracking-widest uppercase transition-colors">
              Alle evenementen →
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <article key={event.id} className="card-dark overflow-hidden group">
                  {event.imageUrl && (
                    <div className="h-48 bg-stone-800 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-amber-500 text-xs tracking-widest uppercase mb-2">
                      {formatDateShort(event.date)}
                      {event.timeStart && ` · ${event.timeStart}`}
                    </p>
                    <h3 className="font-serif text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-stone-400 text-sm line-clamp-2">{event.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-stone-800 rounded">
              <p className="text-stone-500 text-sm tracking-wide">
                De agenda wordt binnenkort gevuld. Kom snel terug.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── ACTIVITEITEN ── */}
      <section className="py-24 px-6" aria-labelledby="activiteiten-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-label">Veel soorten</p>
            <h2 id="activiteiten-heading" className="font-serif text-3xl md:text-4xl text-white mb-4">
              Activiteiten
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed mb-4">
              Het Alems Kerkje wordt op aanvraag verhuurd voor sociaal-culturele activiteiten.
              Bekijk de mogelijkheden die wij op deze prachtige locatie bieden.
            </p>
            <span className="gold-line" aria-hidden="true" />
          </div>

          {/* Grid — 1 kolom mobiel, 2×2 tablet, 4 breed desktop */}
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800/30"
          >
            {activiteitenItems.map((item) => (
              <li key={item.title} className="bg-stone-950">
                <Link
                  href={item.href}
                  aria-label={`Meer informatie over ${item.title}`}
                  className={[
                    'group relative overflow-hidden block',
                    'aspect-[4/3] sm:aspect-[3/4]',
                    // Zichtbaar focusring voor toetsenbordgebruikers
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-amber-400 focus-visible:ring-inset',
                  ].join(' ')}
                >
                  {/* ── FOTO ── decoratief, alt leeg want Link-label geeft context */}
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className={[
                      'absolute inset-0 w-full h-full object-cover',
                      'brightness-[0.65] group-hover:brightness-[0.80]',
                      // Schaal-animatie alleen als gebruiker geen bezwaar heeft
                      'motion-safe:transition-[transform,filter] motion-safe:duration-700 motion-safe:ease-out',
                      'motion-safe:group-hover:scale-110',
                    ].join(' ')}
                  />

                  {/* ── GRADIENT OVERLAY ── */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent
                                  motion-safe:transition-opacity motion-safe:duration-500" />

                  {/* ── KLEUR-ACCENT lijn bovenaan die schuift bij hover ── */}
                  <div
                    aria-hidden="true"
                    className={[
                      'absolute top-0 left-0 right-0 h-[3px]',
                      item.accentColor,
                      'origin-left scale-x-0 group-hover:scale-x-100',
                      'motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out',
                      // Geen animatie bij reduced-motion: direct tonen
                      'motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100',
                    ].join(' ')}
                  />

                  {/* ── CONTENT ── */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                    <div
                      className={[
                        'motion-safe:translate-y-3 motion-safe:group-hover:translate-y-0',
                        'motion-safe:transition-transform motion-safe:duration-500',
                      ].join(' ')}
                    >
                      <h3 className="font-serif text-xl sm:text-2xl text-white mb-2
                                     [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
                        {item.title}
                      </h3>

                      {/* Beschrijving — verborgen op mobiel tenzij gefocust/gehoverd */}
                      <p
                        className={[
                          'text-stone-300 text-sm leading-relaxed',
                          // Zichtbaar bij hover/focus (motion-safe: overgang)
                          'motion-safe:opacity-0 motion-safe:group-hover:opacity-100',
                          'motion-safe:transition-opacity motion-safe:duration-300 motion-safe:delay-75',
                          // Altijd zichtbaar als geen motion-voorkeur bestaat
                          'motion-reduce:opacity-100',
                          // Max-hoogte animatie voor soepele onthulling
                          'motion-safe:max-h-0 motion-safe:overflow-hidden',
                          'motion-safe:group-hover:max-h-28',
                          'motion-reduce:max-h-none',
                        ].join(' ')}
                      >
                        {item.description}
                      </p>

                      {/* Pijl — verschijnt bij hover */}
                      <p
                        aria-hidden="true"
                        className={[
                          'mt-3 flex items-center gap-1.5 text-amber-400 text-xs tracking-widest uppercase',
                          'motion-safe:opacity-0 motion-safe:group-hover:opacity-100',
                          'motion-safe:transition-opacity motion-safe:duration-300 motion-safe:delay-100',
                          'motion-reduce:opacity-100',
                        ].join(' ')}
                      >
                        <span>Ontdek meer</span>
                        <span
                          className="motion-safe:group-hover:translate-x-1
                                     motion-safe:transition-transform motion-safe:duration-300"
                        >→</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center mt-12">
            <Link href="/activiteiten" className="btn-ghost">
              Alle activiteiten bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* ── HET VERHAAL ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Tekst */}
          <div>
            <p className="section-label">De geschiedenis</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Drie eeuwen<br />
              <span className="text-amber-300">in het hart van Alem</span>
            </h2>
            <div className="space-y-4 text-stone-400 leading-relaxed text-sm">
              <p>
                Het Alems Kerkje, gebouwd in <strong className="text-stone-200">1719</strong> met materiaal
                van een eerdere katholieke kerk, is een bakstenen zaalkerk met houten dakruiter en uurwerk.
              </p>
              <p>
                Ondanks oorlogsschade in de Tweede Wereldoorlog onderging het in{' '}
                <strong className="text-stone-200">1962</strong> een grondige restauratie.
                Nu fungeert het als sociaal-cultureel centrum voor de gemeenschap.
              </p>
              <p>
                Stichting Het Alems Kerkje organiseert sociaal-culturele activiteiten met
                steun van het Sociaal Cultureel Fonds Maasdriel en de Gemeente Maasdriel.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/nieuws" className="btn-ghost">
                Lees meer over het kerkje
              </Link>
            </div>
          </div>

          {/* Foto van het echte kerkje */}
          <div className="relative">
            <div className="aspect-[4/5] bg-stone-800 overflow-hidden">
              <img
                src="/images/kerkje-sept-2023.jpg"
                alt="Het Alems Kerkje, exterieur september 2023"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Decoratief goud-kader */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-amber-600/30" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-amber-600/20" />
            {/* Foto-attribuut */}
            <p className="absolute bottom-2 left-2 text-[10px] text-stone-500/70">
              © Het Alems Kerkje
            </p>
          </div>
        </div>
      </section>

      {/* ── KENMERKEN ── */}
      <section className="py-16 border-y border-stone-800/50 bg-stone-900/40">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { value: '1719', label: 'Jaar van bouw' },
            { value: '~150 m²', label: 'Vloeroppervlakte' },
            { value: 'Alem', label: 'Gemeente Maasdriel' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-serif text-amber-400 mb-1">{stat.value}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOTO GALERIJ ── */}
      <section className="py-24 px-6 bg-stone-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label">Het kerkje in beeld</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Ontdek de locatie</h2>
            <span className="gold-line" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { src: '/images/kerkje-ext-2024.jpg',     alt: 'Het Alems Kerkje exterieur 2024',   caption: 'Exterieur 2024' },
              { src: '/images/kerkje-concert-2024.jpg', alt: 'Concert in Het Alems Kerkje',       caption: 'Concert' },
              { src: '/images/kerkje-sept-2023.jpg',    alt: 'Het Alems Kerkje september 2023',   caption: 'Najaar 2023' },
              { src: '/images/kerkje-event-2024.jpg',   alt: 'Presentatie in Het Alems Kerkje',   caption: 'Evenement' },
            ].map((foto) => (
              <div key={foto.src} className="group relative overflow-hidden aspect-square bg-stone-800">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <p className="w-full text-center text-white text-xs tracking-widest uppercase pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {foto.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-900/20 via-stone-900/40 to-amber-900/20 border-y border-amber-800/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">Uw evenement</p>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
            Maak van uw moment<br />iets onvergetelijks
          </h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            Bent u op zoek naar een unieke, historische locatie voor uw bijzondere dag?
            Neem contact op en we bespreken de mogelijkheden.
          </p>
          <Link href="/contact" className="btn-gold">
            Neem contact op
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
