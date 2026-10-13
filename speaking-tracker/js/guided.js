/* guided.js — ONE generic renderer for guided practice modules:  LEARN → USE → REUSE → RETRIEVE → FINISHED.
 *
 * It knows nothing about a particular module: it reads the module object from the Master Practice Library.
 * Two content shapes are supported (a module may use either; data/lexical-modules.js documents both):
 *   LEARN     learnGroups:[{id,title,titleVi,note,items:[{word,meaning,example}]}] (+learnNotes:[…])   — grouped word list, ONE GROUP AT A TIME   |  learn:[{basic,unique,meaning,example}]  — "you might say → more unique" table
 *   USE/REUSE use:[…], reuse:[…]  (+ optional useHints/reuseHints:[[word,…],…])                         — open speaking questions, ONE QUESTION AT A TIME
 *   RETRIEVE  quiz:[{prompt,options:[{id,text}],answer,explain}]                                          — multiple choice, one question at a time, retry allowed, no pass mark  |  retrieve:[{term,meaning}]  — matching
 *   EXTRA     extra:[{prompt,words:[…]}] (+extraNote)                                                    — optional, folded under Finished; never required
 * Progress is NOT kept here: it lives on the student's assignment (assignment.steps, saved by the server one step at a time).
 * This file only holds view state (which step/group/question is on screen, the current quiz attempt). That view state is mirrored to
 * sessionStorage (host.store) so a page reload resumes the same place — it NEVER unlocks a step or marks anything completed; the server does.
 *
 * Host (student.js) calls  LU.guided.mount(module, { assignment: () => a|null, preview: bool, step: async stepId => assignment,
 *                                                    back: href, backLabel: 'Về Practice Plan', store: {get,set,remove}|null })
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
  const X = { id: '', sig: '', view: '', gi: 0, ui: { use: 0, reuse: 0 }, hint: {}, sel: -1, ok: {}, order: [], note: '', wrong: -1,
    host: null, m: null, busy: false, saveFailed: false, qi: 0, ans: {}, justSaved: false };

  /** Small non-cryptographic string hash (cyrb53). Used for a content fingerprint and, by student.js, for a storage namespace. */
  G.hash = function (str) {
    str = String(str); let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  };

  /* ------------------------------------------------------------ progress (server truth) */
  const asg = () => X.host && X.host.assignment ? X.host.assignment() : null;
  const isDone = () => { const a = asg(); return !!a && a.status === 'completed'; };
  const doneCount = a => a ? (a.status === 'completed' ? 4 : Math.min(4, (a.steps || []).length)) : 0;   // finished steps among the FOUR
  /** index (0-4) of the step the student is working on; 4 = Finished. */
  const curIndex = () => X.host.preview ? 0 : (isDone() ? 4 : doneCount(asg()));
  const unlocked = i => X.host.preview ? true : i <= Math.min(4, curIndex());                  // current + everything before it
  const viewIndex = () => { const c = curIndex(), v = STEPS.findIndex(s => s.id === X.view); return v !== -1 && unlocked(v) ? v : c; };
  const reviewing = () => !X.host.preview && viewIndex() !== curIndex();

  /* ------------------------------------------------------------ content helpers */
  const A = v => Array.isArray(v) ? v : [];
  const isQuiz = m => A(m.quiz).length > 0;
  const isGrouped = m => A(m.learnGroups).length > 0;
  const allWords = m => isGrouped(m) ? [].concat.apply([], m.learnGroups.map(g => A(g.items).map(it => it.word))) : A(m.learn).map(r => r.unique);
  const score = () => X.m.quiz.reduce((t, q, i) => t + (X.ans[i] === q.answer ? 1 : 0), 0);
  const optOf = (q, id) => q.options.find(o => o.id === id) || null;
  const keyOf = q => optOf(q, q.answer) || q.options[0];
  const solved = () => A(X.m.retrieve).length > 0 && X.m.retrieve.every((_, i) => X.ok[i]);
  const sigOf = m => G.hash(JSON.stringify([A(m.learnGroups).map(g => [g.id, A(g.items).map(i => i.word)]), A(m.learn).map(r => r.unique), A(m.use), A(m.reuse),
    A(m.quiz).map(q => [q.prompt, A(q.options).map(o => o.id), q.answer]), A(m.retrieve).map(r => r.term)]));

  /** 3–5 words for one question: the module's own list for that question, else a few learn words spread over the module (no module id is ever tested). */
  function hintsFor(m, key, i) {
    const own = A(m[key + 'Hints'])[i];
    if (Array.isArray(own) && own.length) return own.slice(0, 5);
    const list = A(m[key + 'Words']).length ? m[key + 'Words'] : allWords(m), n = Math.max(1, A(m[key]).length);
    if (list.length <= 4) return list.slice();
    const start = Math.floor(i * list.length / n), out = [];
    for (let k = 0; k < 4; k++) out.push(list[(start + k) % list.length]);
    return out;
  }
  /** A question made of two sentences is shown on two lines (text unchanged). */
  function qLines(q) {
    const t = String(q == null ? '' : q).trim(), parts = t.match(/[^.?!]+[.?!]+(?:\s+|$)/g);
    if (!parts || parts.length < 2 || parts.join('').trim() !== t) return h`${t}`;
    return h`${parts.map(s => h`<span class="g-ql">${s.trim()}</span>`)}`;
  }
  /** Example sentence with the target word in bold. Pure string slicing: every piece goes through the escaping template. */
  function emph(text, word) {
    const t = String(text == null ? '' : text), w = String(word == null ? '' : word).trim();
    if (!w) return h`${t}`;
    const low = t.toLowerCase(), lw = w.toLowerCase(), isL = c => c !== undefined && /[A-Za-z0-9À-ɏ]/.test(c);
    for (let i = low.indexOf(lw); i !== -1; i = low.indexOf(lw, i + 1)) {
      if (isL(t[i - 1]) || isL(t[i + w.length])) continue;
      return h`${t.slice(0, i)}<b class="g-hit">${t.slice(i, i + w.length)}</b>${t.slice(i + w.length)}`;
    }
    return h`${t}`;
  }

  /* ------------------------------------------------------------ view state: reset / save / restore (sessionStorage via host.store) */
  function shuffle(n, avoidIdentity) {
    const a = Array.from({ length: n }, (_, i) => i);
    for (let k = 0; k < 6; k++) {
      for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
      if (!avoidIdentity || n < 2 || a.some((v, i) => v !== i)) break;
    }
    return a;
  }
  function save() {
    const st = X.host && X.host.store; if (!st || !X.m) return;
    try { st.set(JSON.stringify({ v: 1, sig: X.sig, view: X.view, gi: X.gi, ui: X.ui, qi: X.qi, ans: X.ans })); } catch (e) { /* storage is optional */ }
  }
  /** Take the saved view state back only if it still fits THIS content. Anything odd → ignored (and removed). */
  function restore(m) {
    const st = X.host.store; if (!st) return;
    let o = null; try { o = JSON.parse(st.get() || 'null'); } catch (e) { o = null; }
    if (!o || typeof o !== 'object') return;
    const int = (v, lo, hi) => typeof v === 'number' && isFinite(v) && Math.floor(v) === v && v >= lo && v <= hi;
    if (o.v !== 1 || o.sig !== X.sig) { st.remove(); return; }
    if (STEPS.some(s => s.id === o.view)) X.view = o.view;
    const pages = isGrouped(m) ? m.learnGroups.length : 1; if (int(o.gi, 0, pages - 1)) X.gi = o.gi;
    const u = o.ui && typeof o.ui === 'object' ? o.ui : {};
    ['use', 'reuse'].forEach(k => { if (int(u[k], 0, Math.max(0, A(m[k]).length - 1))) X.ui[k] = u[k]; });
    if (isQuiz(m) && o.ans && typeof o.ans === 'object' && int(o.qi, 0, m.quiz.length)) {
      const keys = Object.keys(o.ans);
      let good = keys.every(k => /^\d{1,3}$/.test(k) && +k < m.quiz.length && A(m.quiz[+k].options).some(op => op.id === o.ans[k]) && +k <= o.qi);
      for (let i = 0; good && i < o.qi; i++) if (o.ans[i] === undefined) good = false;     // sequential: every earlier question was answered
      if (good) { X.qi = o.qi; keys.forEach(k => { X.ans[+k] = o.ans[k]; }); }
    }
  }
  function reset(m, host) {
    X.id = m.id; X.m = m; X.host = host; X.sig = sigOf(m); X.view = ''; X.gi = 0; X.ui = { use: 0, reuse: 0 }; X.hint = {};
    X.sel = -1; X.note = ''; X.wrong = -1; X.busy = false; X.saveFailed = false; X.justSaved = false;
    X.order = shuffle(A(m.retrieve).length, true); X.ok = {}; X.qi = 0; X.ans = {};
    restore(m);
  }
  /** A finished step starts from its beginning next time (a completed Retrieve attempt is over). */
  function clearStep(step) {
    if (step === 'learn') X.gi = 0; else if (step === 'use') X.ui.use = 0; else if (step === 'reuse') { X.ui.reuse = 0; X.hint = {}; }
    else if (step === 'retrieve') { X.qi = 0; X.ans = {}; X.ok = {}; }
  }

  /* ------------------------------------------------------------ pieces */
  const eyebrowOf = m => [LU.practice.groupLabel(m.category), m.subcategory ? LU.practice.subLabel(m.category, m.subcategory) : ''].filter(Boolean).join(' · ');
  const header = m => h`<header class="g-hd"><p class="eyebrow">${eyebrowOf(m)}</p><h1>${m.title}</h1>${m.focus ? h`<p class="g-focus">${m.focus}</p>` : ''}</header>`;

  /** Four steps + a small end marker. Finished is where you land, not a fifth task: it has no number and is not counted. */
  function bar() {
    const c = curIndex(), v = viewIndex(), prev = X.host.preview, all = isDone();
    return h`<nav class="gs ${prev ? 'is-prev' : ''}" aria-label="Tiến độ luyện tập: đã xong ${prev ? 0 : doneCount(asg())} trên 4 bước"><ol>${STEPS.map((s, i) => {
      const end = i === 4, done = !prev && (end ? all : (all || i < c)), cur = !prev && !all && i === c, ok = unlocked(i);
      const mark = end ? (done ? '✓' : '') : done ? '✓' : String(i + 1);
      return h`<li class="gs-i ${end ? 'gs-end' : ''} ${done ? 'done' : cur ? 'cur' : 'todo'} ${i === v ? 'view' : ''}"><button type="button" class="gs-b" data-action="g-view" data-step="${s.id}" ${ok ? '' : 'disabled'} ${i === v ? LU.raw('aria-current="step"') : ''}>
        <span class="gs-m" aria-hidden="true">${mark}</span><span class="gs-l">${s.label}</span><span class="sr-only">${done ? ' — đã xong' : cur ? ' — đang làm' : ok ? '' : ' — chưa mở'}</span></button></li>`;
    })}</ol></nav>`;
  }
  /** Panel heading: "Learn · Nhóm 1/5". Focus lands here when the position changes (screen readers hear the new position). */
  const head = (label, pos, ins) => h`<header class="g-ph"><h2 id="g-h" tabindex="-1">${label}${pos ? h` <span class="g-pos">· ${pos}</span>` : ''}</h2>${ins ? h`<p class="g-ins">${ins}</p>` : ''}</header>`;
  const btn = (label, action, o) => { o = o || {}; return h`<button type="button" class="btn ${o.cls || 'ghost'}" data-action="${action}" ${o.attrs ? LU.raw(o.attrs) : ''} ${o.disabled ? 'disabled' : ''}>${label}</button>`; };
  const gap = h`<span class="g-gap"></span>`;
  /** The finishing button of a step. Teacher preview shows a hint instead; a step that is already done shows a way back to where the student is. */
  function completeBtn(label, step) {
    if (X.host.preview) return '';
    if (reviewing()) return btn(curIndex() === 4 ? 'Về màn hình hoàn thành' : 'Về bước hiện tại', 'g-view', { attrs: 'data-step="' + STEPS[curIndex()].id + '"' });
    return btn(label, 'g-next', { cls: 'primary', attrs: 'data-step="' + step + '"', disabled: X.busy });
  }
  const previewHint = label => X.host.preview ? h`<p class="hint g-prev">Xem trước — học viên bấm “${label}” để sang bước tiếp theo.</p>` : '';
  const nav = (left, right) => h`<div class="g-nav">${left || gap}${right || ''}</div>`;

  /* ---- LEARN: one group at a time ---- */
  function learnGroupsPanel(m) {
    const gs = m.learnGroups, n = gs.length, i = Math.min(Math.max(0, X.gi), n - 1), g = gs[i], last = i === n - 1;
    const notes = A(m.learnNotes);
    return h`${head('Learn', 'Nhóm ' + (i + 1) + '/' + n, i === 0 ? m.learnInstruction : '')}
      <section class="g-grp" aria-labelledby="g-gh"><h3 class="g-gh" id="g-gh"><span class="g-gl">${g.id}</span><span class="g-gt">${g.title}</span>${g.titleVi ? h`<span class="g-gv">${g.titleVi}</span>` : ''}</h3>
        <table class="gt g-gtab"><thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
          <tbody>${A(g.items).map(it => h`<tr><th scope="row" data-l="Word"><b>${it.word}</b></th><td data-l="Meaning">${it.meaning}</td><td data-l="Example" class="gt-ex">${emph(it.example, it.word)}</td></tr>`)}</tbody></table>
        ${g.note ? h`<p class="g-gn"><b>Lưu ý:</b> ${g.note}</p>` : ''}</section>
      ${last && notes.length ? h`<details class="g-dis"><summary>Phân biệt cách dùng</summary><ul class="g-notes">${notes.map(t => h`<li>${t}</li>`)}</ul></details>` : ''}
      ${nav(i > 0 ? btn('← Nhóm trước', 'g-gprev') : '', last ? completeBtn('Hoàn thành Learn →', 'learn') : btn('Nhóm tiếp theo →', 'g-gnext', { cls: 'dark' }))}
      ${last ? previewHint('Hoàn thành Learn →') : ''}`;
  }
  function learnPanel(m) {
    if (isGrouped(m)) return learnGroupsPanel(m);
    return h`${head('Learn', '', m.learnInstruction || 'Learn natural alternatives to words you may use too often.')}
      <table class="gt"><thead><tr><th scope="col">You might say</th><th scope="col">More unique</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
        <tbody>${A(m.learn).map(r => h`<tr><td data-l="You might say">${A(r.basic).join(' / ')}</td><th scope="row" data-l="More unique"><b>${r.unique}</b></th><td data-l="Meaning">${r.meaning}</td><td data-l="Example" class="gt-ex">${r.example}</td></tr>`)}</tbody></table>
      ${nav('', completeBtn('Hoàn thành Learn →', 'learn'))}${previewHint('Hoàn thành Learn →')}`;
  }

  /* ---- USE / REUSE: one question at a time ---- */
  function allWordsBlock(m) {
    const body = isGrouped(m) ? m.learnGroups.map(g => h`<p><b>${g.title}</b> <span>${A(g.items).map(it => it.word).join(' · ')}</span></p>`) : h`<p>${allWords(m).join(' · ')}</p>`;
    return h`<details class="g-all"><summary>Xem toàn bộ từ đã học</summary><div class="g-allb">${body}</div></details>`;
  }
  function askPanel(m, key, label, ins, doneLabel, step) {
    const qs = A(m[key]), n = qs.length;
    if (!n) return h`${head(label, '', ins)}${nav('', completeBtn(doneLabel, step))}${previewHint(doneLabel)}`;
    const i = Math.min(Math.max(0, X.ui[key]), n - 1), last = i === n - 1, words = hintsFor(m, key, i), isUse = key === 'use', open = !isUse && !!X.hint[i];
    return h`${head(label, 'Câu ' + (i + 1) + '/' + n, ins)}
      <section class="g-ask"><p class="g-aq">${qLines(qs[i])}</p>
        ${isUse ? h`<p class="g-hint"><span class="lbl">Gợi ý</span> ${words.join(' · ')}</p>${allWordsBlock(m)}`
          : h`<div class="g-need">${btn(open ? 'Ẩn gợi ý' : 'Cần gợi ý?', 'g-hint', { attrs: 'data-i="' + i + '" aria-expanded="' + open + '" aria-controls="g-hintbox"' })}</div>
            <div id="g-hintbox" ${open ? '' : 'hidden'}><p class="g-hint"><span class="lbl">Gợi ý</span> ${words.join(' · ')}</p>${allWordsBlock(m)}</div>`}
      </section>
      ${nav(i > 0 ? btn('← Câu trước', 'g-qprev', { attrs: 'data-key="' + key + '"' }) : '', last ? completeBtn(doneLabel, step) : btn('Câu tiếp theo →', 'g-qgo', { cls: 'dark', attrs: 'data-key="' + key + '"' }))}
      ${last ? previewHint(doneLabel) : ''}`;
  }

  /* ---- RETRIEVE (matching, old modules) ---- */
  function matchPanel(m) {
    const done = isDone();
    const ok = i => done || !!X.ok[i], n = m.retrieve.filter((_, i) => ok(i)).length;
    return h`${head('Retrieve', '', m.retrieveInstruction || 'Match the words with their meanings.')}
      <div class="g-match ${X.host.preview ? 'is-prev' : ''}">
        <div class="g-col"><span class="lbl">Words</span><ul>${m.retrieve.map((r, i) => h`<li><button type="button" class="gm ${ok(i) ? 'ok' : ''} ${X.sel === i ? 'sel' : ''}" data-action="g-term" data-i="${i}" aria-pressed="${X.sel === i}" ${ok(i) || done || X.host.preview ? 'disabled' : ''}>${r.term}</button></li>`)}</ul></div>
        <div class="g-col"><span class="lbl">Meanings</span><ul>${X.order.map(j => h`<li><button type="button" class="gm mean ${ok(j) ? 'ok' : ''} ${X.wrong === j ? 'bad' : ''}" data-action="g-mean" data-j="${j}" ${ok(j) || done || X.host.preview ? 'disabled' : ''}>${m.retrieve[j].meaning}</button></li>`)}</ul></div>
      </div>
      <p class="g-count" role="status" aria-live="polite"><b>${n} / ${m.retrieve.length}</b> matched${X.note ? h` · <span class="${X.wrong !== -1 ? 'g-bad' : ''}">${X.note}</span>` : ''}</p>
      ${X.host.preview ? h`<p class="hint g-prev">Xem trước — học viên bấm chọn từ rồi chọn nghĩa; khi đúng cả ${m.retrieve.length} cặp, module tự hoàn thành.</p>` : ''}
      ${!done && !X.host.preview && solved() && X.saveFailed ? h`<div class="g-nav">${gap}<button type="button" class="btn primary" data-action="g-save" ${X.busy ? 'disabled' : ''}>Lưu kết quả</button></div>` : ''}`;
  }

  /* ---- RETRIEVE (multiple choice): one question at a time; answer + explanation right after; score of THIS attempt; retry; no pass mark ---- */
  const optLine = o => o ? o.id + '. ' + o.text : '';
  function verdict(q, a) {
    const key = keyOf(q), ok = a === q.answer;
    return h`<div class="g-exp ${ok ? 'ok' : 'bad'}" role="status">
      <p class="g-ev"><b>Bạn chọn:</b> ${optLine(optOf(q, a))} <span class="g-vd">— ${ok ? 'đúng' : 'chưa đúng'}</span></p>
      <p class="g-ev"><b>Đáp án đúng:</b> ${optLine(key)}</p>
      <p class="g-why"><b>Giải thích:</b> ${q.explain}</p></div>`;
  }
  function quizPanel(m) {
    const qz = m.quiz, n = qz.length, ins = m.retrieveInstruction || 'Chọn đáp án phù hợp nhất với ngữ cảnh. Sau mỗi câu, bạn sẽ thấy đáp án và giải thích.';
    if (X.host.preview) {                                                         // teacher: the whole answer key, read-only
      return h`${head('Retrieve', n + ' câu · đáp án', ins)}<div class="g-key">${qz.map((q, i) => h`<section class="g-qz"><span class="g-qn">Câu ${i + 1}/${n}</span><p class="g-qp">${q.prompt}</p>
        <ul class="g-ko">${q.options.map(o => h`<li class="${o.id === q.answer ? 'key' : ''}">${o.id}. ${o.text}${o.id === q.answer ? ' ✓' : ''}</li>`)}</ul>
        <p class="g-why"><b>Giải thích:</b> ${q.explain}</p></section>`)}</div>
        <p class="hint g-prev">Xem trước — đáp án đúng có dấu ✓. Học viên làm từng câu, xem giải thích ngay sau khi chọn và có thể làm lại.</p>`;
    }
    if (X.qi >= n) {                                                              // result of this attempt
      const sc = score(), missed = qz.map((q, i) => [q, i]).filter(p => X.ans[p[1]] !== p[0].answer);
      return h`${head('Retrieve', 'Kết quả')}
        <p class="g-score" role="status"><mark>Đúng ${sc}/${n} câu trong lượt này</mark></p>
        <p class="hint g-sc-note">Đây chỉ là kết quả của lượt luyện này, không phải band IELTS hay điểm Speaking.</p>
        ${missed.length ? h`<section class="g-miss"><h3 class="g-gh"><span class="g-gt">Câu cần xem lại</span><span class="g-gv">${missed.length} câu — bấm từng câu để xem đáp án</span></h3>
          <ul class="g-ml">${missed.map(p => h`<li><details><summary><span class="g-mn">Câu ${p[1] + 1}</span><span class="g-mp">${p[0].prompt}</span></summary>
            <div class="g-mb"><p class="g-qp">${p[0].prompt}</p>${verdict(p[0], X.ans[p[1]])}</div></details></li>`)}</ul></section>` : h`<p class="g-allok">Bạn trả lời đúng tất cả các câu.</p>`}
        ${nav(btn('Làm lại', 'g-qretry'), completeBtn('Hoàn thành Retrieve →', 'retrieve'))}`;
    }
    const q = qz[X.qi], a = X.ans[X.qi], answered = a !== undefined;
    return h`${head('Retrieve', 'Câu ' + (X.qi + 1) + '/' + n, X.qi === 0 && !answered ? ins : '')}
      <section class="g-qz"><p class="g-qp g-ink">${q.prompt}</p>
        ${q.prompt.indexOf('______') === -1 ? h`<p class="g-qh">Chọn từ phù hợp nhất để mô tả.</p>` : ''}
        <ul class="g-opts">${q.options.map(o => h`<li><button type="button" class="gm ${answered && o.id === q.answer ? 'ok' : ''} ${answered && o.id === a && a !== q.answer ? 'bad' : ''}" data-action="g-opt" data-k="${o.id}" ${answered ? 'disabled' : ''} ${answered && o.id === a ? LU.raw('aria-pressed="true"') : ''}><span class="g-ol">${o.id}.</span><span class="g-ot">${o.text}</span></button></li>`)}</ul>
        ${answered ? verdict(q, a) : ''}</section>
      ${nav('', btn(X.qi + 1 < n ? 'Câu tiếp theo →' : 'Xem kết quả →', 'g-qnext', { cls: answered ? 'primary' : 'dark', disabled: !answered }))}`;
  }
  const retrievePanel = m => isQuiz(m) ? quizPanel(m) : matchPanel(m);

  /* ---- FINISHED ---- */
  function finishedPanel(m) {
    const done = isDone(), a = asg();
    if (!done && !X.host.preview) return h`<p class="none">Hoàn thành bước Retrieve để kết thúc module.</p>`;
    const saved = X.justSaved ? h`<p class="g-saved">✓ Đã lưu lên hệ thống.</p>` : a && a.completedAt ? h`<p class="g-saved">✓ Đã lưu — hoàn thành lúc ${LU.fmtDate(a.completedAt)}.</p>` : '';
    const ex = A(m.extra);
    return h`<div class="g-done" role="status"><h2 id="g-h" tabindex="-1">Đã hoàn thành module.</h2>
      <p class="g-dsub">${m.title}${m.focus ? ' — ' + m.focus : ''}</p>${X.host.preview ? h`<p class="hint">Xem trước — học viên thấy màn hình này khi hoàn thành module.</p>` : saved}</div>
      <div class="g-nav g-end"><a class="btn primary" href="${X.host.back}">${X.host.backLabel} →</a>${btn('Ôn lại bài', 'g-review')}</div>
      ${ex.length ? h`<details class="g-extra"><summary>Luyện thêm — không bắt buộc</summary>
        <div class="g-ex-l">${ex.map((t, i) => h`<div class="g-ex-i"><span class="g-qn">Chủ đề ${i + 1}</span><p class="g-qp">${t.prompt}</p>${A(t.words).length ? h`<p class="g-exw"><span class="lbl">Gợi ý từ</span> ${t.words.join(' · ')}</p>` : ''}</div>`)}</div>
        ${m.extraNote ? h`<p class="g-gn">${m.extraNote}</p>` : ''}</details>` : ''}`;
  }
  function panel() {
    const m = X.m, v = STEPS[viewIndex()].id;
    if (v === 'learn') return learnPanel(m);
    if (v === 'use') return askPanel(m, 'use', 'Use', m.useInstruction || 'Trả lời thành tiếng. Dùng từ đã học khi phù hợp.', 'Hoàn thành Use →', 'use');
    if (v === 'reuse') return askPanel(m, 'reuse', 'Reuse', m.reuseInstruction || 'Trả lời thành tiếng trong ngữ cảnh mới.', 'Hoàn thành Reuse →', 'reuse');
    if (v === 'retrieve') return retrievePanel(m);
    return finishedPanel(m);
  }
  const inner = () => h`${bar()}<div class="g-panel" id="g-panel" role="region" aria-labelledby="g-h">${panel()}</div>`;

  /** Host entry point. Returns the module page body (compact header + progress + current step). */
  G.mount = function (m, host) {
    host.backLabel = host.backLabel || 'Về Practice Plan';
    if (X.id !== m.id || X.host === null || X.host.preview !== host.preview) reset(m, host); else X.host = host;
    return h`${header(m)}<div id="g-root" class="g-root">${inner()}</div>`;
  };
  G.reset = () => { X.id = ''; X.host = null; X.m = null; };

  /* ------------------------------------------------------------ interaction */
  function refresh(focusSel) {
    const root = document.getElementById('g-root'); if (!root) return;
    root.innerHTML = inner().s;
    if (focusSel) { const el = root.querySelector(focusSel); if (el && !el.disabled) el.focus(); }
  }
  /** The position changed (group / question / step): show the top of the panel and move focus to its heading. */
  function landOnHeading() {
    const root = document.getElementById('g-root'); if (!root) return;
    const top = root.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) window.scrollTo(0, Math.max(0, window.pageYOffset + top - 12));
    const hd = document.getElementById('g-h'); if (hd) hd.focus({ preventScroll: true });
  }
  const guard = () => !!X.host && !!X.m;

  LU.actions['g-view'] = el => {
    if (!guard()) return; const id = el.dataset.step, i = STEPS.findIndex(s => s.id === id);
    if (i === -1 || !unlocked(i)) return;
    X.view = id; save(); refresh(); landOnHeading();
  };
  LU.actions['g-review'] = () => { if (!guard()) return; X.view = 'learn'; X.gi = 0; save(); refresh(); landOnHeading(); };
  async function advance(step) {
    if (!guard() || X.host.preview || X.busy) return false;
    X.busy = true; X.saveFailed = false; refresh();
    try {
      await X.host.step(step); X.busy = false; X.view = ''; X.note = ''; clearStep(step); if (step === 'retrieve') X.justSaved = true;
      save(); refresh(); landOnHeading(); window.scrollTo(0, 0); return true;
    } catch (e) { X.busy = false; LU.toast(LU.errText(e, 'save'), true); refresh(); return false; }
  }
  LU.actions['g-next'] = el => { advance(el.dataset.step); };
  LU.actions['g-save'] = () => { advance('retrieve').then(ok => { if (!ok) { X.saveFailed = true; refresh('[data-action=g-save]'); } }); };

  /* learn: group navigation only — it says nothing about what the student has learnt */
  const step = (n, d, lo, hi) => Math.min(hi, Math.max(lo, n + d));
  LU.actions['g-gprev'] = () => { if (!guard() || !isGrouped(X.m)) return; X.gi = step(X.gi, -1, 0, X.m.learnGroups.length - 1); save(); refresh(); landOnHeading(); };
  LU.actions['g-gnext'] = () => { if (!guard() || !isGrouped(X.m)) return; X.gi = step(X.gi, 1, 0, X.m.learnGroups.length - 1); save(); refresh(); landOnHeading(); };
  /* use / reuse: question navigation */
  const keyOK = k => k === 'use' || k === 'reuse';
  LU.actions['g-qprev'] = el => { const k = el.dataset.key; if (!guard() || !keyOK(k)) return; X.ui[k] = step(X.ui[k], -1, 0, Math.max(0, A(X.m[k]).length - 1)); save(); refresh(); landOnHeading(); };
  LU.actions['g-qgo'] = el => { const k = el.dataset.key; if (!guard() || !keyOK(k)) return; X.ui[k] = step(X.ui[k], 1, 0, Math.max(0, A(X.m[k]).length - 1)); save(); refresh(); landOnHeading(); };
  LU.actions['g-hint'] = el => { if (!guard()) return; const i = Number(el.dataset.i); X.hint[i] = !X.hint[i]; refresh('[data-action=g-hint]'); };

  /* retrieve (multiple choice) */
  LU.actions['g-opt'] = el => {
    if (!guard() || X.host.preview || !isQuiz(X.m) || X.qi >= X.m.quiz.length || X.ans[X.qi] !== undefined) return;
    const q = X.m.quiz[X.qi]; if (!optOf(q, el.dataset.k)) return;
    X.ans[X.qi] = el.dataset.k; save(); refresh('[data-action=g-qnext]');
  };
  LU.actions['g-qnext'] = () => {
    if (!guard() || X.host.preview || !isQuiz(X.m) || X.qi >= X.m.quiz.length || X.ans[X.qi] === undefined) return;   // never skips a question the student has not answered
    X.qi = Math.min(X.m.quiz.length, X.qi + 1); save(); refresh(); landOnHeading();
  };
  LU.actions['g-qretry'] = () => { if (!guard() || X.host.preview || !isQuiz(X.m)) return; X.qi = 0; X.ans = {}; save(); refresh(); landOnHeading(); };   // resets this attempt only; assignment and history are untouched

  /* retrieve (matching, old modules) */
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
