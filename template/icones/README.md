# REGRAS FIXAS DO USUÁRIO (22/11, valem acima de qualquer outra instrução)
- CORES REAIS (22/11 12h51): cada objeto/ambiente com a SUA cor certa (sol amarelo/laranja, Vênus bege, moeda dourada, globo azul com
  continentes verdes, telhado vermelho, porta marrom, cadeado dourado, calendário com topo vermelho...). NÃO deixar tudo branco e verde.
  Use as cores de COL em icons.js (yellow, orange, tan, venus, beige, brick, blue, sky, brown, green, silver, gold, paper, stone, red...).
  Veja galeria_icones.jpg (abrir gallery.html renderiza todos os ícones para conferir).
- Ícones, objetos e ambientes no modelo dos vídeos de referência dele: ícone chapado com cores reais, um por vez, frontal,
  balanço 3D bem leve, montando peça por peça; fundo preto; cena "app 3D verde + notificações de vidro empilhando" com fundo preto
  e reflexo no chão (I.reflect). Use SEMPRE os padrões deste template (icons.js) em vez de inventar estilos novos.
  Só troque o símbolo de cada ícone conforme o tema (nada de logos/marcas reais).
- SEM BRILHO (usuário pediu para remover): E.BLOOM = { off: true }, sem text-shadow de glow no gancho; branco 0xd6d6d6, menta 0x33d690. Não colocar glow/bloom.
- FUNDO PRETO (ou cinza bem escuro) em TODAS as cenas — nada de azul. I.gridBackdrop (cinza) só se precisar.
- Sem personagens.
- OBJETOS EM 3D DE VERDADE (22/11 13h07): peças grossas (ZK=3.5 x a espessura) com chanfro e material com luz e sombra (MeshStandard, sem tone mapping), planetas/Terra/sol como ESFERAS (texSphere/addObj), rótulos em TEXTO 3D (Poppins), câmera um pouco de cima e balanço maior (I.sway 0.32) para mostrar a profundidade. Evite símbolos com '=' (a fonte 3D não tem); use ':'.
- CENA CHEIA (22/11 12h59): cada plano = ícone PRINCIPAL no centro + 2-4 ícones de APOIO menores (I.side) + RÓTULOS curtos (I.label: números, comparações '>' '<', nomes) + fundo do ambiente quando fizer sentido (I.starfield no espaço). Tudo representando a narrativa daquele trecho e entrando no momento da fala. Ver page.html (helper shot) e teste_venus.mp4.
- SEM LEGENDA E SEM TEXTO DE GANCHO na tela (pedido do usuário 22/11 12h55 e 13h14): #caps e #hook escondidos, E.captions/E.hook não são chamados. O gancho existe só na NARRAÇÃO e na legenda do post. Na tela, só os rótulos 3D curtos das cenas.

# Estilo "ícones brilhantes 3D" (PADRÃO desde 22/11/2026 — aprovado pelo usuário a partir das referências dele)

- Fundo PRETO puro. Ícones BRANCOS chapados + detalhes VERDE-MENTA #3DF5A6, brilho branco suave (E.BLOOM = { s: .32, r: .08, th: .55, crisp: true }: o glow fica só EM VOLTA e o ícone é redesenhado nítido por cima, então janelas/portas/telas pretas ficam pretas de verdade),
  levemente extrudados e balançando em 3D (I.sway). ícone principal centralizado + ícones de apoio, montando PEÇA POR PEÇA (Icon.build).
- SEM PERSONAGENS. A história é contada só com ícones, objetos, telas, cards e gráficos. Temas que não dependem de pessoas.
- Também: ícone de app 3D menta (I.app3d) com cards de notificação de vidro empilhando (I.notifCard).
- Vertical 1080x1920; gancho em texto grande branco com palavra-chave menta (#hook, ~2,4 s); legenda palavra a palavra (#caps top 1330, palavra ativa menta);
  sem flash na troca de plano (deixava o 1º quadro cinza). Ícone ocupa ~35-45% da largura, centralizado na tela (sem legenda, o centro fica livre).
- Nada de logos/marcas reais: desenhe ícones próprios com rrect/circ/ring/poly/stroke + Icon.add(shape, 'white'|'mint'|'black'|'red'|'gold', {step, from, z, pivot}).
  Detalhes "furados" (janelas, tela) = peças 'black' por cima (z .081). Vermelho só para alerta/perda.
- Biblioteca (icons.js): planet, sun, orbit (.setOrbit(k)), calendar(num, sub), spinArrow, question, sunrise, phoneCart, windowsStack, school, barChart, coin, bank, lock, globe, bulb, magnifier, warning, rocket, app3d, notifCard, word.
  Crie novos ícones para cada tema (planeta, satélite, DNA, casa, carro, avião, petróleo, ouro, cofre, relógio, calendário, mapa, raio, etc.) e confira em close.
- Câmera: I.camFront(t, y, dist≈9.2, k, push≈1) (aproxima devagar). Troca de plano a cada ~2-4 s.
- Render: `python3 render3d.py . <cenas>` (2 processos), áudio audio3d.py (voz em aud/voz.mp3).

## Checklist de revisão de imagem (obrigatório antes de postar)
- Tira de frames do MP4 final (fps=1.5, tile) + close de CADA ícone montado em resolução cheia.
- Brilho: nenhum ícone "lavado"/estourado; detalhes pretos (janelas, porta, tela, furos) PRETOS de verdade, sem névoa cinza; glow curto em volta.
- Peças: todas as partes do ícone presentes e encostadas (nada solto ou faltando: telhado, porta, escada, bandeira, rodas...).
- Primeiro frame de cada plano já mostra algo (build começa em t0 = -0.15), sem quadro vazio.
- Nada atrás do gancho ou da legenda; nada cortado nas bordas.

- Legenda: os grupos de até 3 palavras quebram no fim de frase/pausa (não misturar frases de cenas diferentes).
- Exemplo completo com narração: teste_venus.mp4 (21,6 s, 7 planos).
