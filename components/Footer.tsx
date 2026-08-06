'use client'
import { motion } from 'framer-motion'

const SOCIAL = [
  { href: '#', icon: '𝕏', label: 'Twitter' },
  { href: '#', icon: '📘', label: 'Facebook' },
  { href: '#', icon: '📷', label: 'Instagram' },
  { href: '#', icon: '💼', label: 'LinkedIn' },
]

const COLS = [
  {
    title: 'Platform',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Live Tracking', href: '#tracking' },
      { label: 'Driver Safety', href: '#safety' },
      { label: 'For Schools', href: '#for-schools' },
      { label: 'For Parents', href: '#for-parents' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Tranzita', href: '#' },
      { label: 'Our Fleet', href: '#nigeria-fleet' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Request Demo', href: '#demo' },
      { label: 'WhatsApp Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Safety Policy', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#F2F5F0', borderTop: '1px solid #E0EAE0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <img src="/logo.png" alt="Tranzita" className="h-9 w-auto object-contain" />
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#6B7F6B' }}>
            Nigeria&apos;s first dedicated school pickup &amp; drop-off platform. Made and coupled in Nigeria, for every Nigerian child.
          </p>
          <div className="flex gap-3">
            {SOCIAL.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                style={{ background: '#E0EAE0', color: '#2C3A2C' }}
                whileHover={{ scale: 1.15, background: '#E8601C', color: 'white' }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
          <div className="mt-6 text-sm space-y-1" style={{ color: '#6B7F6B' }}>
            <p>📧 booking@transzita.africa</p>
            <p>📍 Lagos · Abuja · Port Harcourt</p>
          </div>
        </div>

        {/* Link columns */}
        {COLS.map((col, i) => (
          <div key={i}>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#8FA88F' }}>
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#6B7F6B' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8601C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6B7F6B')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #E0EAE0' }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: '#8FA88F' }}>
          <span>© 2026 Tranzita Nigeria. All rights reserved.</span>
          <span>Made &amp; Coupled In Nigeria 🇳🇬</span>
        </div>
      </div>
    </footer>
  )
}
