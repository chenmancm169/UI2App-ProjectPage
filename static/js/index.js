/* UI2App project page — leaderboard, qualitative sliders, bibtex copy.
   Numbers verified against tables/table_main_results.tex. */
(function () {
  "use strict";

  // Main results: tables/table_main_results.tex; all application categories.
  var DATA = {
    "Content": [
      {"model": "Claude Sonnet 4.6", "org": "Anthropic", "exec1": 100.0, "exec3": 100.0, "delta": 0.0, "size": 64.9, "text": 78.7, "pos": 75.9, "color": 66.6, "vfs": 71.6, "iis": 57.3},
      {"model": "Gemini 3.1 Pro Preview", "org": "Google", "exec1": 100.0, "exec3": 100.0, "delta": 0.0, "size": 71.1, "text": 82.2, "pos": 79.8, "color": 69.8, "vfs": 75.7, "iis": 13.7},
      {"model": "Kimi K2.5", "org": "Moonshot", "exec1": 82.6, "exec3": 87.0, "delta": 4.3, "size": 57.4, "text": 70.1, "pos": 66.1, "color": 62.9, "vfs": 64.1, "iis": 37.2},
      {"model": "GPT-5.4", "org": "OpenAI", "exec1": 69.6, "exec3": 78.3, "delta": 8.7, "size": 49.2, "text": 59.0, "pos": 58.3, "color": 52.9, "vfs": 54.9, "iis": 16.3},
      {"model": "Qwen3.5-397B-A17B", "org": "Qwen", "exec1": 60.9, "exec3": 78.3, "delta": 17.4, "size": 47.4, "text": 57.7, "pos": 55.5, "color": 53.9, "vfs": 53.6, "iis": 29.4},
      {"model": "GLM-4.6V", "org": "Z.ai", "exec1": 43.5, "exec3": 69.6, "delta": 26.1, "size": 43.8, "text": 52.1, "pos": 46.1, "color": 47.8, "vfs": 47.4, "iis": 2.6}
    ],
    "Commerce": [
      {"model": "Claude Sonnet 4.6", "org": "Anthropic", "exec1": 95.8, "exec3": 100.0, "delta": 4.2, "size": 69.1, "text": 75.0, "pos": 74.6, "color": 68.8, "vfs": 71.9, "iis": 36.7},
      {"model": "Gemini 3.1 Pro Preview", "org": "Google", "exec1": 95.8, "exec3": 100.0, "delta": 4.2, "size": 68.9, "text": 75.1, "pos": 73.7, "color": 71.2, "vfs": 72.2, "iis": 10.2},
      {"model": "Kimi K2.5", "org": "Moonshot", "exec1": 87.5, "exec3": 87.5, "delta": 0.0, "size": 61.8, "text": 67.3, "pos": 65.4, "color": 65.0, "vfs": 64.8, "iis": 12.5},
      {"model": "GPT-5.4", "org": "OpenAI", "exec1": 83.3, "exec3": 91.7, "delta": 8.3, "size": 59.8, "text": 67.5, "pos": 66.5, "color": 65.7, "vfs": 64.9, "iis": 7.8},
      {"model": "Qwen3.5-397B-A17B", "org": "Qwen", "exec1": 83.3, "exec3": 87.5, "delta": 4.2, "size": 58.5, "text": 63.7, "pos": 62.7, "color": 60.6, "vfs": 61.4, "iis": 15.0},
      {"model": "GLM-4.6V", "org": "Z.ai", "exec1": 20.8, "exec3": 62.5, "delta": 41.7, "size": 39.9, "text": 40.0, "pos": 40.6, "color": 38.3, "vfs": 39.7, "iis": 10.3}
    ],
    "Admin": [
      {"model": "Claude Sonnet 4.6", "org": "Anthropic", "exec1": 90.0, "exec3": 100.0, "delta": 10.0, "size": 68.4, "text": 77.1, "pos": 78.1, "color": 62.1, "vfs": 71.4, "iis": 21.3},
      {"model": "Gemini 3.1 Pro Preview", "org": "Google", "exec1": 86.7, "exec3": 96.7, "delta": 10.0, "size": 71.0, "text": 78.8, "pos": 78.5, "color": 63.8, "vfs": 73.0, "iis": 4.9},
      {"model": "Kimi K2.5", "org": "Moonshot", "exec1": 60.0, "exec3": 66.7, "delta": 6.7, "size": 43.9, "text": 49.1, "pos": 49.9, "color": 39.5, "vfs": 45.6, "iis": 13.9},
      {"model": "GPT-5.4", "org": "OpenAI", "exec1": 56.7, "exec3": 73.3, "delta": 16.7, "size": 47.7, "text": 54.5, "pos": 54.7, "color": 45.5, "vfs": 50.6, "iis": 1.1},
      {"model": "Qwen3.5-397B-A17B", "org": "Qwen", "exec1": 70.0, "exec3": 76.7, "delta": 6.7, "size": 54.6, "text": 59.5, "pos": 59.0, "color": 49.6, "vfs": 55.7, "iis": 6.9},
      {"model": "GLM-4.6V", "org": "Z.ai", "exec1": 20.0, "exec3": 46.7, "delta": 26.7, "size": 25.9, "text": 29.4, "pos": 29.2, "color": 25.7, "vfs": 27.6, "iis": 3.5}
    ],
    "Specialty": [
      {"model": "Claude Sonnet 4.6", "org": "Anthropic", "exec1": 100.0, "exec3": 100.0, "delta": 0.0, "size": 71.4, "text": 79.5, "pos": 74.7, "color": 55.3, "vfs": 70.3, "iis": 36.7},
      {"model": "Gemini 3.1 Pro Preview", "org": "Google", "exec1": 72.2, "exec3": 94.4, "delta": 22.2, "size": 65.6, "text": 81.8, "pos": 80.1, "color": 59.1, "vfs": 71.7, "iis": 3.7},
      {"model": "Kimi K2.5", "org": "Moonshot", "exec1": 66.7, "exec3": 66.7, "delta": 0.0, "size": 47.4, "text": 56.5, "pos": 53.1, "color": 37.4, "vfs": 48.6, "iis": 16.5},
      {"model": "GPT-5.4", "org": "OpenAI", "exec1": 66.7, "exec3": 94.4, "delta": 27.8, "size": 66.3, "text": 77.1, "pos": 74.6, "color": 59.6, "vfs": 69.4, "iis": 3.5},
      {"model": "Qwen3.5-397B-A17B", "org": "Qwen", "exec1": 72.2, "exec3": 88.9, "delta": 16.7, "size": 64.2, "text": 72.4, "pos": 69.6, "color": 56.5, "vfs": 65.7, "iis": 11.9},
      {"model": "GLM-4.6V", "org": "Z.ai", "exec1": 11.1, "exec3": 27.8, "delta": 16.7, "size": 13.5, "text": 17.0, "pos": 16.8, "color": 15.0, "vfs": 15.6, "iis": 1.4}
    ],
    "Overall": [
      {"model": "Claude Sonnet 4.6", "org": "Anthropic", "exec1": 95.8, "exec3": 100.0, "delta": 4.2, "size": 68.3, "text": 77.4, "pos": 76.1, "color": 63.6, "vfs": 71.3, "iis": 36.8},
      {"model": "Gemini 3.1 Pro Preview", "org": "Google", "exec1": 89.5, "exec3": 97.9, "delta": 8.4, "size": 69.5, "text": 79.3, "pos": 77.9, "color": 66.3, "vfs": 73.2, "iis": 8.1},
      {"model": "Kimi K2.5", "org": "Moonshot", "exec1": 73.7, "exec3": 76.8, "delta": 3.2, "size": 52.3, "text": 60.2, "pos": 58.3, "color": 51.2, "vfs": 55.5, "iis": 19.7},
      {"model": "GPT-5.4", "org": "OpenAI", "exec1": 68.4, "exec3": 83.2, "delta": 14.7, "size": 54.7, "text": 63.2, "pos": 62.3, "color": 55.1, "vfs": 58.8, "iis": 6.9},
      {"model": "Qwen3.5-397B-A17B", "org": "Qwen", "exec1": 71.6, "exec3": 82.1, "delta": 10.5, "size": 55.7, "text": 62.6, "pos": 61.1, "color": 54.7, "vfs": 58.5, "iis": 15.3},
      {"model": "GLM-4.6V", "org": "Z.ai", "exec1": 24.2, "exec3": 52.6, "delta": 28.4, "size": 31.4, "text": 35.2, "pos": 33.8, "color": 32.2, "vfs": 33.2, "iis": 4.6}
    ]
  };

  var COLS_SHORT = [['exec1','EXEC@1'],['exec3','EXEC@3'],['vfs','VFS'],['iis','IIS']];
  var COLS_FULL  = [['exec1','EXEC@1'],['exec3','EXEC@3'],['size','Size'],['text','Text'],['pos','Pos'],['color','Color'],['vfs','VFS'],['iis','IIS']];

  var state = { cat: 'Overall', sortKey: 'iis', sortDir: 'desc', breakdown: false };

  var theadRow = document.getElementById('lbHead');
  var tbody = document.getElementById('lbBody');

  function cols() { return state.breakdown ? COLS_FULL : COLS_SHORT; }

  function render() {
    var rows = DATA[state.cat].slice();
    var defs = cols();

    // per-column extremes (for best/worst shading)
    var ext = {};
    defs.forEach(function (d) {
      var vals = rows.map(function (r) { return r[d[0]]; });
      ext[d[0]] = { max: Math.max.apply(null, vals), min: Math.min.apply(null, vals) };
    });

    rows.sort(function (a, b) {
      return state.sortDir === 'desc' ? b[state.sortKey] - a[state.sortKey] : a[state.sortKey] - b[state.sortKey];
    });

    // header
    while (theadRow.children.length > 2) theadRow.removeChild(theadRow.lastChild);
    defs.forEach(function (d) {
      var th = document.createElement('th');
      var cls = '';
      if (d[0] === state.sortKey) cls += ' sortcol';
      if (d[0] === 'iis') cls += ' iiscol';
      th.className = cls.trim();
      var arrow = d[0] === state.sortKey ? (state.sortDir === 'desc' ? ' ▾' : ' ▴') : '';
      th.textContent = d[1] + arrow;
      th.addEventListener('click', function () {
        if (state.sortKey === d[0]) state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
        else { state.sortKey = d[0]; state.sortDir = 'desc'; }
        render();
      });
      theadRow.appendChild(th);
    });

    // body
    tbody.innerHTML = '';
    rows.forEach(function (r, i) {
      var tr = document.createElement('tr');
      if (i === 0) tr.className = 'top';

      var rank = document.createElement('td');
      rank.className = 'td-rank'; rank.textContent = String(i + 1);
      tr.appendChild(rank);

      var model = document.createElement('td');
      model.className = 'td-model';
      model.innerHTML = esc(r.model) + '<span class="org">' + esc(r.org) + '</span>';
      tr.appendChild(model);

      defs.forEach(function (d) {
        var k = d[0], v = r[k];
        var td = document.createElement('td');
        var cls = '';
        if (k === 'iis') cls += ' cell-iis';
        if (v === ext[k].max) cls += ' cell-best';
        td.className = cls.trim();
        td.textContent = v.toFixed(1);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }

  // category tabs
  Array.prototype.forEach.call(document.querySelectorAll('#lbTabs button'), function (btn) {
    btn.addEventListener('click', function () {
      state.cat = btn.getAttribute('data-cat');
      Array.prototype.forEach.call(document.querySelectorAll('#lbTabs button'), function (b) {
        b.classList.toggle('is-link', b === btn);
        b.classList.toggle('is-light', b !== btn);
      });
      render();
    });
  });

  // breakdown toggle
  var bd = document.getElementById('btnBreakdown');
  if (bd) bd.addEventListener('click', function () {
    state.breakdown = !state.breakdown;
    bd.textContent = state.breakdown ? 'Hide VFS breakdown' : 'Show VFS breakdown';
    render();
  });

  // bibtex copy
  var cp = document.getElementById('btnCopyBib');
  if (cp) cp.addEventListener('click', function () {
    var txt = document.getElementById('bibtexBlock').textContent;
    try { if (navigator.clipboard) navigator.clipboard.writeText(txt); } catch (e) {}
    cp.textContent = 'Copied ✓';
    setTimeout(function () { cp.textContent = 'Copy'; }, 1500);
  });

  render();
})();

/* ---------- keep each 3-up contrast trio looping in lockstep ----------
   The clips share a beat-aligned recipe; native per-video `loop` lets them drift
   out of phase. Instead: start the trio together and restart it only when the
   longest clip finishes, so the side-by-side comparison stays synchronized. */
(function () {
  "use strict";
  function syncGroup(group) {
    var vids = Array.prototype.slice.call(group.querySelectorAll('video'));
    if (vids.length < 2) return;
    vids.forEach(function (v) { v.loop = false; v.muted = true; });
    function startAll() {
      vids.forEach(function (v) {
        try { v.currentTime = 0; var p = v.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
      });
    }
    function maybeRestart() {
      // restart once every clip has ended (driven by the longest one)
      for (var i = 0; i < vids.length; i++) { if (!vids[i].ended) return; }
      startAll();
    }
    vids.forEach(function (v) { v.addEventListener('ended', maybeRestart); });
    // kick them off together once all can play through
    var ready = 0;
    vids.forEach(function (v) {
      if (v.readyState >= 3) { ready++; }
      else {
        v.addEventListener('canplay', function onc() {
          v.removeEventListener('canplay', onc);
          if (++ready === vids.length) startAll();
        });
      }
    });
    if (ready === vids.length) startAll();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.gallery-grid-3'), syncGroup);
})();
