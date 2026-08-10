'use client'

import { motion } from 'framer-motion'
import { Section, email } from './Shared'

const locations = [
  ['Lagos Operations', 'Primary operations hub for Nigeria. Serving Lagos Island, Lagos Mainland, Lekki, Victoria Island, Ikeja, Surulere, Yaba, Ajah, and expanding across all LGAs.'],
  ['Abuja Operations', 'Serving schools across the FCT including Maitama, Wuse, Garki, Gwarinpa, Jabi, Asokoro, Kubwa, and major residential districts.'],
]

export default function Locations() {
  return (
    <Section background="#FFF9F2" label="Where We Are" title="Find us across Nigeria." text="Tranzita operations are based in Lagos and Abuja with teams expanding to Port Harcourt, Ibadan, and Kano.">
      <div className="grid md:grid-cols-2 gap-6">
        {locations.map(([title, body], i) => <motion.div key={title} className="gradient-frame rounded-2xl p-7" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}><h3 className="font-extrabold text-2xl mb-3" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed mb-4" style={{ color: '#65785F' }}>{body}</p><p className="text-sm font-bold" style={{ color: '#D96B1F' }}>Contact: {email}</p><p className="text-sm mt-1" style={{ color: '#65785F' }}>Depot visits available by appointment.</p></motion.div>)}
      </div>
      <div className="mt-8 rounded-2xl p-7 text-white text-center font-bold" style={{ background: 'linear-gradient(90deg, #1F6B46 0%, #D96B1F 100%)' }}>Expanding to Port Harcourt, Ibadan, Kano, Enugu, Kaduna, Benin City, and Jos through 2025 and 2026.</div>
    </Section>
  )
}
