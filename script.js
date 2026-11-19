const $ = (selector) => document.querySelector(selector);
const nav = $('#navigation');
const menuButton = $('.menu-button');
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }));
$('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-program]').forEach(button => button.addEventListener('click', () => { $('#program').value = button.dataset.program; $('#contact').scrollIntoView({behavior:'smooth'}); }));
const lightbox = $('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => { $('#lightboxImage').src = button.dataset.image; $('#lightboxImage').alt = button.querySelector('img').alt; $('#lightboxCaption').textContent = button.dataset.caption; lightbox.showModal(); }));
$('#closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => { if(e.target===lightbox) lightbox.close(); });
const INQUIRY_URL = 'https://formsubmit.co/ajax/jcostakarate@gmail.com';
const inquiryForm = $('#inquiryForm');
const submitButton = inquiryForm.querySelector('button[type="submit"]');
const submitText = $('#submitText');
const formStatus = $('#formStatus');
let sending = false;

inquiryForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending || !inquiryForm.reportValidity()) return;
  const value = id => $('#' + id).value.trim();
  const days = [...document.querySelectorAll('.days input:checked')]
    .map(input => input.value).join(', ') || 'Flexible / please advise';
  const name = value('contactName');
  const email = value('contactEmail');
  const phone = value('contactPhone');
  const payload = {
    name,
    email,
    phone: phone || 'Not provided',
    student_name: value('studentName') || 'Same as contact',
    age_group: value('ageRange'),
    experience: value('experience'),
    program: value('program'),
    preferred_days: days,
    additional_information: value('notes') || 'None provided',
    _subject: "New Costa's Tang Soo Do inquiry - " + name,
    _template: 'table',
    _captcha: 'false',
    _url: location.href,
    _replyto: email
  };
  sending = true;
  submitButton.disabled = true;
  submitText.textContent = 'SENDING...';
  formStatus.hidden = false;
  formStatus.textContent = 'Submitting your inquiry...';

  try {
    const response = await fetch(INQUIRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || String(result.success).toLowerCase() !== 'true') {
      throw new Error(result.message || 'The inquiry service could not accept your request.');
    }
    formStatus.textContent = 'Your inquiry was submitted successfully. We’ll be in touch soon!';
    inquiryForm.reset();
    submitText.textContent = 'INQUIRY SENT';
  } catch (error) {
    formStatus.textContent = 'We could not submit your inquiry. Please try again or call (508) 979-8111. Your details have been kept.';
    submitText.textContent = 'TRY SENDING AGAIN';
  } finally {
    sending = false;
    submitButton.disabled = false;
  }
});
