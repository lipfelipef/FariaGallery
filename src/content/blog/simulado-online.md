---
titulo: 'Simulado Online: feito para o colega com prova amanhã'
resumo: Sem framework, sem build, sem servidor e sem conta. Cada uma dessas ausências foi escolhida pensando em quem ia usar, e não em quem ia escrever.
data: 2026-08-08T01:50:00-03:00
idioma: pt
obra: simulado-online
endereco: simulado-online
assuntos:
  - JavaScript
  - localStorage
  - Arquitetura
---

O Simulado Online monta listas de perguntas e aplica simulados em cima delas,
com painel de desempenho e histórico. Fiz para os colegas usarem na reta final
do semestre, e ele acabou pegando por um motivo que eu não tinha planejado:
**serve para qualquer assunto**. Não é o simulado da minha prova, é um programa
que aplica o simulado que você montar.

HTML, CSS e JavaScript puro. Sem framework, sem dependência, sem etapa de build.

## As restrições foram escolhidas pelo usuário, não por mim

Esse é o assunto real deste texto. Quase toda decisão técnica aqui saiu da mesma
pergunta: como isso chega na mão de um colega às onze da noite, na véspera da
prova?

**Nada de build.** Se o projeto precisasse de `npm install` e `npm run build`,
metade das pessoas pararia ali. O app é um HTML que abre.

**Nada de servidor e nada de conta.** Não existe cadastro, login nem "criar
perfil". Você abre e usa. Ninguém quer fazer conta em nada na véspera da prova.

**Scripts clássicos em vez de módulos ES**, e essa é a decisão mais
contraintuitiva do projeto. Módulo ES é o jeito moderno e certo de organizar
JavaScript, mas o navegador **bloqueia módulo no protocolo `file://`** por
política de origem. Ou seja: se eu usasse a forma correta, o duplo clique no
arquivo pararia de funcionar. Como abrir com duplo clique era um requisito, os
arquivos são scripts clássicos que compartilham escopo global e carregam numa
ordem proposital:

```
core -> persistence -> ui -> features -> events -> main
```

Escolher a técnica pior porque ela atende melhor o usuário é um tipo de decisão
que não aparece em tutorial, e é a que mais me marcou nesse projeto.

## De um arquivo de mil linhas para camadas

A primeira versão era um único HTML com cerca de **1.060 linhas**: marcação,
estilo e lógica no mesmo lugar. Funcionava, e ficou impossível de mexer.

A modularização separou em `core` (utilitários, estado, armazenamento,
persistência), `ui` (tema, modal, toast, troca de telas) e `features` (listas,
editor, quiz, painel, tour), mais um arquivo só de eventos e um de inicialização.

A parte que eu recomendo copiar não é a divisão em si, é **como conferir que uma
refatoração dessas não quebrou nada**:

- `node --check` em cada arquivo, para garantir que tudo ainda é JavaScript
  válido;
- **comparação linha a linha entre o arquivo original e os módulos extraídos**,
  para provar que nenhuma linha foi perdida, duplicada ou alterada no caminho;
- um conjunto de testes com jsdom que carrega o HTML, executa os scripts na
  ordem real e percorre os fluxos de ponta a ponta: criar lista, importar em
  lote, fazer o simulado inteiro, conferir pontuação, trocar tema, abrir o
  painel.

Refatoração sem verificação é reescrita com esperança. A comparação linha a
linha é chata e é o que transforma "acho que está igual" em "está igual".

## Onde os dados moram, e o que isso significa

Tudo vive no `localStorage` do navegador de quem usa. Listas, perguntas,
histórico de tentativas, tema.

A consequência é que **o app não sabe nada sobre ninguém**. Não há banco, não há
servidor, não há nada para vazar, porque não há nada do outro lado. Quando
publiquei o repositório eu tinha uma preocupação concreta: eu já tinha umas
duzentas questões minhas de JavaScript salvas ali de quando estudei, e não
queria que fossem junto. Não foram, e isso não é sorte: não existe arquivo de
dados no projeto. Quem baixa recebe três perguntas de exemplo e uma tela vazia
para preencher.

O armazenamento tem uma consequência curiosa que vale saber: `file://` e
`http://localhost` são origens diferentes para o navegador, então têm
`localStorage` separados. Trocar de forma de execução faz o histórico parecer
sumido. Não sumiu, está na outra origem.

## O que ele não faz

Não dá para exportar nem importar uma lista como arquivo. Você monta as
perguntas no navegador e elas ficam ali. Se limpar os dados do navegador, foi
embora, e não existe cópia em lugar nenhum. Para um app cuja graça é montar a
sua própria lista, essa é a limitação que mais incomoda, e é a primeira coisa
que eu acrescentaria.

As fontes vêm do Google Fonts, então existe **uma** requisição externa. Sem
internet o app cai para as fontes do sistema e continua funcionando, mas dizer
que é cem por cento offline seria mentira, e o README diz isso com todas as
letras.

## Por que ele está na coleção

Porque é o único projeto meu que outras pessoas usaram sem eu pedir, e o motivo
não foi técnico. Foi ter percebido, no meio do caminho, que um simulador de
matéria específica serve para uma turma e um mês, e que um simulador de assunto
nenhum em particular serve para qualquer um, sempre.

A parte de engenharia foi só remover, uma por uma, todas as desculpas que
alguém teria para não abrir o arquivo.
