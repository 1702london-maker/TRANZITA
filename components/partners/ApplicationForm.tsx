'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

const fields = [
  ['Full Name', 'text'],
  ['Phone Number', 'tel'],
  ['Email Address', 'email'],
  ['Vehicle Make', 'text'],
  ['Vehicle Model', 'text'],
]

export default function ApplicationForm() {
  return (
    <section id="apply" className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-5xl">
        <SectionIntro label="Apply Now" title="Tell us about your vehicle. We will take it from there." text="The application takes less than 5 minutes. We respond within 2 working days." />
        <motion.form action="mailto:partners@tranzita.africa" className="mt-12 rounded-[32px] bg-white p-6 sm:p-8" style={{ border: '1px solid #DDE9D2', boxShadow: '0 22px 60px rgba(31,107,70,0.08)' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(([label, type]) => <label key={label} className="text-sm font-bold" style={{ color: '#183024' }}>{label}<input type={type} name={label} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} /></label>)}
            {[
              ['City', ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Other']],
              ['Partnership Type', ['Private Car Partner', 'Chauffeur and Executive Partner', 'Fleet and Corporate Partner']],
              ['Number of Vehicles', ['1', '2', '3 to 5', '6 to 10', '10 to 20', 'Over 20']],
              ['Vehicle Year', ['2019', '2020', '2021', '2022', '2023', '2024', '2025']],
              ['Seating Capacity', ['5 seats', '6 to 8 seats', '9 to 12 seats', '13 to 18 seats', 'Over 18 seats']],
              ['GPS Unit', ['Yes', 'No', 'Not Sure']],
              ['Vehicle Condition', ['Excellent', 'Good', 'Fair']],
              ['How did you hear about us?', ['WhatsApp', 'School', 'Friend or colleague', 'Social media', 'Tranzita website', 'Other']],
            ].map(([label, options]) => (
              <label key={label as string} className="text-sm font-bold" style={{ color: '#183024' }}>{label as string}
                <select name={label as string} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
                  {(options as string[]).map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            ))}
          </div>
          <label className="mt-4 block text-sm font-bold" style={{ color: '#183024' }}>Tell us anything else about your vehicle or fleet
            <textarea name="Notes" rows={4} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} />
          </label>
          <button className="mt-5 w-full rounded-full px-6 py-4 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Submit My Partner Application</button>
          <p className="mt-3 text-center text-xs" style={{ color: '#65785F' }}>We review every application. You will hear from us within 2 working days. No commitment required.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t pt-6" style={{ borderColor: '#DDE9D2' }}>
            <span className="font-extrabold" style={{ color: '#183024' }}>Prefer to talk first?</span>
            <a href="https://wa.me/" className="rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#25D366' }}>WhatsApp us</a>
            <a href="mailto:partners@tranzita.africa" className="rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Email us</a>
            <a href="/contact#demo-form" className="rounded-full px-5 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #DDE9D2' }}>Book a call</a>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
