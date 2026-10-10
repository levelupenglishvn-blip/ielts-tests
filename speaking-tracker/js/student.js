/* student.js — read-only student mode (+ the student's own practice progress).
 * The server only ever returns THIS student's COMPLETED weeks. Practice modules arrive as moduleIds and are resolved against the
 * local Master Practice Library (LU.practice) — student data never carries module content.
 * Routes (student):  #/s  ·  #/s/practice  ·  #/s/module/<moduleId>/<week|extra>
 * Routes (teacher preview, read-only): the same under #/t/preview/<studentId>  */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h, P = LU.practice;
  LU.routes = LU.routes || {};
  const S = { prog: null, sel: null, tab: 'overall', preview: null, br: { q: '', group: '', sub: '' }, busy: false };

  const base = () => S.preview ? '#/t/preview/' + encodeURIComponent(S.preview) : '#/s';
  const modHref = (id, wk) => base() + '/module/' + encodeURIComponent(id) + '/' + (wk === null || wk === undefined ? 'extra' : wk);
  function shell(inner) {
    const preview = !!S.preview;
    return h`<header class="s-top"><a class="brand" href="${preview ? '#/t' : '#/s'}">${LU.wordmark()}</a>
      ${preview ? h`<a class="btn ghost sm" href="#/t">← Giáo viên</a>` : h`<button class="btn ghost sm" data-action="logout">Đăng xuất</button>`}</header>
      <main class="s-wrap">${preview ? h`<div class="notice info" style="margin-top:0">Chế độ xem trước của giáo viên — đây là màn hình học viên sẽ thấy (chỉ đọc, không ghi nhận tiến độ).</div>` : ''}${inner}</main>`;
  }
  const ackKey = () => 'lu.s.ack.' + String((LU.session.get() || {}).token || '').slice(-16);

  /* ---- reminder gate: shown before ANY data is fetched ---- */
  function gate() {
    LU.render(h`<main class="s-wrap"><div class="gate" role="alertdialog" aria-labelledby="gate-msg">${LU.wordmark()}
      <p id="gate-msg">${LU.MSG.reminder}</p><button class="btn primary lg" data-action="s-ack" autofocus>${LU.MSG.reminderBtn}</button></div></main>`);
    const b = document.querySelector('[data-action="s-ack"]'); if (b) b.focus();
  }
  LU.actions['s-ack'] = () => { LU.sess.set(ackKey(), '1'); LU.route(); };

  const latestDone = p => { const d = p.weeks.filter(w => w.state === 'completed'); return d.length ? d[d.length - 1].week : null; };
  async function load(navId, force) {
    const owner = S.preview || '';
    if (!force && S.prog && S.owner === owner) return true;
    LU.render(shell(h`<div class="loading" role="status">Đang tải…</div>`));
    let data = null, err = null;
    try { data = await LU.api.call('getStudentProgress', S.preview ? { studentId: S.preview } : {}); } catch (e) { err = e; }
    if (navId !== LU.navId) return false;
    if (err) { LU.render(shell(h`<div class="notice bad">${LU.errText(err, 'load')}<div class="row"><button class="btn dark sm" data-action="t-reload">Thử lại</button></div></div>`)); return false; }
    data.practice = data.practice || { assignments: [], history: [] };
    S.prog = data; S.owner = owner;
    if (!S.sel || !data.details[S.sel]) S.sel = latestDone(data);
    return true;
  }
  function enter(preview, navId, rest) {
    if (S.preview !== preview) { S.prog = null; S.sel = null; S.br = { q: '', group: '', sub: '' }; }
    S.preview = preview;
    rest = rest || [];
    if (rest[0] === 'module' && rest[1]) return moduleView(decodeURIComponent(rest[1]), rest[2] || 'extra', navId);
    if (rest[0] === 'practice') return browseView(navId);
    return dashView(navId);
  }
  LU.routes.student = function (navId, rest) {
    if (LU.sess.get(ackKey()) !== '1') { S.preview = null; gate(); return; }
    const tok = String((LU.session.get() || {}).token || '');
    if (S.tok !== tok) { S.tok = tok; S.prog = null; S.sel = null; S.br = { q: '', group: '', sub: '' }; }   // another student on this browser
    return enter(null, navId, rest);
  };
  LU.routes.preview = function (sid, navId, rest) { return enter(sid, navId, rest); };

  /* ---------------------------------------------------------------- dashboard */
  async function dashView(navId) { if (await load(navId, true)) renderDash(); }

  const assignList = () => (S.prog.practice.assignments || []);
  const recFor = w => assignList().filter(a => a.type === 'recommended' && a.week === w).sort((a, b) => a.order - b.order);
  const extraList = () => assignList().filter(a => a.type === 'extra');
  const statusOf = (id, wk) => { const a = assignList().find(x => x.moduleId === id && (wk === null ? x.type === 'extra' : x.type === 'recommended' && x.week === wk)); return a ? a.status : null; };

  const NAME = { fluency: 'Fluency & Coherence', vocabulary: 'Lexical Resource', grammar: 'Grammar', pronunciation: 'Pronunciation' };
  const WORD = { fluency: 'Fluency', vocabulary: 'Vocabulary', grammar: 'Grammar', pronunciation: 'Pronunciation' };
  const clean = v => String(v || '').split('\n').map(x => x.trim()).filter(Boolean);
  const uniqL = a => a.filter((x, i) => a.indexOf(x) === i);

  /** Week pills (compact). Completed weeks are buttons; the rest are inert. */
  function weekPills(p) {
    return h`<nav class="wk-pills" aria-label="Chọn tuần">${p.weeks.map(w => {
      const info = LU.stateInfo(w), cur = S.sel === w.week;
      if (w.state === 'completed') return h`<button type="button" class="wkp ${info.key}" data-action="s-week" data-week="${w.week}" aria-current="${cur}" title="${info.label} · Overall ${LU.fmtBand(w.overall)}">W${w.week}</button>`;
      return h`<span class="wkp ${w.state === 'locked' ? 'locked' : 'todo'}" title="Tuần ${w.week}: ${info.label}">W${w.week}</span>`;
    })}</nav>`;
  }
  function renderDash() {
    const p = S.prog, N = p.totalWeeks, d = S.sel ? p.details[S.sel] : null;
    const cur = p.currentWeek ? p.weeks[p.currentWeek - 1] : null;
    let status = '';
    if (cur && (!d || cur.week !== d.week)) status = h`<p class="s-status">Tuần ${cur.week}: <b>${LU.stateInfo(cur).label}</b> — feedback sẽ hiện ở đây khi thầy chấm xong.</p>`;
    LU.render(shell(h`
      <header class="fb-head"><p class="eyebrow">FEEDBACK CỦA THẦY</p><h1>${d ? 'Week ' + d.week : 'Mock Test'}</h1><p class="sub">Mock Test Feedback</p>
        <div class="fb-meta"><span>${p.name} · ${p.completedCount}/${N} tuần</span>${weekPills(p)}</div></header>
      ${status}
      ${d ? summary(d) : h`<section class="d-sec"><p class="none">Chưa có kết quả mock test nào. Khi thầy chấm xong, feedback sẽ hiện ở đây.</p></section>`}
`));
  }
  LU.actions['s-week'] = el => { S.sel = Number(el.dataset.week); S.tab = 'overall'; LU.keepScroll(renderDash); window.scrollTo(0, 0); };

  /* ---------------------------------------------------------------- FEEDBACK SUMMARY: Overall | Strengths | Improvements | Practice Plan (one panel at a time) */
  /** Lines for one criterion + kind. Week-level text (v2.2) first; feedback typed per Part in older versions is still shown. */
  function linesFor(d, c, kind) {
    const out = clean((d.marking[c] || {})[kind]);
    LU.PARTS.forEach(pt => { const f = (d.parts[pt.key] || {})[c], o = typeof f === 'string' ? { improvement: f } : (f || {}); clean(o[kind]).forEach(t => out.push(t)); });
    return uniqL(out);
  }
  function overallPanel(d) {
    const bands = LU.CRITERIA.map(c => d.marking[c.id].band), tn = String(d.teacherNote || '').trim();
    return h`<div class="ov-box"><div class="ov-score"><span class="ov-big">${LU.fmtBand(d.overall)}</span><span class="ov-lbl">Overall Band</span></div>
      <p class="ov-crit">${LU.CRITERIA.map((c, i) => h`<span class="oc">${WORD[c.id]} <b>${LU.fmtCrit(bands[i])}</b></span>`)}</p>
      ${d.completedAt ? h`<p class="hint">Chấm ngày ${LU.fmtDate(d.completedAt)}</p>` : ''}</div>
      ${tn ? h`<div class="t-note-box"><h3>Nhận xét của thầy</h3><p class="note-p">${tn}</p></div>` : ''}`;
  }
  function strengthsPanel(d) {
    const g = LU.CRITERIA.map(c => ({ c: c, items: linesFor(d, c.id, 'positive') })).filter(x => x.items.length);
    if (!g.length) return h`<p class="none">Thầy chưa ghi điểm mạnh cụ thể cho tuần này.</p>`;
    return h`${g.map(x => h`<div class="fb-g pos"><h4>${NAME[x.c.id]}</h4><ul>${x.items.map(t => h`<li>${t}</li>`)}</ul></div>`)}`;
  }
  function improvementsPanel(d) {
    const g = LU.CRITERIA.map(c => ({ c: c, items: linesFor(d, c.id, 'improvement'), tags: (d.marking[c.id].issues || []).map(i => LU.ISSUE_LABEL[c.id + '.' + i] || i) })).filter(x => x.items.length || x.tags.length);
    if (!g.length) return h`<p class="none">Thầy chưa ghi điểm cần cải thiện cụ thể cho tuần này.</p>`;
    return h`${g.map(x => h`<div class="fb-g neg" data-criterion="${x.c.id}"><div class="fb-g-head"><h4>${NAME[x.c.id]}</h4>
      <button type="button" class="btn ghost sm criterion-practice" data-action="s-practice-context" data-ui="practice-request" data-criterion="${x.c.id}" data-week="${d.week}">Luyện ${x.c.id === 'fluency' ? 'FC&C' : WORD[x.c.id]} <span aria-hidden="true">→</span></button></div>
      ${x.items.length ? h`<ul>${x.items.map(t => h`<li>${t}</li>`)}</ul>` : ''}
      ${x.tags.length ? h`<div class="tags" aria-label="Vấn đề thầy ghi nhận">${x.tags.map(t => h`<span class="tag-i">${t}</span>`)}</div>` : ''}</div>`)}`;
  }
  const TABS = [{ id: 'overall', label: 'OVERALL' }, { id: 'strengths', label: 'STRENGTHS' }, { id: 'improvements', label: 'IMPROVEMENTS' }, { id: 'plan', label: 'PRACTICE PLAN' }];
  function summary(d) {
    const tab = TABS.some(t => t.id === S.tab) ? S.tab : 'overall';
    const panel = tab === 'strengths' ? strengthsPanel(d) : tab === 'improvements' ? improvementsPanel(d) : tab === 'plan' ? todoSection(d) : h`${overallPanel(d)}${nextSection(d, S.prog)}`;
    return h`<section class="fsum" aria-label="Feedback Summary"><div class="seg" role="tablist" aria-label="Feedback Summary">${TABS.map(t => h`<button type="button" role="tab" id="tab-${t.id}" class="seg-b ${tab === t.id ? 'on' : ''}" data-action="s-tab" data-tab="${t.id}" aria-selected="${tab === t.id}" aria-controls="tabpanel">${t.label}</button>`)}</div>
      <div class="seg-panel ${tab}" id="tabpanel" role="tabpanel" aria-labelledby="tab-${tab}">${panel}</div></section>`;
  }
  LU.actions['s-tab'] = el => { S.tab = el.dataset.tab; const d = S.prog && S.prog.details[S.sel]; if (!d) return; const s = document.querySelector('.fsum'); if (s) s.outerHTML = summary(d).s; const b = document.getElementById('tab-' + S.tab); if (b) b.focus(); };

  // UI-only hook: opens the existing Practice Plan destination. It never assigns,
  // starts or completes a module. Future integrations can listen to this event.
  LU.actions['s-practice-context'] = el => {
    const criterion = el.dataset.criterion, week = Number(el.dataset.week);
    LU.actions['s-tab']({ dataset: { tab: 'plan' } });
    const panel = document.getElementById('tabpanel');
    if (panel) panel.dataset.practiceCriterion = criterion;
    document.dispatchEvent(new CustomEvent('lu:practice-request', { detail: { criterion, week } }));
  };

  // Presentation only: labels come from existing library metadata and assignments.
  // No inferred assignment, fabricated module, or estimated partial progress.
  function practiceRows(rec) {
    return h`<div class="practice-table-wrap"><table class="practice-table" data-ui="practice-plan-table"><thead><tr>
      <th scope="col">Criterion</th><th scope="col">Practice module</th><th scope="col">Status</th><th scope="col">Progress</th>
      </tr></thead><tbody>${rec.map(a => {
        const m = P.get(a.moduleId), names = m ? LU.CRITERIA.filter(c => m.addresses.some(k => k === c.id || k.indexOf(c.id + '.') === 0)).map(c => NAME[c.id]) : [];
        if (m && m.category === 'lexical' && !names.length) names.push(NAME.vocabulary);
        const progress = m && P.isGuided(m) ? ((a.status === 'completed' ? 4 : Math.min(4, (a.steps || []).length)) + ' / 4') : a.status === 'completed' ? '1 / 1' : '—';
        return h`<tr data-ui="practice-plan-row" data-module-id="${a.moduleId}" data-week="${a.week}">
          <td data-practice-field="criterion" data-label="Criterion">${names.length ? names.join(' · ') : '—'}</td>
          <td data-practice-field="module" data-label="Practice module"><ul class="pcards plan-modules">${cardFor(a.moduleId, a.week)}</ul></td>
          <td data-practice-field="status" data-label="Status">${P.statusBadge(a.status)}</td>
          <td data-practice-field="progress" data-label="Progress">${progress}</td></tr>`;
      })}</tbody></table></div>`;
  }

  /* ---------------------------------------------------------------- VIỆC CẦN LÀM: Recommended Practice (teacher-assigned) → Extra Practice (self-directed, incl. Recommended for you) */
  function todoSection(d) {
    const rec = recFor(d.week), doneN = rec.filter(a => a.status === 'completed').length, legacy = (d.practice || []);
    return h`<section class="todo-sec" data-ui="practice-plan" aria-label="Practice Plan"><h2>PRACTICE PLAN</h2>
      <div class="pr-sec" id="sec-rec" aria-label="Recommended Practice"><div class="pr-h"><h3>Assigned / Recommended Practice</h3>${rec.length ? h`<span class="pr-count"><b>${doneN} / ${rec.length}</b> completed</span>` : ''}</div>
        <p class="hint">Những nội dung thầy giao cho bạn trong tuần này.</p>
        ${rec.length ? h`<div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="${rec.length}" aria-valuenow="${doneN}" aria-label="Tiến độ luyện tập"><i style="width:${Math.round(doneN / rec.length * 100)}%"></i></div>${practiceRows(rec)}` : h`<p class="none">Thầy chưa giao module nào cho tuần này.</p><div class="practice-empty-fields" data-ui="practice-plan-empty" aria-label="Cấu trúc Practice Plan"><span data-practice-field="criterion">Criterion</span><span data-practice-field="module">Practice module</span><span data-practice-field="status">Status</span><span data-practice-field="progress">Progress</span></div>`}
        ${legacy.length ? h`<div class="legacy-view"><span class="lbl">Ghi chú luyện tập của thầy</span><ul>${legacy.map(t => h`<li class="note-p">${t}</li>`)}</ul></div>` : ''}</div>
      ${extraSection()}</section>`;
  }

  /** At the very end: eligibility (exact phrases) + the eligibility note. Eligibility is the teacher's decision, never derived from the band. */
  function nextSection(d, p) {
    const ok = d.eligibility === 'eligible', nx = d.week < p.totalWeeks ? p.weeks[d.week] : null;
    const en = String(d.eligibilityNote || '').trim();
    return h`<section class="next ${ok ? 'ok' : 'no'}" aria-label="Next mock"><h2>NEXT MOCK</h2>
      <p class="nx-kicker">${ok ? 'Eligible for next mock' : 'Not ready for next mock'}</p>
      <p class="nx-badge"><span class="badge ${ok ? 'done' : 'not_eligible'}">${ok ? LU.MSG.eligYes : LU.MSG.eligNo}</span></p>
      ${en ? h`<p class="note-p nx-note">${en}</p>` : ''}
      ${nx ? h`<p class="hint">Week ${nx.week}: ${LU.stateInfo(nx).label}</p>` : ''}</section>`;
  }

  /** A module card from just an id (+status). Unknown ids (library changed) still show something harmless. */
  function cardFor(id, wk, status, o) {
    const m = P.get(id);
    if (!m) return h`<li class="pcard"><span class="pc-main"><b class="pc-title">${id}</b><span class="pc-meta">Module này hiện không còn trong thư viện.</span></span>${status ? P.statusBadge(status) : ''}</li>`;
    return P.renderCard(m, Object.assign({ status: status || undefined, href: modHref(id, wk) }, o || {}));
  }

  function extraSection() {
    const ex = extraList();
    return h`<div class="pr-sec" aria-label="Extra Practice"><div class="pr-h"><h3>Extra Practice</h3></div>
      <p class="hint">Tự chọn thêm để luyện — không bắt buộc, không thuộc tuần nào.</p>
      ${ex.length ? h`<ul class="pcards">${ex.map(a => cardFor(a.moduleId, null, a.status))}</ul>` : h`<p class="none">Bạn chưa luyện module tự chọn nào.</p>`}
      <div class="row sp"><a class="btn ghost" href="${base()}/practice">Duyệt thư viện luyện tập</a></div>
      ${recommendBlock()}</div>`;
  }
  /** "Recommended for you" lives inside Extra Practice: a system suggestion, NOT a teacher assignment. */
  function recommendBlock() {
    const list = P.recommend({ assignments: assignList(), history: S.prog.practice.history, details: S.prog.details }, 5);
    if (!list.length) return '';
    return h`<div class="rfy" aria-label="Recommended for you"><h4>Recommended for you</h4>
      <p class="hint">Gợi ý của hệ thống dựa trên feedback và lịch sử luyện tập của bạn — không phải bài thầy giao.</p>
      <ul class="pcards">${list.map(x => {
        const open = assignList().find(a => a.moduleId === x.module.id && a.type === 'recommended' && a.status !== 'completed');
        const any = assignList().find(a => a.moduleId === x.module.id && a.type === 'recommended');
        const wk = open ? open.week : any ? any.week : null;
        const st = statusOf(x.module.id, wk);
        return P.renderCard(x.module, { status: st || undefined, href: modHref(x.module.id, wk), reason: x.reasons[0] });
      })}</ul></div>`;
  }

  /* ---------------------------------------------------------------- browse the whole library */
  async function browseView(navId) { if (await load(navId, false)) renderBrowse(); }
  function pills() {
    const gv = P.groupsView(P.launchable), g = gv.find(x => x.id === S.br.group);
    const pill = (act, id, label, on, n) => h`<button type="button" class="pill" data-action="${act}" data-id="${id}" aria-pressed="${on}">${label}${n !== undefined ? h` <small>${n}</small>` : ''}</button>`;
    return h`<div class="pills" role="group" aria-label="Nhóm">${pill('s-bgroup', '', 'Tất cả', !S.br.group, P.all().filter(P.launchable).length)}${gv.map(x => pill('s-bgroup', x.id, x.label, S.br.group === x.id, x.count))}</div>
      ${g ? h`<div class="pills sub" role="group" aria-label="Nhóm con">${pill('s-bsub', '', 'Tất cả', !S.br.sub)}${g.subs.map(x => pill('s-bsub', x.id, x.label, S.br.sub === x.id, x.count))}</div>` : ''}`;
  }
  function results() {
    if (!P.all().some(P.launchable)) return h`<p class="none">Thư viện luyện tập chưa có module nào.</p>`;
    const list = P.filter(S.br).filter(P.launchable);
    if (!list.length) return h`<p class="none">Không tìm thấy module phù hợp.</p>`;
    return h`<ul class="pcards">${list.map(m => {
      const rec = assignList().find(a => a.moduleId === m.id && a.type === 'recommended' && a.status !== 'completed') || assignList().find(a => a.moduleId === m.id && a.type === 'recommended');
      const wk = rec ? rec.week : null;
      return P.renderCard(m, { status: statusOf(m.id, wk) || undefined, href: modHref(m.id, wk), tag: rec ? 'Thầy giao' : '' });
    })}</ul>`;
  }
  function renderBrowse() {
    LU.render(shell(h`<a class="btn ghost sm back" href="${base()}">← Quay lại</a>
      <section class="s-sec"><h2>Extra Practice</h2><p class="hint">Chọn module để luyện thêm. Mở một module là bắt đầu; bạn tự đánh dấu hoàn thành khi xong.</p>
        <div class="field"><label class="sr-only" for="s-q">Tìm module</label><input id="s-q" type="search" data-input="s-bq" placeholder="Tìm theo tên, chủ đề…" value="${S.br.q}" autocomplete="off"></div>
        <div id="s-pills">${pills()}</div><div id="s-res">${results()}</div></section>`));
  }
  const setHtml = (id, safe) => { const el = document.getElementById(id); if (el) el.innerHTML = safe.s; };
  LU.inputs['s-bq'] = el => { S.br.q = el.value; setHtml('s-res', results()); };
  LU.actions['s-bgroup'] = el => { S.br.group = el.dataset.id; S.br.sub = ''; setHtml('s-pills', pills()); setHtml('s-res', results()); };
  LU.actions['s-bsub'] = el => { S.br.sub = el.dataset.id; setHtml('s-pills', pills()); setHtml('s-res', results()); };

  /* ---------------------------------------------------------------- one module */
  function putAssignment(a) {
    const list = S.prog.practice.assignments, i = list.findIndex(x => x.moduleId === a.moduleId && x.type === a.type && x.week === a.week);
    if (i === -1) list.push(a); else list[i] = a;
  }
  async function moduleView(id, wkSeg, navId) {
    if (!(await load(navId, false))) return;
    const wk = wkSeg === 'extra' ? null : Number(wkSeg), type = wk === null ? 'extra' : 'recommended';
    const back = wk === null ? base() + '/practice' : base();
    const m = P.get(id);
    if (!m) { LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a><div class="notice bad">Module này hiện không còn trong thư viện.</div>`)); return; }
    if (wk !== null && (!isFinite(wk) || !assignList().some(a => a.moduleId === id && a.type === 'recommended' && a.week === wk))) {
      LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a><div class="notice bad">Module này chưa được giao cho bạn.</div>`)); return;
    }
    LU.guided.reset();
    if (P.isDraft(m)) { LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a><article class="module"><header class="mod-h"><p class="eyebrow">${P.meta(m)}</p><h1>${m.title} <span class="tag pending">Content pending</span></h1></header>
      <div class="notice info">Nội dung module này chưa sẵn sàng. Thầy sẽ cập nhật sau.</div></article>`)); return; }
    if (!S.preview) {                                   // opening = starting (server logs it; completing needs this first)
      LU.render(shell(h`<div class="loading" role="status">Đang mở module…</div>`));
      try { const r = await LU.api.call('openPractice', { moduleId: id, type: type, week: wk, guided: P.isGuided(m) }); if (navId !== LU.navId) return; putAssignment(r.assignment); }
      catch (e) { if (navId !== LU.navId) return; LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a><div class="notice bad">${LU.errText(e, 'load')}</div>`)); return; }
    }
    renderModule(m, wk);
  }
  /** Guided module (Learn → Use → Reuse → Retrieve → Finished): the generic renderer in js/guided.js; progress is saved step by step. */
  function renderGuided(m, wk) {
    const type = wk === null ? 'extra' : 'recommended', back = wk === null ? base() + '/practice' : base();
    const find = () => assignList().find(x => x.moduleId === m.id && (wk === null ? x.type === 'extra' : x.type === 'recommended' && x.week === wk)) || null;
    const host = { assignment: find, preview: !!S.preview, back: back,
      step: async id => { const r = await LU.api.call('completePracticeStep', { moduleId: m.id, type: type, week: wk, step: id }); putAssignment(r.assignment); return r.assignment; } };
    LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a><article class="module guided">${LU.guided.mount(m, host)}</article>`));
    ['.s-wrap', '.s-top'].forEach(q => { const w = document.querySelector(q); if (w) w.classList.add('wide'); });
  }
  function renderModule(m, wk) {
    if (P.isGuided(m)) return renderGuided(m, wk);
    const a = assignList().find(x => x.moduleId === m.id && (wk === null ? x.type === 'extra' : x.type === 'recommended' && x.week === wk));
    const st = a ? a.status : null, back = wk === null ? base() + '/practice' : base();
    LU.render(shell(h`<a class="btn ghost sm back" href="${back}">← Quay lại</a>
      <article class="module"><header class="mod-h"><p class="eyebrow">${P.meta(m)}</p><h1>${m.title}${m.sample ? h` <span class="tag">Demo</span>` : ''}</h1>
        <div class="row">${st ? P.statusBadge(st) : ''}${wk !== null ? h`<span class="hint">Recommended · Tuần ${wk}</span>` : h`<span class="hint">Extra Practice</span>`}</div></header>
        ${P.renderBody(m)}
        ${m.recommendedRepetitions > 1 ? h`<p class="hint sp">Gợi ý luyện lặp lại ${m.recommendedRepetitions} lần.</p>` : ''}
        <div class="mod-foot" id="mod-foot">${footer(m, wk, st)}</div></article>`));
  }
  function footer(m, wk, st) {
    if (S.preview) return h`<p class="hint">Xem trước — học viên sẽ thấy nút “Mark as completed” ở đây.</p>`;
    if (st === 'completed') return h`<div class="notice done" role="status">Bạn đã hoàn thành module này.</div>`;
    return h`<button class="btn primary lg" data-action="s-complete" data-id="${m.id}" data-week="${wk === null ? 'extra' : wk}" ${S.busy ? 'disabled' : ''}>Mark as completed</button>
      <p class="hint">Chỉ bấm khi bạn đã luyện xong các bước ở trên.</p>`;
  }
  LU.actions['s-complete'] = async el => {
    if (S.busy || S.preview) return;
    const id = el.dataset.id, wk = el.dataset.week === 'extra' ? null : Number(el.dataset.week), m = P.get(id), navId = LU.navId;
    S.busy = true; el.disabled = true; el.textContent = 'Đang lưu…';
    try {
      const r = await LU.api.call('completePractice', { moduleId: id, type: wk === null ? 'extra' : 'recommended', week: wk });
      putAssignment(r.assignment); S.busy = false;
      if (navId === LU.navId) { setHtml('mod-foot', footer(m, wk, r.assignment.status)); LU.toast('Đã đánh dấu hoàn thành'); const badge = document.querySelector('.mod-h .badge'); if (badge) badge.outerHTML = P.statusBadge(r.assignment.status).s; }
    } catch (e) {
      S.busy = false; el.disabled = false; el.textContent = 'Mark as completed'; LU.toast(LU.errText(e, 'save'), true);
    }
  };
})();
