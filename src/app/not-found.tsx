import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina niet gevonden',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4">404</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Pagina niet gevonden</h1>
        <p className="text-stone-400 mb-10 leading-relaxed">
          Deze pagina bestaat niet (meer). Ga terug naar de homepage of bekijk onze agenda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Terug naar home
          </Link>
          <Link
            href="/agenda"
            className="border border-stone-700 hover:border-amber-500 text-stone-300 hover:text-amber-400 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors"
          >
            Bekijk agenda
          </Link>
        </div>
      </div>
    </div>
  )
}
