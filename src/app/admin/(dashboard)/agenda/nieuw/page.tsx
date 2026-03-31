'use client'

import { useRouter } from 'next/navigation'
import { createAgendaItem } from '@/actions/agenda'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NieuwEvenementPage() {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await createAgendaItem(formData)
    router.push('/admin/agenda')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Nieuw evenement</h1>
        <p className="text-gray-500 text-sm mt-1">Vul de gegevens in voor het nieuwe evenement.</p>
      </div>

      <form action={handleSubmit} className="bg-white border border-gray-100 p-6 space-y-5">
        <div>
          <label htmlFor="n-title" className="block text-sm font-medium text-gray-700 mb-1">
            Titel <span className="text-red-500">*</span>
          </label>
          <input
            id="n-title"
            name="title"
            type="text"
            required
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            placeholder="Naam van het evenement"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label htmlFor="n-date" className="block text-sm font-medium text-gray-700 mb-1">
              Datum <span className="text-red-500">*</span>
            </label>
            <input
              id="n-date"
              name="date"
              type="date"
              required
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="n-time-start" className="block text-sm font-medium text-gray-700 mb-1">Begintijd</label>
            <input
              id="n-time-start"
              name="timeStart"
              type="time"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label htmlFor="n-time-end" className="block text-sm font-medium text-gray-700 mb-1">Eindtijd</label>
            <input
              id="n-time-end"
              name="timeEnd"
              type="time"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="n-location" className="block text-sm font-medium text-gray-700 mb-1">Locatie</label>
          <input
            id="n-location"
            name="location"
            type="text"
            defaultValue="Het Alems Kerkje, Sint Odradastraat 12, Alem"
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label htmlFor="n-description" className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
          <textarea
            id="n-description"
            name="description"
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            placeholder="Omschrijving van het evenement..."
          />
        </div>

        <ImageUpload name="image" label="Afbeelding" />

        <div className="flex items-center gap-3">
          <input
            id="n-published"
            name="published"
            type="checkbox"
            value="true"
            className="h-4 w-4 text-amber-600 border-gray-300"
          />
          <label htmlFor="n-published" className="text-sm text-gray-700">
            Direct publiceren
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 text-sm transition-colors"
          >
            Evenement opslaan
          </button>
          <a
            href="/admin/agenda"
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 text-sm transition-colors"
          >
            Annuleren
          </a>
        </div>
      </form>
    </div>
  )
}
