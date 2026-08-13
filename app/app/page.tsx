import AppExperience from '@/components/AppExperience'
import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Bell, BusFront, ClipboardCheck, Download, HeartPulse, LockKeyhole, MapPinned, QrCode, School, ShieldCheck, Smartphone, Users } from 'lucide-react'

const rows = [
  ['Parent PWA', Users, 'Live map, ETA, child journey history, guardian handover, complaints, support and school logo.'],
  ['School PWA', School, 'Student onboarding, routes, attendance, reports, safeguarding, billing and white-label information.'],
  ['Driver PWA', BusFront, 'Daily route, vehicle checklist, alerts, journey report, driver profile photo and logout.'],
  ['Copilot PWA', ClipboardCheck, 'Manifest, QR/tap-on, tap-off, guardian verification and no-guardian protocol.'],
  ['Nurse PWA', HeartPulse, 'Morning and noon temperature readings, welfare notes, first aid and emergency event records.'],
  ['Partner PWA', ShieldCheck, 'Approved bus tracking, onboard child count, inspections, documents and earnings without child names.'],
]

export const metadata = {
  title: 'Tranzita App Preview',
  description: 'Preview the Tranzita PWA app features for parents, schools, crew, nurses and partners.',
}

export default function AppPreviewPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingTop: 118, paddingBottom: 90 }}>
        <section className="px-4 py-20" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 52%, #F1F6EA 100%)' }}>
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Tranzita PWA</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight sm:text-6xl" style={{ color: '#183024' }}>One installed app. Every role in its own dashboard.</h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8" style={{ color: '#65785F' }}>This is the first app version before Play Store packaging. It installs from the browser, opens full-screen, works with offline fallback, and keeps every portal gated by role.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/auth/signin?role=parent&next=/dashboard/parent" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}><Smartphone size={18} /> Open Parent Dashboard</a>
                <a href="/auth/signin" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold" style={{ color: '#183024', border: '1px solid #DDE9D2' }}><LockKeyhole size={18} /> Sign In</a>
              </div>
            </div>
            <div className="rounded-[34px] bg-white p-6 shadow-xl" style={{ border: '1px solid #DDE9D2' }}>
              <div className="grid gap-3">
                {[
                  ['Installable', Download],
                  ['Live route map', MapPinned],
                  ['QR journey records', QrCode],
                  ['In-app alerts', Bell],
                ].map(([label, Icon]) => {
                  const AppIcon = Icon as typeof Download
                  return (
                    <div key={label as string} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}><AppIcon size={20} /></span>
                      <span className="font-extrabold" style={{ color: '#183024' }}>{label as string}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20" style={{ background: '#FFF9F2' }}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>What The App Has</p>
              <h2 className="mt-3 text-4xl font-extrabold" style={{ color: '#183024' }}>Feature set by role.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {rows.map(([title, Icon, body]) => {
                const RowIcon = Icon as typeof Users
                return (
                  <article key={title as string} className="gradient-frame rounded-[26px] bg-white p-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: '#FFF0E4', color: '#D96B1F' }}><RowIcon size={23} /></span>
                    <h3 className="mt-4 text-xl font-extrabold" style={{ color: '#183024' }}>{title as string}</h3>
                    <p className="mt-3 text-sm font-semibold leading-7" style={{ color: '#65785F' }}>{body as string}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <AppExperience />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
