'use client'

import { motion } from 'framer-motion'
import { SectionIntro, fadeUp } from './Shared'

const lines = [
  'This is for the mother in Lekki who has called the driver four times and gotten no answer.',
  'This is for the father in Abuja who leaves a meeting early because he cannot concentrate until he knows his daughter is home.',
  'This is for the grandparent in Port Harcourt who sits by the window every afternoon watching the road.',
  'This is for the child who waits at the school gate long after their classmates have left because the bus is late and there is no one to call.',
  'This is for every school principal who has had to tell a parent they do not know where the bus is.',
  'This is for every Nigerian family who has accepted that this is just how it is. It does not have to be.',
  "Tranzita is for Nigeria. Built by Nigerians. Funded by belief in Nigerian children. Operated by people who understand that every child on every bus is someone's entire world.",
]

export default function ThisIsForNigeria() {
  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-5xl">
        <SectionIntro label="This Is For Nigeria" title="This is for every parent who ever stood at a gate wondering." subtitle="This is personal. From both founders. To every Nigerian family." />
        <motion.div className="mt-12 space-y-6" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}>
          {lines.map((line) => <motion.p key={line} className="text-xl font-bold leading-relaxed sm:text-2xl" style={{ color: '#183024' }} variants={fadeUp}>{line}</motion.p>)}
          <motion.div className="h-1 rounded-full" style={{ background: '#D96B1F' }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} />
          <motion.p className="text-center text-3xl font-extrabold sm:text-5xl" style={{ color: '#D96B1F' }} variants={fadeUp}>
            Every child. On time. Safe home.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
