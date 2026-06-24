function switchTab(idx){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
  document.querySelectorAll('.tab-content').forEach((c,i)=>c.classList.toggle('active',i===idx));
  window.scrollTo({top:0,behavior:'smooth'});
  // Reset track tabs when switching main tabs
  ['approach','scaling'].forEach(g=>{
    const first=document.getElementById(g+'-A');
    if(first){['A','B','C'].forEach(id=>{
      const el=document.getElementById(g+'-'+id);
      if(el)el.classList.toggle('active',id==='A');
    });}
    const tabsEl=document.getElementById(g+'Tabs');
    if(tabsEl)tabsEl.querySelectorAll('.track-tab').forEach((t,i)=>t.classList.toggle('active',i===0));
  });
}

function switchTabNav(navIdx,sectionIdx){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===navIdx));
  var sections=document.querySelectorAll('.tab-content');
  sections.forEach((c,i)=>c.classList.toggle('active',i===sectionIdx));
  window.scrollTo({top:0,behavior:'smooth'});
}
function toggleArchLayer(key){
  var body=document.getElementById('layer-'+key+'-body');
  var header=body.previousElementSibling;
  var toggle=header.querySelector('.arch-toggle');
  var isOpen=body.style.display!=='none';
  body.style.display=isOpen?'none':'block';
  if(toggle)toggle.textContent=isOpen?'+':'−';
  var br=header.style.borderRadius;
  header.style.borderRadius=isOpen?'10px':'10px 10px 0 0';
}

function switchTabTrack(navIdx,sectionIdx,group,track){
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===navIdx));
  var sections=document.querySelectorAll('.tab-content');
  sections.forEach((c,i)=>c.classList.toggle('active',i===sectionIdx));
  // Toggle approach vs tech platform hero based on active track
  var approachHero=document.getElementById('approach-hero');
  var tpHero=document.getElementById('techplatform-hero');
  if(approachHero){approachHero.style.display=(track==='A'?'':'none');}
  if(tpHero){tpHero.style.display=(track==='B'?'':'none');}
  setTimeout(function(){ switchTrack(group,track); },0);
  window.scrollTo({top:0,behavior:'smooth'});
}
function switchUcArch(id){
  ['orchestration','media','innovation','insights'].forEach(function(uc){
    var el=document.getElementById('ucArch-'+uc);
    if(el)el.style.display='none';
  });
  var target=document.getElementById('ucArch-'+id);
  if(target){target.style.display='block';}
  document.querySelectorAll('.uc-chip').forEach(function(c){
    c.classList.toggle('active',c.getAttribute('data-uc')===id);
  });
}
function switchTrack(group,track){
  const tabsEl=document.getElementById(group+'Tabs');
  const ids=group==='approach'?['A','B','C','D']:['A','B','C','G'];
  tabsEl.querySelectorAll('.track-tab').forEach((t,i)=>{
    t.classList.toggle('active',ids[i]===track);
  });
  ids.forEach(id=>{
    const el=document.getElementById(group+'-'+id);
    if(el)el.classList.toggle('active',id===track);
  });
}

function showCase(id){
  document.querySelectorAll('.case-study').forEach(c=>c.classList.remove('active'));
  document.querySelectorAll('.client-card').forEach(c=>c.classList.remove('active-card'));
  const cs=document.getElementById('case-'+id);
  if(cs){cs.classList.add('active');setTimeout(()=>cs.scrollIntoView({behavior:'smooth',block:'nearest'}),50);}
}

