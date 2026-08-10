'use client'

import { motion } from 'framer-motion'

const stages = [
  ['Criminal Records Bureau Clearance', 'Mandatory Nigerian Police Clearance Certificate, cross-referenced with criminal records. Any criminal record results in permanent disqualification.'],
  ['Biometric Identity Verification', 'Fingerprint, facial recognition, National ID, driver licence and passport checks are verified against government records and used for every login.'],
  ['Home Address and Guarantor Visit', 'A field officer visits the home address. A non-family registered property owner provides a sworn guarantor declaration, with GPS stored permanently.'],
  ['Defensive Driving and FRSC Check', 'Drivers must hold current defensive driving certification, clear FRSC record checks and pass a supervised Tranzita driving assessment.'],
  ['Child Protection Training', 'Every driver, co-driver and nurse completes the Tranzita Child Safeguarding Programme and renews certification every 18 months.'],
  ['Medical Fitness and Drug Screening', 'Full medical exam, drug and alcohol screening, vision, hearing and fitness checks, with random unannounced re-screening during employment.'],
]

export default function VettingStages() {
  return (
    <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Vetting</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Six stages. Every crew member. No exceptions.</motion.h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#65785F' }}>Every crew member clears all six stages independently before their first day on a Tranzita bus.</p>
        </div>
        <div className="space-y-4">
          {stages.map(([title, text], i) => (
            <motion.div key={title} className="gradient-frame rounded-2xl p-6 grid sm:grid-cols-[90px_1fr] gap-4 items-start" style={{ background: '#fff' }} initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div className="text-5xl font-black" style={{ color: '#D96B1F' }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl p-7 text-center text-white font-bold" style={{ background: 'linear-gradient(90deg, #1F6B46 0%, #D96B1F 100%)' }}>Every crew member on every Tranzita bus has cleared all six stages in full. No probationary periods. No partial clearances.</div>
      </div>
    </section>
  )
}
