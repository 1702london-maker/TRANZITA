'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function NurseSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [flipped, setFlipped] = useState(false)

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#1E2B1E' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Nurse</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl" style={{ color: '#FFF9F2' }}>
            Every bus. <span style={{ color: '#E8601C' }}>A qualified nurse.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ID Card flip */}
          <div className="flex justify-center">
            <div
              onClick={() => setFlipped(f => !f)}
              className="cursor-pointer"
              style={{ width: 280, height: 380, perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front: ID Card */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ background: '#FFFFFF', backfaceVisibility: 'hidden' }}>
                  <div className="h-16 flex items-center px-4 gap-2" style={{ background: '#E8601C' }}>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-600 font-black text-xs">T</div>
                    <div>
                      <p className="text-white font-bold text-xs">TRANZITA</p>
                      <p className="text-white text-xs opacity-70">STAFF IDENTIFICATION</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-4xl">👩‍⚕️</div>
                    <div className="text-center">
                      <p className="font-extrabold text-lg" style={{ color: '#1E2B1E' }}>Blessing Okonkwo</p>
                      <p className="text-xs font-bold" style={{ color: '#E8601C' }}>REGISTERED NURSE</p>
                      <p className="text-xs mt-1" style={{ color: '#6B7F6B' }}>Reg. No: NRN/2019/04821</p>
                    </div>
                    <div className="w-full rounded-xl p-3" style={{ background: '#F1F6EA' }}>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ color: '#6B7F6B' }}>Route</span>
                          <span className="font-bold" style={{ color: '#1E2B1E' }}>Lagos Island S.</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: '#6B7F6B' }}>DBS Cleared</span>
                          <span className="font-bold" style={{ color: '#22c55e' }}>Verified</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: '#6B7F6B' }}>First Aid</span>
                          <span className="font-bold" style={{ color: '#22c55e' }}>Certified 2025</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: '#8FA88F' }}>Tap to see clearances</p>
                  </div>
                </div>

                {/* Back: Clearances */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col"
                  style={{ background: '#0A1A0A', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="font-bold text-white mb-4">Clearance & Qualification</p>
                  {[
                    { label: 'NMCN Registered', value: 'Active 2025' },
                    { label: 'Paediatric First Aid', value: 'Certified' },
                    { label: 'Police Clearance', value: 'Passed' },
                    { label: 'DBS Check', value: 'Enhanced' },
                    { label: 'Child Safety Training', value: 'Completed' },
                    { label: 'Allergy Protocol', value: 'Trained' },
                    { label: 'Emergency Response', value: 'Certified' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                      <span className="text-xs font-bold" style={{ color: '#22c55e' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,249,242,0.72)' }}>
              Nigeria has no legal requirement for school buses to carry medical personnel. We chose to anyway. Every Tranzita bus carries a NMCN-registered nurse on every route, morning and afternoon.
            </p>
            <div className="space-y-4">
              {[
                { title: 'What the nurse carries', desc: 'Paediatric first aid kit, EpiPen for registered allergies, blood pressure monitor, pulse oximeter, glucometer, asthma inhalers for registered children, emergency medications per individual health profiles.' },
                { title: 'What the nurse monitors', desc: 'Every child with a registered health note is actively monitored from boarding to drop-off. The nurse logs observations in the app. If anything changes, the parent and school are notified immediately.' },
                { title: 'What happens in an emergency', desc: 'The nurse initiates the emergency protocol. The bus stops at the nearest approved facility. The operations centre is notified within 30 seconds. Parents and the school are contacted simultaneously.' },
                { title: 'What parents must provide', desc: 'Every child\'s health profile must include known allergies, chronic conditions, current medications, and any relevant history. This information is encrypted and only accessible to the assigned nurse.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="font-bold text-sm mb-1" style={{ color: '#E8601C' }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,249,242,0.6)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
