---
titulo: 'Biblioteca Virtual: meu TCC, dois anos depois'
resumo: Um sistema de biblioteca em Django, feito no técnico em 2024. Revisitado hoje, ele ensina mais pelos erros que ficaram no repositório do que pelo que funcionava.
data: 2026-08-07T23:40:00-03:00
atualizado: 2026-08-08T00:10:00-03:00
idioma: pt
obra: biblioteca-virtual
endereco: biblioteca-virtual
assuntos:
  - Python
  - Django
  - Segurança
---

A Biblioteca Virtual foi o Trabalho de Conclusão de Curso do Ensino Médio
Técnico em Informática para Internet, feito em grupo em novembro de 2024, na
Escola Estadual Prof. Luiz Simione Sobrinho.

É um sistema de acervo em **Django**: cadastro de livro, autor, gênero e
idioma, cada exemplar com status de empréstimo, login de usuário e uma área de
bibliotecário que renova prazo. Banco em SQLite, templates em HTML, um pouco de
CSS próprio.

## A parte honesta primeiro

O projeto foi construído **em cima do tutorial LocalLibrary da MDN**, o guia de
Django da Mozilla. Dá para ver no código sem esforço: a pasta do projeto se
chama `locallibrary`, os modelos são `Book`, `BookInstance`, `Author`, `Genre`,
e o campo de falecimento do autor está escrito exatamente como no tutorial,
`models.DateField('died')`.

Digo isso de saída porque é o contrário de demérito. **Primeiro contato com
framework web seguindo um tutorial bom é como quase todo mundo aprende**, e
esconder isso é que seria estranho num site que tem "o que não deu certo entra
com a mesma ficha" escrito na entrada.

O que o grupo acrescentou por cima: o modelo de `Language`, que é um exercício
proposto no fim do tutorial e não vem pronto, o índice reescrito, o CSS e a
identidade da escola.

## O que ele ensinou

**ORM e migração.** São cinco arquivos de migração no repositório, e eles
contam a evolução do modelo: a primeira cria o esqueleto, a segunda troca o
modelo de exemplo pelos quatro de verdade, a terceira adiciona o campo de quem
pegou o livro emprestado, a quarta mexe na ordenação, a quinta introduz idioma.
Ler essa sequência é ler o projeto sendo pensado.

**Modelagem de verdade.** A ideia central do sistema é a diferença entre
`Book` e `BookInstance`: o livro é a obra, a instância é o exemplar físico na
prateleira. A biblioteca tem um "Dom Casmurro", mas três cópias, e só uma está
emprestada. Quem nunca modelou isso acha que livro é uma tabela só, e essa
distinção é a primeira aula de modelagem que presta.

**Permissão, não só login.** Tem tela de login, recuperação de senha e uma área
que só bibliotecário acessa. É diferente de "tem usuário logado": é usuário com
papel.

## O que eu faria diferente hoje

Aqui está o motivo real deste texto. Revisitei o repositório em agosto de 2026
e achei quatro coisas que hoje eu não deixaria passar.

**A chave secreta do Django está no repositório.** O `SECRET_KEY` do
`settings.py` foi commitado junto com o resto, em repositório público. No caso
específico o estrago é pequeno: é a chave de desenvolvimento que o próprio
Django gera com prefixo `django-insecure-`, o projeto tem `DEBUG = True` e
`ALLOWED_HOSTS` vazio, ou seja, nunca foi para produção. Mas a lição vale
inteira: **chave vai para variável de ambiente, não para o commit**, e o
histórico do git é permanente.

**O banco de dados foi commitado.** Tem um `db.sqlite3` de 245 KB no
repositório. Banco de desenvolvimento não entra em git: ele muda toda hora,
suja o histórico e, dependendo do que tem dentro, publica dado de gente que
não pediu para ser publicado.

**Arquivo compilado no repositório.** As pastas `__pycache__` estão todas lá.
São artefatos que o Python gera sozinho e que um `.gitignore` de três linhas
resolveria.

**Uma pasta chamada `catalog - Copia`.** Ficou uma cópia inteira dos templates,
com o nome que o Windows dá quando alguém aperta Ctrl+C e Ctrl+V. É o backup
manual de quem ainda não confia no controle de versão, e é justamente o que o
git existe para tornar desnecessário.

## O que eu fiz a respeito

Escrever tudo isso e deixar como estava seria estranho, então limpei o
repositório.

O banco, os `__pycache__` e a pasta duplicada saíram do **histórico inteiro**,
não só do estado atual. Essa distinção é o ponto: tirar um arquivo num commit
novo não tira ele do passado, e no git o passado continua baixável por qualquer
um. A chave passou a vir de variável de ambiente. Entraram um `.gitignore`, um
`requirements.txt` com a versão do Django da entrega e um `README` explicando
como rodar o projeto do zero, já que sem banco versionado é preciso criar um.

O código de 2024 não mudou uma linha. Comparei arquivo por arquivo, antes e
depois: os 58 arquivos batem, e a única diferença em todo o repositório é a
linha da chave.

E sobrou uma curiosidade que eu não esperava. O repositório tinha dois commits,
"falta algumas partes" e "90% completo". Quando o banco saiu do histórico, o
segundo virou vazio: a única coisa que ele mudava era o `db.sqlite3`, que
engordou 4 KB porque alguém abriu o sistema e clicou em algumas telas. Meses de
trabalho couberam em um commit só, e o outro era o banco crescendo.

## Por que isso está aqui

Nenhum desses quatro erros aparece no site rodando. O sistema funciona, a
banca aprovou, o curso terminou.

Eles apareciam quando alguém abria o repositório, que é exatamente o que um
recrutador faz. E eu só enxerguei os quatro porque **hoje sei o que procurar**,
o que dois anos atrás eu não sabia.

É por isso que este projeto continua na coleção em vez de ser apagado. A
distância entre o que eu fiz em 2024 e o que eu enxergo em 2026 é a informação
mais útil que essa pasta guarda.
