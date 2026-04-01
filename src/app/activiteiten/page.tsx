import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activiteiten – Het Alems Kerkje',
  description:
    'Het Alems Kerkje verhuren voor uw activiteit? Huwelijk, concert, tentoonstelling, workshop, lezing of vergadering — ontdek alle mogelijkheden.',
}

// ─── Confirmed WP URLs from hetalemskerkje.nl ──────────────────────────────
const WP = 'https://www.hetalemskerkje.nl/wp-content/uploads'

const activiteiten = [
  {
    title: 'Huwelijksceremonie',
    tag: 'Officiële trouwlocatie',
    photo: '/images/activiteiten/huwelijksceremonie.jpg',
    photoAlt: 'Romantische sfeer voor een huwelijksceremonie in Het Alems Kerkje',
    description:
      'Het Alems Kerkje is één van de officiële trouwlocaties binnen de gemeente Maasdriel. De historische omgeving biedt een onvergetelijke setting voor uw huwelijksceremonie. Wij denken graag mee over de inrichting en het verloop van de dag.',
    features: ['Officiële trouwlocatie gem. Maasdriel', 'Max. ~80 gasten', '€ 300,– vast tarief'],
  },
  {
    title: 'Akoestische Concerten',
    tag: 'Muziek',
    photo: '/images/kerkje-concert-2024.jpg',
    photoAlt: 'Akoestisch concert in Het Alems Kerkje',
    description:
      'De bijzondere akoestiek van de zaalkerk met stenen muren tilt elk optreden naar een hoger niveau. Klassiek, zang, folk of jazz — elk genre komt hier tot zijn recht in een intieme sfeer.',
    features: ['Uitstekende natuurlijke akoestiek', 'Geluidsinstallatie aanwezig', 'Sfeervolle verlichting'],
  },
  {
    title: 'Tentoonstellingen',
    tag: 'Kunst & Erfgoed',
    photo: '/images/activiteiten/tentoonstellingen.jpg',
    photoAlt: 'Tentoonstelling in het historische interieur van het kerkje',
    description:
      'Erfgoed, kunst, natuur of fotografie — de historische muren bieden een uniek decor dat uw werk in een ander daglicht stelt. Flexibel in te delen voor wandpresentaties en vrije opstellingen.',
    features: ['Flexibele inrichting', 'Daglicht + kunstlicht', 'Opbouw dag van tevoren mogelijk'],
  },
  {
    title: 'Workshops',
    tag: 'Creatief & Inspirerend',
    photo: `${WP}/2024/11/PHOTO-2024-11-17-15-03-36.jpg`,
    photoAlt: 'Workshop in Het Alems Kerkje — parfum maken, sieraden, bloemschikken',
    description:
      'Organiseer hier uw workshop parfum maken, sieraden maken, bloemschikken, bonbons maken of bierproeven. De unieke sfeer van het kerkje maakt elke workshop bijzonder.',
    features: ['Rustige, inspirerende omgeving', 'Keuken beschikbaar', 'Dagdelen & avonden'],
  },
  {
    title: 'Kleinschalige Beurzen',
    tag: 'Beurzen & Markten',
    photo: `${WP}/2024/10/PHOTO-2024-10-19-21-22-26.jpg`,
    photoAlt: 'Kleinschalige beurs in Het Alems Kerkje',
    description:
      'Voor boekenmarkten, platenmarkten, sieradenbeurzen of andere kleinschalige beurzen is Het Alems Kerkje een sfeervolle en goed bereikbare locatie met ruime parkeermogelijkheden.',
    features: ['Ruim en flexibel in te delen', 'Goede bereikbaarheid', 'Ruime parkeermogelijkheden'],
  },
  {
    title: 'Lezingen',
    tag: 'Kennis & Verhalen',
    photo: '/images/activiteiten/lezing-sfeer.jpg',
    photoAlt: 'Lezing in de historische sfeer van Het Alems Kerkje',
    description:
      'Vertel uw verhaal in een historische sfeer. Het kerkje biedt de perfecte achtergrond om uw publiek te inspireren en te boeien. Ideaal voor 20 tot 60 toehoorders.',
    features: ['Microfoon & geluidsinstallatie', 'Beamer & projectiescherm', '20–80 bezoekers'],
  },
  {
    title: 'Theater, Cabaret & Dans',
    tag: 'Podiumkunsten',
    photo: '/images/activiteiten/theater-1.jpg',
    photoAlt: 'Theatrale sfeer in Het Alems Kerkje voor voorstellingen en dansoptredens',
    description:
      'Laat het kerkje uw podium zijn. De prachtige ambiance van het gebouw versterkt elke theatervoorstelling, cabaretshow of dansoptreden met een authentieke, intieme atmosfeer.',
    features: ['Intieme zaal voor max. 80', 'Podiumopstelling mogelijk', 'Backstage ruimte beschikbaar'],
  },
  {
    title: 'Filmavonden',
    tag: 'Film & Media',
    photo: '/images/activiteiten/presentatie-site.jpeg',
    photoAlt: 'Filmavond in Het Alems Kerkje met projectieapparatuur',
    description:
      'Het kerkje beschikt over apparatuur waarmee u films kunt vertonen. Een unieke setting voor filmavonden, documentaires of buurtscreenings in een sfeervolle historische omgeving.',
    features: ['Beamer & projectiescherm', 'Geluidsinstallatie', 'Horeca-faciliteiten'],
  },
  {
    title: 'Cursussen',
    tag: 'Leren in stijl',
    photo: '/images/activiteiten/cursussen.jpg',
    photoAlt: 'Cursus schilderen of zang in Het Alems Kerkje',
    description:
      'Verzorg uw cursus schilderen, zang, mindfulness of een andere creatieve discipline in Het Alems Kerkje. De rustige sfeer nodigt uit tot concentratie en inspireert tot creativiteit.',
    features: ['Daglicht + kunstlicht', 'Periodiek gebruik n.o.t.k.', 'Wekelijks of maandelijks'],
  },
  {
    title: 'Yin Yoga – Studio Spark-El',
    tag: 'Vaste activiteit',
    photo: '/images/activiteiten/yoga-1.jpg',
    photoAlt: 'Yin yoga in de serene sfeer van het kerkje',
    description:
      'Elke dinsdag avond (19:30–20:45 u) en woensdag ochtend (09:30–10:45 u) verzorgt Studio Spark-El verdiepende Yin Yoga lessen. Losse les € 15,– · 10-rittenkaart € 135,–.',
    features: ['Di avond 19:30–20:45 u', 'Wo ochtend 09:30–10:45 u', 'Info: studiospark-el.nl'],
  },
  {
    title: 'Vergaderlocatie & Presentaties',
    tag: 'Zakelijk',
    photo: '/images/activiteiten/lezing-1.jpg',
    photoAlt: 'Vergadering in de historische sfeer van Het Alems Kerkje',
    description:
      'De historische sfeer maakt het kerkje uitermate geschikt voor vergaderingen en presentaties. Het beschikt over een beamer, projectiescherm en geluidsinstallatie met microfoons.',
    features: ['Beamer & projectiescherm', 'Microfoons aanwezig', 'Catering in overleg'],
  },
  {
    title: 'Privé & Jubilea',
    tag: 'Op maat',
    photo: '/images/activiteiten/prive-feest.jpg',
    photoAlt: 'Intieme bijeenkomst — jubileum, reünie of teamdag in het kerkje',
    description:
      'Jubileum, familiereünie, teambijeenkomst of kennissessie — de ruimte is veelzijdig en exclusief te huren. Neem contact op voor een oplossing op maat.',
    features: ['Exclusief gebruik', 'Avond & weekend mogelijk', 'Catering in overleg'],
  },
]

