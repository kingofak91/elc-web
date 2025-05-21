// /public/js/dot.js
document.addEventListener('DOMContentLoaded', () => {
  const pin         = [];
  const maxLength   = 4;
  const pinDots     = [...Array(maxLength)].map((_, i) => document.getElementById(`dot-${i}`));
  const hiddenInput = document.getElementById('pinInput');
  const form        = document.getElementById('pinForm');

  function renderDots() {
    pinDots.forEach((dot, idx) => {
      dot.classList.toggle('filled', idx < pin.length);
    });
  }

  document.querySelectorAll('.keypad .key').forEach(key => {
    key.addEventListener('click', () => {
      if (key.classList.contains('backspace')) {
        pin.pop();
      } else if (key.classList.contains('check')) {
        if (pin.length === maxLength) {
          hiddenInput.value = pin.join('');
          form.submit();
        }
      } else {
        const digit = key.textContent.trim();
        if (!isNaN(digit) && pin.length < maxLength) {
          pin.push(digit);
        }
      }
      renderDots();
    });
  });
});
