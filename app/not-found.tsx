import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FFF9F2' }}>
      <section className="max-w-xl rounded-[32px] bg-white p-8 text-center shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
        <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Page Not Found</p>
        <h1 className="mt-4 text-4xl font-extrabold" style={{ color: '#183024' }}>This route is not available.</h1>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>
          The page may have moved, or the link may be incomplete. Return home or contact Tranzita for help.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full px-6 py-3 text-sm font-extrabold text-white" style={{ background: '#D96B1F' }}>
            Go Home
          </Link>
          <Link href="/contact" className="rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: '#DDE9D2', color: '#183024' }}>
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  )
}
