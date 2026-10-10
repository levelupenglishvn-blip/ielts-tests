/* core.js — shared constants, safe templating, storage, dialogs, toast.
 * Everything hangs off the single global `LU` (classic scripts, no build step). */
(function () {
  'use strict';
  const LU = window.LU = {};
  LU.CFG = Object.assign({ API_URL: '', APP_NAME: 'Level Up IELTS Speaking Mock Tracker', LOGO_SRC: 'img/logo.svg', TOTAL_WEEKS: 15,
    REQUEST_TIMEOUT_MS: 25000, AUTOSYNC_IDLE_MS: 15000 }, window.LU_CONFIG || {});
  LU.actions = {}; LU.inputs = {}; LU.changes = {}; LU.forms = {};

  /* ---- fixed texts (exact wording requested) ---- */
  LU.MSG = {
    saveFail: 'Chưa thể lưu dữ liệu. Vui lòng kiểm tra kết nối.',
    loadFail: 'Chưa tải được dữ liệu. Vui lòng kiểm tra kết nối.',
    reminder: 'Nếu không tự cải thiện theo feedback thì đừng hẹn thầy mock test hay nhìn thấy sự tiến bộ.',
    reminderBtn: 'Tôi hiểu rồi — vào xem',
    eligYes: 'ĐỦ ĐIỀU KIỆN ĐỂ SANG TUẦN TIẾP THEO',
    eligNo: 'CHƯA ĐỦ ĐIỀU KIỆN'
  };

  /* ---- criteria: internal ids are stable, Vietnamese labels live only here ---- */
  LU.CRITERIA = [
    { id: 'fluency', title: 'ĐỘ TRÔI CHẢY & MẠCH LẠC', en: 'Fluency & Coherence', issues: [
      { id: 'hesitation', label: 'Ngập ngừng nhiều' }, { id: 'slow_speech', label: 'Nói chậm' }, { id: 'short_answers', label: 'Trả lời cụt' },
      { id: 'unclear_ideas', label: 'Ý chưa rõ' }, { id: 'disconnected_ideas', label: 'Ý rời rạc' }, { id: 'repetition', label: 'Lặp ý' } ] },
    { id: 'vocabulary', title: 'TỪ VỰNG', en: 'Lexical Resource', issues: [
      { id: 'word_retrieval', label: 'Khó gọi từ' }, { id: 'limited_range', label: 'Từ vựng hạn chế' }, { id: 'word_repetition', label: 'Lặp từ' },
      { id: 'wrong_word', label: 'Dùng sai từ' }, { id: 'paraphrasing', label: 'Khó diễn đạt lại' } ] },
    { id: 'grammar', title: 'NGỮ PHÁP', en: 'Grammatical Range & Accuracy', issues: [
      { id: 'basic_errors', label: 'Lỗi cơ bản' }, { id: 'tenses', label: 'Thì' }, { id: 'prepositions', label: 'Giới từ' },
      { id: 'verb_forms', label: 'Chia động từ' }, { id: 'sentence_structure', label: 'Cấu trúc câu' }, { id: 'word_forms', label: 'Dạng từ' } ] },
    { id: 'pronunciation', title: 'PHÁT ÂM', en: 'Pronunciation', issues: [
      { id: 'unclear_sounds', label: 'Âm chưa rõ' }, { id: 'final_sounds', label: 'Âm cuối' }, { id: 'word_stress', label: 'Trọng âm từ' },
      { id: 'sentence_stress', label: 'Trọng âm câu' }, { id: 'linking', label: 'Nối âm' }, { id: 'intonation', label: 'Ngữ điệu' } ] }
  ];
  LU.CRIT = {}; LU.CRITERIA.forEach(c => { LU.CRIT[c.id] = c; });
  LU.ISSUE_LABEL = {}; LU.CRITERIA.forEach(c => c.issues.forEach(i => { LU.ISSUE_LABEL[c.id + '.' + i.id] = i.label; }));
  LU.PARTS = [{ key: 'part1', label: 'Part 1' }, { key: 'part2', label: 'Part 2' }, { key: 'part3', label: 'Part 3' }];
  LU.KINDS = [{ key: 'positive', label: 'Điểm mạnh' }, { key: 'improvement', label: 'Điểm cần cải thiện' }];
  LU.BANDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];                                       // criterion bands are WHOLE numbers only

  /* ---- band maths (mirror of the server; the server recomputes and is authoritative) ----
   * Each criterion band is a whole number 1..9. Overall = mean of the four, rounded DOWN to the nearest 0.5:
   * 6665 -> 5.5 · 6666 -> 6.0 · 6655 -> 5.5 · 6656 -> 5.5 · 6777 -> 6.5 · 6776 -> 6.5 · 7777 -> 7.0
   * (x.5 criterion bands from the old version are still readable so old results keep an Overall.) */
  LU.fmtBand = b => (typeof b === 'number' && isFinite(b)) ? b.toFixed(1) : '—';                       // Overall: 5.5, 6.0
  LU.fmtCrit = b => (typeof b === 'number' && isFinite(b)) ? String(b) : '—';                          // criterion: 6
  LU.calculateOverallBand = function (bands) {
    if (!Array.isArray(bands) || bands.length !== 4) return null;
    if (!bands.every(b => typeof b === 'number' && b >= 1 && b <= 9 && Math.round(b * 2) === b * 2)) return null;
    const sumHalf = bands.reduce((t, b) => t + Math.round(b * 2), 0);          // integer maths, no floating point
    return Math.floor(sumHalf / 4) / 2;
  };
  LU.calcOverall = LU.calculateOverallBand;
  LU.overallWhy = function (bands) {
    const sum = bands.reduce((t, b) => t + b, 0), ov = LU.calculateOverallBand(bands);
    return '(' + bands.map(LU.fmtCrit).join(' + ') + ') ÷ 4 = ' + (Math.round(sum / 4 * 100) / 100) + ' → làm tròn xuống 0.5 → ' + LU.fmtBand(ov);
  };

  /* ---- week state -> label (Completed is not Eligible) ---- */
  LU.stateInfo = function (w) {
    if (!w || w.state === 'locked') return { key: 'locked', glyph: '–', label: 'Chưa mở khóa' };
    if (w.state === 'not_started') return { key: 'not_started', glyph: '○', label: 'Chưa bắt đầu' };
    if (w.state === 'in_progress') return { key: 'in_progress', glyph: '●', label: 'Đang thực hiện' };
    return w.eligibility === 'eligible' ? { key: 'done', glyph: '✓', label: 'Hoàn thành' } : { key: 'not_eligible', glyph: '✕', label: 'Chưa đủ điều kiện' };
  };
  LU.lockText = reason => reason === 'prev_not_eligible' ? 'Tuần trước: chưa đủ điều kiện' : 'Tuần trước chưa hoàn thành';

  /* ---- safe HTML templating: interpolations are escaped unless wrapped by LU.raw / returned from LU.h ---- */
  function Safe(s) { this.s = s; }
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  LU.esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ESC[c]);
  LU.raw = s => new Safe(String(s));
  function part(v) {
    if (v instanceof Safe) return v.s;
    if (Array.isArray(v)) return v.map(part).join('');
    if (v === false || v === null || v === undefined) return '';
    return LU.esc(v);
  }
  LU.h = function (strings) {
    let out = '';
    for (let i = 0; i < strings.length; i++) { out += strings[i]; if (i + 1 < strings.length) out += part(arguments[i + 1]); }
    return new Safe(out);
  };
  LU.str = v => part(v);

  /* ---- date helpers ---- */
  LU.fmtDate = function (iso) {
    if (!iso) return '';
    const d = new Date(iso); if (isNaN(d)) return '';
    return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };
  LU.fmtTime = function (d) { return (d || new Date()).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }); };

  /* ---- storage that never throws (private mode / blocked storage) ---- */
  function makeStore(kind) {
    const mem = {}; let ok = true;
    try { const s = window[kind]; s.setItem('__lu', '1'); s.removeItem('__lu'); } catch (e) { ok = false; }
    return {
      ok: ok,
      get(k) { try { return ok ? window[kind].getItem(k) : (k in mem ? mem[k] : null); } catch (e) { return null; } },
      set(k, v) { try { if (ok) window[kind].setItem(k, v); else mem[k] = v; return true; } catch (e) { mem[k] = v; return false; } },
      remove(k) { try { if (ok) window[kind].removeItem(k); delete mem[k]; } catch (e) { /* ignore */ } },
      keys() { try { if (!ok) return Object.keys(mem); const out = []; for (let i = 0; i < window[kind].length; i++) out.push(window[kind].key(i)); return out; } catch (e) { return []; } }
    };
  }
  LU.local = makeStore('localStorage');       // drafts + small UI preferences ONLY (never the database)
  LU.sess = makeStore('sessionStorage');      // login token for this tab

  LU.session = {
    get() {
      try {
        const o = JSON.parse(LU.sess.get('lu.session') || 'null');
        if (!o || !o.token) return null;
        if (o.expiresAt && new Date(o.expiresAt).getTime() < Date.now()) { LU.sess.remove('lu.session'); return null; }
        return o;
      } catch (e) { return null; }
    },
    set(o) { LU.sess.set('lu.session', JSON.stringify(o)); },
    clear() { LU.sess.remove('lu.session'); }
  };

  /* ---- toast ---- */
  LU.toast = function (msg, bad) {
    const box = document.getElementById('toast'); if (!box) return;
    const el = document.createElement('div'); el.className = 't' + (bad ? ' bad' : ''); el.textContent = msg;
    box.appendChild(el); setTimeout(() => el.remove(), bad ? 6000 : 3200);
  };

  /* ---- dialog (replaces window.confirm so wording and buttons are ours) ---- */
  LU.choose = function (opt) {
    return new Promise(resolve => {
      const dlg = document.getElementById('dlg');
      if (!dlg || typeof dlg.showModal !== 'function') { resolve(window.confirm(opt.title + '\n' + (opt.body || '')) ? opt.choices[opt.choices.length - 1].id : null); return; }
      const choices = opt.choices;
      dlg.innerHTML = LU.h`<div class="dlg"><h2>${opt.title}</h2>${opt.body ? LU.h`<p>${opt.body}</p>` : ''}
        <div class="row">${choices.map(c => LU.h`<button type="button" class="btn ${c.cls || 'ghost'}" data-choice="${c.id}">${c.label}</button>`)}</div></div>`.s;
      let done = false;
      const finish = v => { if (done) return; done = true; dlg.removeEventListener('click', onClick); dlg.removeEventListener('close', onClose); if (dlg.open) dlg.close(); resolve(v); };
      const onClick = e => { const b = e.target.closest('[data-choice]'); if (b) finish(b.dataset.choice); };
      const onClose = () => finish(null);
      dlg.addEventListener('click', onClick); dlg.addEventListener('close', onClose);
      dlg.showModal();
    });
  };
  LU.confirm = async function (o) {
    const r = await LU.choose({ title: o.title, body: o.body, choices: [{ id: 'no', label: o.cancel || 'Hủy', cls: 'ghost' }, { id: 'yes', label: o.ok || 'Đồng ý', cls: o.danger ? 'warn' : 'primary' }] });
    return r === 'yes';
  };

  /* ---- rendering ---- */
  LU.root = () => document.getElementById('app');
  LU.render = function (safe) { LU.root().innerHTML = safe.s; };
  LU.wordmark = function () {
    return LU.CFG.LOGO_SRC ? LU.h`<img class="wm-img" src="${LU.CFG.LOGO_SRC}" alt="Level Up" data-fallback="wm">` : LU.h`<span class="wm" aria-label="Level Up"><span>LEVEL</span><span class="up">UP</span></span>`;
  };
  LU.go = path => { const t = '#/' + path; if (location.hash === t) window.dispatchEvent(new Event('hashchange')); else location.hash = t; };
  LU.randomCode = function () {
    const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', buf = new Uint32Array(8); (window.crypto || window.msCrypto).getRandomValues(buf);
    const c = Array.from(buf, n => A[n % A.length]).join(''); return 'LU-' + c.slice(0, 4) + '-' + c.slice(4);
  };
  LU.errText = function (e, ctx) {
    if (!e) return '';
    if (e.retryable) return ctx === 'load' ? LU.MSG.loadFail : LU.MSG.saveFail;
    const m = {
      NOT_CONFIGURED: 'Chưa cấu hình API_URL trong js/config.js.',
      SERVER_NOT_CONFIGURED: 'Máy chủ chưa được cấu hình (thiếu SHEET_ID hoặc TEACHER_PASSCODE trong Script properties).',
      LOCKED: 'Tuần này chưa được mở khóa cho học viên.',
      FORBIDDEN: 'Học viên này đang bị tắt (inactive). Hãy bật lại ở tab Học viên.',
      RATE_LIMITED: 'Thử quá nhiều lần. Vui lòng đợi vài phút rồi thử lại.',
      BAD_CREDENTIALS: 'Sai mật khẩu giáo viên.',
      UNAUTHORIZED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
      NOT_OPENED: 'Hãy mở bài luyện tập trước khi đánh dấu hoàn thành.',
      NOT_FOUND: 'Không tìm thấy dữ liệu này (có thể bài chưa được giao).'
    };
    return m[e.code] || e.message || 'Có lỗi xảy ra.';
  };
})();
