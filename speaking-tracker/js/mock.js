/* mock.js — the mock-test runner: Part 1 → Part 2 (timer) → Part 3 (live quick notes only) → Marking & Feedback (bands, strengths/improvements, issues, final note, eligibility, save) → Recommended Practice.
 * Truth lives in Google Sheets. While the teacher works, everything is mirrored to a local draft
 * (drafts.js) and pushed to the server with saveDraft / completeMock. We never claim "saved" until the API said ok. */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  let M = null;                                   // the mock currently open
  const STEPS = ['Part 1', 'Part 2', 'Part 3', 'Marking & Decision', 'Practice'];
  const TIMER_FULL = { prep: 60, speak: 120 };

  const blankPart = () => { const o = { notes: '' }; LU.CRITERIA.forEach(c => { o[c.id] = { positive: '', improvement: '', note: '' }; }); return o; };
  const lines = v => String(v || '').split('\n').map(x => x.trim()).filter(Boolean);
  const uniq = a => a.filter((x, i) => a.indexOf(x) === i);
  const blankData = () => {
    const d = { parts: {}, marking: {}, eligibility: '', eligibilityNote: '', teacherNote: '', practice: [''], recommendedPractice: [] };
    LU.PARTS.forEach(p => { d.parts[p.key] = blankPart(); });
    LU.CRITERIA.forEach(c => { d.marking[c.id] = { issues: [], band: null, positive: '', improvement: '' }; });
    return d;
  };
  /** Any stored shape (server session, local draft from an older version) -> the editable shape. v1 strings become "improvement". */
  function normData(src) {
    const d = blankData(); src = src || {};
    LU.PARTS.forEach(p => {
      const sp = (src.parts && src.parts[p.key]) || {};
      d.parts[p.key].notes = String(sp.notes || '');
      LU.CRITERIA.forEach(c => {
        const f = sp[c.id];
        if (typeof f === 'string') d.parts[p.key][c.id].improvement = f;
        else if (f) { d.parts[p.key][c.id].positive = String(f.positive || ''); d.parts[p.key][c.id].improvement = String(f.improvement || ''); d.parts[p.key][c.id].note = String(f.note || ''); }
      });
    });
    LU.CRITERIA.forEach(c => { const m = src.marking && src.marking[c.id]; if (m) d.marking[c.id] = { issues: (m.issues || []).slice(), band: typeof m.band === 'number' ? m.band : null, positive: String(m.positive || ''), improvement: String(m.improvement || '') }; });
    /* v2.2 migration: strengths/improvements used to be typed per Part. They now live once per week (Marking step), so fold the old
     * per-Part lines into the week-level text and clear the old fields — saving then moves the data, nothing is lost or duplicated. */
    LU.CRITERIA.forEach(c => ['positive', 'improvement'].forEach(k => {
      const old = []; LU.PARTS.forEach(p => { lines(d.parts[p.key][c.id][k]).forEach(t => old.push(t)); });
      if (!old.length) return;
      d.marking[c.id][k] = uniq(lines(d.marking[c.id][k]).concat(old)).join('\n');
      LU.PARTS.forEach(p => { d.parts[p.key][c.id][k] = ''; });
    }));
    d.eligibility = src.eligibility || ''; d.eligibilityNote = src.eligibilityNote || ''; d.teacherNote = String(src.teacherNote || '');
    d.practice = src.practice && src.practice.length ? src.practice.slice() : [''];
    d.recommendedPractice = Array.isArray(src.recommendedPractice) ? src.recommendedPractice.map(x => typeof x === 'string' ? x : x.moduleId).filter(Boolean) : [];
    return d;
  }
  const fromSession = s => normData(s);
  const assignedMap = list => { const m = {}; (list || []).forEach(a => { m[a.moduleId] = a; }); return m; };
  const payload = () => ({ parts: M.data.parts, marking: M.data.marking, eligibility: M.data.eligibility, eligibilityNote: M.data.eligibilityNote, teacherNote: M.data.teacherNote,
    practice: M.data.practice.map(s => s.trim()).filter(Boolean), recommendedPractice: M.data.recommendedPractice.slice() });
  const bandsOf = () => LU.CRITERIA.map(c => M.data.marking[c.id].band);

  /* ------------------------------------------------------------ local draft */
  function persist() {
    if (!M) return;
    const ok = LU.drafts.save({ studentId: M.sid, week: M.week, step: M.step, data: M.data, base: M.base, dirty: M.dirty,
      meta: { name: M.name, content: M.content, previous: M.previous, completed: M.completed } });
    if (!ok && !M.warnedStore) { M.warnedStore = true; LU.toast('Trình duyệt không cho lưu nháp trên máy. Hãy bấm “Lưu tạm” thường xuyên.', true); }
  }
  function touch() {
    M.dirty = true; M.rev++; M.finishErr = ''; persist();
    updateSyncBar(); scheduleAuto();
  }
  function scheduleAuto() {
    clearTimeout(M.autoT);
    const ms = LU.CFG.AUTOSYNC_IDLE_MS;
    if (!ms || M.completed) return;
    const m = M; M.autoT = setTimeout(() => { if (M === m) sync('auto'); }, ms);
  }

  /* ------------------------------------------------------------ server sync (draft) */
  /** The server keeps a module the student already started/finished even if the teacher un-ticked it. Show the truth. */
  function adoptAssignments(m, session, sameRev) {
    m.assigned = assignedMap(session.recommendedPractice);
    if (!sameRev) return false;
    const srv = session.recommendedPractice.map(a => a.moduleId), mine = m.data.recommendedPractice;
    const changed = srv.length !== mine.length || srv.some((id, i) => id !== mine[i]);
    if (changed) m.data.recommendedPractice = srv;
    return changed;
  }
  async function sync(kind, okMsg) {
    const m = M; if (!m || m.completed) return;
    if (m.saving) { m.again = true; return; }
    if (!m.dirty && kind !== 'manual') return;
    m.saving = true; m.sync = { state: 'saving', at: m.sync.at }; updateSyncBar();
    const rev = m.rev;
    try {
      const res = await LU.api.call('saveDraft', { studentId: m.sid, week: m.week, data: payload() });
      m.base = res.session.updatedAt; m.weeks = res.weeks;
      const sameRev = m.rev === rev, adjusted = adoptAssignments(m, res.session, sameRev);
      if (sameRev) m.dirty = false;
      m.sync = { state: 'ok', at: new Date() };
      if (M === m) persist(); else if (!m.dirty) LU.drafts.remove(m.sid, m.week);   // saved after the teacher left the screen
      if (kind === 'manual') LU.toast(okMsg || 'Đã lưu lên hệ thống ✓');
      if (adjusted && M === m) { LU.toast('Module học viên đã bắt đầu/hoàn thành không thể gỡ — đã giữ lại trong danh sách.', true); if (m.step === 4) rerender(); }
      else if (M === m && m.step === 4) refreshPrSel();
    } catch (e) {
      m.sync = { state: 'bad', msg: LU.errText(e, 'save'), at: m.sync.at };
    }
    m.saving = false;
    if (M === m) { updateSyncBar(); if (m.again) { m.again = false; if (m.dirty && m.sync.state === 'ok') sync('auto'); } }
  }

  function updateSyncBar() {
    const el = document.getElementById('syncbar'); if (!el || !M) return;
    const s = M.sync; let cls = 'local', txt;
    if (s.state === 'saving') { cls = 'saving'; txt = 'Saving… · đang lưu'; }
    else if (s.state === 'bad') { cls = 'bad'; txt = s.msg; }
    else if (M.completed && !M.dirty) { cls = 'ok'; txt = 'Saved · đã lưu lên hệ thống' + (s.at ? ' lúc ' + LU.fmtTime(s.at) : '') + '.'; }
    else if (M.completed) { cls = 'local'; txt = 'Có thay đổi chưa lưu — bấm “Lưu thay đổi” ở bước Chấm điểm & Quyết định.'; }
    else if (M.dirty) { cls = 'local'; txt = 'Draft saved · bản nháp đã giữ trên máy, chưa lưu lên hệ thống.'; }
    else if (s.state === 'ok') { cls = 'ok'; txt = 'Saved · đã lưu lên hệ thống lúc ' + LU.fmtTime(s.at) + '.'; }
    else { cls = 'ok'; txt = 'Không có thay đổi chưa lưu.'; }
    el.className = 'syncbar ' + cls;
    el.innerHTML = LU.h`<span class="dot" aria-hidden="true"></span><span class="grow">${txt}</span>${s.state === 'bad' ? LU.h`<button class="btn dark sm" data-action="m-retry">Thử lại</button>` : (!M.completed && M.dirty && s.state !== 'saving' ? LU.h`<button class="btn ghost sm" data-action="m-save">Lưu tạm</button>` : '')}`.s;
  }

  /* ------------------------------------------------------------ open / leave */
  LU.routes.mock = async function (sid, weekStr, navId) {
    const week = Number(weekStr);
    LU.render(LU.teacherShell('home', h`<div class="loading" role="status">Đang mở mock test…</div>`));
    let fresh = null, err = null;
    try { fresh = await LU.api.call('getMock', { studentId: sid, week: week }); } catch (e) { err = e; }
    if (navId !== LU.navId) return;
    const local = LU.drafts.get(sid, week);

    if (err) {
      if (err.retryable && local && local.meta && local.meta.content !== undefined) {         // offline: resume from the local copy
        M = newState(sid, week, local.meta.name, local.meta.content, local.meta.previous, !!local.meta.completed, normData(local.data), local.base);
        M.data = normData(local.data); M.step = Math.min(local.step || 0, STEPS.length - 1); M.dirty = !!local.dirty; M.sync = { state: 'bad', msg: LU.MSG.saveFail };
        M.offline = true; initTimer(); renderMock(); return;
      }
      LU.render(LU.teacherShell('home', h`<div class="notice bad">${LU.errText(err, 'load')}<div class="row">
        <button class="btn dark sm" data-action="t-reload">Thử lại</button><a class="btn ghost sm" href="#/t">Về danh sách</a></div></div>`));
      return;
    }
    const sess = fresh.session;
    M = newState(sid, week, fresh.student.name, fresh.content, fresh.previous, sess.status === 'completed', fromSession(sess), sess.updatedAt || '');
    M.weeks = fresh.weeks; M.assigned = assignedMap(sess.recommendedPractice);
    if (local) {
      if (local.dirty) {
        let use = 'local';
        if ((local.base || '') !== M.base) {
          use = await LU.choose({ title: 'Có hai phiên bản khác nhau',
            body: 'Hệ thống có dữ liệu mới hơn bản nháp trên máy (nháp lưu lúc ' + LU.fmtDate(local.savedAt) + '). Dùng bản nào?',
            choices: [{ id: 'server', label: 'Dùng bản trên hệ thống', cls: 'ghost' }, { id: 'local', label: 'Dùng bản nháp trên máy', cls: 'primary' }] }) || 'local';
          if (navId !== LU.navId) return;
        }
        if (use === 'local') { M.data = normData(local.data); M.dirty = true; M.step = Math.min(local.step || 0, STEPS.length - 1); M.sync = { state: 'local' }; M.restored = true; }
        else LU.drafts.remove(sid, week);
      } else if ((local.base || '') === M.base) M.step = Math.min(local.step || 0, STEPS.length - 1);
    }
    persistIfNeeded();
    initTimer(); renderMock(); scheduleAuto();
    if (M.restored) LU.toast('Đã khôi phục bản nháp chưa lưu từ máy này.');
  };
  function newState(sid, week, name, content, previous, completed, data, base) {
    return { sid, week, name, content, previous, completed, data, base: base || '', step: 0, dirty: false, rev: 0, saving: false, again: false,
      sync: { state: 'ok', at: null }, result: null, asked: {}, finishErr: '', weeks: null, timer: null, autoT: null, restored: false,
      assigned: {}, pr: { q: '', group: '', sub: '' }, sampOpen: {} };
  }
  function persistIfNeeded() { if (M.dirty) persist(); }
  LU.leave = function () {
    if (!M) return;
    clearTimeout(M.autoT); stopTick();
    if (M.timer) saveTimer(true);
    if (M.dirty && !M.completed && !M.offline) { sync('auto'); }
    else if (!M.dirty) LU.drafts.remove(M.sid, M.week);
    LU.T.sel = M.sid; LU.T.setWeek(M.week);
    M = null;
  };

  /* ------------------------------------------------------------ timer (manual START / PAUSE / RESET, never autoplays) */
  let tickId = null;
  function initTimer() {
    const saved = LU.drafts.timerGet(M.sid, M.week);
    const mode = saved && TIMER_FULL[saved.mode] ? saved.mode : 'prep';
    M.timer = { mode: mode, remaining: saved && typeof saved.remaining === 'number' ? saved.remaining : TIMER_FULL[mode], running: false, endAt: 0, ended: false, msg: '' };
  }
  function saveTimer(force) { if (!M || !M.timer) return; const t = M.timer; LU.drafts.timerSet(M.sid, M.week, { mode: t.mode, remaining: Math.max(0, Math.round(t.remaining)) }); }
  const mmss = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  function stopTick() { if (tickId) { clearInterval(tickId); tickId = null; } }
  function tick() {
    const t = M && M.timer; if (!t || !t.running) { stopTick(); return; }
    t.remaining = (t.endAt - Date.now()) / 1000;
    if (t.remaining <= 0) {
      t.remaining = 0; t.running = false; t.ended = true; stopTick();
      if (t.mode === 'prep') { t.msg = 'Hết 1:00 chuẩn bị. Bấm START để bắt đầu 2:00 nói.'; t.mode = 'speak'; t.remaining = TIMER_FULL.speak; t.ended = false; t.awaiting = true; }
      else t.msg = 'Hết giờ nói (2:00).';
      saveTimer(); renderTimer(); return;
    }
    const c = document.getElementById('tm-clock'); if (c) c.textContent = mmss(t.remaining);
  }
  function renderTimer() {
    const el = document.getElementById('timer'); if (!el || !M || !M.timer) return;
    const t = M.timer;
    el.className = 'timer' + (t.running ? ' running' : '') + (t.ended ? ' ended' : '');
    el.innerHTML = h`<div class="timer-modes" role="group" aria-label="Chế độ đếm giờ">
        <button type="button" data-action="m-tmode" data-mode="prep" aria-pressed="${t.mode === 'prep'}">Chuẩn bị 1:00</button>
        <button type="button" data-action="m-tmode" data-mode="speak" aria-pressed="${t.mode === 'speak'}">Nói 2:00</button></div>
      <div class="timer-clock" id="tm-clock" role="timer" aria-label="Thời gian còn lại">${mmss(t.remaining)}</div>
      <div class="timer-msg" id="tm-msg" aria-live="polite">${t.msg}</div>
      <div class="timer-btns">
        <button type="button" class="btn primary" data-action="m-tstart" ${t.running ? 'disabled' : ''}>START</button>
        <button type="button" class="btn dark" data-action="m-tpause" ${t.running ? '' : 'disabled'}>PAUSE</button>
        <button type="button" class="btn ghost" data-action="m-treset">RESET</button></div>`.s;
  }
  LU.actions['m-tstart'] = () => {
    const t = M.timer; if (t.running) return;
    if (t.remaining <= 0) t.remaining = TIMER_FULL[t.mode];
    t.endAt = Date.now() + t.remaining * 1000; t.running = true; t.ended = false; t.msg = t.mode === 'prep' ? 'Đang chuẩn bị…' : 'Đang nói…'; t.awaiting = false;
    stopTick(); tickId = setInterval(tick, 200); renderTimer();
  };
  LU.actions['m-tpause'] = () => {
    const t = M.timer; if (!t.running) return;
    t.remaining = Math.max(0, (t.endAt - Date.now()) / 1000); t.running = false; t.msg = 'Đã tạm dừng.'; stopTick(); saveTimer(); renderTimer();
  };
  LU.actions['m-treset'] = () => { const t = M.timer; stopTick(); t.running = false; t.ended = false; t.awaiting = false; t.remaining = TIMER_FULL[t.mode]; t.msg = ''; saveTimer(); renderTimer(); };
  LU.actions['m-tmode'] = el => { const t = M.timer; stopTick(); t.mode = el.dataset.mode; t.running = false; t.ended = false; t.awaiting = false; t.remaining = TIMER_FULL[t.mode]; t.msg = ''; saveTimer(); renderTimer(); };

  /* ------------------------------------------------------------ rendering */
  const stepDone = i => {
    const d = M.data;
    if (i < 3) { const p = d.parts[LU.PARTS[i].key]; return !!p.notes.trim() || LU.CRITERIA.some(c => p[c.id].note.trim()); }
    if (i === 3) return bandsOf().every(b => b !== null) && !!d.eligibility && (d.eligibility === 'eligible' || !!d.eligibilityNote.trim());
    if (i === 4) return d.recommendedPractice.length > 0 || d.practice.some(s => s.trim());
    return !!M.result;
  };
  function checkItems() {
    const d = M.data, nb = bandsOf().filter(b => b !== null).length;
    return [
      { ok: nb === 4, text: 'Đã chấm band cho cả 4 tiêu chí (' + nb + '/4)', step: 3 },
      { ok: !!d.eligibility, text: 'Đã chọn Đủ điều kiện / Chưa đủ điều kiện', step: 3 },
      { ok: d.eligibility !== 'not_eligible' || !!d.eligibilityNote.trim(), text: 'Đã nhập lý do (bắt buộc khi chưa đủ điều kiện)', step: 4 }
    ];
  }
  function renderMock() {
    if (!M) return;
    if (M.result) { renderResult(); return; }
    const info = M.weeks ? LU.stateInfo(M.weeks[M.week - 1]) : null;
    const body = h`
      <div class="mock-head"><h1>Tuần ${M.week} · ${M.name || M.sid}</h1><span class="mono hint">${M.sid}</span>
        ${M.completed ? h`<span class="badge done">✓ Đã hoàn thành — đang chỉnh sửa</span>` : h`<span class="badge in_progress">● Đang thực hiện</span>`}
        <a class="btn ghost sm back" href="#/t">← Danh sách</a></div>
      <div class="syncbar local" id="syncbar" role="status" aria-live="polite"></div>
      <ol class="stepper" aria-label="Các bước">${STEPS.map((s, i) => h`<li><button type="button" class="step ${stepDone(i) ? 'done' : ''}" data-action="m-step" data-i="${i}" ${i === M.step ? h`aria-current="step"` : ''}><span class="n">${stepDone(i) ? '✓' : i + 1}</span><span>${s}</span></button></li>`)}</ol>
      ${M.step < 3 ? partStep(M.step) : M.step === 3 ? finalStep() : practiceStep()}
      ${navButtons()}`;
    LU.render(LU.teacherShell('home', body));
    updateSyncBar();
    if (M.step === 1) renderTimer();
    if (M.step === 3) refreshMarking();
  }
  const rerender = () => LU.keepScroll(renderMock);

  function navButtons() {
    const last = M.step === STEPS.length - 1;
    return h`<div class="mock-nav">
      ${M.step > 0 ? h`<button class="btn ghost" data-action="m-prev">← ${STEPS[M.step - 1]}</button>` : ''}
      <span class="grow"></span>
      ${!M.completed ? h`<button class="btn ghost" data-action="m-save">Lưu tạm</button>` : ''}
      ${!last ? h`<button class="btn ${M.step === 3 ? 'ghost' : 'primary'}" data-action="m-next">${STEPS[M.step + 1]} →</button>` : ''}
      ${last ? h`<button class="btn primary lg" data-action="m-finish" ${checkItems().every(x => x.ok) && !M.finishing ? '' : 'disabled'}>${M.finishing ? 'Đang lưu…' : M.completed ? 'Lưu thay đổi' : 'SAVE & FINISH'}</button>` : ''}</div>`;
  }

  /* ------------------------------------------------------------ Part workspace: exam on top, GHI CHÚ NHANH (4 free-text columns) below.
   * Live rule: LISTEN → OBSERVE → NOTE → CONTINUE. No chips, no issue checklist, no selectors while the student is speaking. */

  function questionGroups(p, c) {
    const groups = []; let cur = { head: '', items: [] }; groups.push(cur);
    (c.questions || []).forEach((q, n) => {
      if (/^#\s/.test(q)) { cur = { head: q.replace(/^#\s+/, ''), items: [] }; groups.push(cur); }   // sheet lines starting with "# " are sub-topic headings
      else cur.items.push({ q: q, n: n });
    });
    return groups.filter(g => g.items.length || g.head);
  }
  function examPanel(p, c) {
    if (!c || (!c.topic && !c.examinerScript && !(c.questions && c.questions.length) && !c.cueCard)) {
      return h`<div class="no-content">Chưa có đề cho Tuần ${M.week} · ${p.label} trong sheet “Mock Tests”. Bạn vẫn có thể ghi feedback ở bên dưới.</div>`;
    }
    if (p.key === 'part2') {
      return h`<div class="exam p2">
        <div class="ex-col"><span class="ex-lbl">SCRIPT EXAMINER</span>${c.examinerScript ? h`<div class="script"><span class="lbl">Examiner đọc</span>${c.examinerScript}</div>` : h`<p class="none">—</p>`}</div>
        <div class="ex-col"><span class="ex-lbl">CUE CARD</span>${c.topic ? h`<div class="topic sm">${c.topic}</div>` : ''}
          <div class="cue"><div class="ct">${c.cueCard}</div><ul>${(c.bulletPoints || []).map(b => h`<li>${b}</li>`)}</ul></div></div>
        <div class="ex-col"><span class="ex-lbl">TIMER</span><div class="timer" id="timer"></div></div></div>`;
    }
    const groups = questionGroups(p, c);
    return h`<div class="exam qs">${c.topic ? h`<div class="topic sm">${c.topic}</div>` : ''}
      ${c.examinerScript ? h`<div class="script"><span class="lbl">Examiner đọc</span>${c.examinerScript}</div>` : ''}
      <div class="qgroups">${groups.map(g => { let num = 0; return h`<div class="qgroup">${g.head ? h`<div class="qhead">${g.head}</div>` : ''}
        <ol class="qlist">${g.items.map(it => { num++; return h`<li><button type="button" class="q" data-action="m-asked" data-k="${p.key}.${it.n}" aria-pressed="${!!M.asked[p.key + '.' + it.n]}"><span class="qn">${num}.</span><span class="qt">${it.q}</span></button></li>`; })}</ol></div>`; })}</div>
      <p class="tip">Bấm vào câu hỏi để đánh dấu đã hỏi (chỉ để bạn theo dõi, không lưu).</p></div>`;
  }
  const NOTE_HINT = { fluency: 'hesitation ở đầu câu', vocabulary: 'lặp good / interesting', grammar: 'sai past tense', pronunciation: 'âm cuối chưa rõ' };
  function partStep(i) {
    const p = LU.PARTS[i], c = M.content && M.content[p.key], fb = M.data.parts[p.key];
    return h`<section class="ws" aria-label="${p.label}"><div class="ws-top"><div class="ws-h"><h2>${p.label}</h2></div>${examPanel(p, c)}</div>
      <div class="ws-bottom"><div class="ws-h"><h2>Ghi chú nhanh</h2></div>
        <div class="crit-grid">${LU.CRITERIA.map(cr => h`<div class="crit-col note-col"><label class="crit-h" for="fb-${p.key}-${cr.id}-note"><b>${cr.en}</b></label>
          <textarea id="fb-${p.key}-${cr.id}-note" data-input="m-fb" data-path="${p.key}.${cr.id}.note" rows="6" placeholder="vd: ${NOTE_HINT[cr.id]}">${fb[cr.id].note}</textarea></div>`)}</div></div></section>`;
  }
  const syncChips = (box, c, k, val) => {
    const list = (LU.FB_SAMPLES[c] || {})[k] || [], have = lines(val);
    box.querySelectorAll('.smp').forEach(b => b.setAttribute('aria-pressed', String(have.indexOf(list[Number(b.dataset.n)]) !== -1)));
  };
  LU.inputs['m-fb'] = el => {                                    // live quick note: part.criterion.note
    const seg = el.dataset.path.split('.');
    if (seg.length === 3) M.data.parts[seg[0]][seg[1]][seg[2]] = el.value; else M.data.parts[seg[0]][seg[1]] = el.value;
    touch();
  };
  LU.inputs['m-mkfb'] = el => {                                  // week-level strengths / improvements: criterion.kind
    const seg = el.dataset.path.split('.');
    M.data.marking[seg[0]][seg[1]] = el.value;
    const box = el.closest('.fbbox'); if (box) syncChips(box, seg[0], seg[1], el.value);
    touch();
  };
  LU.actions['m-sample'] = el => {
    const seg = el.dataset.path.split('.'), list = (LU.FB_SAMPLES[seg[0]] || {})[seg[1]] || [], t = list[Number(el.dataset.n)]; if (t === undefined) return;
    const cur = M.data.marking[seg[0]][seg[1]], ls = String(cur || '').split('\n');
    const at = ls.findIndex(x => x.trim() === t); let next;
    if (at !== -1) { ls.splice(at, 1); next = ls.join('\n').replace(/^\n+|\n+$/g, ''); }
    else next = (String(cur || '').replace(/\s+$/, '') ? String(cur).replace(/\s+$/, '') + '\n' : '') + t;
    M.data.marking[seg[0]][seg[1]] = next; touch();
    const ta = document.getElementById('mk-' + el.dataset.path.replace(/\./g, '-')); if (ta) ta.value = next;
    el.setAttribute('aria-pressed', String(at === -1));
  };
  LU.actions['m-itag'] = el => {
    const arr = M.data.marking[el.dataset.c].issues, id = el.dataset.i, i = arr.indexOf(id);
    if (i === -1) arr.push(id); else arr.splice(i, 1);
    el.setAttribute('aria-pressed', String(i === -1)); touch();
  };
  LU.actions['m-asked'] = el => { const k = el.dataset.k; M.asked[k] = !M.asked[k]; el.setAttribute('aria-pressed', String(!!M.asked[k])); };
  LU.actions['m-copyprev'] = async () => {
    const any = LU.CRITERIA.some(c => M.data.marking[c.id].issues.length);
    if (any && !(await LU.confirm({ title: 'Thay các issue đã chọn?', body: 'Các issue đang chọn sẽ được thay bằng của Tuần ' + M.previous.week + '. Band không bị đổi.', ok: 'Thay', cancel: 'Giữ nguyên' }))) return;
    LU.CRITERIA.forEach(c => { M.data.marking[c.id].issues = ((M.previous.marking[c.id] || {}).issues || []).slice(); });
    touch(); rerender(); LU.toast('Đã chép issues Tuần ' + M.previous.week + ' (chưa lưu — hãy chỉnh lại cho đúng tuần này).');
  };

  /* ------------------------------------------------------------ MARKING & FINAL DECISION (one place: bands → overall → notes → eligibility → save) */
  /** What the teacher jotted down live for this criterion (read-only here, so marking can refer back to it). */
  function critRecap(c) {
    const items = LU.PARTS.map(p => ({ p: p, t: M.data.parts[p.key][c.id].note.trim() })).filter(x => x.t);
    if (!items.length) return h`<p class="rc none">Chưa có ghi chú trong mock</p>`;
    return h`<ul class="recap">${items.map(x => h`<li class="rc"><b>${x.p.label}</b> ${x.t.replace(/\n+/g, '; ')}</li>`)}</ul>`;
  }
  function mkCell(c) {
    const m = M.data.marking[c.id];
    return h`<div class="mk-cell"><div class="mk-top"><div class="mk-name"><b>${c.en}</b></div>
        <div class="band-pick"><button type="button" class="band-btn ${m.band === null ? 'empty' : ''}" data-action="m-bandmenu" data-c="${c.id}" aria-haspopup="listbox" aria-expanded="false" aria-label="Band ${c.en}"><span class="bv" data-now="${c.id}">${LU.fmtCrit(m.band)}</span><span class="caret" aria-hidden="true">▾</span></button>
          <div class="band-menu" role="listbox" aria-label="Chọn band ${c.en}" hidden>${LU.BANDS.map(b => h`<button type="button" role="option" class="band" data-action="m-band" data-c="${c.id}" data-b="${b}" aria-pressed="${m.band === b}">${b}</button>`)}
            <button type="button" class="band-clear" data-action="m-band" data-c="${c.id}" data-b="">Bỏ chọn</button></div></div></div>
      ${critRecap(c)}</div>`;
  }
  /** One criterion column of the post-mock feedback: strengths chips+text · improvements chips+text · diagnostic issues. */
  function fbCol(cr) {
    const sm = (LU.FB_SAMPLES && LU.FB_SAMPLES[cr.id]) || {}, m = M.data.marking[cr.id];
    return h`<div class="crit-col" aria-label="${cr.en}"><div class="crit-h"><b>${cr.en}</b></div>
      ${LU.KINDS.map(k => {
        const key = cr.id + '.' + k.key, id = 'mk-' + key.replace(/\./g, '-'), list = sm[k.key] || [], val = m[k.key], have = lines(val);
        return h`<div class="fbbox ${k.key === 'positive' ? 'positive' : 'negative'}"><label for="${id}">${k.label}</label>
          <div class="samples" role="group" aria-label="${k.label} — gợi ý nhanh">${list.map((t, n) => h`<button type="button" class="smp" data-action="m-sample" data-path="${key}" data-n="${n}" aria-pressed="${have.indexOf(t) !== -1}">${t}</button>`)}</div>
          <textarea id="${id}" data-input="m-mkfb" data-path="${key}" rows="2" placeholder="Gõ thêm…">${val}</textarea></div>`;
      })}
      <div class="issues-box"><span class="lbl">Diagnostic issues</span><div class="issue-tags" role="group" aria-label="Issues ${cr.en}">${cr.issues.map(i => h`<button type="button" class="itag" data-action="m-itag" data-c="${cr.id}" data-i="${i.id}" aria-pressed="${m.issues.indexOf(i.id) !== -1}">${i.label}</button>`)}</div></div></div>`;
  }
  function finishRow() {
    const items = checkItems(), okAll = items.every(x => x.ok), miss = items.filter(x => !x.ok), np = M.data.recommendedPractice.length;
    return h`<div class="fin-info">${okAll ? h`<span class="ok-line">✓ Sẵn sàng lưu</span>` : h`<ul class="checklist">${miss.map(x => h`<li class="miss"><span class="mk" aria-hidden="true">!</span><span>${x.text}</span></li>`)}</ul>`}
          <span class="hint">Recommended Practice: <b>${np}</b> module <button type="button" class="linkbtn" data-action="m-step" data-i="4">${np ? 'Xem / sửa' : 'Chọn module →'}</button></span></div>
        ${M.finishErr ? h`<div class="notice bad" role="alert">${M.finishErr}</div>` : ''}
        <button class="btn primary lg" data-action="m-finish" ${okAll && !M.finishing ? '' : 'disabled'}>${M.finishing ? 'Đang lưu…' : M.completed ? 'LƯU THAY ĐỔI' : 'SAVE & FINISH'}</button>`;
  }
  function refreshFinish() { const el = document.getElementById('finish-row'); if (el) el.innerHTML = finishRow().s; }
  function finalStep() {
    const d = M.data;
    const label = d.eligibility === 'not_eligible' ? 'LÝ DO (BẮT BUỘC)' : d.eligibility === 'eligible' ? 'ELIGIBILITY NOTE (KHÔNG BẮT BUỘC)' : 'ELIGIBILITY NOTE';
    const legacy = LU.PARTS.filter(p => d.parts[p.key].notes.trim());
    const prevBtn = M.previous ? h`<button type="button" class="btn ghost sm" data-action="m-copyprev">Dùng issues Tuần ${M.previous.week} làm điểm xuất phát</button>` : '';
    return h`<section class="final" aria-label="Marking và quyết định">
      <div class="blk"><div class="ws-h"><h2>Marking</h2><span class="hint">Band từng tiêu chí là số nguyên 1–9 · Overall tự tính</span></div>
        <div class="mk-grid">${LU.CRITERIA.map(c => mkCell(c))}<div class="overall" id="overall" aria-live="polite"></div></div></div>
      <div class="blk"><div class="ws-h"><h2>Feedback</h2>${prevBtn}</div>
        <div class="crit-grid">${LU.CRITERIA.map(cr => fbCol(cr))}</div>
        ${legacy.length ? h`<div class="recap-notes"><h3>Ghi chú chung từ bản cũ</h3><ul>${legacy.map(p => h`<li><b>${p.label}</b><span class="rn">${d.parts[p.key].notes.trim()}</span></li>`)}</ul></div>` : ''}</div>
      <div class="blk"><div class="final-grid">
        <div class="field"><label for="t-note">NHẬN XÉT CUỐI <small>(học viên sẽ đọc)</small></label><textarea id="t-note" data-input="m-tnote" rows="3" maxlength="4000" placeholder="Nhận xét tổng kết cho học viên…">${d.teacherNote}</textarea></div>
        <div class="elig-box"><div class="lbl">ELIGIBILITY</div>
          <div class="elig" role="group" aria-label="Điều kiện">
            <button type="button" class="elig-btn yes" data-action="m-elig" data-v="eligible" aria-pressed="${d.eligibility === 'eligible'}">${d.eligibility === 'eligible' ? '✓ ' : ''}${LU.MSG.eligYes}</button>
            <button type="button" class="elig-btn no" data-action="m-elig" data-v="not_eligible" aria-pressed="${d.eligibility === 'not_eligible'}">${d.eligibility === 'not_eligible' ? '✕ ' : ''}${LU.MSG.eligNo}</button></div>
          <div class="field"><label for="elig-note">${label}</label><textarea id="elig-note" data-input="m-elignote" rows="2" maxlength="1000" placeholder="${d.eligibility === 'not_eligible' ? 'Vì sao chưa đủ điều kiện? Học viên sẽ đọc dòng này.' : 'Ghi chú thêm về việc sang tuần tiếp theo…'}">${d.eligibilityNote}</textarea></div></div></div></div>
      <div class="finish-row" id="finish-row">${finishRow()}</div></section>`;
  }
  LU.inputs['m-tnote'] = el => { M.data.teacherNote = el.value; touch(); };
  LU.actions['m-elig'] = el => { M.data.eligibility = el.dataset.v; touch(); rerender(); };
  LU.inputs['m-elignote'] = el => { M.data.eligibilityNote = el.value; touch(); refreshFinish(); };

  function refreshMarking() {
    refreshFinish();
    LU.CRITERIA.forEach(c => {
      const b = M.data.marking[c.id].band;
      document.querySelectorAll('.band[data-c="' + c.id + '"]').forEach(btn => btn.setAttribute('aria-pressed', String(Number(btn.dataset.b) === b)));
      const bv = document.querySelector('[data-now="' + c.id + '"]'); if (bv) { bv.textContent = LU.fmtCrit(b); const bb = bv.closest('.band-btn'); if (bb) bb.classList.toggle('empty', b === null); }
    });
    const box = document.getElementById('overall'); if (!box) return;
    const bands = bandsOf(), ov = LU.calcOverall(bands);
    box.innerHTML = ov === null
      ? h`<span class="lbl">OVERALL</span><div class="big na">—</div><div class="why">Chỉ tính khi đã chấm đủ 4 tiêu chí (${bands.filter(b => b !== null).length}/4).</div>`.s
      : h`<span class="lbl">OVERALL</span><div class="big">${LU.fmtBand(ov)}</div><div class="why">${LU.overallWhy(bands)}</div>`.s;
  }
  const closeMenus = () => document.querySelectorAll('.band-menu:not([hidden])').forEach(m => { m.hidden = true; const b = m.parentNode.querySelector('.band-btn'); if (b) b.setAttribute('aria-expanded', 'false'); });
  LU.actions['m-bandmenu'] = el => {
    const menu = el.parentNode.querySelector('.band-menu'), open = menu.hidden;
    closeMenus();
    if (open) { menu.hidden = false; el.setAttribute('aria-expanded', 'true'); const cur = menu.querySelector('.band[aria-pressed="true"]') || menu.querySelector('.band'); if (cur) cur.focus(); }
  };
  document.addEventListener('click', e => { if (!e.target.closest('.band-pick')) closeMenus(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const o = document.querySelector('.band-menu:not([hidden])'); if (o) { const b = o.parentNode.querySelector('.band-btn'); closeMenus(); if (b) b.focus(); } } });
  LU.actions['m-band'] = el => {
    const mk = M.data.marking[el.dataset.c], raw = el.dataset.b, pick = el.closest('.band-pick');
    mk.band = raw === '' ? null : Number(raw);
    touch(); refreshMarking(); closeMenus(); const b = pick && pick.querySelector('.band-btn'); if (b) b.focus();
  };

  /* ------------------------------------------------------------ Recommended Practice (teacher picks from the Master Library; nothing is auto-assigned) */
  const MAXPW = 20;
  const lockedId = id => { const a = M.assigned[id]; return !!a && a.status !== 'not_started'; };
  function selBlock() {
    const sel = M.data.recommendedPractice, P = LU.practice;
    if (!sel.length) return h`<p class="none">Chưa chọn module nào. Bài luyện tập là tùy chọn — bạn có thể bỏ trống.</p>`;
    const done = sel.filter(id => (M.assigned[id] || {}).status === 'completed').length;
    return h`<ul class="pcards" aria-label="Module đã chọn">${sel.map(id => {
      const m = P.get(id), a = M.assigned[id], st = a ? a.status : null, lock = lockedId(id);
      const drop = lock ? h`<span class="hint pc-lock">Học viên đã bắt đầu — không thể gỡ</span>` : h`<button type="button" class="btn danger sm" data-action="m-prdrop" data-id="${id}">Gỡ</button>`;
      return m ? P.renderCard(m, { status: st || undefined, tag: st ? '' : 'Chưa lưu', extra: drop })
               : h`<li class="pcard"><span class="pc-main"><b class="pc-title mono">${id}</b><span class="pc-meta">Không còn trong thư viện</span></span>${drop}</li>`;
    })}</ul><p class="hint">${sel.length} / ${MAXPW} module · học viên đã hoàn thành ${done} / ${sel.length}</p>`;
  }
  function resultsBlock() {
    const P = LU.practice, list = P.filter(M.pr), sel = M.data.recommendedPractice;
    if (!P.count()) return h`<p class="none">Thư viện chưa có module nào. Thêm module vào <span class="mono">data/practice-modules.js</span>.</p>`;
    if (!list.length) return h`<p class="none">Không có module nào khớp bộ lọc.</p>`;
    return h`<ul class="pcards" aria-label="Thư viện">${list.map(m => P.renderCard(m, { check: { action: 'm-prcheck', checked: sel.indexOf(m.id) !== -1 } }))}</ul>`;
  }
  function pillsBlock() {
    const P = LU.practice, gv = P.groupsView(), g = gv.find(x => x.id === M.pr.group);
    const pill = (act, id, label, on, n) => h`<button type="button" class="pill" data-action="${act}" data-id="${id}" aria-pressed="${on}">${label}${n !== undefined ? h` <small>${n}</small>` : ''}</button>`;
    return h`<div class="pills" role="group" aria-label="Nhóm">${pill('m-prgroup', '', 'Tất cả', !M.pr.group, P.count())}${gv.map(x => pill('m-prgroup', x.id, x.label, M.pr.group === x.id, x.count))}</div>
      ${g ? h`<div class="pills sub" role="group" aria-label="Nhóm con">${pill('m-prsub', '', 'Tất cả', !M.pr.sub)}${g.subs.map(x => pill('m-prsub', x.id, x.label, M.pr.sub === x.id, x.count))}</div>` : ''}`;
  }
  function suggestBlock() {
    const P = LU.practice, sel = M.data.recommendedPractice, sug = P.suggestFor(M.data.marking);
    if (!sug.length) return h``;
    return h`<div class="sug"><h3>Gợi ý từ chẩn đoán</h3><p class="hint">Chỉ là gợi ý để bạn tham khảo — hệ thống không tự giao bài.</p>
      ${sug.map(x => h`<div class="sug-row"><div class="sug-h"><b>${x.label}</b></div>
        ${x.hints.length ? h`<p class="hint">Thường hợp với: ${x.hints.join(' · ')}</p>` : ''}
        ${x.modules.length ? h`<ul class="sug-mods">${x.modules.map(m => h`<li><span>${m.title}</span>${sel.indexOf(m.id) !== -1 ? h`<span class="tag">Đã chọn</span>` : h`<button type="button" class="btn dark sm" data-action="m-pradd" data-id="${m.id}">+ Thêm</button>`}</li>`)}</ul>` : ''}</div>`)}</div>`;
  }
  function practiceStep() {
    const list = M.data.practice, legacy = list.some(t => t.trim());
    return h`<div class="card"><h2>Recommended Practice</h2>
      <p class="hint">Chọn các module từ Master Practice Library cho học viên luyện trước mock sau. Hệ thống chỉ lưu <b>mã module</b>, không sao chép nội dung. Bỏ trống cũng được.</p>
      <div id="pr-sug">${suggestBlock()}</div>
      <h3 class="sp">Đã chọn cho Tuần ${M.week}</h3>
      <div id="pr-sel">${selBlock()}</div>
      <div class="row sp"><button class="btn primary" data-action="m-prsave">Save Recommended Practice</button></div>
      <h3 class="sp">Thư viện (${LU.practice.count()} module)</h3>
      <div class="field"><label class="sr-only" for="pr-q">Tìm module</label><input id="pr-q" type="search" data-input="m-prq" placeholder="Tìm theo tên, chủ đề, tag…" value="${M.pr.q}" autocomplete="off"></div>
      <div id="pr-pills">${pillsBlock()}</div>
      <div id="pr-res">${resultsBlock()}</div>
      <details class="legacy sp" ${legacy ? 'open' : ''}><summary>Ghi chú luyện tập tự gõ (tùy chọn)</summary>
        <p class="hint">Dành cho hướng dẫn riêng ngoài thư viện. Giáo viên tự gõ, hệ thống không tự tạo.</p>
        <div class="practice sp">${list.map((t, i) => h`<div class="pr-row"><span class="n">${i + 1}.</span>
          <div class="field"><label class="sr-only" for="pr-${i}">Ghi chú ${i + 1}</label><textarea id="pr-${i}" data-input="m-pr" data-i="${i}" rows="2" maxlength="500" placeholder="Ví dụ: Ghi âm 3 câu trả lời Part 2 và nghe lại…">${t}</textarea></div>
          <button type="button" class="btn danger sm" data-action="m-prdel" data-i="${i}" aria-label="Xóa ghi chú ${i + 1}">Xóa</button></div>`)}</div>
        <div class="row sp"><button class="btn dark" data-action="m-practiceadd" ${list.length >= 10 ? 'disabled' : ''}>+ Thêm ghi chú</button></div></details></div>`;
  }
  const setHtml = (id, safe) => { const el = document.getElementById(id); if (el) el.innerHTML = safe.s; };
  function refreshPrSel() { setHtml('pr-sel', selBlock()); setHtml('pr-sug', suggestBlock()); }
  function refreshPrResults() { setHtml('pr-res', resultsBlock()); }
  function setSelected(id, on) {
    const sel = M.data.recommendedPractice, i = sel.indexOf(id);
    if (on && i === -1) {
      if (sel.length >= MAXPW) { LU.toast('Tối đa ' + MAXPW + ' module cho mỗi tuần.', true); refreshPrResults(); return; }
      sel.push(id);
    } else if (!on && i !== -1) {
      if (lockedId(id)) { LU.toast('Học viên đã bắt đầu module này nên không thể gỡ.', true); refreshPrResults(); return; }
      sel.splice(i, 1);
    } else return;
    touch(); refreshPrSel(); refreshPrResults();
  }
  LU.changes['m-prcheck'] = el => setSelected(el.dataset.id, el.checked);
  LU.actions['m-pradd'] = el => setSelected(el.dataset.id, true);
  LU.actions['m-prdrop'] = el => setSelected(el.dataset.id, false);
  LU.inputs['m-prq'] = el => { M.pr.q = el.value; refreshPrResults(); };
  LU.actions['m-prgroup'] = el => { M.pr.group = el.dataset.id; M.pr.sub = ''; setHtml('pr-pills', pillsBlock()); refreshPrResults(); };
  LU.actions['m-prsub'] = el => { M.pr.sub = el.dataset.id; setHtml('pr-pills', pillsBlock()); refreshPrResults(); };
  LU.actions['m-prsave'] = async () => {
    const m = M; if (!m) return;
    if (!m.completed) { await sync('manual', 'Đã lưu Recommended Practice ✓'); return; }
    if (checkItems().some(x => !x.ok)) { LU.toast('Hãy hoàn thành các mục còn thiếu ở bước Chấm điểm & Quyết định trước khi lưu.', true); return; }
    m.sync = { state: 'saving', at: m.sync.at }; updateSyncBar();
    try {
      const res = await LU.api.call('saveMock', { studentId: m.sid, week: m.week, data: payload() });
      m.base = res.session.updatedAt; m.weeks = res.weeks; m.dirty = false; LU.drafts.remove(m.sid, m.week);
      const adj = adoptAssignments(m, res.session, true);
      m.sync = { state: 'ok', at: new Date() };
      if (M === m) { LU.toast(adj ? 'Đã lưu — module học viên đã bắt đầu được giữ lại.' : 'Đã lưu Recommended Practice ✓', adj); updateSyncBar(); refreshPrSel(); refreshPrResults(); }
    } catch (e) { m.sync = { state: 'bad', msg: LU.errText(e, 'save'), at: m.sync.at }; if (M === m) { updateSyncBar(); LU.toast(LU.errText(e, 'save'), true); } }
  };
  LU.inputs['m-pr'] = el => { M.data.practice[Number(el.dataset.i)] = el.value; touch(); };
  LU.actions['m-practiceadd'] = () => { M.data.practice.push(''); touch(); rerender(); const t = document.getElementById('pr-' + (M.data.practice.length - 1)); if (t) t.focus(); };
  LU.actions['m-prdel'] = el => { const i = Number(el.dataset.i); M.data.practice.splice(i, 1); if (!M.data.practice.length) M.data.practice.push(''); touch(); rerender(); };

  LU.actions['m-finish'] = async () => {
    const m = M; if (m.finishing) return;
    if (checkItems().some(x => !x.ok)) { m.step = 3; rerender(); return; }
    m.finishing = true; m.finishErr = ''; rerender();
    try {
      const res = await LU.api.call(m.completed ? 'saveMock' : 'completeMock', { studentId: m.sid, week: m.week, data: payload() });
      m.finishing = false; m.weeks = res.weeks;
      LU.drafts.remove(m.sid, m.week); m.dirty = false; clearTimeout(m.autoT);
      m.result = { overall: res.session.overall, eligibility: res.session.eligibility, nextOpen: res.nextWeekUnlocked, nextNew: res.nextWeekNewlyUnlocked, edited: m.completed };
      if (M === m) renderResult();
    } catch (e) {
      m.finishing = false; m.finishErr = LU.errText(e, 'save');
      if (M === m) { m.sync = { state: 'bad', msg: m.finishErr }; renderMock(); }
    }
  };

  function nextStudentId() {                                // next active student who still needs this week
    const list = LU.T.dash ? LU.T.dash.students.filter(s => s.active) : [];
    const cand = list.filter(s => s.id !== M.sid && s.weeks[M.week - 1].state !== 'completed' && s.weeks[M.week - 1].state !== 'locked');
    const after = cand.find(s => s.id > M.sid);
    return (after || cand[0] || {}).id || null;
  }
  function renderResult() {
    const r = M.result, ok = r.eligibility === 'eligible', nx = nextStudentId(), nxt = M.week < LU.CFG.TOTAL_WEEKS;
    LU.render(LU.teacherShell('home', h`<div class="result" role="status"><p class="eyebrow">${r.edited ? 'Đã lưu thay đổi' : 'Đã lưu lên hệ thống'} ✓</p>
      <h1>Tuần ${M.week} · ${M.name || M.sid}</h1><div class="big">${LU.fmtBand(r.overall)}</div><p class="hint">Overall Band</p>
      <p class="sp"><span class="badge ${ok ? 'done' : 'not_eligible'}">${ok ? '✓' : '✕'} ${ok ? LU.MSG.eligYes : LU.MSG.eligNo}</span></p>
      ${nxt ? h`<p class="sp"><b>${r.nextOpen ? 'Tuần ' + (M.week + 1) + (r.nextNew ? ' đã được mở khóa.' : ' đang mở.') : 'Tuần ' + (M.week + 1) + ' vẫn khóa.'}</b></p>` : ''}
      <div class="row">${nx ? h`<a class="btn primary" href="#/t/mock/${nx}/${M.week}">Học viên tiếp theo →</a>` : ''}<a class="btn ghost" href="#/t">Về danh sách</a></div></div>`));
  }

  /* ------------------------------------------------------------ navigation + buttons */
  const goStep = i => { M.step = Math.max(0, Math.min(STEPS.length - 1, i)); if (M.dirty || M.step > 0) persist(); renderMock(); window.scrollTo(0, 0); if (M.dirty && !M.completed) sync('step'); };
  LU.actions['m-step'] = el => goStep(Number(el.dataset.i));
  LU.actions['m-next'] = () => goStep(M.step + 1);
  LU.actions['m-prev'] = () => goStep(M.step - 1);
  LU.actions['m-save'] = () => { if (M.completed) { goStep(3); return; } sync('manual'); };
  LU.actions['m-retry'] = () => { if (M.completed) { goStep(3); } else sync('manual'); };
})();
