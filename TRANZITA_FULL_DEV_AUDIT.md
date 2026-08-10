# TRANZITA SCHOOLS — COMPLETE DEVELOPER AUDIT
**Date:** 10 August 2026  
**Codebase:** Next.js 14.2.5 App Router  
**Repo:** github.com/1702london-maker/TRANZITA  
**Live:** tranzita.vercel.app  
**Files read:** 100% — every file outside node_modules and .next  
**Overall production readiness: 28 / 100**

---

## A. PROJECT STRUCTURE — FULL TREE

```
tranzita-schools/
├── .env.local                          ← CRITICAL SECURITY ISSUE (see Section M)
├── .gitignore
├── .vercel/
│   ├── README.txt
│   └── project.json                    ← Contains org + project IDs
├── TRANZITA_DEV_AUDIT.md               ← Previous audit (this file supersedes it)
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts                ← Only API route in the entire project
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                        ← Single page — entire site is one route
├── components/
│   ├── BottomPortalBar.tsx
│   ├── BusExperience.tsx
│   ├── CasualtiesStats.tsx
│   ├── ChatWidget.tsx
│   ├── DemoFAB.tsx                     ← DEAD CODE
│   ├── DriverSafety.tsx
│   ├── Footer.tsx
│   ├── ForParents.tsx
│   ├── ForSchools.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── LiveTracking.tsx
│   ├── Navbar.tsx
│   ├── NigeriaFleet.tsx
│   ├── OmarPartnership.tsx             ← DEAD CODE + encoding corrupted
│   ├── OpenSourceStack.tsx
│   ├── RegisterCTA.tsx
│   ├── RequestDemo.tsx
│   ├── StatsStrip.tsx
│   ├── StickyBar.tsx
│   ├── TimeComparison.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── animations.ts                   ← ALL exports are dead code
│   ├── constants.ts
│   └── openai.ts                       ← DEAD CODE + latent security risk
├── next-env.d.ts
├── next.config.js                      ← Empty — no headers, no redirects
├── package.json
├── postcss.config.js
├── public/
│   └── logo.png                        ← Only asset — no favicon, no OG image
├── tailwind.config.ts
└── tsconfig.json
```

**Total routes in source:** 1 (`/`).  
**Total pages that exist:** 1.  
**Total API routes:** 1 (`/api/chat`).  
Every button and link on the site either scrolls to an anchor or links to `#`.

---

## B. EVERY PAGE AND ROUTE

### `/` — `app/page.tsx` ✅ Exists and renders
Assembles 18 stacked sections: StickyBar → Navbar → Hero → StatsStrip → HowItWorks → CasualtiesStats → TimeComparison → LiveTracking → DriverSafety → BusExperience → NigeriaFleet → ForSchools → ForParents → OpenSourceStack → RequestDemo → RegisterCTA → Footer → WhatsAppButton → ChatWidget → BottomPortalBar.  
Renders correctly. Visual only. No data persistence, no auth, no real integrations.

### `/how-it-works` ❌ No source file
- `Navbar.tsx` and `Hero.tsx` link to `#how-it-works` (anchor scroll to a section on the homepage). There is NO separate `/how-it-works` route.
- A `HowItWorks` section with `id="how-it-works"` exists on `page.tsx` so the scroll link works.
- A standalone `/how-it-works` page does not exist anywhere in `app/`.

### `/privacy-policy` ❌ Does not exist — LEGALLY REQUIRED
Referenced in `Footer.tsx:39` as `href: '#'`

### `/terms-of-service` ❌ Does not exist — LEGALLY REQUIRED
Not linked anywhere. Required before commercial operations.

### `/faq` ❌ Does not exist
`Footer.tsx:37`, `href: '#'`

### `/safety-policy` ❌ Does not exist
`Footer.tsx:38`, `href: '#'`

### `/about` ❌ Does not exist
`Footer.tsx:25`, `href: '#'`

### `/careers` ❌ Does not exist
`Footer.tsx:27`, `href: '#'`

### `/press` ❌ Does not exist
`Footer.tsx:28`, `href: '#'`

### `/blog` ❌ Does not exist
`Footer.tsx:29`, `href: '#'`

### `/schools` portal ❌ Does not exist
`BottomPortalBar.tsx:5` → `href: '#demo'`

### `/parents` portal ❌ Does not exist
`BottomPortalBar.tsx:6` → `href: '#demo'`

### `/drivers` portal ❌ Does not exist
`BottomPortalBar.tsx:7` → `href: '#demo'`

### `/api/chat` ✅ Exists — but broken when real key is present
`app/api/chat/route.ts` — Edge runtime POST handler. See Section D.

---

## C. EVERY COMPONENT — LINE BY LINE ISSUES

