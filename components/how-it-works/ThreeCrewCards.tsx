'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CREW = [
  {
    title: 'The Driver',
    icon: '🚌',
    color: '#E8601C',
    role: 'Lead operator. Eyes on the road. Always.',
    duties: [
      'Operates the vehicle at all times and is solely responsible for safe driving',
      'Holds an FRSC-approved defensive driving certificate renewed annually',
      'Route-certified by Tranzita for every school zone on their specific assignment',
      'Speed monitored in real time by the Tranzita platform throughout every journey',
      'Cannot use any personal device while the vehicle is in motion — phone locked by the driver app',
      'Reports directly to the Tranzita operations centre before, during, and after every route',
      'Any speed breach results in an immediate audio alert and operations notification',
      'Re-certified every 12 months with no exceptions and no extensions',
    ],
  },
  {
    title: 'The Co-Driver',
    icon: '👤',
    color: '#2D7A6A',
    role: "The children's point of contact from pickup to front door.",
    duties: [
      'Manages all boarding and alighting at every stop on the route',
      'Calls each child by name from the verified manifest before they board',
      'Operates the tap-on and tap-off system for every child at every stop',
      'Communicates with parents via the Tranzita system if any question arises en route',
      'Monitors child wellbeing and behaviour throughout the entire journey',
      'Trained in child safeguarding, conflict de-escalation, and emergency communication',
      'Never sits in the front cab — always in the passenger area with the children at all times',
      'Separately vetted from the driver with no shared references permitted under any circumstances',
    ],
  },
  {
    title: 'The Onboard Nurse',
    icon: '🩺',
    color: '#7A1A2E',
    role: 'A registered nurse. On every route. Every single day.',
    duties: [
      'Holds a current and verified Nigerian nursing registration',
      'Carries a fully stocked first aid and emergency response kit on every journey',
      'Conducts a visible wellness check on each child as they board the bus',
      'Monitors all children throughout the route for any signs of distress, illness, or injury',
      'Can initiate emergency protocols without waiting for driver instruction',
      'Communicates directly with parents if any health concern arises during the journey',
      'Has a direct line to the Tranzita medical liaison and the nearest hospital on every route',
      'Re-registered and health-screened annually with results submitted to Tranzita',
    ],
  },
]

export default function ThreeCrewCards() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>Who Is On Every Bus</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            Three vetted professionals.<br />
            <span style={{ color: '#E8601C' }}>One bus. Zero compromise.</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#6B7F6B' }}>
            Every Tranzita bus operates with a Driver, a Co-Driver, and a Nurse — all independently vetted before they ever sit on one of our buses. No child is ever alone with a single adult.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {CREW.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, type: 'spring', damping: 20 }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${c.color}22` }}
              className="rounded-3xl p-8 flex flex-col transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2EDD8',
                borderTop: `4px solid ${c.color}`,
              }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ background: `${c.color}12` }}>
                {c.icon}
              </div>
              <h3 className="font-extrabold text-xl mb-1" style={{ color: '#1E2B1E' }}>{c.title}</h3>
              <p className="text-sm font-medium mb-5" style={{ color: c.color }}>{c.role}</p>
              <ul className="space-y-2.5 flex-1">
                {c.duties.map((d, j) => (
                  <li key={j} className="flex gap-2.5 text-sm" style={{ color: '#6B7F6B' }}>
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: c.color }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E2EDD8' }}>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: `${c.color}12`, color: c.color }}>
                  6-Stage Vetted Independently
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="rounded-3xl p-8 sm:p-10"
          style={{ background: '#1E2B1E' }}
        >
          <h3 className="font-extrabold text-xl sm:text-2xl mb-3" style={{ color: '#FFF9F2' }}>
            None of the three crew members can vouch for each other.
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#8FA88F' }}>
            Each crew member is vetted completely independently by three separate Tranzita review teams running in parallel. They may not know each other before assignment day. References, background checks, and biometric verification are never shared across the three vetting processes. This is not an accident. It is a policy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
