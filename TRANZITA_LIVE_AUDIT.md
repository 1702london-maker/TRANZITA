# TRANZITA SCHOOLS — LIVE SITE FULL DEVELOPER AUDIT
**Date:** 10 August 2026  
**Audited from:** github.com/1702london-maker/TRANZITA + live site tranzita.africa  
**Auditor note:** Previous audit was based on local files only. This audit is based on the live site and GitHub repo. They are different builds — the live site has significantly more pages than the repo contains. This document supersedes all previous audit files.

---

## CRITICAL DISCOVERY — REPO AND LIVE SITE ARE DIFFERENT BUILDS

The GitHub repo at `1702london-maker/TRANZITA` contains only **1 route** (`app/page.tsx`) — a single homepage. The live site at **tranzita.africa** serves **13+ separate pages** with real content. Codex has deployed builds that are ahead of what is committed to GitHub. Any developer continuing this work must pull from the live Vercel deployment, not the GitHub repo, as the source of truth.

**Action required before any dev work:** Sync the full codebase from Vercel/the build that powers tranzita.africa back into the GitHub repo so source of truth is restored.

---

## A. LIVE SITE PAGE AUDIT — tranzita.africa

### Pages that exist and load correctly

| Route | Status | Content |
|---|---|---|
| `/` | ✅ WORKS | Full homepage — all sections load |
| `/how-it-works` | ✅ WORKS | Full journey walkthrough page |
| `/safety` | ✅ WORKS | Six-stage vetting, safety framework |
| `/for-schools` | ✅ WORKS | School dashboard pitch, onboarding steps |
| `/for-parents` | ✅ WORKS | Parent alerts, tracking, onboarding |
| `/our-fleet` | ✅ WORKS | Electric bus specs, vehicle partnerships |
| `/contact` | ✅ WORKS | Demo booking form + contact info |
| `/about` | ✅ WORKS | Founder story, Budruum partnership |
| `/privacy-policy` | ✅ WORKS | Real multi-section privacy policy |
| `/terms` | ✅ WORKS | Nine-section ToS under Nigerian law |
| `/faq` | ✅ WORKS | Multi-role FAQ (parents, schools, drivers) |
| `/live-tracking` | ✅ WORKS | GPS tracking explainer page |
| `/partners` | ✅ WORKS | Vehicle partnership tiers + application form |
| `/careers` | ✅ WORKS | Four open roles with application forms |

### Pages with errors

| Route | Status | Details |
|---|---|---|
| `/driver-safety` | ❌ 404 | Page linked in nav but does not exist |

### Portal pages — all returning 307 redirects (auth wall with no destination)

| Route | Status | Details |
|---|---|---|
| `/school-portal` | ⚠️ 307 | Redirects — no login page behind it |
| `/parent-portal` | ⚠️ 307 | Redirects — no login page behind it |
| `/driver-portal` | ⚠️ 307 | Redirects — no login page behind it |
| `/copilot-portal` | ⚠️ 307 | Redirects — no login page behind it |
| `/nurse-portal` | ⚠️ 307 | Redirects — no login page behind it |
| `/partner-portal` | ⚠️ 307 | Redirects — no login page behind it |

The 307s indicate auth middleware is wired up but no login/auth page has been built. Every portal click dead-ends.

---

## B. NAVIGATION AND FOOTER AUDIT

### Navigation links — live site
| Link | Destination | Status |
|---|---|---|
| Home | `/` | ✅ Works |
| How It Works | `/how-it-works` | ✅ Works |
| Safety | `/safety` | ✅ Works |
| For Schools | `/for-schools` | ✅ Works |
| For Parents | `/for-parents` | ✅ Works |
| Our Fleet | `/our-fleet` | ✅ Works |
| Contact | `/contact` | ✅ Works |
| Driver Safety | `/driver-safety` | ❌ 404 |

