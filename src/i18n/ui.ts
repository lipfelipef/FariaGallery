import type { Locale } from '../consts';

/**
 * "1 obra" e não "1 obras".
 *
 * A contagem da entrada era escrita com o plural fixo, e passou despercebido
 * enquanto os dois números eram maiores que um. Quando a sala de experiência
 * ficou com uma entrada só, a home passaria a dizer "1 experiências" nos três
 * idiomas. Contagem que vem de dado varia, então a palavra ao lado dela
 * precisa variar junto.
 */
const plural = (n: number, um: string, muitos: string) => `${n} ${n === 1 ? um : muitos}`;

/**
 * Todo texto de interface do site, nos três idiomas.
 *
 * Regra que evita o abandono: tudo que existe existe nos três. Nenhuma sala
 * fica pela metade num idioma, e o seletor nunca leva a lugar vazio.
 */
export const UI = {
  pt: {
    'idioma.nome': 'Português',
    'idioma.curto': 'PT',
    'idioma.escolher': 'Escolher idioma',
    'idioma.semTexto': 'este texto ainda não existe neste idioma',

    'pular': 'Pular para o conteúdo',

    /**
     * O nome da região de navegação do topo, para quem usa leitor de tela.
     * Ela cobre o menu, o seletor de idioma e o botão de tema, então precisa
     * nomear o conjunto. Dizia "Obras", que é o nome de uma sala de dentro:
     * o leitor anunciava "navegação Obras" e listava Contato ali dentro.
     */
    'nav.rotulo': 'Navegação',

    'nav.contato': 'Contato',

    'tema.escuro': 'Sala escura',
    'tema.clara': 'Sala clara',
    'tema.paraEscuro': 'Mudar para a sala escura',
    'tema.paraClara': 'Mudar para a sala clara',

    /**
     * Uma frase por linha, e a quebra é escolhida aqui.
     *
     * Texto corrido quebrava onde a largura mandava, e saía coisa como
     * "Análise e / Desenvolvimento de Sistemas, Centro / Universitário Senac".
     * Ficha de museu não quebra assim: cada linha fecha uma informação.
     */
    'artista': [
      'Brasileiro, n. 2006.',
      'Análise e Desenvolvimento de Sistemas.',
      'Centro Universitário Senac, Santo Amaro.',
    ],
    'parede.1':
      'Aqui fica o registro do que eu construo. Cada obra vem com a ficha inteira: do que é feita, qual foi meu papel, com quem foi e em que estado está.',
    'parede.2':
      'O que não deu certo entra com a mesma ficha, porque projeto que parou também tem o que ensinar.',
    'acervo': (obras: number, experiencias: number) => [
      `${plural(obras, 'obra', 'obras')} de coleção, ${plural(experiencias, 'experiência', 'experiências')}.`,
    ],
    'disponivel': 'Disponível para novas oportunidades',

    'sala.contato': 'Contato',

    'campo.meio': 'Meio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',

    'sala.percurso': 'O percurso, do começo ao mais recente',
    'campo.colofao': 'Colofão',
    'campo.dimensoes': 'Dimensões',
    'campo.duracao': 'Duração',
    'tempo.atualmente': 'atualmente',

    'sala.emCartaz': 'Em cartaz',
    'nav.colecao': 'Coleção',
    'colecao.titulo': 'Coleção',
    'colecao.chamada': [
      'O acervo inteiro, do mais novo para o mais antigo.',
      'Filtre pelo meio para achar rápido.',
    ],
    'colecao.verTudo': (total: number) => `Ver a coleção inteira, ${total} obras`,
    'colecao.filtrar': 'Filtrar',
    'colecao.todas': 'Todas',
    'colecao.contagem': (mostrando: number, total: number) =>
      mostrando === total ? `${total} obras` : `${mostrando} de ${total} obras`,
    'colecao.nada': 'Nenhuma obra com esse filtro.',
    /** Abre a ficha inteira da obra, no catálogo. */
    'colecao.ficha': 'Ficha',
    /** Abre o resto das etiquetas de filtro, que ficam recolhidas. */
    'filtro.mais': (n: number) => `Mais ${n}`,
    'filtro.menos': 'Recolher',

    'estado.publico': 'Código público',
    'estado.noar': 'No ar',
    'estado.encerrado': 'Encerrado',

    'link.codigo': 'Ver o código',
    'link.projeto': 'Ver o projeto',
    'link.canal': 'Ver o canal',
    'link.site': 'Ver o site',
    'link.novaAba': '(abre em nova aba)',

    'contato.titulo': 'Contato',
    'contato.email': 'E-mail',
    'contato.chamada': [
      'Para proposta de vaga, estágio, freela ou parceria.',
      'Se você quer contratar ou construir algo junto, é por aqui.',
    ],
    'contato.local': 'Onde estou',
    'contato.localValor': 'São Paulo, Brasil',
    'contato.responde': 'Resposta',
    'contato.respondeValor': 'Escrevo de volta em português, inglês ou espanhol',
    'contato.nota': [
      'Escreva direto, sem formalidade. Se for vaga, o link da descrição já ajuda.',
      'Se for projeto, uma linha sobre o escopo e o prazo resolve.',
    ],

    'sala.redes': 'Onde me achar',
    'erro404.titulo': 'Esta sala não existe',
    /**
     * Uma frase por linha, e a quebra é escolhida aqui. Ver `artista` acima:
     * mesma regra, mesmo motivo. Sem isto a frase dobrava onde a largura
     * mandava e sobrava "As" pendurado no fim da segunda linha.
     *
     * Vira uma frase só na descrição que vai para o buscador.
     */
    'erro404.texto': [
      'O endereço que você abriu não corresponde a nada aqui.',
      'Pode ser link antigo, pode ser erro de digitação.',
      'As saídas estão abaixo.',
    ],
    'nav.experiencia': 'Experiência',
    'experiencia.titulo': 'Experiência',
    /**
     * A segunda linha diz "YouTube" de propósito, e é a razão de ela existir.
     *
     * A sala tem uma entrada só, e o nome dela é nome próprio: quem nunca viu
     * o canal lia "Até Zerar" e não fazia ideia do que era. O nome do lugar
     * onde a coisa acontece precisa estar na abertura, antes de qualquer ficha.
     *
     * "desde 2021" é data escrita, e data escrita não envelhece. Quem conta o
     * tempo corrido é o campo DURAÇÃO da ficha, que se refaz sozinho.
     */
    'experiencia.chamada': [
      'O que roda fora de projeto fechado.',
      'Hoje, um canal no YouTube em produção desde 2021.',
    ],
    'experiencia.vazio': 'Nada aqui ainda.',

    'colofao': 'Feito em Astro. Composto em Archivo e EB Garamond.',
    'rodape.privacidade': [
      'Este site não coleta dados pessoais, não usa cookies,',
      'Não rastreia quem visita e nem há banco de dados.',
    ],
    'rodape.codigo': 'Código aberto no GitHub, sob licença MIT.',
    'rodape.direitos': (ano: number) => [
      `Textos, imagens e identidade visual © Felipe Faria, ${ano}.`,
      'Todos os direitos reservados.',
    ],

    'meta.home':
      'Felipe Faria, desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas. Projetos e experiências com a ficha inteira, do material ao estado atual.',

    'meta.colecao':
      'Todos os projetos de Felipe Faria, do mais novo ao mais antigo: a BluckerTV, web, Java, Python e lógica digital, com a stack, o papel dele e o estado de cada um.',
    'meta.experiencia':
      'A experiência de Felipe Faria: o canal Até Zerar no YouTube, com 165 vídeos e 5,7 milhões de visualizações, em produção desde dezembro de 2021.',
    'meta.contato':
      'Fale com Felipe Faria, desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas em São Paulo. Contato direto por e-mail, sem formulário.',
  },

  en: {
    'idioma.nome': 'English',
    'idioma.curto': 'EN',
    'idioma.escolher': 'Choose language',
    'idioma.semTexto': 'this text does not exist in this language yet',

    'pular': 'Skip to content',

    'nav.rotulo': 'Navigation',

    'nav.contato': 'Contact',

    'tema.escuro': 'Dark room',
    'tema.clara': 'Light room',
    'tema.paraEscuro': 'Switch to the dark room',
    'tema.paraClara': 'Switch to the light room',

    'artista': [
      'Brazilian, b. 2006.',
      'Systems Analysis and Development.',
      'Centro Universitário Senac, Santo Amaro campus.',
    ],
    'parede.1':
      'This is the record of what I build. Every work comes with the full label: what it is made of, what my role was, who I built it with, and what state it is in.',
    'parede.2':
      'What did not work out gets the same label, because a project that stopped still has something to teach.',
    'acervo': (obras: number, experiencias: number) => [
      `${plural(obras, 'work', 'works')} in the collection, ${plural(experiencias, 'experience', 'experiences')}.`,
    ],
    'disponivel': 'Available for new opportunities',

    'sala.contato': 'Contact',

    'campo.meio': 'Medium',
    'campo.papel': 'Role',
    'campo.credito': 'Credit',
    'campo.estado': 'Status',

    'sala.percurso': 'The route, from the start to the most recent',
    'campo.colofao': 'Colophon',
    'campo.dimensoes': 'Dimensions',
    'campo.duracao': 'Duration',
    'tempo.atualmente': 'present',

    'sala.emCartaz': 'On view',
    'nav.colecao': 'Collection',
    'colecao.titulo': 'Collection',
    'colecao.chamada': [
      'The whole holdings, newest first.',
      'Filter by medium to find something fast.',
    ],
    'colecao.verTudo': (total: number) => `See the whole collection, ${total} works`,
    'colecao.filtrar': 'Filter',
    'colecao.todas': 'All',
    'colecao.contagem': (mostrando: number, total: number) =>
      mostrando === total ? `${total} works` : `${mostrando} of ${total} works`,
    'colecao.nada': 'No work matches that filter.',
    'colecao.ficha': 'Label',
    'filtro.mais': (n: number) => `${n} more`,
    'filtro.menos': 'Collapse',

    'estado.publico': 'Public source',
    'estado.noar': 'Live',
    'estado.encerrado': 'Discontinued',

    'link.codigo': 'View the source',
    'link.projeto': 'View the project',
    'link.canal': 'View the channel',
    'link.site': 'View the site',
    'link.novaAba': '(opens in a new tab)',

    'contato.titulo': 'Contact',
    'contato.email': 'Email',
    'contato.chamada': [
      'For a role, an internship, freelance work, or a partnership.',
      'If you want to hire or build something together, this is the way.',
    ],
    'contato.local': 'Based in',
    'contato.localValor': 'São Paulo, Brazil',
    'contato.responde': 'Reply',
    'contato.respondeValor': 'I write back in Portuguese, English, or Spanish',
    'contato.nota': [
      'Write directly, no formalities. For a role, the job description link already helps.',
      'For a project, one line on scope and timeline is enough.',
    ],

    'sala.redes': 'Where to find me',
    'erro404.titulo': 'This room does not exist',
    'erro404.texto': [
      'The address you opened does not match anything here.',
      'Could be an old link, could be a typo.',
      'The ways out are below.',
    ],
    'nav.experiencia': 'Experience',
    'experiencia.titulo': 'Experience',
    'experiencia.chamada': [
      'What runs outside of a finished project.',
      'Right now, a YouTube channel running since 2021.',
    ],
    'experiencia.vazio': 'Nothing here yet.',

    'colofao': 'Built with Astro. Set in Archivo and EB Garamond.',
    'rodape.privacidade': [
      'This site collects no personal data and sets no cookies,',
      'It tracks nobody and has no database.',
    ],
    'rodape.codigo': 'Open source on GitHub, under the MIT licence.',
    'rodape.direitos': (ano: number) => [
      `Text, images, and visual identity © Felipe Faria, ${ano}.`,
      'All rights reserved.',
    ],

    'meta.home':
      'Felipe Faria, developer and Systems Analysis and Development student. Projects and experience with the full label, from material to current state.',

    'meta.colecao':
      'Every project by Felipe Faria, newest first: BluckerTV, web, Java, Python, and digital logic, with the stack, his role, and the current state of each one.',
    'meta.experiencia':
      'Felipe Faria experience: the Até Zerar channel on YouTube, with 165 videos and 5.7 million views, running since December 2021.',
    'meta.contato':
      'Get in touch with Felipe Faria, developer and Systems Analysis and Development student in São Paulo. Direct contact by email, with no form to fill in.',
  },

  es: {
    'idioma.nome': 'Español',
    'idioma.curto': 'ES',
    'idioma.escolher': 'Elegir idioma',
    'idioma.semTexto': 'este texto todavía no existe en este idioma',

    'pular': 'Saltar al contenido',

    'nav.rotulo': 'Navegación',

    'nav.contato': 'Contacto',

    'tema.escuro': 'Sala oscura',
    'tema.clara': 'Sala clara',
    'tema.paraEscuro': 'Cambiar a la sala oscura',
    'tema.paraClara': 'Cambiar a la sala clara',

    'artista': [
      'Brasileño, n. 2006.',
      'Análisis y Desarrollo de Sistemas.',
      'Centro Universitário Senac, Santo Amaro.',
    ],
    'parede.1':
      'Aquí queda el registro de lo que construyo. Cada obra viene con la ficha completa: de qué está hecha, cuál fue mi papel, con quién la hice y en qué estado está.',
    'parede.2':
      'Lo que no salió bien entra con la misma ficha, porque un proyecto que se detuvo también tiene algo que enseñar.',
    'acervo': (obras: number, experiencias: number) => [
      `${plural(obras, 'obra', 'obras')} de colección, ${plural(experiencias, 'experiencia', 'experiencias')}.`,
    ],
    'disponivel': 'Disponible para nuevas oportunidades',

    'sala.contato': 'Contacto',

    'campo.meio': 'Medio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',

    'sala.percurso': 'El recorrido, del comienzo al más reciente',
    'campo.colofao': 'Colofón',
    'campo.dimensoes': 'Dimensiones',
    'campo.duracao': 'Duración',
    'tempo.atualmente': 'actualmente',

    'sala.emCartaz': 'En exhibición',
    'nav.colecao': 'Colección',
    'colecao.titulo': 'Colección',
    'colecao.chamada': [
      'El acervo entero, del más nuevo al más antiguo.',
      'Filtre por medio para encontrar rápido.',
    ],
    'colecao.verTudo': (total: number) => `Ver la colección entera, ${total} obras`,
    'colecao.filtrar': 'Filtrar',
    'colecao.todas': 'Todas',
    'colecao.contagem': (mostrando: number, total: number) =>
      mostrando === total ? `${total} obras` : `${mostrando} de ${total} obras`,
    'colecao.nada': 'Ninguna obra con ese filtro.',
    'colecao.ficha': 'Ficha',
    'filtro.mais': (n: number) => `${n} más`,
    'filtro.menos': 'Recoger',

    'estado.publico': 'Código público',
    'estado.noar': 'En línea',
    'estado.encerrado': 'Descontinuado',

    'link.codigo': 'Ver el código',
    'link.projeto': 'Ver el proyecto',
    'link.canal': 'Ver el canal',
    'link.site': 'Ver el sitio',
    'link.novaAba': '(se abre en una pestaña nueva)',

    'contato.titulo': 'Contacto',
    'contato.email': 'Correo',
    'contato.chamada': [
      'Para una propuesta de vacante, pasantía, freelance o alianza.',
      'Si quieres contratar o construir algo juntos, es por aquí.',
    ],
    'contato.local': 'Dónde estoy',
    'contato.localValor': 'São Paulo, Brasil',
    'contato.responde': 'Respuesta',
    'contato.respondeValor': 'Respondo en portugués, inglés o español',
    'contato.nota': [
      'Escribe directo, sin formalidades. Si es una vacante, el enlace de la descripción ya ayuda.',
      'Si es un proyecto, una línea sobre alcance y plazo alcanza.',
    ],

    'sala.redes': 'Dónde encontrarme',
    'erro404.titulo': 'Esta sala no existe',
    'erro404.texto': [
      'La dirección que abriste no corresponde a nada aquí.',
      'Puede ser un enlace viejo o un error de tipeo.',
      'Las salidas están abajo.',
    ],
    'nav.experiencia': 'Experiencia',
    'experiencia.titulo': 'Experiencia',
    'experiencia.chamada': [
      'Lo que corre fuera de un proyecto cerrado.',
      'Hoy, un canal de YouTube en producción desde 2021.',
    ],
    'experiencia.vazio': 'Nada aquí todavía.',

    'colofao': 'Hecho en Astro. Compuesto en Archivo y EB Garamond.',
    'rodape.privacidade': [
      'Este sitio no recoge datos personales, no usa cookies,',
      'No rastrea a quien lo visita ni tiene base de datos.',
    ],
    'rodape.codigo': 'Código abierto en GitHub, bajo licencia MIT.',
    'rodape.direitos': (ano: number) => [
      `Textos, imágenes e identidad visual © Felipe Faria, ${ano}.`,
      'Todos los derechos reservados.',
    ],

    'meta.home':
      'Felipe Faria, desarrollador y estudiante de Análisis y Desarrollo de Sistemas. Proyectos y experiencia con la ficha completa, del material al estado actual.',

    'meta.colecao':
      'Todos los proyectos de Felipe Faria, del más nuevo al más antiguo: BluckerTV, web, Java, Python y lógica digital, con la stack, su papel y el estado de cada uno.',
    'meta.experiencia':
      'La experiencia de Felipe Faria: el canal Até Zerar en YouTube, con 165 videos y 5,7 millones de visualizaciones, en producción desde 2021.',
    'meta.contato':
      'Habla con Felipe Faria, desarrollador y estudiante de Análisis y Desarrollo de Sistemas en São Paulo. Contacto directo por correo, sin formulario.',
  },
} as const;

export type ChaveUI = keyof (typeof UI)['pt'];

/** Devolve a função de tradução para um idioma. */
export function traduzir(lang: Locale) {
  return function t<K extends ChaveUI>(chave: K): (typeof UI)['pt'][K] {
    return UI[lang][chave] as (typeof UI)['pt'][K];
  };
}