### `StickyBar.tsx`
- **Function:** Fixed top bar (38px, z-9999). Trust badge marquee on mobile, static on desktop. Pulls `TRUST_BADGES` from constants.
- **Issues:**
  - No `aria-label` or `role` on outer div. Screen readers get no context.
  - "Zero Emission Buses" and "Nationwide Coverage" are false claims for a pre-launch service.

### `Navbar.tsx`
- **Function:** Fixed nav (`top: 38`, `z-9990`). Scroll-aware background. Mobile hamburger.
- **Issues:**
  - **Line 43:** `<img src="/logo.png">` — not `next/image`. No width/height. Causes CLS (Cumulative Layout Shift). No WebP.
  - **Line 42:** Logo `<a href="#">` — should be `href="/"`.
  - All 6 nav links are `#` anchors. "Contact" goes to `#demo`.
  - `<nav>` has no `aria-label="Main navigation"`.

### `Hero.tsx`
- **Function:** Full-height hero. Word-by-word animation, floating particles, cityscape SVG, EV bus, two CTAs.
- **Issues:**
  - **Line 168:** "Now Operating Across Nigeria" — FALSE. Service is not live.
  - **Line 19:** "500+ Kids Daily" badge — fake stat.
  - **Line 213:** `href="#demo"` — leads to a form that discards all data.
  - **Lines 63–155:** 134-line inline SVG cityscape. Should be a separate file.
  - Scroll arrow SVG has no `aria-hidden="true"`.

### `StatsStrip.tsx`
- **Function:** Animated counting numbers on orange background. Stats from `lib/constants.ts`.
- **Issues:**
  - All stats are fictional (see Section G).
  - **setInterval leak:** No `clearInterval` on component unmount. If component unmounts before animation completes, the interval continues running. Fix: store timer IDs in `useRef` and clean up in `useEffect` return.

### `HowItWorks.tsx`
- **Function:** 4-step process section with animated SVG connector.
- **Issues:**
  - `<motion.line>` used for `pathLength` animation — `pathLength` on `<line>` is non-standard. Use `<motion.path>` instead for reliable cross-browser support.

### `CasualtiesStats.tsx`
- **Function:** Nigeria road safety stats, animated counters, "Tranzita Standard" comparison card.
- **Issues:**
  - Stats sourced as "FRSC 2023", "Road Safety Audit", etc. — no links, no verification.
  - "18x Higher risk on unregulated school runs" — legally sensitive unverified claim.
  - Same `setInterval` leak as `StatsStrip.tsx`.

### `TimeComparison.tsx`
- **Function:** Before/After timeline showing pickup time difference.
- **Issues:** Entirely fictional scenario ("Chidi"). No bugs. Clean code.

### `LiveTracking.tsx`
- **Function:** Split layout with animated phone showing GPS map with moving bus dot, fake WhatsApp notification.
- **Issues:**
  - **Line 119:** Fake WhatsApp message — "Chidi picked up. ETA home: 4:28 PM".
  - **Lines 92–99:** Moving bus dot is 100% visual mock. Zero real GPS data. Most deceptive component visually.
  - **Line 43:** "Real-time GPS map · updated every 30 seconds" — feature does not exist.

### `DriverSafety.tsx`
- **Function:** Three crew cards, fictional driver ID card "Emeka Okafor", 6-stage vetting checklist.
- **Issues:**
  - **Lines 127–153:** "Emeka Okafor · TRZ-0048-NG · Verified 2026" — completely fictional persona shown as a real vetted driver.
  - "Scan to verify" area has no QR, no URL, no verification system.
  - "Criminal Records Bureau clearance" and "Vehicle inspection every 30 days" are operational promises with no backend to enforce.

### `BusExperience.tsx`
- **Function:** Three feature cards: Electric & Clean, Child-Safe, Home By 4:30.
- **Issues:** Fleet does not exist. "GPS-locked routes" not built. Clean code.

### `NigeriaFleet.tsx`
- **Function:** Fleet section with animated bus illustration and 6 spec cards.
- **Issues:**
  - "Currently serving Lagos and Abuja" — FALSE.
  - "Expanding to all 36 states by 2027" — unverified future claim.
  - "Passed Nigerian school transport safety audit" — unverifiable.

### `ForSchools.tsx`
- **Function:** 6-feature grid for school administrators.
- **Issues:**
  - "Bus attendance syncs directly with your school MIS" — MIS integration does not exist.
  - "Transparent Billing through the school finance portal" — portal does not exist.
  - All 6 features are aspirational. None are built.

### `ForParents.tsx`
- **Function:** Split layout with text benefits and mock WhatsApp chat.
- **Issues:**
  - **Line 51:** "No app to install. Works on WhatsApp" — contradicts the parent app referenced in Hero. Contradictory messaging.
  - Mock chat uses fictional "Chidi" and "Lagos International School".
  - Last message animation delay of 6.1s on slow devices — chat appears empty for 6 seconds.

