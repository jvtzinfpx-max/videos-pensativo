const CAM=[
 [0,0,560,1.1,0],[0.3,0,580,1.0,3.0],
 [6.5,1500,560,1,.7],
 [17.2,3000,560,1,.75],
 [32.8,4500,560,1,.75],
 [48.5,6000,560,1,.75],
 [58.6,7500,560,1,.9],[61.0,7500,580,1.05,4.0],
];
const PUNCH=[[2.0,.07],[4.62,.05],[10.5,.04],[16.12,.04],[19.16,.05],[27.88,.04],[36.18,.05],[40.42,.07],[47.78,.04],[52.54,.04],[58.04,.06]];
const SHAKE=[[2.0,.5,8],[40.42,.5,7]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.05,'E SE VOCÊ CAÍSSE...'],[2.0,'BATESSE A CABEÇA...'],[3.76,'E ACORDASSE SABENDO','TUDO O QUE EXISTE NO MUNDO?',4.62],
 [6.82,'VOCÊ ABRE OS OLHOS'],[7.74,'E ENTENDE','QUALQUER LÍNGUA',8.18],[9.58,'TODAS AS','MAIS DE 7 MIL',10.1],[11.22,'SABE PILOTAR UM AVIÃO'],[12.98,'SABE FAZER UMA CIRURGIA'],[14.62,'SABE A RESPOSTA','DE QUALQUER PROVA',15.06],
 [17.56,'MAS AÍ VEM','O PRIMEIRO PROBLEMA',18.68],[20.3,'SABER NÃO É','CONSEGUIR FAZER',21.4],[23.78,'VOCÊ SABE TOCAR VIOLÃO'],[25.24,'MAS SEUS DEDOS','NUNCA TREINARAM',25.86],[27.54,'ELES NÃO OBEDECEM'],[28.42,'VOCÊ IA SABER TUDO','E MESMO ASSIM IA PRECISAR PRATICAR',30.32],
 [33.0,'E O MAIS LOUCO:'],[34.32,'ISSO JÁ ACONTECEU','DE VERDADE',35.46],[37.04,'EM 2002'],[38.04,'UM AMERICANO','CHAMADO JASON PADGETT',38.54],[40.04,'LEVOU UMA PANCADA','NA CABEÇA NUM ASSALTO',41.08],[42.56,'DEPOIS DISSO','VIA FORMAS DE MATEMÁTICA EM TUDO',43.34],[45.74,'E VIROU UM GÊNIO','DOS DESENHOS GEOMÉTRICOS',46.5],
 [48.84,'OS MÉDICOS CHAMAM DE','SÍNDROME DE SAVANT ADQUIRIDA',49.96],[52.22,'MAS É RARÍSSIMO'],[53.56,'QUASE SEMPRE','BATER A CABEÇA SÓ MACHUCA',54.36],[57.04,'NINGUÉM DEVE TENTAR'],
 [58.9,'ENTÃO...'],[59.68,'SE VOCÊ PUDESSE APRENDER','UMA COISA SÓ, SEM ESFORÇO...',60.78],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fall(t,t0,y0,y1,dur=.55){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
// A: slips, hits head, wakes up knowing everything
function sA(t){const X=0;let h=floor(X);
  const walk=eio(seg(t,0,.7));const px=lerp(X-300,X-40,walk)+lerp(0,40,ease(seg(t,.6,1.3)));
  const rot=-90*ease(seg(t,.6,1.3))*(1-eio(seg(t,3.76,4.4)));const step=walk<1?Math.abs(Math.sin(t*10))*6:0;
  h+=G(X+20,FY-4,1.3,ap(t,.05)[0]*(1-seg(t,1.0,1.6)*.0),`<g transform="rotate(${(t>.6?-30*ease(seg(t,.6,1.0)):0).toFixed(1)}) translate(${(t>.6?40*ease(seg(t,.6,1.0)):0).toFixed(1)} 0)">${bananaPeel()}</g>`);
  h+=person(px,FY-step,t,{op:ap(t,.05)[0],rot,ring:0});
  if(t>2.0&&t<4.2){const hx=px-150,hy=FY-20;h+=G(hx,hy-30,1,ap(t,2.0,3.9)[0],dizzyStars(t))}
  if(t>4.24){const [o]=ap(t,4.24);h+=G(px,FY-160,1,o,goldRays(t,o))}
  if(t>5.32){const [o,s]=ap(t,5.32);h+=G(px+230,450,s,o,miniEarth(seg(t,5.32,5.8)))}
  return h}
// B: languages, plane, surgery, test
function sB(t){const X=1500;let h=floor(X);
  const px=X-320;h+=person(px,FY,t,{op:ap(t,6.6)[0]})+G(px,FY-160,.8,ap(t,6.6)[0],goldRays(t,.7));
  if(t<11.3){const words=[['OLÁ',GREEN],['HELLO',W],['HOLA',GOLD],['CIAO',W],['HALLO',BLUE],['SALUT',W]];const pos=[[-40,430],[140,380],[300,450],[60,540],[230,600],[360,350]];
    words.forEach(([w,c],i)=>{const a=7.9+i*.22;if(t<a)return;const [o,s]=ap(t,a,10.9);h+=G(X+pos[i][0],pos[i][1]+Math.sin(t*2+i)*5,s,o,bubbleWord(w,c))});
    if(t>9.58){const n=Math.round(7000*ease(seg(t,10.1,10.9)));const [o,s]=ap(t,9.58,11.0);h+=G(X+150,700,s,o,I.pill(digits(n)+'+ LÍNGUAS',{fill:true,size:22}))}}
  if(t>11.84&&t<13.3){const q=seg(t,11.84,13.3);h+=G(lerp(X-100,X+500,q),lerp(560,400,q),.9,ap(t,11.84,12.9)[0],`<g transform="rotate(-10)">${airplane()}</g>`)}
  if(t>13.68&&t<15.0){const [o,s]=ap(t,13.68,14.6);h+=G(X+120,520,s,o,`<g transform="rotate(-20)">${scalpel()}</g>`)+G(X+300,470,s,o,medCross())}
  if(t>15.06){const [o,s]=ap(t,15.06);h+=G(X+180,540,s,o,testPaper(seg(t,15.06,15.5)))}
  return h}
// C: knowing is not doing — the guitar
function sC(t){const X=3000;let h=floor(X);
  const px=X-280;h+=person(px,FY,t,{op:ap(t,17.3)[0],headDY:t>27.5&&t<28.4?6:0});
  if(t>17.56&&t<20.1){const [o,s]=ap(t,17.56,19.8);h+=G(X+80,480,s*1.1,o,I.dpill('PROBLEMA',30))}
  if(t>20.3&&t<23.6){const [o,s]=ap(t,20.3,23.3);h+=G(X-40,480,s,o,I.pill('SABER',{fill:true,size:22}))+G(X+90,480,s,o,T(0,12,'≠',40,{w:900,ls:0,filt:''}))+G(X+230,480,ap(t,22.24,23.3)[1],ap(t,22.24,23.3)[0],I.pill('FAZER',{size:22}))}
  if(t>23.78&&t<28.6){const [o,s]=ap(t,23.78,28.3);h+=G(px+140,FY-90,s,o,`<g transform="rotate(${(Math.sin(t*2)*3).toFixed(1)})">${guitar(t)}</g>`);
    if(t>25.68){for(let i=0;i<4;i++){const a=25.7+i*.45;if(t<a)continue;const q=seg(t,a,a+1.4);h+=G(px+220+i*50,FY-200-q*120,1,(1-q)*o,`<g transform="rotate(${(i%2?35:-40)*q})">${note(i%2?W:RED)}</g>`)}}
    if(t>26.68){const [o2,s2]=ap(t,26.68,28.3);h+=G(px+330,FY-330,s2,o2*o,I.x(1))}}
  if(t>28.42){const k=.05+.9*ease(seg(t,31.5,33.0));h+=G(X+170,500,1,ap(t,28.42)[0],skillBars(k))}
  return h}
// D: Jason Padgett — real story
function sD(t){const X=4500;let h=floor(X);
  if(t>33.0&&t<36.9){const [o]=ap(t,33.0,36.6);const st=1+1.2*(1-ease(seg(t,35.46,35.8)));h+=G(X+150,470,st,t<35.46?0:o,I.dpill('REAL',34))}
  if(t>37.04){const [o,s]=ap(t,37.04,42.4);h+=G(X+200,430,s,o,I.pill('2002',{fill:true,size:24}))}
  const jx=X-180;const hitS=t>40.42&&t<41.2?Math.sin(t*50)*6:0;
  h+=person(jx+hitS,FY,t,{op:ap(t,38.04)[0],rot:t>40.42&&t<41.4?-8*Math.sin(Math.PI*seg(t,40.42,41.4)):0});
  if(t>38.54){const [o]=ap(t,38.54);h+=G(jx,FY+40,1,o,T(0,0,'JASON PADGETT',16,{w:800,ls:4,filt:''}))}
  if(t>40.42)h+=G(jx-30,FY-170,1,1,impact(t,seg(t,40.42,41.2)));
  if(t>42.56){h+=G(jx,FY-160,1,ap(t,42.56)[0],geoShapes(t,ease(seg(t,42.6,45.4))))}
  if(t>46.26){const [o,s]=ap(t,46.26);h+=G(X+220,560,s,o,fractalPaper(t,seg(t,46.26,46.8),seg(t,46.8,48.2)))}
  return h}
// E: doctors, very rare, don't try
function sE(t){const X=6000;let h=floor(X);
  const dx=X-280;h+=person(dx,FY,t,{op:ap(t,48.6)[0]})+g(dx,FY,1,ap(t,48.6)[0],stethoscope());
  if(t>49.96&&t<52.3){const [o,s]=ap(t,49.96,52.0);h+=G(X+120,470,s,o,I.pill('SAVANT ADQUIRIDA',{size:20}))}
  if(t>52.22&&t<53.7){h+=G(X+150,520,1,1,rareDots(t,ap(t,52.22,53.4)[0]))}
  if(t>53.56){const [o]=ap(t,53.56);h+=person(X+180,FY,t,{op:o,dim:.35,headDY:6})+g(X+180,FY,1,o,bandage(),'');}
  if(t>57.04){const [o,s]=ap(t,57.04);h+=G(X+30,460,s,o,stopSign(seg(t,57.04,57.5)))}
  return h}
// F: reflection
function sF(t){const X=7500;let h=floor(X);
  const sp=ease(seg(t,59.0,60.0));h+=`<g transform="translate(${X-100} ${FY})">${spotCone(sp)}</g>`;
  h+=person(X-100,FY,t,{op:ap(t,58.7)[0]});
  if(t>60.5){const [o,s]=ap(t,60.5);h+=G(X+200,FY-70,s*.9,o,openBookG(t,seg(t,60.5,61.2),ease(seg(t,62.3,63.4))))}
  if(t>63.38){const [o,s]=ap(t,63.38);h+=G(X,440,s,o,I.pill('QUAL SERIA?',{size:20}))}
  if(t>64.42){const [o,s]=ap(t,64.42);h+=G(X,500,s,o,I.pill('O QUE TE IMPEDE DE COMEÇAR HOJE?',{fill:true,size:17,pad:20}))}
  if(t>66.0){for(let i=0;i<3;i++){const q=((t-66.0)*.9+i*.33)%1;h+=G(X+200+(i-1)*50,FY-150-q*60,1,1-q,`<path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="${GOLD}"/>`)}}
  return h}
const SCENES=[[sA,0,7.3],[sB,5.7,17.9],[sC,16.4,33.6],[sD,32.0,49.3],[sE,47.7,59.4],[sF,57.8,99]];
const TOTAL=69.2;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.6,TOTAL));
  const vig=Math.max(ease(seg(t,2.0,2.4))*(1-ease(seg(t,3.7,4.2)))*.6,ease(seg(t,58.8,59.8))*.6);
  const flash=t>4.24?(1-seg(t,4.24,4.7))*.25:0;
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
  <rect width="1080" height="1080" fill="${GOLD}" opacity="${flash.toFixed(3)}"/>
  <rect width="1080" height="1080" fill="#000" opacity="${(1-fade).toFixed(3)}"/>`;
}
window.render=render;window.TOTAL=TOTAL;
window.SFX=[
 [0.05,'steps',.6],[0.6,'throwswoosh',.6],[1.25,'thud',.8],[2.0,'thudbig',.9],[2.2,'sparkle',.5],[3.76,'swirl',.5],[4.24,'riser',.4],[4.62,'ding',.8],[5.32,'pop',.6],
 [6.5,'whoosh',.6],[7.9,'pop',.4],[8.12,'pop',.4],[8.34,'pop',.4],[8.56,'pop',.4],[8.78,'pop',.4],[9.0,'pop',.4],[10.1,'clockfast',.5],[10.9,'ding',.6],[11.84,'planewhoosh',.7],[13.68,'pop',.6],[15.06,'paper',.6],[15.6,'smallwin',.6],
 [17.2,'whoosh',.6],[17.56,'buzz',.6],[20.3,'pop',.6],[22.24,'pop',.6],[23.78,'pop',.6],[25.7,'error',.4],[26.15,'error',.4],[26.68,'error',.7],[28.42,'pop',.5],[31.5,'grow',.6],
 [32.8,'whoosh',.6],[35.46,'stamp',.9],[37.04,'pop',.7],[38.04,'pop',.5],[40.42,'thudbig',.9],[42.6,'sparkle',.6],[43.4,'riser',.4],[46.26,'marker',.7],[47.4,'smallwin',.6],
 [48.5,'whoosh',.6],[49.96,'pop',.6],[52.22,'beep',.6],[53.56,'sad',.6],[57.04,'error',.9],
 [58.6,'whoosh',.5],[59.0,'spotlight',.7],[60.5,'pageflip',.7],[62.3,'sparkle',.5],[63.38,'pop',.6],[64.42,'pop',.6],[66.0,'sparkle',.6],
];
