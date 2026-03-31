import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activiteiten',
  description: 'Ontdek wat Het Alems Kerkje te bieden heeft: huwelijken, concerten, tentoonstellingen, yoga en meer.',
}

const activiteiten = [
  {
    title: 'Huwelijksceremonie',
    icon: '💒',
    description:
      'Trouwen in een kerk die al drie eeuwen getuige is van de meest bijzondere momenten. De sobere schoonheid van het interieur creëert een sfeer die uw gasten niet snel vergeten. Wij denken graag met u mee over de inrichting en het verloop van de dag.',
    features: ['Max. ~80 personen', 'Eigen cateraar mogelijk', 'Ruime parkeerplaats nabij'],
  },
  {
    title: 'Concerten & Muziek',
    icon: '🎶',
    description:
      'De bijzondere akoestiek van een zaalkerk met stenen muren en gewelven maakt dit een ideale plek voor kleinschalige akoestische concerten. Klassieke muziek, zang, folk of jazz — elk genre komt hier tot zijn recht.',
    features: ['Uitstekende akoestiek', 'Sfeervolle verlichting', 'Pianovervoer mogelijk in overleg'],
  },
  {
    title: 'Tentoonstellingen',
    icon: '🖼️',
    description:
      'Kunst, fotografie, erfgoed of natuur — de historische muren bieden een uniek decor dat uw werk in een ander daglicht stelt. De ruimte is flexibel in te delen voor wandpresentaties en vrij opgestelde werken.',
    features: ['Flexibele inrichting', 'Daglicht + kunstlicht', 'Opbouw dag van tevoren'],
  },
  {
    title: 'Cursussen & Workshops',
    icon: '🧘',
    description:
      'Yoga, zang, mindfulness, schilderen, meditatieve wandelingen — de rust en atmosfeer van Het Alems Kerkje nodigt uit tot concentratie en inspiratie. Ideaal voor dagdelen of meerdaagse programma\'s.',
    features: ['Rustige omgeving', 'Uitstekende begeleiding', 'Op aanvraag ook avonden'],
  },
  {
    title: 'Lezingen & Presentaties',
    icon: '🎤',
    description:
      'Organiseer een intieme lezing over erfgoed, literatuur, natuur of cultuur. De inrichting met stoelen of tafels is eenvoudig te realiseren. Ideaal voor groepen van 20 tot 60 personen.',
    features: ['Geluidsinstallatie mogelijk', 'Projectie op aanvraag', 'Catering in overleg'],
  },
  {
    title: 'Privé & Bedrijfsevenementen',
    icon: '🥂',
    description:
      'Jubileum, kennissessie, teambijeenkomst of familiereünie — de veelzijdigheid van de ruimte maakt ook maatwerkoplossingen mogelijk. Neem contact op om te bespreken wat wij voor u kunnen betekenen.',
    features: ['Op maat', 'Avond & weekend mogelijk', 'Exclusief gebruik'],
  },
]

export default function ActiviteitenPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-stone-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Verhuur & gebruik</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">Activiteiten</h1>
          <p className="text-stone-400 max-w-xl leading-relaxed">
            Het Alems Kerkje wordt op aanvraag verhuurd voor sociaal-culturele activiteiten.
            Hieronder vindt u een overzicht van wat er mogelijk is.
          </p>
        </div>
      </section>

      {/* Activiteiten grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {activiteiten.map((item) => (
            <article key={item.title} className="card-dark p-10 group">
              <div className="text-5xl mb-6">{item.icon}</div>
              <h2 className="font-serif text-2xl text-white mb-4 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h2>
              <p className="text-stone-400 leading-relaxed mb-6 text-sm">{item.description}</p>
              <ul className="space-y-1">
                {item.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-stone-500 text-xs">
                    <span className="w-1 h-1 rounded-full bg-amber-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-stone-800/50 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
            Heeft u een ander idee?
          </h2>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed">
            We staan open voor nieuwe initiatieven die passen bij de sociaal-culturele
            missie van het kerkje. Neem gerust contact op.
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