### `OpenSourceStack.tsx`
- **Function:** 6-feature platform grid for tech stack claims.
- **Issues:**
  - "AI Route Optimisation" — no AI, no route system built.
  - "End-to-End Encryption" — no database, no data stored.
  - "Cashless Payments via USSD" — no payment system built.
  - Component is named "OpenSourceStack" but contains platform feature claims, not open source info. Misleading name.

### `RequestDemo.tsx` — ⚠️ CRITICAL BUG
- **Function:** Contact form collecting name, email, school, role, student count.
- **CRITICAL BUG lines 11–14:**
  ```ts
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)   // ALL DATA IS SILENTLY DISCARDED
  }
  ```
  The form state is collected but never sent anywhere. No API call, no email, no database write. The success message "We have received your request!" shown to users is false. **This is the site's entire commercial purpose and it is completely non-functional.**
- **Line 56:** Success state shows "WhatsApp us directly: booking@transzita.africa" — this is an email address, not a WhatsApp link. Copy error.
- ALL 5 form inputs have no `id` attributes. `<label>` elements have no `htmlFor`. Labels are not programmatically associated with their inputs. WCAG 2.1 failure across all 5 fields.
- `students` input has no `type="number"`.
- No `autocomplete` attributes.

### `ChatWidget.tsx` — ⚠️ FUNCTIONAL BUG
- **Function:** Floating AI chat with "Amaka" persona.
- **CRITICAL BUG line 47:**
  ```ts
  const data = await res.json()   // ← THROWS when real OpenAI key is present
  ```
  When `OPENAI_API_KEY` is present, `route.ts` returns a `ReadableStream` (text/plain). Calling `.json()` on a stream throws `SyntaxError` every time. Chat only "works" in the fallback state (no key). Fix: use `res.text()` instead.
- **Line 75:** Widget header reads "Tranzita AI Assistant" — directly contradicts the system prompt telling Amaka to deny being AI.
- **Line 19:** ChatWidget hard-codes its own opening message instead of using `AMAKA_FIRST_MESSAGE` from constants. Two slightly different strings are out of sync.
- Close button (line 77): no `aria-label`.
- Send button (line 138): no `aria-label`.
- Input (line 130): no `aria-label`. Placeholder only is not accessible.
- Typing indicator: no `aria-live` region.

### `BottomPortalBar.tsx`
- **Function:** Fixed floating pill with 5 portal buttons.
- **Issues:**
  - ALL 5 portals (SCHOOLS, PARENTS, DRIVERS, COPILOT, NURSE) link to `href: '#demo'`.
  - No portal pages, no login systems exist for any of the 5.

### `WhatsAppButton.tsx`
- **Function:** Fixed WhatsApp FAB.
- **Issues:**
  - Uses `BRAND.whatsapp` from constants → `https://wa.me/2340000000000` — **placeholder with 13 zeros. Dead link.**

### `Footer.tsx`
- **Function:** Multi-column footer.
- **Issues:**
  - **Line 51:** `<img>` not `next/image`.
  - ALL social links (lines 4–8): `href: '#'` — Twitter/X, Facebook, Instagram, LinkedIn all dead.
  - ALL company links (lines 25–30): About, Careers, Press, Blog — all `href: '#'`.
  - ALL support links (lines 32–40): WhatsApp Us, FAQ, Safety Policy, Privacy Policy — all `href: '#'`.
  - **Line 71:** `booking@transzita.africa` — note domain is `transzita` (not `tranzita`). Verify domain ownership. If unowned, emails go to a third party.
  - Social icons use emoji (𝕏, 📘, 📷, 💼) — poor cross-platform rendering. Use SVG.

### `RegisterCTA.tsx`
- **Function:** Final CTA section.
- **Issues:**
  - "Join the schools and parents already signed up" — FALSE. Zero signups exist. No database.
  - "Early Access Open" — no waitlist system exists.
  - Both buttons link to `#demo` (the broken form).

### `OmarPartnership.tsx` — ❌ DEAD CODE
- Not imported anywhere. UTF-8 encoding corruption on lines 44, 57, 84. **Delete.**

### `DemoFAB.tsx` — ❌ DEAD CODE
- Not imported anywhere. **Delete.**

---

## D. ALL API ROUTES

### `app/api/chat/route.ts` — the ONLY API route

**Full breakdown:**
- Edge runtime (`export const runtime = 'edge'`)
- POST handler only
- Imports `AMAKA_SYSTEM_PROMPT` from `lib/constants`

**When `OPENAI_API_KEY` is absent (current production state):**
- Returns `{ content: "I'm Amaka..." }` as JSON
- ChatWidget can `.json()` this correctly
- Amaka responds with a hardcoded fallback message

**When `OPENAI_API_KEY` is present (intended production state):**
- Calls `gpt-4o` with streaming
- Returns `ReadableStream` as `text/plain`
- ChatWidget calls `.json()` on the stream → **throws SyntaxError every time**
- **The AI chat is broken in its intended production state**

