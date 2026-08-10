'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const pills = ['Zero Emission Electric Fleet', 'GPS Pre-Installed Every Vehicle', 'Child Safe Certified']

export default function FleetHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Our Fleet</motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {['Built In Nigeria.', 'For Nigerian Children.'].map((line, i) => <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.58 }}>{line}</motion.span>)}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>Every Tranzita bus is a locally assembled electric vehicle. Zero emissions. GPS built in. Child safe certified. Made by Nigerian engineers for Nigerian roads.</motion.p>
        <motion.div className="relative mx-auto mb-8 max-w-3xl" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.72, duration: 0.7 }}>
          <div className="absolute inset-x-8 bottom-0 h-10 rounded-full blur-2xl" style={{ background: 'rgba(217,107,31,0.24)' }} />
          <svg viewBox="0 0 720 260" className="relative w-full drop-shadow-2xl">
            <path d="M40 224 C180 110, 420 110, 680 224" stroke="#DDE9D2" strokeWidth="18" fill="none" strokeLinecap="round" />
            <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="92" y="70" width="520" height="118" rx="22" fill="#F28A3D" />
              <rect x="92" y="70" width="520" height="32" rx="22" fill="#D96B1F" />
              {[126, 190, 254, 318, 382, 446].map((x) => <rect key={x} x={x} y="92" width="45" height="46" rx="7" fill="rgba(255,255,255,0.36)" />)}
              <rect x="500" y="146" width="72" height="24" rx="7" fill="#FFF9F2" />
              <text x="536" y="163" textAnchor="middle" fill="#183024" fontSize="13" fontWeight="900">OMAR</text>
              <rect x="116" y="148" width="42" height="22" rx="5" fill="#F8C84E" />
              <text x="137" y="164" textAnchor="middle" fill="#183024" fontSize="12" fontWeight="900">EV</text>
              <text x="294" y="165" fill="#fff" fontSize="31" fontWeight="900">TRANZITA</text>
              <rect x="574" y="82" width="34" height="20" rx="2" fill="#fff" />
              <rect x="574" y="82" width="11" height="20" fill="#1F6B46" /><rect x="597" y="82" width="11" height="20" fill="#1F6B46" />
              <circle cx="182" cy="202" r="24" fill="#183024" /><circle cx="182" cy="202" r="9" fill="#7EA06D" />
              <circle cx="512" cy="202" r="24" fill="#183024" /><circle cx="512" cy="202" r="9" fill="#7EA06D" />
            </motion.g>
          </svg>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-3 mb-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <a href="#fleet-spec" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>See The Fleet <ArrowRight size={16} /></a>
          <a href="#partner" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Partner With Us</a>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2">{pills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + i * 0.12 }}>{pill}</motion.span>)}</div>
      </div>
    </section>
  )
}
