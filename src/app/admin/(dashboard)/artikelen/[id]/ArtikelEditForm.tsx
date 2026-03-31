'use client'

import { useRouter } from 'next/navigation'
import { updateArticle } from '@/actions/articles'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Article } from '@/db/schema'

interface Props {
  article: Article
}

const CATEGORIES = [
  { value: 'nieuws', label: 'Nieuws' },
  { value: 'verhaal', label: 'Verhaal' },
  { value: 'aankondiging', label: 'Aankondiging' },
]

export default function ArtikelEditForm({ article }: Props) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await updateArticle(article.id, formData)
    router.push('/admin/artikelen')
  }

  return (
    <form action={handleSubmit} className="bg-white border border-gray-100 p-6 space-y-5">
      <div>
        <label htmlFor="e-title" className="block text-sm font-medium text-gray-700 mb-1">
          Titel <span className="text-red-500">*</span>
        </label>
        <input
          id="e-title"
          name="title"
          type="text"
          required
          defaultValue={article.title}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label htmlFor="e-category" className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
        <select
          id="e-category"
          name="category"
          defaultValue={article.category ?? 'nieuws'}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="e-excerpt" className="block text-sm font-medium text-gray-700 mb-1">Samenvatting</label>
        <textarea
          id="e-excerpt"
          name="excerpt"
          rows={2}
          defaultValue={article.excerpt ?? ''}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label htmlFor="e-content" className="block text-sm font-medium text-gray-700 mb-1">
          Inhoud <span className="text-red-500">*</span>
        </label>
        <textarea
          id="e-content"
          name="content"
          rows={10}
          required
          defaultValue={article.content}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 font-mono"
        />
      </div>

      <ImageUpload name="image" label="Uitgelichte afbeelding" currentUrl={article.imageUrl} />

      <div>
        <p className="text-sm text-gray-500 mb-1">URL slug</p>
        <p className="text-sm text-gray-400 font-mono">/nieuws/{article.slug}</p>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="e-published"
          name="published"
          type="checkbox"
          value="true"
          defaultChecked={article.published}
          className="h-4 w-4 text-amber-600 border-gray-300"
        />
        <label htmlFor="e-published" className="text-sm text-gray-700">
          Gepubliceerd
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 text-sm transition-colors"
        >
          Wijzigingen opslaan
        </button>
        <a
          href="/admin/artikelen"
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 text-sm transition-colors"
        >
          Annuleren
        </a>
      </div>
    </form>
  )
}
