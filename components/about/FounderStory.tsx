'use client'

import { motion } from 'framer-motion'
import { SectionIntro, fadeUp } from './Shared'

const paragraphs = [
  'Zita is a mother. She knows the morning routine every Nigerian parent knows: get them up, fed, dressed, packed, and to the gate. Watch the bus pull away. And then, silence.',
  'No message to say they arrived safely. No alert when they boarded in the afternoon. No way to know whether the bus was stuck in traffic or whether something had gone wrong between school and home.',
  'Like many parents, she learned to live with the anxiety and tell herself that no news was probably good news. Until she decided that normalising the worry was not good enough for her children or for any child in Nigeria.',
  'The technology to track a vehicle in real time exists. WhatsApp updates exist. Vetted crew and trained nurses exist. None of it is impossible. It just needed someone to insist that it should be done.',
  'So Zita drew the vision for safe Nigerian school transport: not what was easiest, not what was cheapest, but what every Nigerian child deserved.',
]

export default function FounderStory() {
  return (
    <section id="story" className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Founder" title="Zita knew this feeling better than anyone." subtitle="Because she lived it. Every school day." />
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div className="relative rounded-[32px] p-8 text-center" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 520" fill="none" preserveAspectRatio="none">
              <motion.rect x="2" y="2" width="416" height="516" rx="32" stroke="#D96B1F" strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
            </svg>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #FFF0E4, #F1F6EA)' }}>
              <span className="text-7xl font-extrabold" style={{ color: '#D96B1F' }}>Z</span>
            </div>
            <h3 className="mt-7 text-4xl font-extrabold" style={{ color: '#183024' }}>Zita</h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color: '#7EA06D' }}>Founder of Tranzita</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}>
            {paragraphs.map((text) => (
              <motion.p key={text} className="mb-5 text-base leading-relaxed sm:text-lg" style={{ color: '#65785F' }} variants={fadeUp}>{text}</motion.p>
            ))}
            <motion.blockquote className="mt-8 rounded-[28px] p-7 text-2xl font-extrabold leading-snug" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid rgba(217,107,31,0.24)' }} variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}>
              "I put my children on that bus every day and I felt what every Nigerian mother feels. I just refused to accept that the feeling was permanent."
              <span className="mt-4 block text-sm font-bold" style={{ color: '#D96B1F' }}>Zita, Founder - Tranzita</span>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
