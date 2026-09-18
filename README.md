# cr0pht — Security Research

Single-page static website for cr0pht, a security research practice. Plain HTML, CSS and a little
JavaScript. No build step, no framework, no third-party requests. The two web
fonts are self-hosted in `fonts/`: Inter (the rsms.me variable build, which
includes the slashed-zero feature used for the brand name) and JetBrains Mono
(latin subset). Both are under the SIL Open Font License.

## Files

- `index.html` — the whole site: hero, contact
- `css/style.css` — styling, dark theme, responsive down to phones
- `js/main.js` — scroll reveal, contact form submit
- `fonts/` — `InterVariable.woff2` and `JetBrainsMono-latin.woff2`, declared via `@font-face` in `css/style.css`
- `img/` — the hero logo lockup (`logo-1200.jpg`, `logo-700.jpg`), favicons cut from the hen, and the 1200×630 social share card (`og-card.jpg`); the original logo PNG sits in the project root

## Preview locally

```bash
python3 -m http.server 8010
```

Then open http://localhost:8010/.

## Deploy

The site lives at **https://www.cr0pht.com** (set as the canonical URL in
`index.html`; the bare domain redirects there). Upload the folder as-is to any static host: Netlify, Vercel, Cloudflare Pages,
GitHub Pages or an S3 bucket. There is nothing to compile.

## Before going live

1. **Contact form.** The form posts to Formspree (`formspree.io/f/xoevvryb`,
   set in the form's `action` in `index.html`). Submissions are managed in the
   Formspree dashboard.
2. **Content.** Review the copy in `index.html` and adjust to taste.
3. **Email.** `cr0pht@proton.me` appears in the contact section, footer script
   and form fallback message.
4. **Analytics.** Add your snippet before `</head>` if you want it.
