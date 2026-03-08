const featuredLiveEl = document.getElementById('featuredLive');
const latestNewsEl = document.getElementById('latestNews');
const highlightsPreviewEl = document.getElementById('highlightsPreview');

function renderFeaturedMatches(matches) {
  if (!featuredLiveEl) return;

  const featured = matches.slice(0, 3);
  featuredLiveEl.innerHTML = featured
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
        <div class="timer">Match Timer: ${formatMinute(m.minute)}</div>
        <a class="btn btn-primary" href="/live.html">Watch Match</a>
      </article>
    `
    )
    .join('');
}

async function loadHome() {
  const [matchesRes, newsRes, highlightsRes] = await Promise.all([
    fetch('/api/live-matches'),
    fetch('/api/news'),
    fetch('/api/highlights')
  ]);

  const matches = await matchesRes.json();
  const news = await newsRes.json();
  const highlights = await highlightsRes.json();

  renderFeaturedMatches(matches);

  if (latestNewsEl) {
    latestNewsEl.innerHTML = news
      .slice(0, 3)
      .map(
        (item) => `
        <article class="card news-card">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <a class="btn btn-secondary" href="/news.html">Read More</a>
        </article>
      `
      )
      .join('');
  }

  if (highlightsPreviewEl) {
    highlightsPreviewEl.innerHTML = highlights
      .slice(0, 3)
      .map(
        (item) => `
        <article class="card highlight-card">
          <img src="${item.thumbnail}" alt="${item.title}">
          <h3>${item.title}</h3>
          <a class="btn btn-primary" href="/highlights.html">Play</a>
        </article>
      `
      )
      .join('');
  }
}

loadHome();
setInterval(loadHome, 5000);