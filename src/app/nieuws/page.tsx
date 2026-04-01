export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nieuws',
  description: 'Lees het laatste nieuws en verhalen van Het Alems Kerkje.',
}

async function getArticles() {
  try {
    return await db.query.articles.findMany({
      where: eq(articles.published, true),
      orderBy: [desc(articles.publishedAt)],
      with: { author: true },
    })
  } catch {
    return []
  }
}

export default async function NieuwsPage() {
  const posts = await getArticles()

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-stone-950 pt-40 pb-24 px-6 overflow-hidden border-b border-stone-800/50">
        <div className="absolute inset-0">
          <Image
            src="/images/alem-sint-odradastraat.jpg"
            alt="Sint Odradastraat in Alem, gemeente Maasdriel"
            fill
            priority
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/75 to-stone-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="section-label">Verhalen &amp; aankondigingen</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white">Nieuws</h1>
          <p className="text-stone-400 mt-4 max-w-xl leading-relaxed">
            Het laatste nieuws en achtergrondverhalen van Het Alems Kerkje.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-24 border border-stone-800">
              <p className="text-stone-500">Nog geen berichten gepubliceerd.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="card-dark group overflow-hidden">
                  {post.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-xs tracking-widest uppercase text-amber-500">
                          {post.category}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-stone-600 text-xs">
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-lg text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