// Base data from 2026_06_01_AIM RFP Business Case.xlsx (updated)
// Note: Agentic Commerce row is a PLACEHOLDER — to be validated with Aileen/MDPs
// BCG Consulting costs ($55M = Y1+Y2) need to be verified per scenario after pricing Excel finalized
// All values sourced directly from 2026_06_01_AIM RFP Business Case.xlsx
// Totals (sales/savings/nopbt/costs/net) are exact Excel values and include Agentic Commerce
// Sub-lines (innov/mediaOrch/content/nwSav/sgaSav) are used for slider sensitivity only
const BC={
  s1:{
    // Excel 2026_06_18_AIM RFP Business Case - AH.xlsx (Submitted), Scenario 1 (Brazil, Mexico, UK)
    // costs = Row 67 (SUM of rows 65+66); Row 88 excluded — its SUM(E68:E82) double-counts RoW tech via Row 74 (=SUM(E71:E73))
    sales:    [25.83,  247.40,  774.82,  1953.94, 2917.36],
    savings:  [8.00,   61.00,   157.36,  328.13,  375.96],
    nopbt:    [11.62,  95.64,   265.84,  601.69,  784.40],
    costs:    [53.20,  24.81,   23.09,   18.00,   16.52],
    net:      [-41.58, 70.82,   242.75,  583.70,  767.89],
    innov:    [0,      21.06,   133.88,  236.40,  250.45],
    mediaOrch:[16.02,  51.76,   92.82,   99.85,   107.39],
    content:  [6.87,   14.79,   39.78,   42.79,   46.02],
    agentCom: [2.95,   10.08,   19.08,   22.91,   28.55],
    nwSav:    [8.00,   16.01,   40.02,   40.02,   40.02],
    sgaSav:   [0,      2.46,    7.02,    7.02,    7.02],
    bcgFee:   [37.92,  10.08,   0,       0,       0],
    label:    'Scenario 1: Brazil, Mexico, UK as pilot markets'
  },
  s2:{
    // Excel 2026_06_18_AIM RFP Business Case - AH.xlsx (Submitted), Scenario 2 (USA, UK, Brazil)
    sales:    [151.43, 501.64,  1580.35, 2556.14, 3038.76],
    savings:  [45.48,  118.74,  303.30,  360.31,  378.01],
    nopbt:    [66.68,  188.98,  524.56,  718.19,  803.46],
    costs:    [62.75,  27.92,   14.64,   12.92,   12.38],
    net:      [3.93,   161.06,  509.92,  705.27,  791.08],
    innov:    [0,      119.69,  760.81,  1343.39, 1423.24],
    mediaOrch:[104.75, 225.62,  404.60,  435.25,  468.10],
    content:  [29.93,  64.46,   173.40,  186.53,  200.62],
    agentCom: [16.74,  57.31,   108.42,  130.17,  162.25],
    nwSav:    [45.48,  90.96,   227.41,  227.41,  227.41],
    sgaSav:   [0,      13.96,   39.89,   39.89,   39.89],
    bcgFee:   [43.45,  11.55,   0,       0,       0],
    label:    'Scenario 2: USA, UK, Brazil as pilot markets'
  }
};
let activeScenario=1;

function fmt(n){ return (n<0?'-$':'$')+Math.abs(Math.round(n))+'M'; }
function fmtB(n){ return '$'+(n/1000).toFixed(1).replace(/\.0$/,'')+'B'; }

