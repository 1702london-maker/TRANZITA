'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num: 1,
    title: 'School sends you the invite',
    desc: 'The school registers with Tranzita and uploads its student list. You receive a text message with a unique registration link for your child. No app download required to start.',
    side: 'left',
  },
  {
    num: 2,
    title: 'Create your family profile',
    desc: 'You enter your child\'s details: name, photo, class, home address, health notes, known allergies, and up to four authorised guardians. Each guardian is verified independently.',
    side: 'right',
  },
  {
    num: 3,
    title: 'Download the parent app',
    desc: 'Available on iOS and Android. You log in with the same credentials. The app is immediately linked to your child\'s manifest and their assigned route and crew.',
    side: 'left',
  },
  {
    num: 4,
    title: 'Receive crew details every morning',
    desc: 'By 7 AM every school day you receive the names, photos, and Tranzita ID numbers of the driver, co-driver, and nurse assigned to your child\'s route. You can verify any crew member by scanning their QR code in the app.',
    side: 'right',
  },
  {
    num: 5,
    title: 'Track in real time after school',
    desc: 'From 2:55 PM you can open the app and see the live bus location on a map. You receive notifications when the bus leaves school and when your child is tapped on board.',
    side: 'left',
  },
  {
    num: 6,
    title: 'Receive the safe drop confirmation',
    desc: 'The moment the co-driver walks your child to your door and marks the drop-off complete, you receive a push notification, WhatsApp message, and SMS simultaneously.',
    side: 'right',
  },
  {
    num: 7,
    title: 'Review the journey log',
    desc: 'Every completed journey is logged in the app: departure time, route taken, all stops, arrival time, crew members, and any notes from the nurse. Stored for 90 days.',
    side: 'left',
  },
]

function RollingCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = () => {
      start += Math.ceil(target / 40)
      if (start >= target) { setCount(target); return }
      setCount(start)
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function ParentPortalWalkthrough() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>For Parents</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            What it looks like <span style={{ color: '#E8601C' }}>for you.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            From the day the school signs up to the moment your child is home — here is exactly what you experience.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { num: 2100000, label: 'Parents reached', suffix: '+' },
            { num: 7, label: 'Days to onboard', suffix: '' },
            { num: 99, label: 'Notification rate', suffix: '%' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-5 text-center"
              style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}
            >
              <p className="font-extrabold text-2xl sm:text-3xl" style={{ color: '#E8601C' }}>
                <RollingCounter target={s.num} />{s.suffix}
              </p>
              <p className="text-xs mt-1" style={{ color: '#6B7F6B' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Alternating steps */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" style={{ background: '#E2EDD8' }} />

          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: step.side === 'left' ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex items-center gap-8 ${step.side === 'right' ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Card */}
                <div className="flex-1 rounded-2xl p-6"
                  style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}>
                  <p className="font-bold text-base mb-2" style={{ color: '#1E2B1E' }}>{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{step.desc}</p>
                </div>

                {/* Step number */}
                <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg hidden lg:flex"
                  style={{ background: '#E8601C', color: 'white', zIndex: 10, position: 'relative' }}>
                  {step.num}
                </div>

                {/* Empty spacer for alternating */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
