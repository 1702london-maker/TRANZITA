'use client'

import { motion } from 'framer-motion'
import { Banknote, FileCheck2, Headphones, ShieldCheck, Wrench, MapPinned } from 'lucide-react'
import { Card, SectionIntro } from './Shared'

const safeguards = [
  ['Clear Monthly Earnings', Banknote, 'Your agreed partnership rate, completed routes, bonuses, and payment date are visible before payout. No guessing. No informal settlement.'],
  ['Route-Only Usage Rules', MapPinned, 'Your vehicle is assigned only to approved Tranzita routes during agreed school transport windows, with route history visible in your portal.'],
  ['Insurance Top-Up', ShieldCheck, 'Tranzita adds route-specific fleet insurance cover while your certified vehicle is operating on approved Tranzita school routes.'],
  ['Inspection Records', Wrench, 'Every inspection, re-check, issue, and clearance decision is logged so you always know the operational status of your vehicle.'],
  ['Verified Documentation', FileCheck2, 'Registration, insurance, road-worthiness, and certification records are checked before a vehicle can carry children.'],
  ['Partner Support', Headphones, 'You get a named operations contact for onboarding, route questions, payment questions, and vehicle status updates.'],
]

export default function PartnerSafeguards() {
  return (
    <section className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          label="Partner Safeguards"
          title="Your vehicle works. You stay in control."
          text="The partner programme is designed so vehicle owners can earn without losing visibility, standards, or control over how their asset is used."
        />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          {safeguards.map(([title, Icon, body]) => (
            <Card key={title as string}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold" style={{ color: '#183024' }}>{title as string}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>{body as string}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
