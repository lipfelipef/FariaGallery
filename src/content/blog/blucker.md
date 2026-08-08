---
titulo: 'Blucker: dinheiro de mentira, defesas de verdade'
tituloBusca: 'Blucker: dinheiro falso, defesa real'
resumo: Um e-commerce de faculdade onde quase todo o trabalho foi para coisas que ninguém vê na tela. Tratar dinheiro de mentira como real é o treino que vale.
data: 2026-08-08T01:25:00-03:00
idioma: pt
obra: blucker
endereco: blucker
ordem: 8
assuntos:
  - Angular
  - Node.js
  - Segurança
---

O Blucker é uma loja de jogos digitais: catálogo, carrinho, checkout, pedido,
rastreio, avaliações e painel administrativo. Angular 19 na frente, uma API
própria em Node e Express atrás, com 36 endpoints. Foi o Projeto Integrador do
2º semestre de Análise e Desenvolvimento de Sistemas no Senac, feito em dupla
com José Victor Souza, sob orientação do Prof. Evandro Carlos Teruel.

Antes de continuar, um esclarecimento que a coleção pede: **Blucker não é
BluckerTV**. Este aqui é o trabalho de faculdade. A [BluckerTV](/blog/bluckertv)
era uma plataforma de vídeo, com empresa aberta e marca registrada, e tem o
post-mortem dela em outro texto. O nome é o mesmo por gosto pessoal, e é só isso.

## O que dá trabalho não é o que aparece

Um e-commerce parece um CRUD com carrinho. A tela engana: a lista de produtos, o
botão de adicionar, o total somando. Tudo isso sai rápido.

O tempo foi embora em outro lugar, e é sobre esse lugar que vale escrever. Quatro
decisões do servidor, nenhuma delas visível para quem usa, todas elas a diferença
entre um exercício e um sistema.

**O servidor não acredita no preço que o cliente manda.** O checkout recebe o
carrinho, joga fora os valores que vieram junto e recalcula tudo a partir do
banco, incluindo os 5% de desconto do PIX. Parece paranoia num trabalho escolar,
onde ninguém vai adulterar nada. É o hábito certo: o cliente é território
inimigo, e qualquer número que ele mande é sugestão, não fato.

**Clicar duas vezes em "finalizar" não gera dois pedidos.** Cada tentativa leva
uma chave de idempotência; a mesma chave dentro de 60 segundos devolve o pedido
que já existe, em vez de criar outro. Esse bug é clássico, aparece em loja de
verdade, e a correção não é desabilitar o botão no front. É o servidor saber
reconhecer que aquela é a mesma intenção chegando duas vezes.

**Toda gravação é atômica.** Escreve num arquivo temporário, depois renomeia, e
tudo isso passa por uma fila de promises para que duas requisições simultâneas
não se atropelem. Rename é operação atômica no sistema de arquivos: ou o arquivo
novo está inteiro no lugar, ou continua o antigo. Nunca metade dos dois.

**O login demora igual para conta que existe e conta que não existe.** Quando o
e-mail não está cadastrado, o servidor calcula o hash mesmo assim, contra um
valor descartável, só para gastar o mesmo tempo. Sem isso, dá para descobrir
quais e-mails têm conta na loja apenas cronometrando as respostas: o certo
demora, o errado volta na hora. A comparação também é feita em tempo constante,
com `timingSafeEqual`.

## A limitação que virou o aprendizado

Aqui está a parte que eu mais gosto de contar, porque é o contrário do que se
espera de um trabalho de faculdade.

**A persistência do Blucker é um arquivo JSON.** Não tem PostgreSQL, não tem
MySQL, não tem ORM. É um `db.json` que o servidor lê e reescreve.

É uma limitação real, e num sistema de verdade seria a primeira coisa a trocar.
Só que foi exatamente ela que obrigou a escrita atômica a ser feita à mão. Um
banco de verdade resolve concorrência, escrita parcial e corrupção por você, e
você nunca precisa entender o problema. Com um arquivo JSON, você precisa. Você
descobre na marra que duas escritas ao mesmo tempo estragam o arquivo, e vai
aprender o que é transação porque a falta dela apareceu na sua frente.

A ferramenta pobre ensinou o conceito que a ferramenta boa esconde.

## O que estava errado quando foi entregue

O trabalho foi entregue, avaliado e aprovado. Meses depois, ao preparar o
repositório para ficar público, revisei tudo com calma e achei duas coisas que
não podiam ir para o GitHub daquele jeito.

**As senhas estavam em texto puro.** No banco entregue, o campo de senha
guardava exatamente o que o usuário digitou, legível para qualquer um que
abrisse o arquivo. Não havia salt, não havia hash, não havia nada. Hoje cada
usuário tem um salt próprio e a senha passa por `scrypt`, usando só o módulo
`crypto` do Node, sem dependência de terceiro.

**O banco de desenvolvimento tinha ido junto.** Junto com o código foi também o
`db.json` real de quando estávamos testando, com contas nossas de verdade
dentro, incluindo um e-mail pessoal meu. Hoje o `db.json` não é versionado:
o repositório traz um `db.seed.json` com catálogo e contas fictícias, e o
servidor cria o banco a partir dele na primeira execução.

Escrever isso é constrangedor na medida certa. As duas falhas são de manual, e
nenhuma delas apareceu enquanto o sistema estava rodando na apresentação. Elas
apareceram quando alguém foi olhar o repositório, que é precisamente o que um
recrutador faz.

## O resto, em números

Trinta e seis endpoints REST. Rotas todas carregadas sob demanda, o que deixa o
primeiro carregamento em 96 kB. Sessenta e cinco testes de ponta a ponta
passando. Rate limiting próprio nas rotas de login, escrita e upload.
Autorização checada por recurso, e não só por estar logado: lista, avaliação e
pedido conferem quem é o dono, porque estar autenticado não é o mesmo que ter
direito àquele registro.

Do lado da loja, o que se espera de uma: busca, filtro, promoções, avaliações
com voto de utilidade, listas de desejos, múltiplos endereços, validação de CPF
por dígito verificador, endereço preenchido por CEP e um rastreio simulado com
transportadora e estágios de entrega.

## Por que ele continua na coleção

Porque a distância entre "funciona na apresentação" e "aguenta ser público" é o
assunto deste site, e o Blucker mostra as duas pontas dessa distância no mesmo
projeto.

O que o professor avaliou foi a loja funcionando. O que eu treinei de verdade
foi desconfiar do cliente, não perder dado no meio de uma escrita, e não deixar
o tempo de resposta contar segredo. Nada disso tem tela.
