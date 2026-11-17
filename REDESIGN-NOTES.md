# Costa's Tang Soo Do — 43DOU editorial redesign
The redesigned site retains the original pages and adds a traditional-dojang-inspired editorial section and form enhancements.

## Inquiries
On mobile the form launches a prefilled SMS to +1 (508) 979-8111; the visitor must press Send.
On desktop the form POSTs to /api/inquire. Deploy on Vercel and configure RESEND_API_KEY, INQUIRY_TO_EMAIL (once provided), and INQUIRY_FROM_EMAIL (a verified sending domain/address). Until configured, desktop shows an honest delivery error; no messages are silently lost. A sender at onboarding@resend.dev is only useful for limited provider testing; verify a sender before production.

## Authentic photography
Facebook login-only gallery photographs are not bundled. Use a browser session signed in by the owner (e.g. ChatGPT Work cloud browser) or upload selected authorized images to the repository. Do not replace them with unrelated stock images.