function setScenario(s){
  activeScenario=s;

  // ── BC section toggle (bottom of page) ──
  const s1btn=document.getElementById('sc1-btn');
  const s2btn=document.getElementById('sc2-btn');
  const active='padding:9px 20px;border-radius:100px;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;border:none;background:var(--navy);color:#fff;cursor:pointer;transition:all 0.2s ease;white-space:nowrap;box-shadow:0 2px 8px rgba(0,48,135,0.25)';
  const inactive='padding:9px 20px;border-radius:100px;font-family:DM Sans,sans-serif;font-size:12px;font-weight:600;border:none;background:transparent;color:var(--muted);cursor:pointer;transition:all 0.2s ease;white-space:nowrap';
  if(s===1){ s1btn.style.cssText=active; s2btn.style.cssText=inactive; }
  else      { s2btn.style.cssText=active; s1btn.style.cssText=inactive; }
  const lbl=document.getElementById('sc-label-sub');
  if(lbl) lbl.textContent=BC['s'+s].label;

  // ── Hero toggle (top of page) ──
  const h1=document.getElementById('hero-sc1-btn');
  const h2=document.getElementById('hero-sc2-btn');
  const heroActiveStyle='padding:8px 18px;border-radius:100px;font-family:\'DM Sans\',sans-serif;font-size:12px;font-weight:700;border:none;background:#fff;color:var(--navy);cursor:pointer;transition:all 0.2s ease;white-space:nowrap';
  const heroInactiveStyle='padding:8px 18px;border-radius:100px;font-family:\'DM Sans\',sans-serif;font-size:12px;font-weight:600;border:none;background:transparent;color:rgba(255,255,255,0.6);cursor:pointer;transition:all 0.2s ease;white-space:nowrap';
  if(h1&&h2){
    if(s===1){ h1.style.cssText=heroActiveStyle; h2.style.cssText=heroInactiveStyle; }
    else      { h2.style.cssText=heroActiveStyle; h1.style.cssText=heroInactiveStyle; }
  }

  // ── Campaign slider: update range for scenario ──
  var campMin = s===1 ? 10  : 50;
  var campMax = s===1 ? 200 : 250;
  ['sl-camp','sl-camp-num'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){ el.min=campMin; el.max=campMax; if(parseInt(el.value)>campMax) el.value=campMax; if(parseInt(el.value)<campMin) el.value=campMin; }
  });
  var campLbl=document.getElementById('sl-camp-range-lbl');
  if(campLbl) campLbl.textContent='('+campMin+'–'+campMax+')';

  // ── Videos/campaign slider: range is 1–10 for both scenarios ──
  var vidMin = 1;
  var vidMax = 10;
  ['sl-vid-assets','sl-vid-assets-num'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){ el.min=vidMin; el.max=vidMax; if(parseInt(el.value)>vidMax) el.value=vidMax; if(parseInt(el.value)<vidMin) el.value=vidMin; }
  });
  var vidLbl=document.getElementById('sl-vid-range-lbl');
  if(vidLbl) vidLbl.textContent='('+vidMin+'–'+vidMax+')';

  // ── Photo cost per campaign: scenario-dependent default ──
  var photoDefault = s===1 ? 62.5 : 73.98;
  var photoEl=document.getElementById('sl-photo-cost');
  if(photoEl) photoEl.value=photoDefault;
  var photoScLbl=document.getElementById('sl-photo-sc-lbl');
  if(photoScLbl) photoScLbl.textContent='(S'+(s===1?'1':'2')+' default: $'+photoDefault.toFixed(2)+')';

  // ── Marquee + splash panel (base-case Y5 values, no slider adjustments) ──
  var d=BC['s'+s];
  var salesY5=d.sales[4];
  var netY5=Math.round(d.nopbt[4]-d.costs[4]);
  var salesStr=salesY5>=1000?'$'+(salesY5/1000).toFixed(1).replace(/\.0$/,'')+'B':'$'+Math.round(salesY5)+'M';
  var netStr='$'+netY5+'M';
  document.querySelectorAll('.mq-sales-val').forEach(function(el){ el.textContent=salesStr; });
  document.querySelectorAll('.mq-net-val').forEach(function(el){ el.textContent=netStr; });
  var splashNet=document.getElementById('splash-net');
  var splashSales=document.getElementById('splash-sales');
  if(splashNet) splashNet.innerHTML='$'+netY5+'<span>M</span>';
  if(splashSales) splashSales.innerHTML=(salesY5/1000).toFixed(1).replace(/\.0$/,'')+'<span>B</span>';

  updateBC();
}

// Default FTE values per team, Y1–Y5 (at $250K/FTE base)
const FTE_DEFAULTS = {
  jump:     [5, 6, 7, 4.5, 3.5],
  media:    [5, 5, 4, 4, 4],
  content:  [5, 5, 4, 4, 4],
  insights: [4, 4, 3, 3, 3],
  innov:    [4, 4, 3, 3, 3],
  data:     [10, 10, 10, 6, 6],
  platform: [9, 9, 9, 9, 9],
  transv:   [2, 2, 2, 2, 2]
};

