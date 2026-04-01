'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const kerkjeLinks = [
  { href: '/kerkje/geschiedenis', label: 'Geschiedenis' },
  { href: '/kerkje/vrienden-van', label: 'Vrienden van' },
  { href: '/kerkje/sponsoren', label: 'Sponsoren' },
  { href: '/kerkje/de-stichting', label: 'De Stichting' },
]

const navLinks = [
  { href: '/activiteiten', label: 'Activiteiten' },
  { href: '/nieuws', label: 'Nieuws' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [kerkjeOpen, setKerkjeOpen] = useState(false)
  const [kerkjeMobileOpen, setKerkjeMobileOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setKerkjeOpen(false)
  }, [pathname])

  // Sluit dropdown bij klik buiten
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setKerkjeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isKerkjeActive = pathname.startsWith('/kerkje')

  return (
    <>
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

          {/* Agenda — eerste link */}
          <li>
            <Link
              href="/agenda"
              className={cn(
                'text-xs tracking-[0.15em] uppercase transition-colors duration-200',
                pathname === '/agenda' ? 'text-amber-400' : 'text-stone-300 hover:text-white',
              )}
            >
              Agenda
            </Link>
          </li>

          {/* Het Kerkje dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setKerkjeOpen(!kerkjeOpen)}
              className={cn(
                'flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase transition-colors duration-200',
                isKerkjeActive || kerkjeOpen ? 'text-amber-400' : 'text-stone-300 hover:text-white',
              )}
              aria-expanded={kerkjeOpen}
              aria-haspopup="true"
            >
              Het Kerkje
              <svg
                className={cn('w-3 h-3 transition-transform duration-200', kerkjeOpen && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              className={cn(
                'absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-stone-950 border border-stone-800 shadow-2xl transition-all duration-200 origin-top',
                kerkjeOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
              )}
              role="menu"
            >
              {/* Pijltje omhoog */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-950 border-l border-t border-stone-800 rotate-45" />

              <ul className="py-2">
                {kerkjeLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={cn(
                        'block px-5 py-3 text-xs tracking-[0.15em] uppercase transition-colors',
                        pathname === link.href
                          ? 'text-amber-400 bg-amber-600/5'
                          : 'text-stone-300 hover:text-white hover:bg-stone-900',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Overige links */}
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

        {/* Mobiel menu-knop — 44×44 touch target */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] -mr-1"
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          <span className={cn('block w-6 h-0.5 bg-white origin-center transition-all duration-300', menuOpen && 'rotate-45 translate-y-[7px]')} />
          <span className={cn('block w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
          <span className={cn('block w-6 h-0.5 bg-white origin-center transition-all duration-300', menuOpen && '-rotate-45 -translate-y-[7px]')} />
        </button>
      </nav>
    </header>

      {/* Mobiel menu — buiten <header> om stacking context te vermijden */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobiele navigatie"
        className={cn(
          'md:hidden fixed inset-0 top-16 bg-stone-950 z-[49] transition-all duration-300 overflow-y-auto',
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2',
        )}
      >
        <ul className="px-6 pb-10 pt-6 flex flex-col gap-0 divide-y divide-stone-800/50">

          {/* Agenda — eerste link */}
          <li>
            <Link
              href="/agenda"
              className={cn(
                'flex items-center min-h-[60px] text-base tracking-widest uppercase transition-colors',
                pathname === '/agenda' ? 'text-amber-400' : 'text-stone-300',
              )}
            >
              Agenda
            </Link>
          </li>

          {/* Het Kerkje accordion mobiel */}
          <li>
            <button
              onClick={() => setKerkjeMobileOpen(!kerkjeMobileOpen)}
              className={cn(
                'flex items-center justify-between w-full min-h-[60px] text-base tracking-widest uppercase transition-colors',
                isKerkjeActive ? 'text-amber-400' : 'text-stone-300',
              )}
              aria-expanded={kerkjeMobileOpen}
            >
              <span>Het Kerkje</span>
              <svg
                className={cn('w-5 h-5 transition-transform duration-300', kerkjeMobileOpen && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={cn('overflow-hidden transition-all duration-300', kerkjeMobileOpen ? 'max-h-[400px] pb-2' : 'max-h-0')}>
              <ul className="pl-4 border-l border-amber-800/40">
                {kerkjeLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center min-h-[52px] pl-3 text-sm tracking-wide transition-colors',
                        pathname === link.href ? 'text-amber-400' : 'text-stone-400',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {navLinks.filter(l => l.href !== '/contact').map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center min-h-[60px] text-base tracking-widest uppercase transition-colors',
                  pathname === link.href ? 'text-amber-400' : 'text-stone-300',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="pt-6">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full border border-amber-600 text-amber-400 min-h-[56px] text-sm tracking-[0.2em] uppercase"
            >
              Reserveer de locatie
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
