import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'

// Tijdelijke debug route — verwijder dit na het oplossen van het login probleem
export async function GET() {
  try {
    const userCount = await db.select().from(users)
    return NextResponse.json({
      ok: true,
      userCount: userCount.length,
      hasAdminUser: userCount.some(u => u.email === 'admin@hetalemskerkje.nl'),
      dbUrl: process.env.DATABASE_URL
        ? `...${process.env.DATABASE_URL.slice(-20)}`
        : 'NOT SET',
      authSecret: process.env.AUTH_SECRET ? 'SET' : 'NOT SET',
      authUrl: process.env.AUTH_URL ?? 'NOT SET',
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      dbUrl: process.env.DATABASE_URL
        ? `...${process.env.DATABASE_URL.slice(-20)}`
        : 'NOT SET',
    }, { status: 500 })
  }
}