function toggleFteTable(){
  var wrap = document.getElementById('fte-detail-wrap');
  var btn  = document.getElementById('fte-toggle-btn');
  var open = wrap.style.display === 'block';
  wrap.style.display = open ? 'none' : 'block';
  btn.textContent = open ? 'Adjust headcount per team ▾' : 'Collapse ▴';
  if(open){
    document.querySelectorAll('.fte-chip').forEach(function(c){ c.classList.remove('active'); });
  }
}

function syncSliderNum(id){
  var r=document.getElementById('sl-'+id), n=document.getElementById('sl-'+id+'-num');
  if(r&&n) n.value=r.value;
}
function syncNumSlider(id){
  var r=document.getElementById('sl-'+id), n=document.getElementById('sl-'+id+'-num');
  if(r&&n) r.value=n.value;
}

var _activeFteTeam = null;
var _teamLabels = {
  jump:'Jump team', media:'Product · Media & Orch', content:'Product · Content',
  insights:'Product · Insights & Meas.', innov:'Product · Innovation',
  data:'Central data team', platform:'Platform core team', transv:'Transversal platform'
};

function openFteTeam(team){
  // Toggle: clicking active chip closes the editor
  if(_activeFteTeam === team){
    closeFteMini();
    return;
  }
  _activeFteTeam = team;
  // Highlight chip
  document.querySelectorAll('.fte-chip').forEach(function(c){ c.classList.remove('active'); });
  event.currentTarget.classList.add('active');
  // Populate mini editor from hidden table inputs
  document.getElementById('fte-mini-label').textContent = _teamLabels[team];
  for(var y=1; y<=5; y++){
    var src = document.getElementById('fte-'+team+'-'+y);
    var mini = document.getElementById('fte-mini-'+y);
    if(src && mini) mini.value = src.value;
  }
  // Show editor
  var editor = document.getElementById('fte-mini-editor');
  editor.style.display = 'block';
  // Focus Y1
  setTimeout(function(){
    var f = document.getElementById('fte-mini-1');
    if(f){ f.focus(); f.select(); }
  }, 50);
}

function syncFteMini(yr){
  // Write mini editor value back to the hidden table input, then recalc
  if(!_activeFteTeam) return;
  var mini = document.getElementById('fte-mini-'+yr);
  var src  = document.getElementById('fte-'+_activeFteTeam+'-'+yr);
  if(mini && src){ src.value = mini.value; }
  updateBC();
}

function closeFteMini(){
  _activeFteTeam = null;
  document.getElementById('fte-mini-editor').style.display = 'none';
  document.querySelectorAll('.fte-chip').forEach(function(c){ c.classList.remove('active'); });
}

function resetSliders(){
  document.getElementById('sl-topline').value = 2;
  document.getElementById('sl-roi').value     = 0.225;
  document.getElementById('sl-nw').value      = 20;
  document.getElementById('sl-sga').value     = 13;
  document.getElementById('sl-token').value   = 0;
  document.getElementById('sl-platform').value= 0;
  document.getElementById('sl-camp').value             = activeScenario===1 ? 168 : 189;
  document.getElementById('sl-camp-num').value         = activeScenario===1 ? 168 : 189;
  document.getElementById('sl-vid-assets').value       = 5;
  document.getElementById('sl-vid-assets-num').value   = 5;
  document.getElementById('sl-vid-cost').value         = 600;
  document.getElementById('sl-photo-assets').value     = 10;
  document.getElementById('sl-photo-assets-num').value = 10;
  document.getElementById('sl-photo-cost').value       = activeScenario===1 ? 62.5 : 73.98;
  // Reset FTE table to defaults
  Object.keys(FTE_DEFAULTS).forEach(function(team){
    for(var y=1;y<=5;y++){
      var el=document.getElementById('fte-'+team+'-'+y);
      if(el) el.value=FTE_DEFAULTS[team][y-1];
    }
  });
  updateBC();
}

