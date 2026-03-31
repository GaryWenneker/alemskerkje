import { notFound } from 'next/navigation'
import { db } from '@/db'
import { articles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ArtikelEditForm from './ArtikelEditForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ArtikelEditPage({ params }: Props) {
  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) notFound()

  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, numId))

  if (!article) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Artikel bewerken</h1>
        <p className="text-gray-500 text-sm mt-1">{article.title}</p>
      </div>
      <ArtikelEditForm article={article} />
    </div>
  )
}
