/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/safety-policy', destination: '/safety', permanent: true },
      { source: '/schools', destination: '/for-schools', permanent: false },
      { source: '/parents', destination: '/for-parents', permanent: false },
      { source: '/drivers', destination: '/careers', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Access-Control-Allow-Origin', value: 'https://www.tranzita.africa' },
          { key: 'Vary', value: 'Origin, RSC, Next-Router-State-Tree, Next-Router-Prefetch' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.openai.com https://api.resend.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
        ],
      },
    ]
  },
}

module.exports = nextConfig
