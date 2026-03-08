function setupMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

function matchStatusClass(status) {
  if (status === 'Live') return 'badge-live';
  if (status === 'Finished') return 'badge-finished';
  return 'badge-upcoming';
}

function formatMinute(minute) {
  const clamped = Math.max(0, Math.min(90, Number(minute) || 0));
  return `${String(clamped).padStart(2, '0')}:00`;
}

setupMobileMenu();