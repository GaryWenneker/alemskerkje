import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Het Alems Kerkje',
    template: '%s | Het Alems Kerkje',
  },
  description:
    'Een historische locatie in Alem voor uw bijzondere moment. Huwelijken, concerten, tentoonstellingen, cursussen en meer. Gebouwd in 1719.',
  keywords: ['Alems Kerkje', 'Alem', 'evenementenlocatie', 'huwelijk', 'concert', 'Maasdriel'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'Het Alems Kerkje',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#0c0a09] text-stone-100">
        {children}
      </body>
    </html>
  )
}
