document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form-box');
  const overlayPopup = document.getElementById('fullscreen-popup');
  const popupContent = document.querySelector('.fullscreen-content');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const ffname = document.getElementById('ffname').value.trim();
    const uid = document.getElementById('uid').value.trim();

    if (!ffname || !uid) {
      alert("Please fill in all fields.");
      return;
    }

    // Show full screen success message
    popupContent.textContent = "✅ Successfully Registered!";
    overlayPopup.classList.remove('hidden');
    overlayPopup.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
      overlayPopup.classList.remove('show');
      overlayPopup.classList.add('hidden');
    }, 3000);

    form.reset();
  });
});
