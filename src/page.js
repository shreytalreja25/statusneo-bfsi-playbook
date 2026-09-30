// Interactive behaviour for the playbook page, ported unchanged from the original artifact.
// Runs once after the markup mounts.
export function initPage() {

var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function ul(a){return a.map(function(x){return '<li>'+x+'</li>'}).join('')}
function css(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}

/* ---------- data ---------- */
var LAYERS=[
 {k:"Data Fabric",a:"Like a water treatment plant: every source flows in, only trusted water flows out.",
  what:["Connects scattered systems into one trusted, permission-aware context layer","Lineage on every field: where it came from, when, and who may see it","Agents read from the fabric, never straight from a production system"],
  bank:["Core banking, cards, payments, CRM, GRC and logs in one governed layer","Entitlements follow the data, so an agent sees only what its user may see","Data products with owners, service levels and quality checks"],
  audit:["Every figure an agent used traces to a source and a timestamp","Access decisions are logged, not assumed","Sampling and full-population testing from the same layer"]},
 {k:"Enterprise Brain",a:"Like the veteran who never retires: the bank's meaning, kept current.",
  what:["A living enterprise ontology: products, entities, controls, policies and how they relate","Two routes: write the whole manual, or model only where you diverge from what models already know","Learns from new signals and questions, and flags new divergences"],
  bank:["One definition of a related party or a material exception, shared by every agent","Graph intelligence across customers, accounts, controls and owners","Your people approve every change to the model of the bank"],
  audit:["Versioned definitions, so a past decision reads in the language of its day","Explainable reasoning paths through the graph","Knowledge reuse across audits without copying workpapers"]},
 {k:"Decision Fabric",a:"Like autopilot and the captain: the system flies, the captain holds authority.",
  what:["Value stream maps and KPI trees from board outcome down to the decision beneath it","Every decision classed: agent first, human with AI, or human led","Decision rights and escalation paths set before anything is deployed"],
  bank:["Which credit, fraud or servicing decisions an agent may take, and within what limits","Non-delegable decisions named explicitly","Business owners accountable for each decision class"],
  audit:["Responsibility design becomes a document you can test against","Challenge responsibilities and approval requirements are explicit","Scope creep by an agent shows up as a breach, not a surprise"]},
 {k:"Guardian Governance",a:"Like the card check at every swipe: the rule runs every time, not once a quarter.",
  what:["Policies written as executable rules and enforced at runtime","Scoped identity, PII screening, authority boundaries and human gates","Golden-set evaluation gates before any release"],
  bank:["A payments agent cannot exceed its limit, whatever the prompt says","Customer data screened before it reaches any model","Controls mapped to MAS FEAT principles and internal policy"],
  audit:["Governance intent becomes operational contracts you can inspect","Control failures raised in real time as events","Evidence requirements met by design, not collected afterwards"]},
 {k:"Agent OS",a:"Like signed-for delivery: nothing moves without a receipt.",
  what:["The runtime every agent runs on: tools, memory, permissions and cost","Per-turn tracing and immutable lineage for every action","Token economics through TAPIOD: routing, caching and budgets"],
  bank:["Many agents from many vendors under one operating layer","Human handoff when confidence or authority runs out","AI cost visible per task, per team, per outcome"],
  audit:["Any decision can be reconstructed: inputs, model, policy version, approver","Governance telemetry streams to your monitoring, not a vendor's","Proof that delegated authority was respected, turn by turn"]},
 {k:"Self-Evolution Loop",a:"Like a chef's kitchen: test in the back, taste, then serve, and pull a dish at once if needed.",
  what:["Every improvement tried in a sandbox, then a canary, then released","Release gates tied to evaluation results","Rollback in one step"],
  bank:["Models and prompts improve without surprising customers or regulators","Change windows respected, as with any production release","Drift caught before it becomes an incident"],
  audit:["Change management for AI with the same rigour as for code","A full record of what changed, why, and who approved it","Model risk reviews supplied with evidence, not narrative"]}
];
var FOCUS=[
 {f:"Who owns each AI decision?",d:"Ownership, decision authority, escalation paths and non-delegable decisions, set before deployment.",l:2,
  pts:["Decision Fabric classes every decision as agent first, human with AI, or human led","Non-delegable decisions and escalation paths are set before a line of code","KPI trees tie each decision to a named business owner"],proof:"Delivered by our Decision Fabric consulting practice."},
 {f:"How does policy become something that runs?",d:"Governance intent as executable rules, authority boundaries, human gates and evidence requirements.",l:3,
  pts:["Guardian Governance turns policy into rules enforced at runtime","Authority limits, human gates and evidence requirements live in each stage's contract","Evaluation gates owned by your reviewers"],proof:"Part of the AuthenticAI control rail, shown in chapter 02."},
 {f:"Can we reconstruct how a decision was reached?",d:"Telemetry and traceability that show whether delegated authority was respected.",l:4,
  pts:["Agent OS records every turn: inputs, tools, model, policy version, approver","Immutable lineage from data source to decision","Telemetry streams into your own monitoring and audit tools"],proof:"Per-turn tracing runs in production today, including a bank conversational layer we are building in Southeast Asia."},
 {f:"Does the AI understand our enterprise?",d:"Semantic knowledge, ontology-driven reasoning and graph intelligence.",l:1,
  pts:["Enterprise Brain: a living ontology that stays current as the bank changes","Full ontology where coverage matters, point of divergence where speed matters","Your people approve every change the Brain proposes"],proof:"Led by our Chief AI Advisor, whose work spans knowledge graphs and graph theory."},
 {f:"Can agents work safely inside internal audit?",d:"Governed multi-agent workflows across planning, workpapers, issues and reporting.",l:5,
  pts:["Audit agents run on the full governed loop, not as standalone bots","Every improvement goes through sandbox, canary and release gate","A 90-day path from one workflow to production"],proof:"Try an audit workflow yourself in the simulator, chapter 04."}
];
var LOOP=[
 {t:"Design: decide what AI may decide",a:["Value stream mapping and KPI trees","Decision rights: agent first, human with AI, human led","Non-delegable decisions and escalation paths named up front"],b:["A responsibility design your auditors can test against","A prioritised list of decisions worth delegating"]},
 {t:"Engineer: build it on a governed platform",a:["Forward deployed engineers embedded with your teams","Data Fabric and Enterprise Brain built as the shared foundation","Reusable Playground products instead of one-off code"],b:["Working software in weeks, not a strategy deck","A platform every future agent reuses"]},
 {t:"Automate: run it in production at scale",a:["Agents on Agent OS with scoped identity and budgets","TAPIOD routing, caching and cost control","Human handoff wired in where authority ends"],b:["AI that runs inside real workflows","Cost per decision you can manage"]},
 {t:"Govern: prove it, continuously",a:["Policies as code at runtime, not reviews after the fact","Per-turn tracing and immutable lineage","Sandbox, canary and release gates for every change"],b:["Evidence produced by the system itself","Continuous assurance for risk, audit and regulators"]}
];
var LEVELS=[
 {n:"AI Aware",p:10,s:"Experiments, no shared policy",look:["Teams trying tools on their own","Policy exists on paper only","No view of AI cost or risk"],next:["Turn AI policy into operational contracts","Pick two decisions worth delegating","Stand up the evaluation harness"]},
 {n:"AI Active",p:30,s:"Pilots in pockets",look:["Several pilots, few in production","Each pilot builds its own data plumbing","Governance reviews slow everything down"],next:["A shared Data Fabric slice for the pilots","Golden-set gates so pilots can graduate","First governed agent in production in 90 days"]},
 {n:"AI Operational",p:55,s:"In production, controls manual",look:["Some agents live in workflows","Controls checked by people after the fact","Tracing differs by vendor"],next:["Guardian Governance at runtime","One Agent OS across vendors","Governance telemetry flowing to audit"]},
 {n:"AI Systematic",p:78,s:"A platform, repeatable",look:["A shared platform and pattern library","Governance is part of delivery","Cost tracked per use case"],next:["Enterprise Brain across business lines","Decision Fabric across value streams","Token economics per outcome"]},
 {n:"AI Transformed",p:100,s:"Decisions redesigned around AI",look:["Processes rebuilt around decisions","Humans supervise, agents execute within limits","Continuous assurance in place"],next:["Self-evolution loop with release gates","Ontology kept live by signals and approvals","Board-level decision velocity metrics"]}
];
var YARDS=[
 {t:"Integrate",s:"Every source, batch or streaming",z:0,m:"Core systems, SaaS, files, documents, email, logs and market feeds, in batch, streaming or change data capture.",h:"Connector library plus event streaming, landed into a governed lakehouse with contracts per source.",g:"One place to read from, and no agent ever touching a production system directly."},
 {t:"Quality & observability",s:"Trust scores on every table",z:0,m:"Freshness, completeness, validity and drift for every critical data set.",h:"Rules plus anomaly detection, with data incidents raised and owned like any production incident.",g:"Data you can defend, and quality evidence ready for audit."},
 {t:"Catalog & lineage",s:"Source to report to agent",z:0,m:"Business and technical metadata, and column-level lineage end to end.",h:"Automated harvesting with owners assigned, extended to the prompts and agents that read the data.",g:"Any figure traced back to its source in seconds."},
 {t:"Master & reference data",s:"One customer, one counterparty",z:0,m:"Customers, counterparties, products, legal entities and reference codes.",h:"Entity resolution and survivorship rules, stewarded by your people.",g:"Golden records every model and report agrees on."},
 {t:"Privacy & access",s:"Entitlements that follow the data",z:0,m:"Classification, masking, tokenisation, entitlements and data residency.",h:"Policy as code enforced at query time and again before any model call.",g:"Agents that see only what their user is allowed to see."},
 {t:"Ontology & knowledge graph",s:"The Enterprise Brain",z:1,m:"Products, entities, controls, policies, obligations and how they relate.",h:"Full ontology where you need coverage, point of divergence where you need speed, with your people approving changes.",g:"Explainable reasoning and one shared language for every agent."},
 {t:"Data products & sharing",s:"Owned, versioned, contracted",z:2,m:"Domain data products with owners, service levels and consumers.",h:"Data contracts, versioning and a marketplace for internal sharing.",g:"Reuse across teams instead of copies and extracts."},
 {t:"Analytics & decision intelligence",s:"From KPI tree to dashboard",z:2,m:"BI, KPI trees, self-service and plain-language questions over data.",h:"Semantic layer on the Brain, so every dashboard and every agent uses the same definitions.",g:"Leaders see the decisions behind the numbers."},
 {t:"AI & model operations",s:"Features, evals, drift, evidence",z:2,m:"Features, models, prompts, agents, evaluations and their costs.",h:"Agent Eval Harness, release gates, drift monitoring and TAPIOD cost control.",g:"Model risk evidence produced automatically, release after release."}
];
var SOURCES=["Core banking","Cards & payments","Treasury & markets","Channels & CRM","Risk & GRC","Financial crime","Documents & email","HR & vendors","Logs & telemetry"];
var OUTS=["Governed agents","Decisions","Audit evidence"];
var UC={
 issue:{n:"Audit issue validation",dec:"Is this audit issue ready to close?",own:"Head of Group Audit",data:["Audit issue register","Control test results","Remediation evidence","Change and ticket history"],nd:"Closing high-rated issues",term:"'material exception'",rec:["Evidence complete: recommend closure","Evidence partial: recommend return to owner","Recommend closure with one follow-up"]},
 reg:{n:"Regulatory change impact",dec:"Which controls and owners does this circular affect?",own:"Chief Compliance Officer",data:["Regulatory circulars","Policy library","Control catalogue","Process and system maps"],nd:"Sign-off of the impact assessment",term:"'outsourcing arrangement'",rec:["7 controls and 3 owners affected","2 policies need amendment","No material impact, 1 control to review"]},
 aml:{n:"AML alert triage",dec:"Close, escalate or investigate this alert?",own:"Head of Financial Crime",data:["Monitoring alerts","Customer due diligence","Transaction history","Adverse media"],nd:"Filing a suspicious transaction report",term:"'related party'",rec:["False positive: recommend close","Pattern match: recommend investigate","Unusual counterparty: recommend escalate"]},
 cs:{n:"Customer service assistant",dec:"Can the assistant resolve this request itself?",own:"Head of Consumer Banking",data:["Customer profile","Accounts and cards","Product terms","Complaint history"],nd:"Complaints and fee reversals above limit",term:"'vulnerable customer'",rec:["Resolve: card replacement ordered","Resolve: fee explained and waived within limit","Complaint detected: hand to service officer"]},
 credit:{n:"Credit memo drafting",dec:"Is this credit memo ready for committee?",own:"Chief Credit Officer",data:["Financial statements","Bureau data","Collateral records","Credit policy"],nd:"The credit approval itself",term:"'connected exposure'",rec:["Memo drafted, covenants within policy","Memo drafted, one policy exception flagged","Data gap: collateral valuation missing"]}
};
var AUTH={1:"The agent prepares the case. A person decides every time.",2:"The agent acts alone above the confidence gate and within limits. Everything else goes to a person.",3:"The agent acts within limits. People sample outcomes and own the non-delegable decisions."};
var ACC=[
 {c:"sdlc",tag:"Autonomous testing",n:"TestKraft",d:"Decides what to test, writes the tests, and learns from every escaped defect.",k:[["Test coverage","over 90%"],["Release velocity","20 to 30% faster"],["Escaped defects","25 to 30% fewer"]],m:"Risk-based selection reads the change, its history and the business criticality of each journey, then chooses and writes the tests that matter. We run it as a managed service for a large Australian bank."},
 {c:"sdlc",tag:"Planning agent",n:"SyncAI",d:"Turns intent into plans, stories and acceptance criteria.",k:[["Role","plans the work"],["Stage","discovery to backlog"]],m:"Keeps business intent and the engineering backlog in sync, so every story traces back to the decision it serves."},
 {c:"sdlc",tag:"Test generation",n:"Mason",d:"Generates tests from stories and code changes.",k:[["Role","writes tests"],["Pairs with","TestKraft"]],m:"Writes unit and journey tests as the code is written, so coverage grows with the product rather than after it."},
 {c:"sdlc",tag:"Code review agent",n:"Hunter",d:"Reviews every pull request for defects, security and standards.",k:[["Role","reviews PRs"],["Approval","always a named human"]],m:"Story to code in hours, with humans orchestrating. Every agent action is logged and every merge still needs a named approver."},
 {c:"sdlc",tag:"Quality engineering",n:"Test Centre of Excellence",d:"A testing CoE for a global financial services firm, rebuilt around automation and AI.",k:[["Testing timelines","70% shorter"],["QA cost","25% lower"],["Test scope","40% wider"]],m:"Release preparation effort fell by 30% as regression, data provisioning and environment checks moved from people to pipelines."},
 {c:"gov",tag:"Evaluation",n:"Agent Eval Harness",d:"Golden-set evaluation gates every agent must pass before release.",k:[["Runs on","every change"],["Checks","accuracy, safety, drift"]],m:"Your reviewers define the golden set and the pass bar. The harness runs it on every model, prompt or tool change and records the result as evidence, the same discipline model risk applies to credit models."},
 {c:"gov",tag:"AI economics",n:"TAPIOD",d:"Token economics in production: routing, semantic caching, budgets.",k:[["Visibility","cost per task"],["Control","budgets per team"]],m:"Every call goes through one gateway that picks the right model, reuses answers already paid for, and stops spend at a set limit."},
 {c:"gov",tag:"Security",n:"NeoSecurity",d:"The security layer for agents, prompts and the code they ship.",k:[["Scope","agents and code"],["Mode","continuous"]],m:"Security checks built into the same loop as delivery, so agents are secured as they are built rather than reviewed afterwards."},
 {c:"data",tag:"Documents & decisions",n:"Genesys",d:"Underwriting and document assistant for regulated decisions.",k:[["Cycle time","80% shorter"],["Decision accuracy","97%"],["Audit readiness","100%"]],m:"Reads the file, cites the clause behind every recommendation and leaves the decision with the underwriter. The citation trail is the audit pack."},
 {c:"data",tag:"Knowledge layer",n:"NeoLens",d:"Enterprise knowledge made searchable, cited and permission-aware.",k:[["Answers","with citations"],["Access","follows entitlements"]],m:"Sits on the Enterprise Brain, so people and agents get answers grounded in your own documents, with the source shown every time."},
 {c:"data",tag:"Analytics",n:"NeoAnalytics",d:"Decision intelligence on top of the Data Fabric.",k:[["Built on","one semantic layer"],["Users","leaders and agents"]],m:"The same definitions power dashboards and agents, so the number a leader sees is the number an agent acts on."},
 {c:"plat",tag:"Developer platform",n:"Backstage DevX",d:"Internal developer platform on Backstage, golden paths and service ownership.",k:[["Onboarding time","30 to 40% faster"],["Incident recurrence","over 25% lower"]],m:"We are Backstage's exclusive partner in India and a Top 100 contributor. Golden paths make the secure way the easy way."},
 {c:"plat",tag:"Enterprise platform",n:"Enterprise OS Fabric",d:"The operating fabric that connects enterprise systems, data and agents.",k:[["Pattern","connect once, reuse"],["Runs on","your cloud"]],m:"A reusable backbone so each new agent plugs into existing identity, data and controls instead of building its own."}
];
var PHASES=[
 {w:"Weeks 0 to 2",t:"Responsibility design",p:"Map the workflow, set decision rights, name the decisions that stay with people.",you:["A business owner and an audit lead","Access to process documents and policies","Two workshops of half a day"],we:["Decision Fabric consultant and engagement lead","Value stream map and KPI tree","Draft operational contract"],get:["Signed-off responsibility design","The decisions to delegate, and the ones not to"]},
 {w:"Weeks 3 to 6",t:"Context and ontology",p:"Connect the sources and model only where your language differs from the model's defaults.",you:["Read access to agreed sources","Subject experts for 2 hours a week","Data owners to approve definitions"],we:["Forward deployed data and AI engineers","Data Fabric slice with lineage","Enterprise Brain for the workflow"],get:["Governed data for the use case","Ontology your people approved"]},
 {w:"Weeks 7 to 10",t:"Governed agents",p:"Agents run inside executable policies, human gates and evaluation gates your reviewers set.",you:["Reviewers to define the golden set","Users to test in a sandbox","Risk to agree the gates"],we:["Agents on Agent OS","Guardian Governance policies as code","Agent Eval Harness and TAPIOD"],get:["A working agent in a controlled pilot","Evaluation results against your bar"]},
 {w:"Weeks 11 to 13",t:"Evidence and decision",p:"Reconstruct every decision from the trace, measure the result and decide whether to scale.",you:["Audit to test the evidence","Leadership for the go decision"],we:["Evidence pack and trace walkthroughs","Measured outcomes and cost per decision","Scale plan for the next workflows"],get:["A production decision backed by evidence","A reusable pattern for the next agent"]}
];

/* ---------- hero orbit ---------- */
(function(){
 var g=$('#orbitNodes'),NS='http://www.w3.org/2000/svg',words=["Design","Engineer","Automate","Govern"],els=[];
 words.forEach(function(w,i){
  var a=-Math.PI/2+i*Math.PI/2,x=230+170*Math.cos(a),y=230+170*Math.sin(a);
  var c=document.createElementNS(NS,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',9);c.setAttribute('class','o-node');g.appendChild(c);
  var t=document.createElementNS(NS,'text');var dx=Math.cos(a),dy=Math.sin(a);
  t.setAttribute('x',x+dx*22);t.setAttribute('y',y+dy*26+4);t.setAttribute('text-anchor',Math.abs(dx)<.1?'middle':(dx>0?'start':'end'));t.setAttribute('class','o-lab');t.textContent=w.toUpperCase();g.appendChild(t);
  els.push([c,t]);
 });
 var i=0;function tick(){els.forEach(function(e,j){e[0].classList.toggle('on',j===i);e[1].classList.toggle('on',j===i)});i=(i+1)%4}
 tick();if(!RM)setInterval(tick,1800);
})();

/* ---------- 01 focus ---------- */
var list=$('#focusList'),ans=$('#answer');
function showFocus(i){
 $$('.focus',list).forEach(function(b,j){b.classList.toggle('on',i===j);b.setAttribute('aria-pressed',i===j)});
 var F=FOCUS[i],L=LAYERS[F.l];
 ans.classList.remove('fade');void ans.offsetWidth;ans.classList.add('fade');
 ans.innerHTML='<span class="eyebrow">Answered by</span><span class="layer">'+L.k+' <em>Stage '+(F.l+1)+' of 6</em></span><ul>'+ul(F.pts)+'</ul><p class="proof">'+F.proof+'</p><button class="btn" data-go style="justify-self:start">Open this stage in the Playground →</button>';
 $('[data-go]',ans).onclick=function(){setLayer(F.l);$('#playground').scrollIntoView()};
}
FOCUS.forEach(function(F,i){var b=document.createElement('button');b.className='focus';b.innerHTML='<b>'+F.f+'</b><span>'+F.d+'</span>';b.onclick=function(){showFocus(i)};list.appendChild(b)});
showFocus(0);

/* ---------- 02 loop, rail, maturity ---------- */
function showLoop(i){
 $$('.lstep').forEach(function(b,j){b.classList.toggle('on',i===j)});
 var L=LOOP[i],d=$('#loopDetail');d.classList.remove('fade');void d.offsetWidth;d.classList.add('fade');
 d.innerHTML='<div><span class="eyebrow">What we do</span><h3 style="margin-top:6px">'+L.t+'</h3><ul>'+ul(L.a)+'</ul></div><div><span class="eyebrow">What you get</span><ul style="margin-top:34px">'+ul(L.b)+'</ul></div>';
}
$$('.lstep').forEach(function(b){b.onclick=function(){showLoop(+b.dataset.i)}});showLoop(0);

$('#railBtn').onclick=function(){
 var gs=$$('.gate'),btn=this;btn.disabled=true;
 gs.forEach(function(g){g.classList.remove('lit');$('i',g).hidden=true});
 gs.forEach(function(g,i){setTimeout(function(){g.classList.add('lit');$('i',g).hidden=false;if(i===gs.length-1)btn.disabled=false},RM?0:i*420+150)});
};

var ml=$('#mlevels');
LEVELS.forEach(function(L,i){var b=document.createElement('button');b.className='mlev';b.innerHTML='<span class="lv">L'+(i+1)+'</span><div><b>'+L.n+'</b><small>'+L.s+'</small><div class="bar" style="margin-top:6px"><i style="width:'+L.p+'%"></i></div></div>';b.onclick=function(){showLevel(i)};ml.appendChild(b)});
function showLevel(i){
 $$('.mlev').forEach(function(b,j){b.classList.toggle('on',i===j)});
 var L=LEVELS[i],o=$('#mout');o.classList.remove('fade');void o.offsetWidth;o.classList.add('fade');
 o.innerHTML='<span class="eyebrow">Level '+(i+1)+' of 5</span><h3>'+L.n+'</h3><div class="cols"><div><span class="eyebrow">What it looks like</span><ul>'+ul(L.look)+'</ul></div><div><span class="eyebrow">What we would do next</span><ul>'+ul(L.next)+'</ul></div></div>';
}
showLevel(2);

/* ---------- 03 nine yards ---------- */
var yw=$('#yards'),yardSel=-1,srcSel=-1;
YARDS.forEach(function(Y,i){var b=document.createElement('button');b.className='yard';b.innerHTML='<span class="yn">'+(i+1)+'</span><b>'+Y.t+'</b><span>'+Y.s+'</span>';b.onclick=function(){showYard(i)};yw.appendChild(b)});
function showYard(i){
 yardSel=i;srcSel=-1;$$('.yard').forEach(function(b,j){b.classList.toggle('on',i===j)});
 var Y=YARDS[i],d=$('#ydetail');d.classList.remove('fade');void d.offsetWidth;d.classList.add('fade');
 d.innerHTML='<div><h4>Yard '+(i+1)+' · What we manage</h4><p>'+Y.m+'</p></div><div><h4>How we do it</h4><p>'+Y.h+'</p></div><div><h4>What you get</h4><p>'+Y.g+'</p></div>';
 $('#flowCap').textContent='Yard '+(i+1)+', '+Y.t+': highlighted in the '+["Data Fabric","Enterprise Brain","outputs"][Y.z];
 if(RM)drawFlow(0);
}
showYard(0);

var cv=$('#flow'),ctx=cv.getContext('2d'),W=0,H=0,DPR=1,P=[],geo=null,col={};
function readCol(){col={ink:css('--ink'),muted:css('--muted'),line:css('--line'),y:css('--yellow'),r:css('--red'),paper:css('--paper'),inv:css('--invert-bg'),invf:css('--invert-fg'),card:css('--card')}}
function layout(){
 DPR=window.devicePixelRatio||1;var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
 var narrow=W<560,top=22,bot=H-22;ctx.font='600 '+(narrow?10:12)+'px Montserrat, system-ui, sans-serif';var lw=18+Math.max.apply(null,SOURCES.map(function(s){return ctx.measureText(narrow?s.split(' ')[0]:s).width}));
 var srcY=SOURCES.map(function(_,i){return top+(bot-top)*i/(SOURCES.length-1)});
 var fx=narrow?W*0.42:W*0.40,bx=narrow?W*0.62:W*0.62,ox=W-(narrow?96:150);
 geo={narrow:narrow,sx:lw,srcY:srcY,fx:fx,fTop:top,fBot:bot,bx:bx,by:H/2,ox:ox,outY:OUTS.map(function(_,i){return H/2+(i-1)*(narrow?96:110)})};
}
function bez(p0,p1,p2,t){var u=1-t;return u*u*p0+2*u*t*p1+t*t*p2}
function spawn(){
 var s=Math.floor(Math.random()*SOURCES.length),o=Math.floor(Math.random()*3);
 P.push({s:s,o:o,t:0,v:0.0035+Math.random()*0.003,fy:geo.fTop+Math.random()*(geo.fBot-geo.fTop)});
}
function pos(p){
 var g=geo,t=p.t;
 if(t<0.4){var k=t/0.4;return [bez(g.sx,(g.sx+g.fx)/2,g.fx,k),bez(g.srcY[p.s],g.srcY[p.s],p.fy,k)]}
 if(t<0.7){var k2=(t-0.4)/0.3;return [bez(g.fx,(g.fx+g.bx)/2,g.bx,k2),bez(p.fy,g.by,g.by,k2)]}
 var k3=(t-0.7)/0.3;return [bez(g.bx,(g.bx+g.ox)/2,g.ox,k3),bez(g.by,g.outY[p.o],g.outY[p.o],k3)];
}
function hot(z){return yardSel>=0&&YARDS[yardSel].z===z}
function drawFlow(dt){
 var g=geo;ctx.clearRect(0,0,W,H);
 var fs=g.narrow?10:12;ctx.font='600 '+fs+'px Montserrat, system-ui, sans-serif';ctx.textBaseline='middle';
 // curves
 ctx.lineWidth=1;
 g.srcY.forEach(function(y,i){ctx.strokeStyle=(srcSel===i)?col.r:col.line;ctx.lineWidth=srcSel===i?2:1;ctx.beginPath();ctx.moveTo(g.sx,y);ctx.quadraticCurveTo((g.sx+g.fx)/2,y,g.fx,y);ctx.stroke()});
 ctx.lineWidth=1;ctx.strokeStyle=col.line;
 g.outY.forEach(function(y){ctx.beginPath();ctx.moveTo(g.bx,g.by);ctx.quadraticCurveTo((g.bx+g.ox)/2,y,g.ox,y);ctx.stroke()});
 // source labels
 ctx.textAlign='right';
 SOURCES.forEach(function(s,i){ctx.fillStyle=srcSel===i?col.ink:col.muted;ctx.fillText(g.narrow?s.split(' ')[0]:s,g.sx-10,g.srcY[i]);ctx.beginPath();ctx.fillStyle=srcSel===i?col.r:col.ink;ctx.arc(g.sx-3,g.srcY[i],3,0,7);ctx.fill()});
 // fabric bar
 var fw=g.narrow?16:22;ctx.fillStyle=hot(0)?col.y:col.inv;ctx.fillRect(g.fx-fw/2,g.fTop-8,fw,g.fBot-g.fTop+16);
 ctx.save();ctx.translate(g.fx,H/2);ctx.rotate(-Math.PI/2);ctx.textAlign='center';ctx.fillStyle=hot(0)?'#111':col.invf;ctx.font='800 '+(g.narrow?9:11)+'px Montserrat, system-ui, sans-serif';ctx.fillText('DATA FABRIC',0,1);ctx.restore();
 // brain
 var br=g.narrow?30:40;ctx.beginPath();ctx.arc(g.bx,g.by,br,0,7);ctx.fillStyle=hot(1)?col.y:col.paper;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=hot(1)?col.y:col.ink;ctx.stroke();
 ctx.textAlign='center';ctx.fillStyle=hot(1)?'#111':col.ink;ctx.font='800 '+(g.narrow?9:11)+'px Montserrat, system-ui, sans-serif';ctx.fillText('ENTERPRISE',g.bx,g.by-6);ctx.fillText('BRAIN',g.bx,g.by+8);
 // outputs
 ctx.font='700 '+fs+'px Montserrat, system-ui, sans-serif';ctx.textAlign='left';
 g.outY.forEach(function(y,i){ctx.beginPath();ctx.arc(g.ox,y,7,0,7);ctx.fillStyle=hot(2)?col.y:col.r;ctx.fill();ctx.fillStyle=col.ink;var lbl=OUTS[i];if(g.narrow){var w=lbl.split(' ');ctx.fillText(w[0],g.ox+13,y-(w.length>1?7:0));if(w[1])ctx.fillText(w[1],g.ox+13,y+7)}else ctx.fillText(lbl,g.ox+14,y)});
 // particles
 if(!RM){
  if(P.length<(g.narrow?45:80)&&Math.random()<0.6)spawn();
  for(var i=P.length-1;i>=0;i--){var p=P[i];p.t+=p.v*dt;if(p.t>=1){P.splice(i,1);continue}
   var xy=pos(p),lit=srcSel<0||srcSel===p.s;ctx.beginPath();ctx.arc(xy[0],xy[1],lit?2.8:1.8,0,7);ctx.fillStyle=lit?(p.o===1?col.y:col.r):col.line;ctx.globalAlpha=lit?1:.6;ctx.fill();ctx.globalAlpha=1}
 }
}
var last=0;function loop(ts){var dt=last?Math.min(3,(ts-last)/16.7):1;last=ts;drawFlow(dt);requestAnimationFrame(loop)}
function initFlow(){readCol();layout();if(RM)drawFlow(0);else requestAnimationFrame(loop)}
cv.addEventListener('click',function(e){
 var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 if(x<geo.fx-20){var best=-1,bd=99;geo.srcY.forEach(function(sy,i){var d=Math.abs(sy-y);if(d<bd){bd=d;best=i}});
  srcSel=(srcSel===best)?-1:best;yardSel=-1;$$('.yard').forEach(function(b){b.classList.remove('on')});
  $('#flowCap').textContent=srcSel<0?'Nine source families flowing through one governed fabric':SOURCES[srcSel]+': governed, lineage attached, masked before any model sees it';
  if(RM)drawFlow(0);}
});
window.addEventListener('resize',function(){layout();if(RM)drawFlow(0)});
if(window.matchMedia){matchMedia('(prefers-color-scheme: dark)').addEventListener&&matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){readCol();if(RM)drawFlow(0)})}
new MutationObserver(function(){readCol();if(RM)drawFlow(0)}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){layout();if(RM)drawFlow(0)});
initFlow();

