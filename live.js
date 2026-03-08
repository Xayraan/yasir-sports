const liveMatchesEl = document.getElementById('liveMatches');

function renderLiveMatches(matches) {
  if (!liveMatchesEl) return;

  liveMatchesEl.innerHTML = matches
    .map(
      (m) => `
      <article class="card match-card">
        <div class="meta">
          <span>${m.league}</span>
          <span class="${matchStatusClass(m.status)}">${m.status}</span>
        </div>
        <div class="teams">
          <div class="team"><img src="${m.logoA}" alt="${m.teamA} logo"><strong>${m.teamA}</strong></div>
          <div class="score">${m.scoreA} - ${m.scoreB}</div>
          <div class="team"><img src="${m.logoB}" alt="${m.teamB} logo"><strong>${m.teamB}</strong></div>
        </div>
        <div class="timer">Timer: ${formatMinute(m.minute)}</div>
        <button class="btn btn-primary">Watch Match</button>
      </article>
    `
    )
    .join('');
}

async function loadLiveMatches() {
  const response = await fetch('/api/live-matches');
  const matches = await response.json();
  renderLiveMatches(matches);
}

loadLiveMatches();
setInterval(loadLiveMatches, 1000);