const $ = (s) => document.querySelector(s);
const mobileNav = $('#mobileNav');
const menuToggle = $('#menuToggle');
menuToggle.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
}));
$('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-program]').forEach(button => button.addEventListener('click', () => {
  $('#program').value = button.dataset.program;
  $('#enroll').scrollIntoView({behavior: 'smooth'});
  window.setTimeout(() => $('#contactName').focus({preventScroll:true}), 400);
}));
let pendingText = '';
$('#signupForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const get = id => $('#'+id).value.trim();
  const days = [...document.querySelectorAll('#days input:checked')].map(x => x.value).join(', ') || 'Flexible / please advise';
  pendingText = [
    "Hi Costa's Karate! I'd like to inquire about classes.",
    `My name: ${get('contactName')}`,
    `Student name: ${get('studentName') || 'Same as contact'}`,
    `Student age group: ${get('ageRange')}`,
    `Experience: ${get('experience')}`,
    `Interested in: ${get('program')}`,
    `Preferred days: ${days}`,
    get('notes') ? `Additional details: ${get('notes')}` : '',
    'Could you please confirm the current schedule, availability and next steps? Thank you!'
  ].filter(Boolean).join('\n');
  const url = `sms:+15089798111?body=${encodeURIComponent(pendingText)}`;
  $('#smsLink').href = url;
  $('#smsFallback').hidden = false;
  window.location.href = url;
});
$('#copyMessage').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(pendingText); $('#copyStatus').textContent = 'Message copied.'; }
  catch { $('#copyStatus').textContent = 'Could not copy automatically. Please select and copy the text in your messaging app.'; }
});
