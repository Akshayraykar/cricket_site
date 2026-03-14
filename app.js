// ===========================
//   CRICKETBUZZ CLONE - JS
// ===========================

// ===== THEME TOGGLE =====
const CRIC_KEY = 'b70cc52a-4fdd-4758-88ae-af66d4c6063f';
const NEWS_KEY = 'bc3ea03268994646918e3d9a5c646f6c';


const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

const searchData = [
  { type: 'Player', name: 'Virat Kohli', extra: 'India • Batsman' },
  { type: 'Player', name: 'Rohit Sharma', extra: 'India • Batsman' },
  { type: 'Player', name: 'Jasprit Bumrah', extra: 'India • Bowler' },
  { type: 'Player', name: 'Babar Azam', extra: 'Pakistan • Batsman' },
  { type: 'Player', name: 'Steve Smith', extra: 'Australia • Batsman' },
  { type: 'Player', name: 'Joe Root', extra: 'England • Batsman' },
  { type: 'Team', name: 'India', extra: 'ICC Ranking #2' },
  { type: 'Team', name: 'Australia', extra: 'ICC Ranking #1' },
  { type: 'Team', name: 'England', extra: 'ICC Ranking #3' },
  { type: 'Series', name: 'IPL 2025', extra: 'T20 League' },
  { type: 'Series', name: 'India vs Australia 2025', extra: 'ODI Series' },
  { type: 'Series', name: 'ICC World Cup 2026', extra: 'ODI' },
  { type: 'Match', name: 'IND vs AUS - 1st ODI', extra: 'Live Now' },
  { type: 'Match', name: 'ENG vs SA - 1st Test', extra: 'Live Now' },
];

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchDropdown.classList.remove('show'); return; }
  const results = searchData.filter(d =>
    d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
  ).slice(0, 6);
  if (!results.length) { searchDropdown.classList.remove('show'); return; }
  searchDropdown.innerHTML = results.map(r => `
    <div class="search-result-item">
      <span style="font-size:10px;background:#eee;padding:1px 5px;border-radius:3px;margin-right:8px;color:#555">${r.type}</span>
      <strong>${r.name}</strong>
      <span style="color:#888;font-size:11px;margin-left:6px">${r.extra}</span>
    </div>
  `).join('');
  searchDropdown.classList.add('show');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-bar')) searchDropdown.classList.remove('show');
});

// ===== TABS =====
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tabs-bar .tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

function showStatsTab(id) {
  document.querySelectorAll('.stats-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-sm').forEach(t => t.classList.remove('active'));
  document.getElementById('stats-' + id).classList.add('active');
  event.target.classList.add('active');
}

// ===== RANKINGS TAB =====
const rankingsData = {
  test: [
    ['1', '🇦🇺 Australia', '125'],
    ['2', '🇮🇳 India', '121'],
    ['3', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '108'],
    ['4', '🇿🇦 South Africa', '103'],
    ['5', '🇳🇿 New Zealand', '99'],
  ],
  odi: [
    ['1', '🇮🇳 India', '119'],
    ['2', '🇦🇺 Australia', '115'],
    ['3', '🇵🇰 Pakistan', '109'],
    ['4', '🇿🇦 South Africa', '105'],
    ['5', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '98'],
  ],
  t20: [
    ['1', '🇮🇳 India', '272'],
    ['2', '🇵🇰 Pakistan', '263'],
    ['3', '🇦🇺 Australia', '258'],
    ['4', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '251'],
    ['5', '🇱🇰 Sri Lanka', '243'],
  ]
};

function showRankingTab(type) {
  const rows = rankingsData[type].map(r =>
    `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`
  ).join('');
  document.getElementById('rankingBody').innerHTML = rows;
  document.querySelectorAll('.tab-mini').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
}

// ===== POLL =====
const pollVotes = { mi: 40, csk: 35, rcb: 15, dc: 10 };
let pollTotal = Object.values(pollVotes).reduce((a, b) => a + b, 0);
let voted = false;

