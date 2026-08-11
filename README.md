# Faria Gallery

Site pessoal de Felipe Faria, em [fariagallery.com](https://fariagallery.com).
Funciona como portfólio e registro do que eu produzo: projetos, canal e
carreira num lugar só, em vez de espalhar LinkedIn, GitHub e canal em links
separados.

## A ideia do design

Projeto de software não tem imagem que valha uma parede, então o site trata a
**etiqueta de museu como sendo a própria obra**. Cada projeto aparece com a
ficha inteira, na ordem que um museu usa: título, ano, meio, duração,
dimensões, papel, crédito e estado.

O campo "meio" é a stack. Um quadro é feito de óleo sobre tela, o Blucker é
feito de Angular e Express, e as duas coisas são a mesma informação, então são
compostas do mesmo jeito. "Dimensões" segue a mesma ideia: etiqueta de museu
mede em centímetros, e em software e vídeo a medida é alcance e volume.

O ponto vermelho ao lado do ano é o mesmo das galerias, e aqui ele é sempre
cheio, mesmo no que já encerrou: quem carrega o que ainda dá para visitar é o
campo "estado" da ficha, não o ponto. É a única cor da página inteira.

Duas vozes tipográficas, cada uma com um papel só: Archivo é a voz da
instituição (nome, navegação, campos da ficha) e EB Garamond aparece apenas em
título de obra, sempre em itálico, que é como museu compõe título.

O site abre na **sala escura**, e a sala clara fica a um clique no topo. A
escolha é guardada no navegador de quem visita e vale antes da página pintar.

## Stack

- [Astro](https://astro.build) 7, saída estática
- TypeScript em modo estrito
- [Tailwind CSS](https://tailwindcss.com) 4, configurado em CSS via
  `@tailwindcss/vite`
- Archivo e EB Garamond, hospedadas no próprio site pelo
  [Fontsource](https://fontsource.org)
- Hospedagem na Cloudflare Workers, com deploy automático a cada push na `main`

Sem back-end, sem banco, sem formulário e sem login. Também sem markdown e sem
coleção de conteúdo: todo texto do site mora em TypeScript, em `data/obras.ts`
e `i18n/ui.ts`. São quatro dependências de produção ao todo: o Astro, o plugin
de sitemap e as duas fontes.

Não existe **arquivo** de JavaScript. O que roda no navegador são poucos
scripts curtos escritos direto na página, para a troca de tema, o filtro das
etiquetas e os textos de tempo.

Fonte e imagem saem todas do próprio domínio. O único recurso de fora é o
script de medição de visitas do Cloudflare Web Analytics, injetado pela própria
Cloudflare: ele conta acesso de forma agregada, **sem cookie e sem seguir
ninguém entre sites**, e por isso o site não precisa de aviso de consentimento.
A política de conteúdo em `public/_headers` fecha tudo por padrão e abre
exatamente esse endereço, e nada além dele.

## Rodando na sua máquina

Precisa de Node 22.12 ou mais novo (a versão usada aqui está no `.nvmrc`).

```bash
npm install
```

```bash
npm run dev
```

Abre em `http://localhost:4321`.

| Comando           | O que faz                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | servidor de desenvolvimento com recarga        |
| `npm run build`   | gera o site estático em `dist/`                |
| `npm run preview` | serve o `dist/` para conferir antes de publicar|
| `npm run check`   | verifica os tipos dos arquivos `.astro`        |

## As salas

Quatro páginas por idioma, mais a de erro, que é uma só:

| Endereço       | O que tem                                                     |
| -------------- | ------------------------------------------------------------- |
| `/`            | a entrada, o percurso, as obras em cartaz e as redes           |
| `/obras`       | a Coleção: catálogo por ano, com filtro por etiqueta           |
| `/experiencia` | o que roda fora de projeto fechado, com a ficha já aberta      |
| `/contato`     | só o e-mail, sem formulário                                    |
| `/404`         | um arquivo só, servido pela Cloudflare para todo endereço morto|

As duas salas de obra mostram a mesma ficha de jeitos diferentes. A Coleção é um
catálogo por ano, e ali a ficha abre num `<details>` recolhido, porque são muitas
linhas numa página só. A Experiência traz a etiqueta inteira já aberta, como a
home faz com o que está em cartaz: recolher o que cabe na tela seria esconder por
esconder.

A página de erro sai em português, porque não dá para saber o idioma de um
endereço que não existe. O que ela faz é olhar no navegador o caminho que a
pessoa tentou abrir: quem errou dentro de `/en/` ou `/es/` recebe o texto
naquele idioma. Endereço solto, como `/4324`, fica em português.

## Como o conteúdo é organizado

```
src/
├─ consts.ts            nome, marca, contato, redes e limites de interface
├─ data/obras.ts        a coleção: uma entrada por projeto, com a ficha inteira
├─ components/          Etiqueta.astro é a ficha de museu; o resto são as salas
├─ layouts/Base.astro   <head>, SEO, dados estruturados e a escolha de tema
├─ i18n/                ui.ts é todo texto de interface nos três idiomas
├─ lib/                 as regras: a ficha, as datas e os idiomas
├─ pages/               as rotas de cada idioma, mais a /404
├─ assets/felipe.jpg    a foto de origem do favicon e do card, que não vai ao ar
└─ styles/global.css    cores, fontes, a grade da parede e a sala escura

public/
├─ _headers                  cabeçalhos de segurança aplicados pela Cloudflare
├─ robots.txt                libera tudo e aponta o sitemap
├─ site.webmanifest          nome e ícones para quem instala o site
├─ .well-known/security.txt  como reportar um problema de segurança
└─ favicon*, card.png        ícones e a imagem que aparece ao compartilhar
```

### Para acrescentar um projeto

Uma entrada em `src/data/obras.ts`. Só `slug`, `titulo`, `ano`, `meio`,
`estado`, `tags`, `resumo`, `papel` e `credito` são obrigatórios. Os campos que
mais decidem coisa:

| Campo           | Para que serve                                                   |
| --------------- | ---------------------------------------------------------------- |
| `tipo`          | ausente vai para a coleção; `'experiencia'` vai para a outra sala |
| `destaque`      | número: a ordem em cartaz na home. Sem ele, não vai à home        |
| `tags`          | as etiquetas do filtro da coleção                                 |
| `inicio` e `fim`| em ISO. Deles sai a duração, calculada e nunca escrita à mão      |
| `ativa`         | em andamento: sai como "2021 - atualmente" e sobe no catálogo     |
| `dimensoes`     | a medida da obra: alcance, volume, tempo de estrada               |
| `pendente`      | `true` deixa o projeto fora do site até a ficha estar completa    |

Dentro de um mesmo ano a ordem é a ordem do array: não há campo para isso, e
mover a entrada de lugar é o mecanismo.

O campo `link` é o destino da obra, e é para lá que a linha da coleção e a ficha
apontam, em aba nova. São quatro tipos, e cada um decide o rótulo do link nos
três idiomas: `codigo` leva ao repositório, `site` ao endereço no ar, `canal` ao
canal de vídeo e `projeto` a qualquer outra coisa publicada. Obra sem `link` sai
como texto, e não como link vazio.

O `meio` é uma string só quando é nome de tecnologia, que é igual nos três
idiomas ("Django, Python"). Quando descreve com palavras, como "gameplay sem
comentários", vira um objeto com `pt`, `en` e `es`.

### O tempo se refaz sozinho

O site é estático, então todo número de tempo que o build escreve envelheceria
até o próximo deploy: um canal que continua rodando ficaria parado em "4 anos e
8 meses", e em 1º de janeiro a coleção ainda diria que o ano anterior é "este
ano".

O servidor escreve o texto certo, para quem chega sem JavaScript e para o
buscador, e o `TempoVivo.astro` corrige no navegador se o tempo passou. **A
conta usa o relógio de São Paulo, nunca o de quem visita.** Só recalcula o que
não terminou: período com `fim` fica parado, porque ele não muda mais.

## Idiomas

Português na raiz, inglês em `/en` e espanhol em `/es`. Interface, projetos e as
páginas fixas existem nos três, sem exceção: nenhuma sala fica pela metade num
idioma, e o seletor nunca leva a um endereço que não existe.

Cada página declara a si mesma e às traduções que realmente existem, e o sitemap
usa exatamente os mesmos códigos, para o buscador não receber dois sinais
diferentes sobre a mesma página.

## Licença

O **código** está sob [MIT](LICENSE): use, copie, modifique e publique à
vontade, inclusive comercialmente.

O **conteúdo** não está. Textos, fotos, nome e identidade visual são meus, com
todos os direitos reservados. O detalhamento do que entra em cada lado está em
[NOTICE.md](NOTICE.md).