function updateBC(){
  const topline=parseFloat(document.getElementById('sl-topline').value);
  const roi=parseFloat(document.getElementById('sl-roi').value);
  const nw=parseInt(document.getElementById('sl-nw').value);
  const sga=parseFloat(document.getElementById('sl-sga').value);
  const tokenExtra=parseFloat(document.getElementById('sl-token').value)||0;
  const platformExtra=parseFloat(document.getElementById('sl-platform').value)||0;

  // LLM campaign cost: campaigns × videos/campaign × $/video + campaigns × photos/campaign × $/photo
  var ORIG_LLM    = activeScenario===1 ? 7308000 : 8481866;
  var numCamp     = parseInt(document.getElementById('sl-camp').value)||100;
  var vidAssets   = parseInt(document.getElementById('sl-vid-assets').value)||5;
  var vidCost     = parseFloat(document.getElementById('sl-vid-cost').value)||600;
  var photoAssets = parseInt(document.getElementById('sl-photo-assets').value)||10;
  var photoCost   = parseFloat(document.getElementById('sl-photo-cost').value)||(activeScenario===1?62.5:73.98);
  var newLlm      = numCamp*12*(vidAssets*vidCost + photoAssets*photoCost); // $ per year (×12 months)
  // Update flow-through display
  var elFC=document.getElementById('llm-flow-camps');  if(elFC)  elFC.textContent=numCamp+'/mo';
  var elFV=document.getElementById('llm-flow-vids');   if(elFV)  elFV.textContent=vidAssets;
  var elFVC=document.getElementById('llm-flow-vcost'); if(elFVC) elFVC.textContent='$'+vidCost;
  var elFP=document.getElementById('llm-flow-photos'); if(elFP)  elFP.textContent=photoAssets;
  var elFPC=document.getElementById('llm-flow-pcost'); if(elFPC) elFPC.textContent='$'+photoCost;
  var llmDelta   = (newLlm - ORIG_LLM) / 1e6;                 // $M per year

  // Update LLM info row
  function fmtK(v){ return v>=1e6 ? (v/1e6).toFixed(2).replace(/\.?0+$/,'')+'M' : v>=1000 ? (v/1000).toFixed(1)+'K' : v+''; }
  var deltaSign  = llmDelta>=0 ? '+' : '−';
  var deltaColor = llmDelta<=0 ? '#059669' : '#dc2626';
  var el_llmcost  = document.getElementById('llm-cost-display');
  var el_llmbase  = document.getElementById('llm-base-display');
  var el_llmdelta = document.getElementById('llm-delta-display');
  if(el_llmcost)  el_llmcost.textContent  = '$'+fmtK(newLlm)+'/yr';
  if(el_llmbase)  el_llmbase.textContent  = '$'+fmtK(ORIG_LLM);
  if(el_llmdelta){ el_llmdelta.textContent = deltaSign+'$'+fmtK(Math.abs(Math.round(llmDelta*1e6)))+'/yr'; el_llmdelta.style.color=deltaColor; }

  document.getElementById('sl-topline-val').textContent=topline.toFixed(1)+'%';
  document.getElementById('sl-roi-val').textContent='+'+roi.toFixed(3).replace(/\.?0+$/,'')+'pt';
  document.getElementById('sl-nw-val').textContent=nw+'%';
  document.getElementById('sl-sga-val').textContent=(sga%1===0?sga:sga.toFixed(1))+'%';
  document.getElementById('sl-token-val').textContent='+$'+tokenExtra+'M/yr';
  document.getElementById('sl-platform-val').textContent='+$'+platformExtra+'M/yr';

  const d=BC['s'+activeScenario];
  const bcgFee=d.bcgFee; // scenario-specific from Excel R47

  // PEP staffing cost from editable FTE table ($250K/FTE = 0.25M per FTE)
  const fteTeams=['jump','media','content','insights','innov','data','platform','transv'];
  const pepCost=[0,0,0,0,0];
  const fteTotals=[0,0,0,0,0];
  fteTeams.forEach(function(team){
    for(var y=0;y<5;y++){
      var el=document.getElementById('fte-'+team+'-'+(y+1));
      var v=parseFloat((el&&el.value)||0);
      pepCost[y]+=v*0.25;
      fteTotals[y]+=v;
    }
  });
  // Update FTE total display rows
  for(var y=0;y<5;y++){
    var yr=y+1;
    var totEl=document.getElementById('pep-fte-tot-'+yr);
    if(totEl) totEl.textContent=Math.round(fteTotals[y]*10)/10;
    var tblEl=document.getElementById('pep-fte-tbl-'+yr);
    if(tblEl) tblEl.textContent=Math.round(fteTotals[y]*10)/10;
    var costEl=document.getElementById('pep-cost-tbl-'+yr);
    if(costEl) costEl.textContent='$'+Math.round(pepCost[y])+'M';
  }

  // Tech costs: derived from Excel totals (base case pepStaff = $250K × base FTEs)
  const pepStaffBase=[11.0, 11.25, 10.5, 8.875, 8.625];
  const techByYear=d.costs.map(function(c,i){ return c-bcgFee[i]-pepStaffBase[i]; });

  const setCell=(id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=typeof v==='number'?v.toLocaleString():v; };

  // Slider deviation from base (1.0 = mid/base)
  const innovMid=2.0, roiMid=0.225, nwMid=20, sgaMid=13;
  const sAdj=topline/innovMid, rAdj=roi/roiMid, nAdj=nw/nwMid, gAdj=sga/sgaMid;
  // PepsiCo actual NOPBT margin from Excel (R6): 12.2417%
  const NOPBT_MARGIN = 0.12241682193239287;
  // Costs derived from exact Excel totals (techByYear = d.costs - bcg - pep)

  for(let y=0;y<5;y++){
    const yr=y+1;
    // Sub-line display values (each scaled by its own slider)
    const adjInnov  = Math.round(d.innov[y]*sAdj);
    const adjMedia  = Math.round(d.mediaOrch[y]*rAdj);
    const adjContent= Math.round(d.content[y]*rAdj);
    const adjAgent  = Math.round(d.agentCom[y]); // Prelim
    const adjNw     = Math.round(d.nwSav[y]*nAdj);
    const adjSga    = Math.round(d.sgaSav[y]*gAdj);
    const adjSales  = Math.round(d.sales[y]);    // total incl. RoW from Excel
    const adjSavings= Math.round(d.savings[y]); // total incl. RoW from Excel
    // NOPBT/Net: delta approach from exact Excel base — preserves correct margin & base accuracy
    // Exact (unrounded) deltas — avoids rounding errors e.g. Math.round(17.5)=18 vs 17.5*0.8=14
    const dInnov   = d.innov[y]*sAdj     - d.innov[y];
    const dMedia   = d.mediaOrch[y]*rAdj  - d.mediaOrch[y];
    const dContent = d.content[y]*rAdj    - d.content[y];
    const dNw      = d.nwSav[y]*nAdj     - d.nwSav[y];
    const dSga     = d.sgaSav[y]*gAdj    - d.sgaSav[y];
    const dNopbt   = (dInnov+dMedia+dContent)*NOPBT_MARGIN + dNw + dSga;
    const adjNopbt = Math.round((d.nopbt[y]+dNopbt)*10)/10;
    const adjCosts = Math.round((bcgFee[y]+techByYear[y]+pepCost[y]+tokenExtra+platformExtra+llmDelta)*10)/10;
    const adjNet   = Math.round((adjNopbt-adjCosts)*10)/10;

    setCell('t-sales-'+yr,   adjSales);
    setCell('t-innov-'+yr,   adjInnov);
    setCell('t-media-'+yr,   adjMedia);
    setCell('t-content-'+yr, adjContent);
    setCell('t-agent-'+yr,   adjAgent);
    setCell('t-savings-'+yr, adjSavings);
    setCell('t-nw-'+yr,      adjNw);
    setCell('t-sga-'+yr,     adjSga);
    setCell('t-costs-'+yr,   adjCosts);
    setCell('t-bcg-'+yr,     Math.round(bcgFee[y]));
    setCell('t-pep-'+yr,     Math.round(pepCost[y]));
    const netEl=document.getElementById('t-net-'+yr);
    if(netEl) netEl.innerHTML='<strong>'+adjNet.toLocaleString()+'</strong>';
  }

  // Summary cards
  // Summary cards use Excel base values scaled by slider average
  var dI5=(d.innov[4]*sAdj-d.innov[4])+(d.mediaOrch[4]*rAdj-d.mediaOrch[4])+(d.content[4]*rAdj-d.content[4]);
  var dS5=(d.nwSav[4]*nAdj-d.nwSav[4])+(d.sgaSav[4]*gAdj-d.sgaSav[4]);
  var adjS5=Math.round(d.sales[4]);    // total incl. RoW from Excel
  var adjSv5=Math.round(d.savings[4]); // total incl. RoW from Excel
  var adjNopbt5=Math.round((d.nopbt[4]+dI5*NOPBT_MARGIN+dS5)*10)/10;
  var d5={sales:adjS5, savings:adjSv5, nopbt:adjNopbt5, costs:Math.round((bcgFee[4]+techByYear[4]+pepCost[4]+tokenExtra+platformExtra+llmDelta)*10)/10};
  document.getElementById('sc-sales-y5').textContent=(d5.sales).toLocaleString()+'M';
  document.getElementById('sc-savings-y5').textContent=(d5.savings).toLocaleString()+'M';
  document.getElementById('sc-nopbt-y5').textContent=(d5.nopbt).toLocaleString()+'M';
  document.getElementById('sc-net-y5').textContent=(d5.nopbt-d5.costs).toLocaleString()+'M';

  // Output cards
  const dI1=(d.innov[0]*sAdj-d.innov[0])+(d.mediaOrch[0]*rAdj-d.mediaOrch[0])+(d.content[0]*rAdj-d.content[0]);
  const dS1=(d.nwSav[0]*nAdj-d.nwSav[0])+(d.sgaSav[0]*gAdj-d.sgaSav[0]);
  const dI3=(d.innov[2]*sAdj-d.innov[2])+(d.mediaOrch[2]*rAdj-d.mediaOrch[2])+(d.content[2]*rAdj-d.content[2]);
  const dS3=(d.nwSav[2]*nAdj-d.nwSav[2])+(d.sgaSav[2]*gAdj-d.sgaSav[2]);
  const y1nopbt=Math.round((d.nopbt[0]+dI1*NOPBT_MARGIN+dS1)*10)/10;
  const y3nopbt=Math.round((d.nopbt[2]+dI3*NOPBT_MARGIN+dS3)*10)/10;
  document.getElementById('bc-out-y1').textContent=fmt(Math.round((y1nopbt-(bcgFee[0]+techByYear[0]+pepCost[0]+tokenExtra+platformExtra+llmDelta))*10)/10);
  document.getElementById('bc-out-y3').textContent=fmt(Math.round((y3nopbt-(bcgFee[2]+techByYear[2]+pepCost[2]+tokenExtra+platformExtra+llmDelta))*10)/10);
  document.getElementById('bc-out-y5').textContent=fmt(d5.nopbt-d5.costs);
  document.getElementById('bc-out-nopbt5').textContent=fmt(d5.nopbt);

  // (value driver cards removed)
}

