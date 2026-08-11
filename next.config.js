const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: ['@apm-js-collab/tracing-hooks'],
  },
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
        ],
      },
    ]
  },
}

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  webpack: {
    autoInstrumentServerFunctions: false,
  },
})
