// ===== Kit: O que o homem semear =====
function cliff(p=1){return P(`M-520 ${FY-260} L-40 ${FY-260} L-10 ${FY-220} L-30 ${FY-150} L0 ${FY-80} L-20 ${FY}`,p,5)+P(`M-20 ${FY} L520 ${FY}`,p,2,'stroke-opacity=".5"')}
function rock(r=22){return `<path d="M${-r} 0 Q${-r} ${-r} 0 ${-r} Q${r*1.1} ${-r*.9} ${r} ${-r*.1} Q${r*.9} ${r*.6} 0 ${r*.7} Q${-r*.9} ${r*.7} ${-r} 0 Z" fill="#050505" ${LS} stroke-width="4"/>`}
function burst(t,p=1){let h='';for(let i=0;i<12;i++){const a=Math.PI*(i/11);const r0=50,r1=90+10*Math.sin(t*3+i);h+=P(`M${(Math.cos(a)*r0).toFixed(1)} ${(-Math.sin(a)*r0*.0+0).toFixed(1)} L${(Math.cos(a)*r1).toFixed(1)} ${(Math.sin(a)*r1).toFixed(1)}`,seg(p,i/14,i/14+.3),3)}
  return h+`<circle r="34" fill="${W}" opacity="${.9*p}"/>`}
function pendulum(t,p=1){const a=Math.sin(t*2.6)*28;return P('M-40 0 L40 0',p,4)+`<g transform="rotate(${a.toFixed(1)})">${P('M0 0 L0 90',p,3)}<circle cy="104" r="14" fill="#050505" ${LS} stroke-width="4" opacity="${p}"/></g>`}
function apple(p=1){return P('M0 -26 Q-30 -40 -34 -6 Q-34 30 0 34 Q34 30 34 -6 Q30 -40 0 -26 Z',p,4)+P('M0 -26 Q2 -40 10 -46 M4 -36 Q18 -46 24 -36 Q14 -30 4 -36',p,3)}
function drop2(p=1){return P('M0 -40 Q30 0 30 16 Q30 40 0 40 Q-30 40 -30 16 Q-30 0 0 -40 Z',p,4)}
function cloud(p=1){return P('M-110 30 Q-140 30 -140 0 Q-140 -30 -105 -30 Q-95 -70 -50 -66 Q-30 -100 15 -86 Q50 -104 75 -66 Q130 -70 128 -20 Q150 0 128 30 Z',p,5)}
function gift(p=1){return P('M-40 -30 L40 -30 L40 40 L-40 40 Z',p,4)+P('M-46 -46 L46 -46 L46 -30 L-46 -30 Z M0 -46 L0 40',p,4)+P('M0 -46 Q-26 -74 -30 -54 Q-28 -44 0 -46 Q26 -74 30 -54 Q28 -44 0 -46',p,3)}
function scroll2(p,lines,t){const w=380*ease(p),hh=230;let h=`<rect x="${-w}" y="${-hh/2}" width="${2*w}" height="${hh}" fill="#050505" ${LS} stroke-width="4"/>`;
  h+=`<g transform="translate(${-w-14} 0)"><rect x="-14" y="${-hh/2-16}" width="28" height="${hh+32}" rx="14" fill="#050505" ${LS} stroke-width="4"/></g><g transform="translate(${w+14} 0)"><rect x="-14" y="${-hh/2-16}" width="28" height="${hh+32}" rx="14" fill="#050505" ${LS} stroke-width="4"/></g>`;
  if(p>=1)lines.forEach(([txt,a,y,sz,col])=>{if(t>=a)h+=T(0,y,typed(txt,a,t,34),sz,{w:900,ls:2,filt:'',col:col||W})});return h}
