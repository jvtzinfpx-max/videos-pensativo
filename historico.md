# Histórico de vídeos — TikTok Pensativo

| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-21 | Roubo do Banco Central (Fortaleza 2005 + golpe C&M 2025) | roubo_banco_central.mp4 | 21/11 ~20:08 | Sincronia por palavra (transcrição ElevenLabs) |
| 2026-11-21 | D.B. Cooper (sequestro de avião 1971) | dbcooper.mp4 | 21/11 21:08 | Mais movimento: respiração/balanço dos bonecos, câmera em drift, poeira, parallax, chuva |
| 2026-11-21 | Roubo do Louvre (out/2025) + senha "LOUVRE" | louvre.mp4 | 22/11 09:00 | Cronômetro, faíscas, estilhaços, fuga com rua em movimento |

## Como usar o template
- `template/page_louvre.html` = página mais recente (helpers, person() com movimento idle, acessórios vest/shades/chute, prop briefcase, camera drift + poeira em render()). Troque só o bloco de cenas (entre os helpers e `// ===== render =====`), `window.T` (DUR/CUE) e `TONES`.
- `render.py`, `snap.py`, `audio.py` usam caminhos absolutos: troque `/home/claude/louvre` pela pasta do projeto. `audio.py` lê `aud/voz.mp3` (take único) e gera out/voice.wav + out/fx.wav.
- Mix final: compressão na voz + amix + loudnorm 2 passagens I=-14 TP=-1.5.

## 2026-11-22 — Novo motor 3D
- Usuário pediu TUDO em 3D de verdade e movimentos melhores. Criado `template/3d/` (Three.js + WebGL headless): personagens 3D articulados com caminhada de 4 poses, cenários/objetos/ícones 3D, sombras, bloom, câmera com drift. Teste aprovado para uso: `teste3d.mp4` (rua à noite + cofre).
- A partir de agora TODOS os vídeos usam `template/3d/` (o template 2D antigo fica só como referência de sons).

- 22/11: formato mudou para VERTICAL 9:16 1080x1920 + legenda dinâmica palavra por palavra + gancho em texto grande nos 2 primeiros segundos (padrão dos vídeos 3D que viralizam no BR, ex.: @zenkairo02 ~999 mil views com o roubo do Banco Central em 3D). Nossos vídeos 4:3 ficavam em ~100 views.
- 22/11: usuário apontou cadeado irreconhecível (alça virou uma 'cúpula'). Refeito: corpo de latão com fechadura + alça em U (2 pernas + arco) que levanta e gira. LIÇÃO: todo objeto 3D tem que ser reconhecível de perto — conferir em close (snap com câmera próxima) antes de renderizar.


## 22/11/2026: novo estilo visual (pedido do usuário com referências)
- Mudou para **3D neon minimalista**: fundo preto, ícones/objetos 3D glossy com destaque verde neon, poucos elementos por plano, câmera orbitando. Template em `template/icones/` (vira o padrão). Bonecos 3D só às vezes, quando a história tem pessoa.
- Lições do teste: símbolos extrudados precisam de `scale(sc,-sc,-sc)` (senão as faces somem); fonte helvetiker não tem Ã → usar Poppins TTF; branco puro estoura no bloom → usar cinza claro 0xd9d9d9 e env 0.38; cards 3D muito perto da câmera saem cortados.

