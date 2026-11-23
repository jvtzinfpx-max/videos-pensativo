// ===== Kit: Dois vizinhos, a mesma oração (o que o homem semear) =====
function prayGlow(t,o=1){if(o<=0)return '';let h='';for(let i=0;i<3;i++){const q=((t*.8+i/3)%1);h+=`<circle cy="-160" r="${(40+q*50).toFixed(1)}" fill="none" stroke="#fff" stroke-width="2.5" opacity="${(o*(1-q)*.8).toFixed(2)}"/>`}return h}
function numPill(n,fill=false){return `<circle r="22" fill="${fill?W:'#050505'}" stroke="${W}" stroke-width="4"/>`+T(0,9,String(n),24,{w:900,ls:0,filt:'',col:fill?'#050505':W})}
function fence(p=1){let h=P('M-70 -40 L70 -40 M-70 -80 L70 -80',p,4);for(let i=0;i<4;i++){const x=-60+i*40;h+=P(`M${x} 0 L${x} -100 L${x+6} -110 L${x+12} -100 L${x+12} 0`,seg(p,.2+i*.1,.6+i*.1),3)}return h}
function hut(p=1,door=0){let h=P('M-90 0 L-90 -110 L0 -180 L90 -110 L90 0',p,5)+P('M-104 -100 L0 -192 L104 -100',seg(p,.3,1),4);
  const dw=44*(1-door);h+=P('M-22 0 L-22 -70 L22 -70 L22 0',seg(p,.5,1),4);if(p>.6)h+=`<rect x="-22" y="-70" width="${dw.toFixed(1)}" height="70" fill="#050505" ${LS} stroke-width="3"/>`;
  h+=P('M40 -80 L70 -80 L70 -50 L40 -50 Z',seg(p,.6,1),3);return h}
function hoe(){return `<path d="M0 0 L0 -150" ${LS} stroke-width="5"/><path d="M0 -150 L-34 -150 L-40 -128" ${LS} stroke-width="5"/>`}
function soilPlot(t,p=1,furrow=0,w=220){let h=P(`M${-w/2} 0 Q0 -26 ${w/2} 0`,p,5);if(furrow>0){for(let i=0;i<4;i++){const x=-w/2+30+i*(w-60)/3;h+=P(`M${x-18} -6 L${x} -18 L${x+18} -6`,seg(furrow,i*.2,i*.2+.4),3)}}return h}
function seedDot(){return `<ellipse rx="7" ry="10" fill="${W}"/>`}
function weed(t,s=1,ph=0){const sw=Math.sin(t*3+ph)*4;return `<g transform="scale(${s})"><path d="M0 0 Q${-6+sw} -20 ${-16+sw} -30 M0 0 Q${sw} -24 ${2+sw} -38 M0 0 Q${6+sw} -18 ${16+sw} -28" ${LS} stroke-width="3"/></g>`}
function corn(t,gr=1,ph=0){if(gr<=0)return '';const H=20+170*gr;const sw=Math.sin(t*1.6+ph)*3*gr;let h=`<path d="M0 0 Q${sw} ${-H/2} ${sw*2} ${-H}" ${LS} stroke-width="4"/>`;
  const n=Math.floor(1+3*gr);for(let i=0;i<n;i++){const y=-30-i*(H-40)/3;const s=i%2?1:-1;h+=`<path d="M${sw*(-y/H)} ${y} Q${s*30} ${y-24} ${s*50} ${y-6}" ${LS} stroke-width="3"/>`}
  if(gr>.75){const k=seg(gr,.75,1);h+=`<g transform="translate(${(10+sw).toFixed(1)} ${(-H*.62).toFixed(1)}) rotate(20) scale(${k.toFixed(2)})"><path d="M0 -34 Q14 -30 14 0 Q14 26 0 30 Q-14 26 -14 0 Q-14 -30 0 -34 Z" fill="#050505" ${LS} stroke-width="3.5"/><path d="M-7 -18 L7 -18 M-9 -6 L9 -6 M-9 6 L9 6 M-7 18 L7 18" ${LS} stroke-width="2"/></g>`}
  return h}
