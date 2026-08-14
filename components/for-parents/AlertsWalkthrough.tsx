'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Section } from './Shared'

const alerts = [
  ['Departure Record', "Your child's Tranzita bus TRZ-004 is now departing Lagos International School. Estimated pickup time: 3:20 PM. Crew and route record confirmed.", 'This is created when the route unlocks and appears in the parent PWA.'],
  ['Boarding Confirmed', 'Amara has boarded bus TRZ-004. Time: 3:18 PM. Bus is now moving. ETA your area: 3:52 PM.', 'This comes from your child wristband tap and confirms your child is physically onboard with a named nurse present.'],
  ['Traffic Update', 'Bus TRZ-004 update - slight congestion on Lekki-Epe Expressway. Revised ETA: 3:58 PM. All children accounted for.', 'If the route changes, operations sees the update early and can contact affected parents through the agreed pilot process.'],
  ['Arrival Warning', "Amara's bus is approaching the home zone. Please ensure a verified guardian is ready for handover.", 'This is recorded when the bus crosses your home geofence. It is the cue for guardian readiness.'],
  ['Safe Arrival Confirmed', 'Amara has been dropped off safely at home. Time: 3:57 PM. Received by Mrs Okafor. Journey complete.', 'This is recorded after tap-off and physical handover. Your child is home and the journey log is complete.'],
  ['Journey Summary', 'Boarded: 3:18 PM. Arrived home: 3:57 PM. Total journey time: 39 minutes.', 'This gives you a complete log of the journey, stored and available through the authorised process.'],
]

export default function AlertsWalkthrough() {
  return (
    <Section background="#F1F6EA" label="The Updates" title="Every checkpoint recorded. What it means." text="Tranzita records every key journey moment inside the parent PWA. WhatsApp and EFE stay available for support, complaints and escalation.">
      <div className="space-y-5">
        {alerts.map(([title, msg, explanation], i) => (
          <motion.div key={title} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5 items-center rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="rounded-2xl p-4" style={{ background: '#ECE5DD' }}>
              <div className="flex items-center gap-2 mb-3 text-white rounded-xl px-3 py-2" style={{ background: '#25D366' }}><MessageCircle size={18} /><span className="font-bold text-sm">Tranzita</span></div>
              <p className="rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-relaxed" style={{ color: '#183024' }}>{msg}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#D96B1F' }}>Alert {i + 1}</p>
              <h3 className="font-extrabold text-2xl mb-3" style={{ color: '#183024' }}>{title}</h3>
              <p className="leading-relaxed" style={{ color: '#65785F' }}>{explanation}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
