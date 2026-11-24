// ===== Kit: Planária — o bicho que você corta e vira dois =====
const GOLD='#F2B53A',BLUE='#4DA6E8',GREEN='#5CC97A',PINK='#D99A86',RED='#E5534B';
function PC(d,p=1,sw=5,col=W,extra=''){if(p<=0)return '';return `<path d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${(1-clamp(p)).toFixed(4)}" stroke="${col}" fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`}
// planaria body segment between fractions u0..u1 (0 = tail, 1 = head). L = full length. Drawn centred on full-body centre.
function pw(u){const k=Math.pow(Math.sin(Math.PI*(u*.92+.04)),.55);return 30*k*(u>.78?1.08:1)}
function planaria(t,{u0=0,u1=1,L=340,ph=0,glow=0,col=PINK}={}){
  const N=40;const top=[],bot=[];
  for(let i=0;i<=N;i++){const u=u0+(u1-u0)*i/N;const x=(u-.5)*L;const wv=Math.sin(t*3+u*7+ph)*5;let w=pw(u);
    if(u>.84&&u1>.95){const a=(u-.84)/.16;w=w*(1-.35*a)+ (a>.25&&a<.55?10*Math.sin(Math.PI*(a-.25)/.3):0)}
    top.push([x,wv-w]);bot.push([x,wv+w])}
  let d='M'+top.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L ')+' L '+bot.reverse().map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L ')+' Z';
  let h=`<path d="${d}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="4" stroke-linejoin="round"/>`;
  if(u1>.95){const x=(.9-.5)*L;const wv=Math.sin(t*3+.9*7+ph)*5;h+=`<ellipse cx="${x.toFixed(1)}" cy="${(wv-8).toFixed(1)}" rx="5" ry="4" fill="#050505" stroke="${W}" stroke-width="2"/><ellipse cx="${x.toFixed(1)}" cy="${(wv+8).toFixed(1)}" rx="5" ry="4" fill="#050505" stroke="${W}" stroke-width="2"/><circle cx="${(x+1.5).toFixed(1)}" cy="${(wv-7).toFixed(1)}" r="1.8" fill="${W}"/><circle cx="${(x+1.5).toFixed(1)}" cy="${(wv+9).toFixed(1)}" r="1.8" fill="${W}"/>`}
  if(glow>0){for(let i=0;i<14;i++){const u=u0+(u1-u0)*((i*.37+.1)%1);const x=(u-.5)*L;const y=Math.sin(t*3+u*7+ph)*5+Math.sin(i*2.3)*pw(u)*.55;h+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3+1.5*Math.sin(t*6+i)).toFixed(1)}" fill="${GREEN}" opacity="${(glow*(.6+.4*Math.sin(t*5+i))).toFixed(2)}"/>`}}
  return h}