// ══════════════════════════════════════════════
//  INTERACTIVE FEATURES
// ══════════════════════════════════════════════

// ── 1. Scroll progress bar ──
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (winScroll / height) * 100 : 0;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';

  // Back to top button
  const btn = document.getElementById('back-to-top');
  if (btn) btn.style.display = winScroll > 400 ? 'flex' : 'none';
}, { passive: true });

// ── 2. Scroll reveal observer ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function attachReveal() {
  const selectors = [
    '.commit-card', '.principle-card', '.kpi-card', '.stat-card',
    '.delivery-card', '.callout', '.track-overview', '.arch',
    '.gov-wrap', '.bc-wrap', '.slider-section', '.client-card',
    '.case-study', '.tline-wrap', '.banner', '.section-header',
    '.uc-card', '.focus-item'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel + ':not(.reveal)').forEach((el, i) => {
      el.classList.add('reveal');
      const delay = Math.min(i, 4);
      if (delay > 0) el.classList.add('reveal-delay-' + delay);
      revealObserver.observe(el);
    });
  });
}

// ── 3. Number counter animation ──
function animateCounter(el, target, prefix, suffix, duration) {
  const isNeg = target < 0;
  const absTarget = Math.abs(target);
  const start = performance.now();
  const fmt = (n) => {
    return Math.round(n).toLocaleString();
  };
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * absTarget;
    el.textContent = prefix + (isNeg ? '-' : '') + fmt(current) + (suffix !== 'B' ? suffix : '');
    if (progress < 1) requestAnimationFrame(step);
    else { el.textContent = prefix + (isNeg ? '-' : '') + fmt(absTarget) + (suffix !== 'B' ? suffix : ''); el.classList.add('pulse'); }
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.count;
    if (!raw) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const target = parseFloat(raw);
    animateCounter(el, target, prefix, suffix, 1200);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

function attachCounters() {
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
}

// ── 4. Card tilt effect on mouse move ──
function attachTilt() {
  document.querySelectorAll('.kpi-card, .stat-card, .commit-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
      card.style.boxShadow = '0 16px 48px rgba(0,48,135,0.18), 0 4px 12px rgba(0,0,0,0.08)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// ── 5. Animate hero em underline on load ──
function animateHeroUnderline() {
  document.querySelectorAll('.hero h1 em').forEach(em => {
    setTimeout(() => em.classList.add('underlined'), 300);
  });
}

// ── 6. Animate timeline bars when visible ──
function animateTimeline() {
  const tlineObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.tbar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('tbar-animated'), i * 80);
      });
      tlineObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.tline-wrap').forEach(t => tlineObs.observe(t));
}

