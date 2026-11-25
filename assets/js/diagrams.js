/* Schematic illustrations used on project cards. Each returns an SVG string.
   Styling comes from CSS classes: d-line (ink), d-thin, d-dim (blue), d-acc (ruby), d-fill. */
(function () {
  const wrap = (inner, label) =>
    `<svg viewBox="0 0 320 180" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  const T = (x, y, s, cls = 'd-text', anchor = 'middle') =>
    `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;

  const D = {};

  D.probe = () => {
    const cx = 160, cy = 100, r = 52;
    let pts = '';
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const e = Math.sin(i * 12.9898) * 3.2;
      pts += `<circle cx="${(cx + (r + e) * Math.cos(a)).toFixed(1)}" cy="${(cy + (r + e) * Math.sin(a)).toFixed(1)}" r="1.9" class="d-acc-fill"/>`;
    }
    return wrap(`
      <circle cx="${cx}" cy="${cy}" r="${r + 6}" class="d-dim d-dash" fill="none"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 6}" class="d-dim d-dash" fill="none"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" class="d-line" fill="none"/>
      <path d="M${cx - 70} ${cy}H${cx + 70}M${cx} ${cy - 70}V${cy + 70}" class="d-thin d-center"/>
      ${pts}
      <path d="M${cx + 22} 12V40" class="d-line"/><rect x="${cx + 14}" y="2" width="16" height="12" class="d-line" fill="none"/>
      <circle cx="${cx + 22}" cy="44" r="4" class="d-acc-fill"/>
      ${T(cx, 176, 'Ø form error band', 'd-text')}`, 'Schematic of probe points around a circular feature inside a tolerance band');
  };

  D.oee = () => {
    const box = (x, h, label, fill) => `
      <rect x="${x}" y="34" width="62" height="96" class="d-line" fill="none"/>
      <rect x="${x}" y="${130 - h}" width="62" height="${h}" class="${fill}"/>
      ${T(x + 31, 150, label)}`;
    return wrap(`
      ${box(14, 84, 'Availability', 'd-hatch')}
      ${T(88, 86, '×', 'd-op')}
      ${box(100, 78, 'Performance', 'd-hatch')}
      ${T(174, 86, '×', 'd-op')}
      ${box(186, 92, 'Quality', 'd-hatch')}
      ${T(260, 86, '=', 'd-op')}
      <rect x="270" y="52" width="40" height="60" class="d-acc-line" fill="none"/>
      ${T(290, 88, 'OEE', 'd-text d-strong')}
      ${T(160, 20, 'Schematic', 'd-text d-faint')}`, 'Schematic showing OEE as availability times performance times quality');
  };

  D.pareto = () => {
    const h = [112, 78, 52, 34, 22, 14];
    let bars = '', cum = '', tot = h.reduce((a, b) => a + b, 0), run = 0;
    h.forEach((v, i) => {
      const x = 38 + i * 40;
      bars += `<rect x="${x}" y="${150 - v}" width="30" height="${v}" class="${i === 0 ? 'd-acc-fill' : 'd-hatch'}"/>`;
      run += v;
      cum += `${i ? 'L' : 'M'}${x + 15} ${150 - (run / tot) * 120}`;
    });
    return wrap(`<path d="M30 150H300M30 30V150" class="d-line"/>${bars}
      <path d="${cum}" class="d-dim" fill="none"/><path d="M30 54H300" class="d-thin d-dash"/>
      ${T(160, 172, 'Downtime causes, ranked')}`, 'Schematic Pareto chart with a cumulative line');
  };

  D.network = () => {
    const n = { a: [40, 90], b: [110, 40], c: [110, 140], d: [190, 40], e: [190, 100], f: [260, 70], g: [290, 130] };
    const edges = [['a', 'b', 1], ['a', 'c', 0], ['b', 'd', 1], ['b', 'e', 0], ['c', 'e', 0], ['d', 'f', 1], ['e', 'f', 0], ['f', 'g', 1]];
    let s = '';
    edges.forEach(([p, q, crit]) => {
      s += `<path d="M${n[p][0]} ${n[p][1]}L${n[q][0]} ${n[q][1]}" class="${crit ? 'd-acc-line' : 'd-line'}"/>`;
    });
    Object.values(n).forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="11" class="d-node"/>`; });
    return wrap(s + T(160, 174, 'Critical path in red'), 'Schematic project network with a highlighted critical path');
  };

  D.rail = () => {
    // 60E1 widths from the report: head 72, web 16.5, foot 150, height 172 (mm). Scale 0.62. Head/foot thickness approximated.
    const k = 0.62, cx = 160, top = 26, H = 172 * k;
    const hw = 72 * k / 2, ww = 16.5 * k / 2, fw = 150 * k / 2;
    const y1 = top, y2 = top + 38 * k, y3 = top + 60 * k, y4 = top + H - 34 * k, y5 = top + H - 14 * k, y6 = top + H;
    const p = `M${cx - hw} ${y1 + 6}Q${cx - hw} ${y1} ${cx - hw + 6} ${y1}H${cx + hw - 6}Q${cx + hw} ${y1} ${cx + hw} ${y1 + 6}V${y2}
      L${cx + ww} ${y3}V${y4}L${cx + fw} ${y5}V${y6}H${cx - fw}V${y5}L${cx - ww} ${y4}V${y3}L${cx - hw} ${y2}Z`;
    return wrap(`<path d="${p}" class="d-line d-solid-fill"/>
      <path d="M${cx - fw} ${y6 + 10}H${cx + fw}" class="d-dim"/>${T(cx, y6 + 8, '150', 'd-text d-dimtext')}
      <path d="M${cx - hw} ${y1 - 6}H${cx + hw}" class="d-dim"/>${T(cx, y1 - 8, '72', 'd-text d-dimtext')}
      <path d="M${cx + fw + 14} ${y1}V${y6}" class="d-dim"/>${T(cx + fw + 22, 96, '172', 'd-text d-dimtext', 'start')}
      <path d="M${cx} ${y1 - 4}V${y6 + 4}" class="d-thin d-center"/>`, 'Schematic cross-section of a 60E1 rail with head, web and foot widths');
  };

  D.mcdm = () => {
    const rows = [['A', 138], ['B', 112, 1], ['C', 92], ['D', 60]];
    let s = '';
    rows.forEach(([l, w], i) => {
      const y = 28 + i * 34;
      s += T(30, y + 16, l, 'd-text', 'middle') + `<rect x="46" y="${y}" width="${w * 1.6}" height="22" class="${i === 0 ? 'd-acc-fill' : 'd-hatch'}"/>`;
    });
    return wrap(`<path d="M46 20V166" class="d-line"/>${s}${T(170, 176, 'Alternatives ranked by score', 'd-text d-faint')}`, 'Schematic ranking of four alternatives');
  };

  D.control = () => {
    const pts = [92, 84, 96, 88, 80, 94, 90, 99, 86, 82, 92, 54, 88, 90];
    const d = pts.map((y, i) => `${i ? 'L' : 'M'}${24 + i * 20.5} ${y + 8}`).join('');
    const dots = pts.map((y, i) => `<circle cx="${24 + i * 20.5}" cy="${y + 8}" r="2.6" class="${y < 60 ? 'd-acc-fill' : 'd-node-fill'}"/>`).join('');
    return wrap(`<path d="M16 38H304" class="d-dim d-dash"/><path d="M16 104H304" class="d-line d-thin"/><path d="M16 158H304" class="d-dim d-dash"/>
      <path d="${d}" class="d-line" fill="none"/>${dots}
      ${T(300, 33, 'UCL', 'd-text d-dimtext', 'end')}${T(300, 99, 'CL', 'd-text', 'end')}${T(300, 153, 'LCL', 'd-text d-dimtext', 'end')}`, 'Schematic control chart with one point beyond the control limit');
  };

  D.forming = () => `${wrap(`
      <rect x="86" y="96" width="148" height="56" class="d-line d-solid-fill"/>
      <rect x="136" y="96" width="48" height="56" class="d-paper"/>
      <rect x="86" y="76" width="148" height="12" class="d-line d-solid-fill"/>
      <rect x="136" y="76" width="48" height="12" class="d-paper"/>
      <rect x="140" y="10" width="40" height="86" class="d-acc-line" fill="none"/>
      <path d="M100 92H220" class="d-thin d-dash"/>
      <path d="M160 6V-4" class="d-thin"/>
      ${T(160, 172, 'Punch, blankholder, die')}`, 'Schematic cross-section of a deep drawing tool')}`;

  D.capacity = () => {
    const needed = [40, 66, 50, 78, 58];
    const used = [58, 52, 50, 56, 70];
    let s = '';
    needed.forEach((v, i) => {
      const x = 32 + i * 56;
      const diff = used[i] - v;
      s += `<rect x="${x}" y="${150 - v}" width="20" height="${v}" class="d-hatch"/>
            <rect x="${x + 22}" y="${150 - used[i]}" width="20" height="${used[i]}" class="${Math.abs(diff) > 8 ? 'd-acc-fill' : 'd-line-fill'}"/>`;
    });
    return wrap(`<path d="M24 150H300M24 30V150" class="d-line"/>${s}${T(160, 172, 'Needed vs used, by style')}`, 'Schematic comparing workers needed with workers used per style');
  };

  window.Diagrams = D;
})();
