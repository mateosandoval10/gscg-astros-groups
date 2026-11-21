(function () {
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const app = $('#app');

  const ICON = {
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  };
  const icon = (k, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  const pill = (label, href, cls = '') => `<a class="pill ${cls}" href="${href}">${label}</a>`;
  const extLink = (label, href, cls = '') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}</a>`;
  const money = n => '$' + Math.round(n).toLocaleString('en-US');

  // Astros photo layered over the local photo, so the local one shows if the CDN fails.
  const bg = (x, size = 1024) => x.ast ? `url('${x.ast.startsWith('http') ? x.ast : `https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w${size}/mlb/${x.ast}.jpg`}'), url('${x.img}')` : `url('${x.img}')`;
  const tierAt = n => [...S.tiers].reverse().find(t => n >= t.min);

  // ---------- header
  function header() {
    $('#nav').innerHTML = `
      <a class="logo" href="#/" aria-label="Back to the top"><img src="img/astros.png" alt=""></a>
      <span class="mock-badge">Draft ${S.draft.n}</span>
      <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-main">${S.sections.map(x => `<li><a href="#/${x.id}">${x.nav}</a></li>`).join('')}</ul>
      <a class="pill sm nav-cta" href="#/start">Start your group outing</a>`;
    $('.burger').addEventListener('click', e => {
      const open = document.body.classList.toggle('menu-open'); e.currentTarget.setAttribute('aria-expanded', open);
    });
  }

  // ---------- reusable blocks
  const sectionTitle = (t, sub) => `<h2 class="sec-title">${t}</h2>${sub ? `<p class="sec-sub">${sub}</p>` : ''}`;
  const inPractice = t => `<p class="in-practice"><span>In practice</span>${t}</p>`;

  function tile(x) {
    const tier = x.min ? tierAt(x.min) : null;
    return `<article class="tile${x.c ? ' c-' + x.c : ''}" data-c="${x.c || ''}" tabindex="0">
      <div class="tile-face" style="background-image:${bg(x)}"><h3>${x.t}</h3></div>
      <div class="tile-card"><h3>${x.t}</h3><hr><p>${x.d}</p>${tier ? `<p class="tile-meta">Unlocks at ${x.min}+ tickets · ${tier.name} tier</p>` : ''}</div>
    </article>`;
  }
  const grid = items => `<div class="tiles">${items.map(tile).join('')}</div>`;

  const head = (k, t, sub) => `<span class="idea-k">${k}</span>${sectionTitle(t, sub)}`;

  function dayBlock() {
    return `<section class="band" id="day"><div class="w">
      ${head('Visuals', 'A Day at the Park', 'What a group outing looks like, from the moment you arrive.')}
      <ol class="day">${S.day.map(([h, p, img], i) => `<li><div class="day-img" style="background-image:url('${img}')"><span class="num">${i + 1}</span></div><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
      <h3 class="sub-title">Moments for your group</h3>
      ${grid(S.experiences)}
      <p class="hint">Hover or tap a moment to see what it includes.</p>
      ${cta()}
    </div></section>`;
  }

  function tiersBlock() {
    return `<section class="band" id="tiers"><div class="w">
      ${head('Tiers & pricing', 'The More You Bring, The More You Get', S.pricing)}
      <div class="tier-steps">
        ${S.tiers.map((t, i) => `<div class="tier t-${t.key}" style="--h:${i}">
          <div class="tier-top"><div class="bases">${[0, 1, 2, 3].map(b => `<i class="${b <= i ? 'on' : ''}"></i>`).join('')}</div>
          <span class="tier-min">${t.min}+ tickets</span><h3>${t.name}</h3><p>${t.blurb}</p></div>
          <ul>${t.perks.map(p => `<li>${icon('check', 'ck')}${p}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <p class="hint">Group tiers are a GSCG proposal. Perks: To confirm with the Astros.</p>
      ${cta()}
    </div></section>`;
  }

  function seatingBlock() {
    return `<section class="band alt" id="seating"><div class="w">
      ${head('Seating', 'Find Your Group’s Seats', 'Tap any area of the ballpark to see who it is good for. Prices and availability: To confirm.')}
      <div class="seat-wrap"><div class="stadium" id="stadium"></div><aside class="seat-panel" id="seat-panel" aria-live="polite"></aside></div>
    </div></section>`;
  }
  function showZone(id) {
    const panel = $('#seat-panel'); if (!panel) return;
    if (!id) { panel.innerHTML = '<span class="idea-k">Seating</span><h3>Pick an area</h3><p>Tap any part of the ballpark to see who it is good for.</p>'; return; }
    const z = window.STADIUM_ZONES.find(z => z.id === id), info = S.seating.find(s => s.id === id) || {};
    panel.innerHTML = `<span class="idea-k"><i class="sw" style="background:${z.color}"></i>Seating area</span><h3>${z.name}</h3>
      <dl><dt>Good for</dt><dd>${info.good || 'To confirm'}</dd><dt>From</dt><dd class="tbc">To confirm</dd></dl>${pill('Start your group outing', '#/start')}`;
  }

  const cta = () => `<div class="sec-cta">${pill('Start your group outing', '#/start')}</div>`;

  function everyBlock() {
    return `<section class="band alt" id="every"><div class="w">
      ${head('For every kind of group', 'Something for Every Group', 'Whatever brings your group together, there is a way to make it a day at the ballpark.')}
      <div class="every">${S.every.map(x => `<article class="ev"><div class="ev-img" style="background-image:url('${x.img}')"></div><div class="ev-body"><h3>${x.t}</h3><p>${x.d}</p></div></article>`).join('')}</div>
      ${cta()}
    </div></section>`;
  }

  function scheduleBlock() {
    return `<section class="band" id="schedule"><div class="w">
      ${head('Schedule', 'Pick Your Date', 'The 2027 season, with theme nights any group can join. Game dates and theme night dates: To confirm.')}
      <div class="months">${S.schedule.map(m => `<div class="month"><b>${m}</b><span>Games and theme nights coming soon</span></div>`).join('')}</div>
      <h3 class="sub-title">Theme nights</h3>
      ${grid(S.themeNights)}
      <p class="hint">Hover or tap a theme night to see what it includes.</p>
      ${cta()}
    </div></section>`;
  }

  function startBlock() {
    return `<section class="band start" id="start"><div class="w">
      <div class="start-grid"><div>${head('Interest form', 'Start Your Group Outing', 'Tell us about your group and a group sales rep will follow up to get the ball rolling.')}</div>
      <form class="iform" novalidate>${S.formFields.map(q => `<label>${q}<input type="${/email/i.test(q) ? 'email' : /size/i.test(q) ? 'number' : 'text'}"></label>`).join('')}
        <div class="form-foot"><button class="pill" type="submit">Send</button><span class="note">Demo form: nothing is collected or sent.</span></div></form></div>
    </div></section>`;
  }

  function contactBlock() {
    return `<section class="band" id="contact"><div class="w">
      ${head('Contact', 'Questions? Talk to Us')}
      <div class="contacts narrow-c">${S.contact.map(([h, p]) => `<div class="contact"><h3>${h}</h3><p>${p.replace(/(To (confirm|add)[^.]*\.)/g, '<span class="tbc">$1</span>')}</p></div>`).join('')}</div>
    </div></section>`;
  }

  // ---------- pages
  function groupPage() {
    app.innerHTML = `<div class="dark">
      <section class="hero" style="background-image:${bg(S.hero, 2208)}"><div class="w">
        <span class="hero-k">${S.hero.kicker}</span>
        <h1>${S.hero.title.join('<br>')}</h1><p>${S.hero.text}</p>
        <div class="hero-btns">${pill('Start Your Group Outing', '#/start')}${pill('Explore Seating', '#/seating', 'ghost')}</div>
        <p class="draft-note">Draft ${S.draft.n} · updated ${S.draft.date}</p>
      </div></section>
      ${dayBlock()}${everyBlock()}${tiersBlock()}${seatingBlock()}${scheduleBlock()}${startBlock()}${contactBlock()}
    </div>`;
    if (window.renderStadium) { window.renderStadium($('#stadium'), { onSelect: showZone }); showZone(null); }
    $('.iform').addEventListener('submit', e => { e.preventDefault(); e.target.querySelector('.note').textContent = 'Demo only: nothing was sent.'; });
  }

  function credits() {
    fetch('img/credits.json').then(r => r.json()).then(c => {
      app.innerHTML = `<div class="dark"><section class="band"><div class="w narrow">
        ${sectionTitle('Photo Credits')}
        <p class="credits-lead">Photos of Daikin Park and Astros group outings are from the Houston Astros’ own pages on mlb.com and remain the property of the Houston Astros and MLB. Community photos marked Unsplash are used under the Unsplash License. Other photos are from Wikimedia Commons under the licenses below. The Astros logo is a trademark of the Houston Astros and is used here only to illustrate a student concept.</p>
        <ul class="credits">${S.unsplash.map(([t, p]) => `<li>${extLink(t, 'https://unsplash.com/photos/' + p, 'u')} · Unsplash License</li>`).join('')}${Object.values(c).filter((v, i, a) => a.findIndex(x => x.file === v.file) === i).map(v => `<li>${extLink(esc(v.file.replace('File:', '')), v.page, 'u')} · ${esc(v.artist || 'Unknown')} · ${esc(v.license)}</li>`).join('')}</ul>
      </div></section></div>`;
    });
  }

  // ---------- router
  function route() {
    const page = location.hash.replace(/^#\/?/, '').split('/')[0];
    document.body.classList.remove('menu-open');
    if (page === 'start' || S.sections.some(x => x.id === page)) {
      if (!$('#day')) groupPage();
      setTimeout(() => {
        const el = $('#' + page); if (!el) return;
        const top = el.getBoundingClientRect().top + scrollY - 60;
        window.scrollTo({ top, behavior: Math.abs(top - scrollY) > 2500 ? 'auto' : 'smooth' });
      }, 30);
      return;
    }
    if (page === 'credits') credits();
    else groupPage();
    window.scrollTo(0, 0);
  }

  // ---------- interactions (delegated, so they survive re-renders)
  document.addEventListener('click', e => {
    // same-hash links don't fire hashchange, so route manually
    const same = e.target.closest('a[href^="#/"]');
    if (same && same.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
    const chip = e.target.closest('.chips button');
    if (chip) {
      chip.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === chip));
      document.querySelectorAll('#nights .tile').forEach(t => { t.hidden = chip.dataset.c !== 'all' && t.dataset.c !== chip.dataset.c; });
    }
    const lang = e.target.closest('.lang button');
    if (lang) {
      lang.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === lang));
      document.querySelectorAll('.post p').forEach(p => { p.textContent = p.dataset[lang.dataset.lang]; });
    }
    const cp = e.target.closest('[data-copy]');
    if (cp) { navigator.clipboard?.writeText(cp.dataset.copy).catch(() => {}); toast('Copied to clipboard'); }
    const tl = e.target.closest('.tile');
    if (tl && matchMedia('(hover: none)').matches) tl.classList.toggle('flip');
    if (e.target.closest('.nav-main a')) document.body.classList.remove('menu-open');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList?.contains('tile')) e.target.classList.toggle('flip'); });

  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }

  header();
  window.addEventListener('hashchange', route);
  route();
})();
