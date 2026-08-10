'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const reasons = [
  ['A live platform walkthrough', 'We show the school dashboard, driver app, WhatsApp alerts and live GPS tracking working in real time.'],
  ['Custom route demo', "We map your school's actual location and discuss how Tranzita would work for your roads before you commit."],
  ['Meet the team', 'Your call is with a real Tranzita team member. Bring your safeguarding lead and ask anything.'],
]

export default function DemoForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/demo-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('Full Name'),
        email: form.get('Email Address'),
        school: form.get('School Name'),
        role: form.get('Role'),
        students: form.get('Students'),
        phone: form.get('Phone Number'),
        city: form.get('City'),
        preferredDate: form.get('Preferred Demo Date'),
        message: form.get('Message'),
      }),
    })
    const data = await response.json().catch(() => ({}))
    setLoading(false)
    if (!response.ok) {
      setMessage(data.error || 'Demo request could not be submitted right now.')
      return
    }
    setMessage(data.emailStatus === 'sent' ? 'Demo request received. We sent the team a notification.' : 'Demo request received. The Tranzita team will review it.')
    event.currentTarget.reset()
  }

  return (
    <section id="demo-form" className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
        <div>
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Book A Demo</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>See Tranzita working. Live. In 30 minutes.</motion.h2>
          <p className="leading-relaxed mb-8" style={{ color: '#65785F' }}>We will walk you through the full platform using your school's actual location. No commitment required.</p>
          <div className="space-y-4">
            {reasons.map(([title, body], i) => <motion.div key={title} className="flex gap-3 rounded-2xl bg-white p-4 border border-[#DDE9D2]" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}><CheckCircle2 size={22} color="#D96B1F" className="shrink-0 mt-1" /><div><h3 className="font-extrabold mb-1" style={{ color: '#183024' }}>{title}</h3><p className="text-sm" style={{ color: '#65785F' }}>{body}</p></div></motion.div>)}
          </div>
        </div>
        <motion.form onSubmit={submit} className="gradient-frame rounded-3xl p-6 sm:p-8 bg-white space-y-5" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="Full Name" required />
            <Field label="Email Address" name="Email Address" type="email" required />
          </div>
          <Field label="School Name" name="School Name" required />
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Your Role" name="Role" options={['Principal or Head', 'School Administrator', 'Transport Coordinator', 'Safeguarding Lead', 'Governor', 'Parent', 'Other']} />
            <Field label="Phone Number" name="Phone Number" type="tel" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="City" name="City" options={['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Kaduna', 'Benin City', 'Jos', 'Other']} />
            <Select label="Students Needing Transport" name="Students" options={['Under 50', '50 to 100', '100 to 200', '200 to 500', 'Over 500']} />
          </div>
          <Field label="Preferred Demo Date" name="Preferred Demo Date" type="date" />
          <label className="block text-xs font-semibold" style={{ color: '#183024' }}>Anything you want us to know<textarea name="Message" rows={4} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }} /></label>
          <button disabled={loading} className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-60" style={{ background: '#D96B1F' }}>{loading ? 'Submitting...' : 'Book My Free Demo'}</button>
          {message && <p className="text-center text-sm font-extrabold" style={{ color: '#D96B1F' }}>{message}</p>}
          <p className="text-center text-xs" style={{ color: '#7EA06D' }}>No commitment required. We will confirm your demo within 4 business hours.</p>
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="block text-xs font-semibold" style={{ color: '#183024' }}>{label}<input name={name} type={type} required={required} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }} /></label>
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return <label className="block text-xs font-semibold" style={{ color: '#183024' }}>{label}<select name={name} className="mt-1.5 w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
}
