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
  /**
   * Quando começou e quando terminou, em ISO. Serve para calcular a duração
   * sozinho, em vez de eu escrever "5 meses" e a conta envelhecer. Sem `fim`
   * e com `ativa`, conta até hoje.
   */
  inicio?: string;
  fim?: string;
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
  /**
   * Sai na parede da home. O número é a ordem em cartaz, do menor para o
   * maior, e não tem relação com a ordem do acervo. Curadoria é escolha,
   * não cronologia.
   */
  destaque?: number;
  /**
   * Ordem dentro da sala (coleção ou experiência), quando ela não pode sair
   * da data. Menor vem primeiro, e quem não tem cai para o fim, ordenado por
   * ano como sempre.
   *
   * Existe porque a sala de experiência é curadoria dele: a plataforma
   * encerrada aparece antes do canal que ainda roda, e nenhuma conta de data
   * produz isso.
   */
  ordemSala?: number;
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

export const inicioDaObra = (o: Obra) => (o.inicio ? new Date(o.inicio) : undefined);
export const fimDaObra = (o: Obra) => (o.fim ? new Date(o.fim) : undefined);

/** "2026" para o que terminou, "2020 - atualmente" para o que continua. */
export const anoExibido = (o: Obra, atualmente: string) =>
  o.ativa ? `${o.ano} - ${atualmente}` : o.ano;

export const OBRAS: Obra[] = [
  {
    slug: 'blucker',
    titulo: 'Blucker',
    ano: '2026',
    meio: 'Angular 19, Node.js, Express',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/PI.2-BluckerEcommerce', tipo: 'codigo' },
    tags: ['Web', 'Angular', 'Node.js'],
    destaque: 1,
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
    inicio: '2026-03-01',
    fim: '2026-08-04',
    // Empresa aberta, operada e fechada. Isso é experiência, não projeto.
    tipo: 'experiencia',
    tags: ['Vídeo', 'YouTube', 'TypeScript', 'Infraestrutura'],
    destaque: 2,
    ordemSala: 1,
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
    // O canal que veio antes do Até Zerar, e a razão de ele existir: foi aqui
    // que a produção de vídeo virou rotina, e foi daqui que saiu a decisão de
    // cortar o formato comentado e ficar só com o jogo inteiro.
    slug: 'blucker12',
    titulo: 'Blucker12',
    // Período por extenso: numa experiência o que importa é de quando até
    // quando, não o ano solto. As datas batem com o LinkedIn dele.
    ano: '2018 - 2021',
    inicio: '2018-10-01',
    // Primeiro dia depois do fim, e não o último dia dele: assim dezembro de
    // 2021 conta inteiro e a duração fecha nos mesmos 3 anos e 3 meses que o
    // LinkedIn mostra.
    fim: '2022-01-01',
    tipo: 'experiencia',
    meio: 'Vídeo, gameplay comentado e competições online',
    estado: 'noar',
    link: { href: 'https://www.youtube.com/@blucker12', tipo: 'canal' },
    tags: ['Vídeo', 'YouTube', 'Games'],
    ordemSala: 3,
    resumo: {
      pt: 'O primeiro canal: gameplay comentado, guia, notícia e speedrun, com recordes mundiais em Resident Evil 4.',
      en: 'The first channel: commentated gameplay, guides, news, and speedruns, with world records in Resident Evil 4.',
      es: 'El primer canal: gameplay comentado, guías, noticias y speedruns, con récords mundiales en Resident Evil 4.',
    },
    dimensoes: {
      pt: '921 vídeos, 3,2 milhões de visualizações, 11,4 mil inscritos',
      en: '921 videos, 3.2 million views, 11.4 thousand subscribers',
      es: '921 videos, 3,2 millones de visualizaciones, 11,4 mil suscriptores',
    },
    papel: {
      pt: 'Sozinho: gravação, edição, roteiro e publicação',
      en: 'Solo: recording, editing, scripting, and publishing',
      es: 'En solitario: grabación, edición, guion y publicación',
    },
    credito: {
      pt: 'Projeto pessoal, de outubro de 2018 a dezembro de 2021. O canal segue no ar como acervo, e a produção nova passou a sair no Até Zerar.',
      en: 'Personal project, from October 2018 to December 2021. The channel remains online as an archive, and new production moved to Até Zerar.',
      es: 'Proyecto personal, de octubre de 2018 a diciembre de 2021. El canal sigue al aire como acervo, y la producción nueva pasó a salir en Até Zerar.',
    },
  },
  {
    // Não é software, e continua sendo obra: o meio é vídeo em vez de código.
    // Em número, é a obra de maior alcance da coleção.
    slug: 'ate-zerar',
    titulo: 'Até Zerar',
    ano: '2021',
    anoOrdem: 2026,
    ativa: true,
    inicio: '2021-12-01',
    tipo: 'experiencia',
    meio: 'Vídeo, gameplay sem comentários em 4K60fps',
    estado: 'noar',
    link: { href: 'https://www.youtube.com/@atezerar', tipo: 'canal' },
    tags: ['Vídeo', 'YouTube', 'Games'],
    destaque: 3,
    ordemSala: 2,
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
      pt: 'Projeto pessoal, no ar desde dezembro de 2021, sucedendo o canal Blucker12. Do PlayStation 1 ao PlayStation 5 Pro, mais Xbox, Nintendo e PC, organizado em coleções por franquia e por ano.',
      en: 'Personal project, running since December 2021, succeeding the Blucker12 channel. From PlayStation 1 to PlayStation 5 Pro, plus Xbox, Nintendo, and PC, organised into playlists by franchise and by year.',
      es: 'Proyecto personal, al aire desde diciembre de 2021, sucediendo al canal Blucker12. Del PlayStation 1 al PlayStation 5 Pro, más Xbox, Nintendo y PC, organizado en listas por franquicia y por año.',
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
    ano: '2025',
    meio: 'Lógica combinacional, Logisim 2.7.1',
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
      pt: 'Trabalho de Conclusão de Curso do Ensino Médio Técnico em Informática para Internet, com Caio Cardoso Silva, Gabriel Medeiros e Heloisa Teodozio.',
      en: 'Final project for the technical high school diploma in Internet Computing, with Caio Cardoso Silva, Gabriel Medeiros, and Heloisa Teodozio.',
      es: 'Trabajo de Conclusión de Curso de la Educación Media Técnica en Informática para Internet, con Caio Cardoso Silva, Gabriel Medeiros y Heloisa Teodozio.',
    },
  },
];

export const obraPorSlug = (slug: string) => OBRAS.find((o) => o.slug === slug);