/* ---------- 04 simulator ---------- */
var st={uc:'issue',a:2,thr:85},T={n:0,a:0,h:0,c:0},running=false;
var ucs=$('#ucs');
Object.keys(UC).forEach(function(k){var b=document.createElement('button');b.className='uc';b.dataset.k=k;b.textContent=UC[k].n;b.onclick=function(){setUC(k)};ucs.appendChild(b)});
function setUC(k){st.uc=k;resetT();renderBP()}
$$('#seg button').forEach(function(b){b.onclick=function(){st.a=+b.dataset.a;renderBP()}});
$('#thr').oninput=function(){st.thr=+this.value;renderBP()};
function renderBP(){
 var U=UC[st.uc];
 $$('.uc').forEach(function(b){b.classList.toggle('on',b.dataset.k===st.uc)});
 $$('#seg button').forEach(function(b){b.classList.toggle('on',+b.dataset.a===st.a)});
 $('#segNote').textContent=AUTH[st.a];$('#thrV').textContent=st.thr+'%';
 $('#bpTitle').textContent=U.n;$('#bpDecision').textContent='Decision: '+U.dec;
 $('#bpData').innerHTML=ul(U.data);
 var hm=[];
 if(st.a===1)hm.push('A named reviewer decides every case');
 else hm.push('A named reviewer takes every case below '+st.thr+'% confidence');
 hm.push('Always human: '+U.nd.toLowerCase());
 if(st.a===3)hm.push('10% of agent outcomes sampled for review');
 hm.push('Owner accountable: '+U.own);
 $('#bpHuman').innerHTML=ul(hm);
 var auto=['human_led','human_plus_ai','agent_first'][st.a-1];
 function kv(k,v){return '<span class="k">'+k+':</span> <span class="v">'+v+'</span>\n'}
 $('#contract').innerHTML=kv('contract',st.uc.replace(/^/,'')+'-v1')+kv('owner',U.own)+kv('decision','"'+U.dec+'"')+kv('autonomy',auto)+kv('confidence_gate',st.a===1?'n/a (human decides)':(st.thr/100).toFixed(2))+kv('non_delegable','["'+U.nd+'"]')+kv('data_scope','['+U.data.length+' governed sources, read only]')+kv('controls','[scoped_identity, pii_screening, policy_as_code,\n           golden_set_eval, per_turn_trace, immutable_lineage]')+kv('human_gate',st.a===1?'every case':'confidence < gate OR non_delegable')+(st.a===3?kv('sampling','10% post-action review'):'')+kv('evidence','sealed trace per decision, kept per bank policy');
}
function resetT(){T={n:0,a:0,h:0,c:0};paintT();$('#trace').innerHTML='<div class="dim">› Ready. Press "Run one decision" to watch a case move through the governed loop.</div>'}
function paintT(){$('#tN').textContent=T.n;$('#tA').textContent=T.a;$('#tH').textContent=T.h;$('#tC').textContent='$'+(T.n?(T.c/T.n):0).toFixed(3);var t=T.n||1;$('#sA').style.width=(T.a/t*100)+'%';$('#sH').style.width=(T.h/t*100)+'%'}
function hex(){var s='0x';for(var i=0;i<10;i++)s+='0123456789abcdef'[Math.floor(Math.random()*16)];return s}
function decide(){
 var U=UC[st.uc],conf=Math.round((0.6+Math.random()*0.38)*100)/100,nd=Math.random()<0.12,cache=Math.random()<0.35,cost=cache?0.001:(0.008+Math.random()*0.03);
 var recI=Math.floor(Math.random()*U.rec.length),human=false,why='';
 if(st.a===1){human=true;why='Human led: routed to named reviewer'}
 else if(nd){human=true;why='Non-delegable ('+U.nd.toLowerCase()+'): routed to '+U.own}
 else if(conf*100<st.thr){human=true;why='Below the '+st.thr+'% gate: routed to named reviewer'}
 else why=st.a===3?'Actioned within limits, queued for 10% sample review':'Actioned within limits';
 return {U:U,conf:conf,nd:nd,cache:cache,cost:cost,rec:U.rec[recI],human:human,why:why,id:'#'+(10000+Math.floor(Math.random()*89999))};
}
function lines(d){
 return [
  ['dim','› Case '+d.id+' received · '+d.U.n.toLowerCase()],
  ['','  Data Fabric     '+d.U.data.length+' sources read · lineage attached'],
  ['','  Enterprise Brain resolved '+d.U.term+' to bank definition v3.2'],
  ['g','  Guardian        identity scoped ✓  PII masked ✓  policy ✓'],
  ['','  Agent OS        model routed by TAPIOD · '+(d.cache?'cache hit':'cache miss')+' · $'+d.cost.toFixed(3)],
  ['','  Recommendation  '+d.rec+' · confidence '+d.conf.toFixed(2)],
  [d.human?'esc':'g','  Decision gate   '+d.why],
  ['dim','  Trace sealed    '+hex()+' · reconstructable']
 ];
}
function tallyAdd(d){T.n++;T.c+=d.cost;if(d.human)T.h++;else T.a++;paintT()}
$('#run1').onclick=function(){
 if(running)return;running=true;var d=decide(),L=lines(d),tr=$('#trace');tr.innerHTML='';
 L.forEach(function(l,i){setTimeout(function(){var e=document.createElement('div');if(l[0])e.className=l[0];e.textContent=l[1];tr.appendChild(e);if(i===L.length-1){tallyAdd(d);running=false}},RM?0:i*320)});
};
$('#run20').onclick=function(){
 if(running)return;var tr=$('#trace');tr.innerHTML='';var out=[];
 for(var i=0;i<20;i++){var d=decide();tallyAdd(d);out.push(d)}
 var a=out.filter(function(d){return !d.human}).length;
 [['dim','› Ran 20 cases · '+UC[st.uc].n.toLowerCase()],['g','  '+a+' actioned by the agent within limits'],['esc','  '+(20-a)+' routed to a person (gate, non-delegable or human led)'],['','  Every one of the 20 traces sealed and reconstructable'],['dim','  Try moving the confidence gate or the authority level, then run again']].forEach(function(l){var e=document.createElement('div');if(l[0])e.className=l[0];e.textContent=l[1];tr.appendChild(e)});
};
$('#reset').onclick=resetT;
setUC('issue');

