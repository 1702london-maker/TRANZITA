'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Route, Timer, TrafficCone } from 'lucide-react'
import { Section } from './Shared'

const inputs = [
  ['Current GPS Position', MapPin],
  ['Live Traffic Data', TrafficCone],
  ['Remaining Stops', Route],
  ['Historical Route Data', Clock],
  ['Road Zone Speed Limits', Timer],
] as const

export default function ETAEngine() {
  return (
    <Section background="#F1F6EA" label="The ETA Engine" title="How we calculate when your child will actually be home." text="ETA is recalculated every 90 seconds using live data from the road your child's bus is on right now.">
      <div className="relative min-h-[420px] rounded-3xl bg-white border border-[#DDE9D2] p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at center, rgba(217,107,31,0.14), transparent 34%)' }} />
        <motion.div className="absolute left-1/2 top-1/2 w-36 h-36 -ml-18 -mt-18 rounded-full flex flex-col items-center justify-center text-white" style={{ background: '#D96B1F', transform: 'translate(-50%, -50%)' }} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-xs font-bold">ETA</span><motion.span className="text-4xl font-extrabold" animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>12m</motion.span>
        </motion.div>
        {inputs.map(([label, Icon], i) => {
          const positions = ['left-[8%] top-[12%]', 'right-[8%] top-[12%]', 'left-[8%] bottom-[12%]', 'right-[8%] bottom-[12%]', 'left-1/2 -translate-x-1/2 bottom-[6%]']
          return <motion.div key={label} className={`absolute ${positions[i]} rounded-2xl bg-[#FFF9F2] border border-[#DDE9D2] p-4 w-44 text-center`} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}><Icon size={24} color="#D96B1F" className="mx-auto mb-2" /><p className="text-sm font-extrabold" style={{ color: '#183024' }}>{label}</p></motion.div>
        })}
      </div>
      <p className="mt-8 rounded-2xl bg-white p-6 border border-[#DDE9D2] leading-relaxed" style={{ color: '#65785F' }}>All five inputs combine every 90 seconds. A traffic update is sent when the new ETA is more than 3 minutes different from the last one you received. The message is automatic.</p>
    </Section>
  )
}
