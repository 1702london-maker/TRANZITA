'use client'

import { motion } from 'framer-motion'
import { BusFront, Car, ShieldCheck } from 'lucide-react'

const words = ['Your Car.', 'Our Drivers.', "Nigeria's Safest Fleet."]
const vehicles = Array.from({ length: 18 }, (_, i) => ({ top: 8 + (i % 6) * 14, delay: i * -1.4, duration: 18 + (i % 5) * 4, Icon: i % 3 === 0 ? BusFront : Car }))

export default function PartnersHero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-32 pb-24 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {vehicles.map(({ top, delay, duration, Icon }, index) => (
          <motion.div key={index} className="absolute" style={{ top: `${top}%`, color: '#D96B1F' }} initial={{ x: '110vw' }} animate={{ x: '-15vw' }} transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}>
            <Icon size={index % 3 === 0 ? 58 : 42} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center justify-center">
        <p className="mb-5 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-widest" style={{ background: 'rgba(217,107,31,0.11)', color: '#D96B1F', border: '1px solid rgba(217,107,31,0.18)' }}>Partner Programme</p>
        <h1 className="headline-balance flex flex-wrap justify-center gap-x-4 gap-y-2 font-extrabold leading-tight" style={{ fontSize: 'clamp(2.35rem, 6vw, 4rem)' }}>
          {words.map((word, index) => <motion.span key={word} style={{ color: index === 2 ? '#D96B1F' : '#183024' }} initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.12, duration: 0.55 }}>{word}</motion.span>)}
        </h1>
        <motion.p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
          Whether you own a private saloon, a luxury SUV, or a fleet of executive vehicles, Tranzita has a partnership programme built around you. We vet your cars. We provide the drivers. You earn.
        </motion.p>
        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          {['Private Car Owners', 'Executive Fleets', 'Corporate Partners'].map((item) => <a key={item} href="#tiers" className="rounded-full px-5 py-3 text-sm font-extrabold" style={{ color: '#183024', background: 'rgba(255,249,242,0.82)', border: '1px solid #DDE9D2' }}>{item}</a>)}
        </motion.div>
        <motion.div className="mt-7 flex flex-wrap justify-center gap-2" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.15 } } }}>
          {['We Provide All Drivers', 'Your Car Vetted and Insured', 'Dedicated Partner Portal'].map((pill) => <motion.span key={pill} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: 'white', color: '#183024', border: '1px solid #DDE9D2' }}><ShieldCheck className="mr-1 inline" size={13} />{pill}</motion.span>)}
        </motion.div>
      </div>
    </section>
  )
}
