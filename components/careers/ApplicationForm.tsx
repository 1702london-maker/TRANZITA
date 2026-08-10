'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Section } from './Shared'

export default function ApplicationForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    const form = new FormData(event.currentTarget)
    const roleText = String(form.get('Role') || '')
    const role = roleText.toLowerCase().includes('nurse') ? 'nurse' : roleText.toLowerCase().includes('co') ? 'codriver' : 'driver'
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role,
        fullName: form.get('Full Name'),
        email: form.get('Email Address'),
        phone: form.get('Phone Number'),
        city: form.get('City'),
        notes: [
          `Career role: ${roleText}`,
          `Experience: ${form.get('Experience')}`,
          `Certification: ${form.get('Certification')}`,
          `Clean driving record: ${form.get('Clean Driving Record')}`,
          `Guarantor: ${form.get('Guarantor')}`,
          `Source: ${form.get('Source')}`,
          `Why Tranzita: ${form.get('Why Tranzita')}`,
        ].join('\n'),
      }),
    })
    const data = await response.json().catch(() => ({}))
    setLoading(false)
    if (!response.ok) {
      setMessage(data.error || 'Application could not be submitted right now.')
      return
    }
    setMessage(data.emailStatus === 'sent' ? 'Application received. We sent a confirmation email.' : 'Application received. Our team will contact you after review.')
    event.currentTarget.reset()
  }

  return (
    <>
      <Section background="#FFF9F2" label="Apply Now" title="Ready to join the Tranzita crew?" text="Fill in the form below and a member of the recruitment team will contact you within 3 working days.">
        <motion.form id="apply" onSubmit={submit} className="max-w-3xl mx-auto gradient-frame rounded-3xl p-6 sm:p-8 bg-white space-y-5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid sm:grid-cols-2 gap-4"><Field label="Full Name" name="Full Name" required /><Field label="Phone Number" name="Phone Number" type="tel" required /></div>
          <Field label="Email Address" name="Email Address" type="email" required />
          <div className="grid sm:grid-cols-2 gap-4"><Select label="City" name="City" options={['Lagos', 'Abuja', 'Port Harcourt', 'Other']} /><Select label="Role Applying For" name="Role" options={['Driver', 'Co-Driver', 'Onboard Nurse', 'Operations Team Member']} /></div>
          <div className="grid sm:grid-cols-2 gap-4"><Select label="Years of Relevant Experience" name="Experience" options={['Under 1 year', '1 to 2 years', '2 to 5 years', '5 to 10 years', 'Over 10 years']} /><Select label="Current Relevant Certification" name="Certification" options={['NMC Nigeria Registered', 'Paediatric First Aid Current', 'Both', 'Neither but willing to obtain', 'Not applicable']} /></div>
          <div className="grid sm:grid-cols-2 gap-4"><Select label="Clean driving record?" name="Clean Driving Record" options={['Yes', 'No', 'Not applicable']} /><Select label="Qualified guarantor available?" name="Guarantor" options={['Yes', 'No']} /></div>
          <label className="block text-xs font-semibold" style={{ color: '#183024' }}>Tell us why you want to join Tranzita<textarea name="Why Tranzita" rows={5} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }} /></label>
          <Select label="How did you hear about us?" name="Source" options={['WhatsApp', 'School', 'Friend or Family', 'Social Media', 'Other']} />
          <button disabled={loading} className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-60" style={{ background: '#D96B1F' }}>{loading ? 'Submitting...' : 'Submit My Application'}</button>
          {message && <p className="text-center text-sm font-extrabold" style={{ color: '#D96B1F' }}>{message}</p>}
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
