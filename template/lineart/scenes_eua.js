// ===== Kit: E se o Brasil adotasse o modelo dos EUA =====
// Brazil flag line-art ~180x120 centered
function flagBR(t,p=1){const w=Math.sin(t*3)*3;return P(`M-90 -60 L90 ${-60+w} L90 ${60+w} L-90 60 Z`,p,5)+P('M0 -46 L74 0 L0 46 L-74 0 Z',seg(p,.3,1),4)+P('M-26 0 A26 26 0 1 1 26 0 A26 26 0 1 1 -26 0',seg(p,.5,1),4)+P('M-24 -6 Q0 -16 24 4',seg(p,.7,1),3)}
function flagUS(t,p=1){const w=Math.sin(t*3+1)*3;let h=P(`M-90 -60 L90 ${-60+w} L90 ${60+w} L-90 60 Z`,p,5);
  for(let i=1;i<6;i++){const y=-60+i*20;h+=P(`M${i<3?-10:-90} ${y} L90 ${y+w*(i/6)}`,seg(p,.3+i*.08,.6+i*.08),3)}
  h+=P('M-90 -20 L-10 -20 L-10 -60',seg(p,.3,.6),3);
  if(p>.7)for(let i=0;i<6;i++){const x=-76+(i%3)*24,y=-48+Math.floor(i/3)*16;h+=`<circle cx="${x}" cy="${y}" r="3" fill="${W}" opacity="${seg(p,.7,1)}"/>`}
  return h}
function pole(p=1){return P('M-100 -60 L-100 200',p,4)}
// rule book with cover text
function book(t,p=1,label='REGRAS',flip=0){let h=P('M-80 -100 L70 -100 Q80 -100 80 -90 L80 90 Q80 100 70 100 L-80 100 Z',p,5)+P('M-62 -100 L-62 100',p,3);
  if(flip>0&&flip<1){const k=Math.cos(flip*Math.PI);h+=`<path d="M-62 -100 L${(-62+142*k).toFixed(1)} -94 L${(-62+142*k).toFixed(1)} 94 L-62 100" fill="#050505" ${LS} stroke-width="4"/>`}
  if(p>.8)h+=T(10,-10,label,label.length>5?20:28,{w:900,ls:3,filt:''})+`<path d="M-30 30 L50 30 M-30 50 L30 50" stroke="${W}" stroke-width="3" opacity=".6"/>`;return h}
// jeans pocket
function pocket(p=1,notes=0,t=0){let h='';
  if(notes>0){for(let i=0;i<3;i++){const y=-40-notes*50+i*12;const r=-12+i*12+Math.sin(t*3+i)*3;h+=`<g transform="translate(${-20+i*20} ${y}) rotate(${r})"><rect x="-34" y="-20" width="68" height="40" rx="4" fill="#050505" ${LS} stroke-width="3.5"/>${T(0,8,'$',22,{w:900,ls:0,filt:''})}</g>`}}
  h+=`<path d="M-80 -60 L80 -60 L74 40 Q0 90 -74 40 Z" fill="#050505" stroke="none"/>`;
  h+=P('M-80 -60 L80 -60 L74 40 Q0 90 -74 40 Z',p,5)+P('M-80 -60 Q0 0 80 -60',p,4)+P('M-70 -40 Q0 18 70 -40',p,2,'stroke-dasharray="6 8"');
  return h}
// pizza of production with slice removed (frac 0..1), slice offset off
function pizza(p=1,frac=0,off=0){const r=110;let h=P(`M${r} 0 A${r} ${r} 0 1 1 ${-r} 0 A${r} ${r} 0 1 1 ${r} 0`,p,5);
  for(let i=0;i<6;i++){const a=i*Math.PI/3+.4;h+=`<circle cx="${(Math.cos(a)*60).toFixed(1)}" cy="${(Math.sin(a)*60).toFixed(1)}" r="9" ${LS} stroke-width="3" opacity="${p}"/>`}
  if(frac>0){const a1=-Math.PI/2,a2=a1+frac*Math.PI*2;const ox=Math.cos((a1+a2)/2)*off,oy=Math.sin((a1+a2)/2)*off;
    h+=`<path d="M0 0 L${(Math.cos(a1)*r).toFixed(1)} ${(Math.sin(a1)*r).toFixed(1)} A${r} ${r} 0 0 1 ${(Math.cos(a2)*r).toFixed(1)} ${(Math.sin(a2)*r).toFixed(1)} Z" fill="#050505" stroke="#050505" stroke-width="6"/>`;
    h+=`<path transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)})" d="M0 0 L${(Math.cos(a1)*r).toFixed(1)} ${(Math.sin(a1)*r).toFixed(1)} A${r} ${r} 0 ${frac>.5?1:0} 1 ${(Math.cos(a2)*r).toFixed(1)} ${(Math.sin(a2)*r).toFixed(1)} Z" fill="${W}" fill-opacity=".9" ${LS} stroke-width="4"/>`}
  return h}
