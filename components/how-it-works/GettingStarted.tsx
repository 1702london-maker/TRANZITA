'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const CARDS = [
  {
    step: '01',
    title: 'Schools apply first',
    desc: 'Tranzita works with the school. The school registers, provides the student list and approved route zones. A Tranzita onboarding manager is assigned within 24 hours.',
    color: '#1E2B1E',
  },
  {
    step: '02',
    title: 'Routes are mapped and crewed',
    desc: 'Our operations team maps every route, clusters home addresses, assigns a driver, co-driver, and nurse to each bus, and runs a full test route before any children board.',
    color: '#E8601C',
  },
  {
    step: '03',
    title: 'Parents onboard in minutes',
    desc: 'Parents receive their registration link from the school. Setup takes under 10 minutes. The app is live from day one. No technical knowledge required.',
    color: '#2A3D2A',
  },
]

const PRICING = [
  { label: 'Per child per term', price: 'Contact us', note: 'Pricing varies by route density and city' },
  { label: 'School dashboard', price: 'Included', note: 'No additional fee for the school admin portal' },
  { label: 'Parent app', price: 'Free', note: 'iOS and Android, always included' },
  { label: 'WhatsApp notifications', price: 'Included', note: 'All notifications included in the route fee' },
  { label: 'Nurse per route', price: 'Included', note: 'Every route includes a registered nurse' },
  { label: 'Setup and onboarding', price: 'Included', note: 'No setup fees. No hidden costs.' },
]

export default function GettingStarted() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const card1y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const card2y = useTransform(scrollYProgress, [0, 1], [0, -60])
  const card3y = useTransform(scrollYProgress, [0, 1], [0, -90])

  const cardYs = [card1y, card2y, card3y]

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>Getting Started</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            From signup to <span style={{ color: '#E8601C' }}>first safe run.</span>
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#6B7F6B' }}>
            Three steps. Five to ten working days. Then your school is live.
          </p>
        </div>

        {/* Stacking cards */}
        <div ref={containerRef} className="relative flex flex-col gap-4 mb-20">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              style={{ y: cardYs[i] }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-3xl p-8 sm:p-10"
              style={{ background: card.color }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <span className="font-extrabold text-5xl sm:text-7xl leading-none shrink-0"
                  style={{ color: 'rgba(255,255,255,0.12)' }}>{card.step}</span>
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl mb-3 text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: '#FFFFFF', border: '2px solid #E2EDD8', boxShadow: '0 20px 60px rgba(44,58,44,0.06)' }}
        >
          <div className="px-8 py-6" style={{ background: '#1E2B1E' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Pricing</p>
            <h3 className="font-extrabold text-2xl text-white">What is included in every route.</h3>
          </div>
          <div className="divide-y" style={{ borderColor: '#E2EDD8' }}>
            {PRICING.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.06 }}
                className="flex items-center justify-between px-8 py-4"
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1E2B1E' }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8FA88F' }}>{item.note}</p>
                </div>
                <span className="font-bold text-sm shrink-0 ml-4" style={{ color: item.price === 'Included' || item.price === 'Free' ? '#22c55e' : '#E8601C' }}>
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-base mb-6" style={{ color: '#6B7F6B' }}>
            The best way to understand Tranzita is to see the live platform with your school's own routes and data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/#demo"
              className="px-8 py-4 rounded-2xl font-bold text-white text-base inline-block"
              style={{ background: '#E8601C' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Request a Free Demo
            </motion.a>
            <motion.a
              href={`https://wa.me/2348000000000?text=${encodeURIComponent('Hi, I am interested in Tranzita for my school.')}`}
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl font-bold text-base inline-block"
              style={{ background: '#25D366', color: 'white' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              WhatsApp Us
            </motion.a>
            <motion.a
              href="mailto:booking@transzita.africa"
              className="px-8 py-4 rounded-2xl font-bold text-base inline-block"
              style={{ background: '#F1F6EA', color: '#1E2B1E', border: '1px solid #E2EDD8' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Email Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
