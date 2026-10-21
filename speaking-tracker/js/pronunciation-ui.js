/* UI uses the existing Level Up tokens and generic event delegation. */
(function () {
  'use strict';
  const LU = window.LU, h = LU.h, N = LU.pronunciation;
  const U = LU.pronunciationUI = {};
  U.marking = function (m) {
    const confirmed = m.data.pronunciation.confirmed, suggestions = N.suggest(LU.PARTS.map(p => m.data.parts[p.key].pronunciation.note));
    const have = new Set(confirmed.map(N.key)), current = new Set();
    const rows = suggestions.map(s => h`<div class="pn-suggestion-row"><b>${s.display}</b><div class="pn-tags">${s.issueIds.map(id => {
      const key = N.key({ term: s.term, issueId: id }); current.add(key);
      return h`<button type="button" class="itag pn-tag" data-action="m-pn-toggle" data-term="${s.term}" data-issue="${id}" aria-pressed="${have.has(key)}" ${m.pron.ready ? '' : 'disabled'}>${N.label(id)}</button>`;
    })}</div></div>`);
    const retained = confirmed.filter(e => !current.has(N.key(e)));
    return h`<div class="pn-marking"><div class="pn-review-h"><b>Kiểm tra từ đã ghi</b><span class="hint">${confirmed.length ? confirmed.length + ' đã xác nhận' : ''}</span></div>
      <p class="hint">Chọn lỗi đã nghe thấy.</p>
      ${m.pron.error ? h`<p class="pn-warning" role="status">${m.pron.error} <button type="button" class="linkbtn" data-action="m-pn-retry">Thử lại</button></p>` : ''}
      ${rows.length ? rows : h`<p class="hint pn-empty">${suggestions.length ? '' : 'Chưa có gợi ý phù hợp với ghi chú.'}</p>`}
      ${retained.length ? h`<div class="pn-retained"><p class="hint">Đã xác nhận trước đó · không còn trong note</p><div class="pn-tags">${retained.map(e => h`<button type="button" class="itag pn-tag" data-action="m-pn-toggle" data-term="${e.term}" data-issue="${e.issueId}" aria-pressed="true" ${m.pron.ready ? '' : 'disabled'}>${e.term} · ${N.label(e.issueId)} ×</button>`)}</div></div>` : ''}</div>`;
  };
  U.retest = function (m) {
    if (!m.pron.ready) return '';
    const pending = m.pron.retest || [], history = m.pron.history || [];
    return h`<details class="pn-retest"><summary>Kiểm tra lại Pronunciation · ${pending.length} mục từ các tuần trước</summary>
      <p class="hint">Giáo viên nghe và đánh dấu. Kết quả luyện của học viên không tự xác nhận đã sửa lỗi.</p>
      ${pending.map((e, i) => h`<div class="pn-retest-row"><div><b>${e.term} · ${N.label(e.issueId)}</b><p class="hint">${e.sentence || 'Đánh giá trong câu trả lời thực tế.'}</p><span class="hint">Tuần ${e.sourceWeek}${e.lastResult === 'not_yet' ? ' · Lần trước chưa đạt' : ''}</span></div>
        <div class="pn-tags"><button type="button" class="itag" data-action="m-pn-retest" data-index="${i}" data-result="passed" ${m.pron.retestBusy ? 'disabled' : ''}>Đã sửa được</button><button type="button" class="itag" data-action="m-pn-retest" data-index="${i}" data-result="not_yet" ${m.pron.retestBusy ? 'disabled' : ''}>Cần luyện tiếp</button></div></div>`)}
      ${history.length ? h`<details><summary>Lịch sử kiểm tra (${history.length})</summary>${history.slice().reverse().map(e => h`<p class="hint">Tuần ${e.testWeek} · ${e.term} · ${N.label(e.issueId)} — ${e.result === 'passed' ? 'Đã sửa được' : 'Cần luyện tiếp'}</p>`)}</details>` : ''}</details>`;
  };
  U.practice = function (data, moduleId, base) {
    const mods = N.modules(), evidence = data.evidence || [], mod = moduleId ? N.module(moduleId) : null;
    if (moduleId && !mod) return h`<p class="notice info">Module này chưa có nội dung được duyệt.</p>`;
    if (!mod) return h`<header class="mod-h"><p class="eyebrow">PRONUNCIATION PRACTICE</p><h1>Luyện phát âm</h1></header>
      <p class="hint">Bài tập cá nhân chỉ dùng lỗi giáo viên đã xác nhận ở mock đã hoàn thành.</p>
      ${mods.length ? h`<ul class="pcards">${mods.map(m => LU.practice.renderCard(LU.practice.get(m.id), { href: base + '/pronunciation/' + encodeURIComponent(m.id), reason: N.personalized(m.id, evidence).length + ' mục luyện cá nhân' }))}</ul>`
        : h`<p class="notice info">Chưa có nội dung module phát âm được duyệt trong thư viện. Các lỗi đã xác nhận vẫn được lưu; bài tập sẽ xuất hiện khi nội dung phù hợp được nạp.</p>`}
      ${evidence.length ? h`<section class="mod-sec"><h3>Lỗi được giáo viên xác nhận</h3><div class="pn-tags">${evidence.map(e => h`<span class="pn-evidence">${e.term} · ${N.label(e.issueId)}</span>`)}</div></section>` : h`<p class="hint sp">Chưa có lỗi phát âm được xác nhận trong các mock đã hoàn thành.</p>`}`;
    const personal = N.personalized(mod.id, evidence);
    return h`<header class="mod-h"><p class="eyebrow">PRONUNCIATION PRACTICE</p><h1>${mod.title}</h1><p class="hint">${mod.target || ''}</p></header>
      <section class="mod-sec"><h3>Core practice</h3>${mod.core.theory.map(t => h`<div class="pn-theory"><h4>${t.title}</h4><p>${t.text}</p></div>`)}
        ${mod.core.practice.map(p => h`<div class="pn-practice-item"><b>${p.target}</b><p>${p.sentence}</p></div>`)}</section>
      <section class="mod-sec"><h3>Personalized practice</h3>${personal.length ? personal.map(p => h`<div class="pn-practice-item"><b>${p.term}</b><p>${p.sentence}</p></div>`) : h`<p class="hint">Chưa có lỗi đã xác nhận phù hợp với quy tắc của module này.</p>`}</section>
      ${(mod.media || []).length ? h`<section class="mod-sec"><h3>Media resources</h3>${mod.media.map(r => h`<p><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.label}</a></p>`)}</section>` : ''}
      <section class="mod-sec"><h3>Tự luyện trước buổi kiểm tra</h3><p class="hint">Đọc thành tiếng. Giáo viên sẽ xác nhận kết quả ở mock tiếp theo.</p>
        ${personal.length ? personal.map(p => h`<details class="pn-self-practice"><summary>${p.term}</summary><p>${p.sentence}</p></details>`) : mod.retest.map(q => h`<p class="pn-practice-item">${q.prompt}</p>`)}</section>`;
  };
})();
