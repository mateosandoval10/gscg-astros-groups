(function () {
  const S = window.SITE, app = document.getElementById('app');
  const ck = '<span class="ck"><svg width="11" height="11" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" stroke="#EB6E1F" stroke-width="3.5" fill="none"/></svg></span>';
  const ICONS = {
    users: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.5 1.5-4.5 4-4.5s3 1.5 3 4.5"/>',
    tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    screen: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5z"/>',
  };
  const svg = (k, c = '#EB6E1F', s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2">${ICONS[k]}</svg>`;

  const tabs = document.getElementById('tabs');
  tabs.innerHTML = S.demos.map(d => `<li><a href="#${d.id}" data-id="${d.id}">${d.tab}</a></li>`).join('');

  const strip = () => `<div class="strip"><div class="w">${S.benefits.map(([i, b, t]) => `<div class="it"><div class="ico">${svg(i)}</div><div><b>${b}</b><span>${t}</span></div></div>`).join('')}</div></div>`;

  const jersey = `<svg width="400" height="400" viewBox="0 0 420 420" style="position:relative">
    <defs><linearGradient id="cl" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E3E6EC"/></linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000" flood-opacity=".45"/></filter></defs>
    <path filter="url(#sh)" d="M150 48 C170 60 190 64 210 64 C230 64 250 60 270 48 L322 70 L392 128 L360 196 L318 176 L318 388 L102 388 L102 176 L60 196 L28 128 L98 70 Z" fill="url(#cl)"/>
    <path d="M150 48 C170 60 190 64 210 64 C230 64 250 60 270 48" fill="none" stroke="#002D62" stroke-width="9"/>
    <path d="M150 48 L210 112 L270 48" fill="none" stroke="#002D62" stroke-width="7"/>
    <path d="M210 112 L210 388" stroke="#002D62" stroke-width="5"/><path d="M216 112 L216 388" stroke="#EB6E1F" stroke-width="2"/>
    <g fill="#002D62"><circle cx="198" cy="140" r="4"/><circle cx="198" cy="196" r="4"/><circle cx="198" cy="252" r="4"/><circle cx="198" cy="308" r="4"/><circle cx="198" cy="364" r="4"/></g>
    <path d="M28 128 L60 196" stroke="#002D62" stroke-width="10"/><path d="M392 128 L360 196" stroke="#002D62" stroke-width="10"/>
    <path d="M44 156 L70 208" stroke="#EB6E1F" stroke-width="5"/><path d="M376 156 L350 208" stroke="#EB6E1F" stroke-width="5"/>
    <text x="210" y="208" text-anchor="middle" font-family="'Brush Script MT','Snell Roundhand',cursive" font-style="italic" font-size="68" fill="#002D62" stroke="#EB6E1F" stroke-width="1.6" paint-order="stroke" transform="rotate(-6 210 200)">Los Astros</text>
    <text x="146" y="300" text-anchor="middle" font-family="'Inter Tight'" font-weight="800" font-size="54" fill="#EB6E1F" stroke="#002D62" stroke-width="3" paint-order="stroke">2</text>
    <text x="264" y="300" text-anchor="middle" font-family="'Inter Tight'" font-weight="800" font-size="54" fill="#EB6E1F" stroke="#002D62" stroke-width="3" paint-order="stroke">7</text>
    <g transform="translate(345 112) rotate(14)"><circle r="22" fill="#002D62" stroke="#EB6E1F" stroke-width="3"/><path d="M0 -12 L3.5 -3.7 L12.4 -3.7 L5.2 1.6 L7.9 10.2 L0 5 L-7.9 10.2 L-5.2 1.6 L-12.4 -3.7 L-3.5 -3.7Z" fill="#EB6E1F"/></g></svg>`;

  function media(m) {
    if (m.jersey) return `<div class="jstage"><span class="lbl">Concept design</span>${jersey}</div>`;
    let h = `<div class="media"><img src="${m.img}" alt="" loading="lazy">`;
    if (m.chart) h += `<div class="datacard"><h4>${m.chart.title}</h4><small>${m.chart.note}</small><div class="rows">${m.chart.rows.map(([l, w, v, hl]) => `<div class="row${hl ? ' hl' : ''}"><span>${l}</span><div class="track"><span style="width:${w}%"></span></div><b>${v}</b></div>`).join('')}</div></div>`;
    return h + '</div>';
  }

  function form(d) {
    return `<section id="book"><div class="w formgrid">
      <aside class="side"><span class="eyebrow">Group Sales</span><h3>Let’s plan your group’s night.</h3>
        <p>Tell us about your group and a representative will reach out within two business days.</p>
        <div class="steps">
          <div class="step"><i>1</i><div><b>Share a few details</b><span>Group type, size and preferred date</span></div></div>
          <div class="step"><i>2</i><div><b>Hear from your rep</b><span>Seats and extras, planned together</span></div></div>
          <div class="step"><i>3</i><div><b>Celebrate at Daikin Park</b><span>Digital tickets sent to your group</span></div></div>
        </div>
        <div class="contact">
          <div>${'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB6E1F" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>'}<div><small>Call</small>${S.contact.phone}</div></div>
          <div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB6E1F" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg><div><small>Email</small>${S.contact.email}</div></div>
          <div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EB6E1F" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><div><small>Ballpark</small>${S.contact.address}</div></div>
        </div></aside>
      <form class="form" onsubmit="return false">
        <h3>Request group information</h3><p>No commitment. Just tell us a little about your group.</p>
        <div class="grid2">
          <div class="fld"><label>Organization name</label><input placeholder="Your organization"></div>
          <div class="fld"><label>Contact name</label><input placeholder="First and last name"></div>
          <div class="fld"><label>Email</label><input placeholder="name@organization.org"></div>
          <div class="fld"><label>Phone</label><input placeholder="(___) ___-____"></div>
          <div class="fld"><label>Estimated group size</label><select><option>20–49 guests</option><option>50–99 guests</option><option>100+ guests</option></select></div>
          <div class="fld"><label>Preferred game</label><select><option>${d.pkg.name}</option><option>Flexible</option></select></div>
          <div class="fld full"><label>Type of group</label><div class="seg">${['School', 'Church', 'Nonprofit', 'Youth sports', 'Other'].map(t => `<span class="${t.toLowerCase().startsWith(d.id.slice(0, 4)) || (d.id === 'youth' && t === 'Youth sports') || (d.id === 'nonprofits' && t === 'Nonprofit') ? 'on' : ''}">${t}</span>`).join('')}</div></div>
          <div class="fld full"><label>Anything else we should know?</label><textarea placeholder="Accessibility needs, preferred dates, questions…"></textarea></div>
        </div>
        <div class="submit"><p>Concept prototype: this form does not send or store any information.</p><button class="btn nv" type="button" onclick="this.closest('form').querySelector('.toast').style.display='block'">Submit request  →</button></div>
        <div class="toast">Thanks! In the live version, a group sales representative would reach out within two business days.</div>
      </form></div></section>`;
  }

  function strategy(d) {
    const v = d.vp;
    return `<section class="strategy"><div class="w">
      <div class="head"><span class="gs"><img src="img/gscg.png" alt="">GSCG strategy notes</span>${v.draft ? '<span class="draft">Draft</span>' : ''}
        <h2>Why this works for ${d.tab.toLowerCase()}</h2><p>The value proposition behind this page and how we’ll reach this audience.</p></div>
      <div class="vpq">“${v.statement}”</div>
      <div class="vp4"><div><b>Audience</b><span>${v.audience}</span></div><div><b>Problem</b><span>${v.problem}</span></div><div><b>Offer</b><span>${v.offer}</span></div><div><b>Value</b><span>${v.value}</span></div></div>
      <div class="reach">
        <div class="mail"><div class="bar"><span><b>To:</b> ${d.message.to}</span><span><b>Subject:</b> ${d.message.subject}</span></div><div class="body">${d.message.body}<br><br><span style="color:#EB6E1F;font-weight:700">View your group’s night →</span></div></div>
        <div class="chan"><h4>How we’ll reach them</h4><ul>${d.channels.map(c => `<li>${c}</li>`).join('')}</ul></div>
      </div></div></section>`;
  }

  function demo(d) {
    let h = `<header class="hero" style="background-image:url(${d.hero})"><div class="w">
      <div><span class="eyebrow">${d.eyebrow}</span><h1>${d.title}</h1><p>${d.sub}</p>${d.tagline ? `<p class="tag">${d.tagline}</p>` : ''}
        <div class="ctas"><a class="btn or" href="#book" data-scroll>Plan your group outing  →</a><a class="btn ol" href="#exp" data-scroll>See what’s included</a></div></div>
      <aside class="pkg"><div class="top">Group package</div><div class="bd"><h3>${d.pkg.name}</h3><div class="meta">Daikin Park · Groups of 20+</div>
        <ul>${d.pkg.items.map(i => `<li>${ck}${i}</li>`).join('')}</ul><div class="note">Group rate · no service fees</div><a class="btn or" href="#book" data-scroll>Request pricing  →</a></div></aside>
    </div></header>${strip()}`;
    h += `<section id="exp"><div class="w"><div class="head"><span class="eyebrow">The experience</span><h2>${d.intro.h}</h2><p>${d.intro.p}</p></div>`;
    d.features.forEach((f, i) => {
      h += `<div class="feat${i % 2 ? ' rev' : ''}"><div class="txt"><span class="tagnum"><i>${String(i + 1).padStart(2, '0')}</i><span class="eyebrow">${f.tag}</span></span><h3>${f.title}</h3><p class="lead">${f.lead}</p>
        <ul>${f.bullets.map(b => `<li>${ck}${b}</li>`).join('')}</ul>${f.proof ? `<div class="proof">${f.proof}</div>` : ''}</div>${media(f.media)}</div>`;
    });
    h += `</div></section>`;
    if (d.foods) h += `<section class="foodsec"><div class="w"><div class="head"><span class="eyebrow">${String(d.features.length + 1).padStart(2, '0')} · ${d.foods.tag}</span><h2>${d.foods.h}</h2></div>
      <div class="foods">${d.foods.items.map(([img, n, p, pr]) => `<div class="food"><img src="${img}" alt="${n}" loading="lazy"><div class="bd"><h4>${n}</h4><p>${p}</p><div class="pr"><span>Proposed group price</span><b>${pr}</b></div></div></div>`).join('')}</div></div></section>`;
    return h + strategy(d) + form(d);
  }

  function home() {
    const H = S.home;
    return `<header class="hero" style="background-image:url(img/hero-home.jpg);min-height:520px"><div class="w" style="grid-template-columns:1fr">
      <div><span class="eyebrow">${H.eyebrow}</span><h1>${H.title}</h1><p>${H.sub}</p></div></div></header>${strip()}
      <section><div class="w"><div class="head"><span class="eyebrow">Choose your community</span><h2>An outing designed around the people you bring.</h2></div>
      <div class="cards">${S.demos.map(d => `<a class="ccard" href="#${d.id}" style="background-image:url(${d.hero})"><div><h3>${d.tab}</h3><p>${d.short}</p><span>Explore →</span></div></a>`).join('')}</div></div></section>`;
  }

  function render() {
    const id = location.hash.slice(1);
    const d = S.demos.find(x => x.id === id);
    app.innerHTML = d ? demo(d) : home();
    tabs.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.dataset.id === id));
    document.title = (d ? d.tab + ' · ' : '') + 'Astros Group Outings · Concept';
    window.scrollTo(0, 0);
  }
  app.addEventListener('click', e => {
    const a = e.target.closest('[data-scroll]'); if (!a) return;
    e.preventDefault(); document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
  const nb = document.getElementById('notesBtn');
  nb.addEventListener('click', () => { const on = document.body.classList.toggle('notes'); nb.setAttribute('aria-pressed', on); nb.textContent = 'Strategy notes: ' + (on ? 'On' : 'Off'); });
  window.addEventListener('hashchange', render);
  render();
})();
