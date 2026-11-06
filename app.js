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
  const who = c => c === 'all' ? 'Every group' : S.communities[c];

  // ---------- header
  function header() {
    $('#nav').innerHTML = `
      <a class="logo" href="#/" aria-label="Back to the top"><img src="img/astros.png" alt=""></a>
      <span class="mock-badge">Mock-up</span>
      <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-main">${S.ideas.map((x, i) => `<li><a href="#/${x.id}"><i>${i + 1}</i>${x.nav}</a></li>`).join('')}</ul>`;
    $('.burger').addEventListener('click', e => {
      const open = document.body.classList.toggle('menu-open'); e.currentTarget.setAttribute('aria-expanded', open);
    });
  }

  // ---------- reusable blocks
  const sectionTitle = (t, sub) => `<h2 class="sec-title">${t}</h2>${sub ? `<p class="sec-sub">${sub}</p>` : ''}`;
  // Every idea section opens with its number, audience, and the idea in one line plus why it works.
  function ideaHead(id) {
    const i = S.ideas.findIndex(x => x.id === id), x = S.ideas[i];
    return `<div class="idea-head">
      <span class="idea-k c-${x.c}">Idea ${String(i + 1).padStart(2, '0')} · ${who(x.c)}</span>
      <h2 class="sec-title">${x.t}</h2>
      <div class="idea-why"><div><b>The idea</b><p>${x.what}</p></div><div><b>Why it works</b><p>${x.why}</p></div></div>
    </div>`;
  }
  const inPractice = t => `<p class="in-practice"><span>In practice</span>${t}</p>`;

  function tile(x) {
    const tier = x.min ? tierAt(x.min) : null;
    return `<article class="tile${x.c ? ' c-' + x.c : ''}" data-c="${x.c || ''}" tabindex="0">
      <div class="tile-face" style="background-image:${bg(x)}"><h3>${x.t}</h3>${x.c ? `<span class="tile-tag">${S.communities[x.c]}</span>` : ''}</div>
      <div class="tile-card"><h3>${x.t}</h3><hr><p>${x.d}</p>${tier ? `<p class="tile-meta">Unlocks at ${x.min}+ tickets · ${tier.name} tier</p>` : ''}</div>
    </article>`;
  }
  const grid = items => `<div class="tiles">${items.map(tile).join('')}</div>`;

  function overview() {
    return `<section class="band" id="ideas"><div class="w">
      ${sectionTitle('The Ideas, In Practice', 'Eight ideas from our research, each shown as a group leader would see it. Click any idea to jump to it.')}
      <div class="ov">${S.ideas.map((x, i) => `<a class="ov-card c-${x.c}" href="#/${x.id}">
        <span class="ov-n">${String(i + 1).padStart(2, '0')}</span><span class="ov-who">${who(x.c)}</span>
        <b>${x.t}</b><p>${x.what}</p><span class="ov-go">See it ${icon('arrow', 'ar')}</span></a>`).join('')}</div>
    </div></section>`;
  }

  function tiersBlock() {
    return `<section class="band alt" id="tiers"><div class="w">
      ${ideaHead('tiers')}
      <div class="tier-steps">
        ${S.tiers.map((t, i) => `<div class="tier t-${t.key}" style="--h:${i}">
          <div class="tier-top"><div class="bases">${[0, 1, 2, 3].map(b => `<i class="${b <= i ? 'on' : ''}"></i>`).join('')}</div>
          <span class="tier-min">${t.min}+ tickets</span><h3>${t.name}</h3><p>${t.blurb}</p></div>
          <ul>${t.perks.map(p => `<li>${icon('check', 'ck')}${p}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      ${inPractice('A youth league with 40 players sees that 10 more tickets moves them to Double, which adds a fundraising return. That’s the nudge to invite siblings and grandparents.')}
    </div></section>`;
  }

  function nightsBlock() {
    return `<section class="band" id="nights"><div class="w">
      ${ideaHead('nights')}
      <div class="chips" role="toolbar">${[['all', 'All Nights'], ...Object.entries(S.communities)].map(([k, l], i) => `<button data-c="${k}" class="${i ? '' : 'on'}">${l}</button>`).join('')}</div>
      ${grid(S.nights)}
      <p class="hint">Hover or tap a night to see what it includes.</p>
    </div></section>`;
  }

  function fundraisingBlock() {
    const F = S.fundraising;
    return `<section class="band alt" id="fundraising"><div class="w">
      ${ideaHead('fundraising')}
      <div class="calc">
        <div class="calc-in">
          <label>School or organization<input id="f-org" value="Lincoln Elementary" maxlength="40" autocomplete="off"></label>
          <label>Tickets sold through your link <output id="f-n">${F.start}</output><input id="f-range" type="range" min="${F.min}" max="${F.max}" step="5" value="${F.start}"></label>
          <p class="calc-note">Assumes a $${F.price} group ticket, with $${F.back} of every $${F.price} going back to the school. Nothing you type here is sent or stored.</p>
        </div>
        <div class="calc-out">
          <span class="eyebrow">Raised for your school</span>
          <b id="f-raised" class="big"></b>
          <div class="calc-row"><span>Tier reached</span><b id="f-tier"></b></div>
          <div class="calc-row"><span>Your custom link</span><b id="f-link" class="mono"></b></div>
          <p id="f-next" class="calc-next"></p>
        </div>
      </div>
    </div></section>`;
  }
  function updateCalc() {
    const r = $('#f-range'); if (!r) return;
    const F = S.fundraising, n = +r.value, t = tierAt(n), nx = S.tiers.find(x => x.min > n);
    const slug = ($('#f-org').value.trim() || 'your-school').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    $('#f-n').textContent = n;
    $('#f-raised').textContent = money(n * F.back);
    $('#f-tier').textContent = t.name;
    $('#f-link').textContent = 'astros.com/groups/' + slug;
    $('#f-next').innerHTML = nx ? `<b>${nx.min - n} more tickets</b> reaches ${nx.name}: ${nx.perks[nx.perks.length - 1].toLowerCase()}.` : 'Top tier reached: your school gets its own night.';
  }

  function fieldTripBlock() {
    const T = S.fieldTrip;
    return `<section class="band" id="field-trips"><div class="w">
      ${ideaHead('field-trips')}
      <div class="ft">
        <div class="ft-photos"><span style="background-image:${bg({ img: 'img/g-train.jpg', ast: 'z5lzrwl0w55wkp1jflmt' })}"></span><span style="background-image:${bg({ img: 'img/n-stem.jpg', ast: 'rwavfry1jjxkcm8pqf7c' })}"></span></div>
        <div>
          <span class="eyebrow">A sample school day</span>
          <ol class="ft-day">${T.day.map(([h, t, d]) => `<li><time>${h}</time><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol>
          <div class="proof"><b>${T.proof[0]}</b><p>${T.proof[1]}. ${extLink(`Source ${icon('ext', 'mx')}`, T.proof[2], 'u')}</p></div>
        </div>
      </div>
    </div></section>`;
  }

  function espanolBlock() {
    return `<section class="band alt" id="espanol"><div class="w">
      ${ideaHead('espanol')}
      <div class="lang" role="tablist"><button data-lang="es" class="on">Español</button><button data-lang="en">English</button></div>
      <div class="posts">${S.espanol.map(p => `<article class="post">
        <div class="post-h"><img src="img/astros.png" alt=""><div><b>Astros en Español</b><span>Concept channel</span></div></div>
        <span class="post-k">${p.k}</span><p data-es="${esc(p.es)}" data-en="${esc(p.en)}">${p.es}</p>
      </article>`).join('')}</div>
      ${inPractice('The same group invite goes out in both languages, and the Hispanic Community nights get promoted all season, not just during heritage weekend.')}
    </div></section>`;
  }

  function charityBlock() {
    return `<section class="band" id="charity"><div class="w">
      ${ideaHead('charity')}
      <div class="cd">
        <ol class="cd-steps">${S.charity.map(([h, p], i) => `<li><span class="num">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
        <div class="coupon"><span>Charity Drive Night</span><b>$1 OFF</b><em>one hot dog</em><small>Thanks for your donation to tonight’s partner nonprofit</small></div>
      </div>
    </div></section>`;
  }

  function experiencesBlock() {
    return `<section class="band alt" id="experiences"><div class="w">
      ${ideaHead('experiences')}
      ${grid(S.experiences)}
      <p class="hint">Each experience unlocks at a tier, so the tiers and the experiences sell each other.</p>
    </div></section>`;
  }

  function outreachBlock() {
    const sold = 128, next = S.tiers.find(t => t.min > sold);
    return `<section class="band" id="outreach"><div class="w">
      ${ideaHead('outreach')}
      <div class="gp">
        <div class="gp-head"><div><span class="eyebrow">Sample group page</span><h3>Grace Community Church · Faith & Family Feast Night</h3></div><span class="gp-tier">${tierAt(sold).name} tier</span></div>
        <div class="gp-bar"><div style="width:${Math.min(100, sold / 300 * 100)}%"></div>${S.tiers.map(t => `<i style="left:${t.min / 300 * 100}%"><b>${t.name}</b></i>`).join('')}</div>
        <div class="gp-stats"><div><b>${sold}</b><span>tickets sold</span></div><div><b>${next.min - sold}</b><span>to reach ${next.name}</span></div><div><b>14</b><span>days to game</span></div></div>
        <div class="gp-link"><span>astros.com/groups/grace-community</span><button class="pill sm dark" data-copy="astros.com/groups/grace-community">Copy Link</button></div>
      </div>
      <div class="center hub-cta">${pill('See the full Group Leader Hub', '#/hub')}</div>
    </div></section>`;
  }

  function nextBlock() {
    return `<section class="band next" id="next"><div class="w narrow center">
      <span class="eyebrow">Coming in the second half</span>
      <h2 class="sec-title">From Mock-up to Final Deliverable</h2>
      <p class="sec-sub">This page is one idea of what the finished product could look like. Next, we’ll build the pieces that bring groups to it.</p>
      <ul class="next-list">${S.next.map(n => `<li>${icon('check', 'ck')}${n}</li>`).join('')}</ul>
      <p class="ask">Which of these ideas resonate most with your team?</p>
    </div></section>`;
  }

  // ---------- pages
  function groupPage() {
    app.innerHTML = `<div class="dark">
      <section class="hero" style="background-image:${bg(S.hero, 2208)}"><div class="w">
        <span class="hero-k">${S.hero.kicker}</span>
        <h1>${S.hero.title.join('<br>')}</h1><p>${S.hero.text}</p>
        <div class="hero-btns">${pill('Explore the Ideas', '#/ideas')}${pill('Group Leader Hub', '#/hub', 'ghost')}</div>
      </div></section>
      ${overview()}${tiersBlock()}${nightsBlock()}${fundraisingBlock()}${fieldTripBlock()}${espanolBlock()}${charityBlock()}${experiencesBlock()}${outreachBlock()}${nextBlock()}
    </div>`;
    updateCalc();
  }

  function hubPage() {
    const steps = [
      ['Pick your game & experience', 'Choose a date, a specialty night or a fan experience. Your rep suggests a few that fit your group.'],
      ['Get your group link', 'A personal group page and link for your organization, with your seats held together.'],
      ['Share it with your group', 'Send the link by email, text, bulletin or newsletter. Each member buys their own seats.'],
      ['Watch your group grow', 'Track sales in real time and see how close you are to the next tier.'],
      ['Enjoy game day', 'Arrive early for your experience, and look for your group’s name on the videoboard.'],
    ];
    app.innerHTML = `<div class="dark">
      <section class="hero hub-hero" style="background-image:${bg({ img: 'img/stadium.jpg', ast: 'bde3yis3xhggjjydt2qu' }, 2208)}"><div class="w">
        <span class="hero-k">Idea 08 · Mock-up</span>
        <h1>Group Leader<br>Hub</h1><p>Everything a group leader needs to plan, share and grow an outing, in one place. No spreadsheets and no collecting cash.</p>
        <div class="hero-btns">${pill('Back to the Ideas', '#/outreach')}</div>
      </div></section>
      <section class="band"><div class="w">
        ${sectionTitle('How It Works')}
        <ol class="steps">${steps.map(([h, p], i) => `<li><span class="num">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
      </div></section>
      <section class="band alt"><div class="w">
        ${sectionTitle('Ready-to-Send Messages', 'Copy, personalize and send. Every message includes the group link.')}
        <div class="tmpl">
          ${[['Email', 'Join us at Daikin Park!', 'Hi everyone,\n\nWe’re heading to an Astros game together on [date] for [night]! Our group sits together, and we’ll be welcomed on the videoboard.\n\nGrab your tickets here: [group link]\n\nSee you at the ballpark!'],
            ['Text', null, 'We’re going to the Astros game on [date]! Sit with our group and get your tickets here: [group link]'],
            ['Bulletin', null, 'ASTROS FELLOWSHIP NIGHT · Join the [church name] family at Daikin Park on [date]. Get tickets at [group link].'],
            ['Español', null, '¡Vamos juntos al juego de los Astros el [fecha]! Compra tus boletos aquí: [enlace del grupo]']]
            .map(([k, subj, body]) => `<div class="tm"><div class="tm-h"><b>${k}</b><button class="pill sm" data-copy="${esc((subj ? 'Subject: ' + subj + '\n\n' : '') + body)}">Copy</button></div>${subj ? `<p class="tm-s">Subject: ${subj}</p>` : ''}<pre>${esc(body)}</pre></div>`).join('')}
        </div>
      </div></section>
      <section class="band"><div class="w">
        ${sectionTitle('Planning Timeline')}
        <div class="timeline">${[['8 weeks out', 'Pick a date and experience, and get your group link.'], ['6 weeks out', 'Announce it: email, bulletin, text and social.'], ['3 weeks out', 'Send a reminder. Your page shows who still needs tickets.'], ['1 week out', 'Confirm your experience details and arrival time.'], ['Game day', 'Arrive early, check in and enjoy your moment.']]
          .map(([w, d]) => `<div><b>${w}</b><p>${d}</p></div>`).join('')}</div>
      </div></section>
    </div>`;
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
    if (page === 'ideas' || S.ideas.some(x => x.id === page)) {
      if (!$('#ideas')) groupPage();
      setTimeout(() => {
        const el = $('#' + page); if (!el) return;
        const top = el.getBoundingClientRect().top + scrollY - 60;
        window.scrollTo({ top, behavior: Math.abs(top - scrollY) > 2500 ? 'auto' : 'smooth' });
      }, 30);
      return;
    }
    if (page === 'hub') hubPage();
    else if (page === 'credits') credits();
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
  document.addEventListener('input', e => { if (e.target.closest('.calc')) updateCalc(); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList?.contains('tile')) e.target.classList.toggle('flip'); });

  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }

  header();
  window.addEventListener('hashchange', route);
  route();
})();