**Security vulnerabilities (exact, with line numbers):**
1. **No rate limiting** — any IP, unlimited requests. With gpt-4o pricing, one malicious actor can cost thousands of dollars. `app/api/chat/route.ts` line 5 onwards.
2. **No authentication** — no `Authorization` header, no API key check, no session validation.
3. **No CORS restriction** — any domain can POST to this endpoint.
4. **No body validation (line 13):** `const { messages } = await req.json()` — no try/catch, no zod schema. Malformed body throws unhandled error. Attacker can inject messages with `role: 'system'` to override the Amaka prompt.
5. **No `max_tokens` per user** — only `max_tokens: 500` in the OpenAI call, but no per-IP message cap.
6. **No `messages` array length cap** — attacker can send thousands of prior messages to maximise tokens per request.

---

## E. ENVIRONMENT AND CONFIG

### `.env.local`
```
Line 1: OPENAI_API_KEY=your-openai-api-key-here    ← placeholder, not real key
Line 3: # Created by Vercel CLI
Line 4: VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsIn..."   ← REAL TOKEN — ROTATE NOW
```

The Vercel OIDC JWT on line 4 encodes:
- Project ID: `prj_JQlNwWEkD3oGtR3YgwhkKubxphHf`
- Org ID: `team_CRV957gCq7ivzLmksESDcGEA`
- User ID: `9C89zETfIDHvbw1MatzxGVur`
- Client ID: `vercel-cli`
- `exp`: `1786091960` (~10 August 2026 10:19 UTC — check if expired)

**Action: Rotate immediately in Vercel dashboard → Settings → Tokens.**

### `next.config.js`
```js
const nextConfig = {}
module.exports = nextConfig
```
Completely empty. Missing:
- No `headers()` — no CSP, no `X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`
- No `poweredByHeader: false` — server leaks Next.js version
- No `images.domains`
- No `redirects()`

**Fix to add immediately:**
```js
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }]
  },
}
module.exports = nextConfig
```

### `tailwind.config.ts`
- **Line 19 BUG:** `fontFamily.sans: ['Inter', 'system-ui', 'sans-serif']` — project uses Plus Jakarta Sans loaded via Google Fonts. Any component using `font-sans` Tailwind class gets Inter, not the brand font.
- **Fix:** Change to `['Plus Jakarta Sans', 'system-ui', 'sans-serif']`
- Custom `orange` only defines `DEFAULT` and `600`. `bg-orange-100` etc. fall back to Tailwind default orange, not brand orange.

### `tsconfig.json`
- `"strict": true` ✅
- `"paths": { "@/*": ["./*"] }` ✅
- No issues.

### `package.json` — Full dependency list

| Package | Version | Status |
|---|---|---|
| `next` | `14.2.5` | ✅ Current for v14 |
| `react` | `^18` | ✅ OK |
| `react-dom` | `^18` | ✅ OK |
| `framer-motion` | `^11.3.0` | ⚠️ Used in 19/21 components. No LazyMotion. Full ~140kB bundle. |
| `openai` | `^4.55.0` | ✅ Used in API route |
| `lucide-react` | `^0.414.0` | ❌ UNUSED — imported by zero files. Remove. |

**Missing packages (needed for planned features):**
- `resend` — for demo form email
- `@supabase/supabase-js` — for database
- `@upstash/ratelimit` + `@upstash/redis` — for API rate limiting
- `@vercel/analytics` — for traffic data
- `zod` — for form/API input validation
- `server-only` — to guard server-only modules

### `.gitignore`
```
.next/
node_modules/
.env.local
.env
*.env
out/
.DS_Store
.vercel
.env*
```
- `.env.local` correctly excluded ✅
- `.vercel/` correctly excluded ✅
- Missing: `*.log`, `npm-debug.log*`, `.env.*.local`, `coverage/`

### `public/` directory
Contents: `logo.png` only.

Missing:
- `favicon.ico`
- `apple-touch-icon.png`
- `og-image.png`
- `sitemap.xml`
- `robots.txt`
- `manifest.json`

---

## F. LIBRARY FILES

### `lib/constants.ts` — full issues

| Item | Line | Value | Issue |
|---|---|---|---|
| `BRAND.email` | 4 | `booking@transzita.africa` | Domain is `transzita` not `tranzita`. Verify ownership. |
| `BRAND.whatsapp` | 6 | `https://wa.me/2340000000000` | **FAKE — 13 zeros. Dead link on every WhatsApp button.** |
| `TRUST_BADGES` | 9–20 | "School Board Approved", "Zero Emission Buses", "Nationwide Coverage" | All false claims for pre-launch service. |
| `STATS.children` | 23 | `500` | Fake. No operations. |
| `STATS.ontime` | 24 | `98` | Fake. No operations. |
| `STATS.incidents` | 27 | `0` | Fake. No operations. |
| `AMAKA_SYSTEM_PROMPT` | 57 | "If someone asks if you are a bot, say you are part of the Tranzita support team" | **ILLEGAL — violates EU AI Act Art. 52, FTC guidelines, NDPA 2023.** |
| `AMAKA_FIRST_MESSAGE` | 59 | `"Hello! I'm Amaka..."` | Defined but never imported. Dead constant. |

