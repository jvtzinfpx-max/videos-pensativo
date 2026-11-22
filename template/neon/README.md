# Estilo "3D neon minimalista" (PADRÃO desde 22/11/2026)

Motion graphics 3D: fundo preto puro, ícones/objetos 3D brilhantes (glossy/clay) com destaque **verde neon #39FF88**,
poucos elementos por plano, câmera orbitando suave, objetos entrando com "pop" elástico e flutuando.
Inspirado nas referências do usuário (sem copiar: nada de logos/marcas reais — símbolos próprios).

- Vertical 1080x1920. Hook grande nos ~2 s iniciais (#hook, top 330). Legenda palavra a palavra em #caps (top 1330), palavra ativa verde neon.
- Texto máquina de escrever opcional: `N.typewriter(texto, t, t0, cps, até)` (o "+" fica verde).
- Bonecos brancos 3D (E.Person) **às vezes**, só quando a história tem uma pessoa (ex.: num pedestal com anel neon), com
  `mat: N.gloss(0xe6e6e6,{r:.35,e:0xffffff,ei:.06})` para não estourar no bloom. Sem boca.
- Vermelho (N.RED) só para alerta/perda (linha caindo, "NÃO CLIQUE"). Cores reais só em objetos específicos (ouro da moeda etc.).
- Fonte 3D Poppins Bold (tem acentos: Ã, Ç, É). Confira os textos 3D nos frames de checagem.

## Kit (neon.js)
studio(), glossFloor(), gloss(), glow(), WHITE(), BLACK(), symbol(nome|pathSVG) [chat, check, warn, shield, bubble, heart, play, arrow, x],
appIcon(sym|grupo, 'neon'|'dark'|'white', size), orb(), pedestal(), chainLink(), lock3d() (.userData.open(k)), phone(tex,w,h),
chatScreen(msgs,title), card3d(texto,w,h,{border,font}), neonLine(pts,cor) (.reveal(k)), dashArc(a,b,altura) (.upd(t,k)),
progressRing() (.set(k)), neonText(), whiteText(), sparks() (.upd(t)), popIn(), popOut(), orbit(), typewriter().

## Regras de layout
- Conteúdo 3D entre ~y 250 e ~1300 px; nada atrás da legenda (1330–1500) nem na coluna direita (botões do TikTok, ~150 px).
- Largura útil a ~8 unidades da câmera: ~4 unidades. Cards 3D ≤ 2,7 de largura com fonte ≤ 56.
- Sempre snap3d.py dos momentos mais cheios + close de cada objeto antes do render.
- Render: `python3 render3d.py . <cenas>` (2 processos em paralelo), áudio com audio3d.py (voz em aud/voz.mp3).
