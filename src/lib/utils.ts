/**
 * Combineert Tailwind class-namen. Lichtgewicht vervanging voor clsx + tailwind-merge
 * om ESM/CJS module-conflicten in Next.js 15 RSC-bundels te vermijden.
 */
export type ClassValue = string | number | boolean | null | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input && input !== 0) continue
    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const inner = cn(...input)
      if (inner) classes.push(inner)
    }
  }

  // Dedupleer conflicterende Tailwind classes (laatste wint)
  const parts = classes.join(' ').split(/\s+/).filter(Boolean)
  const seen = new Map<string, string>()

  for (const cls of parts) {
    // Haal het Tailwind-prefix op (alles voor de laatste '-' of het volledige woord)
    const prefix = cls.replace(/^(.*)-[^-]+$/, '$1') || cls
    seen.set(prefix, cls)
  }

  return Array.from(seen.values()).join(' ')
}

export function formatDate(date: Date | string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: Date | string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
