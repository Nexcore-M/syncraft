# Syncraft Electronics — Marketing Website

A modern, static marketing site for **Syncraft Electronics**, a newly established
(2023) electronics manufacturing services partner based in Ahmedabad, Gujarat,
India. The site presents the company's five services — EMS, OEM Assembly, PCB
Manufacturing, Contract Manufacturing, and Component Sourcing — with a contact
form, and is ready to deploy as-is to Netlify or Vercel.

## Tech stack

- **HTML5** — four hand-written, semantic pages
- **Tailwind CSS** via CDN (brand tokens configured inline on each page)
- **Vanilla JS** (`assets/js/main.js`) — mobile nav, scroll-reveal animations,
  and contact-form handling. No framework, no build step, no backend.
- **Formspree** for contact-form delivery (free tier).

## File structure

```
.
├── index.html          # Home
├── services.html       # Services (five service blocks)
├── about.html          # About (established 2023, Ahmedabad)
├── contact.html        # Contact form + details + Ahmedabad map embed
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css  # Fonts, scroll-reveal, focus, honeypot styles
│   └── js/main.js      # Nav, animations, form validation
└── README.md
```

## Run locally

It's a static site — just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## ✅ Before you go live — two required TODOs

1. **Formspree form ID** — Create a free account at <https://formspree.io>,
   add a new form, and copy its form ID. In `contact.html`, replace
   `YOUR_FORM_ID` in the form's `action` attribute:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
   Until this is done, the contact form will not deliver messages.

2. **Domain-matched email** — The site currently uses
   `syncraftelectronics@gmail.com`. Switch to an address on your domain
   (e.g. `hello@syncraft.co.in`). Search the project for the Gmail address and
   the `TODO` comments that flag each spot (footer on every page, the contact
   page, and the JSON-LD schema).

> The site is already configured for the live domain **`syncraft.co.in`**
> (canonical tags, Open Graph URLs, `robots.txt`, and `sitemap.xml`). If the
> domain ever changes, search the project for `syncraft.co.in` to update it.

## Deploy

### Netlify

**Option A — drag & drop**
1. Go to <https://app.netlify.com/drop>.
2. Drag the project folder onto the page. Done — Netlify serves it instantly.

**Option B — from Git**
1. Push this repo to GitHub/GitLab.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command: *(leave empty)*. Publish directory: `.` (the repo root).
4. Deploy.

### Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New → Project**, import the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output directory: `./`.
4. Deploy.

> Either host serves the static files directly — no build configuration needed.

## Notes on content accuracy

This site deliberately avoids social proof and unverified claims. There are **no**
client logos, testimonials, customer counts, years-of-experience claims, or
certifications, and **no** product catalog — Syncraft offers services only.
Imagery is generic, illustrative electronics photography (Unsplash) and is
labelled as such; no photos are presented as Syncraft's own staff or premises.

## Accessibility & SEO

- Semantic landmarks (`header`, `nav`, `main`, `footer`), labelled form inputs,
  alt text, keyboard-navigable nav, visible focus rings, and `prefers-reduced-motion`
  support.
- Unique `<title>` and meta description per page, Open Graph tags, JSON-LD
  `Organization` schema (real facts only), plus `sitemap.xml` and `robots.txt`.
