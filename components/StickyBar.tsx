'use client'

import { motion } from 'framer-motion'
import { TRUST_BADGES } from '@/lib/constants'

export default function StickyBar() {
  const badges = TRUST_BADGES.filter((badge) => badge !== 'Partner With Us')
  const marqueeBadges = [...badges, ...badges]

  return (
    <motion.div
      className="trz-top-bar trz-top-gradient fixed left-0 right-0 top-0 overflow-hidden"
      initial={{ y: -38 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative flex h-full items-center overflow-hidden">
        <div className="marquee-track">
          {marqueeBadges.map((badge, i) => (
            <span
              key={`${badge}-${i}`}
              className="trz-muted-on-dark flex whitespace-nowrap px-5 text-xs font-semibold lg:px-7"
            >
              <span className="trz-warm-gold mr-1.5 font-bold">✓</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
