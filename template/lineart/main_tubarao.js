// ---------- camera [t,x,y,zoom,dur] ----------
const CAM=[
 [0,   -60,560,1.0,0],
 [0.3,  40,560,1.12,6.0],
 [6.45,1500,540,1.0,.75],
 [8.9, 1590,520,1.4,.5],
 [9.95,1500,540,1.0,.5],
 [13.75,3000,540,1.0,.75],
 [23.7,2900,550,1.12,.5],
 [26.6,3000,540,1.0,.6],
 [29.1,4500,540,1.0,.75],
 [34.1,4480,600,1.12,.5],
 [35.8,4500,540,1.0,.6],
 [38.5,6000,540,1.0,.75],
 [45.35,7500,540,1.0,.75],
 [51.4,9000,560,1.0,.75],
 [55.4,9050,520,1.1,.4],
 [57.45,10500,540,1.0,.6],
 [60.4,12000,540,1.0,.7],
 [64.3,13500,540,1.0,.8],
 [69.9,13560,540,1.15,1.2],
 [73.35,15000,540,1.0,.75],
];
const PUNCH=[[0.56,.04],[4.72,.03],[7.8,.06],[22.96,.05],[23.76,.04],[34.44,.04],[38.64,.04],[44.08,.04],[55.48,.06],[58.88,.05],[60.56,.04],[63.04,.05],[72.0,.04],[76.6,.04]];
const SHAKE=[[22.4,.6,5],[34.44,.5,5],[55.5,.6,8],[63.04,.3,4]];
function cam(t){let cur=[CAM[0][1],CAM[0][2],CAM[0][3]];
  for(let i=1;i<CAM.length;i++){const k=CAM[i];if(t<k[0])break;const p=eio(seg(t,k[0],k[0]+k[4]));cur=[lerp(cur[0],k[1],p),lerp(cur[1],k[2],p),lerp(cur[2],k[3],p)]}
  cur[0]+=Math.sin(t*.35)*8;cur[1]+=Math.sin(t*.27+1)*5;cur[2]*=1+0.012*Math.sin(t*.22);
  for(const [pt,amt] of PUNCH){const q=t-pt;if(q>=0&&q<.5)cur[2]*=1+amt*Math.sin(Math.PI*q/.5)*(1-q/.5)}
  return cur}