function soil(p=1,open=0){return P('M-150 0 Q-110 -36 -60 -30 Q0 -44 60 -30 Q110 -36 150 0',p,5)+(open>0?`<path d="M${-40*open} -30 Q0 ${-30+24*open} ${40*open} -30" ${LS} stroke-width="4"/>`:'')}
function seed(s=1,f=0){return `<g transform="scale(${s})"><path d="M0 -60 Q44 -30 40 10 Q36 56 0 66 Q-36 56 -40 10 Q-44 -30 0 -60 Z" fill="#050505" ${LS} stroke-width="5"/>${f>0?`<g opacity="${f}"><path d="M0 50 L0 -30" ${LS} stroke-width="3"/>${[-24,-6,12].map(y=>`<path d="M0 ${y} Q-16 ${y-8} -16 ${y-22} Q-2 ${y-14} 0 ${y} Q2 ${y-14} 16 ${y-22} Q16 ${y-8} 0 ${y}" fill="${W}" opacity=".85"/>`).join('')}<path d="M0 -30 Q-8 -44 0 -52 Q8 -44 0 -30" fill="${W}"/></g>`:''}</g>`}
function sprout(g,t){if(g<=0)return '';const H=20+150*g;const sw=Math.sin(t*2)*3;let h=`<path d="M0 0 Q${sw} ${-H/2} ${sw*1.5} ${-H}" ${LS} stroke-width="4"/>`;
  const n=Math.floor(1+4*g);for(let i=0;i<n;i++){const y=-30-i*(H-30)/4;const s=i%2?1:-1;h+=`<path d="M${sw*(-y/H)} ${y} Q${s*30} ${y-6} ${s*40} ${y-26} Q${s*12} ${y-24} ${sw*(-y/H)} ${y}" fill="#050505" ${LS} stroke-width="3"/>`}
  if(g>.85)h+=`<circle cx="${sw*1.5}" cy="${-H-12}" r="${12*seg(g,.85,1)}" fill="${W}"/>`;return h}
function heart(p=1,crack=0){return P('M0 40 Q-60 0 -50 -26 Q-40 -54 0 -30 Q40 -54 50 -26 Q60 0 0 40 Z',p,5)+(crack>0?P('M0 -30 L-8 -10 L8 4 L-4 24',crack,4):'')}
function burger(){return `<path d="M-40 -6 Q-40 -40 0 -40 Q40 -40 40 -6 Z" fill="#050505" ${LS} stroke-width="4"/><path d="M-44 4 L44 4 M-40 14 Q-20 8 0 14 Q20 20 40 14" ${LS} stroke-width="4"/><path d="M-40 24 L40 24 Q40 36 28 36 L-28 36 Q-40 36 -40 24 Z" fill="#050505" ${LS} stroke-width="4"/>`}
function wallet(p=1){return P('M-60 -36 L60 -36 L60 40 L-60 40 Z',p,5)+P('M20 -6 L60 -6 L60 16 L20 16 Z',p,4)}
function cash(r=0){return `<g transform="rotate(${r})"><rect x="-30" y="-17" width="60" height="34" rx="4" fill="#050505" ${LS} stroke-width="3.5"/>${T(0,7,'$',18,{w:900,ls:0,filt:''})}</g>`}
function basket(p=1){return P('M-60 -20 L60 -20 L44 40 L-44 40 Z',p,5)+P('M-50 -20 Q0 -80 50 -20',p,4)+P('M-52 0 L52 0 M-48 20 L48 20',p,2.5)}
function hoe(a=0){return `<g transform="rotate(${a})"><path d="M0 0 L0 -150" ${LS} stroke-width="5"/><path d="M0 -150 L-34 -144 L-34 -126" ${LS} stroke-width="6"/></g>`}
function beam(o=1,t=0){return `<path d="M-30 -600 L30 -600 L130 0 L-130 0 Z" fill="url(#beamg)" opacity="${(o*(.8+.2*Math.sin(t*2))).toFixed(3)}"/>`}
function bars(p1,p2){const W1=420*p1,W2=42*p2;let h='';if(p1>0)h+=`<rect x="-240" y="-22" width="${W1}" height="44" rx="10" fill="none" ${LS} stroke-width="4"/>`;if(p2>0)h+=`<rect x="${-240+420+10}" y="-22" width="${W2}" height="44" rx="10" fill="${W}"/>`;return h}
function sunSmall(t,p=1){let h=P('M0 -30 A30 30 0 1 1 -0.1 -30',p,4);for(let i=0;i<8;i++){const a=i*Math.PI/4+t*.3;h+=P(`M${(Math.cos(a)*42).toFixed(1)} ${(Math.sin(a)*42).toFixed(1)} L${(Math.cos(a)*56).toFixed(1)} ${(Math.sin(a)*56).toFixed(1)}`,p,4)}return h}
function rain(t,o=1){let h='';for(let i=0;i<8;i++){const q=((t*1.4+i/8)%1);const x=-90+i*26;h+=`<path d="M${x} ${20+q*160} l-6 18" ${LS} stroke-width="3" opacity="${(o*(1-q)).toFixed(2)}"/>`}return h}
function seedBag(p=1){return P('M-44 -50 Q-50 -64 -30 -64 L30 -64 Q50 -64 44 -50 Q60 0 50 40 Q40 56 0 56 Q-40 56 -50 40 Q-60 0 -44 -50 Z',p,5)+P('M-36 -50 L36 -50',p,3)+(p>.8?`<g transform="translate(0 6) scale(.32)">${seed(1,0)}</g>`+T(0,84,'SEMENTES',14,{w:800,ls:3,filt:''}):'')}
