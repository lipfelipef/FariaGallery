---
titulo: Por que este site existe
resumo: Quem eu sou, o que a Faria Gallery é, e por que cada projeto aqui aparece com ficha de museu em vez de print bonito.
data: 2026-08-07T18:09:00-03:00
atualizado: 2026-08-07T23:10:00-03:00
idioma: pt
endereco: por-que-este-site-existe
assuntos:
  - Faria Gallery
  - Portfólio
---

Meu nome é **Felipe Faria**. Nasci em 2006 e estudo Análise e Desenvolvimento
de Sistemas no Centro Universitário Senac, em Santo Amaro. Antes disso fiz o
técnico em Informática para Internet.

Este site existe porque eu estava cansado de mandar três links.

## O problema dos três links

Toda vez que alguém pedia para ver o que eu faço, a resposta era a mesma
bagunça: o GitHub para o código, o LinkedIn para o histórico, o canal para o
resto. Três endereços, três formatos, três contextos, e nenhum dos três
contando a história inteira.

Pior: o GitHub mostra arquivo, não decisão. Quem abre um repositório vê uma
pasta com trinta arquivos e nenhuma pista do que foi difícil, do que quase deu
errado, ou do porquê de a coisa ser daquele jeito. É a parte menos interessante
do trabalho, apresentada como se fosse a única.

A **Faria Gallery** é o lugar único. Projeto, experiência, currículo e texto,
tudo no mesmo endereço, com o mesmo formato.

## Por que etiqueta de museu

A decisão de design veio de um problema prático: **meus projetos não têm imagem
que valha uma parede.**

Um circuito montado no Logisim, um quiz em Java, um simulado que roda no
navegador. Print de tela desses projetos fica feio e genérico, e é exatamente o
que todo portfólio de estudante faz: uma grade de capturas de tela que ninguém
olha.

Então o site inverte. **Não existe nenhuma imagem aqui.** O que está pendurado
na parede é a ficha, do jeito que museu faz:

```
Meio        Angular 19, Node.js, Express
Papel       Full-stack, em dupla
Crédito     Projeto Integrador II, Senac Santo Amaro
Estado      Código público
```

O campo **meio** é a piada que sustenta a ideia toda. Numa etiqueta de museu,
"meio" diz do que a obra é feita: óleo sobre tela, bronze, vídeo de canal
único. Aqui diz "Angular 19, Node.js, Express". **É a mesma informação**, e por
isso é composta do mesmo jeito, sem ícone, sem badge colorida, sem enfeite.

O ponto vermelho ao lado do ano também é emprestado da galeria: lá ele marca
obra vendida, aqui marca o que dá para ir ver agora. É a única cor do site
inteiro.

## O que tem aqui

**Coleção** são os projetos fechados, com começo e fim, em ordem do mais novo
para o mais antigo e com filtro por tecnologia.

**Experiência** é o que continua rodando: o canal
[Até Zerar](/blog/ate-zerar), que tem seis anos e 5,7 milhões de
visualizações, e a [BluckerTV](/blog/bluckertv), a plataforma de vídeo que eu
abri como empresa e encerrei cinco meses depois.

**Blog** é onde o texto longo mora. Estudo de caso, post-mortem, aprendizado.
Quando um texto é sobre um projeto, a ficha daquele projeto aponta para cá.

## A parte que quase ninguém publica

O texto mais importante do site é sobre um projeto que **não deu certo**.

A BluckerTV funcionava, tinha compliance em dia, marca registrada e app na loja.
Também tinha exatamente um assinante pagante, e uma conta que não fechava de
jeito nenhum. Eu poderia ter deixado ela fora daqui e ninguém saberia.

Deixei porque o que eu aprendi montando e desmontando aquilo vale mais do que
qualquer projeto de faculdade que deu certo. E porque um portfólio onde tudo
funciona não é um portfólio, é propaganda.

## Como o site é feito

Estático, em Astro, hospedado na Cloudflare. Sem back-end, sem banco, sem
formulário e sem login. A página não carrega JavaScript de framework nenhum, e
o que existe são uns poucos bytes para o botão de tema e os filtros.

Não usa cookie nem rastreia ninguém, então também não tem aquele aviso de
consentimento no rodapé. Existe em português, inglês e espanhol.

O código é aberto sob licença MIT,
[no GitHub](https://github.com/lipfelipef/FariaGallery). Os textos e as fotos
não: a estrutura é de quem quiser usar, o conteúdo é meu.
