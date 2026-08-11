'use client'

import { motion } from 'framer-motion'

export default function ClosingSection() {
  return (
    <section className="px-4 py-20 text-center" style={{ background: '#FFF0E4' }}>
      <motion.h2 className="headline-balance mx-auto max-w-4xl text-4xl font-extrabold sm:text-5xl" style={{ color: '#183024' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Nigerian EVs. Our mission. Safer school journeys.
      </motion.h2>
      <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Every approved electric bus in the Tranzita fleet supports cleaner, quieter, safer school transport for Nigerian children.
      </motion.p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href="#apply" className="rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Apply Now</a>
        <a href="/safety" className="rounded-full px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', background: 'white', border: '1px solid #DDE9D2' }}>Learn About Safety</a>
      </div>
      <p className="mt-10 text-xs" style={{ color: '#65785F' }}>For partnership enquiries: partners@tranzita.africa<br />Copyright 2026 Tranzita Nigeria.</p>
    </section>
  )
}