const vasteActiviteiten = [
  { org: 'Erfgoedvereniging Alem', wat: 'Vergaderlocatie, lezingen en tentoonstellingen' },
  { org: 'De Dorpsraad', wat: 'Vergaderlocatie' },
  { org: 'Stichting Het Soepenfestival', wat: 'Akoestische concerten, filmavonden en vergaderlocatie' },
  { org: 'Atelier Uit vrije hand', wat: 'Tentoonstellingen en workshops' },
]

const tariefTabel = [
  { activiteit: 'Verhuur persoonlijk gebruik', cat: 'A', start: '€ 20,00', uur: '€ 7,50' },
  { activiteit: 'Verhuur persoonlijk gebruik', cat: 'B', start: '€ 40,00', uur: '€ 12,50' },
  { activiteit: 'Verhuur sociaal-cultureel doel / cursus', cat: 'A', start: '€ 20,00', uur: '€ 7,50' },
  { activiteit: 'Verhuur sociaal-cultureel doel / cursus', cat: 'B', start: '€ 40,00', uur: '€ 12,50' },
  { activiteit: 'Zakelijke verhuur / commercieel doel', cat: 'C', start: '€ 20,00', uur: '€ 20,00' },
  { activiteit: 'Zakelijke verhuur / commercieel doel', cat: 'D', start: '€ 40,00', uur: '€ 40,00' },
  { activiteit: 'Huwelijksceremonie', cat: '**', start: '€ 300,00', uur: 'vast tarief' },
  { activiteit: 'Periodiek gebruik', cat: '***', start: 'n.o.t.k.', uur: 'n.o.t.k.' },
]

