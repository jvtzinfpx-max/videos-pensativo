# Template 3D (Three.js) — USAR ESTE em todos os vídeos novos

## FORMATO (atualizado 22/11 — o que está em alta no TikTok BR)
- **VERTICAL 9:16, 1080x1920, 30 fps** (os vídeos que viralizam ocupam a tela inteira; nada de 4:3).
- **Legenda dinâmica palavra por palavra** (`#caps`): preencha `window.WORDS = [{w, s, e}, ...]` com as palavras da transcrição do ElevenLabs em tempo GLOBAL (sem as tags [..]). Grupos de 3 palavras, palavra falada em amarelo com pop.
- **Gancho em texto GRANDE nos primeiros ~2 s** (`hook` da cena 1, pode usar `<br>`), com corte/troca de plano rápido logo depois.
- **Zona segura do TikTok**: nada importante à direita de x≈930 (botões) nem abaixo de y≈1600 (legenda/descrição do app) nem acima de y≈130. Título em y≈150, legenda em y≈1150, card em y≈1380. Enquadre os personagens/objetos no meio da tela (câmera olhando ~0,8–1 m de altura).
- Sem música de fundo (preferência do usuário), só voz + efeitos.

Pedido do usuário: TUDO em 3D de verdade (cenários, ambientes, personagens, objetos e ícones) e movimentos certos.

## Preparar
```
cp -r template/3d /home/claude/<tema> && cd /home/claude/<tema>
npm i three@0.170.0          # (registry npm liberado)
mkdir -p aud out && cp <voz>.mp3 aud/voz.mp3
```
Chrome headless com WebGL via swiftshader (já configurado nos scripts). ~0,5 s por frame por processo; máquina tem 2 CPUs → rode 2 processos em paralelo.

## Arquivos
- `engine.js` — motor: renderer com sombras, luz principal + contraluz + preenchimento, bloom (glow dos personagens), névoa, câmera com drift (`cam`), UI 2D por cima (título/cards/hook).
  - **Personagem** `new E.Person({h, w, acc:[...]})` — boneco 3D branco articulado (quadril, coluna, peito, pescoço, cabeça, ombro/cotovelo/punho, quadril/joelho/tornozelo), SEM boca e sem rosto. Acessórios: suit, tie, vest, cap, police, helmet, beanie, glasses, shades, longhair, bun, pony, skirt, beard, backpack, badge, chef, briefcase, phone, cane. `h` 1 = adulto, 0.6 = criança; `w` = porte.
  - **Movimento** `E.animate(person, t, track, [x,z], face)` com track `[{t, pose, to:[x,z], dur, after, face}]` — anda/corre até o ponto (pés sincronizados pela distância), vira o corpo suavemente e troca de pose com mistura de 0,35 s.
  - **Poses** (procedurais, nunca paradas): idle (respira, balança, olha), walk (contato/queda/passagem/subida, quadril × ombro em contra-rotação, braços opostos, cabeça estável), run, point, cheer (pulos), think, scared (treme), sad, give, hold, carry, dig, sit, type, wave, shrug, crouch, anticip (antecipação antes de pular/correr).
  - **Kit de cenário**: floor, wall, building (janelas que acendem), tree, lampPost (com luz), car (rodas), table, chair, door (abre), screenBox (tela com textura), dust (partículas).
  - **Ícones/objetos 3D**: coin ($ em relevo), bill (nota com textura), goldBar, moneyBag, padlock (abre), phone3d, qmark (? 3D), diamond, crown3d, text3d (texto 3D com bevel), labelTex (textura de texto para placas/telas).
  - Cores reais em `E.C` (gold, dollar, red, blue, wood, brick, water, grass, stone, steel...). Céu/fundo SEMPRE preto/cinza.
- `page.html` — exemplo com 2 cenas (rua à noite / cofre). Cada cena: `{title, hook?, cards, build(), at(scene,t), sfx()}`. `window.T = {DUR:[...], CUE:{...}}` igual ao template antigo; `C_(chave, padrão)` lê cues.
- `snap3d.py <proj> cena:t ...` — frames de checagem (mostra erros JS).
- `render3d.py <proj> <cenas...>` — renderiza out/s<i>.mp4.
- `audio3d.py <proj>` — voz contínua (aud/voz.mp3) + efeitos de `sfx()` → out/voice.wav e out/fx.wav (mesma biblioteca de sons do template 2D; adicione sons novos no LIB/LEVEL).

## Regras de movimento (pesquisa de animação)
- Caminhada: 4 poses (contato, queda, passagem, subida), quadril cai no "down", braços opostos às pernas, quadril e ombros giram em sentidos contrários, cabeça sem tranco.
- Antecipação antes de ação forte (anticip → run/cheer), follow-through (cabelo), slow-in/slow-out (eio/ease), arcos.
- Ninguém parado: idle sempre respira e mexe a cabeça; câmera sempre com drift; objetos girando/flutuando; partículas no ar.
- Cortes e mudanças visuais frequentes (canais 3D que bombam no TikTok BR usam ritmo rápido e muitas trocas de plano).
