
document.addEventListener('DOMContentLoaded', function () {
  const body     = document.body;
  const uniqueId = body.dataset.uid;

  // Overlay elements
  const upiRadio = document.getElementById('upi');
  const overlay  = document.getElementById('upiOverlay');
  const closeBtn = document.getElementById('closeOverlay');

  // Payment buttons
  const btnCredit     = document.getElementById('btnCredit');
  const btnNetBanking = document.getElementById('btnNetBanking');

  // Open overlay when UPI radio is selected
  if (upiRadio && overlay) {
    upiRadio.addEventListener('change', () => {
      if (upiRadio.checked) overlay.classList.add('open');
    });
  }

  // Close & uncheck helpers
  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (upiRadio) upiRadio.checked = false;
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeOverlay);
  }

  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeOverlay();
    });
  }

  // Button redirects
  if (btnCredit) {
    btnCredit.addEventListener('click', () => {
      window.location.href = '/credit/' + uniqueId;
    });
  }

  if (btnNetBanking) {
    btnNetBanking.addEventListener('click', () => {
      window.location.href = '/netbanking/' + uniqueId;
    });
  }

  // UPI-app list redirects (NOW WITH uniqueId)
  document
    .querySelectorAll('.overlay-list input[name="upiApp"]')
    .forEach(radio => {
      radio.addEventListener('change', () => {
        window.location.href = '/upi/' + uniqueId;
      });
    });
});
