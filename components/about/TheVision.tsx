'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

const cities = [
  ['Lagos', 43, 72, 'Active'],
  ['Abuja', 52, 48, 'Coming Soon'],
  ['Port Harcourt', 57, 83, 'Coming Soon'],
  ['Ibadan', 40, 66, 'Coming Soon'],
  ['Kano', 55, 26, 'Coming Soon'],
  ['Enugu', 59, 69, 'Coming Soon'],
  ['Kaduna', 52, 35, 'Coming Soon'],
  ['Benin City', 47, 73, 'Coming Soon'],
  ['Jos', 58, 43, 'Coming Soon'],
]

export default function TheVision() {
  return (
    <section className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Vision" title="Lagos first. Nigeria next." subtitle="Zita started with a mother's question. Lagos is the live starting point, with Abuja and Port Harcourt coming soon." />
        <div className="mx-auto mt-12 max-w-4xl rounded-[32px] p-6" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
          <div className="relative mx-auto aspect-[4/3] max-w-3xl">
            <svg viewBox="0 0 400 300" className="h-full w-full">
              <path d="M204 24 244 45 265 80 295 103 288 142 311 184 276 222 246 262 202 274 164 246 122 238 93 197 112 153 92 118 119 80 160 58Z" fill="#F1F6EA" stroke="#C9DDBE" strokeWidth="3" />
              <path d="M161 61 181 111 157 151 191 181 175 244" fill="none" stroke="#DDE9D2" strokeWidth="2" />
              <path d="M244 46 225 101 252 141 231 205 246 262" fill="none" stroke="#DDE9D2" strokeWidth="2" />
            </svg>
            {cities.map(([city, x, y, status], index) => {
              const active = status === 'Active'
              return (
                <motion.div
                  key={city as string}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, type: 'spring', stiffness: 180 }}
                >
                  <motion.span
                    className="block h-4 w-4 rounded-full"
                    style={{ background: active ? '#D96B1F' : '#F8C84E', boxShadow: active ? '0 0 0 8px rgba(217,107,31,0.14)' : '0 0 0 7px rgba(248,200,78,0.16)' }}
                    animate={{ scale: [1, 1.22, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  />
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[10px] font-extrabold shadow-sm" style={{ color: '#183024' }}>{city}</span>
                </motion.div>
              )
            })}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed" style={{ color: '#65785F' }}>
            Tranzita currently serves Lagos. Abuja and Port Harcourt are the next planned cities, with wider Nigerian expansion only after the Lagos operating model is proven and repeatable.
          </p>
        </div>
      </div>
    </section>
  )
}
