'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from './Shared'

const careersEmail = 'careers@tranzita.africa'

export default function ApplicationForm() {
  return (
    <>
      <Section background="#FFF9F2" label="Apply Now" title="Ready to join the Tranzita crew?" text="Fill in the form below and a member of the recruitment team will contact you within 3 working days.">
        <motion.form id="apply" action={`mailto:${careersEmail}`} method="post" encType="text/plain" className="max-w-3xl mx-auto gradient-frame rounded-3xl p-6 sm:p-8 bg-white space-y-5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid sm:grid-cols-2 gap-4"><Field label="Full Name" name="Full Name" required /><Field label="Phone Number" name="Phone Number" type="tel" required /></div>
          <Field label="Email Address" name="Email Address" type="email" required />
          <div className="grid sm:grid-cols-2 gap-4"><Select label="City" name="City" options={['Lagos', 'Abuja', 'Port Harcourt', 'Other']} /><Select label="Role Applying For" name="Role" options={['Driver', 'Co-Driver', 'Onboard Nurse', 'Operations Team Member']} /></div>
          <div className="grid sm:grid-cols-2 gap-4"><Select label="Years of Relevant Experience" name="Experience" options={['Under 1 year', '1 to 2 years', '2 to 5 years', '5 to 10 years', 'Over 10 years']} /><Select label="Current Relevant Certification" name="Certification" options={['NMC Nigeria Registered', 'Paediatric First Aid Current', 'Both', 'Neither but willing to obtain', 'Not applicable']} /></div>
          <div className="grid sm:grid-cols-2 gap-4"><Select label="Clean driving record?" name="Clean Driving Record" options={['Yes', 'No', 'Not applicable']} /><Select label="Qualified guarantor available?" name="Guarantor" options={['Yes', 'No']} /></div>
          <label className="block text-xs font-semibold" style={{ color: '#183024' }}>Tell us why you want to join Tranzita<textarea name="Why Tranzita" rows={5} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }} /></label>
          <Select label="How did you hear about us?" name="Source" options={['WhatsApp', 'School', 'Friend or Family', 'Social Media', 'Other']} />
          <button className="w-full py-4 rounded-2xl font-bold text-white" style={{ background: '#D96B1F' }}>Submit My Application</button>
          <p className="text-center text-xs" style={{ color: '#7EA06D' }}>We review every application. You will hear from us within 3 working days.</p>
        </motion.form>
      </Section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}><svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#183024" /><circle cx="34" cy="48" r="6" fill="#183024" /><circle cx="126" cy="48" r="6" fill="#183024" /></svg></div>)}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Help us make every Nigerian school run safe.</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>Join verified professionals trusted by schools and parents across Nigeria.</p>
          <div className="flex flex-wrap justify-center gap-3"><a href="#apply" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Apply Now <ArrowRight size={18} /></a><a href="/safety" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Learn About Safety</a></div>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-xs font-semibold" style={{ color: '#183024' }}>{label}<input name={name} type={type} required={required} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }} /></label>
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <label className="block text-xs font-semibold" style={{ color: '#183024' }}>{label}<select name={name} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
}
