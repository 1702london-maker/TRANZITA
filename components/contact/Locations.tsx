'use client'

import { motion } from 'framer-motion'
import { Section, email } from './Shared'

const locations = [
  ['Lagos Operations', 'Current service area. Serving Lagos schools first across Lagos Island, Lagos Mainland, Lekki, Victoria Island, Ikeja, Surulere, Yaba, Ajah, and nearby school corridors by route review.'],
  ['Abuja Coming Soon', 'Abuja is in the coming-soon pipeline. Schools across Maitama, Wuse, Garki, Gwarinpa, Jabi, Asokoro, Kubwa, and nearby districts can register interest ahead of launch.'],
  ['Port Harcourt Coming Soon', 'Port Harcourt is also coming soon. Schools and parents can register interest now so route mapping can begin when the city opens.'],
]

export default function Locations() {
  return (
    <Section background="#FFF9F2" label="Where We Are" title="Lagos is currently served." text="Abuja and Port Harcourt are coming soon. Other cities can register interest for future route planning.">
      <div className="grid md:grid-cols-3 gap-6">
        {locations.map(([title, body], i) => <motion.div key={title} className="gradient-frame rounded-2xl p-7" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}><h3 className="font-extrabold text-2xl mb-3" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed mb-4" style={{ color: '#65785F' }}>{body}</p><p className="text-sm font-bold" style={{ color: '#D96B1F' }}>Contact: {email}</p><p className="text-sm mt-1" style={{ color: '#65785F' }}>Depot visits available by appointment.</p></motion.div>)}
      </div>
      <div className="mt-8 rounded-2xl p-7 text-white text-center font-bold" style={{ background: 'linear-gradient(90deg, #1F6B46 0%, #D96B1F 100%)' }}>Currently serving Lagos. Abuja and Port Harcourt are next.</div>
    </Section>
  )
}
