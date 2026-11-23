// ===== Kit: Quem religa o país depois de um apagão (black start) =====
function hardhat(x,y,t,o=1,s=1,ph=0,dy=0){const hy=-2*Math.sin(t*2.2+ph)+dy;return g(x,y,s,o,`<g transform="translate(0 ${hy.toFixed(2)})"><path d="M-36 -170 Q-34 -206 0 -208 Q34 -206 36 -170 Z" fill="#050505" ${LS} stroke-width="4"/><path d="M-48 -170 L48 -170" ${LS} stroke-width="5"/><path d="M0 -208 L0 -186" ${LS} stroke-width="3"/></g>`,'filter="url(#tg)"')}
function streetLamp(on,p=1){let h=P('M0 0 L0 -300 Q0 -322 22 -322 L44 -322',p,5)+P('M26 -322 L74 -322 L64 -306 L36 -306 Z',p,4)+P('M-18 0 L18 0',p,5);
  if(on>0)h+=`<path d="M50 -304 L118 0 L-18 0 Z" fill="#fff" opacity="${(.10*on).toFixed(3)}"/><circle cx="50" cy="-305" r="7" fill="#fff" opacity="${on.toFixed(3)}"/>`;return h}
function bigOnButton(t,p=1,crack=0){let h=P('M78 0 A78 78 0 1 1 -78 0 A78 78 0 1 1 78 0',p,5)+P('M56 0 A56 56 0 1 1 -56 0 A56 56 0 1 1 56 0',seg(p,.3,1),4);
  h+=P('M0 -34 L0 -4',seg(p,.5,1),6)+P('M-22 -24 A30 30 0 1 0 22 -24',seg(p,.5,1),6);
  if(crack>0)h+=P('M-70 -30 L-30 -10 L-40 20 L10 30 L20 60',crack,4)+P('M60 -40 L30 -10 L44 14',crack,4);return h}
function consoleDesk(t,p=1,lev=[0,0,0],glow=0){let h=P('M-130 0 L-130 -100 L-150 -150 L150 -150 L130 -100 L130 0',p,5)+P('M-130 -100 L130 -100',p,4);
  [-80,0,80].forEach((dx,i)=>{const a=-30+60*(lev[i]||0);const r=a*Math.PI/180;const ex=dx+Math.sin(r)*60,ey=-150-Math.cos(r)*60;
    if(p>.6){h+=`<path d="M${dx} -150 L${ex.toFixed(1)} ${ey.toFixed(1)}" ${LS} stroke-width="5"/><circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="11" fill="${glow>0?W:'#050505'}" ${LS} stroke-width="4" opacity="${1}"/>`}});
  if(p>.8)for(let i=0;i<5;i++){const on=glow>0&&Math.sin(t*6+i*1.7)>0;h+=`<circle cx="${-90+i*45}" cy="-60" r="7" fill="${on?W:'#050505'}" ${LS} stroke-width="3"/>`}
  return h}
function generator(t,p=1,shake=0){const sx=shake*Math.sin(t*40)*2;let h=`<g transform="translate(${sx.toFixed(1)} 0)">`+P('M-90 0 L-90 -130 L90 -130 L90 0 Z',p,5)+P('M-60 0 L-60 14 M60 0 L60 14',p,5);
  h+=P('M0 -65 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0',seg(p,.3,1),4);
  if(p>.6){for(let i=0;i<3;i++){const y=-82+i*16;h+=`<path d="M-18 ${y} Q-6 ${y-8} 6 ${y} Q18 ${y+8} 18 ${y}" ${LS} stroke-width="3"/>`}}
  return h+'</g>'}
function plug(){return `<path d="M-30 -22 L18 -22 Q30 -22 30 -10 L30 10 Q30 22 18 22 L-30 22 Z" fill="#050505" ${LS} stroke-width="4"/><path d="M30 -10 L48 -10 M30 10 L48 10" ${LS} stroke-width="5"/>`}
function socket(p=1){return P('M44 0 A44 44 0 1 1 -44 0 A44 44 0 1 1 44 0',p,5)+(p>.6?`<circle cx="-14" cy="0" r="6" fill="${W}"/><circle cx="14" cy="0" r="6" fill="${W}"/>`:'')}
function carSide(t,p=1,shake=0){const sy=shake*Math.sin(t*35)*2.5;let h=`<g transform="translate(0 ${sy.toFixed(1)})">`+P('M-160 -26 L-160 -64 Q-160 -72 -150 -74 L-96 -80 L-56 -124 Q-50 -130 -40 -130 L56 -130 Q66 -130 72 -124 L108 -80 L152 -74 Q162 -72 162 -62 L162 -26',p,5)+P('M-104 -26 L-62 -26 M50 -26 L102 -26',p,5)+P('M-44 -80 L-24 -116 L4 -116 L4 -80 Z M20 -80 L20 -116 L52 -116 L80 -80 Z',seg(p,.4,1),4)+'</g>';
  [-84,84].forEach(dx=>{h+=P(`M${dx+26} -26 A26 26 0 1 1 ${dx-26} -26 A26 26 0 1 1 ${dx+26} -26`,p,5)});return h}
