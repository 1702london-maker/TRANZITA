'use client'
import { motion } from 'framer-motion'

const PORTALS = [
  { key: 'SCHOOLS', icon: '🏫', href: '#demo' },
  { key: 'PARENTS', icon: '👨‍👩‍👧', href: '#demo' },
  { key: 'DRIVERS', icon: '🚌', href: '#demo' },
  { key: 'COPILOT', icon: '👤', href: '#demo' },
  { key: 'NURSE', icon: '🩺', href: '#demo' },
]

export default function BottomPortalBar() {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center" style={{ zIndex: 9999, pointerEvents: 'none' }}>
      <motion.div
        style={{
          pointerEvents: 'auto',
          background: '#1E2B1E',
          borderRadius: 999,
          boxShadow: '0 8px 40px rgba(44,58,44,0.28)',
          border: '1px solid rgba(255,255,255,0.10)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      >
        {PORTALS.map((p, i) => (
          <motion.a
            key={i}
            href={p.href}
            className="flex flex-col items-center gap-0.5 rounded-full transition-all"
            style={{
              color: 'rgba(255,255,255,0.55)',
              minWidth: 60,
              padding: '8px 10px',
            }}
            whileHover={{ color: '#E8601C', background: 'rgba(232,96,28,0.12)' }}
            whileTap={{ scale: 0.93 }}
          >
            <span className="text-lg leading-none">{p.icon}</span>
            <span className="text-[9px] font-bold tracking-widest whitespace-nowrap mt-0.5" style={{ letterSpacing: '0.08em' }}>
              {p.key}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
