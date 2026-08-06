'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  { icon: '📊', title: 'Live Dashboard', desc: 'See every bus, every child, and every route in real time from your school admin panel.' },
  { icon: '🗺️', title: 'Smart Route Planning', desc: 'Routes are auto-clustered by postcode and student home address — reducing journey time by up to 40%.' },
  { icon: '📋', title: 'Attendance Integration', desc: 'Bus attendance syncs directly with your school MIS — no double entry, no paper registers.' },
  { icon: '📢', title: 'Parent Communications', desc: 'Send trip updates, delays, or schedule changes to all parents via WhatsApp from the school portal.' },
  { icon: '🔐', title: 'Safeguarding Reports', desc: 'Automatic incident reports, driver behaviour flags, and full journey audit trails stored securely.' },
  { icon: '💳', title: 'Transparent Billing', desc: 'Per-trip billing, term invoices, or subscription plans — all managed through the school finance portal.' },
]

export default function ForSchools() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="for-schools" ref={ref} className="py-24 px-4" style={{ background: '#F2F5F0' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            For Schools
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Give your school a{' '}
            <span style={{ color: '#E8601C' }}>transport command centre.</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              className="glow-card rounded-2xl p-6 transition-all"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0EAE0',
                borderTop: '3px solid #E8601C',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#1E2B1E' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
