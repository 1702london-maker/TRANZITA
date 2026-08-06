'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HOW_IT_WORKS } from '@/lib/constants'

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4" style={{ background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Simple Process
          </motion.p>
          <motion.h2
            className="font-black text-4xl sm:text-5xl"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            How Tranzita Works
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector SVG */}
          <svg className="hidden lg:block absolute top-16 left-0 right-0 w-full" height="4" style={{ zIndex: 0 }}>
            <motion.line
              x1="12%" y1="2" x2="88%" y2="2"
              stroke="#E0EAE0" strokeWidth="2" strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E0EAE0',
                  borderTop: '4px solid #E8601C',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(44,58,44,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                  style={{ background: '#E8601C' }}
                >
                  {step.step}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2B1E' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