const catNoten = [
  { key: 'A', omschrijving: 'Inwoners van Alem' },
  { key: 'B', omschrijving: 'Niet-inwoners van Alem' },
  { key: 'C', omschrijving: 'Zakelijk tarief — inwoners van Alem' },
  { key: 'D', omschrijving: 'Zakelijk tarief — niet-inwoners en bedrijven' },
]

export default function ActiviteitenPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-stone-950 pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kerkje-ext-2024.jpg"
            alt="Het Alems Kerkje exterieur"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/70 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <ScrollReveal direction="up" delay={200}>
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">
            Verhuur &amp; gebruik
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Activiteiten
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed mb-10">
            Het Alems Kerkje wordt op aanvraag verhuurd voor sociaal-culturele
            activiteiten. Capaciteit tot 80 bezoekers, horeca-faciliteiten inbegrepen.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Huwelijk', 'Concerten', 'Tentoonstellingen', 'Workshops', 'Lezingen', 'Theater'].map((tag) => (
              <span
                key={tag}
                className="text-xs tracking-[0.15em] uppercase border border-stone-700 text-stone-400 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Fotobalk ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 h-40 md:h-56">
        {[
          { src: '/images/kerkje-event-2024.jpg', alt: 'Evenement 2024' },
          { src: `${WP}/2024/10/PHOTO-2024-10-19-21-22-26.jpg`, alt: 'Activiteit kerkje' },
          { src: `${WP}/2024/11/PHOTO-2024-11-17-15-03-36.jpg`, alt: 'Workshop kerkje' },
          { src: '/images/kerkje-nov-2024.jpg', alt: 'Kerkje november 2024' },
        ].map((img) => (
          <div key={img.src} className="relative overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover brightness-75 hover:brightness-100 transition-all duration-500 scale-105 hover:scale-100"
            />
          </div>
        ))}
      </div>

      {/* ── Mogelijkheden intro ────────────────────────────────────── */}
      <section className="bg-stone-950 pt-16 sm:pt-20 pb-4 px-5 sm:px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-px bg-stone-800/40">
            <div className="bg-stone-900/60 p-7 md:col-span-2">
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Mogelijkheden</p>
              <h2 className="font-serif text-2xl text-white mb-4 leading-snug">
                De locatie in het kort
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-5">
                Het Alems Kerkje wordt op aanvraag verhuurd. Uitgangspunt is dat het om
                sociaal-culturele activiteiten gaat. De locatie heeft een capaciteit van
                zo&apos;n <strong className="text-stone-300">80 bezoekers</strong> en beschikt
                over <strong className="text-stone-300">horeca-faciliteiten</strong>.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Vergaderlocatie','Presentaties','Workshops','Tentoonstellingen',
                  'Kleinschalige beurzen','Akoestische concerten','Filmavonden',
                  'Lezingen','Cursussen','Theater, cabaret & dans',
                  'Huwelijksceremonie','Vaste activiteiten',
                ].map((tag) => (
                  <span key={tag} className="text-xs bg-stone-800 text-stone-400 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-stone-900/60 p-7 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-500 mb-2">
                  Activiteit voorstellen
                </p>
                <p className="text-stone-400 text-xs leading-relaxed mb-2">
                  Contact opnemen met de programmacommissie:
                </p>
                <a
                  href="mailto:programmacommissie@hetalemskerkje.nl"
                  className="text-stone-300 hover:text-amber-400 text-xs transition-colors break-all"
                >
                  programmacommissie@hetalemskerkje.nl
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-500 mb-2">
                  Overige inlichtingen
                </p>
                <p className="text-stone-400 text-xs leading-relaxed mb-2">
                  Secretaris van Het Alems Kerkje:
                </p>
                <a
                  href="mailto:info@hetalemskerkje.nl"
                  className="text-stone-300 hover:text-amber-400 text-xs transition-colors"
                >
                  info@hetalemskerkje.nl
                </a>
              </div>
              <a
                href="https://www.hetalemskerkje.nl/wp-content/uploads/2023/12/Algemene-voorwaarden-verhuur-Het-Alems-Kerkje.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs transition-colors"
              >
                <span className="text-amber-600">↓</span> Algemene Voorwaarden (PDF)
              </a>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Activiteiten grid ──────────────────────────────────────── */}
      <section className="bg-stone-950 py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-3">Overzicht</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Wat is er mogelijk?</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800/50">
            {activiteiten.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={(i % 3) * 80}>
              <article
                className="group bg-stone-950 flex flex-col overflow-hidden hover:bg-stone-900/60 transition-colors duration-300 h-full"
              >
                {/* Foto */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.photo}
                    alt={item.photoAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs tracking-widest uppercase bg-stone-950/80 text-amber-500 px-2.5 py-1 border border-amber-800/40">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 leading-relaxed mb-5 text-sm flex-1">
                    {item.description}
                  </p>
                  <ul className="space-y-1.5 border-t border-stone-800/60 pt-4">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-stone-500 text-xs">
                        <span className="w-1 h-1 rounded-full bg-amber-600 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vaste activiteiten ─────────────────────────────────────── */}
      <section className="bg-stone-900 py-20 sm:py-24 px-5 sm:px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="right">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">
                Vaste gebruikers
              </p>
              <h2 className="font-serif text-3xl text-white mb-6">Onze vaste activiteiten</h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                Het kerkje is het vaste onderkomen voor een aantal organisaties uit Alem en
                omgeving. Zij maken regelmatig gebruik van de ruimte voor hun activiteiten.
              </p>
              <div className="space-y-3">
                {vasteActiviteiten.map((v) => (
                  <div
                    key={v.org}
                    className="bg-stone-950 border border-stone-800 p-5 hover:border-amber-800/40 transition-colors"
                  >
                    <p className="text-white text-sm font-medium mb-0.5">{v.org}</p>
                    <p className="text-stone-500 text-xs">{v.wat}</p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

            {/* Foto + info */}
            <ScrollReveal direction="left" delay={120}>
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/activiteiten/concert-2.jpg"
                  alt="Concert in het kerkje"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-serif text-lg leading-snug">
                    Gebouwd in 1719, gerestaureerd in 1962
                  </p>
                  <p className="text-stone-400 text-xs mt-1">
                    Rijksmonument · sociaal-cultureel centrum
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Capaciteit', value: '±80 bezoekers' },
                  { label: 'Horeca', value: 'Aanwezig' },
                  { label: 'Parkeren', value: 'Ruim nabij' },
                  { label: 'Vrijwilligers', value: '50 actief' },
                ].map((item) => (
                  <div key={item.label} className="bg-stone-950 border border-stone-800 p-4 text-center">
                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Tarieven ────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-16 sm:py-24 px-5 sm:px-6 border-t border-stone-800">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Verhuur</p>
          <h2 className="font-serif text-3xl text-white mb-4">Tarieven</h2>
          <p className="text-stone-400 text-sm mb-12 max-w-2xl leading-relaxed">
            Starttarief inclusief het eerste uur. Het tarief is afhankelijk van de gebruiker
            (categorie A t/m D) en het doel van de verhuur.
          </p>
          </ScrollReveal>

          {/* ── Tarieftabel ── */}
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-700">
                  <th className="text-left text-xs tracking-widest uppercase text-stone-500 pb-3 font-normal">
                    Activiteit
                  </th>
                  <th className="text-center text-xs tracking-widest uppercase text-stone-500 pb-3 font-normal w-12">
                    Cat.
                  </th>
                  <th className="text-right text-xs tracking-widest uppercase text-stone-500 pb-3 pr-6 font-normal w-32">
                    Starttarief
                  </th>
                  <th className="text-right text-xs tracking-widest uppercase text-stone-500 pb-3 font-normal w-28">
                    Per uur
                  </th>
                </tr>
              </thead>
              <tbody>
                {tariefTabel.map((r, i) => (
                  <tr
                    key={`${r.activiteit}-${r.cat}`}
                    className={`border-b border-stone-800/50 ${i % 2 === 0 ? 'bg-stone-900/30' : ''}`}
                  >
                    <td className="text-stone-300 py-3 pr-4 text-xs">{r.activiteit}</td>
                    <td className="text-center py-3 text-xs">
                      <span className="text-amber-500/80 font-mono font-medium">{r.cat}</span>
                    </td>
                    <td className="text-right text-stone-300 py-3 pr-6 font-mono text-xs">{r.start}</td>
                    <td className="text-right text-stone-300 py-3 font-mono text-xs">{r.uur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Categorienoten ── */}
          <div className="mb-12 flex flex-wrap gap-x-6 gap-y-1.5">
            {catNoten.map((n) => (
              <p key={n.key} className="text-stone-600 text-xs">
                <span className="text-amber-500/70 font-mono font-medium mr-1.5">{n.key}</span>
                {n.omschrijving}
              </p>
            ))}
            <p className="text-stone-600 text-xs">
              <span className="text-amber-500/70 font-mono font-medium mr-1.5">**</span>
              Officiële trouwlocatie gemeente Maasdriel — kosten ambtenaar burgerlijke stand via de gemeente
            </p>
            <p className="text-stone-600 text-xs">
              <span className="text-amber-500/70 font-mono font-medium mr-1.5">***</span>
              Wekelijks of maandelijks gebruik — contact via programmacommissie@hetalemskerkje.nl
            </p>
          </div>

          {/* ── 3 kolommen: kortingen aaneengesloten / niet-aaneengesloten / catering ── */}
          <div className="grid md:grid-cols-3 gap-px bg-stone-800/50 mb-12">

            {/* Aaneengesloten */}
            <div className="bg-stone-900 p-6">
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4">
                Korting aaneengesloten periode
              </p>
              <ul className="space-y-2.5 text-xs">
                {[
                  { days: 'Eenmalig of 2 dagen', korting: 'geen korting' },
                  { days: '3 dagen', korting: '10%' },
                  { days: '4 dagen', korting: '15%' },
                  { days: '5 of meer dagen', korting: '25%' },
                ].map((r) => (
                  <li key={r.days} className="flex justify-between gap-4">
                    <span className="text-stone-400">{r.days}</span>
                    <span className={r.korting === 'geen korting' ? 'text-stone-600' : 'text-stone-200 font-medium'}>
                      {r.korting}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-stone-600 text-xs mt-4">
                o.b.v. totale huurprijs
              </p>
            </div>

            {/* Niet-aaneengesloten */}
            <div className="bg-stone-900 p-6">
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4">
                Korting niet-aaneengesloten (per jaar)
              </p>
              <ul className="space-y-2.5 text-xs">
                {[
                  { times: 'Eenmalig of 2×', korting: 'geen korting' },
                  { times: '3e keer', korting: '10%' },
                  { times: '4e keer', korting: '15%' },
                  { times: '5e keer of meer', korting: '25%' },
                ].map((r) => (
                  <li key={r.times} className="flex justify-between gap-4">
                    <span className="text-stone-400">{r.times}</span>
                    <span className={r.korting === 'geen korting' ? 'text-stone-600' : 'text-stone-200 font-medium'}>
                      {r.korting}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-stone-600 text-xs mt-4">
                o.b.v. huurprijs per dag
              </p>
            </div>

            {/* Catering & overig */}
            <div className="bg-stone-900 p-6">
              <p className="text-xs uppercase tracking-widest text-amber-500 mb-4">
                Catering &amp; overig
              </p>
              <ul className="space-y-2.5 text-xs">
                {[
                  { omschrijving: 'Koffie (10 kopjes / kan)', prijs: '€ 20,00' },
                  { omschrijving: 'Thee (10 kopjes / kan)', prijs: '€ 15,00' },
                  { omschrijving: 'Bardienst vrijwilligers', prijs: '€ 10,00 / uur' },
                ].map((r) => (
                  <li key={r.omschrijving} className="flex justify-between gap-4">
                    <span className="text-stone-400">{r.omschrijving}</span>
                    <span className="text-stone-200 font-mono">{r.prijs}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-stone-800 space-y-3">
                <a
                  href="https://www.hetalemskerkje.nl/wp-content/uploads/2023/12/Algemene-voorwaarden-verhuur-Het-Alems-Kerkje.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs transition-colors"
                >
                  <span className="text-amber-600">↓</span> Algemene Voorwaarden (PDF)
                </a>
                <a
                  href="https://www.hetalemskerkje.nl/wp-content/uploads/2023/12/Beleidsplan-2023-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs transition-colors"
                >
                  <span className="text-amber-600">↓</span> Beleidsplan (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-28 px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/church-exterior.jpg"
            alt="Het Alems Kerkje"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-stone-950/60" />
        </div>
        <ScrollReveal direction="scale">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4">Interesse?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
            Uw activiteit in Het Alems Kerkje
          </h2>
          <p className="text-stone-300 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Heeft u een activiteit in gedachten die past bij de sociaal-culturele missie van het
            kerkje? Neem contact op met de programmacommissie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              Neem contact op
            </Link>
            <a
              href="mailto:programmacommissie@hetalemskerkje.nl"
              className="inline-flex items-center gap-2 border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-colors duration-200 break-all sm:break-normal text-center"
            >
              programmacommissie@hetalemskerkje.nl
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  )
}
