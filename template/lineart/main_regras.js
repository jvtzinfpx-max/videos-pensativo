const CAM=[
 [0,0,560,1.12,0],[0.3,0,560,1.0,5.0],
 [5.6,1500,540,1,.7],
 [13.05,3000,540,1,.75],[20.2,3000,560,1.1,.4],[22.1,3000,540,1,.5],
 [26.8,4500,540,1,.75],
 [41.0,6000,540,1,.75],
 [50.9,7500,540,1,.75],
 [58.8,9000,540,1,.75],
 [64.05,10500,540,1,.7],
 [71.8,12000,540,1,.7],
 [74.2,13500,540,1,.7],
];
const PUNCH=[[3.68,.05],[11.96,.04],[21.28,.06],[25.12,.04],[33.04,.04],[37.28,.05],[39.76,.04],[47.52,.05],[54.04,.04],[57.68,.05],[63.28,.05],[66.64,.04],[70.48,.05],[72.8,.04],[77.6,.04]];
const SHAKE=[[21.3,.5,6],[47.0,1.4,3]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
const TITLES=[
 [0.27,'EXISTEM REGRAS QUE','NÃO PERGUNTAM NO QUE VOCÊ ACREDITA',1.48],[3.68,'ELAS SIMPLESMENTE','FUNCIONAM',4.64],
 [5.75,'E SE VOCÊ PARASSE','DE BRIGAR COM ELAS?',6.76],[8.0,'MESMA FÉ'],[9.04,'MESMA VIDA'],[10.16,'SÓ QUE AGORA VOCÊ','CONHECE AS REGRAS DO JOGO',11.4],
 [13.27,'A PRIMEIRA É A GRAVIDADE'],[15.2,'1971, NA LUA'],[17.04,'UM MARTELO','E UMA PENA',18.88],[20.28,'CAÍRAM JUNTOS'],[22.24,'PESADO OU LEVE'],[23.6,'RICO OU POBRE'],[24.96,'ELA PUXA','TODO MUNDO IGUAL',25.52],
 [26.94,'A SEGUNDA É','O JURO COMPOSTO',27.92],[29.2,'ELE TRABALHA','24 HORAS POR DIA',29.88],[31.76,'SE O DINHEIRO É SEU','ELE CRESCE SOZINHO',33.04],[34.24,'SE A DÍVIDA É SUA'],[35.72,'O ROTATIVO DO CARTÃO','PASSA DE 400% AO ANO',36.92],[39.44,'ELE NÃO ESCOLHE LADO'],
 [41.18,'A TERCEIRA É O SEU CORPO'],[43.28,'18 HORAS ACORDADO'],[45.48,'SEUS REFLEXOS FICAM','PARECIDOS COM OS DE QUEM BEBEU',46.52],[48.4,'NÃO IMPORTA O QUANTO','VOCÊ QUEIRA ESTAR BEM',49.56],
 [51.03,'A QUARTA É O TEMPO'],[52.96,'TODO MUNDO RECEBE','86.400 SEGUNDOS POR DIA',54.04],[57.12,'NINGUÉM GANHA','UM A MAIS',57.96],
 [59.02,'AGORA A PARTE QUE','QUASE NINGUÉM PERCEBE',59.92],[61.68,'FÉ E ESSAS REGRAS','NÃO BRIGAM',63.04],[64.16,'QUEM ORA E RESPEITA','A GRAVIDADE',64.8],[66.36,'NÃO PULA DO TELHADO'],[67.84,'QUEM ACREDITA E','ENTENDE OS JUROS',68.8],[70.21,'NÃO VIVE NO ROTATIVO'],[71.92,'UMA COISA NÃO','CANCELA A OUTRA',72.8],
 [74.32,'QUAL DESSAS REGRAS','VOCÊ MAIS IGNORA?',74.8],[76.48,'COMENTA AÍ'],[77.4,'E ME SEGUE'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fly(a,b,t,t0,t1,arc=-80){const p=eio(seg(t,t0,t1));return [lerp(a[0],b[0],p),lerp(a[1],b[1],p)+arc*Math.sin(Math.PI*p)]}
function fall(t,t0,y0,y1,dur=.55){const q=seg(t,t0,t0+dur);return lerp(y0,y1,q*q)}
// A: three different people, balls fall together
function sA(t){const X=0;let h=floor(X);
  const xs=[-260,0,260];
  xs.forEach((dx,i)=>{const [o]=ap(t,.2+i*.25);h+=person(X+dx,FY,t,{op:o,ph:i});
    if(i==0&&t>.9)h+=G(X+dx+70,FY,.55,ap(t,.9)[0],candle(t,seg(t,.9,1.4)));
    if(i==1&&t>1.2)h+=G(X+dx,FY-250,1,ap(t,1.2)[0],T(0,0,'?',44,{w:900,ls:0,filt:''}));
    if(i==2&&t>1.5)g(0,0,1,1,'');
    if(i==2)h+=g(0,0,1,o,crown().replace('<path',`<path transform="translate(${X+dx} ${FY})"`));
    if(t>2.4){const y=t<3.68?lerp(260,300,Math.sin(t*3)*.5+.5):fall(t,3.68,300,FY-16,.5);const [bo]=ap(t,2.4);h+=G(X+dx+80,y,1,bo,ball(16))}
    if(t>4.18){const q=seg(t,4.18,4.8);h+=G(0,0,1,1,dustPuff(X+dx+90,FY,q))}});
  return h}
// B: person pushing a giant arrow, then rule board
function sB(t){const X=1500;let h=floor(X);
  const push=Math.sin(t*6)*3;const shrink=eio(seg(t,10.0,10.6));
  const ax=X-180;h+=G(ax,FY-100,1*(1-.4*shrink),ap(t,5.7)[0],bigArrowDown(seg(t,5.7,6.3)));
  if(t>6.3){const [o]=ap(t,6.3);h+=person(ax+150+push*(1-shrink),FY,t,{op:o,rot:-10*(1-shrink)})}
  if(t>6.76&&t<9.9){const [o,s]=ap(t,6.76,9.6);h+=G(ax,FY-330,s,o,I.x(1))}
  if(t>8.0){const [o,s]=ap(t,8.0);h+=G(ax+290,FY,.6*s,o,candle(t,seg(t,8.0,8.4)))+G(ax+290,FY+30,1,o,T(0,0,'FÉ',14,{w:800,ls:4,filt:''}))}
  if(t>9.04&&t<10.2){const [o]=ap(t,9.04,9.9);h+=G(ax+150,FY-250,1,o,`<circle r="46" ${LS} stroke-width="3" opacity="${.5+.5*Math.sin(t*6)}"/>`)}
  if(t>10.48){const [o,s]=ap(t,10.48);const n=t>11.96?Math.min(4,Math.floor((t-11.96)/.25)+1):0;h+=G(X+300,560,s*.95,o,ruleBoard(t,seg(t,10.48,11.4),0))}
  return h}
// C: moon, hammer + feather
function sC(t){const X=3000;let h=G(0,0,1,1,moonGround(X,seg(t,13.1,13.8)));
  if(t>15.2){h+=G(X+380,400,1,ap(t,15.2)[0],earthSmall(t,seg(t,15.2,15.8)))}
  const ax=X-60;h+=person(ax,FY-14,t,{op:ap(t,14)[0]})+g(ax,FY-14,1,ap(t,14.6)[0],helmet(),'filter="url(#tg)"');
  const drop=20.28;
  if(t>18.16){const [o,s]=ap(t,18.16);const y=t<drop?FY-170:fall(t,drop,FY-170,FY-44,.9);h+=G(ax-150,y,s,o,`<g transform="rotate(${t>drop+.9?80:0})">${hammer()}</g>`)}
  if(t>19.12){const [o,s]=ap(t,19.12);const y=t<drop?FY-170:fall(t,drop,FY-170,FY-30,.9);h+=G(ax+150,y,s,o,`<g transform="rotate(${t>drop+.9?75:0})">${feather(t*(t<drop+.9?1:0))}</g>`)}
  if(t>drop+.9&&t<drop+2){const q=seg(t,drop+.9,drop+1.6);h+=G(0,0,1,1,dustPuff(ax-150,FY-10,q)+dustPuff(ax+150,FY-10,q))}
  if(t>drop+1){const [o,s]=ap(t,drop+1,22.1);h+=G(ax,FY-300,s,o,I.check(1))}
  if(t>22.24){const [o,s]=ap(t,22.24,26.5);h+=G(X-260,420,s,o,I.pill('PESADO',{size:18}))+G(X+20,420,1,ap(t,22.6,26.5)[0],T(0,10,'=',40,{w:900,ls:0,filt:''}))+G(X+260,420,ap(t,22.96,26.5)[1],ap(t,22.96,26.5)[0],I.pill('LEVE',{size:18}))}
  if(t>23.6){const [o,s]=ap(t,23.6,26.5);h+=G(X-260,510,s,o,I.pill('RICO',{size:18}))+G(X+260,510,ap(t,24.1,26.5)[1],ap(t,24.1,26.5)[0],I.pill('POBRE',{size:18}))}
  if(t>25.12&&t<26.6){for(let i=-1;i<=1;i+=2){const q=((t-25.12)*1.6)%1;h+=G(X+i*260,560+q*40,1,1-q,`<path d="M0 0 L0 40 M-12 28 L0 42 L12 28" ${LS} stroke-width="4"/>`)}}
  return h}
// D: compound interest
function sD(t){const X=4500;let h=floor(X);
  // snowball on slope 27-31.5
  if(t<31.7){const o=1-seg(t,31.2,31.7);h+=G(0,0,1,o,P(`M${X-420} 520 L${X+300} ${FY}`,seg(t,26.9,27.5),4));
    const q=eio(seg(t,27.9,31.2));const x=lerp(X-380,X+240,q),y=lerp(520,FY,q);const r=14+46*q;const nx=-Math.sin(Math.atan2(FY-520,720)),ny=Math.cos(Math.atan2(FY-520,720));
    if(t>27.9)h+=G(x-nx*r*-1,y-ny*r,1,o,`<g transform="rotate(${q*900})">${snowball(r)}</g>`);
    if(t>29.36){const [o2,s2]=ap(t,29.36,31.2);h+=G(X-260,420,s2,o2,I.pill('24 H',{fill:true,size:22}))}}
  if(t>31.76){const g1=ease(seg(t,32.9,34.2));h+=G(X-230,FY-40,1,ap(t,31.76)[0],moneyTree(t,g1));h+=G(X-230,FY+40,1,ap(t,31.9)[0],T(0,0,'SEU DINHEIRO',14,{w:800,ls:3,filt:''}))}
  if(t>34.24){const [o,s]=ap(t,34.24);h+=G(X+220,600,s,o,creditCard(seg(t,34.24,34.9)));
    if(t>35.84)h+=G(X+220,600,1,seg(t,35.84,36.2),cycleArrows(150+6*Math.sin(t*5),t));
    if(t>37.28){const n=Math.round(400*ease(seg(t,37.28,38.4)));h+=G(X+220,450,1.1,ap(t,37.28)[0],I.dpill('+'+n+'% AO ANO',22))}
    h+=G(X+220,FY+40,1,o,T(0,0,'SUA DÍVIDA',14,{w:800,ls:3,filt:''}))}
  if(t>39.44){const q=.5+.5*Math.sin((t-39.44)*8);h+=G(X,560,1,ap(t,39.44)[0],`<path d="M-40 0 L40 0 M-24 -14 L-40 0 L-24 14 M24 -14 L40 0 L24 14" ${LS} stroke-width="5" opacity="${.6+.4*q}"/>`)}
  return h}
// E: body, 18h awake, reflex
function sE(t){const X=6000;let h=floor(X);
  const sway=t>44.6?Math.sin(t*2.6)*7*ease(seg(t,44.6,45.4)):0;const tired=ease(seg(t,44.4,45.2));
  const PX=X-60;h+=person(PX,FY,t,{rot:sway,dim:.45*tired,headDY:10*tired,ring:t<43?ap(t,41.2,42.9)[0]*.8:0});
  if(t>43.6){const n=Math.round(18*ease(seg(t,43.84,44.6)));h+=G(PX-230,470,1.05,ap(t,43.6)[0],I.pill(n+' H ACORDADO',{fill:n>=18,size:20}))}
  if(t>45.68){const y=fall(t,45.68,330,FY-16,.7);const by=t>46.38?FY-16-Math.abs(Math.sin((t-46.38)*7))*60*Math.exp(-(t-46.38)*3):y;h+=G(PX+90,by,1,ap(t,45.68,50.6)[0],ball(16));
    if(t>46.5){const [o,s]=ap(t,46.5,50.6);h+=G(PX+150,FY-140,s,o,I.x(.9))}}
  if(t>47.36){const [o,s]=ap(t,47.36,50.6);h+=G(X+300,FY,s,o,glassTilt(t,seg(t,47.36,47.9)))+G(X+180,FY-110,1,o,T(0,0,'≈',44,{w:900,ls:0,filt:''}))}
  if(t>48.6&&t<50.9){const jump=Math.max(0,Math.sin((t-48.6)*5))*24*(1-seg(t,49.2,50.2));h+=G(PX,FY-260-jump,1,ap(t,48.6,50.4)[0],`<path d="M0 0 L0 -30 M-12 -18 L0 -32 L12 -18" ${LS} stroke-width="4" opacity=".6"/>`)}
  return h}
// F: time, same seconds for all
function sF(t){const X=7500;let h=floor(X);
  const xs=[-280,0,280];const left=86400-Math.floor(Math.max(0,t-53.5)*7);
  xs.forEach((dx,i)=>{const [o]=ap(t,51.2+i*.2);h+=person(X+dx,FY,t,{op:o,ph:i,s:.9});
    if(i==2)h+=g(0,0,1,o,crown().replace('<path',`<path transform="translate(${X+dx} ${FY}) scale(.9)"`));
    if(i==0)h+=g(0,0,1,o,`<path transform="translate(${X+dx} ${FY}) scale(.9)" d="M-8 -118 L8 -118 L5 -108 L12 -60 L0 -46 L-12 -60 L-5 -108 Z" fill="#050505"/>`);
    if(t>53.5){const [o2,s2]=ap(t,53.5+i*.12);h+=G(X+dx,FY-260,s2,o2,I.pill(digits(t<54.04?Math.round(86400*ease(seg(t,53.5,54.0))):left)+' s',{size:18}))}});
  if(t>57.12){const [o,s]=ap(t,57.12);h+=G(X+150,470,s*1.1,o,I.pill('+1',{fill:true,size:24}));if(t>57.68){const [o2,s2]=ap(t,57.68);h+=G(X+210,440,s2,o2,I.x(.9))}}
  return h}
// G: faith + rules don't fight (puzzle)
function sG(t){const X=9000;let h=floor(X);
  if(t>59.0&&t<61.6){const [o,s]=ap(t,59.0,61.3);h+=G(X,560,s,o,`<circle r="${50+10*Math.sin(t*4)}" ${LS} stroke-width="3" stroke-dasharray="8 8"/>`+T(0,14,'!',40,{w:900,ls:0,filt:''}))}
  if(t>61.68){const j=eio(seg(t,62.9,63.3));const [o]=ap(t,61.68);
    h+=G(X-260+260*j,560,1,o,puzzle(-1,seg(t,61.68,62.2))+`<g transform="translate(-60 0)">${candle(t,1).replace(/<path d="M-34 0 L34 0"[^>]*>/,'')}</g>`.replace('translate(-60 0)','translate(-56 50) scale(.55)'));
    h+=G(X+260-260*j,560,1,ap(t,62.08)[0],puzzle(1,seg(t,62.08,62.6))+T(68,8,'REGRAS',14,{w:900,ls:2,filt:''}));
    if(t>63.28){const q=seg(t,63.28,64);h+=`<circle cx="${X}" cy="560" r="${80+q*160}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
// G2: roof & ladder, card & scissors
function sG2(t){const X=10500;let h=floor(X);
  if(t<67.9){const o=1-seg(t,67.5,67.9);h+=G(X-120,FY-230,1,o,roof(seg(t,64.1,64.7))+P('M-240 120 L-240 230 M40 120 L40 230',seg(t,64.1,64.7),5)+P('M-150 230 L-150 170 L-90 170 L-90 230',seg(t,64.3,64.9),4));
    const step=eio(seg(t,66.4,67.0));const px=lerp(X-40,X-170,step);h+=person(px,FY-230,t,{op:o*ap(t,64.2)[0],s:.75});
    if(t>65.0)h+=G(X+60,FY-230,1,o*ap(t,65.0)[0],`<g transform="scale(1 .7)">${ladder(seg(t,65.0,65.7))}</g>`);
    if(t>64.4){h+=G(X-260,FY-230,.5,o*ap(t,64.4)[0],candle(t,seg(t,64.4,64.9)))}
    if(t>66.64){const [o2,s2]=ap(t,66.64,67.5);h+=G(X+200,FY-360,s2,o2*o,I.check(1))}}
  if(t>67.84){const cut=seg(t,69.6,70.4);const [o]=ap(t,67.84);
    if(cut<1)h+=G(X-40,600,1,o,creditCard(seg(t,67.84,68.4)));else{const q=seg(t,70.4,71.2);h+=G(X-40-q*60,600+q*90,1,1-q*.4,`<g transform="rotate(${-q*20})"><clipPath id="cl"><rect x="-130" y="-80" width="130" height="160"/></clipPath><g clip-path="url(#cl)">${creditCard(1)}</g></g>`)+G(X-40+q*60,600+q*110,1,1-q*.4,`<g transform="rotate(${q*24})"><clipPath id="cr"><rect x="0" y="-80" width="130" height="160"/></clipPath><g clip-path="url(#cr)">${creditCard(1)}</g></g>`)}
    if(t>68.8&&t<71.6){const sx=lerp(X+300,X-40,eio(seg(t,69.2,70.4)));h+=G(sx,600,1,ap(t,68.8,71.3)[0],`<g transform="rotate(90)">${scissors(Math.abs(Math.sin(t*12)))}</g>`)}
    if(t>70.48){const [o2,s2]=ap(t,70.48);h+=G(X+200,460,s2,o2,I.dpill('ROTATIVO',22))+G(X+330,430,s2,o2,I.x(.9))}}
  return h}
function sG3(t){const X=12000;let h=floor(X);
  const [o]=ap(t,71.85);h+=G(X,560,1,o,puzzle(-1,1)+`<g transform="translate(-56 50) scale(.55)">${candle(t,1)}</g>`)+G(X,560,1,o,puzzle(1,1)+T(68,8,'REGRAS',14,{w:900,ls:2,filt:''}));
  if(t>72.8){const [o2,s2]=ap(t,72.8);h+=G(X,400,s2*1.1,o2,I.check(1.1))}
  h+=person(X+300,FY,t,{op:o,ring:t>72.8?.9:0});
  return h}
function sH(t){const X=13500;let h='';
  const icons=[()=>`<g transform="scale(.42)">${bigArrowDown(1)}</g>`,()=>`<g transform="translate(0 40) scale(.35)">${moneyTree(t,.8)}</g>`,()=>T(0,14,'Zz',36,{w:900,ls:0,filt:''}),()=>I.pill('86.400 s',{size:14,pad:12})];
  icons.forEach((f,i)=>{const a=74.4+i*.2;if(t<a)return;const [o,s]=ap(t,a);const x=X-300+i*200;h+=G(x,480,s*(1+.06*Math.sin(t*4+i)),o,f())+G(x,580,s,o,T(0,0,String(i+1),24,{w:900,ls:0,filt:''}))});
  if(t>76.48){const [o,s]=ap(t,76.48);h+=G(X,650,s,o,I.pill('COMENTA O NÚMERO',{size:18}))}
  if(t>77.4){const cl=t>77.9;const [o3,s3]=ap(t,77.4);const pul=cl?1+.06*Math.sin((t-77.9)*8)*Math.exp(-(t-77.9)*2):1;
    h+=G(X,770,s3*pul,o3,`<rect x="-150" y="-34" width="300" height="68" rx="20" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/><circle cx="-104" cy="-6" r="10" fill="${cl?'#050505':W}"/><path d="M-120 22 Q-104 4 -88 22" fill="${cl?'#050505':W}"/>`+T(20,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}));
    if(cl){const q=seg(t,77.9,78.6);h+=`<rect x="${X-150-q*60}" y="${736-q*60}" width="${300+q*120}" height="${68+q*120}" rx="30" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
const SCENES=[[sA,0,6.4],[sB,4.8,13.9],[sC,12.3,27.6],[sD,26.0,41.8],[sE,40.2,51.7],[sF,50.1,59.6],[sG,58.0,64.9],[sG2,63.3,72.6],[sG3,71.0,75.0],[sH,73.4,99]];
const TOTAL=79.4;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const vig=ease(seg(t,41.1,41.6))*(1-ease(seg(t,50.4,50.9)))*.45;
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
 [0.2,'pop',.6],[0.45,'pop',.6],[0.7,'pop',.6],[0.9,'sparkle',.4],[2.4,'pop',.5],[3.68,'fallwhistle',.4],[4.18,'thud',.9],
 [5.6,'whoosh',.6],[5.7,'grow',.6],[6.3,'steps',.6],[6.8,'error',.7],[8.0,'pop',.7],[9.04,'pop',.5],[10.48,'paper',.7],[11.96,'ding',.7],
 [13.05,'whoosh',.7],[13.3,'rumble',.5],[15.2,'sparkle',.5],[18.16,'pop',.7],[19.12,'pop',.6],[20.28,'fallwhistle',.5],[21.18,'thud',1],[21.3,'smallwin',.7],[22.24,'pop',.7],[22.96,'pop',.7],[23.6,'pop',.7],[24.1,'pop',.7],
 [26.8,'whoosh',.7],[27.9,'rumble',.6],[29.36,'pop',.7],[31.76,'grow',.8],[33.0,'coin',.7],[33.5,'coin',.6],[34.24,'pop',.8],[35.84,'swirl',.8],[37.28,'clockfast',.6],[38.4,'buzz',.7],[39.44,'tap',.6],
 [41.0,'whoosh',.6],[41.2,'heartbeat',.6],[43.84,'clockfast',.6],[45.68,'fallwhistle',.4],[46.38,'thud',.7],[46.5,'error',.8],[47.36,'pop',.7],[48.6,'tap',.5],[49.0,'sad',.7],
 [50.9,'whoosh',.7],[51.2,'pop',.5],[51.4,'pop',.5],[51.6,'pop',.5],[53.5,'beep',.6],[54.04,'clock',.6],[57.12,'pop',.8],[57.68,'error',.8],
 [58.8,'whoosh',.6],[59.0,'riser',.5],[61.68,'pop',.8],[62.08,'pop',.8],[62.9,'throwswoosh',.5],[63.28,'lock',.9],[63.35,'ding',.7],
 [64.05,'whoosh',.6],[64.4,'sparkle',.5],[65.0,'pop',.6],[66.4,'steps',.6],[66.64,'ding',.7],[67.84,'pop',.8],[69.2,'snap',.6],[69.8,'snap',.6],[70.4,'rip',.9],[70.48,'error',.7],
 [71.8,'whoosh',.6],[72.8,'smallwin',.9],
 [74.2,'whoosh',.6],[74.4,'pop',.6],[74.6,'pop',.6],[74.8,'pop',.6],[75.0,'pop',.6],[76.48,'pop',.8],[77.4,'pop',.9],[77.9,'click',1.2],[77.95,'smallwin',.8],
];
