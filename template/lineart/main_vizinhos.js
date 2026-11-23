const CAM=[
 [0,0,560,1.1,0],[0.3,0,560,1.0,5.0],
 [5.8,1500,540,1,.7],[16.0,1530,555,1.0,1.0],
 [20.85,3000,540,1,.75],
 [30.85,4500,540,1,.75],
 [38.7,6000,560,1.03,.75],
 [48.8,7500,540,1,.75],
 [57.9,9000,540,1,.75],
 [68.35,10500,540,1,.7],
 [73.65,12000,540,1,.7],
];
const PUNCH=[[4.02,.05],[10.88,.03],[14.52,.03],[21.58,.04],[27.7,.03],[34.44,.05],[37.68,.05],[43.06,.05],[46.98,.05],[50.98,.04],[56.84,.04],[61.7,.03],[66.52,.03],[71.68,.04],[78.06,.04]];
const SHAKE=[[37.68,.4,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.05,'DOIS HOMENS','A MESMA ORAÇÃO',1.3],[2.3,'NO MESMO DIA'],[4.02,'SÓ UM DELES COLHEU'],
 [5.9,'OS DOIS ERAM VIZINHOS'],[8.08,'OS DOIS PEDIRAM','UMA COLHEITA BOA',9.0],[10.88,'O PRIMEIRO ORAVA...'],[12.14,'E VOLTOU PRA CASA','PRA ESPERAR',13.1],
 [14.52,'O SEGUNDO ORAVA...'],[15.9,'E FOI PRO CAMPO'],[17.2,'AROU A TERRA'],[18.26,'PLANTOU A SEMENTE'],[19.6,'TIROU O MATO'],
 [20.9,'AÍ VEIO A CHUVA'],[22.42,'ELA CAIU IGUAL','NAS DUAS TERRAS',23.3],[25.06,'A BÍBLIA DIZ'],[26.0,'DEUS FAZ CHOVER','SOBRE TODOS',26.5],[27.7,'O MESMO SOL'],[29.24,'A MESMA CHUVA'],
 [30.94,'TRÊS MESES DEPOIS...'],[32.42,'O CAMPO DO SEGUNDO','CHEIO DE MILHO',33.4],[35.18,'E O DO PRIMEIRO?'],[36.48,'SÓ TERRA... E MATO'],
 [38.76,'O PRIMEIRO PERGUNTOU'],[40.26,'"DEUS, POR QUE O SENHOR','NÃO ME RESPONDEU?"',41.0],[43.06,'MAS DEUS RESPONDEU'],[44.58,'A CHUVA CAIU'],[45.94,'SÓ NÃO TINHA','NENHUMA SEMENTE PRA MOLHAR',46.5],
 [48.86,'GÁLATAS 6:7'],[50.98,'O QUE O HOMEM SEMEAR','ISSO TAMBÉM COLHERÁ',52.38],[54.28,'PRIMEIRO A SEMENTE'],[55.88,'DEPOIS A COLHEITA'],
 [57.96,'NA SUA VIDA É IGUAL'],[59.44,'QUER UM EMPREGO MELHOR?'],[60.84,'A SEMENTE É O CURSO','QUE VOCÊ FAZ À NOITE',61.7],[63.76,'QUER SAIR DAS DÍVIDAS?'],[65.28,'A SEMENTE É A PRIMEIRA','NOTA QUE VOCÊ GUARDA',66.1],
 [68.42,'A ORAÇÃO TRAZ A CHUVA'],[70.42,'A SEMENTE É VOCÊ','QUE COLOCA NA TERRA',71.4],
 [73.72,'HOJE VOCÊ É','O PRIMEIRO OU O SEGUNDO?',74.94],[78.06,'COMENTA: 1 OU 2'],[79.78,'E ME SEGUE'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fall(t,t0,y0,y1,dur=.55){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
function bow(t,a,b){return 8*ease(seg(t,a,a+.4))*(1-ease(seg(t,b,b+.4)))}
const SEEDX=[-60,-20,20,60];
// A: two men pray; only one harvests
function sA(t){const X=0;let h=floor(X);
  const d1=.4*ease(seg(t,4.3,4.9));
  [[-170,.1,0],[170,.3,1]].forEach(([dx,a,i])=>{const [o]=ap(t,a);h+=person(X+dx,FY,t,{op:o,ph:i,headDY:bow(t,.6,3.9),dim:i==0?d1:0});h+=g(X+dx,FY,1,o,prayGlow(t,ap(t,.6,3.8)[0]),'filter="url(#tg)"')});
  if(t>4.3){const [o,s]=ap(t,4.3);h+=G(X+330,FY-20,s,o,basket(seg(t,4.3,4.8))+`<g transform="translate(-16 -44) rotate(-20) scale(.8)">${cob()}</g><g transform="translate(16 -46) rotate(18) scale(.8)">${cob()}</g>`)}
  if(t>4.76){const [o,s]=ap(t,4.76);h+=G(X-170,FY-260,s,o,T(0,16,'?',50,{w:900,ls:0,filt:''}))}
  return h}
// B: neighbours; one goes home, one goes to the field
function sB(t){const X=1500;let h=floor(X);
  h+=G(X,FY,1,ap(t,6.0)[0],fence(seg(t,6.0,6.8)));
  // person 1
  const w1=eio(seg(t,12.14,13.0));const p1x=lerp(X-130,X-280,w1);const o1=ap(t,5.9)[0]*(1-seg(t,13.0,13.3));const st1=w1>0&&w1<1?Math.abs(Math.sin(t*10))*6:0;
  h+=person(p1x,FY-st1,t,{op:o1,headDY:bow(t,10.88,12.0)})+g(p1x,FY,1,o1,prayGlow(t,ap(t,10.88,11.9)[0]),'filter="url(#tg)"');
  if(t>6.54&&t<13.2)h+=G(p1x,FY-250,ap(t,6.54,12.9)[1],ap(t,6.54,12.9)[0],numPill(1));
  if(t>11.9){const [o]=ap(t,11.9);h+=G(X-290,FY,1,o,hut(seg(t,11.9,12.6),ease(seg(t,13.1,13.4))));if(t>13.4){const q=(t*1.2)%1;h+=G(X-240+q*30,FY-220-q*40,1,ap(t,13.4)[0]*(1-q),T(0,0,'Z',26+q*10,{w:900,ls:0,filt:''}))}
    if(t>13.3)h+=G(X-290,FY-250,ap(t,13.3)[1],ap(t,13.3)[0],numPill(1))}
  // person 2
  const w2=eio(seg(t,15.9,16.8));const p2x=lerp(X+130,X+190,w2);const st2=w2>0&&w2<1?Math.abs(Math.sin(t*10))*6:0;
  const swing=t>17.2&&t<18.1?Math.sin((t-17.2)*14)*10:0;
  h+=person(p2x,FY-st2,t,{op:ap(t,6.1)[0],ph:1,headDY:bow(t,14.52,15.7),rot:swing*.3})+g(p2x,FY,1,ap(t,6.1)[0],prayGlow(t,ap(t,14.52,15.6)[0]),'filter="url(#tg)"');
  if(t>6.54)h+=G(p2x,FY-250,ap(t,6.74)[1],ap(t,6.74)[0],numPill(2));
  if(t>8.08&&t<10.8){const [o,s]=ap(t,8.08,10.5);h+=G(X,470,s,o,`<circle r="70" ${LS} stroke-width="3" stroke-dasharray="8 8"/><g transform="translate(0 56) scale(.55)">${corn(t,1)}</g>`)}
  if(t>15.9){const fx=X+340;const [o]=ap(t,15.9);h+=G(fx,FY,1,o,soilPlot(t,seg(t,15.9,16.5),seg(t,17.4,18.1),180));
    if(t>17.2&&t<18.3){const [ho]=ap(t,17.2,18.0);h+=G(p2x+70,FY,1,ho,`<g transform="rotate(${(swing*2).toFixed(1)})">${hoe()}</g>`)}
    SEEDX.forEach((sx,i)=>{const a=18.3+i*.14;if(t>a&&t<19.6){const y=fall(t,a,FY-160,FY-14,.4);h+=G(fx+sx,y,.8,ap(t,a)[0]*(1-seg(t,19.0,19.4)),seedDot())}});
    [-80,-40,30,75].forEach((wx,i)=>{if(t>16.2){const out=seg(t,19.6+i*.1,20.1+i*.1);h+=G(fx+wx+out*60*(i%2?1:-1),FY-8-out*120,1,ap(t,16.3+i*.1)[0]*(1-out),weed(t,.9,i))}});}
  return h}
function plots(X,t,o,corng,weedg,seedsVis=true){let h='';
  h+=G(X-200,FY,1,o,soilPlot(t,1,0,200))+G(X+200,FY,1,o,soilPlot(t,1,1,200));
  h+=G(X-200,FY+46,1,o,numPill(1))+G(X+200,FY+46,1,o,numPill(2));
  if(seedsVis&&corng<=0)SEEDX.forEach(sx=>{h+=G(X+200+sx,FY-14,.6,o,seedDot())});
  if(corng>0)SEEDX.forEach((sx,i)=>{h+=G(X+200+sx*1.3,FY-12,1,o,corn(t,clamp(corng-i*.05),i))});
  if(weedg>0)[-70,-30,15,60].forEach((wx,i)=>{h+=G(X-200+wx,FY-6,clamp(weedg*1.2-i*.1)*1.3,o,weed(t,1,i))});
  return h}
// C: the same rain, the same sun
function sC(t){const X=3000;let h=floor(X);const [o]=ap(t,20.9);
  h+=plots(X,t,o,0,0);
  [-200,200].forEach((dx,i)=>{const [co,cs]=ap(t,21.0+i*.15);h+=G(X+dx,410,cs,co,cloud(seg(t,21.0,21.6)));h+=G(X+dx,440,1,1,rain(t,190,FY-460,ease(seg(t,21.58,22.0))))});
  if(t>25.06){const [bo,bs]=ap(t,25.06);h+=G(X,560,bs*.8,bo,bible(seg(t,25.06,25.7)))}
  if(t>27.7){const [so,ss]=ap(t,27.7);h+=G(X,360,ss*.8,so,sunIcon(t,seg(t,27.7,28.2)))}
  return h}
// D: three months later — corn vs weeds
function sD(t){const X=4500;let h=floor(X);
  const cg=ease(seg(t,31.4,34.4));const wg=ease(seg(t,35.4,37.6));
  h+=plots(X,t,1,cg,wg);
  if(t>30.94&&t<32.6){const [o,s]=ap(t,30.94,32.3);const m=Math.min(3,1+Math.floor((t-31.0)/.45));h+=G(X,440,s,o,I.pill(m+(m==1?' MÊS':' MESES'),{fill:true,size:22}))}
  const p2=ap(t,33.4)[0];h+=person(X+400,FY,t,{op:p2,ph:1,ring:t>34.44?.8:0});
  const p1=ap(t,35.3)[0];h+=person(X-400,FY,t,{op:p1,dim:.45*ease(seg(t,36.6,37.2)),headDY:8*ease(seg(t,36.6,37.2))});
  if(t>34.44){const [o,s]=ap(t,34.44);h+=G(X+330,420,s,o,I.check(1))}
  if(t>37.68){const [o,s]=ap(t,37.68);h+=G(X-330,420,s,o,I.x(1))}
  return h}
// E: "why didn't you answer?" — rain falls on empty soil
function sE(t){const X=6000;let h=floor(X);
  h+=person(X-170,FY,t,{op:ap(t,38.8)[0],dim:.35,headDY:t>40.2?-6:6});
  h+=G(X+150,FY,1,ap(t,38.8)[0],soilPlot(t,1,0,240));
  if(t>40.26&&t<43.3){const [o,s]=ap(t,40.26,43.0);h+=G(X-60,450,s,o,balloonQ(seg(t,40.26,40.8)))}
  if(t>43.06){const [o,s]=ap(t,43.06);h+=G(X+150,410,s,o,cloud(seg(t,43.06,43.6)));h+=G(X+150,440,1,1,rain(t,200,FY-460,ease(seg(t,44.58,45.0))))}
  if(t>45.94){const [o,s]=ap(t,45.94);SEEDX.forEach((sx,i)=>{h+=G(X+150+sx*1.4,FY+30,s,o,`<ellipse rx="9" ry="13" ${LS} stroke-width="2.5" stroke-dasharray="4 4"/>`)});
    if(t>46.98){const [o2,s2]=ap(t,46.98);h+=G(X+150,FY+90,s2,o2,I.x(.9))}
    if(t>45.94)h+=G(X+150,FY+30,1,o*.5,`<path d="M-140 -10 L140 -10" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 8"/>`)}
  return h}
// F: Galatians 6:7 — seed first, harvest after
function sF(t){const X=7500;let h=floor(X);
  if(t<54.3){const o=ap(t,48.86,53.9)[0];h+=G(X,540,1.15,o,openBook(t,seg(t,48.86,49.6),seg(t,49.6,53.2)));if(t>49.4)h+=G(X,680,ap(t,49.4,53.9)[1],ap(t,49.4,53.9)[0],I.pill('GÁLATAS 6:7',{size:22}))}
  if(t>54.28){const [o,s]=ap(t,54.28);h+=G(X-200,FY,1,o,soilPlot(t,1,0,160))+G(X-200,FY-16,s*2.2,o,seedDot())+G(X-200,FY+46,1,o,T(0,0,'PRIMEIRO',16,{w:800,ls:5,filt:''}))}
  if(t>55.3){h+=G(X,FY-90,1,ap(t,55.3)[0],arrowR(seg(t,55.3,55.8),110))}
  if(t>55.88){const [o]=ap(t,55.88);h+=G(X+200,FY,1,o,soilPlot(t,1,0,160)+corn(t,ease(seg(t,55.88,56.9))))+G(X+200,FY+46,1,o,T(0,0,'DEPOIS',16,{w:800,ls:5,filt:''}))}
  return h}
// G: your life — job & debts
function sG(t){const X=9000;let h=floor(X);
  h+=person(X,FY,t,{op:ap(t,58.0)[0],ring:t>58.0&&t<59.3?ap(t,58.0,59.0)[0]*.8:0});
  if(t>59.44){const [o,s]=ap(t,59.44);h+=G(X-260,430,s,o,briefcase(seg(t,59.44,59.9)))}
  if(t>60.84){const [o]=ap(t,60.84);h+=G(X-260,FY,1,o,laptop(t,seg(t,60.84,61.4)))+G(X-260,FY+40,1,o,T(0,0,'CURSO',16,{w:800,ls:5,filt:''}));if(t>62.7)h+=G(X-150,560,ap(t,62.7)[1]*.8,ap(t,62.7)[0],moon(seg(t,62.7,63.1)))}
  if(t>63.76){const [o,s]=ap(t,63.76);h+=G(X+260,430,s,o,debtTag(seg(t,63.76,64.2)))}
  if(t>65.28){const [o]=ap(t,65.28);const fill=ease(seg(t,66.5,67.0))*.35;h+=G(X+260,FY-44,1,o,jar(seg(t,65.28,65.8),fill))+G(X+260,FY+40,1,o,T(0,0,'GUARDADA',16,{w:800,ls:5,filt:''}));
    if(t>65.9&&t<66.8){const y=fall(t,65.9,520,FY-80,.6);h+=G(X+260,y,.7,1-seg(t,66.5,66.8),`<g transform="rotate(${Math.sin(t*8)*15})">${billNote(1)}</g>`)}}
  return h}
// H: prayer brings rain, you put the seed
function sH(t){const X=10500;let h=floor(X);
  {const [o,s]=ap(t,68.42);h+=G(X-220,410,s,o,cloud(seg(t,68.42,68.9))+T(0,0,'ORAÇÃO',16,{w:900,ls:3,filt:''}));h+=G(X-220,440,1,1,rain(t,190,FY-460,ease(seg(t,69.0,69.5))));h+=G(X-220,FY,1,o,soilPlot(t,1,0,200))}
  const [po]=ap(t,70.42);h+=person(X+120,FY,t,{op:po,ring:t>72.82?.9:0});
  h+=G(X+290,FY,1,ap(t,70.42)[0],soilPlot(t,1,0,160));
  if(t>71.68){const y=fall(t,71.68,FY-150,FY-14,.5);h+=G(X+290,y,1,ap(t,71.68)[0],seedDot())}
  if(t>72.82){h+=G(X+290,FY-10,1,1,sprout(back(seg(t,72.82,73.4))))}
  return h}
// I: question: 1 or 2?
function sI(t){const X=12000;let h=floor(X);
  const h1=t>75.84&&t<76.74,h2=t>77.08&&t<78.0;
  h+=person(X-200,FY,t,{op:ap(t,73.8)[0],ring:h1?.9:0})+G(X-330,FY-6,1,ap(t,74.0)[0],weed(t,1.3,0)+`<g transform="translate(28 0)">${weed(t,1.1,2)}</g>`);
  h+=person(X+200,FY,t,{op:ap(t,73.9)[0],ph:1,ring:h2?.9:0})+G(X+330,FY,1,ap(t,74.1)[0],corn(t,1));
  h+=G(X-200,FY-260,ap(t,74.0)[1]*(h1?1.15:1),ap(t,74.0)[0],numPill(1,h1||t>78.5&&t<79.1));
  h+=G(X+200,FY-260,ap(t,74.1)[1]*(h2?1.15:1),ap(t,74.1)[0],numPill(2,h2||t>79.48&&t<80.0));
  if(t>78.06&&t<79.9){const [o,s]=ap(t,78.06,79.6);h+=G(X,440,s,o,I.pill('COMENTA: 1 OU 2',{size:20}))}
  if(t>79.78){const cl=t>80.46;const [o3,s3]=ap(t,79.78);const pul=cl?1+.06*Math.sin((t-80.46)*8)*Math.exp(-(t-80.46)*2):1;
    h+=G(X,440,s3*pul,o3,`<rect x="-150" y="-34" width="300" height="68" rx="34" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/><path d="M-118 0 L-94 0 M-106 -12 L-106 12" stroke="${cl?'#050505':W}" stroke-width="5" stroke-linecap="round"/>`+T(14,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}))}
  return h}
const SCENES=[[sA,0,6.6],[sB,5.0,21.6],[sC,20.1,31.7],[sD,30.1,39.5],[sE,37.9,49.6],[sF,48.0,58.7],[sG,57.1,69.2],[sH,67.6,74.5],[sI,72.9,99]];
const TOTAL=82.3;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const vig=Math.max(ease(seg(t,35.2,35.7))*(1-ease(seg(t,42.9,43.4)))*.5);
  document.getElementById('s').innerHTML=`
  <defs>
   <filter id="fP" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="fD" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="tg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <radialGradient id="spot" cx=".5" cy=".48" r=".55"><stop offset="0" stop-color="#2a2a2a"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#050505"/></radialGradient>
   <radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
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
 [0.1,'pop',.5],[0.3,'pop',.5],[0.6,'sparkle',.4],[4.3,'pop',.8],[4.5,'smallwin',.6],[4.76,'error',.6],
 [5.8,'whoosh',.6],[6.0,'pop',.5],[6.54,'pop',.6],[6.74,'pop',.6],[8.08,'pop',.6],[10.88,'sparkle',.4],[12.14,'steps',.6],[13.1,'door',.7],[13.4,'pop',.4],
 [14.52,'sparkle',.4],[15.9,'steps',.6],[17.2,'dig',.9],[17.6,'dig',.8],[18.3,'drop',.5],[18.44,'drop',.5],[18.58,'drop',.5],[18.72,'drop',.5],[19.6,'throwswoosh',.6],
 [20.85,'whoosh',.7],[21.0,'rumble',.5],[21.58,'drop',.6],[21.7,'drop',.4],[22.0,'drop',.4],[25.06,'pageflip',.7],[27.7,'sparkle',.6],[29.24,'drop',.5],
 [30.85,'whoosh',.6],[31.0,'timelapse',.7],[31.4,'grow',.8],[34.44,'ding',.8],[35.4,'grow',.4],[37.68,'error',.8],[37.7,'sad',.6],
 [38.7,'whoosh',.6],[40.26,'pop',.7],[43.06,'rumble',.6],[44.58,'drop',.6],[44.8,'drop',.4],[45.94,'pop',.5],[46.98,'buzz',.7],
 [48.8,'whoosh',.6],[48.86,'pageflip',.8],[49.6,'marker',.5],[50.98,'ding',.5],[54.28,'pop',.7],[55.3,'throwswoosh',.5],[55.88,'grow',.8],[56.84,'smallwin',.7],
 [57.9,'whoosh',.6],[59.44,'pop',.7],[60.84,'typing',.7],[62.7,'sparkle',.4],[63.76,'pop',.7],[65.28,'pop',.7],[65.9,'paper',.6],[66.5,'coin',.7],
 [68.35,'whoosh',.6],[68.5,'rumble',.5],[69.0,'drop',.5],[71.68,'fallwhistle',.3],[72.18,'drop',.7],[72.82,'grow',.8],[73.0,'sparkle',.6],
 [73.65,'whoosh',.6],[74.0,'pop',.6],[74.1,'pop',.6],[75.84,'tap',.7],[77.08,'tap',.7],[78.06,'pop',.8],[79.78,'pop',.9],[80.46,'click',1.2],[80.5,'smallwin',.8],
];
