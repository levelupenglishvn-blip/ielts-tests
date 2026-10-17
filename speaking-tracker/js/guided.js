/* guided.js — ONE generic renderer for guided practice modules:  LEARN → USE → REUSE → RETRIEVE → FINISHED.
 *
 * It knows nothing about a particular module: it reads the module object from the Master Practice Library.
 * Two content shapes are supported (a module may use either; data/lexical-modules.js documents both):
 *   LEARN     learnGroups:[{id,title,titleVi,note,items:[{word,meaning,example}]}] (+learnNotes:[…])   — grouped word list, ONE GROUP AT A TIME   |  learn:[{basic,unique,meaning,example}]  — "you might say → more unique" table
 *   USE/REUSE use:[…], reuse:[…]  (+ optional useHints/reuseHints:[[word,…],…])                         — open speaking questions, ONE QUESTION AT A TIME
 *   RETRIEVE  quiz:[{prompt,options:[{id,text}],answer,explain}]                                          — multiple choice, one question at a time, retry allowed, no pass mark  |  retrieve:[{term,meaning}]  — matching
 *   v2.8      USE/REUSE items may be OBJECTS {type:'fill'|'fix'|'speak', q, options:[{id,text}], answer:[id…], why, hints:[…], sample}: fill/fix = pick an answer and see it checked at once
 *             (several ids may be accepted); speak = open question with a hidden-by-default sample answer.
 *             RETRIEVE may be  recall:[{kind:'vi'|'sit'|'blank'|'speak', q, answer:[accepted…], why, sample}]  — type or say it from memory, THEN check / reveal (no options shown), self-mark, retry.
 *   EXTRA     extra:[{prompt,words:[…]}] (+extraNote)                                                    — optional, folded under Finished; never required
 * Progress is NOT kept here: it lives on the student's assignment (assignment.steps, saved by the server one step at a time).
 * This file only holds view state (which step/group/question is on screen, the current quiz attempt). That view state is mirrored to
 * sessionStorage (host.store) so a page reload resumes the same place — it NEVER unlocks a step or marks anything completed; the server does.
 *
 * Host (student.js) calls  LU.guided.mount(module, { assignment: () => a|null, preview: bool, step: async stepId => assignment,
 *                                                    back: href, backLabel: 'Về Practice Plan', store: {get,set,remove}|null })
 * and puts the returned markup in the page. Clicks come back through LU.actions['g-…'].
 *
 * v2.6 (design + sample answers): the step bar is "Step n" badge + name; the control bar right under it holds the position, "Đã thực hành"
 * and the next button; Use/Reuse questions can open a hidden-by-default sample answer (m.useSamples / m.reuseSamples, **bold** = target word).
 * Opening a sample is pure view state: it is never saved, never counts as progress and never gates anything.
 * "Đã thực hành" (CONFIRM_ITEMS) is a UI-only pace gate for the NEXT button inside Learn/Use/Reuse; the server (assignment.steps) still decides what is done.
 */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  const G = LU.guided = {};

  const STEPS = [
    { id: 'learn', label: 'Learn' }, { id: 'use', label: 'Use' }, { id: 'reuse', label: 'Reuse' },
    { id: 'retrieve', label: 'Retrieve' }, { id: 'finished', label: 'Finished' }
  ];
  const CONFIRM_ITEMS = true;      // false → no "Đã thực hành" gate (the next button is always available)
  const X = { id: '', sig: '', view: '', gi: 0, ui: { use: 0, reuse: 0 }, hint: {}, cf: { learn: {}, use: {}, reuse: {} }, smp: { use: {}, reuse: {} }, fa: {}, rq: 0, rs: {}, sel: -1, ok: {}, order: [], note: '', wrong: -1,
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
  const isRecall = m => A(m.recall).length > 0;
  const isObj = v => !!v && typeof v === 'object';
  /** One Use/Reuse item as an object. Old modules keep plain strings + useHints/useSamples; v2.8 modules hold objects. */
  function qItem(m, key, i) {
    const raw = A(m[key])[i];
    if (isObj(raw)) return Object.assign({ type: 'speak', hints: null, sample: '', options: [], answer: [], why: '' }, raw, { q: raw.q || raw.prompt || '' });
    return { type: 'speak', q: raw, hints: null, sample: A(m[key + 'Samples'])[i] || '', options: [], answer: [], why: '' };
  }
  const isChoice = it => it.type === 'fill' || it.type === 'fix';
  const answerIds = it => A(it.answer).length ? A(it.answer) : (it.answer ? [it.answer] : []);
  const fkey = (k, i) => k + ':' + i;
  const isGrouped = m => A(m.learnGroups).length > 0;
  const allWords = m => isGrouped(m) ? [].concat.apply([], m.learnGroups.map(g => A(g.items).map(it => it.word))) : A(m.learn).map(r => r.unique);
  const score = () => X.m.quiz.reduce((t, q, i) => t + (X.ans[i] === q.answer ? 1 : 0), 0);
  const optOf = (q, id) => q.options.find(o => o.id === id) || null;
  const keyOf = q => optOf(q, q.answer) || q.options[0];
  const solved = () => A(X.m.retrieve).length > 0 && X.m.retrieve.every((_, i) => X.ok[i]);
  const sigOf = m => {
    const parts = [A(m.learnGroups).map(g => [g.id, A(g.items).map(i => i.word)]), A(m.learn).map(r => r.unique), A(m.use), A(m.reuse),
      A(m.quiz).map(q => [q.prompt, A(q.options).map(o => o.id), q.answer]), A(m.retrieve).map(r => r.term)];
    if (isRecall(m)) parts.push(A(m.recall).map(r => [r.kind, r.q, r.answer]));
    return G.hash(JSON.stringify(parts));
  };

  /** 3–5 words for one question: the module's own list for that question, else a few learn words spread over the module (no module id is ever tested). */
  function hintsFor(m, key, i) {
    const it = qItem(m, key, i), own = Array.isArray(it.hints) && it.hints.length ? it.hints : A(m[key + 'Hints'])[i];
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
    if (/ \/ | vs\.? /.test(w)) { const hit = w.split(/ \/ | vs\.? /).map(x => x.trim()).find(x => x && t.toLowerCase().indexOf(x.toLowerCase()) !== -1); if (hit) return emph(t, hit); }
    const low = t.toLowerCase(), lw = w.toLowerCase(), isL = c => c !== undefined && /[A-Za-z0-9À-ɏ]/.test(c);
    for (let i = low.indexOf(lw); i !== -1; i = low.indexOf(lw, i + 1)) {
      if (isL(t[i - 1]) || isL(t[i + w.length])) continue;
      return h`${t.slice(0, i)}<b class="g-hit g-tw">${t.slice(i, i + w.length)}</b>${t.slice(i + w.length)}`;
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
    try { st.set(JSON.stringify({ v: 1, sig: X.sig, view: X.view, gi: X.gi, ui: X.ui, qi: X.qi, ans: X.ans, cf: X.cf, fa: X.fa, rq: X.rq, rs: X.rs })); } catch (e) { /* storage is optional */ }
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
    /* "Đã thực hành" marks: taken back only as valid indexes; positions reached by an older version (no marks saved) count as done for the items before them */
    const cfo = o.cf && typeof o.cf === 'object' ? o.cf : {};
    const lens = { learn: pages, use: A(m.use).length, reuse: A(m.reuse).length };
    Object.keys(lens).forEach(k => {
      const src = cfo[k] && typeof cfo[k] === 'object' ? cfo[k] : {};
      Object.keys(src).forEach(i => { if (/^\d{1,3}$/.test(i) && +i < lens[k] && src[i] === true) X.cf[k][+i] = true; });
      const pos = k === 'learn' ? X.gi : X.ui[k]; for (let i = 0; i < pos; i++) X.cf[k][i] = true;
    });
    /* v2.8: picked answers of fill/fix items, and the recall attempt (position + what was already checked) — validated against THIS content */
    if (o.fa && typeof o.fa === 'object') Object.keys(o.fa).forEach(k => {
      const mm = /^(use|reuse):(\d{1,3})$/.exec(k); if (!mm) return; const it = qItem(m, mm[1], +mm[2]);
      if (isChoice(it) && A(it.options).some(op => op.id === o.fa[k])) { X.fa[k] = o.fa[k]; X.cf[mm[1]][+mm[2]] = true; }
    });
    if (isRecall(m)) {
      const n = A(m.recall).length;
      if (int(o.rq, 0, n) && o.rs && typeof o.rs === 'object') {
        Object.keys(o.rs).forEach(k => { const v = o.rs[k]; if (/^\d{1,3}$/.test(k) && +k < n && v && v.done === true && (v.mark === 'y' || v.mark === 'n')) X.rs[+k] = { text: String(v.text || '').slice(0, 300), done: true, hit: v.hit === true, mark: v.mark }; });
        let good = true; for (let i = 0; i < o.rq; i++) if (!X.rs[i]) good = false;
        if (good) X.rq = o.rq; else { X.rs = {}; X.rq = 0; }
      }
    }
    if (isQuiz(m) && o.ans && typeof o.ans === 'object' && int(o.qi, 0, m.quiz.length)) {
      const keys = Object.keys(o.ans);
      let good = keys.every(k => /^\d{1,3}$/.test(k) && +k < m.quiz.length && A(m.quiz[+k].options).some(op => op.id === o.ans[k]) && +k <= o.qi);
      for (let i = 0; good && i < o.qi; i++) if (o.ans[i] === undefined) good = false;     // sequential: every earlier question was answered
      if (good) { X.qi = o.qi; keys.forEach(k => { X.ans[+k] = o.ans[k]; }); }
    }
  }
  function reset(m, host) {
    X.id = m.id; X.m = m; X.host = host; X.sig = sigOf(m); X.view = ''; X.gi = 0; X.ui = { use: 0, reuse: 0 }; X.hint = {}; X.cf = { learn: {}, use: {}, reuse: {} }; X.smp = { use: {}, reuse: {} }; X.fa = {}; X.rq = 0; X.rs = {};
    X.sel = -1; X.note = ''; X.wrong = -1; X.busy = false; X.saveFailed = false; X.justSaved = false;
    X.order = shuffle(A(m.retrieve).length, true); X.ok = {}; X.qi = 0; X.ans = {};
    restore(m);
  }
  /** A finished step starts from its beginning next time (a completed Retrieve attempt is over). */
  function clearStep(step) {
    X.smp = { use: {}, reuse: {} };
    if (step === 'use' || step === 'reuse') Object.keys(X.fa).forEach(k => { if (k.indexOf(step + ':') === 0) delete X.fa[k]; });
    if (step === 'retrieve') { X.rq = 0; X.rs = {}; }
    if (step === 'learn') { X.gi = 0; X.cf.learn = {}; } else if (step === 'use') { X.ui.use = 0; X.cf.use = {}; } else if (step === 'reuse') { X.ui.reuse = 0; X.hint = {}; X.cf.reuse = {}; }
    else if (step === 'retrieve') { X.qi = 0; X.ans = {}; X.ok = {}; }
  }

  /* ------------------------------------------------------------ pieces */
  const eyebrowOf = m => [LU.practice.groupLabel(m.category), m.subcategory ? LU.practice.subLabel(m.category, m.subcategory) : ''].filter(Boolean).join(' · ');
  const header = m => h`<header class="g-hd"><p class="eyebrow">${eyebrowOf(m)}</p><h1>${m.title}</h1>${m.focus ? h`<p class="g-focus">${m.focus}</p>` : ''}</header>`;

  /** Five steps: a small "Step n" badge + the step name outside it. Finished is where you land (it has a badge too but is not one of the four tasks).
   *  Available steps (done / current / earlier) read darker than steps that are not open yet; the step on screen is underlined. */
  function bar() {
    const c = curIndex(), v = viewIndex(), prev = X.host.preview, all = isDone();
    return h`<nav class="gs ${prev ? 'is-prev' : ''}" aria-label="Tiến độ luyện tập: đã xong ${prev ? 0 : doneCount(asg())} trên 4 bước"><ol>${STEPS.map((s, i) => {
      const end = i === 4, done = !prev && (end ? all : (all || i < c)), cur = !prev && !all && i === c, ok = unlocked(i);
      return h`<li class="gs-i ${end ? 'gs-end' : ''} ${done ? 'done' : cur ? 'cur' : 'todo'} ${ok ? 'open' : 'shut'} ${i === v ? 'view' : ''}"><button type="button" class="gs-b" data-action="g-view" data-step="${s.id}" ${ok ? '' : 'disabled'} ${i === v ? LU.raw('aria-current="step"') : ''}>
        <span class="gs-m">Step ${i + 1}</span><span class="gs-l">${s.label}</span><span class="sr-only">${done ? ' — đã xong' : cur ? ' — đang làm' : ok ? '' : ' — chưa mở'}</span></button></li>`;
    })}</ol></nav>`;
  }
  /** Control bar right under the step bar: step name + position on the left, "Đã thực hành" and the next button on the right (same place on every screen).
   *  Focus lands on the step name when the position changes (screen readers hear the new position). */
  const head = (label, pos, ins, actions) => h`<header class="g-ph"><div class="g-ctl"><h2 id="g-h" tabindex="-1">${label}${pos ? h` <span class="g-pos">${pos}</span>` : ''}</h2>${actions ? h`<div class="g-ctl-a">${actions}</div>` : ''}</div>${ins ? h`<p class="g-ins">${ins}</p>` : ''}</header>`;
  const btn = (label, action, o) => { o = o || {}; return h`<button type="button" class="btn ${o.cls || 'ghost'}" data-action="${action}" ${o.attrs ? LU.raw(o.attrs) : ''} ${o.disabled ? 'disabled' : ''}>${label}</button>`; };
  /** UI-only pace gate: while a student works through a step, "next" opens after "Đã thực hành" on the item. Not used in teacher preview or when looking back at a finished step. */
  const gated = () => CONFIRM_ITEMS && !X.host.preview && !reviewing() && !isDone();
  const isConf = (k, i) => !gated() || X.cf[k][i] === true;
  /** "Đã thực hành" (green) → "✓ Đã thực hành" (done). Nothing is shown when the gate is off. */
  const confirmBtn = (k, i) => !gated() ? '' : X.cf[k][i] ? h`<button type="button" class="btn conf" disabled aria-pressed="true">✓ Đã thực hành</button>`
    : h`<button type="button" class="btn primary" data-action="g-conf" data-k="${k}" data-i="${i}">Đã thực hành</button>`;
  /** next / previous item buttons: green when open, muted and disabled until the item is confirmed */
  const nextBtn = (label, action, ok, attrs) => btn(label, action, { cls: ok ? 'primary' : 'ghost', attrs: 'data-role="next" ' + (attrs || ''), disabled: !ok });
  /** The finishing button of a step ("Hoàn thành Step n →"). Teacher preview shows a hint instead; a step that is already done shows a way back to where the student is. */
  function completeBtn(label, step, ok) {
    if (X.host.preview) return '';
    if (reviewing()) return btn(curIndex() === 4 ? 'Về màn hình hoàn thành' : 'Về bước hiện tại', 'g-view', { cls: 'primary', attrs: 'data-step="' + STEPS[curIndex()].id + '" data-role="next"' });
    const open = ok !== false && !X.busy;
    return btn(label, 'g-next', { cls: open ? 'primary' : 'ghost', attrs: 'data-step="' + step + '" data-role="next"', disabled: !open });
  }
  const previewHint = label => X.host.preview ? h`<p class="hint g-prev">Xem trước — học viên bấm “${label}” để sang bước tiếp theo.</p>` : '';
  const stepLabel = (n) => 'Hoàn thành Step ' + n + ' →';

  /* ---- LEARN: one group at a time ---- */
  function learnGroupsPanel(m) {
    const gs = m.learnGroups, n = gs.length, i = Math.min(Math.max(0, X.gi), n - 1), g = gs[i], last = i === n - 1;
    const notes = A(m.learnNotes), ok = isConf('learn', i);
    const actions = h`${i > 0 ? btn('← Nhóm trước', 'g-gprev') : ''}${confirmBtn('learn', i)}${last ? completeBtn(stepLabel(1), 'learn', ok) : nextBtn('Nhóm tiếp theo →', 'g-gnext', ok)}`;
    return h`${head('Learn', '', i === 0 ? m.learnInstruction : '', actions)}
      <section class="g-grp" aria-labelledby="g-gh"><h3 class="g-gh" id="g-gh"><span class="g-gp">Nhóm ${i + 1}/${n}</span><span class="g-gt">${g.title}</span>${g.titleVi ? h`<span class="g-gv">${g.titleVi}</span>` : ''}</h3>
        <table class="gt g-gtab"><thead><tr><th scope="col">Word</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
          <tbody>${A(g.items).map(it => h`<tr><th scope="row" data-l="Word"><b class="g-tw">${it.word}</b></th><td data-l="Meaning" class="gt-mean">${it.meaning}</td><td data-l="Example" class="gt-ex">${emph(it.example, it.word)}</td></tr>`)}</tbody></table>
        ${g.note ? h`<p class="g-gn"><b>Lưu ý:</b> ${g.note}</p>` : ''}</section>
      ${last && notes.length ? h`<details class="g-dis"><summary>Phân biệt cách dùng</summary><ul class="g-notes">${notes.map(t => h`<li>${t}</li>`)}</ul></details>` : ''}
      ${last ? previewHint(stepLabel(1)) : ''}`;
  }
  function learnPanel(m) {
    if (isGrouped(m)) return learnGroupsPanel(m);
    return h`${head('Learn', '', m.learnInstruction || 'Learn natural alternatives to words you may use too often.', completeBtn(stepLabel(1), 'learn'))}
      <table class="gt"><thead><tr><th scope="col">You might say</th><th scope="col">More unique</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
        <tbody>${A(m.learn).map(r => h`<tr><td data-l="You might say">${A(r.basic).join(' / ')}</td><th scope="row" data-l="More unique"><b>${r.unique}</b></th><td data-l="Meaning">${r.meaning}</td><td data-l="Example" class="gt-ex">${r.example}</td></tr>`)}</tbody></table>
      ${previewHint(stepLabel(1))}`;
  }

  /* ---- USE / REUSE: one question at a time ---- */
  function allWordsBlock(m) {
    const body = isGrouped(m) ? m.learnGroups.map(g => h`<p><b>${g.title}</b> <span>${A(g.items).map(it => it.word).join(' · ')}</span></p>`) : h`<p>${allWords(m).join(' · ')}</p>`;
    return h`<details class="g-all"><summary>Xem toàn bộ từ đã học</summary><div class="g-allb">${body}</div></details>`;
  }
  /** "**word**" → the word in the plum treatment. Pure string slicing; every piece goes through the escaping template. */
  function sampleText(t) {
    const parts = String(t == null ? '' : t).split('**');
    return h`${parts.map((p, k) => k % 2 ? h`<b class="g-tw">${p}</b>` : h`${p}`)}`;
  }
  const chips = words => h`<span class="g-chips">${words.map(w => h`<span class="g-chip g-tw">${w}</span>`)}</span>`;
  const TYPE_LABEL = { fill: 'Điền vào chỗ trống', fix: 'Chọn cách sửa đúng', speak: 'Nói thành tiếng' };
  const pickedOk = (it, id) => answerIds(it).indexOf(id) !== -1;
  /** fill / fix: options, the student's pick, and (after picking, or always in teacher preview) the key + explanation */
  function choiceBlock(it, key, i) {
    const got = X.fa[fkey(key, i)], prev = X.host.preview, shown = prev || got !== undefined, keyIds = answerIds(it);
    const keyTxt = keyIds.map(id => { const o = A(it.options).find(x => x.id === id); return o ? o.text : id; }).join(' / ');
    return h`<ul class="g-opts">${A(it.options).map(o => {
      const isKey = keyIds.indexOf(o.id) !== -1, mine = got === o.id;
      return h`<li><button type="button" class="gm ${shown && isKey ? 'ok' : ''} ${shown && mine && !isKey ? 'bad' : ''}" data-action="g-pick" data-key="${key}" data-i="${i}" data-k="${o.id}" ${shown ? 'disabled' : ''} ${mine ? LU.raw('aria-pressed="true"') : ''}><span class="g-ol">${o.id}.</span><span class="g-ot">${o.text}</span></button></li>`;
    })}</ul>
      ${shown ? h`<div class="g-exp ${prev || pickedOk(it, got) ? 'ok' : 'bad'}" role="status">
        ${prev ? '' : h`<p class="g-ev"><b>Bạn chọn:</b> ${(A(it.options).find(o => o.id === got) || {}).text} <span class="g-vd">— ${pickedOk(it, got) ? 'đúng' : 'chưa đúng'}</span></p>`}
        <p class="g-ev"><b>Đáp án đúng:</b> ${keyTxt}</p>${it.why ? h`<p class="g-why"><b>Giải thích:</b> ${it.why}</p>` : ''}
        ${!prev && !isDone() && !reviewing() ? h`<p class="g-retry">${btn('Thử lại câu này', 'g-unpick', { cls: 'ghost sm', attrs: 'data-key="' + key + '" data-i="' + i + '"' })}</p>` : ''}</div>` : ''}`;
  }
  function askPanel(m, key, label, ins, doneLabel, step) {
    const n = A(m[key]).length;
    if (!n) return h`${head(label, '', ins, completeBtn(doneLabel, step))}${previewHint(doneLabel)}`;
    const i = Math.min(Math.max(0, X.ui[key]), n - 1), last = i === n - 1, it = qItem(m, key, i), choice = isChoice(it), words = hintsFor(m, key, i), isUse = key === 'use', open = !isUse && !!X.hint[i];
    const ok = isConf(key, i), sample = it.sample, shown = !!sample && !!X.smp[key][i], sid = 'g-smp-' + key + '-' + i;
    const actions = h`${i > 0 ? btn('← Câu trước', 'g-qprev', { attrs: 'data-key="' + key + '"' }) : ''}${choice ? '' : confirmBtn(key, i)}${last ? completeBtn(doneLabel, step, ok) : nextBtn('Câu tiếp theo →', 'g-qgo', ok, 'data-key="' + key + '"')}`;
    const hintBox = h`<div class="g-hint"><span class="lbl">Gợi ý</span>${chips(words)}</div>${allWordsBlock(m)}`;
    const sampleBtn = sample ? btn(shown ? 'Hide sample answer' : 'View sample answer', 'g-sample', { cls: 'ghost sm', attrs: 'data-key="' + key + '" data-i="' + i + '" aria-expanded="' + shown + '" aria-controls="' + sid + '"' }) : '';
    const typed = isObj(A(m[key])[i]);
    return h`${head(label, 'Câu ' + (i + 1) + '/' + n, ins, actions)}
      <section class="g-ask">${typed ? h`<p class="g-tl">${TYPE_LABEL[it.type] || TYPE_LABEL.speak}</p>` : ''}<p class="g-aq">${qLines(it.q)}</p>
        ${choice ? choiceBlock(it, key, i) : h`${isUse ? hintBox : h`<div class="g-need">${btn(open ? 'Ẩn gợi ý' : 'Cần gợi ý?', 'g-hint', { cls: 'ghost sm', attrs: 'data-i="' + i + '" aria-expanded="' + open + '" aria-controls="g-hintbox"' })}</div>
            <div id="g-hintbox" ${open ? '' : 'hidden'}>${hintBox}</div>`}
        ${sample ? h`<div class="g-need g-smpb">${sampleBtn}</div>
          <div id="${sid}" class="g-sample" ${shown ? '' : 'hidden'}>${shown ? h`<span class="lbl">Sample answer</span><p>${sampleText(sample)}</p><p class="g-snote">Chỉ để tham khảo — không phải đáp án duy nhất.</p>` : ''}</div>` : ''}`}
      </section>
      ${last ? previewHint(doneLabel) : ''}`;
  }

  /* ---- RETRIEVE (recall, v2.8): the question never shows the answer; type / say it first, then check or reveal, then mark yourself ---- */
  const RK = { vi: 'Nghĩa tiếng Việt → nhớ lại cụm tiếng Anh', sit: 'Tình huống → nhớ lại cụm phù hợp', blank: 'Điền từ / cụm còn thiếu', speak: 'Nói thành tiếng' };
  const normR = s => String(s == null ? '' : s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[-–—/]/g, ' ').replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/^(to|a|an|the) /, '');
  const hitOf = (it, text) => { const t = normR(text); return !!t && A(it.answer).some(a => normR(a) === t); };
  const rkOf = it => it.kind === 'speak' ? 'speak' : (RK[it.kind] ? it.kind : 'vi');
  const recallGot = i => X.rs[i] && X.rs[i].done ? X.rs[i] : null;
  const recallGood = r => !!r && r.mark === 'y';
  const recallScore = () => A(X.m.recall).reduce((t, _, i) => t + (recallGood(X.rs[i]) ? 1 : 0), 0);
  function recallAnswer(it) {
    const acc = A(it.answer);
    return h`<div class="g-exp ok g-rans"><p class="g-ev"><b>${it.kind === 'speak' ? 'Cụm mục tiêu có thể dùng' : 'Đáp án'}:</b> ${acc.length ? h`<span class="g-tw g-chip">${acc[0]}</span>` : ''}</p>
      ${acc.length > 1 ? h`<p class="g-ev"><b>Cũng chấp nhận:</b> ${acc.slice(1).join(' · ')}</p>` : ''}
      ${it.sample ? h`<p class="g-ev"><b>Sample answer:</b></p><p class="g-rsample">${sampleText(it.sample)}</p><p class="g-snote">Chỉ để tham khảo — không phải đáp án duy nhất.</p>` : ''}
      ${it.why ? h`<p class="g-why"><b>Ghi chú:</b> ${it.why}</p>` : ''}</div>`;
  }
  function recallPanel(m) {
    const rc = m.recall, n = rc.length, ins = m.retrieveInstruction || 'Nhớ lại và gõ (hoặc nói thầm) đáp án trước, rồi mới bấm Kiểm tra hoặc Xem đáp án. Không có đáp án gợi ý bên cạnh câu hỏi.';
    if (X.host.preview) {                                                          // teacher: every prompt with its key, read-only
      return h`${head('Retrieve', n + ' câu · đáp án', ins)}<div class="g-key">${rc.map((it, i) => h`<section class="g-qz"><span class="g-qn">Câu ${i + 1}/${n} · ${RK[rkOf(it)]}</span><p class="g-qp">${qLines(it.q)}</p>${recallAnswer(it)}</section>`)}</div>
        <p class="hint g-prev">Xem trước — học viên nhìn câu hỏi (không có đáp án), gõ hoặc nói thầm, rồi bấm Kiểm tra / Xem đáp án và tự đánh dấu “nhớ đúng” hay “cần ôn lại”.</p>`;
    }
    if (X.rq >= n) {
      const sc = recallScore(), missed = rc.map((it, i) => [it, i]).filter(p => !recallGood(X.rs[p[1]]));
      return h`${head('Retrieve', 'Kết quả', '', h`${btn('Làm lại', 'g-rretry')}${completeBtn(stepLabel(4), 'retrieve')}`)}
        <p class="g-score" role="status"><mark>Nhớ đúng ${sc}/${n} câu trong lượt này</mark></p>
        <p class="hint g-sc-note">Đây chỉ là kết quả tự đánh giá của lượt luyện này, không phải band IELTS hay điểm Speaking.</p>
        ${missed.length ? h`<section class="g-miss"><h3 class="g-gh"><span class="g-gt">Câu cần ôn lại</span><span class="g-gv">${missed.length} câu — bấm từng câu để xem đáp án</span></h3>
          <ul class="g-ml">${missed.map(p => h`<li><details><summary><span class="g-mn">Câu ${p[1] + 1}</span><span class="g-mp">${p[0].q}</span></summary><div class="g-mb">${recallAnswer(p[0])}</div></details></li>`)}</ul></section>` : h`<p class="g-allok">Bạn nhớ đúng tất cả các câu.</p>`}`;
    }
    const it = rc[X.rq], st = recallGot(X.rq), kind = rkOf(it), speak = kind === 'speak';
    const nextLabel = X.rq + 1 < n ? 'Câu tiếp theo →' : 'Xem kết quả →';
    return h`${head('Retrieve', 'Câu ' + (X.rq + 1) + '/' + n, X.rq === 0 && !st ? ins : '', nextBtn(nextLabel, 'g-rnext', !!st))}
      <section class="g-qz g-qa g-recall"><p class="g-tl">${RK[kind]}</p><p class="g-qp g-ink">${qLines(it.q)}</p>
        ${st ? h`<p class="g-ev g-mine"><b>Bạn viết:</b> ${st.text ? st.text : h`<i>(chưa viết — xem đáp án)</i>`}</p>
          <p class="g-vd2 ${st.hit ? 'ok' : ''}" role="status">${st.hit ? '✓ Khớp với đáp án gợi ý' : speak ? 'So sánh câu nói của bạn với phần mẫu bên dưới.' : 'Chưa khớp với các đáp án gợi ý — so sánh bên dưới.'}</p>
          ${recallAnswer(it)}
          ${st.hit ? '' : h`<div class="g-mark" role="group" aria-label="Tự đánh giá"><span class="lbl">${speak ? 'Bạn có dùng được các cụm mục tiêu không?' : 'Câu trả lời của bạn có đúng nghĩa không?'}</span>
            <button type="button" class="btn ${st.mark === 'y' ? 'primary' : 'ghost'} sm" data-action="g-rmark" data-v="y" aria-pressed="${st.mark === 'y'}">${speak ? 'Có, mình dùng được' : 'Mình đã nhớ đúng (khác cách viết)'}</button>
            <button type="button" class="btn ${st.mark === 'n' ? 'primary' : 'ghost'} sm" data-action="g-rmark" data-v="n" aria-pressed="${st.mark === 'n'}">Chưa — cần ôn lại</button></div>`}`
        : h`<div class="g-rform">${speak ? h`<label class="lbl" for="g-rta">Viết (hoặc nói thành tiếng) câu trả lời của bạn trước</label><textarea id="g-rta" class="g-rin" rows="3" maxlength="300" autocomplete="off" spellcheck="false"></textarea>`
            : h`<label class="lbl" for="g-rin">Gõ câu trả lời tiếng Anh của bạn trước (hoặc nói thầm)</label><input id="g-rin" class="g-rin" type="text" maxlength="120" autocomplete="off" autocapitalize="off" spellcheck="false">`}
          <div class="g-ra">${btn(speak ? 'So sánh với mẫu' : 'Kiểm tra', 'g-rcheck', { cls: 'primary' })}${btn('Xem đáp án', 'g-rshow', { cls: 'ghost' })}</div></div>`}
      </section>`;
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
      ${!done && !X.host.preview && solved() && X.saveFailed ? h`<div class="g-nav"><span class="g-gap"></span><button type="button" class="btn primary" data-action="g-save" ${X.busy ? 'disabled' : ''}>Lưu kết quả</button></div>` : ''}`;
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
      return h`${head('Retrieve', 'Kết quả', '', h`${btn('Làm lại', 'g-qretry')}${completeBtn(stepLabel(4), 'retrieve')}`)}
        <p class="g-score" role="status"><mark>Đúng ${sc}/${n} câu trong lượt này</mark></p>
        <p class="hint g-sc-note">Đây chỉ là kết quả của lượt luyện này, không phải band IELTS hay điểm Speaking.</p>
        ${missed.length ? h`<section class="g-miss"><h3 class="g-gh"><span class="g-gt">Câu cần xem lại</span><span class="g-gv">${missed.length} câu — bấm từng câu để xem đáp án</span></h3>
          <ul class="g-ml">${missed.map(p => h`<li><details><summary><span class="g-mn">Câu ${p[1] + 1}</span><span class="g-mp">${p[0].prompt}</span></summary>
            <div class="g-mb"><p class="g-qp">${p[0].prompt}</p>${verdict(p[0], X.ans[p[1]])}</div></details></li>`)}</ul></section>` : h`<p class="g-allok">Bạn trả lời đúng tất cả các câu.</p>`}
        `;
    }
    const q = qz[X.qi], a = X.ans[X.qi], answered = a !== undefined;
    return h`${head('Retrieve', 'Câu ' + (X.qi + 1) + '/' + n, X.qi === 0 && !answered ? ins : '', nextBtn(X.qi + 1 < n ? 'Câu tiếp theo →' : 'Xem kết quả →', 'g-qnext', answered))}
      <section class="g-qz g-qa"><p class="g-qp g-ink">${q.prompt}</p>
        ${q.prompt.indexOf('______') === -1 ? h`<p class="g-qh">Chọn từ phù hợp nhất để mô tả.</p>` : ''}
        <ul class="g-opts">${q.options.map(o => h`<li><button type="button" class="gm ${answered && o.id === q.answer ? 'ok' : ''} ${answered && o.id === a && a !== q.answer ? 'bad' : ''}" data-action="g-opt" data-k="${o.id}" ${answered ? 'disabled' : ''} ${answered && o.id === a ? LU.raw('aria-pressed="true"') : ''}><span class="g-ol">${o.id}.</span><span class="g-ot">${o.text}</span></button></li>`)}</ul>
        ${answered ? verdict(q, a) : ''}</section>
      `;
  }
  const retrievePanel = m => isRecall(m) ? recallPanel(m) : isQuiz(m) ? quizPanel(m) : matchPanel(m);

  /* ---- FINISHED ---- */
  function finishedPanel(m) {
    const done = isDone(), a = asg();
    if (!done && !X.host.preview) return h`<p class="none">Hoàn thành bước Retrieve để kết thúc module.</p>`;
    const saved = X.justSaved ? h`<p class="g-saved">✓ Đã lưu lên hệ thống.</p>` : a && a.completedAt ? h`<p class="g-saved">✓ Đã lưu — hoàn thành lúc ${LU.fmtDate(a.completedAt)}.</p>` : '';
    const ex = A(m.extra);
    return h`<div class="g-done" role="status"><h2 id="g-h" tabindex="-1">Đã hoàn thành module.</h2>
      <p class="g-dsub">${m.title}${m.focus ? ' — ' + m.focus : ''}</p>${X.host.preview ? h`<p class="hint">Xem trước — học viên thấy màn hình này khi hoàn thành module.</p>` : saved}</div>
      <div class="g-nav g-end"><a class="btn primary" href="${X.host.back}">${X.host.backLabel} →</a>${btn('Ôn lại bài', 'g-review', { cls: 'plum' })}</div>
      ${ex.length ? h`<details class="g-extra"><summary>Luyện thêm — không bắt buộc</summary>
        <div class="g-ex-l">${ex.map((t, i) => h`<div class="g-ex-i"><span class="g-qn">Chủ đề ${i + 1}</span><p class="g-qp">${t.prompt}</p>${A(t.words).length ? h`<p class="g-exw"><span class="lbl">Gợi ý từ</span> ${t.words.join(' · ')}</p>` : ''}</div>`)}</div>
        ${m.extraNote ? h`<p class="g-gn">${m.extraNote}</p>` : ''}</details>` : ''}`;
  }
  function panel() {
    const m = X.m, v = STEPS[viewIndex()].id;
    if (v === 'learn') return learnPanel(m);
    if (v === 'use') return askPanel(m, 'use', 'Use', m.useInstruction || 'Trả lời thành tiếng. Dùng từ đã học khi phù hợp.', stepLabel(2), 'use');
    if (v === 'reuse') return askPanel(m, 'reuse', 'Reuse', m.reuseInstruction || 'Trả lời thành tiếng trong ngữ cảnh mới.', stepLabel(3), 'reuse');
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
  LU.actions['g-next'] = el => {
    if (!guard()) return; const st = el.dataset.step;
    if (gated() && X.cf[st]) { const len = st === 'learn' ? (isGrouped(X.m) ? X.m.learnGroups.length : 0) : A(X.m[st]).length; if (len > 0 && !X.cf[st][len - 1]) return; }   // the gate: confirm the last item first
    advance(st);
  };
  /* "Đã thực hành": only unlocks the NEXT button of this item (view state, mirrored to sessionStorage; the server never hears about it) */
  LU.actions['g-conf'] = el => {
    if (!guard() || !gated()) return; const k = el.dataset.k, i = Number(el.dataset.i);
    if (!X.cf[k] || !(i >= 0)) return; X.cf[k][i] = true; save(); refresh('[data-role=next]');
  };
  /* "View sample answer": show / hide only. Not saved, not progress, never blocks anything. */
  LU.actions['g-sample'] = el => {
    if (!guard()) return; const k = el.dataset.key, i = Number(el.dataset.i);
    if (!keyOK(k) || !qItem(X.m, k, i).sample) return;
    X.smp[k][i] = !X.smp[k][i]; refresh('[data-action=g-sample]');
  };
  LU.actions['g-save'] = () => { advance('retrieve').then(ok => { if (!ok) { X.saveFailed = true; refresh('[data-action=g-save]'); } }); };

  /* learn: group navigation only — it says nothing about what the student has learnt */
  const step = (n, d, lo, hi) => Math.min(hi, Math.max(lo, n + d));
  LU.actions['g-gprev'] = () => { if (!guard() || !isGrouped(X.m)) return; X.gi = step(X.gi, -1, 0, X.m.learnGroups.length - 1); save(); refresh(); landOnHeading(); };
  LU.actions['g-gnext'] = () => { if (!guard() || !isGrouped(X.m) || !isConf('learn', X.gi)) return; X.gi = step(X.gi, 1, 0, X.m.learnGroups.length - 1); save(); refresh(); landOnHeading(); };
  /* use / reuse: question navigation */
  const keyOK = k => k === 'use' || k === 'reuse';
  LU.actions['g-qprev'] = el => { const k = el.dataset.key; if (!guard() || !keyOK(k)) return; X.ui[k] = step(X.ui[k], -1, 0, Math.max(0, A(X.m[k]).length - 1)); save(); refresh(); landOnHeading(); };
  LU.actions['g-qgo'] = el => { const k = el.dataset.key; if (!guard() || !keyOK(k) || !isConf(k, X.ui[k])) return; X.ui[k] = step(X.ui[k], 1, 0, Math.max(0, A(X.m[k]).length - 1)); save(); refresh(); landOnHeading(); };
  LU.actions['g-hint'] = el => { if (!guard()) return; const i = Number(el.dataset.i); X.hint[i] = !X.hint[i]; refresh('[data-action=g-hint]'); };

  /* v2.8 use / reuse: fill / fix — pick an answer (checked at once); try again */
  LU.actions['g-pick'] = el => {
    const k = el.dataset.key, i = Number(el.dataset.i); if (!guard() || X.host.preview || !keyOK(k) || X.ui[k] !== i) return;
    const it = qItem(X.m, k, i); if (!isChoice(it) || X.fa[fkey(k, i)] !== undefined || !A(it.options).some(o => o.id === el.dataset.k)) return;
    X.fa[fkey(k, i)] = el.dataset.k; X.cf[k][i] = true; save(); refresh('[data-role=next]');
  };
  LU.actions['g-unpick'] = el => {
    const k = el.dataset.key, i = Number(el.dataset.i); if (!guard() || X.host.preview || !keyOK(k) || X.ui[k] !== i) return;
    delete X.fa[fkey(k, i)]; delete X.cf[k][i]; save(); refresh('[data-action=g-pick]');
  };
  /* v2.8 retrieve (recall): attempt first → check / reveal → self-mark → next; retry resets this attempt only */
  const rIn = () => { const e = document.getElementById('g-rin') || document.getElementById('g-rta'); return e ? String(e.value || '').trim().slice(0, 300) : ''; };
  function recallReveal(typed) {
    if (!guard() || X.host.preview || !isRecall(X.m) || X.rq >= X.m.recall.length || recallGot(X.rq)) return;
    const it = X.m.recall[X.rq], text = typed ? rIn() : '', hit = typed && rkOf(it) !== 'speak' && hitOf(it, text);
    X.rs[X.rq] = { text: text, done: true, hit: hit, mark: hit ? 'y' : 'n' }; save(); refresh('[data-role=next]');
  }
  LU.actions['g-rcheck'] = () => { if (!rIn()) { LU.toast('Hãy viết hoặc gõ câu trả lời trước, hoặc bấm “Xem đáp án”.', true); return; } recallReveal(true); };
  LU.actions['g-rshow'] = () => recallReveal(false);
  LU.actions['g-rmark'] = el => {
    if (!guard() || X.host.preview || !isRecall(X.m)) return; const st = recallGot(X.rq); if (!st || st.hit || (el.dataset.v !== 'y' && el.dataset.v !== 'n')) return;
    st.mark = el.dataset.v; save(); refresh('[data-role=next]');
  };
  LU.actions['g-rnext'] = () => {
    if (!guard() || X.host.preview || !isRecall(X.m) || X.rq >= X.m.recall.length || !recallGot(X.rq)) return;   // never skips an item that was not attempted
    X.rq = Math.min(X.m.recall.length, X.rq + 1); save(); refresh(); landOnHeading();
  };
  LU.actions['g-rretry'] = () => { if (!guard() || X.host.preview || !isRecall(X.m)) return; X.rq = 0; X.rs = {}; save(); refresh(); landOnHeading(); };
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target && e.target.id === 'g-rin' && guard()) { e.preventDefault(); LU.actions['g-rcheck'](); } });

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
