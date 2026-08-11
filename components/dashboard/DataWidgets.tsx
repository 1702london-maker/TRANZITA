'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'
import { AlertTriangle, BusFront, CheckCircle2, CircleDollarSign, Clock3, Mail, MapPinned, MessageCircle, QrCode, Send, Thermometer } from 'lucide-react'
import { BRAND } from '@/lib/constants'

export function KpiGrid({ kpis }: { kpis: Array<[string, string, string]> }) {
  const icons = [BusFront, MapPinned, AlertTriangle, CircleDollarSign]
  return (
    <motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}>
      {kpis.map(([label, value, note], index) => {
        const Icon = icons[index] || BusFront
        return (
          <motion.div key={label} className="trz-card rounded-[24px] p-5" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <div className="flex items-start justify-between">
              <span className="trz-icon-tile flex h-11 w-11 items-center justify-center rounded-2xl"><Icon size={22} /></span>
              <span className="trz-sage-pill rounded-full px-2.5 py-1 text-[10px] font-extrabold">LIVE</span>
            </div>
            <p className="trz-muted mt-5 text-sm font-bold">{label}</p>
            <p className="trz-ink mt-1 text-3xl font-extrabold">{value}</p>
            <p className="trz-orange mt-1 text-xs font-bold">{note}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function BarChartCard({ data }: { data: number[] }) {
  return (
    <Panel title="Route Completion" subtitle="Last 7 school days">
      <div className="mt-6 flex h-56 items-end gap-3">
        {data.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <motion.div className="trz-orange-gradient w-full rounded-t-2xl" initial={{ height: 0 }} whileInView={{ height: `${value}%` }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.55 }} />
            <span className="trz-muted text-[10px] font-bold">D{index + 1}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

export function PieChartCard({ data }: { data: Array<[string, number, string]> }) {
  const first = data[0]?.[1] || 70
  const second = first + (data[1]?.[1] || 18)
  const gradient = `conic-gradient(${data[0]?.[2] || '#D96B1F'} 0 ${first}%, ${data[1]?.[2] || '#F8C84E'} ${first}% ${second}%, ${data[2]?.[2] || '#7EA06D'} ${second}% 100%)`
  return (
    <Panel title="Journey Status" subtitle="Today">
      <div className="mt-6 grid gap-6 sm:grid-cols-[180px_1fr] sm:items-center">
        <motion.div className="mx-auto h-44 w-44 rounded-full p-8" style={{ background: gradient }} initial={{ rotate: -30, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} viewport={{ once: true }}>
          <div className="h-full w-full rounded-full bg-white" />
        </motion.div>
        <div className="space-y-3">
          {data.map(([label, value, color]) => (
            <div key={label as string} className="trz-page-bg flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="trz-ink flex items-center gap-2 text-sm font-bold"><span className="h-3 w-3 rounded-full" style={{ background: color as string }} />{label as string}</span>
              <span className="trz-orange text-sm font-extrabold">{value as number}%</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

export function PortalDataCentre({ title, subtitle, pies, bars }: { title: string; subtitle: string; pies: Array<[string, number, string]>; bars: Array<[string, number]> }) {
  const first = pies[0]?.[1] || 55
  const second = first + (pies[1]?.[1] || 25)
  const gradient = `conic-gradient(${pies[0]?.[2] || '#D96B1F'} 0 ${first}%, ${pies[1]?.[2] || '#F8C84E'} ${first}% ${second}%, ${pies[2]?.[2] || '#7EA06D'} ${second}% 100%)`

  return (
    <Panel title={title} subtitle={subtitle}>
      <div className="mt-6 grid gap-6 xl:grid-cols-[260px_1fr] xl:items-center">
        <div className="trz-soft-card rounded-[26px] p-5">
          <motion.div className="mx-auto h-48 w-48 rounded-full p-8" style={{ background: gradient }} initial={{ rotate: -40, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} viewport={{ once: true }}>
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center">
              <span className="trz-ink text-3xl font-extrabold">{pies[0]?.[1] || 55}%</span>
            </div>
          </motion.div>
          <div className="mt-5 space-y-2">
            {pies.map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span className="trz-ink flex items-center gap-2 text-xs font-extrabold"><span className="h-3 w-3 rounded-full" style={{ background: color }} />{label}</span>
                <span className="trz-orange text-xs font-extrabold">{value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="trz-soft-card rounded-[26px] p-5">
          <div className="flex h-64 items-end gap-3">
            {bars.map(([label, value], index) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-3">
                <motion.div className="w-full rounded-t-2xl" style={{ background: index % 2 === 0 ? 'linear-gradient(180deg, #F28A3D, #D96B1F)' : 'linear-gradient(180deg, #F8C84E, #D96B1F)' }} initial={{ height: 0 }} whileInView={{ height: `${value}%` }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.55 }} />
                <span className="trz-muted text-[10px] font-extrabold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

export function CommunicationCentre({ role, email = true }: { role: string; email?: boolean }) {
  const [subject, setSubject] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState('')
  const whatsappHref = BRAND.whatsappNumber ? `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(`Hi Tranzita operations, I need support from my ${role} portal.`)}` : '/contact'

  async function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Saving complaint...')
    const response = await fetch('/api/portal/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, priority, details }),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStatus(result.error || 'Complaint could not be submitted.')
      return
    }
    setSubject('')
    setDetails('')
    setStatus('Complaint saved for operations review.')
  }

  async function logSupport(channel: 'email' | 'whatsapp') {
    const body = `${role} opened ${channel} support from the portal.`
    await fetch('/api/portal/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel, subject: `${role} support contact`, body }),
    }).catch(() => null)
  }

  return (
    <Panel title={`${role} Communication Centre`} subtitle="Send support messages, WhatsApp operations, and log complaints from the portal">
      <div className="mt-5 grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {email ? (
            <a onClick={() => logSupport('email')} href="mailto:booking@tranzita.africa?subject=Portal%20support%20request" className="trz-blush-card trz-ink flex items-center gap-3 rounded-2xl p-4 font-extrabold">
              <Mail size={20} color="#D96B1F" /> Email support
            </a>
          ) : null}
          <a onClick={() => logSupport('whatsapp')} href={whatsappHref} target={BRAND.whatsappNumber ? '_blank' : undefined} rel={BRAND.whatsappNumber ? 'noopener noreferrer' : undefined} className="trz-soft-card trz-ink flex items-center gap-3 rounded-2xl p-4 font-extrabold">
            <MessageCircle size={20} color="#D96B1F" /> WhatsApp operations
          </a>
        </div>
        <form onSubmit={submitComplaint} className="trz-soft-card grid gap-3 rounded-[24px] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input aria-label="Complaint subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Complaint subject" className="trz-input rounded-2xl px-4 py-3 text-sm font-semibold outline-none" />
            <select aria-label="Complaint priority" value={priority} onChange={(event) => setPriority(event.target.value)} className="trz-input rounded-2xl px-4 py-3 text-sm font-semibold outline-none">
              <option>Normal</option>
              <option>Urgent</option>
              <option>Safety concern</option>
            </select>
          </div>
          <textarea aria-label="Complaint details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Write the complaint or support request here..." className="trz-input h-28 resize-none rounded-2xl px-4 py-3 text-sm font-semibold outline-none" />
          <button type="submit" className="trz-top-gradient inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-white">
            <Send size={16} /> Submit complaint
          </button>
          {status ? <p className={`text-xs font-extrabold ${status.includes('saved') ? 'trz-ink' : 'trz-orange'}`}>{status}</p> : null}
        </form>
      </div>
    </Panel>
  )
}

export function QRScanCentre({ role, rows }: { role: string; rows: string[][] }) {
  const [scanType, setScanType] = useState(rows[0]?.[0] || 'Vehicle QR')
  const [qrValue, setQrValue] = useState('')
  const [status, setStatus] = useState('')

  async function submitScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Logging scan...')
    const response = await fetch('/api/portal/qr-scans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scanType, qrValue, action: 'portal_lookup' }),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStatus(result.error || 'Scan could not be logged.')
      return
    }
    setQrValue('')
    setStatus('Scan logged for realtime review.')
  }

  return (
    <Panel title={`${role} QR Scan Centre`} subtitle="Scan vehicle, child, route, staff, or document QR codes for real-time portal information">
      <div className="mt-5 grid gap-5 xl:grid-cols-[260px_1fr]">
        <form onSubmit={submitScan} className="trz-page-bg flex min-h-56 flex-col items-center justify-center rounded-[26px] border border-dashed p-5 text-center trz-orange">
          <motion.div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-sm" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}>
            <QrCode size={48} color="#D96B1F" />
          </motion.div>
          <select value={scanType} onChange={(event) => setScanType(event.target.value)} aria-label="Scan type" className="trz-input mt-4 w-full rounded-2xl px-4 py-3 text-sm font-bold outline-none">
            {rows.map((row) => <option key={row[0]}>{row[0]}</option>)}
          </select>
          <input value={qrValue} onChange={(event) => setQrValue(event.target.value)} aria-label="QR code reference" placeholder="Paste or type QR reference" className="trz-input mt-3 w-full rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
          <button type="submit" className="trz-button-gradient mt-3 w-full rounded-2xl px-4 py-3 text-sm font-extrabold text-white">Log scan</button>
          {status ? <p className={`mt-2 text-xs font-extrabold ${status.includes('logged') ? 'trz-ink' : 'trz-orange'}`}>{status}</p> : null}
        </form>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="trz-muted">
              <tr>{['Scan type', 'Last scan', 'Result', 'Action'].map((h) => <th key={h} className="px-4 py-3 font-extrabold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join('-')} className="trz-border border-t">
                  {row.map((cell, index) => <td key={`${cell}-${index}`} className={`px-4 py-4 font-bold ${index === 3 ? 'trz-orange' : 'trz-ink'}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  )
}

export function TemperatureRegister({ rows }: { rows: string[][] }) {
  const [childName, setChildName] = useState(rows[0]?.[0] || '')
  const [routeSession, setRouteSession] = useState('morning')
  const [temperatureC, setTemperatureC] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')

  async function submitReading(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Saving reading...')
    const response = await fetch('/api/portal/temperature-readings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ childName, routeSession, temperatureC, note }),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStatus(result.error || 'Temperature reading could not be saved.')
      return
    }
    setTemperatureC('')
    setNote('')
    setStatus('Temperature reading saved.')
  }

  return (
    <Panel title="Temperature Register" subtitle="Morning and noon temperature readings for children boarding today">
      <form onSubmit={submitReading} className="trz-soft-card mt-5 grid gap-3 rounded-[24px] p-4 lg:grid-cols-[1fr_160px_160px_1fr_auto]">
        <input value={childName} onChange={(event) => setChildName(event.target.value)} aria-label="Child name" placeholder="Child name" className="trz-input rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
        <select value={routeSession} onChange={(event) => setRouteSession(event.target.value)} aria-label="Route session" className="trz-input rounded-2xl px-4 py-3 text-sm font-bold outline-none">
          <option value="morning">Morning</option>
          <option value="noon">Noon</option>
          <option value="afternoon">Afternoon</option>
        </select>
        <input value={temperatureC} onChange={(event) => setTemperatureC(event.target.value)} aria-label="Temperature" placeholder="36.7" className="trz-input rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
        <input value={note} onChange={(event) => setNote(event.target.value)} aria-label="Temperature note" placeholder="Note" className="trz-input rounded-2xl px-4 py-3 text-sm font-bold outline-none" />
        <button type="submit" className="trz-button-gradient rounded-2xl px-5 py-3 text-sm font-extrabold text-white">Save</button>
        {status ? <p className={`text-xs font-extrabold lg:col-span-5 ${status.includes('saved') ? 'trz-ink' : 'trz-orange'}`}>{status}</p> : null}
      </form>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="trz-muted">
            <tr>{['Child', 'Morning', 'Noon', 'Status', 'Nurse action'].map((h) => <th key={h} className="px-4 py-3 font-extrabold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="trz-border border-t">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className={`px-4 py-4 font-bold ${index === 3 || index === 4 ? 'trz-orange' : 'trz-ink'}`}>
                    {index === 1 || index === 2 ? <span className="inline-flex items-center gap-2"><Thermometer size={15} />{cell}</span> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

export function FleetTable({ rows }: { rows: string[][] }) {
  return (
    <Panel title="Live Fleet Table" subtitle="Vehicles, routes, children, speed, and status">
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="trz-muted">
            <tr>{['Vehicle', 'School', 'Route', 'Load', 'Speed', 'Status'].map((h) => <th key={h} className="px-4 py-3 font-extrabold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="trz-border border-t">
                {row.map((cell, index) => (
                  <td key={cell} className={`px-4 py-4 font-bold ${index === 5 ? 'trz-orange' : 'trz-ink'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

export function AlertsFeed({ rows }: { rows: string[][] }) {
  return (
    <Panel title="Live Alerts Feed" subtitle="Operations stream">
      <div className="mt-5 space-y-3">
        {rows.map(([title, vehicle, severity, time], index) => (
          <motion.div key={title} className={`rounded-2xl p-4 ${severity === 'Medium' ? 'trz-blush-card' : 'trz-soft-card'}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
            <div className="flex items-center justify-between gap-3">
              <p className="trz-ink font-extrabold">{title}</p>
              <span className="trz-muted text-xs font-bold">{time}</span>
            </div>
            <p className="trz-orange mt-1 text-xs font-bold">{vehicle} - {severity}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  )
}

export function ActionQueue({ rows, title = 'Action Queue' }: { rows: string[][]; title?: string }) {
  return (
    <Panel title={title} subtitle="Items that need review before the next route window">
      <div className="mt-5 space-y-3">
        {rows.map(([task, owner, due, priority], index) => (
          <motion.div key={task} className="trz-soft-card grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_auto_auto]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <div>
              <p className="trz-ink font-extrabold">{task}</p>
              <p className="trz-muted mt-1 text-xs font-bold">{owner}</p>
            </div>
            <span className="trz-blush-pill inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold"><Clock3 size={13} />{due}</span>
            <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${priority === 'High' ? 'trz-high-pill' : 'trz-sage-pill'}`}>{priority}</span>
          </motion.div>
        ))}
      </div>
    </Panel>
  )
}

export function DataTableCard({ title, subtitle, headers, rows }: { title: string; subtitle: string; headers: string[]; rows: string[][] }) {
  return (
    <Panel title={title} subtitle={subtitle}>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="trz-muted">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('-')} className="trz-border border-t">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className={`px-4 py-4 font-bold ${index === row.length - 1 ? 'trz-orange' : 'trz-ink'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}

export function ControlCentreStrip({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map(([label, value], index) => (
        <motion.div key={label} className="trz-card rounded-[24px] p-5" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <span className="trz-icon-tile inline-flex h-10 w-10 items-center justify-center rounded-2xl"><CheckCircle2 size={20} /></span>
          <p className="trz-muted mt-4 text-xs font-extrabold uppercase tracking-widest">{label}</p>
          <p className="trz-ink mt-1 text-2xl font-extrabold">{value}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function MiniMap() {
  return (
    <Panel title="Live Route Map" subtitle="Operational preview">
      <div className="trz-map-bg relative mt-5 h-72 overflow-hidden rounded-[24px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 320">
          <path d="M30 245 C130 90 220 260 305 140 C405 5 465 210 570 72" fill="none" stroke="#D96B1F" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 12" />
          {[80, 210, 320, 455, 540].map((x, index) => <circle key={x} cx={x} cy={[190, 210, 130, 170, 88][index]} r="10" fill={index === 3 ? '#F8C84E' : '#D96B1F'} />)}
        </svg>
        <motion.div className="absolute left-8 top-44 rounded-full bg-white p-3 shadow-lg" animate={{ x: [0, 140, 290, 440], y: [0, 28, -64, -102] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <BusFront size={24} color="#D96B1F" />
        </motion.div>
      </div>
    </Panel>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div className="trz-card rounded-[28px] p-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="trz-ink text-xl font-extrabold">{title}</h2>
          <p className="trz-muted mt-1 text-sm">{subtitle}</p>
        </div>
        <span className="trz-data-pill rounded-full px-3 py-1 text-xs font-extrabold">DATA</span>
      </div>
      {children}
    </motion.div>
  )
}


