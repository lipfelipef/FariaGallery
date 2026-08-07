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
      i18n: {
        defaultLocale: 'pt',
        locales: {
          pt: 'pt-BR',
          en: 'en-US',
          es: 'es-ES',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
