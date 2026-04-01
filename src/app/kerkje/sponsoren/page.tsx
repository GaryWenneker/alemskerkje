import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsoren – Het Alems Kerkje',
  description: 'Onze gewaardeerde sponsoren die de activiteiten en het behoud van Het Alems Kerkje mogelijk maken.',
}

const sponsoren = [
  {
    naam: 'Oranje Fonds',
    categorie: 'Maatschappelijk fonds',
    omschrijving: 'Het Oranje Fonds steunt initiatieven die mensen met elkaar verbinden en de sociale samenhang in Nederland versterken.',
    logo: '/logos/oranje-fonds.jpg',
    website: 'https://www.oranjefonds.nl',
  },
  {
    naam: 'VSB Fonds',
    categorie: 'Sociaal fonds',
    omschrijving: 'VSBfonds heeft een sociale, inclusieve en creatieve samenleving voor ogen — een samenleving waarin mensen met verschillende achtergronden elkaar ontmoeten en inspireren.',
    logo: '/logos/vsb-fonds.png',
    website: 'https://www.vsbfonds.nl',
  },
  {
    naam: 'Sociaal Cultureel Fonds Maasdriel',
    categorie: 'Lokaal fonds',
    omschrijving: 'Fonds ter bevordering van sociaal-culturele activiteiten in Alem, Hoenzadriel, Kerkdriel en Velddriel.',
    logo: '/logos/scfm.png',
    website: 'https://www.scfmaasdriel.nl',
  },
  {
    naam: 'Rabobank Coöperatiefonds',
    categorie: 'Bankfonds',
    omschrijving: 'Een aandeel in elkaar. Het Rabobank Coöperatiefonds steunt lokale initiatieven die de gemeenschap versterken.',
    logo: '/logos/rabo.webp',
    website: 'https://www.rabobank.nl',
  },
  {
    naam: 'Soepenfestival',
    categorie: 'Goede doelen stichting',
    omschrijving: 'Een goede doelen stichting die lokale culturele en maatschappelijke initiatieven ondersteunt.',
    logo: '/logos/soepenfestival.jpeg',
    website: 'https://www.hetalemskerkje.nl',
  },
  {
    naam: 'Duke Vision',
    categorie: 'Webhosting & design',
    omschrijving: 'Webhosting en design partner van Het Alems Kerkje. Duke Vision verzorgt de digitale presentatie van het kerkje.',
    logo: '/logos/duke-vision.jpg',
    website: 'https://www.dukevision.nl',
  },
  {
    naam: 'Gemeente Maasdriel',
    categorie: 'Overheid',
    omschrijving: 'Goed idee, doe er iets mee! De Gemeente Maasdriel steunt lokale culturele initiatieven en sociaal-culturele centra.',
    logo: '/logos/maasdriel.jpeg',
    website: 'https://www.gemeentemaasdriel.nl',
  },
  {
    naam: 'CF Crowdfunding',
    categorie: 'Crowdfunding platform',
    omschrijving: 'Crowdfunding platform dat maatschappelijke en culturele projecten ondersteunt via burgerbijdragen.',
    logo: '/logos/cf.jpeg',
    website: 'https://www.hetalemskerkje.nl',
  },
]

export default function SponsorenPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-stone-950 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www.hetalemskerkje.nl/wp-content/uploads/2025/11/PHOTO-2025-11-07-08-20-54.jpg"
            alt="Het Alems Kerkje"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/70 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4 font-light">Onze gewaardeerde</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Sponsoren
          </h1>
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Dank aan onze gewaardeerde sponsoren die samen met ons de toekomst van Het Alems Kerkje mogelijk maken.
          </p>
        </div>
      </section>

      {/* Sponsoren grid */}
      <section className="bg-stone-950 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800">
            {sponsoren.map((sponsor) => (
              <a
                key={sponsor.naam}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-950 p-8 flex flex-col hover:bg-stone-900 transition-colors duration-300"
              >
                {/* Logo met uniforme amber kleurstijl */}
                <div className="h-16 mb-6 flex items-center">
                  <div className="relative h-12 w-full">
                    <Image
                      src={sponsor.logo}
                      alt={`Logo ${sponsor.naam}`}
                      fill
                      className="object-contain object-left sponsor-logo"
                      sizes="200px"
                    />
                  </div>
                </div>

                <p className="text-xs tracking-[0.25em] uppercase text-amber-500/60 mb-1">{sponsor.categorie}</p>
                <p className="text-white text-sm font-medium mb-3 group-hover:text-amber-300 transition-colors">{sponsor.naam}</p>
                <p className="text-stone-500 text-xs leading-relaxed flex-1">{sponsor.omschrijving}</p>
                <span className="mt-4 text-xs tracking-widest uppercase text-stone-600 group-hover:text-amber-500/60 transition-colors">
                  Bekijken →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor worden CTA */}
      <section className="bg-stone-900 border-t border-stone-800 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Uw naam erbij?</p>
          <h2 className="font-serif text-3xl text-white mb-6">Word sponsor</h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            Stichting Het Alems Kerkje probeert haar doelen mede te realiseren met behulp van donaties van particulieren en bedrijven. Wilt u ons financieel steunen? Neem dan contact met ons op.
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
