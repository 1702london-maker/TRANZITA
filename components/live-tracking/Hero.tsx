'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const pills = ['GPS Updates Every 30 Seconds', 'WhatsApp Alerts At Every Step', 'No App Required']
const roads = ['M40 160 C170 70 280 210 430 96 S610 55 700 150', 'M70 310 C210 190 330 270 520 172 S650 190 720 96', 'M80 70 C210 115 300 50 470 120 S600 240 720 205']

export default function LiveTrackingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 760 420" preserveAspectRatio="none">
        {roads.map((d, i) => <path key={d} d={d} stroke={i % 2 ? '#DDE9D2' : '#C9DDBE'} strokeWidth="12" fill="none" strokeLinecap="round" />)}
        {roads.map((d, i) => (
          <motion.circle key={`bus-${i}`} r="9" fill="#D96B1F" animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: `path('${d}')`, filter: 'drop-shadow(0 0 12px rgba(217,107,31,0.55))' }} />
        ))}
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.18), transparent 24%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Live Tracking</motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {['Every Bus.', 'Every Child.', 'Every Second.', 'Live.'].map((line, i) => <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.58 }}>{line}</motion.span>)}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>Tranzita gives every parent a live view of their child&apos;s exact location from the moment they board to the moment they walk through the front door.</motion.p>
        <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }}>
          <a href="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>See How It Works <ArrowRight size={16} /></a>
          <a href="/#demo" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Request a Demo</a>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2">{pills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + i * 0.12 }}>{pill}</motion.span>)}</div>
      </div>
    </section>
  )
}
