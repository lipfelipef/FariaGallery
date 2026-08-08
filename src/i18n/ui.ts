import type { Locale } from '../consts';

/**
 * Todo texto de interface do site, nos três idiomas.
 *
 * Regra que evita o abandono: interface, obras e "sobre" existem nos três.
 * Post de blog pode existir em um só, e o build não quebra por causa disso.
 */
export const UI = {
  pt: {
    'idioma.nome': 'Português',
    'idioma.curto': 'PT',
    'idioma.escolher': 'Escolher idioma',
    'idioma.semTexto': 'este texto ainda não existe neste idioma',

    'pular': 'Pular para o conteúdo',

    'nav.obras': 'Obras',
    'nav.blog': 'Blog',
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
    'acervo': (obras: number, experiencias: number, textos: number) =>
      `${obras} obras na coleção, ${experiencias} experiências e ${textos} ${textos === 1 ? 'texto publicado' : 'textos publicados'}.`,
    'disponivel': 'Disponível para novas oportunidades',

    'sala.contato': 'Contato',

    'campo.meio': 'Meio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',
    'campo.publicado': 'Publicado',
    'campo.atualizado': 'Atualizado',
    'campo.assunto': 'Assunto',
    /** Na ficha do post: a obra de que o texto fala, e o caminho até ela. */
    'campo.obra': 'Obra',
    /** Nome acessível da linha do tempo em cartaz. */
    'sala.percurso': 'O percurso, do começo ao mais recente',
    'campo.colofao': 'Colofão',
    'campo.dimensoes': 'Dimensões',
    'campo.duracao': 'Duração',
    'tempo.atualmente': 'atualmente',

    'link.texto': 'Ler o texto completo',

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

    'estado.publico': 'Código público',
    'estado.noar': 'No ar',
    'estado.encerrado': 'Encerrado',

    'link.codigo': 'Ver o código',
    'link.projeto': 'Ver o projeto',
    'link.canal': 'Ver o canal',
    'link.novaAba': '(abre em nova aba)',
    'link.curriculo': 'Baixar o currículo em PDF',

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
    'erro404.texto':
      'O endereço que você abriu não corresponde a nada aqui. Pode ser link antigo, pode ser erro de digitação. As saídas estão abaixo.',
    'nav.experiencia': 'Experiência',
    'experiencia.titulo': 'Experiência',
    'experiencia.chamada': [
      'O que roda fora de projeto fechado.',
      'Plataforma, trabalho e o que vier.',
    ],
    'experiencia.vazio': 'Nada aqui ainda.',

    'blog.titulo': 'Blog',
    'blog.chamada': [
      'Texto sobre o que eu construo: o que deu certo,',
      'O que travou e o que eu faria diferente.',
    ],
    'blog.vazio.titulo': 'Sala em montagem',
    'blog.vazio.texto':
      'Ainda não há texto pendurado aqui. O primeiro sai quando tiver algo que valha ser lido, não antes.',
    'blog.voltar': 'Voltar para o blog',
    // Percurso, e nao "ordem por data": os textos seguem a sequencia escolhida
    // por ele, do primeiro ao ultimo, como as salas de uma exposicao.
    'blog.ordem': 'Percurso',
    'blog.comeco': 'Do começo',
    'blog.fim': 'Do fim',
    'blog.contagem': (mostrando: number, total: number) =>
      mostrando === total
        ? `${total} ${total === 1 ? 'texto' : 'textos'}`
        : `${mostrando} de ${total} textos`,
    'blog.nada': 'Nenhum texto com esse assunto.',

    'colofao': 'Feito em Astro. Composto em Archivo e EB Garamond.',
    'rodape.privacidade':
      'Este site não coleta dados pessoais, não usa cookie e não rastreia quem visita. Não há formulário, login nem banco de dados.',
    'rodape.codigo': 'Código aberto no GitHub, sob licença MIT.',
    'rodape.direitos': (ano: number) => [
      `Textos, imagens e identidade visual © Felipe Faria, ${ano}.`,
      'Todos os direitos reservados.',
    ],

    'meta.home':
      'Felipe Faria, desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas. Projetos e experiências com a ficha inteira, do material ao estado atual.',
    'meta.blog':
      'Textos de Felipe Faria sobre desenvolvimento, infraestrutura e o que aprendeu construindo e encerrando projetos, com números e post-mortem honesto.',
    'meta.blogVazio':
      'Textos de Felipe Faria sobre desenvolvimento e os projetos que ele constrói. A primeira publicação sai quando houver algo que valha ser lido.',
    'meta.colecao':
      'Todos os projetos de Felipe Faria, do mais novo ao mais antigo: web, Java, Python e lógica digital, com a stack, o papel dele e o estado de cada um.',
    'meta.experiencia':
      'A experiência de Felipe Faria: o canal Até Zerar, com 5,7 milhões de visualizações, e a BluckerTV, plataforma de vídeo aberta e encerrada em 2026.',
    'meta.contato':
      'Fale com Felipe Faria, desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas em São Paulo. Contato direto por e-mail e currículo em PDF.',
  },

  en: {
    'idioma.nome': 'English',
    'idioma.curto': 'EN',
    'idioma.escolher': 'Choose language',
    'idioma.semTexto': 'this text does not exist in this language yet',

    'pular': 'Skip to content',

    'nav.obras': 'Works',
    'nav.blog': 'Blog',
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
    'acervo': (obras: number, experiencias: number, textos: number) =>
      `${obras} works in the collection, ${experiencias} experiences, and ${textos} published ${textos === 1 ? 'piece' : 'pieces'}.`,
    'disponivel': 'Available for new opportunities',

    'sala.contato': 'Contact',

    'campo.meio': 'Medium',
    'campo.papel': 'Role',
    'campo.credito': 'Credit',
    'campo.estado': 'Status',
    'campo.publicado': 'Published',
    'campo.atualizado': 'Updated',
    'campo.assunto': 'Subject',
    'campo.obra': 'Work',
    'sala.percurso': 'The route, from the start to the most recent',
    'campo.colofao': 'Colophon',
    'campo.dimensoes': 'Dimensions',
    'campo.duracao': 'Duration',
    'tempo.atualmente': 'present',

    'link.texto': 'Read the full write-up',

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

    'estado.publico': 'Public source',
    'estado.noar': 'Live',
    'estado.encerrado': 'Discontinued',

    'link.codigo': 'View the source',
    'link.projeto': 'View the project',
    'link.canal': 'View the channel',
    'link.novaAba': '(opens in a new tab)',
    'link.curriculo': 'Download the résumé as PDF',

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
    'erro404.texto':
      'The address you opened does not match anything here. Could be an old link, could be a typo. The ways out are below.',
    'nav.experiencia': 'Experience',
    'experiencia.titulo': 'Experience',
    'experiencia.chamada': [
      'What runs outside of a finished project.',
      'A platform, work, and whatever comes next.',
    ],
    'experiencia.vazio': 'Nothing here yet.',

    'blog.titulo': 'Blog',
    'blog.chamada': [
      'Writing about what I build: what worked,',
      'What got stuck, and what I would do differently.',
    ],
    'blog.vazio.titulo': 'Room being installed',
    'blog.vazio.texto':
      'Nothing is hanging here yet. The first piece goes up when there is something worth reading, not before.',
    'blog.voltar': 'Back to the blog',
    'blog.ordem': 'Route',
    'blog.comeco': 'From the start',
    'blog.fim': 'From the end',
    'blog.contagem': (mostrando: number, total: number) =>
      mostrando === total
        ? `${total} ${total === 1 ? 'piece' : 'pieces'}`
        : `${mostrando} of ${total} pieces`,
    'blog.nada': 'No piece on that subject.',

    'colofao': 'Built with Astro. Set in Archivo and EB Garamond.',
    'rodape.privacidade':
      'This site collects no personal data, sets no cookies, and tracks nobody. There are no forms, no login, and no database.',
    'rodape.codigo': 'Open source on GitHub, under the MIT licence.',
    'rodape.direitos': (ano: number) => [
      `Text, images, and visual identity © Felipe Faria, ${ano}.`,
      'All rights reserved.',
    ],

    'meta.home':
      'Felipe Faria, developer and Systems Analysis and Development student. Projects and experience with the full label, from material to current state.',
    'meta.blog':
      'Writing by Felipe Faria on development, infrastructure, and what he learned building and shutting down projects, with real numbers and honest post-mortems.',
    'meta.blogVazio':
      'Writing by Felipe Faria on development and the projects he builds. The first piece goes up when there is something worth reading.',
    'meta.colecao':
      'Every project by Felipe Faria, newest first: web, Java, Python, and digital logic, with the stack, his role, and the current state of each one.',
    'meta.experiencia':
      'Felipe Faria experience: the Até Zerar channel, with 5.7 million views, and BluckerTV, a video platform opened and shut down in 2026.',
    'meta.contato':
      'Get in touch with Felipe Faria, developer and Systems Analysis and Development student in São Paulo. Direct email contact and a résumé in PDF.',
  },

  es: {
    'idioma.nome': 'Español',
    'idioma.curto': 'ES',
    'idioma.escolher': 'Elegir idioma',
    'idioma.semTexto': 'este texto todavía no existe en este idioma',

    'pular': 'Saltar al contenido',

    'nav.obras': 'Obras',
    'nav.blog': 'Blog',
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
    'acervo': (obras: number, experiencias: number, textos: number) =>
      `${obras} obras en la colección, ${experiencias} experiencias y ${textos} ${textos === 1 ? 'texto publicado' : 'textos publicados'}.`,
    'disponivel': 'Disponible para nuevas oportunidades',

    'sala.contato': 'Contacto',

    'campo.meio': 'Medio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',
    'campo.publicado': 'Publicado',
    'campo.atualizado': 'Actualizado',
    'campo.assunto': 'Tema',
    'campo.obra': 'Obra',
    'sala.percurso': 'El recorrido, del comienzo al más reciente',
    'campo.colofao': 'Colofón',
    'campo.dimensoes': 'Dimensiones',
    'campo.duracao': 'Duración',
    'tempo.atualmente': 'actualmente',

    'link.texto': 'Leer el texto completo',

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

    'estado.publico': 'Código público',
    'estado.noar': 'En línea',
    'estado.encerrado': 'Descontinuado',

    'link.codigo': 'Ver el código',
    'link.projeto': 'Ver el proyecto',
    'link.canal': 'Ver el canal',
    'link.novaAba': '(se abre en una pestaña nueva)',
    'link.curriculo': 'Descargar el currículum en PDF',

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
    'erro404.texto':
      'La dirección que abriste no corresponde a nada aquí. Puede ser un enlace viejo o un error de tipeo. Las salidas están abajo.',
    'nav.experiencia': 'Experiencia',
    'experiencia.titulo': 'Experiencia',
    'experiencia.chamada': [
      'Lo que corre fuera de un proyecto cerrado.',
      'Plataforma, trabajo y lo que venga.',
    ],
    'experiencia.vazio': 'Nada aquí todavía.',

    'blog.titulo': 'Blog',
    'blog.chamada': [
      'Textos sobre lo que construyo: lo que funcionó,',
      'Lo que se trabó y lo que haría distinto.',
    ],
    'blog.vazio.titulo': 'Sala en montaje',
    'blog.vazio.texto':
      'Todavía no hay nada colgado aquí. El primero sale cuando haya algo que valga la pena leer, no antes.',
    'blog.voltar': 'Volver al blog',
    'blog.ordem': 'Recorrido',
    'blog.comeco': 'Desde el inicio',
    'blog.fim': 'Desde el final',
    'blog.contagem': (mostrando: number, total: number) =>
      mostrando === total
        ? `${total} ${total === 1 ? 'texto' : 'textos'}`
        : `${mostrando} de ${total} textos`,
    'blog.nada': 'Ningún texto sobre ese tema.',

    'colofao': 'Hecho en Astro. Compuesto en Archivo y EB Garamond.',
    'rodape.privacidade':
      'Este sitio no recoge datos personales, no usa cookies y no rastrea a quien lo visita. No hay formularios, login ni base de datos.',
    'rodape.codigo': 'Código abierto en GitHub, bajo licencia MIT.',
    'rodape.direitos': (ano: number) => [
      `Textos, imágenes e identidad visual © Felipe Faria, ${ano}.`,
      'Todos los derechos reservados.',
    ],

    'meta.home':
      'Felipe Faria, desarrollador y estudiante de Análisis y Desarrollo de Sistemas. Proyectos y experiencia con la ficha completa, del material al estado actual.',
    'meta.blog':
      'Textos de Felipe Faria sobre desarrollo, infraestructura y lo que aprendió construyendo y cerrando proyectos, con números reales y post-mortem honesto.',
    'meta.blogVazio':
      'Textos de Felipe Faria sobre desarrollo y los proyectos que construye. La primera publicación sale cuando haya algo que valga la pena leer.',
    'meta.colecao':
      'Todos los proyectos de Felipe Faria, del más nuevo al más antiguo: web, Java, Python y lógica digital, con la stack, su papel y el estado de cada uno.',
    'meta.experiencia':
      'La experiencia de Felipe Faria: el canal Até Zerar, con 5,7 millones de visualizaciones, y BluckerTV, plataforma de video abierta y cerrada en 2026.',
    'meta.contato':
      'Habla con Felipe Faria, desarrollador y estudiante de Análisis y Desarrollo de Sistemas en São Paulo. Contacto directo por correo y currículum en PDF.',
  },
} as const;

export type ChaveUI = keyof (typeof UI)['pt'];

/** Devolve a função de tradução para um idioma. */
export function traduzir(lang: Locale) {
  return function t<K extends ChaveUI>(chave: K): (typeof UI)['pt'][K] {
    return UI[lang][chave] as (typeof UI)['pt'][K];
  };
}
