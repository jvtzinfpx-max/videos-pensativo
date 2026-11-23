// ===== Tubarão-cabeça-chata no Amazonas =====
// ---------- kit novo ----------
// wavy water surface from x0 to x1 at y
function wave(x0,x1,y,t,amp=6,p=1,sw=3,op=1){const xe=lerp(x0,x1,clamp(p));if(xe<=x0+1)return '';let d=`M${x0} ${y}`;for(let x=x0;x<=xe;x+=18){d+=` L${x.toFixed(0)} ${(y+Math.sin(x*.045+t*2.6)*amp+Math.sin(x*.013-t*1.3)*amp*.6).toFixed(1)}`}
  return `<path d="${d}" stroke="${W}" fill="none" stroke-width="${sw}" stroke-linecap="round" opacity="${op}" filter="url(#tg)"/>`}
function bed(x0,x1,y=FY,op=1){return `<path d="M${x0} ${y} L${x1} ${y}" stroke="#8A8A8A" stroke-width="2" opacity="${op}"/>`}
// shark facing right, ~300px long at s=1, centre (0,0)
function shark(t,o={}){const sw=Math.sin(t*(o.fast?11:6)+(o.ph||0))*(o.still?0:11);const mo=o.mouth||0;const puff=o.puff||0;
  const by=1+puff*.55;
  let h=`<g transform="scale(1 ${by.toFixed(3)})">`;
  h+=`<g transform="translate(-128 0) rotate(${sw.toFixed(2)})"><path d="M0 0 L-52 -52 Q-44 -14 -40 0 Q-44 14 -52 40 Z" fill="#050505" ${LS} stroke-width="4"/></g>`;
  h+=`<path d="M-14 -34 Q0 -70 26 -84 Q24 -56 40 -33" fill="#050505" ${LS} stroke-width="4"/>`;
  h+=`<path d="M-130 0 Q-70 -36 30 -36 Q118 -34 140 -6 Q146 4 136 ${12+mo*14} Q110 34 30 32 Q-70 32 -130 0 Z" fill="#050505" ${LS} stroke-width="5"/>`;
  h+=`<path d="M20 24 Q4 52 -4 66 Q24 50 52 28" fill="#050505" ${LS} stroke-width="4"/>`;
  h+=`<path d="M-60 26 L-74 42 L-48 28" ${LS} stroke-width="3"/>`;
  h+=`<path d="M66 -14 Q60 0 66 14 M78 -16 Q72 0 78 16 M90 -16 Q84 0 90 15" ${LS} stroke-width="3"/>`;
  h+=`<circle cx="112" cy="-10" r="5" fill="${W}"/>`;
  if(mo>0){h+=`<path d="M100 ${14+mo*4} L108 ${8+mo*4} L114 ${15+mo*6} L120 ${9+mo*5} L126 ${16+mo*8} L132 ${11+mo*8}" ${LS} stroke-width="3"/>`}
  else h+=`<path d="M104 16 Q118 20 132 14" ${LS} stroke-width="3"/>`;
  if(o.belly){h+=`<ellipse cx="-10" cy="10" rx="${48}" ry="${18}" fill="none" stroke="${W}" stroke-width="3" stroke-dasharray="6 6" opacity="${o.belly}"/>`;
    for(let i=0;i<2;i++)h+=`<g transform="translate(${-30+i*40} ${10}) scale(.12)" opacity="${o.belly}">${babyPath()}</g>`}
  return h+'</g>';}
