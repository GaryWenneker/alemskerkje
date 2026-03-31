import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function BerichtenPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Berichten</h1>
        <p className="text-gray-500 text-sm mt-1">Contactformulier berichten</p>
      </div>
      <div className="bg-white border border-gray-100 p-12 text-center text-gray-400 text-sm">
        Nog geen berichten ontvangen.
      </div>
    </div>
  )
}
