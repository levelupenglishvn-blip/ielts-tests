/* teacher.js — teacher shell, week + student selector, overview matrix, student management. */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  LU.routes = LU.routes || {};
  const T = LU.T = { dash: null, error: null, week: Math.min(Math.max(parseInt(LU.sess.get('lu.t.week'), 10) || 1, 1), LU.CFG.TOTAL_WEEKS), sel: null, adding: false };

  LU.teacherShell = function (active, body) {
    const tab = (id, href, label) => h`<a class="tab" href="${href}" aria-current="${active === id ? 'page' : 'false'}">${label}</a>`;
    return h`<header class="topbar"><div class="topbar-in">
      <a class="brand" href="#/t">${LU.wordmark()}<span class="brand-sub">SPEAKING MOCK TRACKER</span></a>
      <nav class="tabs" aria-label="Điều hướng">${tab('home', '#/t', 'Mock Test')}${tab('overview', '#/t/overview', 'Tổng quan')}${tab('students', '#/t/students', 'Học viên')}</nav>
      <button class="btn ghost sm" data-action="logout">Đăng xuất</button></div></header>
      <main class="wrap">${body}</main>`;
  };

  T.load = async function () {
    try { T.dash = await LU.api.call('getTeacherDashboard'); T.error = null; } catch (e) { T.error = e; }
  };
  const activeStudents = () => (T.dash ? T.dash.students.filter(s => s.active) : []);
  const stuById = id => T.dash && T.dash.students.find(s => s.id === id);
  const wkOf = (s, w) => s.weeks[w - 1];
  /** Practice summary the teacher sees for one student + week: { total, started, completed } or null when nothing is assigned. */
  const prOf = (s, w) => { const x = s.practice && s.practice[w]; return x && x.total ? x : null; };
  const prChip = x => x ? h`<span class="tag pr-chip ${x.completed === x.total ? 'all' : ''}" title="Recommended Practice: ${x.completed} hoàn thành · ${x.started} đang làm · ${x.total} đã giao">Practice ${x.completed}/${x.total}${x.started ? ' · ' + x.started + ' đang làm' : ''}</span>` : '';
  T.setWeek = function (w) { T.week = w; LU.sess.set('lu.t.week', String(w)); };
  function defaultSel() {
    const list = activeStudents(), w = T.week;
    const pick = list.find(s => wkOf(s, w).state === 'in_progress') || list.find(s => wkOf(s, w).state === 'not_started');
    return pick ? pick.id : (list[0] ? list[0].id : null);
  }
  function errorView(active) {
    return LU.teacherShell(active, h`<div class="notice bad">${LU.errText(T.error, 'load')}<div class="row"><button class="btn dark sm" data-action="t-reload">Thử lại</button></div></div>`);
  }
  function keepScroll(fn) { const y = window.scrollY; fn(); window.scrollTo(0, y); }
  LU.keepScroll = keepScroll;

  /* ---------------------------------------------------------------- Mock Test home */
  async function loadThen(active, id, view) {
    LU.render(LU.teacherShell(active, h`<div class="loading" role="status">Đang tải dữ liệu…</div>`));
    await T.load();
    if (id !== LU.navId) return;
    view();
  }
  LU.routes.home = function (id) {
    loadThen('home', id, () => { if (T.dash && (!T.sel || !stuById(T.sel))) T.sel = defaultSel(); renderHome(); });
  };

  function renderHome() {
    if (T.error) { LU.render(errorView('home')); return; }
    const list = activeStudents(), w = T.week, N = LU.CFG.TOTAL_WEEKS;
    const drafts = {}; LU.drafts.list().forEach(d => { if (d.dirty) drafts[d.studentId + '|' + d.week] = true; });
    const chips = []; for (let n = 1; n <= N; n++) {
      const done = list.filter(s => wkOf(s, n).state === 'completed').length;
      chips.push(h`<button class="wk-chip" data-action="t-week" data-week="${n}" aria-pressed="${n === w}"><b>${n}</b><small>${done}/${list.length}</small></button>`);
    }
    const rows = list.map(s => {
      const st = wkOf(s, w), info = LU.stateInfo(st);
      return h`<li><button class="srow" data-action="t-pick" data-sid="${s.id}" aria-pressed="${T.sel === s.id}">
        <span class="nm"><span>${s.name || '(chưa có tên)'}</span><small>${s.id}</small></span>
        <span class="rt">${drafts[s.id + '|' + w] ? h`<span class="tag">Nháp trên máy</span>` : ''}${prChip(prOf(s, w))}${st.state === 'completed' && st.overall != null ? h`<span class="ov">${LU.fmtBand(st.overall)}</span>` : ''}<span class="badge ${info.key}">${info.glyph} ${info.label}</span></span>
      </button></li>`;
    });
    const sel = T.sel && stuById(T.sel);
    LU.render(LU.teacherShell('home', h`
      <p class="eyebrow">Giáo viên</p><h1>Mock Test Speaking</h1>
      <div class="sec-title"><h2>1. Chọn tuần</h2><span class="hint">Số trên mỗi ô = học viên đã hoàn thành / tổng</span></div>
      <div class="wk-grid" role="group" aria-label="Chọn tuần">${chips}</div>
      <div class="sec-title"><h2>2. Chọn học viên — Tuần ${w}</h2><span class="hint">${list.length} học viên đang hoạt động</span></div>
      ${list.length ? h`<ul class="slist">${rows}</ul>` : h`<div class="empty card">Chưa có học viên. Thêm học viên ở tab <a href="#/t/students">Học viên</a> (hoặc trực tiếp ở sheet “Students”).</div>`}
      ${pickBar(sel, w)}`));
  }

  function pickBar(s, w) {
    if (!s) return '';
    const st = wkOf(s, w), info = LU.stateInfo(st);
    let btn, why = '';
    if (st.state === 'locked') {
      const firstLocked = s.weeks.find(x => x.state === 'locked');
      why = LU.lockText(st.lockReason);
      btn = firstLocked && firstLocked.week === w
        ? h`<button class="btn warn lg" data-action="t-unlock" data-sid="${s.id}" data-week="${w}">Mở khóa Tuần ${w} (override)</button>`
        : h`<button class="btn lg primary" disabled>Chưa mở khóa</button>`;
      if (!(firstLocked && firstLocked.week === w)) why += ' · cần mở các tuần trước';
    } else if (st.state === 'not_started') btn = h`<button class="btn primary lg" data-action="t-start" data-sid="${s.id}" data-week="${w}">Bắt đầu Mock Test</button>`;
    else if (st.state === 'in_progress') btn = h`<button class="btn primary lg" data-action="t-start" data-sid="${s.id}" data-week="${w}">Tiếp tục Mock Test</button>`;
    else btn = h`<button class="btn dark lg" data-action="t-start" data-sid="${s.id}" data-week="${w}">Xem / sửa kết quả</button>`;
    return h`<div class="pick-bar"><div class="pick-in"><div class="who"><b>${s.name || s.id}</b> · Tuần ${w}<div class="why"><span class="badge ${info.key}">${info.glyph} ${info.label}</span> ${prChip(prOf(s, w))} ${why}</div></div>
      <a class="btn ghost" href="#/t/preview/${s.id}">Xem như học viên</a>${btn}</div></div>`;
  }

  LU.actions['t-reload'] = () => { LU.route(); };
  LU.actions['t-week'] = el => { T.setWeek(Number(el.dataset.week)); T.sel = defaultSel(); keepScroll(renderHome); };
  LU.actions['t-pick'] = el => { T.sel = el.dataset.sid; keepScroll(renderHome); };
  LU.actions['t-start'] = el => { LU.go('t/mock/' + el.dataset.sid + '/' + el.dataset.week); };
  LU.actions['t-unlock'] = async el => {
    const s = stuById(el.dataset.sid), w = Number(el.dataset.week);
    const ok = await LU.confirm({ title: 'Mở khóa Tuần ' + w + ' cho ' + (s ? s.name : '') + '?',
      body: 'Học viên chưa đủ điều kiện (hoặc chưa hoàn thành) ở tuần trước. Việc mở khóa thủ công này được ghi lại trong sheet.', ok: 'Mở khóa', cancel: 'Hủy', danger: true });
    if (!ok) return;
    try {
      await LU.api.call('unlockNextWeek', { studentId: s.id, week: w, confirmed: true });
      await T.load(); LU.toast('Đã mở khóa Tuần ' + w + '.'); renderHome();
    } catch (e) { LU.toast(LU.errText(e, 'save'), true); }
  };

  /* ---------------------------------------------------------------- Overview matrix */
  LU.routes.overview = function (id) { loadThen('overview', id, renderOverview); };
  function renderOverview() {
    if (T.error) { LU.render(errorView('overview')); return; }
    const rows = T.dash.students.map(s => {
      const cells = s.weeks.map(wk => {
        const info = LU.stateInfo(wk);
        const m = wk.state === 'completed' ? (wk.overall != null ? LU.fmtBand(wk.overall) : '✓') : info.glyph === '–' ? 'Khóa' : info.glyph;
        return h`<button class="ov-cell ${info.key}" data-action="t-cell" data-sid="${s.id}" data-week="${wk.week}" aria-label="${s.name} Tuần ${wk.week}: ${info.label}${wk.overall != null ? ', overall ' + LU.fmtBand(wk.overall) : ''}"><span class="w">T${wk.week}</span><span class="m">${m}</span></button>`;
      });
      return h`<div class="ov-row ${s.active ? '' : 'is-off'}"><div class="ov-name"><strong>${s.name || '(chưa có tên)'}</strong><span class="id mono">${s.id}${s.active ? '' : ' · đã tắt'}</span></div><div class="ov-cells">${cells}</div></div>`;
    });
    LU.render(LU.teacherShell('overview', h`<p class="eyebrow">Giáo viên</p><h1>Tổng quan 15 tuần</h1>
      <div class="legend"><span>Số = Overall Band (đã hoàn thành &amp; đủ điều kiện)</span><span>✕ = chưa đủ điều kiện</span><span>● = đang thực hiện</span><span>○ = chưa bắt đầu</span><span>Khóa = chưa mở</span></div>
      <div class="card">${rows.length ? rows : h`<div class="empty">Chưa có học viên.</div>`}</div>`));
  }
  LU.actions['t-cell'] = el => {
    const s = stuById(el.dataset.sid), w = Number(el.dataset.week);
    T.setWeek(w); T.sel = s.id;
    LU.go(wkOf(s, w).state === 'locked' ? 't' : 't/mock/' + s.id + '/' + w);
  };

  /* ---------------------------------------------------------------- Students management */
  LU.routes.students = function (id) { T.adding = false; loadThen('students', id, renderStudents); };
  function studentRow(s, isNew) {
    const sid = isNew ? 'new' : s.id;
    return h`<div class="mg-row ${s.active ? '' : 'is-off'}" data-row="${sid}">
      <div class="c-id mono">${isNew ? 'Mới' : s.id}</div>
      <div class="field"><label class="sr-only" for="n-${sid}">Tên</label><input type="text" id="n-${sid}" data-f="name" value="${s.name}" maxlength="40" placeholder="Tên học viên"></div>
      <div class="c-code"><label class="sr-only" for="c-${sid}">Mã truy cập</label><input type="text" id="c-${sid}" data-f="code" value="${s.accessCode}" spellcheck="false" autocapitalize="characters"><button type="button" class="btn ghost sm" data-action="g-code" data-sid="${sid}">Mã mới</button></div>
      <label class="c-on"><input type="checkbox" data-f="active" ${s.active ? 'checked' : ''}> Hoạt động</label>
      <div class="c-act"><button type="button" class="btn primary sm" data-action="g-save" data-sid="${sid}">Lưu</button></div>
      <div class="row-msg" role="status"></div></div>`;
  }
  function renderStudents() {
    if (T.error) { LU.render(errorView('students')); return; }
    const list = T.dash.students;
    LU.render(LU.teacherShell('students', h`<p class="eyebrow">Giáo viên</p><h1>Học viên</h1>
      <p class="hint sp">Mã truy cập là lớp bảo vệ cơ bản. Chỉ gửi mã riêng cho từng học viên. Tên có thể trùng — Student ID mới là định danh thật.</p>
      <div class="row sp"><button class="btn dark" data-action="g-add" ${T.adding ? 'disabled' : ''}>+ Thêm học viên</button></div>
      <div class="card sp"><div class="mg-head"><span>ID</span><span>Tên</span><span>Mã truy cập</span><span>Trạng thái</span><span></span></div>
        ${T.adding ? studentRow({ name: '', accessCode: LU.randomCode(), active: true }, true) : ''}
        ${list.length || T.adding ? list.map(s => studentRow(s, false)) : h`<div class="empty">Chưa có học viên.</div>`}</div>`));
  }
  const rowOf = sid => document.querySelector('.mg-row[data-row="' + sid + '"]');
  LU.actions['g-add'] = () => { T.adding = true; renderStudents(); const r = rowOf('new'); if (r) r.querySelector('[data-f=name]').focus(); };
  LU.actions['g-code'] = el => { const r = rowOf(el.dataset.sid); r.querySelector('[data-f=code]').value = LU.randomCode(); };
  LU.actions['g-save'] = async el => {
    const sid = el.dataset.sid, r = rowOf(sid), msg = r.querySelector('.row-msg');
    const body = { name: r.querySelector('[data-f=name]').value, accessCode: r.querySelector('[data-f=code]').value, active: r.querySelector('[data-f=active]').checked };
    if (sid !== 'new') body.id = sid;
    el.disabled = true; msg.className = 'row-msg'; msg.textContent = 'Đang lưu…';
    try {
      const res = await LU.api.call('saveStudent', body);
      T.adding = false; await T.load(); renderStudents();
      const r2 = rowOf(res.student.id); if (r2) { const m2 = r2.querySelector('.row-msg'); m2.className = 'row-msg ok'; m2.textContent = 'Đã lưu ✓'; }
    } catch (e) { el.disabled = false; msg.className = 'row-msg bad'; msg.textContent = LU.errText(e, 'save'); }
  };
})();
