export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'
import { deleteArticle, togglePublished } from '@/actions/articles'

async function getArticles() {
  return db.query.articles.findMany({
    orderBy: [desc(articles.createdAt)],
    with: { author: { columns: { name: true } } },
  })
}

export default async function ArtikelenPage() {
  const posts = await getArticles()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Artikelen</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} artikel{posts.length !== 1 ? 'en' : ''}</p>
        </div>
        <Link href="/admin/artikelen/nieuw" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm transition-colors">
          + Nieuw artikel
        </Link>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Titel</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Categorie</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Auteur</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Datum</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 text-sm">
                  Nog geen artikelen. Maak uw eerste artikel aan.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">/nieuws/{post.slug}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs text-gray-500">{post.category ?? '—'}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                  {post.author?.name ?? '—'}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-4 py-3 text-center">
                  <form action={togglePublished.bind(null, post.id, !post.published)}>
                    <button
                      type="submit"
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        post.published
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {post.published ? 'Gepubliceerd' : 'Concept'}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/artikelen/${post.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                      Bewerken
                    </Link>
                    <form action={deleteArticle.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Verwijderen
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