/* ---------- 05 playground ring ---------- */
var svg=$('#ring'),NS='http://www.w3.org/2000/svg',cx=210,cy=210,R=150,cur=0,tab='what',nodes=[],run;
function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
svg.appendChild(el('circle',{cx:cx,cy:cy,r:R,'class':'ring-track'}));
var circ=2*Math.PI*R;run=el('circle',{cx:cx,cy:cy,r:R,'class':'ring-run',transform:'rotate(-90 '+cx+' '+cy+')','stroke-dasharray':circ,'stroke-dashoffset':circ});svg.appendChild(run);
svg.appendChild(el('circle',{cx:cx,cy:cy,r:74,'class':'ring-center'}));
var t1=el('text',{x:cx,y:cy-2,'text-anchor':'middle','class':'ring-center-t'});t1.textContent='Governed loop';svg.appendChild(t1);
var t2=el('text',{x:cx,y:cy+16,'text-anchor':'middle','class':'ring-center-s'});t2.textContent='every stage has a contract';svg.appendChild(t2);
LAYERS.forEach(function(L,i){
 var ang=-Math.PI/2+i*(Math.PI*2/6),x=cx+R*Math.cos(ang),y=cy+R*Math.sin(ang);
 var g=el('g',{'class':'node',tabindex:0,role:'button','aria-label':L.k});
 g.appendChild(el('circle',{cx:x,cy:y,r:46,'class':'bg'}));
 var n=el('text',{x:x,y:y-12,'text-anchor':'middle','class':'n'});n.textContent='0'+(i+1);g.appendChild(n);
 var w=L.k.split(' ');w.forEach(function(s,j){var t=el('text',{x:x,y:y+4+j*14-(w.length-1)*4,'text-anchor':'middle'});t.textContent=s;g.appendChild(t)});
 g.onclick=function(){stopPlay();setLayer(i)};g.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();stopPlay();setLayer(i)}};
 svg.appendChild(g);nodes.push(g);
});
function render(){
 var L=LAYERS[cur];$('#pgEyebrow').textContent='Stage 0'+(cur+1)+' of 06';$('#pgTitle').textContent=L.k;$('#pgAnalogy').textContent=L.a;
 var b=$('#pgBody');b.innerHTML='<ul class="fade">'+ul(L[tab])+'</ul>';
 nodes.forEach(function(n,i){n.classList.toggle('on',i===cur)});
 run.setAttribute('stroke-dashoffset',circ*(1-(cur+1)/6));
}
function setLayer(i){cur=(i+6)%6;render()}
$$('.tab').forEach(function(b){b.onclick=function(){$$('.tab').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-selected','false')});b.classList.add('on');b.setAttribute('aria-selected','true');tab=b.dataset.t;render()}});
$('#prevL').onclick=function(){stopPlay();setLayer(cur-1)};$('#nextL').onclick=function(){stopPlay();setLayer(cur+1)};
var playT=null;function stopPlay(){if(playT){clearInterval(playT);playT=null;$('#playL').textContent='▶ Play the loop'}}
$('#playL').onclick=function(){if(playT){stopPlay();return}setLayer(0);this.textContent='❚❚ Pause';playT=setInterval(function(){if(cur===5){stopPlay();return}setLayer(cur+1)},2600)};
render();


/* ---------- 05 FDE ---------- */
(function(){
 var track=$('#track'),stns=$$('.stn',track),mode='hand',timers=[],podSteps=$$('#podSteps span');
 var ROLES=[
  {a:'FDE',n:'Forward deployed engineer',s:'Discovery to production',d:'Sits with your team, hears the problem first hand, builds the agent and ships it. Holds the whole thread so nothing is handed over.'},
  {a:'DF',n:'Decision Fabric consultant',s:'Value streams and decision rights',d:'Pairs with the FDE. Maps the value stream, builds the KPI tree and agrees which decisions the agent may take and which stay with people.'},
  {a:'AI',n:'AI and data engineer',s:'Data Fabric and Enterprise Brain',d:'Connects the sources, models the ontology where you diverge, and wires lineage from data to decision.'},
  {a:'QE',n:'Quality engineer',s:'TestKraft and evaluation gates',d:'Sets up autonomous testing and the golden-set evaluation your reviewers own, so every release carries its own evidence.'},
  {a:'1.7K',n:'Reach-back bench',s:'1,753 consultants at our hubs',d:'Specialists in cloud, security, SRE, design and platforms pulled in for days or weeks as needed, without growing the pod.'}
 ];
 var rw=$('#roles');
 ROLES.forEach(function(R,i){var b=document.createElement('button');b.className='role';b.innerHTML='<span class="av">'+R.a+'</span><div><b>'+R.n+'</b><small>'+R.s+'</small></div>';b.onclick=function(){showRole(i)};rw.appendChild(b)});
 function showRole(i){$$('.role').forEach(function(b,j){b.classList.toggle('on',i===j)});var o=$('#roleOut');o.classList.remove('fade');void o.offsetWidth;o.classList.add('fade');o.textContent=ROLES[i].d}
 showRole(0);
 function clear(){timers.forEach(function(t){clearTimeout(t);clearInterval(t)});timers=[]}
 function later(f,ms){timers.push(setTimeout(f,RM?0:ms))}
 function runHand(){
  clear();track.classList.remove('fde');$('#raceTitle').textContent='The usual way: six handoffs';
  stns.forEach(function(s){s.classList.remove('on');$('.loss',s).classList.remove('show')});
  $('#mHand').textContent='0';$('#mShip').textContent='0';$('#mTime').textContent='Waiting';$('#mBar').style.width='0';
  stns.forEach(function(s,i){later(function(){s.classList.add('on');if(i>0){stns[i-1].classList.remove('on');$('.loss',stns[i-1]).classList.add('show');$('#mHand').textContent=i}$('#mBar').style.width=((i+1)/6*100)+'%';if(i===5){later(function(){s.classList.remove('on');$('.loss',s).classList.add('show');$('#mHand').textContent='6';$('#mTime').textContent='Months, often never';},900)}},i*900)});
 }
 function runFde(){
  clear();track.classList.add('fde');$('#raceTitle').textContent='The StatusNeo way: zero handoffs';
  $('#mHand').textContent='0';$('#mShip').textContent='0';$('#mTime').textContent='6 to 8 weeks';$('#mBar').style.width='22%';
  var k=0,ships=0;
  function step(){podSteps.forEach(function(p,j){p.classList.toggle('on',j===k%5)});if(k%5===3){ships++;$('#mShip').textContent=ships}k++}
  step();if(!RM)timers.push(setInterval(step,700));else{$('#mShip').textContent='Every sprint'}
 }
 $$('.fde-mode button').forEach(function(b){b.onclick=function(){$$('.fde-mode button').forEach(function(x){x.classList.toggle('on',x===b)});mode=b.dataset.m;mode==='fde'?runFde():runHand()}});
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();runHand();later(function(){if(mode==='hand'){$$('.fde-mode button')[1].click()}},7600)}},{threshold:.4});io.observe(track)}else runHand();
 // hyperscaler particles
 var g=$('#hyP'),NS='http://www.w3.org/2000/svg',paths=$$('#hyper .hy-line').map(function(p){return p});
 if(!RM&&paths[0].getTotalLength){
  var parts=[];
  function add(){var inb=Math.random()<.5,pi=inb?Math.floor(Math.random()*2):2+Math.floor(Math.random()*3);var c=document.createElementNS(NS,'circle');c.setAttribute('r',3.5);c.setAttribute('class',pi<2?'hy-p':'hy-p2');g.appendChild(c);parts.push({c:c,p:paths[pi],L:paths[pi].getTotalLength(),t:0,v:.006+Math.random()*.006})}
  (function tick(){if(parts.length<14&&Math.random()<.12)add();for(var i=parts.length-1;i>=0;i--){var q=parts[i];q.t+=q.v;if(q.t>=1){g.removeChild(q.c);parts.splice(i,1);continue}var pt=q.p.getPointAtLength(q.t*q.L);q.c.setAttribute('cx',pt.x);q.c.setAttribute('cy',pt.y)}requestAnimationFrame(tick)})();
 }
})();

