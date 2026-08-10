'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const quotes = [
  ['Before Tranzita I was driving a danfo for twelve years. Nobody knew my name. Now I have a Tranzita ID that parents can scan. My children can see I have a proper job with a proper company.', 'Emeka O.', 'Driver, Lagos North Routes', 'Lagos'],
  ['I was a primary school teacher for six years. I still work with children every day. I know every child on my route by name, and their parents know my name.', 'Fatima B.', 'Co-Driver, Abuja Central Routes', 'Abuja'],
  ['The morning and afternoon transport hours fit my life better than hospital shifts. And I use my training every day. That is why I do this.', 'Sister Agnes C.', 'Onboard Nurse, Lagos Island Routes', 'Lagos'],
]

export default function CrewQuotes() {
  return (
    <Section background="#F1F6EA" label="What Our Crew Say" title="In their own words." text="Real perspectives from people who drive, co-drive, and nurse on Tranzita routes.">
      <div className="grid md:grid-cols-3 gap-6">
        {quotes.map(([quote, name, role, city], i) => (
          <motion.div key={name} className="rounded-2xl bg-white p-7 border border-[#DDE9D2]" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -5 }}>
            <div className="text-5xl font-extrabold mb-4" style={{ color: '#D96B1F' }}>&quot;</div>
            <p className="leading-relaxed mb-5" style={{ color: '#65785F' }}>{quote}</p>
            <p className="font-extrabold" style={{ color: '#183024' }}>{name}</p>
            <p className="text-sm" style={{ color: '#D96B1F' }}>{role}</p>
            <p className="text-xs" style={{ color: '#7EA06D' }}>{city}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
