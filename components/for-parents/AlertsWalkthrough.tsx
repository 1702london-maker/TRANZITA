'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Section } from './Shared'

const alerts = [
  ['Departure Alert', "Your child's Tranzita bus TRZ-004 is now departing Lagos International School. Estimated pickup time: 3:20 PM. Driver: Emeka. Co-Driver: Fatima. Nurse: Sister Agnes. Track live here.", 'This fires the moment the route unlocks. You receive crew names, IDs and the live tracking link immediately.'],
  ['Boarding Confirmed', 'Amara has boarded bus TRZ-004. Time: 3:18 PM. Bus is now moving. ETA your area: 3:52 PM. Track live.', 'This fires from your child wristband tap. It confirms your child is physically onboard with a named nurse present.'],
  ['Traffic Update', 'Bus TRZ-004 update - slight congestion on Lekki-Epe Expressway. Revised ETA: 3:58 PM. All children safe.', 'If the route changes, you are told before you start worrying. No need to call anyone.'],
  ['Arrival Warning', "Amara's bus is arriving in approximately 4 minutes. Please ensure a verified guardian is at the door.", 'This fires when the bus crosses your home geofence. It is your cue to step outside.'],
  ['Safe Arrival Confirmed', 'Amara has been dropped off safely at home. Time: 3:57 PM. Received by Mrs Okafor. Journey complete.', 'This fires after tap-off and physical handover. Your child is home and you know.'],
  ['Journey Summary', 'Boarded: 3:18 PM. Arrived home: 3:57 PM. Total journey time: 39 minutes. No flags raised.', 'This gives you a complete log of the journey, stored and available on request.'],
]

export default function AlertsWalkthrough() {
  return (
    <Section background="#F1F6EA" label="The Alerts" title="Every message you receive. What it means." text="You receive WhatsApp messages at every key moment of a standard Tranzita journey.">
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
