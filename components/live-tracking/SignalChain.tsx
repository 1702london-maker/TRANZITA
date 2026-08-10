'use client'

import { motion } from 'framer-motion'
import { RadioTower, Server, Smartphone, Cloud } from 'lucide-react'
import { Section } from './Shared'

const nodes = [
  ['GPS Unit on the Bus', RadioTower, 'Transmits exact coordinates every 30 seconds and runs independently of the driver app.'],
  ['Tranzita Operations Platform', Server, 'Logs timestamp, bus ID, speed and route ID, then checks speed and route anomalies.'],
  ['Parent Tracking Server', Cloud, 'Updates the live map session and recalculates ETA with current position and traffic data.'],
  ['Your Phone', Smartphone, 'Pulls the latest position automatically with smooth movement between 30-second updates.'],
] as const

export default function SignalChain() {
  return (
    <Section background="#FFF9F2" label="The Signal Chain" title="How location gets from the bus to your phone in under 5 seconds." text="There are four steps between the GPS unit on the bus and the map on your screen.">
      <div className="relative grid md:grid-cols-4 gap-5">
        <svg className="hidden md:block absolute left-[12%] right-[12%] top-12 h-8 w-[76%]" viewBox="0 0 760 40" preserveAspectRatio="none">
          <motion.path d="M0 20 H760" stroke="#D96B1F" strokeWidth="3" strokeDasharray="10 10" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <motion.circle r="6" fill="#D96B1F" animate={{ cx: [0, 760] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} cy="20" />
        </svg>
        {nodes.map(([title, Icon, body], i) => (
          <motion.div key={title} className="relative rounded-2xl bg-white p-6 border border-[#DDE9D2] text-center" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.18 }}>
            <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center" style={{ background: '#FFF0E4' }}><Icon size={28} color="#D96B1F" /></div>
            <h3 className="font-extrabold text-lg mb-2" style={{ color: '#183024' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
