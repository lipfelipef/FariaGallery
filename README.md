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

O ponto vermelho ao lado do ano é o mesmo das galerias: cheio quer dizer que dá
para ir ver agora, vazado quer dizer que não há o que visitar. É a única cor da
página inteira.

## Stack

- [Astro](https://astro.build) 7, saída estática
- TypeScript em modo estrito
- [Tailwind CSS](https://tailwindcss.com) 4, configurado em CSS via
  `@tailwindcss/vite`
- Archivo e EB Garamond, hospedadas no próprio site pelo
  [Fontsource](https://fontsource.org)
- Hospedagem na Cloudflare, com deploy automático a cada push

Sem back-end, sem banco, sem formulário e sem login. A página não carrega
JavaScript nenhum e não faz requisição para domínio de terceiro, então não usa
cookie nem precisa de aviso de consentimento.

## Rodando na sua máquina

Precisa de Node 22.12 ou mais novo (a versão usada aqui está no `.nvmrc`).

```bash
npm install
npm run dev
```

Abre em `http://localhost:4321`.

| Comando           | O que faz                                     |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | servidor de desenvolvimento com recarga        |
| `npm run build`   | gera o site estático em `dist/`                |
| `npm run preview` | serve o `dist/` para conferir antes de publicar|
| `npm run check`   | verifica os tipos dos arquivos `.astro`        |

## Como o conteúdo é organizado

```
src/
├─ consts.ts            nome, marca, contato e redes
├─ data/obras.ts        a coleção: uma entrada por projeto
├─ components/          Etiqueta.astro é a ficha de museu
├─ layouts/Base.astro   <head>, SEO e dados estruturados
├─ pages/               as rotas
└─ styles/global.css    cores, fontes e a grade da parede
```

Para adicionar um projeto, basta uma entrada em `src/data/obras.ts`. Projeto com
`pendente: true` fica fora do site até a ficha estar completa.

## Idiomas

Português na raiz, inglês em `/en` e espanhol em `/es`. Interface, projetos e a
página "sobre" existem nos três. Post de blog pode existir em um idioma só sem
quebrar o build.

## Licença

O código é livre para consultar e aprender. O conteúdo (textos, projetos e
imagens) é meu.