// ---------- titles ----------
const TITLES=[
 [0.22,'EXISTE UM TUBARÃO'],[1.52,'A MAIS DE 3.000 KM','DO MAR',3.84],[4.72,'NO MEIO DA AMAZÔNIA'],
 [6.55,'E SE VOCÊ ACORDASSE','NO CORPO DELE?',7.6],[8.88,'MESMOS DENTES'],[10.0,'MESMO TAMANHO'],[11.2,'SÓ QUE O OCEANO','FICOU PRA TRÁS',12.48],
 [13.92,'VOCÊ É UM','TUBARÃO-CABEÇA-CHATA',14.56],[16.32,'A PRIMEIRA COISA ESTRANHA'],[17.76,'SEU SANGUE É SALGADO','COMO O MAR',19.12],
 [20.08,'QUALQUER OUTRO TUBARÃO','IA INCHAR ATÉ MORRER',22.16],[23.76,'VOCÊ NÃO'],[24.8,'UMA GLÂNDULA','JOGA O SAL FORA',25.6],[26.77,'E O SANGUE FICA','NA MEDIDA CERTA',27.72],
 [29.26,'A SEGUNDA'],[30.2,'A ÁGUA DOCE','NÃO TE SEGURA',31.04],[32.28,'FÍGADO COM MENOS GORDURA'],[34.12,'VOCÊ AFUNDA MAIS FÁCIL'],[35.76,'ENTÃO VIVE NO RASO','ATÉ UNS 30 METROS',36.96],
 [38.64,'A TERCEIRA É A MAIS LOUCA'],[40.6,'VOCÊ SOBE O RIO INTEIRO'],[42.2,'ATRAVESSA O BRASIL'],[43.49,'E CHEGA ATÉ IQUITOS','NO PERU',44.64],
 [45.52,'JÁ ACHARAM','FÊMEAS GRÁVIDAS LÁ',46.12],[47.56,'O RIO VIROU BERÇÁRIO'],[49.28,'LONGE DOS TUBARÕES','GRANDES DO MAR',50.32],
 [51.6,'E NÃO É LENDA'],[52.88,'EM 2016'],[54.29,'PESCADORES DE SANTARÉM','PUXARAM UM DO RIO TAPAJÓS',55.48],
 [57.5,''],
 [60.56,'NEM A ORCA'],[61.4,'A MAIOR PREDADORA','DO OCEANO',62.4],[63.04,'CONSEGUE FAZER ISSO'],[64.4,'EM 2022'],[65.76,'UMA ENTROU NUM RIO','NA FRANÇA',66.64],
 [67.64,'DEPOIS DE 2 MESES','NA ÁGUA DOCE',68.96],[69.96,'A PELE DELA','COMEÇOU A CAIR',70.72],[72.0,'ELA NÃO VOLTOU'],
 [73.64,'VOCÊ ENTRARIA','NESSE RIO?',74.56],[75.84,'COMENTA AÍ'],[76.6,'E ME SEGUE'],
];
const SY=400; // water surface in underwater scenes
// ---------- scenes ----------
function sA(t){let h='';const X=0,WY=640;
  h+=wave(-760,760,WY,t,7);
  // far bank + trees
  const bk=seg(t,4.72,5.2);
  if(bk>0){h+=`<g filter="url(#tg)">${P(`M-20 ${WY-40} Q150 ${WY-58} 340 ${WY-44}`,bk,3)}</g>`;
    [[60,4.85],[170,5.1],[280,5.35]].forEach(([x,a],i)=>{const p=seg(t,a,a+.6);if(p>0)h+=g(x,WY-46-(i==1?8:0),(i==1?1.05:.85),1,`<g transform="rotate(${Math.sin(t*1.5+i)*2})">${tree(p)}</g>`,'filter="url(#tg)"')});}
  // shark: fin above water, shadow below
  const fx=lerp(-380,120,ease(seg(t,0,6.2)));const fy=WY+46+Math.sin(t*2)*4;
  h+=SH(fx,fy,.95,.32,t,{dim:1});
  h+=`<g filter="url(#tg)"><clipPath id="cA"><rect x="-2000" y="0" width="4000" height="${WY}"/></clipPath><g clip-path="url(#cA)"><g transform="translate(${fx.toFixed(1)} ${fy.toFixed(1)}) scale(.95)"><path d="M-14 -34 Q0 -70 26 -84 Q24 -56 40 -33" fill="#050505" ${LS} stroke-width="5"/></g></g></g>`;
  // wake
  for(let i=1;i<4;i++){const wx=fx-i*55;h+=`<path d="M${wx} ${WY-4} L${wx-30} ${WY-14-i*3} M${wx} ${WY+4} L${wx-30} ${WY+12+i*2}" ${LS} stroke-width="3" opacity="${.5/i}" filter="url(#tg)"/>`}
  // km counter
  if(t>1.6){const [o,s]=ap(t,1.6,4.5);const n=Math.round(3000*ease(seg(t,2.4,3.8)));const txt=(n>=1000?Math.floor(n/1000)+'.'+String(n%1000).padStart(3,'0'):String(n))+' KM';
    h+=g(fx+20,430,s*1.1,o,I.pill(txt,{fill:n>=3000,size:26}),'filter="url(#tg)"');}
  return h}
function sB(t){let h='';const X=1500;
  const rise=ease(seg(t,7.7,8.5)); // water rises
  h+=bed(750,2250,FY);
  const wy=lerp(FY-4,SY,rise);if(rise>0)h+=wave(750,2250,wy,t,6,1,3,rise);
  // person -> shark
  const tr=seg(t,7.76,8.3);
  if(tr<1){const [o]=ap(t,6.5);h+=person(1500,FY,t,{op:o*(1-tr),ring:ease(seg(t,6.72,7.2)),s:1-.4*tr})}
  if(t>7.76&&t<8.6){const q=seg(t,7.76,8.6);h+=`<circle cx="1500" cy="620" r="${60+q*220}" ${LS} stroke-width="4" opacity="${1-q}" filter="url(#tg)"/>`}
  if(t>7.9){const s=back(seg(t,7.9,8.4));const sx=lerp(1500,1700,ease(seg(t,11.4,13.4)));
    h+=SH(sx,600+Math.sin(t*2)*6,1.05*s,1,t,{mouth:t>8.88&&t<9.95?ease(seg(t,8.88,9.1))*(1-seg(t,9.7,9.95)):0});
    h+=bubbles(sx+150,560,t,4,90,ease(seg(t,8,8.6)));
    // teeth highlight
    if(t>8.95&&t<9.95){const q=seg(t,8.95,9.95);h+=`<circle cx="${sx+125}" cy="612" r="${36+8*Math.sin(t*8)}" ${LS} stroke-width="3" stroke-dasharray="6 7" opacity="${1-q*.6}" filter="url(#tg)"/>`}
    // ruler 10.0
    if(t>10.0){const [o]=ap(t,10.0,11.1);const p=seg(t,10.0,10.6);h+=g(0,0,1,o,P(`M${sx-185} 700 L${sx+150} 700`,p,4)+P(`M${sx-185} 686 L${sx-185} 714 M${sx+150} 686 L${sx+150} 714`,p,4)+(p>.9?T(sx-18,740,'= IGUAL',18,{w:800,ls:4,filt:''}):''),'filter="url(#tg)"')}
  }
  // ocean leaves behind (left)
  if(t>11.2){const q=ease(seg(t,11.7,13.6));const [o,s]=ap(t,11.2);h+=g(lerp(1200,1090,q),560,s*(1-.45*q),o*(1-q*.75),oceanWave(seg(t,11.2,11.8))+`<g transform="translate(0 100)">${T(0,0,'OCEANO',18,{w:800,ls:5,filt:''})}</g>`,'filter="url(#tg)"');
    if(t>12.88){const [o2,s2]=ap(t,12.88);h+=g(1080,450,s2,o2,I.x(1),'filter="url(#tg)"')}}
  return h}
