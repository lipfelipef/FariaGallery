// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
      /**
       * Os mesmos códigos que o `<link hreflang>` de cada página escreve, em
       * `src/i18n/utils.ts`. Precisa ser igual: o buscador lê os dois sinais,
       * e quando eles discordam ele não sabe qual das duas páginas é a versão
       * daquele idioma.
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
