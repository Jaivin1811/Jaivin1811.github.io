/* Hero demo: a touch probe that follows the pointer over a flanged plate.
   Move near an edge and the probe snaps to it; click or tap to take a sample point.
   Deviations are simulated (this is a demo, not real measurement data).
   Drawing scale: 2.9 SVG units = 1 mm (the Ø140 plate spans 406 units). */
(function () {
  'use strict';
  var svg = document.getElementById('hero-part');
  if (!svg) return;

  var probe = svg.querySelector('#probe');
  var marks = svg.querySelector('#marks');
  var roX = document.getElementById('ro-x');
  var roY = document.getElementById('ro-y');
  var roF = document.getElementById('ro-feat');
  var hint = document.getElementById('demo-hint');
  var table = document.getElementById('samples');
  var tbody = table.querySelector('tbody');
  var status = document.getElementById('probe-status');
  var btnRandom = document.getElementById('probe-random');
  var btnClear = document.getElementById('probe-clear');

  var K = 2.9, CX = 280, CY = 280, SNAP = 16, MAX_ROWS = 8;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var feats = [
    { n: 'Outer Ø140', cx: CX, cy: CY, r: 203 },
    { n: 'Bore Ø40 H7', cx: CX, cy: CY, r: 58 }
  ];
  for (var i = 0; i < 6; i++) {
    var a = (i * 60) * Math.PI / 180;
    feats.push({ n: 'Hole ' + (i + 1) + ' Ø12', cx: CX + 145 * Math.cos(a), cy: CY + 145 * Math.sin(a), r: 17.4 });
  }

  var pos = { x: 430, y: 120 };      // current (drawn) position
  var target = { x: 430, y: 120 };   // where the probe is heading
  var pending = null;                // sample to record on arrival
  var count = 0, userActive = false, autoCount = 0, visible = true;

  /* ---- helpers ---- */
  function toSvg(e) {
    var pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function nearest(p) {
    var best = null;
    feats.forEach(function (f) {
      var d = Math.abs(Math.hypot(p.x - f.cx, p.y - f.cy) - f.r);
      if (!best || d < best.d) best = { f: f, d: d };
    });
    return best;
  }
  function onEdge(p, f) {
    var ang = Math.atan2(p.y - f.cy, p.x - f.cx);
    return { x: f.cx + f.r * Math.cos(ang), y: f.cy + f.r * Math.sin(ang) };
  }
  function gauss() {
    var u = 1 - Math.random(), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function mm(v, c) { return ((v - c) / K).toFixed(2); }

  /* ---- animation loop ---- */
  function frame() {
    var k = reduced ? 1 : 0.16;
    pos.x += (target.x - pos.x) * k;
    pos.y += (target.y - pos.y) * k;
    probe.setAttribute('transform', 'translate(' + pos.x.toFixed(1) + ' ' + pos.y.toFixed(1) + ')');
    if (pending && Math.hypot(target.x - pos.x, target.y - pos.y) < 1.2) {
      var p = pending; pending = null;
      record(p.f, p.pt);
    }
    requestAnimationFrame(frame);
  }

  /* ---- recording ---- */
  function record(f, pt) {
    count++;
    var dev = Math.round((0.6 + gauss() * 2.4) * 10) / 10;   // µm, simulated
    var out = Math.abs(dev) > 5;

    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'mark' + (out ? ' out' : ''));
    g.innerHTML = '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="3.6"/>' +
      '<path d="M' + (pt.x - 8).toFixed(1) + ' ' + pt.y.toFixed(1) + 'h16M' + pt.x.toFixed(1) + ' ' + (pt.y - 8).toFixed(1) + 'v16"/>';
    marks.appendChild(g);
    while (marks.children.length > MAX_ROWS) marks.removeChild(marks.firstChild);

    var tr = document.createElement('tr');
    if (out) tr.className = 'out';
    var sign = dev > 0 ? '+' : (dev < 0 ? '−' : '');
    tr.innerHTML = '<td>' + count + '</td><td>' + f.n + '</td><td>' + mm(pt.x, CX) + ', ' + mm(pt.y, CY) +
      '</td><td>' + sign + Math.abs(dev).toFixed(1) + ' µm' + (out ? ' (out)' : '') + '</td>';
    tbody.appendChild(tr);
    while (tbody.children.length > MAX_ROWS) tbody.removeChild(tbody.firstChild);
    table.hidden = false;

    if (count === 1) {
      hint.textContent = 'Deviations here are simulated. On a real probe, error depends on stylus, speed, direction and temperature. That is what my thesis looks at.';
    }
    status.textContent = 'Sample ' + count + ' on ' + f.n + ', deviation ' + sign + Math.abs(dev).toFixed(1) + ' micrometres' + (out ? ', outside tolerance' : '') + '.';
  }

  function sampleAt(f, angle) {
    var pt = { x: f.cx + f.r * Math.cos(angle), y: f.cy + f.r * Math.sin(angle) };
    target = { x: pt.x, y: pt.y };
    pending = { f: f, pt: pt };
    roX.textContent = mm(pt.x, CX); roY.textContent = mm(pt.y, CY); roF.textContent = f.n;
  }
  function randomSample() {
    var f = feats[Math.floor(Math.random() * feats.length)];
    sampleAt(f, Math.random() * Math.PI * 2);
  }

  /* ---- pointer input ---- */
  function aim(e) {
    var p = toSvg(e);
    var n = nearest(p);
    var near = n.d < SNAP;
    svg.classList.toggle('near', near);
    var t = near ? onEdge(p, n.f) : p;
    target = { x: t.x, y: t.y };
    roX.textContent = mm(t.x, CX);
    roY.textContent = mm(t.y, CY);
    roF.textContent = n.f.n + ' · ' + (n.d / K).toFixed(1) + ' mm';
    return { p: p, n: n, near: near, t: t };
  }
  svg.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    userActive = true; pending = null;
    aim(e);
  });
  svg.addEventListener('pointerleave', function () { svg.classList.remove('near'); });
  svg.addEventListener('click', function (e) {
    userActive = true; pending = null;
    var r = aim(e);
    if (r.near) {
      record(r.n.f, r.t);
    } else {
      hint.textContent = 'Move closer to an edge, then click. The probe snaps to it.';
    }
  });

  btnRandom.addEventListener('click', function () { userActive = true; randomSample(); });
  btnClear.addEventListener('click', function () {
    userActive = true; pending = null; count = 0;
    marks.innerHTML = ''; tbody.innerHTML = ''; table.hidden = true;
    hint.textContent = 'Move over the part. Click or tap near an edge to take a sample point.';
    status.textContent = 'Samples cleared.';
  });

  /* ---- gentle auto-demo until the visitor interacts ---- */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0.3 }).observe(svg);
  }
  if (!reduced) {
    setTimeout(function auto() {
      if (!userActive && visible && autoCount < 4 && !document.hidden) { autoCount++; randomSample(); }
      if (!userActive && autoCount < 4) setTimeout(auto, 2600);
    }, 2200);
  }

  requestAnimationFrame(frame);
})();
