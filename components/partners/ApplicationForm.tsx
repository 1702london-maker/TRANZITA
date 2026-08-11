'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BRAND } from '@/lib/constants'
import { SectionIntro } from './Shared'

const fields = [
  ['Full Name', 'text'],
  ['Phone Number', 'tel'],
  ['Email Address', 'email'],
  ['Company Name', 'text'],
  ['Fleet Product Or Service', 'text'],
  ['Current Operating Locations', 'text'],
]

export default function ApplicationForm() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const whatsappHref = BRAND.whatsappNumber ? `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(BRAND.whatsappMessage)}` : '/contact'

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'partner',
        fullName: form.get('Full Name'),
        email: form.get('Email Address'),
        phone: form.get('Phone Number'),
        organisationName: form.get('Company Name'),
        city: form.get('City'),
        vehiclePlateNumbers: form.get('Existing Tranzita Vehicle IDs'),
        notes: [
          `Partnership type: ${form.get('Partnership Type')}`,
          `Fleet product or service: ${form.get('Fleet Product Or Service')}`,
          `Current locations: ${form.get('Current Operating Locations')}`,
          `Vehicle, depot or fuel capacity: ${form.get('Vehicle Depot Or Fuel Capacity')}`,
          `Made in Nigeria capability: ${form.get('Made In Nigeria Capability')}`,
          `Operational readiness: ${form.get('Operational Readiness')}`,
          `Source: ${form.get('How did you hear about us?')}`,
          `Notes: ${form.get('Notes')}`,
        ].join('\n'),
      }),
    })
    const data = await response.json().catch(() => ({}))
    setLoading(false)
    if (!response.ok) {
      setMessage(data.error || 'Partner application could not be submitted right now.')
      return
    }
    setMessage(data.emailStatus === 'sent' ? 'Partner application received. We sent a confirmation email.' : 'Partner application received. Our team will contact you after review.')
    event.currentTarget.reset()
  }

  return (
    <section id="apply" className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-5xl">
        <SectionIntro label="Apply Now" title="Tell us how you can support the Tranzita approved fleet." text="We review Nigerian-assembled vehicle supply, depots, fuel, charging, maintenance and fleet infrastructure partnerships. Private outside cars are not accepted." />
        <motion.form onSubmit={submit} className="mt-12 rounded-[32px] bg-white p-6 sm:p-8" style={{ border: '1px solid #DDE9D2', boxShadow: '0 22px 60px rgba(31,107,70,0.08)' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(([label, type]) => <label key={label} className="text-sm font-bold" style={{ color: '#183024' }}>{label}<input type={type} name={label} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} /></label>)}
            {[
              ['City', ['Lagos', 'Abuja', 'Port Harcourt', 'Other']],
              ['Partnership Type', ['Vehicle Assembly', 'Approved Fleet Supply', 'Depot Infrastructure', 'Fuel Or Charging Support', 'Fleet Maintenance', 'Corporate Sponsorship']],
              ['Vehicle Depot Or Fuel Capacity', ['1 to 3 vehicles', '4 to 10 vehicles', '11 to 25 vehicles', '26 to 50 vehicles', 'Over 50 vehicles', 'Depot or support only']],
              ['Made In Nigeria Capability', ['Already assembling locally', 'Local assembly partner in place', 'Can supply locally assembled vehicles', 'Depot, fuel or maintenance support only']],
              ['Operational Readiness', ['Ready now', 'Ready within 30 days', 'Ready this term', 'Planning stage']],
              ['How did you hear about us?', ['WhatsApp', 'School', 'Friend or colleague', 'Social media', 'Tranzita website', 'Other']],
            ].map(([label, options]) => (
              <label key={label as string} className="text-sm font-bold" style={{ color: '#183024' }}>{label as string}
                <select name={label as string} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
                  {(options as string[]).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-bold" style={{ color: '#183024' }}>Tell us anything else about your vehicle, depot or fuel capacity
            <textarea name="Notes" rows={4} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} />
          </label>
          <button disabled={loading} className="mt-5 w-full rounded-full px-6 py-4 text-sm font-extrabold text-white disabled:opacity-60" style={{ background: '#D96B1F' }}>{loading ? 'Submitting...' : 'Submit My Partner Application'}</button>
          {message && <p className="mt-3 text-center text-sm font-extrabold" style={{ color: '#D96B1F' }}>{message}</p>}
          <p className="mt-3 text-center text-xs" style={{ color: '#65785F' }}>We review every application. Tranzita only approves made-in-Nigeria fleet, depot, fuel, maintenance and infrastructure partnerships.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t pt-6" style={{ borderColor: '#DDE9D2' }}>
            <span className="font-extrabold" style={{ color: '#183024' }}>Prefer to talk first?</span>
            <a href={whatsappHref} className="rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#25D366' }}>WhatsApp us</a>
            <a href="mailto:partners@tranzita.africa" className="rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Email us</a>
            <a href="/contact#demo-form" className="rounded-full px-5 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #DDE9D2' }}>Book a call</a>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
