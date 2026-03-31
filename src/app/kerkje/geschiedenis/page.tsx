import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Geschiedenis – Het Alems Kerkje',
  description: 'De rijke geschiedenis van Het Alems Kerkje, gebouwd in 1719 met materiaal van een oudere katholieke kerk.',
}

// Volgorde en foto-koppeling gebaseerd op de originele WordPress-pagina HTML (id-attributen per sectie)
const timeline = [
  {
    year: '1719',
    title: 'Bouw van het kerkje',
    content:
      'Het voormalig Hervormde kerkje in Alem werd in 1719 gebouwd. Voor de bouw is materiaal gebruikt van de oudere katholieke kerk die tijdens een overstroming werd verwoest. Dit kan men nog zien aan de verschillende afmetingen bakstenen die tijdens de bouw zijn gebruikt. Deze tekening maakte Hendrik Verhees in 1790. Het kerkje had destijds slechts één raam in de voorgevel.',
    image: '/images/geschiedenis/tekening-1790.jpg',
    imageAlt: 'Tekening van Hendrik Verhees uit 1790',
    imageCaption: 'Tekening door Hendrik Verhees, 1790',
  },
  {
    year: 'Architectuur',
    title: 'De bouwstijl',
    content:
      'Het kerkje wordt omschreven als een bakstenen zaalkerkje met driezijdige sluiting en houten dakruiter. De dakruiter bevat een uurwerk met wijzerplaat. Het gebouw bestaat uit twee verdiepingen en heeft zes hoge ramen. Achter het kerkje ligt een ommuurd kerkhofje met baarhuisje. Het kerkje had meerdere keren te lijden onder oorlogsgeweld — zo werd het bij de inval van de Fransen "van binnen geruïneerd en van predikstoel en banken beroofd."',
    image: '/images/geschiedenis/bt-archief.jpg',
    imageAlt: 'Archiefopname van Het Alems Kerkje – exterieur',
    imageCaption: 'Archiefopname – collectie Gemeente Maasdriel',
  },
  {
    year: 'WO II',
    title: 'Schade door oorlog',
    content:
      'Ten gevolge van de zware gevechten aan het eind van de Tweede Wereldoorlog raakte het kerkje zwaar beschadigd, waarna de Hervormde Gemeente Lith wilde overgaan tot sloop. Nadat Alem via een grenswijziging deel was gaan uitmaken van de gemeente Maasdriel, besloot het gemeentebestuur in 1958 tot aankoop van het kerkje en de daarachter gelegen begraafplaats. In 1960 werd de kerk voor het laatst als gebedshuis gebruikt.',
    image: '/images/geschiedenis/kerkje-archief.jpg',
    imageAlt: 'Archiefopname van het kerkje rond de Tweede Wereldoorlog',
    imageCaption: 'Archiefopname – oorlogsperiode',
  },
  {
    year: '1962',
    title: 'De restauratie',
    content:
      'De restauratie vond plaats onder auspiciën van de Driebergse architect H. Korsewagen. De restauratie was zeer grondig: het gehele dak werd vernieuwd, er kwam een nieuw uurwerk met messing wijzerplaat op de klokkentoren, en de begrafenismuur met baarhuisje werd gerestaureerd. Nadien diende het kerkje als klokkenmuseum, centrum voor de Natuurwacht Bommelerwaard en als dakpannenmuseum.',
    image: '/images/geschiedenis/album-wolfs-de-groot.jpg',
    imageAlt: 'Uit het album Wolfs-de Groot – restauratieperiode',
    imageCaption: 'Uit het album Wolfs-de Groot – restauratieperiode',
  },
  {
    year: 'Heden',
    title: 'Sociaal-cultureel centrum',
    content:
      'Thans is het kerkje — tot volle tevredenheid van de Alemse bevolking — in gebruik als sociaal-cultureel centrum. Het vormt een ontmoetingsplek voor allerlei activiteiten: van yoga en concerten tot tentoonstellingen en huwelijksceremonies. Een bijzonder stukje levend erfgoed midden in het dorp.',
    image: '/images/geschiedenis/kerkje-historisch.jpg',
    imageAlt: 'Het Alems Kerkje – huidige staat',
    imageCaption: 'Het Alems Kerkje vandaag',
  },
]

export default function GeschiedenisPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-stone-950 pt-40 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, #d97706 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal direction="up" delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">
              Het Alems Kerkje
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
              De Geschiedenis
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Van een 18e-eeuwse hervormde kerk tot een bruisend sociaal-cultureel centrum.
              Een verhaal van bijna drie eeuwen geschiedenis, veerkracht en gemeenschapsgeest.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-950 py-16 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { number: '1719', label: 'Bouwjaar' },
            { number: '300+', label: 'Jaar geschiedenis' },
            { number: '1962', label: 'Restauratiejaar' },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 120}>
              <p className="font-serif text-3xl md:text-4xl text-amber-400 mb-2">{stat.number}</p>
              <p className="text-xs tracking-widest uppercase text-stone-500">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Tijdlijn met foto's – afwisselend links/rechts, elk item heeft scroll-reveal */}
      <section className="bg-stone-950 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-32">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={item.year}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
                >
                  {/* Foto */}
                  <ScrollReveal
                    direction={isEven ? 'left' : 'right'}
                    delay={0}
                    className="w-full md:w-1/2 flex-shrink-0"
                  >
                    <figure className="relative group overflow-hidden">
                      <div className="relative w-full" style={{ paddingBottom: '70%' }}>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Amber overlay verdwijnt bij hover */}
                        <div className="absolute inset-0 bg-amber-900/20 group-hover:opacity-0 transition-opacity duration-700 mix-blend-multiply pointer-events-none" />
                        {/* Subtiele vignette-rand */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-amber-700/20 pointer-events-none" />
                      </div>
                      {item.imageCaption && (
                        <figcaption className="mt-3 text-xs text-stone-600 italic tracking-wide">
                          {item.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  </ScrollReveal>

                  {/* Tekst */}
                  <ScrollReveal
                    direction={isEven ? 'right' : 'left'}
                    delay={150}
                    className="w-full md:w-1/2"
                  >
                    <span className="inline-block text-xs tracking-[0.4em] uppercase text-amber-500 font-light mb-3 border-b border-amber-700/40 pb-2">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-400 leading-relaxed text-sm md:text-base">
                      {item.content}
                    </p>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Verbindingslijn decoratie tussen secties */}
      <section className="bg-stone-950 py-4 flex justify-center">
        <div className="w-px h-16 bg-gradient-to-b from-amber-700/40 to-transparent" />
      </section>

      {/* CTA */}
      <ScrollReveal direction="up">
        <section className="bg-stone-900 border-t border-stone-800 py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Meer weten?</p>
            <h2 className="font-serif text-3xl text-white mb-6">Bezoek het kerkje zelf</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              De geschiedenis van Het Alems Kerkje beleef je het best van binnen. Kom langs bij
              een van onze activiteiten of plan een rondleiding.
            </p>
            <a
              href="/contact"
              className="inline-block border border-amber-600/60 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 hover:text-amber-300 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200"
            >
              Neem contact op
            </a>
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </>
  )
}