function underwater(X,t,o=1){return bed(X-760,X+760,FY,o)+wave(X-760,X+760,SY,t,6,1,3,o)+
  [[-300,0],[260,1],[420,2]].map(([dx,i])=>`<path d="M${X+dx} ${FY} Q${X+dx-8+Math.sin(t*1.6+i)*6} ${FY-30} ${X+dx+Math.sin(t*1.6+i)*10} ${FY-58} M${X+dx+14} ${FY} Q${X+dx+18+Math.sin(t*1.4+i)*5} ${FY-22} ${X+dx+12+Math.sin(t*1.4+i)*8} ${FY-40}" ${LS} stroke-width="3" opacity="${.7*o}" filter="url(#tg)"/>`).join('')}
function sC(t){let h=underwater(3000,t);
  const glow=t>23.76?ease(seg(t,23.76,24.2)):0;
  const myX=2820, myY=600+Math.sin(t*2)*6;
  h+=SH(myX,myY,1,1,t,{});
  if(glow>0)h+=`<ellipse cx="${myX}" cy="${myY}" rx="190" ry="70" fill="#fff" opacity="${.10*glow+.03*Math.sin(t*5)*glow}" filter="url(#big)"/>`;
  // flat snout callout
  if(t>14.6&&t<16.3){const [o]=ap(t,14.7,16.0);h+=g(0,0,1,o,P(`M${myX+150} ${myY-70} Q${myX+170} ${myY-40} ${myX+150} ${myY-10}`,seg(t,14.7,15.1),3)+T(myX+150,myY-84,'FOCINHO CHATO',16,{w:800,ls:4,filt:''}),'filter="url(#tg)"')}
  // blood drop salty 17.76-20.0
  if(t>17.76&&t<20.4){const [o,s]=ap(t,17.76,20.0);h+=g(3150,560,s,o,drop(Math.round(16*ease(seg(t,18.6,19.4))),t,seg(t,17.76,18.3))+`<g transform="translate(0 100)">${T(0,0,'SAL',18,{w:800,ls:5,filt:''})}</g>`,'filter="url(#tg)"')}
  // other shark inflates
  if(t>20.08&&t<24.2){const [o,s]=ap(t,20.08,23.3,.38,.6);const puff=ease(seg(t,22.36,23.0));const sink=ease(seg(t,23.0,24.0));
    const wob=puff>0&&puff<1?Math.sin(t*30)*3:0;
    h+=SH(3200+wob,580+sink*120,.75*s,o*.75,t,{dim:1,puff,ph:2,still:t>23},-1,sink*25);
    if(t>22.96){const [o2,s2]=ap(t,22.96,23.3);h+=g(3200,420,s2,o2,I.x(1.1),'filter="url(#tg)"')}}
  if(t>23.76&&t<29.1){const [o,s]=ap(t,23.76,26.6);h+=g(myX,myY-110,s,o,I.check(1.1),'filter="url(#tg)"')}
  // gland + salt stream out
  if(t>24.8&&t<28.6){const go=ease(seg(t,24.8,25.2))*(1-seg(t,28.2,28.6));const pu=.5+.5*Math.sin(t*9);
    h+=`<circle cx="${myX-70}" cy="${myY+8}" r="${9+4*pu}" fill="${W}" opacity="${go}" filter="url(#tg)"/><circle cx="${myX-70}" cy="${myY+8}" r="${22+8*pu}" ${LS} stroke-width="2" opacity="${go*.6}" filter="url(#tg)"/>`;
    if(t>25.6){for(let i=0;i<9;i++){const q=((t-25.6)*.8+i/9)%1;const a=seg(t,25.6+i*.08,25.7+i*.08);if(a<=0)continue;
        const x=myX-80-q*320, y=myY+14+Math.sin(q*7+i)*20+q*40;h+=`<rect x="${x}" y="${y}" width="9" height="9" fill="${W}" opacity="${go*(1-q)}" transform="rotate(${t*90+i*40} ${x+4} ${y+4})" filter="url(#tg)"/>`}
      const [o3,s3]=ap(t,25.9,28.2);h+=g(myX-170,myY-95,s3,o3,I.pill('SAL PRA FORA',{size:18}),'filter="url(#tg)"')}}
  // drop again, balanced
  if(t>26.8){const [o,s]=ap(t,26.8);h+=g(3150,560,s,o,drop(Math.round(lerp(16,6,ease(seg(t,27.2,27.9)))),t)+`<g transform="translate(0 100)">${T(0,0,'NA MEDIDA',18,{w:800,ls:5,filt:''})}</g>`,'filter="url(#tg)"');
    if(t>28.3){const [o2,s2]=ap(t,28.3);h+=g(3210,480,s2,o2,I.check(.9),'filter="url(#tg)"')}}
  return h}
