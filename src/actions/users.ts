'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'

async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error('Niet ingelogd')
  const role = (session.user as { role?: string })?.role
  if (role !== 'admin') throw new Error('Geen admin-rechten')
  return session
}

export async function createUser(formData: FormData) {
  await requireAdmin()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!name || !email || !password) throw new Error('Naam, e-mail en wachtwoord zijn verplicht')
  if (!['admin', 'editor', 'viewer'].includes(role)) throw new Error('Ongeldige rol')

  const passwordHash = await bcrypt.hash(password, 12)

  await db.insert(users).values({ name, email, passwordHash, role })

  revalidatePath('/admin/gebruikers')
}

export async function updateUser(id: number, formData: FormData) {
  const session = await requireAdmin()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const role = formData.get('role') as string
  const newPassword = formData.get('password') as string | null

  if (!['admin', 'editor', 'viewer'].includes(role)) throw new Error('Ongeldige rol')

  const updateData: Partial<typeof users.$inferInsert> = {
    name,
    email,
    role,
    updatedAt: new Date(),
  }

  if (newPassword && newPassword.length >= 8) {
    updateData.passwordHash = await bcrypt.hash(newPassword, 12)
  }

  await db.update(users).set(updateData).where(eq(users.id, id))

  revalidatePath('/admin/gebruikers')
}

export async function deleteUser(id: number) {
  const session = await requireAdmin()

  if (String(id) === session.user?.id) throw new Error('U kunt uw eigen account niet verwijderen')

  await db.delete(users).where(eq(users.id, id))

  revalidatePath('/admin/gebruikers')
}

export async function toggleUserActive(id: number, isActive: boolean) {
  const session = await requireAdmin()

  if (String(id) === session.user?.id) throw new Error('U kunt uw eigen account niet deactiveren')

  await db.update(users).set({ isActive, updatedAt: new Date() }).where(eq(users.id, id))

  revalidatePath('/admin/gebruikers')
}
