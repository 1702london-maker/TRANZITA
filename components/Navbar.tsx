'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#safety', label: 'Safety' },
  { href: '#for-schools', label: 'For Schools' },
  { href: '#for-parents', label: 'For Parents' },
  { href: '#nigeria-fleet', label: 'Our Fleet' },
  { href: '#demo', label: 'Contact' },
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
          background: scrolled ? 'rgba(250,250,248,0.97)' : 'rgba(250,250,248,0)',
          boxShadow: scrolled ? '0 1px 20px rgba(44,58,44,0.07)' : 'none',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo — big */}
          <a href="#" className="flex items-center">
            <img src="/logo.png" alt="Tranzita" className="w-auto object-contain" style={{ height: 48 }} />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
                style={{ color: '#1E2B1E' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — smaller */}
          <div className="hidden lg:block">
            <motion.a
              href="#demo"
              className="px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: '#E8601C' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              Request a Demo
            </motion.a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 space-y-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-0.5" style={{ background: '#1E2B1E' }} />
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
            style={{ background: '#FAFAF8', borderColor: '#E0EAE0' }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 border-b"
                  style={{ color: '#1E2B1E', borderColor: '#E0EAE0' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#demo"
                className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold text-white text-center"
                style={{ background: '#E8601C' }}
                onClick={() => setMenuOpen(false)}
              >
                Request a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
