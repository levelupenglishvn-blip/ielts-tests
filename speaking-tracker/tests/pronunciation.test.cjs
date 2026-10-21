const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { root, plain, client, backend, moduleFixture } = require('./helpers.cjs');
const ids = (n, s) => plain(n.suggest(s)).flatMap(x => x.issueIds);
const confirm = [{ term: 'asks', issueId: 'final_s' }];
test('Canonical taxonomy: 97 stable labels, no undeclared /kt/, generated files match', () => {
  const { LU } = client(), n = LU.pronunciation;
  assert.equal(n.catalog().length, 97); assert.equal(new Set(n.catalog().map(x => x.id)).size, 97);
  assert(!n.catalog().some(x => x.id === 'cluster_kt'));
  require('node:child_process').execFileSync(process.execPath, [path.join(root, 'tools/build-pronunciation.cjs'), '--check']);
});
test('Empty, separators, whole words, ambiguity and phrase-first matching', () => {
  const n = client().LU.pronunciation;
  assert.deepEqual(ids(n, ''), []); assert.deepEqual(ids(n, 'thinker; schoolwork'), []);
  assert.deepEqual(ids(n, 'asks, think'), ['final_s', 'cluster_sks', 'consonant_theta']);
  assert.deepEqual(ids(n, 'go out; such as\npick it up, an apple'), ['connected_speech', 'connected_speech', 'connected_speech', 'connected_speech']);
  assert.deepEqual(ids(n, 'culture'), ['vowel_ʌ', 'vowel_ə', 'consonant_ch']);
  assert.deepEqual(ids(n, 'worked'), ['final_t']);
  const note = 'stress; rythm'; assert.deepEqual(ids(n, note), ['word_stress', 'sentence_stress', 'rhythm', 'chunking']); assert.equal(note, 'stress; rythm');
  assert.equal(n.suggest(['rhythm', 'rythm', 'rhythm']).length, 1);
});
test('Explicit confirm/unconfirm; note edits never remove confirmed evidence', () => {
  const n = client().LU.pronunciation; let list = [];
  n.suggest('asks'); assert.equal(list.length, 0);
  list = n.toggle(list, 'asks', 'final_s'); n.suggest('think'); assert.deepEqual(plain(list), confirm);
  assert.deepEqual(plain(n.toggle(list, 'asks', 'final_s')), []);
  assert.deepEqual(plain(n.normalize([{ term: 'asks', issueId: 'final_z' }])), []);
});
test('Personalization matches rule, deduplicates, preserves Core and keeps students separate', () => {
  const n = client().LU.pronunciation, module = moduleFixture(), original = JSON.stringify(module);
  n.registerModules([module]);
  const a = n.personalized(module.id, [{ term: 'advantages', issueId: 'final_z', sourceWeek: 1 }, { term: 'advantages', issueId: 'final_z', sourceWeek: 2 }, { term: 'think', issueId: 'consonant_theta', sourceWeek: 1 }]);
  assert.equal(a.length, 1); assert.equal(a[0].sentence, 'There are several advantages to learning a foreign language.'); assert.deepEqual(plain(a[0].sourceWeeks), [1, 2]);
  assert.equal(n.personalized(module.id, []).length, 0); assert.equal(JSON.stringify(module), original);
  const copy = n.module(module.id); copy.core.practice[0].target = 'modified'; assert.equal(n.module(module.id).core.practice[0].target, 'places');
  assert.throws(() => n.registerModules([module]), /already registered/);
  assert(n.validateModule({ ...module, core: { theory: [], practice: [] } }).length > 0);
  assert(n.validateModule({ ...module, rules: [] }).length > 0);
});
test('Apps Script rejects student writes, invalid mappings and missing authentication', () => {
  const b = backend();
  assert.throws(() => b.call('savePronunciationState', { token: 'student-A', studentId: 'B', week: 1, confirmed: confirm, expectedRevision: 0, requestId: 'request-001' }), e => e.code === 'FORBIDDEN');
  assert.throws(() => b.call('getPronunciationState', { studentId: 'A', week: 1 }), e => e.code === 'UNAUTHORIZED');
  assert.throws(() => b.call('savePronunciationState', { token: 'teacher', studentId: 'A', week: 1, confirmed: [{ term: 'asks', issueId: 'cluster_kt' }], expectedRevision: 0, requestId: 'request-001' }), e => e.code === 'VALIDATION');
  assert.equal(b.sheets.size, 0);
});
test('Revision CAS, retry idempotency, mock/student isolation and reload', () => {
  const b = backend(), req = { token: 'teacher', studentId: 'A', week: 1, expectedRevision: 0, requestId: 'request-001', confirmed: confirm };
  assert.equal(b.call('savePronunciationState', req).revision, 1); assert.equal(b.call('savePronunciationState', req).revision, 1);
  assert.throws(() => b.call('savePronunciationState', { ...req, requestId: 'request-002' }), e => e.code === 'CONFLICT');
  assert.throws(() => b.call('savePronunciationState', { ...req, confirmed: [] }), e => e.code === 'CONFLICT');
  assert.deepEqual(b.call('getPronunciationState', { token: 'teacher', studentId: 'A', week: 1 }).confirmed, confirm);
  assert.deepEqual(b.call('getPronunciationState', { token: 'teacher', studentId: 'A', week: 2 }).confirmed, []);
  assert.deepEqual(b.call('getPronunciationState', { token: 'teacher', studentId: 'B', week: 1 }).confirmed, []);
  assert.equal(b.call('getPronunciationPractice', { token: 'student-B', studentId: 'A' }).evidence.length, 0);
  assert.equal(b.call('getPronunciationPractice', { token: 'student-A', studentId: 'B' }).evidence.length, 1);
  assert.equal(b.sheets.get('Pronunciation Sessions').data.length, 2);
});
test('Student sees only completed mocks; a later teacher retest is append-only and idempotent', () => {
  const b = backend();
  b.call('savePronunciationState', { token: 'teacher', studentId: 'A', week: 1, expectedRevision: 0, requestId: 'request-001', confirmed: confirm });
  b.call('savePronunciationState', { token: 'teacher', studentId: 'A', week: 3, expectedRevision: 0, requestId: 'request-003', confirmed: [{ term: 'think', issueId: 'consonant_theta' }] });
  assert.equal(b.call('getPronunciationPractice', { token: 'student-A' }).evidence.length, 1);
  assert.equal(b.call('getPronunciationState', { token: 'teacher', studentId: 'A', week: 2 }).retest.length, 1);
  const attempt = { token: 'teacher', studentId: 'A', sourceWeek: 1, testWeek: 2, term: 'asks', issueId: 'final_s', result: 'passed', attemptId: 'attempt-001' };
  assert.throws(() => b.call('recordPronunciationRetest', { ...attempt, token: 'student-A' }), e => e.code === 'FORBIDDEN');
  assert.throws(() => b.call('recordPronunciationRetest', { ...attempt, testWeek: 1 }), e => e.code === 'VALIDATION');
  assert.throws(() => b.call('recordPronunciationRetest', { ...attempt, studentId: 'B' }), e => e.code === 'VALIDATION');
  b.call('recordPronunciationRetest', attempt); b.call('recordPronunciationRetest', attempt);
  assert.equal(b.sheets.get('Pronunciation Retests').data.length, 2);
  assert.equal(b.call('getPronunciationState', { token: 'teacher', studentId: 'A', week: 2 }).retest.length, 0);
  b.call('savePronunciationState', { token: 'teacher', studentId: 'A', week: 1, expectedRevision: 1, requestId: 'request-004', confirmed: [] });
  assert.equal(b.call('getPronunciationPractice', { token: 'student-A' }).history.length, 1);
});
test('An existing sheet with incompatible headers is never overwritten', () => {
  const b = backend();
  b.call('savePronunciationState', { token: 'teacher', studentId: 'A', week: 1, expectedRevision: 0, requestId: 'request-001', confirmed: confirm });
  const s = b.sheets.get('Pronunciation Sessions'); s.data[0][0] = 'Different header'; const before = JSON.stringify(s.data);
  assert.throws(() => b.call('getPronunciationState', { token: 'teacher', studentId: 'A', week: 1 }), e => e.code === 'PN_SCHEMA');
  assert.equal(JSON.stringify(s.data), before);
});
test('Lost save response freezes retry payload; newer edits flush separately', async () => {
  const { LU } = client(), calls = [];
  const m = { sid: 'A', week: 1, pron: { ready: true, dirty: true, revision: 0, editRev: 1 }, data: { pronunciation: { confirmed: confirm, pending: true, revision: 0 } } };
  LU.api = { async call(action, payload) { calls.push(plain(payload)); if (calls.length === 1) throw Error('Lost response'); return { protocolVersion: 1, revision: payload.expectedRevision + 1 }; } };
  await assert.rejects(LU.pronunciation.save(m));
  m.data.pronunciation.confirmed = [{ term: 'think', issueId: 'consonant_theta' }]; m.pron.editRev++;
  await LU.pronunciation.save(m);
  assert.deepEqual(calls[0], calls[1]); assert.notEqual(calls[1].requestId, calls[2].requestId);
  assert.deepEqual(calls[2].confirmed, m.data.pronunciation.confirmed); assert.equal(m.pron.dirty, false); assert.equal(m.data.pronunciation.pending, false);
});
test('Offline pending evidence cannot falsely become saved', async () => {
  const { LU } = client(); LU.ApiError = class extends Error {};
  const m = { pron: { ready: false, dirty: true }, data: { pronunciation: { pending: true, confirmed: confirm } } };
  await assert.rejects(LU.pronunciation.save(m)); assert.equal(m.data.pronunciation.pending, true);
});
test('Existing scoring and Lexis content still load; all whole-band combinations retain original rounding', () => {
  const c = client(); ['data/practice-modules.js','data/lexical-modules.js','data/vocabulary-library.js','data/packs-1.js','data/packs-2.js','data/packs-3.js','data/packs-4.js','data/packs-5.js','data/packs-6.js'].forEach(c.run);
  assert(c.LU.practice.all().filter(m => m.category === 'lexical').length > 0);
  for (let a=1;a<=9;a++) for (let b=1;b<=9;b++) for (let d=1;d<=9;d++) for (let e=1;e<=9;e++) assert.equal(c.LU.calcOverall([a,b,d,e]), Math.floor((a+b+d+e)/2)/2);
  assert.equal(c.LU.calcOverall([6,6,6,null]), null);
  assert.equal(fs.readFileSync(path.join(root,'data/pronunciation-modules.js'),'utf8').includes('registerModules([])'), true);
});
