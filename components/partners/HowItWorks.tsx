'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

const steps = [
  ['Apply Online', 'Tell us whether you support Nigerian vehicle assembly, approved fleet supply, maintenance, depot space, fuel support, or fleet infrastructure.'],
  ['Fleet Capability Review', 'Tranzita reviews local assembly status, vehicle category, seating, safety systems, documentation, fuel or charging plan, and service readiness.'],
  ['Maintenance And Fuel Check', 'We confirm how vehicles are maintained, where they refuel or charge, how quickly faults are handled, and whether routes can run without disruption.'],
  ['Commercial Approval', 'Both teams agree scope, service city, approved vehicle list, inspection cadence, payment terms, and the data visible inside the partner portal.'],
  ['First Approved Tranzita Route', 'Only after approval does a vehicle enter a live Tranzita school route, with partner visibility limited to vehicle status, child count, documents, and earnings.'],
]

export default function HowItWorks() {
  return (
    <section className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-5xl">
        <SectionIntro label="How It Works" title="From partner review to approved fleet support." text="The process checks whether your Nigerian-assembled vehicle, maintenance, fuel, charging or depot capacity fits Tranzita school transport operations." />
        <div className="mt-12 space-y-4">
          {steps.map(([step, body], i) => <motion.div key={step} className="rounded-[24px] bg-white p-6" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><span className="text-3xl font-extrabold" style={{ color: '#D96B1F' }}>{i + 1}</span><h3 className="mt-2 text-2xl font-extrabold" style={{ color: '#183024' }}>{step}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p></motion.div>)}
        </div>
      </div>
    </section>
  )
}
