/**
 * Ponto unico de verdade dos dados que aparecem no site inteiro.
 * Mudou aqui, mudou em todas as paginas e nos metadados de SEO.
 */

export const SITE = {
  /** Marca falada. Nao vai no <title>: quem vai no title e o NOME. */
  brand: 'Faria Gallery',
  /** O nome precisa aparecer em tudo, porque o dominio nao tem ele. */
  name: 'Felipe Faria',
  url: 'https://fariagallery.com',
} as const;

/**
 * Ainda nao existe: depende de ligar o Email Routing na Cloudflare.
 * Enquanto nao existir, nao publicar link de contato.
 */
export const CONTACT_EMAIL = 'contato@fariagallery.com';

/** Vira o sameAs do Schema.org tipo Person. Ordem importa pouco, presenca importa. */
export const SOCIAL = {
  github: 'https://github.com/lipfelipef',
  linkedin: 'https://www.linkedin.com/in/felipefariaf/',
  youtube: 'https://www.youtube.com/@atezerar',
} as const;

export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';
