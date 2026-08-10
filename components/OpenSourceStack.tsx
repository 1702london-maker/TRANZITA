'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STACK = [
  {
    icon: '🔐',
    name: 'End-to-End Encryption',
    desc: 'All parent and child data is encrypted in transit and at rest. No third party ever touches your data.',
  },
  {
    icon: '📍',
    name: 'GPS Tracking',
    desc: 'Every bus is tracked every 30 seconds. Parents see the live map. Schools see the full dashboard.',
  },
  {
    icon: '🤖',
    name: 'AI Route Optimisation',
    desc: 'Our system learns your routes, traffic patterns, and school timetables to find the fastest path home.',
  },
  {
    icon: '💳',
    name: 'Cashless Payments',
    desc: 'Parents pay monthly via card, bank transfer, or USSD. No cash on buses, ever.',
  },
  {
    icon: '🩺',
    name: 'Health Monitoring',
    desc: 'Our onboard nurse can flag medical concerns during the ride and notify parents in real time.',
  },
  {
    icon: '📊',
    name: 'School Dashboard',
    desc: 'Schools get a live operations view — attendance, route completion, driver logs, and incident reports.',
  },
]

export default function OpenSourceStack() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Platform
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Built for{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>Nigerian schools.</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Every feature was designed around the realities of Nigerian roads, traffic, and school culture.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STACK.map((item, i) => (
            <motion.div
              key={i}
              className="gradient-frame rounded-2xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(44,58,44,0.08)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: '#F1F6EA' }}>
                {item.icon}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#183024' }}>{item.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
