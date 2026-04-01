export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/db'
import { users } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { formatDate } from '@/lib/utils'
import { deleteUser, toggleUserActive } from '@/actions/users'
import { getSession } from '@/lib/session'

async function getUsers() {
  return db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
    columns: { passwordHash: false },
  })
}

const roleLabels: Record<string, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'bg-red-100 text-red-700' },
  editor: { label: 'Editor', color: 'bg-blue-100 text-blue-700' },
  viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-600' },
}

export default async function GebruikersPage() {
  const session = await getSession()
  const allUsers = await getUsers()
  const isAdmin = session?.role === 'admin'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Gebruikers</h1>
          <p className="text-gray-500 text-sm mt-1">{allUsers.length} account{allUsers.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <Link href="/admin/gebruikers/nieuw" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-sm transition-colors">
            + Nieuwe gebruiker
          </Link>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 text-sm">
          U heeft alleen-lezen toegang tot gebruikersbeheer. Neem contact op met een admin om wijzigingen te maken.
        </div>
      )}

      {/* Rollen uitleg */}
      <div className="bg-white border border-gray-100 p-5">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Rollen & rechten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500">
          <div>
            <span className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded font-medium mb-2">Admin</span>
            <p>Volledig beheer: gebruikers aanmaken, verwijderen, alle content beheren.</p>
          </div>
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium mb-2">Editor</span>
            <p>Content aanmaken en bewerken: artikelen, agenda, activiteiten.</p>
          </div>
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium mb-2">Viewer</span>
            <p>Alleen lezen. Kan inloggen en content bekijken, niet bewerken.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Naam</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">E-mail</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Aangemaakt</th>
              {isAdmin && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {allUsers.map((user) => {
              const role = roleLabels[user.role] ?? { label: user.role, color: 'bg-gray-100 text-gray-600' }
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${role.color}`}>
                      {role.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    {isAdmin ? (
                      <form action={toggleUserActive.bind(null, user.id, !user.isActive)}>
                        <button
                          type="submit"
                          className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                            user.isActive
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                        >
                          {user.isActive ? 'Actief' : 'Geblokkeerd'}
                        </button>
                      </form>
                    ) : (
                      <span className={`px-2 py-0.5 rounded text-xs ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
                        {user.isActive ? 'Actief' : 'Geblokkeerd'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                    {formatDate(user.createdAt)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/gebruikers/${user.id}`} className="text-xs text-blue-600 hover:text-blue-800">
                          Bewerken
                        </Link>
                        {String(user.id) !== session?.id && (
                          <form action={deleteUser.bind(null, user.id)}>
                            <button
                              type="submit"
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Verwijderen
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
