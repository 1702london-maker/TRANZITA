'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StickyBar from '@/components/StickyBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JourneyTimeline from '@/components/how-it-works/JourneyTimeline'
import ThreeCrewCards from '@/components/how-it-works/ThreeCrewCards'
import VettingStages from '@/components/how-it-works/VettingStages'
import ParentExperience from '@/components/how-it-works/ParentExperience'
import SchoolExperience from '@/components/how-it-works/SchoolExperience'
import FAQAccordion from '@/components/how-it-works/FAQAccordion'
import OpenSourceGrid from '@/components/how-it-works/OpenSourceGrid'

const WORDS = ['How', 'Tranzita', 'Works']

const PARTICLE_DATA = [
  { left: '8%', top: '22%', size: 4, dur: '5s', del: '0s' },
  { left: '15%', top: '65%', size: 3, dur: '7s', del: '1.2s' },
  { left: '25%', top: '38%', size: 5, dur: '6s', del: '0.5s' },
  { left: '40%', top: '78%', size: 3, dur: '8s', del: '2s' },
  { left: '55%', top: '28%', size: 4, dur: '5.5s', del: '0.8s' },
  { left: '70%', top: '55%', size: 3, dur: '7.5s', del: '1.8s' },
  { left: '82%', top: '32%', size: 5, dur: '6.5s', del: '0.3s' },
  { left: '90%', top: '70%', size: 3, dur: '9s', del: '1.5s' },
]

export default function HowItWorksPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingBottom: 90 }}>
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#1E2B1E', paddingTop: 96, paddingBottom: 80 }}>

          {/* Particles */}
          {mounted && (
            <div className="absolute inset-0 pointer-events-none">
              {PARTICLE_DATA.map((p, i) => (
                <div key={i} className="absolute rounded-full dot-particle"
                  style={{
                    left: p.left, top: p.top,
                    width: p.size, height: p.size,
                    background: i % 3 === 0 ? '#E8601C' : i % 3 === 1 ? '#F5D840' : '#8FA88F',
                    ['--duration' as string]: p.dur,
                    ['--delay' as string]: p.del,
                  }} />
              ))}
            </div>
          )}

          {/* Cityscape + bus */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
              <rect x="0" y="165" width="1440" height="15" fill="rgba(255,255,255,0.04)" />
              <rect x="20" y="110" width="50" height="70" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="30" y="88" width="32" height="92" fill="rgba(255,255,255,0.06)" rx="1" />
              <rect x="80" y="100" width="42" height="80" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="180" y="92" width="38" height="88" fill="rgba(255,255,255,0.05)" rx="2" />
              <rect x="222" y="72" width="28" height="108" fill="rgba(255,255,255,0.06)" rx="1" />
              <rect x="300" y="105" width="55" height="75" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="420" y="80" width="45" height="100" fill="rgba(255,255,255,0.05)" rx="2" />
              <rect x="560" y="95" width="60" height="85" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="700" y="75" width="50" height="105" fill="rgba(255,255,255,0.05)" rx="2" />
              <rect x="820" y="90" width="40" height="90" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="950" y="82" width="55" height="98" fill="rgba(255,255,255,0.05)" rx="2" />
              <rect x="1100" y="95" width="48" height="85" fill="rgba(255,255,255,0.04)" rx="2" />
              <rect x="1250" y="78" width="42" height="102" fill="rgba(255,255,255,0.05)" rx="2" />
              <rect x="1360" y="100" width="60" height="80" fill="rgba(255,255,255,0.04)" rx="2" />
              {/* Bus */}
              <g className="bus-drive">
                <rect x="0" y="140" width="110" height="32" fill="#E8601C" rx="6" />
                <rect x="8" y="145" width="20" height="16" fill="rgba(255,255,255,0.3)" rx="2" />
                <rect x="32" y="145" width="20" height="16" fill="rgba(255,255,255,0.3)" rx="2" />
                <rect x="56" y="145" width="20" height="16" fill="rgba(255,255,255,0.3)" rx="2" />
                <circle cx="22" cy="174" r="7" fill="#1E2B1E" />
                <circle cx="22" cy="174" r="3" fill="#E2EDD8" />
                <circle cx="88" cy="174" r="7" fill="#1E2B1E" />
                <circle cx="88" cy="174" r="3" fill="#E2EDD8" />
                <text x="55" y="157" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="'Plus Jakarta Sans',sans-serif">EV</text>
              </g>
            </svg>
          </div>

          {/* Headline */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-6"
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
              {WORDS.map((word, i) => (
                <motion.span key={i}
                  className="font-extrabold leading-tight"
                  style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: i === 1 ? '#E8601C' : '#FFF9F2' }}
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: 'rgba(255,249,242,0.75)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}>
              From the moment school ends to the moment your child walks through your front door, every second is tracked, verified, and communicated to you in real time.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}>
              <a href="#for-schools-hiw"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white"
                style={{ background: '#E8601C' }}>
                For Schools
              </a>
              <a href="#for-parents-hiw"
                className="px-7 py-3.5 rounded-full font-bold text-sm"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#FFF9F2', border: '1px solid rgba(255,255,255,0.18)' }}>
                For Parents
              </a>
            </motion.div>
          </div>

          {/* Scroll arrow */}
          <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,249,242,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </section>

        {/* Sections */}
        <JourneyTimeline />
        <ThreeCrewCards />
        <VettingStages />
        <section id="for-parents-hiw">
          <ParentExperience />
        </section>
        <SchoolExperience />
        <FAQAccordion />
        <OpenSourceGrid />

        {/* Final CTA */}
        <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl px-8 py-16 text-center overflow-hidden relative"
              style={{ background: '#FFFFFF', border: '2px solid #E2EDD8', boxShadow: '0 20px 60px rgba(44,58,44,0.07)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#E8601C' }}>Ready to See It Working?</p>
              <h2 className="font-extrabold text-4xl sm:text-5xl mb-5" style={{ color: '#1E2B1E' }}>
                Ready to see it <span style={{ color: '#E8601C' }}>working?</span>
              </h2>
              <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
                Book a free 30-minute demo. We will walk you through the live platform, show you the driver profiles, school dashboard, and the parent app. A custom route demo using your school's actual location is included at no cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a href="/#demo"
                  className="px-8 py-4 rounded-2xl font-bold text-white text-base"
                  style={{ background: '#E8601C' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Request a Demo
                </motion.a>
                <motion.a href="/"
                  className="px-8 py-4 rounded-2xl font-bold text-base"
                  style={{ background: '#F1F6EA', color: '#1E2B1E', border: '1px solid #E2EDD8' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Back to Homepage
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
