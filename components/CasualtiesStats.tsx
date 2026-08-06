'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 5000, suffix: '+', label: 'Road deaths yearly in Nigeria', source: 'FRSC 2023' },
  { value: 40, suffix: '%', label: 'Of accidents involve commercial vehicles', source: 'FRSC Data' },
  { value: 18, suffix: 'x', label: 'Higher risk on unregulated school runs', source: 'Road Safety Audit' },
  { value: 70, suffix: '%', label: 'Of school-run accidents — reckless speed', source: 'LASG Report' },
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
    <section ref={ref} className="py-24 px-4" style={{ background: '#F2F5F0' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Nigeria Road Safety Crisis
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our roads are not safe.{' '}
            <span style={{ color: '#E8601C' }}>Your child&apos;s journey should be.</span>
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#6B7F6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Reckless, unregulated school runs put thousands of Nigerian children at risk every day. Tranzita exists to change that — with verified drivers, co-drivers, onboard nurses, and GPS-monitored routes.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className="rounded-3xl p-6 text-center"
              style={{
                background: i === 0 ? '#E8601C' : '#FFFFFF',
                border: i === 0 ? 'none' : '1px solid #E0EAE0',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className="font-extrabold text-5xl mb-2" style={{ color: i === 0 ? 'white' : '#E8601C' }}>
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div className="font-semibold text-sm mb-2 leading-tight" style={{ color: i === 0 ? 'rgba(255,255,255,0.9)' : '#1E2B1E' }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: i === 0 ? 'rgba(255,255,255,0.55)' : '#8FA88F' }}>
                Source: {s.source}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '1px solid #E0EAE0' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="p-8 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-extrabold text-2xl mb-4" style={{ color: '#1E2B1E' }}>
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
                    <p className="text-sm" style={{ color: '#6B7F6B' }}>{line}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'rgba(232,96,28,0.04)', border: '1px solid rgba(232,96,28,0.12)' }}>
              <div className="text-2xl mb-3">🛡️</div>
              <h4 className="font-extrabold text-lg mb-3" style={{ color: '#1E2B1E' }}>The Tranzita Standard</h4>
              <div className="space-y-2">
                {[
                  'Driver + Co-Driver + Nurse on every bus',
                  '6-stage vetting for all three crew members',
                  'GPS-monitored routes with speed alerts',
                  'Child tap-on / tap-off safety system',
                  'Zero tolerance for dangerous driving',
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span style={{ color: '#E8601C' }} className="font-bold text-sm">✓</span>
                    <p className="text-sm" style={{ color: '#1E2B1E' }}>{item}</p>
                  </div>
                ))}
              </div>
              <motion.a
                href="#demo"
                className="mt-5 block text-center py-3 rounded-full font-bold text-white text-sm"
                style={{ background: '#E8601C' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Protect My Child →
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
