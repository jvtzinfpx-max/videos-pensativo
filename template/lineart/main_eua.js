const CAM=[
 [0,0,560,1.12,0],[0.3,0,560,1.0,4.0],
 [4.6,1500,540,1,.7],
 [9.45,3000,540,1,.75],
 [22.35,4500,540,1,.75],
 [34.8,6000,540,1,.75],
 [49.1,7500,540,1,.75],
 [63.0,9000,540,1,.75],
 [70.0,10500,540,1,.7],
];
const PUNCH=[[3.52,.05],[8.76,.05],[11.2,.04],[14.72,.05],[17.04,.04],[20.76,.04],[27.84,.05],[33.8,.05],[39.2,.04],[43.72,.06],[47.28,.05],[50.16,.04],[52.16,.05],[54.48,.05],[56.08,.05],[64.96,.04],[68.12,.05],[72.6,.04]];
const SHAKE=[[54.5,.5,6],[31.0,.4,3]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.13,'IMAGINA ACORDAR AMANHÃ'],[1.88,'E O BRASIL FUNCIONAR','IGUAL AOS ESTADOS UNIDOS',3.0],
 [5.08,'MESMO POVO'],[6.08,'MESMAS CIDADES'],[7.44,'SÓ AS REGRAS','DA ECONOMIA MUDARAM',8.16],
 [9.76,'A PRIMEIRA MUDANÇA','NO SEU BOLSO',11.2],[12.4,'DE TUDO QUE O BRASIL PRODUZ'],[14.52,'32% VAI PRA IMPOSTO'],[17.04,'LÁ, UNS 25%'],
 [18.9,'SOBRA MAIS DINHEIRO','NA SUA MÃO',19.84],[20.68,'E NA MÃO DE QUEM','QUER CONTRATAR',21.2],
 [22.47,'A SEGUNDA É A PAPELADA'],[24.48,'RANKING DO BANCO MUNDIAL'],[26.28,'1.500 HORAS POR ANO','SÓ PRA PAGAR IMPOSTO',29.68],[32.0,'NOS ESTADOS UNIDOS','MENOS DE 200',33.36],
 [34.88,'A TERCEIRA É A MAIS FAMOSA'],[37.04,'QUEM TEM UMA IDEIA','ACHA INVESTIDOR RÁPIDO',38.32],[40.03,'EMPRESAS DE GARAGEM','VIRARAM GIGANTES',42.24],[43.72,'QUE VALEM TRILHÕES'],[44.76,'RENDA POR PESSOA','MAIS DE 8 VEZES MAIOR',46.64],
 [49.2,'MAS TEM O OUTRO LADO'],[50.96,'LÁ NÃO EXISTE SUS'],[52.88,'UMA IDA AO HOSPITAL','PODE VIRAR DÍVIDA',54.16],[55.24,'+ DE 20 MILHÕES','SEM PLANO DE SAÚDE',57.6],[59.12,'SEM 13º','NEM FÉRIAS PAGAS POR LEI',60.8],
 [63.25,'ENTÃO A TROCA SERIA ESSA'],[64.96,'+ LIBERDADE','+ DINHEIRO NO BOLSO',66.16],[67.56,'+ RESPONSABILIDADE','NAS SUAS COSTAS',68.88],
 [70.28,'VOCÊ TROCARIA?'],[71.28,'COMENTA AÍ'],[72.12,'E ME SEGUE'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fly(a,b,t,t0,t1,arc=-80){const p=eio(seg(t,t0,t1));return [lerp(a[0],b[0],p),lerp(a[1],b[1],p)+arc*Math.sin(Math.PI*p)]}
function tie(x,y,s=1){return `<path transform="translate(${x} ${y}) scale(${s})" d="M-8 -118 L8 -118 L5 -108 L12 -60 L0 -46 L-12 -60 L-5 -108 Z" fill="#050505"/>`}
function sA(t){const X=0;let h=floor(X);
  const up=eio(seg(t,0.96,1.7));
  h+=person(X,FY,t,{rot:-90*(1-up),dim:.4*(1-up),ring:t>1.7&&t<2.6?Math.sin(seg(t,1.7,2.6)*Math.PI):0});
  if(t>2.0){const [o,s]=ap(t,2.0);h+=G(X-270,FY,1,o,pole(seg(t,2.0,2.4)))+G(X-170,FY-200,s,o,flagBR(t,seg(t,2.04,2.9)))+G(X-170,FY-20,1,o,T(0,0,'BRASIL',15,{w:800,ls:4,filt:''}))}
  if(t>3.4){const [o,s]=ap(t,3.4);h+=G(X+90,FY,1,o,pole(seg(t,3.4,3.8)))+G(X+190,FY-200,s,o,flagUS(t,seg(t,3.5,4.3)))+G(X+190,FY-20,1,o,T(0,0,'EUA',15,{w:800,ls:4,filt:''}))}
  return h}
function sB(t){const X=1500;let h=floor(X);
  const shrink=eio(seg(t,7.3,7.9));
  [-150,0,150].forEach((dx,i)=>{const a=5.0+i*.12;if(t<a)return;const [o]=ap(t,a);const x=X+lerp(dx,-330+i*70,shrink);h+=person(x,FY,t,{op:o,s:lerp(1,.6,shrink),ph:i})});
  if(t>5.6&&t<7.3){const [o,s]=ap(t,5.6,7.0);h+=G(X,470,s,o,I.check(1))}
  // city sign
  if(t>6.0){const [o,s]=ap(t,6.0);const x=X+lerp(320,370,shrink);h+=G(x,FY,1,o,P('M-50 0 L-50 -150 M50 0 L50 -150',seg(t,6.0,6.3),4))+G(x,FY-200,s*(1-.3*shrink),o,`<rect x="-110" y="-46" width="220" height="92" rx="12" fill="#050505" ${LS} stroke-width="5"/>`+T(0,-6,'SUA',16,{w:800,ls:4,filt:'',col:'#A8A8A8'})+T(0,24,'CIDADE',26,{w:900,ls:4,filt:''}))}
  if(t>7.44){const [o,s]=ap(t,7.44);const fl=seg(t,8.6,9.0);h+=G(X+40,560,s,o,`<g transform="rotate(${Math.sin(t*1.6)*3})">${book(t,seg(t,7.44,7.9),fl<.5?'BR':'EUA',fl)}</g>`)}
  return h}
function sC(t){const X=3000;let h=floor(X);
  // pocket
  if(t<12.8){const [o,s]=ap(t,9.6,12.3);const n=t>11.2?ease(seg(t,11.2,11.8)):0;h+=G(X-60,560,s*1.2,o,pocket(seg(t,9.7,10.3),n,t))}
  // pizzas
  if(t>12.4&&t<19.2){const o=ap(t,12.4,18.7)[0];const fr=seg(t,14.6,15.1);const off=ease(seg(t,15.1,15.7))*40;
    h+=G(X-200,520,back(seg(t,12.4,12.8)),o,pizza(seg(t,12.4,13.2),.32*Math.min(1,fr*3),off))+G(X-200,680,1,o,T(0,0,'BRASIL',15,{w:800,ls:4,filt:''}));
    if(t>15.6){const [o2,s2]=ap(t,15.6,18.7);h+=G(X-200,360,s2,o2,I.pill('32% IMPOSTO',{size:20}))}
    if(t>17.0){const [o3,s3]=ap(t,17.0,18.7);h+=G(X+200,520,s3,o3,pizza(1,.25*seg(t,17.3,17.7),ease(seg(t,17.7,18.2))*30))+G(X+200,680,1,o3,T(0,0,'EUA',15,{w:800,ls:4,filt:''}));
      if(t>18.0){const [o4,s4]=ap(t,18.0,18.7);h+=G(X+200,360,s4,o4,I.pill('25%',{size:20,fill:true}))}}}
  // money to you + hire
  if(t>18.8){const shift=eio(seg(t,20.6,21.2));const px=X+lerp(0,-150,shift);const [o]=ap(t,18.8);
    h+=person(px,FY,t,{op:o,ring:t>20.2?.7:0});
    for(let i=0;i<5;i++){const a=19.4+i*.14;if(t<a)continue;const pos=fly([px+(i-2)*60,250],[px+(i-2)*14,FY-240-i*10],t,a,a+.45,0);h+=G(pos[0],pos[1],1,1,note(Math.sin(t*3+i)*8+(i-2)*6))}
    if(t>20.76){const [o2]=ap(t,20.76);const x2=X+lerp(320,170,ease(seg(t,20.76,21.3)));h+=person(x2,FY,t,{op:o2,ph:2})+g(0,0,1,o2,tie(x2,FY));
      if(t>21.4){const [o3,s3]=ap(t,21.4);h+=G(x2,FY-150,s3,o3,hireSign(seg(t,21.4,21.8),t))}}}
  return h}
function sD(t){const X=4500;let h=floor(X);
  const dx=X-180;
  h+=G(0,0,1,1,P(`M${dx-90} 640 L${dx+90} 640 M${dx-70} 640 L${dx-70} ${FY} M${dx+70} 640 L${dx+70} ${FY}`,seg(t,22.5,23.0),4));
  const tired=ease(seg(t,29.0,30.0));
  h+=person(dx-150,FY,t,{dim:.5*tired,headDY:10*tired,rot:-6*tired});
  if(t>24.48&&t<26.6){const [o,s]=ap(t,24.48,26.2);h+=G(X,420,s,o,`<rect x="-140" y="-40" width="280" height="80" rx="10" fill="none" stroke="${W}" stroke-width="3"/>`+T(0,-6,'RANKING',15,{w:800,ls:5,filt:'',col:'#A8A8A8'})+T(0,22,'BANCO MUNDIAL',20,{w:900,ls:4,filt:''}))}
  // scroll
  if(t>26.4){const len=.8*ease(seg(t,26.6,31.5));const back=ease(seg(t,31.9,32.5));h+=G(dx+60,FY,1,1-back,scroll(len,t));
    if(t>27.84){const n=Math.round(1500*ease(seg(t,27.84,29.4)));const s=n>=1000?Math.floor(n/1000)+'.'+String(n%1000).padStart(3,'0'):String(n);const [o,sc]=ap(t,27.84,31.9);
      h+=G(X+60,520,sc*1.1,o,I.dpill(s+' HORAS',26))}}
  // US
  if(t>32.0){const [o]=ap(t,32.0);const ux=X+250;h+=person(ux,FY,t,{op:o,ring:t>33.8?ease(seg(t,33.8,34.2)):0});
    const [o2,s2]=ap(t,32.4);h+=G(ux+110,FY-170,s2,o2,`<g transform="rotate(${Math.sin(t*2)*6})">${sheet(seg(t,32.4,32.9))}</g>`);
    if(t>33.8){const [o3,s3]=ap(t,33.8);h+=G(ux,470,s3,o3,I.pill('< 200 HORAS',{fill:true,size:22}))}}
  return h}
function sE(t){const X=6000;let h=floor(X);
  // garage + idea + investor
  if(t<41.6){const o=1-seg(t,41.0,41.6);const door=ease(seg(t,35.4,36.4));h+=G(X-180,FY,.9,o,garage(seg(t,34.9,35.6),door));
    h+=person(X-180,FY,t,{op:o*ap(t,35.8)[0],s:.85,ring:t>37.96?ease(seg(t,37.96,38.3)):0});
    if(t>37.96){const [o2,s2]=ap(t,37.96,40.8);h+=G(X-180,FY-260,s2*(1+.1*Math.sin(t*6)),o2*o,`<path d="M0 -26 L7 -7 L26 0 L7 7 L0 26 L-7 7 L-26 0 L-7 -7 Z" fill="${W}"/>`)+G(X-180,FY-310,1,o2*o,T(0,0,'IDEIA',14,{w:800,ls:4,filt:''}))}
    if(t>38.3){const ix=X+lerp(480,140,ease(seg(t,38.3,38.9)));const [o3]=ap(t,38.3);h+=person(ix,FY,t,{op:o3*o,ph:1})+g(0,0,1,o3*o,tie(ix,FY));
      const bp=fly([ix-60,FY-90],[X-120,FY-90],t,39.0,39.6,-60);h+=G(bp[0],bp[1],.75,o3*o,moneyBag(1))}}
  // tower grows
  if(t>40.9&&t<45.3){const o=ap(t,40.9,44.8)[0];const gh=eio(seg(t,41.4,43.3));h+=G(X,FY,1,o,tower(Math.max(.05,gh),1,t));
    if(t>43.72){const [o2,s2]=ap(t,43.72,44.8);h+=G(X+190,FY-380,s2*1.1,o2,I.pill('TRILHÕES',{fill:true,size:24}))}}
  // income compare
  if(t>44.8){const [o]=ap(t,44.8);h+=person(X-200,FY,t,{op:o})+person(X+200,FY,t,{op:o,ph:2});
    h+=G(X-200,FY+40,1,o,T(0,0,'BRASIL',14,{w:800,ls:4,filt:''}))+G(X+200,FY+40,1,o,T(0,0,'EUA',14,{w:800,ls:4,filt:''}));
    if(t>45.4){h+=G(X-90,FY-10,1,ap(t,45.4)[0],coinStack(1,t))}
    const n=Math.round(8*ease(seg(t,46.6,47.8)));if(n>0)h+=G(X+310,FY-10,1,1,coinStack(n,t));
    if(t>47.28){const [o2,s2]=ap(t,47.28);h+=G(X+200,FY-280,s2*1.2,o2,I.pill('8X',{fill:true,size:30}))}}
  return h}
function sF(t){const X=7500;let h=floor(X);
  if(t>51.3&&t<53.0){const [o,s]=ap(t,51.3,52.7);h+=G(X,520,s*1.2,o,susCard(seg(t,51.3,51.9)));if(t>52.16){const [o2,s2]=ap(t,52.16,52.7);h+=G(X+120,440,s2,o2,I.x(1.1))}}
  if(t>52.8&&t<55.4){const o=ap(t,52.8,55.0)[0];const ax=lerp(X-700,X-140,ease(seg(t,52.8,53.6)));h+=G(ax,FY-24,1,o,ambulance(1,t));
    if(t>54.3){const fall=seg(t,54.3,54.6);h+=G(X+200,lerp(300,560,ease(fall)),1,o,clipboard(1,'$$$$'));if(t>54.6){const [o2,s2]=ap(t,54.6,55.0);h+=G(X+200,380+Math.sin(t*30)*2,s2,o2,I.dpill('DÍVIDA',22))}}}
  if(t>55.3&&t<59.3){const o=ap(t,55.3,58.9)[0];const n=Math.round(30*ease(seg(t,55.5,56.5)));h+=G(X,410,1,o,peopleGrid(n,t));
    if(t>56.08){const k=Math.round(20*ease(seg(t,56.08,56.9)));const [o2,s2]=ap(t,56.08,58.9);h+=G(X,680,s2*1.15,o2,I.pill(k+' MILHÕES',{size:24}))}
    if(t>57.6){const [o3,s3]=ap(t,57.6,58.9);h+=G(X,600,s3,o3,I.dpill('SEM PLANO',20))}}
  if(t>59.2){const [o,s]=ap(t,59.6);const [o1,s1]=ap(t,61.0);h+=G(X-170,FY-30,s,o,envelope(seg(t,59.6,60.1)))+G(X+170,FY-40,s1,o1,umbrella(seg(t,61.0,61.6)));
    if(t>60.5){const [a,b]=ap(t,60.5);h+=G(X-90,FY-120,b,a,I.x(1))}
    if(t>62.0){const [a,b]=ap(t,62.0);h+=G(X+260,FY-170,b,a,I.x(1))}}
  return h}
function sG(t){const X=9000;let h=floor(X);
  const L=(t>65.2?1:0)+(t>66.16?1:0), R=t>67.68?2.2:0;const tl=lerp(0,(R-L)*6,1);
  const tilt=t<64.9?0:(R-L)*6+Math.sin(t*2)*1.2;const sx=X-170;
  h+=G(sx,FY,1,ap(t,63.1)[0],seesaw(tilt,seg(t,63.1,63.7)));
  const end=(side,dy)=>{const a=tilt*Math.PI/180;const x=sx+side*230*Math.cos(a), y=FY-56+side*230*Math.sin(a);return [x,y-dy]};
  if(t>65.2){const [o,s]=ap(t,65.2);const [x,y]=end(-1,40);h+=G(x,y,s,o,I.pill('LIBERDADE',{size:18}))}
  if(t>66.16){const [o,s]=ap(t,66.16);const [x,y]=end(-1,96);h+=G(x,y,s,o,I.pill('DINHEIRO',{size:18}))}
  if(t>67.68){const [o,s]=ap(t,67.68);const [x,y]=end(1,40);h+=G(x,y,s,o,I.pill('RESPONSABILIDADE',{fill:true,size:16}))}
  const PX=X+340;h+=person(PX,FY,t,{headDY:t>68.9?4:0});
  if(t>68.12){const q=ease(seg(t,68.12,68.6));h+=G(lerp(PX+120,PX-52,q),lerp(FY-300,FY-60,q),1,1,backpack(.9))}
  return h}
function sH(t){const X=10500;let h='';
  const [o]=ap(t,70.1);h+=G(X-210,470,.8,o,flagBR(t,seg(t,70.1,70.7)))+G(X+210,470,.8,o,flagUS(t,seg(t,70.2,70.8)))+G(X,470,1,o,`<g transform="rotate(${t>70.4?Math.sin((t-70.4)*3)*6:0})">${swapArrows(t)}</g>`);
  if(t>71.28){const pl=.05*Math.sin((t-71.28)*7);const [o1,s1]=ap(t,71.28);h+=G(X-150,640,s1*(1+pl),o1,I.pill('TROCARIA',{size:20}));const [o2,s2]=ap(t,71.5);h+=G(X+150,640,s2*(1-pl),o2,I.pill('NÃO TROCARIA',{size:20}))}
  if(t>72.12){const cl=t>72.6;const [o3,s3]=ap(t,72.12);const pul=cl?1+.06*Math.sin((t-72.6)*8)*Math.exp(-(t-72.6)*2):1;
    h+=G(X,760,s3*pul,o3,`<rect x="-150" y="-34" width="300" height="68" rx="20" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/><circle cx="-104" cy="-6" r="10" fill="${cl?'#050505':W}"/><path d="M-120 22 Q-104 4 -88 22" fill="${cl?'#050505':W}"/>`+T(20,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}));
    if(cl){const q=seg(t,72.6,73.3);h+=`<rect x="${X-150-q*60}" y="${726-q*60}" width="${300+q*120}" height="${68+q*120}" rx="30" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
const SCENES=[[sA,0,5.4],[sB,3.8,10.3],[sC,8.6,23.2],[sD,21.5,35.6],[sE,34.0,49.9],[sF,48.3,63.8],[sG,62.2,70.8],[sH,69.2,99]];
const TOTAL=74.2;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const vig=ease(seg(t,49.2,49.8))*(1-ease(seg(t,62.6,63.2)))*.4;
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
 [0.1,'pop',.6],[1.0,'swirl',.6],[1.7,'sparkle',.6],[2.04,'pop',.8],[2.3,'flip',.5],[3.5,'pop',.8],[3.8,'flip',.5],
 [4.6,'whoosh',.7],[5.0,'pop',.6],[5.12,'pop',.6],[5.24,'pop',.6],[5.6,'ding',.6],[6.05,'tap',.8],[7.4,'swirl',.5],[7.5,'pop',.8],[8.6,'pageflip',.9],
 [9.45,'whoosh',.7],[9.7,'pop',.7],[11.2,'paper',.8],[12.4,'pop',.8],[14.6,'snap',.8],[15.1,'swirl',.5],[15.6,'register',.7],[17.0,'pop',.8],[17.3,'snap',.7],[18.0,'pop',.6],
 [18.8,'pop',.6],[19.4,'paperdrop',.6],[19.7,'paperdrop',.5],[20.0,'chaching',.8],[20.76,'steps',.6],[21.4,'pop',.8],
 [22.35,'whoosh',.7],[22.6,'tap',.6],[24.5,'pop',.7],[26.6,'pageflip',.6],[27.0,'belt',.5],[27.84,'clockfast',.6],[29.0,'sad',.6],[31.9,'swirl',.6],[32.0,'pop',.7],[32.4,'paper',.8],[33.8,'ding',.9],
 [34.8,'whoosh',.7],[35.4,'creak',.7],[35.8,'pop',.5],[37.96,'sparkle',.9],[38.3,'steps',.6],[39.0,'throwswoosh',.6],[39.6,'coinbag',.9],[41.0,'poof',.6],[41.4,'grow',.9],[43.72,'chaching',.9],
 [44.8,'pop',.7],[45.4,'coin',.8],[46.6,'coinstream',.7],[47.28,'smallwin',.9],
 [49.1,'whoosh',.6],[49.3,'heartbeat',.6],[51.3,'pop',.7],[52.16,'error',.9],[52.8,'alarm',.4],[53.0,'planewhoosh',.4],[54.3,'fallwhistle',.4],[54.5,'thud',.9],[54.6,'buzz',.6],
 [55.5,'pop',.5],[56.08,'clockfast',.5],[57.6,'pop',.7],[59.6,'paper',.7],[60.5,'error',.7],[61.0,'pop',.7],[62.0,'error',.7],
 [63.0,'whoosh',.7],[63.2,'creak',.6],[65.2,'pop',.8],[66.16,'pop',.8],[67.68,'thud',.7],[68.12,'throwswoosh',.6],[68.6,'thud',.5],
 [70.0,'whoosh',.7],[70.4,'swirl',.6],[71.28,'pop',.8],[71.5,'pop',.8],[72.12,'pop',.9],[72.6,'click',1.2],[72.65,'smallwin',.8],
];