// ── 7. Animate benchmark bars ──
function animateBenchBars() {
  const benchObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('bench-animated');
      benchObs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[style*="flex-direction:column"][style*="border-radius:6px"]').forEach(b => {
    benchObs.observe(b);
  });
}

// ── 8. Typewriter cursor on hero subtitle ──
function typewriterEffect() {
  const heroSubs = document.querySelectorAll('.tab-content.active .hero-sub');
  heroSubs.forEach(sub => {
    sub.style.borderRight = '2px solid transparent';
    setTimeout(() => { sub.style.borderRight = ''; }, 1200);
  });
}

// ── 9. Re-init features after tab switch ──
document.querySelectorAll('.tab').forEach((tab, idx) => {
  const _orig = tab.onclick;
  tab.onclick = function(e) {
    if (_orig) _orig.call(this, e);
    setTimeout(() => {
      attachReveal();
      attachCounters();
      attachTilt();
      animateHeroUnderline();
      animateTimeline();
    }, 60);
  };
});

// ── 10. Add data-count attributes to key numbers ──
function tagCounters() {
  const maps = [
    { id: 'sc-sales-y5',  prefix: '$', suffix: 'M' },
    { id: 'sc-savings-y5', prefix: '$', suffix: 'M' },
    { id: 'sc-nopbt-y5',  prefix: '$', suffix: 'M' },
    { id: 'sc-net-y5',    prefix: '$', suffix: 'M' },
  ];
  maps.forEach(({ id, prefix, suffix }) => {
    const el = document.getElementById(id);
    if (el) {
      const num = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        el.dataset.count = num;
        el.dataset.prefix = prefix;
        el.dataset.suffix = suffix;
      }
    }
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  attachReveal();
  attachCounters();
  attachTilt();
  animateHeroUnderline();
  animateTimeline();
  tagCounters();
  setTimeout(() => { setScenario(1); updateBC(); tagCounters(); attachCounters(); }, 100);
});

// Back to top hover
const bttBtn = document.getElementById('back-to-top');
if (bttBtn) {
  bttBtn.addEventListener('mouseenter', () => { bttBtn.style.background = '#0091DA'; bttBtn.style.transform = 'scale(1.1)'; });
  bttBtn.addEventListener('mouseleave', () => { bttBtn.style.background = 'var(--navy)'; bttBtn.style.transform = ''; });
}