### `lib/animations.ts`
Exports 7 animation variants: `fadeUp`, `fadeIn`, `staggerContainer`, `slideRight`, `slideLeft`, `cardHover`, `viewportConfig`.
- **None are imported by any active component.** Every active component re-implements these patterns inline.
- Only `viewportConfig` is imported — by `OmarPartnership.tsx`, which is dead code.
- **All 7 exports are effectively dead code.**

### `lib/openai.ts`
```ts
import OpenAI from 'openai'
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```
- **Not imported by anything.** API route does inline `import('openai')` instead.
- **Security risk:** If ever imported in a `'use client'` component, `OPENAI_API_KEY` would be bundled into the browser JS and exposed publicly.
- **Fix:** Add `import 'server-only'` at line 1, or delete the file.

---

## G. COMPLETE LIST OF FAKE / MOCKED CONTENT

Everything below appears real to a visitor but is not.

| Fake item | File | Reality |
|---|---|---|
| "500+ Children transported daily" | `lib/constants.ts:23` | Pre-launch. Zero children. |
| "98% On-time rate" | `lib/constants.ts:24` | No operations. |
| "0 Incidents reported" | `lib/constants.ts:27` | No operations. |
| "Now Operating Across Nigeria" | `Hero.tsx:168` | Not operational. |
| "500+ Kids Daily" badge | `Hero.tsx:19` | Fake stat. |
| "Live GPS" trust badge | `StickyBar.tsx` via constants | Feature not built. |
| "School Board Approved" badge | `lib/constants.ts:14` | Unverified claim. |
| "Zero Emission Buses" badge | `lib/constants.ts:17` | Fleet doesn't exist. |
| "Nationwide Coverage" badge | `lib/constants.ts:18` | Not operational. |
| Road safety stats with source citations | `CasualtiesStats.tsx:6–9` | No links. Unverified. |
| "18x Higher risk" claim | `CasualtiesStats.tsx:8` | No source link. |
| Live GPS tracking phone animation | `LiveTracking.tsx:92–99` | Animated SVG. Zero real data. |
| WhatsApp notification "Chidi picked up" | `LiveTracking.tsx:119` | Fictional. |
| "Updated every 30 seconds" | `LiveTracking.tsx:43` | Feature not built. |
| "Emeka Okafor · TRZ-0048-NG" driver ID | `DriverSafety.tsx:129` | Fictional character. |
| "Active · Verified 2026" status | `DriverSafety.tsx:151` | No verification system. |
| "Scan to verify" label | `DriverSafety.tsx:149` | No QR, no system. |
| WhatsApp chat "Chidi/Lagos International School" | `ForParents.tsx:6–10` | Fictional scenario. |
| "No app to install. Works on WhatsApp" | `ForParents.tsx:46` | WhatsApp integration not built. |
| "Currently serving Lagos and Abuja" | `NigeriaFleet.tsx:11` | Not serving anyone. |
| "Expanding to 36 states by 2027" | `NigeriaFleet.tsx:11` | Unverified. |
| "Passed Nigerian school transport safety audit" | `NigeriaFleet.tsx:9` | Unverifiable. |
| "End-to-End Encryption" | `OpenSourceStack.tsx:9` | No database exists. |
| "AI Route Optimisation" | `OpenSourceStack.tsx:18` | No AI system. |
| "Cashless Payments via USSD" | `OpenSourceStack.tsx:23` | No payment system. |
| Live Dashboard for schools | `ForSchools.tsx:6` | Dashboard doesn't exist. |
| Attendance Integration with MIS | `ForSchools.tsx:8` | Not built. |
| School Finance Portal | `ForSchools.tsx:11` | Doesn't exist. |
| "We have received your request!" | `RequestDemo.tsx:53` | Data is discarded. Form does nothing. |
| WhatsApp button | `WhatsAppButton.tsx` | Goes to dead placeholder number. |
| Amaka AI chat | `ChatWidget.tsx` | Broken when real OpenAI key present. |
| Amaka "Tranzita support team member" | `lib/constants.ts:57` | AI told to deny being AI. |
| SCHOOLS portal | `BottomPortalBar.tsx:5` | Goes to `#demo`. No portal. |
| PARENTS portal | `BottomPortalBar.tsx:6` | Goes to `#demo`. No portal. |
| DRIVERS portal | `BottomPortalBar.tsx:7` | Goes to `#demo`. No portal. |
| COPILOT portal | `BottomPortalBar.tsx:8` | Goes to `#demo`. No portal. |
| NURSE portal | `BottomPortalBar.tsx:9` | Goes to `#demo`. No portal. |
| "Join the schools and parents already signed up" | `RegisterCTA.tsx:51` | Zero signups. No database. |
| "Early Access Open" | `RegisterCTA.tsx:27` | No waitlist system. |

