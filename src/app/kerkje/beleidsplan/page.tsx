import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beleidsplan 2025 – Het Alems Kerkje',
  description:
    'Het beleidsplan 2025 van Stichting Het Alems Kerkje: missie, doelstelling, organisatie, activiteiten en financiën.',
}

const hoofdstukken = [
  { nr: '01', titel: 'Missie & Visie' },
  { nr: '02', titel: 'Doelstelling' },
  { nr: '03', titel: 'Organisatie' },
  { nr: '04', titel: 'Strategie' },
  { nr: '05', titel: 'Activiteiten 2025' },
  { nr: '06', titel: 'Financiën' },
  { nr: '07', titel: 'Duurzaamheid' },
]

const bestuur = [
  { functie: 'Voorzitter', naam: 'Jeroen van Heel' },
  { functie: 'Secretaris', naam: 'Peter van Lent' },
  { functie: 'Penningmeester', naam: 'Peter van Boxtel' },
  { functie: 'Bestuurslid', naam: 'Jeanne van Oers-van den Oord' },
]

const algemeenGegevens = [
  { label: 'Naam', value: 'Het Alems Kerkje' },
  { label: 'KvK-nummer', value: '90498410' },
  { label: 'RSIN-nummer', value: '865336854' },
  { label: 'ANBI-status', value: 'Toegekend' },
  { label: 'E-mail', value: 'info@hetalemskerkje.nl' },
  { label: 'Telefoon', value: '06-20603184' },
  { label: 'Adres', value: 'Sint Odradastraat 12, 5335LL Alem' },
  { label: 'Bankrekening', value: 'NL81 RABO 0368 0835 27' },
]

const activiteiten = [
  'Lezingen',
  'Exposities',
  'Workshops',
  'Huwelijksceremonies',
  'Muziekoptredens',
  'Vrijwilligersbijeenkomsten',
]

const duurzaamheid = [
  'Ramen geïsoleerd met voorzetramen',
  'Gaskachel vervangen door koel-warmte-units',
  'Ledverlichting met dimmers',
  'Geen wegwerpplastic — afwasbaar servies',
  'Waterbesparend toilet',
  'Gescheiden afvalverwerking',
  'Duurzame aanschaf apparatuur',
  'Onderzoek dakisolatie gepland voor 2025',
]

const financienBlokken = [
  {
    titel: 'Project',
    tekst:
      'Het project rond de opening van Het Alems Kerkje is inmiddels bijna afgerond. De doelen die in het beleidsplan 2023–2024 waren gesteld zijn grotendeels gehaald.',
  },
  {
    titel: 'Vermogensbeheer',
    tekst:
      'Het bestuur beheert het vermogen, stelt jaarlijks een begroting op en stelt de jaarrekening vast. Het boekjaar is gelijk aan een kalenderjaar.',
  },
  {
    titel: 'Inkomsten verwerven',
    tekst:
      'Via giften, donaties, subsidies, sponsorbijdragen, entreegelden, horeca-opbrengsten en verhuur als huwelijkslocatie. Vaste lasten geraamd op € 9.000 – € 10.000.',
  },
]

