'use client'
import { motion } from 'framer-motion'
import { BusFront, GraduationCap, Handshake, HeartPulse, School, Users } from 'lucide-react'

const PORTALS = [
  { key: 'SCHOOLS', Icon: School, href: '/auth/signin?role=school&next=/dashboard/school' },
  { key: 'PARENTS', Icon: Users, href: '/auth/signin?role=parent&next=/dashboard/parent' },
  { key: 'DRIVERS', Icon: BusFront, href: '/auth/signin?role=driver&next=/dashboard/driver' },
  { key: 'COPILOT', Icon: GraduationCap, href: '/auth/signin?role=codriver&next=/dashboard/codriver' },
  { key: 'NURSE', Icon: HeartPulse, href: '/auth/signin?role=nurse&next=/dashboard/nurse' },
  { key: 'PARTNERS', Icon: Handshake, href: '/auth/signin?role=partner&next=/dashboard/partner' },
]

export default function BottomPortalBar({ activePortal }: { activePortal?: string }) {
  const visiblePortals = activePortal ? PORTALS.filter((portal) => portal.key === activePortal) : PORTALS
  return (
    <div className="trz-bottom-shell fixed bottom-4 left-0 right-0 flex justify-center px-3">
      <motion.div
        className="trz-bottom-bar trz-top-gradient"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      >
        {visiblePortals.map(({ key, Icon, href }) => (
          <motion.a
            key={key}
            href={href}
            className="trz-portal-link flex flex-col items-center gap-1 rounded-full transition-all"
            style={{
              minWidth: activePortal ? 92 : 70,
            }}
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