---

## H. MINIMUM VIABLE BACKEND FOR LAUNCH

Based on what the site currently promises, this is the minimum needed to go live commercially:

### Tier 1 — LEGAL (required before collecting any user data)
1. `/privacy-policy` page
2. `/terms-of-service` page
3. Cookie consent banner (NDPA 2023 + EU visitors)

### Tier 2 — COMMERCIAL (required for the site's only revenue mechanism)
4. `POST /api/demo` → Supabase row insert + Resend email to team
5. Real WhatsApp business number replacing `2340000000000` in `lib/constants.ts:6`
6. Rate limiting on `/api/chat` — `@upstash/ratelimit`
7. Fix ChatWidget: `res.text()` not `res.json()` (`ChatWidget.tsx:47`)

### Tier 3 — OPERATIONS (required before any child gets on a bus)
8. School portal — Supabase Auth + `/schools/dashboard` route
9. Parent registration — link parent to child record + WhatsApp subscription
10. Driver/crew registration + vetting workflow
11. Real GPS integration — hardware provider API → WebSocket → client map
12. WhatsApp Business API — Twilio or Meta Cloud API for automated parent alerts
13. Payment processing — Paystack for Nigerian subscription billing

### Tier 4 — MARKETING / DISCOVERABILITY
14. `public/sitemap.xml` or `app/sitemap.ts`
15. `public/robots.txt`
16. Favicon + OG image
17. `@vercel/analytics`
18. `/faq`, `/safety-policy`, `/about` pages

---

## I. DEAD CODE

| File / Item | Evidence |
|---|---|
| `components/OmarPartnership.tsx` | Not imported in `app/page.tsx` or anywhere else |
| `components/DemoFAB.tsx` | Not imported anywhere |
| `lib/openai.ts` | Not imported anywhere — API route uses inline `import('openai')` |
| ALL exports in `lib/animations.ts` | Only consumer is `OmarPartnership.tsx` which is itself dead |
| `AMAKA_FIRST_MESSAGE` in `lib/constants.ts:59` | Imported by zero files — ChatWidget uses its own hardcoded string |
| `lucide-react` package | Installed but not imported by any file |
| `.next/server/app/how-it-works/page.js` | Stale build artifact — source file deleted |

---

## J. DEPENDENCY AUDIT

### Production
| Package | Version | Status |
|---|---|---|
| `next` | `14.2.5` | ✅ Current for v14 |
| `react` | `^18` | ✅ OK |
| `react-dom` | `^18` | ✅ OK |
| `framer-motion` | `^11.3.0` | ⚠️ 19 of 21 active components. No LazyMotion. ~140kB unoptimised. |
| `openai` | `^4.55.0` | ✅ Used in API route only |
| `lucide-react` | `^0.414.0` | ❌ UNUSED. Remove from package.json. |

### Dev dependencies
All standard (eslint, typescript, tailwindcss, postcss, autoprefixer). No issues.

### Not installed but needed
- `resend` — email from demo form
- `@supabase/supabase-js` — database
- `@upstash/ratelimit` + `@upstash/redis` — rate limiting
- `@vercel/analytics` — traffic
- `zod` — validation
- `server-only` — guard server modules
- `paystack` or `@paystack/inline-js` — payments

---

## K. SEO AND METADATA

### `app/layout.tsx` metadata
```ts
export const metadata: Metadata = {
  title: 'Tranzita Schools — Every Child. On Time. Safe Home.',
  description: "Nigeria's first dedicated school transport platform...",
}
```

| Item | Status |
|---|---|
| Open Graph tags | ❌ MISSING — blank preview when shared on WhatsApp/Twitter/LinkedIn |
| Twitter Card | ❌ MISSING |
| Canonical URL | ❌ MISSING |
| OG image (`/og-image.png`) | ❌ MISSING — file doesn't exist in public/ |
| Favicon reference in layout | ❌ MISSING — no favicon.ico in public/ |
| `lang` attribute | ✅ `<html lang="en">` — consider `"en-NG"` for Nigerian English |
| Viewport meta | ✅ Next.js adds default |
| Structured data (JSON-LD) | ❌ MISSING — `LocalBusiness` or `Service` schema would help Google ranking |
| `sitemap.xml` | ❌ MISSING |
| `robots.txt` | ❌ MISSING |
| Dynamic page titles | N/A — only 1 page exists |
| Font loading | ⚠️ `<link>` to Google CDN instead of `next/font/google`. Third-party DNS request on every load. |

