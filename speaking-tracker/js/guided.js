/* guided.js — ONE generic renderer for guided practice modules:  LEARN → USE → REUSE → RETRIEVE → FINISHED.
 *
 * It knows nothing about a particular module: it reads the module object from the Master Practice Library.
 * Two content shapes are supported (a module may use either; data/lexical-modules.js documents both):
 *   LEARN     learnGroups:[{id,title,titleVi,note,items:[{word,meaning,example}]}] (+learnNotes:[…])   — grouped word list   |  learn:[{basic,unique,meaning,example}]  — "you might say → more unique" table
 *   USE/REUSE use:[…], reuse:[…]                                                                         — open questions (speaking)
 *   RETRIEVE  quiz:[{prompt,options:[{id,text}],answer,explain}]                                          — multiple choice, retry allowed, no pass mark  |  retrieve:[{term,meaning}]  — matching
 *   EXTRA     extra:[{prompt,words:[…]}] (+extraNote)                                                    — optional, shown after Finished; never required
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
  const X = { id: '', view: '', sel: -1, ok: {}, order: [], note: '', wrong: -1, host: null, m: null, busy: false, saveFailed: false, qi: 0, ans: {} };

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
    X.order = shuffle(m.retrieve.length, true); X.ok = {}; X.qi = 0; X.ans = {};
  }
  const solved = () => X.m.retrieve.length > 0 && X.m.retrieve.every((_, i) => X.ok[i]);
  const isQuiz = m => Array.isArray(m.quiz) && m.quiz.length > 0;
  const isGrouped = m => Array.isArray(m.learnGroups) && m.learnGroups.length > 0;
  const allWords = m => isGrouped(m) ? [].concat.apply([], m.learnGroups.map(g => (g.items || []).map(it => it.word))) : (m.learn || []).map(r => r.unique);
  const score = () => X.m.quiz.reduce((t, q, i) => t + (X.ans[i] === q.answer ? 1 : 0), 0);

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
  const foot = (label, step, primary, extra) => {
    if (X.host.preview) return h`<p class="hint g-prev">Xem trước — học viên bấm “${label}” để sang bước tiếp theo.</p>`;
    const reviewing = viewIndex() !== curIndex();
    if (reviewing) return h`<div class="g-foot">${extra || ''}<button type="button" class="btn ghost" data-action="g-view" data-step="${STEPS[curIndex()].id}">Về bước hiện tại</button></div>`;
    return h`<div class="g-foot">${extra || ''}<button type="button" class="btn ${primary ? 'primary' : 'dark'} lg" data-action="g-next" data-step="${step}" ${X.busy ? 'disabled' : ''}>${label}</button></div>`;
  };

  function learnGroupsPanel(m) {
    return h`${head(m.learnTitle || 'Learn the language', m.learnInstruction)}
      ${m.learnGroups.map(g => h`<section class="g-grp"><h3 class="g-gh"><span class="g-gl">${g.id}</span><span>${g.title}</span>${g.titleVi ? h`<span class="g-gv">— ${g.titleVi}</span>` : ''}</h3>
        <table class="gt g-gtab"><thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
          <tbody>${(g.items || []).map(it => h`<tr><th scope="row" data-l="Word"><b>${it.word}</b></th><td data-l="Meaning">${it.meaning}</td><td data-l="Example" class="gt-ex">${it.example}</td></tr>`)}</tbody></table>
        ${g.note ? h`<p class="g-gn"><b>Lưu ý:</b> ${g.note}</p>` : ''}</section>`)}
      ${(m.learnNotes || []).length ? h`<section class="g-grp"><h3 class="g-gh"><span>${m.learnNotesTitle || 'Lưu ý phân biệt'}</span></h3><ul class="g-notes">${m.learnNotes.map(t => h`<li>${t}</li>`)}</ul></section>` : ''}
      ${foot('Complete Learn →', 'learn', true)}`;
  }
  function learnPanel(m) {
    if (isGrouped(m)) return learnGroupsPanel(m);
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
  function matchPanel(m) {
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
  /* ---- multiple-choice Retrieve: one question at a time, answer + Vietnamese explanation right after, score of THIS attempt, retry allowed, no pass mark ---- */
  const keyOf = q => q.options.find(o => o.id === q.answer) || q.options[0];
  function quizPanel(m) {
    const qz = m.quiz, n = qz.length, hd = head(m.retrieveTitle || 'Retrieve the language', m.retrieveInstruction || 'Chọn đáp án phù hợp nhất với ngữ cảnh. Sau mỗi câu, bạn sẽ thấy đáp án và giải thích.');
    if (X.host.preview) {                                                         // teacher: the whole answer key, read-only
      return h`${hd}<div class="g-key">${qz.map((q, i) => h`<section class="g-qz"><span class="g-qn">Question ${i + 1} / ${n}</span><p class="g-qp">${q.prompt}</p>
        <ul class="g-ko">${q.options.map(o => h`<li class="${o.id === q.answer ? 'key' : ''}">${o.id}. ${o.text}${o.id === q.answer ? ' ✓' : ''}</li>`)}</ul>
        <p class="g-exp"><b>Giải thích:</b> ${q.explain}</p></section>`)}</div>
        <p class="hint g-prev">Xem trước — đáp án đúng có dấu ✓. Học viên làm từng câu, xem giải thích ngay sau khi chọn và có thể làm lại.</p>`;
    }
    if (X.qi >= n) {                                                              // result of this attempt
      const sc = score(), missed = qz.map((q, i) => [q, i]).filter(p => X.ans[p[1]] !== p[0].answer);
      return h`${hd}<div class="g-score" role="status"><b>${sc} / ${n}</b><span>câu đúng trong lượt làm này</span></div>
        ${missed.length ? h`<section class="g-miss"><h3 class="g-gh"><span>Câu cần xem lại</span></h3>${missed.map(p => h`<div class="g-qz"><span class="g-qn">Question ${p[1] + 1}</span><p class="g-qp">${p[0].prompt}</p>
          <p class="g-exp"><b>Đáp án: ${keyOf(p[0]).id}. ${keyOf(p[0]).text}.</b> ${p[0].explain}</p></div>`)}</section>` : h`<p class="g-allok">Bạn trả lời đúng tất cả các câu.</p>`}
        ${foot('Complete Retrieve →', 'retrieve', true, h`<button type="button" class="btn ghost" data-action="g-qretry">Làm lại</button>`)}`;
    }
    const q = qz[X.qi], a = X.ans[X.qi], answered = a !== undefined, key = keyOf(q);
    return h`${hd}<section class="g-qz"><span class="g-qn">Question ${X.qi + 1} / ${n}</span><p class="g-qp">${q.prompt}</p>
      ${q.prompt.indexOf('______') === -1 ? h`<p class="g-qh">Chọn từ phù hợp nhất để mô tả.</p>` : ''}
      <ul class="g-opts">${q.options.map(o => h`<li><button type="button" class="gm ${answered && o.id === q.answer ? 'ok' : ''} ${answered && o.id === a && a !== q.answer ? 'bad' : ''}" data-action="g-opt" data-k="${o.id}" ${answered ? 'disabled' : ''} ${answered && o.id === a ? 'aria-pressed="true"' : ''}>${o.id}. ${o.text}</button></li>`)}</ul>
      ${answered ? h`<div class="g-exp ${a === q.answer ? '' : 'bad'}" role="status"><b>${a === q.answer ? 'Chính xác.' : 'Chưa đúng.'} Đáp án: ${key.id}. ${key.text}.</b> ${q.explain}</div>
        <div class="g-foot"><button type="button" class="btn primary lg" data-action="g-qnext">${X.qi + 1 < n ? 'Next question →' : 'Xem điểm →'}</button></div>` : ''}</section>`;
  }
  function retrievePanel(m) { return isQuiz(m) ? quizPanel(m) : matchPanel(m); }
  function finishedPanel(m) {
    const done = X.host.assignment() && X.host.assignment().status === 'completed';
    if (!done && !X.host.preview) return h`<p class="none">Hoàn thành bước Retrieve để kết thúc module.</p>`;
    return h`<div class="g-done" role="status"><h2>Practice completed</h2>
      <p>${m.title}${m.focus ? ' — ' + m.focus : ''}. ${X.host.preview ? 'Học viên sẽ thấy màn hình này khi hoàn thành module.' : 'Bạn đã đi hết Learn → Use → Reuse → Retrieve. Bạn có thể mở lại bất kỳ bước nào ở thanh tiến độ phía trên để ôn tập.'}</p></div>
      ${(m.extra || []).length ? h`<section class="g-extra"><h3 class="g-gh"><span>Extra Practice</span><span class="g-gv">— tùy chọn, không bắt buộc</span></h3>
        <div class="g-ex-l">${m.extra.map((t, i) => h`<div class="g-ex-i"><span class="g-qn">Topic ${i + 1}</span><p class="g-qp">${t.prompt}</p>${(t.words || []).length ? h`<p class="g-exw"><span class="lbl">Gợi ý từ</span> ${t.words.join(' · ')}</p>` : ''}</div>`)}</div>
        ${m.extraNote ? h`<p class="g-gn">${m.extraNote}</p>` : ''}</section>` : ''}
      <div class="g-foot"><a class="btn dark" href="${X.host.back}">Quay lại việc cần làm</a></div>`;
  }
  function panel() {
    const m = X.m, v = STEPS[viewIndex()].id;
    if (v === 'learn') return learnPanel(m);
    if (v === 'use') return askPanel(m, 'use', m.useTitle || 'Use more unique language', m.useInstruction || 'Answer the questions below with more unique language.', 'Complete Use →', 'use', true, m.useWords && m.useWords.length ? m.useWords : allWords(m));
    if (v === 'reuse') return askPanel(m, 'reuse', m.reuseTitle || 'Reuse the language', m.reuseInstruction || 'Answer the questions below with more unique language.', 'Complete Reuse →', 'reuse', true, null);
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

  LU.actions['g-opt'] = el => {
    if (!guard() || X.host.preview || !isQuiz(X.m) || X.ans[X.qi] !== undefined) return;
    X.ans[X.qi] = el.dataset.k; refresh('[data-action=g-qnext]');
  };
  LU.actions['g-qnext'] = () => {
    if (!guard() || X.host.preview || !isQuiz(X.m)) return;
    X.qi = Math.min(X.m.quiz.length, X.qi + 1); refresh(X.qi >= X.m.quiz.length ? '' : '[data-action=g-opt]'); const p = document.getElementById('g-panel'); if (p && X.qi >= X.m.quiz.length) p.focus({ preventScroll: true });
  };
  LU.actions['g-qretry'] = () => { if (!guard() || X.host.preview || !isQuiz(X.m)) return; X.qi = 0; X.ans = {}; refresh('[data-action=g-opt]'); };
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