function jar(p=1,lvl=0){let h=P('M-50 -70 L50 -70 M-44 -70 Q-60 -40 -56 30 Q-54 60 -30 60 L30 60 Q54 60 56 30 Q60 -40 44 -70',p,5);
  if(lvl>0)h+=`<path d="M-54 ${(56-100*lvl).toFixed(1)} L54 ${(56-100*lvl).toFixed(1)} L54 30 Q52 56 30 56 L-30 56 Q-52 56 -54 30 Z" fill="${W}" opacity=".8"/>`;return h}
function note(r=0){return `<g transform="rotate(${r})"><rect x="-34" y="-20" width="68" height="40" rx="4" fill="#050505" ${LS} stroke-width="3.5"/>${T(0,8,'$',22,{w:900,ls:0,filt:''})}</g>`}
function hireSign(p=1,t=0){const sw=Math.sin(t*2.4)*5;return `<g transform="rotate(${sw})">`+P('M-30 -150 L0 -180 L30 -150',p,3)+P('M-90 -150 L90 -150 L90 -80 L-90 -80 Z',p,5)+(p>.8?T(0,-106,'CONTRATA-SE',18,{w:900,ls:2,filt:''}):'')+'</g>'}
// unrolling paper scroll from desk height downwards along floor, len 0..1
function scroll(len,t){const L=40+len*560;let d=`M0 -150 L0 0 L${L} 0`;let h=`<path d="${d}" ${LS} stroke-width="4"/>`;
  for(let x=30;x<L-20;x+=34)h+=`<path d="M${x} -10 L${x+20} -10" stroke="${W}" stroke-width="2.5" opacity=".6"/>`;
  h+=`<circle cx="${L}" cy="-14" r="16" fill="#050505" ${LS} stroke-width="4"/><circle cx="${L}" cy="-14" r="5" fill="${W}" transform="rotate(${t*400} ${L} -14)"/>`;return h}
function sheet(p=1){return P('M-40 -55 L28 -55 L40 -43 L40 55 L-40 55 Z',p,4)+P('M-24 -30 L24 -30 M-24 -12 L24 -12 M-24 6 L12 6',p,3)}
function garage(p=1,door=0){let h=P('M-160 0 L-160 -150 L0 -230 L160 -150 L160 0',p,5);
  const dh=150-140*door;h+=P(`M-110 0 L-110 -140 L110 -140 L110 0`,seg(p,.3,1),4);
  for(let y=-140+dh*0;y<-6&&p>.6;y+=24){const yy=lerp(-140,-6,(y+140)/134);if(yy<-140+140*door)continue;h+=`<path d="M-104 ${yy.toFixed(1)} L104 ${yy.toFixed(1)}" stroke="${W}" stroke-width="3" opacity=".7"/>`}
  return h}
function moneyBag(p=1){return P('M-20 -62 L20 -62 L10 -46 Q56 -20 52 22 Q48 56 0 56 Q-48 56 -52 22 Q-56 -20 -10 -46 Z',p,5)+(p>.7?T(0,26,'$',44,{w:900,ls:0,filt:''}):'')}
function tower(h=1,p=1,t=0){const H=420*h;let s=P(`M-70 0 L-70 ${-H} L70 ${-H} L70 0`,p,5)+P(`M0 ${-H} L0 ${-H-60}`,p,3);
  for(let y=-40;y>-H+20;y-=46)for(let x=-44;x<=44;x+=44){const on=Math.sin(x*3.1+y*1.7+t*2)>-.3;s+=`<rect x="${x-12}" y="${y-16}" width="24" height="24" rx="3" fill="${on?W:'none'}" ${on?'':LS} stroke-width="2" opacity="${on?.55:.6}"/>`}
  return s}