function sD(t){let h=underwater(4500,t);
  const sink1=ease(seg(t,30.3,32.0))*60, sink2=ease(seg(t,34.2,35.2))*90, up=ease(seg(t,35.8,37.0))*230;
  const y=560+sink1+sink2-up+Math.sin(t*2)*6, x=4380;
  h+=SH(x,y,.95,1,t,{fast:t>35.8&&t<37},1,(t>30.3&&t<35.6?8:0)*ease(seg(t,30.3,31))*(1-ease(seg(t,35.6,36))));
  if(t>30.4&&t<35.8){const [o,s]=ap(t,30.4,35.5);const bob=Math.sin(t*6)*6;h+=g(x+190,y-40+bob,s,o,`<path d="M0 -30 L0 26 M-16 10 L0 28 L16 10" ${LS} stroke-width="6"/>`,'filter="url(#tg)"')}
  if(t>34.2&&t<35.8)h+=bubbles(x+80,y-30,t,6,130,1);
  // liver
  if(t>32.28&&t<35.9){const [o,s]=ap(t,32.28,35.6);h+=g(4700,500,s*1.05,o,liver(seg(t,32.28,32.9),1-.75*ease(seg(t,33.2,34.0)))+`<g transform="translate(0 86)">${T(0,0,'FÍGADO',18,{w:800,ls:5,filt:''})}</g>`,'filter="url(#tg)"');
    if(t>33.44){const [o2,s2]=ap(t,33.44,35.6);h+=g(4790,420,s2,o2,I.pill('− GORDURA',{size:18}),'filter="url(#tg)"')}}
  // depth ruler
  if(t>35.9){const [o]=ap(t,35.9);const p=seg(t,35.9,36.6);let r=P(`M4760 ${SY+6} L4760 ${FY-6}`,p,4);
    for(let i=0;i<=3;i++){const yy=SY+20+i*95;r+=P(`M4744 ${yy} L4776 ${yy}`,seg(t,36.1+i*.12,36.4+i*.12),3)}
    h+=g(0,0,1,o,r,'filter="url(#tg)"');
    if(t>36.96){const q=seg(t,36.96,37.5);h+=`<path d="M${lerp(4760,4140,ease(q))} 705 L4760 705" ${LS} stroke-width="3" stroke-dasharray="10 10" filter="url(#tg)"/>`;
      const [o2,s2]=ap(t,37.4);h+=g(4660,750,s2,o2,I.pill('30 M',{fill:true,size:20}),'filter="url(#tg)"')}}
  return h}
