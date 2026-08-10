'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export function Intro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="text-center mb-14">
      <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{label}</motion.p>
      <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{title}</motion.h2>
      <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
    </div>
  )
}

export function Section({ background, label, title, text, children }: { background: string; label: string; title: string; text: string; children: React.ReactNode }) {
  return <section className="py-24 px-4" style={{ background }}><div className="max-w-6xl mx-auto"><Intro label={label} title={title} text={text} />{children}</div></section>
}

export function IconCards({ cards, columns = 'md:grid-cols-2 lg:grid-cols-3' }: { cards: Array<[string, LucideIcon, string]>; columns?: string }) {
  return (
    <div className={`grid ${columns} gap-6`}>
      {cards.map(([title, Icon, body], i) => (
        <motion.div key={title} className="gradient-frame rounded-2xl p-6" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }}>
          <Icon size={34} color="#D96B1F" className="mb-5" />
          <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{title}</h3>
          <p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
        </motion.div>
      ))}
    </div>
  )
}