/* ---------- 06 accelerators ---------- */
var accW=$('#acc');
ACC.forEach(function(A){var b=document.createElement('button');b.className='acc-card';b.dataset.c=A.c;
 b.innerHTML='<span class="tag">'+A.tag+'</span><h3>'+A.n+'</h3><p>'+A.d+'</p><div class="kpis">'+A.k.map(function(k){return '<div class="kpi"><span>'+k[0]+'</span><b>'+k[1]+'</b></div>'}).join('')+'</div><span class="hint">+ How it works</span><span class="more">'+A.m+'</span>';
 b.onclick=function(){b.classList.toggle('open')};accW.appendChild(b)});
function filt(wrap,items,key){$$('.f',wrap).forEach(function(f){f.onclick=function(){$$('.f',wrap).forEach(function(x){x.classList.toggle('on',x===f)});var v=f.dataset[key];items().forEach(function(it){it.hidden=!(v==='all'||it.dataset[key]===v)})}})}
filt($('#accF'),function(){return $$('.acc-card')},'c');
filt($('#bankF'),function(){return $$('.bank')},'r');

/* ---------- 09 team ---------- */
$$('.flip').forEach(function(f){f.onclick=function(){f.classList.toggle('on')}});

/* ---------- 10 plan ---------- */
var plan=$('#plan');
PHASES.forEach(function(P,i){var b=document.createElement('button');b.className='phase';b.innerHTML='<span class="wk">'+P.w+'</span><h3>'+P.t+'</h3><p>'+P.p+'</p>';b.onclick=function(){showPhase(i)};plan.appendChild(b)});
function showPhase(i){$$('.phase').forEach(function(b,j){b.classList.toggle('on',i===j)});var P=PHASES[i],r=$('#raci');r.classList.remove('fade');void r.offsetWidth;r.classList.add('fade');
 r.innerHTML='<div><h4>You bring</h4><ul>'+ul(P.you)+'</ul></div><div><h4>We bring</h4><ul>'+ul(P.we)+'</ul></div><div><h4>You leave with</h4><ul>'+ul(P.get)+'</ul></div>'}
