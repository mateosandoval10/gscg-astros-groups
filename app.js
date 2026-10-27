(function () {
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const app = $('#app');

  const ICON = {
    seat: '<path d="M7 18v-6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6M5 18h14M7 22v-4M17 22v-4M9 9V5a3 3 0 0 1 6 0v4"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    rep: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6M17 4l2-2M19 7h2"/>',
    star: '<path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
    board: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4M7 8h4M7 11h7"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    faith: '<path d="M12 3v18M7 8h10"/>',
    hispanic: '<path d="M4 10h16M4 14h16"/><circle cx="12" cy="12" r="9"/>',
    youth: '<circle cx="12" cy="12" r="9"/><path d="M5.5 6.5c3 2 3 9 0 11M18.5 6.5c-3 2-3 9 0 11"/>',
    schools: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
    nonprofits: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    corporate: '<rect x="4" y="7" width="16" height="13" rx="1"/><path d="M9 7V4h6v3M4 12h16"/>',
  };
  const icon = (k, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  const pill = (label, href, cls = '') => `<a class="pill ${cls}" href="${href}">${label}</a>`;
  const extLink = (label, href, cls = '') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${label}</a>`;

  // ---------- header
  function header() {
    const tix = S.tickets.map(t => {
      const href = t.internal || (t.external ? t.url : '#/tickets/' + t.slug);
      return `<li><a href="${href}" ${t.external ? 'target="_blank" rel="noopener"' : ''}>${t.t}</a></li>`;
    }).join('');
    $('#nav').innerHTML = `
      <a class="logo" href="#/" aria-label="Astros group tickets home"><img src="img/astros.png" alt=""></a>
      <button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-main">
        ${S.topNav.map(([l, u]) => u ? `<li>${extLink(l, u)}</li>` :
          `<li class="has-dd on"><a href="#/tickets">${l}</a><div class="dd"><ul>${tix}</ul></div></li>`).join('')}
      </ul>
      <div class="nav-right"><a href="#/hub">Group Leader Hub</a><a class="nav-cta" href="#/connect">Book a Group</a></div>`;
    $('.burger').addEventListener('click', e => {
      const open = document.body.classList.toggle('menu-open'); e.currentTarget.setAttribute('aria-expanded', open);
    });
  }

  // ---------- reusable blocks
  const sectionTitle = (t, sub) => `<h2 class="sec-title">${t}</h2>${sub ? `<p class="sec-sub">${sub}</p>` : ''}`;
  function tile(x, kind) {
    const meta = [x.min ? `Minimum purchase: ${x.min} tickets` : '', x.max ? `Maximum: ${x.max} participant${x.max > 1 ? 's' : ''}` : '', x.note || ''].filter(Boolean);
    const cta = kind === 'perf' ? 'Request Performance' : kind === 'night' ? 'Request This Night' : 'Request Experience';
    return `<article class="tile${x.c ? ' c-' + x.c : ''}" data-c="${x.c || ''}" tabindex="0">
      <div class="tile-face" style="background-image:url('${x.img}')"><h3>${x.t}</h3>${x.c ? `<span class="tile-tag">${S.communities[x.c]}</span>` : ''}</div>
      <div class="tile-card"><h3>${x.t}</h3><hr><p>${x.d}</p>${meta.map(m => `<p class="tile-meta">${m}</p>`).join('')}
        <a class="pill dark sm" href="#/connect" data-prefill="${esc(x.t)}">${cta}</a></div>
    </article>`;
  }
  const grid = (items, kind) => `<div class="tiles">${items.map(x => tile(x, kind)).join('')}</div>`;
  const reqBtn = `<div class="center">${pill('Request More Information', '#/connect')}</div>`;

  function tiersBlock() {
    return `<section class="band alt" id="tiers"><div class="w">
      ${sectionTitle('Group Tiers', 'The bigger the group, the bigger the experience. Every group starts at first base, and every tier adds more.')}
      <div class="tier-steps">
        ${S.tiers.map((t, i) => `<div class="tier t-${t.key}" style="--h:${i}">
          <div class="tier-top"><div class="bases">${[0, 1, 2, 3].map(b => `<i class="${b <= i ? 'on' : ''}"></i>`).join('')}</div>
          <span class="tier-min">${t.min}+ tickets</span><h3>${t.name}</h3><p>${t.blurb}</p></div>
          <ul>${t.perks.map(p => `<li>${icon('check', 'ck')}${p}</li>`).join('')}</ul>
        </div>`).join('')}
      </div>
      <div class="tier-table-wrap"><table class="tier-table">
        <thead><tr><th>What your group gets</th>${S.tiers.map(t => `<th>${t.name}<small>${t.min}+</small></th>`).join('')}</tr></thead>
        <tbody>${S.tierMatrix.map(r => `<tr><td>${r[0]}</td>${r.slice(1).map(v => `<td>${v ? icon('check', 'ck') : '<span class="no">–</span>'}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
      ${reqBtn}
    </div></section>`;
  }

  function nightsBlock() {
    return `<section class="band alt" id="nights"><div class="w">
      <div class="badge-star">${icon('star')}</div>
      ${sectionTitle('Specialty Group Nights', 'Nights built around the communities that make Houston. Pick yours to see the nights made for your group.')}
      <div class="chips" role="toolbar">${[['all', 'All Nights'], ...Object.entries(S.communities)].map(([k, l], i) => `<button data-c="${k}" class="${i ? '' : 'on'}">${l}</button>`).join('')}</div>
      ${grid(S.nights, 'night')}
      ${reqBtn}
    </div></section>`;
  }

  function advantage() {
    const A = S.advantage;
    return `<section class="band" id="advantage"><div class="w narrow">
      ${sectionTitle('Astros Community Advantage')}
      <h4 class="adv-h">${icon('plus', 'circ')} Free to Join</h4><p class="adv-lead">${A.lead}</p>
      <h4 class="adv-h">${icon('plus', 'circ')} Why Choose Community Advantage?</h4>
      <div class="adv-list">${A.why.map(([b, t]) => `<p><b>${b}:</b> ${t}</p>`).join('')}</div>
      <h4 class="adv-h">${icon('plus', 'circ')} Ready to Raise More for Your Cause?</h4><p class="adv-lead">${A.ready}</p>
      ${reqBtn}
    </div></section>`;
  }

  function clubs() {
    return `<section class="band" id="premium"><div class="w">
      ${sectionTitle('Premium Groups & Club Spaces', 'Unlock premium group benefits and access to exclusive club spaces with upgraded food and drink when purchasing six or more tickets. These seats are among the best at Daikin Park.')}
      <div class="clubs">${S.clubs.map(c => `<a class="club" href="https://www.mlb.com/astros/tickets/premium/suites" target="_blank" rel="noopener" style="background-image:url('${c.img}')">
        ${icon('ext', 'club-ext')}<span>${c.t}</span></a>`).join('')}</div>
      <p class="center small">View all of our premium spaces ${extLink('here', 'https://www.mlb.com/astros/tickets/premium/suites', 'u')}.</p>
      ${reqBtn}
    </div></section>`;
  }

  function offers() {
    return `<section class="band alt" id="offers"><div class="w">
      ${sectionTitle('Special Ticket Offers')}
      <div class="offers">${S.offers.map(o => `<div class="offer"><h3>${o.t}</h3><p>${o.d}</p>${pill(o.cta, '#/connect', 'sm')}</div>`).join('')}</div>
    </div></section>`;
  }

  function team() {
    return `<section class="band" id="team"><div class="w">
      ${sectionTitle('Meet the Team', 'Every type of group has its own specialist, so you always talk to someone who knows your world.')}
      <div class="team">${S.team.map(m => `<div class="member">
        <div class="avatar">${icon(m.i)}</div>
        <b class="m-name">Group Specialist</b><span class="m-role">${m.role}</span><span class="m-who">${m.who}</span>
        <a href="tel:7132598030">${S.phone}</a>
        <a class="m-req" href="#/connect" data-prefill-team="${esc(m.role)}">Request this specialist</a>
      </div>`).join('')}</div>
    </div></section>`;
  }

  function connect() {
    const exps = [...S.experiences, ...S.nights, ...S.performances, ...S.hospitality].map(x => x.t);
    return `<section class="band alt" id="connect"><div class="w narrow">
      ${sectionTitle('Connect With Us', 'Fill out the group experience request form below, and one of our Group Specialists will be in touch.')}
      <form class="form" novalidate>
        <label>First name<input name="first" autocomplete="off"></label>
        <label>Last name<input name="last" autocomplete="off"></label>
        <label>Organization<input name="org" autocomplete="off"></label>
        <label>Type of group<select name="type"><option value="">Select</option>${Object.values(S.communities).map(c => `<option>${c}</option>`).join('')}<option>Corporate</option><option>Other</option></select></label>
        <label>Estimated group size<select name="size"><option value="">Select</option>${S.tiers.map(t => `<option>${t.min}+ (${t.name})</option>`).join('')}</select></label>
        <label>Preferred month<select name="month"><option value="">Select</option>${['March', 'April', 'May', 'June', 'July', 'August', 'September'].map(m => `<option>${m}</option>`).join('')}</select></label>
        <label class="full">Interested in<select name="exp"><option value="">Select an experience, night or seats</option>${exps.map(e => `<option>${esc(e)}</option>`).join('')}</select></label>
        <label class="full">Tell us about your group<textarea name="msg" rows="4"></textarea></label>
        <p class="full form-note">Concept demo: this form doesn’t send or store anything.</p>
        <div class="full center"><button class="pill" type="submit">Submit Request</button></div>
      </form>
    </div></section>`;
  }

  function faq() {
    return `<section class="band" id="faq"><div class="w narrow">
      ${sectionTitle('Frequently Asked Questions')}
      <div class="faq">${S.faq.map(([q, a]) => `<details><summary>${q}${icon('plus', 'fq')}</summary><p>${a}</p></details>`).join('')}</div>
    </div></section>`;
  }

  // ---------- pages
  function groupPage() {
    const B = S.benefits;
    app.innerHTML = `<div class="dark">
      <section class="hero" style="background-image:url('${S.hero.img}')"><div class="w">
        <h1>${S.hero.title.join('<br>')}</h1><p>${S.hero.text}</p>
        <div class="hero-btns">${pill('Request More Information', '#/connect')}${pill('Frequently Asked Questions', '#/faq')}${pill('Visit Group Leader Hub', '#/hub')}</div>
      </div></section>

      <section class="band" id="benefits"><div class="w">
        ${sectionTitle('Group Benefits')}
        <div class="benefits">${B.map(([i, t, d]) => `<div class="benefit"><span class="bx">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>
      </div></section>

      ${tiersBlock()}

      <section class="band" id="experiences"><div class="w">
        ${sectionTitle('Fan Experiences')}
        ${grid(S.experiences)}
        ${reqBtn}
      </div></section>

      ${nightsBlock()}

      <section class="band" id="performances"><div class="w">
        ${sectionTitle('Performances')}
        ${grid(S.performances, 'perf')}
        ${reqBtn}
      </div></section>

      <section class="band alt" id="hospitality"><div class="w">
        ${sectionTitle('Corporate & Hospitality')}
        ${grid(S.hospitality)}
        ${reqBtn}
      </div></section>

      ${advantage()}

      <section class="band alt" id="seating"><div class="w">
        ${sectionTitle('Group Seating Locations', 'Groups can be seated anywhere in the ballpark, but the highlighted sections offer the greatest availability. Filter by your type of group, or click a section for details.')}
        <div id="map"></div>
        <div class="center">${pill('Open Full Seating Map', '#/seating-map')}</div>
      </div></section>

      ${clubs()}${offers()}${team()}${connect()}${faq()}
    </div>`;
    SeatMap($('#map'));
  }

  function mlbShell(title, active, body) {
    return `<div class="mlb"><div class="mlb-inner">
      <h1 class="mlb-title">${title}</h1>
      <div class="mlb-bar"><a href="#/connect">${icon('star', 'mi')}Request Info</a><a href="#/connect">${icon('board', 'mi')}Email Group Tickets</a><a href="tel:7132598030">${icon('rep', 'mi')}Call Group Ticket Sales – ${S.phone}</a></div>
      <div class="mlb-cols"><div class="mlb-main">${body}</div>
        <aside class="mlb-side"><h3><a href="#/tickets">Inside Astros Tickets »</a></h3><ul>
          ${S.tickets.map(t => { const href = t.internal || (t.external ? t.url : '#/tickets/' + t.slug);
            return `<li class="${t.slug === active ? 'on' : ''}"><a href="${href}" ${t.external ? 'target="_blank" rel="noopener"' : ''}>${t.t}${t.external ? icon('ext', 'mx') : ''}</a></li>`; }).join('')}
        </ul></aside></div>
    </div></div>`;
  }

  function ticketsIndex() {
    app.innerHTML = mlbShell('Inside Astros Tickets', '', `<p class="mlb-lead">Every way to get to Daikin Park, with the group program at the center.</p>
      <div class="mlb-cards">${S.tickets.map(t => { const href = t.internal || (t.external ? t.url : '#/tickets/' + t.slug);
        const img = t.img || (t.slug === 'group-tickets' ? 'img/hero.jpg' : t.slug === 'seating-map' ? 'img/stadium.jpg' : 'img/roof.jpg');
        return `<a class="mlb-card" href="${href}" ${t.external ? 'target="_blank" rel="noopener"' : ''}><span style="background-image:url('${img}')"></span><b>${t.t}${t.external ? icon('ext', 'mx') : ''}</b></a>`; }).join('')}</div>`);
  }

  function ticketPage(slug) {
    const t = S.tickets.find(x => x.slug === slug);
    if (!t || !t.d) return groupPage();
    app.innerHTML = mlbShell(`Houston Astros ${t.t}`, slug, `
      <div class="mlb-hero" style="background-image:url('${t.img}')"></div>
      <p class="mlb-lead">${t.d}</p>
      <div class="group-angle"><span>Group angle</span><p>${t.group}</p>${pill('Explore Group Tickets', '#/', 'sm')}</div>
      <p>${extLink(`See ${t.t} on astros.com ${icon('ext', 'mx')}`, t.url, 'u')}</p>`);
  }

  function mapPage() {
    app.innerHTML = mlbShell('Daikin Park Seating Map', 'seating-map', `<p class="mlb-lead">Explore Daikin Park by section. Filter by your type of group to see the seats that fit best, then request them in one click.</p><div class="map-light" id="map"></div>`);
    SeatMap($('#map'));
  }

  function hubPage() {
    const steps = [
      ['Pick your game & experience', 'Choose a date, a specialty night or a fan experience. Not sure? Your specialist will suggest a few that fit your group.'],
      ['Get your group link', 'We set up a personal group page and link for your organization, with your seats held together.'],
      ['Share it with your group', 'Send the link by email, text, bulletin or newsletter. Each member buys their own seats.'],
      ['Watch your group grow', 'Track sales in real time and see how close you are to the next tier.'],
      ['Enjoy game day', 'Arrive early for your experience, and look for your group’s name on the videoboard.'],
    ];
    const tierAt = n => [...S.tiers].reverse().find(t => n >= t.min) || S.tiers[0];
    const sold = 128, next = S.tiers.find(t => t.min > sold);
    app.innerHTML = `<div class="dark">
      <section class="hero hub-hero" style="background-image:url('img/stadium.jpg')"><div class="w">
        <h1>Group Leader<br>Hub</h1><p>Everything you need to plan, share and grow your group outing, all in one place. No spreadsheets and no collecting cash.</p>
        <div class="hero-btns">${pill('Start Planning', '#/connect')}${pill('Back to Group Tickets', '#/')}</div>
      </div></section>
      <section class="band"><div class="w">
        ${sectionTitle('How It Works')}
        <ol class="steps">${steps.map(([h, p], i) => `<li><span class="num">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
      </div></section>
      <section class="band alt"><div class="w">
        ${sectionTitle('Your Group Page', 'This is what a group leader sees after their link goes live.')}
        <div class="gp">
          <div class="gp-head"><div><span class="eyebrow">Sample group</span><h3>Grace Community Church · Faith & Family Feast Night</h3></div><span class="gp-tier">${tierAt(sold).name} tier</span></div>
          <div class="gp-bar"><div style="width:${Math.min(100, sold / 300 * 100)}%"></div>${S.tiers.map(t => `<i style="left:${t.min / 300 * 100}%"><b>${t.name}</b></i>`).join('')}</div>
          <div class="gp-stats"><div><b>${sold}</b><span>tickets sold</span></div><div><b>${next ? next.min - sold : 0}</b><span>to reach ${next ? next.name : 'the top'}</span></div><div><b>14</b><span>days to game</span></div></div>
          <div class="gp-link"><span>astros.com/groups/grace-community</span><button class="pill sm dark" data-copy="astros.com/groups/grace-community">Copy Link</button></div>
          <p class="gp-unlock">${next ? `<b>${next.min - sold} more tickets</b> unlocks ${next.perks[next.perks.length - 1].toLowerCase()}.` : ''}</p>
        </div>
      </div></section>
      <section class="band"><div class="w">
        ${sectionTitle('Ready-to-Send Messages', 'Copy, personalize and send. Every message includes your group link.')}
        <div class="tmpl">
          ${[['Email', 'Join us at Daikin Park!', 'Hi everyone,\n\nWe’re heading to an Astros game together on [date] for [night]! Our group sits together, and we’ll be welcomed on the videoboard.\n\nGrab your tickets here: [group link]\n\nSee you at the ballpark!'],
            ['Text', null, 'We’re going to the Astros game on [date]! Sit with our group and get your tickets here: [group link]'],
            ['Bulletin', null, 'ASTROS FELLOWSHIP NIGHT · Join the [church name] family at Daikin Park on [date]. Get tickets at [group link].'],
            ['Español', null, '¡Vamos juntos al juego de los Astros el [fecha]! Compra tus boletos aquí: [enlace del grupo]']]
            .map(([k, subj, body]) => `<div class="tm"><div class="tm-h"><b>${k}</b><button class="pill sm" data-copy="${esc((subj ? 'Subject: ' + subj + '\n\n' : '') + body)}">Copy</button></div>${subj ? `<p class="tm-s">Subject: ${subj}</p>` : ''}<pre>${esc(body)}</pre></div>`).join('')}
        </div>
      </div></section>
      <section class="band alt"><div class="w">
        ${sectionTitle('Planning Timeline')}
        <div class="timeline">${[['8 weeks out', 'Pick a date and experience, and get your group link.'], ['6 weeks out', 'Announce it: email, bulletin, text and social.'], ['3 weeks out', 'Send a reminder. Your page shows who still needs tickets.'], ['1 week out', 'Confirm your experience details and arrival time.'], ['Game day', 'Arrive early, check in and enjoy your moment.']]
          .map(([w, d]) => `<div><b>${w}</b><p>${d}</p></div>`).join('')}</div>
        ${reqBtn}
      </div></section>
    </div>`;
  }

  function credits() {
    fetch('img/credits.json').then(r => r.json()).then(c => {
      app.innerHTML = mlbShell('Photo Credits', '', `<p class="mlb-lead">Photos are from Wikimedia Commons under the licenses below. The Astros logo is a trademark of the Houston Astros and is used here only to illustrate a student concept.</p>
        <ul class="credits">${Object.values(c).filter((v, i, a) => a.findIndex(x => x.file === v.file) === i).map(v => `<li>${extLink(esc(v.file.replace('File:', '')), v.page, 'u')} · ${esc(v.artist || 'Unknown')} · ${esc(v.license)}</li>`).join('')}</ul>`);
    });
  }

  // ---------- router
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    document.body.classList.remove('menu-open');
    const [page, arg] = h.split('/');
    const anchors = ['connect', 'faq', 'tiers', 'experiences', 'nights', 'seating', 'benefits', 'team', 'premium', 'offers', 'advantage', 'performances', 'hospitality'];
    if (anchors.includes(page)) {
      if (!$('#benefits')) groupPage();
      setTimeout(() => {
        const el = $('#' + page); if (!el) return;
        const top = el.getBoundingClientRect().top + scrollY - 70;
        window.scrollTo({ top, behavior: Math.abs(top - scrollY) > 2500 ? 'auto' : 'smooth' });
      }, 30);
      return;
    }
    if (page === 'tickets' && arg) ticketPage(arg);
    else if (page === 'tickets') ticketsIndex();
    else if (page === 'seating-map') mapPage();
    else if (page === 'hub') hubPage();
    else if (page === 'credits') credits();
    else groupPage();
    window.scrollTo(0, 0);
  }

  // ---------- interactions (delegated, so they survive re-renders)
  document.addEventListener('click', e => {
    // same-hash links (e.g. a second "Request" click) don't fire hashchange, so route manually
    const same = e.target.closest('a[href^="#/"]');
    if (same && same.getAttribute('href') === location.hash) { e.preventDefault(); route(); }
    const pre =e.target.closest('[data-prefill],[data-prefill-team]');
    if (pre) {
      const v = pre.dataset.prefill, team = pre.dataset.prefillTeam;
      setTimeout(() => {
        const f = $('#connect form'); if (!f) return;
        if (v) { const sel = f.exp; let o = [...sel.options].find(o => o.text === v); if (!o) { o = new Option(v, v); sel.add(o); } sel.value = o.value; }
        if (team) f.msg.value = `I’d like to talk with the ${team} specialist.`;
        f.first.focus({ preventScroll: true });
      }, 450);
    }
    const chip = e.target.closest('.chips button');
    if (chip) {
      chip.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === chip));
      document.querySelectorAll('#nights .tile').forEach(t => { t.hidden = chip.dataset.c !== 'all' && t.dataset.c !== chip.dataset.c; });
    }
    const cp = e.target.closest('[data-copy]');
    if (cp) { navigator.clipboard?.writeText(cp.dataset.copy).catch(() => {}); toast('Copied to clipboard'); }
    const tl = e.target.closest('.tile');
    if (tl && !e.target.closest('a') && matchMedia('(hover: none)').matches) tl.classList.toggle('flip');
    if (e.target.closest('.nav-main a, .nav-right a')) document.body.classList.remove('menu-open');
  });
  document.addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast('Concept demo: nothing was sent or stored.'); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList?.contains('tile')) e.target.classList.toggle('flip'); });

  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600); }

  // help widget (canned answers from the FAQ, like a group-sales chatbot)
  function helpWidget() {
    const w = $('#help');
    w.innerHTML = `<button class="help-btn" aria-expanded="false">Need help? <b>Ask us</b></button>
      <div class="help-panel" hidden><div class="help-h">Group Tickets Help<button aria-label="Close">×</button></div>
      <div class="help-body"><p class="bot">Hi! I can answer common group questions. Pick one below.</p></div>
      <div class="help-q">${S.faq.slice(0, 5).map(([q], i) => `<button data-i="${i}">${q}</button>`).join('')}</div></div>`;
    const panel = $('.help-panel', w), body = $('.help-body', w), btn = $('.help-btn', w);
    const set = o => { panel.hidden = !o; btn.setAttribute('aria-expanded', o); };
    btn.onclick = () => set(panel.hidden);
    $('.help-h button', w).onclick = () => set(false);
    $('.help-q', w).onclick = e => { const b = e.target.closest('button'); if (!b) return; const [q, a] = S.faq[b.dataset.i];
      body.insertAdjacentHTML('beforeend', `<p class="me">${q}</p><p class="bot">${a}</p>`); body.scrollTop = body.scrollHeight; };
  }

  header(); helpWidget();
  window.addEventListener('hashchange', route);
  route();
})();
