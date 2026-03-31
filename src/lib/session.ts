import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET ?? '')

export interface AdminSession {
  id: string
  email: string
  name: string
  role: string
}

export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-session')?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, SECRET)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

export async function getSessionFromRequest(req: NextRequest): Promise<AdminSession | null> {
  try {
    const token = req.cookies.get('admin-session')?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, SECRET)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}