### Footer links — live site
| Link | Destination | Status |
|---|---|---|
| About | `/about` | ✅ Works |
| Careers | `/careers` | ✅ Works |
| Partners | `/partners` | ✅ Works |
| Privacy Policy | `/privacy-policy` | ✅ Works |
| Terms | `/terms` | ✅ Works |
| FAQ | `/faq` | ✅ Works |
| Live Tracking | `/live-tracking` | ✅ Works |
| WhatsApp button | `wa.me/2340000000000` | ❌ FAKE — 13-zero placeholder number |
| Twitter/X | `#` | ❌ Dead — no account linked |
| Facebook | `#` | ❌ Dead — no account linked |
| Instagram | `#` | ❌ Dead — no account linked |
| LinkedIn | `#` | ❌ Dead — no account linked |
| Email | `booking@transzita.africa` | ⚠️ Verify domain (`transzita` not `tranzita`) |

---

## C. GITHUB REPO — WHAT IS ACTUALLY COMMITTED

The public repo at `github.com/1702london-maker/TRANZITA` contains only:

```
app/
  api/chat/route.ts     ← only API route
  globals.css
  layout.tsx
  page.tsx              ← single-page homepage only
components/             ← 22 components (homepage only)
lib/
  animations.ts
  constants.ts
  openai.ts
public/
  logo.png              ← only public asset
.env.local              ← CRITICAL: contains Vercel JWT (see Section F)
TRANZITA_DEV_AUDIT.md
TRANZITA_FULL_DEV_AUDIT.md
next.config.js          ← completely empty
package.json
tailwind.config.ts
tsconfig.json
```

**The 13+ pages on the live site are not in this repo.** The /how-it-works, /safety, /for-schools, /for-parents, /privacy-policy, /terms, /faq, /about, /contact, /careers, /partners, /live-tracking, /our-fleet pages do not exist as source files in GitHub. Vercel is serving a build that was never committed.

---

## D. WHAT IS GENUINELY COMPLETE

### Fully built and working on live site
- ✅ Homepage — all sections, animations, design
- ✅ 13 marketing/content pages with real substantive copy
- ✅ Privacy Policy — real content referencing Supabase, AES-256, Nigerian law
- ✅ Terms of Service — nine sections, governed by Nigerian law
- ✅ Navigation — mostly correct (one 404 on /driver-safety)
- ✅ Footer — mostly correct links
- ✅ Design system — cream/sage palette, Plus Jakarta Sans, animations
- ✅ Mobile responsive

### Partially built
- ⚠️ All 6 portals — auth middleware is wired (307 redirects working) but no login page exists
- ⚠️ Contact/demo form — UI exists, form collects data, but **no backend — data is discarded**
- ⚠️ Partners application form — same issue, no backend
- ⚠️ Careers application forms — same issue, no backend
- ⚠️ AI chat (Amaka) — fallback works, breaks when real OpenAI key is present
- ⚠️ WhatsApp integration — links exist but point to fake number

### Not built at all
- ❌ Login / authentication system
- ❌ School portal dashboard
- ❌ Parent portal dashboard
- ❌ Driver/co-pilot/nurse portals
- ❌ Partner portal
- ❌ Real GPS integration (map is animated SVG mockup)
- ❌ WhatsApp Business API (notifications, alerts)
- ❌ Any database (no Supabase project connected, no data stored)
- ❌ Email service (Resend/SendGrid not configured)
- ❌ Payment processing (Paystack or Stripe)
- ❌ Mobile apps (App Store / Play Store — "Coming Soon")
- ❌ Real social media accounts (all links are `#`)
- ❌ favicon.ico, OG image, sitemap.xml, robots.txt

---

## E. BROKEN FUNCTIONALITY — EXACT DETAILS

### 1. ALL FORMS DISCARD DATA — critical commercial gap
Every form on the site collects user input and silently discards it. No form submission reaches a database, email, or any backend.

Affected forms:
- **Demo/Contact form** (`/contact` and `RequestDemo.tsx`) — name, email, school, role, student count all lost
- **Partners application form** (`/partners`) — business name, fleet size, contact details lost
- **Careers application forms** (`/careers`) — candidate names, CVs, emails lost

