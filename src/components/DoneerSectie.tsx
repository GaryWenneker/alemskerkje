'use client'

import { useState, useEffect } from 'react'

const donatieBedragen = [
  { bedrag: '10', url: 'https://payment-links.mollie.com/payment/dSYNpCpbKAbC78dt7Zknn' },
  { bedrag: '25', url: 'https://payment-links.mollie.com/payment/w3ptZAFhVDoM45RX6uwa8' },
  { bedrag: '50', url: 'https://payment-links.mollie.com/payment/F5yR9vXLmLm3FQ5e4582o' },
  { bedrag: '100', url: 'https://payment-links.mollie.com/payment/hnax9fo5Ffxp9TwUE6R3g' },
]

type Donatie = (typeof donatieBedragen)[0]

export default function DoneerSectie() {
  const [geselecteerd, setGeselecteerd] = useState<Donatie | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGeselecteerd(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="bg-stone-900 py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-4">Eenmalige gift</p>
            <h2 className="font-serif text-3xl text-white mb-4">Doneer</h2>
            <p className="text-stone-400 text-sm max-w-lg mx-auto">
              Steun Het Alems Kerkje met een eenmalige gift naar keuze. Betaal veilig met iDEAL via Mollie.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {donatieBedragen.map((d) => (
              <button
                key={d.bedrag}
                onClick={() => setGeselecteerd(d)}
                className="group relative bg-stone-950 border border-stone-700/60 hover:border-amber-500/70 p-8 text-center transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {/* Subtiele achtergrondgloed bij hover */}
                <span className="absolute inset-0 bg-gradient-to-b from-amber-600/0 to-amber-600/0 group-hover:from-amber-600/8 group-hover:to-amber-600/3 transition-all duration-300" />

                {/* Topstreep */}
                <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/0 to-transparent group-hover:via-amber-500/60 transition-all duration-300" />

                <span className="relative flex flex-col items-center gap-3">
                  {/* Euro-teken klein, bedrag groot */}
                  <span className="flex items-start gap-1">
                    <span className="text-stone-400 text-sm mt-1.5 group-hover:text-amber-400/80 transition-colors duration-300">€</span>
                    <span className="text-white text-4xl font-light tracking-tight leading-none group-hover:text-amber-50 transition-colors duration-300">
                      {d.bedrag}
                    </span>
                  </span>

                  {/* Scheidingslijn */}
                  <span className="w-6 h-px bg-stone-700 group-hover:bg-amber-600/60 group-hover:w-10 transition-all duration-300" />

                  {/* Label */}
                  <span className="text-[10px] tracking-[0.35em] uppercase text-stone-500 group-hover:text-amber-400/80 transition-colors duration-300">
                    Doneer
                  </span>
                </span>
              </button>
            ))}
          </div>

          <p className="text-center text-stone-600 text-xs mt-6 flex items-center justify-center gap-2">
            <span className="w-4 h-px bg-stone-700" />
            Veilig betalen met iDEAL · Powered by Mollie
            <span className="w-4 h-px bg-stone-700" />
          </p>
        </div>
      </section>

      {/* Modal */}
      {geselecteerd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Donatie van € ${geselecteerd.bedrag}`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setGeselecteerd(null)}
          />

          {/* Venster */}
          <div className="relative z-10 w-full max-w-2xl flex flex-col bg-stone-950 border border-stone-800 shadow-2xl shadow-black/60 max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-amber-500 mb-0.5">Donatie</p>
                  <div className="flex items-start gap-1">
                    <span className="text-stone-400 text-sm mt-0.5">€</span>
                    <span className="font-light text-2xl text-white leading-none tracking-tight">{geselecteerd.bedrag}</span>
                  </div>
                </div>
                <span className="h-8 w-px bg-stone-800" />
                <p className="text-stone-500 text-xs leading-snug">
                  Veilig betalen via<br />
                  <span className="text-stone-400">iDEAL · Mollie</span>
                </p>
              </div>
              <button
                onClick={() => setGeselecteerd(null)}
                className="text-stone-500 hover:text-white transition-colors p-2 -mr-2"
                aria-label="Sluiten"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Inhoud */}
            <div className="flex flex-col items-center justify-center gap-8 px-8 py-12 text-center">
              {/* Bedrag groot weergegeven */}
              <div className="flex items-start gap-2">
                <span className="text-stone-500 text-xl mt-2">€</span>
                <span className="text-white font-light leading-none text-[5rem]">
                  {geselecteerd.bedrag}
                </span>
              </div>

              {/* Scheidingslijn */}
              <div className="flex items-center gap-4 w-full max-w-xs">
                <span className="flex-1 h-px bg-stone-800" />
                <span className="text-stone-600 text-[10px] tracking-[0.3em] uppercase">donatie</span>
                <span className="flex-1 h-px bg-stone-800" />
              </div>

              {/* Uitleg */}
              <div className="max-w-sm">
                <p className="text-stone-300 text-sm leading-relaxed mb-1">
                  U wordt doorgestuurd naar de beveiligde betaalomgeving van Mollie.
                </p>
                <p className="text-stone-600 text-xs">
                  Betaal eenvoudig en veilig met iDEAL of creditcard.
                </p>
              </div>

              {/* iDEAL icoon rij */}
              <div className="flex items-center gap-3 text-stone-600 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-500">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                SSL-beveiligd
                <span className="w-px h-3 bg-stone-700" />
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-500">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Mollie Payments
              </div>

              {/* Betaal knop */}
              <a
                href={geselecteerd.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white py-4 text-xs tracking-[0.3em] uppercase transition-colors duration-200 text-center"
              >
                Betaal € {geselecteerd.bedrag} met iDEAL
              </a>

              <p className="text-stone-700 text-[11px]">
                U verlaat tijdelijk deze website · betaling via Mollie
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