## 22/11/2026 (12h20): estilo trocado de novo — "ícones brilhantes 3D", SEM personagens
- O usuário achou o teste "3D neon" (glossy, boneco no pedestal, muitos objetos) horrível e mandou 5 referências: ícones brancos com verde-menta, brilho suave, fundo preto, um ícone por vez montando por partes; ícone de app 3D com notificações empilhando.
- Novo padrão: template/icones/. Sem personagens; preferir temas que se contam só com ícones/objetos (notícias, descobertas, dinheiro, tecnologia, ciência, curiosidades).
- Lições: bloom forte estoura tudo (usar s .45 / th .8); ícone grande demais cobre o gancho; lookAt mais baixo sobe o conteúdo na tela.
- Revisão pedida pelo usuário (12h28): o teste tinha BRILHO ESTOURADO e a escola com partes faltando/borradas (porta e janelas cinza por causa do bloom). Correção: bloom "crisp" (glow só em volta, ícone nítido por cima), porta em arco com moldura menta, escada encostada no prédio, build começando em -0.15 s. Checklist de revisão de imagem adicionado ao template/icones/README.md — SEMPRE seguir antes de postar.
- 12h36: usuário pediu BRILHO MENOR em tudo e ícones/objetos/ambientes IGUAIS ao modelo das referências (sem ficar inventando). Aplicado: bloom s .32, branco/menta mais escuros, balanço menor, ícones um pouco menores, cena de notificações com fundo azul-marinho com grade + reflexo. Regras fixas no topo do template/icones/README.md.
- 12h42: usuário pediu fundo preto/cinza (sem azul) e REMOVER o brilho. Aplicado: E.BLOOM.off, sem glow no gancho, cena de notificações em fundo preto.
- 12h50: teste de 20 s (Vênus) com narração no estilo ícones. Melhorias: legenda não mistura frases, sem flash cinza na troca, ícones novos (planeta, sol, órbita, calendário, seta de giro, interrogação, nascer do sol).
- 12h51: usuário pediu CORES CERTAS para cada objeto/ambiente (estava tudo branco e verde). Todos os ícones do kit agora têm cores reais (galeria_icones.jpg). Verde-menta fica só como cor de destaque do texto (gancho/legenda).
- 12h55: usuário pediu para REMOVER AS LEGENDAS. Template sem legenda (só gancho no início).
- 12h59: usuário pediu MAIS COISAS NA CENA representando a narrativa. Novo padrão: ícone principal + 2-4 ícones de apoio + rótulos + fundo (estrelas etc.). Ícones novos: earth, snail, clock, compass, starfield, side(), label().
- 13h07: usuário lembrou que pediu OBJETOS EM 3D. Agora: peças grossas com chanfro + luz/sombra, esferas para planetas, texto 3D nos rótulos, câmera levemente de cima. Fonte 3D não tem '=' (virou quadrado) → usar ':'.
- 13h14: usuário disse que o texto do gancho no início ainda parecia legenda → removido. Sem nenhum texto sobreposto; só rótulos 3D curtos dentro das cenas.
- 13h18: usuário: o rótulo 'LÁ' em cima de Vênus era desnecessário — só mostrar o objeto. Regra: rótulo só quando acrescenta informação.
- 13h20: usuário aprovou o estilo (Vênus final). Daqui pra frente: cenas de acordo com tema, narrativa e TOM DA VOZ (mapa tom→animação no README).
- 14h58: restavam 3.853 créditos no ElevenLabs (~2 vídeos; renova 18/12). Usuário vai recarregar; manter tudo igual. Tarefas checam créditos antes e avisam se faltar (regra no README).

## 22/11/2026 (20h) — Voyager 1 a um dia-luz da Terra
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-22 | Voyager 1 cruzou 1 dia-luz (18/11/2026) — 24 h de sinal, computador < foto de celular, rádio de 22 W, disco de ouro | voyager.mp4 | 22/11 20:00 (postId 41e62a6f, agendado) | 1º vídeo de ESPAÇO/ciência no estilo ícones 3D; 24 planos sincronizados palavra por palavra; ondas de rádio viajando entre Terra e sonda; caminho pontilhado Terra→sonda; luzes da cena apagando em "escuro"; painel de instrumentos apagando um por um |
- Padrão de gancho usado: "objeto antigo + feito inédito AGORA" ("Uma nave lançada em 1977 acabou de fazer algo que nenhum objeto humano jamais fez") + data concreta ("Na última quarta-feira") nos 10 primeiros segundos; viradas a cada ~10 s: "E aí vem o problema", "E o mais absurdo é o que tem lá dentro", "Mas a energia está acabando", pergunta final que provoca opinião ("será que vai entender quem nós somos?").
- Kit novo em template/icones/icons.js: voyager (sonda 3D com antena parabólica, corpo dourado de 10 lados, RTGs, magnetômetro), groundDish, waveArc, trophy, speedometer (I.needle), chip, phonePhoto, fridge, battery (I.levels), nuclear, camera3 (I.x), lampPanel (I.on/I.off), goldDisc, note, picture.
- Template page.html: helpers dots() e waves(); shot aceita mx, t0 (objeto principal entra depois), lead (1º quadro já montado), sw, push; L(x) converte tempo absoluto da fala em tempo do plano — atenção: renderAt precisa fazer CUR = si (senão L() dentro de post/extra usa o plano errado e as ondas somem).

