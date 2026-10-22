/* Pronunciation domain. No microphone, speech recognition, or automatic diagnosis.
 * Canonical taxonomy/mappings are generated from data/pronunciation-taxonomy.json.
 * Confirmed evidence is separate from the legacy marking.issues array. */
(function () {
  'use strict';
  const LU = window.LU, D = LU.PRONUNCIATION_DATA;
  const N = LU.pronunciation = {}, modules = new Map();
  const issues = new Map(D.catalog.map(x => [x.id, x]));
  const dictionary = new Map(D.mappings.map(x => [x.term, x]));
  const matchers = D.mappings.flatMap(m => [m.term].concat(m.aliases || []).map(t => ({ m: m, words: t.split(' ') })))
    .sort((a, b) => b.words.length - a.words.length);
  N.catalog = () => D.catalog.map(x => Object.assign({}, x));
  N.label = id => issues.has(id) ? issues.get(id).label : id;
  N.key = e => e.term + '::' + e.issueId;
  N.suggest = function (notes) {
    const out = new Map();
    (Array.isArray(notes) ? notes : [notes]).forEach(note => String(note || '').split(/[,;\n]+/).forEach(segment => {
      const tokens = segment.match(/[a-z]+(?:['’][a-z]+)?/gi) || [];
      for (let i = 0; i < tokens.length;) {
        const hit = matchers.find(x => x.words.every((w, j) => tokens[i + j] && tokens[i + j].toLowerCase() === w));
        if (!hit) { i++; continue; }
        if (!out.has(hit.m.term)) out.set(hit.m.term, { term: hit.m.term, display: tokens.slice(i, i + hit.words.length).join(' '),
          issueIds: hit.m.issueIds.filter(id => issues.has(id) && issues.get(id).enabled).slice(0, 4) });
        i += hit.words.length;
      }
    }));
    return Array.from(out.values());
  };
  N.normalize = function (list) {
    const out = new Map();
    (Array.isArray(list) ? list : []).forEach(e => {
      if (!e || typeof e.term !== 'string') return;
      const term = e.term.toLowerCase().trim(), m = dictionary.get(term), issue = issues.get(e.issueId);
      if (m && issue && issue.enabled && m.issueIds.indexOf(e.issueId) !== -1) {
        const item = { term: term, issueId: e.issueId }; out.set(N.key(item), item);
      }
    });
    return Array.from(out.values()).slice(0, 150);
  };
  N.toggle = (list, term, issueId) => {
    const next = N.normalize(list), key = N.key({ term: term, issueId: issueId }), at = next.findIndex(e => N.key(e) === key);
    if (at === -1) next.push({ term: term, issueId: issueId }); else next.splice(at, 1);
    return N.normalize(next);
  };
  N.enrich = function (entry) {
    const m = dictionary.get(entry.term); if (!m || m.issueIds.indexOf(entry.issueId) === -1) return null;
    return Object.assign({}, entry, { label: N.label(entry.issueId), sentence: m.sentence || '', ruleIds: (m.ruleIds[entry.issueId] || []).slice() });
  };
  const validId = id => typeof id === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.-]{0,79}$/.test(id);
  const validText = s => typeof s === 'string' && !!s.trim() && s.length <= 8000;
  const safeURL = u => typeof u === 'string' && /^https:\/\/[^\s]+$/i.test(u);
  N.validateModule = function (m) {
    const errors = [];
    if (!m || m.schemaVersion !== 1 || !validId(m.id) || !validText(m.title) || m.ipa !== D.ipa) return ['Invalid schema, ID, title or IPA convention.'];
    if (!Array.isArray(m.rules) || !m.rules.length || m.rules.some(r => !validId(r.id) || !validText(r.title) || !Array.isArray(r.issueIds) || !r.issueIds.length || r.issueIds.some(id => !issues.has(id)) || !Array.isArray(r.evidenceRuleIds) || !r.evidenceRuleIds.length || r.evidenceRuleIds.some(id => !D.mappings.some(x => Object.values(x.ruleIds).some(ids => ids.indexOf(id) !== -1))))) errors.push('Rules must explicitly link known issue and evidence-rule IDs.');
    const core = m.core;
    if (!core || !Array.isArray(core.theory) || !core.theory.length || core.theory.some(x => !validId(x.id) || !validText(x.title) || !validText(x.text)) || !Array.isArray(core.practice) || !core.practice.length || core.practice.some(x => !validId(x.id) || !validText(x.target) || !validText(x.sentence) || !Array.isArray(m.rules) || !m.rules.some(r => r.id === x.ruleId))) errors.push('Ready modules require real theory and Core practice.');
    if (!Array.isArray(m.retest) || !m.retest.length || m.retest.some(x => !validId(x.id) || !validText(x.prompt) || !Array.isArray(m.rules) || !m.rules.some(r => r.id === x.ruleId))) errors.push('Teacher retest prompts are required.');
    if (m.media !== undefined && (!Array.isArray(m.media) || m.media.some(x => !validId(x.id) || !validText(x.label) || !safeURL(x.url) || ['audio', 'video', 'document', 'reference'].indexOf(x.type) === -1))) errors.push('Invalid media resource.');
    const allIds = [].concat(m.rules || [], core && core.theory || [], core && core.practice || [], m.retest || [], m.media || []).map(x => x.id);
    if (new Set(allIds).size !== allIds.length) errors.push('Content IDs must be unique inside a module.');
    return errors;
  };
  N.registerModules = function (list) {
    if (!Array.isArray(list)) throw Error('Pronunciation modules must be an array.');
    list.forEach(m => {
      const errors = N.validateModule(m); if (errors.length) throw Error('Pronunciation module ' + (m && m.id) + ': ' + errors.join(' '));
      if (modules.has(m.id) || LU.practice.get(m.id)) throw Error('Module ID already registered: ' + m.id);
      const copy = JSON.parse(JSON.stringify(m)); modules.set(m.id, copy);
      LU.practice.register([{ id: m.id, title: m.title, category: 'pronunciation', subcategory: m.category || 'pronunciation',
        target: m.target || '', addresses: m.rules.flatMap(r => r.issueIds.map(id => 'pronunciation.' + id)), pronunciationVersion: 1 }]);
    });
  };
  N.modules = () => Array.from(modules.values()).map(m => JSON.parse(JSON.stringify(m)));
  N.module = id => modules.has(id) ? JSON.parse(JSON.stringify(modules.get(id))) : null;
  N.personalized = function (moduleId, evidence) {
    const m = modules.get(moduleId); if (!m) return [];
    const out = new Map();
    (Array.isArray(evidence) ? evidence : []).forEach(raw => {
      const e = N.enrich(raw); if (!e || !e.sentence) return;
      const rule = m.rules.find(r => r.issueIds.indexOf(e.issueId) !== -1 && r.evidenceRuleIds.some(id => e.ruleIds.indexOf(id) !== -1));
      if (!rule) return;
      const key = rule.id + '::' + e.term;
      if (!out.has(key)) out.set(key, { id: m.id + '::' + key, term: e.term, sentence: e.sentence, ruleId: rule.id, issueIds: [e.issueId], sourceWeeks: [e.sourceWeek].filter(Boolean) });
      else { const x = out.get(key); if (x.issueIds.indexOf(e.issueId) === -1) x.issueIds.push(e.issueId); if (e.sourceWeek && x.sourceWeeks.indexOf(e.sourceWeek) === -1) x.sourceWeeks.push(e.sourceWeek); }
    });
    return Array.from(out.values());
  };
  N.load = async (studentId, week) => {
    const result = await LU.api.call('getPronunciationState', { studentId: studentId, week: week });
    if (!result || result.protocolVersion !== 1 || !Number.isInteger(result.revision)) throw new LU.ApiError('PN_PROTOCOL', 'Backend Pronunciation chưa tương thích.');
    return Object.assign({}, result, { confirmed: N.normalize(result.confirmed) });
  };
  N.save = async function (m) {
    if (!m.pron || !m.pron.dirty) return;
    if (!m.pron.ready) throw new LU.ApiError('PN_UNAVAILABLE', 'Chưa thể lưu lỗi Pronunciation. Bản nháp vẫn được giữ trên máy.');
    for (let tries = 0; m.pron.dirty && tries < 3; tries++) {
      // Freeze retry payload: a lost response must not reuse an ID with different evidence.
      const pending = m.pron.pendingRequest || (m.pron.pendingRequest = { requestId: N.requestId(), confirmed: N.normalize(m.data.pronunciation.confirmed), revision: m.pron.revision, editRev: m.pron.editRev });
      const result = await LU.api.call('savePronunciationState', { studentId: m.sid, week: m.week, expectedRevision: pending.revision, requestId: pending.requestId, confirmed: pending.confirmed });
      if (!result || result.protocolVersion !== 1 || !Number.isInteger(result.revision)) throw new LU.ApiError('PN_PROTOCOL', 'Backend không xác nhận lưu lỗi phát âm.');
      m.pron.revision = result.revision; m.data.pronunciation.revision = result.revision;
      if (m.pron.editRev === pending.editRev) { m.pron.dirty = false; m.data.pronunciation.pending = false; }
      m.pron.pendingRequest = null;
    }
    if (m.pron.dirty) throw new LU.ApiError('BUSY', 'Lỗi phát âm đang thay đổi. Vui lòng lưu lại sau khi hoàn tất chọn nhãn.');
  };
  N.requestId = () => 'pn-' + (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
})();
