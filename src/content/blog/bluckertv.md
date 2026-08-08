---
titulo: 'BluckerTV: cinco meses, uma plataforma inteira, um assinante'
resumo: Post-mortem de uma plataforma brasileira de vídeo sob demanda construída sozinho e encerrada por decisão de negócio, não por falha técnica. O que os números ensinaram e por que parar cedo foi a decisão certa.
data: 2026-08-07
idioma: pt
obra: bluckertv
assuntos:
  - PeerTube
  - Infraestrutura
  - Post-mortem
---

A BluckerTV era uma plataforma brasileira de vídeo sob demanda, de propósito
geral. Não era site de gameplay: era infraestrutura de vídeo, construída sobre
o [PeerTube](https://joinpeertube.org), com interface própria, plugins próprios,
distribuição própria, marca registrada, empresa aberta e app publicado na Google
Play.

A ideia vinha de uma perda real. O Videolog, plataforma brasileira que rodou de
2004 a 2015, fechou e levou o acervo junto. A promessa da BluckerTV era a
oposta: **o que você publica não some**. Esse era o diferencial, e adiante fica
claro que era também o problema.

Tudo foi feito por uma pessoa. Desenvolvimento, infraestrutura, DevOps, produto,
jurídico, compliance, moderação e suporte.

## O que rodava por baixo

PeerTube 8.2.3 travado na linha 8.2.x, com política de aplicar só patches.
Node 22 LTS, PostgreSQL 16, Redis 7, nginx, FFmpeg, Ubuntu Server 24.04 num VPS
KVM4. Entrega em HLS com P2P via WebRTC, e transcodificação deliberadamente
enxuta: **dois degraus só, 360p30 e 1080p60**. Nada de 1440p nem 4K, porque cada
degrau extra multiplica custo de CPU e de armazenamento sem multiplicar a
audiência.

Na borda, Bunny CDN com origin shield em Chicago e 88,8% de cache hit, apoiado
em Backblaze B2 como object storage. Cloudflare no DNS, com orange cloud na raiz
e SSL Full Strict.

O app Android era um TWA empacotado a partir do PWA. iOS foi avaliado e adiado
por decisão consciente, não por esquecimento.

### Nove plugins próprios, e uma decisão de arquitetura com função jurídica

Todos em TypeScript, no namespace `peertube-plugin-blucker-*`. **Nada foi
alterado no núcleo do PeerTube**, e isso não era só higiene: o PeerTube é
AGPLv3, e mexer no núcleo abriria a leitura de obra derivada, com obrigação de
abrir o código dos plugins. Fazer tudo por plugin desarmava esse risco.

- **`blucker-copyright`** fazia o fluxo completo de DMCA e marca: notificação,
  contranotificação em 10 dias úteis e painel de casos. Nasceu cheio de crons e
  automação e depois foi refatorado para 100% manual, o que **apagou mais de
  1.500 linhas do próprio código**. Terminou com um expurgo automático que
  anonimiza os dados cinco anos depois do encerramento de cada caso.
- **`blucker-monetizacao`** limitava views por IP por vídeo por dia como
  anti-fraude. O IP saiu de texto puro para hash SHA-256: mantém a função
  anti-fraude e para de reter dado pessoal.
- **`blucker-age-verification`** atendia a Lei 15.211/2025. A arquitetura foi
  escolhida com cuidado: **CPF nunca entrava no cadastro nem no login**. O gate
  disparava só ao abrir vídeo sensível, uma vez por conta, guardado como hash.
- **`blucker-blucks`** era o feed de vídeo curto, com algoritmo de ranqueamento
  próprio.
- **`blucker-ads`** era publicidade sem cookie, sem métrica, sem segmentação:
  banner estático hospedado no próprio servidor, com tempo comprado por rotação.

Mais `blucker-ganhos`, `blucker-voice-search`, `blucker-blust` e
`blucker-livechat`, esse último descontinuado junto com a live.

## O jurídico, escrito do zero

Essa é a parte menos comum num projeto solo, e a que mais consumiu tempo.

Termos de Uso com **29.998 caracteres** em 10 seções, comprimidos de uns 83 mil
da primeira versão, com todas as citações legais auditadas contra fonte oficial.
Política de Privacidade com 9.988 caracteres, mapeando as bases legais do art.
7º da LGPD e os direitos do art. 18.

O achado mais interessante foi um erro no próprio texto: a cláusula sobre
responsabilidade por conteúdo de terceiro repetia o regime antigo do art. 19 do
Marco Civil. Só que o STF declarou o dispositivo parcialmente inconstitucional,
com tese proclamada em junho de 2026. **O texto estava juridicamente
desatualizado antes de o site abrir**, e foi reescrito para remeter à
interpretação fixada pelo Supremo.

A marca foi depositada no INPI em novembro de 2024, classe 41, e **deferida em
junho de 2026**, sem oposição. Ela está em nome de pessoa física, então
sobreviveu ao encerramento da empresa.

## Os números

Recorte público de julho de 2026, da aba de transparência da própria
plataforma:

| Métrica | Julho de 2026 |
| --- | --- |
| Usuários | 72 |
| Vídeos | 270 |
| Visualizações | 3.361 |
| Hospedado | 1,8 TB |
| Assinantes pagantes | **1** |

O plano Blucker+ custava R$ 6,90 por mês e subia a cota de 50 GB para 1 TB. Um
único assinante entrou, em 31 de maio. O saldo final na conta do gateway de
pagamento, no encerramento, era de **R$ 6,18**.

Do outro lado, o custo total ficou em torno de **R$ 8.100**, sendo cerca de
R$ 4.250 em ferramentas de desenvolvimento, R$ 2.850 em servidor e domínios, uns
40 dólares por mês de CDN e storage, mais endereço fiscal e impostos.

A concentração do gasto conta uma história por si só: **abril sozinho foi 75% de
todo o gasto com ferramentas**, e de abril a julho a queda foi de 96%. O pico de
construção e o esfriamento aparecem no extrato antes de aparecer em qualquer
outro lugar.

## Por que acabou

Não foi falha técnica. A plataforma estava no ar, funcionando, com compliance em
dia e app publicado. Acabou por conta.

**A matemática não fechava.** Com marketing projetado em cerca de R$ 1.045 por
mês, seriam necessárias **145 assinaturas de R$ 6,90 só para empatar**. Um
cancelamento já jogava a operação no vermelho.

**E o diferencial era um passivo.** "O que você publica não some" somado a
armazenamento generoso significa pagar storage eterno para quem já cancelou.
Mesmo com 200 ou 300 assinantes, uma onda de cancelamento deixaria o operador
pagando a conta de todo o acervo, sem receita nenhuma. A promessa que vendia o
produto era a mesma que o afundava no longo prazo. Foi por isso que a ideia de
cota ilimitada morreu antes de nascer.

**Faltava resposta para a pergunta central.** Nunca houve uma boa resposta para
"por que alguém usaria isso em vez do YouTube". O caso de uso original, arquivar
os próprios vídeos, já tinha sido abandonado antes disso.

**O risco estava invertido.** A plataforma era bancada pela receita do canal no
YouTube. Ou seja, o projeto que existia como plano B contra uma desmonetização
estava consumindo exatamente a renda que deveria proteger. Ele amplificava o
risco em vez de diluir.

**A ordem de construção estava errada.** Infraestrutura, compliance e marca
vieram antes de validar demanda. Quando o marketing entrou na pauta, já havia
cinco meses de custo fixo acumulado e nenhum sinal de mercado.

## O que parar cedo economizou

A decisão veio **antes** de gastar os R$ 500 a R$ 1.000 mensais previstos em
anúncio. Ao longo de um ano isso somaria de R$ 6 mil a R$ 12 mil, com o mesmo
resultado. Parar em agosto custou bem menos do que teria custado parar em
dezembro.

O encerramento foi executado inteiro, não abandonado: empresa baixada com
certidão, declaração de extinção transmitida, conta bancária encerrada, endereço
fiscal cancelado por escrito, cartões removidos de todos os fornecedores e
renovação automática desligada em tudo. A marca no INPI ficou preservada.

A perda líquida real ficou em torno de **R$ 5.500**, descontando o servidor
ainda utilizável até março de 2027 e a parcela dos impostos que foi contribuição
previdenciária.

## O que sobrou de aprendizado

**Incidentes de produção resolvidos**, que é onde se aprende de verdade:

- Um backup do banco ficou publicamente acessível através da CDN. Encontrado e
  removido.
- Seletores DKIM quebrados derrubaram a entregabilidade do domínio inteiro e
  levaram a uma listagem no Spamhaus. Resolvido com SPF, DKIM e DMARC
  realinhados, terminando com nota 9,5 de 10 no mail-tester.
- Um `npm install` disparado no diretório errado quase levou a instalação
  junto. Recuperado do backup, com zero downtime.
- Uma regra de lifecycle do storage ficou em 1 dia depois de um teste e passou
  mais de um mês assim. Descoberta e corrigida, com a descoberta extra de que o
  painel web do fornecedor sobrescreve silenciosamente um campo que ele nem
  exibe.

**Contribuições ao PeerTube**, sob o handle
[@lipfelipef](https://github.com/lipfelipef): duas issues resolvidas, cinco
abertas e um PR. Uma delas, sobre a janela de estatísticas de canal, foi
assumida por outro contribuidor com aval do mantenedor e virou um recurso
completo no projeto, com seletor de período e agregação por semana e mês.

**Um reporte de segurança** ao Framasoft, mantenedor do PeerTube: uma falha de
verificação de conta na versão 8.2.3, com severidade média avaliada em CVSS 4.3,
comunicada pelo canal oficial de segurança. Os detalhes técnicos ficam fora
deste texto de propósito, porque outras instâncias rodam a mesma versão.

## O resumo honesto

Cinco meses, uma plataforma inteira em produção, nove plugins, uma marca
deferida, uma empresa aberta e fechada corretamente, um app publicado, um
reporte de segurança aceito e uma contribuição incorporada a um projeto open
source de porte.

E um assinante.

As duas metades são verdade ao mesmo tempo, e é justamente por isso que este
texto existe. A parte técnica ensinou infraestrutura, vídeo, licenciamento e
regulação. A parte de negócio ensinou uma coisa mais difícil: **construir bem
não é o mesmo que construir algo que alguém quer**, e a hora de descobrir isso é
antes de assinar o primeiro boleto, não depois do quinto.
