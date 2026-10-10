/* guided.js — ONE generic renderer for guided practice modules:  LEARN → USE → REUSE → RETRIEVE → FINISHED.
 *
 * It knows nothing about a particular module: it reads the module object from the Master Practice Library
 * ({learn:[{basic,unique,meaning,example}], use:[…], reuse:[…], retrieve:[{term,meaning}], …titles/instructions}).
 * Progress is NOT kept here: it lives on the student's assignment (assignment.steps, saved by the server one step at a time).
 * This file only holds throw-away view state (which step is on screen, the current matching attempt).
 *
 * Host (student.js) calls  LU.guided.mount(module, { assignment: () => a|null, preview: bool, step: async stepId => assignment, back: href })
 * and puts the returned markup in the page. Clicks come back through LU.actions['g-…'].
 */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  const G = LU.guided = {};

  const STEPS = [
    { id: 'learn', label: 'Learn' }, { id: 'use', label: 'Use' }, { id: 'reuse', label: 'Reuse' },
    { id: 'retrieve', label: 'Retrieve' }, { id: 'finished', label: 'Finished' }
  ];
  const X = { id: '', view: '', sel: -1, ok: {}, order: [], note: '', wrong: -1, host: null, m: null, busy: false, saveFailed: false };

  const doneCount = a => a ? (a.status === 'completed' ? 4 : Math.min(4, (a.steps || []).length)) : 0;   // finished steps among the four
  /** index (0-4) of the step the student is working on; 4 = Finished. */
  const curIndex = () => X.host.preview ? 0 : (X.host.assignment() && X.host.assignment().status === 'completed' ? 4 : doneCount(X.host.assignment()));
  const unlocked = i => X.host.preview ? true : i <= Math.min(4, curIndex());                  // current + everything before it
  const viewIndex = () => { const c = curIndex(), v = STEPS.findIndex(s => s.id === X.view); return v !== -1 && unlocked(v) ? v : c; };

  function shuffle(n, avoidIdentity) {
    const a = Array.from({ length: n }, (_, i) => i);
    for (let k = 0; k < 6; k++) {
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!avoidIdentity || n < 2 || a.some((v, i) => v !== i)) break;
    }
    return a;
  }
  function reset(m, host) {
    X.id = m.id; X.m = m; X.host = host; X.view = ''; X.sel = -1; X.note = ''; X.wrong = -1; X.busy = false; X.saveFailed = false;
    X.order = shuffle(m.retrieve.length, true); X.ok = {};
  }
  const solved = () => X.m.retrieve.length > 0 && X.m.retrieve.every((_, i) => X.ok[i]);

  /* ------------------------------------------------------------ pieces */
  function bar() {
    const c = curIndex(), v = viewIndex(), allDone = X.host.assignment() && X.host.assignment().status === 'completed';
    return h`<nav class="gp" aria-label="Tiến độ luyện tập"><ol>${STEPS.map((s, i) => {
      const done = allDone || i < c, cur = !allDone && i === c, ok = unlocked(i);
      const mark = X.host.preview ? '○' : done ? '✓' : cur ? '●' : '○';
      return h`<li class="gp-i ${done ? 'done' : cur ? 'cur' : 'todo'} ${i === v ? 'view' : ''}"><button type="button" class="gp-b" data-action="g-view" data-step="${s.id}" ${ok ? '' : 'disabled'} ${i === v ? 'aria-current="step"' : ''}>
        <span class="gp-m" aria-hidden="true">${mark}</span><span class="gp-l">${s.label}</span></button></li>`;
    })}</ol></nav>`;
  }
  const head = (title, ins) => h`<header class="g-ph"><h2>${title}</h2>${ins ? h`<p class="g-ins">${ins}</p>` : ''}</header>`;
  const foot = (label, step, primary) => {
    if (X.host.preview) return h`<p class="hint g-prev">Xem trước — học viên bấm “${label}” để sang bước tiếp theo.</p>`;
    const reviewing = viewIndex() !== curIndex();
    if (reviewing) return h`<div class="g-foot"><button type="button" class="btn ghost" data-action="g-view" data-step="${STEPS[curIndex()].id}">Về bước hiện tại</button></div>`;
    return h`<div class="g-foot"><button type="button" class="btn ${primary ? 'primary' : 'dark'} lg" data-action="g-next" data-step="${step}" ${X.busy ? 'disabled' : ''}>${label}</button></div>`;
  };

  function learnPanel(m) {
    return h`${head(m.lessonTitle || m.title, m.learnInstruction || 'Learn natural alternatives to words you may use too often.')}
      <table class="gt"><thead><tr><th scope="col">You might say</th><th scope="col">More unique</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
        <tbody>${m.learn.map(r => h`<tr><td data-l="You might say">${(r.basic || []).join(' / ')}</td><th scope="row" data-l="More unique"><b>${r.unique}</b></th><td data-l="Meaning">${r.meaning}</td><td data-l="Example" class="gt-ex">${r.example}</td></tr>`)}</tbody></table>
      ${foot('Complete Learn →', 'learn', true)}`;
  }
  function askPanel(m, key, title, ins, label, step, primary, words) {
    const qs = m[key];
    return h`${head(title, ins)}
      <div class="g-qs">${qs.map((q, i) => h`<section class="g-q"><span class="g-qn">Question ${i + 1}</span><p>${q}</p></section>`)}</div>
      ${words && words.length ? h`<p class="g-words" aria-label="Suggested language"><span class="lbl">Suggested language</span> ${words.join(' · ')}</p>` : ''}
      ${foot(label, step, primary)}`;
  }
  function retrievePanel(m) {
    const done = X.host.assignment() && X.host.assignment().status === 'completed';
    const ok = i => done || !!X.ok[i], n = m.retrieve.filter((_, i) => ok(i)).length;
    return h`${head(m.retrieveTitle || 'Retrieve the language', m.retrieveInstruction || 'Match the words with their meanings.')}
      <div class="g-match ${X.host.preview ? 'is-prev' : ''}">
        <div class="g-col"><span class="lbl">Words</span><ul>${m.retrieve.map((r, i) => h`<li><button type="button" class="gm ${ok(i) ? 'ok' : ''} ${X.sel === i ? 'sel' : ''}" data-action="g-term" data-i="${i}" aria-pressed="${X.sel === i}" ${ok(i) || done || X.host.preview ? 'disabled' : ''}>${r.term}</button></li>`)}</ul></div>
        <div class="g-col"><span class="lbl">Meanings</span><ul>${X.order.map(j => h`<li><button type="button" class="gm mean ${ok(j) ? 'ok' : ''} ${X.wrong === j ? 'bad' : ''}" data-action="g-mean" data-j="${j}" ${ok(j) || done || X.host.preview ? 'disabled' : ''}>${m.retrieve[j].meaning}</button></li>`)}</ul></div>
      </div>
      <p class="g-count" role="status" aria-live="polite"><b>${n} / ${m.retrieve.length}</b> matched${X.note ? h` · <span class="${X.wrong !== -1 ? 'g-bad' : ''}">${X.note}</span>` : ''}</p>
      ${X.host.preview ? h`<p class="hint g-prev">Xem trước — học viên bấm chọn từ rồi chọn nghĩa; khi đúng cả 6 cặp, module tự hoàn thành.</p>` : ''}
      ${!done && !X.host.preview && solved() && X.saveFailed ? h`<div class="g-foot"><button type="button" class="btn primary lg" data-action="g-save" ${X.busy ? 'disabled' : ''}>Lưu kết quả</button></div>` : ''}`;
  }
  function finishedPanel(m) {
    const done = X.host.assignment() && X.host.assignment().status === 'completed';
    if (!done && !X.host.preview) return h`<p class="none">Hoàn thành bước Retrieve để kết thúc module.</p>`;
    return h`<div class="g-done" role="status"><h2>Practice completed</h2>
      <p>${m.title}${m.focus ? ' — ' + m.focus : ''}. ${X.host.preview ? 'Học viên sẽ thấy màn hình này khi hoàn thành module.' : 'Bạn đã đi hết Learn → Use → Reuse → Retrieve.'}</p>
      <div class="g-foot"><a class="btn dark" href="${X.host.back}">Quay lại việc cần làm</a></div></div>`;
  }
  function panel() {
    const m = X.m, v = STEPS[viewIndex()].id;
    if (v === 'learn') return learnPanel(m);
    if (v === 'use') return askPanel(m, 'use', m.useTitle || 'Use more unique language', m.useInstruction || 'Answer the questions below with more unique language.', 'Complete Use →', 'use', true, m.useWords && m.useWords.length ? m.useWords : m.learn.map(r => r.unique));
    if (v === 'reuse') return askPanel(m, 'reuse', m.reuseTitle || 'Reuse the language', m.reuseInstruction || 'Answer the questions below with more unique language.', '✓ Finish Practice', 'reuse', true, null);
    if (v === 'retrieve') return retrievePanel(m);
    return finishedPanel(m);
  }
  function meta(m) {
    const items = [['Category', 'Lexical Resource'], ['Focus', m.focus], ['Level', m.level], ['Best for', m.bestFor]].filter(x => x[1]);
    return h`<dl class="g-meta">${items.map(x => h`<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`)}</dl>`;
  }
  const inner = () => h`${bar()}<div class="g-panel" id="g-panel" tabindex="-1">${panel()}</div>`;

  /** Host entry point. Returns the module page body (header + progress + current step). */
  G.mount = function (m, host) {
    if (X.id !== m.id || X.host === null || X.host.preview !== host.preview) reset(m, host); else X.host = host;
    return h`<header class="mod-h g-head"><div><p class="eyebrow">${m.category === 'lexical' ? 'LEXICAL RESOURCE' : ''}${m.subcategory ? ' · ' + LU.practice.subLabel(m.category, m.subcategory) : ''}</p><h1>${m.title}</h1></div>${meta(m)}</header>
      <div id="g-root" class="g-root">${inner()}</div>`;
  };
  G.reset = () => { X.id = ''; X.host = null; };

  function refresh(focusSel) {
    const root = document.getElementById('g-root'); if (!root) return;
    root.innerHTML = inner().s;
    if (focusSel) { const el = root.querySelector(focusSel); if (el && !el.disabled) el.focus(); }
  }
  const guard = () => !!X.host && !!X.m;

  LU.actions['g-view'] = el => {
    if (!guard()) return; const id = el.dataset.step, i = STEPS.findIndex(s => s.id === id);
    if (i === -1 || !unlocked(i)) return;
    X.view = id; refresh('.gp-i.view .gp-b'); const p = document.getElementById('g-panel'); if (p) p.focus({ preventScroll: true });
  };
  async function advance(step) {
    if (!guard() || X.host.preview || X.busy) return false;
    X.busy = true; X.saveFailed = false; refresh();
    try { await X.host.step(step); X.busy = false; X.view = ''; X.note = ''; refresh(); const p = document.getElementById('g-panel'); if (p) p.focus({ preventScroll: true }); window.scrollTo({ top: 0 }); return true; }
    catch (e) { X.busy = false; LU.toast(LU.errText(e, 'save'), true); refresh(); return false; }
  }
  LU.actions['g-next'] = el => { advance(el.dataset.step); };
  LU.actions['g-save'] = () => { advance('retrieve').then(ok => { if (!ok) { X.saveFailed = true; refresh('[data-action=g-save]'); } }); };

  LU.actions['g-term'] = el => {
    if (!guard() || X.host.preview) return; const i = Number(el.dataset.i);
    X.sel = X.sel === i ? -1 : i; X.wrong = -1; X.note = X.sel === -1 ? '' : 'Chọn nghĩa tương ứng.'; refresh('[data-action=g-term][data-i="' + i + '"]');
  };
  LU.actions['g-mean'] = el => {
    if (!guard() || X.host.preview) return; const j = Number(el.dataset.j);
    if (X.sel === -1) { X.note = 'Chọn một từ trước.'; X.wrong = -1; refresh('[data-action=g-mean][data-j="' + j + '"]'); return; }
    if (X.sel === j) {                                                           // correct pair
      X.ok[j] = true; X.sel = -1; X.wrong = -1; X.note = '';
      if (solved()) { X.note = 'Đã nối đúng cả ' + X.m.retrieve.length + ' cặp.'; refresh(); advance('retrieve').then(ok => { if (!ok) { X.saveFailed = true; refresh('[data-action=g-save]'); } }); return; }
      refresh('[data-action=g-term]:not([disabled])');
    } else { X.wrong = j; X.note = 'Chưa đúng — thử nghĩa khác.'; refresh('[data-action=g-mean][data-j="' + j + '"]'); }
  };
})();
