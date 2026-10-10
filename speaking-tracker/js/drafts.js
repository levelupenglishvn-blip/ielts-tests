/* drafts.js — local safety net for an unfinished mock.
 * localStorage is NOT the database: it only keeps what the teacher typed until the server has it.
 * A record is: { v, studentId, week, step, data, base, dirty, savedAt, meta:{name,content,previous}, } */
(function () {
  'use strict';
  const LU = window.LU;
  const P = 'lu.draft.v1.', T = 'lu.timer.v1.';
  const key = (sid, w) => P + sid + '.' + w;

  LU.drafts = {
    get(sid, week) {
      try { const r = JSON.parse(LU.local.get(key(sid, week)) || 'null'); return r && r.v === 1 ? r : null; } catch (e) { return null; }
    },
    save(rec) { rec.v = 1; rec.savedAt = new Date().toISOString(); return LU.local.set(key(rec.studentId, rec.week), JSON.stringify(rec)); },
    remove(sid, week) { LU.local.remove(key(sid, week)); LU.local.remove(T + sid + '.' + week); },
    /** [{studentId, week, dirty}] — used for the "bản nháp trên máy" tag in the student list. */
    list() {
      const out = [];
      LU.local.keys().forEach(k => {
        if (k.indexOf(P) !== 0) return;
        try { const r = JSON.parse(LU.local.get(k)); if (r && r.v === 1) out.push({ studentId: r.studentId, week: r.week, dirty: !!r.dirty }); } catch (e) { /* skip */ }
      });
      return out;
    },
    timerGet(sid, week) { try { return JSON.parse(LU.local.get(T + sid + '.' + week) || 'null'); } catch (e) { return null; } },
    timerSet(sid, week, t) { LU.local.set(T + sid + '.' + week, JSON.stringify(t)); }
  };
})();
