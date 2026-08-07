import { LOCALES, DEFAULT_LOCALE, SITE, type Locale } from '../consts';

/**
 * Português mora na raiz, os outros em subpasta:
 *   /            /blog            (pt)
 *   /en          /en/blog         (en)
 *   /es          /es/blog         (es)
 */

/** Descobre o idioma pelo endereço da página que está sendo montada. */
export function idiomaDaUrl(url: URL): Locale {
  const primeiro = url.pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(primeiro ?? '')
    ? (primeiro as Locale)
    : DEFAULT_LOCALE;
}

/** Monta um caminho no idioma pedido. `rota('en', '/blog')` vira `/en/blog/`. */
export function rota(lang: Locale, caminho = '/'): string {
  const limpo = caminho.replace(/^\/+|\/+$/g, '');
  const prefixo = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  // Barra no fim sempre, senão o hreflang aponta para /en e o sitemap
  // para /en/, e o buscador entende como duas páginas diferentes.
  if (!limpo) return prefixo ? `${prefixo}/` : '/';
  return `${prefixo}/${limpo}/`;
}

/** O mesmo caminho, sem o prefixo de idioma. Serve para trocar de idioma sem sair da página. */
export function caminhoSemIdioma(url: URL): string {
  const partes = url.pathname.split('/').filter(Boolean);
  if ((LOCALES as readonly string[]).includes(partes[0] ?? '')) partes.shift();
  return '/' + partes.join('/');
}

/** As alternativas de hreflang de uma página, para o Google saber que são a mesma coisa. */
export function alternativas(url: URL) {
  const caminho = caminhoSemIdioma(url);
  return LOCALES.map((lang) => ({
    lang,
    hreflang: HREFLANG[lang],
    href: new URL(rota(lang, caminho), SITE.url).href,
  }));
}

export const HREFLANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

/** O que vai no atributo lang do <html>. */
export const LANG_HTML: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

/** Locale para formatar data por extenso. */
export const LOCALE_DATA: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};
