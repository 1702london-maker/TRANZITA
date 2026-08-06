'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RequestDemo() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', school: '', role: 'school_admin', students: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="demo" ref={ref} className="py-24 px-4" style={{ background: '#F2F5F0' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Get Started
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Request a{' '}
            <span style={{ color: '#E8601C' }}>free demo.</span>
          </motion.h2>
          <motion.p style={{ color: '#6B7F6B' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            We will walk you through how Tranzita works for your school within 48 hours.
          </motion.p>
        </div>

        <motion.div
          className="rounded-3xl p-8 sm:p-10"
          style={{ background: '#FFFFFF', border: '1px solid #E0EAE0' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: '#1E2B1E' }}>We have received your request!</h3>
              <p style={{ color: '#6B7F6B' }}>Our team will reach out to you within 48 hours.</p>
              <p className="text-sm mt-4" style={{ color: '#6B7F6B' }}>
                WhatsApp us directly: <span style={{ color: '#E8601C', fontWeight: 600 }}>booking@transzita.africa</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E2B1E' }}>Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Adaeze Okonkwo"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F2F5F0', border: '1px solid #E0EAE0', color: '#1E2B1E' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E2B1E' }}>Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@school.edu.ng"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F2F5F0', border: '1px solid #E0EAE0', color: '#1E2B1E' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E2B1E' }}>School Name</label>
                <input
                  required
                  value={form.school}
                  onChange={e => setForm(f => ({ ...f, school: e.target.value }))}
                  placeholder="e.g. Lagos International School"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#F2F5F0', border: '1px solid #E0EAE0', color: '#1E2B1E' }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E2B1E' }}>Your Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F2F5F0', border: '1px solid #E0EAE0', color: '#1E2B1E' }}
                  >
                    <option value="school_admin">School Administrator</option>
                    <option value="principal">Principal / Head</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1E2B1E' }}>Number of Students</label>
                  <input
                    value={form.students}
                    onChange={e => setForm(f => ({ ...f, students: e.target.value }))}
                    placeholder="e.g. 400"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F2F5F0', border: '1px solid #E0EAE0', color: '#1E2B1E' }}
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white text-base"
                style={{ background: '#E8601C' }}
                whileHover={{ scale: 1.02, background: '#D14F10' }}
                whileTap={{ scale: 0.98 }}
              >
                Request My Free Demo 🚌
              </motion.button>
              <p className="text-center text-xs" style={{ color: '#8FA88F' }}>
                No commitment required. We will reach out within 48 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
