'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/safety', label: 'Safety' },
  { href: '/for-schools', label: 'For Schools' },
  { href: '/for-parents', label: 'For Parents' },
  { href: '/our-fleet', label: 'Our Fleet' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className="fixed left-0 right-0 z-[9990] transition-all duration-300"
      style={{ top: 38 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,249,242,0.94)' : 'rgba(255,240,228,0.2)',
          boxShadow: scrolled ? '0 1px 20px rgba(24,48,36,0.08)' : 'none',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo — big */}
          <a href="/" className="flex items-center">
            <Image src="/logo-transparent.png" alt="Tranzita" width={210} height={72} priority className="h-[58px] w-auto object-contain" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
                style={{ color: '#183024' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — smaller */}
          <div className="hidden lg:block">
            <motion.a
              href="/#demo"
              className="px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: '#D96B1F' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              Route Review
            </motion.a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 space-y-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-0.5" style={{ background: '#183024' }} />
            ))}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ background: '#FFF9F2', borderColor: '#DDE9D2' }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 border-b"
                  style={{ color: '#183024', borderColor: '#DDE9D2' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#demo"
                className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold text-white text-center"
                style={{ background: '#D96B1F' }}
                onClick={() => setMenuOpen(false)}
              >
                Route Review
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
