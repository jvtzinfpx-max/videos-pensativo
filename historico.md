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
- Mudou para **3D neon minimalista**: fundo preto, ícones/objetos 3D glossy com destaque verde neon, poucos elementos por plano, câmera orbitando. Template em `template/neon/` (vira o padrão). Bonecos 3D só às vezes, quando a história tem pessoa.
- Lições do teste: símbolos extrudados precisam de `scale(sc,-sc,-sc)` (senão as faces somem); fonte helvetiker não tem Ã → usar Poppins TTF; branco puro estoura no bloom → usar cinza claro 0xd9d9d9 e env 0.38; cards 3D muito perto da câmera saem cortados.
