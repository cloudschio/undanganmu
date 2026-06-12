const loader = document.getElementById('loader');
const topBtn = document.getElementById('topBtn');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpList = document.getElementById('rsvpList');
const shareBtn = document.getElementById('shareBtn');
const copyBtns = document.querySelectorAll('.copyBtn');
const revealEls = document.querySelectorAll('.reveal');
const targetDate = new Date('2026-12-25T08:00:00').getTime();
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');


function countdown() {
  const now = Date.now();
  const dist = targetDate - now;
  days.textContent = String(Math.floor(dist / 86400000)).padStart(2, '0');
  hours.textContent = String(Math.floor((dist % 86400000) / 3600000)).padStart(2, '0');
  minutes.textContent = String(Math.floor((dist % 3600000) / 60000)).padStart(2, '0');
  seconds.textContent = String(Math.floor((dist % 60000) / 1000)).padStart(2, '0');
}
setInterval(countdown, 1000);
countdown();

musicBtn.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } catch (e) {}
  } else {
    bgMusic.pause();
    musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
  }
});

window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 500 ? 'grid' : 'none';
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) el.classList.add('show');
  });
});

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

shareBtn.addEventListener('click', async () => {
  const data = { title: 'Undangan Pernikahan', text: 'Undangan pernikahan adat Jawa', url: location.href };
  if (navigator.share) {
    try { await navigator.share(data); } catch (e) {}
  } else {
    navigator.clipboard.writeText(location.href);
    alert('Link undangan disalin');
  }
});

copyBtns.forEach(btn => btn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(btn.dataset.copy);
  alert('Nomor rekening disalin');
}));

rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const attendance = document.getElementById('attendance').value;
  const message = document.getElementById('message').value.trim();
  const item = document.createElement('div');
  item.className = 'rsvp-item';
  item.innerHTML = `<strong>${name}</strong> • ${attendance}<p>${message}</p>`;
  rsvpList.prepend(item);
  const payload = { name, attendance, message, timestamp: new Date().toISOString() };
  fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  }).catch(() => {});
  rsvpForm.reset();
});
const opening = document.getElementById('opening');
const openInviteBtn = document.getElementById('openInviteBtn');

openInviteBtn.addEventListener('click', async () => {
  opening.classList.add('hide');

  try {
    await bgMusic.play();
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } catch (e) {}
});
const opening=document.getElementById('opening');
const envelopeScene=document.getElementById('envelopeScene');
const openInviteBtn=document.getElementById('openInviteBtn');

openInviteBtn.addEventListener('click',async()=>{
  envelopeScene.classList.add('open');
  try{
    await bgMusic.play();
    musicBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>'
  }catch(e){}
  setTimeout(()=>{opening.classList.add('hide')},1400)
});const opening=document.getElementById('opening');
const openInviteBtn=document.getElementById('openInviteBtn');

openInviteBtn.addEventListener('click',async()=>{
  try{
    await bgMusic.play();
    musicBtn.innerHTML='<i class="fa-solid fa-volume-high"></i>'
  }catch(e){}
  opening.classList.add('hide')
});
const opening = document.getElementById('opening');
const openInviteBtn = document.getElementById('openInviteBtn');

openInviteBtn.addEventListener('click', async () => {
  try {
    await bgMusic.play();
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } catch (e) {}

  opening.style.opacity = '0';
  opening.style.visibility = 'hidden';
  opening.style.pointerEvents = 'none';

  setTimeout(() => {
    opening.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
});
