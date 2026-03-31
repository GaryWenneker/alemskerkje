'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/admin/login'
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞', exact: true },
  { href: '/admin/artikelen', label: 'Artikelen', icon: '✍' },
  { href: '/admin/agenda', label: 'Agenda', icon: '📅' },
  { href: '/admin/gebruikers', label: 'Gebruikers', icon: '👥' },
  { href: '/admin/berichten', label: 'Berichten', icon: '✉' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <p className="text-xs tracking-[0.2em] uppercase text-amber-600 font-medium mb-0.5">Beheer</p>
        <p className="text-lg font-serif text-gray-900">Alems Kerkje</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors',
                    isActive
                      ? 'bg-amber-50 text-amber-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  )}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Uitloggen */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors mb-1"
        >
          ← Bekijk website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <span>⬡</span> Uitloggen
        </button>
      </div>
    </aside>
  )
}
