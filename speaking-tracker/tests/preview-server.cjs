/* Isolated local QA only. Uses fake students and an in-memory API; never calls the real backend. */
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { root, backend, client, plain } = require('./helpers.cjs');
const service = backend(), sessions = new Map();
const c = client(); ['data/practice-modules.js','data/lexical-modules.js','data/vocabulary-library.js','data/packs-1.js','data/packs-2.js','data/packs-3.js','data/packs-4.js','data/packs-5.js','data/packs-6.js'].forEach(c.run);
const lexical = c.LU.practice.all().find(m => c.LU.practice.isGuided(m));
const student = id => ({ id, name: 'QA Student ' + id, active: true, accessCode: 'DEMO-' + id, practice: {}, weeks: weeks(id) });
function weeks(sid) { return Array.from({ length: 15 }, (_, i) => ({ week: i + 1, state: i < 3 ? 'completed' : 'locked', unlocked: i < 3, eligibility: i < 3 ? 'eligible' : '', overall: i < 3 ? 5.5 : null })); }
function session(sid, week) {
  const key = sid + '|' + week;
  if (!sessions.has(key)) sessions.set(key, { status: 'completed', updatedAt: '2026-10-21T00:00:00Z', completedAt: '2026-10-21T00:00:00Z', eligibility: 'eligible', eligibilityNote: '', teacherNote: '', practice: [], recommendedPractice: [], parts: Object.fromEntries(['part1','part2','part3'].map(p => [p, Object.fromEntries(c.LU.CRITERIA.map(cr => [cr.id, { positive:'', improvement:'', note: p === 'part1' && cr.id === 'pronunciation' ? 'asks, think; stress\nrythm' : '' }]))])), marking: Object.fromEntries(c.LU.CRITERIA.map(cr => [cr.id, { band: 6, positive: 'QA positive text', improvement: 'QA improvement text', issues: [] }])) });
  return sessions.get(key);
}
const content = Object.fromEntries(['part1','part2','part3'].map(p => [p,{ topic:'Free Time & Hobbies', examinerScript:'Now, let us talk about your free time.', questions:['What do you do in your free time?','Do you enjoy learning new things?'], cueCard:'Describe an activity you enjoy.', bulletPoints:['what it is','why you enjoy it'] }]));
function api(req) {
  if (req.action === 'teacherLogin') { if (req.passcode !== 'demo') throw Object.assign(Error('Use demo in local QA'), { code:'BAD_CREDENTIALS' }); return { token:'teacher', expiresAt:new Date(Date.now()+3600000).toISOString() }; }
  if (req.action === 'studentLogin') return { token:'student-A', name:'QA Student A', expiresAt:new Date(Date.now()+3600000).toISOString() };
  if (!['teacher','student-A','student-B'].includes(req.token)) throw Object.assign(Error('Invalid local QA session'), { code:'UNAUTHORIZED' });
  if (req.action.includes('Pronunciation')) return service.call(req.action, req);
  if (req.action === 'getTeacherDashboard') return { totalWeeks:15, students:[student('A'),student('B')] };
  if (req.action === 'getMock') return { student:student(req.studentId), content, session:session(req.studentId,Number(req.week)), weeks:weeks(req.studentId), previous:null };
  if (['saveMock','saveDraft','completeMock'].includes(req.action)) {
    const s = Object.assign(session(req.studentId,Number(req.week)), plain(req.data)); s.updatedAt = new Date().toISOString(); s.overall = c.LU.calcOverall(Object.values(s.marking).map(m=>m.band));
    return { session:s, weeks:weeks(req.studentId), nextWeekUnlocked:true, nextWeekNewlyUnlocked:false };
  }
  if (req.action === 'getStudentProgress') {
    const sid = req.token === 'teacher' ? req.studentId : req.token.slice(-1);
    return { name:student(sid).name,totalWeeks:15,currentWeek:3,weeks:weeks(sid),details:Object.fromEntries([1,2,3].map(w=>[w,Object.assign({week:w,overall:6},session(sid,w))])),practice:{assignments:lexical?[{moduleId:lexical.id,type:'recommended',week:1,status:'not_started',order:1,stepsDone:[]}]:[],history:[]} };
  }
  throw Object.assign(Error('Unknown local QA action: '+req.action),{code:'BAD_REQUEST'});
}
const server=http.createServer(async (req,res)=>{
  const url=new URL(req.url,'http://127.0.0.1');
  if(url.pathname==='/__test-api'&&req.method==='POST'){
    let text='';for await(const chunk of req){text+=chunk;if(text.length>200000){res.writeHead(413);res.end();return;}}
    res.setHeader('Content-Type','application/json');
    try{res.end(JSON.stringify({ok:true,data:api(JSON.parse(text))}));}catch(e){res.end(JSON.stringify({ok:false,error:{code:e.code||'SERVER',message:e.message}}));}return;
  }
  const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}
  const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};res.setHeader('Content-Type',types[path.extname(file)]||'text/plain');
  if(url.pathname==='/js/config.js'){res.end(fs.readFileSync(file,'utf8')+'\nwindow.LU_CONFIG.API_URL = location.origin + "/__test-api";\n');return;}
  res.end(fs.readFileSync(file));
});
server.listen(8765,'127.0.0.1',()=>console.log('Isolated QA: http://127.0.0.1:8765 — teacher password: demo; fake students only.'));
