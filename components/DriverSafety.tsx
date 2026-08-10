'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CHECKS = [
  'Criminal Records Bureau clearance - mandatory',
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
    color: '#D96B1F',
    desc: 'Lead operator - criminal-background-checked, FRSC certified, route-trained for every school zone.',
  },
  {
    role: 'Co-Driver',
    icon: '👤',
    color: '#1F6B46',
    desc: 'Monitors children, manages boarding & alighting, communicates with parents. Separately vetted.',
  },
  {
    role: 'Nurse',
    icon: '🩺',
    color: '#7A1A2E',
    desc: 'On-bus registered nurse for every route - first aid certified, child health trained.',
  },
]

export default function DriverSafety() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="safety" ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Every Bus. Every Route.
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Three vetted professionals.{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>One bus.</span>
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Every Tranzita bus operates with a Driver, a Co-Driver, and a Nurse - all independently vetted. Your child is never alone with one stranger.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {CREW.map((c, i) => (
            <motion.div
              key={i}
              className="gradient-frame rounded-3xl p-7 text-center"
              style={{ background: '#FFFFFF' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                style={{ background: '#F1F6EA' }}
              >
                {c.icon}
              </div>
              <p className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{c.role}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{c.desc}</p>
              <span
                className="inline-block mt-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${c.color}15`, color: c.color }}
              >
                Independently vetted ✓
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div
              className="rounded-3xl p-8 w-full max-w-sm shadow-lg"
              style={{ background: '#F1F6EA', border: '1px solid #DDE9D2' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#D96B1F' }}>Tranzita Driver ID</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7EA06D' }}>Nigeria School Transport Network</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
              </div>

              <div className="flex gap-5 items-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: '#DDE9D2' }}>👨‍✈️</div>
                <div>
                  <p className="font-extrabold text-lg" style={{ color: '#183024' }}>Emeka Okafor</p>
                  <p className="text-xs font-semibold" style={{ color: '#D96B1F' }}>Senior Driver · Lagos North</p>
                  <p className="text-xs mt-1" style={{ color: '#7EA06D' }}>ID: TRZ-0048-NG</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {['Background Checked', 'Child Safety Trained', 'Zero Incidents', 'FRSC Certified'].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#183024' }}>{tag}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: '#DDE9D2' }}>
                <div className="text-2xl">📋</div>
                <div>
                  <p className="text-xs" style={{ color: '#65785F' }}>Scan to verify</p>
                  <p className="text-xs font-bold" style={{ color: '#D96B1F' }}>Active · Verified 2026</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#D96B1F' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              6-Stage Vetting
            </motion.p>
            <motion.h3
              className="font-extrabold text-3xl sm:text-4xl mb-4 headline-balance"
              style={{ color: '#183024' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Only the <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>safest hands</span> drive your children.
            </motion.h3>
            <motion.p
              className="mb-8 leading-relaxed"
              style={{ color: '#65785F' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              Criminal clearance is mandatory - no exceptions. All three crew members pass the same 6-stage process independently.
            </motion.p>
            <div className="space-y-3">
              {CHECKS.map((check, i) => (
                <motion.div
                  key={i}
                  className="gradient-frame flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: '#F1F6EA' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.45 + i * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 checker-tick"
                    style={{ background: '#D96B1F' }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 400 }}
                  >
                    ✓
                  </motion.div>
                  <span className="font-medium text-sm" style={{ color: '#183024' }}>{check}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
