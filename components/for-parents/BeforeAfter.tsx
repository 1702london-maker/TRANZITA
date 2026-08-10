'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const before = ['3:00 PM - School closes. You message the driver. No reply.', '3:30 PM - You call the school. They do not know either.', '4:00 PM - You call other parents to ask if anyone has heard anything.', '4:45 PM - You are standing at your gate.', '5:30 PM - The bus arrives. The driver says there was traffic.', '5:31 PM - You have no way to verify that. You never do.', '6:00 PM - Three hours of stress. Every school day.']
const after = ['3:04 PM - Bus TRZ-004 has departed. Pickup ETA 3:20 PM.', '3:18 PM - Amara has boarded. Co-driver Fatima. Nurse Sister Agnes on board.', '3:20 PM - You open the tracking link and see the bus on the map.', '3:35 PM - Traffic update. Revised ETA 3:58 PM.', '3:54 PM - Bus is 4 minutes away. Please ensure a guardian is at the door.', '3:57 PM - Amara is home. Dropped off safely. Journey complete.']

export default function BeforeAfter() {
  return (
    <Section background="#FFF9F2" label="How It Feels" title="This is what being a Tranzita parent feels like." text="Most parents spend afternoons in uncertainty. Tranzita replaces that uncertainty with live updates.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Column title="Before Tranzita" items={before} tone="#65785F" />
        <Column title="With Tranzita" items={after} tone="#1F6B46" />
      </div>
      <motion.div className="mt-8 rounded-2xl p-7 text-white font-bold text-center text-xl" style={{ background: '#D96B1F' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>39 minutes. Every step visible. Zero anxiety. Every day.</motion.div>
    </Section>
  )
}

function Column({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="gradient-frame rounded-2xl p-6" style={{ background: '#FFFFFF' }}>
      <h3 className="font-extrabold text-2xl mb-5" style={{ color: '#183024' }}>{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div key={item} className="rounded-xl p-4 border border-[#DDE9D2]" style={{ color: '#183024', background: '#FFF9F2' }} initial={{ opacity: 0, x: title.startsWith('Before') ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <span className="font-bold" style={{ color: tone }}>{item.split(' - ')[0]}</span> - {item.split(' - ').slice(1).join(' - ')}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
