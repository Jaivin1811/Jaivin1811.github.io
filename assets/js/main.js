/* Renders every section from window.PORTFOLIO (data/site.js) and wires up the interactions.
   Small render functions = reusable components. To change content, edit data/site.js, not this file. */
(function () {
  'use strict';
  var D = window.PORTFOLIO;
  if (!D) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var has = function (v) { return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim()); };
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };

  /* ---------- Reusable components (return HTML strings) ---------- */
  var C = {
    chips: function (arr, cls) {
      return has(arr) ? '<ul class="chips">' + arr.map(function (t) { return '<li class="chip ' + (cls || '') + '">' + esc(t) + '</li>'; }).join('') + '</ul>' : '';
    },
    bullets: function (arr) {
      return has(arr) ? '<ul class="bul">' + arr.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '';
    },
    meta: function (parts) { return parts.filter(has).map(esc).join(' · '); }
  };

  /* ---------- About ---------- */
  function renderAbout() {
    var a = D.about;
    $('#about-body').innerHTML =
      '<div class="about-copy reveal">' +
        a.paragraphs.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        (has(a.goal) ? '<p class="goal">' + esc(a.goal) + '</p>' : '') +
      '</div>' +
      '<div class="reveal" style="--d:.12s">' +
        '<dl class="facts">' + a.facts.map(function (f) { return '<div><dt>' + esc(f.k) + '</dt><dd>' + esc(f.v) + '</dd></div>'; }).join('') + '</dl>' +
        '<ol class="focus-list">' + a.focus.map(function (f, i) {
          return '<li><span class="balloon" aria-hidden="true">' + (i + 1) + '</span><div><h3>' + esc(f.t) + '</h3><p>' + esc(f.d) + '</p></div></li>';
        }).join('') + '</ol>' +
      '</div>';
  }

  /* ---------- Experience: routing-card style ---------- */
  function renderExperience() {
    $('#experience-list').innerHTML = D.experience.map(function (x, i) {
      return '<article class="op reveal" style="--d:' + (i * 0.08) + 's">' +
        '<div class="op-no"><small>Op</small><b>' + pad((i + 1) * 10) + '</b></div>' +
        '<div class="op-main">' +
          '<h3>' + esc(x.role) + '</h3>' +
          '<p class="op-org">' + C.meta([x.org, x.place, x.period]) + '</p>' +
          '<p class="op-sum">' + esc(x.summary) + '</p>' +
          (has(x.figures) ? '<div class="figs">' + x.figures.map(function (f) { return '<div class="fig"><b>' + esc(f.v) + '</b><span>' + esc(f.l) + '</span></div>'; }).join('') + '</div>' : '') +
          '<div class="op-cols">' +
            '<div><h4>Responsibilities</h4>' + C.bullets(x.responsibilities) + '</div>' +
            '<div><h4>Contributions</h4>' + C.bullets(x.contributions) + '</div>' +
          '</div>' +
          (has(x.exposure) ? '<h4>Technical exposure</h4>' + C.chips(x.exposure) : '') +
        '</div></article>';
    }).join('');
  }

  /* ---------- Education ---------- */
  function renderEducation() {
    var levels = ['Master', 'Bachelor', 'Diploma'];
    var html = D.education.map(function (e, i) {
      return '<article class="edu reveal" style="--d:' + (i * 0.08) + 's">' +
        '<span class="lvl">' + (levels[i] || 'Qualification') + '</span>' +
        '<h3>' + esc(e.degree) + '</h3>' +
        '<p class="org">' + C.meta([e.org, e.place, e.period]) + '</p>' +
        (has(e.note) ? '<p class="note">' + esc(e.note) + '</p>' : '') +
        (has(e.highlights) ? '<h4 style="margin-top:14px">Coursework and focus</h4>' + C.bullets(e.highlights) : '') +
      '</article>';
    }).join('');
    if (has(D.researchInterests)) {
      html += '<div class="edu-wide edu-interests reveal"><h3>Research interests</h3>' + C.chips(D.researchInterests) + '</div>';
    }
    $('#education-body').innerHTML = html;
  }

  /* ---------- Projects ---------- */
  var projects = D.projects;
  function diagramFor(p) {
    if (has(p.image)) return '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">';
    var fn = window.Diagrams && window.Diagrams[p.diagram];
    return fn ? fn() : '';
  }
  function renderProjects() {
    var types = [];
    projects.forEach(function (p) { if (has(p.type) && types.indexOf(p.type) < 0) types.push(p.type); });
    var f = $('#project-filters');
    f.innerHTML = ['All'].concat(types).map(function (t, i) {
      return '<button type="button" class="filter" data-type="' + esc(t) + '" aria-pressed="' + (i === 0) + '">' + esc(t) + '</button>';
    }).join('');
    f.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      $$('.filter', f).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      var t = b.dataset.type;
      $$('.proj').forEach(function (c) { c.classList.toggle('hide', t !== 'All' && c.dataset.type !== t); });
    });

    $('#project-grid').innerHTML = projects.map(function (p, i) {
      return '<article class="proj reveal' + (p.featured ? ' featured' : '') + '" data-type="' + esc(p.type) + '" style="--d:' + ((i % 3) * 0.07) + 's">' +
        '<div class="proj-fig" aria-hidden="true">' + diagramFor(p) + '</div>' +
        '<div class="proj-body">' +
          '<div class="proj-meta"><span class="chip">' + esc(p.type) + '</span>' + (has(p.status) ? '<span class="chip acc">' + esc(p.status) + '</span>' : '') + '</div>' +
          '<h3><button type="button" class="proj-open" data-id="' + esc(p.id) + '">' + esc(p.title) + '</button></h3>' +
          (has(p.short) ? '<p class="proj-short">' + esc(p.short) + '</p>' : '') +
          '<p>' + esc(p.summary) + '</p>' +
          '<span class="proj-go">Open project</span>' +
        '</div></article>';
    }).join('');

    $('#project-grid').addEventListener('click', function (e) {
      var b = e.target.closest('.proj-open'); if (b) openProject(b.dataset.id, b);
    });
  }

  /* ---------- Project dialog ---------- */
  var dlg = $('#project-dialog'), lastTrigger = null;
  function section(title, inner) { return has(inner) ? '<section class="pd-sec"><h4>' + title + '</h4>' + inner + '</section>' : ''; }
  function openProject(id, trigger) {
    var idx = projects.findIndex(function (p) { return p.id === id; });
    if (idx < 0) return;
    var p = projects[idx];
    lastTrigger = trigger || lastTrigger;
    var links = (p.links || []).filter(function (l) { return has(l.href); });
    var next = projects[(idx + 1) % projects.length];
    dlg.innerHTML =
      '<div class="pd-head"><div>' +
        '<div class="chips"><span class="chip solid">' + esc(p.type) + '</span>' + (has(p.status) ? '<span class="chip acc">' + esc(p.status) + '</span>' : '') + '</div>' +
        '<h3 id="pd-title">' + esc(p.title) + '</h3>' + (has(p.short) ? '<p class="pd-short">' + esc(p.short) + '</p>' : '') +
      '</div><button type="button" class="pd-close" aria-label="Close project">×</button></div>' +
      '<div class="pd-body">' +
        '<figure class="pd-fig">' + diagramFor(p) + '</figure>' +
        '<div class="pd-main">' +
          section('Problem', has(p.problem) ? '<p>' + esc(p.problem) + '</p>' : '') +
          section('Objectives', has(p.objectives) ? '<ol>' + p.objectives.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ol>' : '') +
          section('Methodology and tools', (has(p.method) ? '<p>' + esc(p.method) + '</p>' : '') + (has(p.tools) ? '<div style="margin-top:10px">' + C.chips(p.tools) + '</div>' : '')) +
          section('Implementation', has(p.implementation) ? '<p>' + esc(p.implementation) + '</p>' : '') +
          section('Results and key findings', C.bullets(p.results)) +
        '</div>' +
      '</div>' +
      '<div class="pd-foot">' +
        links.map(function (l) { return '<a class="btn small primary" href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>'; }).join('') +
        '<span class="sp"></span>' +
        (projects.length > 1 ? '<button type="button" class="btn small ghost" data-next="' + esc(next.id) + '">Next project →</button>' : '') +
      '</div>';
    if (!dlg.open) { dlg.showModal(); document.documentElement.classList.add('lock'); }
    dlg.scrollTop = 0;
    try { history.replaceState(null, '', '#project-' + id); } catch (e) {}
  }
  function closeProject() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.closest('.pd-close')) return closeProject();
    var n = e.target.closest('[data-next]'); if (n) openProject(n.dataset.next);
  });
  dlg.addEventListener('close', function () {
    document.documentElement.classList.remove('lock');
    try { history.replaceState(null, '', location.pathname + location.search + '#projects'); } catch (e) {}
    if (lastTrigger) lastTrigger.focus();
  });

  /* ---------- Skills ---------- */
  function renderSkills() {
    $('#skills-body').innerHTML = D.skills.map(function (c, i) {
      return '<article class="skill-card reveal" style="--d:' + ((i % 3) * 0.07) + 's"><h3>' + esc(c.cat) + '</h3>' +
        (has(c.blurb) ? '<p>' + esc(c.blurb) + '</p>' : '') +
        '<ul>' + c.items.map(function (it) {
          return '<li><i class="mk ' + esc(it.s) + '" aria-hidden="true"></i><span>' + esc(it.n) + '<span class="sr-only"> (' + esc(it.s) + ')</span></span></li>';
        }).join('') + '</ul></article>';
    }).join('');
  }

  /* ---------- Certifications and learning ---------- */
  function renderLearning() {
    var chipFor = function (s) {
      var cls = s === 'Completed' ? 'ok' : (s === 'In progress' ? 'acc' : '');
      return '<span class="chip ' + cls + '">' + esc(s) + '</span>';
    };
    var belts = (D.belts || []).map(function (b) { return '<div class="belt ' + esc(b.s) + '"><i></i><span>' + esc(b.n) + '</span></div>'; }).join('');
    $('#learning-body').innerHTML =
      '<div class="lcard reveal"><h3>Certifications and courses</h3><ul class="cert">' +
        D.certifications.map(function (c) { return '<li><span>' + esc(c.n) + (has(c.by) ? '<small>' + esc(c.by) + '</small>' : '') + '</span>' + chipFor(c.s) + '</li>'; }).join('') +
      '</ul></div>' +
      (belts ? '<div class="lcard reveal" style="--d:.08s"><h3>Lean Six Sigma path</h3><div class="belts">' + belts + '</div><p class="small">White Belt completed. Yellow is next, then Green.</p></div>' : '') +
      '<div class="lcard reveal" style="--d:.16s"><h3>Learning now</h3>' + C.bullets(D.learning) + '</div>';
  }

  /* ---------- Journey: revision table ---------- */
  function renderJourney() {
    var rows = D.journey;
    $('#journey-table tbody').innerHTML = rows.map(function (r, i) {
      return '<tr' + (i === rows.length - 1 ? ' class="current"' : '') + '><td>' + esc(r.rev) + '</td><td>' + esc(r.t) + '</td><td>' + esc(r.added) + '</td></tr>';
    }).join('');
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    var s = D.site;
    var items = [
      { l: 'LinkedIn', v: s.linkedin, href: s.linkedin, ext: true },
      { l: 'GitHub', v: s.github, href: s.github, ext: true },
      { l: 'Email', v: s.email, href: 'mailto:' + s.email },
      { l: 'Download CV', v: 'PDF', href: s.cv, dl: true }
    ].filter(function (i) { return has(i.v) && has(i.href); });
    $('#contact-links').innerHTML = items.map(function (i) {
      return '<li><a href="' + esc(i.href) + '"' + (i.ext ? ' target="_blank" rel="noopener"' : '') + (i.dl ? ' download' : '') + '><span>' + esc(i.l) +
        '<small>' + esc(i.v.replace(/^https?:\/\//, '')) + '</small></span><span aria-hidden="true">' + (i.dl ? '↓' : '↗') + '</span></a></li>';
    }).join('');
    $('#footer-updated').textContent = has(s.updated) ? 'Updated ' + s.updated : '';
    var st = $('#hero-status'); if (st && has(s.status)) st.textContent = s.status;
  }

  function wireForm() {
    var form = $('#contact-form'), out = $('#form-status'), s = D.site;
    var say = function (m, cls) { out.textContent = m; out.className = 'form-status ' + (cls || ''); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      if (f.get('_gotcha')) return;
      var name = (f.get('name') || '').trim(), email = (f.get('email') || '').trim(), msg = (f.get('message') || '').trim();
      var ok = true;
      [['name', name], ['email', /^\S+@\S+\.\S+$/.test(email) ? email : ''], ['message', msg]].forEach(function (p) {
        var el = form.elements[p[0]]; var bad = !p[1];
        el.setAttribute('aria-invalid', bad); if (bad && ok) { el.focus(); } ok = ok && !bad;
      });
      if (!ok) return say('Please fill in your name, a valid email and a message.', 'err');
      if (has(s.formEndpoint)) {
        say('Sending…');
        fetch(s.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: f })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say('Thank you. Your message was sent.', 'ok'); })
          .catch(function () { say('Could not send. Please email me directly at ' + s.email + '.', 'err'); });
      } else {
        location.href = 'mailto:' + s.email + '?subject=' + encodeURIComponent('Portfolio enquiry from ' + name) +
          '&body=' + encodeURIComponent(msg + '\n\n' + name + '\n' + email);
        say('Opening your email app…', 'ok');
      }
    });
  }

  /* ---------- Sheet furniture (numbers, dimension rules, title block) ---------- */
  function decorateSheets() {
    var sheets = $$('.sheet'), n = sheets.length;
    sheets.forEach(function (sec, i) {
      var h = $('h2', sec); if (!h) return;
      h.insertAdjacentHTML('beforebegin', '<p class="sheet-tag reveal"><span>Sheet ' + (i + 1) + ' / ' + n + '</span><span>' + esc(sec.dataset.sheet) + '</span></p>');
      h.insertAdjacentHTML('afterend', '<div class="dim-rule reveal" aria-hidden="true"><i></i><i></i></div>');
    });
    return sheets;
  }

  function setupScroll(sheets) {
    var n = sheets.length;
    // scroll dimension line
    var dl = $('.dimline'), mark = $('#dimline-mark');
    function ticks() {
      $$('.tick', dl).forEach(function (t) { t.remove(); });
      var max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0 || innerWidth < 1180) return;
      sheets.forEach(function (s) {
        var t = document.createElement('i'); t.className = 'tick';
        t.style.top = Math.min(100, Math.max(0, s.offsetTop / max * 100)) + '%';
        dl.appendChild(t);
      });
    }
    var tick = false;
    function onScroll() {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - innerHeight;
        mark.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
        tick = false;
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', function () { ticks(); onScroll(); });
    addEventListener('load', ticks);
    ticks(); onScroll();

    // current sheet -> title block + nav highlight
    if ('IntersectionObserver' in window) {
      var tbS = $('#tb-sheet'), tbT = $('#tb-title');
      var links = {}; $$('#nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = sheets.indexOf(e.target);
          tbS.textContent = (i + 1) + ' / ' + n; tbT.textContent = e.target.dataset.sheet;
          $$('#nav a').forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
          var a = links[e.target.id]; if (a) { a.classList.add('active'); a.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sheets.forEach(function (s) { spy.observe(s); });
    }
  }

  function setupReveal() {
    var els = $$('.reveal');
    if (reduced || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Chrome: theme, menu ---------- */
  function setupChrome() {
    var root = document.documentElement, tb = $('#theme-btn');
    function sync() {
      var dark = root.getAttribute('data-theme') === 'dark';
      tb.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    sync();
    tb.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
    var mb = $('#menu-btn'), nav = $('#nav');
    mb.addEventListener('click', function () { mb.setAttribute('aria-expanded', nav.classList.toggle('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); } });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
  }

  /* ---------- Boot ---------- */
  renderAbout(); renderExperience(); renderEducation(); renderProjects();
  renderSkills(); renderLearning(); renderJourney(); renderContact(); wireForm();
  var sheets = decorateSheets();
  setupChrome(); setupReveal(); setupScroll(sheets);

  // deep link: #project-<id>
  var m = location.hash.match(/^#project-(.+)$/);
  if (m) openProject(decodeURIComponent(m[1]));
})();
