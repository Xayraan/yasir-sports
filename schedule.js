const scheduleBody = document.getElementById('scheduleBody');

async function loadSchedule() {
  const response = await fetch('/api/schedule');
  const schedule = await response.json();

  if (!scheduleBody) return;

  scheduleBody.innerHTML = schedule
    .map(
      (match) => `
      <tr>
        <td>${match.date}</td>
        <td>${match.league}</td>
        <td>${match.teams}</td>
        <td>${match.time}</td>
        <td>${match.stadium}</td>
      </tr>
    `
    )
    .join('');
}

loadSchedule();