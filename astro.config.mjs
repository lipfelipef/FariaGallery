// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * O blog só existe de verdade quando tem post publicado. Enquanto não tem,
 * a página /blog sai com noindex, e mandar ela no sitemap seria contradição:
 * o sitemap diz "indexe isto" e a página diz "não indexe".
 */
function temPostPublicado() {
  const pasta = fileURLToPath(new URL('./src/content/blog', import.meta.url));
  try {
    return readdirSync(pasta)
      .filter((nome) => nome.endsWith('.md'))
      .some((nome) => {
        const conteudo = readFileSync(new URL(`./src/content/blog/${nome}`, import.meta.url), 'utf8');
        return !/^rascunho:\s*true\s*$/m.test(conteudo);
      });
  } catch {
    return false;
  }
}

const blogVazio = !temPostPublicado();

export default defineConfig({
  site: 'https://fariagallery.com',

  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: {
      // PT fica na raiz, /en e /es em subpasta
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Vale para /blog, /en/blog e /es/blog: a coleção é uma só, então
      // se está vazia, está vazia nos três idiomas.
      filter: (pagina) =>
        !(blogVazio && /^\/(en\/|es\/)?blog$/.test(new URL(pagina).pathname.replace(/\/$/, ''))),
      /**
       * Os mesmos códigos que o `<link hreflang>` de cada página escreve, em
       * `src/i18n/utils.ts`. Precisa ser igual: o buscador lê os dois sinais,
       * e quando eles discordam ele não sabe qual das duas páginas é a versão
       * daquele idioma. Aqui dizia `en-US` e `es-ES` enquanto o HTML dizia
       * `en` e `es`.
       *
       * Genérico de propósito, sem região. O português é `pt-BR` porque ele
       * escreve em português brasileiro de verdade, mas o site não é escrito
       * para o inglês de um país só, e prometer região que não se cumpre é
       * pior do que não prometer nenhuma.
       */
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
          en: 'en',
          es: 'es',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
