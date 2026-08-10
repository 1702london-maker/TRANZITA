import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tranzita.africa'),
  title: {
    default: 'Tranzita - Every Child. On Time. Safe Home.',
    template: '%s | Tranzita',
  },
  description: "Nigeria's dedicated school pickup and drop-off platform for safer school journeys.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Tranzita - Every Child. On Time. Safe Home.',
    description: "Nigeria's dedicated school pickup and drop-off platform for safer school journeys.",
    url: 'https://www.tranzita.africa',
    siteName: 'Tranzita',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tranzita - Every Child. On Time. Safe Home.',
    description: "Nigeria's dedicated school pickup and drop-off platform for safer school journeys.",
  },
  icons: {
    icon: '/logo-transparent.png',
    apple: '/logo-transparent.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={plusJakarta.className}>{children}</body>
    </html>
  )
}
