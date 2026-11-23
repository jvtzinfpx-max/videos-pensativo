const CAM=[
 [0,0,560,1.1,0],[0.3,0,560,1.0,4.0],
 [6.6,1500,560,1,.7],
 [19.3,3000,580,1,.75],
 [31.4,4500,560,1,.75],
 [45.6,6000,560,1,.75],
 [56.9,7500,560,1,.9],[60.0,7500,580,1.05,4.0],
];
const PUNCH=[[3.46,.04],[5.46,.06],[9.16,.04],[17.62,.05],[21.2,.05],[28.48,.04],[33.68,.04],[41.7,.03],[44.04,.03],[47.74,.04],[52.26,.05],[54.76,.06]];
const SHAKE=[];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.05,'EXISTE UMA COISA NO BRASIL','QUE DÁ PRA VER DO ESPAÇO',1.9],[4.42,'E QUEM FEZ','FORAM CUPINS',5.18],
 [7.06,'SERTÃO DO NORDESTE'],[8.58,'200 MILHÕES','DE MONTINHOS DE TERRA',10.0],[12.58,'JUNTOS','QUASE DO TAMANHO DO ESTADO DE SP',13.5],[16.48,'ALGUNS TÊM','QUASE 4 MIL ANOS',17.28],
 [19.64,'MAS NÃO SÃO','A CASA DOS CUPINS',20.74],[22.62,'ELES VIVEM','EMBAIXO DA TERRA',23.4],[25.04,'CAVAM TÚNEIS'],[26.32,'E JOGAM A TERRA','PRA FORA',27.8],[28.76,'CADA MONTINHO É','A TERRA QUE SOBROU',30.06],
 [31.68,'OS CUPINS SABEM FAZER','OUTRA COISA INCRÍVEL',33.0],[34.82,'NA ÁFRICA'],[35.74,'TORRES QUE FICAM','FRESQUINHAS POR DENTRO',37.0],[38.7,'MESMO NO CALOR'],[40.08,'O TRUQUE:'],[41.48,'O AR QUENTE','SAI POR CIMA',42.02],[43.78,'O AR FRESCO','ENTRA POR BAIXO',44.48],
 [45.96,'UM ARQUITETO VIU ISSO'],[47.16,'E FEZ UM PRÉDIO IGUAL'],[48.78,'NO ZIMBÁBUE'],[49.88,'O PRÉDIO SE','REFRESCA SOZINHO',50.52],[51.74,'QUASE SEM','AR-CONDICIONADO',52.26],[53.44,'GASTA MENOS DE 10%','DA ENERGIA DE UM PRÉDIO COMUM',55.5],
 [57.1,'ENTÃO...'],[58.58,'DA PRÓXIMA VEZ QUE','VOCÊ VER UM CUPINZEIRO',59.56],[60.92,'PERGUNTE:'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1,y=FY){return `<path d="M${X-620} ${y} L${X+620} ${y}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
// A: seen from space — made by termites
function sA(t){const X=0;let h='';
  const mv=eio(seg(t,4.42,5.2));const ex=lerp(X,X-200,mv),es=lerp(1,.75,mv);
  h+=G(ex,580,es,ap(t,.05)[0],earth(t,seg(t,.05,.9)));
  if(t>2.4){const pul=.6+.4*Math.sin(t*6);for(let i=0;i<9;i++){const a=i*.7;const dx=Math.cos(a*2.1)*18+(i%3)*10,dy=Math.sin(a*1.7)*14;h+=`<circle cx="${(ex+(70+dx)*es).toFixed(1)}" cy="${(580+(-40+dy)*es).toFixed(1)}" r="${(4*es).toFixed(1)}" fill="${SOIL}" opacity="${(ap(t,2.4+i*.05)[0]*pul).toFixed(2)}"/>`}
    const [ro,rs]=ap(t,2.9);h+=G(ex+75*es,540,rs,ro,`<circle r="${36*es}" stroke="${SOIL}" stroke-width="3" fill="none" stroke-dasharray="6 6"/>`)}
  if(t>5.2){const [o,s]=ap(t,5.2);h+=G(X+240,580,2.2*s,o,termite(t,1,1))}
  return h}
// B: 200 million mounds, size of SP, 4000 years
function sB(t){const X=1500;let h=floor(X);
  h+=G(X-390,FY,1,ap(t,6.8)[0],cactus(t,seg(t,6.8,7.6)));
  h+=G(X+380,370,.9,ap(t,7.2)[0],sunC(t,seg(t,7.2,7.8)));
  const rows=[[FY,1,110,7],[FY-50,.7,80,9],[FY-90,.5,60,11]];let k=0;
  rows.slice().reverse().forEach(([y,s,sp,n])=>{for(let i=0;i<n;i++){const x=X-((n-1)*sp)/2+i*sp;const a=8.62+k*.05;k++;if(t<a)continue;const [o,sc]=ap(t,a);h+=G(x,y,1,o,moundS(1,s*sc))}});
  if(t>9.16&&t<12.5){const n=Math.round(200000000*ease(seg(t,9.16,10.4)));const [o,s]=ap(t,9.16,12.3);h+=G(X,440,s,o,I.pill(digits(n)+' MONTES',{fill:true,size:22}))}
  if(t>12.58&&t<16.5){const [o,s]=ap(t,12.58,16.3);h+=G(X,FY-60,1,o,PC(`M-360 -90 L360 -90 L360 70 L-360 70 Z`,seg(t,12.58,13.4),3,SOIL,'stroke-dasharray="10 10"'))+G(X,440,s,o,I.pill('≈ TAMANHO DO ESTADO DE SP',{size:20}))}
  if(t>16.48){const n=Math.round(4000*ease(seg(t,17.0,17.9)));const [o,s]=ap(t,16.48);h+=G(X,440,s,o,`<rect x="-120" y="-26" width="240" height="52" rx="26" fill="#050505" stroke="${GOLD}" stroke-width="4"/>`+T(0,9,'≈ '+digits(n)+' ANOS',24,{w:900,ls:3,filt:'',col:GOLD}))}
  return h}
// C: underground tunnels, the mound is leftover dirt
const TUN='M-150 560 Q-150 620 -100 650 Q-20 690 60 660 Q140 630 200 690 Q250 740 180 790 Q100 830 0 800 Q-120 770 -220 810 Q-300 840 -330 780';
function sC(t){const X=3000;let h='';const SY=560;
  h+=`<path d="M${X-620} ${SY} L${X+620} ${SY}" stroke="${SOIL}" stroke-width="3" opacity=".9"/>`;
  if(t>22.62)h+=`<rect x="${X-620}" y="${SY}" width="1240" height="420" fill="${SOIL}" opacity="${(.07*ap(t,22.62)[0]).toFixed(3)}"/>`;
  const grow=1.2+0.7*ease(seg(t,26.6,28.6));const pul=t>28.76&&t<29.6?1+.06*Math.sin((t-28.76)*14):1;
  h+=G(X-150,SY,1,ap(t,19.4)[0],moundS(seg(t,19.4,19.9),grow*pul));
  if(t>19.64&&t<22.5){const [o,s]=ap(t,19.64,22.2);h+=G(X+200,430,s,o,I.pill('CASA?',{size:22}));if(t>21.2)h+=G(X+290,410,ap(t,21.2,22.2)[1],ap(t,21.2,22.2)[0],I.x(.9))}
  if(t>22.7){h+=G(X,0,1,1,PC(TUN,seg(t,22.9,25.6),16,SOIL,'opacity=".55"'))}
  if(t>23.3){[[60,655,1],[-40,795,-1],[180,770,1]].forEach(([dx,y,d],i)=>{const a=23.3+i*.4;if(t<a)return;const wob=Math.sin(t*1.2+i)*30;h+=G(X+dx+wob,y,.7,ap(t,a)[0],`<g transform="scale(${d*(Math.cos(t*1.2+i)>0?1:-1)} 1)">${termite(t,1,1)}</g>`)})}
  if(t>26.32&&t<29.0){for(let i=0;i<8;i++){const a=26.4+i*.28;if(t<a||t>a+.8)continue;const q=seg(t,a,a+.8);const x=X-150+lerp(0,(i%2?1:-1)*30,q);const y=SY-Math.sin(Math.PI*q)*140-q*40;h+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${5+i%3*2}" fill="${SOIL}" opacity="${(1-q*.5).toFixed(2)}"/>`}}
  if(t>28.76){const [o,s]=ap(t,28.76);h+=G(X+150,420,s,o,I.pill('TERRA QUE SOBROU',{size:20}))+G(0,0,1,o,PC(`M${X+40} 440 Q${X-40} 440 ${X-100} 470`,seg(t,28.9,29.4),3))}
  return h}
