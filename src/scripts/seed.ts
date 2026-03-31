/**
 * Seed-script: maakt de eerste admin-gebruiker aan.
 * Gebruik: npm run seed
 *
 * Vereiste: DATABASE_URL is ingesteld in .env.local
 */

import { db } from '../db'
import { users } from '../db/schema'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

const SEED_ADMIN = {
  name: 'Beheerder',
  email: 'admin@hetalemskerkje.nl',
  password: 'WijzigMij123!',
  role: 'admin' as const,
}

async function seed() {
  console.log('🌱 Seed gestart...')

  const existing = await db.query.users.findFirst({
    where: eq(users.email, SEED_ADMIN.email),
  })

  if (existing) {
    console.log(`ℹ️  Admin bestaat al: ${SEED_ADMIN.email}`)
    console.log('   Gebruik het admin-paneel om het wachtwoord te wijzigen.')
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash(SEED_ADMIN.password, 12)

  await db.insert(users).values({
    name: SEED_ADMIN.name,
    email: SEED_ADMIN.email,
    passwordHash,
    role: SEED_ADMIN.role,
  })

  console.log('✅ Admin aangemaakt:')
  console.log(`   E-mail:    ${SEED_ADMIN.email}`)
  console.log(`   Wachtwoord: ${SEED_ADMIN.password}`)
  console.log('')
  console.log('⚠️  WIJZIG HET WACHTWOORD na de eerste login!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed mislukt:', err)
  process.exit(1)
})
