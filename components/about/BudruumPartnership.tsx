'use client'

import { motion } from 'framer-motion'
import { SectionIntro, fadeUp } from './Shared'

const paragraphs = [
  'Budruum Limited is registered in Nigeria, with Budruum UK working alongside it as a strategy, product, and engineering partner. Together, the teams bring local market understanding and international delivery discipline into one build.',
  'Tranzita was created by a 10-person software development team that understands the African market from the ground: school routes, parent behaviour, transport gaps, mobile-first access, trust, affordability, and operational pressure.',
  'The team took on the full scope: business strategy, market analysis, product architecture, web and app development, operations dashboards, safety workflows, and project management from the first wireframe to the first live route.',
  'Every major part of the platform, from PWA live tracking and support workflows to vetting, dashboards, nurse reporting, and live ETA logic, was designed to set a stronger standard for school transport in Nigeria.',
]

const badges = ['10 Software Developers', 'Budruum Nigeria', 'Budruum UK', 'Built For African Markets']

export default function BudruumPartnership() {
  return (
    <section id="partnership" className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Partnership" title="Built by Budruum teams with African market understanding." subtitle="Nigeria insight. UK delivery discipline. One platform built with children in mind." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}>
            {paragraphs.map((text) => <motion.p key={text} className="mb-5 text-base leading-relaxed sm:text-lg" style={{ color: '#65785F' }} variants={fadeUp}>{text}</motion.p>)}
          </motion.div>
          <motion.div className="rounded-[32px] p-8" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} animate={{ boxShadow: ['0 0 0 rgba(217,107,31,0)', '0 0 42px rgba(217,107,31,0.18)', '0 0 0 rgba(217,107,31,0)'] }} transition={{ boxShadow: { duration: 3, repeat: Infinity } }}>
            <div className="rounded-3xl p-8 text-center" style={{ background: 'white' }}>
              <div className="text-4xl font-extrabold" style={{ color: '#183024' }}>BUDRUUM</div>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Nigeria. UK. Product. Delivery.</p>
            </div>
            <motion.div className="mt-6 flex flex-wrap gap-2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
              {badges.map((badge) => <motion.span key={badge} variants={fadeUp} className="rounded-full px-3 py-2 text-xs font-bold" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid rgba(217,107,31,0.18)' }}>{badge}</motion.span>)}
            </motion.div>
            <p className="mt-6 text-sm font-bold" style={{ color: '#65785F' }}>Budruum Limited - Nigeria<br />Budruum UK - United Kingdom</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