// D: the African tower that cools itself
function sD(t){const X=4500;let h=floor(X);
  const inside=ease(seg(t,37.28,38.2));
  h+=G(X-60,FY,1,ap(t,34.8)[0],tower(t,seg(t,34.8,35.9),inside));
  if(t>31.68&&t<34.8){for(let i=0;i<3;i++){const q=((t-31.68)*1.1+i*.33)%1;h+=G(X-60+(i-1)*90,520-q*60,1,(1-q)*ap(t,31.68,34.4)[0],`<path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="${GOLD}"/>`)}}
  if(t>31.5&&t<35.2){const [o,s]=ap(t,31.5,34.7);h+=G(X-60+Math.sin(t*.9)*60,FY-30,1.6*s,o,`<g transform="scale(${Math.cos(t*.9)>0?1:-1} 1)">${termite(t,1,1)}</g>`)}
  if(t>34.82){const [o,s]=ap(t,34.82,38.6);h+=G(X+260,470,s,o,I.pill('ÁFRICA',{size:22}))}
  if(t>38.7){const [o,s]=ap(t,38.7);h+=G(X+320,380,s*.9,o,sunC(t,seg(t,38.7,39.2)))+G(X+320,480,1,o,heatWaves(t,o))}
  h+=G(0,0,1,1,airUp(t,ease(seg(t,41.48,42.0)),X-60,FY-40,FY-400));
  h+=G(0,0,1,1,airIn(t,ease(seg(t,43.78,44.3)),X-280,FY-22,BLUE,1)+airIn(t,ease(seg(t,43.78,44.3)),X+160,FY-22,BLUE,-1));
  if(t>41.48){const [o]=ap(t,41.48);h+=G(X+150,FY-330,1,o,T(0,0,'AR QUENTE',14,{w:900,ls:3,filt:'',col:ORANGE}))}
  if(t>43.78){const [o]=ap(t,43.78);h+=G(X-280,FY+40,1,o,T(0,0,'AR FRESCO',14,{w:900,ls:3,filt:'',col:BLUE}))}
  return h}
