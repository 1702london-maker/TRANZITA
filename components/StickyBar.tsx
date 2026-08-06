'use client'
import { motion } from 'framer-motion'
import { TRUST_BADGES } from '@/lib/constants'

export default function StickyBar() {
  const doubled = [...TRUST_BADGES, ...TRUST_BADGES]

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 overflow-hidden"
      style={{ height: 38, background: '#1E2B1E', zIndex: 9999 }}
      initial={{ y: -38 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Desktop */}
      <div className="hidden lg:flex h-full items-center justify-around px-6">
        {TRUST_BADGES.map((badge, i) => (
          <span key={i} className="text-xs font-semibold whitespace-nowrap flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ color: '#E8601C' }} className="font-bold">✓</span>
            {badge}
          </span>
        ))}
      </div>
      {/* Mobile marquee */}
      <div className="flex lg:hidden h-full items-center overflow-hidden">
        <div className="marquee-track">
          {doubled.map((badge, i) => (
            <span key={i} className="text-xs font-semibold whitespace-nowrap px-5 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
              <span style={{ color: '#E8601C' }} className="font-bold">✓</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