function blade(){return `<path d="M-12 -90 L12 -90 L12 40 L0 60 L-12 40 Z" fill="#050505" stroke="#cfd6dc" stroke-width="4" stroke-linejoin="round"/><path d="M-12 -90 L-12 -130 L12 -130 L12 -90" fill="#050505" ${LS} stroke-width="4"/>`}
function cutFlash(q){if(q<=0||q>=1)return '';return `<path d="M0 -70 L0 70" stroke="#fff" stroke-width="${(6*(1-q)).toFixed(1)}" opacity="${(1-q).toFixed(2)}" stroke-linecap="round"/>`}
function finger(p=1){return PC('M-140 40 L60 40 Q110 40 110 0 Q110 -40 60 -40 L-140 -40',p,5)+PC('M50 -30 Q90 -30 92 0 Q90 30 50 30 Q40 0 50 -30 Z',seg(p,.4,1),3.5)}
function waterLines(t,w=600,a=1){let h='';for(let i=0;i<3;i++){const y=i*26;let d=`M${-w/2} ${y}`;for(let k=0;k<12;k++){const x0=-w/2+k*w/12;d+=` Q${(x0+w/48).toFixed(1)} ${(y-6*Math.sin(t*2+k+i)).toFixed(1)} ${(x0+w/24).toFixed(1)} ${y} T${(x0+w/12).toFixed(1)} ${y}`}h+=`<path d="${d}" stroke="${BLUE}" stroke-width="${i==0?4:2.5}" fill="none" opacity="${(a*(i==0?1:.5)).toFixed(2)}"/>`}return h}
function weedPlant(t,ph=0){const s=Math.sin(t*1.5+ph)*6;return `<path d="M0 0 Q${s} -40 ${s*1.5} -80 M0 0 Q${-10+s} -30 ${-24+s} -54 M0 0 Q${10+s} -34 ${22+s} -62" stroke="${GREEN}" stroke-width="4" fill="none" stroke-linecap="round"/>`}
function pctLens(t,a){return `<circle r="${(46+3*Math.sin(t*5)).toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="4" stroke-dasharray="8 6" opacity="${a.toFixed(2)}"/>`}
function eyeIcon(){return `<path d="M-34 0 Q0 -28 34 0 Q0 28 -34 0 Z" fill="#050505" ${LS} stroke-width="4"/><circle r="10" fill="${W}"/>`}
function mouthIcon(){return `<path d="M-30 -6 Q0 30 30 -6 Q0 6 -30 -6 Z" fill="#050505" ${LS} stroke-width="4"/>`}
function brainIcon(){return `<path d="M0 -30 Q-20 -40 -32 -24 Q-48 -20 -42 0 Q-50 18 -30 26 Q-18 40 0 30 Q18 40 30 26 Q50 18 42 0 Q48 -20 32 -24 Q20 -40 0 -30 Z" fill="#050505" ${LS} stroke-width="4"/><path d="M0 -30 L0 30 M-22 -8 Q-12 0 -22 10 M22 -8 Q12 0 22 10" ${LS} stroke-width="3"/>`}
function maze(p=1){return PC('M-260 -110 L260 -110 L260 110 L-260 110 Z',p,5)+PC('M-140 -110 L-140 40 M-20 110 L-20 -40 M100 -110 L100 40',seg(p,.3,1),5)}
const MAZE_PATH=[[-220,70],[-200,-70],[-80,-70],[-80,70],[40,70],[40,-70],[160,-70],[200,60]];
function mazePos(q){const P=MAZE_PATH;let L=0;const segs=[];for(let i=1;i<P.length;i++){const l=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);segs.push(l);L+=l}let d=q*L;for(let i=0;i<segs.length;i++){if(d<=segs[i]){const k=d/segs[i];return [lerp(P[i][0],P[i+1][0],k),lerp(P[i][1],P[i+1][1],k),Math.atan2(P[i+1][1]-P[i][1],P[i+1][0]-P[i][0])]}d-=segs[i]}const n=P.length-1;return [P[n][0],P[n][1],0]}
function foodDot(t){return `<circle r="${(14+2*Math.sin(t*5)).toFixed(1)}" fill="${GOLD}" fill-opacity=".5" stroke="${GOLD}" stroke-width="4"/>`}
function microscope(p=1){return PC('M-60 0 L60 0 M0 0 L0 -20 M-30 -20 L30 -20 M10 -20 Q40 -60 20 -110 L-10 -170 M-24 -164 L4 -178 L22 -140 L-6 -126 Z M-30 -70 L20 -70',p,5)}
function labCoat(){return `<path d="M-40 -6 L-40 -80 Q-40 -112 -20 -118 L0 -96 L20 -118 Q40 -112 40 -80 L40 -6" fill="none" stroke="#050505" stroke-width="3"/><path d="M0 -96 L0 -6" stroke="#050505" stroke-width="3"/>`}
function healSparkle(t,a){if(a<=0)return '';let h='';for(let i=0;i<5;i++){const q=((t*.9+i*.2)%1);const x=Math.sin(i*2.1)*40;h+=`<path transform="translate(${x.toFixed(1)} ${(-q*80).toFixed(1)}) scale(${(1-q*.5).toFixed(2)})" d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z" fill="${GREEN}" opacity="${(a*(1-q)).toFixed(2)}"/>`}return h}
function spotCone(a){return a>0?`<path d="M-50 -560 L50 -560 L170 10 L-170 10 Z" fill="url(#cone)" opacity="${a.toFixed(2)}"/>`:''}
