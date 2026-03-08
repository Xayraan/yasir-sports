const newsGrid = document.getElementById('newsGrid');

async function loadNews() {
  const response = await fetch('/api/news');
  const articles = await response.json();

  if (!newsGrid) return;

  newsGrid.innerHTML = articles
    .map(
      (item) => `
      <article class="card news-card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <button class="btn btn-secondary">Read More</button>
      </article>
    `
    )
    .join('');
}

loadNews();