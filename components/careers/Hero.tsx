'use client'

import { motion } from 'framer-motion'

const roles = [['Drivers', '#drivers'], ['Co-Drivers', '#co-drivers'], ['Nurses', '#nurses'], ['Operations', '#operations']]
const pills = ['Competitive Pay', 'Full Vetting Support', 'Career Progression']

export default function CareersHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="block w-full h-[180px]"><rect x="0" y="172" width="1440" height="18" fill="#E5EEDB" />{[90,250,430,610,800,990,1190,1340].map((x,i)=><rect key={x} x={x-34} y={78+(i%3)*16} width="68" height={94-(i%3)*7} rx="3" fill={i%2?'#DDE9D2':'#EDF5E5'} />)}</svg>
        <div className="absolute bus-drive" style={{ bottom: 18, left: 0 }}><svg width="120" height="42" viewBox="0 0 120 42"><rect x="3" y="5" width="108" height="29" rx="7" fill="#F28A3D" /><rect x="3" y="5" width="108" height="10" rx="7" fill="#D96B1F" />{[12,36,60,84].map(x=><rect key={x} x={x} y="10" width="15" height="12" rx="2" fill="rgba(255,255,255,0.35)" />)}<circle cx="25" cy="36" r="5" fill="#183024" /><circle cx="88" cy="36" r="5" fill="#183024" /></svg></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center pb-24">
        <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Careers</motion.p>
        <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
          {['Join The Team', 'Keeping Nigerian', 'Children Safe.'].map((line, i) => <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.58 }}>{line}</motion.span>)}
        </h1>
        <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}>Tranzita is building Nigeria&apos;s safest school transport network. We are looking for drivers, co-drivers, nurses, and operations professionals who share that mission.</motion.p>
        <motion.div className="flex flex-wrap justify-center gap-3 mb-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>{roles.map(([label, href], i) => <a key={label} href={href} className="px-5 py-3 rounded-full text-sm font-bold border" style={{ background: i===0 ? '#D96B1F' : 'rgba(255,255,255,0.72)', color: i===0 ? '#fff' : '#183024', borderColor: '#C9DDBE' }}>{label}</a>)}</motion.div>
        <div className="flex flex-wrap justify-center gap-2">{pills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 + i * 0.12 }}>{pill}</motion.span>)}</div>
      </div>
    </section>
  )
}
