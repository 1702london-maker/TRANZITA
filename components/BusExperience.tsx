'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Electric & Clean',
    desc: 'Our fleet runs on locally-assembled electric vehicles — zero emissions, quiet, and cooler for the children.',
    tag: 'Zero Emissions',
  },
  {
    icon: '🛡️',
    title: 'Child-Safe Environment',
    desc: 'Audio-only intercom, no personal devices for drivers, GPS-locked routes, and child-safe window locks throughout.',
    tag: 'Child First',
  },
  {
    icon: '🏠',
    title: 'Home By 4:30',
    desc: 'Optimised routes mean children arrive home by 4:30 PM — time for homework, dinner, and family.',
    tag: 'Every Day',
  },
]

export default function BusExperience() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            The Bus Experience
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Not just transport.{' '}
            <span style={{ color: '#E8601C' }}>A commitment.</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="glow-card rounded-3xl p-8 transition-all"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0EAE0',
                borderTop: '4px solid #E8601C',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ background: '#F2F5F0' }}>
                {f.icon}
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block" style={{ background: 'rgba(232,96,28,0.08)', color: '#E8601C' }}>
                {f.tag}
              </span>
              <h3 className="font-bold text-xl mb-3" style={{ color: '#1E2B1E' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
