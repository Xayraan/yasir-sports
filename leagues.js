const leaguesGrid = document.getElementById('leaguesGrid');

async function loadLeagues() {
  const response = await fetch('/api/leagues');
  const leagues = await response.json();

  if (!leaguesGrid) return;

  leaguesGrid.innerHTML = leagues
    .map(
      (league) => `
      <article class="card league-card">
        <h3>${league.name}</h3>
        <p><strong>Teams:</strong> ${league.teams.join(', ')}</p>
        <p><strong>Upcoming:</strong></p>
        <ul>
          ${league.schedule
            .map((item) => `<li>${item.date} - ${item.fixture} (${item.time})</li>`)
            .join('')}
        </ul>
      </article>
    `
    )
    .join('');
}

loadLeagues();