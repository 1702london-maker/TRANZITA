'use client'

import { motion } from 'framer-motion'
import { SectionIntro, fadeUp } from './Shared'

const paragraphs = [
  'Tranzita was not built from distance. It was built by people who understand what school transport feels like on African roads: early mornings, tight school gates, unpredictable traffic, anxious parents, and children who deserve better systems around them.',
  'Budruum brought together a team of 10 software developers with grassroots understanding of the African market. The team studied the real school-day pressure around pickup, drop-off, route visibility, child handover, safety checks, and parent communication.',
  'The goal was not to copy a foreign transport app and place it in Nigeria. The goal was to build a platform that feels native to the way Nigerian schools, parents, drivers, copilots, nurses, and fleet partners actually work.',
  'Budruum Limited Nigeria and Budruum UK teamed up to create Tranzita with children in mind: a practical, accountable school transport platform designed for safer journeys, clearer information, and stronger operating discipline.',
  'This is how Tranzita sets the pace: technology shaped by local reality, built to a higher standard, and focused on the one journey families care about most.',
]

export default function FounderStory() {
  return (
    <section id="story" className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Builders" title="Built by a team that understands the roads it is solving for." subtitle="Budruum Nigeria and Budruum UK came together to build school transport technology with children at the centre." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div className="relative rounded-[32px] p-8 text-center" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 520" fill="none" preserveAspectRatio="none">
              <motion.rect x="2" y="2" width="416" height="516" rx="32" stroke="#D96B1F" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
            </svg>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #FFF0E4, #F1F6EA)' }}>
              <span className="text-7xl font-extrabold" style={{ color: '#D96B1F' }}>B</span>
            </div>
            <h3 className="mt-7 text-4xl font-extrabold" style={{ color: '#183024' }}>Budruum</h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#7EA06D' }}>Nigeria And UK Build Team</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}>
            {paragraphs.map((text) => (
              <motion.p key={text} className="mb-5 text-base leading-relaxed sm:text-lg" style={{ color: '#65785F' }} variants={fadeUp}>{text}</motion.p>
            ))}
            <motion.blockquote className="mt-8 rounded-[28px] p-7 text-2xl font-extrabold leading-snug" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid rgba(217,107,31,0.24)' }} variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}>
              We are building for the parents who wait, the schools who need control, and the children who deserve a safer journey every day.
              <span className="mt-4 block text-sm font-bold" style={{ color: '#D96B1F' }}>Budruum Team - Tranzita Build Partner</span>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
