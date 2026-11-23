const CAM=[
 [0,0,560,1.1,0],[0.3,0,560,1.0,4.6],
 [4.9,1500,560,1,.7],[5.04,1500,500,1.02,.8],[8.1,1500,560,1,.6],
 [14.6,3000,560,1,.75],
 [27.9,4500,540,1,.75],
 [35.0,6000,560,1,.75],
 [42.2,7500,560,1,.75],
 [50.1,9000,540,1,.75],
 [58.5,10500,560,1,.9],[61.8,10500,580,1.06,3.5],
];
const PUNCH=[[0.96,.04],[3.82,.04],[9.74,.05],[17.9,.05],[21.82,.06],[27.66,.04],[30.92,.05],[38.96,.04],[43.86,.04],[49.62,.04],[52.14,.05],[57.98,.05]];
const SHAKE=[[52.14,.6,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.05,'TEM DINHEIRO PARADO','NO TELHADO DO SEU VIZINHO',0.96],[2.8,'E QUASE NINGUÉM ENXERGA'],
 [5.04,'OLHA PRA CIMA'],[6.1,'AS PLACAS DE','ENERGIA SOLAR',6.88],[8.22,'O BRASIL JÁ TEM','MAIS DE 2 MILHÕES DE CASAS COM ELAS',9.06],[11.72,'SÓ QUE TEM UM DETALHE','QUE QUASE NENHUM DONO SABE',12.82],
 [15.82,'POEIRA'],[16.8,'FOLHA'],[17.36,'COCÔ DE PASSARINHO'],[18.42,'VÃO GRUDANDO','NO VIDRO',19.1],[20.12,'A PLACA SUJA','GERA ATÉ 20% MENOS ENERGIA',21.04],[24.16,'A PESSOA PAGOU CARO...'],[26.24,'...E ESTÁ PERDENDO','ENERGIA DE GRAÇA',26.62],
 [28.14,'QUEM VAI SUBIR','PRA LIMPAR?',29.16],[30.62,'O DONO NÃO VAI'],[31.6,'NÃO TEM TEMPO'],[32.52,'NÃO TEM ESCADA'],[33.24,'E TEM MEDO DE ALTURA'],
 [35.16,'É AÍ QUE ENTRA','O SERVIÇO',35.76],[37.08,'ÁGUA'],[37.66,'ESCOVA MACIA'],[38.66,'E UM RODO'],[39.58,'SEM PRODUTO FORTE','PRA NÃO ESTRAGAR O VIDRO',40.58],
 [42.36,'UMA CASA COMUM','TEM UMAS 10 PLACAS',43.12],[44.68,'O IDEAL É LIMPAR','MAIS DE UMA VEZ POR ANO',45.42],[47.32,'O MESMO CLIENTE','TE CHAMA DE NOVO',48.5],
 [50.28,'MAS ATENÇÃO'],[51.4,'TELHADO É PERIGOSO'],[53.3,'FAÇA UM CURSO DE','TRABALHO EM ALTURA',54.04],[55.06,'USE CINTO','DE SEGURANÇA',55.56],[56.54,'SEM ISSO','NÃO SOBE',57.74],
 [58.76,'ENTÃO...'],[59.44,'DA PRÓXIMA VEZ QUE','VOCÊ OLHAR PRA SUA RUA',60.62],[61.84,'PERGUNTE:'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fall(t,t0,y0,y1,dur=.55){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
// A: money sitting on the neighbour's roof
function sA(t){const X=0;let h=floor(X);
  h+=G(X+120,FY,1.15,ap(t,.1)[0],solarHouse(t,seg(t,.1,.9)));
  [[-40,0],[10,1],[60,2],[100,3]].forEach(([dx,i])=>{const a=.9+i*.15;if(t>a){const [o,s]=ap(t,a);h+=G(X+120+dx*1.15,FY-262-(i%2)*14,s,o,coinG(t,i))}});
  h+=person(X-300,FY,t,{op:ap(t,.4)[0],headDY:t>2.8?4:0});
  if(t>2.8){const [o,s]=ap(t,2.8,5.2);h+=G(X-300,FY-250,s,o,`<path d="M-26 0 Q0 -22 26 0 Q0 22 -26 0 Z" ${LS} stroke-width="4"/><circle r="8" fill="${W}"/><path d="M-30 18 L30 -18" ${LS} stroke-width="5"/>`)}
  return h}
// B: look up — 2 million houses
function sB(t){const X=1500;let h=floor(X);
  if(t<8.4){const o=ap(t,4.9,8.1)[0];h+=G(X+80,FY,1.25,o,solarHouse(t,seg(t,4.9,5.5)));h+=person(X-320,FY,t,{op:o,headDY:-8*ease(seg(t,5.04,5.4))});
    if(t>5.04&&t<6.2)h+=G(X-320,FY-260,1,ap(t,5.04,5.9)[0],`<path d="M0 30 L0 -30 M-16 -14 L0 -32 L16 -14" ${LS} stroke-width="5"/>`)}
  if(t>6.1){const [o,s]=ap(t,6.1);h+=G(X+330,380,s,o,sunC(t,seg(t,6.1,6.7)))}
  if(t>8.22){const xs=[-330,-165,0,165,330];xs.forEach((dx,i)=>{const a=8.3+i*.18;if(t<a)return;const [o,s]=ap(t,a);const dim=t>11.72&&i!=2?.35:1;h+=G(X+dx,FY,.55*s,o*dim,solarHouse(t,1))});
    if(t>9.42){const n=Math.round(2000000*ease(seg(t,9.42,10.5)));const [o,s]=ap(t,9.42,14.4);h+=G(X,470,s,o,I.pill(digits(n)+'+ CASAS',{fill:true,size:22}))}
    if(t>12.82){const [o,s]=ap(t,12.82);const bob=Math.sin(t*4)*5;h+=G(X,FY-170+bob,s,o,T(0,16,'?',48,{w:900,ls:0,filt:''}))}}
  return h}
// C: dirt on the panel — 20% less energy
function sC(t){const X=3000;let h='';
  const dirt=.35*ease(seg(t,15.8,17.0))+.5*ease(seg(t,20.1,20.9));
  h+=G(X,560,1,ap(t,14.7)[0],bigPanel(t,seg(t,14.7,15.4),dirt)+`<g transform="skewX(-14)">${dustDots(t,seg(t,15.82,16.6))}</g>`);
  h+=G(X+360,360,.9,ap(t,15.0)[0],sunC(t,seg(t,15.0,15.6)));
  if(t>16.8){const y=t<17.5?fall(t,16.8,330,520,.7):520;h+=G(X-70+Math.sin(t*5)*(t<17.5?20:0),y,1,ap(t,16.8)[0],`<g transform="rotate(${(t<17.5?Math.sin(t*6)*40:25).toFixed(1)})">${leaf(t)}</g>`)}
  if(t>17.1&&t<18.6){const bx=lerp(X-480,X+480,seg(t,17.1,18.6));h+=G(bx,380,1,1,bird(t))}
  if(t>17.9){const y=t<18.3?fall(t,17.9,390,575,.4):575;h+=G(X+90,y,1,1,splat())}
  if(t>21.0){const [o,s]=ap(t,21.0,27.6);const shrink=1-.35*ease(seg(t,21.82,22.6));h+=G(X-360,400,s*shrink,o,boltC())}
  if(t>21.82){const n=Math.round(20*ease(seg(t,21.82,22.5)));const [o,s]=ap(t,21.82,27.6);h+=G(X,840,s,o,I.dpill('−'+n+'% ENERGIA',24))}
  if(t>24.16&&t<26.5){const [o,s]=ap(t,24.16,26.2);h+=G(X+300,470,s,o,priceTag(seg(t,24.16,24.6)))}
  if(t>26.62){for(let i=0;i<3;i++){const a=26.62+i*.3;if(t<a)continue;const q=seg(t,a,a+1.2);h+=G(X-80+i*80,620+q*180,.7,1-q,boltC())}}
  return h}
// D: who climbs up? not the owner
function sD(t){const X=4500;let h=floor(X);
  h+=G(X+170,FY,1.2,ap(t,28.0)[0],solarHouse(t,seg(t,28.0,28.7),{dirt:.8}));
  const tremble=t>33.64?Math.sin(t*45)*3*(1-seg(t,34.8,35.4)):0;
  h+=person(X-250+tremble,FY,t,{op:ap(t,28.2)[0],headDY:t>33.64?-6:0})+g(X-250+tremble,FY,1,ap(t,28.2)[0],`<path d="M-8 -118 L8 -118 L5 -108 L12 -60 L0 -46 L-12 -60 L-5 -108 Z" fill="#050505"/>`);
  if(t>28.86&&t<30.8){const [o,s]=ap(t,28.86,30.5);const bob=Math.sin(t*4)*5;h+=G(X+170,450+bob,s,o,T(0,16,'?',56,{w:900,ls:0,filt:''}))}
  if(t>30.92&&t<31.7){const [o,s]=ap(t,30.92,31.5);h+=G(X-180,560,s,o,I.x(1))}
  const items=[[31.6,32.5,'SEM TEMPO',()=>clockI(t,1)],[32.52,33.6,'SEM ESCADA',()=>ladderI(1)],[33.64,35.5,'MEDO DE ALTURA',()=>`<path d="M-30 -10 Q-15 -24 0 -10 Q15 4 30 -10 M-30 14 Q-15 0 0 14 Q15 28 30 14" ${LS} stroke-width="4"/>`]];
  items.forEach(([a,b,txt,ic])=>{if(t>a&&t<b+.4){const [o,s]=ap(t,a,b);h+=G(X-250,440,s,o,I.pill(txt,{size:18}))+G(X-80,440,s,o,`<g transform="scale(.7)">${ic()}</g>`)}});
  return h}
// E: the service — water, soft brush, squeegee
function sE(t){const X=6000;let h=floor(X);
  let dirt=.8;dirt-=.45*ease(seg(t,37.76,38.9));dirt-=.35*ease(seg(t,38.96,39.6));
  h+=G(X+80,520,.8,ap(t,35.1)[0],bigPanel(t,1,Math.max(0,dirt)));
  h+=person(X-340,FY,t,{op:ap(t,35.2)[0],ring:t>35.16&&t<36.6?.8:0});
  if(t>37.08){const [o,s]=ap(t,37.08);h+=G(X-220,FY-40,s*.9,o,bucket(t,seg(t,37.08,37.5)));h+=G(X+80,520,.8,1,drops(t,ap(t,37.2,38.6)[0]))}
  if(t>37.76&&t<39.0){const q=seg(t,37.76,38.9);const bx=X+80+Math.sin(q*Math.PI*5)*130;h+=G(bx,560,1,ap(t,37.76,38.8)[0],brush())}
  if(t>38.96&&t<39.9){const q=eio(seg(t,38.96,39.6));h+=G(X-90+q*340,520+q*0,1,ap(t,38.96,39.6)[0],`<g transform="rotate(90) translate(0 0)">${squeegee()}</g>`)}
  if(t>39.6&&t<41.5){for(let i=0;i<3;i++){const q=((t-39.6)*1.2+i*.33)%1;h+=G(X+20+i*70,460+i*30,1,(1-q)*ap(t,39.6,41)[0],`<path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="${W}"/>`)}}
  if(t>39.58){const [o,s]=ap(t,39.58);h+=G(X+380,450,s*.9,o,sprayBottle(seg(t,39.58,40.1)));if(t>40.58)h+=G(X+410,380,ap(t,40.58)[1],ap(t,40.58)[0],I.x(.9))}
  return h}
// F: 10 panels, more than once a year, same client calls again
function sF(t){const X=7500;let h=floor(X);
  if(t<44.9){const o=ap(t,42.3,44.6)[0];for(let i=0;i<10;i++){const a=42.5+i*.11;if(t<a)continue;const c=i%5,r=Math.floor(i/5);h+=G(X-260+c*130,470+r*110,1,o*ap(t,a)[0],panelGrid(t,0,.62,'skewX(-14)'))}
    if(t>43.52){const n=Math.min(10,Math.round(10*ease(seg(t,43.52,43.9))));h+=G(X,700,ap(t,43.52,44.6)[1],o*ap(t,43.52)[0],I.pill(n+' PLACAS',{fill:true,size:22}))}}
  if(t>44.68){const [o,s]=ap(t,44.68);h+=G(X-200,560,s,o,repeatArrows(t)+T(0,8,'ANO',16,{w:900,ls:3,filt:''}))+G(X-200,680,s,o,I.pill('+ DE 1 VEZ',{size:20}))}
  if(t>47.32){const [o,s]=ap(t,47.32);h+=G(X+200,560,s,o,phoneRing(t*(t>48.0?1:0),seg(t,47.32,47.9)))}
  return h}
// G: safety — roof is dangerous; course + harness
function sG(t){const X=9000;let h=floor(X);
  h+=G(X-120,FY,1.2,ap(t,50.2)[0],solarHouse(t,seg(t,50.2,50.9),{panel:0}));
  if(t>50.28&&t<52.0){const [o,s]=ap(t,50.28,51.7);h+=G(X+260,450,s,o,warnTri(seg(t,50.28,50.8)))}
  const sway=t>51.4&&t<53.2?Math.sin(t*5)*8:0;const px=X-150,py=FY-238;
  if(t>51.0){const [o]=ap(t,51.0);h+=person(px,py,t,{op:o,s:.7,rot:sway})+g(px,py,.7,o*ap(t,55.38)[0],harness(),'filter="url(#tg)"');
    if(t>55.38){const q=ease(seg(t,55.38,55.9));h+=G(0,0,1,1,PC(`M${px} ${py-50} Q${px+60} ${py-120} ${X-60} ${FY-310}`,q,3,GOLD)+`<circle cx="${X-60}" cy="${FY-310}" r="8" fill="${GOLD}" opacity="${q}"/>`)}}
  if(t>53.3){const [o,s]=ap(t,53.3);h+=G(X+280,460,s,o,certificate(seg(t,53.3,53.9)))}
  if(t>56.54){const [o,s]=ap(t,56.54);h+=G(X+220,600,s,o,I.dpill('SEM CINTO? NÃO SOBE',18))}
  return h}
// H: reflection — spotlight, questions, a house lights up gold
function sH(t){const X=10500;let h=floor(X);
  const sp=ease(seg(t,59.0,60.2));
  h+=`<g transform="translate(${X} ${FY})">${spotCone(sp)}</g>`;
  h+=person(X,FY,t,{op:ap(t,58.7)[0]});
  [-320,320].forEach((dx,i)=>{if(t>60.9){const lit=i==1?ease(seg(t,65.4,66.6)):(t>66.2?ease(seg(t,66.2,67.2))*.8:0);h+=G(X+dx,FY,1,ap(t,60.9+i*.15)[0]*.9,streetHouse(seg(t,60.9+i*.15,61.6+i*.15),lit))}});
  if(t>62.68){const [o,s]=ap(t,62.68);h+=G(X,370,s,o,I.pill('O QUE AS PESSOAS DAQUI PRECISAM...',{size:17,pad:20}))}
  if(t>64.44){const [o,s]=ap(t,64.44);h+=G(X,430,s,o,I.pill('...E NINGUÉM ESTÁ FAZENDO?',{fill:true,size:17,pad:20}))}
  return h}
const SCENES=[[sA,0,5.6],[sB,4.4,15.6],[sC,14.0,28.6],[sD,27.2,35.8],[sE,34.4,42.9],[sF,41.5,50.8],[sG,49.4,59.2],[sH,57.8,99]];
const TOTAL=68.0;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.6,TOTAL));
  const vig=ease(seg(t,58.6,59.6))*.6;
  document.getElementById('s').innerHTML=`
  <defs>
   <filter id="fP" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="fD" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="tg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <radialGradient id="spot" cx=".5" cy=".48" r=".55"><stop offset="0" stop-color="#2a2a2a"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#050505"/></radialGradient>
   <radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
   <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".02"/><stop offset=".6" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity=".28"/></linearGradient>
   <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="#fff" opacity=".035"/></pattern>
  </defs>
  <rect width="1080" height="1080" fill="url(#spot)"/>
  <rect width="1080" height="1080" fill="url(#dots)"/>
  <g transform="translate(${(540+sx).toFixed(2)} ${(540+sy).toFixed(2)}) scale(${z.toFixed(4)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})">${world}</g>
  ${dust}
  <rect width="1080" height="1080" fill="url(#vig)" opacity="${vig.toFixed(3)}"/>
  ${titleLayer(t)}
  <rect width="1080" height="1080" fill="#000" opacity="${(1-fade).toFixed(3)}"/>`;
}
window.render=render;window.TOTAL=TOTAL;
window.SFX=[
 [0.1,'pop',.5],[0.9,'coin',.6],[1.05,'coin',.5],[1.2,'coin',.5],[1.35,'coin',.5],[2.8,'pop',.6],
 [4.9,'whoosh',.6],[5.04,'swirl',.4],[6.1,'sparkle',.6],[8.3,'pop',.4],[8.48,'pop',.4],[8.66,'pop',.4],[8.84,'pop',.4],[9.02,'pop',.4],[9.42,'clockfast',.5],[10.5,'ding',.7],[12.82,'pop',.6],
 [14.6,'whoosh',.6],[16.8,'swirl',.4],[17.1,'birds',.6],[18.1,'drop',.8],[20.12,'sad',.5],[21.82,'buzz',.7],[24.16,'register',.6],[26.62,'fallwhistle',.3],
 [27.9,'whoosh',.6],[28.86,'pop',.6],[30.92,'error',.8],[31.6,'clock',.6],[32.52,'pop',.6],[33.64,'heartbeat',.6],
 [35.0,'whoosh',.6],[35.16,'smallwin',.5],[37.08,'bubble',.7],[37.8,'swirl',.5],[38.96,'throwswoosh',.6],[39.6,'sparkle',.7],[40.58,'error',.7],
 [42.2,'whoosh',.6],[42.5,'pop',.3],[42.9,'pop',.3],[43.3,'pop',.3],[43.52,'ding',.6],[44.68,'swirl',.6],[47.32,'ring',.7],
 [50.1,'whoosh',.6],[50.28,'alarm',.4],[52.14,'gasp',.5],[53.3,'stamp',.8],[55.38,'belt',.8],[56.54,'buzz',.6],
 [58.5,'whoosh',.5],[59.0,'spotlight',.7],[62.68,'pop',.5],[64.44,'pop',.6],[65.4,'sparkle',.6],[66.2,'switch',.4],
];
