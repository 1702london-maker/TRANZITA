'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const cities = [
  ['Lagos', 135, 230, 'Operating'],
  ['Abuja', 260, 166, 'Coming Soon'],
  ['Port Harcourt', 286, 260, 'Coming Soon'],
  ['Ibadan', 145, 210, 'Mapping'],
  ['Kano', 245, 88, 'Onboarding'],
  ['Enugu', 310, 222, 'Coming'],
  ['Benin', 220, 238, 'Coming'],
  ['Kaduna', 252, 126, 'Coming'],
  ['Jos', 305, 144, 'Coming'],
  ['Warri', 230, 265, 'Coming'],
] as const

export default function FleetExpansion() {
  return (
    <Section background="#FFF9F2" label="Fleet Expansion" title="Lagos is live. Abuja and Port Harcourt are next." text="Tranzita currently serves Lagos. Abuja and Port Harcourt are coming soon, with other cities tracked as future interest areas.">
      <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
        <div className="rounded-3xl bg-white border border-[#DDE9D2] p-6">
          <svg viewBox="0 0 440 340" className="w-full">
            <path d="M172 36 L298 58 L360 134 L346 235 L270 304 L160 292 L92 226 L88 118 Z" fill="#F1F6EA" stroke="#C9DDBE" strokeWidth="4" />
            {cities.map(([name, x, y, status], i) => (
              <motion.g key={name} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: 'spring' }}>
                <motion.circle cx={x} cy={y} r="8" fill={status === 'Operating' ? '#1F6B46' : '#D96B1F'} animate={{ scale: [1, 1.28, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} />
                <text x={x + 12} y={y + 4} fontSize="11" fontWeight="800" fill="#183024">{name}</text>
              </motion.g>
            ))}
          </svg>
        </div>
        <div className="space-y-4">
          {[
            ['Currently Operating', 'Lagos is the current live service area for Tranzita school routes.'],
            ['Coming Soon', 'Abuja and Port Harcourt are the next launch cities. Schools can register interest ahead of route planning.'],
            ['Future Interest', 'Ibadan, Kano, Enugu, Benin City, Kaduna, Jos and Warri are future interest areas, not active service cities yet.'],
          ].map(([title, body], i) => <motion.div key={title} className="rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}><h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3><p style={{ color: '#65785F' }}>{body}</p></motion.div>)}
        </div>
      </div>
    </Section>
  )
}
