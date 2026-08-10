'use client'

import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 86, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block w-full h-[120px]">
          <rect x="0" y="110" width="1440" height="20" fill="#E5EEDB" />
          {[90, 250, 430, 610, 800, 990, 1190, 1340].map((x, i) => <rect key={x} x={x - 34} y={58 + (i % 3) * 10} width="68" height={62 - (i % 3) * 4} rx="3" fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} />)}
        </svg>
        <div className="absolute bus-drive" style={{ bottom: 14, left: 0 }}><svg width="110" height="38" viewBox="0 0 110 38"><rect x="3" y="4" width="98" height="27" rx="6" fill="#F28A3D" /><rect x="3" y="4" width="98" height="9" rx="6" fill="#D96B1F" />{[10, 32, 54, 76].map((x) => <rect key={x} x={x} y="8" width="14" height="11" rx="2" fill="rgba(255,255,255,0.35)" />)}<circle cx="22" cy="33" r="5" fill="#183024" /><circle cx="82" cy="33" r="5" fill="#183024" /></svg></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center pb-16">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Contact</motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {['Talk To', 'The Tranzita Team.'].map((line, i) => <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.58 }}>{line}</motion.span>)}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>We are a real team of real people. No ticketing systems. No three day response windows. WhatsApp us, email us, or book a call. We respond fast.</motion.p>
      </div>
    </section>
  )
}
