# cr0pht — Tech · Growth · Innovation

Single-page static website for cr0pht. Plain HTML, CSS and a little
JavaScript. No build step, no framework, no dependencies beyond two Google
Fonts.

## Files

- `index.html` — the whole site: hero, services, approach, work, about, contact
- `css/style.css` — styling, dark theme, responsive down to phones
- `js/main.js` — mobile menu, scroll reveal, stat counters, contact form submit

## Preview locally

```bash
python3 -m http.server 8010
```

Then open http://localhost:8010/.

## Deploy

The site is meant to live at **https://cr0pht.com** (set as the canonical
URL in `index.html`). Upload the folder as-is to any static host: Netlify, Vercel, Cloudflare Pages,
GitHub Pages or an S3 bucket. There is nothing to compile.

## Before going live

1. **Contact form.** The form posts to a placeholder Formspree URL. Create a
   form at formspree.io (or any form endpoint) and replace `your-form-id` in
   `index.html`. Until then the form shows a notice pointing to the email.
2. **Content.** The client names, case studies and figures are placeholders.
   Replace them with real ones in `index.html`.
3. **Email.** `cr0pht@proton.me` appears in the contact section, footer script
   and form fallback message.
4. **Analytics.** Add your snippet before `</head>` if you want it.
