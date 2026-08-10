'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SectionIntro } from './Shared'

const stats = [
  [500, '+', 'children transported safely daily'],
  [98, '%', 'on-time delivery rate'],
  [100, '%', 'crew verified before day one'],
  [10, '', 'working days to first live route'],
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(value)
  useEffect(() => {
    if (!inView) return
    setCount(0)
    let frame = 0
    const total = 42
    const tick = () => {
      frame += 1
      setCount(Math.round((value * frame) / total))
      if (frame < total) requestAnimationFrame(tick)
    }
    tick()
  }, [inView, value])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function TheNumbers() {
  return (
    <section className="px-4 py-24" style={{ background: '#F1F6EA' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Numbers Today" title="Where we are. Where we are going." subtitle="Every number here represents a family that no longer has to wonder." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, suffix, label]) => (
            <motion.div key={label as string} className="rounded-[28px] p-6 text-center" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2', boxShadow: '0 14px 38px rgba(31,107,70,0.08)' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-4xl font-extrabold" style={{ color: '#D96B1F' }}><Counter value={value as number} suffix={suffix as string} /></div>
              <p className="mt-2 text-sm font-bold" style={{ color: '#65785F' }}>{label as string}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
