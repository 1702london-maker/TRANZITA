'use client'

import { motion } from 'framer-motion'
import { Card, SectionIntro } from './Shared'

const tiers = [
  ['Private Car Partner', 'Entry Level', 'You have one car, maybe two, and want them earning when you are not using them.', 'Minimum 2019 model, clean interior, valid registration and insurance, working AC, and at least 5 seats.', 'Apply As A Private Car Partner'],
  ['Chauffeur and Executive Partner', 'Most Popular', 'You provide a premium vehicle or executive fleet and want a premium partnership to match.', 'Luxury saloons, executive SUVs, premium people carriers, senior drivers, priority route assignment, and quarterly reviews.', 'Apply As An Executive Partner'],
  ['Fleet and Corporate Partner', 'For Fleets of 5 or More', 'You have a fleet and want it utilised on verified school transport routes with full visibility.', 'Fleet inspection, assigned drivers, dashboard access, consolidated earnings, and dedicated partnership management.', 'Discuss Fleet Partnership'],
]

export default function PartnershipTiers() {
  return (
    <section id="tiers" className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="Partnership Tiers" title="Three ways to partner with Tranzita." text="Whether you have one car or fifty, there is a structure designed for your situation." />
        <motion.div className="mt-12 grid gap-5 lg:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}>
          {tiers.map(([title, badge, intro, detail, cta], index) => (
            <Card key={title} className={index === 1 ? 'relative bg-[#FFF0E4]' : ''}>
              {index === 1 && <motion.span className="absolute right-5 top-5 rounded-full px-3 py-1 text-xs font-extrabold text-white" style={{ background: '#D96B1F' }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>MOST POPULAR</motion.span>}
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{badge}</p>
              <h3 className="mt-4 text-3xl font-extrabold" style={{ color: '#183024' }}>{title}</h3>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>{intro}</p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>{detail}</p>
              <a href="#apply" className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>{cta}</a>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
