import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-500 font-light mb-1">Het</p>
            <h2 className="text-2xl font-serif text-white mb-4">Alems Kerkje</h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Een historische locatie voor uw bijzondere moment. Gebouwd in 1719,
              gerestaureerd in 1962, vandaag het kloppende hart van Alem.
            </p>
          </div>

          {/* Pagina's */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-4">Pagina&apos;s</h3>
            <ul className="space-y-2">
              {[
                { href: '/agenda', label: 'Agenda' },
                { href: '/activiteiten', label: 'Activiteiten' },
                { href: '/nieuws', label: 'Nieuws' },
                { href: '/contact', label: 'Contact & Reservering' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Het Kerkje */}
          <div className="hidden md:block">
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-4">Het Kerkje</h3>
            <ul className="space-y-2">
              {[
                { href: '/kerkje/geschiedenis', label: 'Geschiedenis' },
                { href: '/kerkje/vrienden-van', label: 'Vrienden van' },
                { href: '/kerkje/sponsoren', label: 'Sponsoren' },
                { href: '/kerkje/de-stichting', label: 'De Stichting' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-4">Contact</h3>
            <address className="not-italic text-stone-400 text-sm space-y-1">
              <p>Sint Odradastraat 12</p>
              <p>5335LL Alem, Gelderland</p>
              <p className="pt-2">
                KVK: 90498410
              </p>
              <p>RSIN: 865336854</p>
              <p className="pt-2">
                <a
                  href="mailto:info@hetalemskerkje.nl"
                  className="text-amber-500 hover:text-amber-400 transition-colors"
                >
                  info@hetalemskerkje.nl
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Stichting Het Alems Kerkje
          </p>
          <Link
            href="/admin"
            className="text-stone-700 hover:text-stone-500 text-xs transition-colors"
          >
            Beheer
          </Link>
        </div>
      </div>
    </footer>
  )
}
