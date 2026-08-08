# Faria Gallery

Site pessoal de Felipe Faria, em [fariagallery.com](https://fariagallery.com).
Funciona como portfólio e registro do que eu produzo: projetos, canal, carreira
e blog num lugar só, em vez de espalhar LinkedIn, GitHub e canal em links
separados.

## A ideia do design

Projeto de software não tem imagem que valha uma parede, então o site trata a
**etiqueta de museu como sendo a própria obra**. Cada projeto aparece com a
ficha completa, na mesma ordem que um museu usa: título, ano, meio, papel,
crédito e estado.

O campo "meio" é a stack. Um quadro é feito de óleo sobre tela, o Blucker é
feito de Angular e Express, e as duas coisas são a mesma informação, então são
compostas do mesmo jeito.

O ponto vermelho ao lado do ano é o mesmo das galerias, e aqui ele é sempre
cheio, inclusive no que já encerrou: quem carrega o que ainda dá para visitar é
o campo "estado" da ficha, não o ponto. É a única cor da página inteira.

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

Sem back-end, sem banco, sem formulário e sem login. Não existe **arquivo** de
JavaScript: o que roda no navegador são poucos scripts curtos escritos direto na
página, para a troca de tema, o filtro das etiquetas e os textos de tempo, que
se refazem sozinhos para não envelhecerem entre um build e outro.

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
npm run dev
```

Abre em `http://localhost:4321`.

| Comando           | O que faz                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | servidor de desenvolvimento com recarga        |
| `npm run build`   | gera o site estático em `dist/`                |
| `npm run preview` | serve o `dist/` para conferir antes de publicar|
| `npm run check`   | verifica os tipos dos arquivos `.astro`        |

## Como o conteúdo é organizado

```
src/
├─ consts.ts            nome, marca, contato, redes e limites de interface
├─ content.config.ts    o formato de um post: campos e o que é obrigatório
├─ data/obras.ts        a coleção: uma entrada por projeto, com a ficha inteira
├─ content/blog/        os textos, em markdown, um arquivo por idioma
├─ components/          Etiqueta.astro é a ficha de museu; o resto são as salas
├─ layouts/Base.astro   <head>, SEO, dados estruturados e a escolha de tema
├─ i18n/                ui.ts é todo texto de interface nos três idiomas
├─ lib/                 as regras: percurso do blog, datas, idiomas, feed
├─ pages/               as rotas, incluindo /404 e um rss.xml por idioma
└─ styles/global.css    cores, fontes, a grade da parede e a sala escura

public/
├─ _headers                  cabeçalhos de segurança aplicados pela Cloudflare
├─ robots.txt                libera tudo e aponta o sitemap
├─ site.webmanifest          nome e ícones para quem instala o site
├─ .well-known/security.txt  como reportar um problema de segurança
└─ favicon*, card.png        ícones e a imagem que aparece ao compartilhar
```

### Para acrescentar um projeto

Uma entrada em `src/data/obras.ts`. Os campos que mais decidem coisa:

| Campo       | Para que serve                                                     |
| ----------- | ------------------------------------------------------------------ |
| `tipo`      | ausente vai para a coleção; `'experiencia'` vai para a outra sala   |
| `destaque`  | número: a ordem em cartaz na home. Sem ele, o projeto não vai à home|
| `ordemSala` | ordem dentro da sala quando ela não pode sair da data               |
| `tags`      | as etiquetas do filtro                                              |
| `pendente`  | `true` deixa o projeto fora do site até a ficha estar completa       |

O padrão hoje é todo projeto ter um texto no blog junto. A ligação é o campo
`obra` no post, que aponta para o `slug` do projeto: com ele, a linha da coleção
passa a levar ao texto, e o texto ganha na ficha o caminho de volta ao código.

### Para acrescentar um texto

Um arquivo markdown em `src/content/blog/`. O nome vira o endereço, e o mesmo
texto em outro idioma é outro arquivo, com o mesmo `endereco` declarado dentro.

O campo `ordem` é o que decide a posição do texto na lista, e não a data: os
textos são um percurso escolhido, não uma pilha cronológica. A data continua
sendo a data real de publicação, e é ela que manda no RSS. Texto com
`rascunho: true` fica no repositório e fora do site.

Título longo pode declarar um `tituloBusca` curto, que vale só na aba do
navegador e no resultado de busca, para o buscador não cortar o título no meio.

## Idiomas

Português na raiz, inglês em `/en` e espanhol em `/es`. Interface, projetos e as
páginas fixas existem nos três. Post de blog pode existir em um idioma só sem
quebrar o build: o seletor de idioma percebe e leva à lista daquele idioma em
vez de a um endereço que não existe.

Cada página declara a si mesma e às traduções que realmente existem, e o sitemap
usa exatamente os mesmos códigos, para o buscador não receber dois sinais
diferentes sobre a mesma página.

## Licença

O **código** está sob [MIT](LICENSE): use, copie, modifique e publique à
vontade, inclusive comercialmente.

O **conteúdo** não está. Textos, fotos, nome e identidade visual são meus, com
todos os direitos reservados. O detalhamento do que entra em cada lado está em
[NOTICE.md](NOTICE.md).
