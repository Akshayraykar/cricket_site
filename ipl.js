// ============================================
// CRICKETZONE24 — SHARED SITE JAVASCRIPT
// ============================================

// ===== API KEYS =====
const CRIC_KEY = 'YOUR_CRICAPI_KEY_HERE';
const NEWS_KEY = 'YOUR_NEWSAPI_KEY_HERE';

// ===== COUNTDOWN TIMER =====
function startCountdown(targetDate, ids) {
  function update() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) {
      ['d','h','m','s'].forEach(id => {
        const el = document.getElementById(ids[id] || id);
        if (el) el.textContent = '00';
      });
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    const set = (id, val) => {
      const el = document.getElementById(ids ? ids[id] : id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };
    set('d', days); set('h', hours); set('m', mins); set('s', secs);
  }
  update();
  setInterval(update, 1000);
}

// ===== LOAD LIVE IPL MATCHES =====
async function loadLiveIPL(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res  = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${CRIC_KEY}&offset=0`);
    const json = await res.json();
    if (!json.data) throw new Error('No data');
    const ipl = json.data.filter(m =>
      m.name?.toLowerCase().includes('ipl') ||
      m.name?.toLowerCase().includes('indian premier')
    );
    if (ipl.length === 0) {
      container.innerHTML = `
        <div style="padding:40px;text-align:center;color:#6a7f96;
                    background:#111927;border-radius:14px;
                    border:1px solid #1e2d40;grid-column:1/-1">
          <div style="font-size:48px;margin-bottom:12px">🏏</div>
          <div style="font-size:16px;font-weight:600;color:#dde8f5">
            IPL 2026 starts March 28!
          </div>
          <div style="font-size:13px;margin-top:8px">
            First match: <strong style="color:#ffd166">RCB vs SRH</strong>
            at 7:30 PM IST. Live scores will appear here!
          </div>
        </div>`;
      return;
    }
    container.innerHTML = ipl.map(m => {
      const t1 = m.teams?.[0] || 'Team 1';
      const t2 = m.teams?.[1] || 'Team 2';
      const s1 = m.score?.[0] ? `${m.score[0].r}/${m.score[0].w}` : 'Yet to bat';
      const s2 = m.score?.[1] ? `${m.score[1].r}/${m.score[1].w}` : 'Yet to bat';
      const o1 = m.score?.[0] ? `(${m.score[0].o} ov)` : '';
      const o2 = m.score?.[1] ? `(${m.score[1].o} ov)` : '';
      return `
        <div class="match-card live-match">
          <div class="mc-top">
            <span class="badge badge-ipl">IPL 2026</span>
            <span class="mc-venue">${m.venue||'India'}</span>
            <span class="badge-live">● LIVE</span>
          </div>
          <div class="mc-body">
            <div class="team-row">
              <div class="t-name">${t1}</div>
              <div class="t-score">
                <div class="t-runs">${s1}</div>
                <div class="t-overs">${o1}</div>
              </div>
            </div>
            <div class="team-row">
              <div class="t-name">${t2}</div>
              <div class="t-score">
                <div class="t-runs">${s2}</div>
                <div class="t-overs">${o2}</div>
              </div>
            </div>
            <div class="mc-status">${m.status||'Live'}</div>
          </div>
          <div class="mc-bottom">
            <button class="btn-sc">Full Scorecard →</button>
          </div>
        </div>`;
    }).join('');
  } catch (e) {
    container.innerHTML = `<div style="padding:20px;color:#6a7f96;grid-column:1/-1">
      Could not load live scores. Check your API key.</div>`;
  }
}

// ===== LOAD NEWS =====
async function loadNews(containerId, query = 'IPL 2026 cricket', count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res  = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=${count}&apiKey=${NEWS_KEY}`
    );
    const json = await res.json();
    if (!json.articles || json.articles.length === 0) return;
    const colors = [
      'linear-gradient(135deg,#e63946,#ffd166)',
      'linear-gradient(135deg,#4361ee,#8338ec)',
      'linear-gradient(135deg,#06d6a0,#4361ee)',
      'linear-gradient(135deg,#8338ec,#3a0ca3)',
      'linear-gradient(135deg,#f4a261,#e76f51)',
      'linear-gradient(135deg,#f72585,#b5179e)',
    ];
    container.innerHTML = json.articles.slice(0, count).map((a, i) => `
      <div class="news-card ${i===0?'big':''}"
           onclick="window.open('${a.url}','_blank')">
        <div class="news-img" style="background:${colors[i%colors.length]};
             ${i===0?'min-height:200px':'height:150px'}">
          🏏
        </div>
        <div class="news-body" style="display:flex;flex-direction:column">
          <span class="news-tag">IPL 2026</span>
          <h3 class="news-title">${a.title}</h3>
          ${i===0?`<p class="news-excerpt">${a.description||''}</p>`:''}
          <div class="news-meta" style="margin-top:auto">
            <span>${a.source?.name||'Cricket News'}</span>
            <span>${new Date(a.publishedAt).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
      </div>`).join('');
  } catch (e) { console.log('News error:', e); }
}

// ===== FAQ TOGGLE =====
function toggleFaq(el) {
  el.classList.toggle('open');
  const ico = el.querySelector('.faq-ico');
  if (ico) ico.textContent = el.classList.contains('open') ? '×' : '+';
}

// ===== TABS =====
function switchTab(tabsId, contentPrefix, id, btn) {
  document.querySelectorAll(`#${tabsId} .tab`).forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll(`[id^="${contentPrefix}"]`).forEach(c => c.style.display = 'none');
  const target = document.getElementById(`${contentPrefix}${id}`);
  if (target) target.style.display = 'block';
}

// ===== ANIMATE BARS ON SCROLL =====
function animateBars() {
  const bars = document.querySelectorAll('[data-width]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => { b.style.width = '0%'; observer.observe(b); });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  startCountdown('2026-03-28T19:30:00+05:30', {d:'cd-d',h:'cd-h',m:'cd-m',s:'cd-s'});
  animateBars();
});
