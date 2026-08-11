'use client'

import { motion } from 'framer-motion'
import { BatteryCharging, BusFront, Factory } from 'lucide-react'
import { Card, SectionIntro } from './Shared'

const cards = [
  ['Build The School EV Fleet', BusFront, 'Tranzita is standardising safe school transport around approved electric buses assembled in Nigeria and operated under Tranzita control.'],
  ['Support Charging Coverage', BatteryCharging, 'Charging partners help us place reliable overnight and route-area charging where school transport actually runs.'],
  ['Keep Value In Nigeria', Factory, 'Local assembly, local servicing, local charging and local operations make the fleet easier to maintain and more affordable to scale.'],
]

export default function TheOpportunity() {
  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Opportunity" title="Nigeria-built electric mobility for school transport." text="Tranzita is expanding through made-in-Nigeria EV buses, charging partners, maintenance partners, and fleet infrastructure partners who can support child-safe daily operations." />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}>
          {cards.map(([title, Icon, text]) => <Card key={title as string}><Icon size={32} color="#D96B1F" /><h3 className="mt-5 text-2xl font-extrabold" style={{ color: '#183024' }}>{title as string}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>{text as string}</p></Card>)}
        </motion.div>
      </div>
    </section>
  )
}
