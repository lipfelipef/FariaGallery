/**
 * As obras da coleção.
 *
 * A ordem dos campos segue a etiqueta de museu de verdade:
 * título, ano, MEIO (do que a obra é feita), PAPEL, CRÉDITO, ESTADO.
 * "Meio" é a stack. Um quadro é feito de óleo sobre tela, o Blucker
 * é feito de Angular e Express. É a mesma informação.
 */

export type Estado = 'publico' | 'noar' | 'encerrado';

export interface Obra {
  /** Título da obra. Vai em itálico, como manda a convenção. */
  titulo: string;
  ano: string;
  /** Uma linha. O que a coisa faz, sem adjetivo. */
  resumo: string;
  /** A stack, tipografada como linha de meio: separada por vírgula. */
  meio: string;
  papel: string;
  credito: string;
  estado: Estado;
  link?: { href: string; texto: string };
  /** Marca obra cuja ficha ainda está incompleta. Não vai pra parede. */
  pendente?: boolean;
}

export const ESTADO_TEXTO: Record<Estado, string> = {
  publico: 'Código público',
  noar: 'No ar',
  encerrado: 'Encerrado',
};

export const OBRAS: Obra[] = [
  {
    titulo: 'Blucker',
    ano: '2026',
    resumo: 'Loja de jogos digitais, do catálogo até o carrinho.',
    meio: 'Angular 19, Node.js, Express',
    papel: 'Full-stack, em dupla',
    credito:
      'Projeto Integrador II, Senac São Paulo. Com José Victor Souza. Orientação de Evandro Carlos Teruel.',
    estado: 'publico',
    link: {
      href: 'https://github.com/lipfelipef/PI.2-BluckerEcommerce',
      texto: 'Ver o código',
    },
  },
  {
    titulo: 'BluckerTV',
    ano: 'a definir',
    resumo: 'A definir: o que era, para quem era e onde parou.',
    meio: 'a definir',
    papel: 'a definir',
    credito:
      'Estudo de caso honesto: o que travou, o que custou e o que ficou de aprendizado de engenharia, produto e negócio.',
    estado: 'encerrado',
    pendente: true,
  },
  {
    titulo: 'Simulado Online',
    ano: '2026',
    resumo: 'Monta listas de perguntas e aplica simulado de qualquer assunto.',
    meio: 'HTML, CSS e JavaScript puro',
    papel: 'Sozinho',
    credito:
      'Projeto pessoal. Sem back-end e sem etapa de build: as perguntas ficam salvas no próprio navegador de quem usa.',
    estado: 'publico',
    link: {
      href: 'https://github.com/lipfelipef/SimuladoOnline',
      texto: 'Ver o código',
    },
  },
  {
    titulo: 'Estufa Hidropônica',
    ano: '2026',
    resumo: 'Controle de estufa de alface resolvido em lógica combinacional.',
    meio: 'Lógica combinacional, Logisim 2.7.1',
    papel: 'Sozinho',
    credito:
      'Nano projeto de Conceitos de Computação, Senac São Paulo. Expressões minimizadas por mapa de Karnaugh, 13 portas de duas entradas, mais gerador e verificador de paridade ímpar.',
    estado: 'publico',
    link: {
      href: 'https://github.com/lipfelipef/EstufaHidroponica',
      texto: 'Ver o projeto',
    },
  },
  {
    titulo: 'Quiz Animado',
    ano: '2025',
    resumo: 'Quiz sobre desenho dos anos 2000, com login, sorteio e pontuação.',
    meio: 'Java, JavaFX, SQLite',
    papel: 'Em grupo',
    credito:
      'Projeto Integrador I, Senac São Paulo. Orientação de Marcus Vinícius Camillo Gália. Documentação escrita em LaTeX.',
    estado: 'publico',
    link: {
      href: 'https://github.com/lipfelipef/QuizAnimado',
      texto: 'Ver o código',
    },
  },
  {
    titulo: 'Biblioteca Virtual',
    ano: '2024',
    resumo: 'Acervo digital com cadastro, busca e empréstimo de títulos.',
    meio: 'Python',
    papel: 'Em grupo',
    credito:
      'Trabalho de Conclusão de Curso do Ensino Médio Técnico em Informática para Internet.',
    estado: 'publico',
    link: {
      href: 'https://github.com/lipfelipef/BibliotecaTCC',
      texto: 'Ver o código',
    },
  },
];