// map
const MAPD='M5700 600 C5760 520 5820 660 5900 590 S 6040 500 6100 580 S 6220 640 6300 550';
let MP=null;function mapPt(q){if(!MP){MP=document.createElementNS('http://www.w3.org/2000/svg','path');MP.setAttribute('d',MAPD);document.getElementById('meas').appendChild(MP)}const L=MP.getTotalLength();const a=MP.getPointAtLength(L*q),b=MP.getPointAtLength(Math.min(L,L*q+2));return [a.x,a.y,Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI]}
function sE(t){let h='';
  const rp=seg(t,38.9,40.4);
  h+=`<g filter="url(#tg)">${P(MAPD,rp,26,'opacity=".18"')}${P(MAPD,rp,4)}</g>`;
  h+=g(5635,612,.5,ease(seg(t,38.7,39.2)),oceanWave(1)+`<g transform="translate(0 110) scale(1.6)">${T(0,0,'MAR',18,{w:800,ls:5,filt:''})}</g>`,'filter="url(#tg)"');
  const q=ease(seg(t,40.8,44.3));
  if(t>40.6){const [x,y,ang]=mapPt(Math.max(.001,q));h+=g(x,y,1,ease(seg(t,40.6,40.9)),`<g transform="rotate(${ang}) scale(.26)">${shark(t,{fast:1})}</g>`,'filter="url(#tg)"');
    // trail dots
    for(let i=1;i<=12;i++){const qq=q-i*.03;if(qq<0)break;const [tx,ty]=mapPt(qq);h+=`<circle cx="${tx}" cy="${ty}" r="3" fill="#fff" opacity="${.6-i*.04}" filter="url(#tg)"/>`}
    const n=Math.round(3000*q);const txt=(n>=1000?Math.floor(n/1000)+'.'+String(n%1000).padStart(3,'0'):String(n))+' KM';
    h+=g(6000,760,1,ease(seg(t,40.7,41)),I.pill(txt,{fill:q>=1,size:24}),'filter="url(#tg)"');}
  if(t>42.76){const [o,s]=ap(t,42.76,45.2);h+=g(5990,450,s,o,T(0,0,'BRASIL',22,{w:900,ls:8,filt:''}),'filter="url(#tg)"')}
  if(t>44.08){const p=seg(t,44.08,44.6);h+=g(6300,552,1,1,flag(p,t),'filter="url(#tg)"')+label(6330,410,'PERU','IQUITOS',ease(seg(t,44.5,44.9)))}
  return h}
function sF(t){let h=underwater(7500,t);
  const mx=7500, my=580+Math.sin(t*1.8)*6;
  const [o,s]=ap(t,45.5);
  h+=SH(mx,my,1.05*s,o,t,{belly:ease(seg(t,46.4,46.9))*(1-ease(seg(t,47.6,48.1)))},1);
  if(t>46.5&&t<48.0){const [o2,s2]=ap(t,46.5,47.6);h+=g(mx-10,my-120,s2,o2,I.pill('GRÁVIDA',{fill:true,size:18}),'filter="url(#tg)"')}
  // babies
  for(let i=0;i<3;i++){const a=47.7+i*.25;if(t<a)continue;const p=ease(seg(t,a,a+.6));const ang=t*.9+i*2.1;
    const bx=lerp(mx-10,7730+Math.cos(ang)*80,p), by=lerp(my+10,690+Math.sin(ang)*30,p);const dir=Math.sin(ang)>0?-1:1;
    h+=SH(bx,by,.28*p+.05,p,t,{fast:1,ph:i},dir)}
  // big sea sharks blocked
  if(t>49.28){const [o3]=ap(t,49.28);const p=seg(t,49.3,49.8);
    
    h+=`<path d="M7230 ${SY+20} L7230 ${FY-10}" ${LS} stroke-width="4" stroke-dasharray="14 12" opacity="${o3*p}"/>`;
    const bx=lerp(7060,7120,ease(seg(t,49.4,50.4)))-Math.max(0,t-50.6)*40;
    h+=SH(bx,560,.5,o3*.55,t,{dim:1,mouth:.6},1);
    if(t>50.6){const [o4,s4]=ap(t,50.6);h+=g(7230,500,s4,o4,I.x(1),'filter="url(#tg)"')}
    h+=g(7110,720,1,o3,T(0,0,'MAR',18,{w:800,ls:5,filt:''}),'filter="url(#tg)"')}
  return h}
