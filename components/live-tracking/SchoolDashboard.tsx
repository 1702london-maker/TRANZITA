'use client'

import { motion } from 'framer-motion'
import { Bell, Database, MessageSquare, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['See Every Flag In Real Time', Bell, 'Speed alerts, route deviations, unplanned stops and manifest discrepancies appear the moment they are detected.'],
  ['Pull Any Journey Record', Database, 'Click any completed journey to see GPS, speed log, tap events, crew on duty and flags raised.'],
  ['Parent Broadcast From Dashboard', MessageSquare, 'Send route changes, delays or emergency messages to every affected parent within 30 seconds.'],
]

export default function SchoolDashboard() {
  return (
    <Section background="#FFF9F2" label="For Schools" title="Every bus on every route. One screen." text="The Tranzita School Dashboard gives your transport coordinator a live view of the entire fleet.">
      <motion.div className="rounded-3xl bg-white p-5 border border-[#DDE9D2] shadow-xl mb-10" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-5">
          <div className="relative min-h-[280px] rounded-2xl overflow-hidden" style={{ background: '#F1F6EA' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320"><path d="M40 250 C160 150 250 260 360 145 S520 95 560 185" stroke="#C9DDBE" strokeWidth="14" fill="none" strokeLinecap="round" /><motion.circle r="9" fill="#D96B1F" animate={{ cx: [45, 220, 370, 560], cy: [250, 185, 145, 185] }} transition={{ duration: 6, repeat: Infinity }} /><motion.circle r="9" fill="#D96B1F" animate={{ cx: [560, 380, 200, 45], cy: [185, 120, 180, 250] }} transition={{ duration: 7, repeat: Infinity }} /></svg>
          </div>
          <div className="space-y-3">
            {['TRZ-001 on time - 14 children', 'TRZ-002 speed flag - operations notified', 'TRZ-003 on time - 8 children'].map((row, i) => <motion.div key={row} className="rounded-xl p-4 border border-[#DDE9D2]" style={{ background: i === 1 ? '#FFF0E4' : '#FFF9F2', color: '#183024' }} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.18 }}><span className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse" style={{ background: i === 1 ? '#D96B1F' : '#1F6B46' }} />{row}</motion.div>)}
          </div>
        </div>
      </motion.div>
      <IconCards cards={cards} columns="md:grid-cols-3" />
    </Section>
  )
}
