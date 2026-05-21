# Build Notes — VRA Website

Things that needed interpretation, content gaps to fill, and deployment specifics.

## Design interpretation

Every value (color, font size, spacing, radius) came directly from the prompt and
`_tokens.html`. A handful of layout decisions had to be inferred from the page
screenshots:

- **Hero stat grid (home)** — placed as a 2×2 grid of tiles inside the dark hero
  panel, matching the right-column layout in `01-home.png`.
- **Vertical-page hero** — the prompt specifies a dark hero, but screenshots
  02–05 show light (paper) hero backgrounds with the headline in ink. The
  screenshots were used as the source of truth here. Heroes for healthcare,
  hospitality, multifamily, and business render on `--paper` with a dark
  coverage stack immediately below.
- **Claims-cost strip** — screenshots show a five-stat strip ("The claims that
  hurt healthcare practices", etc.) sitting below the coverage tile grid inside
  the same dark section. Implemented as a `.claims-strip` block.
- **Contact hero** — kept on `--inkSection` per the prompt rather than the
  screenshot's lighter background, since the prompt was explicit.
- **Process step row** — desktop shows a connecting hairline between numbered
  steps; implemented with an absolutely-positioned 1px line on the homepage.
- **Industry strip cards** — the home page's full-width 4-card "by industry"
  strip is rendered as a single rounded surface with internal vertical dividers.

## Placeholders & content gaps

These need to be filled before launch — flagged as `placeholder` for review:

| Item             | Current placeholder                    |
|------------------|----------------------------------------|
| Phone number     | `+1 (555) 123-4567`                    |
| Office address   | "Texas · Serving nationally" (no street)|
| Team member names| Roles/leads only — no individual names |
| Team headshots   | Initials avatar in `--accentSoft`      |
| Privacy / Terms  | Placeholder `#` links in footer        |
| Form submission  | Phase 2 — currently shows success state on valid submit, no backend |

## Logo

`assets/logo-dark.svg` and `logo-white.svg` are SVG wordmarks rendered in
Bricolage Grotesque with a small accent square between "Vantage" and "Risk".
Replace with a finalized brand asset when available.

## Form

`js/quote-form.js` is the universal handler for the canonical quote form
(class `.quote-form`). It powers the cascading industry → specialty dropdown,
inline required-field validation, and the success-panel swap. The form is
embedded on six pages (index, contact, healthcare, hospitality, multifamily,
business) — see `quote-form-snippet.html` for the canonical markup.

Backend integration goes inside `submitForm()` in quote-form.js, where the
single fetch() hook can post to NowCerts/Momentum AMS, Google Workspace, or
any other endpoint.

## GitHub Pages deployment

Repo: planned at `https://github.com/MadSwami47/vra-website`.

The local git init / commit and the GitHub push were left **un-executed**
pending user confirmation. Pushing to a remote is a shared-state action and
needs explicit go-ahead.

### Commands (when ready)

```bash
cd ~/Desktop/vra-project/site/
git init
git add .
git commit -m "Initial build — VRA 7-page static site from design tokens"
git branch -M main
git remote add origin https://github.com/MadSwami47/vra-website.git
git push -u origin main
```

### Pages settings

GitHub repo → **Settings → Pages**:
- Source: Deploy from a branch
- Branch: `main` / root
- Custom domain: `www.vantageriskadvisors.com`
- Enforce HTTPS: ✓ (after DNS propagates)

### DNS records

At the domain registrar for `vantageriskadvisors.com`:

| Type  | Host | Value                | TTL  |
|-------|------|----------------------|------|
| CNAME | www  | MadSwami47.github.io | 3600 |
| A     | @    | 185.199.108.153      | 3600 |
| A     | @    | 185.199.109.153      | 3600 |
| A     | @    | 185.199.110.153      | 3600 |
| A     | @    | 185.199.111.153      | 3600 |

`CNAME` file is already committed at the site root.

## Responsive breakpoints

- **1200px** — section padding reduces; display-72 drops to 56px.
- **1100px** — two-column heroes collapse to one column; industry strip wraps.
- **900px** — tile grids drop from 4 → 2 columns; nav collapses to burger.
- **640px** — all grids → 1 column; tile grid → 1 column; nav fully mobile.
