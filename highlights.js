const highlightsGrid = document.getElementById('highlightsGrid');
const videoModal = document.getElementById('videoModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModal');

function openModal(item) {
  if (!videoModal || !modalContent) return;

  const isYoutube = item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be');

  modalContent.innerHTML = isYoutube
    ? `<iframe class="modal-frame" src="${item.videoUrl}" allowfullscreen title="${item.title}"></iframe>`
    : `<video class="modal-frame" src="${item.videoUrl}" controls autoplay></video>`;

  videoModal.classList.add('open');
}

function closeModal() {
  if (!videoModal || !modalContent) return;
  videoModal.classList.remove('open');
  modalContent.innerHTML = '';
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal) closeModal();
  });
}

async function loadHighlights() {
  const response = await fetch('/api/highlights');
  const highlights = await response.json();

  if (!highlightsGrid) return;

  highlightsGrid.innerHTML = highlights
    .map(
      (item) => `
      <article class="card highlight-card">
        <img src="${item.thumbnail}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Match highlights and tactical moments.</p>
        <button class="btn btn-primary" data-id="${item.id}">Play</button>
      </article>
    `
    )
    .join('');

  const map = new Map(highlights.map((item) => [item.id, item]));
  highlightsGrid.querySelectorAll('button[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = map.get(btn.dataset.id);
      if (item) openModal(item);
    });
  });
}

loadHighlights();