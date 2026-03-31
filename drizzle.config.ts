import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// drizzle-kit laadt standaard .env — niet .env.local (Next.js conventie).
// Dit zorgt dat DATABASE_URL beschikbaar is bij db:generate / db:migrate.
config({ path: '.env.local' })

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