// E: the building that copied the tower
function sE(t){const X=6000;let h=floor(X);
  h+=person(X-340,FY,t,{op:ap(t,45.9)[0],ring:t>46.6&&t<47.6?.9:0});
  if(t>46.62){const [o,s]=ap(t,46.62);h+=G(X-260,FY-110,s,o,`<g transform="rotate(${(20+Math.sin(t*6)*8).toFixed(1)})">${pencil()}</g>`)}
  if(t>47.2){const morph=ease(seg(t,47.2,48.0));h+=G(X+20,FY,1,1-morph,tower(t,1,0))+G(X+20,FY,1,morph,building(t,seg(t,47.3,48.2),ease(seg(t,49.88,50.6))))}
  if(t>48.78&&t<51.6){const [o,s]=ap(t,48.78,51.3);h+=G(X-340,470,s,o,I.pill('ZIMBÁBUE',{size:20}))}
  h+=G(0,0,1,1,airUp(t,ease(seg(t,49.9,50.4))*(1-seg(t,53.3,53.6)*.0),X+20,FY-40,FY-400));
  h+=G(0,0,1,1,airIn(t,ease(seg(t,50.2,50.7)),X-230,FY-22,BLUE,1));
  if(t>51.74&&t<53.7){const [o,s]=ap(t,51.74,53.4);h+=G(X+310,480,s,o,acUnit(seg(t,51.74,52.2)));if(t>52.26)h+=G(X+380,430,ap(t,52.26,53.4)[1],ap(t,52.26,53.4)[0],I.x(.9))}
  if(t>53.44){const [o]=ap(t,53.44);h+=G(X+300,520,1,1,energyBars(t,ease(seg(t,53.9,55.4)),o))}
  return h}
