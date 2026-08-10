'use client'

import { motion } from 'framer-motion'
import { CarFront, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { Card, SectionIntro } from './Shared'

const cards = [
  ['Earn From Your Car', CarFront, 'Your car sits depreciating while you are at work. A Tranzita partnership puts it to work on verified school routes during school hours and pays predictable monthly income.'],
  ['We Handle Everything Operational', ShieldCheck, 'You do not drive, coordinate routes, deal with parents, or manage school calls. Tranzita provides drivers, route management, communications, and oversight.'],
  ['Your Own Partner Portal', LayoutDashboard, 'See every route completed, kilometre driven, earnings statement, inspection, and maintenance event from one dedicated partner dashboard.'],
]

export default function TheOpportunity() {
  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Opportunity" title="Your car is an asset. Right now it is probably parked." text="Tranzita is expanding across Nigeria by partnering with car owners who want their vehicles working while they are not using them." />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}>
          {cards.map(([title, Icon, text]) => <Card key={title as string}><Icon size={32} color="#D96B1F" /><h3 className="mt-5 text-2xl font-extrabold" style={{ color: '#183024' }}>{title as string}</h3><p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>{text as string}</p></Card>)}
        </motion.div>
      </div>
    </section>
  )
}
