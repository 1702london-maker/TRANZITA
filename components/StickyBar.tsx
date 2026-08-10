'use client'
import { motion } from 'framer-motion'
import { TRUST_BADGES } from '@/lib/constants'

export default function StickyBar() {
  const badges = TRUST_BADGES.filter((badge) => badge !== 'Partner With Us')
  const doubled = [...badges, ...badges, ...badges]

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 overflow-hidden"
      style={{
        height: 38,
        background: 'linear-gradient(90deg, #183024 0%, #1F6B46 42%, #D96B1F 100%)',
        zIndex: 9999,
        boxShadow: '0 1px 0 rgba(255,255,255,0.12) inset',
      }}
      initial={{ y: -38 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative flex h-full items-center overflow-hidden">
        <div className="marquee-track">
          {doubled.map((badge, i) => (
            <span
              key={`${badge}-${i}`}
              className="flex whitespace-nowrap px-5 text-xs font-semibold lg:px-7"
              style={{ color: 'rgba(255,255,255,0.86)' }}
            >
              <span className="mr-1.5 font-bold" style={{ color: '#FFE2B8' }}>✓</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
