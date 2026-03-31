'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/agenda', label: 'Agenda' },
  { href: '/activiteiten', label: 'Activiteiten' },
  { href: '/nieuws', label: 'Nieuws' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || menuOpen
          ? 'bg-stone-950/95 backdrop-blur-sm border-b border-stone-800/50'
          : 'bg-transparent',
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-500 font-light">
            Het
          </span>
          <span className="text-lg font-serif text-white group-hover:text-amber-300 transition-colors">
            Alems Kerkje
          </span>
        </Link>

        {/* Desktop navigatie */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-xs tracking-[0.15em] uppercase transition-colors duration-200',
                  pathname === link.href
                    ? 'text-amber-400'
                    : 'text-stone-300 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="border border-amber-600/60 hover:border-amber-500 hover:bg-amber-600/10 text-amber-400 hover:text-amber-300 px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-200"
            >
              Reserveer
            </Link>
          </li>
        </ul>

        {/* Mobiel menu-knop */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
        >
          <span
            className={cn(
              'block w-6 h-px bg-white transition-all duration-300',
              menuOpen && 'rotate-45 translate-y-2.5',
            )}
          />
          <span
            className={cn(
              'block w-6 h-px bg-white transition-all duration-300',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-6 h-px bg-white transition-all duration-300',
              menuOpen && '-rotate-45 -translate-y-2.5',
            )}
          />
        </button>
      </nav>

      {/* Mobiel menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-96 border-b border-stone-800' : 'max-h-0',
        )}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'block text-sm tracking-widest uppercase py-1 transition-colors',
                  pathname === link.href
                    ? 'text-amber-400'
                    : 'text-stone-300 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              className="inline-block border border-amber-600 text-amber-400 px-6 py-3 text-xs tracking-widest uppercase"
            >
              Reserveer de locatie
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
