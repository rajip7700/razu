document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-box');
  const overlayPopup = document.getElementById('fullscreen-popup');
  const popupContent = document.querySelector('.fullscreen-content');
  const ffnameInput = document.getElementById('ffname');
  const uidInput = document.getElementById('uid');
  const txidInput = document.getElementById('txid');
  const qrPopup = document.getElementById('qr-popup');
  const showQR = document.getElementById('showQR');
  const closeQR = document.getElementById('closeQR');

  // Show QR popup
  showQR.addEventListener('click', () => {
    qrPopup.classList.remove('hidden');
  });

  // Hide QR popup
  closeQR.addEventListener('click', () => {
    qrPopup.classList.add('hidden');
  });

  // Live UID validation glow
  uidInput.addEventListener('input', () => {
    const uid = uidInput.value.trim();
    if (uid.length === 0) {
      uidInput.classList.remove('typing', 'valid');
    } else if (uid.length < 9 || uid.length > 10) {
      uidInput.classList.add('typing');
      uidInput.classList.remove('valid');
    } else {
      uidInput.classList.remove('typing');
      uidInput.classList.add('valid');
    }
  });

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const ffname = ffnameInput.value.trim();
    const uid = uidInput.value.trim();
    const txid = txidInput.value.trim();

    // Validate fields
    if (!ffname || !uid || !txid) {
      alert("Please fill in all fields including Transaction ID.");
      if (!ffname) ffnameInput.focus();
      else if (!uid) uidInput.focus();
      else txidInput.focus();
      return;
    }

    // Validate UID format
    if (!/^\d{9,10}$/.test(uid)) {
      alert("UID must be 9 or 10 digits.");
      uidInput.focus();
      uidInput.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1436715123552288810/CjpWjgxmjmm0IXG_X2fZ6DCQTStinRLce3JmmF1W0qh0-31mDMGWTlWxammbs5xg4mUP";
    const colors = [0xff0000, 0x00ff00, 0x0000ff];
    const embedColor = colors[Math.floor(Math.random() * colors.length)];

    const payload = {
      embeds: [{
        title: "🔥 New Tournament Registration",
        description: `**👤 Name:** ${ffname}\n**🆔 UID:** ${uid}\n**💳 Transaction ID:** ${txid}`,
        color: embedColor,
        timestamp: new Date().toISOString(),
        footer: {
          text: "Free Fire Tournament Bot"
        }
      }]
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // Show success popup
      popupContent.textContent = "✅ Successfully Registered!";
      overlayPopup.classList.remove('hidden');
      overlayPopup.classList.add('show');

      setTimeout(() => {
        overlayPopup.classList.remove('show');
        overlayPopup.classList.add('hidden');
      }, 3000);

      form.reset();
      txidInput.value = "";
      uidInput.classList.remove('typing', 'valid');
    } catch (error) {
      alert("❌ Failed to send data to Discord.");
      console.error(error);
    }
  });
});
