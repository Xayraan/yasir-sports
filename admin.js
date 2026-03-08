const addMatchForm = document.getElementById('addMatchForm');
const updateMatchForm = document.getElementById('updateMatchForm');
const adminMatches = document.getElementById('adminMatches');
const adminMessage = document.getElementById('adminMessage');
const matchSelect = document.getElementById('matchId');

function showMessage(text, ok = true) {
  if (!adminMessage) return;
  adminMessage.textContent = text;
  adminMessage.style.color = ok ? '#9cf2ce' : '#ffb3ba';
}

function renderAdminMatches(matches) {
  if (!adminMatches || !matchSelect) return;

  adminMatches.innerHTML = matches
    .map(
      (m) => `
      <li>
        ${m.teamA} ${m.scoreA} - ${m.scoreB} ${m.teamB} (${m.league}) - ${m.status} ${formatMinute(m.minute)}
      </li>
    `
    )
    .join('');

  matchSelect.innerHTML = matches
    .map((m) => `<option value="${m.id}">${m.teamA} vs ${m.teamB} (${m.league})</option>`)
    .join('');
}

async function fetchMatches() {
  const response = await fetch('/api/live-matches');
  const matches = await response.json();
  renderAdminMatches(matches);
}

if (addMatchForm) {
  addMatchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      league: addMatchForm.league.value,
      teamA: addMatchForm.teamA.value,
      teamB: addMatchForm.teamB.value,
      logoA: addMatchForm.logoA.value,
      logoB: addMatchForm.logoB.value,
      status: addMatchForm.status.value
    };

    const response = await fetch('/api/admin/matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      showMessage('Failed to add match.', false);
      return;
    }

    addMatchForm.reset();
    showMessage('Match added successfully.');
    fetchMatches();
  });
}

if (updateMatchForm) {
  updateMatchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const matchId = updateMatchForm.matchId.value;
    const payload = {
      scoreA: Number(updateMatchForm.scoreA.value),
      scoreB: Number(updateMatchForm.scoreB.value),
      minute: Number(updateMatchForm.minute.value),
      status: updateMatchForm.status.value
    };

    const response = await fetch(`/api/admin/matches/${matchId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      showMessage('Failed to update match.', false);
      return;
    }

    showMessage('Match updated.');
    fetchMatches();
  });
}

fetchMatches();
setInterval(fetchMatches, 4000);