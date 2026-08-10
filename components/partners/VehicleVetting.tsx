'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

const points = ['Engine', 'Tyres', 'Interior', 'GPS', 'Safety Kit', 'Documents']

export default function VehicleVetting() {
  return (
    <section className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Vetting Process" title="We vet your car the same way we vet our crew. Thoroughly." text="Every vehicle carrying children on a Tranzita route must meet our vehicle standard before it joins the fleet." />
        <div className="mx-auto mt-12 max-w-5xl rounded-[32px] bg-white p-8" style={{ border: '1px solid #DDE9D2' }}>
          <div className="relative mx-auto aspect-[2/1] max-w-3xl">
            <svg viewBox="0 0 700 350" className="h-full w-full">
              <rect x="140" y="95" width="420" height="160" rx="70" fill="#FFF0E4" stroke="#D96B1F" strokeWidth="4" />
              <rect x="245" y="70" width="210" height="80" rx="38" fill="#FFF9F2" stroke="#DDE9D2" strokeWidth="3" />
              <circle cx="230" cy="255" r="34" fill="#183024" />
              <circle cx="470" cy="255" r="34" fill="#183024" />
              <rect x="300" y="165" width="100" height="54" rx="14" fill="#F8C84E" opacity="0.45" />
            </svg>
            {points.map((point, i) => (
              <motion.div key={point} className="absolute rounded-full px-3 py-2 text-xs font-extrabold" style={{ left: `${18 + i * 13}%`, top: `${24 + (i % 2) * 42}%`, background: '#D96B1F', color: 'white' }} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: 'spring' }} animate={{ y: [0, -4, 0] }}>
                {point}
              </motion.div>
            ))}
          </div>
          <p className="mt-8 rounded-[24px] p-5 text-center text-lg font-extrabold" style={{ background: '#FFF0E4', color: '#183024' }}>
            Every certified vehicle receives a Tranzita Vehicle Certification badge and is re-inspected regularly.
          </p>
        </div>
      </div>
    </section>
  )
}
