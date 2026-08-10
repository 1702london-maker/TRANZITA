'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  ['Request a Demo', 'Book a 30 minute call. We map your school routes live using your actual student locations so you see how Tranzita works for your roads before committing.'],
  ['We Onboard Your School', 'From contract signing to first live route takes 10 working days. We register students, optimise routes, assign crew, onboard parents and train your admin team.'],
  ['Your First Live Day', 'Your coordinator watches every bus on the dashboard, every parent receives updates, every child gets home safely, and your school receives a day-one report.'],
]

export default function GetStarted() {
  return (
    <>
      <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Get Started</motion.p>
            <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Your school could be live in 10 working days.</motion.h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#65785F' }}>No long procurement process. No IT project. Just a focused 30 minute conversation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(([title, text], i) => (
              <motion.div key={title} className="gradient-frame rounded-2xl p-7 text-center" style={{ background: '#fff' }} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.14 }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-black" style={{ background: '#D96B1F' }}>{i + 1}</div>
                <h3 className="font-extrabold text-2xl mb-3" style={{ color: '#183024' }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}>
            <svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#fff" /><circle cx="34" cy="48" r="6" fill="#fff" /><circle cx="126" cy="48" r="6" fill="#fff" /></svg>
          </div>
        ))}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance" style={{ color: '#183024' }}>Ready to make every school run safe?</h2>
          <p className="mb-8 text-lg" style={{ color: '#65785F' }}>Join schools across Nigeria already running the safest school transport programme in the country.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#demo" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: '#D96B1F' }}>Request a Demo <ArrowRight size={16} /></a>
            <a href="/#for-parents" className="rounded-full border px-6 py-3 text-sm font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>For Parents</a>
          </div>
        </div>
      </section>
    </>
  )
}
