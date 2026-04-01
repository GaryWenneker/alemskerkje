import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DoneerSectie from '@/components/DoneerSectie'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vrienden van – Het Alems Kerkje',
  description: 'Word vriend, doneer of word vrijwilliger bij Het Alems Kerkje. Samen houden we dit bijzondere monument levend.',
}


const vriendVoordelen = [
  'Voorrang bij kaartverkoop voor evenementen',
  'Uitnodigingen voor speciale vriendenevenementen',
  'Periodieke nieuwsbrief met achtergrondverhalen',
  'De voldoening dat u bijdraagt aan cultureel erfgoed',
]

const vrijwilligerRollen = [
  { rol: 'Gastheer / gastvrouw', omschrijving: 'Bij concerten, bruiloften en andere evenementen' },
  { rol: 'Rondleidingen', omschrijving: 'Verhalen over de rijke geschiedenis van het kerkje' },
  { rol: 'Onderhoud', omschrijving: 'Assistentie bij het onderhoud van het monument' },
  { rol: 'Administratie', omschrijving: 'Administratieve ondersteuning en verslaglegging' },
  { rol: 'Promotie', omschrijving: 'Communicatie, social media en woordvoering' },
]

export default function VriendenVanPage() {
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
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/50 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">Help mee en</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Word Vriend
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Help mee om de sociaal-culturele activiteiten in Het Alems Kerkje mogelijk te maken. Word vriend, doneer of zet u in als vrijwilliger.
          </p>
        </div>
      </section>

      {/* Waarom steun */}
      <section className="bg-stone-950 py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Waarom uw steun belangrijk is</p>
              <h2 className="font-serif text-3xl text-white mb-6">Een uniek stuk erfgoed</h2>
              <div className="space-y-4 text-stone-400 text-sm leading-relaxed">
                <p>
                  Het Alems Kerkje is een uniek stuk cultureel erfgoed. Het uit 1719 stammende gebouw speelt al eeuwen een centrale rol in de gemeenschap — eerst als religieus gebouw, nu als sociaal-culturele ontmoetingsplek.
                </p>
                <p>
                  Om dit bijzondere monument te behouden en een gevarieerd programma te blijven aanbieden, hebben we uw steun hard nodig. Of u nu kiest voor een eenmalige donatie, vriend wordt of zich inzet als vrijwilliger — elke bijdrage is waardevol.
                </p>
              </div>
            </div>

            {/* Vriend worden kaart */}
            <div className="bg-stone-900 border border-amber-800/30 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-full -translate-x-4 -translate-y-8" />
              <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Word vriend</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-5xl text-white">€ 25</span>
                <span className="text-stone-500 text-sm">per jaar</span>
              </div>
              <ul className="space-y-3 mb-8">
                {vriendVoordelen.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-sm text-stone-300">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">✦</span>
                    {v}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className="block text-center bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors"
              >
                Word nu vriend
              </a>
            </div>
          </div>
        </div>
      </section>

      <DoneerSectie />

      {/* Vrijwilliger */}
      <section className="bg-stone-950 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Actief bijdragen</p>
            <h2 className="font-serif text-3xl text-white mb-4">Word Vrijwilliger</h2>
            <p className="text-stone-400 text-sm max-w-lg mx-auto">
              We zijn altijd op zoek naar enthousiaste mensen die willen helpen. Als vrijwilliger word je onderdeel van een gedreven team.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {vrijwilligerRollen.map((r) => (
              <div
                key={r.rol}
                className="bg-stone-900 border border-stone-800 p-6 hover:border-amber-800/40 transition-colors"
              >
                <p className="text-white font-medium mb-2">{r.rol}</p>
                <p className="text-stone-400 text-xs leading-relaxed">{r.omschrijving}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block border border-amber-600/60 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 hover:text-amber-300 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200"
            >
              Meld u aan als vrijwilliger
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
