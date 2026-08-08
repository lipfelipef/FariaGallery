---
titulo: 'Quiz Animado: dois fatores para acertar desenho dos anos 2000'
resumo: Um quiz offline de doze perguntas que tem cadastro validado, PIN de dois fatores, recuperação de senha e hash BCrypt. O exagero é o assunto do texto.
data: 2026-08-08T01:40:00-03:00
idioma: pt
obra: quiz-animado
endereco: quiz-animado
ordem: 4
assuntos:
  - Java
  - JavaFX
  - SQLite
---

O Quiz Animado é um jogo de perguntas sobre desenhos animados dos anos 2000.
Doze perguntas sorteadas por partida, quinze segundos cada uma, som de acerto e
de erro, botão que fica verde ou vermelho, e um ranking em que o pódio tem cor:
ouro, prata e marrom. Abre numa janela de 1280 por 720, sem terminal nenhum.

Java com JavaFX, banco SQLite, Maven. Feito sozinho, em setembro de 2025.

## O exagero que vale explicar

Para jogar esse quiz, você precisa criar uma conta. O cadastro valida o nome de
usuário, exige senha com mais de cinco caracteres e confere se o e-mail tem
arroba. Depois vem um **PIN de verificação em dois fatores**. Existe logout.
Existe recuperação de senha por código. A senha é guardada com hash **BCrypt**.

Nada disso é necessário. É um jogo de uma pessoa só, que roda no computador
dela, com um banco de dados que mora na mesma pasta do programa. Não há servidor
para invadir, não há outro usuário de quem se proteger, não há nada em jogo além
de quantos desenhos você lembra.

Escrevo isso sem nenhuma vergonha, porque o exagero era o ponto. **O quiz era a
desculpa; o sistema de contas era o exercício.** Autenticação é um daqueles
assuntos em que ler sobre não ensina quase nada e implementar ensina tudo: onde
guardar a senha, o que fazer quando o usuário já existe, como devolver alguém
que perdeu o acesso, por que o hash precisa ser lento de propósito. Aprender isso
num projeto onde ninguém se machuca é o momento certo de aprender.

## A parte que é game design, não código

A dificuldade é adaptativa. Acertando, as perguntas sobem para médio e depois
para difícil. Errando, voltam para médio ou fácil.

Isso parece pequeno e não é. Um quiz comum sorteia doze perguntas e pronto: quem
sabe muito acha fácil, quem sabe pouco desiste na terceira. O ajuste dinâmico
tenta manter todo mundo na faixa onde ainda dá vontade de continuar. É um laço de
realimentação simples, do tipo que existe em jogo de verdade, e é a diferença
entre um formulário com pontuação e uma coisa que se joga.

A barra de quinze segundos age na mesma direção, por outro caminho: ela impede
que a partida vire consulta. Você responde com o que lembra, e lembrar é
justamente o assunto de um quiz de nostalgia.

## Um contraste que só apareceu escrevendo

Este projeto é de setembro de 2025 e guarda senha com BCrypt, cada uma com o seu
custo de processamento, do jeito certo.

O [Blucker](/blog/blucker), que veio depois e é muito maior, foi entregue com
**senha em texto puro**. Só virou hash meses depois, quando preparei o
repositório para ficar público.

O sujeito é o mesmo, e o mais novo é que estava pior. Não é falta de
conhecimento: em setembro eu já sabia. É o que acontece quando o escopo cresce e
o prazo aperta. Num projeto de doze perguntas dá para caprichar no login, porque
o login é quase tudo que existe. Num e-commerce com trinta e seis endpoints, o
login vira mais um item de uma lista enorme, e o que é "só um detalhe do
cadastro" passa batido até a entrega.

A lição prática é chata e verdadeira: **as coisas que não podem sair erradas
precisam estar prontas antes de o projeto ficar grande**, porque depois elas
competem por atenção com funcionalidade visível, e funcionalidade visível ganha
sempre.

## Por que ele continua na coleção

Porque é o projeto mais desproporcional que eu tenho, e a desproporção conta uma
coisa verdadeira sobre estudar programação: **o tamanho do projeto raramente é o
tamanho do que se aprendeu com ele**.

Um jogo de doze perguntas sobre desenho animado com dois fatores de autenticação
é engraçado. Também é onde eu escrevi meu primeiro fluxo de conta inteiro,
começo ao fim, sem tutorial dizendo o próximo passo.
