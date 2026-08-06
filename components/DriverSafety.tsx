'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CHECKS = [
  'Criminal Records Bureau clearance — mandatory',
  'Defensive driving certification (FRSC approved)',
  'Child protection & safeguarding training',
  'Vehicle safety inspection every 30 days',
  'Medical fitness clearance & drug screening',
  'ID verification with biometric photo',
]

const CREW = [
  {
    role: 'Driver',
    icon: '🚌',
    color: '#E8601C',
    desc: 'Lead operator — DBS cleared, FRSC certified, route-trained for every school zone.',
  },
  {
    role: 'Co-Driver',
    icon: '👤',
    color: '#2C5F2E',
    desc: 'Monitors children, manages boarding & alighting, communicates with parents. Separately vetted.',
  },
  {
    role: 'Nurse',
    icon: '🩺',
    color: '#7A1A2E',
    desc: 'On-bus registered nurse for every route — first aid certified, child health trained.',
  },
]

export default function DriverSafety() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="safety" ref={ref} className="py-24 px-4" style={{ background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">

        {/* 3-person crew cards */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Every Bus. Every Route.
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Three vetted professionals.{' '}
            <span style={{ color: '#E8601C' }}>One bus.</span>
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto"
            style={{ color: '#6B7F6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Every Tranzita bus operates with a Driver, a Co-Driver, and a Nurse — all independently vetted. Your child is never alone with one stranger.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {CREW.map((c, i) => (
            <motion.div
              key={i}
              className="rounded-3xl p-7 text-center"
              style={{ background: '#FFFFFF', border: '1px solid #E0EAE0', borderTop: `4px solid ${c.color}` }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: '#F2F5F0' }}
              >
                {c.icon}
              </div>
              <p className="font-extrabold text-xl mb-2" style={{ color: '#1E2B1E' }}>{c.role}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{c.desc}</p>
              <span
                className="inline-block mt-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${c.color}15`, color: c.color }}
              >
                Independently vetted ✓
              </span>
            </motion.div>
          ))}
        </div>

        {/* Driver ID + checklist */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Driver ID card */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="rounded-3xl p-8 w-full max-w-sm shadow-lg"
              style={{ background: '#F2F5F0', border: '1px solid #E0EAE0' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#E8601C' }}>Tranzita Driver ID</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8FA88F' }}>Nigeria School Transport Network</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
              </div>

              <div className="flex gap-5 items-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#E0EAE0' }}>👨‍✈️</div>
                <div>
                  <p className="font-extrabold text-lg" style={{ color: '#1E2B1E' }}>Emeka Okafor</p>
                  <p className="text-xs font-semibold" style={{ color: '#E8601C' }}>Senior Driver · Lagos North</p>
                  <p className="text-xs mt-1" style={{ color: '#8FA88F' }}>ID: TRZ-0048-NG</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {['DBS Cleared', 'Child Safety Trained', 'Zero Incidents', 'FRSC Certified'].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#1E2B1E' }}>{tag}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: '#E0EAE0' }}>
                <div className="text-2xl">📋</div>
                <div>
                  <p className="text-xs" style={{ color: '#6B7F6B' }}>Scan to verify</p>
                  <p className="text-xs font-bold" style={{ color: '#E8601C' }}>Active · Verified 2026</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checklist */}
          <div>
            <motion.p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#E8601C' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              6-Stage Vetting
            </motion.p>
            <motion.h3
              className="font-extrabold text-3xl sm:text-4xl mb-4"
              style={{ color: '#1E2B1E' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Only the <span style={{ color: '#E8601C' }}>safest hands</span> drive your children.
            </motion.h3>
            <motion.p
              className="mb-8 leading-relaxed"
              style={{ color: '#6B7F6B' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Criminal clearance is mandatory — no exceptions. All three crew members pass the same 6-stage process independently.
            </motion.p>
            <div className="space-y-3">
              {CHECKS.map((check, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: '#F2F5F0', border: '1px solid #E0EAE0' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 checker-tick"
                    style={{ background: '#E8601C' }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 400 }}
                  >
                    ✓
                  </motion.div>
                  <span className="font-medium text-sm" style={{ color: '#1E2B1E' }}>{check}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
