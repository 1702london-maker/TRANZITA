'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const callouts = [
  ['GPS Unit Pre-Installed', 'Tracking is part of the vehicle architecture, transmitting every 30 seconds and protected from driver disconnection.'],
  ['Child-Safe Window Locks', 'Passenger windows use child-safe locks controlled from crew positions, with safe ventilation gaps.'],
  ['Audio-Only Intercom', 'Approved school audio only, no driver-facing screens and no distracting entertainment systems.'],
  ['Speed Monitoring Unit', 'Independent hardware checks speed against zone-specific limits and alerts operations after breaches.'],
  ['In-Bus Camera System', 'Encrypted passenger and cab footage is retained for 30 days and reviewed after incident flags or concerns.'],
  ['First Aid Station', 'A fixed station contains first aid, AED on larger buses, and locked emergency medication storage.'],
  ['Child Tap-On Reader', 'NFC reader logs child identity, timestamp and GPS coordinates at boarding and drop-off.'],
  ['Approved Powertrain', 'Electric, diesel or petrol powertrains are accepted only after Nigerian assembly verification, inspection and route-readiness approval.'],
]

export default function VehicleSpec() {
  return (
    <Section background="#F1F6EA" label="The Vehicle" title="Every specification chosen with one priority: the children inside." text="Here is exactly what is on every Tranzita bus and why each feature matters.">
      <div id="fleet-spec" className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <motion.div className="rounded-3xl bg-white p-6 border border-[#DDE9D2]" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <svg viewBox="0 0 620 340" className="w-full">
            <rect x="72" y="108" width="470" height="126" rx="22" fill="#F28A3D" />
            <rect x="72" y="108" width="470" height="34" rx="22" fill="#D96B1F" />
            {[105, 165, 225, 285, 345, 405].map((x) => <rect key={x} x={x} y="134" width="42" height="42" rx="7" fill="rgba(255,255,255,0.36)" />)}
            <text x="245" y="205" fill="#fff" fontSize="26" fontWeight="900">TRANZITA</text>
            <circle cx="158" cy="248" r="22" fill="#183024" /><circle cx="440" cy="248" r="22" fill="#183024" />
            {[[90,100,32,62],[530,125,590,74],[110,235,36,282],[500,232,586,276]].map(([x1,y1,x2,y2], i) => <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D96B1F" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.18, duration: 0.7 }} />)}
          </svg>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {callouts.map(([title, body], i) => (
            <motion.div key={title} className="rounded-2xl bg-white p-4 border border-[#DDE9D2]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -4 }}>
              <p className="font-extrabold mb-2" style={{ color: '#183024' }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
