document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll buttons
  const toRegister = document.getElementById('btnToRegister');
  const toRules = document.getElementById('btnToRules');
  toRegister.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  toRules.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('rules').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Ensure hero loads as first view
  document.getElementById('hero').scrollIntoView({ behavior: 'instant', block: 'center' });

  // Rolling numbers for 3 seconds, then settle
  const rollingEls = document.querySelectorAll('.stat-value.rolling');
  const targets = {};
  rollingEls.forEach(el => { targets[el.id] = Number(el.dataset.target) || 0; });
  const rollStart = Date.now();
  const rollDuration = 3000;

  const rollTick = () => {
    const now = Date.now();
    if (now - rollStart < rollDuration) {
      rollingEls.forEach(el => {
        el.textContent = Math.floor(Math.random() * (targets[el.id] + 100)).toLocaleString();
      });
      requestAnimationFrame(rollTick);
    } else {
      rollingEls.forEach(el => {
        el.textContent = targets[el.id].toLocaleString();
      });
    }
  };
  rollTick();

  // Countdown 48 hours
  const countdownEl = document.getElementById('countdown');
  const deadline = Date.now() + 48 * 60 * 60 * 1000;
  const updateCountdown = () => {
    const left = Math.max(0, deadline - Date.now());
    const h = Math.floor(left / (1000 * 60 * 60));
    const m = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((left % (1000 * 60)) / 1000);
    countdownEl.textContent = `${h}h ${m}m ${s}s`;
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Reveal animations for rules
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  revealEls.forEach(el => observer.observe(el));

  // Form + QR logic
  const form = document.getElementById('registerForm');
  const ffnameInput = document.getElementById('ffname');
  const uidInput = document.getElementById('uid');
  const txidInput = document.getElementById('txid');
  const showQR = document.getElementById('showQR');
  const qrPopup = document.getElementById('qr-popup');
  const closeQR = document.getElementById('closeQR');
  const successOverlay = document.getElementById('success-overlay');

  // QR popup
  showQR.addEventListener('click', () => {
    qrPopup.classList.remove('hidden');
    qrPopup.setAttribute('aria-hidden', 'false');
  });
  closeQR.addEventListener('click', () => {
    qrPopup.classList.add('hidden');
    qrPopup.setAttribute('aria-hidden', 'true');
  });
  qrPopup.addEventListener('click', (e) => {
    if (e.target === qrPopup) {
      qrPopup.classList.add('hidden');
      qrPopup.setAttribute('aria-hidden', 'true');
    }
  });

  // UID glow validation
  const setUidGlow = (ok) => {
    uidInput.classList.toggle('valid', ok);
    uidInput.classList.toggle('invalid', !ok);
  };
  uidInput.addEventListener('input', () => {
    const v = uidInput.value.trim();
    setUidGlow(/^\d{9,10}$/.test(v));
  });

  // Submit to Discord webhook
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ffname = ffnameInput.value.trim();
    const uid = uidInput.value.trim();
    const txid = txidInput.value.trim();

    if (!ffname || !uid || !txid) {
      alert('Please fill all fields including Transaction ID.');
      return;
    }
    if (!/^\d{9,10}$/.test(uid)) {
      alert('UID must be 9 or 10 digits.');
      uidInput.focus();
      return;
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1436715123552288810/CjpWjgxmjmm0IXG_X2fZ6DCQTStinRLce3JmmF1W0qh0-31mDMGWTlWxammbs5xg4mUP';
    const colors = [0xff0000, 0x00ff00, 0x0000ff];
    const payload = {
      embeds: [{
        title: '🔥 New Tournament Registration',
        description: `**👤 Name:** ${ffname}\n**🆔 UID:** ${uid}\n**💳 Transaction ID:** ${txid}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: new Date().toISOString(),
        footer: { text: 'Galaxy NGL Bot' }
      }]
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      successOverlay.classList.remove('hidden');
      setTimeout(() => successOverlay.classList.add('hidden'), 2800);

      form.reset();
      setUidGlow(false);
    } catch (err) {
      alert('Failed to send data to Discord. Please try again.');
      console.error(err);
    }
  });

  // Help popup
  const helpFab = document.getElementById('helpFab');
  const helpPopup = document.getElementById('helpPopup');
  const helpClose = document.getElementById('helpClose');
  helpFab.addEventListener('click', () => {
    helpPopup.classList.remove('hidden');
  });
  helpClose.addEventListener('click', () => {
    helpPopup.classList.add('hidden');
  });
  helpPopup.addEventListener('click', (e) => {
    if (e.target === helpPopup) helpPopup.classList.add('hidden');
  });
});
