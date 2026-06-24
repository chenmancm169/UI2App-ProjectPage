/* UI2App project page — leaderboard, qualitative sliders, bibtex copy.
   Numbers verified against tables/table_main_results.tex. */
(function () {
  "use strict";

  // ---------- leaderboard data: per-category cuts ----------
  // fields: model, org, exec1, exec3, nrs, size, text, pos, color, vfs, iis
  var DATA = {
    Overall: [
      ['Claude Sonnet 4.6','Anthropic',95.6,100.0,87.3,72.0,85.3,76.8,68.5,75.7,39.3],
      ['Gemini 3.1 Pro Preview','Google',88.9,100.0,78.2,73.0,88.8,80.3,70.5,78.1,7.5],
      ['Kimi K2.5 Thinking','Moonshot',86.7,86.7,64.6,61.4,73.8,66.3,59.5,65.3,20.7],
      ['GPT-5.4','OpenAI',64.4,82.2,66.6,57.9,72.0,66.4,63.5,65.0,6.7],
      ['Qwen3.5-397B-A17B','Qwen',66.7,77.8,55.7,51.8,63.3,56.6,52.4,56.0,13.2],
      ['GLM-4.6V','Z.ai',33.3,35.6,22.3,20.4,25.8,21.7,22.6,22.6,4.5]
    ],
    Content: [
      ['Claude Sonnet 4.6','Anthropic',100.0,100.0,95.4,67.6,85.2,76.3,68.8,74.5,46.4],
      ['Gemini 3.1 Pro Preview','Google',100.0,100.0,91.0,71.6,88.4,80.1,71.6,77.9,7.6],
      ['Kimi K2.5 Thinking','Moonshot',100.0,100.0,88.6,68.2,84.7,75.8,73.4,75.6,22.7],
      ['GPT-5.4','OpenAI',62.5,75.0,68.5,50.7,64.5,60.4,56.6,58.0,8.0],
      ['Qwen3.5-397B-A17B','Qwen',75.0,81.2,69.8,43.7,60.7,52.5,51.6,52.1,26.1],
      ['GLM-4.6V','Z.ai',56.2,56.2,47.0,34.8,45.1,38.0,38.6,39.1,6.2]
    ],
    Admin: [
      ['Claude Sonnet 4.6','Anthropic',93.8,100.0,94.2,76.1,85.1,80.2,63.5,76.2,25.0],
      ['Gemini 3.1 Pro Preview','Google',81.2,100.0,72.9,74.7,88.5,81.9,61.3,76.6,7.4],
      ['Kimi K2.5 Thinking','Moonshot',68.8,68.8,52.9,52.8,59.9,56.8,37.8,51.8,13.9],
      ['GPT-5.4','OpenAI',50.0,75.0,59.8,54.5,64.1,61.0,54.0,58.4,2.0],
      ['Qwen3.5-397B-A17B','Qwen',50.0,62.5,43.0,50.5,55.3,51.6,41.5,49.7,4.2],
      ['GLM-4.6V','Z.ai',25.0,25.0,11.5,12.3,14.5,12.7,13.0,13.1,4.0]
    ],
    Transaction: [
      ['Claude Sonnet 4.6','Anthropic',83.3,100.0,69.7,76.5,85.6,68.5,79.2,77.5,51.8],
      ['Gemini 3.1 Pro Preview','Google',83.3,100.0,68.0,77.6,90.4,72.1,87.4,81.9,11.6],
      ['Kimi K2.5 Thinking','Moonshot',100.0,100.0,59.3,73.3,85.8,68.1,82.7,77.5,30.7],
      ['GPT-5.4','OpenAI',100.0,100.0,58.3,69.3,89.2,71.9,87.2,79.4,13.5],
      ['Qwen3.5-397B-A17B','Qwen',66.7,83.3,38.3,60.6,69.3,58.4,65.6,63.5,11.0],
      ['GLM-4.6V','Z.ai',33.3,33.3,9.4,24.6,30.5,24.0,27.6,26.7,0.5]
    ],
    Specialty: [
      ['Claude Sonnet 4.6','Anthropic',100.0,100.0,67.8,69.0,85.8,77.8,70.1,75.7,45.1],
      ['Gemini 3.1 Pro Preview','Google',85.7,100.0,69.5,68.2,88.9,84.2,74.8,79.0,4.1],
      ['Kimi K2.5 Thinking','Moonshot',85.7,85.7,41.4,54.8,70.5,65.0,57.3,61.9,23.3],
      ['GPT-5.4','OpenAI',71.4,100.0,85.1,72.8,92.3,87.4,81.0,83.4,8.6],
      ['Qwen3.5-397B-A17B','Qwen',85.7,100.0,67.3,65.9,82.2,75.9,67.6,72.9,5.9],
      ['GLM-4.6V','Z.ai',0.0,14.3,1.4,2.7,3.6,2.6,3.9,3.2,4.8]
    ]
  };
  var KEYS = ['model','org','exec1','exec3','nrs','size','text','pos','color','vfs','iis'];
  function toObj(row) { var o = {}; KEYS.forEach(function (k, i) { o[k] = row[i]; }); return o; }

  var COLS_SHORT = [['exec1','EXEC@1'],['exec3','EXEC@3'],['nrs','NRS'],['vfs','VFS'],['iis','IIS']];
  var COLS_FULL  = [['exec1','EXEC@1'],['exec3','EXEC@3'],['nrs','NRS'],['size','Size'],['text','Text'],['pos','Pos'],['color','Color'],['vfs','VFS'],['iis','IIS']];

  var state = { cat: 'Overall', sortKey: 'iis', sortDir: 'desc', breakdown: false };

  var theadRow = document.getElementById('lbHead');
  var tbody = document.getElementById('lbBody');

  function cols() { return state.breakdown ? COLS_FULL : COLS_SHORT; }

  function render() {
    var rows = DATA[state.cat].map(toObj);
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
        else if (v === ext[k].min) cls += ' cell-worst';
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
