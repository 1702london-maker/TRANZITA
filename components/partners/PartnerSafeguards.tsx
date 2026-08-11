'use client'

import { motion } from 'framer-motion'
import { Banknote, FileCheck2, Headphones, ShieldCheck, Wrench, MapPinned } from 'lucide-react'
import { Card, SectionIntro } from './Shared'

const safeguards = [
  ['Clear Commercial Terms', Banknote, 'Your approved supply, charging, maintenance or infrastructure terms are visible before work begins. No guessing. No informal settlement.'],
  ['Tranzita Fleet Only', MapPinned, 'Partner access is limited to approved Tranzita buses, route activity and child counts. It never covers private cars or outside fleet vehicles.'],
  ['Fleet Safety Standard', ShieldCheck, 'Every approved vehicle must meet the Tranzita school transport standard before carrying children.'],
  ['Inspection Records', Wrench, 'Every inspection, powertrain review, re-check, issue, and clearance decision is logged for operational visibility.'],
  ['Verified Documentation', FileCheck2, 'Assembly records, insurance, road-worthiness, fuel or charging readiness, and fleet certification records are checked before route use.'],
  ['Partner Support', Headphones, 'You get a named operations contact for onboarding, route questions, payment questions, and fleet status updates.'],
]

export default function PartnerSafeguards() {
  return (
    <section className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          label="Partner Safeguards"
          title="The fleet stays controlled, visible, and child-safe."
          text="The partner programme is designed for approved fleet and infrastructure partners while Tranzita keeps route operation, child data, and school safety controls protected."
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
