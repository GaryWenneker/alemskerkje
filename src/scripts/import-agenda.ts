/**
 * Import-script: haalt alle evenementen op van hetalemskerkje.nl
 * en zet ze in de database (slug = unieke sleutel, bestaande records worden bijgewerkt).
 *
 * Gebruik: npm run import:agenda
 */

import { db } from '../db'
import { agendaItems } from '../db/schema'
import { eq } from 'drizzle-orm'

// ─────────────────────────────────────────────────────────────────
// Gegevens opgehaald via:
// https://www.hetalemskerkje.nl/wp-json/tribe/events/v1/events?per_page=20&start_date=2026-03-01
// HTML-entities en lege descriptions zijn opgeschoond.
// ─────────────────────────────────────────────────────────────────

type EventInput = {
  slug: string
  title: string
  description?: string
  content?: string
  date: Date
  timeStart: string
  timeEnd: string
  location: string
  ticketUrl?: string
  published: boolean
  featured: boolean
}

const STANDAARD_LOCATIE = 'Het Alems Kerkje, Sint Odradastraat 12, Alem'

const events: EventInput[] = [
  // ── maart 2026 ──────────────────────────────────────────────────
  {
    slug: 'yoga-verdiepend-ellen-van-boxtel-2-maart',
    title: 'Yoga verdiepend – Ellen van Boxtel',
    date: new Date('2026-03-02T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'mannencirkel-5-maart',
    title: 'Mannencirkel',
    date: new Date('2026-03-05T19:00:00'),
    timeStart: '19:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'yoga-verdiepend-ellen-van-boxtel-6-maart',
    title: 'Yoga verdiepend – Ellen van Boxtel',
    date: new Date('2026-03-06T09:30:00'),
    timeStart: '09:30',
    timeEnd: '11:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'flow-yoga-spark-el-samen-11-maart',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-03-11T11:00:00'),
    timeStart: '11:00',
    timeEnd: '12:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'flow-yoga-spark-el-samen-17-maart',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-03-17T21:00:00'),
    timeStart: '21:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'vrouwencirkel-schaduwwerk-26-maart',
    title: 'Vrouwencirkel – Schaduwwerk',
    date: new Date('2026-03-26T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:30',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },

  // ── april 2026 ──────────────────────────────────────────────────
  {
    slug: 'jaarvergadering-erfgoedvereniging-alem',
    title: 'Jaarvergadering Erfgoedvereniging Alem',
    description:
      'Jaarvergadering voor leden van erfgoedvereniging Alem. Aansluitend is er een presentatie van Peter van Lent over archeologische vondsten in Alem.',
    content: `<p>Jaarvergadering voor leden van erfgoedvereniging Alem.</p>
<p>Aansluitend is er een presentatie van <strong>Peter van Lent</strong> over archeologische vondsten in Alem.</p>
<p><em>Aanvang: 20 uur (enkel voor leden)</em></p>`,
    date: new Date('2026-04-07T20:00:00'),
    timeStart: '20:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'flow-yoga-spark-el-samen-8-april',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-04-08T11:00:00'),
    timeStart: '11:00',
    timeEnd: '12:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'mannencirkel-9-april',
    title: 'Mannencirkel',
    date: new Date('2026-04-09T19:00:00'),
    timeStart: '19:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  // Kirsty McGee (12 april) zit al in de database via seed:kirsty — wordt hier overgeslagen
  // tenzij nog niet aanwezig.
  {
    slug: 'kirsty-mcgee',
    title: 'Optreden van de Britse singer-songwriter Kirsty McGee',
    description:
      'De Britse singer-songwriter Kirsty McGee verzorgt een bijzondere muzikale middag. ' +
      'Al meer dan twintig jaar maakt ze muziek die zich beweegt tussen folk, jazz, blues en Americana, ' +
      'met liedjes die opvallen door hun verhalende karakter en persoonlijke sfeer.',
    content: `<p>De Britse singer-songwriter <strong>Kirsty McGee</strong> verzorgt deze zondag een bijzondere muzikale middag.</p>
<p>Al meer dan twintig jaar maakt Kirsty McGee muziek die zich beweegt tussen folk, jazz, blues en Americana, met liedjes die opvallen door hun verhalende karakter en persoonlijke sfeer.</p>
<p>Met haar warme stem en subtiele begeleiding weet ze moeiteloos een zaal stil te krijgen. Juist in de kleinschalige en unieke setting van het Alems Kerkje komt die kwaliteit extra goed tot zijn recht.</p>
<blockquote><em>"Ergens tussen jazz, folk, gospel en americana bevindt zich een muziekgenre dat geen naam heeft. Met de oog voor detail van een cartograaf heeft Kirsty McGee – een eigenzinnige, rondtrekkende artiest en betoverende live-performer met een stem die wel omschreven wordt als een mix van rook en fluweel – de afgelopen vijftien jaar en zeven albums besteed aan het in kaart brengen van dit genre en het traceren van de gemeenschappelijke oorsprong van muziek."</em></blockquote>`,
    date: new Date('2026-04-12T15:00:00'),
    timeStart: '15:00',
    timeEnd: '17:00',
    location: 'Het Alems Kerkje, Sint Odradastraat 12, 5335LL Alem',
    ticketUrl: 'https://stichting-het-alems-kerkje.weticket.io/concert-britse-singer-songwriter-kirsty-mcgee',
    published: true,
    featured: true,
  },
  {
    slug: 'yoga-verdiepend-ellen-van-boxtel-13-april',
    title: 'Yoga verdiepend – Ellen van Boxtel',
    date: new Date('2026-04-13T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'gemeente-zaltbommel-besloten',
    title: 'Gemeente Zaltbommel – besloten',
    date: new Date('2026-04-20T09:00:00'),
    timeStart: '09:00',
    timeEnd: '17:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'flow-yoga-spark-el-samen-21-april',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-04-21T21:00:00'),
    timeStart: '21:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'verdiepende-xl-les-spark-el-samen',
    title: 'Verdiepende XL les – Spark-el Samen',
    date: new Date('2026-04-30T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:30',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },

  // ── mei 2026 ────────────────────────────────────────────────────
  {
    slug: 'flow-yoga-spark-el-samen-6-mei',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-05-06T11:00:00'),
    timeStart: '11:00',
    timeEnd: '12:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'mannencirkel-7-mei',
    title: 'Mannencirkel',
    date: new Date('2026-05-07T19:00:00'),
    timeStart: '19:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'open-cirkel-schaduwwerk-11-mei',
    title: 'Open cirkel – Schaduwwerk',
    date: new Date('2026-05-11T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'vrouwencirkel-innerlijk-kompas-14-mei',
    title: 'Vrouwencirkel – Innerlijk kompas',
    date: new Date('2026-05-14T19:30:00'),
    timeStart: '19:30',
    timeEnd: '21:30',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'flow-yoga-spark-el-samen-26-mei',
    title: 'Flow yoga – Spark-el Samen',
    date: new Date('2026-05-26T21:00:00'),
    timeStart: '21:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
  {
    slug: 'de-vuursmederij-mannencirkel-28-mei',
    title: 'De Vuursmederij – Mannencirkel',
    date: new Date('2026-05-28T19:00:00'),
    timeStart: '19:00',
    timeEnd: '22:00',
    location: STANDAARD_LOCATIE,
    published: true,
    featured: false,
  },
]

async function importAgenda() {
  console.log(`🗓️  Import agenda gestart — ${events.length} evenementen verwerken...`)
  console.log()

  let inserted = 0
  let updated = 0
  let skipped = 0

  for (const event of events) {
    const existing = await db.query.agendaItems.findFirst({
      where: eq(agendaItems.slug, event.slug),
    })

    if (existing) {
      // Kirsty McGee heeft videoUrl in de DB — behoud die bij update
      const updateData = {
        title: event.title,
        description: event.description ?? existing.description,
        content: event.content ?? existing.content,
        date: event.date,
        timeStart: event.timeStart,
        timeEnd: event.timeEnd,
        location: event.location,
        ticketUrl: event.ticketUrl ?? existing.ticketUrl,
        published: event.published,
        featured: event.featured,
        updatedAt: new Date(),
      }
      await db.update(agendaItems).set(updateData).where(eq(agendaItems.slug, event.slug))
      console.log(`  ✏️  Bijgewerkt: ${event.title} (${event.date.toLocaleDateString('nl-NL')})`)
      updated++
    } else {
      await db.insert(agendaItems).values({
        ...event,
        videoUrl: null,
        videoType: null,
      })
      console.log(`  ✅ Ingevoegd:  ${event.title} (${event.date.toLocaleDateString('nl-NL')})`)
      inserted++
    }
  }

  console.log()
  console.log(`─────────────────────────────────────────`)
  console.log(`✅ Import klaar`)
  console.log(`   Ingevoegd: ${inserted}`)
  console.log(`   Bijgewerkt: ${updated}`)
  console.log(`   Overgeslagen: ${skipped}`)
  console.log(`─────────────────────────────────────────`)

  process.exit(0)
}

importAgenda().catch((err) => {
  console.error('❌ Import mislukt:', err)
  process.exit(1)
})
