/* app.js — login screens, hash router, global event delegation, boot. */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h;
  LU.navId = 0;

  /* ---------------------------------------------------------------- login */
  let loginMode = 'student', loginBusy = false;
  function renderLogin(msg) {
    const t = loginMode === 'teacher';
    LU.render(h`<main class="auth"><div class="auth-card">${LU.wordmark()}
      <div class="auth-title">IELTS Speaking<br>Mock Tracker</div>
      <div class="auth-tabs" role="group" aria-label="Loại tài khoản">
        <button type="button" data-action="login-mode" data-mode="student" aria-pressed="${!t}">Học viên</button>
        <button type="button" data-action="login-mode" data-mode="teacher" aria-pressed="${t}">Giáo viên</button></div>
      <form data-form="login" novalidate>
        ${t ? h`<div class="field"><label for="in-pass">Mật khẩu giáo viên</label><input id="in-pass" name="secret" type="password" autocomplete="current-password" required></div>`
            : h`<div class="field"><label for="in-code">Mã truy cập</label><input id="in-code" name="secret" class="code-input" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="LU-XXXX-XXXX" required></div>`}
        <div id="login-err" role="alert">${msg ? h`<div class="err">${msg}</div>` : ''}</div>
        ${LU.api.configured() ? '' : h`<div class="notice info" style="margin-top:0">Chưa cấu hình <b>API_URL</b> trong <span class="mono">js/config.js</span> — xem README.</div>`}
        <button class="btn primary lg" type="submit" id="login-btn">Đăng nhập</button></form>
      <p class="auth-foot">${t ? 'Chỉ dành cho giáo viên.' : 'Mã truy cập do thầy cô gửi riêng cho bạn.'}</p></div></main>`);
    const f = document.querySelector('[name=secret]'); if (f) f.focus();
  }
  LU.actions['login-mode'] = el => { loginMode = el.dataset.mode; renderLogin(); };
  LU.forms.login = async form => {
    if (loginBusy) return;
    const secret = form.elements.secret.value.trim(), err = document.getElementById('login-err'), btn = document.getElementById('login-btn');
    const show = m => { err.innerHTML = h`<div class="err">${m}</div>`.s; };
    if (!secret) { show(loginMode === 'teacher' ? 'Vui lòng nhập mật khẩu.' : 'Vui lòng nhập mã truy cập.'); return; }
    loginBusy = true; btn.disabled = true; btn.textContent = 'Đang đăng nhập…'; err.innerHTML = '';
    try {
      if (loginMode === 'teacher') {
        const r = await LU.api.call('teacherLogin', { passcode: secret }, { anonymous: true });
        LU.session.set({ role: 'teacher', token: r.token, expiresAt: r.expiresAt });
        LU.go('t');
      } else {
        const r = await LU.api.call('studentLogin', { code: secret }, { anonymous: true });
        LU.session.set({ role: 'student', token: r.token, expiresAt: r.expiresAt, name: r.name });
        LU.go('s');
      }
    } catch (e) {
      loginBusy = false;
      const b = document.getElementById('login-btn'); if (b) { b.disabled = false; b.textContent = 'Đăng nhập'; }
      show(e.code === 'NOT_FOUND' ? 'Không tìm thấy mã truy cập. Vui lòng kiểm tra lại.' : LU.errText(e, 'load'));
      return;
    }
    loginBusy = false;
  };

  /* ---------------------------------------------------------------- logout / session expiry */
  LU.actions.logout = async () => {
    const s = LU.session.get();
    if (s && s.role === 'teacher') {
      const dirty = LU.drafts.list().filter(d => d.dirty).length;
      if (dirty && !(await LU.confirm({ title: 'Còn ' + dirty + ' bản nháp chưa lưu lên hệ thống', body: 'Bản nháp vẫn nằm trên máy này và sẽ còn khi bạn đăng nhập lại. Vẫn đăng xuất?', ok: 'Đăng xuất', cancel: 'Ở lại', danger: true }))) return;
    }
    LU.session.clear(); LU.sess.keys().filter(k => k.indexOf('lu.s.ack.') === 0).forEach(k => LU.sess.remove(k));
    LU.T.dash = null; LU.go('login');
  };
  LU.onUnauthorized = () => { LU.session.clear(); LU.sess.set('lu.flash', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'); setTimeout(() => LU.go('login'), 0); };

  /* ---------------------------------------------------------------- router */
  LU.route = function () {
    if (LU.leave) { try { LU.leave(); } catch (e) { /* never block navigation */ } }
    const id = ++LU.navId;
    const seg = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const s = LU.session.get();
    window.scrollTo(0, 0);
    if (!s) { const flash = LU.sess.get('lu.flash'); LU.sess.remove('lu.flash'); renderLogin(flash); return; }
    if (s.role === 'student') { LU.routes.student(id, seg.slice(1)); return; }
    if (seg[0] === 'mock' || seg[1] === 'mock') { if (seg[2] && seg[3]) { LU.routes.mock(seg[2], seg[3], id); return; } }
    if (seg[1] === 'preview' && seg[2]) { LU.routes.preview(decodeURIComponent(seg[2]), id, seg.slice(3)); return; }
    if (seg[1] === 'overview') { LU.routes.overview(id); return; }
    if (seg[1] === 'students') { LU.routes.students(id); return; }
    LU.routes.home(id);
  };
  window.addEventListener('hashchange', LU.route);

  /* ---------------------------------------------------------------- event delegation */
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-action]'); if (!el) return;
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') return;
    const fn = LU.actions[el.dataset.action]; if (!fn) return;
    if (el.tagName === 'BUTTON') e.preventDefault();
    fn(el, e);
  });
  document.addEventListener('input', e => {
    const el = e.target.closest('[data-input]'); if (!el) return;
    const fn = LU.inputs[el.dataset.input]; if (fn) fn(el, e);
  });
  document.addEventListener('change', e => {
    const el = e.target.closest('[data-change]'); if (!el) return;
    const fn = LU.changes[el.dataset.change]; if (fn) fn(el, e);
  });
  document.addEventListener('submit', e => {
    const f = e.target.closest('[data-form]'); if (!f) return;
    e.preventDefault(); const fn = LU.forms[f.dataset.form]; if (fn) fn(f, e);
  });

  // If the logo file is missing, fall back to the text wordmark instead of a broken image icon.
  document.addEventListener('error', e => {
    const img = e.target; if (!img || img.tagName !== 'IMG' || img.dataset.fallback !== 'wm') return;
    const span = document.createElement('span'); span.className = 'wm'; span.setAttribute('aria-label', 'Level Up'); span.innerHTML = '<span>LEVEL</span><span class="up">UP</span>';
    img.replaceWith(span);
  }, true);

  /* ---------------------------------------------------------------- boot */
  function boot() {
    document.title = LU.CFG.APP_NAME;
    if (!location.hash) { const s = LU.session.get(); if (s) location.replace('#/' + (s.role === 'teacher' ? 't' : 's')); }
    LU.route();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