function sG(t){let h='';const WY=600;h+=bed(8240,9760,FY);
  const p=seg(t,51.45,52.2);h+=wave(8240,9760,WY,t,5,1,3,1);
  const cx=8900, cy=WY-12+Math.sin(t*2)*4, ck=Math.sin(t*1.7)*3;
  h+=g(cx,cy,1,ease(seg(t,51.4,51.9)),`<g transform="rotate(${ck})">${canoe(p)}</g>`,'filter="url(#tg)"');
  h+=person(cx-50,cy-8,t,{s:.42,op:ease(seg(t,51.8,52.2))})+person(cx+46,cy-8,t,{s:.42,op:ease(seg(t,51.9,52.3)),ph:1,rot:t>55.48&&t<56.6?-10:0});
  // year tag
  if(t>52.88&&t<57){const [o,s]=ap(t,52.88);h+=g(9250,440,s,o,I.dpill('2016',30),'filter="url(#tg)"')}
  // fishing line + shark pulled
  const pull=ease(seg(t,55.48,56.3));
  const sy=lerp(730,WY-70,pull)+Math.sin(t*14)*(t>54.3&&t<55.5?5:0);
  const sx=lerp(9150,9080,pull);
  if(t>53.4){const lp=seg(t,53.4,54.0);h+=`<g filter="url(#tg)">${P(`M${cx+70} ${cy-80} Q${cx+150} ${cy-120} ${cx+190} ${cy-90}`,lp,3)}${P(`M${cx+190} ${cy-90} L${sx+120} ${sy-4}`,seg(t,53.7,54.3),2)}${P(`M${cx+40} ${cy-20} L${cx+70} ${cy-80}`,lp,4)}</g>`}
  if(t>54.29){const [o,s]=ap(t,54.29);h+=SH(sx,sy,.6*s,o,t,{fast:1,mouth:.5},1,-25*pull)}
  if(t>55.5&&t<56.6){const q=seg(t,55.5,56.6);for(let i=0;i<9;i++){const a=-Math.PI*(.15+.7*i/8);const r=40+q*140;h+=`<circle cx="${sx+Math.cos(a)*r}" cy="${WY+Math.sin(a)*r+q*q*120}" r="5" fill="#fff" opacity="${1-q}" filter="url(#tg)"/>`}}
  if(t>56.32){const [o,s]=ap(t,56.32);h+=g(9000,840,s,o,I.pill('RIO TAPAJÓS · PARÁ',{fill:true,size:20}),'filter="url(#tg)"')}
  return h}
function sH(t){let h='';const X=10500,WY=720;h+=wave(X-760,X+760,WY,t,6);
  const rows=[[57.68,'AGORA',400,26,'#BDBDBD',8],[58.28,'A PARTE QUE',480,32,W,6],[58.88,'QUASE NINGUÉM CONTA',570,50,W,2]];
  for(const [a,str,y,sz,col,ls] of rows){if(t<a)continue;const q=ease(seg(t,a,a+.55));const yy=lerp(WY+60,y,q);
    h+=`<g><clipPath id="cH${y}"><rect x="${X-700}" y="0" width="1400" height="${WY}"/></clipPath><g clip-path="url(#cH${y})">${T(X,yy,str,sz,{w:900,ls,col,filt:sz>40?'big2':'tg'})}</g></g>`;
    if(q<1)h+=bubbles(X-120+(y%7)*30,WY,t*2,5,100,1-q)}
  return h}
