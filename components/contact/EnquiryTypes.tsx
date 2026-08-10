'use client'

import { motion } from 'framer-motion'
import { Section, email } from './Shared'

const items = [
  ['School Registration and Demos', 'For principals, administrators, transport coordinators and governors interested in registering their school or booking a demo.', `Contact: ${email}. Response: within 4 business hours.`],
  ['Parent Enquiries', 'For parents with questions about registration, alerts, guardians or speaking to their school about joining.', 'Contact: WhatsApp operations directly. Response: within minutes during transport hours.'],
  ['Safety and Safeguarding', 'For safeguarding leads, governors and regulators asking about vetting, safety framework or incident reporting.', `Contact: ${email} marked Safety Enquiry. Response: within 2 business hours.`],
  ['Fleet and Charging Partnerships', 'For schools, estates and commercial property owners interested in hosting charging infrastructure.', `Contact: ${email} marked Partnership Enquiry. Response: within 1 business day.`],
  ['Press and Media', 'For journalists, researchers and media organisations with questions about the platform, our data or founders.', `Contact: ${email} marked Press Enquiry. Response: within 1 business day.`],
]

export default function EnquiryTypes() {
  return (
    <Section background="#F1F6EA" label="Specific Enquiries" title="Tell us what you need and we will connect you to the right person." text="Different enquiries go to different teams. Here is who handles what.">
      <div className="space-y-4">{items.map(([title, body, contact], i) => <motion.div key={title} className="rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed mb-2" style={{ color: '#65785F' }}>{body}</p><p className="text-sm font-bold" style={{ color: '#D96B1F' }}>{contact}</p></motion.div>)}</div>
    </Section>
  )
}
