'use client'

import { motion } from 'framer-motion'
import { LiftCard, SectionIntro } from './Shared'

const cards = [
  ['Understanding Both Worlds', 'Budruum Nigeria and Budruum UK understand the standard parents expect and the Nigerian context those standards must work inside: the roads, schools, traffic, phones, and afternoon anxiety.'],
  ['Building To A Global Standard For A Nigerian Need', 'Tranzita is built specifically for Nigeria with technology and operating standards that can stand up to global scrutiny while staying practical for Nigerian roads and families.'],
  ["The Diaspora Investing In Nigeria's Children", 'This is personal. It is family, cousins, nieces, nephews, and the children of childhood friends on those buses every afternoon. That is the energy behind the Budruum build.'],
]

export default function BritishNigerianConnection() {
  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The British Nigerian Connection" title="Built with British precision. Grounded in Nigerian reality." subtitle="That identity is not incidental to Tranzita. It is central to it." />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          {cards.map(([title, body]) => (
            <LiftCard key={title}>
              <h3 className="text-2xl font-extrabold" style={{ color: '#183024' }}>{title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
            </LiftCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
