---
titulo: 'Um dia, dez dólares e nenhum servidor'
resumo: A BluckerTV custou R$ 8.100 em cinco meses. Este site custou US$ 10,46 por ano e ficou pronto em um dia. A diferença não é economia, é adequação.
data: 2026-08-08T19:30:00-03:00
idioma: pt
obra: fariagallery
endereco: um-dia-e-dez-dolares
ordem: 9
assuntos:
  - Astro
  - Cloudflare
  - Faria Gallery
---

Em 6 de agosto de 2026 a BluckerTV foi encerrada. Empresa baixada, cartões
removidos de todos os fornecedores, renovação automática desligada em tudo. A
decisão daquele dia foi explícita: nenhum projeto empreendedor novo por vários
anos, foco em terminar a faculdade e entrar em CLT.

Quatro horas depois eu já estava discutindo três ideias de SaaS para ganhar
dinheiro rápido, incluindo um site em cima do hype de GTA 6.

No dia seguinte abandonei todas em favor deste site aqui, e o motivo da troca é
o assunto deste texto. As ideias de SaaS dependiam de acertar demanda de
mercado, que é exatamente a coisa que cinco meses de BluckerTV tinham acabado
de mostrar ser difícil. Um portfólio não depende de demanda nenhuma, porque o
conteúdo já existia: eram os projetos que eu já tinha feito.

## O problema era mandar três links

Quando alguém pedia para ver meu trabalho, eu mandava três endereços. GitHub
para o código, LinkedIn para o histórico, canal para o resto. Três formatos,
três contextos, e nenhum dos três contando a história inteira.

O GitHub em particular tem um defeito que ninguém comenta: **ele mostra
arquivo, não decisão.** Quem abre um repositório vê uma pasta com trinta
arquivos e nenhuma pista do que foi difícil, do que quase deu errado, ou do
porquê de a coisa ser daquele jeito. É a parte menos interessante do trabalho,
apresentada como se fosse a única.

## O que não entrou, e por quê

A parte útil de uma escolha de stack não é o que ficou. É o que foi descartado.

**Angular saiu primeiro, e era o candidato óbvio.** Foi o que aprendi no
segundo semestre e o que eu reaproveitaria com menos esforço. Não entrou porque
é ferramenta para aplicação com muito estado, e isto aqui é site de conteúdo.
Usar Angular me obrigaria a montar renderização no servidor só para não quebrar
o SEO, carregaria um pacote pesado sem necessidade e complicaria a manutenção
pelos anos seguintes.

**Next.js seria a escolha com mais valor de mercado**, e foi descartada por
custo de aprendizado: exigiria aprender React antes, o que atrasaria o site em
meses. E o relógio do buscador só começa a contar quando o site existe.

Fica o registro honesto: **Astro não vale quase nada como palavra-chave de
currículo.** Ninguém abre vaga de "desenvolvedor Astro". A escolha foi por
adequação à tarefa, não por empregabilidade, e é bom saber a diferença entre as
duas coisas na hora de decidir.

**O Tailwind entrou depois de ter sido descartado.** O argumento contra era "é
mais uma coisa para aprender", e o argumento era ruim: quem já sabe CSS aprende
Tailwind em um fim de semana. Ele entrou por três motivos práticos, e nenhum
deles é moda: escala de espaçamento e tipografia prontas, que dão consistência
visual a quem não é designer; o estilo morando na marcação, que é o que salva a
manutenção depois de meses sem abrir o projeto; e o ecossistema, porque
praticamente todo tema e exemplo de Astro já vem nele.

## Nenhum servidor, e isso é uma decisão de arquitetura

O site é publicado no Cloudflare Workers, e não no Pages, que era a recomendação
antiga. Desde março de 2026 o Workers tem paridade de recursos para site
estático, e a orientação oficial para projeto novo é começar direto por ele.

O detalhe que muda a conta é este: **requisição a arquivo estático não consome
cota.** O limite de cem mil requisições por dia do plano gratuito vale para
requisição que executa código, e este site não executa nenhuma. Ele é um monte
de HTML pronto.

E há um ganho que só aparece daqui a alguns anos: se um dia isto precisar de uma
API ou de um banco, dá para acrescentar sem trocar de plataforma.

## A newsletter que morreu antes de nascer

A newsletter estava no plano original. Foi cortada por motivo jurídico, e não
por preguiça.

Newsletter significa coletar e-mail, e e-mail é dado pessoal. Isso traz de volta
política de privacidade, consentimento explícito no formulário e link de
descadastro em toda mensagem, que é exatamente o pacote que tinha consumido
meses da BluckerTV. Entrou RSS no lugar: quem quiser acompanhar assina no
leitor, e o e-mail nunca passa por aqui.

O custo real dessa decisão foi zero, porque não havia audiência nenhuma para uma
newsletter.

Vale o paralelo com a plataforma que acabou de fechar. Lá, a decisão de fazer
tudo por plugin em vez de mexer no núcleo do PeerTube foi uma decisão de
arquitetura tomada por causa da licença AGPL. Aqui, a decisão de não ter
formulário foi uma decisão de arquitetura tomada por causa da LGPD. É o mesmo
padrão nos dois: **a restrição jurídica desenhando a solução técnica**, e nos
dois casos o resultado ficou mais simples do que seria sem ela.

Termos de uso também não existem, e não existem de propósito: ninguém aceita
nada aqui, não há conta nem serviço prestado.

## O que não tem, de propósito

Sem back-end. Sem banco de dados. Sem formulário. Sem login. Sem painel
administrativo. Sem cookie.

A consequência disso é uma lista curta e boa: hospedagem de graça, superfície
de ataque quase nula, nada para atualizar por segurança, e um site que continua
no ar mesmo se ficar seis meses sem ninguém encostar nele.

## Os números

| | BluckerTV | Este site |
| --- | --- | --- |
| Tempo até estar no ar | 5 meses | 1 dia |
| Custo | R$ 8.100 | US$ 10,46 por ano |
| Hospedagem | VPS, CDN e object storage | R$ 0 |
| Servidores para manter | 1 | nenhum |
| Bancos de dados | 2 | nenhum |
| Resultado | 1 assinante pagante | 40 páginas em 3 idiomas |

A comparação é injusta de propósito, e é aí que está a lição. Não são projetos
do mesmo tipo, e nem deveriam custar o mesmo. Uma plataforma de vídeo precisa
mesmo de servidor, de transcodificação e de banco. Um portfólio não precisa de
nada disso, e gastar com isso teria sido erro, não zelo.

**A diferença entre os dois números não é economia. É perguntar do que o
problema é feito antes de escolher a ferramenta.** A BluckerTV custou caro
porque era cara; este site é barato porque o problema dele é barato. O erro
possível aqui seria o inverso: montar servidor, banco e painel para publicar
texto que não muda.

## O que veio de brinde

Escrever a ficha de cada projeto me obrigou a reabrir repositórios antigos, e
reabrir código com dois anos a mais de experiência mostra coisas que não
apareciam quando o sistema estava rodando.

Achei senha guardada em texto puro, chave de configuração commitada, banco de
dados versionado com conta de gente real dentro. Nenhum desses problemas dava
sinal com o sistema funcionando. Todos apareciam ao abrir o repositório, que é
exatamente o que um recrutador faz.

O portfólio existia para exibir os projetos e acabou funcionando como auditoria
deles. Isso rende um texto inteiro por si só, e vai ficar para o próximo.
