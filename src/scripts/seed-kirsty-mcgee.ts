/**
 * Seed-script: voegt het Kirsty McGee concert toe aan de agenda.
 * Gebruik: npm run seed:kirsty
 *
 * Vereiste: DATABASE_URL is ingesteld in .env.local
 */

import { db } from '../db'
import { agendaItems } from '../db/schema'
import { eq } from 'drizzle-orm'

const EVENT_SLUG = 'kirsty-mcgee'

const kirstyMcGee = {
  slug: EVENT_SLUG,
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
  category: 'concert',
  videoUrl: 'https://youtu.be/GUuG1OMTRUg',
  videoType: 'youtube' as const,
  ticketUrl:
    'https://stichting-het-alems-kerkje.weticket.io/concert-britse-singer-songwriter-kirsty-mcgee',
  published: true,
  featured: true,
}

async function seed() {
  console.log('🌱 Seed Kirsty McGee gestart...')

  const existing = await db.query.agendaItems.findFirst({
    where: eq(agendaItems.slug, EVENT_SLUG),
  })

  if (existing) {
    console.log(`ℹ️  Evenement bestaat al (slug: ${EVENT_SLUG})`)
    console.log('   Bijwerken met nieuwe gegevens...')
    await db
      .update(agendaItems)
      .set({ ...kirstyMcGee, updatedAt: new Date() })
      .where(eq(agendaItems.slug, EVENT_SLUG))
    console.log('✅ Evenement bijgewerkt.')
  } else {
    await db.insert(agendaItems).values(kirstyMcGee)
    console.log('✅ Kirsty McGee concert toegevoegd aan de agenda:')
    console.log(`   Titel:  ${kirstyMcGee.title}`)
    console.log(`   Datum:  12 april 2026, ${kirstyMcGee.timeStart} – ${kirstyMcGee.timeEnd}`)
    console.log(`   Video:  ${kirstyMcGee.videoUrl}`)
    console.log(`   Slug:   /agenda/${EVENT_SLUG}`)
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed mislukt:', err)
  process.exit(1)
})
