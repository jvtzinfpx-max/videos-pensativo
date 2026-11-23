// ---------- camera [t,x,y,zoom,dur] ----------
const CAM=[
 [0,0,560,1.14,0],[0.3,0,560,1.0,5.6],
 [6.3,1500,540,1,.75],[11.2,1450,570,1.12,.5],
 [12.6,3000,600,1.1,.75],[16.0,3000,580,1.22,.5],[18.2,3000,600,1.1,.5],[23.0,3000,580,1.15,.5],[25.4,3000,600,1.1,.5],
 [31.6,4500,600,1.08,.75],
 [39.5,6000,540,1,.75],
 [42.5,7500,540,1,.7],[47.4,7500,560,1.08,.3],
 [48.4,9000,620,1.18,.7],
 [54.6,10380,600,1.1,.75],
 [61.15,12000,540,1,.6],
 [63.7,13500,540,1,.75],
 [68.2,15000,540,1,.75],[72.4,15000,570,1.1,.6],
 [73.2,16500,540,1,.75],
 [78.85,18000,540,1,.75],
];
const PUNCH=[[1.6,.05],[5.04,.04],[11.88,.05],[21.96,.04],[26.64,.05],[35.44,.04],[38.8,.05],[40.32,.04],[47.52,.07],[48.56,.05],[52.08,.04],[60.08,.05],[63.92,.04],[72.44,.04],[77.88,.05],[82.48,.04]];
const SHAKE=[[47.5,.6,8],[48.6,.5,5],[38.8,.3,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
// ---------- titles ----------
const TITLES=[
 [0.16,'O CAFÉ NÃO TE DÁ','ENERGIA NENHUMA',1.0],[2.85,'ELE SÓ ESCONDE','O SEU CANSAÇO',3.6],[4.84,'E COBRA DEPOIS'],
 [6.47,'E SE VOCÊ PARASSE','DE TOMAR CAFÉ AMANHÃ?',7.44],[8.88,'MESMA ROTINA'],[10.0,'MESMA MESA'],[11.12,'SÓ A XÍCARA SUMIU'],
 [12.83,'PRIMEIRO, O TRUQUE'],[14.16,'O DIA INTEIRO'],[15.2,'SEU CÉREBRO SOLTA','ADENOSINA',17.04],[18.24,'ELA VAI SE ENCAIXANDO','PEÇA POR PEÇA',19.6],
 [20.96,'QUANDO ENCHE','BATE O SONO',21.96],[22.96,'A CAFEÍNA TEM','QUASE O MESMO FORMATO',23.84],[25.44,'ELA ENTRA ANTES','E TRANCA O ENCAIXE',26.64],
 [27.92,'O CANSAÇO NÃO SOME'],[29.6,'ELE FICA ESPERANDO','DO LADO DE FORA',30.52],
 [31.74,'E O CÉREBRO PERCEBE'],[33.36,'CAFÉ TODO DIA'],[35.24,'ELE CRIA','MAIS ENCAIXES',35.68],[37.52,'UMA XÍCARA','JÁ NÃO BASTA',38.52],
 [39.65,'AGORA VOCÊ PARA'],[40.96,'12 HORAS DEPOIS'],[42.64,'OS ENCAIXES FICAM','LIVRES DE UMA VEZ',43.68],[45.4,'O CANSAÇO DA FILA','ENTRA TODO JUNTO',47.0],
 [48.56,'DOR DE CABEÇA'],[49.68,'SONO PESADO'],[50.72,'IRRITAÇÃO'],[51.92,'O PIOR VEM','ENTRE O 1º E O 2º DIA',52.72],
 [54.78,'MAS O CÉREBRO DESMONTA','OS ENCAIXES EXTRAS',56.6],[58.08,'EM ATÉ 9 DIAS'],[59.84,'VOCÊ VOLTA','AO NORMAL',60.36],
 [61.2,''],
 [63.82,'A CAFEÍNA LEVA','5 HORAS',64.96],[65.84,'PRA CAIR SÓ','PELA METADE',66.8],[68.32,'O CAFÉ DAS 4 DA TARDE'],[70.16,'ÀS 9 DA NOITE','AINDA ESTÁ PELA METADE',71.68],[72.44,'AÍ DENTRO'],
 [73.36,'MUITA GENTE ACHA','QUE PRECISA DE CAFÉ',74.48],[75.76,'MAS SÓ ESTÁ PAGANDO','O SONO QUE O CAFÉ ROUBOU',76.64],
 [79.0,'VOCÊ AGUENTARIA','9 DIAS SEM CAFÉ?',79.76],[81.36,'COMENTA AÍ'],[82.36,'E ME SEGUE'],
];
const G=(x,y,s,o,inner)=>g(x,y,s,o,inner,'filter="url(#tg)"');
function floor(X,o=1){return `<path d="M${X-620} ${FY} L${X+620} ${FY}" stroke="#8A8A8A" stroke-width="2" opacity="${o}"/>`}
function fly(a,b,t,t0,t1,arc=-80){const p=eio(seg(t,t0,t1));return [lerp(a[0],b[0],p),lerp(a[1],b[1],p)+arc*Math.sin(Math.PI*p)]}
// ---------- scenes ----------
function sA(t){let h=floor(0);const cx=-130;
  const cp=seg(t,0.1,0.8);
  // bolt from steam, then crossed
  const bo=ease(seg(t,1.0,1.4));const steam=ease(seg(t,0.5,1.0))*(1-bo*.7);
  h+=G(cx,FY,1.35,1,mug(t,cp,{steam,coffee:cp>=1?1:0}));
  if(bo>0){const [o,s]=ap(t,1.0,2.7);h+=G(cx+4,FY-260+Math.sin(t*3)*4,s*1.15,o,bolt(1.2));
    if(t>1.6){const q=seg(t,1.6,1.85);h+=G(0,0,1,o,P(`M${cx-50} ${FY-300} L${cx+56} ${FY-218}`,q,7));if(t>1.9){const [o2,s2]=ap(t,1.9,2.7);h+=G(cx+80,FY-320,s2,o2,I.x(1))}}}
  // person + cansaço hidden under a sheet
  const px=190;const [po]=ap(t,0.2);
  h+=person(px,FY,t,{op:po,dim:t>3.2&&t<5?.15:0});
  if(t>3.0){const [o,s]=ap(t,3.0);h+=zzz(px+40,FY-250,t,o*(1-ease(seg(t,3.9,4.4))*.85),1.1);
    const sh=ease(seg(t,3.9,4.5));if(sh>0){const yb=lerp(FY-330,FY-4,sh);h+=G(0,0,1,1,`<path d="M${px-80} ${FY-330} L${px+100} ${FY-330} L${px+100} ${yb} Q${px+55} ${yb-10+Math.sin(t*4)*5} ${px+10} ${yb} Q${px-35} ${yb+6} ${px-80} ${yb} Z" fill="#050505" ${LS} stroke-width="4"/>`);
      if(sh>.8)h+=G(px+10,FY-190,1,seg(t,4.4,4.7),T(0,0,'CANSAÇO',16,{w:800,ls:4,filt:''})+T(0,26,'ESCONDIDO',16,{w:800,ls:4,filt:'',col:'#A8A8A8'}))}}
  // receipt prints from the cup
  if(t>5.0){const p=seg(t,5.0,5.7);h+=G(cx,FY-150,1,1,`<g>${receipt(p,t)}</g>`)}
  return h}
function desk(X,p=1){return P(`M${X-200} 640 L${X+120} 640`,p,5)+P(`M${X-180} 640 L${X-180} ${FY} M${X+100} 640 L${X+100} ${FY}`,p,4)}
function sB(t){let h=floor(1500);const X=1500;
  h+=G(0,0,1,1,desk(X,seg(t,6.4,7.0)));
  // desk pulse on "mesma mesa"
  if(t>10&&t<11.1){const q=seg(t,10,11);h+=G(0,0,1,1-q,`<rect x="${X-215}" y="${626}" width="${350}" height="28" rx="14" fill="none" stroke="${W}" stroke-width="2.5" stroke-dasharray="8 8"/>`)}
  const [po]=ap(t,6.5);h+=person(X+260,FY,t,{op:po,ring:t>6.6&&t<8.2?ease(seg(t,6.6,7))*(1-seg(t,7.8,8.2)):0,dim:t>11.9?.3*ease(seg(t,11.9,12.3)):0});
  // sun rising — mesma rotina
  if(t>8.8){const r=ease(seg(t,8.8,9.8));h+=G(X-380,lerp(600,430,r),.8,r*(1-seg(t,12.3,12.6)),sun(t,1))}
  // mug on desk, vanishes
  const cx=X-60;
  if(t<11.5){h+=G(cx,632,1,1,mug(t,seg(t,6.6,7.2),{steam:ease(seg(t,7,7.6)),coffee:1}))}
  else{const q=seg(t,11.44,11.8);if(q<1)h+=G(cx,632-q*20,1-q,1-q,mug(t,1,{steam:1,coffee:1}));
    h+=`<circle cx="${cx}" cy="580" r="${40+q*110}" ${LS} stroke-width="3" opacity="${(1-q)*.8}" filter="url(#tg)"/>`;
    const o2=seg(t,11.7,12.0);h+=g(cx,632,1,o2*.5,`<g stroke-dasharray="7 9">${mug(t,1,{})}</g>`);
    if(t>11.88){const [o,s]=ap(t,11.88);h+=G(cx+80,500,s,o,I.x(1))}}
  return h}
// socket rows: returns x positions
function rowX(c,n,sp){const a=[];for(let i=0;i<n;i++)a.push(c+(i-(n-1)/2)*sp);return a}
function sC(t){const X=3000,MY=700;let h='';
  // day sun arc
  if(t>14.1&&t<15.6){const q=seg(t,14.1,15.5);const a=Math.PI*(1-q);h+=G(X+Math.cos(a)*320,560-Math.sin(a)*200,.55,Math.sin(q*Math.PI),sun(t,1))}
  const BX=X-300,BY=520;
  h+=G(BX,BY+Math.sin(t*1.8)*4,1,1,brain(seg(t,15.1,15.8))+(t>15.8?T(0,100,'CÉREBRO',15,{w:800,ls:4,filt:''}):''));
  // sockets
  const xs=rowX(X+20,4,92);
  h+=G(0,0,1,1,membrane(X-180,X+220,MY,seg(t,18.0,18.6)));
  const unlock=0;
  xs.forEach((x,i)=>{const lock=t>26.64?seg(t,26.64+i*.08,26.9+i*.08):0;const gl=t>21.32&&t<22.2?Math.sin(seg(t,21.32,22.2)*Math.PI):0;h+=G(0,0,1,1,socket(x,MY,seg(t,18.2+i*.08,18.6+i*.08),lock,gl))});
  // big adenosine intro
  if(t>15.9&&t<18.5){const [o,s]=ap(t,15.9,18.1);const from=[BX+60,BY];const pos=fly(from,[X,470],t,15.9,16.5,-60);h+=G(pos[0],pos[1],s*2.4,o,`<g transform="rotate(${t*30})">${adeno()}</g>`);
    if(t>17.0){const [o2,s2]=ap(t,17.0,18.1);h+=G(X,580,s2,o2,T(0,0,'ADENOSINA',18,{w:900,ls:5,filt:''}))}}
  // adenosines filling sockets 18.9..20.9 ; pop out at 25.44
  const fillT=[18.8,19.6,20.2,20.9];
  xs.forEach((x,i)=>{const a=fillT[i];if(t<a)return;const out=seg(t,25.3,25.9);if(out>=1)return;
    const pos=fly([BX+70,BY-20],[x,MY-34],t,a,a+.55,-120);const dx=out*(i%2?60:-60),dy=-out*160;
    h+=G(pos[0]+dx,pos[1]+dy,1,1-out,adeno())});
  // person sleepy
  const PX=X+270;const sleepy=ease(seg(t,21.96,22.4))*(1-ease(seg(t,26.7,27.2)));
  h+=person(PX,FY,t,{op:ap(t,13)[0],dim:sleepy*.7,rot:-8*sleepy,headDY:10*sleepy,ring:t>27.2&&t<31.6?.8*ease(seg(t,27.2,27.6))*(1-seg(t,31.2,31.6)):0});
  if(sleepy>0.05)h+=zzz(PX-20,FY-250,t,sleepy);
  // compare caffeine vs adenosine
  if(t>22.96&&t<25.6){const [o,s]=ap(t,22.96,25.2);h+=G(X-90,460,s*2,o,adeno())+G(X+90,460,s*2,o,caff());
    if(t>23.84)h+=G(X,470,1,ap(t,23.84,25.2)[0],T(0,0,'≈',54,{w:900,ls:0,filt:''}));
    h+=G(X-90,540,1,o,T(0,0,'ADENOSINA',14,{w:800,ls:3,filt:'',col:'#A8A8A8'}))+G(X+100,540,1,o,T(0,0,'CAFEÍNA',14,{w:800,ls:3,filt:''}))}
  // caffeine flies into sockets
  xs.forEach((x,i)=>{const a=25.76+i*.18;if(t<a)return;const pos=fly([X+90,380],[x,MY-34],t,a,a+.5,-70);h+=G(pos[0],pos[1],1,1,caff())});
  // adenosines bounce off then queue
  if(t>27.9){for(let i=0;i<4;i++){const a=27.9+i*.22;if(t<a)continue;const tx=xs[i];
      let x,y;if(t<a+.55){const p=eio(seg(t,a,a+.55));x=lerp(BX+70,tx,p);y=lerp(BY-20,MY-86,p)-90*Math.sin(Math.PI*p)}
      else{const q=eio(seg(t,a+.55,Math.max(a+1.2,29.9+i*.12)));const qx=X-230+0, qy=420+i*0;const bx=tx+(i-1.5)*10;x=lerp(tx,X-260+i*0,q*0)+0;
        // bounce up then move into queue spot left-top
        const b=seg(t,a+.55,a+.9);x=tx;y=MY-86-80*Math.sin(Math.PI*b);
        const qq=eio(seg(t,29.6+i*.1,30.3+i*.1));x=lerp(x,X-150+i*58,qq);y=lerp(y,445,qq)}
      h+=G(x,y+Math.sin(t*5+i)*3,1,1,adeno())}
    if(t>29.9){const [o,s]=ap(t,29.9);h+=G(X-63,445,s,o,`<rect x="-120" y="-36" width="240" height="72" rx="14" fill="none" stroke="${W}" stroke-width="3" stroke-dasharray="9 8"/>`+T(0,64,'NA FILA',15,{w:800,ls:4,filt:''}))}}
  return h}
function sD(t){const X=4500,MY=720;let h='';
  const BX=X-300,BY=470;
  h+=G(BX,BY,1,ap(t,31.6)[0],brain(1));
  if(t>32.3){const [o,s]=ap(t,32.3,33.6);h+=G(BX,BY-100,s*(1+.08*Math.sin(t*10)),o,T(0,16,'!',54,{w:900,ls:0,filt:''}))}
  // seven cups = todo dia
  if(t>33.4&&t<37.6){for(let i=0;i<7;i++){const a=33.5+i*.16;if(t<a)continue;const [o,s]=ap(t,a,37.1);h+=G(X-156+i*72,500,s*.42,o,mug(t,1,{steam:.8,coffee:1}))}
    h+=G(X+60,560,1,ap(t,34.3,37.1)[0],T(0,0,'7 DIAS',16,{w:800,ls:5,filt:''}))}
  // sockets: 4 base locked, 4 new grow
  const base=rowX(X,4,128), all=rowX(X,8,64);
  const grow=eio(seg(t,35.44,36.2));
  h+=G(0,0,1,1,membrane(X-300,X+300,MY,1));
  for(let i=0;i<8;i++){const isNew=i%2==1;const bi=Math.floor(i/2);const x0=isNew?all[i]:base[bi];const x=lerp(base[bi],all[i],grow);
    if(!isNew){h+=G(0,0,1,1,socket(x,MY,1,1))+G(x,MY-34,1,1,caff())}
    else if(grow>0){h+=G(0,0,1,1,socket(x,MY,seg(t,35.5+bi*.12,35.9+bi*.12),0,0));
      const a=38.2+bi*.14;if(t>a){const pos=fly([BX+60,BY],[x,MY-34],t,a,a+.45,-90);h+=G(pos[0],pos[1],1,1,adeno())}}}
  // one cup only
  if(t>37.6){const [o,s]=ap(t,37.6);h+=G(X,540,s*.8,o,mug(t,1,{steam:1,coffee:1}));
    if(t>38.8){const [o2,s2]=ap(t,38.8);h+=G(X+130,470,s2,o2,I.x(.9))}}
  return h}
function sE(t){const X=6000;let h=floor(X);
  const push=ease(seg(t,40.3,40.8));
  h+=person(X-180+push*40,FY,t,{rot:push*(1-seg(t,40.9,41.2))*6});
  // small stool with cup sliding off
  h+=G(0,0,1,1,P(`M${X-60} 680 L${X+80} 680 M${X-40} 680 L${X-40} ${FY} M${X+60} 680 L${X+60} ${FY}`,1,4));
  const slide=ease(seg(t,40.4,41.0));const fall=seg(t,41.0,41.5);
  if(fall<1)h+=G(X+10+slide*90+fall*30,672+fall*fall*110,1,1-fall,`<g transform="rotate(${fall*60})">${mug(t,1,{steam:1-slide,coffee:1})}</g>`);
  if(t>40.9){const [o,s]=ap(t,40.9,42.4);h+=G(X+120,520,s,o,I.x(1))}
  // hourglass 12h
  if(t>41.2){const [o,s]=ap(t,41.2);const fl=seg(t,41.2,41.6);h+=G(X+260,520,s*.95,o,hourglass(t,1,fl,ease(seg(t,41.6,42.6))));
    const n=Math.round(12*ease(seg(t,41.5,42.4)));h+=G(X+260,660,s,o,I.pill(n+' H',{fill:n>=12,size:22}))}
  return h}
function sE2(t){const X=7500,MY=700;let h='';
  const xs=rowX(X+60,8,64);
  h+=G(0,0,1,1,membrane(X-260,X+380,MY,1));
  const unl=seg(t,43.1,43.4);
  xs.forEach((x,i)=>{h+=G(0,0,1,1,socket(x,MY,1,1-unl,t>47.5&&t<48.2?1-seg(t,47.5,48.2):0));
    // caffeine pops out
    const a=44.0+i*.05;const q=seg(t,a,a+.7);if(q<1)h+=G(x+(i-3.5)*18*q,MY-34-q*260,1,1-q,`<g transform="rotate(${q*180})">${caff()}</g>`);
    // adenosine rush from queue
    const b=45.6+i*.12;if(t>b){const pos=fly([X-430+ (i%4)*50,450+Math.floor(i/4)*50],[x,MY-34],t,b,b+.6,-60);h+=G(pos[0],pos[1],1,1,adeno())}});
  // queue box with 8 waiting
  if(t<46.8){const o=ap(t,42.5,46.3)[0];h+=G(X-355,475,1,o,`<rect x="-120" y="-60" width="240" height="120" rx="14" fill="none" stroke="${W}" stroke-width="3" stroke-dasharray="9 8"/>`+T(0,92,'FILA',15,{w:800,ls:4,filt:''}));
    for(let i=0;i<8;i++){const b=45.6+i*.12;if(t>b)continue;const jig=t>44.8?Math.sin(t*20+i)*3:0;h+=G(X-430+(i%4)*50+jig,450+Math.floor(i/4)*50,1,o,adeno())}}
  if(t>47.52){const q=seg(t,47.52,48.1);h+=`<circle cx="${X+60}" cy="${MY-40}" r="${80+q*300}" ${LS} stroke-width="4" opacity="${1-q}" filter="url(#tg)"/>`;
    const [o,s]=ap(t,47.6);h+=G(X+60,520,s,o,I.dpill('TUDO JUNTO',24))}
  return h}
function sE3(t){const X=9000;let h=floor(X);
  const sq=ease(seg(t,49.85,50.1))*(1-ease(seg(t,51.7,52.2)));
  const shakeH=t>48.56&&t<49.7?Math.sin(t*40)*4:0;
  const px=X+shakeH;
  h+=`<g transform="translate(${px} ${FY}) scale(${1+.08*sq} ${1-.16*sq}) translate(${-px} ${-FY})">${person(px,FY,t,{dim:.35+.3*sq,headDY:8*sq})}</g>`;
  const headY=FY-160*(1-.16*sq);
  if(t>48.56&&t<51.9){const o=ease(seg(t,48.56,48.8))*(1-seg(t,51.5,51.9));h+=painLines(px,headY,t,o)}
  // heavy weight drops on head
  if(t>49.6&&t<51.9){const q=seg(t,49.6,49.85);const o=1-seg(t,51.5,51.9);h+=G(X,lerp(300,headY-36,q*q),1,o,weight(1)+T(0,-22,'SONO',16,{w:900,ls:3,filt:''}))}
  // irritation scribble cloud
  if(t>50.7&&t<51.9){const o=1-seg(t,51.5,51.9);h+=G(X+150,FY-290,1,o,`<g transform="rotate(${Math.sin(t*12)*6})">${scribble(t,seg(t,50.7,51.2))}</g>`)}
  // worst days ruler
  if(t>51.9){const p=seg(t,51.9,52.7);h+=G(0,0,1,1,dayRuler(X-300,X+300,450,p));
    if(t>53.0){const [o,s]=ap(t,53.0);const x0=X-300,x1=X-300+75;const tr=Math.sin(t*30)*2;h+=G(0,0,1,o,`<rect x="${x0-20}" y="${415+tr}" width="${x1-x0+40}" height="70" rx="12" fill="none" stroke="${W}" stroke-width="3" stroke-dasharray="8 7"/>`)+G((x0+x1)/2,368+tr,s,o,I.dpill('PIOR',22))}}
  return h}
function sF(t){const X=10500,MY=720;let h='';
  const all=rowX(X-120,8,64),base=rowX(X-120,4,96);
  h+=G(0,0,1,1,membrane(X-420,X+180,MY,1));
  const tight=eio(seg(t,57.4,58.0));
  for(let i=0;i<8;i++){const extra=i%2==1;const bi=Math.floor(i/2);
    if(extra){const a=56.1+bi*.35;const q=seg(t,a,a+.3);if(q>=1)continue;h+=G(all[i],MY,1-q,1-q,socket(0,0,1,0)+`<g transform="translate(0 -34)">${adeno()}</g>`);
      if(q>0)h+=`<circle cx="${all[i]}" cy="${MY-30}" r="${20+q*50}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}
    else{const x=lerp(all[i],base[bi],tight);h+=G(0,0,1,1,socket(x,MY,1,0))+G(x,MY-34,1,1,adeno())}}
  // ruler + marker to day 9
  if(t>58.0){const p=seg(t,58.0,58.6);h+=G(0,0,1,1,dayRuler(X-420,X+180,450,p));
    const m=eio(seg(t,58.6,59.9));const mx=lerp(X-420,X+180,m);const day=1+Math.round(8*m);
    h+=G(mx,400,1,ap(t,58.6)[0],I.pill('DIA '+day,{fill:day>=9,size:20}))}
  const PX=X+190;const ok=ease(seg(t,60.08,60.5));
  h+=person(PX,FY,t,{s:.85,op:ap(t,54.6)[0],dim:.4*(1-ok),ring:ok});
  if(t>60.3){const [o,s]=ap(t,60.3);h+=G(PX+60,FY-235,s,o,I.check(.9))}
  return h}
function sG(t){const X=12000;let h='';const o=ap(t,61.33,63.6)[0];
  const lines=[[61.33,'AGORA'],[61.8,'A PARTE QUE'],[62.48,'QUASE NINGUÉM CONTA']];
  lines.forEach(([a,s],i)=>{if(t<a)return;h+=G(X,470+i*72,1,o,T(0,0,typed(s,a,t,30),i==2?46:38,{w:900,ls:4,filt:''}))});
  return h}
function sH(t){const X=13500;let h=floor(X);
  const lvl=1-.5*eio(seg(t,65.84,67.2));
  h+=G(X-60,FY,1,ap(t,63.7)[0],beaker(t,seg(t,63.8,64.4),lvl)+(t>64.2?T(0,40,'CAFEÍNA',15,{w:800,ls:4,filt:''}):''));
  // 5h counter
  if(t>64.9){const [o,s]=ap(t,64.9);const n=Math.round(5*ease(seg(t,65.3,67.2)));h+=G(X+200,540,s,o,`<circle r="58" fill="none" stroke="${W}" stroke-width="4"/>`+`<path d="M0 0 L${(Math.sin(n/5*Math.PI*2+ (t-65.3)*0)*38).toFixed(1)} ${(-Math.cos(n/5*Math.PI*2)*38).toFixed(1)}" ${LS} stroke-width="4"/>`+`<path d="M0 0 L0 -26" ${LS} stroke-width="5" transform="rotate(${(ease(seg(t,65.3,67.2))*150).toFixed(1)})"/>`+T(0,100,n+' HORAS',18,{w:900,ls:4,filt:''}))}
  if(t>66.8){const [o,s]=ap(t,66.8);const y=FY-8-232*.5;h+=G(0,0,1,o,`<path d="M${X-130} ${y} L${X+20} ${y}" ${LS} stroke-width="2.5" stroke-dasharray="6 6"/>`)+G(X-220,y,s,o,I.pill('METADE',{size:16,pad:18}))}
  return h}
function sH2(t){const X=15000;let h=floor(X);
  // sun goes down, moon rises
  const set=eio(seg(t,70.1,70.9));
  if(set<1)h+=G(X-260,lerp(450,880,set),.9,ap(t,68.3)[0]*(1-set),sun(t,1));
  if(t>68.4&&t<70.4){const [o,s]=ap(t,68.4,70.1);h+=G(X-260,580,s,o,I.pill('16:00',{size:20}))}
  if(t>70.3){const r=eio(seg(t,70.3,71.0));h+=G(X+260,lerp(720,450,r),.95,r,moon(t,1));if(t>70.6){const [o,s]=ap(t,70.6);h+=G(X+260,580,s,o,I.pill('21:00',{size:20,fill:true}))}}
  // person: solid then outline w/ half liquid inside
  const inside=seg(t,72.3,72.7);
  if(inside<1)h+=person(X,FY,t,{op:1-inside});
  if(inside>0)h+=g(X,FY,1,inside,personLiquid(t,.5*ease(seg(t,72.4,73.0))+.5*0,1));
  // small mug near person
  h+=G(X+130,FY,.55,ap(t,68.5)[0]*(1-seg(t,72.2,72.5)),mug(t,1,{steam:1,coffee:1}));
  return h}
function sH3(t){const X=16500;let h=floor(X);
  const PX=X-300;const tired=ease(seg(t,76.88,77.3));
  h+=person(PX,FY,t,{s:.9,dim:.5*tired,headDY:8*tired});
  if(t>73.4&&t<75.9){const [o,s]=ap(t,73.4,75.5);h+=G(PX+40,FY-300,s,o,`<path d="M-90 -36 Q-90 -60 -66 -60 L66 -60 Q90 -60 90 -36 L90 10 Q90 34 66 34 L-20 34 L-50 62 L-44 34 L-66 34 Q-90 34 -90 10 Z" fill="#050505" ${LS} stroke-width="4"/>`+`<g transform="translate(0 20) scale(.38)">${mug(t,1,{steam:1,coffee:1})}</g>`+T(0,-4,'',1))}
  // loop cup -> noite ruim -> cansaço -> cup
  const CX=X+120,CY=560,R=170;
  const n1=[CX,CY-R],n2=[CX+R*.87,CY+R*.5],n3=[CX-R*.87,CY+R*.5];
  if(t>75.76){const [o,s]=ap(t,75.76);h+=G(n1[0],n1[1]+40,s*.6,o,mug(t,1,{steam:1,coffee:1}))}
  if(t>76.88){const [o,s]=ap(t,76.88);h+=G(n2[0]+20,n2[1],s*.7,o,moon(t,1))+G(n2[0]+60,n2[1]-50,s*.6,o,I.x(1))}
  if(t>77.4){const [o,s]=ap(t,77.4);h+=G(n3[0]-20,n3[1]+10,1,o,T(0,0,'Z',40,{w:900,ls:0,filt:''})+T(28,-26,'Z',28,{w:900,ls:0,filt:''})+T(0,50,'CANSAÇO',14,{w:800,ls:3,filt:''}))}
  const spin=t>78.2?(t-78.2)*.8:0;
  h+=G(0,0,1,1,`<g transform="rotate(${(spin*57.3).toFixed(1)} ${CX} ${CY})">`+arcArrow(CX,CY,R,-Math.PI/2+.42,Math.PI/6-.42,seg(t,76.4,76.9))+arcArrow(CX,CY,R,Math.PI/6+.42,Math.PI*5/6-.42,seg(t,77.2,77.6))+arcArrow(CX,CY,R,Math.PI*5/6+.42,Math.PI*1.5-.42,seg(t,77.9,78.3))+'</g>');
  return h}
function sI(t){const X=18000;let h='';
  for(let i=0;i<9;i++){const a=79.1+i*.1;if(t<a)continue;const [o,s]=ap(t,a);const x=X-320+i*80;h+=G(x,500,s*.48,o,mug(t,1,{steam:.7,coffee:1}));
    const b=79.9+i*.13;if(t>b){const [o2,s2]=ap(t,b);h+=G(x,420,s2*.6,o2,I.x(1))}}
  if(t>81.36){const pl=.05*Math.sin((t-81.36)*7);const [o,s]=ap(t,81.36);h+=G(X-150,620,s*(1+pl),o,I.pill('AGUENTO',{size:20}));const [o2,s2]=ap(t,81.6);h+=G(X+150,620,s2*(1-pl),o2,I.pill('NÃO AGUENTO',{size:20}))}
  if(t>82.36){const cl=t>82.9;const [o,s]=ap(t,82.36);const pul=cl?1+.06*Math.sin((t-82.9)*8)*Math.exp(-(t-82.9)*2):1;
    h+=G(X,740,s*pul,o,`<rect x="-150" y="-34" width="300" height="68" rx="20" fill="${cl?W:'#050505'}" stroke="${W}" stroke-width="4"/>`+`<circle cx="-104" cy="-6" r="10" fill="${cl?'#050505':W}"/><path d="M-120 22 Q-104 4 -88 22" fill="${cl?'#050505':W}"/>`+T(20,9,cl?'SEGUINDO':'SEGUIR',24,{w:900,ls:4,filt:'',col:cl?'#050505':W}));
    if(cl){const q=seg(t,82.9,83.6);h+=`<rect x="${X-150-q*60}" y="${706-q*60}" width="${300+q*120}" height="${68+q*120}" rx="30" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
const SCENES=[[sA,0,7.2],[sB,5.8,13.6],[sC,11.9,32.6],[sD,30.9,40.4],[sE,38.8,43.4],[sE2,41.8,49.3],[sE3,47.7,55.5],[sF,53.9,62.0],[sG,60.5,64.5],[sH,63.0,69.1],[sH2,67.5,74.1],[sH3,72.5,79.8],[sI,78.1,99]];
const TOTAL=84.3;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const whisper=ease(seg(t,61.1,61.5))*(1-ease(seg(t,63.5,63.9)));
  const tense=ease(seg(t,47.4,47.6))*(1-ease(seg(t,48.4,49)))*.6;
  document.getElementById('s').innerHTML=`
  <defs>
   <filter id="fP" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="fD" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="tg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="big" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="30"/></filter>
   <radialGradient id="spot" cx=".5" cy=".48" r=".55"><stop offset="0" stop-color="#2a2a2a"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#050505"/></radialGradient>
   <radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
   <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="#fff" opacity=".035"/></pattern>
  </defs>
  <rect width="1080" height="1080" fill="url(#spot)"/>
  <rect width="1080" height="1080" fill="url(#dots)"/>
  <g transform="translate(${(540+sx).toFixed(2)} ${(540+sy).toFixed(2)}) scale(${z.toFixed(4)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})">${world}</g>
  ${dust}
  <rect width="1080" height="1080" fill="url(#vig)" opacity="${(.6*whisper+tense).toFixed(3)}"/>
  ${titleLayer(t)}
  <rect width="1080" height="1080" fill="#000" opacity="${(1-fade).toFixed(3)}"/>`;
}
window.render=render;window.TOTAL=TOTAL;
window.SFX=[
 [0.15,'pop',.8],[0.5,'bubble',.5],[1.05,'neon',.8],[1.6,'marker',.8],[1.9,'error',.9],[3.0,'pop',.6],[3.9,'whoosh',.5],[4.1,'paper',.8],[5.04,'register',.9],
 [6.3,'whoosh',.7],[6.6,'pop',.7],[7.0,'pop',.6],[8.9,'birds',.6],[10.0,'tap',.8],[11.44,'poof',1],[11.9,'error',.8],
 [12.6,'whoosh',.7],[14.15,'sparkle',.5],[15.2,'marker',.6],[15.9,'pop',.8],[17.0,'ding',.6],[18.2,'pop',.5],[18.8,'tap',.8],[19.6,'tap',.8],[20.2,'tap',.8],[20.9,'tap',.8],[21.4,'smallwin',.5],[21.96,'sad',.7],
 [23.0,'pop',.8],[23.84,'scan',.6],[25.3,'swirl',.6],[25.76,'tap',.7],[25.94,'tap',.7],[26.12,'tap',.7],[26.3,'tap',.7],[26.64,'lock',.9],[27.9,'pop',.5],[28.5,'hit',.6],[29.6,'steps',.6],[30.0,'stampsoft',.6],
 [31.6,'whoosh',.7],[32.3,'beep',.8],[33.5,'pop',.5],[33.66,'pop',.5],[33.82,'pop',.5],[33.98,'pop',.5],[34.14,'pop',.5],[34.3,'pop',.5],[34.46,'pop',.5],[35.44,'grow',.9],[37.6,'pop',.8],[38.2,'tap',.7],[38.5,'tap',.7],[38.8,'buzz',.9],
 [39.5,'whoosh',.7],[40.35,'chairmove',.6],[41.0,'fall',.6],[41.3,'thud',.5],[41.25,'flip',.7],[41.6,'clockfast',.6],
 [42.5,'whoosh',.6],[43.1,'lock',.8],[44.0,'poof',.8],[44.9,'heartbeat',.7],[45.6,'riser2',.7],[47.52,'thudbig',1],[47.6,'buzz',.7],
 [48.4,'whoosh',.6],[48.56,'glitch',.7],[49.62,'fallwhistle',.5],[49.85,'thud',1],[50.72,'chalk',.9],[51.9,'whoosh',.4],[52.1,'pop',.6],[53.0,'alarm',.5],
 [54.6,'whoosh',.7],[56.1,'poof',.6],[56.45,'poof',.6],[56.8,'poof',.6],[57.15,'poof',.6],[57.5,'swirl',.5],[58.1,'pop',.6],[58.6,'clockfast',.6],[60.08,'smallwin',.9],[60.3,'ding',.8],
 [61.15,'whoosh',.5],[61.3,'heartbeat',.8],[62.5,'riser',.6],
 [63.7,'whoosh',.7],[63.9,'bubble',.7],[65.3,'clock',.7],[66.8,'ding',.7],
 [68.2,'whoosh',.7],[68.4,'pop',.7],[70.1,'swirl',.6],[70.6,'pop',.7],[72.4,'bubble',.9],
 [73.2,'whoosh',.7],[73.4,'pop',.7],[75.76,'pop',.8],[76.4,'swirl',.5],[76.9,'pop',.8],[77.2,'swirl',.5],[77.4,'pop',.7],[77.9,'swirl',.6],[78.2,'riser2',.5],
 [78.85,'whoosh',.7],[79.9,'click',.6],[80.03,'click',.6],[80.16,'click',.6],[80.29,'click',.6],[80.42,'click',.6],[80.55,'click',.6],[80.68,'click',.6],[80.81,'click',.6],[80.94,'click',.6],[81.36,'pop',.8],[81.6,'pop',.8],[82.36,'pop',.9],[82.9,'click',1.2],[82.95,'smallwin',.8],
];
