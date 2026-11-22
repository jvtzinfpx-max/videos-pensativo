# Estilo "ícones brilhantes 3D" (PADRÃO desde 22/11/2026 — aprovado pelo usuário a partir das referências dele)

- Fundo PRETO puro. Ícones BRANCOS chapados + detalhes VERDE-MENTA #3DF5A6, brilho branco suave (bloom s .45 r .22 th .8),
  levemente extrudados e balançando em 3D (I.sway). UM ícone grande por plano, centralizado, montando PEÇA POR PEÇA (Icon.build).
- SEM PERSONAGENS. A história é contada só com ícones, objetos, telas, cards e gráficos. Temas que não dependem de pessoas.
- Também: ícone de app 3D menta (I.app3d) com cards de notificação de vidro empilhando (I.notifCard).
- Vertical 1080x1920; gancho em texto grande branco com palavra-chave menta (#hook, ~2,4 s); legenda palavra a palavra (#caps top 1330, palavra ativa menta);
  flash branco leve (25%) na troca de plano. Ícone ocupa ~35-45% da largura, entre y ~400 e ~1250 px; nada atrás da legenda.
- Nada de logos/marcas reais: desenhe ícones próprios com rrect/circ/ring/poly/stroke + Icon.add(shape, 'white'|'mint'|'black'|'red'|'gold', {step, from, z, pivot}).
  Detalhes "furados" (janelas, tela) = peças 'black' por cima (z .081). Vermelho só para alerta/perda.
- Biblioteca (icons.js): phoneCart, windowsStack, school, barChart, coin, bank, lock, globe, bulb, magnifier, warning, rocket, app3d, notifCard, word.
  Crie novos ícones para cada tema (planeta, satélite, DNA, casa, carro, avião, petróleo, ouro, cofre, relógio, calendário, mapa, raio, etc.) e confira em close.
- Câmera: I.camFront(t, y, dist≈9.2, k, push≈1) (aproxima devagar). Troca de plano a cada ~2-4 s.
- Render: `python3 render3d.py . <cenas>` (2 processos), áudio audio3d.py (voz em aud/voz.mp3).