---

## L. ACCESSIBILITY AUDIT

### Form labels not associated with inputs — `RequestDemo.tsx`
All 5 fields (Full Name, Email, School Name, Your Role, Number of Students) have visual `<label>` text but no `id` on the input and no `htmlFor` on the label. Screen readers do not announce labels on focus. **WCAG 2.1 AA failure — all 5 fields.**

### Buttons without accessible labels
| Element | File | Line | Issue |
|---|---|---|---|
| Close button "✕" | `ChatWidget.tsx` | 77 | No `aria-label` |
| Send button "➤" | `ChatWidget.tsx` | 138 | No `aria-label` |
| Chat input | `ChatWidget.tsx` | 130 | No `aria-label` — placeholder only |

### Color contrast failures
| Color | Background | Ratio | Standard | Status |
|---|---|---|---|---|
| `#8FA88F` | `#FFFFFF` | ~3.0:1 | 4.5:1 AA | ❌ FAIL |
| `#E8601C` (orange) | `#FFFFFF` | ~3.1:1 | 4.5:1 AA | ❌ FAIL |
| `#6B7F6B` | `#FFFFFF` | ~4.4:1 | 4.5:1 AA | ⚠️ Borderline |
| `rgba(255,255,255,0.75)` | `#1E2B1E` | ~7:1 | 4.5:1 AA | ✅ Pass |

### Focus visibility
- No `focus-visible` styles in `globals.css`. Tailwind base reset removes browser outlines.
- **ALL interactive elements have no visible keyboard focus state. WCAG 2.1 SC 2.4.7 failure.**

### Missing ARIA
- `<nav>` in `Navbar.tsx` — no `aria-label="Main navigation"`
- StickyBar marquee — no `aria-hidden="true"` on duplicated badges (screen readers read badges twice)
- Decorative SVGs throughout — no `aria-hidden="true"`
- ChatWidget typing indicator — no `aria-live` region
- Logo `<a>` in Navbar — `href="#"` with no accessible label for what it does

---

## M. FULL SECURITY AUDIT

### 🔴 CRITICAL — Vercel OIDC JWT in .env.local
**File:** `.env.local:4`  
Full JWT encoding Vercel project ID, org ID, and user ID. File is gitignored but was shared with auditor. Token `exp` ~10 August 2026 10:19 UTC.  
**Fix:** Rotate token in Vercel dashboard immediately. Delete from `.env.local`.

### 🔴 CRITICAL — /api/chat has no rate limiting, auth, or CORS
**File:** `app/api/chat/route.ts`  
Open to unlimited requests from any origin. With a live gpt-4o key, a single bad actor can exhaust any budget in hours.  
**Fix:** Add `@upstash/ratelimit` before placing a real key in Vercel env vars.

### 🟠 HIGH — Deceptive AI persona
**File:** `lib/constants.ts:57`  
Amaka instructed to claim to be human. Violates EU AI Act Art. 52, FTC guidelines, NDPA 2023.  
**Fix:** Change to disclose AI nature when asked.

### 🟠 HIGH — No security headers
**File:** `next.config.js`  
No CSP, no `X-Frame-Options` (clickjacking), no `X-Content-Type-Options`, no `Referrer-Policy`. `X-Powered-By: Next.js` header leaks version.  
**Fix:** Add `headers()` function to `next.config.js` (see Section E for exact code).

### 🟠 HIGH — .vercel/project.json with org and project IDs
**File:** `.vercel/project.json`  
`{"projectId":"prj_JQlNwWEkD3oGtR3YgwhkKubxphHf","orgId":"team_CRV957gCq7ivzLmksESDcGEA","projectName":"tranzita"}`  
Gitignored but present on disk. IDs alone insufficient for damage without a valid token. Low immediate risk.

### 🟡 MEDIUM — lib/openai.ts — dead module with client exposure risk
**File:** `lib/openai.ts`  
Not imported anywhere. If accidentally imported in a client component, `OPENAI_API_KEY` would be in the browser bundle.  
**Fix:** Add `import 'server-only'` at line 1, or delete.

### 🟡 MEDIUM — No input validation on /api/chat body
**File:** `app/api/chat/route.ts:13`  
`req.json()` not wrapped in try/catch. `messages` array not validated. Attacker can inject `{ role: 'system', content: '...' }` to override Amaka's prompt.  
**Fix:** Wrap in try/catch. Validate with `zod`. Filter to `user`/`assistant` roles only.

### 🟡 MEDIUM — No CSRF on demo form
**File:** `components/RequestDemo.tsx`  
Currently discards data. When wired to a real backend, needs CSRF token.

### 🔵 LOW — Google Fonts CDN request
**File:** `app/layout.tsx:13–15`  
Third-party DNS request on every page load. Privacy and CSP implication.  
**Fix:** Use `next/font/google` (self-hosts at build time, zero CDN request).

