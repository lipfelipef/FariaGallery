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
export type TipoLink = 'codigo' | 'projeto' | 'canal' | 'site';

type PorIdioma = Record<Locale, string>;

/**
 * Texto de ficha que pode vir quebrado em linhas.
 *
 * Uma frase por linha, escolhida aqui, em vez de quebrar onde a largura
 * mandar. Quem tem uma frase só continua sendo uma string.
 */
type PorIdiomaLinhas = Record<Locale, string | readonly string[]>;

/** Normaliza para lista, para o componente tratar os dois casos igual. */
export const linhasDe = (valor: string | readonly string[]): readonly string[] =>
  typeof valor === 'string' ? [valor] : valor;

/** O meio no idioma da página, seja ele traduzido ou só nome de tecnologia. */
export const meioDe = (obra: Obra, lang: Locale): string =>
  typeof obra.meio === 'string' ? obra.meio : obra.meio[lang];

/**
 * As poucas etiquetas que são palavra, e não nome de tecnologia.
 *
 * `Angular`, `Python`, `SQLite` e `YouTube` se escrevem igual nos três
 * idiomas, então não entram aqui. Estas três entravam em português na página
 * inglesa, e etiqueta de filtro é das primeiras coisas que se lê numa sala:
 * "Infraestrutura" no meio de uma página em inglês denuncia tradução pela
 * metade, para quem visita e para o buscador.
 *
 * A chave continua sendo o português, e é ela que viaja no `data-tags` do
 * HTML. Assim o filtro compara sempre o mesmo valor, em qualquer idioma, e
 * traduzir uma etiqueta nunca quebra a filtragem.
 */
const TAGS_TRADUZIDAS: Record<string, PorIdioma> = {
  Vídeo: { pt: 'Vídeo', en: 'Video', es: 'Video' },
  Infraestrutura: { pt: 'Infraestrutura', en: 'Infrastructure', es: 'Infraestructura' },
  'Lógica digital': { pt: 'Lógica digital', en: 'Digital logic', es: 'Lógica digital' },
};

/** A etiqueta como ela aparece na tela, no idioma da página. */
export const tagDe = (tag: string, lang: Locale): string => TAGS_TRADUZIDAS[tag]?.[lang] ?? tag;

/**
 * Cola o número à palavra que ele mede, com espaço que não quebra.
 *
 * Sem isto a linha racha no pior lugar possível e sobra "26,5" no fim de uma
 * linha com "mil inscritos" na seguinte. Número e unidade são uma informação
 * só e devem viajar juntos.
 */
export const numeroColado = (texto: string) => texto.replace(/(\d) (?=[\p{L}])/gu, '$1\u00A0');

