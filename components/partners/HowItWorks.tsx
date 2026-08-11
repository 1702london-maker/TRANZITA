'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

const steps = ['Apply Online', 'EV Capability Review', 'Charging And Maintenance Check', 'Commercial Approval', 'First Approved Tranzita Route']

export default function HowItWorks() {
  return (
    <section className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-5xl">
        <SectionIntro label="How It Works" title="From EV partner review to approved fleet support." text="The process checks whether your Nigerian EV, charging, maintenance or depot capacity fits Tranzita school transport operations." />
        <div className="mt-12 space-y-4">
          {steps.map((step, i) => <motion.div key={step} className="rounded-[24px] bg-white p-6" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><span className="text-3xl font-extrabold" style={{ color: '#D96B1F' }}>{i + 1}</span><h3 className="mt-2 text-2xl font-extrabold" style={{ color: '#183024' }}>{step}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: '#65785F' }}>Tranzita reviews this stage against the EV-only fleet standard before any vehicle, charging site, or maintenance workflow is connected to school routes.</p></motion.div>)}
        </div>
      </div>
    </section>
  )
}
