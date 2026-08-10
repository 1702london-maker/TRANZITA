'use client'
import { motion } from 'framer-motion'
import { BusFront, GraduationCap, Handshake, HeartPulse, School, Users } from 'lucide-react'

const PORTALS = [
  { key: 'SCHOOLS', Icon: School, href: '/school-portal' },
  { key: 'PARENTS', Icon: Users, href: '/parent-portal' },
  { key: 'DRIVERS', Icon: BusFront, href: '/driver-portal' },
  { key: 'COPILOT', Icon: GraduationCap, href: '/copilot-portal' },
  { key: 'NURSE', Icon: HeartPulse, href: '/nurse-portal' },
  { key: 'PARTNERS', Icon: Handshake, href: '/partner-portal' },
]

export default function BottomPortalBar({ activePortal }: { activePortal?: string }) {
  const visiblePortals = activePortal ? PORTALS.filter((portal) => portal.key === activePortal) : PORTALS
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center px-3" style={{ zIndex: 9999, pointerEvents: 'none' }}>
      <motion.div
        style={{
          pointerEvents: 'auto',
          background: 'linear-gradient(90deg, #183024 0%, #1F6B46 48%, #D96B1F 100%)',
          borderRadius: 999,
          boxShadow: '0 10px 34px rgba(24,48,36,0.22)',
          border: '1px solid rgba(255,226,184,0.34)',
          padding: '7px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backdropFilter: 'blur(14px)',
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      >
        {visiblePortals.map(({ key, Icon, href }) => (
          <motion.a
            key={key}
            href={href}
            className="flex flex-col items-center gap-1 rounded-full transition-all"
            style={{
              color: 'rgba(255,255,255,0.9)',
              minWidth: activePortal ? 92 : 70,
              padding: '8px 10px',
            }}
            whileHover={{ color: '#FFE2B8', background: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.93 }}
            aria-label={key.toLowerCase()}
          >
            <Icon size={18} strokeWidth={2.4} />
            <span className="text-[9px] font-black whitespace-nowrap mt-0.5">
              {key}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  )
}