export interface Obra {
  /** Identificador da obra. Vira o `id` da etiqueta, e é o alvo dos marcos
      do percurso na home. */
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
  /**
   * Quando começou e quando terminou, em ISO. Serve para calcular a duração
   * sozinho, em vez de eu escrever "5 meses" e a conta envelhecer. Sem `fim`
   * e com `ativa`, conta até hoje.
   */
  inicio?: string;
  fim?: string;
  /**
   * A stack, tipografada como linha de meio: separada por vírgula.
   *
   * String quando é só nome de tecnologia, que não se traduz: "Angular 19,
   * Node.js, Express" é igual nos três idiomas. Vira `PorIdioma` quando a
   * linha descreve o meio com palavras, como "gameplay sem comentários" ou
   * "lógica combinacional", que em página inglesa precisam sair em inglês.
   */
  meio: string | PorIdioma;
  estado: Estado;
  link?: { href: string; tipo: TipoLink };
  /** Marca obra cuja ficha ainda está incompleta. Não vai pra parede. */
  pendente?: boolean;
  /**
   * Etiquetas grossas para filtrar o acervo. Não é a stack inteira: é o que
   * alguém digitaria procurando. Nome de tecnologia não se traduz.
   */
  tags: string[];
  /**
   * Sai na parede da home. O número é a ordem em cartaz, do menor para o
   * maior, e não tem relação com a ordem do acervo. Curadoria é escolha,
   * não cronologia.
   */
  destaque?: number;
  /**
   * Onde a ficha mora. `obra` é projeto fechado, com começo e fim, e vai
   * para a coleção. `experiencia` é o que continua rodando (canal, emprego,
   * estágio) e vai para a página de experiência. Padrão: obra.
   */
  tipo?: 'obra' | 'experiencia';
  resumo: PorIdiomaLinhas;
  papel: PorIdiomaLinhas;
  credito: PorIdiomaLinhas;
  /**
   * A medida da obra. Etiqueta de museu tem dimensão em centímetros; em
   * software e vídeo, a medida é alcance, volume e tempo de estrada.
   *
   * Aceita lista quando a enumeração é longa e a quebra é escolhida, em vez
   * de deixar a largura decidir onde cortar.
   */
  dimensoes?: PorIdiomaLinhas;
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

export const inicioDaObra = (o: Obra) => (o.inicio ? new Date(o.inicio) : undefined);
export const fimDaObra = (o: Obra) => (o.fim ? new Date(o.fim) : undefined);

/** "2026" para o que terminou, "2020 - atualmente" para o que continua. */
export const anoExibido = (o: Obra, atualmente: string) =>
  o.ativa ? `${o.ano} - ${atualmente}` : o.ano;

export const OBRAS: Obra[] = [
  {
    // A galeria dentro da galeria. A ficha desta obra é a página em que quem
    // lê está: por isso o link leva ao código, que é a única parte dela que
    // ainda não está à vista.
    slug: 'fariagallery',
    titulo: 'Faria Gallery',
    ano: '2026',
    meio: 'Astro, TypeScript, Tailwind, Cloudflare Workers',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/FariaGallery', tipo: 'codigo' },
    tags: ['Web', 'Astro'],
    destaque: 1,
    resumo: {
      pt: ['O site onde esta ficha está pendurada.', 'Portfólio em três idiomas, sem imagem e sem back-end.'],
      en: ['The site where this very label is hanging.', 'A portfolio in three languages, with no images and no back end.'],
      es: ['El sitio donde está colgada esta ficha.', 'Portafolio en tres idiomas, sin imágenes y sin back-end.'],
    },
    dimensoes: {
      pt: '3 páginas, 3 idiomas e 3 dias de construção.',
      en: '3 pages, 3 languages and 3 days of building.',
      es: '3 páginas, 3 idiomas y 3 días de construcción.',
    },
    papel: { pt: 'Sozinho', en: 'Solo', es: 'En solitario' },
    credito: {
      pt: 'Projeto pessoal, no ar desde 7 de agosto de 2026. Sem servidor, sem banco e sem formulário: a hospedagem não custa nada e o domínio é a única despesa.',
      en: 'Personal project, live since 7 August 2026. No server, no database, and no forms: hosting costs nothing and the domain is the only expense.',
      es: 'Proyecto personal, al aire desde el 7 de agosto de 2026. Sin servidor, sin base de datos y sin formularios: el alojamiento no cuesta nada y el dominio es el único gasto.',
    },
  },
  {
    slug: 'simulado-online',
    titulo: 'Simulado Online',
    ano: '2026',
    meio: {
      pt: 'HTML, CSS e JavaScript puro',
      en: 'Plain HTML, CSS, and JavaScript',
      es: 'HTML, CSS y JavaScript puro',
    },
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
    slug: 'blucker',
    titulo: 'Blucker',
    ano: '2026',
    meio: 'Angular 19, Node.js, Express',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/PI.2-BluckerEcommerce', tipo: 'codigo' },
    tags: ['Web', 'Angular', 'Node.js'],
    resumo: {
      pt: ['Loja de jogos digitais, catálogo', 'até o carrinho.'],
      en: 'A digital game store, from catalogue to checkout.',
      es: 'Tienda de juegos digitales, del catálogo al carrito.',
    },
    papel: {
      pt: 'Full-stack, em dupla',
      en: 'Full-stack, in a pair',
      es: 'Full-stack, en pareja',
    },
    credito: {
      pt: [
        'Projeto Integrador II, Senac Santo Amaro.',
        'Com José Victor Souza. Orientação de Evandro Carlos Teruel.',
      ],
      en: [
        'Capstone project II, Senac Santo Amaro.',
        'With José Victor Souza. Advised by Evandro Carlos Teruel.',
      ],
      es: [
        'Proyecto Integrador II, Senac Santo Amaro.',
        'Con José Victor Souza. Orientación de Evandro Carlos Teruel.',
      ],
    },
  },
  {
    slug: 'bluckertv',
    titulo: 'BluckerTV',
    ano: '2026',
    meio: 'PeerTube, TypeScript, PostgreSQL, nginx, FFmpeg',
    estado: 'noar',
    link: { href: 'https://blucker.tv', tipo: 'site' },
    /* Sem `tipo`, ou seja: obra de coleção, e não experiência. Ele mudou de
       sala em 10/08/2026, e saiu junto o `inicio`, que fazia aparecer um campo
       DURAÇÃO que nenhuma outra obra da coleção tem. A data de estreia agora
       está escrita no crédito, e data escrita não envelhece: o que envelhece é
       duração. */
    tags: ['Vídeo', 'YouTube', 'TypeScript', 'Infraestrutura'],
    destaque: 2,
    resumo: {
      /* Duas frases fechadas, e não uma frase quebrada no meio: por isso a
         primeira termina em ponto e a segunda abre em maiúscula. Ele trocou a
         vírgula pelo ponto em 10/08/2026. */
      pt: ['Plataforma independente de vídeos.', 'Construída sobre o PeerTube, software livre.'],
      en: ['Independent video platform.', 'Built on PeerTube, free software.'],
      es: ['Plataforma independiente de videos.', 'Construida sobre PeerTube, software libre.'],
    },
    dimensoes: {
      pt: ['70 usuários, 150 vídeos, 1 TB de vídeos hospedados.'],
      en: ['70 users, 150 videos, 1 TB of video hosted.'],
      es: ['70 usuarios, 150 videos, 1 TB de video alojado.'],
    },
    papel: {
      pt: 'Sozinho: Infraestrutura, produto, jurídico e suporte.',
      en: 'Solo: Infrastructure, product, legal, and support.',
      es: 'En solitario: Infraestructura, producto, legal y soporte.',
    },
    credito: {
      pt: [
        'Projeto pessoal, no ar desde 19 de março de 2026.',
        'Construída sobre o PeerTube, com app publicado na Play Store',
        'E marca deferida no INPI.',
      ],
      en: [
        'Personal project, online since 19 March 2026.',
        'Built on PeerTube, with an app published on the Play Store',
        'And a trademark granted by the Brazilian patent office.',
      ],
      es: [
        'Proyecto personal, al aire desde el 19 de marzo de 2026.',
        'Construida sobre PeerTube, con app publicada en la Play Store',
        'Y marca concedida en el INPI.',
      ],
    },
  },
  {
    // A única experiência do acervo desde 11/08/2026: o outro canal, que
    // dividia a sala com este, saiu do site por decisão dele. Não é software,
    // e continua sendo obra: o meio é vídeo em vez de código, e em número é a
    // de maior alcance de tudo que está aqui.
    //
    // Sem `anoOrdem`, que só ordenava grupo de ano dentro do catálogo. O
    // `ativa` fica: é dele que sai o "2021 - atualmente" da margem, e a
    // etiqueta só monta o período onde recebe a propriedade `periodo`, hoje
    // apenas na sala de experiência. No cartaz da home o ano continua seco.
    //
    // O meio abre em "Canal no YouTube" de propósito: é a primeira coisa que
    // alguém lê ao entrar na sala, e "Até Zerar" sozinho não diz do que se
    // trata para quem nunca viu o canal.
    slug: 'ate-zerar',
    titulo: 'Até Zerar',
    ano: '2021',
    ativa: true,
    inicio: '2021-12-01',
    tipo: 'experiencia',
    meio: {
      pt: 'Projeto no YouTube, produção de conteúdo em 4K60fps',
      en: 'YouTube project, content production in 4K60fps',
      es: 'Proyecto de YouTube, producción de contenido en 4K60fps',
    },
    estado: 'noar',
    link: { href: 'https://www.youtube.com/@atezerar', tipo: 'projeto' },
    tags: ['Vídeo', 'YouTube', 'Games'],
    destaque: 3,
    resumo: {
      pt: [
        'Jogos inteiros, do início ao fim, em 4K60fps.',
        'A ideia é assistir como se fosse filme.',
      ],
      en: [
        'Whole games, start to finish, in 4K60fps.',
        'Made to be watched like a film.',
      ],
      es: [
        'Juegos enteros, de principio a fin, en 4K60fps.',
        'Pensado para verse como una película.',
      ],
    },
    papel: {
      pt: [
        'Sozinho: gravação, edição, branding, otimização de SEO,',
        'marketing e publicação.',
      ],
      en: [
        'Solo: recording, editing, branding, SEO optimisation,',
        'marketing, and publishing.',
      ],
      es: [
        'En solitario: grabación, edición, branding, optimización de SEO,',
        'marketing y publicación.',
      ],
    },
    credito: {
      pt: [
        'Projeto pessoal, no ar desde dezembro de 2021.',
        'Organizado em coleções por franquia.',
      ],
      en: [
        'Personal project, running since December 2021.',
        'Organised into playlists by franchise.',
      ],
      es: [
        'Proyecto personal, al aire desde diciembre de 2021.',
        'Organizado en listas por franquicia.',
      ],
    },
    dimensoes: {
      pt: [
        '165 vídeos, 5,8 milhões de visualizações, 26,5 mil inscritos.',
        '200 mil visitas mensais, 500 mil novas horas de exibição anuais.',
      ],
      en: [
        '165 videos, 5.8 million views, 26.5 thousand subscribers.',
        '200 thousand monthly visits, 500 thousand new watch hours per year.',
      ],
      es: [
        '165 videos, 5,8 millones de visualizaciones, 26,5 mil suscriptores.',
        '200 mil visitas mensuales, 500 mil nuevas horas de visualización anuales.',
      ],
    },
  },
  {
    slug: 'estufa-hidroponica',
    titulo: 'Estufa Hidropônica',
    ano: '2025',
    meio: {
      pt: 'Lógica combinacional, Logisim 2.7.1',
      en: 'Combinational logic, Logisim 2.7.1',
      es: 'Lógica combinacional, Logisim 2.7.1',
    },
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/EstufaHidroponica', tipo: 'projeto' },
    tags: ['Hardware', 'Lógica digital'],
    resumo: {
      pt: 'Controle de estufa de alface resolvido em lógica combinacional.',
      en: 'Lettuce greenhouse control solved with combinational logic.',
      es: 'Control de invernadero de lechuga resuelto con lógica combinacional.',
    },
    papel: { pt: 'Em grupo', en: 'In a team', es: 'En grupo' },
    credito: {
      pt: 'Nano projeto de Conceitos de Computação, Senac Santo Amaro, em grupo de sete, com Paulo Henrique de Castro Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu, Vinicius de Castro Marques, Eduardo Almeida Oliveira e Luciano Alves de Andrade Neto. Orientação de Jean Carlo Wagner.',
      en: 'Short project for Computing Concepts, Senac Santo Amaro, in a team of seven, with Paulo Henrique de Castro Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu, Vinicius de Castro Marques, Eduardo Almeida Oliveira, and Luciano Alves de Andrade Neto. Advised by Jean Carlo Wagner.',
      es: 'Nano proyecto de Conceptos de Computación, Senac Santo Amaro, en grupo de siete, con Paulo Henrique de Castro Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu, Vinicius de Castro Marques, Eduardo Almeida Oliveira y Luciano Alves de Andrade Neto. Orientación de Jean Carlo Wagner.',
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
    papel: { pt: 'Sozinho', en: 'Solo', es: 'En solitario' },
    credito: {
      pt: 'Projeto pessoal. Contas em SQLite local, com senha em hash BCrypt, verificação em dois fatores por PIN e recuperação por código. Dificuldade que sobe e desce conforme o acerto.',
      en: 'Personal project. Accounts in a local SQLite database, with BCrypt-hashed passwords, two-factor verification by PIN, and recovery by code. Difficulty that rises and falls with performance.',
      es: 'Proyecto personal. Cuentas en SQLite local, con contraseña en hash BCrypt, verificación en dos factores por PIN y recuperación por código. Dificultad que sube y baja según el acierto.',
    },
  },
  {
    slug: 'biblioteca-virtual',
    titulo: 'Biblioteca Virtual',
    ano: '2024',
    meio: 'Django, Python',
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
      pt: 'Trabalho de Conclusão de Curso do Ensino Médio Técnico em Informática para Internet, com Caio Cardoso Silva, Gabriel Medeiros e Heloisa Teodozio.',
      en: 'Final project for the technical high school diploma in Internet Computing, with Caio Cardoso Silva, Gabriel Medeiros, and Heloisa Teodozio.',
      es: 'Trabajo de Conclusión de Curso de la Educación Media Técnica en Informática para Internet, con Caio Cardoso Silva, Gabriel Medeiros y Heloisa Teodozio.',
    },
  },
];

export const obraPorSlug = (slug: string) => OBRAS.find((o) => o.slug === slug);
