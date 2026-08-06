'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const HEADLINE = 'The Safest School Run in Nigeria. Built Minute by Minute.'

const CITIES = [
  { name: 'LAGOS', x: '22%', y: '74%' },
  { name: 'IBADAN', x: '20%', y: '66%' },
  { name: 'ABUJA', x: '42%', y: '52%' },
  { name: 'KANO', x: '45%', y: '28%' },
  { name: 'PORT HARCOURT', x: '34%', y: '78%' },
  { name: 'ENUGU', x: '40%', y: '68%' },
  { name: 'KADUNA', x: '42%', y: '36%' },
  { name: 'BENIN', x: '30%', y: '72%' },
  { name: 'JOS', x: '48%', y: '44%' },
]

export default function PageHero() {
  const [charCount, setCharCount] = useState(0)
  const [subVisible, setSubVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    if (charCount < HEADLINE.length) {
      const t = setTimeout(() => setCharCount(c => c + 1), 30)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setSubVisible(true), 200)
      return () => clearTimeout(t)
    }
  }, [charCount])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left"
        style={{ scaleX, background: '#E8601C', zIndex: 10000 }}
      />

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ background: '#1E2B1E', paddingTop: 110, paddingBottom: 100 }}>

        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,96,28,0.07) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,168,143,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Typewriter headline */}
          <h1 className="font-extrabold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)', color: '#FFF9F2', minHeight: '3em' }}>
            {HEADLINE.slice(0, charCount)}
            <span className="inline-block w-0.5 h-8 ml-1 align-middle animate-pulse" style={{ background: '#E8601C', opacity: charCount < HEADLINE.length ? 1 : 0 }} />
          </h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={subVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,249,242,0.72)' }}>
              Most school transport in Nigeria is invisible to parents. No alerts. No tracking. No accountability.
              <br /><br />
              This page shows you exactly how Tranzita changes every single minute of your child's journey from school gate to your front door.
            </p>
          </motion.div>

          {/* Nigeria city map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={subVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mx-auto"
            style={{ width: '100%', maxWidth: 420, height: 260 }}
          >
            {/* Simplified Nigeria outline */}
            <svg viewBox="0 0 420 260" className="absolute inset-0 w-full h-full">
              <path d="M60,40 L90,30 L140,25 L200,20 L260,28 L320,35 L370,50 L390,80 L385,120 L375,160 L355,200 L320,230 L280,245 L240,250 L200,248 L160,240 L120,220 L85,195 L60,165 L40,130 L35,90 L45,60 Z"
                fill="none" stroke="rgba(255,249,242,0.12)" strokeWidth="1.5" />
              {/* Inner regions suggestion */}
              <line x1="200" y1="20" x2="200" y2="250" stroke="rgba(255,249,242,0.04)" strokeWidth="1" />
              <line x1="60" y1="135" x2="390" y2="135" stroke="rgba(255,249,242,0.04)" strokeWidth="1" />
            </svg>

            {CITIES.map((city, i) => (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: city.x, top: city.y, transform: 'translate(-50%,-50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={subVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.3, type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#E8601C' }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
                <span className="text-[7px] font-bold tracking-widest mt-1 whitespace-nowrap"
                  style={{ color: 'rgba(255,249,242,0.5)' }}>
                  {city.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,249,242,0.35)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>
    </>
  )
}