// F: reflection
function sF(t){const X=7500;let h=floor(X);
  const sp=ease(seg(t,57.3,58.4));h+=`<g transform="translate(${X-80} ${FY})">${spotCone(sp)}</g>`;
  h+=person(X-80,FY,t,{op:ap(t,57.0)[0]});
  if(t>59.9){const [o]=ap(t,59.9);h+=G(X+220,FY,1,o,moundS(seg(t,59.9,60.4),1.6));const wx=X+220+Math.sin(t*.8)*80;h+=G(wx,FY-12,.45,o,`<g transform="scale(${Math.cos(t*.8)>0?1:-1} 1)">${termite(t,1,1)}</g>`)}
  if(t>61.9){const [o,s]=ap(t,61.9);h+=G(X,370,s,o,I.pill('O QUE MAIS A NATUREZA SABE FAZER...',{size:17,pad:20}))}
  if(t>63.8){const [o,s]=ap(t,63.8);h+=G(X,430,s,o,I.pill('...QUE A GENTE AINDA NÃO APRENDEU?',{fill:true,size:17,pad:20}))}
  if(t>65.4){for(let i=0;i<3;i++){const q=((t-65.4)*.9+i*.33)%1;h+=G(X+220+(i-1)*40,FY-110-q*50,1,(1-q),`<path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="${GOLD}"/>`)}}
  return h}
const SCENES=[[sA,0,7.4],[sB,5.8,20.1],[sC,18.5,32.2],[sD,30.6,46.4],[sE,44.8,57.7],[sF,56.1,99]];
const TOTAL=68.2;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.6,TOTAL));
  const vig=ease(seg(t,57.0,58.0))*.6;
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
 [0.1,'riser',.4],[2.4,'sparkle',.5],[2.9,'pop',.5],[5.2,'pop',.9],[5.3,'smallwin',.6],
 [6.6,'whoosh',.6],[6.8,'grow',.5],[8.62,'pop',.3],[8.9,'pop',.3],[9.2,'pop',.3],[9.5,'pop',.3],[9.16,'clockfast',.6],[10.4,'ding',.7],[12.58,'marker',.6],[16.48,'pop',.7],[17.0,'clockfast',.5],[17.9,'ding',.6],
 [19.3,'whoosh',.6],[19.64,'pop',.6],[21.2,'error',.8],[22.62,'rumble',.5],[22.9,'dig',.8],[24.0,'dig',.7],[25.04,'dig',.9],[26.4,'crumble',.8],[27.6,'crumble',.6],[28.76,'pop',.7],
 [31.4,'whoosh',.6],[31.68,'sparkle',.6],[34.8,'grow',.7],[34.82,'pop',.5],[37.28,'swirl',.5],[38.7,'sparkle',.4],[41.48,'riser',.4],[43.78,'swirl',.6],
 [45.6,'whoosh',.6],[46.62,'marker',.6],[47.2,'timelapse',.6],[48.78,'pop',.6],[49.88,'swirl',.5],[51.74,'pop',.6],[52.26,'error',.8],[53.9,'clockfast',.5],[55.4,'chaching',.7],
 [56.9,'whoosh',.5],[57.3,'spotlight',.7],[59.9,'pop',.5],[61.9,'pop',.5],[63.8,'pop',.6],[65.4,'sparkle',.6],
];
