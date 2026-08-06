'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MESSAGES = [
  { text: "Your child's Tranzita bus TRZ-004 is departing now. Pickup ETA: 3:20 PM. Track live here 🔗", from: 'system' },
  { text: 'Amara has boarded bus TRZ-004. Co-driver: Fatima. Nurse: Sister Agnes. ETA home: 3:52 PM. Track here 🔗', from: 'system' },
  { text: 'Bus update — slight traffic on Lekki Expressway. Revised ETA: 3:58 PM. Still well within the window.', from: 'system' },
  { text: "Amara's bus is arriving in approximately 4 minutes. Please ensure a verified guardian is at the door.", from: 'system' },
  { text: 'Amara has been dropped off safely. 3:57 PM. Received by: Mrs Okafor. Journey complete. Have a lovely evening. 🏠', from: 'system' },
  { text: 'Journey summary for Amara — Boarded 3:18 PM, Dropped off 3:57 PM. Total journey time: 39 minutes. See full log here 🔗', from: 'system' },
]

const FEATURES = [
  { icon: '💬', title: 'No app to download', desc: 'Everything works through WhatsApp. You already have it. Just save the Tranzita number and the messages will find you at every step of the journey.' },
  { icon: '📍', title: 'You see the live map', desc: 'Every alert includes a live GPS link. Tap it and see exactly where the bus is at that moment on a real map.' },
  { icon: '👨‍👩‍👧', title: 'Multiple guardians receive alerts', desc: 'Add a spouse, a grandparent, a nanny, or anyone who needs to know. Up to four verified guardians can receive alerts for the same child.' },
  { icon: '🔔', title: 'Alerts arrive even on silent', desc: 'WhatsApp notifications arrive even when your phone is on silent mode. You will not miss the message that matters.' },
  { icon: '🧑‍💼', title: 'You speak to a real person', desc: 'Reply to any Tranzita message and a member of the operations team responds. Not an automated reply. A person. Within minutes.' },
  { icon: '🎒', title: 'Something left on the bus', desc: 'Reply directly to any message or WhatsApp the admin line. The operations team will locate the item and arrange return the same day where possible.' },
]

export default function ParentExperience() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Parent Experience</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            You are informed at <span style={{ color: '#E8601C' }}>every single step.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            Tranzita was built around one question. What does a parent actually need to feel calm? The answer was not a dashboard. It was a WhatsApp message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Features */}
          <div className="space-y-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: '#1E2B1E' }}>{f.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="rounded-[3rem] shadow-2xl overflow-hidden" style={{ width: 280, border: '2px solid #E2EDD8', background: '#FAFAF8' }}>
                {/* WhatsApp header */}
                <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#25D366' }}>
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">🚌</div>
                  <div>
                    <p className="text-white text-sm font-bold">Tranzita</p>
                    <p className="text-white/70 text-xs">Online</p>
                  </div>
                </div>
                {/* Messages */}
                <div className="p-3 space-y-2.5" style={{ background: '#E5DDD5', minHeight: 380 }}>
                  {MESSAGES.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 1.2, duration: 0.4 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-xl px-3 py-2 max-w-[90%] text-xs leading-relaxed shadow-sm"
                        style={{ background: '#FFFFFF', color: '#1E2B1E' }}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
