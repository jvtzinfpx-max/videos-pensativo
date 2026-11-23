// ===== Kit: E se você parasse de tomar café =====
// mug side view, base at y=0, ~120 wide. steam 0..1, bolt 0..1 (steam vira raio), fill level 0..1
function mug(t,p=1,o={}){let h='';
  h+=P('M-56 -100 L-50 -12 Q-48 0 -34 0 L34 0 Q48 0 50 -12 L56 -100 Z',p,5);
  h+=P('M54 -80 Q92 -80 90 -52 Q88 -26 50 -28',p,5);
  h+=P('M-80 8 L80 8',p,4);
  if(o.coffee){h+=`<path d="M-53 -86 Q0 ${-80+Math.sin(t*4)*3} 53 -86" stroke="${W}" stroke-width="3" fill="none" opacity="${o.coffee}"/>`}
  const st=o.steam||0;
  if(st>0){for(let i=0;i<3;i++){const x=-24+i*24;const ph=t*2.2+i*1.7;let d=`M${x} -112`;for(let k=1;k<=6;k++){d+=` L${(x+Math.sin(ph+k*.9)*7).toFixed(1)} ${(-112-k*12)}`}
      h+=`<path d="${d}" stroke="${W}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="${(st*(.55+.35*Math.sin(ph))).toFixed(3)}"/>`}}
  return h}
function bolt(s=1){return `<path transform="scale(${s})" d="M8 -46 L-18 4 L0 4 L-8 46 L20 -6 L2 -6 Z" fill="${W}" stroke="${W}" stroke-width="3" stroke-linejoin="round"/>`}
// simple brain outline ~150 wide centred
function brain(p=1){return P('M-10 -58 Q-40 -74 -58 -50 Q-84 -48 -80 -18 Q-96 4 -76 26 Q-74 54 -42 54 Q-24 70 -4 56 L-4 -58 Z',p,5)+
  P('M4 -58 Q34 -74 54 -52 Q82 -48 78 -18 Q96 4 76 26 Q72 54 40 54 Q22 70 4 56 Z',p,5)+
  P('M-56 -20 Q-40 -30 -30 -14 M-60 18 Q-40 6 -26 24 M54 -22 Q38 -30 28 -12 M60 16 Q40 6 28 26',p,3)}
// molecules
function hexPts(r){let s='';for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;s+=(i?' L':'M')+(Math.cos(a)*r).toFixed(1)+' '+(Math.sin(a)*r).toFixed(1)}return s+' Z'}
function adeno(s=1,o=1,dim=0){return `<g transform="scale(${s.toFixed(3)})" opacity="${o.toFixed(3)}"><path d="${hexPts(20)}" fill="#050505" ${LS} stroke-width="4"/><path d="M-7 -6 L7 -6 L-7 7 L7 7" ${LS} stroke-width="3.5"/></g>`}
function caff(s=1,o=1){return `<g transform="scale(${s.toFixed(3)})" opacity="${o.toFixed(3)}"><path d="${hexPts(20)}" fill="${W}" stroke="${W}" stroke-width="3" stroke-linejoin="round"/><path d="M19 -11 L40 -18 L50 2 L35 18 L19 11 Z" fill="#050505" stroke="${W}" stroke-width="4" stroke-linejoin="round"/></g>`}
// receptor socket on membrane, opening upward; molecule seat at (x, y-34)
function socket(x,y,p=1,lock=0,glow=0){if(p<=0)return '';const s=back(p);
  let h=`<g transform="translate(${x} ${y}) scale(${s.toFixed(3)})"><path d="M-32 0 L-32 -50 M32 0 L32 -50 M-32 -8 Q0 6 32 -8" ${LS} stroke-width="5"/>`;
  if(lock>0){h+=`<path d="M-36 -54 L${(-36+72*ease(lock)).toFixed(1)} -54" ${LS} stroke-width="7"/>`}
  if(glow>0)h+=`<circle cy="-30" r="42" ${LS} stroke-width="2.5" opacity="${glow}"/>`;
  return h+'</g>'}