function coinStack(n,t,p=1){let h='';for(let i=0;i<n;i++){h+=`<ellipse cx="0" cy="${-i*14}" rx="30" ry="9" fill="#050505" ${LS} stroke-width="3.5"/>`}return h}
function susCard(p=1){return P('M-90 -56 L90 -56 Q100 -56 100 -46 L100 46 Q100 56 90 56 L-90 56 Q-100 56 -100 46 L-100 -46 Q-100 -56 -90 -56 Z',p,5)+P('M-56 -14 L-40 -14 L-40 -30 L-24 -30 L-24 -14 L-8 -14 L-8 2 L-24 2 L-24 18 L-40 18 L-40 2 L-56 2 Z',p,4)+(p>.8?T(46,10,'SUS',28,{w:900,ls:2,filt:''}):'')}
function ambulance(p=1,t=0){const l=Math.sin(t*14)>0;return P('M-120 0 L-120 -90 L40 -90 L40 -60 L90 -60 L120 -30 L120 0 Z',p,5)+P('M-60 -66 L-60 -26 M-80 -46 L-40 -46',p,5)+
  `<circle cx="-70" cy="4" r="20" fill="#050505" ${LS} stroke-width="5"/><circle cx="70" cy="4" r="20" fill="#050505" ${LS} stroke-width="5"/>`+`<rect x="-10" y="-108" width="22" height="16" rx="4" fill="${l?W:'none'}" ${LS} stroke-width="3"/>`}
function clipboard(p=1,amt=''){return P('M-80 -110 L80 -110 L80 110 L-80 110 Z',p,5)+P('M-30 -120 L30 -120 L30 -96 L-30 -96 Z',p,4)+P('M-50 -60 L50 -60 M-50 -36 L30 -36 M-50 -12 L40 -12',p,3)+(p>.8?T(0,60,amt,30,{w:900,ls:1,filt:''}):'')}
function umbrella(p=1){return P('M-80 -60 Q0 -130 80 -60 Q60 -70 40 -60 Q20 -70 0 -60 Q-20 -70 -40 -60 Q-60 -70 -80 -60 Z',p,5)+P('M0 -100 L0 40',p,4)+P('M-60 40 Q0 20 60 40',p,3)}
function envelope(p=1,txt='13º'){return P('M-70 -46 L70 -46 L70 46 L-70 46 Z',p,5)+P('M-70 -46 L0 8 L70 -46',p,4)+(p>.8?T(0,36,txt,22,{w:900,ls:1,filt:''}):'')}
function backpack(sz=1){return `<g transform="scale(${sz})"><path d="M-34 -70 Q-34 -96 0 -96 Q34 -96 34 -70 L34 10 Q34 22 22 22 L-22 22 Q-34 22 -34 10 Z" fill="#050505" ${LS} stroke-width="5"/><path d="M-20 -30 L20 -30 L20 0 L-20 0 Z" ${LS} stroke-width="3.5"/></g>`}
function seesaw(tilt,p=1){return P('M-30 0 L0 -56 L30 0 Z',p,5)+`<g transform="translate(0 -56) rotate(${tilt.toFixed(2)})">${P('M-260 0 L260 0',p,6)}</g>`}
function swapArrows(t){return `<path d="M-50 -14 L50 -14 M34 -28 L50 -14 L34 0" ${LS} stroke-width="5"/><path d="M50 14 L-50 14 M-34 0 L-50 14 L-34 28" ${LS} stroke-width="5"/>`}
function peopleGrid(n,t,cols=10){let h='';for(let i=0;i<n;i++){const x=(i%cols-(cols-1)/2)*34,y=Math.floor(i/cols)*48;h+=`<g transform="translate(${x} ${y}) scale(.17)"><path d="M-40 0 L-40 -82 A40 40 0 0 1 40 -82 L40 0 Z" fill="${W}"/><circle cy="-160" r="31" fill="${W}"/></g>`}return h}
