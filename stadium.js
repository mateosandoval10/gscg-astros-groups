// Interactive Daikin Park diagram (concept, drawn to approximate field dimensions).
// window.renderStadium(el, { onSelect(zoneId) }) -> { select(zoneId) }
(function () {
  const H = { x: 500, y: 712 };          // home plate
  const K = 1.22;                         // px per foot
  const rad = d => d * Math.PI / 180;
  const u = phi => ({ x: Math.sin(rad(phi)), y: -Math.cos(rad(phi)) });
  const add = (p, v, s) => ({ x: p.x + v.x * s, y: p.y + v.y * s });
  const f = n => Math.round(n * 10) / 10;
  const pts = arr => arr.map(p => `${f(p.x)},${f(p.y)}`).join(' ');

  // Real outfield dimensions (feet) by angle from center field (negative = left field)
  const FENCE = [[-45, 315], [-38, 322], [-30, 340], [-20, 362], [-10, 392], [0, 409], [10, 395], [20, 373], [30, 352], [38, 336], [45, 326]];
  function fenceR(phi) {
    for (let i = 0; i < FENCE.length - 1; i++) {
      const [a, ra] = FENCE[i], [b, rb] = FENCE[i + 1];
      if (phi >= a && phi <= b) { const t = (phi - a) / (b - a); const s = t * t * (3 - 2 * t); return (ra + (rb - ra) * s) * K; }
    }
    return FENCE[FENCE.length - 1][1] * K;
  }
  const fenceP = (phi, extra = 0) => add(H, u(phi), fenceR(phi) + extra);
  const LF = fenceR(-45), RF = fenceR(45);

  // Seating bowl: offset curve around the foul lines and home plate
  const CORNER = 70; // nominal corner length for parameterization
  const TOTAL = LF + CORNER + RF;
  function bowl(s, d) {
    if (s <= LF) return add(add(H, u(-45), LF - s), u(-135), d);
    if (s <= LF + CORNER) { const t = (s - LF) / CORNER; return add(H, u(-135 - 90 * t), d); }
    return add(add(H, u(45), s - LF - CORNER), u(135), d);
  }
  function band(s0, s1, d0, d1) {
    const n = Math.max(2, Math.ceil((s1 - s0) / 6)); const outer = [], inner = [];
    for (let i = 0; i <= n; i++) { const s = s0 + (s1 - s0) * i / n; outer.push(bowl(s, d1)); inner.push(bowl(s, d0)); }
    return outer.concat(inner.reverse());
  }
  function arcBand(p0, p1, e0, e1) {
    const n = Math.max(2, Math.ceil(Math.abs(p1 - p0) / 1.5)); const outer = [], inner = [];
    for (let i = 0; i <= n; i++) { const p = p0 + (p1 - p0) * i / n; outer.push(fenceP(p, e1)); inner.push(fenceP(p, e0)); }
    return outer.concat(inner.reverse());
  }
  function sections(s0, s1, d0, d1, size) {
    const out = []; const n = Math.max(1, Math.round((s1 - s0) / size));
    for (let i = 0; i < n; i++) out.push(band(s0 + (s1 - s0) * i / n, s0 + (s1 - s0) * (i + 1) / n, d0, d1));
    return out;
  }
  function arcSections(p0, p1, e0, e1, n) {
    const out = []; for (let i = 0; i < n; i++) out.push(arcBand(p0 + (p1 - p0) * i / n, p0 + (p1 - p0) * (i + 1) / n, e0, e1)); return out;
  }

  const ZONES = [
    { id: 'viewdeck', name: 'View Deck', color: '#8fb3dc', polys: sections(26, TOTAL - 26, 158, 202, 34), label: null },
    { id: 'mezzanine', name: 'Mezzanine', color: '#4a77b4', polys: sections(30, TOTAL - 30, 110, 148, 30), label: null },
    { id: 'fieldbox', name: 'Field Box', color: '#1e3d6e', polys: sections(16, TOTAL - 16, 44, 100, 26), label: null },
    { id: 'crawfordboxes', name: 'Crawford Boxes', color: '#e2742b', polys: arcSections(-44, -17, 10, 64, 5), label: null },
    { id: 'bullpen', name: 'Bullpen', color: '#7a62a8', polys: [arcBand(-14, 4, 8, 44)], label: null },
    { id: 'outfielddecki', name: 'Outfield Deck I', color: '#2b7f86', polys: arcSections(8, 44, 12, 70, 5), label: null },
    { id: 'outfielddeckii', name: 'Outfield Deck II', color: '#5fb0b2', polys: arcSections(8, 44, 82, 146, 5), label: null },
  ];

  function svg() {
    const pole = { l: add(H, u(-45), LF), r: add(H, u(45), RF) };
    const fair = [H, pole.l]; for (let p = -45; p <= 45; p += 1.5) fair.push(fenceP(p)); fair.push(pole.r);
    const track = []; for (let p = -45; p <= 45; p += 1.5) track.push(fenceP(p, -15)); for (let p = 45; p >= -45; p -= 1.5) track.push(fenceP(p));
    const base = 90 * K, b1 = add(H, u(45), base), b2 = add(H, u(0), base * Math.SQRT2), b3 = add(H, u(-45), base);
    const mound = add(H, u(0), 60.5 * K);
    const gi = 13 * K; const grassIn = [add(H, u(0), gi * 1.5), add(b1, u(-90), gi), add(b2, u(180), gi), add(b3, u(90), gi)];
    const dirtR = 95 * K, m = 60.5 * K, c45 = Math.SQRT1_2;
    const tHit = m * c45 + Math.sqrt(dirtR * dirtR - m * m * 0.5);
    const hitL = add(H, u(-45), tHit), hitR = add(H, u(45), tHit);
    const angTo = p => Math.atan2(p.x - mound.x, -(p.y - mound.y)) * 180 / Math.PI;
    const aL = angTo(hitL), aR = angTo(hitR);
    const dirt = [H, hitL]; for (let a = aL; a <= aR; a += 2) dirt.push(add(mound, u(a), dirtR)); dirt.push(hitR);
    const lineL = add(H, u(-45), LF), lineR = add(H, u(45), RF);
    const us0 = { x: 78, y: 230 };
    const trainPath = [{ x: us0.x + 150, y: us0.y + 34 }]; for (let p = -47; p <= -8; p += 1) trainPath.push(fenceP(p, 74));
    const loco = fenceP(-22, 74), locoAng = -22;
    const dug = side => band(side < 0 ? LF - 128 * K : LF + CORNER + 40 * K, side < 0 ? LF - 40 * K : LF + CORNER + 128 * K, 22, 40);
    const stripes = []; for (let i = -14; i <= 14; i++) stripes.push(`<rect x="${500 + i * 36}" y="0" width="18" height="900" />`);
    const zones = ZONES.map(z => `<g class="zone" data-zone="${z.id}" tabindex="0" role="button" aria-label="${z.name}" style="--zc:${z.color}">${z.polys.map(p => `<polygon points="${pts(p)}"/>`).join('')}</g>`).join('');
    const label = (x, y, t, cls = '') => `<text class="zl ${cls}" x="${x}" y="${y}">${t}</text>`;
    const cbx = fenceP(-31, 37), bpx = fenceP(-5, 26), od1 = fenceP(27, 41), od2 = fenceP(27, 114);
    const us = { x: 78, y: 230, w: 150, h: 68 };
    return `<svg viewBox="40 40 920 ${f(H.y + 220)}" role="img" aria-label="Interactive Daikin Park seating diagram" xmlns="http://www.w3.org/2000/svg">
<defs>
  <clipPath id="fairclip"><polygon points="${pts(fair)}"/></clipPath>
  <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8a4b"/><stop offset="1" stop-color="#2f7440"/></linearGradient>
  <radialGradient id="glow" cx="50%" cy="55%" r="60%"><stop offset="0" stop-color="#ffffff" stop-opacity=".10"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
</defs>
<rect x="40" y="40" width="920" height="${f(H.y + 220)}" rx="28" class="bg"/>
<g class="concourse"><polygon points="${pts(band(4, TOTAL - 4, 34, 214))}"/><polygon points="${pts(arcBand(-46, 46, 2, 160))}"/></g>
<polygon points="${pts(fair)}" fill="url(#grass)"/>
<g clip-path="url(#fairclip)" class="mow" transform="rotate(0)">${stripes.join('')}</g>
<polygon points="${pts(track)}" class="track"/>
<polygon points="${pts(dirt)}" class="dirt"/>
<polygon points="${pts(grassIn)}" class="infield-grass"/>
<circle cx="${f(H.x)}" cy="${f(H.y)}" r="${f(15 * K)}" class="dirt"/>
<circle cx="${f(mound.x)}" cy="${f(mound.y)}" r="${f(9 * K)}" class="dirt mound"/>
<line x1="${H.x}" y1="${H.y}" x2="${f(lineL.x)}" y2="${f(lineL.y)}" class="chalk"/>
<line x1="${H.x}" y1="${H.y}" x2="${f(lineR.x)}" y2="${f(lineR.y)}" class="chalk"/>
${[b1, b2, b3].map(b => `<rect x="${f(b.x - 4)}" y="${f(b.y - 4)}" width="8" height="8" transform="rotate(45 ${f(b.x)} ${f(b.y)})" class="base"/>`).join('')}
<polygon points="${f(H.x - 4)},${f(H.y - 3)} ${f(H.x + 4)},${f(H.y - 3)} ${f(H.x + 4)},${f(H.y + 1)} ${H.x},${f(H.y + 5)} ${f(H.x - 4)},${f(H.y + 1)}" class="base"/>
<polygon points="${pts(dug(-1))}" class="dugout"/><polygon points="${pts(dug(1))}" class="dugout"/>
<rect x="${f(pole.l.x - 3)}" y="${f(pole.l.y - 46)}" width="6" height="46" class="pole"/><rect x="${f(pole.r.x - 3)}" y="${f(pole.r.y - 46)}" width="6" height="46" class="pole"/>
${zones}
<polyline points="${pts(trainPath)}" class="rail"/><polyline points="${pts(trainPath)}" class="rail ties"/>
<g transform="translate(${f(loco.x)} ${f(loco.y)}) rotate(${locoAng - 90})" class="train"><rect x="-26" y="-8" width="52" height="16" rx="4"/><rect x="-34" y="-6" width="10" height="12" rx="2"/><circle cx="18" cy="0" r="3" class="lamp"/></g>
<g class="zone station" data-zone="unionstation" tabindex="0" role="button" aria-label="Union Station" style="--zc:#8c4a32">
  <rect x="${us.x}" y="${us.y}" width="${us.w}" height="${us.h}" rx="6"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect class="win" x="${us.x + 12 + i * 22}" y="${us.y + 14}" width="12" height="20" rx="6"/>`).join('')}
  <rect class="win" x="${us.x + 60}" y="${us.y + 44}" width="30" height="26" rx="3"/>
</g>
<rect x="40" y="40" width="920" height="${f(H.y + 220)}" rx="28" fill="url(#glow)" pointer-events="none"/>
${label(500, H.y + 80, 'FIELD BOX', 'on-dark')}${label(500, H.y + 135, 'MEZZANINE', 'on-dark')}${label(500, H.y + 186, 'VIEW DECK')}
${label(f(bpx.x), f(bpx.y + 4), 'BULLPEN', 'on-dark sm')}
<g transform="rotate(27 ${f(od1.x)} ${f(od1.y)})">${label(f(od1.x), f(od1.y + 4), 'OUTFIELD DECK I', 'on-dark sm')}</g><g transform="rotate(27 ${f(od2.x)} ${f(od2.y)})">${label(f(od2.x), f(od2.y + 4), 'OUTFIELD DECK II', 'on-dark sm')}</g><g transform="rotate(-31 ${f(cbx.x)} ${f(cbx.y)})">${label(f(cbx.x), f(cbx.y + 4), 'CRAWFORD BOXES', 'on-dark sm')}</g>
${label(us.x + us.w / 2, us.y - 12, 'UNION STATION', 'dark sm')}
${label(500, 520, 'DAIKIN PARK', 'field')}
<text class="note" x="500" y="${f(H.y + 238)}">Concept diagram. Not to exact scale.</text>
</svg>`;
  }

  window.STADIUM_ZONES = ZONES.map(z => ({ id: z.id, name: z.name, color: z.color })).concat([{ id: 'unionstation', name: 'Union Station', color: '#8c4a32' }]);
  window.renderStadium = function (el, opts) {
    el.innerHTML = svg();
    const groups = [...el.querySelectorAll('.zone')];
    const select = id => { groups.forEach(g => g.classList.toggle('sel', g.dataset.zone === id)); el.classList.toggle('has-sel', !!id); };
    groups.forEach(g => {
      const go = () => { select(g.dataset.zone); opts && opts.onSelect && opts.onSelect(g.dataset.zone); };
      g.addEventListener('click', go);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    return { select };
  };
})();
