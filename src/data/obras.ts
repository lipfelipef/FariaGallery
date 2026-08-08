import type { Locale } from '../consts';

/**
 * As obras da coleção.
 *
 * A ordem dos campos segue a etiqueta de museu de verdade:
 * título, ano, MEIO (do que a obra é feita), PAPEL, CRÉDITO, ESTADO.
 * "Meio" é a stack. Um quadro é feito de óleo sobre tela, o Blucker
 * é feito de Angular e Express. É a mesma informação.
 *
 * Título, ano e meio não se traduzem: nome próprio e nome de tecnologia
 * são iguais nos três idiomas. O resto vem por idioma.
 */

export type Estado = 'publico' | 'noar' | 'encerrado';
export type TipoLink = 'codigo' | 'projeto' | 'canal';

type PorIdioma = Record<Locale, string>;

export interface Obra {
  /** Identificador da obra. É por ele que um post do blog se liga a ela. */
  slug: string;
  titulo: string;
  /** Como o ano aparece escrito. Pode ser faixa: "2020 até hoje". */
  ano: string;
  /**
   * Só para ordenar o catálogo. Sem isso, usa o número que abre o `ano`.
   * Obra ainda ativa usa o ano corrente, senão ela afunda no fim da lista
   * por ter começado há muito tempo.
   */
  anoOrdem?: number;
  /** Obra ainda em andamento. Empata com o ano corrente e fica acima dele. */
  ativa?: boolean;
  /** A stack, tipografada como linha de meio: separada por vírgula. */
  meio: string;
  estado: Estado;
  link?: { href: string; tipo: TipoLink };
  /** Marca obra cuja ficha ainda está incompleta. Não vai pra parede. */
  pendente?: boolean;
  /**
   * Etiquetas grossas para filtrar o acervo. Não é a stack inteira: é o que
   * alguém digitaria procurando. Nome de tecnologia não se traduz.
   */
  tags: string[];
  /** Sai na parede da home. O acervo inteiro fica na página da coleção. */
  destaque?: boolean;
  /**
   * Onde a ficha mora. `obra` é projeto fechado, com começo e fim, e vai
   * para a coleção. `experiencia` é o que continua rodando (canal, emprego,
   * estágio) e vai para a página de experiência. Padrão: obra.
   */
  tipo?: 'obra' | 'experiencia';
  resumo: PorIdioma;
  papel: PorIdioma;
  credito: PorIdioma;
  /**
   * A medida da obra. Etiqueta de museu tem dimensão em centímetros; em
   * software e vídeo, a medida é alcance, volume e tempo de estrada.
   */
  dimensoes?: PorIdioma;
}

/**
 * Chave de ordenação do catálogo. O meio ponto extra faz obra em andamento
 * ficar acima das que terminaram no mesmo ano, sem precisar inventar um ano
 * que não existe.
 */
export const ordemDoAno = (o: Obra) =>
  (o.anoOrdem ?? (Number.parseInt(o.ano, 10) || 0)) + (o.ativa ? 0.5 : 0);

/** Fichas de um tipo, já sem as que ainda estão incompletas. */
export const doTipo = (tipo: 'obra' | 'experiencia') =>
  OBRAS.filter((o) => !o.pendente && (o.tipo ?? 'obra') === tipo);

