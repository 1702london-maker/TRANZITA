'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const blocks = [
  ['Why We Partner With Nigerian Manufacturers', 'Nigeria has the engineering capability to build world-class electric vehicles. Sourcing from Nigerian assembly operations keeps cost lower, reduces import dependency and puts maintenance in the hands of engineers who know the fleet.'],
  ['The Manufacturing Standard', 'Every bus is assembled to a Tranzita-defined specification covering powertrain, safety systems, passenger interior, GPS, audio, camera and NFC reader. No bus enters service without acceptance inspection.'],
  ['Local Maintenance Network', 'Certified auto centres in Lagos maintain the current live fleet. Abuja and Port Harcourt maintenance partners are planned for launch. Maintenance events are logged, and no bus operates past its scheduled service date.'],
]

export default function MadeInNigeria() {
  return (
    <Section background="#FFF9F2" label="Made In Nigeria" title="Every Tranzita bus is assembled by Nigerian engineers in Nigeria." text="We partner with Nigerian-assembled electric vehicles because Nigerian children should travel in vehicles built by Nigerian hands.">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div className="rounded-3xl p-8 border border-[#DDE9D2]" style={{ background: '#F1F6EA' }} initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <svg viewBox="0 0 520 340" className="w-full">
            <rect x="55" y="115" width="410" height="155" rx="12" fill="#FFFFFF" />
            <rect x="80" y="85" width="360" height="55" rx="8" fill="#F8C84E" />
            <text x="260" y="120" textAnchor="middle" fontSize="20" fontWeight="900" fill="#183024">NIGERIAN EV ASSEMBLY</text>
            <rect x="95" y="170" width="90" height="60" fill="#DDE9D2" /><rect x="215" y="170" width="90" height="60" fill="#DDE9D2" /><rect x="335" y="170" width="90" height="60" fill="#DDE9D2" />
            <rect x="70" y="58" width="42" height="26" fill="#fff" /><rect x="70" y="58" width="14" height="26" fill="#1F6B46" /><rect x="98" y="58" width="14" height="26" fill="#1F6B46" />
            <rect x="150" y="248" width="220" height="44" rx="9" fill="#F28A3D" /><circle cx="190" cy="298" r="10" fill="#183024" /><circle cx="330" cy="298" r="10" fill="#183024" />
          </svg>
        </motion.div>
        <div className="space-y-4">
          {blocks.map(([title, body], i) => <motion.div key={title} className="rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}><h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p></motion.div>)}
        </div>
      </div>
    </Section>
  )
}
