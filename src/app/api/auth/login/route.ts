import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET ?? '')

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mailadres en wachtwoord zijn verplicht.' }, { status: 400 })
    }

    // Gebruiker opzoeken
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres of wachtwoord.' }, { status: 401 })
    }

    // Wachtwoord controleren
    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres of wachtwoord.' }, { status: 401 })
    }

    // JWT aanmaken (zelfde formaat als NextAuth)
    const token = await new SignJWT({
      sub: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 dagen
    })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(SECRET)

    // Cookie instellen
    const cookieStore = await cookies()
    cookieStore.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    return NextResponse.json({ ok: true, name: user.name, role: user.role })
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server fout. Probeer het opnieuw.' }, { status: 500 })
  }
}