export const OBRAS: Obra[] = [
  {
    slug: 'blucker',
    titulo: 'Blucker',
    ano: '2026',
    meio: 'Angular 19, Node.js, Express',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/PI.2-BluckerEcommerce', tipo: 'codigo' },
    tags: ['Web', 'Angular', 'Node.js'],
    destaque: true,
    resumo: {
      pt: 'Loja de jogos digitais, do catálogo até o carrinho.',
      en: 'A digital game store, from catalogue to checkout.',
      es: 'Tienda de juegos digitales, del catálogo al carrito.',
    },
    papel: {
      pt: 'Full-stack, em dupla',
      en: 'Full-stack, in a pair',
      es: 'Full-stack, en pareja',
    },
    credito: {
      pt: 'Projeto Integrador II, Senac Santo Amaro. Com José Victor Souza. Orientação de Evandro Carlos Teruel.',
      en: 'Capstone project II, Senac Santo Amaro. With José Victor Souza. Advised by Evandro Carlos Teruel.',
      es: 'Proyecto Integrador II, Senac Santo Amaro. Con José Victor Souza. Orientación de Evandro Carlos Teruel.',
    },
  },
  {
    slug: 'bluckertv',
    titulo: 'BluckerTV',
    ano: '2026',
    meio: 'PeerTube, TypeScript, PostgreSQL, nginx, FFmpeg',
    estado: 'encerrado',
    tags: ['Vídeo', 'TypeScript', 'Infraestrutura'],
    destaque: true,
    resumo: {
      pt: 'Plataforma brasileira de vídeo sob demanda, construída inteira por uma pessoa e encerrada por decisão de negócio, não por falha técnica.',
      en: 'A Brazilian video on demand platform, built entirely by one person and shut down as a business decision, not a technical failure.',
      es: 'Plataforma brasileña de video bajo demanda, construida entera por una persona y cerrada por decisión de negocio, no por falla técnica.',
    },
    dimensoes: {
      pt: '5 meses no ar, 72 usuários, 270 vídeos, 1,8 TB hospedados, 9 plugins próprios',
      en: '5 months live, 72 users, 270 videos, 1.8 TB hosted, 9 in-house plugins',
      es: '5 meses al aire, 72 usuarios, 270 videos, 1,8 TB alojados, 9 complementos propios',
    },
    papel: {
      pt: 'Sozinho: desenvolvimento, infraestrutura, produto, jurídico e suporte',
      en: 'Solo: development, infrastructure, product, legal, and support',
      es: 'En solitario: desarrollo, infraestructura, producto, legal y soporte',
    },
    credito: {
      pt: 'Projeto pessoal, de março a agosto de 2026. Construída sobre o PeerTube, com plugins próprios, app publicado na Play Store, empresa aberta e marca deferida no INPI.',
      en: 'Personal project, March to August 2026. Built on PeerTube, with in-house plugins, an app published on the Play Store, a registered company, and a trademark granted by the Brazilian patent office.',
      es: 'Proyecto personal, de marzo a agosto de 2026. Construida sobre PeerTube, con complementos propios, app publicada en la Play Store, empresa abierta y marca concedida en el INPI.',
    },
  },
  {
    // Não é software, e continua sendo obra: o meio é vídeo em vez de código.
    // Em número, é a obra de maior alcance da coleção.
    slug: 'ate-zerar',
    titulo: 'Até Zerar',
    ano: '2020 até hoje',
    anoOrdem: 2026,
    ativa: true,
    tipo: 'experiencia',
    meio: 'Vídeo, 4K60fps',
    estado: 'noar',
    link: { href: 'https://www.youtube.com/@atezerar', tipo: 'canal' },
    tags: ['Vídeo', 'Games'],
    destaque: true,
    resumo: {
      pt: 'Jogo inteiro, do início ao fim, sem comentário e em 4K60fps. A ideia é assistir como se fosse filme.',
      en: 'Whole games, start to finish, with no commentary, in 4K60fps. Made to be watched like a film.',
      es: 'El juego entero, de principio a fin, sin comentarios y en 4K60fps. Pensado para verse como una película.',
    },
    papel: {
      pt: 'Sozinho: gravação, edição e publicação',
      en: 'Solo: recording, editing, and publishing',
      es: 'En solitario: grabación, edición y publicación',
    },
    credito: {
      pt: 'Projeto pessoal, no ar desde janeiro de 2020. Do PlayStation 1 ao PlayStation 5 Pro, mais Xbox, Nintendo e PC, organizado em coleções por franquia e por ano.',
      en: 'Personal project, running since January 2020. From PlayStation 1 to PlayStation 5 Pro, plus Xbox, Nintendo, and PC, organised into playlists by franchise and by year.',
      es: 'Proyecto personal, al aire desde enero de 2020. Del PlayStation 1 al PlayStation 5 Pro, más Xbox, Nintendo y PC, organizado en listas por franquicia y por año.',
    },
    dimensoes: {
      pt: '165 vídeos, 5,7 milhões de visualizações, 26,3 mil inscritos',
      en: '165 videos, 5.7 million views, 26.3 thousand subscribers',
      es: '165 videos, 5,7 millones de visualizaciones, 26,3 mil suscriptores',
    },
  },
  {
    slug: 'simulado-online',
    titulo: 'Simulado Online',
    ano: '2026',
    meio: 'HTML, CSS e JavaScript puro',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/SimuladoOnline', tipo: 'codigo' },
    tags: ['Web', 'JavaScript'],
    resumo: {
      pt: 'Monta listas de perguntas e aplica simulado de qualquer assunto.',
      en: 'Builds question lists and runs practice tests on any subject.',
      es: 'Arma listas de preguntas y aplica simulacros de cualquier materia.',
    },
    papel: { pt: 'Sozinho', en: 'Solo', es: 'En solitario' },
    credito: {
      pt: 'Projeto pessoal. Sem back-end e sem etapa de build: as perguntas ficam salvas no próprio navegador de quem usa.',
      en: 'Personal project. No back end and no build step: the questions live in the visitor own browser.',
      es: 'Proyecto personal. Sin back-end y sin etapa de build: las preguntas quedan guardadas en el navegador de quien lo usa.',
    },
  },
  {
    slug: 'estufa-hidroponica',
    titulo: 'Estufa Hidropônica',
    ano: '2026',
    meio: 'Lógica combinacional, Logisim 2.7.1',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/EstufaHidroponica', tipo: 'projeto' },
    tags: ['Hardware', 'Lógica digital'],
    resumo: {
      pt: 'Controle de estufa de alface resolvido em lógica combinacional.',
      en: 'Lettuce greenhouse control solved with combinational logic.',
      es: 'Control de invernadero de lechuga resuelto con lógica combinacional.',
    },
    papel: { pt: 'Sozinho', en: 'Solo', es: 'En solitario' },
    credito: {
      pt: 'Nano projeto de Conceitos de Computação, Senac Santo Amaro. Expressões minimizadas por mapa de Karnaugh, 13 portas de duas entradas, mais gerador e verificador de paridade ímpar.',
      en: 'Short project for Computing Concepts, Senac Santo Amaro. Expressions minimised with Karnaugh maps, 13 two-input gates, plus an odd parity generator and checker.',
      es: 'Nano proyecto de Conceptos de Computación, Senac Santo Amaro. Expresiones minimizadas por mapa de Karnaugh, 13 compuertas de dos entradas, más generador y verificador de paridad impar.',
    },
  },
  {
    slug: 'quiz-animado',
    titulo: 'Quiz Animado',
    ano: '2025',
    meio: 'Java, JavaFX, SQLite',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/QuizAnimado', tipo: 'codigo' },
    tags: ['Java', 'Desktop'],
    resumo: {
      pt: 'Quiz sobre desenho dos anos 2000, com login, sorteio e pontuação.',
      en: 'A quiz about 2000s cartoons, with login, random draw, and scoring.',
      es: 'Quiz sobre dibujos animados de los 2000, con login, sorteo y puntuación.',
    },
    papel: { pt: 'Em grupo', en: 'In a team', es: 'En grupo' },
    credito: {
      pt: 'Projeto Integrador I, Senac Santo Amaro. Orientação de Marcus Vinícius Camillo Gália. Documentação escrita em LaTeX.',
      en: 'Capstone project I, Senac Santo Amaro. Advised by Marcus Vinícius Camillo Gália. Documentation written in LaTeX.',
      es: 'Proyecto Integrador I, Senac Santo Amaro. Orientación de Marcus Vinícius Camillo Gália. Documentación escrita en LaTeX.',
    },
  },
  {
    slug: 'biblioteca-virtual',
    titulo: 'Biblioteca Virtual',
    ano: '2024',
    meio: 'Python',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/BibliotecaTCC', tipo: 'codigo' },
    tags: ['Python', 'Web'],
    resumo: {
      pt: 'Acervo digital com cadastro, busca e empréstimo de títulos.',
      en: 'A digital collection with registration, search, and lending of titles.',
      es: 'Acervo digital con registro, búsqueda y préstamo de títulos.',
    },
    papel: { pt: 'Em grupo', en: 'In a team', es: 'En grupo' },
    credito: {
      pt: 'Trabalho de Conclusão de Curso do Ensino Médio Técnico em Informática para Internet.',
      en: 'Final project for the technical high school diploma in Internet Computing.',
      es: 'Trabajo de Conclusión de Curso de la Educación Media Técnica en Informática para Internet.',
    },
  },
];

export const obraPorSlug = (slug: string) => OBRAS.find((o) => o.slug === slug);
