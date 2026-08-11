'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en-NG">
      <body>
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#FFF9F2', color: '#183024', fontFamily: 'sans-serif' }}>
          <section style={{ maxWidth: 520, textAlign: 'center' }}>
            <p style={{ color: '#D96B1F', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tranzita</p>
            <h1 style={{ fontSize: 36, lineHeight: 1.1, margin: '12px 0' }}>Something did not load properly.</h1>
            <p style={{ color: '#65785F', lineHeight: 1.7 }}>Please refresh the page. If it continues, contact booking@tranzita.africa and the team will help.</p>
          </section>
        </main>
      </body>
    </html>
  )
}
