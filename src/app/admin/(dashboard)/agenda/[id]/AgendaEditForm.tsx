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
        <label htmlFor="e-description" className="block text-sm font-medium text-gray-700 mb-1">Korte beschrijving (inleiding)</label>
        <textarea
          id="e-description"
          name="description"
          rows={3}
          defaultValue={event.description ?? ''}
          className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label htmlFor="e-content" className="block text-sm font-medium text-gray-700 mb-1">Volledige tekst (HTML)</label>
        <textarea
          id="e-content"
          name="content"
          rows={8}
          defaultValue={event.content ?? ''}
          className="w-full border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-amber-500"
          placeholder="<p>Tekst...</p>"
        />
      </div>

      <ImageUpload name="image" label="Afbeelding" currentUrl={event.imageUrl} />

      <div className="border-t border-gray-100 pt-4 space-y-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Video</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label htmlFor="e-video-url" className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              id="e-video-url"
              name="videoUrl"
              type="url"
              defaultValue={event.videoUrl ?? ''}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label htmlFor="e-video-type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="e-video-type"
              name="videoType"
              defaultValue={event.videoType ?? ''}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="">— kies —</option>
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="direct">Direct (MP4)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kaarten & overig</p>
        <div>
          <label htmlFor="e-ticket-url" className="block text-sm font-medium text-gray-700 mb-1">Ticket URL</label>
          <input
            id="e-ticket-url"
            name="ticketUrl"
            type="url"
            defaultValue={event.ticketUrl ?? ''}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            placeholder="https://weticket.io/..."
          />
        </div>
        <div>
          <label htmlFor="e-slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL-naam)</label>
          <input
            id="e-slug"
            name="slug"
            type="text"
            defaultValue={event.slug ?? ''}
            className="w-full border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-amber-500"
            placeholder="bijv. kirsty-mcgee-12-april"
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex items-center gap-6">
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
        <div className="flex items-center gap-3">
          <input
            id="e-featured"
            name="featured"
            type="checkbox"
            value="true"
            defaultChecked={event.featured}
            className="h-4 w-4 text-amber-600 border-gray-300"
          />
          <label htmlFor="e-featured" className="text-sm text-gray-700">
            Uitgelicht (homepage hero)
          </label>
        </div>
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
