import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Geschiedenis – Het Alems Kerkje',
  description: 'De rijke geschiedenis van Het Alems Kerkje, gebouwd in 1719 met materiaal van een oudere katholieke kerk.',
}

const timeline = [
  {
    year: '1719',
    title: 'Bouw van het kerkje',
    content:
      'Het voormalig Hervormde kerkje in Alem werd in 1719 gebouwd. Voor de bouw is materiaal gebruikt van de oudere katholieke kerk die tijdens een overstroming werd verwoest. Dit kan men nog zien aan de verschillende afmetingen bakstenen die tijdens de bouw zijn gebruikt. Een tekening van Hendrik Verhees uit 1790 toont het kerkje met destijds slechts één raam in de voorgevel.',
  },
  {
    year: 'Architectuur',
    title: 'De bouwstijl',
    content:
      'Het kerkje wordt omschreven als een bakstenen zaalkerkje met driezijdige sluiting en houten dakruiter. De dakruiter bevat een uurwerk met wijzerplaat. Het gebouw bestaat uit twee verdiepingen en heeft zes hoge ramen. Achter het kerkje ligt een ommuurd kerkhofje met baarhuisje. Het kerkje had meerdere keren te lijden onder oorlogsgeweld — zo werd het bij de inval van de Fransen "van binnen geruïneerd en van predikstoel en banken beroofd."',
  },
  {
    year: 'WO II',
    title: 'Schade door oorlog',
    content:
      'Ten gevolge van de zware gevechten aan het eind van de Tweede Wereldoorlog raakte het kerkje zwaar beschadigd, waarna de Hervormde Gemeente Lith wilde overgaan tot sloop. Nadat Alem via een grenswijziging deel was gaan uitmaken van de gemeente Maasdriel, besloot het gemeentebestuur in 1958 tot aankoop van het kerkje en de daarachter gelegen begraafplaats. In 1960 werd de kerk voor het laatst als gebedshuis gebruikt.',
  },
  {
    year: '1962',
    title: 'De restauratie',
    content:
      'De restauratie vond plaats onder auspiciën van de Driebergse architect H. Korsewagen. De restauratie was zeer grondig: het gehele dak werd vernieuwd, er kwam een nieuw uurwerk met messing wijzerplaat op de klokkentoren, en de begrafenismuur met baarhuisje werd gerestaureerd. Nadien diende het kerkje als klokkenmuseum, centrum voor de Natuurwacht Bommelerwaard en als dakpannenmuseum.',
  },
  {
    year: 'Heden',
    title: 'Sociaal-cultureel centrum',
    content:
      'Thans is het kerkje — tot volle tevredenheid van de Alemse bevolking — in gebruik als sociaal-cultureel centrum. Het vormt een ontmoetingsplek voor allerlei activiteiten: van yoga en concerten tot tentoonstellingen en huwelijksceremonies. Een bijzonder stukje levend erfgoed midden in het dorp.',
  },
]

export default function GeschiedenisPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-stone-950 pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, #d97706 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">Het Alems Kerkje</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            De Geschiedenis
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Van een 18e-eeuwse hervormde kerk tot een bruisend sociaal-cultureel centrum.
            Een verhaal van bijna drie eeuwen geschiedenis, veerkracht en gemeenschapsgeest.
          </p>
        </div>
      </section>

      {/* Intro stat */}
      <section className="bg-stone-950 py-16 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { number: '1719', label: 'Bouwjaar' },
            { number: '300+', label: 'Jaar geschiedenis' },
            { number: '1962', label: 'Restauratiejaar' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl md:text-4xl text-amber-400 mb-2">{stat.number}</p>
              <p className="text-xs tracking-widest uppercase text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tijdlijn */}
      <section className="bg-stone-950 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Verticale lijn */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stone-800 md:-translate-x-px" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`pl-10 md:pl-0 w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-stone-900 border border-stone-800 p-8 hover:border-amber-800/50 transition-colors">
                      <span className="text-xs tracking-[0.3em] uppercase text-amber-500 font-light">{item.year}</span>
                      <h3 className="font-serif text-xl text-white mt-2 mb-4">{item.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  </div>

                  {/* Punt op de lijn */}
                  <div className="absolute left-0 md:left-1/2 top-8 w-3 h-3 rounded-full bg-amber-500 border-2 border-stone-950 md:-translate-x-1.5 translate-x-[-5px] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 border-t border-stone-800 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Meer weten?</p>
          <h2 className="font-serif text-3xl text-white mb-6">Bezoek het kerkje zelf</h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-8">
            De geschiedenis van Het Alems Kerkje beleef je het best van binnen. Kom langs bij een van onze activiteiten of plan een rondleiding.
          </p>
          <a
            href="/contact"
            className="inline-block border border-amber-600/60 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 hover:text-amber-300 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-200"
          >
            Neem contact op
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}
