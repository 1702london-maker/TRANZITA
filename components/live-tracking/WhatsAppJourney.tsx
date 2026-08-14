'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Section } from './Shared'

const messages = [
  ['3:04 PM', "Your child's bus TRZ-004 has departed Lagos International School. Estimated pickup time: 3:20 PM. Crew and live route record confirmed.", 'Before the bus reaches your child, operations has the crew, bus and route record in view.'],
  ['3:18 PM', 'Amara has boarded bus TRZ-004. Time: 3:18 PM. Bus is now moving. ETA: 3:52 PM.', 'The NFC wristband tap confirms your child is physically onboard and updates the journey record.'],
  ['3:36 PM', 'Slight congestion detected. Revised ETA: 3:58 PM. Bus remains on an approved route. All children accounted for.', 'Traffic updates are visible to operations so the team can confirm changes before parents start chasing.'],
  ['3:54 PM', "Amara's bus is approaching the home zone. Verified guardian handover check is active.", 'The geofence record gives operations enough time to watch the handover point closely.'],
  ['3:57 PM', 'Amara has been dropped off safely. Received by Mrs Okafor. Bus TRZ-004 continuing route.', 'This records tap-off and guardian handover in the parent PWA.'],
  ['4:02 PM', 'Journey summary: Boarded 3:18 PM. Arrived 3:57 PM. Total 39 minutes. Crew: Emeka, Fatima, Sister Agnes.', 'Every journey summary is stored and available through the authorised process.'],
]

export default function WhatsAppJourney() {
  return (
    <Section background="#F1F6EA" label="The Parent PWA Journey" title="Six checkpoints. One complete journey. Nothing left unconfirmed." text="The platform records each important moment inside the parent PWA. WhatsApp and EFE stay available for support, complaints and escalation.">
      <div className="space-y-5">
        {messages.map(([time, msg, exp], i) => (
          <div key={time} className="grid lg:grid-cols-[0.95fr_1.05fr] gap-5 items-center">
            <motion.div className="rounded-2xl bg-white p-4 border border-[#DDE9D2]" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-white mb-3" style={{ background: '#25D366' }}><MessageCircle size={18} /><span className="font-bold text-sm">Tranzita</span></div>
              <p className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed" style={{ background: '#ECE5DD', color: '#183024' }}>{msg}</p>
              <p className="text-right text-xs mt-2" style={{ color: '#65785F' }}>{time} check check</p>
            </motion.div>
            <motion.p className="leading-relaxed rounded-2xl bg-white p-5 border border-[#DDE9D2]" style={{ color: '#65785F' }} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.08 }}>{exp}</motion.p>
          </div>
        ))}
      </div>
    </Section>
  )
}
