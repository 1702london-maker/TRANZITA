export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FFF9F2' }}>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#DDE9D2] border-t-[#D96B1F]" />
        <p className="text-sm font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Loading</p>
        <h1 className="mt-3 text-2xl font-extrabold" style={{ color: '#183024' }}>Preparing Tranzita</h1>
      </div>
    </main>
  )
}
