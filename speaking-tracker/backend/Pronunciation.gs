/* Additive extension for the EXISTING Apps Script project; not a replacement doPost.
 * Host contracts: whoIs_, requireTeacher_, findStudent_, statesFor_, ss_, toWeek_, ApiError.
 * Dispatch hook is documented in docs/pronunciation-backend.md. No existing Sheet is modified.
 * The token is always checked by the original backend. Client-provided roles/IDs are never trusted. */
function pronunciationActions_() {
  return {
    getPronunciationState: pnGetState_, savePronunciationState: pnSaveState_,
    getPronunciationPractice: pnGetPractice_, recordPronunciationRetest: pnRetest_
  };
}
const PN_HEADERS = {
  'Pronunciation Sessions': ['Student ID', 'Week', 'Revision', 'Confirmed JSON', 'Request ID', 'Updated At'],
  'Pronunciation Retests': ['Attempt ID', 'Student ID', 'Source Week', 'Test Week', 'Term', 'Issue ID', 'Result', 'Tested At']
};
function pnSheet_(name, create) {
  const book = ss_(); let sh = book.getSheetByName(name);
  if (!sh && create) {
    sh = book.insertSheet(name);
    sh.getRange(1, 1, 1, PN_HEADERS[name].length).setValues([PN_HEADERS[name]]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  if (sh) {
    const actual = sh.getRange(1, 1, 1, PN_HEADERS[name].length).getValues()[0];
    if (actual.some((h, i) => h !== PN_HEADERS[name][i])) throw new ApiError('PN_SCHEMA', 'Pronunciation sheet headers do not match. No data was changed.');
  }
  return sh;
}
function pnRows_(name) {
  const sh = pnSheet_(name, false); if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, PN_HEADERS[name].length).getValues().map((row, i) => {
    const out = { _row: i + 2 }; PN_HEADERS[name].forEach((h, j) => out[h] = row[j]); return out;
  });
}
function pnWrite_(name, row, data) {
  const sh = pnSheet_(name, true), headers = PN_HEADERS[name];
  const range = sh.getRange(row || sh.getLastRow() + 1, 1, 1, headers.length);
  range.setNumberFormats([headers.map(() => '@')]);
  range.setValues([headers.map(h => data[h] === undefined ? '' : data[h])]);
}
function pnLock_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new ApiError('BUSY', 'Please retry. Another change is being saved.');
  try { return fn(); } finally { lock.releaseLock(); }
}
function pnStudent_(req, teacherOnly) {
  if (teacherOnly) { requireTeacher_(req.token); return findStudent_(String(req.studentId || '')).id; }
  const who = whoIs_(req.token);
  return who.role === 'student' ? who.student.id : findStudent_(String(req.studentId || '')).id;
}
function pnWeek_(sid, value) {
  const week = toWeek_(value), state = statesFor_(sid)[week - 1];
  if (!state || !state.unlocked) throw new ApiError('LOCKED', 'Mock test is not unlocked.');
  return week;
}
function pnRecord_(sid, week) {
  const rows = pnRows_('Pronunciation Sessions').filter(r => r['Student ID'] === sid && Number(r.Week) === week);
  if (rows.length > 1) throw new ApiError('PN_SCHEMA', 'Duplicate pronunciation session. No data was changed.');
  return rows[0] || null;
}
function pnConfirmed_(row) {
  if (!row) return [];
  try { return pnValidate_(JSON.parse(String(row['Confirmed JSON'] || '[]'))); }
  catch (e) { throw new ApiError('PN_SCHEMA', 'Stored pronunciation data cannot be read. No data was changed.'); }
}
function pnValidate_(list) {
  if (!Array.isArray(list) || list.length > 150) throw new ApiError('VALIDATION', 'Invalid pronunciation evidence.');
  const out = [], seen = {};
  list.forEach(e => {
    if (!e || typeof e.term !== 'string' || typeof e.issueId !== 'string') throw new ApiError('VALIDATION', 'Invalid pronunciation evidence.');
    const term = e.term.toLowerCase().trim(), m = PN_DATA.mappings.find(x => x.term === term), issue = PN_DATA.catalog.find(x => x.id === e.issueId && x.enabled);
    if (!m || !issue || m.issueIds.indexOf(e.issueId) === -1) throw new ApiError('VALIDATION', 'Unknown term/issue mapping.');
    const key = term + '::' + e.issueId;
    if (!seen[key]) { seen[key] = true; out.push({ term: term, issueId: e.issueId }); }
  });
  return out;
}
function pnGetState_(req) {
  const sid = pnStudent_(req, true), week = pnWeek_(sid, req.week), row = pnRecord_(sid, week);
  const prior = pnEvidence_(sid, w => w < week), history = pnHistory_(sid);
  const retest = prior.map(e => {
    const attempts = history.filter(x => x.sourceWeek === e.sourceWeek && x.term === e.term && x.issueId === e.issueId);
    const last = attempts.length ? attempts[attempts.length - 1] : null;
    return Object.assign({}, e, { lastResult: last ? last.result : null });
  }).filter(e => e.lastResult !== 'passed').sort((a, b) => Number(b.lastResult === 'not_yet') - Number(a.lastResult === 'not_yet') || b.sourceWeek - a.sourceWeek).slice(0, 10);
  return { protocolVersion: 1, revision: row ? Number(row.Revision) : 0, confirmed: pnConfirmed_(row), retest: retest, history: history };
}
function pnRequestId_(id) {
  if (typeof id !== 'string' || !/^[A-Za-z0-9_-]{8,90}$/.test(id)) throw new ApiError('VALIDATION', 'Invalid request ID.');
  return id;
}
function pnSaveState_(req) {
  const sid = pnStudent_(req, true), week = pnWeek_(sid, req.week), requestId = pnRequestId_(req.requestId), confirmed = pnValidate_(req.confirmed);
  if (!Number.isInteger(req.expectedRevision) || req.expectedRevision < 0) throw new ApiError('VALIDATION', 'Expected revision is required.');
  return pnLock_(() => {
    const row = pnRecord_(sid, week), rev = row ? Number(row.Revision) : 0, json = JSON.stringify(confirmed);
    if (row && row['Request ID'] === requestId) {
      if (String(row['Confirmed JSON']) !== json) throw new ApiError('CONFLICT', 'Request ID was reused with different evidence.');
      return { protocolVersion: 1, revision: rev, confirmed: confirmed };
    }
    if (req.expectedRevision !== rev) throw new ApiError('CONFLICT', 'Pronunciation data changed in another tab. Reload before saving; the local draft is still available.');
    pnWrite_('Pronunciation Sessions', row && row._row, { 'Student ID': sid, Week: week, Revision: rev + 1, 'Confirmed JSON': json, 'Request ID': requestId, 'Updated At': new Date().toISOString() });
    return { protocolVersion: 1, revision: rev + 1, confirmed: confirmed };
  });
}
function pnEvidence_(sid, predicate) {
  return pnRows_('Pronunciation Sessions').filter(r => r['Student ID'] === sid && predicate(Number(r.Week))).flatMap(r => pnConfirmed_(r).map(e => {
    const m = PN_DATA.mappings.find(x => x.term === e.term);
    return { term: e.term, issueId: e.issueId, sourceWeek: Number(r.Week), sentence: m.sentence || '', ruleIds: m.ruleIds[e.issueId] || [] };
  }));
}
function pnHistory_(sid) {
  return pnRows_('Pronunciation Retests').filter(r => r['Student ID'] === sid).map(r => ({ attemptId: String(r['Attempt ID']), sourceWeek: Number(r['Source Week']), testWeek: Number(r['Test Week']), term: String(r.Term), issueId: String(r['Issue ID']), result: String(r.Result), testedAt: String(r['Tested At']) }));
}
function pnGetPractice_(req) {
  const sid = pnStudent_(req, false), completed = statesFor_(sid).filter(w => w.state === 'completed').map(w => w.week);
  return { protocolVersion: 1, evidence: pnEvidence_(sid, w => completed.indexOf(w) !== -1), history: pnHistory_(sid).filter(x => completed.indexOf(x.sourceWeek) !== -1) };
}
function pnRetest_(req) {
  const sid = pnStudent_(req, true), testWeek = pnWeek_(sid, req.testWeek), sourceWeek = toWeek_(req.sourceWeek), attemptId = pnRequestId_(req.attemptId);
  if (sourceWeek >= testWeek || ['passed', 'not_yet'].indexOf(req.result) === -1) throw new ApiError('VALIDATION', 'Retests require a later mock week and a teacher result.');
  const entry = pnValidate_([{ term: req.term, issueId: req.issueId }])[0];
  if (!pnConfirmed_(pnRecord_(sid, sourceWeek)).some(e => e.term === entry.term && e.issueId === entry.issueId)) throw new ApiError('VALIDATION', 'Only confirmed previous errors can be retested.');
  return pnLock_(() => {
    const old = pnRows_('Pronunciation Retests').find(r => r['Attempt ID'] === attemptId);
    if (old) {
      if (old['Student ID'] !== sid || Number(old['Source Week']) !== sourceWeek || Number(old['Test Week']) !== testWeek || old.Term !== entry.term || old['Issue ID'] !== entry.issueId || old.Result !== req.result) throw new ApiError('CONFLICT', 'Retest request ID was reused.');
      return { attemptId: attemptId, result: req.result };
    }
    pnWrite_('Pronunciation Retests', null, { 'Attempt ID': attemptId, 'Student ID': sid, 'Source Week': sourceWeek, 'Test Week': testWeek, Term: entry.term, 'Issue ID': entry.issueId, Result: req.result, 'Tested At': new Date().toISOString() });
    return { attemptId: attemptId, result: req.result };
  });
}
