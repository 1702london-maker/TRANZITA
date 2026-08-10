'use client'

import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export function SectionIntro({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      className="mx-auto max-w-4xl text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={fadeUp}
    >
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{label}</p>
      <h2 className="headline-balance mt-3 text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }}>{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed" style={{ color: '#65785F' }}>{subtitle}</p>}
    </motion.div>
  )
}

export function LiftCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-[28px] bg-white p-7 shadow-sm ${className}`}
      style={{ border: '1px solid #DDE9D2' }}
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 22px 60px rgba(217,107,31,0.16)' }}
    >
      {children}
    </motion.div>
  )
}
