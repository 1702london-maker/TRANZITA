'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STORY = [
  { time: '3:00 PM', text: 'School closes. Your child walks to the gate.' },
  { time: '3:15 PM', text: 'You send a WhatsApp to the driver. No reply.' },
  { time: '3:30 PM', text: 'You call the school. They do not know either.' },
  { time: '3:45 PM', text: "You call your child's friend's mother. Also waiting." },
  { time: '4:15 PM', text: 'You are now standing at your gate.' },
  { time: '4:45 PM', text: 'Still nothing. You are considering calling the police.' },
  { time: '5:30 PM', text: 'The bus arrives. The driver says there was traffic.' },
  { time: '5:31 PM', text: 'You have no way to verify that. You never do.' },
]

const CLOCK_TIMES = [
  '3:00', '3:15', '3:30', '3:45', '4:15', '4:45', '5:30', '5:31',
]

export default function ProblemClock() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setStep(s => {
        if (s < STORY.length - 1) return s + 1
        clearInterval(interval)
        return s
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section ref={ref} className="py-0" style={{ background: '#111810' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 min-h-[600px]">
        {/* Clock */}
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#E8601C' }}>
            Right now. In Lagos. Abuja. Port Harcourt.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl px-10 py-8 text-center"
            style={{ background: '#0A0F08', border: '2px solid rgba(245,216,64,0.2)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(245,216,64,0.5)' }}>Current Time</p>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-black tabular-nums"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', color: '#F5D840', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {CLOCK_TIMES[step]}
            </motion.p>
            <p className="text-sm mt-2" style={{ color: 'rgba(245,216,64,0.4)' }}>PM</p>
          </motion.div>
          <motion.p
            className="text-xs mt-6 text-center max-w-xs"
            style={{ color: 'rgba(255,249,242,0.35)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            This scenario plays out for millions of Nigerian families every single school day.
          </motion.p>
        </div>

        {/* Narrative */}
        <div className="flex flex-col justify-center py-20 px-8 lg:border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="space-y-4">
            {STORY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={i <= step ? { opacity: 1, x: 0 } : { opacity: 0.15, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <span className="text-xs font-black shrink-0 mt-0.5 tabular-nums"
                  style={{ color: i <= step ? '#E8601C' : 'rgba(232,96,28,0.3)', minWidth: 52 }}>
                  {item.time}
                </span>
                <p className="text-sm leading-relaxed"
                  style={{ color: i <= step ? 'rgba(255,249,242,0.85)' : 'rgba(255,249,242,0.2)' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Orange banner */}
      <div className="py-5 px-6 text-center" style={{ background: '#E8601C' }}>
        <p className="font-bold text-base sm:text-lg text-white">
          This is the daily reality for over 2 million Nigerian parents. Tranzita exists to end it. Here is exactly how.
        </p>
      </div>
    </section>
  )
}
