# Vantage Risk Advisors — Website

Static 7-page marketing site for **Vantage Risk Advisors (VRA)**, an independent
commercial insurance brokerage specializing in healthcare, hospitality,
multifamily, and business.

Built from the Figma handoff bundle in `../design/figma-handoff/`.

## Stack

- Plain HTML5 + CSS (custom-property design tokens)
- Vanilla JavaScript (nav scroll + mobile menu, contact form validation)
- Google Fonts: Bricolage Grotesque, Hanken Grotesk, JetBrains Mono
- **No build step.** Open `index.html` directly or serve the directory.

## Local preview

```bash
# from this directory:
python -m http.server 8000
# then open http://localhost:8000
```

Or any static server (`npx serve`, VS Code Live Server, etc.).

## File map

```
.
├── index.html           Home (7 sections)
├── healthcare.html      Healthcare vertical (6 sections)
├── hospitality.html     Hospitality vertical (6 sections)
├── multifamily.html     Multifamily vertical (6 sections)
├── business.html        Business vertical (6 sections)
├── about.html           About (7 sections)
├── contact.html         Contact + form (3 sections)
├── css/
│   ├── tokens.css       Design tokens (colors, radius, spacing)
│   ├── base.css         Reset, type scale, shared components
│   ├── nav.css          Sticky nav
│   ├── footer.css       Footer
│   └── pages/
│       ├── home.css
│       ├── vertical.css     (shared by all four industry pages)
│       ├── healthcare.css
│       ├── hospitality.css
│       ├── multifamily.css
│       ├── business.css
│       ├── about.css
│       └── contact.css
├── js/
│   ├── nav.js           Scroll shadow, mobile menu, active link
│   └── contact.js       Contact form validation
├── assets/
│   ├── logo-dark.svg
│   ├── logo-white.svg
│   └── favicon.svg
├── CNAME                www.vantageriskadvisors.com
├── NOTES.md             Build notes & interpretation log
└── README.md            this file
```

## Deployment

GitHub Pages — see `NOTES.md` for full DNS setup. Summary:

1. Push this directory to a GitHub repo
2. Settings → Pages → deploy from `main` / root
3. Custom domain: `www.vantageriskadvisors.com`
4. Add the DNS records listed in `NOTES.md` at the registrar
5. Enable "Enforce HTTPS" once DNS propagates
