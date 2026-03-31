import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { db } from '@/db'
import { contactMessages } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met Het Alems Kerkje voor informatie of een reserveringsaanvraag.',
}

async function sendMessage(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) return

  await db.insert(contactMessages).values({ name, email, subject, message })
  revalidatePath('/contact')
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-stone-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Bereik ons</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">Contact</h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contactgegevens */}
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-white mb-6">Bezoekadres</h2>
              <address className="not-italic space-y-1 text-stone-400">
                <p className="text-stone-200 font-medium">Het Alems Kerkje</p>
                <p>Sint Odradastraat 12</p>
                <p>5335LL Alem</p>
                <p>Gemeente Maasdriel, Gelderland</p>
              </address>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-white mb-4">Organisatie</h2>
              <dl className="space-y-2 text-sm text-stone-400">
                <div className="flex gap-4">
                  <dt className="text-stone-600 w-16 flex-shrink-0">KVK</dt>
                  <dd>90498410</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-stone-600 w-16 flex-shrink-0">RSIN</dt>
                  <dd>865336854</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="text-stone-600 w-16 flex-shrink-0">Bank</dt>
                  <dd>NL81 RABO 0368 0835 27</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-white mb-4">Stuur ons een e-mail</h2>
              <a
                href="mailto:info@hetalemskerkje.nl"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                info@hetalemskerkje.nl
              </a>
            </div>
          </div>

          {/* Contactformulier */}
          <div>
            <h2 className="font-serif text-2xl text-white mb-6">Stuur een bericht</h2>
            <form action={sendMessage} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                    Naam *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Uw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="uw@email.nl"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                  Onderwerp
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors"
                  placeholder="bijv. Aanvraag huwelijksceremonie"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase text-stone-500 mb-2">
                  Bericht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-stone-100 px-4 py-3 text-sm outline-none transition-colors resize-none"
                  placeholder="Vertel ons meer over uw wensen en evenement..."
                />
              </div>

              <button type="submit" className="btn-gold w-full sm:w-auto">
                Bericht verzenden
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
