import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'De Stichting – Het Alems Kerkje',
  description: 'Informatie over Stichting Het Alems Kerkje, ANBI-status, bestuur en doelstelling.',
}

const bestuur = [
  { functie: 'Voorzitter', naam: 'Jeroen van Heel' },
  { functie: 'Secretaris', naam: 'Peter van Lent' },
  { functie: 'Penningmeester', naam: 'Peter van Boxtel' },
  { functie: 'Bestuurslid', naam: 'Jeanne van Oers-van den Oord' },
]

const algemeneInfo = [
  { label: 'Locatie', value: 'Sint Odradastraat 12, 5335LL Alem' },
  { label: 'RSIN-nummer', value: '865336854' },
  { label: 'KVK-nummer', value: '90498410' },
  { label: 'Bankrekening', value: 'NL81 RABO 0368 0835 27' },
]

export default function DeStichtingPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-stone-950 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www.hetalemskerkje.nl/wp-content/uploads/2025/11/PHOTO-2025-11-07-08-20-54-2.jpg"
            alt="Het Alems Kerkje"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/70 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">Informatie over</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            De Stichting
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Stichting Het Alems Kerkje is een ANBI-erkende organisatie zonder winstoogmerk, opgericht door en voor de Alemse gemeenschap.
          </p>
        </div>
      </section>

      {/* Achtergrond */}
      <section className="bg-stone-950 py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Achtergrond</p>
              <h2 className="font-serif text-3xl text-white mb-6">Hoe de stichting ontstond</h2>
              <div className="space-y-4 text-stone-400 text-sm leading-relaxed">
                <p>
                  Nadat de Gemeente Maasdriel besloten had om tot verkoop van het kerkje over te gaan, zijn een aantal Alemse verenigingen en stichtingen om de tafel gaan zitten om te bezien hoe het kerkje voor het sociaal-culturele leven van het dorp behouden kon blijven.
                </p>
                <p>
                  Omdat de Alemse verenigingen en stichtingen niet over voldoende middelen beschikten, werd contact gezocht met het <strong className="text-stone-300">Sociaal Cultureel Fonds Maasdriel (SCFM)</strong>. Dit fonds bleek bereid om het pand te kopen en te verhuren als sociaal-cultureel centrum ten behoeve van de inwoners van Alem en omgeving.
                </p>
                <p>
                  Met dit doel is vervolgens door de dorpsraad en het plaatselijke verenigingsleven <strong className="text-stone-300">Stichting Het Alems Kerkje</strong> opgericht. Deze stichting huurt het pand inmiddels van het SCFM.
                </p>
              </div>
            </div>

            {/* Doelstelling */}
            <div className="bg-stone-900 border border-stone-800 p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Doelstelling</p>
              <p className="font-serif text-xl text-white mb-4 leading-relaxed">
                "Het initiëren en organiseren van sociaal-culturele activiteiten in en rond het Alems Kerkje"
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                De stichting houdt daarbij rekening met de mogelijkheden die het gebouw biedt en handelt in overeenstemming met het bijzondere karakter en de huidige en oorspronkelijke bestemming.
              </p>
              <div className="mt-6 pt-6 border-t border-stone-800">
                <p className="text-xs text-stone-500">Gesteund door</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Alemse verenigingsleven', 'SCFM', 'Gemeente Maasdriel'].map((s) => (
                    <span key={s} className="text-xs bg-stone-800 text-stone-300 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANBI */}
      <section className="bg-stone-900 py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <div className="inline-block bg-amber-600/20 border border-amber-600/40 px-4 py-2 mb-4">
                <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">ANBI</span>
              </div>
              <h2 className="font-serif text-3xl text-white mb-4">Algemeen Nut Beogende Instelling</h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Stichting Het Alems Kerkje heeft geen winstoogmerk en beschikt over de ANBI-status. Het bestuur is onbezoldigd — enkel kosten die bestuurders in de uitoefening van hun functie maken, worden vergoed.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://www.hetalemskerkje.nl/wp-content/uploads/2025/08/ANBI-Formulier-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-amber-400 hover:text-amber-300 border-b border-amber-600/40 pb-0.5 transition-colors"
                >
                  ANBI Formulier →
                </a>
              </div>
            </div>

            {/* Bestuur */}
            <div className="md:w-2/3">
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-6">Het bestuur</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {bestuur.map((lid) => (
                  <div key={lid.naam} className="bg-stone-950 border border-stone-800 p-5 hover:border-amber-800/40 transition-colors">
                    <p className="text-xs tracking-widest uppercase text-amber-500/70 mb-1">{lid.functie}</p>
                    <p className="text-white font-medium">{lid.naam}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algemene info */}
      <section className="bg-stone-950 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-8">Algemene informatie</p>
          <div className="grid sm:grid-cols-2 gap-px bg-stone-800">
            {algemeneInfo.map((item) => (
              <div key={item.label} className="bg-stone-950 p-6">
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">{item.label}</p>
                <p className="text-white text-sm font-mono">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-stone-900 border border-stone-800 p-8">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Beleidsplan</p>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Voor het beleid van De Stichting Het Alems Kerkje over het jaar 2025 verwijzen we u naar het beleidsplan.
            </p>
            <Link
              href="/kerkje/beleidsplan"
              className="inline-block border border-amber-600/60 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 hover:text-amber-300 px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-200"
            >
              Bekijk het beleidsplan →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
