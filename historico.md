# Histórico de vídeos — TikTok Pensativo
PAUSADO DE VEZ 23/11/2026: o usuário NÃO quer mais posts automáticos. Não reativar a tarefa agendada, não postar nem repostar nada. Os vídeos agora são só CRIADOS e entregues na conversa; postagem só se o usuário pedir explicitamente.
REGRA DO USUÁRIO (23/11): ao terminar qualquer publicação (vídeo novo ou repostagem), SEMPRE mandar também o MP4 publicado na conversa com SendUserFile.
REGRA DO USUÁRIO (23/11) — NARRATIVA FÁCIL: o roteiro inteiro tem que ser entendido de primeira por qualquer pessoa. Nada de metáfora, ironia ou referência que precise ser decifrada; frases literais e diretas. A pergunta final é concreta e fácil de responder (sim/não, um número ou uma escolha entre 2 opções) e NUNCA contradiz o que o vídeo disse antes. Ex. ruim (vídeo do apagão): "você teria coragem de apertar o primeiro botão?" depois de dizer "não existe um botão". Ex. bom: "Quantas horas você aguentaria sem luz?". Antes de gerar a voz, releia o roteiro como se fosse alguém que nunca ouviu falar do tema e corte tudo que for confuso.
REGRA DO USUÁRIO (23/11) — INTERESSANTE E FÁCIL, NARRATIVA E CENAS: a história tem que prender (gancho forte; a cada ~10 s um detalhe novo SOBRE O MESMO TEMA — nunca mudar de assunto: se o vídeo é sobre avião, é avião do começo ao fim; virada surpreendente) E ser fácil de acompanhar. As CENAS seguem o mesmo padrão: cada cena mostra exatamente o que a voz está dizendo, de forma literal e óbvia (fala "carro" → aparece o carro), uma ideia por vez, sem símbolo abstrato que precise ser interpretado. Teste: quem vê sem som entende a cena em 1 segundo.
REGRA DO USUÁRIO (23/11) — FINAL COM REFLEXÃO + DETALHES COLORIDOS: (1) o vídeo termina com uma REFLEXÃO calma, no estilo do vídeo de referência do usuário (cristao2d): luz de holofote caindo sobre o boneco, 1-2 perguntas para a pessoa fazer a si mesma aparecendo em pílulas ("da próxima vez que..., pergunte também: ...?"), e um objeto simbólico da história nascendo/acendendo devagar (ex.: broto que cresce com a ponta dourada). Sem "comenta 1 ou 2" nesse final; o tom é de pensar, não de enquete. (2) O vídeo continua preto e branco, mas ALGUNS objetos ganham a COR REAL deles como destaque: sol e ouro em dourado (#F2B53A), água/chuva em azul (#4DA6E8), planta/folha em verde (#5CC97A), fogo em laranja (#FF8A3D), milho/trigo em amarelo-dourado, palavras-chave do título podem ter a mesma cor do objeto. No máximo 1-2 cores por cena, só nos objetos que a voz está citando; boneco, chão e textos normais continuam brancos.
PULAR 23/11/2026 18h: o usuário pediu outra versão do tema (o_que_semear.mp4, Gálatas 6:7) e vai aprovar o horário na conversa — a rodada das 18h não produz nem posta nada. (O vídeo regras_todo_mundo.mp4 foi CANCELADO pelo usuário, não postar.)


REPOSTAR 24/11/2026 12h: cafe_nove_dias.mp4 — legenda: "Seu cansaço não some com o café. Ele só fica na fila. ☕ #fyp #viral #cafe #cerebro #curiosidades"
REPOSTAR 24/11/2026 18h: brasil_modelo_eua.mp4 — legenda: "Você trocaria o modelo do Brasil pelo dos Estados Unidos? 🇺🇸🇧🇷 #fyp #viral #economia #estadosunidos #brasil"


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

## 23/11/2026 (12h) — E se você virasse presidente: esquerda × direita
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | E se você virasse presidente — de esquerda/socialista ou de direita/capitalista (proposta + crítica de cada lado, Dinamarca ~45% do PIB em impostos, China abriu o mercado em 1978) | esquerda_direita.mp4 | 23/11 12:00 (agendado) | Câmera vai para a ESQUERDA do mundo na parte da esquerda e para a DIREITA na parte da direita (pan longo entre os lados); estrutura simétrica (4 propostas + crítica com exemplo histórico para cada lado); boneco presidente com faixa; ícones novos: governo, fábrica, hospital, escola, peso, prateleira, loja, gráficos subindo/descendo, rede de proteção, carteira, cofre, púlpito, caneta, pino, porta, slider Estado↔Mercado |
- Tema político: mantido neutro — cada lado com a mesma estrutura (o que propõe + o que os críticos dizem), sem partidos nem políticos atuais; pergunta final de opinião ("mais Estado ou mais mercado?").
- Revisão: 83,7 s, -14,1 LUFS, true peak -1,5 dB.
- ATENÇÃO: créditos do ElevenLabs praticamente zerados após este vídeo (~12 restantes; renova ~18/12). Próximos vídeos precisam de recarga ou de take enviado pelo usuário.
- 22/11 23h15: usuário pediu MELHORES CENAS, NOVOS AMBIENTES e NOVOS OBJETOS nos próximos vídeos (os dois primeiros line-art ficaram com fundo vazio — só chão + ícones). Regras novas na skill: ambiente de fundo completo em line-art por cena, 3 camadas com parallax, personagem interagindo com objetos, transições "entrando" no ambiente e lista de objetos já usados (abaixo) para não repetir.

### Objetos/ambientes JÁ USADOS no estilo line-art (não repetir sem redesenhar)
Tesla: cama, despertador, casa, celular, banco, moeda, máquina com engrenagens, balão de pensamento, chave inglesa, usina, torre de energia, casinhas, tomada, plugue, olho, calendário, globo, documento, quarto de hotel (porta, janela com lua, cama), notas de dívida, lâmpada, escudo, botão seguir, cursor, balão de comentário.
Esquerda × direita: púlpito, faixa presidencial, caneta, cofre, multidão, bifurcação, prédio do governo, fábrica, hospital, escola, peso "IMPOSTO", engrenagem parando, prateleira vazia, loja, pilha de papéis, gráfico subindo/descendo, rede de proteção, carteira vazia, pino de mapa, slider Estado↔Mercado, porta.


## 23/11/2026 (00h) — E se você acordasse em 1994 com uma nota de 100?
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Inflação desde o Plano Real: nota de R$100 de jul/1994 (1,5 salário mínimo, 1,5 cesta básica SP, pão R$0,09, gasolina R$0,55; +4.000% nos 12 meses antes do Real; hoje equivale a ~R$890) | nota100_1994.mp4 | 23/11 ~00:30 (imediato) | 1º vídeo com as regras de CENAS RICAS: 8 ambientes em line-art de fundo com parallax (quarto 1994, supermercado, posto, mercado 1993 em flashback com moldura tracejada e flicker, quarto à noite com timelapse 1994→2026 onde a TV de tubo vira TV de tela plana e o telefone fixo vira celular, lupa, quarto 2026 com skyline na janela, rua com prédios e carro passando) |
- Tema escolhido pela pesquisa: vídeos de dinheiro/inflação em animação simples de boneco viralizando no BR (ex.: "R$ 10.000 não é dinheiro de rico" 182x a mediana; "Por que seu dinheiro não rende"). Nosso ângulo próprio: viagem no tempo com a nota de 100 + colchão.
- Narração gerada na CONTA NOVA do ElevenLabs (plano Free, 10.000 créditos/mês; este vídeo gastou ~1.130).

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Nota de R$100 desenhada, carrinho de supermercado enchendo, cesta básica (e meia), pão francês, etiqueta de preço pendurada, bomba de gasolina com visor, carro antigo, balança de pratos com cartões de salário, lata, maquininha de etiqueta (remarcadora), gráfico explodindo, colchão levantando, TV de tubo, TV de tela plana, telefone fixo, celular, quadro na parede, luminária pendente, janela com sol/lua/skyline, lupa, sacolas de compra, cofrinho de porquinho, prédios da rua com janelas acendendo.

- 23/11 00:32: usuário achou o vídeo da nota de 1994 CONFUSO (cenário de fundo demais). Regra nova: voltar ao nível do vídeo do TESLA (fundo preto limpo, boneco + 1-3 objetos por momento, título digitado, 1-2 pílulas). Cenário só quando a história pede e com poucos traços. Continua valendo: objetos novos a cada vídeo e muito movimento.


## 23/11/2026 (~06h40) — E se você acordasse no corpo do tubarão que mora no Amazonas?
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Tubarão-cabeça-chata no rio Amazonas: sangue salgado + glândula que joga o sal fora, fígado com menos gordura (vive até ~30 m), sobe >3.000 km até Iquitos (fêmeas grávidas, rio-berçário), pescado em Santarém/Tapajós em 2016; virada: a orca do rio Sena (2022) não sobreviveu 2 meses de água doce | tubarao_amazonas.mp4 | 23/11 ~06:40 (imediato) — https://www.tiktok.com/@pensante_4/video/7711250871572532488 | 1º vídeo com AMBIENTE DE ÁGUA (linha de superfície ondulando + leito com algas) no lugar do chão; boneco "vira" tubarão (água sobe na transformação); mapa com rio sinuoso e tubarãozinho viajando + contador de km; texto da virada SUBINDO DE DENTRO DA ÁGUA com bolhas; vinheta escura nos trechos sussurrados |
- Tema em alta: "E se uma orca caísse no rio Amazonas?" (@paulo00238, 371 mil views, 669x a mediana, 15/11) + "E se você fosse um lobo-guará?" (404 mil). Padrão de gancho: animal fora do lugar + hipótese "e se".
- Nosso ângulo diferente do viral: o viral faz a ORCA enfrentar 6 desafios (pororoca, ariranha, candiru, arraia, Rio Negro, rede). O nosso é sobre o animal que DE FATO vive lá (tubarão-cabeça-chata), em 2ª pessoa ("você é o tubarão"), estrutura primeira/segunda/terceira com adaptações reais + prova (Santarém 2016); a orca entra só como contraste na virada.
- Fontes: Portal Amazônia (INPA, bióloga Lucia Rapp), Catraca Livre, Euronews e Phys.org (orca do Sena, maio/2022).
- Legenda: "Existe um tubarão vivendo a mais de 3.000 km do mar, no meio da Amazônia. 🦈 #fyp #viral #tubarao #amazonia #curiosidades"
- Revisão: 78,8 s, 1080x1080, -14,1 LUFS, true peak -1,6 dB. Créditos ElevenLabs após o vídeo: ~7.600.
- Código: template/lineart/page_tubarao.html + scenes_tubarao.js (kit: shark(), orca(), wave(), drop(), liver(), canoe(), flag(), tree(), oceanWave(), bubbles()) + main_tubarao.js.
- LIÇÃO técnica: linha vertical/horizontal pura com filter="url(#tg)" SOME (caixa do filtro com largura 0) — desenhar sem filtro ou dentro de um grupo com outros elementos.

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Superfície da água ondulando, leito do rio com algas, barbatana cortando a água com rastro, tubarão line-art (boca com dentes, barriga grávida tracejada, filhotes), tubarão inchando, gota de sangue com cristais de sal, glândula pulsando soltando sal, fígado com gota de gordura, seta para baixo, régua de profundidade com linha "30 M", mapa com rio sinuoso + onda do mar + bandeira (Iquitos), barreira tracejada "MAR", canoa com 2 pescadores e linha de pesca, respingos, texto subindo da água com bolhas, orca line-art com coroa, rio que afunila (Sena), contador de dias, pele descamando, margem do rio com barbatana circulando, pílulas SIM/NÃO.


## 23/11/2026 (~06:45) — E se você parasse de tomar café amanhã?
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Cafeína não dá energia, bloqueia a adenosina (a molécula do sono); cérebro cria mais receptores com o uso diário; ao parar, abstinência começa em ~12 h, pior entre o 1º e o 2º dia, normaliza em até ~9 dias; meia-vida ~5 h (café das 16h ainda pela metade às 21h) | cafe_nove_dias.mp4 | 23/11 ~06:45 (imediato) — https://www.tiktok.com/@pensante_4/video/7711298505871985941 | 1º vídeo de CIÊNCIA DO CORPO no line-art; "encaixes" (receptores em U numa membrana) com moléculas que entram/saem: adenosina = hexágono com "Z", cafeína = hexágono+pentágono; fila de cansaço numa caixa tracejada que invade tudo de uma vez; boneco "por dentro" (contorno com líquido pela metade); ciclo café→noite ruim→cansaço com setas girando |
- Tema em alta: "Energia emprestada" (@vsr..lobaoo1, 264 mil views, 242x a mediana, 12/11 — porco e lobo falando de Red Bull/cafeína). Padrão de gancho: afirmação que contraria o senso comum ("não dá energia") + promessa de explicação.
- Nosso ângulo diferente do viral: o viral conta a HISTÓRIA da marca de energético com personagens animais; o nosso é a hipótese "e se você PARASSE amanhã", com o mecanismo de encaixe visual, a linha do tempo da abstinência (12 h → pior dia 1-2 → dia 9) e a virada da meia-vida (café das 4 da tarde ainda está pela metade às 9 da noite).
- Fontes: StatPearls/NCBI (Caffeine Withdrawal; meia-vida ~5 h, sintomas 12–24 h, pico 20–51 h, duração 2–9 dias), Canaltech ("o café não te dá mais energia, te empresta"), Correio Braziliense.
- Legenda: "O café não te dá energia. Ele só empresta... e cobra depois. ☕ #fyp #viral #cafe #cerebro #curiosidades"
- Revisão: 84,3 s, 1080x1080, -14,2 LUFS, true peak -1,7 dB. Créditos ElevenLabs após o vídeo: ~6.260.
- Código: template/lineart/scenes_cafe.js + main_cafe.js (usar com page_tubarao.html renomeado para page.html; carrega scenes.js e main.js).
- LIÇÃO: ElevenLabs Free às vezes responde "Free generations are busy" — nada é cobrado; esperar ~1-2 min e tentar de novo resolve. Câmera com zoom 1,1-1,2 nas cenas de "diagrama" deixa os objetos pequenos legíveis, mas conferir margens (boneco na ponta saía do limite de 12%).

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Xícara/caneca com vapor e pires, raio riscado, lençol cobrindo o boneco ("cansaço escondido"), comanda/conta saindo da xícara, mesa simples, sol nascendo, contorno tracejado de xícara sumida, cérebro line-art, molécula de adenosina (hexágono com Z), molécula de cafeína (hexágono + pentágono), membrana com receptores em U ("encaixes") e trava, caixa tracejada "FILA", fileira de 7 xícaras, banquinho com xícara caindo, ampulheta virando, linhas de dor em volta da cabeça, peso "SONO" caindo na cabeça, rabisco de irritação, régua de dias 1-9 com marcador, proveta com líquido baixando, relógio de 5 horas, sol se pondo + lua com estrelas, boneco transparente com líquido pela metade, balão com xícara, ciclo de 3 setas, fileira de 9 xícaras com X, pílulas AGUENTO/NÃO AGUENTO, botão SEGUIR com ícone de pessoa.


## 23/11/2026 (07:38) — E se o Brasil adotasse o modelo econômico dos EUA? (TEMA PEDIDO PELO USUÁRIO)
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Brasil funcionando como os EUA: carga tributária ~32% do PIB (2025, recorde) × ~25% nos EUA (OCDE); 1.500 h/ano para pagar imposto (Banco Mundial, Doing Business 2020) × <200 h; investidor rápido e empresas de garagem que valem trilhões; renda por pessoa >8x; outro lado: sem SUS, conta de hospital vira dívida, >20 milhões sem plano de saúde, sem 13º nem férias pagas por lei; fecho "mais liberdade e dinheiro × mais responsabilidade" | brasil_modelo_eua.mp4 | 23/11 07:38 (agendado 9 min à frente pelo pacing do vidIQ) — https://www.tiktok.com/@pensante_4/video/7711314379089677589 | Bandeiras line-art BR e EUA (EUA "se desenhando" listra por listra), boneco ACORDANDO deitado no chão, placa "SUA CIDADE", livro de regras que vira a capa BR→EUA, bolso de calça com notas, pizza da produção com fatia saindo (32% × 25%), placa CONTRATA-SE balançando, rolo de papel desenrolando com contador 1.500 H, garagem que vira arranha-céu com janelas acendendo, pilhas de moedas 1 × 8, cartão SUS com X, ambulância, prancheta "$$$$" caindo, grade de pessoinhas, envelope 13º e guarda-sol com X, gangorra LIBERDADE/DINHEIRO × RESPONSABILIDADE, mochila caindo nas costas do boneco |
- Pedido do usuário: tema dele e com MAIS PRÓS do modelo americano. Feito: 3 blocos de prós (bolso, papelada, investimento/renda) + 1 bloco curto do outro lado (saúde, 13º/férias) para dar credibilidade e puxar comentário; sem partidos nem políticos.
- Fontes: Receita Federal/Tesouro (carga 32,4% do PIB em 2025 — Folha PE, Times Brasil), OCDE Revenue Statistics (EUA ~25%), Banco Mundial Doing Business 2020 (Brasil 1.501 h × EUA 175 h; Tax Foundation), CMS/AMA (gastos de saúde dos EUA), CRS (sem seguro).
- Legenda: "E se o Brasil funcionasse igual aos Estados Unidos amanhã? 🇺🇸🇧🇷 #fyp #viral #economia #estadosunidos #brasil"
- Revisão: 74,2 s, 1080x1080, -14,1 LUFS, true peak -1,6 dB. Créditos ElevenLabs após o vídeo: ~5.000.
- Código: template/lineart/scenes_eua.js + main_eua.js.
- LIÇÃO: o vidIQ avisa "pacing too_close" quando 2 posts saem com menos de ~1 h; seguir o suggestedPublishAt.
- 23/11 ~07:50: o USUÁRIO APAGOU do TikTok os vídeos do café (06:45) e do Brasil x EUA (07:38) — o do café ficou sem nenhuma view (provável análise/restrição por postar rápido demais). Eles NÃO contam para o intervalo mínimo de 4 h. Os MP4 continuam no repo (cafe_nove_dias.mp4, brasil_modelo_eua.mp4); só repostar se houver linha "PRÓXIMA RODADA: repostar ..." pedida pelo usuário. Ritmo novo: 3 vídeos/dia (12h, 18h, 21h).

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Bandeira do Brasil line-art, bandeira dos EUA line-art, mastro, boneco deitado levantando, placa "SUA CIDADE", livro de regras, bolso de calça com notas, pizza com fatia, pote, nota de $, placa CONTRATA-SE, gravata desenhada, rolo de papel desenrolando, folha única, quadro "RANKING BANCO MUNDIAL", garagem com portão, estrela de ideia, saco de dinheiro, arranha-céu com janelas, pilhas de moedas, cartão SUS, ambulância com sirene, prancheta de conta, grade de pessoinhas, envelope 13º, guarda-sol, gangorra, mochila, setas de troca ⇄.

## 23/11/2026 — Regras que funcionam pra todo mundo (TEMA PEDIDO PELO USUÁRIO) — agendado 18:00
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Inspirado na frase viral "a gravidade não quer saber se você acredita em Deus" (sem copiar a frase): 4 regras que funcionam igual pra todos — gravidade (martelo e pena na Lua, Apollo 15, 1971), juro composto (a favor: cresce sozinho; contra: rotativo do cartão > 400% a.a.), corpo (~18 h acordado ≈ reflexos de quem bebeu), tempo (86.400 s/dia pra todo mundo); virada respeitosa: fé e essas regras não brigam, uma não cancela a outra | regras_todo_mundo.mp4 | 23/11 18:00 (AGENDADO no vidIQ, postId 06ed70b9) | Superfície da Lua curva com crateras + Terra pequena no céu, astronauta (boneco com capacete), martelo e pena caindo juntos com poeira, seta gigante que o boneco empurra sem mover, quadro "REGRAS DO JOGO", bola de neve rolando e crescendo na rampa, árvore de dinheiro crescendo, cartão de crédito com setas de rotativo girando, taça balançando, bola que o boneco não pega (reflexo), 3 bonecos (gravata/normal/coroa) com o mesmo contador de segundos, quebra-cabeça FÉ + REGRAS encaixando, casa com telhado + escada (boneco recua da beira), tesoura cortando o cartão, fileira final 1-4 para comentar o número |
- Tom: respeitoso com a fé (nunca diz que orar não adianta); a mensagem é "fé + conhecer as regras".
- Fontes: NASA (Apollo 15 hammer-feather drop), Banco Central via Jornal do Comércio (rotativo 444,9% a.a. em ago/2026), Williamson & Feyer 2000 (17-19 h acordado ≈ 0,05% de álcool no sangue).
- Legenda: "Existem regras que não perguntam no que você acredita. Elas só funcionam. 🌍 #fyp #viral #reflexao #gravidade #curiosidades"
- Revisão: 79,4 s, 1080x1080, -14,2 LUFS, true peak -1,7 dB. Créditos ElevenLabs após o vídeo: ~3.700 (a rodada das 12h de hoje também gasta).
- Código: template/lineart/scenes_regras.js + main_regras.js.

## 23/11/2026 (12h) — Se o país inteiro apagasse, quem liga tudo de novo? (black start)
| Data | Tema | Arquivo | Post (BRT) | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Religar um país depois de um apagão: usina precisa de energia pra ligar (bateria morta); hidrelétrica liga sozinha (comporta → água → turbina = black start, "partida no escuro"); não dá pra ligar tudo de uma vez (frequência cai, usina engasga e cai de novo) → bairro por bairro; Espanha abr/2025 religou com hidrelétricas + França e Marrocos, quase tudo só na manhã seguinte; Tucuruí (PA) fez o teste anual de black start em ~28 min (nov/2026) | apagao_religar.mp4 | 23/11 11:36 (imediato) — https://www.tiktok.com/@pensante_4/video/7711375485439102228 | Postes com cone de luz apagando um por um, botão ON gigante que racha ("não existe um botão"), boneco com CAPACETE de operador, painel com alavancas, gerador com tomada vazia "0% ENERGIA", carro que não pega (CLIC CLIC + fumaça) com bateria vazia, barragem com comporta subindo + água tracejada correndo até a turbina girando, medidor de frequência 60 Hz caindo/estabilizando, 4 blocos-bairro acendendo em sequência com faíscas no fio, contorno da Península Ibérica com cidades apagando/religando + setas FRANÇA/MARROCOS + relógio digital 12:33→07:00 "+1 DIA", cronômetro 00:00→28:08, botão "LIGAR" no pedestal com onda de luz |
- Tema em alta: "APAGÃO MUNDIAL dia 17 de novembro às 21h07?" (@guiatoptec, 787 mil views, 832x a mediana, 11/11) — simulação hora a hora de sobrevivência + kit de 72 h da UE. Padrão de gancho: boato datado + "e se for verdade?".
- Nosso ângulo diferente do viral: em vez de "como sobreviver sem luz" (hora a hora, Pix, torres, água, kit), o nosso é "QUEM RELIGA o país e COMO" — a engenharia da volta (black start, bairro por bairro), com prova real (Espanha 2025) e notícia brasileira da semana (Tucuruí). Virada: "não existe um botão" → no fim "você teria coragem de apertar o primeiro botão?".
- ATENÇÃO/LIÇÃO: o 1º roteiro (sobrevivência hora a hora) gastou 1.389 créditos e foi DESCARTADO depois de assistir ao viral, porque repetia a estrutura e os exemplos dele. LIÇÃO: assistir ao viral (vidiq_watch_shortform_content) ANTES de escrever/gerar a voz.
- Fontes: Times Brasil e Aos Fatos (boato do dia 17/11), Yahoo/AP e PBS (Espanha 99% restabelecida na manhã seguinte), Atalayar e Morocco World News (ajuda do Marrocos e da França), DOE (hidrelétricas como recurso de black start), Cenário Energia (Tucuruí: teste anual de black start em 28 min 8 s, nov/2026).
- Legenda: "Se o país inteiro apagasse agora, não existe um botão pra ligar de novo. ⚡ #fyp #viral #apagao #energia #curiosidades"
- Revisão: 80,5 s, 1080x1080 30 fps, -14,3 LUFS, true peak -1,4 dB. Créditos ElevenLabs após o vídeo: 24 (praticamente zerado; o 2º take custou ~1.870 caracteres). A rodada das 21h não terá créditos — precisa de recarga ou narração gravada; renova ~23/12.
- Código: template/lineart/scenes_apagao.js + main_apagao.js. Correção: medidor usa ângulo (ang-180) para 90 = ponteiro em pé.

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Poste de rua com cone de luz, botão ON gigante rachando, capacete de operador, painel com 3 alavancas e luzinhas, gerador com bobina, plugue + tomada, pílula "0% ENERGIA", carro de lado (hatch) tremendo, bateria de carro com +/−, fumaça do escapamento, barragem com reservatório ondulado e comporta, água tracejada correndo, turbina com pás girando, medidor de frequência 60 Hz, blocos-bairro com 9 janelas, fio com faíscas viajando, contorno da Península Ibérica com pontos de cidade, setas de ajuda (FRANÇA/MARROCOS), carimbo "REAL", relógio digital, cronômetro, botão "LIGAR" em pedestal, botão SEGUIR com "+".

## 23/11/2026 — Dois vizinhos, a mesma oração (pedido do usuário, baseado num vídeo de referência) — POSTADO a pedido do usuário
| Data | Tema | Arquivo | Post | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Mesma mensagem do vídeo de referência (Deus governa por leis; Gálatas 6:7 "o que o homem semear, isso também colherá"; a oração não substitui a sua parte; pergunta final), contada como HISTÓRIA SIMPLES: dois vizinhos fazem a mesma oração; o 1º volta pra casa e espera, o 2º ara, planta e tira o mato; a mesma chuva e o mesmo sol caem nos dois (Mt 5:45); 3 meses depois milho × mato; "Deus respondeu: a chuva caiu, só não tinha semente"; exemplos: curso à noite (emprego), primeira nota guardada (dívidas); pergunta: "você é o 1 ou o 2?" | dois_vizinhos_semente.mp4 | 23/11 ~14:33 (postado a pedido do usuário) — https://www.tiktok.com/@pensante_4/video/7711420839765232917 | 1º vídeo com as regras NARRATIVA E CENAS FÁCEIS: tudo literal, mesmo tema do começo ao fim, números 1 e 2 acompanhando os vizinhos o vídeo inteiro (fácil de seguir e vira a pergunta final) |
- Diferente da referência (gravidade/prédio, sistema solar, sorteio, livro/treino, engrenagem, Jesus no monte, vela) e da versão anterior o_que_semear.mp4 (penhasco, presente caindo do céu, pote de sementes, barra de 30 anos).
- Narração: o usuário gerou no app do ElevenLabs (voz Dallin, eleven_v4) por fora e mandou o MP3; tempos das palavras com faster-whisper local (o conector ElevenLabs foi removido; a conta grátis nova levou bloqueio "abuse detection").
- Revisão: 82,3 s, 1080x1080, -14,2 LUFS, true peak -1,7 dB. LIÇÃO: o MP3 do app saiu alto — depois do loudnorm o pico foi a +1,1 dB; colocar alimiter (0.79) depois do loudnorm e medir de novo.
- Código: template/lineart/scenes_vizinhos.js + main_vizinhos.js.

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Ondas de oração em volta da cabeça, pílulas numeradas 1/2 sobre os bonecos, cerca de madeira, casinha com porta que fecha + "Z", enxada, canteiro de terra com sulcos, sementes caindo, mato (tufos), pé de milho crescendo com espiga, cesta com espigas, nuvem com chuva, sol com raios girando, Bíblia fechada com cruz, balão "POR QUÊ?", contorno tracejado de sementes ausentes no subsolo, livro aberto escrevendo linhas, seta, maleta, notebook, lua, etiqueta DÍVIDA, nota caindo no pote, broto nascendo.

## 23/11/2026 — Dinheiro parado no telhado (limpeza de placa solar) — AGENDADO 20:00 a pedido do usuário
| Data | Tema | Arquivo | Post | Melhorias aplicadas |
|---|---|---|---|---|
| 2026-11-23 | Renda extra honesta que ninguém enxerga: limpar placa solar. Brasil com mais de 2 milhões de casas com energia solar (Canal Solar, jul/2026); poeira, folha e cocô de passarinho fazem a placa gerar até 20% menos (Canal Solar, Click Petróleo e Gás); o dono não sobe; serviço com água, escova macia e rodo, sem produto forte; ~10 placas por casa, limpar mais de 1x/ano → cliente recorrente; segurança: curso de trabalho em altura + cinto | placa_solar_dinheiro.mp4 | AGENDADO no vidIQ para 23/11 20:00 BRT (postId 5a834c42), a pedido do usuário | 1º vídeo com CORES REAIS (sol/moedas/raio/aviso/cinto em dourado, água/balde em azul, folha e setas de repetição em verde) e FINAL DE REFLEXÃO (holofote no boneco, 2 pílulas com a pergunta, janelas das casas da rua acendendo em dourado), sem "comenta" |
- Tema em alta: "jeitos honestos de ganhar dinheiro que ninguém enxerga" (@ottoffortuna, 554 mil views, 48x a mediana, 19/11 — limpeza de caixa d'água em animação). Nosso ângulo: outro serviço (placa solar), gancho "dinheiro parado no telhado do seu vizinho", dados reais, aviso de segurança e reflexão "o que as pessoas daqui precisam e ninguém está fazendo?". Sem preço (não achamos valor confiável).
- Narração: o usuário gerou no app do ElevenLabs (Dallin) e mandou o MP3; tempos por faster-whisper local.
- Revisão: 68,0 s (fala 66,1 s), 1080x1080, -14,1 LUFS, true peak -1,9 dB.
- Código: template/lineart/scenes_solar.js + main_solar.js (cores: const GOLD/BLUE/GREEN + PC() = traço colorido; gradiente "cone" para o holofote).

### Objetos/ambientes usados neste vídeo (acrescentar à lista JÁ USADOS)
Casa com placa solar no telhado, moedas douradas girando no telhado, olho riscado, fileira de 5 casas solares, contador "2.000.000+ CASAS", sol dourado, placa solar grande em cavalete com brilho passando, pontos de poeira, folha verde caindo, passarinho voando + cocô, raio dourado encolhendo, pílula "−20% ENERGIA", etiqueta de preço "R$ $$$", raios caindo da placa, dono de gravata tremendo, pílulas SEM TEMPO/SEM ESCADA/MEDO DE ALTURA com relógio/escada/ondas, balde azul com água, gotas azuis, escova macia esfregando, rodo, brilhos de limpo, borrifador com X, grade de 10 placas, setas verdes de repetição "ANO", celular tocando "CLIENTE", triângulo de aviso dourado, boneco no telhado balançando, certificado "CURSO TRABALHO EM ALTURA", cinto dourado com corda até a ancoragem, holofote (cone de luz), casinhas da rua com janela acendendo dourada.
