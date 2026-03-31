import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activiteiten',
  description: 'Ontdek wat Het Alems Kerkje te bieden heeft: huwelijken, concerten, tentoonstellingen, yoga en meer.',
}

const activiteiten = [
  {
    title: 'Huwelijksceremonie',
    photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Intieme huwelijksceremonie in een historische kerk',
    description:
      'Trouwen in een kerk die al drie eeuwen getuige is van de meest bijzondere momenten. De sobere schoonheid van het interieur creëert een sfeer die uw gasten niet snel vergeten. Wij denken graag met u mee over de inrichting en het verloop van de dag.',
    features: ['Max. ~80 personen', 'Eigen cateraar mogelijk', 'Ruime parkeerplaats nabij'],
  },
  {
    title: 'Concerten & Muziek',
    photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Akoestisch concert in intieme sfeer',
    description:
      'De bijzondere akoestiek van een zaalkerk met stenen muren en gewelven maakt dit een ideale plek voor kleinschalige akoestische concerten. Klassieke muziek, zang, folk of jazz — elk genre komt hier tot zijn recht.',
    features: ['Uitstekende akoestiek', 'Sfeervolle verlichting', 'Pianovervoer mogelijk in overleg'],
  },
  {
    title: 'Tentoonstellingen',
    photo: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Kunsttentoonstelling in een bijzondere ruimte',
    description:
      'Kunst, fotografie, erfgoed of natuur — de historische muren bieden een uniek decor dat uw werk in een ander daglicht stelt. De ruimte is flexibel in te delen voor wandpresentaties en vrij opgestelde werken.',
    features: ['Flexibele inrichting', 'Daglicht + kunstlicht', 'Opbouw dag van tevoren'],
  },
  {
    title: 'Cursussen & Workshops',
    photo: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Yoga en cursussen in een rustige omgeving',
    description:
      'Yoga, zang, mindfulness, schilderen, meditatieve wandelingen — de rust en atmosfeer van Het Alems Kerkje nodigt uit tot concentratie en inspiratie. Ideaal voor dagdelen of meerdaagse programma\'s.',
    features: ['Rustige omgeving', 'Inspirerende sfeer', 'Op aanvraag ook avonden'],
  },
  {
    title: 'Lezingen & Presentaties',
    photo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Lezing voor een betrokken publiek',
    description:
      'Organiseer een intieme lezing over erfgoed, literatuur, natuur of cultuur. De inrichting met stoelen of tafels is eenvoudig te realiseren. Ideaal voor groepen van 20 tot 60 personen.',
    features: ['Geluidsinstallatie aanwezig', 'Projectie op aanvraag', 'Catering in overleg'],
  },
  {
    title: 'Privé & Bedrijfsevenementen',
    photo: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=75&auto=format&fit=crop',
    photoAlt: 'Sfeervolle privé of zakelijke bijeenkomst',
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-800/30">
          {activiteiten.map((item) => (
            <article
              key={item.title}
              className="group bg-stone-950 flex flex-col overflow-hidden"
            >
              {/* Foto */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={item.photo}
                  alt={item.photoAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-8 py-8">
                <h2 className="font-serif text-2xl text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-stone-400 leading-relaxed mb-6 text-sm flex-1">{item.description}</p>
                <ul className="space-y-2 border-t border-stone-800/60 pt-5">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-stone-500 text-xs">
                      <span className="w-1 h-1 rounded-full bg-amber-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
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
