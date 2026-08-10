import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { BadgeCheck, ClipboardCheck, Gauge, MapPinned, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react'

const checks: Array<[string, LucideIcon, string]> = [
  ['Identity and clearance', UserCheck, 'Every driver must pass identity verification, Nigerian Police clearance, licence checks, and reference review before route assignment.'],
  ['Defensive driving standard', ShieldCheck, 'Drivers are assessed for school-zone awareness, child transport conduct, controlled speed, and calm decision-making in traffic.'],
  ['Vehicle readiness', ClipboardCheck, 'The driver cannot start a route until vehicle checks, GPS lock, battery level, tyres, lights, and onboard equipment are confirmed.'],
  ['Route discipline', MapPinned, 'Drivers follow assigned routes only. Unexpected stops, diversions, and speed issues are visible to operations for review.'],
  ['Speed compliance', Gauge, 'Speed is monitored by route type and road condition. Repeated breaches trigger operations review and suspension workflow.'],
  ['Crew accountability', BadgeCheck, 'The driver focuses on the road while the copilot manages the manifest and the nurse manages child welfare. No one works alone.'],
]

export default function DriverSafetyRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <section className="min-h-[78vh] px-4 pt-36 pb-24 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Driver Safety</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl headline-balance" style={{ color: '#183024' }}>The driver standard before a child boards.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: '#65785F' }}>
              Tranzita drivers are not treated as ordinary transport contractors. They are part of a child-safety crew, held to route discipline, vehicle checks, speed rules, and operational review.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/careers#apply" className="rounded-full px-7 py-4 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>Apply as a driver</a>
              <a href="/safety" className="rounded-full border px-7 py-4 text-sm font-extrabold" style={{ borderColor: '#DDE9D2', color: '#183024', background: 'white' }}>Full safety system</a>
            </div>
          </div>
        </section>

        <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Operating Checks</p>
              <h2 className="mt-3 text-4xl font-extrabold headline-balance" style={{ color: '#183024' }}>What every driver must clear.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {checks.map(([title, Icon, body]) => (
                <article key={title} className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
                  <Icon size={34} color="#D96B1F" />
                  <h3 className="mt-5 text-xl font-extrabold" style={{ color: '#183024' }}>{title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: '#65785F' }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 text-center" style={{ background: '#F1F6EA' }}>
          <div className="mx-auto max-w-4xl rounded-[28px] bg-white p-8" style={{ border: '1px solid #DDE9D2' }}>
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Route Conduct</p>
            <h2 className="mt-3 text-4xl font-extrabold headline-balance" style={{ color: '#183024' }}>A Tranzita driver never carries the safety burden alone.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-8" style={{ color: '#65785F' }}>
              Every route includes a driver, copilot, nurse, parent updates, route monitoring, and incident escalation. That structure keeps the driver focused on the road and gives every child more than one layer of protection.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
