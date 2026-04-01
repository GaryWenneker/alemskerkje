import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bedankt voor uw donatie – Het Alems Kerkje',
  description: 'Hartelijk dank voor uw steun aan Het Alems Kerkje.',
}

export default function BedanktPage() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-stone-950 flex items-center justify-center px-6 py-32">
        <div className="max-w-lg w-full text-center">

          {/* Icoon */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-600/10 border border-amber-600/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {/* Subtiele ring */}
              <div className="absolute inset-0 rounded-full border border-amber-600/10 scale-[1.35]" />
            </div>
          </div>

          {/* Label */}
          <p className="text-xs tracking-[0.4em] uppercase text-amber-500 mb-4">Donatie ontvangen</p>

          {/* Titel */}
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Hartelijk dank
          </h1>

          {/* Tekst */}
          <p className="text-stone-400 text-sm leading-relaxed mb-3 max-w-md mx-auto">
            Uw donatie is succesvol ontvangen. Met uw steun helpt u Het Alems Kerkje — een monument uit 1719 — levend te houden voor de gemeenschap.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed mb-12 max-w-md mx-auto">
            Mollie verstuurt een betalingsbevestiging naar uw e-mailadres.
          </p>

          {/* Scheidingslijn */}
          <div className="flex items-center gap-4 mb-12">
            <span className="flex-1 h-px bg-stone-800" />
            <span className="text-stone-700 text-[10px] tracking-[0.3em] uppercase">Het Alems Kerkje</span>
            <span className="flex-1 h-px bg-stone-800" />
          </div>

          {/* Knoppen */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              Terug naar home
            </Link>
            <Link
              href="/agenda"
              className="border border-stone-700 hover:border-stone-500 text-stone-400 hover:text-white px-8 py-3 text-xs tracking-[0.25em] uppercase transition-colors duration-200"
            >
              Bekijk de agenda
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
