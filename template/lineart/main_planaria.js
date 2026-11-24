const CAM=[
 [0,0,560,1.08,0],[0.3,0,560,1.0,4.5],
 [5.9,1500,560,1,.7],
 [13.5,3000,560,1,.75],
 [27.0,4500,560,1,.75],
 [40.3,6000,560,1,.75],
 [52.8,7500,560,1,.75],
 [59.9,9000,560,1,.9],[62.0,9000,580,1.05,3.5],
];
const PUNCH=[[1.62,.06],[4.98,.05],[14.2,.05],[16.86,.04],[18.12,.05],[23.14,.05],[26.46,.04],[33.58,.04],[41.46,.04],[47.6,.05],[52.06,.05],[59.18,.04]];
const SHAKE=[[1.62,.3,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.05,'SE VOCÊ CORTAR','ESSE BICHO AO MEIO',0.9],[2.62,'ELE NÃO MORRE'],[4.02,'VOCÊ GANHA DOIS'],
 [6.12,'ELE SE CHAMA PLANÁRIA'],[7.7,'UM VERMEZINHO ACHATADO'],[9.18,'MENOR QUE UMA UNHA'],[10.24,'VIVE EM RIOS E LAGOS'],[11.98,'INCLUSIVE AQUI NO BRASIL'],
 [13.8,'CORTA A CABEÇA?'],[15.06,'EM POUCOS DIAS','NASCE UMA CABEÇA NOVA',16.16],[17.74,'CORTA O RABO?'],[18.84,'NASCE OUTRO RABO'],[20.12,'UM PEDACINHO DE','MENOS DE 1% DO CORPO',21.54],[24.44,'VIRA UMA PLANÁRIA','INTEIRA DE NOVO',25.18],
 [27.22,'O SEGREDO','ESTÁ DENTRO DELA',27.84],[28.88,'O CORPO É CHEIO DE','CÉLULAS ESPECIAIS',30.66],[33.04,'CÉLULAS-TRONCO'],[34.54,'VIRAM QUALQUER PARTE','QUE ESTIVER FALTANDO',36.46],
 [40.52,'AGORA A PARTE','MAIS ESTRANHA',41.14],[42.54,'ENSINARAM PLANÁRIAS','A ACHAR COMIDA',44.32],[46.12,'DEPOIS CORTARAM','A CABEÇA DELAS',46.88],[48.94,'QUANDO A CABEÇA','NOVA NASCEU...',49.5],[50.62,'ELAS AINDA LEMBRAVAM','DO CAMINHO',51.94],
 [53.02,'HOJE, PESQUISADORES','ESTUDAM ESSE BICHINHO',54.1],[55.34,'PRA AJUDAR O','CORPO HUMANO A SE CONSERTAR',57.04],
 [60.2,'ENTÃO...'],[61.02,'SE O SEU CORPO PUDESSE','FAZER NASCER DE NOVO UMA PARTE...',62.26],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
const L0=360;
// A: cut in half → two
function sA(t){const X=0;let h='';
  h+=G(X,430,1,ap(t,.05)[0]*.7,waterLines(t,1100));
  if(t<1.62){h+=G(X,560,1,ap(t,.05)[0],planaria(t,{L:L0}))}
  else{const sep=eio(seg(t,1.8,2.4))*40+eio(seg(t,4.0,5.0))*170;const g1=ease(seg(t,4.02,5.2));
    h+=G(X-sep,560,1,1,planaria(t,{L:L0,u0:0,u1:.5+.5*g1,ph:0}))+G(X+sep,560,1,1,planaria(t,{L:L0,u0:.5-.5*g1,u1:1,ph:1}))}
  if(t>.9&&t<2.2){const y=t<1.62?lerp(360,520,ease(seg(t,1.2,1.62))):lerp(520,360,ease(seg(t,1.7,2.2)));h+=G(X,y,1,ap(t,.9,1.9)[0],blade())}
  if(t>1.62)h+=G(X,560,1,1,cutFlash(seg(t,1.62,2.0)));
  return h}
// B: what it is, size, where it lives
function sB(t){const X=1500;let h='';
  const shrink=ease(seg(t,9.2,10.0));const L=lerp(300,50,shrink);const sq=t>7.9&&t<8.9?1-.55*Math.sin(Math.PI*seg(t,7.9,8.9)):1;
  const wx=lerp(X-60,X+150,shrink),wy=lerp(520,548,shrink);
  if(t<10.4)h+=G(wx,wy,1,ap(t,6.0)[0]*(1-seg(t,10.1,10.4)),`<g transform="scale(1 ${sq.toFixed(3)})">${planaria(t,{L})}</g>`);
  if(t>6.12&&t<9.1){const [o]=ap(t,6.12,8.9);h+=G(X-60,640,1,o,T(0,0,'PLANÁRIA',20,{w:900,ls:6,filt:'',col:PINK}))}
  if(t>9.18&&t<10.4){const [o]=ap(t,9.18,10.1);h+=G(X+50,560,1,o,finger(seg(t,9.18,9.7)))}
  if(t>10.24){const [o]=ap(t,10.24);h+=G(X,640,1,o,waterLines(t,900));[-300,-120,180,330].forEach((dx,i)=>{h+=G(X+dx,760,1,o,weedPlant(t,i))});
    const sw=X-200+((t-10.24)*60)%400;h+=G(sw,700,1,o,planaria(t,{L:110}))}
  if(t>11.98){const [o,s]=ap(t,11.98);h+=G(X,460,s,o,`<rect x="-90" y="-26" width="180" height="52" rx="26" fill="#050505" stroke="${GREEN}" stroke-width="4"/>`+T(0,9,'BRASIL',22,{w:900,ls:4,filt:'',col:GREEN}))}
  return h}
// C: cut head → new head; cut tail → new tail; <1% piece → whole worm
function sC(t){const X=3000;let h='';const L=380;
  if(t<21.3){let u0=0,u1=1;
    if(t>14.2)u1=.8+.2*ease(seg(t,16.16,16.9));
    if(t>18.12)u0=.2-.2*ease(seg(t,18.84,19.5));
    const o=ap(t,13.5)[0]*(1-seg(t,20.9,21.3));h+=G(X,560,1,o,planaria(t,{L,u0,u1}));
    if(t>14.2&&t<16.0){const q=seg(t,14.2,15.4);h+=G(X+40*q,560-50*q,1,1-q,planaria(t,{L,u0:.8,u1:1}))}
    if(t>18.12&&t<19.8){const q=seg(t,18.12,19.4);h+=G(X-40*q,560+40*q,1,1-q,planaria(t,{L,u0:0,u1:.2}))}
    if(t>13.8&&t<14.8){const y=t<14.2?lerp(380,520,ease(seg(t,13.8,14.2))):lerp(520,380,ease(seg(t,14.3,14.8)));h+=G(X+(0.8-.5)*L,y,1,1,blade())}
    if(t>17.74&&t<18.7){const y=t<18.12?lerp(380,520,ease(seg(t,17.74,18.12))):lerp(520,380,ease(seg(t,18.2,18.7)));h+=G(X+(0.2-.5)*L,y,1,1,blade())}
    if(t>15.06&&t<17.0){const d=Math.min(5,1+Math.floor((t-15.06)/.35));const [o2,s2]=ap(t,15.06,16.8);h+=G(X,420,s2,o2,I.pill('DIA '+d,{fill:true,size:22}))}}
  if(t>21.3){const g1=ease(seg(t,24.5,26.3));const u0=.47-.47*g1,u1=.5+.5*g1;const o=ap(t,21.3)[0];
    h+=G(X,560,1,o,planaria(t,{L,u0,u1}));
    if(t<24.6)h+=G(X+(.485-.5)*L,560,1,o*(1-seg(t,24.3,24.6)),pctLens(t,1));
    if(t>22.8&&t<24.6){const [o2,s2]=ap(t,22.8,24.3);h+=G(X,430,s2,o2,I.pill('MENOS DE 1%',{fill:true,size:22}))}}
  return h}
// D: stem cells → eye, mouth, brain
function sD(t){const X=4500;let h='';const L=460;
  h+=G(X,640,1,ap(t,27.1)[0],planaria(t,{L,glow:ease(seg(t,30.6,31.4))}));
  if(t>33.04&&t<34.6){const [o,s]=ap(t,33.04,34.3);h+=G(X,450,s,o,`<rect x="-150" y="-26" width="300" height="52" rx="26" fill="#050505" stroke="${GREEN}" stroke-width="4"/>`+T(0,8,'CÉLULAS-TRONCO',20,{w:900,ls:3,filt:'',col:GREEN}))}
  [[37.72,-220,eyeIcon],[38.4,0,mouthIcon],[39.12,220,brainIcon]].forEach(([a,dx,ic])=>{if(t<a-.3)return;const k=ease(seg(t,a-.3,a+.2));h+=G(0,0,1,1,PC(`M${X+dx*.6} 620 L${X+dx} 480`,k,3,GREEN,'stroke-dasharray="6 8"'));if(t>a){const [o,s]=ap(t,a);h+=G(X+dx,440,s,o,ic())}});
  return h}
// E: maze memory experiment
function sE(t){const X=6000;let h='';const MY=560;
  h+=G(X,MY,1,ap(t,40.5)[0],maze(seg(t,40.5,41.4)));
  if(t>42.54)h+=G(X+200,MY+60,1,ap(t,42.54)[0],foodDot(t));
  let q=0,phase=0;if(t>43.22&&t<45.8){q=ease(seg(t,43.22,45.5))}else if(t>=50.62){q=ease(seg(t,50.62,51.8))}
  if(t>42.54){const [x,y,an]=mazePos(q);let u1=1;if(t>46.88&&t<49.8)u1=t<48.94?.78:.78+.22*ease(seg(t,48.94,49.8));
    h+=G(X+x,MY+y,1,ap(t,42.54)[0],`<g transform="rotate(${(an*180/Math.PI).toFixed(1)})">${planaria(t,{L:110,u1})}</g>`);
    if(t>46.88&&t<48.0){const k=seg(t,46.88,47.9);h+=G(X+x+30+20*k,MY+y-30*k,1,1-k,planaria(t,{L:110,u0:.78,u1:1}))}
    if(t>46.5&&t<47.4){const by=t<46.88?lerp(MY-150,MY+20,ease(seg(t,46.5,46.88))):lerp(MY+20,MY-150,ease(seg(t,46.95,47.4)));h+=G(X+x+(.78-.5)*110,by,.6,1,blade())}}
  if(t>52.06){const [o,s]=ap(t,52.06);h+=G(X+200,MY-50,s,o,I.check(1))}
  return h}
// F: researchers & human body
function sF(t){const X=7500;let h=floor(X);
  h+=G(X-320,FY,1,ap(t,52.9)[0],microscope(seg(t,52.9,53.6)));
  h+=person(X-150,FY,t,{op:ap(t,53.1)[0]})+g(X-150,FY,1,ap(t,53.1)[0],labCoat());
  if(t>53.8){h+=G(X-325,FY-84,.3,ap(t,53.8)[0],planaria(t,{L:200}))}
  if(t>57.64){const [o]=ap(t,57.64);h+=person(X+220,FY,t,{op:o,ph:1});h+=G(X+220,FY-80,1,1,healSparkle(t,ease(seg(t,58.6,59.2))))}
  if(t>57.86){const [o,s]=ap(t,57.86);h+=G(X+220,470,s,o,I.pill('CORPO HUMANO',{size:18}))}
  return h}
// G: reflection
function sG(t){const X=9000;let h=floor(X);
  const sp=ease(seg(t,60.3,61.3));h+=`<g transform="translate(${X} ${FY})">${spotCone(sp)}</g>`;
  h+=person(X,FY,t,{op:ap(t,60.0)[0]});
  if(t>62.5)h+=G(X,FY-90,1,1,healSparkle(t,ease(seg(t,62.5,63.3))));
  if(t>62.0){const [o]=ap(t,62.0);h+=G(X+290,FY-40,1,o*.9,planaria(t,{L:140,glow:.6}))}
  if(t>64.62){const [o,s]=ap(t,64.62);h+=G(X,470,s,o,I.pill('QUAL VOCÊ ESCOLHERIA?',{fill:true,size:20}))}
  return h}
const SCENES=[[sA,0,6.7],[sB,5.1,14.3],[sC,12.7,27.8],[sD,26.2,41.1],[sE,39.5,53.6],[sF,52.0,60.7],[sG,59.1,99]];
const TOTAL=68.0;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.6,TOTAL));
  const vig=Math.max(ease(seg(t,40.5,41.0))*(1-ease(seg(t,42.3,42.8)))*.4,ease(seg(t,60.1,61.1))*.6);
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
 [0.05,'bubble',.5],[0.9,'throwswoosh',.5],[1.62,'snap',.9],[1.65,'rip',.5],[2.62,'pop',.4],[4.02,'grow',.8],[4.98,'smallwin',.7],
 [5.9,'whoosh',.6],[6.12,'pop',.6],[7.9,'swirl',.4],[9.18,'pop',.6],[10.24,'bubble',.6],[11.98,'ding',.6],
 [13.5,'whoosh',.6],[14.2,'snap',.9],[15.06,'clockfast',.5],[16.16,'grow',.7],[18.12,'snap',.9],[18.84,'grow',.7],[21.3,'pop',.5],[22.8,'beep',.6],[24.5,'grow',.8],[26.3,'smallwin',.7],
 [27.0,'whoosh',.6],[30.66,'sparkle',.7],[33.04,'pop',.7],[37.72,'pop',.6],[38.4,'pop',.6],[39.12,'pop',.6],[39.5,'ding',.5],
 [40.3,'whoosh',.6],[41.46,'riser',.4],[42.54,'pop',.6],[43.3,'steps',.3],[46.88,'snap',.9],[48.94,'grow',.7],[50.62,'throwswoosh',.6],[52.06,'ding',.9],[52.1,'smallwin',.6],
 [52.8,'whoosh',.6],[53.2,'pop',.5],[57.86,'pop',.6],[58.6,'sparkle',.6],
 [59.9,'whoosh',.5],[60.3,'spotlight',.7],[62.5,'sparkle',.5],[64.62,'pop',.7],
];
