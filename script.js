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
const isMobile = () => /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints>1 && window.innerWidth<=850);
const submitText = $('#submitText');
const explanation = $('#formExplanation');
function updateSubmitLabel() { submitText.textContent=isMobile() ? 'PREPARE TEXT MESSAGE' : 'PREPARE EMAIL'; explanation.textContent=isMobile() ? 'Opens your texting app with a prepared inquiry. You must press Send yourself.' : 'Opens your email app with a prepared inquiry once the school email address is configured. You must press Send yourself.'; }
updateSubmitLabel(); window.addEventListener('resize', updateSubmitLabel);
let message='';
$('#inquiryForm').addEventListener('submit', e => {
 e.preventDefault(); if(!e.currentTarget.reportValidity()) return;
 const val=id=>$('#'+id).value.trim();
 const days=[...document.querySelectorAll('.days input:checked')].map(i=>i.value).join(', ')||'Flexible / please advise';
 message=["Hello Costa's Tang Soo Do Karate,",'',"I would like to inquire about classes.",`Contact name: ${val('contactName')}`,`Student name: ${val('studentName')||'Same as contact'}`,`Age group: ${val('ageRange')}`,`Experience: ${val('experience')}`,`Program: ${val('program')}`,`Preferred days: ${days}`,val('notes')?`Additional information: ${val('notes')}`:'','Please let me know about current class times, availability, and next steps. Thank you!'].filter((x,i,a)=>x!==''||a[i-1]!=='').join('\n');
 const mobile=isMobile(); const email=(window.COSTAS_CONTACT_EMAIL||'').trim(); const number=window.COSTAS_SMS_NUMBER||'+15089798111';
 const url=mobile?`sms:${number}?body=${encodeURIComponent(message)}`:email?`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("New student inquiry - Costa's Karate")}&body=${encodeURIComponent(message)}`:null;
 $('#formFallback').hidden=false; $('#messagePreview').value=message;
 $('#formStatus').textContent=url ? `Your ${mobile?'text':'email'} is ready. Please review and press Send in your ${mobile?'messaging':'email'} app.` : 'The school email address has not been provided yet. Your inquiry is ready to copy, but desktop email sending is not configured.';
 $('#messageLink').hidden=!url; if(url) {$('#messageLink').href=url; $('#messageLink').textContent=mobile?'OPEN TEXT MESSAGE ↗':'OPEN EMAIL ↗'; window.location.href=url;}
 $('#formFallback').scrollIntoView({behavior:'smooth',block:'nearest'});
});
$('#copyMessage').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message); $('#formStatus').textContent='Message copied. Paste it into your email or text app to send.';}catch{ $('#messagePreview').focus();$('#messagePreview').select();$('#formStatus').textContent='Select and copy the message below.';}});
