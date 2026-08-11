'use client'

import { motion } from 'framer-motion'
import { Card, SectionIntro } from './Shared'

const tiers = [
  ['EV Assembly Partner', 'Made In Nigeria', 'You assemble or supply electric buses suitable for school transport and want a long-term operating partnership with Tranzita.', 'Only Tranzita-approved made-in-Nigeria EV buses enter the fleet. Vehicle type, range, seating, safety systems, charging needs, and maintenance support are reviewed before approval.', 'Discuss EV Supply'],
  ['Charging Infrastructure Partner', 'Most Strategic', 'You operate, host, or can support charging infrastructure in Lagos, Abuja, or upcoming Tranzita service cities.', 'We prioritise safe overnight charging, depot access, route-area coverage, uptime reporting, and maintenance response. This supports the EV fleet without exposing child data.', 'Discuss Charging Partnership'],
  ['Maintenance And Fleet Support', 'Operations Partner', 'You can support EV servicing, diagnostics, parts, inspections, battery health, or depot readiness for Tranzita-approved vehicles.', 'Partners support Tranzita vehicles only. The programme does not accept private conventional cars, outside buses, or non-approved vehicles into school routes.', 'Discuss Fleet Support'],
]

export default function PartnershipTiers() {
  return (
    <section id="tiers" className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="Partnership Tiers" title="Three ways to support the Tranzita EV fleet." text="Our partner programme is for made-in-Nigeria EV supply, charging, maintenance and fleet infrastructure, not private car onboarding." />
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
