const CAM=[
 [0,0,560,1.1,0],[0.3,0,560,1.0,5.0],
 [7.15,1500,540,1,.7],
 [12.15,3000,540,1,.7],
 [21.95,4500,540,1,.7],[27.4,4500,540,1.18,.6],
 [30.25,6000,580,1.1,.7],
 [39.1,7500,580,1.1,.7],
 [49.45,9000,580,1.1,.7],
 [57.38,10500,580,1.1,.7],
];
const PUNCH=[[2.2,.05],[5.2,.04],[7.6,.04],[15.68,.04],[19.68,.05],[23.44,.05],[26.64,.04],[28.96,.05],[32.48,.05],[36.0,.05],[38.32,.05],[40.19,.04],[43.52,.05],[47.92,.04],[51.52,.04],[55.2,.05],[56.68,.05],[61.64,.04]];
const SHAKE=[[3.0,.4,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.08,'SE VOCÊ PULAR','DE UM LUGAR ALTO',1.04],[2.2,'A GRAVIDADE NÃO PERGUNTA','SE VOCÊ TEM FÉ',3.68],[5.0,'ELA FUNCIONA','IGUAL PRA TODO MUNDO',5.92],
 [7.34,'DEUS FEZ O MUNDO','FUNCIONAR COM LEIS',8.64],[10.12,'E ELAS VALEM','PRA SUA VIDA TAMBÉM',10.88],
 [12.23,'MUITA GENTE ESPERA','A BÊNÇÃO CAIR DO CÉU',13.8],[15.52,''],
 [22.13,'O VERSÍCULO NÃO FALA','DO QUE VAI CAIR DO CÉU',23.44],[25.65,'FALA DO QUE','VOCÊ PLANTA',26.16],[27.41,'A COLHEITA ESTÁ','DENTRO DA SEMENTE',28.43],
 [30.31,'PEDIR SAÚDE','COMENDO BESTEIRA TODO DIA',31.2],[33.2,'PEDIR DINHEIRO SOBRANDO','GASTANDO TUDO NO MESMO DIA',34.72],[36.68,'A GENTE QUER COLHER','SEM NUNCA TER PLANTADO',37.72],
 [39.2,'A ORAÇÃO É PODEROSA'],[41.16,'MAS ELA NÃO','PLANTA POR VOCÊ',41.72],[42.92,'ELA TE DÁ FORÇA','PRA PLANTAR',43.92],[45.0,'ATÉ JESUS','30 ANOS DE PREPARO, 3 DE MINISTÉRIO',46.12],
 [49.52,'NEM TUDO DEPENDE DE VOCÊ'],[51.36,'O SOL E A CHUVA','VÊM DO ALTO',52.44],[53.44,'MAS ABRIR A TERRA','E COLOCAR A SEMENTE',54.48],[56.12,'ISSO É COM VOCÊ'],
 [57.5,'HOJE, ALÉM DE PEDIR','PERGUNTA:',59.04],[59.92,'QUAL SEMENTE EU ESTOU','DEIXANDO DE PLANTAR?',60.96],[62.4,'COMENTA AÍ'],[63.24,'E ME SEGUE'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fly(a,b,t,t0,t1,arc=-80){const p=eio(seg(t,t0,t1));return [lerp(a[0],b[0],p),lerp(a[1],b[1],p)+arc*Math.sin(Math.PI*p)]}
function fallY(t,t0,y0,y1,dur=.6){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
function sA(t){const X=0;let h=G(X+60,0,1,1,cliff(seg(t,0,.6)));
  const PX=X-150;h+=person(PX,FY-260,t,{op:ap(t,.1)[0],rot:t>.5&&t<2?Math.sin((t-.5)*3)*4:0});
  // two rocks of different size fall
  const rs=[[X+10,14,2.2],[X+10,30,2.2]];
  if(t>1.4){const [o,s]=ap(t,1.4);h+=G(X+20,t<2.2?FY-280:fallY(t,2.2,FY-280,FY-14,.8),s,o,rock(16))+G(X-50,t<2.2?FY-290:fallY(t,2.2,FY-290,FY-30,.8),s,o,rock(30));
    if(t>2.25&&t<3.2){const q=seg(t,2.25,3.0);h+=G(0,0,1,1-q,`<path d="M${X+160} ${FY-260} L${X+160} ${FY-60} M${X+144} ${FY-80} L${X+160} ${FY-58} L${X+176} ${FY-80}" ${LS} stroke-width="4"/>`)}
    if(t>3.0&&t<3.8){const q=seg(t,3.0,3.8);h+=`<ellipse cx="${X-20}" cy="${FY}" rx="${40+q*120}" ry="${8+q*20}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  if(t>3.84){const [o,s]=ap(t,3.84,6.9);h+=G(PX+150,FY-380,s,o,I.pill('FÉ?',{size:22}))}
  if(t>5.2){const [o,s]=ap(t,5.2);h+=G(X+260,FY-120,s,o,I.check(1))+G(X-20,FY-80,1,o,T(0,0,'=',40,{w:900,ls:0,filt:''}))}
  return h}
function sB(t){const X=1500;let h=floor(X);
  h+=G(X,360,1,ap(t,7.4)[0],burst(t,seg(t,7.4,8.2)));
  const items=[[X-250,pendulum(t,seg(t,8.0,8.5)),8.0,'PÊNDULO'],[X,apple(seg(t,8.4,8.8)),8.4,'QUEDA'],[X+250,drop2(seg(t,8.8,9.2)),8.8,'ÁGUA']];
  items.forEach(([x,svg,a],i)=>{if(t<a)return;const [o,s]=ap(t,a);const y=i==0?500:(i==1?(t>9.4?fallY(t,9.4,540,620,.5):540):(t>9.6?540+((t-9.6)*120)%100:540));h+=G(x,y,s,o,svg)});
  if(t>9.28){const [o,s]=ap(t,9.28);h+=G(X,700,s,o,I.pill('LEIS',{fill:true,size:24}))}
  if(t>10.12){const px=lerp(X+620,X+380,ease(seg(t,10.12,10.8)));h+=person(px,FY,t,{ring:t>11.2?ease(seg(t,11.2,11.6)):0})}
  return h}
function sC(t){const X=3000;let h=floor(X);
  const sh=eio(seg(t,15.4,16.0));const PX=X+lerp(0,-330,sh);
  if(t<16.2){const o=1-seg(t,15.6,16.1);h+=G(X,410,.9,o*ap(t,12.3)[0],cloud(seg(t,12.3,12.9)));
    if(t>13.8){const wob=Math.sin(t*5)*4;h+=G(X+wob,500,1,o*ap(t,13.8)[0],gift(seg(t,13.8,14.3)))}}
  h+=person(PX,FY,t,{s:lerp(1,.7,sh),headDY:-4,ph:1,op:1-seg(t,15.6,16.0)});
  if(t<15.6&&t>12.4){const o=ap(t,12.4,15.2)[0];h+=G(PX,FY-250,1,o,`<path d="M0 0 L0 -30 M-12 -18 L0 -32 L12 -18" ${LS} stroke-width="4" opacity="${.5+.5*Math.sin(t*5)}"/>`)}
  if(t>15.6){const p=seg(t,15.7,16.4);h+=G(X+40,560,1,ap(t,15.6)[0],scroll2(p,[['GÁLATAS 6:7',15.9,-62,30],['TUDO O QUE O HOMEM SEMEAR,',18.8,10,22],['ISSO TAMBÉM COLHERÁ',20.4,56,30]],t))}
  return h}
function sD(t){const X=4500;let h=floor(X);
  if(t<25.7){const o=1-seg(t,25.3,25.7);h+=G(X-200,430,.7,o,cloud(1))+G(X-200,fallY(t,23.0,490,700,.9)*1,1,o,gift(1));if(t>24.0){const [o2,s2]=ap(t,24.0,25.5);h+=G(X-80,560,s2,o2*o,I.x(1))}}
  // plant
  const PX=X+140;if(t>25.5){h+=G(X+20,FY,1,ap(t,25.5)[0],soil(seg(t,25.5,26.0),ease(seg(t,26.0,26.4))));
    h+=person(PX+120,FY,t,{op:ap(t,25.6)[0]*(1-seg(t,27.3,27.6)),rot:-8});
    const sy=fallY(t,26.4,FY-150,FY-36,.4);if(t>26.3&&t<27.6)h+=G(X+20,sy,.22,1,seed(1,0))}
  if(t>27.41){const [o,s]=ap(t,27.41);h+=G(X+20,520,s*1.6,o,seed(1,ease(seg(t,28.2,29.2))))+G(X+20,700,1,ap(t,28.96)[0],T(0,0,'DENTRO DA SEMENTE',16,{w:800,ls:4,filt:''}))}
  return h}
function sE(t){const X=6000;let h=floor(X);
  // health
  if(t<33.3){const o=1-seg(t,32.9,33.3);const PX=X-140;h+=person(PX,FY,t,{op:o*ap(t,30.3)[0],dim:t>32.3?.3:0});
    if(t>31.68){const pos=fly([PX+300,300],[PX+60,FY-110],t,31.68,32.2,-40);h+=G(pos[0],pos[1],1,o,burger())}
    if(t>30.72){const [a,b]=ap(t,30.72);h+=G(PX+200,500,b,a*o,heart(seg(t,30.72,31.1),ease(seg(t,32.4,32.9))))}
    if(t>32.48){const [a,b]=ap(t,32.48);h+=G(PX+300,440,b,a*o,I.x(1))}}
  // money
  if(t>33.2&&t<36.9){const o=ap(t,33.2,36.5)[0];const PX=X-140;h+=person(PX,FY,t,{op:o,ph:2});h+=G(PX+180,FY-120,1,o,wallet(seg(t,33.3,33.8)));
    for(let i=0;i<6;i++){const a=34.8+i*.18;if(t<a)continue;const q=seg(t,a,a+1.2);h+=G(PX+180+q*(140+i*30),FY-150-q*(220+i*20)+q*q*60,1,1-q,cash(q*200+i*30))}
    if(t>36.0){const [a,b]=ap(t,36.0,36.5);h+=G(PX+330,450,b,a,I.x(1))}}
  // harvest nothing
  if(t>36.68){const [o]=ap(t,36.68);h+=G(X+40,FY,1,o,soil(1,0));const PX=X-220;h+=person(PX,FY,t,{headDY:6});h+=G(PX+110,FY-90,.9,o,basket(seg(t,36.8,37.3)));
    if(t>38.32){const [a,b]=ap(t,38.32);h+=G(X+40,FY-120,b,a,I.x(1))}}
  return h}
function sF(t){const X=7500;let h=floor(X);
  const PX=X-150;
  if(t<45.0){const o=1-seg(t,44.6,45.0);const kneel=1-ease(seg(t,42.92,43.6));
    h+=g(PX,FY,1,o*ap(t,39.2)[0],beam(1-.6*(1-kneel),t));
    h+=`<g transform="translate(${PX} ${FY}) scale(1 ${(1-.3*kneel).toFixed(3)}) translate(${-PX} ${-FY})">`+person(PX,FY,t,{op:o,ring:kneel>.5?.6:.9})+'</g>';
    h+=G(PX+260,FY,1,o*ap(t,41.16)[0],seedBag(seg(t,41.16,41.7)));
    if(t>41.72&&t<42.9){const [a,b]=ap(t,41.72,42.6);h+=G(PX+260,FY-150,b,a,I.x(.9))}
    if(t>43.6){const dig=Math.max(0,Math.sin((t-43.6)*7));h+=G(PX+90,FY,1,o,hoe(-20+dig*30))+G(PX+180,FY,1,o,soil(seg(t,43.8,44.3),.6))}}
  if(t>45.0){const [o]=ap(t,45.0);h+=G(X+60,520,1,o,bars(ease(seg(t,46.12,47.4)),ease(seg(t,47.9,48.4))));
    if(t>46.4)h+=G(X-130,600,1,ap(t,46.4)[0],T(0,0,'30 ANOS • PREPARO',20,{w:800,ls:3,filt:''}));
    if(t>48.0)h+=G(X+250,600,1,ap(t,48.0)[0],T(0,0,'3 ANOS',20,{w:900,ls:3,filt:''}));
    h+=person(X+60,FY,t,{op:o,s:.8,ring:t>48.4?.7:0})}
  return h}
function sG(t){const X=9000;let h=floor(X);
  if(t>51.5)h+=G(X-260,440,.8,ap(t,51.5)[0],sunSmall(t,seg(t,51.5,52)));
  if(t>52.08){h+=G(X+260,430,.6,ap(t,52.08)[0],cloud(seg(t,52.08,52.5)));h+=G(X+260,430,.6,1,rain(t,ap(t,52.4)[0]))}
  const SX=X+40;h+=G(SX,FY,1,ap(t,49.5)[0],soil(seg(t,49.5,50),ease(seg(t,53.6,54.2))));
  const PX=X-150;const dig=t>53.6&&t<54.6?Math.max(0,Math.sin((t-53.6)*8)):0;h+=person(PX,FY,t,{op:ap(t,49.6)[0],dim:t<51.3?.35:0});
  h+=G(PX+90,FY,1,ap(t,49.7)[0],hoe(-20+dig*30));
  if(t>54.64&&t<55.6){h+=G(SX,fallY(t,54.64,FY-200,FY-36,.5),.22,1,seed(1,0))}
  if(t>55.2){h+=G(SX,FY-30,1,1,sprout(ease(seg(t,55.4,57.2)),t))}
  if(t>56.68){const [o,s]=ap(t,56.68);h+=G(SX+170,FY-240,s,o,I.pill('COM VOCÊ',{fill:true,size:20}))}
  return h}
function sH(t){const X=10500;let h=floor(X);
  const PX=X-120;h+=person(PX,FY,t,{ring:t>59.9?.6:0});h+=G(PX+150,FY,.9,ap(t,57.5)[0],seedBag(seg(t,57.5,58.1)));
  if(t>59.92){const [o,s]=ap(t,59.92,62.2);h+=G(PX,FY-280,s*(1+.06*Math.sin(t*5)),o,T(0,16,'?',56,{w:900,ls:0,filt:''}))}
  if(t>62.4){const [o,s]=ap(t,62.4);h+=G(X+170,470,s,o,I.pill('COMENTA AÍ',{size:20}))}
  if(t>63.24){const cl=t>63.75;const [o3,s3]=ap(t,63.24);const pul=cl?1+.06*Math.sin((t-63.75)*8)*Math.exp(-(t-63.75)*2):1;
    h+=G(X+170,560,s3*pul*.9,o3,`<rect x="-150" y="-34" width="300" height="68" rx="20" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/><circle cx="-104" cy="-6" r="10" fill="${cl?'#050505':W}"/><path d="M-120 22 Q-104 4 -88 22" fill="${cl?'#050505':W}"/>`+T(20,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}))}
  return h}
const SCENES=[[sA,0,8.0],[sB,6.4,13.0],[sC,11.4,22.8],[sD,21.2,31.1],[sE,29.5,39.9],[sF,38.3,50.3],[sG,48.6,58.2],[sH,56.6,99]];
const TOTAL=65.4;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const vig=ease(seg(t,15.4,15.9))*(1-ease(seg(t,21.6,22.1)))*.4;
  document.getElementById('s').innerHTML=`
  <defs>
   <filter id="fP" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="fD" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="tg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <linearGradient id="beamg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient>
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
 [0.1,'pop',.6],[0.5,'steps',.5],[1.4,'pop',.6],[2.2,'fallwhistle',.5],[3.0,'thudbig',.9],[3.84,'pop',.7],[5.2,'ding',.7],
 [7.15,'whoosh',.6],[7.4,'sparkle',.7],[8.0,'pop',.6],[8.4,'pop',.6],[8.8,'pop',.6],[9.4,'tap',.6],[9.28,'ding',.6],[10.12,'steps',.6],
 [12.15,'whoosh',.6],[12.3,'pop',.6],[13.8,'sparkle',.6],[15.6,'swirl',.6],[15.9,'pageflip',.9],[18.8,'typing',.4],[20.4,'typing',.4],[21.4,'ding',.6],
 [21.95,'whoosh',.6],[23.0,'fall',.5],[23.9,'thud',.5],[24.0,'error',.7],[25.5,'dig',.7],[26.4,'tap',.7],[27.4,'riser',.5],[28.2,'sparkle',.9],[28.96,'grow',.6],
 [30.25,'whoosh',.6],[30.72,'heartbeat',.6],[31.68,'throwswoosh',.5],[32.4,'crumble',.6],[32.48,'error',.7],[33.3,'pop',.6],[34.8,'paperdrop',.6],[35.2,'paperdrop',.5],[36.0,'error',.7],[36.8,'pop',.6],[38.32,'buzz',.7],
 [39.1,'whoosh',.5],[39.3,'riser2',.5],[41.16,'pop',.7],[41.72,'error',.6],[43.0,'smallwin',.6],[43.7,'dig',.7],[44.2,'dig',.6],[45.0,'whoosh',.5],[46.12,'grow',.5],[47.9,'pop',.8],[48.4,'ding',.7],
 [49.45,'whoosh',.6],[51.5,'sparkle',.6],[52.1,'pop',.5],[53.6,'dig',.7],[54.1,'dig',.7],[54.64,'tap',.8],[55.4,'grow',.9],[56.68,'smallwin',.8],
 [57.38,'whoosh',.6],[57.5,'pop',.6],[59.92,'pop',.7],[62.4,'pop',.8],[63.24,'pop',.9],[63.75,'click',1.2],[63.8,'smallwin',.8],
];
