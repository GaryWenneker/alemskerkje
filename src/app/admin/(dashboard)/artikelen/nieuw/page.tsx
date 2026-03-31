'use client'

import { useRouter } from 'next/navigation'
import { createArticle } from '@/actions/articles'
import ImageUpload from '@/components/admin/ImageUpload'

const CATEGORIES = [
  { value: 'nieuws', label: 'Nieuws' },
  { value: 'verhaal', label: 'Verhaal' },
  { value: 'aankondiging', label: 'Aankondiging' },
]

export default function NieuwArtikelPage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await createArticle(formData)
    router.push('/admin/artikelen')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Nieuw artikel</h1>
        <p className="text-gray-500 text-sm mt-1">Schrijf een nieuw artikel of aankondiging.</p>
      </div>

      <form action={handleSubmit} className="bg-white border border-gray-100 p-6 space-y-5">
        <div>
          <label htmlFor="a-title" className="block text-sm font-medium text-gray-700 mb-1">
            Titel <span className="text-red-500">*</span>
          </label>
          <input
            id="a-title"
            name="title"
            type="text"
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            placeholder="Titel van het artikel"
          />
        </div>

        <div>
          <label htmlFor="a-category" className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
          <select
            id="a-category"
            name="category"
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
          <label htmlFor="a-excerpt" className="block text-sm font-medium text-gray-700 mb-1">Samenvatting</label>
          <textarea
            id="a-excerpt"
            name="excerpt"
            rows={2}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            placeholder="Korte samenvatting (optioneel)"
          />
        </div>

        <div>
          <label htmlFor="a-content" className="block text-sm font-medium text-gray-700 mb-1">
            Inhoud <span className="text-red-500">*</span>
          </label>
          <textarea
            id="a-content"
            name="content"
            rows={10}
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 font-mono"
            placeholder="Schrijf hier de inhoud van het artikel..."
          />
        </div>

        <ImageUpload name="image" label="Uitgelichte afbeelding" />

        <div className="flex items-center gap-3">
          <input
            id="a-published"
            name="published"
            type="checkbox"
            value="true"
            className="h-4 w-4 text-amber-600 border-gray-300"
          />
          <label htmlFor="a-published" className="text-sm text-gray-700">
            Direct publiceren
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 text-sm transition-colors"
          >
            Artikel opslaan
          </button>
          <a
            href="/admin/artikelen"
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 text-sm transition-colors"
          >
            Annuleren
          </a>
        </div>
      </form>
    </div>
  )
}