export default function BeleidsplanPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-stone-950 pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kerkje-ext-2024.jpg"
            alt="Het Alems Kerkje exterieur 2024"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/70 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">
            Stichting Het Alems Kerkje
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Beleidsplan 2025
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Het beleid van Stichting Het Alems Kerkje voor het jaar 2025 —
            opgesteld door het bestuur.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.hetalemskerkje.nl/wp-content/uploads/2023/12/Beleidsplan-2023-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
            <Link
              href="/kerkje/de-stichting"
              className="inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-400 hover:text-white px-6 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              ← Terug naar De Stichting
            </Link>
          </div>
        </div>
      </section>

      {/* ── Inhoudsopgave ──────────────────────────────────────────── */}
      <section className="bg-stone-900 border-b border-stone-800 py-10 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500">Inhoudsopgave</p>
            <span className="flex-1 h-px bg-stone-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {hoofdstukken.map((h) => (
              <a
                key={h.nr}
                href={`#h${h.nr}`}
                className="group flex flex-col bg-stone-950 border border-stone-800 hover:border-amber-600/60 p-3 transition-colors duration-200"
              >
                <span className="text-amber-500/50 text-xs font-mono mb-1 group-hover:text-amber-400 transition-colors">
                  {h.nr}
                </span>
                <span className="text-stone-500 text-xs leading-snug group-hover:text-white transition-colors">
                  {h.titel}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Voorwoord ──────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-24 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Tekst */}
            <div className="md:col-span-3">
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Inleiding</p>
              <h2 className="font-serif text-3xl text-white mb-8">Voorwoord</h2>
              <div className="space-y-5 text-stone-400 text-sm leading-relaxed">
                <p>
                  Het voormalige hervormde kerkje is een van de weinig overgebleven monumentale
                  panden in Alem. Dat het dorp zo weinig monumenten kent is gelegen in het feit
                  dat Alem tijdens de Tweede Wereldoorlog in de frontlinie lag waardoor 85 procent
                  van de gebouwen is vernietigd.
                </p>
                <p>
                  Het was dan ook een schok voor de Alemse bevolking toen de gemeente Maasdriel
                  aankondigde over te willen gaan tot verkoop van dit prachtige monument om er
                  mogelijk een woning van te maken. Dorpsraad en het verenigingsleven maakten zich
                  sterk voor een sociaal-culturele bestemming van het voormalige hervormde kerkje.
                </p>
                <p>
                  Aangezien het verenigingsleven in het dorp niet de beschikking had over
                  voldoende middelen, waren we blij verrast met het aanbod van het{' '}
                  <strong className="text-stone-300">
                    Sociaal Cultureel Fonds Maasdriel (SCFM)
                  </strong>{' '}
                  om het kerkje aan te kopen en te verhuren aan het Alemse verenigingsleven. Met
                  dit doel is bij notariële akte van 14 juni 2023 de stichting Het Alems Kerkje
                  in het leven geroepen.
                </p>
              </div>
            </div>

            {/* Citaat + foto */}
            <div className="md:col-span-2 space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kerkje-concert-2024.jpg"
                  alt="Concert in Het Alems Kerkje 2024"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
              </div>
              <div className="bg-stone-900 border border-amber-800/30 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-600/50" />
                <p className="font-serif text-stone-300 text-base leading-relaxed mb-5 italic">
                  "Ik ben trots om u als voorzitter het beleidsplan van de stichting over 2025
                  te presenteren."
                </p>
                <div className="border-t border-stone-800 pt-4">
                  <p className="text-white text-sm font-medium">Jeroen van Heel</p>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Voorzitter Stichting Het Alems Kerkje
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── H1 + H2: Missie & Doelstelling ────────────────────────── */}
      <section id="h01" className="bg-stone-900 py-24 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Missie & Visie */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500/50 font-mono text-xs">01</span>
                <span className="flex-1 h-px bg-stone-800" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-6">Missie &amp; Visie</h2>
              <div className="space-y-4 text-stone-400 text-sm leading-relaxed">
                <p>
                  Het bestuur van het SCFM heeft het voormalig kerkgebouw als een centrum voor
                  sociaal-culturele activiteiten ter beschikking gesteld aan de Alemse gemeenschap.
                  Een aantal Alemse stichtingen en verenigingen heeft na overleg met het SCFM de
                  stichting Het Alems Kerkje opgericht om het pand te huren en zodoende de
                  sociaal-culturele uitgangspunten voor de toekomst te waarborgen.
                </p>
                <p>
                  Naast de deelnemende partijen kan eenieder die voldoet aan de sociaal-culturele
                  uitgangspunten van de stichting in overleg gebruik maken van het kerkje. De
                  stichting draagt daarnaast bij aan het in stand houden van het voormalige kerkje
                  als{' '}
                  <strong className="text-stone-300">rijksmonument</strong> in het belang
                  van de Alemse dorpsgemeenschap.
                </p>
              </div>
            </div>

            {/* Doelstelling */}
            <div id="h02">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500/50 font-mono text-xs">02</span>
                <span className="flex-1 h-px bg-stone-800" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-6">Doelstelling</h2>
              <div className="bg-stone-950 border border-stone-800 p-6 mb-5">
                <p className="font-serif text-lg text-white leading-relaxed mb-4">
                  "Het initiëren en organiseren van sociaal-culturele activiteiten in en rond
                  Het Alems Kerkje"
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                  De stichting houdt hierbij rekening met de mogelijkheden die het gebouw biedt
                  en handelt in overeenstemming met het bijzondere karakter en de huidige en
                  oorspronkelijke bestemming.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Alemse verenigingsleven', 'SCFM', 'Gemeente Maasdriel'].map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fotobalk ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 h-56 md:h-72">
        <div className="relative overflow-hidden">
          <Image
            src="/images/church-southwest.jpg"
            alt="Kerkje zuidwest"
            fill
            className="object-cover object-center brightness-75 hover:brightness-90 transition-all duration-500 scale-105 hover:scale-100"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/images/kerkje-event-2024.jpg"
            alt="Evenement in het kerkje 2024"
            fill
            className="object-cover object-center brightness-75 hover:brightness-90 transition-all duration-500 scale-105 hover:scale-100"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/images/church-north.jpg"
            alt="Kerkje noordzijde"
            fill
            className="object-cover object-center brightness-75 hover:brightness-90 transition-all duration-500 scale-105 hover:scale-100"
          />
        </div>
      </div>

      {/* ── H3: Organisatie ────────────────────────────────────────── */}
      <section id="h03" className="bg-stone-950 py-24 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-amber-500/50 font-mono text-xs">03</span>
            <span className="flex-1 h-px bg-stone-800" />
          </div>
          <h2 className="font-serif text-3xl text-white mb-12">Organisatie</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Algemene gegevens */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-5">
                Algemene gegevens
              </p>
              <div className="grid grid-cols-1 gap-px bg-stone-800">
                {algemeenGegevens.map((item) => (
                  <div
                    key={item.label}
                    className="bg-stone-950 px-5 py-3 flex justify-between items-center gap-4"
                  >
                    <span className="text-stone-500 text-xs">{item.label}</span>
                    <span className="text-stone-300 text-xs text-right font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bestuur */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-5">Het bestuur</p>
              <div className="space-y-3">
                {bestuur.map((lid) => (
                  <div
                    key={lid.naam}
                    className="bg-stone-900 border border-stone-800 px-5 py-4 hover:border-amber-800/40 transition-colors"
                  >
                    <p className="text-xs tracking-widest uppercase text-amber-500/70 mb-0.5">
                      {lid.functie}
                    </p>
                    <p className="text-white text-sm font-medium">{lid.naam}</p>
                  </div>
                ))}
              </div>
              <p className="text-stone-600 text-xs mt-4 leading-relaxed">
                Het bestuur is onbezoldigd. Het Alems Kerkje beschikt over 50 vrijwilligers.
              </p>

              {/* ANBI badge */}
              <div className="mt-6 flex items-start gap-4 bg-stone-900 border border-amber-800/20 p-5">
                <div className="bg-amber-600/15 border border-amber-600/30 px-3 py-1.5 flex-shrink-0">
                  <span className="text-amber-400 text-xs font-medium tracking-widest uppercase">
                    ANBI
                  </span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Stichting Het Alems Kerkje is door de Belastingdienst aangemerkt als{' '}
                  <strong className="text-stone-300">
                    Algemeen Nut Beogende Instelling (ANBI)
                  </strong>
                  . Het bestuur ontvangt geen bezoldiging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── H4 + H5: Strategie & Activiteiten ─────────────────────── */}
      <section className="bg-stone-900 py-24 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Strategie */}
            <div id="h04">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500/50 font-mono text-xs">04</span>
                <span className="flex-1 h-px bg-stone-700" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-6">Strategie</h2>
              <div className="space-y-4 text-stone-400 text-sm leading-relaxed mb-8">
                <p>
                  Het Alems Kerkje is op 19 oktober 2024 officieel geopend als sociaal-cultureel
                  centrum. De voorgaande maanden is met man en macht gewerkt om de binnenzijde van
                  het kerkje gebruiksklaar te krijgen.
                </p>
                <p>
                  Electra, keuken, verwarming en toilet zijn vernieuwd door gespecialiseerde
                  bedrijven. Het SCFM heeft als eigenaar van het pand het onderhoud aan de
                  buitenzijde ter hand genomen, waaronder schilderwerk en bestrating.
                </p>
                <p>
                  Inmiddels zijn er al een groot aantal activiteiten georganiseerd, zoals een
                  lezing, een kerstfair, een muziekoptreden en een boekenbeurs.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kerkje-sept-2023.jpg"
                  alt="Kerkje september 2023"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent" />
                <p className="absolute bottom-3 left-4 text-stone-400 text-xs">September 2023</p>
              </div>
            </div>

            {/* Activiteiten */}
            <div id="h05">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-amber-500/50 font-mono text-xs">05</span>
                <span className="flex-1 h-px bg-stone-700" />
              </div>
              <h2 className="font-serif text-2xl text-white mb-6">Activiteiten 2025</h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-6">
                In 2025 richt de stichting zich met name op het optimaliseren van de exploitatie
                van het Alems Kerkje en samenwerking met vrijwilligers.
              </p>
              <ul className="space-y-2 mb-8">
                {activiteiten.map((act) => (
                  <li key={act} className="flex items-center gap-3 text-sm text-stone-300">
                    <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                    {act}
                  </li>
                ))}
              </ul>
              <p className="text-stone-500 text-xs leading-relaxed mb-8">
                Activiteiten zijn gericht op inwoners van Alem en gemeente Maasdriel. Ook externe
                partijen kunnen activiteiten organiseren mits passend bij het sociaal-culturele doel.
              </p>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/kerkje-nov-2024.jpg"
                  alt="Kerkje november 2024"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent" />
                <p className="absolute bottom-3 left-4 text-stone-400 text-xs">November 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── H6: Financiën ──────────────────────────────────────────── */}
      <section id="h06" className="bg-stone-950 py-24 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-amber-500/50 font-mono text-xs">06</span>
            <span className="flex-1 h-px bg-stone-800" />
          </div>
          <h2 className="font-serif text-3xl text-white mb-12">Financiën</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {financienBlokken.map((blok) => (
              <div
                key={blok.titel}
                className="bg-stone-900 border border-stone-800 p-6 hover:border-amber-800/30 transition-colors"
              >
                <p className="text-white font-medium text-sm mb-3">{blok.titel}</p>
                <p className="text-stone-400 text-xs leading-relaxed">{blok.tekst}</p>
              </div>
            ))}
          </div>

          {/* ANBI verklaring */}
          <div className="bg-stone-900 border border-amber-800/20 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-amber-600/15 border border-amber-600/30 px-3 py-1.5 flex-shrink-0">
                <span className="text-amber-400 text-xs font-medium tracking-widest uppercase">
                  ANBI
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                Stichting Het Alems Kerkje is door de Belastingdienst aangemerkt als{' '}
                <strong className="text-stone-300">
                  Algemeen Nut Beogende Instelling (ANBI)
                </strong>
                . Het vermogen wordt te allen tijde aangewend ter verwezenlijking van de
                doelstellingen van de stichting.
              </p>
            </div>
          </div>

          {/* Foto brede balk */}
          <div className="mt-12 relative aspect-[21/6] overflow-hidden">
            <Image
              src="/images/church-exterior.jpg"
              alt="Het Alems Kerkje exterieur"
              fill
              className="object-cover object-center brightness-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10">
              <p className="font-serif text-2xl md:text-3xl text-white max-w-lg leading-snug">
                Een monument dat de gemeenschap verbindt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── H7: Duurzaamheid ───────────────────────────────────────── */}
      <section id="h07" className="bg-stone-900 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-amber-500/50 font-mono text-xs">07</span>
            <span className="flex-1 h-px bg-stone-700" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl text-white mb-4">
                Duurzaamheid &amp; Milieuvriendelijkheid
              </h2>
              <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                Bij de exploitatie van het kerkje als sociaal-cultureel centrum wordt op een
                duurzame en milieuvriendelijke wijze gewerkt.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {duurzaamheid.map((punt) => (
                  <div
                    key={punt}
                    className="flex items-start gap-3 bg-stone-950 border border-stone-800 p-4 hover:border-amber-800/30 transition-colors"
                  >
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">✦</span>
                    <span className="text-stone-300 text-xs leading-relaxed">{punt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Historische foto's */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/geschiedenis/kerkje-historisch.jpg"
                  alt="Historisch kerkje"
                  fill
                  className="object-cover object-center sepia-[0.3] hover:sepia-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                <p className="absolute bottom-3 left-4 text-stone-400 text-xs">
                  Historisch archief
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/geschiedenis/kerkje-archief.jpg"
                    alt="Kerkje archief"
                    fill
                    className="object-cover object-center sepia-[0.3] hover:sepia-0 transition-all duration-500"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/geschiedenis/tekening-1790.jpg"
                    alt="Tekening 1790"
                    fill
                    className="object-cover object-center sepia-[0.3] hover:sepia-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                  <p className="absolute bottom-2 left-2 text-stone-400 text-xs">ca. 1790</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-16 border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-1">Beleidsplan 2025</p>
            <p className="text-stone-400 text-sm">Download het volledige beleidsplan als PDF.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.hetalemskerkje.nl/wp-content/uploads/2023/12/Beleidsplan-2023-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
            <Link
              href="/kerkje/de-stichting"
              className="inline-flex items-center gap-2 border border-stone-700 hover:border-stone-500 text-stone-400 hover:text-white px-6 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              ← De Stichting
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