function membrane(x0,x1,y,p=1){return P(`M${x0} ${y} L${x1} ${y}`,p,3,'stroke-opacity=".75"')+P(`M${x0} ${y+14} L${x1} ${y+14}`,p,2,'stroke-dasharray="6 10" stroke-opacity=".4"')}
// hourglass, flip 0..1 rotation, sand 0..1 fallen
function hourglass(t,p=1,flip=0,sand=0){let h=`<g transform="rotate(${(180*eio(flip)).toFixed(1)})">`;
  h+=P('M-50 -90 L50 -90 M-50 90 L50 90',p,6)+P('M-40 -90 Q-40 -30 -6 0 Q-40 30 -40 90 M40 -90 Q40 -30 6 0 Q40 30 40 90',p,5);
  h+='</g>';
  if(flip>=1&&p>=1){const top=1-sand,bot=sand;
    h+=`<path d="M${-30*top} ${-10-60*top} L${30*top} ${-10-60*top} L4 -6 L-4 -6 Z" fill="${W}" opacity=".9"/>`;
    h+=`<path d="M-34 84 L34 84 L${(34-20*bot).toFixed(1)} ${(84-50*bot).toFixed(1)} L${(-34+20*bot).toFixed(1)} ${(84-50*bot).toFixed(1)} Z" fill="${W}" opacity=".9"/>`;
    if(sand<1)h+=`<path d="M0 -4 L0 ${(80-50*bot).toFixed(1)}" stroke="${W}" stroke-width="2" stroke-dasharray="4 5" stroke-dashoffset="${(-t*40).toFixed(1)}"/>`}
  return h}
// graduated cylinder (proveta) with liquid level 0..1; height 260, base y=0
function beaker(t,p=1,lvl=1){let h=P('M-50 -260 L-50 -14 Q-50 0 -36 0 L36 0 Q50 0 50 -14 L50 -260 M-62 -260 L-50 -260 M50 -260 L62 -260',p,5);
  h+=P('M-80 4 L80 4',p,4);
  for(let i=1;i<5;i++)h+=P(`M50 ${-i*50} L32 ${-i*50}`,p,3);
  if(p>=1&&lvl>0){const y=-8-232*lvl;let d=`M-44 ${y.toFixed(1)}`;for(let x=-44;x<=44;x+=8)d+=` L${x} ${(y+Math.sin(x*.12+t*3)*3).toFixed(1)}`;d+=' L44 -10 Q44 -6 36 -6 L-36 -6 Q-44 -6 -44 -10 Z';
    h+=`<path d="${d}" fill="${W}" opacity=".85"/>`}
  return h}
function sun(t,p=1){let h=P('M0 -34 A34 34 0 1 1 -0.1 -34',p,5);for(let i=0;i<8;i++){const a=i*Math.PI/4+t*.4;h+=P(`M${(Math.cos(a)*48).toFixed(1)} ${(Math.sin(a)*48).toFixed(1)} L${(Math.cos(a)*64).toFixed(1)} ${(Math.sin(a)*64).toFixed(1)}`,p,4)}return h}
function moon(t,p=1){let h=P('M10 -40 A40 40 0 1 0 34 26 A32 32 0 1 1 10 -40 Z',p,5);
  [[60,-50],[-60,-60],[70,20]].forEach(([x,y],i)=>{const k=.6+.4*Math.sin(t*3+i*2);h+=`<path transform="translate(${x} ${y}) scale(${k.toFixed(2)})" d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="${W}" opacity="${p}"/>`});return h}
// capsule person drawn as outline with liquid inside (feet at 0,0)
function personLiquid(t,lvl,o=1){const br=Math.sin(t*2.2);let h=`<path d="M-40 0 L-40 -82 A40 40 0 0 1 40 -82 L40 0 Z" fill="#050505" ${LS} stroke-width="5"/><circle cy="${-160-2*br}" r="31" fill="#050505" ${LS} stroke-width="5"/>`;
  const y=-122*lvl;let d=`M-37 ${y.toFixed(1)}`;for(let x=-37;x<=37;x+=6)d+=` L${x} ${(y+Math.sin(x*.15+t*3)*3).toFixed(1)}`;d+=' L37 -3 L-37 -3 Z';
  h+=`<path d="${d}" fill="${W}" opacity=".8"/>`;return `<g opacity="${o}" filter="url(#tg)">${h}</g>`}
