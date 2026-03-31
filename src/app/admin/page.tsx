import { db } from '@/db'
import { articles, agendaItems, users, contactMessages } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import Link from 'next/link'

async function getStats() {
  const [articleCount] = await db.select({ count: count() }).from(articles)
  const [publishedArticles] = await db.select({ count: count() }).from(articles).where(eq(articles.published, true))
  const [eventCount] = await db.select({ count: count() }).from(agendaItems)
  const [userCount] = await db.select({ count: count() }).from(users)
  const [unreadMessages] = await db.select({ count: count() }).from(contactMessages).where(eq(contactMessages.isRead, false))

  return {
    articles: articleCount.count,
    publishedArticles: publishedArticles.count,
    events: eventCount.count,
    users: userCount.count,
    unreadMessages: unreadMessages.count,
  }
}

async function getRecentMessages() {
  return db.query.contactMessages.findMany({
    where: eq(contactMessages.isRead, false),
    orderBy: (m, { desc }) => [desc(m.createdAt)],
    limit: 5,
  })
}

export default async function AdminDashboard() {
  const [stats, messages] = await Promise.all([getStats(), getRecentMessages()])

  const statCards = [
    { label: 'Artikelen', value: stats.articles, sub: `${stats.publishedArticles} gepubliceerd`, href: '/admin/artikelen', color: 'border-blue-200' },
    { label: 'Agenda', value: stats.events, sub: 'evenementen', href: '/admin/agenda', color: 'border-green-200' },
    { label: 'Gebruikers', value: stats.users, sub: 'actieve beheerders', href: '/admin/gebruikers', color: 'border-purple-200' },
    { label: 'Ongelezen', value: stats.unreadMessages, sub: 'contactberichten', href: '/admin/berichten', color: 'border-amber-200' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overzicht van het beheer</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-white border-l-4 ${card.color} border border-gray-100 p-5 hover:shadow-sm transition-shadow`}
          >
            <p className="text-3xl font-serif text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Snelle acties */}
      <div>
        <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3">Snelle acties</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/artikelen/nieuw" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm transition-colors">
            + Nieuw artikel
          </Link>
          <Link href="/admin/agenda/nieuw" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm transition-colors">
            + Nieuw evenement
          </Link>
        </div>
      </div>

      {/* Ongelezen berichten */}
      {messages.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3">
            Ongelezen contactberichten
          </h2>
          <div className="bg-white border border-gray-100 divide-y divide-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{msg.name}</p>
                    <p className="text-xs text-gray-400">{msg.email}</p>
                    {msg.subject && <p className="text-xs text-gray-500 mt-1 italic">{msg.subject}</p>}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-300 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('nl-NL')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