function vote(btn, key) {
  if (voted) return;
  voted = true;
  pollVotes[key] += 1;
  pollTotal += 1;
  const labels = { mi: 'Mumbai Indians', csk: 'Chennai Super Kings', rcb: 'RCB', dc: 'Delhi Capitals' };
  const results = document.getElementById('pollResults');
  results.innerHTML = Object.entries(pollVotes).map(([k, v]) => {
    const pct = Math.round((v / pollTotal) * 100);
    return `
      <div class="poll-result-row">
        <div class="poll-result-label"><span>${labels[k]}</span><span>${pct}%</span></div>
        <div class="poll-bar"><div class="poll-bar-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }).join('');
  results.style.display = 'block';
  document.querySelector('.poll-options').style.display = 'none';
  const totalSpan = document.createElement('p');
  totalSpan.style.fontSize = '11px';
  totalSpan.style.color = 'var(--text-muted)';
  totalSpan.style.marginTop = '8px';
  totalSpan.textContent = `${pollTotal} votes`;
  results.appendChild(totalSpan);
}

// ===== MATCH MODAL =====
const matchDetails = {
  'IND vs AUS': {
    title: 'India vs Australia — 1st ODI',
    venue: 'Wankhede Stadium, Mumbai',
    status: '🟢 LIVE | India need 45 runs from 10 balls',
    inn1: {
      team: '🇦🇺 Australia — 243 All Out (44.5 ov)',
      batters: [
        ['D. Warner', '45', '60', '6', '1', '75.0'],
        ['A. Finch', '12', '20', '1', '0', '60.0'],
        ['S. Smith', '67', '89', '4', '2', '75.3'],
        ['M. Labuschagne', '38', '52', '3', '1', '73.1'],
        ['T. Head', '29', '34', '2', '1', '85.3'],
        ['A. Carey', '18', '24', '2', '0', '75.0'],
        ['P. Cummins', '14', '12', '1', '1', '116.7'],
        ['M. Starc', '10', '8', '1', '0', '125.0'],
        ['J. Hazlewood', '4', '6', '0', '0', '66.7'],
        ['A. Zampa', '2', '4', '0', '0', '50.0'],
        ['J. Richardson', '0', '2', '0', '0', '0.0'],
      ]
    },
    inn2: {
      team: '🇮🇳 India — 287/6 (48.2 ov)',
      batters: [
        ['R. Sharma*', '54', '70', '5', '2', '77.1'],
        ['S. Gill', '22', '31', '2', '0', '71.0'],
        ['V. Kohli*', '88', '95', '7', '3', '92.6'],
        ['S. Iyer', '45', '58', '4', '1', '77.6'],
        ['K. Rahul', '35', '44', '3', '0', '79.5'],
        ['H. Pandya', '28', '19', '2', '2', '147.4'],
        ['R. Jadeja*', '12', '9', '1', '0', '133.3'],
      ]
    }
  },
  'ENG vs SA': {
    title: 'England vs South Africa — 1st Test',
    venue: "Lord's Cricket Ground, London",
    status: '🟢 LIVE | Day 3 — SA need 146 from 120 balls',
    inn1: {
      team: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England — 310/4 (50.0 ov)',
      batters: [
        ['Z. Crawley', '67', '100', '8', '1', '67.0'],
        ['B. Duckett', '43', '58', '5', '2', '74.1'],
        ['J. Root', '89', '120', '9', '1', '74.2'],
        ['H. Brook', '72', '85', '7', '3', '84.7'],
        ['B. Stokes*', '39', '45', '4', '1', '86.7'],
      ]
    },
    inn2: {
      team: '🇿🇦 South Africa — 165/3 (30.0 ov)',
      batters: [
        ['A. Markram', '55', '72', '6', '1', '76.4'],
        ['D. Elgar', '28', '46', '3', '0', '60.9'],
        ['T. de Bruyn', '44', '55', '5', '1', '80.0'],
        ['R. Rickelton*', '32', '38', '3', '1', '84.2'],
      ]
    }
  },
  'PAK vs NZ': {
    title: 'Pakistan vs New Zealand — 1st T20I',
    venue: 'Gaddafi Stadium, Lahore',
    status: '🟢 LIVE | NZ need 4 from 9 balls',
    inn1: {
      team: '🇵🇰 Pakistan — 198/8 (20 ov)',
      batters: [
        ['Babar Azam', '68', '44', '6', '3', '154.5'],
        ['M. Rizwan', '45', '32', '4', '2', '140.6'],
        ['I. Butt', '22', '16', '2', '1', '137.5'],
        ['Shadab Khan', '31', '20', '3', '2', '155.0'],
        ['Iftikhar Ahmed', '18', '12', '1', '1', '150.0'],
      ]
    },
    inn2: {
      team: '🇳🇿 New Zealand — 195/2 (18.3 ov)',
      batters: [
        ['F. Allen', '87', '55', '8', '5', '158.2'],
        ['D. Conway', '62', '44', '6', '3', '140.9'],
        ['G. Phillips*', '46', '30', '4', '3', '153.3'],
      ]
    }
  }
};

function openMatchModal(matchKey) {
  const data = matchDetails[matchKey];
  if (!data) return;

  function buildBattersTable(inn) {
    return `
      <div class="scorecard-section">
        <div class="scorecard-title">${inn.team}</div>
        <table class="scorecard-table">
          <thead>
            <tr>
              <th>Batter</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th>
            </tr>
          </thead>
          <tbody>
            ${inn.batters.map(b => `
              <tr>
                <td><strong>${b[0]}</strong></td>
                <td><strong>${b[1]}</strong></td>
                <td>${b[2]}</td>
                <td>${b[3]}</td>
                <td>${b[4]}</td>
                <td>${b[5]}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td colspan="6" style="color:var(--primary);padding-top:6px">${inn.team.split('—')[1]?.trim() || ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-header">
      <div class="modal-match-title">${data.title}</div>
      <div style="font-size:13px;opacity:0.7;margin-top:4px">📍 ${data.venue}</div>
      <div style="font-size:12px;margin-top:6px;color:#f39c12">${data.status}</div>
    </div>
    <div class="modal-body">
      <h3 style="font-family:'Rajdhani',sans-serif;font-size:17px;margin-bottom:14px">Scorecard</h3>
      ${buildBattersTable(data.inn1)}
      ${buildBattersTable(data.inn2)}
    </div>
  `;

  document.getElementById('matchModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('matchModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== LIVE SCORE UPDATER (simulated) =====
function simulateLiveUpdate() {
  const scoreEls = document.querySelectorAll('.match-card.live .score');
  if (scoreEls.length > 0) {
    // Randomly update the first live match score slightly
    const r = Math.random();
    if (r > 0.7) {
      const statusEls = document.querySelectorAll('.match-card.live .match-status');
      const msgs = [
        'FOUR! Kohli drives through covers beautifully',
        'SIX! Massive hit over long-on by Pandya',
        'WICKET! Bumrah strikes again — LBW!',
        'Single taken. India ticking along nicely',
        'Wide ball — fielding pressure building',
        'DOT BALL! Great yorker from Starc',
      ];
      if (statusEls[0]) {
        statusEls[0].textContent = msgs[Math.floor(Math.random() * msgs.length)];
      }
    }
  }
}
setInterval(simulateLiveUpdate, 8000);

// ===== TICKER DUPLICATE (for seamless loop) =====
const tickerTrack = document.getElementById('tickerTrack');
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

// ===== MOBILE NAV =====
document.getElementById('navToggle')?.addEventListener('click', () => {
  const nav = document.querySelector('.main-nav');
  if (nav) {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.background = 'var(--header-bg)';
    nav.style.padding = '10px';
    nav.style.zIndex = '200';
  }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.match-card, .news-card, .widget').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

console.log('🏏 CricketBuzz loaded! Ready for live cricket action.');
