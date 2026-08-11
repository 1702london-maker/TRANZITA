'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SPECS = [
  { icon: '🇳🇬', title: 'Made & Coupled in Nigeria', desc: 'Our buses are assembled locally by Nigerian engineers — reducing import costs and keeping skills in Nigeria.' },
  { icon: '⚡', title: 'Electric Powertrain', desc: 'Zero tailpipe emissions. Cooler for children. Quieter on residential roads. Charged using solar-assisted depots.' },
  { icon: '📡', title: 'GPS Built-In', desc: 'Every bus ships with a GPS unit pre-installed. No afterthought — tracking is baked into the vehicle architecture.' },
  { icon: '🛡️', title: 'Child-Safe Certified', desc: 'Window locks, no driver device access while moving, audio-only intercom. Passed Nigerian school transport safety audit.' },
  { icon: '🔧', title: 'Local Maintenance Network', desc: 'Lagos maintenance partners support the current live fleet, with Abuja and Port Harcourt partners planned for launch.' },
  { icon: '🌍', title: 'City Expansion', desc: 'Currently serving Lagos. Abuja and Port Harcourt are coming soon, with wider expansion planned after the first city playbook is proven.' },
]

export default function NigeriaFleet() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="nigeria-fleet" ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Our Fleet
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Partnering with{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>made &amp; coupled in Nigeria</span>
            {' '}buses.
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            We are proud to partner exclusively with Nigerian-assembled electric vehicles. Every Tranzita bus is a statement — that Nigeria builds world-class transport for its own children.
          </motion.p>
        </div>

        {/* Bus illustration */}
        <motion.div
          className="rounded-3xl overflow-hidden mb-12"
          style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="p-8">
            <div className="relative overflow-hidden rounded-2xl" style={{ background: '#F1F6EA', height: 140 }}>
              <div className="absolute bottom-0 left-0 right-0 h-8" style={{ background: '#EDF5E5' }} />
              <div className="absolute bottom-7 left-0 right-0 border-t-2 border-dashed" style={{ borderColor: '#7EA06D' }} />
              <div className="absolute top-4 left-4 flex gap-0.5 rounded overflow-hidden shadow-sm" style={{ width: 32, height: 18 }}>
                <div className="flex-1 bg-green-600" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-green-600" />
              </div>
              <div className="absolute car-drive" style={{ bottom: 8, left: 0 }}>
                <svg width="180" height="62" viewBox="0 0 180 62">
                  <rect x="4" y="6" width="158" height="42" fill="#D96B1F" rx="9" />
                  <rect x="4" y="6" width="158" height="11" fill="#B95418" rx="9" />
                  <rect x="14" y="12" width="25" height="18" fill="rgba(255,255,255,0.35)" rx="3" />
                  <rect x="44" y="12" width="20" height="18" fill="rgba(255,255,255,0.25)" rx="3" />
                  <rect x="69" y="12" width="20" height="18" fill="rgba(255,255,255,0.25)" rx="3" />
                  <rect x="94" y="12" width="20" height="18" fill="rgba(255,255,255,0.25)" rx="3" />
                  <rect x="119" y="12" width="20" height="18" fill="rgba(255,255,255,0.25)" rx="3" />
                  <rect x="2" y="40" width="162" height="5" fill="#A94F16" rx="2" />
                  <circle cx="28" cy="54" r="8" fill="#183024" />
                  <circle cx="28" cy="54" r="3" fill="#7EA06D" />
                  <circle cx="136" cy="54" r="8" fill="#183024" />
                  <circle cx="136" cy="54" r="3" fill="#7EA06D" />
                  <text x="72" y="36" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">TRANZITA</text>
                  <rect x="6" y="30" width="18" height="8" fill="#F5D840" rx="2" />
                  <text x="7" y="37" fill="#183024" fontSize="6" fontWeight="800">EV</text>
                </svg>
              </div>
              <div className="absolute top-3 right-10 text-2xl">🌳</div>
              <div className="absolute top-5 right-28 text-xl">🌳</div>
              <div className="absolute top-2 right-48 text-2xl">🌳</div>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECS.map((spec, i) => (
            <motion.div
              key={i}
              className="glow-card gradient-frame rounded-2xl p-6 transition-all"
              style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <span className="text-3xl">{spec.icon}</span>
              <h3 className="font-bold text-base mt-3 mb-2" style={{ color: '#183024' }}>{spec.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

