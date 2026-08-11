'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Apple, Mail, MapPin, Play } from 'lucide-react'
import { useState } from 'react'
import { BRAND } from '@/lib/constants'

const SOCIAL = [
  {
    href: 'https://x.com/tranzitaafrica',
    label: 'X',
    viewBox: '0 0 24 24',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.969 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  },
  {
    href: 'https://facebook.com/tranzitaafrica',
    label: 'Facebook',
    viewBox: '0 0 24 24',
    path: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z',
  },
  {
    href: 'https://instagram.com/tranzitaafrica',
    label: 'Instagram',
    viewBox: '0 0 24 24',
    path: 'M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7.35A4.65 4.65 0 1 1 12 16.65 4.65 4.65 0 0 1 12 7.35Zm0 2A2.65 2.65 0 1 0 12 14.65 2.65 2.65 0 0 0 12 9.35Zm5.1-2.45a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z',
  },
  {
    href: 'https://linkedin.com/company/tranzita',
    label: 'LinkedIn',
    viewBox: '0 0 24 24',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z',
  },
]

const COLS = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Live Tracking', href: '/live-tracking' },
      { label: 'Driver Safety', href: '/safety' },
      { label: 'For Schools', href: '/for-schools' },
      { label: 'For Parents', href: '/for-parents' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Tranzita', href: '/about' },
      { label: 'Our Fleet', href: '/our-fleet' },
      { label: 'Partners', href: '/partners' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Route Review', href: '/contact#demo-form' },
      { label: 'WhatsApp Us', href: BRAND.whatsappNumber ? `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(BRAND.whatsappMessage)}` : '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Safety Policy', href: '/safety' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
]

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const realSocial = SOCIAL

  async function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNewsletterStatus('Saving your email...')
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail }),
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      setNewsletterStatus(data.error || 'Newsletter signup could not be saved right now.')
      return
    }

    setNewsletterEmail('')
    setNewsletterStatus(
      data.emailStatus === 'sent'
        ? 'Thanks. We sent a confirmation email.'
        : 'Thanks. You are on the Tranzita launch update list.',
    )
  }

  return (
    <footer style={{ background: '#F1F6EA', borderTop: '1px solid #DDE9D2' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image src="/logo-transparent.png" alt="Tranzita" width={180} height={62} className="h-12 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: '#65785F' }}>
              Safe school transport for every Nigerian child.
            </p>
            {realSocial.length > 0 && (
            <div className="flex gap-3">
              {realSocial.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#DDE9D2', color: '#213A2B' }}
                  whileHover={{ scale: 1.15, background: '#D96B1F', color: 'white' }}
                >
                  <svg width="17" height="17" viewBox={s.viewBox} fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
            )}
            <div className="mt-6 text-sm space-y-2" style={{ color: '#65785F' }}>
              <p className="flex items-center gap-2"><Mail size={15} /> booking@tranzita.africa</p>
              <p className="flex items-center gap-2"><MapPin size={15} /> Lagos, Abuja, Port Harcourt</p>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#7EA06D' }}>
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: '#65785F' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D96B1F')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#65785F')}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#7EA06D' }}>
              Newsletter
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#65785F' }}>
              Get launch updates and school transport safety notes.
            </p>
            <form className="space-y-3" onSubmit={submitNewsletter}>
              <input
                type="email"
                placeholder="Email address"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: '#FFF9F2', border: '1px solid #DDE9D2', color: '#183024' }}
              />
              <button
                type="submit"
                className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white"
                style={{ background: 'linear-gradient(90deg, #183024 0%, #1F6B46 48%, #D96B1F 100%)' }}
              >
                Subscribe
              </button>
              {newsletterStatus && <p className="text-xs font-bold" style={{ color: '#D96B1F' }}>{newsletterStatus}</p>}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span
            className="flex cursor-not-allowed items-center gap-3 rounded-2xl px-5 py-3 text-left text-white shadow-lg opacity-90"
            style={{ background: '#111111' }}
            aria-label="App Store coming soon"
            aria-disabled="true"
          >
            <Apple size={28} fill="currentColor" />
            <span>
              <span className="block text-[10px] uppercase leading-none opacity-80">Coming Soon on the</span>
              <span className="block text-lg font-bold leading-tight">App Store</span>
            </span>
          </span>
          <span
            className="flex cursor-not-allowed items-center gap-3 rounded-2xl px-5 py-3 text-left text-white shadow-lg opacity-90"
            style={{ background: '#111111' }}
            aria-label="Google Play coming soon"
            aria-disabled="true"
          >
            <Play size={27} fill="currentColor" />
            <span>
              <span className="block text-[10px] uppercase leading-none opacity-80">Coming Soon on</span>
              <span className="block text-lg font-bold leading-tight">Google Play</span>
            </span>
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #DDE9D2' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: '#7EA06D' }}>
          <span>Copyright {new Date().getFullYear()} Tranzita Nigeria.</span>
          <a
            href="/terms"
            className="transition-colors"
            style={{ color: '#7EA06D' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D96B1F')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7EA06D')}
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
