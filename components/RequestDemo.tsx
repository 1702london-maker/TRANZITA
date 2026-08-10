'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function RequestDemo() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', school: '', role: 'school_admin', students: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const response = await fetch('/api/demo-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json().catch(() => ({}))
    setSubmitting(false)
    if (!response.ok) {
      setError(data.error || 'Route review request could not be sent.')
      return
    }
    setSubmitted(true)
  }

  return (
    <section id="demo" ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Route Review
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Plan your{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>first route cluster.</span>
          </motion.h2>
          <motion.p style={{ color: '#65785F' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Share your school location and student count. We will respond with the first practical pickup-zone conversation.
          </motion.p>
        </div>

        <motion.div
          className="gradient-frame rounded-3xl p-8 sm:p-10"
          style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: '#183024' }}>We have received your request!</h3>
              <p style={{ color: '#65785F' }}>Our team will reach out to you within 48 hours.</p>
              <p className="text-sm mt-4" style={{ color: '#65785F' }}>
                WhatsApp us directly: <span style={{ color: '#D96B1F', fontWeight: 600 }}>booking@tranzita.africa</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-name" className="block text-xs font-semibold mb-1.5" style={{ color: '#183024' }}>Full Name</label>
                  <input
                    id="demo-name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Adaeze Okonkwo"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}
                  />
                </div>
                <div>
                  <label htmlFor="demo-email" className="block text-xs font-semibold mb-1.5" style={{ color: '#183024' }}>Email</label>
                  <input
                    id="demo-email"
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@school.edu.ng"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="demo-school" className="block text-xs font-semibold mb-1.5" style={{ color: '#183024' }}>School Name</label>
                <input
                  id="demo-school"
                  required
                  autoComplete="organization"
                  value={form.school}
                  onChange={e => setForm(f => ({ ...f, school: e.target.value }))}
                  placeholder="e.g. Lagos International School"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="demo-role" className="block text-xs font-semibold mb-1.5" style={{ color: '#183024' }}>Your Role</label>
                  <select
                    id="demo-role"
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}
                  >
                    <option value="school_admin">School Administrator</option>
                    <option value="principal">Principal / Head</option>
                    <option value="parent">Parent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="demo-students" className="block text-xs font-semibold mb-1.5" style={{ color: '#183024' }}>Number of Students</label>
                  <input
                    id="demo-students"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={form.students}
                    onChange={e => setForm(f => ({ ...f, students: e.target.value }))}
                    placeholder="e.g. 400"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F1F6EA', border: '1px solid #DDE9D2', color: '#183024' }}
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl font-bold text-white text-base"
                style={{ background: 'linear-gradient(90deg, #183024 0%, #1F6B46 48%, #D96B1F 100%)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? 'Sending Route Review...' : 'Start Route Review'}
              </motion.button>
              {error ? <p className="text-center text-sm font-bold" style={{ color: '#D96B1F' }}>{error}</p> : null}
              <p className="text-center text-xs" style={{ color: '#7EA06D' }}>
                No commitment required. We will reach out within 48 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
