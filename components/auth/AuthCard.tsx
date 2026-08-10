'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { getSupabaseBrowserClient, isSupabaseConfigured, publicSigninRoles, roleRedirects } from '@/lib/supabase'
import { onboardingRoles, roleLabels } from '@/lib/onboarding'

export default function AuthCard({ mode }: { mode: 'signin' | 'signup' }) {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get('role') || 'parent'
  const nextPath = searchParams.get('next')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState(publicSigninRoles.includes(initialRole as any) || onboardingRoles.includes(initialRole as any) ? initialRole : 'parent')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [city, setCity] = useState('')
  const [vehiclePlateNumbers, setVehiclePlateNumbers] = useState('')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const isSignup = mode === 'signup'

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    if (isSignup) {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          fullName,
          email,
          phone,
          whatsapp,
          organisationName,
          city,
          vehiclePlateNumbers,
          notes,
        }),
      })
      const data = await response.json().catch(() => ({}))
      setLoading(false)
      if (!response.ok) {
        setMessage(data.error || 'Application could not be submitted right now.')
        return
      }
      const emailNote =
        data.emailStatus === 'sent'
          ? 'We have sent a confirmation email with the next steps.'
          : 'Your application is saved. Our team will contact you after review.'
      setMessage(`Application received. Reference: ${data.applicationId}. ${emailNote}`)
      return
    }

    const supabase = getSupabaseBrowserClient()
    if (!supabase) {
      setLoading(false)
      setMessage('Portal access is being activated. Contact Tranzita support if you already have onboarding details.')
      return
    }
    const result = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (result.error) {
      setMessage(result.error.message)
      return
    }
    const userRole = result.data.user?.app_metadata?.role || result.data.user?.user_metadata?.role || role
    const target = nextPath && roleRedirects[userRole] === nextPath ? nextPath : roleRedirects[userRole]
    window.location.href = target || '/dashboard/parent'
  }

  return (
    <motion.form
      onSubmit={submit}
      className="mx-auto max-w-xl rounded-[32px] bg-white p-7 shadow-sm"
      style={{ border: '1px solid #DDE9D2' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{isSignup ? 'Apply For Access' : 'Sign In'}</p>
      <h1 className="mt-3 text-4xl font-extrabold" style={{ color: '#183024' }}>{isSignup ? 'Apply to join Tranzita.' : 'Welcome back to Tranzita.'}</h1>
      <p className="mt-3 text-sm leading-relaxed" style={{ color: '#65785F' }}>
        {isSignup ? 'Submit your application first. Tranzita reviews every role before portal access is activated.' : 'Use the account issued after onboarding approval to enter your portal.'}
      </p>
      {!isSupabaseConfigured && (
        <div className="mt-5 rounded-2xl p-4 text-sm font-bold" style={{ background: '#FFF0E4', color: '#183024' }}>
          Portal access is being activated. If you already have onboarding details, contact Tranzita support for access.
        </div>
      )}
      <div className="mt-6 space-y-4">
        {isSignup && <Field label="Full Name" value={fullName} onChange={setFullName} required />}
        <label className="block text-sm font-bold" style={{ color: '#183024' }}>
          Email Address
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} required />
        </label>
        {!isSignup && (
          <label className="block text-sm font-bold" style={{ color: '#183024' }}>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} required minLength={6} />
          </label>
        )}
        <label className="block text-sm font-bold" style={{ color: '#183024' }}>
          {isSignup ? 'Application Role' : 'Portal Role'}
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
            {(isSignup ? onboardingRoles : publicSigninRoles).map((item) => <option key={item} value={item}>{roleLabels[item as keyof typeof roleLabels] || item}</option>)}
          </select>
        </label>
        {isSignup && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone Number" value={phone} onChange={setPhone} />
              <Field label="WhatsApp Number" value={whatsapp} onChange={setWhatsapp} />
            </div>
            {(role === 'school' || role === 'partner') && <Field label={role === 'school' ? 'School Name' : 'Partner / Company Name'} value={organisationName} onChange={setOrganisationName} required />}
            <Field label="City" value={city} onChange={setCity} />
            {role === 'partner' && <Field label="Vehicle Plate Numbers" value={vehiclePlateNumbers} onChange={setVehiclePlateNumbers} placeholder="TRZ-001, ABC-234XY" />}
            <label className="block text-sm font-bold" style={{ color: '#183024' }}>
              Short Note
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} placeholder="Tell us what you need from Tranzita." />
            </label>
          </>
        )}
      </div>
      <button disabled={loading} className="mt-6 w-full rounded-full px-6 py-4 text-sm font-extrabold text-white disabled:opacity-60" style={{ background: '#D96B1F' }}>
        {loading ? 'Please wait...' : isSignup ? 'Submit Application' : 'Sign In'}
      </button>
      {message && <p className="mt-4 text-center text-sm font-bold" style={{ color: '#D96B1F' }}>{message}</p>}
      <p className="mt-5 text-center text-sm" style={{ color: '#65785F' }}>
        {isSignup ? 'Already approved?' : 'Need portal access?'}{' '}
        <a className="font-extrabold" style={{ color: '#D96B1F' }} href={isSignup ? '/auth/signin' : '/auth/signup'}>{isSignup ? 'Sign in' : 'Apply now'}</a>
      </p>
    </motion.form>
  )
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block text-sm font-bold" style={{ color: '#183024' }}>
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-2 w-full rounded-2xl px-4 py-3 outline-none" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }} required={required} />
    </label>
  )
}
