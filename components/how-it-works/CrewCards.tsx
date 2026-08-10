'use client'

import { motion } from 'framer-motion'
import { HeartPulse, ShieldCheck, UserRoundCheck, type LucideIcon } from 'lucide-react'

const crew: Array<[string, LucideIcon, string]> = [
  ['The Driver', UserRoundCheck, 'Operates the vehicle at all times. Holds FRSC-approved defensive driving certification, follows certified school-zone routes, has speed monitored in real time and keeps personal phone use locked during active routes.'],
  ['The Co-Driver', ShieldCheck, 'Manages boarding and alighting, calls every child by name from the verified manifest, operates tap-on and tap-off, and stays in the passenger area with the children throughout the journey.'],
  ['The Onboard Nurse', HeartPulse, 'Registered with the Nursing and Midwifery Council of Nigeria, carries first aid equipment, checks every child at boarding and can instruct a hospital diversion immediately when needed.'],
]

export default function CrewCards() {
  return (
    <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Crew</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Three vetted professionals. One bus. Every day.</motion.h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>No other school transport service in Nigeria puts three independently vetted professionals on every bus. This is the Tranzita standard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {crew.map(([title, Icon, text], i) => (
            <motion.div key={String(title)} className="gradient-frame rounded-2xl p-7 glow-card" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
              <Icon size={42} color="#D96B1F" className="mb-5" />
              <h3 className="text-2xl font-extrabold mb-3" style={{ color: '#183024' }}>{title}</h3>
              <p className="leading-relaxed mb-5" style={{ color: '#65785F' }}>{text}</p>
              <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-black" style={{ background: 'rgba(217,107,31,0.18)', color: '#F8C84E' }}>6-Stage Vetted Independently</span>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-8 rounded-2xl p-7 text-white font-bold text-center" style={{ background: 'linear-gradient(90deg, #1F6B46 0%, #D96B1F 100%)' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          None of the three crew members can vouch for each other. Each is vetted independently by separate Tranzita review teams before assignment.
        </motion.div>
      </div>
    </section>
  )
}
