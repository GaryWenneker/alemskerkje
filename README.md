# alemskerkje

Next.js 15 · Neon PostgreSQL · Drizzle ORM · Tailwind CSS · Netlify

---

## Tech stack

| Laag | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Taal | TypeScript (strict) |
| Styling | Tailwind CSS |
| Database | Neon (serverless PostgreSQL) |
| ORM + Migraties | Drizzle ORM + drizzle-kit |
| Hosting | Netlify |

---

## Lokaal opstarten

### 1. Installeer dependencies

```bash
npm install
```

### 2. Maak een Neon database aan

1. Ga naar [neon.tech](https://neon.tech) en maak een account aan
2. Maak een nieuw project aan
3. Kopieer de **connection string** uit het dashboard

### 3. Stel de environment variabelen in

```bash
cp .env.example .env.local
```

Vul je Neon connection string in `.env.local`:

```env
DATABASE_URL="postgresql://user:password@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require"
```

### 4. Voer de database-migraties uit

```bash
npm run db:migrate
```

### 5. Start de development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## Database workflow (Drizzle)

### Schema aanpassen

Bewerk `src/db/schema.ts` en voer daarna uit:

```bash
# Stap 1: Genereer een migratiebestand
npm run db:generate

# Stap 2: Bekijk het gegenereerde bestand in src/db/migrations/

# Stap 3: Voer de migratie uit
npm run db:migrate
```

Commit altijd **zowel** het schema als het migratiebestand.

### Drizzle Studio (visuele database browser)

```bash
npm run db:studio
```

Open [https://local.drizzle.studio](https://local.drizzle.studio) om je data te bekijken en bewerken.

### Push (development shortcut)

Wil je schema-wijzigingen snel testen zonder migratiehis­torie?

```bash
npm run db:push
```

> Gebruik `db:push` alleen lokaal of in een wegwerp-database. In productie altijd `db:generate` + `db:migrate`.

---

## Beschikbare scripts

| Script | Wat het doet |
|---|---|
| `npm run dev` | Start development server op poort 3000 |
| `npm run build` | Productie-build |
| `npm run start` | Start productie-server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Genereer migratie vanuit schema |
| `npm run db:migrate` | Voer openstaande migraties uit |
| `npm run db:push` | Push schema direct naar database |
| `npm run db:studio` | Start Drizzle Studio |

---

## Deployen naar Netlify

### Eerste keer

1. Push je code naar GitHub
2. Log in op [netlify.com](https://netlify.com)
3. Klik op **Add new site > Import an existing project**
4. Selecteer je GitHub-repository
5. Build settings worden automatisch ingelezen uit `netlify.toml`
6. Ga naar **Site configuration > Environment variables**
7. Voeg `DATABASE_URL` toe met je Neon connection string

### Daarna

Elke push naar `main` triggert een automatische deploy.

### Netlify CLI (optioneel)

```bash
# Installeer de Netlify CLI
npm install -g netlify-cli

# Koppel aan je Netlify-site
netlify link

# Stel een environment variabele in
netlify env:set DATABASE_URL "postgresql://..."

# Bekijk alle environment variabelen
netlify env:list

# Deploy handmatig
netlify deploy --prod
```

---

## Projectstructuur

```
alemskerkje/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout
│   │   ├── page.tsx            ← Homepage
│   │   └── globals.css         ← Tailwind imports + CSS variabelen
│   └── db/
│       ├── index.ts            ← Neon + Drizzle instantie
│       ├── schema.ts           ← Database schema (bron van waarheid)
│       └── migrations/         ← Gegenereerde migraties (commit deze!)
├── .cursor/
│   └── rules/
│       ├── project-config.mdc  ← AI-configuratie voor dit project
│       └── common/
│           └── project-specifics.mdc  ← Projectspecifieke AI-regels
├── .env.example                ← Voorbeeld environment variabelen
├── .gitignore
├── drizzle.config.ts           ← Drizzle-kit configuratie
├── netlify.toml                ← Netlify deploy-configuratie
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Neon tips

- Gebruik de **connection pooler** URL voor productie-omgevingen (eindigt op `-pooler.neon.tech`)
- Gebruik de **directe** connection string voor migraties
- Neon pauzeert je database na inactiviteit op het gratis plan — de eerste query na een pauze duurt iets langer
- Maak verschillende **branches** aan in Neon voor development vs. productie

### Connection strings

```env
# Development (directe verbinding, goed voor migraties)
DATABASE_URL="postgresql://user:pass@ep-xxxx.eu-west-2.aws.neon.tech/neondb?sslmode=require"

# Productie (connection pooler, beter voor serverless)
DATABASE_URL="postgresql://user:pass@ep-xxxx-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"
```

---

## AI-gebruik in dit project

Dit project bevat `.cursor/rules/` configuratie voor AI-assistentie in Cursor.

De regels zorgen ervoor dat de AI:
- De juiste Drizzle-patronen gebruikt
- Nooit `DATABASE_URL` buiten `src/db/index.ts` aanroept
- Mobile-first Tailwind-classes schrijft
- TypeScript strict mode respecteert
- Migraties altijd via drizzle-kit genereert (nooit handmatig SQL)

Zie `.cursor/rules/common/project-specifics.mdc` voor de volledige regels.
