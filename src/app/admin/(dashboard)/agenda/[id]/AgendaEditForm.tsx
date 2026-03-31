'use client'

import { useRouter } from 'next/navigation'
import { updateAgendaItem } from '@/actions/agenda'
import ImageUpload from '@/components/admin/ImageUpload'
import type { AgendaItem } from '@/db/schema'

interface Props {
  event: AgendaItem & { dateString: string }
}

export default function AgendaEditForm({ event }: Props) {
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    await updateAgendaItem(event.id, formData)
    router.push('/admin/agenda')
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
          defaultValue={event.title}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="e-date" className="block text-sm font-medium text-gray-700 mb-1">
            Datum <span className="text-red-500">*</span>
          </label>
          <input
            id="e-date"
            name="date"
            type="date"
            required
            defaultValue={event.dateString}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label htmlFor="e-time-start" className="block text-sm font-medium text-gray-700 mb-1">Begintijd</label>
          <input
            id="e-time-start"
            name="timeStart"
            type="time"
            defaultValue={event.timeStart ?? ''}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label htmlFor="e-time-end" className="block text-sm font-medium text-gray-700 mb-1">Eindtijd</label>
          <input
            id="e-time-end"
            name="timeEnd"
            type="time"
            defaultValue={event.timeEnd ?? ''}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="e-location" className="block text-sm font-medium text-gray-700 mb-1">Locatie</label>
        <input
          id="e-location"
          name="location"
          type="text"
          defaultValue={event.location ?? ''}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label htmlFor="e-description" className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
        <textarea
          id="e-description"
          name="description"
          rows={4}
          defaultValue={event.description ?? ''}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <ImageUpload name="image" label="Afbeelding" currentUrl={event.imageUrl} />

      <div className="flex items-center gap-3">
        <input
          id="e-published"
          name="published"
          type="checkbox"
          value="true"
          defaultChecked={event.published}
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
          href="/admin/agenda"
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 text-sm transition-colors"
        >
          Annuleren
        </a>
      </div>
    </form>
  )
}
