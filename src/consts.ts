/**
 * Ponto unico de verdade dos dados que aparecem no site inteiro.
 * Mudou aqui, mudou em todas as paginas e nos metadados de SEO.
 */

export const SITE = {
  /** Marca falada, usada no topo da página. */
  brand: 'Faria Gallery',
  /**
   * O nome real. Vai no H1, no Schema.org e no og:site_name, porque é o que
   * liga o site à pessoa nos olhos do buscador.
   */
  name: 'Felipe Faria',
  /** Domínio sem protocolo. Abre o título da home, tudo minúsculo. */
  domain: 'fariagallery.com',
  url: 'https://fariagallery.com',
} as const;

export const CONTACT_EMAIL = 'contato@fariagallery.com';

/**
 * O endereco acima so funciona depois de ligar o Email Routing na Cloudflare.
 * Enquanto isso for `false`, o site nao mostra o e-mail: link de contato que
 * cai no vazio e pior do que nao ter contato nenhum.
 * Ligou o Email Routing? Troca para `true` e o e-mail aparece no site.
 */
export const EMAIL_ATIVO = false;

/** Vira o sameAs do Schema.org tipo Person. Ordem importa pouco, presenca importa. */
export const SOCIAL = {
  github: 'https://github.com/lipfelipef',
  linkedin: 'https://www.linkedin.com/in/felipefariaf/',
  youtube: 'https://www.youtube.com/@atezerar',
} as const;

export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';