### ✅ PASS — No dangerouslySetInnerHTML, no eval(), no console.log of secrets
All 22 components and all lib files checked. None found.

### ✅ PASS — No credentials in git history
`.env.local` is gitignored and was never committed. All source files are clean.

---

## PRIORITY ACTION LIST FOR CODEX

### 🔴 DO FIRST — Security (blocking)
1. **Rotate Vercel OIDC token** — Vercel dashboard → Tokens → revoke. Delete from `.env.local:4`.
2. **Add security headers** — Add `headers()` to `next.config.js` + `poweredByHeader: false`.
3. **Add rate limiting to `/api/chat`** — Install `@upstash/ratelimit` + `@upstash/redis`. Wrap route handler.
4. **Add input validation to `/api/chat`** — Install `zod`. Validate body. Strip non-user/assistant messages. Wrap `req.json()` in try/catch.
5. **Fix Amaka system prompt** — `lib/constants.ts:57` — remove bot-denial instruction. Add AI disclosure.
6. **Add `import 'server-only'` to `lib/openai.ts`** or delete the file entirely.

### 🔴 DO NEXT — Functionality (the site's commercial purpose)
7. **Wire RequestDemo form to backend** — `components/RequestDemo.tsx:11–14` → `POST /api/demo` → Supabase row insert + Resend email notification to team.
8. **Replace fake WhatsApp number** — `lib/constants.ts:6` → real +234 business number.
9. **Fix ChatWidget stream handling** — `components/ChatWidget.tsx:47` → change `res.json()` to `res.text()`. Sync opening message with `AMAKA_FIRST_MESSAGE` constant.

### 🔴 LEGAL (before going live with data collection)
10. **Create `/privacy-policy` page** — `app/privacy-policy/page.tsx`
11. **Create `/terms-of-service` page** — `app/terms-of-service/page.tsx`
12. **Add cookie consent banner** — gate analytics behind consent.

### 🟠 ACCESSIBILITY (WCAG 2.1 AA failures)
13. **Fix all form label associations** — `components/RequestDemo.tsx` — add `id` to all 5 inputs, add `htmlFor` to all 5 labels.
14. **Add `aria-label` to ChatWidget buttons** — `ChatWidget.tsx:77` (close), `ChatWidget.tsx:138` (send), `ChatWidget.tsx:130` (input).
15. **Add `focus-visible` styles** — `app/globals.css` — keyboard users have no focus indicator on any element currently.
16. **Add `aria-hidden="true"` to decorative SVGs and marquee** — Hero, StickyBar, Navbar.

### 🟠 BUGS
17. **Fix Tailwind font config** — `tailwind.config.ts:19` → change `'Inter'` to `'Plus Jakarta Sans'`.
18. **Replace `<img>` with `<Image>`** — `Navbar.tsx:43` and `Footer.tsx:51`.
19. **Fix setInterval leak** — `StatsStrip.tsx` and `CasualtiesStats.tsx` — store interval refs, clear on unmount.
20. **Fix `students` input** — `RequestDemo.tsx` — add `type="number"`.

### 🟡 SEO / DISCOVERABILITY
21. **Add OG and Twitter Card metadata** — `app/layout.tsx` — add `openGraph` and `twitter` properties.
22. **Create OG image** — `public/og-image.png`.
23. **Add `app/sitemap.ts`** or `public/sitemap.xml`.
24. **Add `public/robots.txt`**.
25. **Add favicon** — `public/favicon.ico` + `public/apple-touch-icon.png` + reference in `layout.tsx`.
26. **Add `@vercel/analytics`** — one-line addition to `layout.tsx`.
27. **Switch fonts to `next/font/google`** — remove `<link>` tags, import via `next/font/google` in `layout.tsx`.

### 🟡 DEAD CODE (cleanup)
28. **Delete `components/OmarPartnership.tsx`**.
29. **Delete `components/DemoFAB.tsx`**.
30. **Delete `lib/openai.ts`** (after step 6 above).
31. **Remove `lucide-react`** from `package.json` — `npm uninstall lucide-react`.
32. **Review `lib/animations.ts`** — all 7 exports are unused. Either wire them into active components or delete the file.
33. **Remove `AMAKA_FIRST_MESSAGE`** from constants or import it in ChatWidget (currently duplicated).

### 🔵 PERFORMANCE
34. **Add `LazyMotion`** from framer-motion — use `domAnimation` feature set to reduce bundle.
35. **Use `next/dynamic`** for below-fold sections — `ForSchools`, `ForParents`, `RequestDemo`, `RegisterCTA`.
36. **Verify `booking@transzita.africa` domain ownership** — `transzita` vs `tranzita` — if not owned, emails go to a third party.

---

*Audit completed 10 August 2026 · 22 components · 3 lib files · 1 API route · all config files · every file read in full*
