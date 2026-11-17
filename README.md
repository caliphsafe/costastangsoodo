# Costa's Karate — 43DOU website concept

A responsive, single-page static website for Costa's Tang Soo Do Karate. Open `index.html` locally, or deploy the folder to GitHub Pages, Netlify or Vercel as a static site (no build command required).

## Inquiry flow
The signup form prepares a prefilled `sms:` message addressed to **+1 508-979-8111**. The visitor must press **Send** in their own texting app. No data is submitted to a server, and no class is automatically reserved. There is a copy-message fallback, useful if a desktop browser cannot launch SMS.

## Photos
The Facebook photo gallery was not accessible to automated retrieval when this version was built. **No photos from another karate school are presented as Costa's own.** The three visual gallery cards link to the official photo gallery at https://www.facebook.com/CostasTangSooDo/photos and are designed to be swapped out with approved original gallery photos. To insert locally stored photos, put them in `assets/` and add `background-image: linear-gradient(...), url('assets/YOUR-PHOTO.jpg')` to `.gallery-panel.one`, `.gallery-panel.two`, and `.gallery-panel.three` in `styles.css` with `background-size: cover; background-position: center`.

## Source-backed info and verification
- Original school site: https://costastangsoodo.com/
- Master John Costa, 5th Dan
- Address: 376 Nash Road, New Bedford, MA 02746
- Text/phone: (508) 979-8111
- Site schedule headings: Monday, Tuesday, Wednesday, Thursday, Saturday; precise class times were not exposed in accessible site text
- Class categories: beginners, intermediate/advanced, all ages/ranks (see public directory: https://www.youthby.com/costastangsoodo)
- Free trial availability is advertised in historical community brochure (see https://static1.squarespace.com/static/5ee57f7524d57261395a77da/t/64109880575e174508ddccfb/1678809221599/brochure-final.pdf); confirm current availability with the school.

The existing site includes a mask notice that may be obsolete; it was not carried over without current verification. Confirm age limits, up-to-date trial policy, and exact schedule before publication.