function cloud(p=1){return P('M-90 20 Q-120 20 -116 -6 Q-112 -34 -80 -28 Q-70 -64 -30 -60 Q-2 -86 30 -62 Q70 -70 78 -34 Q118 -32 112 0 Q108 20 80 20 Z',p,5)}
function rain(t,w,h,a=1){if(a<=0)return '';let s='';for(let i=0;i<14;i++){const x=-w/2+(i+.5)*w/14;const q=((t*1.6+i*.37)%1);const y=q*h;s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${(x-4).toFixed(1)} ${(y+18).toFixed(1)}" ${LS} stroke-width="3" opacity="${(a*(1-q*.4)).toFixed(2)}"/>`}return s}
function sunIcon(t,p=1){let h=P('M30 0 A30 30 0 1 1 -30 0 A30 30 0 1 1 30 0',p,5);if(p>.6)for(let i=0;i<8;i++){const a=i*Math.PI/4+t*.4;h+=`<path d="M${(Math.cos(a)*42).toFixed(1)} ${(Math.sin(a)*42).toFixed(1)} L${(Math.cos(a)*56).toFixed(1)} ${(Math.sin(a)*56).toFixed(1)}" ${LS} stroke-width="4"/>`}return h}
function bible(p=1){return P('M-60 -80 L60 -80 L60 80 L-60 80 Z',p,5)+P('M-48 -80 L-48 80',seg(p,.3,1),3)+P('M6 -40 L6 30 M-18 -16 L30 -16',seg(p,.5,1),5)}
function openBook(t,p=1,lines=0){let h=P('M0 -70 Q-60 -90 -150 -76 L-150 70 Q-60 56 0 76 Q60 56 150 70 L150 -76 Q60 -90 0 -70 Z',p,5)+P('M0 -70 L0 76',seg(p,.3,1),3);
  for(let i=0;i<5;i++){const y=-40+i*22;h+=P(`M-130 ${y} L-24 ${y-4}`,seg(lines,i*.12,i*.12+.3),3)+P(`M24 ${y-4} L${i==2?90:130} ${y}`,seg(lines,.4+i*.1,.4+i*.1+.3),3)}return h}
function balloonQ(p=1){return P('M-80 -50 Q-80 -80 -50 -80 L50 -80 Q80 -80 80 -50 L80 -10 Q80 20 50 20 L-10 20 L-36 46 L-30 20 L-50 20 Q-80 20 -80 -10 Z',p,5)+(p>.7?T(0,-14,'POR QUÊ?',22,{w:900,ls:2,filt:''}):'')}
function arrowR(p=1,len=90){return P(`M${-len/2} 0 L${len/2} 0 M${len/2-16} -14 L${len/2} 0 L${len/2-16} 14`,p,5)}
function briefcase(p=1){return P('M-60 -40 L60 -40 L60 40 L-60 40 Z',p,5)+P('M-20 -40 L-20 -58 L20 -58 L20 -40 M-60 -4 L60 -4',seg(p,.3,1),4)}
function laptop(t,p=1){return P('M-64 -2 L-64 -82 L64 -82 L64 -2',p,5)+P('M-84 0 L84 0 L74 14 L-74 14 Z',seg(p,.3,1),4)+(p>.7?`<path d="M-44 -60 L20 -60 M-44 -42 L36 -42 M-44 -24 L${(-44+50*(.5+.5*Math.sin(t*3))).toFixed(1)} -24" ${LS} stroke-width="3"/>`:'')}
function moon(p=1){return P('M10 -34 A36 36 0 1 0 34 10 A28 28 0 1 1 10 -34 Z',p,4)}
function billNote(p=1,txt='$'){return P('M-50 -26 L50 -26 L50 26 L-50 26 Z',p,4)+(p>.6?`<circle r="12" ${LS} stroke-width="3"/>`+T(0,6,txt,14,{w:900,ls:0,filt:''}):'')}
function jar(p=1,fill=0){let h=P('M-40 -70 L40 -70 M-34 -70 L-34 -58 Q-50 -50 -50 -30 L-50 30 Q-50 44 -36 44 L36 44 Q50 44 50 30 L50 -30 Q50 -50 34 -58 L34 -70',p,5);if(fill>0)h+=`<rect x="-40" y="${(36-fill*40).toFixed(1)}" width="80" height="${(fill*40).toFixed(1)}" rx="6" fill="${W}" opacity=".7"/>`;return h}
function debtTag(p=1){return P('M-70 -30 L50 -30 L74 0 L50 30 L-70 30 Z',p,4)+(p>.6?T(-6,8,'DÍVIDA',18,{w:900,ls:3,filt:''}):'')}
function basket(p=1){return P('M-50 -30 L50 -30 L40 20 L-40 20 Z',p,5)+P('M-44 -6 L44 -6',seg(p,.4,1),3)+P('M-30 -30 Q0 -80 30 -30',seg(p,.5,1),4)}
function sprout(k){if(k<=0)return '';const H=50*k;return `<path d="M0 0 L0 ${-H}" ${LS} stroke-width="4"/><path d="M0 ${-H*.6} Q-22 ${-H*.9} -26 ${-H*.6} Q-14 ${-H*.4} 0 ${-H*.6} M0 ${-H*.8} Q22 ${-H*1.1} 26 ${-H*.8} Q14 ${-H*.6} 0 ${-H*.8}" fill="#050505" ${LS} stroke-width="3"/>`}
function cob(){return `<path d="M0 -34 Q14 -30 14 0 Q14 26 0 30 Q-14 26 -14 0 Q-14 -30 0 -34 Z" fill="#050505" ${LS} stroke-width="3.5"/><path d="M-7 -18 L7 -18 M-9 -6 L9 -6 M-9 6 L9 6 M-7 18 L7 18" ${LS} stroke-width="2"/>`}
