// Illustrative, interactive Daikin Park seating map. Geometry is generated, not traced,
// so section shapes and numbers are approximate.
(function () {
  const H = [500, 690];                       // home plate
  const R2 = Math.SQRT1_2;
  const u1 = [-R2, -R2], n1 = [-R2, R2];      // left-field line direction / outward normal
  const u2 = [R2, -R2], n2 = [R2, R2];        // right-field line
  const K = 0.8;                              // px per foot
  const LF = add(H, mul(u1, 315 * K)), RF = add(H, mul(u2, 326 * K)), CF = [H[0], H[1] - 409 * K];
  function add(a, b) { return [a[0] + b[0], a[1] + b[1]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k]; }

  // a point on the seating bowl: along a foul line (s = feet-ish px from home) or around home (deg)
  const pl = (s, d, u, n) => add(add(H, mul(u, s)), mul(n, d));
  const pa = (deg, d) => add(H, [Math.cos(deg * Math.PI / 180) * d, Math.sin(deg * Math.PI / 180) * d]);

  function wedge(fn, a, b, d1, d2, steps = 6) {
    const pts = [];
    for (let i = 0; i <= steps; i++) pts.push(fn(a + (b - a) * i / steps, d1));
    for (let i = steps; i >= 0; i--) pts.push(fn(a + (b - a) * i / steps, d2));
    return pts;
  }

  // outfield fence as a smooth curve through the poles and center field
  const fence = (() => {
    const ctrl = [LF, add(H, mul([-Math.sin(Math.PI / 8), -Math.cos(Math.PI / 8)], 366 * K)), CF,
      add(H, mul([Math.sin(Math.PI / 8), -Math.cos(Math.PI / 8)], 373 * K)), RF];
    const pts = [];
    for (let i = 0; i < ctrl.length - 1; i++) {
      const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
      for (let t = 0; t < 1; t += 0.05) {
        const t2 = t * t, t3 = t2 * t;
        pts.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
      }
    }
    pts.push(RF);
    return pts;
  })();
  function fenceAt(t, d) {
    const f = t * (fence.length - 1), i = Math.min(fence.length - 2, Math.floor(f)), r = f - i;
    const a = fence[i], b = fence[i + 1];
    const p = [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
    const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
    const nrm = [ty / L, -tx / L];            // points away from home (outward)
    return add(p, mul(nrm, d));
  }

  const ALL = ['faith', 'hispanic', 'youth', 'schools', 'nonprofits'];
  const LEVELS = {
    field: { name: 'Field Box', price: '$$$', view: 'Close to the action on the field level.' },
    dugout: { name: 'Dugout Box', price: '$$$', view: 'Right behind the dugouts. Great for players watching players.' },
    diamond: { name: 'Diamond Club', price: '$$$$', view: 'Premium seats directly behind home plate, with club access.', premium: true },
    club: { name: 'Honda Club Level', price: '$$$', view: 'Climate-controlled club concourse and upgraded food.', premium: true },
    terrace: { name: 'Terrace Deck', price: '$$', view: 'Elevated view of the whole field and the roof.' },
    upper: { name: 'Upper Deck', price: '$', view: 'The best value in the ballpark, with room for big groups.' },
    crawford: { name: 'Crawford Boxes', price: '$$', view: 'Home run territory in left field, right above the wall.' },
    cfgroup: { name: 'Center Field Group Areas', price: '$$', view: 'Open-air group spaces with food and drink packages.', group: true },
    rfbox: { name: 'Outfield Box', price: '$$', view: 'Right-field seats near the bullpens.' },
    rfupper: { name: 'Outfield Upper Deck', price: '$', view: 'Affordable seats with a view of the downtown skyline.' },
  };

  const sections = [];
  let n = 105;
  const sec = (level, pts, fit, num) => sections.push({ id: String(num ?? n++), level, pts, fit });
  // field level along the lines + behind home
  const lfF = [250, 215, 180, 145, 110, 75, 40, 0];
  for (let i = 0; i < lfF.length - 1; i++) sec(i >= 4 ? 'dugout' : 'field', wedge((s, d) => pl(s, d, u1, n1), lfF[i], lfF[i + 1], 34, 74), i < 3 ? ['youth', 'schools', 'faith'] : ['youth']);
  for (let i = 0; i < 4; i++) sec('diamond', wedge(pa, 135 - 22.5 * i, 112.5 - 22.5 * i, 34, 74), []);
  const rfF = [0, 40, 75, 110, 145, 180, 215, 255];
  for (let i = 0; i < rfF.length - 1; i++) sec(i <= 2 ? 'dugout' : 'field', wedge((s, d) => pl(s, d, u2, n2), rfF[i], rfF[i + 1], 34, 74), i > 3 ? ['youth', 'schools', 'faith'] : ['youth']);
  // club level
  n = 205;
  const lfC = [200, 160, 120, 80, 40, 0];
  for (let i = 0; i < lfC.length - 1; i++) sec('club', wedge((s, d) => pl(s, d, u1, n1), lfC[i], lfC[i + 1], 88, 114), ['nonprofits']);
  for (let i = 0; i < 4; i++) sec('club', wedge(pa, 135 - 22.5 * i, 112.5 - 22.5 * i, 88, 114), ['nonprofits']);
  const rfC = [0, 40, 80, 120, 160, 205];
  for (let i = 0; i < rfC.length - 1; i++) sec('club', wedge((s, d) => pl(s, d, u2, n2), rfC[i], rfC[i + 1], 88, 114), ['nonprofits']);
  // terrace deck
  n = 307;
  const lfT = [235, 195, 155, 115, 75, 35, 0];
  for (let i = 0; i < lfT.length - 1; i++) sec('terrace', wedge((s, d) => pl(s, d, u1, n1), lfT[i], lfT[i + 1], 128, 154), ['faith', 'hispanic', 'schools', 'nonprofits']);
  for (let i = 0; i < 4; i++) sec('terrace', wedge(pa, 135 - 22.5 * i, 112.5 - 22.5 * i, 128, 154), ['faith', 'nonprofits']);
  const rfT = [0, 35, 75, 115, 155, 195, 240];
  for (let i = 0; i < rfT.length - 1; i++) sec('terrace', wedge((s, d) => pl(s, d, u2, n2), rfT[i], rfT[i + 1], 128, 154), ['faith', 'hispanic', 'schools', 'nonprofits']);
  // upper deck
  n = 409;
  const lfU = [255, 215, 175, 135, 95, 55, 15, 0];
  for (let i = 0; i < lfU.length - 1; i++) sec('upper', wedge((s, d) => pl(s, d, u1, n1), lfU[i], lfU[i + 1], 166, 204), ALL);
  for (let i = 0; i < 5; i++) sec('upper', wedge(pa, 135 - 18 * i, 117 - 18 * i, 166, 204), ALL);
  const rfU = [0, 15, 55, 95, 135, 175, 215, 260];
  for (let i = 0; i < rfU.length - 1; i++) sec('upper', wedge((s, d) => pl(s, d, u2, n2), rfU[i], rfU[i + 1], 166, 204), ALL);
  // outfield
  [[0, .1, 100], [.1, .2, 101], [.2, .3, 102]].forEach(([a, b, num]) => sec('crawford', wedge(fenceAt, a, b, 8, 34), ['hispanic', 'youth', 'faith'], num));
  sec('cfgroup', wedge(fenceAt, .4, .6, 10, 54, 10), ALL, 'CF');
  [[.64, .73, 152], [.73, .82, 154], [.82, .91, 156], [.91, 1, 158]].forEach(([a, b, num]) => sec('rfbox', wedge(fenceAt, a, b, 8, 40), ['youth', 'schools'], num));
  [[.66, .78, 405], [.78, .9, 406], [.9, 1.0, 407]].forEach(([a, b, num]) => sec('rfupper', wedge(fenceAt, a, b, 58, 96), ALL, num));

  const poly = pts => pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const mid = pts => { let x = 0, y = 0; pts.forEach(p => { x += p[0]; y += p[1]; }); return [x / pts.length, y / pts.length]; };

  function field() {
    const grass = 'M' + H.join(',') + ' L' + fence.map(p => p.join(',')).join(' L') + ' Z';
    const first = add(H, mul(u2, 90 * K)), second = add(H, [0, -90 * K * Math.SQRT2]), third = add(H, mul(u1, 90 * K));
    const mound = add(H, [0, -60.5 * K]);
    return `
      <path d="${grass}" class="m-grass"/>
      <path d="M${add(H, mul(u1, 120 * K)).join(',')} A${118 * K},${118 * K} 0 0 1 ${add(H, mul(u2, 120 * K)).join(',')} L${H.join(',')} Z" class="m-dirt"/>
      <polygon points="${poly([H, first, second, third])}" class="m-infield"/>
      <circle cx="${mound[0]}" cy="${mound[1]}" r="${9 * K * 1.4}" class="m-dirt"/>
      ${[first, second, third].map(p => `<rect x="${p[0] - 3}" y="${p[1] - 3}" width="6" height="6" transform="rotate(45 ${p[0]} ${p[1]})" class="m-base"/>`).join('')}
      <path d="M${H.join(',')} L${LF.join(',')} M${H.join(',')} L${RF.join(',')}" class="m-line"/>
      <path d="M${fence.map(p => p.join(',')).join(' L')}" class="m-fence"/>
      <circle cx="${H[0]}" cy="${H[1]}" r="3.5" class="m-base"/>
      <text x="${CF[0]}" y="${CF[1] + 90}" class="m-fieldtxt">DAIKIN PARK</text>
      <path d="M${fenceAt(0, 46).join(',')} L${fenceAt(.32, 46).join(',')}" class="m-track"/>
      <text x="${fenceAt(.12, 60)[0]}" y="${fenceAt(.12, 60)[1]}" class="m-tracktxt">TRAIN TRACK</text>`;
  }

  window.SeatMap = function mount(root, opts = {}) {
    const svg = `<svg viewBox="130 245 740 665" class="seatmap" role="img" aria-label="Interactive Daikin Park seating map">
      ${field()}
      ${sections.map(s => {
        const c = mid(s.pts);
        return `<g class="sec" data-id="${s.id}" data-level="${s.level}" tabindex="0" role="button" aria-label="Section ${s.id}, ${LEVELS[s.level].name}">
          <polygon points="${poly(s.pts)}"/><text x="${c[0].toFixed(1)}" y="${(c[1] + 3).toFixed(1)}">${s.id}</text></g>`;
      }).join('')}
    </svg>`;
    root.innerHTML = `
      <div class="map-filters" role="toolbar" aria-label="Filter sections">
        ${[['all', 'All Groups'], ['faith', 'Faith'], ['hispanic', 'Hispanic Community'], ['youth', 'Youth Sports'], ['schools', 'Schools'], ['nonprofits', 'Nonprofits'], ['premium', 'Premium'], ['value', 'Best Value']]
          .map(([k, l], i) => `<button data-f="${k}" class="${i ? '' : 'on'}">${l}</button>`).join('')}
      </div>
      <div class="map-wrap">
        <div class="map-svg">${svg}<div class="map-tip" hidden></div></div>
        <aside class="map-panel"><div class="mp-empty"><b>Select a section</b><p>Hover any section to preview it, and click to see group details. Highlighted sections have the most group availability.</p>
          <ul class="map-legend"><li><i class="lg-hot"></i>Best for groups</li><li><i class="lg-prem"></i>Premium</li><li><i class="lg-base"></i>Other sections</li></ul></div></aside>
      </div>
      <p class="map-note">Illustrative map for concept purposes. Sections and numbers are approximate. <a href="https://www.mlb.com/astros/ballpark/seat-map" target="_blank" rel="noopener">View the official seating map</a></p>`;
    const panel = root.querySelector('.map-panel'), tip = root.querySelector('.map-tip'), box = root.querySelector('.map-svg');
    let filter = 'all';
    const groupSec = s => LEVELS[s.level].group || s.fit.length >= 3;
    function paint() {
      root.querySelectorAll('.sec').forEach(g => {
        const s = sections.find(x => x.id === g.dataset.id), L = LEVELS[s.level];
        let on;
        if (filter === 'all') on = groupSec(s);
        else if (filter === 'premium') on = !!L.premium;
        else if (filter === 'value') on = L.price === '$';
        else on = s.fit.includes(filter) || L.group;
        g.classList.toggle('hot', !!on && !L.premium);
        g.classList.toggle('prem', !!L.premium && (filter === 'all' || filter === 'premium'));
        g.classList.toggle('dim', filter !== 'all' && !on);
      });
    }
    function detail(s) {
      const L = LEVELS[s.level];
      const fits = (L.group ? ALL : s.fit).map(k => SITE.communities[k]);
      const tier = L.premium ? 'Premium groups of 6+' : L.group ? 'Double tier and up (50+)' : 'All tiers (15+)';
      panel.innerHTML = `<div class="mp-head"><span>${s.id === 'CF' ? 'Group Area' : 'Section ' + s.id}</span><b>${L.name}</b></div>
        <p>${L.view}</p>
        <dl><dt>Price range</dt><dd>${L.price}<span class="dim">${'$$$$'.slice(L.price.length)}</span></dd>
        <dt>Group tiers</dt><dd>${tier}</dd>
        <dt>Best for</dt><dd>${fits.length ? fits.join(', ') : 'Corporate and premium groups'}</dd></dl>
        <a class="pill" href="#/connect" data-prefill="${s.id === 'CF' ? L.name : 'Section ' + s.id + ' (' + L.name + ')'}">Request These Seats</a>`;
    }
    root.querySelector('.map-filters').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      filter = b.dataset.f; root.querySelectorAll('.map-filters button').forEach(x => x.classList.toggle('on', x === b)); paint();
    });
    const pick = g => { root.querySelectorAll('.sec.sel').forEach(x => x.classList.remove('sel')); g.classList.add('sel'); detail(sections.find(x => x.id === g.dataset.id)); };
    root.querySelectorAll('.sec').forEach(g => {
      g.addEventListener('click', () => pick(g));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(g); } });
      g.addEventListener('mousemove', e => {
        const s = sections.find(x => x.id === g.dataset.id), L = LEVELS[s.level], r = box.getBoundingClientRect();
        tip.hidden = false; tip.innerHTML = `<b>${s.id === 'CF' ? 'Center Field' : 'Section ' + s.id}</b>${L.name} · ${L.price}`;
        tip.style.left = (e.clientX - r.left + 14) + 'px'; tip.style.top = (e.clientY - r.top + 14) + 'px';
      });
      g.addEventListener('mouseleave', () => { tip.hidden = true; });
    });
    paint();
    if (opts.select) { const g = root.querySelector(`.sec[data-id="${opts.select}"]`); if (g) pick(g); }
  };
})();
