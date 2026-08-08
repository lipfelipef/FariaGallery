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
 * ATENCAO: o endereco acima so recebe de verdade depois de ligar o Email
 * Routing na Cloudflare. Esta em `true` porque a pagina de contato passou a
 * ter o e-mail como unico canal, por decisao do Felipe. Enquanto o Email
 * Routing nao estiver ligado, quem escrever recebe o e-mail de volta.
 */
export const EMAIL_ATIVO = true;

/**
 * Currículo em PDF. O link só aparece no site se este arquivo existir de
 * verdade em `public/`. Basta largar o PDF nesse caminho e ele aparece.
 */
export const CURRICULO = '/curriculo-felipe-faria.pdf';

/**
 * Vira o sameAs do Schema.org tipo Person, e a lista de redes da home.
 * A ordem aqui e a ordem que aparece no site: primeiro o que um recrutador
 * abre, depois o resto.
 */
export const SOCIAL = [
  { rede: 'LinkedIn', usuario: 'Felipe Faria', href: 'https://www.linkedin.com/in/felipefariaf/' },
  { rede: 'GitHub', usuario: 'lipfelipef', href: 'https://github.com/lipfelipef' },
  { rede: 'YouTube', usuario: 'Até Zerar', href: 'https://www.youtube.com/@atezerar' },
  { rede: 'Instagram', usuario: 'lipfelipef', href: 'https://www.instagram.com/lipfelipef' },
  { rede: 'X', usuario: 'lipfelipef', href: 'https://x.com/lipfelipef' },
] as const;

export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';