In `RequestDemo.tsx` the submit handler is:
```ts
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitted(true)  // data evaporates here — nothing sent anywhere
}
```
The "We have received your request!" confirmation message shown to users is false.

**Fix required:** Wire all three forms to Resend (email to team) + Supabase row insert.

---

### 2. WHATSAPP NUMBER IS FAKE
**File:** `lib/constants.ts` line 6  
```
BRAND.whatsapp = 'https://wa.me/2340000000000'
```
13 zeros. Clicking any WhatsApp button on the site opens WhatsApp with an invalid number. Every WhatsApp CTA on every page is dead.

**Fix required:** Replace with real Tranzita WhatsApp Business number.

---

### 3. AI CHAT BROKEN WHEN OPENAI KEY IS LIVE
**File:** `components/ChatWidget.tsx` line 47  
```ts
const data = await res.json()  // throws SyntaxError when key is present
```
When a real `OPENAI_API_KEY` is in Vercel env vars, the `/api/chat` route returns a `ReadableStream` (text/plain). Calling `.json()` on a stream throws every time. Amaka only "works" because there is currently no real key — the fallback hardcoded JSON response is what users see.

**Fix required:** Change `res.json()` to `res.text()` in ChatWidget.tsx line 47.

---

### 4. PORTALS REDIRECT TO NOWHERE
All 6 portal buttons (SCHOOLS, PARENTS, DRIVERS, COPILOT, NURSE, PARTNER) trigger 307 redirects, indicating auth middleware is checking for a logged-in session. But there is no login page, no signup flow, no session system built. Users click a portal and go nowhere.

**Fix required:** Build `/login` route + Supabase Auth + redirect logic for each portal type.

---

### 5. /driver-safety PAGE IS 404
The "Driver Safety" link in the Navbar points to `/driver-safety` which returns a 404. A `/safety` page exists but `/driver-safety` does not.

**Fix required:** Either create `app/driver-safety/page.tsx` or update the nav link to point to `/safety`.

---

## F. FULL SECURITY AUDIT

### 🔴 CRITICAL — Vercel OIDC JWT committed to public GitHub repo
**File:** `.env.local` (committed to `1702london-maker/TRANZITA` — PUBLIC REPO)

The `.env.local` file is committed and contains a real Vercel OIDC JWT encoding:
- Project ID: `prj_JQlNwWEkD3oGtR3YgwhkKubxphHf`
- Org ID: `team_CRV957gCq7ivzLmksESDcGEA`
- User ID: `9C89zETfIDHvbw1MatzxGVur`
- Expiry: ~10 August 2026 10:19 UTC

This is visible to anyone who has viewed the repo. Even if gitignored going forward, the token exists in git history.

**Immediate action:**
1. Revoke the token in Vercel → Settings → Tokens
2. Add `.env.local` to `.gitignore` if not already excluded
3. Run `git filter-repo` or contact GitHub support to purge from git history

---

