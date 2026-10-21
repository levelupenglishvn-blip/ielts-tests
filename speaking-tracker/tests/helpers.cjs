const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const plain = x => JSON.parse(JSON.stringify(x));
function client() {
  const store = () => { const m = new Map(); return { getItem: k => m.get(k) || null, setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k), key: i => [...m.keys()][i], get length() { return m.size; } }; };
  const doc = { addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; } };
  const win = { localStorage: store(), sessionStorage: store(), crypto: require('node:crypto').webcrypto };
  const ctx = vm.createContext({ window: win, document: doc, console, setTimeout, clearTimeout, Date, Map, Set });
  const run = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  run('js/core.js'); run('js/practice.js'); run('data/pronunciation-taxonomy.js'); run('js/pronunciation.js');
  return { LU: win.LU, run, ctx };
}
function backend() {
  const sheets = new Map(), completed = new Set(['A|1', 'A|2', 'B|1']);
  class ApiError extends Error { constructor(code, message) { super(message); this.code = code; } }
  function makeSheet() {
    const data = [];
    return { data, getLastRow: () => data.length, setFrozenRows() {},
      getRange(row, col, count, width) {
        const range = {
          getValues: () => Array.from({ length: count }, (_, i) => Array.from({ length: width }, (_, j) => data[row - 1 + i]?.[col - 1 + j] ?? '')),
          setValues: vals => { vals.forEach((v, i) => { data[row - 1 + i] = data[row - 1 + i] || []; v.forEach((x, j) => data[row - 1 + i][col - 1 + j] = x); }); return range; },
          setFontWeight: () => range, setNumberFormats: () => range
        }; return range;
      }
    };
  }
  const whoIs_ = token => { if (token === 'teacher') return { role: 'teacher' }; if (token === 'student-A' || token === 'student-B') return { role: 'student', student: { id: token.slice(-1) } }; throw new ApiError('UNAUTHORIZED', 'Invalid session'); };
  const ctx = vm.createContext({ console, ApiError,
    whoIs_, requireTeacher_: t => { if (whoIs_(t).role !== 'teacher') throw new ApiError('FORBIDDEN', 'Teacher only'); },
    findStudent_: id => { if (id !== 'A' && id !== 'B') throw new ApiError('NOT_FOUND', 'Student not found'); return { id }; },
    toWeek_: w => { if (!Number.isInteger(Number(w)) || Number(w) < 1 || Number(w) > 15) throw new ApiError('VALIDATION', 'Invalid week'); return Number(w); },
    statesFor_: sid => Array.from({ length: 15 }, (_, i) => ({ week: i + 1, unlocked: i < 3, state: completed.has(sid + '|' + (i + 1)) ? 'completed' : 'in_progress' })),
    ss_: () => ({ getSheetByName: n => sheets.get(n) || null, insertSheet: n => { const s = makeSheet(); sheets.set(n, s); return s; } }),
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) }
  });
  ['backend/PronunciationData.gs', 'backend/Pronunciation.gs'].forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f }));
  const actions = ctx.pronunciationActions_();
  return { call: (action, req) => plain(actions[action](req)), sheets, completed, ctx };
}
const moduleFixture = () => ({ schemaVersion: 1, id: 'test-plural-iz', ipa: 'en-GB', title: 'Test-only plural rule',
  rules: [{ id: 'plural-iz-rule', title: 'Plural /ɪz/', issueIds: ['final_z'], evidenceRuleIds: ['plural_iz'] }],
  core: { theory: [{ id: 'plural-iz-theory', title: 'Test theory', text: 'Test fixture; never registered in production.' }],
    practice: [{ id: 'plural-iz-core', ruleId: 'plural-iz-rule', target: 'places', sentence: 'There are many places to visit.' }] },
  media: [], retest: [{ id: 'plural-iz-test', ruleId: 'plural-iz-rule', prompt: 'Read the target sentence.' }] });
module.exports = { root, plain, client, backend, moduleFixture };
