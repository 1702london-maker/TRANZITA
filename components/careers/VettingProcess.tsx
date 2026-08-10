'use client'

import { motion } from 'framer-motion'
import { Section } from './Shared'

const steps = [
  ['You Submit Your Application', 'Tell us your experience, location, and availability. The form takes less than 10 minutes and every application is reviewed within 3 working days.'],
  ['Initial Phone Interview', 'A recruiter calls for a 20-minute conversation about your experience, motivation, and availability.'],
  ['Document Submission', 'We provide the full checklist, police clearance guidance, and every document requirement so you are not navigating it alone.'],
  ['Vetting Begins', 'The six-stage vetting process typically takes 10 to 15 working days, and our team keeps you updated at every stage.'],
  ['Practical Assessment', 'Drivers complete a road assessment, co-drivers complete a child management assessment, nurses complete welfare assessment, and operations applicants complete a platform simulation.'],
  ['Offer and Onboarding', 'Successful applicants receive a written offer and complete two days of app, code of conduct, route familiarisation, and supervisor onboarding.'],
]

export default function VettingProcess() {
  return (
    <Section background="#FFF9F2" label="The Vetting Process" title="We will guide you through every stage." text="The process is thorough by design, but applicants are supported from the first call to onboarding.">
      <div className="space-y-4">
        {steps.map(([title, body], i) => (
          <motion.div key={title} className="grid sm:grid-cols-[80px_1fr] gap-5 rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="text-4xl font-extrabold" style={{ color: '#D96B1F' }}>0{i + 1}</div>
            <div><h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p></div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
