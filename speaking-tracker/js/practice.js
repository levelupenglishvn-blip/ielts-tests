/* practice.js — the generic PRACTICE ENGINE.
 *
 * Three layers, kept apart on purpose:
 *   CONTENT      = Master Practice Library (this file's registry, filled from data/practice-modules.js). Static teaching content.
 *   RELATIONSHIP = which student was given which module (Sheet tab "Practice Assignments"; moduleId + week + type only).
 *   PROGRESS     = status + timestamps + history (Sheet tabs "Practice Assignments" / "Practice History").
 * Student data NEVER contains module content: the UI only ever holds a moduleId and resolves it here.
 *
 * Nothing in this file knows about a particular module. Cards, steps and filters are rendered from module metadata,
 * so adding the 10th or the 500th module means adding one object to data/practice-modules.js (see its header for the schema).
 */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  const P = LU.practice = {};

  /* ------------------------------------------------------------ taxonomy (labels + order only; unknown categories still work) */
  P.groups = [
    { id: 'part1', label: 'PART 1', subs: [
      { id: 'atmosphere', label: 'Atmosphere' }, { id: 'landscape', label: 'Views / Landscape', aliases: ['views', 'views-landscape'] },
      { id: 'people', label: 'People' }, { id: 'feelings', label: 'Feelings' }, { id: 'places', label: 'Places' }, { id: 'activities', label: 'Activities' },
      { id: 'appearance', label: 'Appearance' }, { id: 'frequency', label: 'Frequency' }, { id: 'comparison', label: 'Comparison' }, { id: 'change', label: 'Change' }] },
    { id: 'language', label: 'LANGUAGE FUNCTIONS', aliases: ['language-functions', 'functions'], subs: [
      { id: 'giving-reasons', label: 'Giving reasons' }, { id: 'describing-change', label: 'Describing change' }, { id: 'describing-feelings', label: 'Describing feelings' },
      { id: 'giving-examples', label: 'Giving examples' }, { id: 'comparing', label: 'Comparing' }, { id: 'speculating', label: 'Speculating' },
      { id: 'reflecting', label: 'Reflecting' }, { id: 'giving-opinions', label: 'Giving opinions' }] },
    { id: 'lexical', label: 'LEXICAL RESOURCE', aliases: ['lexical-resource', 'vocabulary'], subs: [
      { id: 'tier-1', label: 'Tier 1', aliases: ['tier1'] }, { id: 'tier-2', label: 'Tier 2', aliases: ['tier2'] }] }
  ];
  /* Which kind of practice usually helps which diagnostic issue. Plain suggestions for the TEACHER (nothing is ever auto-assigned).
   * Look-up order: 'criterion.issue' -> 'criterion'. Edit freely. Modules can also declare `addresses: ['vocabulary.limited_range']`. */
  P.issueHints = {
    'fluency': ['Part 1 topic expansion', 'Language Functions: Giving reasons / Giving examples'],
    'fluency.short_answers': ['Topic expansion', 'Giving reasons', 'Giving examples'],
    'fluency.unclear_ideas': ['Giving opinions', 'Giving reasons'],
    'vocabulary': ['Part 1 topic vocabulary', 'Specificity', 'Topic expansion', 'Language Functions'],
    'vocabulary.limited_range': ['Part 1 topic vocabulary', 'Specificity', 'Topic expansion', 'Language Functions'],
    'vocabulary.word_retrieval': ['Part 1 topic vocabulary'],
    'grammar': ['Part 1 sentence patterns', 'Language Functions'],
    'pronunciation': ['Pronunciation practice (chưa có trong thư viện)']
  };
  const STEP_ORDER = ['recognise', 'retrieve', 'use', 'reuse'];
  const STEP_LABEL = { recognise: 'RECOGNISE', retrieve: 'RETRIEVE', use: 'USE', reuse: 'REUSE' };
  const STEP_HINT = { recognise: 'Nhận ra', retrieve: 'Nhớ lại', use: 'Sử dụng', reuse: 'Dùng lại' };
  P.STATUS = {
    not_started: { glyph: '○', label: 'Not started', cls: 'not_started' },
    in_progress: { glyph: '◐', label: 'In progress', cls: 'in_progress' },
    completed: { glyph: '✓', label: 'Completed', cls: 'done' }
  };

  /* ------------------------------------------------------------ registry */
  const REG = {}; let ORDER = [];
  const slug = s => String(s == null ? '' : s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const human = s => String(s || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const arr = v => Array.isArray(v) ? v : (v === undefined || v === null || v === '' ? [] : [v]);
  const groupOf = id => P.groups.find(g => g.id === id || (g.aliases || []).indexOf(id) !== -1);
  const subOf = (g, id) => g && g.subs.find(s => s.id === id || (s.aliases || []).indexOf(id) !== -1);

  /** Accepts the documented module shape; fills defaults; keeps unknown fields so the schema can grow without breaking old data. */
  P.normalize = function (m) {
    if (!m || typeof m !== 'object') return null;
    const id = String(m.id || '').trim(), title = String(m.title || '').trim();
    if (!/^[A-Za-z0-9][A-Za-z0-9_.-]{0,79}$/.test(id) || !title) return null;      // same id rule as the server
    const cat = slug(m.category), g = groupOf(cat), sub = slug(m.subcategory), sg = subOf(g, sub);
    const steps = {}; const ps = m.practiceSteps && typeof m.practiceSteps === 'object' ? m.practiceSteps : {};
    Object.keys(ps).forEach(k => { const a = arr(ps[k]); if (a.length) steps[k] = a; });
    return Object.assign({}, m, {
      id: id, title: title, category: g ? g.id : cat, subcategory: sg ? sg.id : sub, topic: String(m.topic || ''),
      target: String(m.target || ''), targetLanguage: arr(m.targetLanguage), examples: arr(m.examples), practiceSteps: steps,
      commonMistakes: arr(m.commonMistakes), tags: arr(m.tags).map(slug), addresses: arr(m.addresses).map(String),
      recommendedRepetitions: Math.max(1, parseInt(m.recommendedRepetitions, 10) || 1), sample: !!m.sample, active: m.active !== false,
      status: m.status === 'draft' ? 'draft' : 'ready', focus: String(m.focus || ''), level: String(m.level || ''), bestFor: String(m.bestFor || ''),
      learn: Array.isArray(m.learn) ? m.learn : [], use: Array.isArray(m.use) ? m.use : [], reuse: Array.isArray(m.reuse) ? m.reuse : [], retrieve: Array.isArray(m.retrieve) ? m.retrieve : []
    });
  };
  /** register([module,...]) or register({id: module,...}). Re-registering an id replaces it. Returns how many were accepted. */
  P.register = function (list) {
    const items = Array.isArray(list) ? list : Object.keys(list || {}).map(k => Object.assign({ id: k }, list[k]));
    let n = 0;
    items.forEach(raw => {
      const m = P.normalize(raw);
      if (!m) { if (window.console) console.warn('[practice] skipped an invalid module:', raw && raw.id); return; }
      if (!REG[m.id]) ORDER.push(m.id);
      REG[m.id] = m; n++;
    });
    return n;
  };
  P.unregister = id => { delete REG[id]; ORDER = ORDER.filter(x => x !== id); };
  P.get = id => REG[id] || null;
  P.all = () => ORDER.map(id => REG[id]).filter(m => m.active);
  P.count = () => P.all().length;
  /** A GUIDED module has the sequential Learn → Use → Reuse → Retrieve content. A DRAFT module is a placeholder: the teacher can see and assign it, the student cannot launch it yet. */
  P.isGuided = m => !!(m && m.learn.length && m.retrieve.length);
  P.isDraft = m => !!(m && m.status === 'draft');
  P.launchable = m => !!m && !P.isDraft(m);

  P.groupLabel = id => { const g = groupOf(id); return g ? g.label : String(id || '').toUpperCase() || 'KHÁC'; };
  P.subLabel = (cat, sub) => { const s = subOf(groupOf(cat), sub); return s ? s.label : human(sub); };
  /** [{id,label,count,subs:[{id,label,count}]}] — configured groups first (even if empty, so the structure is visible), then any new category found in the data. */
  P.groupsView = function (pred) {
    const mods = P.all().filter(pred || (() => true)), out = [];
    P.groups.forEach(g => {
      const subs = g.subs.map(s => ({ id: s.id, label: s.label, count: mods.filter(m => m.category === g.id && m.subcategory === s.id).length }));
      mods.filter(m => m.category === g.id && !g.subs.some(s => s.id === m.subcategory)).forEach(m => {
        const key = m.subcategory || '_none'; let s = subs.find(x => x.id === key);
        if (!s) { s = { id: key, label: m.subcategory ? human(m.subcategory) : 'Khác', count: 0 }; subs.push(s); } s.count++;
      });
      out.push({ id: g.id, label: g.label, count: mods.filter(m => m.category === g.id).length, subs: subs });
    });
    const known = {}; P.groups.forEach(g => { known[g.id] = true; });
    mods.filter(m => !known[m.category]).forEach(m => {
      const gid = m.category || '_none'; let g = out.find(x => x.id === gid);
      if (!g) { g = { id: gid, label: m.category ? human(m.category).toUpperCase() : 'KHÁC', count: 0, subs: [] }; out.push(g); }
      g.count++; const key = m.subcategory || '_none'; let s = g.subs.find(x => x.id === key);
      if (!s) { s = { id: key, label: m.subcategory ? human(m.subcategory) : 'Khác', count: 0 }; g.subs.push(s); } s.count++;
    });
    return out;
  };
  const rank = m => { const gi = P.groups.findIndex(g => g.id === m.category), g = P.groups[gi]; const si = g ? g.subs.findIndex(s => s.id === m.subcategory) : -1; return [gi < 0 ? 99 : gi, si < 0 ? 99 : si]; };
  const haystack = m => [m.title, m.topic, P.subLabel(m.category, m.subcategory), P.groupLabel(m.category), m.target].concat(m.tags, m.targetLanguage.map(t => typeof t === 'string' ? t : (t && (t.text || t.phrase)) || '')).join(' ').toLowerCase();
  /** filter({group, sub, q}) -> modules, in library order (group, subcategory, title). */
  P.filter = function (f) {
    f = f || {}; const q = String(f.q || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
    return P.all().filter(m => (!f.group || m.category === f.group) && (!f.sub || m.subcategory === f.sub) && q.every(w => haystack(m).indexOf(w) !== -1))
      .sort((a, b) => { const ra = rank(a), rb = rank(b); return ra[0] - rb[0] || ra[1] - rb[1] || (a.category === 'lexical' && b.category === 'lexical' ? ORDER.indexOf(a.id) - ORDER.indexOf(b.id) : a.title.localeCompare(b.title)); });   // lexical keeps the curriculum order (Tier 1 → Tier 2)
  };

  /* ------------------------------------------------------------ rendering (generic: only reads metadata) */
  P.statusBadge = st => { const s = P.STATUS[st] || P.STATUS.not_started; return h`<span class="badge ${s.cls}">${s.label}</span>`; };
  const tText = t => typeof t === 'string' ? t : (t && (t.text || t.prompt || t.question || t.q || t.phrase || t.title)) || '';
  P.meta = m => [P.groupLabel(m.category), m.subcategory ? P.subLabel(m.category, m.subcategory) : '', m.topic ? human(m.topic) : ''].filter(Boolean).join(' · ');

  /** One module as a card. o: { status, href, reason, tag, check:{id,checked}, extra: Safe }. */
  P.renderCard = function (m, o) {
    o = o || {};
    if (P.isDraft(m)) o = Object.assign({}, o, { href: '' });                       // content pending: never a link to the student
    const inner = h`<span class="pc-main"><span class="pc-top"><b class="pc-title">${m.title}</b>${o.status ? P.statusBadge(o.status) : ''}${m.sample ? h`<span class="tag">Demo</span>` : ''}${P.isDraft(m) ? h`<span class="tag pending">Content pending</span>` : ''}${o.tag ? h`<span class="tag">${o.tag}</span>` : ''}</span>
      <span class="pc-meta">${P.meta(m)}</span>${m.focus ? h`<span class="pc-target">${m.focus}</span>` : ''}${m.target ? h`<span class="pc-target">${m.target}</span>` : ''}${o.reason ? h`<span class="pc-reason">${o.reason}</span>` : ''}</span>`;
    if (o.check) {
      return h`<li class="pcard sel ${o.check.checked ? 'on' : ''}"><label class="pc-check"><input type="checkbox" data-change="${o.check.action}" data-id="${m.id}" ${o.check.checked ? 'checked' : ''}>${inner}</label>${o.extra || ''}</li>`;
    }
    return h`<li class="pcard">${o.href ? h`<a class="pc-link" href="${o.href}">${inner}<span class="pc-go" aria-hidden="true">›</span></a>` : inner}${o.extra || ''}</li>`;
  };
  function task(t, i) {
    if (typeof t === 'string') return h`<li>${t}</li>`;
    const text = tText(t), opts = arr(t.options), ans = arr(t.answer !== undefined ? t.answer : t.answers).map(tText).filter(Boolean);
    return h`<li>${text}${t.note ? h`<span class="t-note">${t.note}</span>` : ''}${opts.length ? h`<ul class="t-opts">${opts.map(o => h`<li>${tText(o)}</li>`)}</ul>` : ''}
      ${t.hint ? h`<details class="t-more"><summary>Gợi ý</summary><p class="note-p">${t.hint}</p></details>` : ''}
      ${ans.length ? h`<details class="t-more"><summary>Đáp án</summary><p class="note-p">${ans.join(' · ')}</p></details>` : ''}</li>`;
  }
  /** Full module content: target, language, examples, then every practice step present (any number, any order, any keys). */
  P.renderBody = function (m) {
    const keys = STEP_ORDER.filter(k => m.practiceSteps[k]).concat(Object.keys(m.practiceSteps).filter(k => STEP_ORDER.indexOf(k) === -1));
    const lang = m.targetLanguage.map(t => typeof t === 'string' ? h`<li><span class="tl">${t}</span></li>` : h`<li><span class="tl">${tText(t)}</span>${t.note || t.meaning ? h`<span class="t-note">${t.note || t.meaning}</span>` : ''}</li>`);
    return h`${m.target ? h`<section class="mod-sec"><h3>Target</h3><p class="note-p">${m.target}</p></section>` : ''}
      ${lang.length ? h`<section class="mod-sec"><h3>Target language</h3><ul class="tl-list">${lang}</ul></section>` : ''}
      ${m.examples.length ? h`<section class="mod-sec"><h3>Examples</h3><ul class="ex-list">${m.examples.map(e => typeof e === 'string' ? h`<li class="note-p">${e}</li>` : h`<li class="note-p">${tText(e)}${e.note ? h`<span class="t-note">${e.note}</span>` : ''}</li>`)}</ul></section>` : ''}
      ${keys.map((k, i) => h`<section class="mod-sec step"><h3><span class="sn">${i + 1}</span>${STEP_LABEL[k] || String(k).toUpperCase()}${STEP_HINT[k] ? h`<small>${STEP_HINT[k]}</small>` : ''}</h3><ol class="tasks">${m.practiceSteps[k].map(task)}</ol></section>`)}
      ${!keys.length && !m.target && !lang.length ? h`<p class="none">Module này chưa có nội dung.</p>` : ''}
      ${m.commonMistakes.length ? h`<section class="mod-sec"><h3>Common mistakes</h3><ul class="cm-list">${m.commonMistakes.map(c => h`<li class="note-p">${tText(c)}</li>`)}</ul></section>` : ''}`;
  };

  /* ------------------------------------------------------------ suggestions + recommendations (never assign anything) */
  const issueKeysOf = marking => { const k = []; LU.CRITERIA.forEach(c => ((marking && marking[c.id] && marking[c.id].issues) || []).forEach(i => k.push(c.id + '.' + i))); return k; };
  /** For the teacher: [{key, label, hints:[text], modules:[module]}] for the issues ticked in this mock. */
  P.suggestFor = function (marking) {
    return issueKeysOf(marking).map(key => {
      const c = key.split('.')[0];
      const mods = P.all().filter(m => m.addresses.indexOf(key) !== -1 || m.addresses.indexOf(c) !== -1);
      return { key: key, label: LU.ISSUE_LABEL[key] || key, hints: P.issueHints[key] || P.issueHints[c] || [], modules: mods };
    }).filter(x => x.hints.length || x.modules.length);
  };
  /**
   * For the student ("Recommended for you"). ctx = { assignments, history, details } exactly as getStudentProgress returns them.
   * Reasons: assigned but not finished · issue seen in earlier feedback (recurring counts more) · assigned before · never practised.
   */
  P.recommend = function (ctx, limit) {
    const A = ctx.assignments || [], H = ctx.history || [], D = ctx.details || {};
    const seen = {}; Object.keys(D).forEach(w => issueKeysOf(D[w].marking).forEach(k => { seen[k] = (seen[k] || 0) + 1; }));
    const out = [];
    P.all().filter(P.launchable).forEach(m => {
      const mine = A.filter(a => a.moduleId === m.id), done = mine.filter(a => a.status === 'completed').length;
      const hit = m.addresses.filter(k => seen[k]), recurring = hit.some(k => seen[k] > 1);
      const reasons = []; let score = 0;
      if (mine.some(a => a.status !== 'completed')) { reasons.push('Bạn đã được giao phần này nhưng chưa hoàn thành.'); score += 4; }
      if (hit.length && !(done >= m.recommendedRepetitions && !recurring)) { reasons.push(recurring ? 'Phần này lặp lại trong feedback nhiều tuần.' : 'Phần này đã xuất hiện trong feedback trước đây.'); score += recurring ? 4 : 3; }
      if (mine.length && done < m.recommendedRepetitions && !reasons.length) { reasons.push('Bạn đã từng được giao luyện phần này.'); score += 2; }
      if (!mine.length && !H.some(x => x.moduleId === m.id)) { reasons.push('Bạn chưa từng luyện module này.'); score += 1; }
      if (!reasons.length) return;
      out.push({ module: m, reasons: reasons, score: score });
    });
    out.sort((a, b) => b.score - a.score || a.module.title.localeCompare(b.module.title));
    return limit ? out.slice(0, limit) : out;
  };
  /** Counts for a module from the student's own rows: how many times completed, last activity. */
  P.usage = function (id, ctx) {
    const A = (ctx.assignments || []).filter(a => a.moduleId === id), H = (ctx.history || []).filter(x => x.moduleId === id);
    const last = H.map(x => x.at).concat(A.map(a => a.completedAt || a.startedAt || a.assignedAt)).filter(Boolean).sort().pop() || '';
    return { assigned: A.length, completed: A.filter(a => a.status === 'completed').length, opened: H.filter(x => x.action === 'opened').length, last: last };
  };
})();
