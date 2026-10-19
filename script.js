(function(){
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const fx = document.getElementById('fx');
  const envelopeWrap = document.getElementById('envelopeWrap');
  const envelope = document.getElementById('envelope');

  const HEART_COLORS = ['#FF8FAB', '#FF4D6D', '#C084FC', '#E879F9', '#FFB7C5'];
  const MAX_HEARTS = 20;
  let opened = false;

  /* ================= TRÁI TIM BAY TỰ ĐỘNG ================= */
  if (prefersReduced) {
    body.classList.add('loaded');
    if(envelopeWrap) envelopeWrap.style.display = 'none';
    return;
  }

  function makeSparkles(){
    for (let i = 0; i < 28; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.setProperty('--s-dur', (Math.random() * 7 + 5) + 's');
      s.style.setProperty('--s-delay', Math.random() * 9 + 's');
      s.style.setProperty('--s-sway', (Math.random() * 24 - 12) + 'px');
      s.style.opacity = Math.random() * 0.5 + 0.15;
      fx.appendChild(s);
    }
  }
  makeSparkles();

  function spawnHeart(x, y, isClick){
    if (document.querySelectorAll('.heart').length >= MAX_HEARTS) return;
    const h = document.createElement('div');
    h.className = 'heart' + (isClick ? ' click' : '');
    h.textContent = '❤️';
    const size = isClick ? (Math.random() * 12 + 16) : (Math.random() * 14 + 11);
    h.style.fontSize = size + 'px';
    h.style.left = (x || Math.random() * 100) + (isClick ? 'px' : 'vw');
    h.style.top = (y || '118vh');
    h.style.color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    if(isClick){
      h.style.setProperty('--click-dur', (Math.random() * 2.5 + 3.5) + 's');
      h.style.setProperty('--opacity', Math.random() * 0.45 + 0.45);
    } else {
      h.style.setProperty('--dur', (Math.random() * 6 + 9) + 's');   // 9–15s
      h.style.setProperty('--delay', Math.random() * 5 + 's');       // 0–5s
      h.style.setProperty('--opacity', Math.random() * 0.5 + 0.3);
    }
    fx.appendChild(h);
    const removeMs = isClick ? 7500 : 16000;
    setTimeout(function(){ try { h.remove(); } catch(e) {} }, removeMs);
  }

  spawnHeart();
  const heartTimer = setInterval(spawnHeart, 1400);

  /* Trái tim khi người dùng chạm/nhấn chuột */
  document.addEventListener('pointerdown', function(e){
    if (prefersReduced) return;
    spawnHeart(e.clientX, e.clientY, true);
  }, {passive:true});

  /* ================= HIỆU ỨNG MỞ PHÔNG BÌ ================= */
  function openEnvelope(){
    if(opened) return;
    opened = true;
    body.classList.add('envelope-opened');

    setTimeout(function(){
      try { envelopeWrap.remove(); } catch(e){ envelopeWrap.style.display='none'; }
      body.classList.add('loaded');
    }, 900);
  }

  envelope.addEventListener('click', function(e){
    e.stopPropagation();
    openEnvelope();
  });
  envelopeWrap.addEventListener('click', function(e){
    if(e.target === envelopeWrap || e.target.closest('.envelope-hint')){
      openEnvelope();
    }
  });
})();