// curved arrow segment on circle
function arcArrow(cx,cy,r,a0,a1,p=1){const a=lerp(a0,a1,clamp(p));if(p<=0)return '';const x0=cx+Math.cos(a0)*r,y0=cy+Math.sin(a0)*r,x1=cx+Math.cos(a)*r,y1=cy+Math.sin(a)*r;
  const tx=-Math.sin(a),ty=Math.cos(a);const hx=x1-tx*16,hy=y1-ty*16;const nx=Math.cos(a)*10,ny=Math.sin(a)*10;
  return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" ${LS} stroke-width="4"/>`+(p>.15?`<path d="M${(hx+nx).toFixed(1)} ${(hy+ny).toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)} L${(hx-nx).toFixed(1)} ${(hy-ny).toFixed(1)}" ${LS} stroke-width="4"/>`:'')}
function zzz(x,y,t,o=1,big=1){let h='';for(let i=0;i<3;i++){const q=((t*.5+i/3)%1);h+=T((x+q*40+i*6).toFixed(1),(y-q*90).toFixed(1),'Z',(18+i*6)*big,{w:900,ls:0,op:(o*Math.sin(q*Math.PI)).toFixed(3)})}return h}
function receipt(p,t){const hgt=150*ease(p);let d=`M-60 0 L-60 ${-hgt} `;let zz='';for(let x=-60;x<=60;x+=12){zz+=`L${x} ${(-hgt+((x/12)%2?8:0))} `}
  return `<path d="M-60 0 ${zz.replace('L','L')} L60 0 Z" fill="#050505" ${LS} stroke-width="4"/>`+(p>.6?T(0,-hgt+40,'CONTA',18,{w:900,ls:4,filt:''})+`<path d="M-40 ${-hgt+62} L40 ${-hgt+62} M-40 ${-hgt+82} L20 ${-hgt+82}" stroke="${W}" stroke-width="3" opacity=".7"/>`+T(0,-hgt+118,'CANSAÇO',16,{w:800,ls:3,filt:''}):'')}
function painLines(x,y,t,o){let h='';for(let i=0;i<6;i++){const a=-Math.PI/2+(i-2.5)*.42;const r0=46+4*Math.sin(t*14+i),r1=r0+26;const mx=(r0+r1)/2;
  const p1=[Math.cos(a)*r0,Math.sin(a)*r0],pm=[Math.cos(a+.18)*mx,Math.sin(a+.18)*mx],p2=[Math.cos(a)*r1,Math.sin(a)*r1];
  h+=`<path d="M${(x+p1[0]).toFixed(1)} ${(y+p1[1]).toFixed(1)} L${(x+pm[0]).toFixed(1)} ${(y+pm[1]).toFixed(1)} L${(x+p2[0]).toFixed(1)} ${(y+p2[1]).toFixed(1)}" ${LS} stroke-width="4" opacity="${o}"/>`}return `<g filter="url(#tg)">${h}</g>`}
function scribble(t,p=1){let d='M-50 0';for(let i=1;i<=40;i++){const a=i*.75;d+=` L${(Math.cos(a)*(30+i%3*10)+i*2.5-50).toFixed(1)} ${(Math.sin(a)*22).toFixed(1)}`}return P(d,p,3.5)}
function dayRuler(x0,x1,y,p,n=9){let h=P(`M${x0} ${y} L${x1} ${y}`,p,4);for(let i=0;i<n;i++){const x=lerp(x0,x1,i/(n-1));const a=seg(p,i/n*.8,i/n*.8+.25);if(a<=0)continue;h+=`<path d="M${x} ${y-12} L${x} ${y+12}" ${LS} stroke-width="4" opacity="${a}"/>`+T(x,y+44,String(i+1),20,{w:800,ls:1,op:a,filt:''})}return h}
function weight(p=1){return P('M-46 0 L-34 -60 L34 -60 L46 0 Z',p,5)+P('M-14 -60 Q-14 -84 0 -84 Q14 -84 14 -60',p,5)}
