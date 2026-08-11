'use client'

import { motion } from 'framer-motion'
import { SectionIntro, fadeUp } from './Shared'

const paragraphs = [
  'Budruum Ltd is a UK-based strategy and digital build consultancy founded by a British Nigerian entrepreneur who understood what Zita was trying to solve: not only a business problem, but a Nigerian parent problem.',
  'When Zita brought the Tranzita vision to Budruum, the answer was immediate. This is not just a product. This is infrastructure, and it needed to be built to that standard.',
  'Budruum took on the full scope: business strategy, market analysis, product architecture, web and app development, and project management from the first wireframe to the first live route.',
  "Every major part of the platform, from PWA live tracking and support workflows to vetting, dashboards, nurse reporting, and live ETA logic, was designed with Zita's operational vision at the centre.",
]

const badges = ['Business Planning and Strategy', 'Web and App Development', 'Product Architecture', 'End-to-End Project Management']

export default function BudruumPartnership() {
  return (
    <section id="partnership" className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Partnership" title="To build it right, she needed a team that understood both the vision and the build." subtitle="That is where Budruum came in." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}>
            {paragraphs.map((text) => <motion.p key={text} className="mb-5 text-base leading-relaxed sm:text-lg" style={{ color: '#65785F' }} variants={fadeUp}>{text}</motion.p>)}
          </motion.div>
          <motion.div className="rounded-[32px] p-8" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} animate={{ boxShadow: ['0 0 0 rgba(217,107,31,0)', '0 0 42px rgba(217,107,31,0.18)', '0 0 0 rgba(217,107,31,0)'] }} transition={{ boxShadow: { duration: 3, repeat: Infinity } }}>
            <div className="rounded-3xl p-8 text-center" style={{ background: 'white' }}>
              <div className="text-4xl font-extrabold" style={{ color: '#183024' }}>BUDRUUM</div>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Strategy. Build. Delivery.</p>
            </div>
            <motion.div className="mt-6 flex flex-wrap gap-2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
              {badges.map((badge) => <motion.span key={badge} variants={fadeUp} className="rounded-full px-3 py-2 text-xs font-bold" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid rgba(217,107,31,0.18)' }}>{badge}</motion.span>)}
            </motion.div>
            <p className="mt-6 text-sm font-bold" style={{ color: '#65785F' }}>Budruum Ltd - London, United Kingdom<br />budruum.co.uk</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
