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


// Subtle motion cues for the dojang identity. Nonessential, reduced-motion safe.
(() => {
  const progress = document.querySelector('.dojo-progress span');
  let queued = false;
  const paintProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0) + '%';
    queued = false;
  };
  const requestProgress = () => {
    if (!queued) { queued = true; requestAnimationFrame(paintProgress); }
  };
  window.addEventListener('scroll', requestProgress, { passive: true });
  window.addEventListener('resize', requestProgress, { passive: true });
  paintProgress();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const items = document.querySelectorAll('.intro-title,.intro-detail,.program-card,.statement-content,.master-image,.master-copy,.gallery-heading,.gallery-item,.callout-inner,.contact-info');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .07, rootMargin: '0px 0px 0px 0px' });
  items.forEach(item => {
    // Sections already on screen remain immediately visible, so no flash on load.
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;
    item.classList.add('reveal-ready');
    observer.observe(item);
  });
})();


// Keep the decorative hero video muted and looping whenever the browser allows playback.
(() => {
  const video = document.getElementById('heroBackgroundVideo');
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;

  const resumeVideo = () => {
    if (!video.isConnected || document.hidden) return;
    if (video.ended && Number.isFinite(video.duration)) video.currentTime = 0;
    if (!video.paused) return;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Autoplay may be restricted by browser or device power-saving policies.
      });
    }
  };
  video.addEventListener('canplay', resumeVideo);
  video.addEventListener('pause', resumeVideo);
  video.addEventListener('ended', () => { video.currentTime = 0; resumeVideo(); });
  document.addEventListener('visibilitychange', resumeVideo);
  window.addEventListener('pageshow', resumeVideo);
  resumeVideo();
})();