function carBattery(lvl=0,p=1){let h=P('M-70 -46 L70 -46 L70 46 L-70 46 Z',p,5)+P('M-46 -46 L-46 -60 L-26 -60 L-26 -46 M26 -46 L26 -60 L46 -60 L46 -46',p,4);
  if(p>.7){h+=T(-36,-2,'−',26,{w:900,ls:0,filt:''})+T(36,-2,'+',26,{w:900,ls:0,filt:''});h+=`<rect x="-50" y="14" width="100" height="18" rx="4" ${LS} stroke-width="3"/>`;if(lvl>0)h+=`<rect x="-47" y="17" width="${(94*lvl).toFixed(1)}" height="12" rx="2" fill="${W}"/>`}
  return h}
function smokePuff(x,y,q){let h='';for(let i=0;i<4;i++){const k=clamp(q-i*.12);if(k<=0)continue;h+=`<circle cx="${(x-20*i-k*40).toFixed(1)}" cy="${(y-k*50-i*6).toFixed(1)}" r="${(6+k*16).toFixed(1)}" ${LS} stroke-width="2.5" opacity="${(1-k).toFixed(2)}"/>`}return h}
// dam: wall right side at x=0; reservoir to the left
function dam(t,p=1,gateUp=0,lit=0,big=1){const H=240*big;let h=P(`M-40 0 L-10 ${-H} L30 ${-H} L90 0 Z`,p,5);
  // water on the left
  if(p>.5){const q=seg(p,.5,1);for(let i=0;i<3;i++){const y=-H+30+i*44;let d=`M${(-40-230*q).toFixed(1)} ${y}`;for(let k=0;k<6;k++){const x0=-40-230*q+k*38*q;d+=` Q${(x0+10*q).toFixed(1)} ${(y-6*Math.sin(t*2+k+i)).toFixed(1)} ${(x0+19*q).toFixed(1)} ${y} T${(x0+38*q).toFixed(1)} ${y}`}
    h+=`<path d="${d}" ${LS} stroke-width="${i==0?4:2.5}" opacity="${i==0?1:.45}"/>`}}
  // gate
  if(p>.7){const gy=-70-gateUp*60;h+=`<rect x="-48" y="${gy.toFixed(1)}" width="22" height="56" rx="3" fill="#050505" ${LS} stroke-width="4"/>`}
  // powerhouse windows
  if(p>.8&&big>1){for(let i=0;i<3;i++){h+=`<rect x="${100+i*36}" y="-56" width="24" height="24" rx="3" fill="${lit>0?W:'#050505'}" ${LS} stroke-width="3" opacity="${lit>0?.6+.4*lit:1}"/>`}h+=P('M90 0 L90 -80 L210 -80 L210 0',p,4)}
  return h}
function waterFlow(t,a){if(a<=0)return '';return `<path d="M-30 -42 Q40 -30 70 -6 Q110 20 170 -40" ${LS} stroke-width="5" stroke-dasharray="14 12" stroke-dashoffset="${(-t*90).toFixed(1)}" opacity="${a.toFixed(2)}"/>`}
function turbine(t,ang,p=1,glow=0){let h=P('M56 0 A56 56 0 1 1 -56 0 A56 56 0 1 1 56 0',p,5);
  if(p>.5){let b='';for(let i=0;i<6;i++){const a=ang+i*60;b+=`<path transform="rotate(${a.toFixed(1)})" d="M0 0 Q20 -12 16 -44" ${LS} stroke-width="4"/>`}h+=b+`<circle r="9" fill="${W}"/>`}
  if(glow>0)h+=`<circle r="${(70+8*Math.sin(t*8)).toFixed(1)}" ${LS} stroke-width="3" opacity="${(glow*.8).toFixed(2)}"/>`;
  return h}
function block(lit,p=1,t=0,flick=0){let h=P('M-52 0 L-52 -120 L52 -120 L52 0',p,5)+P('M-62 -120 L62 -120',p,4);
  if(p>.6){for(let r=0;r<3;r++)for(let c=0;c<3;c++){const k=(r*3+c);const on=lit>0&&(flick?Math.sin(t*30+k)>-.2:true);h+=`<rect x="${-38+c*28}" y="${-104+r*32}" width="20" height="20" rx="3" fill="${on?W:'#050505'}" ${LS} stroke-width="3" opacity="${on?(.55+.45*lit).toFixed(2):1}"/>`}}
  return h}
