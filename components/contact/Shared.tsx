'use client'

import { motion } from 'framer-motion'

export const email = 'booking@tranzita.africa'
export const whatsapp = 'https://wa.me/?text=Hi%2C%20I%20would%20like%20to%20speak%20with%20the%20Tranzita%20team.'

export function Intro({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <div className="text-center mb-14">
      <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{label}</motion.p>
      <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{title}</motion.h2>
      {text && <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>{text}</p>}
    </div>
  )
}

export function Section({ background, label, title, text, children }: { background: string; label: string; title: string; text?: string; children: React.ReactNode }) {
  return <section className="py-24 px-4" style={{ background }}><div className="max-w-6xl mx-auto"><Intro label={label} title={title} text={text} />{children}</div></section>
}
