# Vantage Risk Advisors — Project & Communications Handoff

> **Document purpose.** This is the single comprehensive reference for the
> Vantage Risk Advisors (VRA) marketing website AND the surrounding business
> communications stack (phone system, AI receptionist, Google Workspace,
> Wix business listing). It is written for a developer, consultant, or future
> version of the owner picking the project up cold with zero prior context.
>
> **Owner / primary stakeholder:** Vipul / Vantage Risk Advisors
> **Primary contact email (business):** info@vantageriskadvisors.com
> **Business phone:** +1 (972) 360-9272
> **Live website URL:** https://www.vantageriskadvisors.com
> **Source repository:** https://github.com/MadSwami47/vra-website
> **Last updated:** 2026-05-26

---

## Table of contents

- [Part 1 — Website technical audit](#part-1--website-technical-audit)
  - [1.1 Project location](#11-project-location-on-disk)
  - [1.2 Full file structure](#12-full-file-structure)
  - [1.3 Tech stack](#13-tech-stack--framework)
  - [1.4 Dependencies](#14-dependencies)
  - [1.5 Build process](#15-build-process)
  - [1.6 Deployment](#16-how-the-site-is-deployed)
  - [1.7 Existing contact info in code](#17-existing-contact-info-ctas-and-forms-in-code)
  - [1.8 Phone CTA placement](#18-where-the-phone-number--click-to-call-button-lives)
  - [1.9 Environment variables / API keys](#19-environment-variables--api-keys-referenced)
  - [1.10 Third-party scripts / integrations](#110-third-party-scripts-tracking-codes-and-integrations)
- [Part 2 — Business communication stack](#part-2--business-communication-stack)
  - [2.1 Quo phone system](#21-quo-phone-system-formerly-openphone)
  - [2.2 Call flows](#22-call-flows-saved-in-quo)
  - [2.3 Sona AI agent](#23-sona-ai-agent)
  - [2.4 Google Workspace integration](#24-google-workspace-integration)
  - [2.5 Wix Business Info](#25-wix-business-info-listing-not-the-website)
- [Part 3 — Outstanding items & next steps](#part-3--outstanding-items-and-recommended-next-steps)
- [Part 4 — How to make common changes](#part-4--how-to-make-common-changes)
- [Appendix — Quick file reference](#appendix--quick-file-reference)

---

# Part 1 — Website technical audit

## 1.1 Project location on disk

```
C:\Users\vipul\OneDrive\Desktop\vra-project\site\
```

> ⚠️ The Desktop is being synced by OneDrive, so the canonical path is under
> `OneDrive\Desktop\`, NOT `\Desktop\`. If you ever see the project
> "missing" at `C:\Users\vipul\Desktop\vra-project\` it has not vanished — it
> just lives under OneDrive. Open File Explorer and look for the OneDrive icon
> in the sidebar.

## 1.2 Full file structure

```
site/
│
├── .git/                            Git repository (binary, do not edit)
├── .gitignore                       Excludes OS junk (.DS_Store, Thumbs.db, etc.)
├── CNAME                            "www.vantageriskadvisors.com" — picked up
│                                    by GitHub Pages to enable the custom
│                                    domain. Do not delete.
├── README.md                        Short project overview + quick local-preview
│                                    commands.
├── NOTES.md                         Build-time interpretation notes, placeholder
│                                    content log, DNS records, future-work list.
├── HANDOFF.md                       ← THIS FILE
│
├── quote-form-snippet.html          Canonical source-of-truth for the quote
│                                    form markup. Pasted (copy of the same
│                                    markup) into every host page. Always edit
│                                    THIS file first and propagate changes.
│
│  ───  Page files (one per route)  ───
│
├── index.html                       Home page
├── about.html                       About / mission / values
├── contact.html                     Contact page (hero + form)
├── healthcare.html                  Healthcare vertical
├── hospitality.html                 Hospitality vertical
├── multifamily.html                 Multifamily & HOA vertical
├── business.html                    Business insurance vertical
│
│  ───  Assets  ───
│
├── assets/
│   ├── favicon.svg                  Browser tab icon
│   ├── logo-v.png                   "V" brand mark (used in nav + footer of
│   │                                every page on dark navy background)
│   ├── logo-dark.svg                Legacy programmatic wordmark — UNUSED
│   ├── logo-white.svg               Legacy programmatic wordmark — UNUSED
│   ├── hero-home.avif               Hero image, home page
│   ├── hero-healthcare.avif         Hero image, healthcare page
│   ├── hero-hospitality.avif        Hero image, hospitality page
│   ├── hero-multifamily.avif        Hero image, multifamily page
│   ├── hero-business.avif           Hero image, business page
│   └── hero-about.avif              Hero image, about page
│
│  ───  Stylesheets  ───
│
├── css/
│   ├── tokens.css                   Design-system CSS custom properties
│   │                                (colors, spacing, type scale, radii)
│   ├── base.css                     CSS reset, typography classes, shared
│   │                                buttons + pills + section helpers
│   ├── nav.css                      Sticky top nav, brand block, Coverage
│   │                                hover dropdown, secondary breadcrumb
│   ├── footer.css                   4-column footer (Brand / Contact /
│   │                                Navigation / Coverage)
│   ├── quote-form.css               Canonical quote form styling (adapts to
│   │                                dark vs light wrapper via CSS variables)
│   └── pages/
│       ├── home.css                 Home-page-only sections
│       ├── about.css                About-page-only sections
│       ├── contact.css              Contact-page-only sections
│       ├── vertical.css             Shared by all 4 industry pages
│       ├── healthcare.css           Thin per-vertical overrides (mostly empty)
│       ├── hospitality.css          Thin per-vertical overrides (mostly empty)
│       ├── multifamily.css          Thin per-vertical overrides (mostly empty)
│       └── business.css             Thin per-vertical overrides (mostly empty)
│
│  ───  JavaScript  ───
│
└── js/
    ├── nav.js                       Scroll shadow on nav, mobile burger
    │                                toggle, hover-intent dropdown logic
    └── quote-form.js                Form validation + cascading specialty
                                     dropdown + Make.com webhook POST
                                     submission. Single source of truth for
                                     form behavior.
```

### Files NOT present (notably absent)

| Looked for | Found? | Means |
|---|:---:|---|
| `package.json` / `package-lock.json` | ❌ | No Node dependencies |
| `node_modules/` | ❌ | No installed packages |
| `vite.config.*` / `next.config.*` / `nuxt.config.*` / `webpack.config.*` / `astro.config.*` | ❌ | No build framework |
| `wix.config.*` / `.wixrc` / `wix-style.json` | ❌ | NOT a Wix project |
| `.github/workflows/` | ❌ | No CI |
| `netlify.toml` / `vercel.json` / `_redirects` | ❌ | No Netlify/Vercel |
| `Dockerfile` / `docker-compose.yml` | ❌ | No containers |
| `.env` / `.env.example` | ❌ | No environment variables |

## 1.3 Tech stack / framework

| Layer | Choice |
|---|---|
| Markup | Plain HTML5 (no templating, no JSX, no Liquid, no Nunjucks) |
| Styling | Plain CSS (no Sass, no Tailwind, no CSS-in-JS) using CSS custom properties for design tokens |
| JavaScript | Vanilla JavaScript (no framework, no transpilation, no bundler) |
| Fonts | Three Google Fonts loaded via CDN `<link>` in each page head: Bricolage Grotesque, Hanken Grotesk, JetBrains Mono |
| Image format | AVIF (modern, well-compressed) for hero photos; SVG for icons + logos; PNG for the V brand mark |

**There is no framework, no build step, and no Wix involvement.** The HTML
files in this repo ARE the deployed artifacts.

## 1.4 Dependencies

| Type | Status |
|---|---|
| Runtime npm packages | None |
| Dev dependencies | None |
| CDN imports (in every page head) | Three Google Fonts stylesheets from `fonts.googleapis.com` |
| Other external requests at runtime | One POST to `https://hook.us2.make.com/<id>` when the quote form is submitted (see § 1.10) |

There is **no dependency manifest to install**. If you clone the repo to a
new machine you can serve `index.html` immediately.

## 1.5 Build process

There is no build step. Files are deployed as-is. To preview locally:

```bash
# from the project root:
python -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser by double-clicking it. Or use
VS Code's "Live Server" extension.

## 1.6 How the site is deployed

**Hosting:** GitHub Pages.
**Repo:** `https://github.com/MadSwami47/vra-website` (branch `main`)
**Custom domain:** `www.vantageriskadvisors.com`
**DNS:** A records + CNAME at the registrar point to GitHub Pages IPs (see
`NOTES.md` for the exact records).
**Build pipeline:** none. GitHub Pages serves the contents of `main` directly.

**The deploy command is `git push origin main`.** When that push completes,
GitHub Pages rebuilds the static site within ~30–60 seconds and serves the
new commit at `www.vantageriskadvisors.com`.

Three-command publish loop from the project root:

```bash
git add -A
git commit -m "describe your change"
git push origin main
```

> ⚠️ The owner's prompt sometimes references "Wix" as the host. **This is
> historical / shorthand.** The actual live website is on GitHub Pages.
> There is a separate Wix Business Info listing (see § 2.5) for SEO, but
> the website itself is NOT a Wix site. Do not log into Wix and try to edit
> page layouts there — those edits will not affect the live site.

## 1.7 Existing contact info, CTAs, and forms in code

The live business phone (972-360-9272) and email (info@vantageriskadvisors.com)
appear in the following exact locations:

### Phone number occurrences

Phone is `tel:+19723609272` (click-to-call href) with display text
`+1 (972) 360-9272`. All seven HTML pages contain it in the same two
places (nav + footer); the contact page and vertical pages have additional
instances:

| File | Line | Context |
|---|---:|---|
| `index.html`        |  63 | Top nav, right side ("nav-phone" link) |
| `index.html`        | 439 | Footer, "Contact" column |
| `about.html`        |  61 | Top nav |
| `about.html`        | 193 | Footer, "Contact" column |
| `contact.html`      |  62 | Top nav |
| `contact.html`      |  91 | "PHONE" labeled block in hero (`.contact-block`) |
| `contact.html`      | 217 | Footer, "Contact" column |
| `healthcare.html`   |  62 | Top nav |
| `healthcare.html`   | 158 | Dark quote panel, "Or reach us directly" |
| `healthcare.html`   | 296 | Footer, "Contact" column |
| `hospitality.html`  |  62 | Top nav |
| `hospitality.html`  | 157 | Dark quote panel |
| `hospitality.html`  | 295 | Footer |
| `multifamily.html`  |  62 | Top nav |
| `multifamily.html`  | 157 | Dark quote panel |
| `multifamily.html`  | 295 | Footer |
| `business.html`     |  62 | Top nav |
| `business.html`     | 157 | Dark quote panel |
| `business.html`     | 295 | Footer |

### Email address occurrences

Email is `info@vantageriskadvisors.com` as both `mailto:` href and visible
text. Appears in the footer Contact column of every page. Contact page also
has an extra dedicated "EMAIL" block in the hero.

| File | Line | Context |
|---|---:|---|
| Every HTML page footer Contact column | (varies) | `<li><a href="mailto:info@vantageriskadvisors.com">…</a></li>` |
| `contact.html` | 86 | "EMAIL" labeled block in hero |

### Forms

One canonical form, embedded on six pages:

| File | Form location |
|---|---|
| `index.html`        | "Know what you need? Tell us." intake section |
| `contact.html`      | Hero right column (dark navy panel) |
| `healthcare.html`   | "Request a healthcare quote" right column |
| `hospitality.html`  | "Request a hospitality quote" right column |
| `multifamily.html`  | "Request a multifamily quote" right column |
| `business.html`     | "Request a business quote" right column |
| `about.html`        | (no form on this page) |

The form contains 12 fields (6 required, 6 optional incl. cascading
specialty dropdowns). See `quote-form-snippet.html` for the canonical
markup definition and `js/quote-form.js` for the field validation rules and
submission behavior.

## 1.8 Where the phone number / click-to-call button lives

The phone number is **already present** as a click-to-call link on every
page. Two of those instances are buttons / CTAs:

1. **Top-right of the nav bar, every page.** Renders as muted-white text
   "+1 (972) 360-9272" with a blue accent "Get a quote" button immediately
   to its right. Tapping the phone number on mobile initiates a dial.

2. **Hero of contact page, line 91.** Renders as a large accent-blue link
   inside a labeled "PHONE" block, sitting under the "Let's talk." headline
   and just below the email block. Same click-to-call behavior.

3. **Dark quote panel on the four vertical pages.** Appears under the
   "Or reach us directly" eyebrow in the left column of the quote section,
   line 157 of each vertical page.

4. **Footer of every page, Contact column.** Plain link in the contact list.

### If you want to add a MORE prominent CTA button (e.g. a "Call us" button)

The phone is currently a plain link in the nav, not a styled button. To
add a styled button:

- File to edit: every host page (or pick one for a targeted CTA).
- Markup pattern to add:
  ```html
  <a href="tel:+19723609272" class="btn btn-accent">
    Call (972) 360-9272
  </a>
  ```
- Where it makes sense: hero of `contact.html` (next to the form panel),
  or as a second button in each industry-page hero alongside "Get a healthcare
  quote → / See what's included".
- See § 4.1 for the step-by-step.

## 1.9 Environment variables / API keys referenced

There is no `.env` file. The site has **one** externally-callable URL
embedded directly in the JavaScript:

| Variable name | Where | Purpose |
|---|---|---|
| `WEBHOOK_URL` (constant, not env-var) | `js/quote-form.js`, line 22 | Make.com webhook endpoint that the quote form POSTs to on submission |

Because the site is plain static HTML, any "secret" embedded in the JS is
visible to anyone viewing source. The Make.com webhook URL is treated as
a write-only sink (its security model relies on Make.com's scenario logic,
not URL secrecy).

## 1.10 Third-party scripts, tracking codes, and integrations

| Integration | Where | Notes |
|---|---|---|
| **Google Fonts** | `<link>` in `<head>` of every page | Loads Bricolage Grotesque + Hanken Grotesk + JetBrains Mono from `fonts.googleapis.com` |
| **Make.com webhook** | `js/quote-form.js` line 22 | URL: `https://hook.us2.make.com/bppb1fxjmgrxlpv75sul7nv9ryf0ela1`. Receives a 12-key JSON payload (one key per canonical form field). Network errors in the submit show an inline error banner; success hides the form and shows a confirmation panel. |
| ❌ Google Analytics | — | Not installed |
| ❌ Google Tag Manager | — | Not installed |
| ❌ Meta Pixel / LinkedIn Insight / etc. | — | Not installed |
| ❌ Hotjar / FullStory / session replay | — | Not installed |
| ❌ Live chat (Intercom / Drift / etc.) | — | Not installed |
| ❌ Cookie consent banner | — | Not installed |

If you add analytics or tracking later, the place to add the snippet is the
`<head>` block of every page (it must be repeated since there is no shared
layout template).

---

# Part 2 — Business communication stack

This section captures the phone / AI / Google / Wix configuration. None of
it lives in the codebase — it is configured in third-party dashboards.

## 2.1 Quo phone system (formerly OpenPhone)

| Setting | Value |
|---|---|
| Business phone number | **+1 (972) 360-9272** |
| Platform | Quo Business Plan (formerly OpenPhone — rebranded) |
| Account owner | vipul@vantageriskadvisors.com |
| Auto call recording | **ON** for both inbound and outbound |
| Call recording notification (announcement to caller) | **OFF** — see § 3.4 compliance flag |
| Business hours | Monday – Friday, **9:00 AM – 6:00 PM Central Time** |
| Out-of-hours behavior | (Configured per call flow — see § 2.2) |

## 2.2 Call flows saved in Quo

Two call flows are configured. Only one is Live at a time; the other sits
saved as a backup that can be activated via the call-flow builder
dropdown.

| Call flow name | Status | What it does |
|---|---|---|
| **Forward all calls** | **🟢 Live** | Routes every inbound call to **(214) 641-6843** (owner's mobile). |
| **Sona call flow** | ⚪ Inactive | When Live, routes inbound calls to the Sona AI receptionist (see § 2.3) for prospect intake and voicemail capture. |

To swap which one is Live: open Quo → Call Flows → click the flow you want
to activate → toggle the status.

## 2.3 Sona AI agent

Sona is the AI receptionist that handles missed calls and captures prospect
intake when the Sona call flow is Live.

| Setting | Value |
|---|---|
| Status | Configured and saved, currently **Inactive** (because Forward-all-calls is Live) |
| Voice | (Per Quo / Sona settings) |
| Greeting character limit | **500 characters max** (greeting only) |

### Voicemail greeting (used when Sona is OFF and call goes to standard voicemail)

> "You've reached Vantage Risk Advisors. We're unavailable at the moment
> but will get back to you shortly. Please leave your name, number, and a
> brief message and we'll follow up as soon as possible. Thank you."

### Sona AI greeting (active opening, ≤500 chars — set inside Sona's greeting field)

> "Thank you for calling Vantage Risk Advisors. You've reached our virtual
> assistant. We're either on another call or unavailable at the moment, but
> we don't want to miss you. Just a few quick questions so we can get back
> to you promptly."

### Sona Lead Qualification job (full intake script — runs after greeting)

The complete intake script exceeded Sona's 500-character greeting limit,
so it was split. The opening above is set as the greeting; the remainder
is configured as a Sona "Lead Qualification" job that runs automatically
once the caller stays on the line:

> "Can I get your full name? Best phone number and email address to reach
> you? And the name of your business? Are you looking for a new policy, a
> second opinion on existing coverage, or do you have an urgent matter that
> needs immediate assistance? Perfect. Someone from Vantage Risk Advisors
> will follow up with you shortly. Thank you for reaching out — we look
> forward to working with you."

### Captured intake fields (collected and saved as Sona transcript)

1. Full name
2. Best phone number
3. Best email address
4. Business name
5. Inquiry type — **new policy** / **second opinion on existing coverage** /
   **urgent matter**

## 2.4 Google Workspace integration

| Setting | Value |
|---|---|
| Connected Google account | vipul@vantageriskadvisors.com |
| Integration type | Google Contacts synced into Quo via OAuth |
| Sync direction | **Read-only** (Google → Quo). Quo can see Google Contacts; Google does not see Quo data. |
| Call logs in Google | **Not** pushed back to Google Workspace. Call history lives inside Quo only. |
| Two-way sync option | Would require a CRM bridge (Zapier, HubSpot, etc.). Not configured today. |

## 2.5 Wix Business Info listing (NOT the website)

This is an external listing, **not the website hosting**. The website is
hosted on GitHub Pages (see § 1.6).

| Setting | Value |
|---|---|
| Wix → Settings → Business Info → Phone | **+1 (972) 360-9272** |
| What it powers | Wix's SEO metadata helpers, Wix Invoices business profile, and any Wix business-listing widgets the owner has enabled |
| What it does NOT power | The website `www.vantageriskadvisors.com`. That is served by GitHub Pages from the `main` branch of this repo. |

> 📝 **Important note.** The Wix Business Info phone number is a separate
> field that is purely metadata for Wix's own widgets and exports. Updating
> it here does NOT update the website. Changes to the website still require
> a code edit + `git push origin main`.

---

# Part 3 — Outstanding items and recommended next steps

## 3.1 Fully complete and live

- ✅ Seven HTML pages built and live (Home, About, Contact, Healthcare,
  Hospitality, Multifamily, Business)
- ✅ Site deployed to GitHub Pages with custom domain
  `www.vantageriskadvisors.com`
- ✅ Canonical quote form on six pages (all except About) — 12 fields with
  cascading specialty dropdowns, client-side validation, success/error UI
- ✅ Quote form submits to Make.com webhook (`hook.us2.make.com/bppb…`)
- ✅ Phone number (+1 972-360-9272) and email
  (info@vantageriskadvisors.com) wired into nav + footer + contact hero +
  vertical-page quote panels — **all 25+ click-to-call and mailto: links
  use the live values**
- ✅ Coverage dropdown nav with hover-intent and four industry items
- ✅ Hero photo on all 6 content pages, uniform layout
- ✅ Brand mark: real V logo image (`assets/logo-v.png`) in nav + footer
- ✅ Quo phone system live with auto-recording on and "Forward all calls"
  flow routing to (214) 641-6843
- ✅ Wix Business Info phone number updated to (972) 360-9272

## 3.2 Partially complete

- 🟡 **Quote form backend.** Front-end is wired to a Make.com webhook.
  Make.com scenario itself (downstream routing to NowCerts/Momentum AMS,
  Google Workspace, etc.) needs to be configured inside Make.com — the
  webhook is being received but the downstream actions are owner-managed
  outside this repo.
- 🟡 **Sona call flow.** Configured and saved but Inactive. Currently
  "Forward all calls" is Live; flip Sona on when ready.
- 🟡 **Phone CTA prominence.** The phone number appears as a small link in
  the nav. There is no oversized "Call us now" button on the home or contact
  page hero. Owner has flagged this as outstanding — see § 4.1 for how to
  add one.

## 3.3 Still pending

- ⏳ Move from Make.com webhook to direct NowCerts / Momentum AMS push
  (planned integration phase).
- ⏳ Sync call logs from Quo back to Google Workspace (would need a CRM
  middleware — HubSpot or Zapier).
- ⏳ Privacy Policy and Terms pages — footer links currently point to `#`.
- ⏳ Replace remaining placeholder content:
  - Office street address (currently shows only "Texas · Serving
    nationally" in NOTES.md placeholder log).
  - Team headshots (currently initials avatars).
  - License number on copyright line (currently shows
    "CA License #00000000").
- ⏳ Add analytics + cookie banner if the owner wants attribution data and
  GDPR/CCPA-style consent.

## 3.4 Compliance / legal flags

- ⚠️ **Call-recording disclosure.** Auto call recording is ON, but the
  "call recording notification" announcement in Quo is currently OFF.
  Several states (California, Florida, Illinois, Maryland, Massachusetts,
  Montana, Nevada, New Hampshire, Pennsylvania, Washington, Connecticut,
  and others) are **two-party consent** jurisdictions. Recording an inbound
  call from a caller in one of those states without their consent is a
  potential statutory violation. Recommend: turn the announcement ON inside
  Quo, OR adopt a written policy that recording only proceeds after the
  caller is verbally informed.
- ⚠️ **Insurance license number** on the footer copyright line currently
  reads "CA License #00000000" (placeholder). Replace with the actual
  state(s) and license number(s) before public launch in regulated states.
- ⚠️ **Privacy Policy / Terms** pages do not yet exist. Footer links point
  to `#`. If you collect form submissions from California / EU residents,
  a privacy policy is effectively mandatory.

## 3.5 Recommended future integrations

| Integration | Why | How |
|---|---|---|
| **NowCerts / Momentum AMS** direct ingestion | Quote form leads land directly in the agency management system as an Account + Contact + Note. | Configure inside the existing Make.com scenario — receive the webhook payload, transform the 12 canonical fields into NowCerts API payload shape, POST to NowCerts. |
| **Google Workspace push** (Sheets log + Gmail notification) | Owner gets an email per lead and a running spreadsheet of submissions. | Same Make.com scenario can branch: NowCerts (primary) → Google Sheets append → Gmail "new lead" email. |
| **HubSpot or Zapier** as the long-term integration spine | Replace the single-purpose Make.com webhook with a real CRM that handles pipeline, attribution, and two-way contact sync with Quo. | Owner-led decision — both vendors offer Quo (OpenPhone) connectors. |
| **Google Analytics 4 + Google Tag Manager** | Conversion tracking, source attribution, and ad ROI measurement once paid acquisition starts. | Add the GTM snippet to the `<head>` of every page. |
| **Privacy / cookie banner** (CookieYes, Termly, etc.) | Cover GDPR / CCPA disclosure obligations. | Drop their script tag into every page `<head>`. |

---

# Part 4 — How to make common changes

## 4.1 How to add or update the phone number on the website

### Updating the phone number

The phone appears in two formats:
- **Click-to-call href** — `tel:+19723609272` (digits only, with leading +1)
- **Display text** — `+1 (972) 360-9272`

To swap both, do a two-pass find-and-replace in every HTML file. From the
project root in a terminal:

```bash
# pass 1 — update click-to-call hrefs
grep -rl "tel:+19723609272" *.html | xargs sed -i 's|tel:+19723609272|tel:+1NEWNUMBER|g'

# pass 2 — update display text
grep -rl "+1 (972) 360-9272" *.html | xargs sed -i 's|+1 (972) 360-9272|+1 (NEW) NUM-BER|g'
```

…where `NEWNUMBER` is the new 10-digit number with leading 1. Then commit
+ push (see § 4.5).

Alternatively, open each HTML file in VS Code and use the global
Find-and-Replace (Ctrl+Shift+H) to do the same two passes across the whole
project.

### Adding a NEW phone-CTA button somewhere

To add a styled, prominent "Call (972) 360-9272" button anywhere on the
site, insert this markup at the desired spot:

```html
<a href="tel:+19723609272" class="btn btn-accent">
  Call (972) 360-9272
</a>
```

Place it inside a `.hero-buttons` div (so it sits next to existing buttons)
or freestanding within any hero / section. The `btn btn-accent` class
already exists in `css/base.css` and renders as an accent-blue button
matching the rest of the site.

## 4.2 How to switch between "Forward all calls" and "Sona call flow" in Quo

1. Log in at https://app.quo.com (or however Quo's web app is currently
   branded) using `vipul@vantageriskadvisors.com`.
2. Click **Settings → Phone Numbers** → the +1 (972) 360-9272 line.
3. Click **Call Flow** (or **Calling** → **Call Flow Builder**).
4. In the call-flow dropdown at the top, you will see two saved flows:
   - "Forward all calls" — routes to (214) 641-6843
   - "Sona call flow" — routes to the AI receptionist
5. Toggle the one you want Live to **Active**. The other will automatically
   move to Inactive.
6. Make a test call to (972) 360-9272 from a different number to confirm
   the new behavior.

## 4.3 How to update the Sona AI script

1. Log in to Quo → **Sona** (or **Settings → AI Agent**, depending on the
   current Quo navigation).
2. Open the **Greeting** field. **Hard limit: 500 characters.** Edit the
   opening lines here.
3. To edit the *intake questions* (full name, phone, email, business,
   inquiry type, urgency), open the linked **Lead Qualification job**.
   This job runs after the greeting and is where the longer body of the
   script lives.
4. Save → make a test call to verify Sona reads the new text correctly.

The currently-saved scripts are quoted verbatim in § 2.3 of this document.
If you change them in Quo, update § 2.3 here so this doc stays accurate.

## 4.4 How to change business hours in Quo

1. Quo → **Settings → Business Hours** (sometimes called **Schedule** or
   **Office Hours**).
2. Currently set to **Monday – Friday, 9:00 AM – 6:00 PM Central Time**.
3. Adjust days / start / end / time zone as needed.
4. Configure the after-hours fallback (typically: send to Sona or to
   voicemail) under the same settings page.

## 4.5 How to redeploy the website after making code changes

This is the most-used workflow. From the project root in a terminal:

```bash
# 1. See what you've changed
git status

# 2. Stage all changes (or git add specific files)
git add -A

# 3. Commit with a short description
git commit -m "Update phone number on contact page"

# 4. Push to GitHub — this triggers deployment
git push origin main
```

The live site at `www.vantageriskadvisors.com` updates within ~30–60
seconds of the push completing. There is no "deploy" button to click —
the push IS the deploy.

If you prefer a GUI: install [GitHub Desktop](https://desktop.github.com),
open the repo, type a commit message in the bottom-left, hit "Commit to
main", then "Push origin" — same result.

### If a push is rejected

You'll see "Updates were rejected because the remote contains work that
you do not have locally." This means someone (or you, on another machine,
or via GitHub.com directly) made a commit that you don't have. Run:

```bash
git pull --rebase origin main
git push origin main
```

If `git pull --rebase` produces merge conflicts, open each conflicted file
in VS Code, resolve the `<<<<<<<` markers, then `git add` the resolved
files and run `git rebase --continue`. Then push.

## 4.6 How to add a new page or section to the website

### Adding a brand-new page (e.g., "Privacy Policy")

1. Copy the closest existing page that matches the structure you want.
   For a content-only page, `about.html` is a good template:
   ```bash
   cp about.html privacy.html
   ```
2. Open `privacy.html` and:
   - Update the `<title>` and `<meta name="description">` in the `<head>`.
   - Replace the main content blocks (everything inside `<main>`) with
     the privacy policy text.
   - Keep the nav and footer markup as-is — they are duplicated per page
     by design (no shared layout template).
3. Add a link to the new page in the footer of every other HTML file.
   Open each of the 7 existing pages, find the footer `<ul>` you want
   to link from (e.g., the Company column), and add:
   ```html
   <li><a href="privacy.html">Privacy</a></li>
   ```
4. Test locally by opening `privacy.html` in a browser.
5. Commit + push (see § 4.5).

### Adding a section to an existing page

1. Identify which CSS file owns the page's styles
   (`css/pages/<pagename>.css`).
2. Add a new `<section>` block in the HTML, using one of the existing
   patterns as a template:
   - Light section: `<section class="bg-paper">...</section>`
   - Dark section: `<section class="bg-section">...</section>`
   - Alternate light: `<section class="bg-paper-alt">...</section>`
3. Inside the section, use `.section-container` for max-width centering
   and consistent horizontal padding.
4. Style the new content classes in the page's CSS file. Reference
   existing tokens (`var(--accent)`, `var(--ink)`, etc.) defined in
   `css/tokens.css` so colors stay consistent.
5. Test locally, then commit + push.

### Editing the quote form

The form markup is duplicated on six pages but the canonical source-of-truth
is `quote-form-snippet.html`. To change fields, labels, or options:

1. Edit `quote-form-snippet.html` first.
2. Edit `js/quote-form.js` to match (if you added a field or changed an
   `industry` / `specialty` option list).
3. Propagate the markup change to each of the six pages that embed the
   form: `index.html`, `contact.html`, `healthcare.html`,
   `hospitality.html`, `multifamily.html`, `business.html`. Each has a
   `<!-- ▼ Canonical quote form. Source: quote-form-snippet.html ▼ -->`
   marker right before the form `<form>` tag for easy locating.
4. Commit + push.

---

## Appendix — Quick file reference

When you want to change… | Edit this file
---|---
Phone number anywhere | All 7 HTML pages (use find-and-replace)
Email address anywhere | All 7 HTML pages
Nav links / dropdown items | All 7 HTML pages (header block) + `css/nav.css`
Footer columns | All 7 HTML pages (footer block) + `css/footer.css`
Brand colors / typography | `css/tokens.css`
Home-page hero photo | `assets/hero-home.avif` + reference in `index.html`
Quote-form fields or options | `quote-form-snippet.html` + `js/quote-form.js` + paste into 6 host pages
Quote-form submission endpoint | `js/quote-form.js`, `WEBHOOK_URL` constant (line 22)
Favicon | `assets/favicon.svg`
V brand mark in nav/footer | `assets/logo-v.png`

---

*End of handoff. Last updated 2026-05-26. Keep this document current —
when you change the Sona script, swap the Quo call-flow, or replace the
Make.com webhook URL, edit the relevant section here so the next reader
has accurate state.*