showPhase(0);
$$('.cand').forEach(function(c){c.onclick=function(){setUC(c.dataset.uc);$('#build').scrollIntoView()}});

/* ---------- counters, nav ---------- */
if(!RM&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,end=+el.dataset.count,suf=el.dataset.suf||'',t0=performance.now();
  function f(t){var k=Math.min(1,(t-t0)/1200),v=Math.round(end*(1-Math.pow(1-k,3)));el.textContent=v.toLocaleString('en-US')+suf;if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)})},{threshold:.6});
 $$('[data-count]').forEach(function(e){io.observe(e)});
}
var links=$$('#nav a'),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}),prog=$('#prog');
function spy(){var y=window.scrollY+120,idx=-1;secs.forEach(function(s,i){if(s&&s.offsetTop<=y)idx=i});
 links.forEach(function(a,i){a.classList.toggle('on',i===idx)});
 var on=links[idx];if(on&&on.scrollIntoView&&on.parentNode.scrollWidth>on.parentNode.clientWidth){var n=on.parentNode;n.scrollLeft=on.offsetLeft-n.clientWidth/2+on.offsetWidth/2}
 var h=document.documentElement.scrollHeight-innerHeight;prog.style.width=(h>0?scrollY/h*100:0)+'%'}
window.addEventListener('scroll',spy,{passive:true});spy();

}