function freqGauge(ang,p=1){let h=P('M-80 0 A80 80 0 0 1 80 0',p,5);
  if(p>.5){for(let i=0;i<=8;i++){const a=Math.PI+i*Math.PI/8;h+=`<path d="M${(Math.cos(a)*66).toFixed(1)} ${(Math.sin(a)*66).toFixed(1)} L${(Math.cos(a)*78).toFixed(1)} ${(Math.sin(a)*78).toFixed(1)}" ${LS} stroke-width="${i==4?5:3}"/>`}
    const r=(ang-180)*Math.PI/180;h+=`<path d="M0 0 L${(Math.cos(r)*62).toFixed(1)} ${(Math.sin(r)*62).toFixed(1)}" ${LS} stroke-width="5"/><circle r="9" fill="${W}"/>`+T(0,34,'60 Hz',16,{w:800,ls:3,filt:''})}
  return h}
const IBERIA='M-150 -100 L-96 -120 L-30 -112 L40 -118 L100 -104 L150 -92 L168 -66 L130 -40 L108 -6 L96 34 L60 70 L20 96 L-30 108 L-86 104 L-110 80 L-124 40 L-120 0 L-140 -30 L-168 -60 Z';
const CITY=[[-90,-60],[-20,-70],[60,-74],[120,-60],[-60,0],[10,-6],[70,10],[-90,60],[-20,60],[40,50]];
function iberia(t,p=1,lit=[]){let h=P(IBERIA,p,5);if(p>.8)CITY.forEach(([x,y],i)=>{const l=lit[i]||0;h+=`<circle cx="${x}" cy="${y}" r="${7+3*l}" fill="${l>0?W:'#050505'}" ${LS} stroke-width="2.5" opacity="${(.5+.5*Math.max(l,.2)).toFixed(2)}"/>`});return h}
function arrowPath(d,p,sw=5){return P(d,p,sw)}
function digitalClock(txt,p=1){return P('M-110 -46 L110 -46 Q120 -46 120 -36 L120 36 Q120 46 110 46 L-110 46 Q-120 46 -120 36 L-120 -36 Q-120 -46 -110 -46 Z',p,5)+(p>.7?T(0,16,txt,44,{w:900,ls:6,filt:''}):'')}
function stopwatch(t,p=1,ang=0,txt='00:00'){let h=P('M100 0 A100 100 0 1 1 -100 0 A100 100 0 1 1 100 0',p,5)+P('M-16 -112 L16 -112 L16 -128 L-16 -128 Z M0 -100 L0 -112 M70 -80 L84 -94',p,5);
  if(p>.6){for(let i=0;i<12;i++){const a=i*Math.PI/6;h+=`<path d="M${(Math.sin(a)*82).toFixed(1)} ${(-Math.cos(a)*82).toFixed(1)} L${(Math.sin(a)*92).toFixed(1)} ${(-Math.cos(a)*92).toFixed(1)}" ${LS} stroke-width="3"/>`}
    const r=ang*Math.PI/180;h+=`<path d="M0 0 L${(Math.sin(r)*72).toFixed(1)} ${(-Math.cos(r)*72).toFixed(1)}" ${LS} stroke-width="4"/><circle r="7" fill="${W}"/>`+T(0,46,txt,26,{w:900,ls:3,filt:''})}
  return h}
function bigRedButton(t,press=0,p=1,glow=0){const d=press*14;let h=P('M-70 0 L-60 -90 L60 -90 L70 0 Z',p,5);
  h+=`<path d="M-54 ${-90+d} Q-54 ${-140+d} 0 ${-140+d} Q54 ${-140+d} 54 ${-90+d} Z" fill="${glow>0?W:'#050505'}" ${LS} stroke-width="5" opacity="${p>.5?1:0}"/>`;
  if(glow>0)h+=`<circle cy="-110" r="${(90+10*Math.sin(t*6)).toFixed(1)}" ${LS} stroke-width="3" opacity="${(glow*.6).toFixed(2)}"/>`;
  if(p>.7)h+=T(0,-34,'LIGAR',18,{w:900,ls:4,filt:''});return h}
function sparkWire(x1,y1,x2,y2,t,a=1){if(a<=0)return '';let h='';for(let i=0;i<3;i++){const q=((t*1.4+i/3)%1);h+=`<circle cx="${lerp(x1,x2,q).toFixed(1)}" cy="${lerp(y1,y2,q).toFixed(1)}" r="6" fill="${W}" opacity="${(a*(1-Math.abs(q-.5)*1.2)).toFixed(2)}"/>`}return h}
function digits(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
