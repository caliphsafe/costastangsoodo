# Costa's Tang Soo Do Karate — Redesign

A complete static HTML/CSS/JavaScript website for deployment to Vercel or GitHub Pages. No dependencies, npm install, API keys, or build command needed.

## Deploy to GitHub / Vercel
1. Open the contents of this ZIP and upload **all files and the assets folder** to the root of `caliphsafe/costastangsoodo` (replace `index.html`, `styles.css`, `script.js`, and `README.md`).
2. The original `assets/costas-logo.png` is deliberately preserved in the existing repository and should not be deleted. The current layout uses a typographic brandmark, so the logo file stays available for future placement.
3. On Vercel, import/refresh the GitHub repository. Framework preset: **Other**. Build command: **blank**. Output directory: **blank** (repository root).

## Inquiry setup
On **mobile**, form submission opens a prefilled SMS addressed to `+1 508-979-8111`. On **desktop**, the form uses `mailto:` and a configurable email address. **The school has not yet provided that email address**, so the desktop fallback currently displays a copyable inquiry rather than sending to an invented recipient.

When you receive the email address, open `config.js` and change:

```js
window.COSTAS_CONTACT_EMAIL = 'school@example.com';
```

The browser then opens the visitor's default email client with the email subject/body prepared. **The visitor must press Send; this is not automatic delivery.** If reliable form delivery without a configured email client is needed later, add an email provider/API endpoint (Resend, Formspree, etc.).

## Photographs
All 11 uploaded photographs have been embedded as optimized JPEGs in `assets/` and used throughout the hero, Master John Costa feature, programs, banners, and gallery. In particular, `master-john-costa-student.jpg` is used for the Master John Costa profile section. A photo lightbox supports desktop and mobile.

## Design
Distinctive dojo/editorial direction, with bold condensed typography, angular graphic lines, traditional cream/red/black palette, immersive photography, asymmetrical editorial layout, one-word navigation, large touch targets, accessible mobile navigation, and reduced-motion support. No emoji glyphs used.

## Content verification
Original source: https://costastangsoodo.com/ ; existing repository content as of November 17, 2026. Address: 376 Nash Road, New Bedford, MA 02746. Phone: (508) 979-8111. Master John Costa: 5th Dan per prior site. Confirm exact class times and current availability before advertising specific sessions. The new site avoids inventing class times or testimonials.
