'use client'

import { motion } from 'framer-motion'
import { Bell, Fingerprint, Gauge, MapPinned, RadioTower, Route, type LucideIcon } from 'lucide-react'

const cards: Array<[string, LucideIcon, string]> = [
  ['Real-Time GPS Tracking', RadioTower, 'Every bus transmits location every 30 seconds to operations, school dashboard and parent tracking. Unexpected stops trigger automatic alerts.'],
  ['Smart Route Engine', Route, 'Routes are built from home address clusters and updated with traffic every 90 seconds to protect the 57-minute journey target.'],
  ['Biometric Driver Login', Fingerprint, 'The route cannot begin until driver, co-driver and nurse confirm identity through the app. Failed scans lock dispatch.'],
  ['Parent PWA Journey Updates', Bell, 'Boarding, ETA, arrival warning, drop-off confirmation and journey summaries are shown in the parent PWA, with WhatsApp and EFE kept for support.'],
  ['Tap-On Tap-Off Tracking', MapPinned, 'Every child wristband creates a GPS and timestamp record at boarding and drop-off, so no child is unaccounted for.'],
  ['Speed and Behaviour Monitoring', Gauge, 'Speed thresholds are set by road zone, while deviations, unplanned stops and forced app closures trigger operations review.'],
]

export default function TechCards() {
  return (
    <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Technology</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>The platform behind every safe journey.</motion.h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#65785F' }}>Parents see simple updates. Behind each one is a route record, child status, crew assignment and operations queue built to catch exceptions early.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(([title, Icon, text], i) => (
            <motion.div key={String(title)} className="gradient-frame rounded-2xl p-6 glow-card" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Icon size={34} color="#D96B1F" className="mb-5" />
              <h3 className="text-xl font-extrabold mb-3" style={{ color: '#183024' }}>{title}</h3>
              <p className="leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