function babyPath(){return `<path d="M-130 0 Q-70 -36 30 -36 Q118 -34 140 -6 Q146 4 136 12 Q110 34 30 32 Q-70 32 -130 0 Z M-130 0 L-180 -50 L-170 0 L-180 40 Z M-14 -34 Q0 -70 26 -84 Q24 -56 40 -33" fill="none" stroke="${W}" stroke-width="22" stroke-linejoin="round"/>`}
function SH(x,y,s,o,t,opt={},dir=1,rot=0){return g(x,y,1,o,`<g transform="scale(${(s*dir).toFixed(3)} ${s.toFixed(3)}) rotate(${rot})">${shark(t,opt)}</g>`,`filter="url(#${opt.dim?'fD':'tg'})"`)}
// orca facing right ~380px
function orca(t,o={}){const sw=Math.sin(t*4)*8;let h='';
  h+=`<g transform="translate(-160 0) rotate(${sw.toFixed(2)})"><path d="M0 -4 Q-30 -40 -70 -52 Q-56 -20 -40 -4 Q-56 16 -72 40 Q-30 30 0 4 Z" fill="#050505" ${LS} stroke-width="4"/></g>`;
  h+=`<path d="M-30 -44 Q-16 -110 4 -146 Q10 -96 34 -46" fill="#050505" ${LS} stroke-width="5"/>`;
  h+=`<path d="M-162 0 Q-80 -50 40 -48 Q150 -46 176 0 Q160 40 60 44 Q-80 46 -162 0 Z" fill="#050505" ${LS} stroke-width="5"/>`;
  h+=`<ellipse cx="104" cy="-14" rx="24" ry="9" transform="rotate(-8 104 -14)" fill="${W}" opacity=".9"/>`;
  h+=`<path d="M-40 -2 Q-70 10 -40 22 Q20 34 120 18 Q150 14 168 6" ${LS} stroke-width="3"/>`;
  h+=`<path d="M40 36 Q20 76 -4 90 Q36 78 74 40" fill="#050505" ${LS} stroke-width="4"/>`;
  h+=`<circle cx="138" cy="-6" r="5" fill="${W}"/>`;
  return h;}
function tree(p=1,k=0){return P('M0 0 L0 -70',p,4)+P('M0 -40 L-18 -58 M0 -52 L16 -68',p,3)+P('M-44 -84 Q-56 -120 -24 -132 Q-12 -164 18 -150 Q50 -158 52 -122 Q70 -96 42 -80 Q20 -64 -6 -76 Q-34 -66 -44 -84 Z',p,4)}
function bubbles(x,y,t,n=5,h=120,op=1){let s='';for(let i=0;i<n;i++){const q=((t*.7+i/n)%1);s+=`<circle cx="${(x+Math.sin(q*9+i)*8).toFixed(1)}" cy="${(y-q*h).toFixed(1)}" r="${3+i%3*2}" ${LS} stroke-width="2" opacity="${(op*(1-q)).toFixed(3)}"/>`}return `<g filter="url(#tg)">${s}</g>`}
function oceanWave(p=1){return P('M-90 30 Q-60 -60 10 -60 Q60 -60 60 -20 Q60 6 30 6 Q8 6 12 -16 Q-10 10 -30 30 Z',p,5)+P('M-110 46 Q-80 34 -50 46 Q-20 58 10 46 Q40 34 70 46 Q100 58 120 46',p,4)}
function drop(grains,t,p=1){let h=P('M0 -70 Q44 -14 44 18 Q44 62 0 62 Q-44 62 -44 18 Q-44 -14 0 -70 Z',p,5);
  for(let i=0;i<grains;i++){const a=i*2.39996,r=8+((i*13)%26);const x=Math.cos(a)*r+Math.sin(t*3+i)*2,y=24+Math.sin(a)*r*.8;h+=`<rect x="${(x-4).toFixed(1)}" y="${(y-4).toFixed(1)}" width="8" height="8" fill="${W}" transform="rotate(${(i*33+t*40)%360} ${x.toFixed(1)} ${y.toFixed(1)})"/>`}
  return h}
function liver(p=1,oil=1){return P('M-70 -10 Q-70 -50 -20 -46 Q20 -42 60 -50 Q86 -50 80 -20 Q70 20 20 40 Q-20 54 -50 34 Q-72 20 -70 -10 Z',p,5)+P('M0 -44 Q6 -10 -4 30',p,3)+
  (oil>0.02?`<g transform="translate(36 -6) scale(${oil.toFixed(3)})"><path d="M0 -20 Q14 -2 14 6 Q14 18 0 18 Q-14 18 -14 6 Q-14 -2 0 -20 Z" fill="${W}"/></g>`:'')}
function flag(p=1,t=0){const f=Math.sin(t*5)*5;return P('M0 0 L0 -110',p,4)+(p>.6?`<path d="M0 -108 Q24 ${-116+f} 50 -104 Q72 ${-96-f} 90 -100 L90 -64 Q72 ${-60-f} 50 -68 Q24 ${-78+f} 0 -72 Z" fill="${W}" opacity="${seg(p,.6,1)}"/>`:'')}
function canoe(p=1){return P('M-130 -14 Q-110 22 -60 24 L60 24 Q110 22 130 -14 Q60 -4 0 -4 Q-60 -4 -130 -14 Z',p,5)+P('M-100 -6 L100 -6',p,2)}
function riverMap(p,t){ // winding river path in local coords
  return 'M-380 40 C-300 -60 -220 120 -120 30 S 40 -80 120 20 S 280 90 360 -10';}
