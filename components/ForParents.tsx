'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MESSAGES = [
  { from: 'system', text: '✅ Chidi has been picked up. Bus TRZ-03 · 8:12 AM' },
  { from: 'parent', text: 'Thank you! Where is the bus now?' },
  { from: 'system', text: '📍 Bus is on Lekki-Epe Expressway. ETA school: 8:35 AM' },
  { from: 'system', text: '🏫 Chidi has arrived at Lagos International School · 8:33 AM' },
  { from: 'system', text: '✅ Chidi tapped off bus. Drop-off confirmed · 3:58 PM' },
]

export default function ForParents() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="for-parents" ref={ref} className="py-24 px-4" style={{ background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            For Parents
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Peace of mind delivered via{' '}
            <span style={{ color: '#25D366' }}>WhatsApp.</span>
          </motion.h2>
          <motion.p
            className="mb-8 leading-relaxed"
            style={{ color: '#6B7F6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            No app to install. No new password to remember. Tranzita works where you already work — WhatsApp. Every pickup, every drop-off, every location update.
          </motion.p>
          <div className="space-y-3">
            {[
              { icon: '💬', text: 'Works on WhatsApp — zero extra apps' },
              { icon: '📍', text: 'Live map link sent with every update' },
              { icon: '🔔', text: 'Alerts even when your phone is on silent' },
              { icon: '👨‍👩‍👧', text: 'Multiple family members can receive alerts' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm font-medium" style={{ color: '#1E2B1E' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="float-phone">
            <div className="rounded-[3rem] shadow-2xl overflow-hidden" style={{ width: 270, background: '#FAFAF8', border: '2px solid #E0EAE0' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#25D366' }}>
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🚌</div>
                <div>
                  <p className="text-white text-sm font-bold">Tranzita</p>
                  <p className="text-white/70 text-xs">Online</p>
                </div>
              </div>
              <div className="p-3 space-y-2" style={{ background: '#ECE5DD', minHeight: 360 }}>
                {MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 1.4 }}
                  >
                    <div
                      className="rounded-xl px-3 py-2 max-w-[85%] text-xs leading-relaxed shadow-sm"
                      style={{ background: msg.from === 'parent' ? '#DCF8C6' : '#FFFFFF', color: '#1E2B1E' }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
