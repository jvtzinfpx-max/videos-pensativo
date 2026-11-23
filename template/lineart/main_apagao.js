const CAM=[
 [0,0,560,1.12,0],[0.3,0,560,1.0,6.0],
 [7.5,1500,540,1,.7],[18.0,1560,560,1.06,.6],
 [21.2,3000,540,1,.75],[34.6,3000,560,1.08,1.2],
 [36.3,4500,540,1,.75],
 [52.2,6000,540,1,.75],
 [65.0,7500,540,1,.7],
 [74.0,9000,540,1,.7],
];
const PUNCH=[[2.1,.04],[6.0,.05],[12.12,.04],[17.04,.05],[20.32,.05],[29.84,.05],[33.52,.06],[41.12,.05],[44.64,.07],[51.36,.04],[56.96,.05],[61.0,.04],[71.04,.04],[73.12,.06],[77.2,.05]];
const SHAKE=[[44.64,.7,9],[20.32,.4,4],[56.96,.5,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.08,'SE O PAÍS INTEIRO','APAGASSE AGORA',1.52],[3.12,'QUEM LIGA','TUDO DE NOVO?',3.68],[5.12,'SPOILER:','NÃO EXISTE UM BOTÃO',6.0],
 [7.68,'IMAGINA...'],[8.56,'VOCÊ É QUEM','RELIGA O PAÍS',10.52],[12.12,'PRIMEIRO PROBLEMA'],[13.28,'PRA LIGAR UMA USINA','VOCÊ PRECISA DE ENERGIA',14.37],[15.96,'E NÃO TEM','NENHUMA',17.04],[18.08,'É COMO DAR PARTIDA','COM A BATERIA MORTA',19.84],
 [21.28,'A SAÍDA','UMA USINA QUE LIGA SOZINHA',22.36],[24.24,'UMA HIDRELÉTRICA'],[26.12,'VOCÊ ABRE A COMPORTA'],[27.4,'A ÁGUA DESCE','E GIRA A TURBINA',28.48],[29.57,'ELA ACORDA','SEM AJUDA DE NINGUÉM',30.32],[32.08,'O NOME DISSO'],[33.52,'BLACK START','A PARTIDA NO ESCURO',34.61],
 [36.4,'AGORA A PARTE DIFÍCIL'],[38.4,'NÃO DÁ PRA LIGAR','TUDO DE UMA VEZ',39.52],[40.84,'SE A CIDADE INTEIRA','PUXAR ENERGIA JUNTO',41.88],[43.32,'A USINA ENGASGA'],[44.52,'E CAI DE NOVO'],[45.92,'ACENDE UM PEDAÇO'],[47.92,'ESPERA ESTABILIZAR'],[49.28,'ACENDE O PRÓXIMO'],[50.64,'BAIRRO POR BAIRRO'],
 [52.3,'ISSO NÃO É TEORIA'],[54.08,'ABRIL DE 2025'],[56.08,'A ESPANHA','APAGOU INTEIRA',56.56],[58.0,'RELIGARAM COM','HIDRELÉTRICAS',58.72],[59.92,'+ AJUDA DA FRANÇA','E DO MARROCOS',60.8],[62.08,'QUASE TUDO SÓ VOLTOU','NA MANHÃ SEGUINTE',63.6],
 [65.09,'E AQUI NO BRASIL?'],[66.32,'SEMANA PASSADA'],[67.4,'USINA DE TUCURUÍ','PARÁ',68.6],[69.44,'TREINO ANUAL'],[71.04,'DO ZERO...'],[71.92,'LIGADA EM','28 MINUTOS',72.48],
 [74.21,'VOCÊ TERIA CORAGEM','DE APERTAR O PRIMEIRO BOTÃO?',75.16],[78.08,'ME SEGUE','PRA PRÓXIMA',78.48],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fall(t,t0,y0,y1,dur=.55){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
function lampOn(t,off,on2=1e9){if(t<off-.35)return 1;if(t<off)return Math.sin(t*60)>0?1:.25;if(t<on2)return 0;return ease(seg(t,on2,on2+.3))}
// A: street lamps go out, big ON button doesn't exist
function sA(t){const X=0;let h=floor(X);
  const L=[[-360,.1,1.6],[330,.3,2.08]];
  L.forEach(([dx,a,off])=>{h+=G(X+dx,FY,1,ap(t,a)[0],streetLamp(lampOn(t,off),seg(t,a,a+.6)))});
  const dark=ease(seg(t,2.1,2.6));
  h+=person(X-130,FY,t,{op:ap(t,.4)[0],dim:.35*dark,headDY:4*dark});
  if(t>3.12&&t<5.3){const [o,s]=ap(t,3.12,5.0);const bob=Math.sin(t*4)*6;h+=G(X-130,FY-270+bob,s,o,T(0,16,'?',54,{w:900,ls:0,filt:''}))}
  if(t>5.12){const [o,s]=ap(t,5.12,7.0);const crack=seg(t,6.0,6.5);h+=G(X+110,560+(t>6.6?fall(t,6.6,0,60,.5):0),s*(1-.1*crack),o,bigOnButton(t,seg(t,5.12,5.7),crack));
    if(t>6.0){const [o2,s2]=ap(t,6.0,7.0);h+=G(X+200,470,s2,o2,I.x(1))}}
  return h}
// B: you are the operator; generator needs power; dead car battery
function sB(t){const X=1500;let h=floor(X);
  const walk=eio(seg(t,7.7,8.7));const px=lerp(X-560,X-270,walk);const step=walk<1?Math.abs(Math.sin(t*10))*6:0;
  const dim=.3*ease(seg(t,16.0,16.6))*(1-ease(seg(t,18.0,18.4)));
  h+=person(px,FY-step,t,{op:ap(t,7.6)[0],dim})+hardhat(px,FY-step,t,ap(t,8.56)[0],1,0,0);
  if(t<12.6){const o=ap(t,8.56,12.1)[0];const lv=t>10.52?[ease(seg(t,10.52,10.8)),ease(seg(t,10.7,11.0)),ease(seg(t,10.9,11.2))]:[0,0,0];h+=G(X+60,FY,1,o,consoleDesk(t,seg(t,8.56,9.3),lv,t>11.2?1:0))}
  if(t>13.2&&t<18.4){const o=ap(t,13.2,18.0)[0];h+=G(X-40,FY,1,o,generator(t,seg(t,13.2,13.8)));
    const pq=eio(seg(t,14.37,15.1));const plx=lerp(X+80,X+230,pq),ply=FY-150;
    h+=g(0,0,1,o,`<path d="M${X+50} ${FY-90} Q${(plx+X+50)/2} ${FY+10} ${plx-30} ${ply}" ${LS} stroke-width="4"/>`,'filter="url(#tg)"');
    h+=G(plx,ply,1,o*ap(t,13.7)[0],plug());h+=G(X+330,FY-150,1,o*ap(t,14.0)[0],socket(seg(t,14.0,14.5)));
    if(t>15.96){const [o2,s2]=ap(t,15.96,18.0);h+=G(X+330,FY-290,s2,o*o2,I.dpill('0% ENERGIA',20))}
    if(t>17.04){const [o3,s3]=ap(t,17.04,18.0);h+=G(X+330,FY-150,s3,o*o3,I.x(1.1))}}
  if(t>18.08){const ci=eio(seg(t,18.08,18.8));const cx=lerp(X+700,X+130,ci);const sh=(t>19.24&&t<20.4)?1:0;
    h+=G(cx,FY,1,ap(t,18.08)[0],carSide(t,seg(t,18.08,18.6),sh));
    if(t>19.24&&t<20.6){const q=((t-19.24)*3)%1;h+=G(cx+20,FY-200,1,1-q,T(0,0,'CLIC',18,{w:900,ls:4,filt:''}))}
    if(t>19.92){const [o,s]=ap(t,19.92);const fl=t>20.32?(Math.sin(t*14)>0?1:.5):1;h+=G(X+150,450,s,o*fl,carBattery(t<20.32?.15*(1-seg(t,19.92,20.32)):0,seg(t,19.92,20.4)))}
    if(t>20.32){const [o,s]=ap(t,20.32);h+=G(X+260,410,s,o,I.x(.9));h+=G(0,0,1,1,smokePuff(cx-170,FY-40,seg(t,20.32,21.4)))}}
  return h}
// C: hydro plant wakes up by itself
function sC(t){const X=3000;let h=floor(X);
  const gate=eio(seg(t,26.64,27.3));const flow=ease(seg(t,27.52,28.0));
  const spin=t<28.48?0:Math.pow(seg(t,28.48,30.2),1.6)*((t-28.48)*420);const glow=ease(seg(t,29.84,30.3));
  h+=G(X-120,FY,1,ap(t,22.3)[0],dam(t,seg(t,22.36,23.4),gate,0,1)+waterFlow(t,flow));
  if(t>24.24){const [o]=ap(t,24.24);h+=G(X-110,FY+40,1,o,T(0,0,'HIDRELÉTRICA',16,{w:800,ls:5,filt:''}))}
  if(t>28.3){const [o,s]=ap(t,28.3);h+=G(X+120,FY-70,s,o,turbine(t,spin,seg(t,28.3,28.8),glow))}
  if(t>29.84){const [o,s]=ap(t,29.84,33.3);h+=G(X+120,FY-240,s,o,I.check(1))}
  const dark=ease(seg(t,34.61,35.2));
  h+=person(X+360,FY,t,{op:ap(t,21.4)[0],ring:glow*.9*(t>31?1:0)+0*dark})+hardhat(X+360,FY,t,ap(t,21.4)[0]);
  if(t>33.52){const [o,s]=ap(t,33.52,36.0);h+=G(X+120,FY-250,s*1.1,o,I.pill('BLACK START',{fill:true,size:22}))}
  return h}
// D: can't turn on everything at once; neighborhood by neighborhood
function sD(t){const X=4500;let h=floor(X);
  const bx=[X-110,X+40,X+190,X+340];
  // turbine state
  const fail=t>44.64&&t<45.92;const slow=t>43.76&&t<44.64;
  const spd=fail?0:(slow?160:420);const ang=t*spd;
  h+=G(X-340,FY-70,.8,ap(t,36.4)[0],turbine(t,ang,seg(t,36.4,37.0),0)+(slow?'':''));
  if(slow){h=h.replace('',''); }
  const wobX=slow?Math.sin(t*50)*4:0;
  // wire
  const wireP=seg(t,36.8,37.6);h+=G(0,0,1,1,P(`M${X-290} ${FY-120} L${X+340} ${FY-120}`,wireP,3)).replace('stroke-width="3"','stroke-width="3" opacity=".7"');
  // block lighting
  const all=t>41.12&&t<44.64;
  const seq=[46.56,49.36,50.64,51.12];
  bx.forEach((x,i)=>{let lit=0,fl=0;if(all){lit=ease(seg(t,41.12+i*.06,41.4+i*.06));if(t>43.76)fl=1}
    if(t>seq[i])lit=ease(seg(t,seq[i],seq[i]+.25));
    h+=G(x+wobX*0,FY,1,ap(t,36.8+i*.15)[0],block(lit,seg(t,36.8+i*.15,37.5+i*.15),t,fl))});
  // power dots along wire
  let lastLit=-1;seq.forEach((s,i)=>{if(t>s)lastLit=i});
  if(all)h+=G(0,0,1,1,sparkWire(X-290,FY-120,X+340,FY-120,t*2,1));
  else if(lastLit>=0&&t>45.92)h+=G(0,0,1,1,sparkWire(X-290,FY-120,bx[lastLit],FY-120,t,1));
  // gauge
  let ga=90;if(t>41.6&&t<44.64)ga=90-70*ease(seg(t,41.6,44.3))+(slow?Math.sin(t*30)*6:0);else if(t>=44.64&&t<45.92)ga=10;else if(t>=45.92){const k=seg(t,45.92,49.1);ga=lerp(10,90,ease(k))+Math.sin(t*9)*22*(1-k)*(k>0?1:0)}
  if(t>38.2){const [o,s]=ap(t,38.2);h+=G(X-340+wobX,450,s,o,freqGauge(ga,seg(t,38.2,38.8)))}
  if(t>44.64&&t<45.9){const [o,s]=ap(t,44.64,45.6);h+=G(X-200,360,s,o,I.x(.9))}
  if(t>49.12&&t<52.2){const [o,s]=ap(t,49.12);h+=G(X-230,370,s,o,I.check(.85))}
  if(t>38.6&&t<40.9){const [o,s]=ap(t,38.6,40.6);h+=G(X+115,FY-260,s,o,I.dpill('TUDO DE UMA VEZ',18))}
  return h}
// E: Spain April 2025
function sE(t){const X=6000;let h='';
  const offT=56.96;const re=[58.3,58.8,59.3,59.9,60.5,61.1,61.7,62.3,62.9,63.5];
  const lit=CITY.map((c,i)=>{if(t<offT)return 1;if(t<offT+.6){return t<offT+i*.06?1:0}return t>re[i]?ease(seg(t,re[i],re[i]+.3)):0});
  if(t>55.9){const [o]=ap(t,55.9);h+=G(X-40,580,1.3,o,iberia(t,seg(t,55.9,56.7),lit))+G(X+40,748,1,o*seg(t,56.6,57),T(0,0,'ESPANHA',18,{w:800,ls:6,filt:'',op:.8}))}
  if(t>52.5&&t<55.6){const [o]=ap(t,52.5,55.3);const st=1+1.2*(1-ease(seg(t,53.04,53.3)));h+=G(X,560,st,t<53.04?0:o,I.dpill('REAL',34))}
  if(t>54.3){const [o,s]=ap(t,54.3);let txt='12:33';if(t>62.08){const k=ease(seg(t,62.08,63.9));const mins=33+12*60+Math.round(k*(18*60+27));const hh=Math.floor(mins/60)%24,mm=mins%60;txt=String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')}
    h+=G(X+300,750,s*.8,o,digitalClock(txt,seg(t,54.3,54.9)));if(t>63.9){const [o2,s2]=ap(t,63.9);h+=G(X+300,670,s2,o2,I.pill('+1 DIA',{fill:true,size:16}))}}
  if(t>58.0){const [o,s]=ap(t,58.0);h+=G(X-360,800,.55*s,o,dam(t,1,1,0,1))+G(0,0,1,o,P(`M${X-330} ${720} Q${X-300} 680 ${X-250} 660`,seg(t,58.3,58.8),5)+`<circle cx="${X-250}" cy="660" r="7" fill="${W}" opacity="${seg(t,58.7,58.8)}"/>`)}
  if(t>60.4){const [o]=ap(t,60.4);h+=G(0,0,1,o,P(`M${X+300} 360 Q${X+230} 380 ${X+180} 440`,seg(t,60.4,60.9),5)+`<circle cx="${X+180}" cy="440" r="7" fill="${W}" opacity="${seg(t,60.8,60.9)}"/>`)+G(X+330,340,1,o,T(0,0,'FRANÇA',16,{w:800,ls:5,filt:''}))+G(0,0,1,1,sparkWire(X+300,360,X+180,440,t,o))}
  if(t>60.96){const [o]=ap(t,60.96);h+=G(0,0,1,o,P(`M${X-120} 860 Q${X-110} 820 ${X-90} 760`,seg(t,60.96,61.4),5)+`<circle cx="${X-90}" cy="760" r="7" fill="${W}" opacity="${seg(t,61.3,61.4)}"/>`)+G(X-130,900,1,o,T(0,0,'MARROCOS',16,{w:800,ls:5,filt:''}))+G(0,0,1,1,sparkWire(X-120,860,X-90,760,t,o))}
  return h}
// F: Tucuruí black start drill — 28 minutes
function sF(t){const X=7500;let h=floor(X);
  const k=ease(seg(t,71.92,73.12));const sec=Math.round(k*(28*60+8));const txt=String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
  const lit=t>73.12?ease(seg(t,73.12,73.5)):0;
  if(t>67.3){const [o]=ap(t,67.3);h+=G(X-170,FY,1,o,dam(t,seg(t,67.4,68.4),t>71.9?1:0,lit,1.25))+G(X-150,FY+40,1,o*seg(t,68.4,68.8),T(0,0,'TUCURUÍ · PA',16,{w:800,ls:5,filt:''}))}
  if(t>66.32&&t<69.4){const [o,s]=ap(t,66.32,69.0);h+=G(X+250,420,s,o,I.pill('NOV 2026',{size:20}))}
  if(t>65.1&&t<67.5){const [o,s]=ap(t,65.1,67.2);const bob=Math.sin(t*4)*5;h+=G(X,560+bob,s,o,T(0,16,'?',54,{w:900,ls:0,filt:''}))}
  if(t>69.6){const [o,s]=ap(t,69.6);h+=G(X+260,520,s*.95,o,stopwatch(t,seg(t,69.6,70.3),t>71.92?k*360*28:0,txt))}
  if(t>73.12){const [o,s]=ap(t,73.12);h+=G(X+370,400,s,o,I.check(1));const q=seg(t,73.12,73.9);h+=`<circle cx="${X+260}" cy="520" r="${100+q*120}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}
  if(lit>0)h+=G(0,0,1,1,sparkWire(X+40,FY-50,X+200,FY-50,t,lit));
  return h}
// G: your turn — would you press the first button?
function sG(t){const X=9000;let h=floor(X);
  const press=t>77.2?Math.sin(Math.PI*seg(t,77.2,77.5)):0;const glow=t>76.28?(t>77.5?1:.5+.5*Math.sin(t*8)):0;
  h+=G(X-130,FY,1,ap(t,74.2)[0],bigRedButton(t,press,seg(t,74.2,74.8),glow));
  h+=person(X+180,FY,t,{op:ap(t,74.4)[0],ring:t>77.5?.9:0})+hardhat(X+180,FY,t,ap(t,74.6)[0]);
  if(t>77.5){const q=seg(t,77.5,78.3);h+=`<circle cx="${X-130}" cy="${FY-110}" r="${100+q*400}" ${LS} stroke-width="3" opacity="${(1-q).toFixed(2)}" filter="url(#tg)"/>`}
  if(t>75.9&&t<78.0){const [o,s]=ap(t,75.9,77.8);h+=G(X-110,410,s,o,I.pill('SIM',{size:20}))+G(X+110,410,ap(t,76.2,77.8)[1],ap(t,76.2,77.8)[0],I.pill('NÃO',{size:20}))}
  if(t>78.08){const cl=t>78.64;const [o3,s3]=ap(t,78.08);const pul=cl?1+.06*Math.sin((t-78.64)*8)*Math.exp(-(t-78.64)*2):1;
    h+=G(X,410,s3*pul,o3,`<rect x="-150" y="-34" width="300" height="68" rx="34" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/><path d="M-118 0 L-94 0 M-106 -12 L-106 12" stroke="${cl?'#050505':W}" stroke-width="5" stroke-linecap="round"/>`+T(14,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}))}
  return h}
const SCENES=[[sA,0,8.3],[sB,6.7,22.0],[sC,20.4,37.1],[sD,35.5,53.0],[sE,51.4,65.8],[sF,64.2,74.8],[sG,73.2,99]];
const TOTAL=80.5;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const vig=Math.max(ease(seg(t,2.1,2.6))*(1-ease(seg(t,7.3,7.8)))*.5, ease(seg(t,34.61,35.2))*(1-ease(seg(t,36.2,36.6)))*.6, ease(seg(t,52.2,52.7))*(1-ease(seg(t,64.6,65.1)))*.45, (t>44.64&&t<45.92?.55:0));
  const flash=t>77.5?(1-seg(t,77.5,77.9))*.18:0;
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
  <rect width="1080" height="1080" fill="#fff" opacity="${flash.toFixed(3)}"/>
  <rect width="1080" height="1080" fill="#000" opacity="${(1-fade).toFixed(3)}"/>`;
}
window.render=render;window.TOTAL=TOTAL;
window.SFX=[
 [0.1,'pop',.5],[0.3,'pop',.5],[0.4,'pop',.4],[1.6,'switch',.8],[2.08,'switch',.9],[2.2,'sad',.5],[3.12,'pop',.6],[5.12,'pop',.8],[5.3,'sparkle',.4],[6.0,'error',.8],[6.05,'glitch',.6],[6.6,'fallwhistle',.3],[7.1,'thud',.6],
 [7.5,'whoosh',.6],[7.7,'steps',.6],[8.56,'pop',.6],[10.52,'lever',.8],[11.2,'beep',.6],[12.12,'whoosh',.3],[13.2,'pop',.7],[14.37,'throwswoosh',.5],[15.04,'click',.9],[15.96,'buzz',.6],[17.04,'error',.8],
 [18.08,'whoosh',.6],[19.24,'click',.9],[19.55,'click',.9],[19.86,'click',.9],[20.32,'buzz',.8],[20.4,'poof',.6],
 [21.2,'whoosh',.7],[22.36,'grow',.6],[24.24,'pop',.6],[26.64,'pulley',.8],[27.52,'drop',.6],[27.7,'rumble',.6],[28.48,'fan',.6],[29.84,'riser',.6],[30.3,'ding',.8],[33.52,'pop',.9],[33.6,'smallwin',.7],[34.61,'switch',.6],
 [36.3,'whoosh',.7],[36.5,'fan',.4],[38.2,'pop',.6],[38.6,'pop',.6],[41.12,'switch',.9],[41.2,'chaching',.3],[42.0,'heartbeat',.6],[43.76,'glitch',.8],[44.64,'thudbig',1],[44.7,'buzz',.8],
 [45.92,'fan',.5],[46.56,'switch',.8],[47.92,'clock',.6],[49.12,'ding',.6],[49.36,'switch',.8],[50.64,'switch',.8],[51.12,'switch',.8],[51.4,'smallwin',.6],
 [52.2,'whoosh',.6],[52.3,'heartbeat',.5],[53.04,'stamp',.9],[54.3,'beep',.6],[55.9,'marker',.5],[56.96,'thud',.8],[57.0,'sad',.6],[58.0,'pop',.6],[58.3,'switch',.5],[60.4,'throwswoosh',.5],[60.96,'throwswoosh',.5],[61.1,'switch',.5],[62.08,'clockfast',.6],[63.9,'ding',.7],
 [65.0,'whoosh',.7],[65.1,'pop',.6],[66.32,'pop',.7],[67.4,'grow',.6],[69.6,'pop',.7],[69.7,'clock',.6],[71.92,'clockfast',.7],[73.12,'ding',.9],[73.15,'smallwin',.8],
 [74.0,'whoosh',.6],[74.2,'pop',.6],[75.9,'pop',.7],[76.2,'pop',.7],[77.2,'click',1.1],[77.3,'switch',.8],[77.5,'sparkle',.6],[78.08,'pop',.9],[78.64,'click',1.2],[78.7,'smallwin',.8],
];
