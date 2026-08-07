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
  /** Vira a URL do estudo de caso: /obras/blucker */
  slug: string;
  titulo: string;
  ano: string;
  /** A stack, tipografada como linha de meio: separada por vírgula. */
  meio: string;
  estado: Estado;
  link?: { href: string; tipo: TipoLink };
  /** Marca obra cuja ficha ainda está incompleta. Não vai pra parede. */
  pendente?: boolean;
  resumo: PorIdioma;
  papel: PorIdioma;
  credito: PorIdioma;
}

/**
 * O canal fica separado porque não é software: é outro meio, e ganha sala
 * própria. Segue a mesma ficha para a parede não ter duas gramáticas.
 */
export const CANAL: Obra = {
  slug: 'ate-zerar',
  titulo: 'Até Zerar',
  ano: 'a definir',
  meio: 'Vídeo',
  estado: 'noar',
  link: { href: 'https://www.youtube.com/@atezerar', tipo: 'canal' },
  pendente: true,
  resumo: {
    pt: 'A definir: sobre o que é o canal e com que frequência sai vídeo.',
    en: 'To be defined: what the channel is about and how often videos come out.',
    es: 'A definir: de qué trata el canal y con qué frecuencia sale video.',
  },
  papel: { pt: 'a definir', en: 'to be defined', es: 'a definir' },
  credito: { pt: 'a definir', en: 'to be defined', es: 'a definir' },
};

export const OBRAS: Obra[] = [
  {
    slug: 'blucker',
    titulo: 'Blucker',
    ano: '2026',
    meio: 'Angular 19, Node.js, Express',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/PI.2-BluckerEcommerce', tipo: 'codigo' },
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
      pt: 'Projeto Integrador II, Senac São Paulo. Com José Victor Souza. Orientação de Evandro Carlos Teruel.',
      en: 'Capstone project II, Senac São Paulo. With José Victor Souza. Advised by Evandro Carlos Teruel.',
      es: 'Proyecto Integrador II, Senac São Paulo. Con José Victor Souza. Orientación de Evandro Carlos Teruel.',
    },
  },
  {
    slug: 'bluckertv',
    titulo: 'BluckerTV',
    ano: 'a definir',
    meio: 'a definir',
    estado: 'encerrado',
    pendente: true,
    resumo: {
      pt: 'A definir: o que era, para quem era e onde parou.',
      en: 'To be defined: what it was, who it was for, and where it stopped.',
      es: 'A definir: qué era, para quién era y dónde se detuvo.',
    },
    papel: { pt: 'a definir', en: 'to be defined', es: 'a definir' },
    credito: {
      pt: 'Estudo de caso honesto: o que travou, o que custou e o que ficou de aprendizado de engenharia, produto e negócio.',
      en: 'An honest case study: what got stuck, what it cost, and what it taught about engineering, product, and business.',
      es: 'Estudio de caso honesto: qué se trabó, qué costó y qué dejó de aprendizaje de ingeniería, producto y negocio.',
    },
  },
  {
    slug: 'simulado-online',
    titulo: 'Simulado Online',
    ano: '2026',
    meio: 'HTML, CSS e JavaScript puro',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/SimuladoOnline', tipo: 'codigo' },
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
    resumo: {
      pt: 'Controle de estufa de alface resolvido em lógica combinacional.',
      en: 'Lettuce greenhouse control solved with combinational logic.',
      es: 'Control de invernadero de lechuga resuelto con lógica combinacional.',
    },
    papel: { pt: 'Sozinho', en: 'Solo', es: 'En solitario' },
    credito: {
      pt: 'Nano projeto de Conceitos de Computação, Senac São Paulo. Expressões minimizadas por mapa de Karnaugh, 13 portas de duas entradas, mais gerador e verificador de paridade ímpar.',
      en: 'Short project for Computing Concepts, Senac São Paulo. Expressions minimised with Karnaugh maps, 13 two-input gates, plus an odd parity generator and checker.',
      es: 'Nano proyecto de Conceptos de Computación, Senac São Paulo. Expresiones minimizadas por mapa de Karnaugh, 13 compuertas de dos entradas, más generador y verificador de paridad impar.',
    },
  },
  {
    slug: 'quiz-animado',
    titulo: 'Quiz Animado',
    ano: '2025',
    meio: 'Java, JavaFX, SQLite',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/QuizAnimado', tipo: 'codigo' },
    resumo: {
      pt: 'Quiz sobre desenho dos anos 2000, com login, sorteio e pontuação.',
      en: 'A quiz about 2000s cartoons, with login, random draw, and scoring.',
      es: 'Quiz sobre dibujos animados de los 2000, con login, sorteo y puntuación.',
    },
    papel: { pt: 'Em grupo', en: 'In a team', es: 'En grupo' },
    credito: {
      pt: 'Projeto Integrador I, Senac São Paulo. Orientação de Marcus Vinícius Camillo Gália. Documentação escrita em LaTeX.',
      en: 'Capstone project I, Senac São Paulo. Advised by Marcus Vinícius Camillo Gália. Documentation written in LaTeX.',
      es: 'Proyecto Integrador I, Senac São Paulo. Orientación de Marcus Vinícius Camillo Gália. Documentación escrita en LaTeX.',
    },
  },
  {
    slug: 'biblioteca-virtual',
    titulo: 'Biblioteca Virtual',
    ano: '2024',
    meio: 'Python',
    estado: 'publico',
    link: { href: 'https://github.com/lipfelipef/BibliotecaTCC', tipo: 'codigo' },
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
