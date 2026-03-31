'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    })

    if (result?.error) {
      setError('Ongeldig e-mailadres of wachtwoord.')
    } else {
      router.push('/admin')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-500 mb-1">Beheer</p>
          <h1 className="font-serif text-3xl text-white">Het Alems Kerkje</h1>
        </div>

        {/* Form */}
        <div className="bg-stone-900 border border-stone-800 p-8">
          <h2 className="text-stone-300 text-sm tracking-wide mb-6">Inloggen</h2>

          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-xs px-4 py-3 mb-5 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                Wachtwoord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-stone-800 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white py-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors mt-2"
            >
              {loading ? 'Even wachten…' : 'Inloggen'}
            </button>
          </form>
        </div>

        <p className="text-center text-stone-700 text-xs mt-6">
          Geen toegang? Neem contact op met de beheerder.
        </p>
      </div>
    </div>
  )
}
