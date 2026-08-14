'use client'

import { motion } from 'framer-motion'
import { Briefcase, Code2, LayoutDashboard, Map, Smartphone, Users } from 'lucide-react'
import { LiftCard, SectionIntro } from './Shared'

const items = [
  ['Business Strategy and Planning', Briefcase, 'Market sizing, revenue model design, pricing strategy, route economics, school partnership structure, and the investor narrative.'],
  ['Product Architecture', Map, 'The school dashboard, parent experience, driver workflow, co-driver workflow, nurse reporting, operations centre, and alert orchestration.'],
  ['Web Development', Code2, 'The Tranzita website and school web portal built with the same premium, trustworthy, Nigerian visual language seen across this site.'],
  ['App Development', Smartphone, 'Parent, driver, and co-driver mobile experiences designed for real Nigerian journeys, phones, networks, and school-day pressure.'],
  ['Operations Infrastructure', LayoutDashboard, 'Live fleet dashboard, incident management, manifest and route tools, scheduling, safeguarding records, and daily operations visibility.'],
  ['Project Management', Users, 'Sprint planning, stakeholder communication, QA, deployment, vendor coordination, and post-launch support from brief to live route.'],
]

export default function WhatBudruumBuilt() {
  return (
    <section className="px-4 py-24" style={{ background: 'white' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="What Budruum Built" title="Every part of the Tranzita platform was designed and built as one system." subtitle="From business strategy to the last line of code, Budruum built the platform to match real Nigerian school transport conditions." />
        <motion.div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {items.map(([title, Icon, body]) => (
            <LiftCard key={title as string}>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold" style={{ color: '#183024' }}>{title as string}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>{body as string}</p>
            </LiftCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
