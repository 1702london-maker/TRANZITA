'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 5081, suffix: '', label: 'Road deaths reported in Nigeria in 2023', source: 'FRSC 2023' },
  { value: 5289, suffix: '', label: 'Road deaths reported in Nigeria in 2025', source: 'FRSC 2025' },
  { value: 15, suffix: '/day', label: 'Approximate daily average from 2025 deaths', source: 'Calculated from FRSC 2025' },
  { value: 365, suffix: ' days', label: 'A school transport risk that runs all year', source: 'Tranzita safety review' },
]

export default function CasualtiesStats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [counts, setCounts] = useState(STATS.map(() => 0))

  useEffect(() => {
    if (!inView) return
    STATS.forEach((s, i) => {
      const duration = 2000
      const steps = 60
      const step = s.value / steps
      let current = 0
      const timer = setInterval(() => {
        current = Math.min(current + step, s.value)
        setCounts(prev => { const n = [...prev]; n[i] = Math.round(current); return n })
        if (current >= s.value) clearInterval(timer)
      }, (duration / steps) + i * 120)
    })
  }, [inView])

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Nigeria Road Safety Crisis
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our roads are not safe.{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>Your child&apos;s journey should be.</span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Reckless, unregulated school runs put Nigerian children at risk every day. Tranzita exists to change that with criminal-background-checked drivers, co-drivers, onboard nurses, and GPS-monitored routes.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className={`${i === 0 ? '' : 'gradient-frame'} rounded-3xl p-6 text-center`}
              style={{
                background: i === 0 ? '#D96B1F' : '#FFFFFF',
                border: i === 0 ? 'none' : '1px solid #DDE9D2',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className="font-extrabold text-5xl mb-2" style={{ color: i === 0 ? 'white' : '#D96B1F' }}>
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div className="font-semibold text-sm mb-2 leading-tight" style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : '#183024' }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: i === 0 ? 'rgba(255,255,255,0.55)' : '#7EA06D' }}>
                Source: {s.source}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="p-8 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-extrabold text-2xl mb-4" style={{ color: '#183024' }}>
                The unregulated school run is Nigeria&apos;s hidden danger
              </h3>
              <div className="space-y-3">
                {[
                  'Okada and keke drivers running unmonitored school routes',
                  'No criminal checks, no vehicle inspections',
                  'Reckless speeding on congested Lagos, Abuja and PH roads',
                  'Parents with no way to know where their child is',
                  'Accidents that never make the news but devastate families',
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">!</span>
                    </div>
                    <p className="text-sm" style={{ color: '#65785F' }}>{line}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'rgba(217,107,31,0.04)', border: '1px solid rgba(217,107,31,0.12)' }}>
              <div className="text-2xl mb-3">🛡️</div>
              <h4 className="font-extrabold text-lg mb-3" style={{ color: '#183024' }}>The Tranzita Standard</h4>
              <div className="space-y-2">
                {[
                  'Driver + Co-Driver + Nurse on every bus',
                  '6-stage vetting for all three crew members',
                  'GPS-monitored routes with speed alerts',
                  'Child tap-on / tap-off safety system',
                  'Zero tolerance for dangerous driving',
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span style={{ color: '#D96B1F' }} className="font-bold text-sm">✓</span>
                    <p className="text-sm" style={{ color: '#183024' }}>{item}</p>
                  </div>
                ))}
              </div>
              <motion.a
                href="#demo"
                className="mt-5 block text-center py-3 rounded-full font-bold text-white text-sm"
                style={{ background: '#D96B1F' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request a Safety Audit →
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
