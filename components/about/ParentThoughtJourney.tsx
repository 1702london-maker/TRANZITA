'use client'

import { motion } from 'framer-motion'
import { Briefcase, Bus, Home, Moon, School, Sunrise } from 'lucide-react'
import { SectionIntro } from './Shared'

const moments = [
  {
    title: 'Wake Up',
    text: 'Uniform. Lunch. Homework. Water bottle. The day starts before the sun settles.',
    icon: Sunrise,
    x: 9,
    y: 68,
  },
  {
    title: 'Bus Leaves',
    text: 'The child gets in. The bus turns the corner. The parent starts checking the phone.',
    icon: Bus,
    x: 26,
    y: 38,
  },
  {
    title: 'School Day',
    text: 'Meetings continue, but one part of the mind keeps asking: did they arrive safely?',
    icon: School,
    x: 45,
    y: 55,
  },
  {
    title: 'At Work',
    text: 'A parent tries to focus, but every silence feels longer than it should.',
    icon: Briefcase,
    x: 63,
    y: 32,
  },
  {
    title: 'Late Afternoon',
    text: 'Traffic builds. Calls may not connect. The worry becomes a full-body thing.',
    icon: Moon,
    x: 78,
    y: 58,
  },
  {
    title: 'Home Panic',
    text: 'The gate is watched. The phone is held. Relief only comes when the child is seen.',
    icon: Home,
    x: 91,
    y: 34,
  },
]

const emotions = [
  { label: 'Rushed', x: 11, y: 39 },
  { label: 'Hopeful', x: 25, y: 25 },
  { label: 'Silent', x: 40, y: 42 },
  { label: 'Distracted', x: 58, y: 23 },
  { label: 'Worried', x: 73, y: 43 },
  { label: 'Panicked', x: 88, y: 22 },
]

export default function ParentThoughtJourney() {
  return (
    <section className="overflow-hidden px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          label="Parent Thoughts"
          title="The school day stress nobody should have to normalise."
          subtitle="Before Tranzita, the journey home often felt like a line of unanswered questions. This is the feeling Zita refused to accept."
        />

        <div className="relative mt-14 overflow-hidden rounded-[34px] p-5 sm:p-8" style={{ background: 'white', border: '1px solid #DDE9D2', boxShadow: '0 22px 70px rgba(31,107,70,0.08)' }}>
          <div className="relative z-0 h-64 overflow-hidden rounded-[28px]" style={{ background: 'linear-gradient(180deg, #FFF9F2 0%, #FFFFFF 100%)', border: '1px solid #DDE9D2' }}>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 260" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M75 175 C190 35 290 45 380 135 C485 240 570 55 690 72 C825 88 825 215 955 115 C1045 45 1110 80 1140 65"
                stroke="#D96B1F"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="10 16"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.95 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M75 175 C190 35 290 45 380 135 C485 240 570 55 690 72 C825 88 825 215 955 115 C1045 45 1110 80 1140 65"
                stroke="#C9DDBE"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 2.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            {emotions.map((emotion, index) => (
              <motion.div
                key={emotion.label}
                className="absolute rounded-full px-3 py-1.5 text-xs font-extrabold"
                style={{
                  left: `${emotion.x}%`,
                  top: `${emotion.y}%`,
                  color: '#D96B1F',
                  background: 'rgba(255,240,228,0.74)',
                  border: '1px solid rgba(217,107,31,0.18)',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.86 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.4 + index * 0.12 }}
                animate={{ y: [0, -4, 0] }}
              >
                {emotion.label}
              </motion.div>
            ))}

            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-[2] opacity-75"
              animate={{ x: ['5%', '88%'], y: ['64%', '20%', '50%', '18%'] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="rounded-full px-3 py-2 shadow-lg" style={{ background: '#FFF0E4', border: '1px solid rgba(217,107,31,0.25)' }}>
                <Bus size={24} color="#D96B1F" />
              </div>
            </motion.div>
          </div>

          <div className="relative z-10 mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {moments.map((moment, index) => {
              const Icon = moment.icon
              return (
                <motion.div
                  key={moment.title}
                  className="rounded-[24px] p-5"
                  style={{
                    background: 'rgba(255,255,255,0.94)',
                    border: '1px solid #DDE9D2',
                    boxShadow: '0 16px 42px rgba(31,107,70,0.1)',
                  }}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.13, duration: 0.45 }}
                  whileHover={{ y: -6, boxShadow: '0 22px 60px rgba(217,107,31,0.16)' }}
                >
                  <motion.span
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ background: '#FFF0E4', color: '#D96B1F' }}
                    animate={{ rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <Icon size={22} />
                  </motion.span>
                  <h3 className="text-lg font-extrabold" style={{ color: '#183024' }}>{moment.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#65785F' }}>{moment.text}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="relative z-20 mt-8 rounded-[28px] p-6 text-center md:mt-0"
            style={{ background: 'linear-gradient(100deg, #FFF0E4 0%, #FFF9F2 46%, #F28A3D 100%)', border: '1px solid rgba(217,107,31,0.22)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-xl font-extrabold sm:text-2xl" style={{ color: '#183024' }}>
              Tranzita turns that silent worry into visible, timed, accountable updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
