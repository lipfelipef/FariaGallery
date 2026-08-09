---
titulo: 'Faria Gallery: o portfólio auditou os projetos'
tituloBusca: 'O portfólio auditou os projetos'
resumo: Escrever a ficha de cada projeto me obrigou a reabrir repositórios antigos. Achei senha em texto puro, chave commitada e banco com conta de gente real.
data: 2026-08-08T23:40:00-03:00
idioma: pt
obra: fariagallery
endereco: o-portfolio-auditou
ordem: 10
assuntos:
  - Segurança
  - Git
  - Faria Gallery
---

Este site existe para mostrar o que eu construí. O efeito colateral não estava
no plano: para escrever a ficha de cada obra, eu precisei reabrir repositórios
que estavam parados havia meses ou anos. E reabrir código com dois anos a mais
de experiência mostra coisas que não apareciam quando o sistema estava rodando.

Nenhum dos problemas abaixo dava sinal com o sistema funcionando. Todos
apareceram ao abrir o repositório, que é exatamente o que um recrutador faz.

## Biblioteca Virtual, o TCC de 2024

O trabalho de conclusão do técnico, em Django. Quatro achados.

**A chave secreta do Django estava commitada no `settings.py`**, em repositório
público. O dano concreto é pequeno, e vale explicar por quê: era chave de
desenvolvimento, daquelas que o próprio Django gera com o prefixo
`django-insecure-`, com `DEBUG = True` e `ALLOWED_HOSTS` vazio. Nunca foi para
produção. A lição continua inteira, porque o hábito é o mesmo com uma chave que
importa: o histórico do git é permanente, e apagar num commit seguinte não
resolve nada.

**O banco de dados estava versionado**, um `db.sqlite3` de 245 KB. **As pastas
`__pycache__` também**, inteiras. E havia **uma pasta chamada `catalog - Copia`**,
com o nome que o Windows dá ao Ctrl+C Ctrl+V: backup manual de quem ainda não
confiava no controle de versão.

A correção não foi apagar do estado atual, que seria fingir. Banco,
`__pycache__` e pasta duplicada saíram do **histórico inteiro**, e a chave
passou para variável de ambiente. Entraram um `.gitignore`, um
`requirements.txt` com a versão do Django da entrega, e um README.

**O código de 2024 não mudou uma linha.** Conferi os 58 arquivos um a um, e a
única diferença em todo o repositório é a linha da chave. O trabalho entregue
continua sendo o trabalho entregue.

### O commit que era só o banco engordando

Uma curiosidade que apareceu no processo e diz muito. O repositório tinha dois
commits. Quando o banco saiu do histórico, o segundo virou **vazio**: a única
coisa que ele mudava era o `db.sqlite3` ganhando 4 KB depois de alguém abrir o
sistema e clicar em algumas telas.

Meses de trabalho couberam em um commit. O outro era o banco crescendo.

## Blucker, o projeto integrador de 2026

Este é mais recente, e por isso incomoda mais. Dois achados ao preparar o
repositório para ficar público.

**As senhas estavam em texto puro no banco entregue.** Sem hash, sem salt, sem
nada: quem abrisse o arquivo lia a senha de todo mundo. Hoje cada usuário tem
salt próprio e a senha passa por scrypt, usando só o módulo `crypto` do Node,
sem dependência nova.

**E o banco real do desenvolvimento foi versionado junto**, com contas de
verdade da dupla dentro, incluindo um e-mail pessoal. Hoje o banco de trabalho
não é versionado, e o repositório traz um arquivo de exemplo com dados
fictícios.

Escrevi o parágrafo acima depois de abrir o backup da entrega e ler o arquivo,
em vez de confiar na memória. Achei que a senha estava em texto puro; queria ter
certeza antes de afirmar isso publicamente sobre um trabalho feito em dupla. O
e-mail pessoal dentro do banco foi um achado extra, que só apareceu porque fui
conferir.

## O que isso ensina, e não é sobre segurança

Os erros são de segurança, mas a lição é sobre **exposição**.

Um sistema que funciona esconde tudo isso. A tela abre, o login entra, o
cadastro salva, e ninguém vê a chave no arquivo de configuração nem a senha
legível no banco. Enquanto o único juiz for o professor rodando o sistema na
apresentação, o repositório pode estar do jeito que estiver.

O portfólio muda o juiz. Quando o trabalho vira link público, o repositório
passa a ser lido por quem não vai executar nada: alguém que abre a pasta, olha
a estrutura, lê um arquivo ou dois e forma uma opinião em três minutos. Aquilo
que nunca foi olhado passa a ser a primeira coisa olhada.

E aí um portfólio, que existe para exibir, acaba funcionando como auditoria.
Não porque eu tenha decidido auditar nada, mas porque **escrever sobre um
trabalho obriga a reabri-lo**, e reabrir é o suficiente.

Se você tem repositório de faculdade parado no GitHub, o exercício rende: abra
e leia como se fosse de outra pessoa. Provavelmente tem um `settings.py` com
algo dentro, um banco versionado, uma pasta com "Copia" no nome.
