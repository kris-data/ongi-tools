async function loadLobby() {
  const res = await fetch('data/tools.json');
  const data = await res.json();
  const lobby = document.getElementById('lobby');
  let html = '';
  data.tools.forEach(tool => {
    html += `<div class="card">
      <h3>${tool.title}</h3>
      <p>${tool.description}</p>
      <div>${tool.emotions.map(e => `<span class='emotion-chip'>${e}</span>`).join(' ')}</div>
      <a href="${tool.href}"><button>Open</button></a>
    </div>`;
  });
  lobby.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', loadLobby);