### LIÇÕES (22/11 noite)
1. Nossos 10 últimos vídeos ficaram em 60–130 views (o do Louvre com ~1 view em 8 h); os de "roubo/golpe" não destravaram. Os outliers BR do mês em ciência/espaço com animação 3D + narração (ex.: Voyager 1 "49 anos no espaço" ~674 mil; chuva de meteoros "Olha o que vai acontecer na madrugada do dia 17" ~2,5 mi) usam EVENTO DATADO e ATUAL + número concreto já na 1ª frase. Aplicado: tema de notícia da semana (18/11) + "1977" + "Na última quarta-feira".
2. Comparação com objeto do dia a dia faz o número grande "caber na cabeça" (computador < foto do celular; rádio < lâmpada da geladeira). Aplicado: 2 comparações seguidas no meio do vídeo (ponto onde a retenção costuma cair).
3. Pergunta final de OPINIÃO (sim/não fácil de responder) rende mais comentário do que pergunta de conhecimento. Aplicado: "será que vai entender quem nós somos?".
- Legenda do post: "Uma nave de 1977 acabou de bater um recorde que nada feito pelo homem tinha batido. 🚀 #fyp #viral #voyager1 #nasa #espaco". Revisão: 71,7 s (fala 70,8 s), 1080x1920 30 fps, -14,2 LUFS, true peak -2,0 dB. Créditos ElevenLabs restantes após este vídeo: ~2.600 (dá para ~2 vídeos).
- 22/11 noite: usuário achou que tinha whoosh demais no vídeo da Voyager (24, um por troca). Regra nova: whoosh só em 3-4 momentos específicos (viradas, algo passando rápido, revelação); trocas normais só com pop. Padrão do shot no template mudou para só pop.

## 22/11/2026 (23h) — E se você acordasse com o conhecimento do Nikola Tesla?
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-22 | E se você acordasse com o conhecimento do Tesla (visualizar antes de construir, pensar em sistema/corrente alternada, previsão do celular em 1926, morreu endividado em 1943) | tesla_conhecimento.mp4 | 22/11 ~23:00 (imediato) | NOVO ESTILO pedido pelo usuário a partir de um vídeo de referência: quadrado 1080x1080, preto e branco, line-art branco com glow, boneco cápsula sem rosto, título digitado no topo, câmera andando de lado entre cenas, ícones com rótulo, X/✓, contadores. Estrutura "e se você acordasse... A primeira / a segunda / a terceira... a parte que quase ninguém conta... pergunta de opinião". Template em template/lineart/ |
- Legenda: "E se você acordasse amanhã com a mente do Nikola Tesla? ⚡ #fyp #viral #nikolatesla #curiosidades #historia"
- Revisão: 75,6 s, -14,3 LUFS, true peak -1,5 dB.
- 22/11 23h: post publicado — https://www.tiktok.com/@pensante_4/video/7711179929261509895
- **22/11 23h: usuário definiu o estilo line-art preto e branco (template/lineart/) como PADRÃO dos próximos vídeos**, no lugar dos ícones 3D coloridos.
