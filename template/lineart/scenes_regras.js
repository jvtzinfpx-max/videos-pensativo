// ===== Kit: Regras que funcionam pra todo mundo =====
function ball(r=16){return `<circle r="${r}" fill="#050505" ${LS} stroke-width="4"/><path d="M${-r*.5} ${-r*.3} Q0 ${-r*.8} ${r*.5} ${-r*.3}" ${LS} stroke-width="2.5"/>`}
function bigArrowDown(p=1){return P('M-40 -170 L40 -170 L40 -10 L90 -10 L0 90 L-90 -10 L-40 -10 Z',p,6)}
function candle(t,p=1){const f=Math.sin(t*9)*3;return P('M-18 0 L-18 -90 L18 -90 L18 0',p,5)+P('M-34 0 L34 0',p,4)+P('M0 -90 L0 -104',p,3)+(p>.8?`<path d="M0 ${-150+f} Q16 -126 10 -112 Q0 -100 -10 -112 Q-16 -126 0 ${-150+f}" fill="${W}" opacity=".95"/>`:'')}
function ruleBoard(t,p=1,n=0){let h=P('M-130 -150 L130 -150 L130 150 L-130 150 Z',p,5);if(p>.7)h+=T(0,-108,'REGRAS DO JOGO',18,{w:900,ls:3,filt:''});
  for(let i=0;i<4;i++){const y=-60+i*50;h+=P(`M-100 ${y-14} L-72 ${y-14} L-72 ${y+14} L-100 ${y+14} Z`,seg(p,.4+i*.1,.7+i*.1),3)+P(`M-52 ${y} L${60+(i%2)*30} ${y}`,seg(p,.5+i*.1,.8+i*.1),3);
    if(i<n)h+=`<path d="M-96 ${y} L-88 ${y+8} L-74 ${y-10}" ${LS} stroke-width="4"/>`}
  return h}
function moonGround(X,p=1){let d=`M${X-640} ${FY+30} Q${X} ${FY-40} ${X+640} ${FY+30}`;let h=P(d,p,4);
  [[-380,FY+6,40],[-120,FY-14,26],[200,FY-12,50],[440,FY+8,30]].forEach(([dx,y,r])=>{h+=P(`M${X+dx-r} ${y} Q${X+dx} ${y+r*.45} ${X+dx+r} ${y}`,p,3)});return h}
function earthSmall(t,p=1){return P('M38 0 A38 38 0 1 1 -38 0 A38 38 0 1 1 38 0',p,4)+P('M-20 -24 Q-4 -14 -12 0 Q-22 10 -8 24 M10 -30 Q20 -14 30 -12 M12 8 Q22 14 18 28',p,3)}
function helmet(o=1){return `<circle cy="-160" r="44" fill="none" ${LS} stroke-width="4" opacity="${o}"/><path d="M-30 -172 Q0 -190 30 -172" ${LS} stroke-width="3" opacity="${o}"/>`}
function hammer(){return `<path d="M0 -10 L0 60" ${LS} stroke-width="7"/><path d="M-34 -30 L34 -30 L34 -6 L-34 -6 Z" fill="#050505" ${LS} stroke-width="5"/>`}
function feather(t){const w=Math.sin(t*4)*4;return `<path d="M0 50 Q${-4+w} 0 0 -56 Q${26+w} -20 ${10+w} 30 Q4 44 0 50 Z" fill="#050505" ${LS} stroke-width="4"/><path d="M0 50 Q${2+w} 0 ${2+w} -40 M0 0 L14 -12 M0 18 L14 6 M0 -18 L12 -30" ${LS} stroke-width="2.5"/>`}
function dustPuff(x,y,q){let h='';for(let i=0;i<5;i++){const a=Math.PI+i*Math.PI/4;h+=`<circle cx="${(x+Math.cos(a)*(10+q*50)).toFixed(1)}" cy="${(y+Math.sin(a)*(6+q*20)).toFixed(1)}" r="${4+q*6}" ${LS} stroke-width="2" opacity="${(1-q).toFixed(2)}"/>`}return h}
function snowball(r){return `<circle r="${r}" fill="#050505" ${LS} stroke-width="5"/><path d="M${-r*.5} ${-r*.2} L${-r*.3} ${-r*.3} M${r*.2} ${r*.3} L${r*.4} ${r*.2} M${-r*.1} ${r*.5} L0 ${r*.45}" ${LS} stroke-width="3"/>`}
function moneyTree(t,g=1){const H=40+160*g;let h=P(`M0 0 L0 ${-H}`,1,5);const n=Math.round(1+6*g);
  for(let i=0;i<n;i++){const y=-30-i*(H-30)/Math.max(1,n-1)*.95;const s=i%2?1:-1;const sw=Math.sin(t*2+i)*3;h+=`<path d="M0 ${y} Q${s*30} ${y-10} ${s*44} ${y-4+sw}" ${LS} stroke-width="3.5"/><g transform="translate(${s*56} ${y-4+sw})"><circle r="14" fill="#050505" ${LS} stroke-width="3.5"/>${T(0,6,'$',16,{w:900,ls:0,filt:''})}</g>`}
  h+=P('M-50 0 L50 0 L40 40 L-40 40 Z',1,5);return h}