function sI(t){let h='';
  // sea part 12000
  h+=underwater(12000,t,1-ease(seg(t,64.3,64.9)));
  if(t<65){const [o,s]=ap(t,60.56,64.2);const ox=lerp(11760,11900,ease(seg(t,60.4,61.3)));
    h+=g(ox,580+Math.sin(t*1.6)*6,1.05*s,o,orca(t),'filter="url(#tg)"');
    if(t>61.4){const [o2,s2]=ap(t,61.4,64.2);h+=SH(12290,640,.42*s2,o2,t,{ph:3},-1)+label(12290,720,'','TUBARÃO',o2)}
    if(t>62.3){const [o3,s3]=ap(t,62.3,64.2);let cr=`<path d="M-40 20 L-40 -14 L-20 6 L0 -24 L20 6 L40 -14 L40 20 Z" ${LS} stroke-width="4" fill="#050505"/>`;h+=g(11900,355,s3,o3,cr,'filter="url(#tg)"')}
    if(t>63.04){const [o4,s4]=ap(t,63.04,64.2);h+=g(12080,500,s4*1.2,o4,I.x(1),'filter="url(#tg)"')}}
  // river in France 13500
  if(t>64.3){const p=seg(t,64.5,65.4);
    h+=`<g filter="url(#tg)">${P('M12760 430 Q13150 430 13400 520 L14240 520',p,4)}${P('M12760 760 Q13150 760 13400 670 L14240 670',p,4)}</g>`;
    h+=wave(12760,13150,430,t,5,p,2,.6);
    const ox=lerp(13180,13560,ease(seg(t,65.9,67.6)));const dim=ease(seg(t,70.0,71.6));const sinkk=ease(seg(t,72.0,73.2));
    const s=lerp(.95,.62,ease(seg(t,65.9,67.6)));
    h+=g(ox,595+sinkk*40,s,(1-sinkk)*ease(seg(t,64.6,65.1)),`<g transform="rotate(${sinkk*20})">${orca(t*(1-dim*.7))}</g>`,`filter="url(#${dim>.5?'fD':'tg'})" opacity="${1-.5*dim}"`);
    if(t>65.76){const [o,s2]=ap(t,65.76,69.8);h+=g(13900,440,s2,o,I.pill('FRANÇA',{size:20}),'filter="url(#tg)"')}
    if(t>67.64){const [o,s2]=ap(t,67.64);const d=Math.round(60*ease(seg(t,68.3,69.9)));h+=g(13900,770,s2,o,I.pill(d+' DIAS',{fill:d>=60,size:22}),'filter="url(#tg)"')}
    // skin flakes
    if(t>69.96){for(let i=0;i<14;i++){const a=70.0+i*.16;if(t<a)continue;const q=seg(t,a,a+1.6);const fx=ox-100+(i*47)%220, fy=595-20+(i*29)%50;
        h+=`<path d="M${fx} ${fy+q*150} l${8+i%3*3} ${4-i%2*8}" ${LS} stroke-width="3" opacity="${(1-q)*.9}" filter="url(#tg)"/>`}}
    if(t>72.0){const q=seg(t,72.0,73.2);h+=`<ellipse cx="${ox}" cy="595" rx="${60+q*160}" ry="${16+q*40}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
function sJ(t){let h='';const X=15000;
  h+=`<path d="M${X-760} ${FY} L${X-20} ${FY} L${X+10} ${FY+20}" ${LS} stroke-width="3" stroke="#8A8A8A" />`;
  h+=wave(X+10,X+760,FY+20,t,5);
  const lean=Math.sin(t*1.4)*4+ (t>74.3?6:0);
  h+=person(X-260,FY,t,{rot:lean*ease(seg(t,73.6,74))});
  // fin circling
  const fx=X+300+Math.sin(t*.9)*130;const fd=Math.cos(t*.9)>0?-1:1;
  h+=g(fx,FY+14,1,ease(seg(t,73.6,74.2)),`<g transform="scale(${fd} 1)"><path d="M-20 0 Q-8 -40 14 -58 Q14 -26 32 0" fill="#050505" ${LS} stroke-width="4"/></g>`,'filter="url(#tg)"');
  if(t>74.56){const [o,s]=ap(t,74.56);const pl=t>75.84?.06*Math.sin((t-75.84)*7):0;h+=g(X-160,440,s*(1+pl),o,I.pill('SIM',{size:24}),'filter="url(#tg)"');
    const [o2,s2]=ap(t,74.8);h+=g(X+160,440,s2*(1-pl),o2,I.pill('NÃO',{size:24}),'filter="url(#tg)"')}
  if(t>76.6){const clicked=t>77.2;const [o,s]=ap(t,76.6);const pul=clicked?1+.06*Math.sin((t-77.2)*8)*Math.exp(-(t-77.2)*2):1;
    h+=g(X,560,s*1.2*pul,o,I.pill(clicked?'SEGUINDO ✓':'+ SEGUIR',{fill:clicked,size:24}),'filter="url(#tg)"');
    if(clicked){const q=seg(t,77.2,77.9);h+=`<circle cx="${X}" cy="560" r="${70+q*150}" ${LS} stroke-width="3" opacity="${1-q}" filter="url(#tg)"/>`}}
  return h}
const SCENES=[[sA,0,7.3],[sB,6.3,14.6],[sC,13.6,29.95],[sD,29.0,39.4],[sE,38.4,46.2],[sF,45.2,52.3],[sG,51.3,58.2],[sH,57.4,61.2],[sI,60.3,74.2],[sJ,73.2,99]];
const TOTAL=78.8;
function render(t){
  const [cx,cy,z]=cam(t);
  let sx=0,sy=0;for(const [a,d,amp] of SHAKE){const q=t-a;if(q>=0&&q<d){const k=amp*(1-q/d);sx+=Math.sin(q*67)*k;sy+=Math.cos(q*53)*k}}
  let world='';for(const [f,a,b] of SCENES){if(t>=a&&t<=b)world+=f(t)}
  let dust='';for(let i=0;i<26;i++){const px=((i*137.5+t*(6+i%5))%1240)-80, py=((i*89.3-t*(4+i%3))%1080+1080)%1080;dust+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${1+(i%3)*.6}" fill="#fff" opacity="${.05+.05*Math.sin(t+i)}"/>`}
  const fade=Math.min(ease(seg(t,0,.25)),1-seg(t,TOTAL-.45,TOTAL));
  const whisper=ease(seg(t,51.5,52))*(1-ease(seg(t,57.2,57.6)))+ease(seg(t,70,71))*(1-ease(seg(t,73.2,73.6)));
  document.getElementById('s').innerHTML=`
  <defs>
   <filter id="fP" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="fD" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="tg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="big2" x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="big" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="30"/></filter>
   <radialGradient id="spot" cx=".5" cy=".48" r=".55"><stop offset="0" stop-color="#2a2a2a"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#050505"/></radialGradient>
   <radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
   <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="#fff" opacity=".035"/></pattern>
  </defs>
  <rect width="1080" height="1080" fill="url(#spot)"/>
  <rect width="1080" height="1080" fill="url(#dots)"/>
  <g transform="translate(${(540+sx).toFixed(2)} ${(540+sy).toFixed(2)}) scale(${z.toFixed(4)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})">${world}</g>
  ${dust}
  <rect width="1080" height="1080" fill="url(#vig)" opacity="${(.6*whisper).toFixed(3)}"/>
  ${titleLayer(t)}
  <rect width="1080" height="1080" fill="#000" opacity="${(1-fade).toFixed(3)}"/>`;
}
window.render=render;window.TOTAL=TOTAL;
window.SFX=[
 [0.2,'rumble',.6],[0.6,'whoosh',.6],[1.6,'pop',.8],[2.4,'clockfast',.5],[3.8,'ding',.8],[4.8,'pop',.6],[5.1,'pop',.6],[5.35,'pop',.6],[5.5,'birds',.5],
 [6.45,'whoosh',.7],[6.75,'neon',.7],[7.8,'poof',1],[7.9,'swallow',.7],[8.2,'bubble',.8],[8.9,'snap',.8],[10.0,'marker',.7],[11.25,'pop',.8],[12.9,'error',.8],
 [13.75,'whoosh',.7],[14.7,'marker',.6],[17.8,'pop',.9],[18.6,'chips',.5],[20.1,'pop',.8],[22.36,'grow',.9],[22.96,'buzz',1],[23.3,'fall',.6],[23.8,'smallwin',.9],
 [24.85,'scan',.7],[25.6,'coinstream',.5],[26.85,'pop',.8],[28.3,'ding',.9],
 [29.1,'whoosh',.7],[30.3,'fall',.6],[32.3,'pop',.8],[33.2,'swallow',.6],[33.45,'pop',.7],[34.2,'bubble',1],[34.44,'thud',.7],[35.8,'swirl',.8],[36.1,'tap',.6],[36.97,'stampsoft',.7],[37.45,'pop',.8],
 [38.5,'whoosh',.8],[38.9,'marker',.6],[40.8,'belt',.5],[42.2,'clockfast',.5],[42.76,'pop',.7],[44.08,'flip',.8],[44.4,'chaching',.7],
 [45.35,'whoosh',.7],[45.6,'pop',.8],[46.5,'sparkle',.8],[47.7,'pop',.7],[47.95,'pop',.7],[48.2,'pop',.7],[49.3,'marker',.6],[50.6,'error',.8],
 [51.4,'whoosh',.5],[51.6,'heartbeat',.7],[52.9,'stampsoft',.8],[53.4,'pulley',.6],[54.3,'tap',.6],[55.48,'pulley',.9],[55.5,'whoosh',.8],[55.6,'drop',.9],[56.35,'pop',.8],
 [57.45,'whoosh',.6],[57.7,'bubble',.8],[58.3,'bubble',.8],[58.88,'hit',.8],
 [60.4,'whoosh',.7],[60.6,'rumble',.6],[61.45,'pop',.7],[62.3,'sparkle',.6],[63.04,'buzz',.9],
 [64.35,'whoosh',.7],[65.8,'pop',.8],[67.7,'pop',.8],[68.3,'clockfast',.6],[69.9,'ding',.6],[70.0,'sad',.9],[72.0,'fadeout',.8],[72.1,'bubble',.6],
 [73.35,'whoosh',.6],[74.6,'pop',.8],[74.85,'pop',.8],[76.6,'pop',.9],[77.2,'click',1.2],[77.25,'smallwin',.8],
];