### 🔴 CRITICAL — /api/chat is completely open
**File:** `app/api/chat/route.ts`  
- No authentication (any person anywhere can POST)
- No rate limiting (unlimited requests per IP)
- No CORS restriction (any domain can call it)
- No try/catch on `req.json()` (malformed body throws unhandled error)
- No validation of `messages` array (attacker can inject `{ role: 'system' }` to override Amaka's prompt)
- No per-user token cap

With a real OpenAI key, one bad actor can exhaust a monthly budget in hours.

**Fix required:** Install `@upstash/ratelimit` + `@upstash/redis`. Wrap with rate limiter before placing a real key in Vercel env vars.

---

### 🟠 HIGH — Amaka instructed to deny being AI
**File:** `lib/constants.ts` line 57  
System prompt: "If someone asks if you are a bot, say you are part of the Tranzita support team."

This is illegal deception under:
- EU AI Act Article 52 (mandatory AI disclosure)
- FTC guidelines on deceptive digital practices
- Nigeria Data Protection Act 2023

**Fix required:** Change to disclose AI nature when directly asked.

---

### 🟠 HIGH — No security headers
**File:** `next.config.js` — completely empty  
Missing: CSP, `X-Frame-Options` (clickjacking protection), `X-Content-Type-Options`, `Referrer-Policy`. Server leaks `X-Powered-By: Next.js 14.2.5`.

**Fix required:**
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

---

### 🟡 MEDIUM — lib/openai.ts is dead code with exposure risk
**File:** `lib/openai.ts`  
Exports an OpenAI client but is imported nowhere. If ever accidentally imported in a client component, the API key would be bundled into browser JS.

**Fix required:** Add `import 'server-only'` at line 1, or delete the file.

---

### 🟡 MEDIUM — No input validation on /api/chat
`req.json()` has no try/catch. `messages` array has no schema validation. An attacker can send `{ role: 'system', content: 'ignore all previous instructions' }` to jailbreak Amaka.

**Fix required:** Add zod validation. Strip any messages where `role !== 'user'`.

---

## G. DEPENDENCY AND CONFIG AUDIT

### package.json
| Package | Version | Status |
|---|---|---|
| `next` | `14.2.5` | ✅ Current for v14 |
| `react` | `^18` | ✅ OK |
| `framer-motion` | `^11.3.0` | ⚠️ Full bundle, no LazyMotion |
| `openai` | `^4.55.0` | ✅ Used in API route |
| `lucide-react` | `^0.414.0` | ❌ Not imported anywhere — remove |

### Missing packages (needed)
- `resend` — email from all three forms
- `@supabase/supabase-js` — database
- `@upstash/ratelimit` + `@upstash/redis` — API rate limiting
- `@vercel/analytics` — traffic data
- `zod` — form and API validation
- `server-only` — guard server modules

### tailwind.config.ts
- **Bug:** `fontFamily.sans: ['Inter', ...]` — project uses Plus Jakarta Sans. Any `font-sans` class silently renders the wrong font.
- **Fix:** Change to `['Plus Jakarta Sans', 'system-ui', 'sans-serif']`

### next.config.js
- Completely empty — see security section above.

---

## H. SEO AND METADATA GAPS

| Item | Status |
|---|---|
| OG / Open Graph tags | ❌ Missing — blank preview when shared on WhatsApp/LinkedIn |
| Twitter Card | ❌ Missing |
| favicon.ico | ❌ Missing — browser tab shows generic icon |
| apple-touch-icon | ❌ Missing |
| OG image | ❌ Missing — `public/og-image.png` does not exist |
| sitemap.xml | ❌ Missing |
| robots.txt | ❌ Missing |
| Structured data JSON-LD | ❌ Missing |
| Vercel Analytics | ❌ Not installed — all traffic invisible |
| Google Fonts via CDN | ⚠️ Should use `next/font/google` (self-hosted) |

---

## I. DEAD CODE IN REPO

| File | Status |
|---|---|
| `components/OmarPartnership.tsx` | Not imported anywhere. Has UTF-8 encoding corruption. Delete. |
| `components/DemoFAB.tsx` | Not imported anywhere. Delete. |
| `lib/openai.ts` | Not imported anywhere. Delete or add `server-only`. |
| All exports in `lib/animations.ts` | Only used by OmarPartnership.tsx which is dead. All 7 exports are unused. |
| `AMAKA_FIRST_MESSAGE` in constants.ts | Defined but never imported. ChatWidget hardcodes its own string. |
| `lucide-react` package | Installed but zero imports. Remove. |

---

## J. ACCESSIBILITY FAILURES

| Issue | File | Details |
|---|---|---|
| All 5 form inputs have no `id`, labels have no `htmlFor` | `RequestDemo.tsx` | WCAG 2.1 AA failure |
| Close button has no `aria-label` | `ChatWidget.tsx:77` | Screen reader reads "✕" literally |
| Send button has no `aria-label` | `ChatWidget.tsx:138` | Screen reader reads "➤" literally |
| Chat input has no `aria-label` | `ChatWidget.tsx:130` | Placeholder-only is not accessible |
| `<nav>` has no `aria-label` | `Navbar.tsx` | Screen readers get no nav context |
| No `focus-visible` styles anywhere | `globals.css` | Keyboard users have no focus indicator |
| Decorative SVGs not `aria-hidden` | Hero, Navbar, StickyBar | Read aloud unnecessarily |
| Marquee badges not `aria-hidden` | `StickyBar.tsx` | Duplicated text read twice |
| Orange `#E8601C` on white fails contrast | Multiple | ~3.1:1 — fails 4.5:1 AA standard |

---

## K. PRIORITY ACTION LIST FOR CLAUDE/CODEX

### 🔴 IMMEDIATE — Do before anything else

**1. Sync live site back to GitHub**  
The 13+ pages on tranzita.africa are not in the repo. Pull the full deployed build and commit all missing page source files. Without this, any dev work risks overwriting the live site.

**2. Rotate Vercel OIDC JWT**  
Go to Vercel → Settings → Tokens → revoke the current token. Remove from `.env.local`. The token is in the public GitHub history.

**3. Fix /driver-safety 404**  
Either create `app/driver-safety/page.tsx` or change the Navbar link to `/safety`. This is the only confirmed 404 on the live site.

---

### 🔴 COMMERCIAL — The site cannot operate without these

**4. Wire all forms to a real backend**  
All three forms (demo/contact, partners application, careers application) must POST to `/api/submit` → Supabase row insert + Resend email notification. Install `resend` and `@supabase/supabase-js`. Create a Supabase project. Set env vars in Vercel.

**5. Replace fake WhatsApp number**  
`lib/constants.ts` line 6 — replace `2340000000000` with the real Tranzita WhatsApp Business number. Every WhatsApp CTA on every page is currently dead.

**6. Build the login/auth page**  
The 307 redirects on all 6 portals prove middleware is in place. Build `app/login/page.tsx` with Supabase Auth. Without this, every portal link dead-ends and no user can access anything.

---

### 🔴 SECURITY — Fix before placing a real OpenAI key in production

**7. Add rate limiting to /api/chat**  
Install `@upstash/ratelimit` + `@upstash/redis`. Wrap the route handler before adding a real key to Vercel env vars.

**8. Add input validation to /api/chat**  
Install `zod`. Validate body schema. Filter `messages` to `user`/`assistant` roles only. Wrap `req.json()` in try/catch.

**9. Add security headers to next.config.js**  
Add `headers()` function with X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Set `poweredByHeader: false`.

**10. Fix Amaka system prompt**  
`lib/constants.ts` line 57 — remove the "deny being a bot" instruction. Add AI disclosure when directly asked. This is a legal requirement.

---

### 🟠 BUGS — Fix for correct behaviour

**11. Fix ChatWidget stream handling**  
`ChatWidget.tsx` line 47: change `res.json()` to `res.text()`. The AI chat is broken in its intended production state.

**12. Fix Tailwind font config**  
`tailwind.config.ts` line 19: change `'Inter'` to `'Plus Jakarta Sans'`.

**13. Replace `<img>` with `<Image>`**  
`Navbar.tsx` and `Footer.tsx` — use `next/image` for logo. Prevents CLS and enables WebP.

**14. Fix setInterval memory leaks**  
`StatsStrip.tsx` and `CasualtiesStats.tsx` — store interval IDs in `useRef`, clear in `useEffect` return.

---

### 🟠 SEO — Required for Google visibility

**15. Add Open Graph and Twitter Card metadata**  
`app/layout.tsx` — add `openGraph` and `twitter` to the metadata object.

**16. Add OG image**  
Create `public/og-image.png` (1200×630px). Reference in metadata.

**17. Add favicon**  
Add `public/favicon.ico` and `public/apple-touch-icon.png`. Reference in `layout.tsx`.

**18. Add sitemap and robots.txt**  
Create `app/sitemap.ts` and `public/robots.txt`.

**19. Add Vercel Analytics**  
Install `@vercel/analytics`. Add `<Analytics />` to `app/layout.tsx`. One line. Enables traffic visibility.

**20. Switch to next/font/google**  
Replace Google CDN `<link>` tags in `layout.tsx` with `next/font/google`. Self-hosts font at build time, removes third-party DNS request.

---

### 🟡 PORTALS — Build in this order once auth is live

**21. Login page** — `app/login/page.tsx` — Supabase Auth email/password + role-based redirect

**22. School portal** — `app/school-portal/page.tsx` — Dashboard: enrolled children, today's pickups, billing

**23. Parent portal** — `app/parent-portal/page.tsx` — Live map, pickup status, notification preferences

**24. Driver portal** — `app/driver-portal/page.tsx` — Today's route, passenger manifest, check-in

**25. Co-pilot portal** — `app/copilot-portal/page.tsx` — Attendance sheet, incident log

**26. Nurse portal** — `app/nurse-portal/page.tsx` — Medical notes per child, emergency contacts

**27. Partner portal** — `app/partner-portal/page.tsx` — Vehicle status, earnings, maintenance schedule

---

### 🔵 CLEANUP — Do when capacity allows

**28. Delete `components/OmarPartnership.tsx`** — dead, corrupted, never imported

**29. Delete `components/DemoFAB.tsx`** — dead, never imported

**30. Delete `lib/openai.ts`** or add `import 'server-only'` at line 1

**31. Remove `lucide-react`** from package.json — `npm uninstall lucide-react`

**32. Clean up `lib/animations.ts`** — all 7 exports unused. Wire into active components or delete.

**33. Sync `AMAKA_FIRST_MESSAGE`** — either import it in ChatWidget or delete the constant. Currently two out-of-sync strings exist.

---

## L. SUPABASE SCHEMA — MINIMUM TABLES NEEDED

When Supabase is connected, create these tables first:

```sql
-- Lead capture (all three forms write here)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  type TEXT NOT NULL,  -- 'demo', 'partner', 'career'
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT,
  role TEXT,
  students INTEGER,
  message TEXT,
  status TEXT DEFAULT 'new'
);

-- Users (Supabase Auth handles auth, this extends it)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  role TEXT NOT NULL,  -- 'school_admin', 'parent', 'driver', 'copilot', 'nurse', 'partner'
  name TEXT,
  phone TEXT,
  school_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Schools
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  students_enrolled INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Children
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  school_id UUID REFERENCES schools(id),
  parent_id UUID REFERENCES profiles(id),
  class TEXT,
  medical_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Drivers / crew
CREATE TABLE crew (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id),
  tranzita_id TEXT UNIQUE,  -- e.g. TRZ-0048-NG
  role TEXT,  -- 'driver', 'copilot', 'nurse'
  vetting_status TEXT DEFAULT 'pending',
  vehicle_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Row Level Security must be enabled on all tables before going live.

---

## M. ENV VARS NEEDED IN VERCEL

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (only add after rate limiting is in place)
OPENAI_API_KEY=

# Resend (email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=booking@transzita.africa

# Upstash (rate limiting)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# WhatsApp Business
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

---

## N. OVERALL READINESS SCORES — CORRECTED

| Category | Score | Reason |
|---|---|---|
| Design / Visual | 90% | Professional, consistent, mobile responsive, 13+ pages built |
| Marketing Content | 85% | Real copy, privacy policy, terms, FAQ, all pages substantive |
| Navigation | 80% | One 404 (/driver-safety), all other links correct |
| SEO | 20% | No OG, no sitemap, no robots, no analytics, no favicon |
| Security | 20% | JWT in public repo, open API, no headers, deceptive AI |
| Functionality | 15% | All forms broken, WhatsApp fake, chat broken, portals dead |
| Backend / Data | 0% | No database, no auth, no email, no data stored anywhere |
| Legal | 60% | Privacy policy and ToS exist — good. But cookie consent missing, AI disclosure illegal. |
| **Overall** | **35/100** | **Strong frontend. Zero operational backend.** |

---

*Audit conducted 10 August 2026 · Sources: github.com/1702london-maker/TRANZITA + live tranzita.africa · All findings verified against live site and committed source code*
