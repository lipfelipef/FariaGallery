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

/** O repositorio do proprio site. Vai no rodape e no README. */
export const REPO = 'https://github.com/lipfelipef/FariaGallery';

export const CONTACT_EMAIL = 'felipe@fariagallery.com';

/**
 * O endereco acima recebe de verdade: o Email Routing da Cloudflare esta
 * ligado desde 08/08/2026, com os tres MX `route1/2/3.mx.cloudflare.net`
 * respondendo no dominio. Se um dia esses MX sumirem, quem escrever passa a
 * receber o e-mail de volta, e ai este campo precisa voltar para `false`.
 */
export const EMAIL_ATIVO = true;

/**
 * Vira o sameAs do Schema.org tipo Person, e a lista de redes da home.
 * A ordem aqui e a ordem que aparece no site: primeiro o que um recrutador
 * abre, depois o resto.
 */
export const SOCIAL = [
  { rede: 'Instagram', usuario: 'Felipe Faria', href: 'https://www.instagram.com/lipfelipef' },
  { rede: 'LinkedIn', usuario: 'Felipe Faria', href: 'https://www.linkedin.com/in/felipefariaf/' },
  { rede: 'GitHub', usuario: 'Felipe Faria', href: 'https://github.com/lipfelipef' },
] as const;

/**
 * Vai no sameAs do Schema.org, e nao na lista visivel. O canal e o X ficam
 * fora da lista de "onde me achar" por decisao dele, mas continuam aqui
 * porque sao perfis dele e ajudam o buscador a ligar tudo a mesma pessoa.
 */
export const PERFIS = [
  ...SOCIAL.map((s) => s.href),
  'https://www.youtube.com/@atezerar',
  'https://x.com/lipfelipef',
];

/**
 * Quantas etiquetas de filtro aparecem antes de precisar pedir o resto.
 *
 * Existe porque a lista de filtros cresce junto com o acervo e nunca para:
 * cada texto novo traz uns tres assuntos, e a maioria aparece uma vez so. Com
 * 8 textos ja eram 22 filtros no blog; com 50 seriam perto de 100, e uma
 * parede de 100 botoes nao ajuda ninguem a achar nada.
 *
 * As mais usadas ficam a vista, na frente, e as demais entram por um botao.
 * Nenhuma some: quem procura assunto raro continua achando em um clique.
 */
export const LIMITE_FILTROS = 8;

/**
 * Abaixo disto o botao nao aparece e a lista sai inteira. Esconder duas
 * etiquetas atras de um botao custa mais do que mostrar as duas.
 */
export const FOLGA_FILTROS = 2;

export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';
