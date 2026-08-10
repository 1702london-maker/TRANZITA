'use client'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FFF9F2' }}>
      <section className="max-w-xl rounded-[32px] bg-white p-8 text-center shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
        <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Something Went Wrong</p>
        <h1 className="mt-4 text-4xl font-extrabold" style={{ color: '#183024' }}>Tranzita could not load this screen.</h1>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#65785F' }}>
          Please try again. If it continues, contact Tranzita support and we will check it.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 rounded-full px-6 py-3 text-sm font-extrabold text-white"
          style={{ background: '#D96B1F' }}
        >
          Try Again
        </button>
      </section>
    </main>
  )
}