function creditCard(p=1){return P('M-110 -68 L110 -68 Q120 -68 120 -58 L120 58 Q120 68 110 68 L-110 68 Q-120 68 -120 58 L-120 -58 Q-120 -68 -110 -68 Z',p,5)+P('M-80 -26 L-40 -26 L-40 6 L-80 6 Z M-80 -10 L-40 -10 M-60 -26 L-60 6',p,3)+P('M-80 38 L-50 38 M-36 38 L-6 38 M8 38 L38 38',p,4)}
function cycleArrows(r,t){let h='';for(let i=0;i<2;i++){const a0=t*2+i*Math.PI,a1=a0+2.2;const x1=Math.cos(a1)*r,y1=Math.sin(a1)*r*.5;
  h+=`<path d="M${(Math.cos(a0)*r).toFixed(1)} ${(Math.sin(a0)*r*.5).toFixed(1)} A${r} ${r*.5} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" ${LS} stroke-width="4"/><circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="7" fill="${W}"/>`}return h}
function glassTilt(t,p=1){const a=Math.sin(t*3)*8;return `<g transform="rotate(${a})">`+P('M-36 -110 L36 -110 Q36 -50 0 -40 Q-36 -50 -36 -110 Z',p,5)+P('M0 -40 L0 0 M-30 0 L30 0',p,5)+(p>.8?`<path d="M-30 -86 Q0 ${-92+Math.sin(t*5)*4} 30 -86 Q28 -54 0 -46 Q-28 -54 -30 -86 Z" fill="${W}" opacity=".75"/>`:'')+'</g>'}
function crown(){return `<path d="M-26 -196 L-26 -214 L-13 -204 L0 -220 L13 -204 L26 -214 L26 -196 Z" fill="#050505" ${LS} stroke-width="3.5"/>`}
function puzzle(side,p=1){// side -1 left piece with tab, 1 right piece with slot
  const d=side<0?'M-110 -70 L0 -70 L0 -22 Q30 -30 30 0 Q30 30 0 22 L0 70 L-110 70 Z':'M0 -70 L110 -70 L110 70 L0 70 L0 22 Q30 30 30 0 Q30 -30 0 -22 Z';return P(d,p,5)}
function roof(p=1){return P('M-260 120 L-260 0 L60 0 L140 120',p,5)+P('M-260 0 L-200 -40 L120 -40 L60 0',p,4)}
function ladder(p=1){return P('M-20 0 L-20 330 M20 0 L20 330',p,4)+(p>.5?[40,100,160,220,280].map(y=>`<path d="M-20 ${y} L20 ${y}" ${LS} stroke-width="3"/>`).join(''):'')}
function scissors(open){const a=open*22;return `<g transform="rotate(${-a})"><path d="M0 0 L120 -6" ${LS} stroke-width="5"/><circle cx="-26" cy="-14" r="16" fill="#050505" ${LS} stroke-width="4"/></g><g transform="rotate(${a})"><path d="M0 0 L120 6" ${LS} stroke-width="5"/><circle cx="-26" cy="14" r="16" fill="#050505" ${LS} stroke-width="4"/></g>`}
function digits(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
