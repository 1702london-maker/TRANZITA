'use client'

import { motion } from 'framer-motion'

const words = ['Built From The Ground.', 'For Every Child.']
const pills = ['Built By Budruum Nigeria And UK', '10 Software Developers', 'Made For African School Runs']

export default function AboutHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 pt-32 pb-28 text-center"
      style={{
        background: `
          linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 42%, rgba(241,246,234,0.96) 100%),
          radial-gradient(circle at 18% 22%, rgba(248,200,78,0.2) 0 10%, transparent 28%),
          radial-gradient(circle at 84% 18%, rgba(31,107,70,0.14) 0 12%, transparent 30%),
          repeating-linear-gradient(135deg, rgba(31,107,70,0.045) 0 1px, transparent 1px 22px)
        `,
      }}
    >
      <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="block w-full">
          <rect x="0" y="172" width="1440" height="18" fill="#E5EEDB" />
          {Array.from({ length: 26 }).map((_, i) => (
            <rect key={i} x={i * 58} y={82 + (i % 6) * 12} width={34 + (i % 3) * 11} height={98 - (i % 5) * 12} rx="2" fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} />
          ))}
          <text x="110" y="116" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">LAGOS</text>
          <text x="505" y="96" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">ABUJA</text>
          <text x="860" y="110" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">PORT HARCOURT</text>
          <text x="1235" y="104" fill="#6F875B" fontSize="8" fontWeight="900" letterSpacing="2">KADUNA</text>
        </svg>
        <motion.div className="absolute bottom-4 left-0" animate={{ x: ['-10vw', '108vw'] }} transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}>
          <svg width="116" height="38" viewBox="0 0 116 38">
            <rect x="4" y="4" width="102" height="27" fill="#F28A3D" rx="6" />
            <rect x="4" y="4" width="102" height="9" fill="#D96B1F" rx="6" />
            <rect x="10" y="8" width="20" height="12" fill="rgba(255,255,255,0.38)" rx="2" />
            <rect x="34" y="8" width="15" height="12" fill="rgba(255,255,255,0.28)" rx="2" />
            <rect x="54" y="8" width="15" height="12" fill="rgba(255,255,255,0.28)" rx="2" />
            <circle cx="23" cy="32" r="5" fill="#183024" />
            <circle cx="88" cy="32" r="5" fill="#183024" />
          </svg>
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center pb-24">
        <p className="mb-5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-widest" style={{ background: 'rgba(217,107,31,0.11)', color: '#D96B1F', border: '1px solid rgba(217,107,31,0.18)' }}>About Tranzita</p>
        <h1 className="headline-balance flex flex-wrap justify-center gap-x-4 gap-y-2 font-extrabold leading-tight" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
          {words.map((word, index) => (
            <span key={word} style={{ color: index ? '#D96B1F' : '#183024' }}>
              {word}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: '#65785F' }}>
          Tranzita was shaped by a team that understands African streets, Nigerian schools, working parents, daily traffic, and the responsibility of moving children safely.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#story" className="rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Our Story</a>
          <a href="#partnership" className="rounded-full px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #C9DDBE', background: 'rgba(255,249,242,0.82)' }}>Meet Budruum</a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {pills.map((pill) => <span key={pill} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: 'rgba(255,255,255,0.62)', color: '#213A2B', border: '1px solid rgba(126,160,109,0.28)' }}>{pill}</span>)}
        </div>
      </div>
    </section>
  )
}
