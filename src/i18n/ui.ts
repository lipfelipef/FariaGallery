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

    'pular': 'Pular para o conteúdo',

    'nav.obras': 'Obras',
    'nav.blog': 'Blog',
    'nav.contato': 'Contato',

    'tema.escuro': 'Sala escura',
    'tema.clara': 'Sala clara',
    'tema.paraEscuro': 'Mudar para a sala escura',
    'tema.paraClara': 'Mudar para a sala clara',

    'artista':
      'Brasileiro, n. 2006. Análise e Desenvolvimento de Sistemas, Centro Universitário Senac, Santo Amaro.',
    'parede.1':
      'Aqui fica o registro do que eu construo. Cada obra vem com a ficha inteira: do que é feita, qual foi meu papel, com quem foi e em que estado está.',
    'parede.2':
      'O que não deu certo entra com a mesma ficha, porque projeto que parou também tem o que ensinar.',
    'acervo': (total: number, publicas: number) =>
      `${total} obras na coleção. ${publicas} com código público.`,

    'sala.obras': 'Obras',
    'sala.canal': 'Canal',
    'sala.contato': 'Contato',

    'campo.meio': 'Meio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',
    'campo.publicado': 'Publicado',
    'campo.atualizado': 'Atualizado',
    'campo.assunto': 'Assunto',
    'campo.colofao': 'Colofão',
    'campo.duracao': 'Duração',
    'campo.equipe': 'Equipe',

    'obras.voltar': 'Voltar para as obras',
    'link.estudo': 'Ler o estudo de caso',

    'sala.emCartaz': 'Em cartaz',
    'nav.colecao': 'Coleção',
    'colecao.titulo': 'Coleção',
    'colecao.chamada':
      'O acervo inteiro, em ordem do mais novo para o mais antigo. Filtre pelo meio para achar rápido.',
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

    'contato.canal': 'Canal',

    'blog.titulo': 'Blog',
    'blog.chamada':
      'Texto sobre o que eu construo: o que deu certo, o que travou e o que eu faria diferente.',
    'blog.vazio.titulo': 'Sala em montagem',
    'blog.vazio.texto':
      'Ainda não há texto pendurado aqui. O primeiro sai quando tiver algo que valha ser lido, não antes.',
    'blog.voltar': 'Voltar para o blog',

    'colofao':
      'Feito em Astro. Composto em Archivo e EB Garamond. Sem cookie, sem rastreio e sem formulário.',

    'meta.home':
      'Felipe Faria, desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas no Centro Universitário Senac, Santo Amaro. Coleção de projetos com a ficha inteira: do que são feitos, qual foi meu papel e em que estado estão.',
    'meta.blog':
      'Textos de Felipe Faria sobre desenvolvimento, projetos e o que aprendeu construindo.',
    'meta.blogVazio':
      'Textos de Felipe Faria sobre o que ele constrói. A sala ainda está sendo montada.',
  },

  en: {
    'idioma.nome': 'English',
    'idioma.curto': 'EN',
    'idioma.escolher': 'Choose language',

    'pular': 'Skip to content',

    'nav.obras': 'Works',
    'nav.blog': 'Blog',
    'nav.contato': 'Contact',

    'tema.escuro': 'Dark room',
    'tema.clara': 'Light room',
    'tema.paraEscuro': 'Switch to the dark room',
    'tema.paraClara': 'Switch to the light room',

    'artista':
      'Brazilian, b. 2006. Systems Analysis and Development, Centro Universitário Senac, Santo Amaro campus.',
    'parede.1':
      'This is the record of what I build. Every work comes with the full label: what it is made of, what my role was, who I built it with, and what state it is in.',
    'parede.2':
      'What did not work out gets the same label, because a project that stopped still has something to teach.',
    'acervo': (total: number, publicas: number) =>
      `${total} works in the collection. ${publicas} with public source code.`,

    'sala.obras': 'Works',
    'sala.canal': 'Channel',
    'sala.contato': 'Contact',

    'campo.meio': 'Medium',
    'campo.papel': 'Role',
    'campo.credito': 'Credit',
    'campo.estado': 'Status',
    'campo.publicado': 'Published',
    'campo.atualizado': 'Updated',
    'campo.assunto': 'Subject',
    'campo.colofao': 'Colophon',
    'campo.duracao': 'Duration',
    'campo.equipe': 'Team',

    'obras.voltar': 'Back to the works',
    'link.estudo': 'Read the case study',

    'sala.emCartaz': 'On view',
    'nav.colecao': 'Collection',
    'colecao.titulo': 'Collection',
    'colecao.chamada':
      'The whole holdings, newest first. Filter by medium to find something fast.',
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

    'contato.canal': 'Channel',

    'blog.titulo': 'Blog',
    'blog.chamada':
      'Writing about what I build: what worked, what got stuck, and what I would do differently.',
    'blog.vazio.titulo': 'Room being installed',
    'blog.vazio.texto':
      'Nothing is hanging here yet. The first piece goes up when there is something worth reading, not before.',
    'blog.voltar': 'Back to the blog',

    'colofao':
      'Built with Astro. Set in Archivo and EB Garamond. No cookies, no tracking, no forms.',

    'meta.home':
      'Felipe Faria, developer and Systems Analysis and Development student at Centro Universitário Senac, Santo Amaro. A collection of projects with the full label: what they are made of, what my role was, and what state they are in.',
    'meta.blog':
      'Writing by Felipe Faria on development, projects, and what he learned building them.',
    'meta.blogVazio':
      'Writing by Felipe Faria about what he builds. The room is still being installed.',
  },

  es: {
    'idioma.nome': 'Español',
    'idioma.curto': 'ES',
    'idioma.escolher': 'Elegir idioma',

    'pular': 'Saltar al contenido',

    'nav.obras': 'Obras',
    'nav.blog': 'Blog',
    'nav.contato': 'Contacto',

    'tema.escuro': 'Sala oscura',
    'tema.clara': 'Sala clara',
    'tema.paraEscuro': 'Cambiar a la sala oscura',
    'tema.paraClara': 'Cambiar a la sala clara',

    'artista':
      'Brasileño, n. 2006. Análisis y Desarrollo de Sistemas, Centro Universitário Senac, Santo Amaro.',
    'parede.1':
      'Aquí queda el registro de lo que construyo. Cada obra viene con la ficha completa: de qué está hecha, cuál fue mi papel, con quién la hice y en qué estado está.',
    'parede.2':
      'Lo que no salió bien entra con la misma ficha, porque un proyecto que se detuvo también tiene algo que enseñar.',
    'acervo': (total: number, publicas: number) =>
      `${total} obras en la colección. ${publicas} con código público.`,

    'sala.obras': 'Obras',
    'sala.canal': 'Canal',
    'sala.contato': 'Contacto',

    'campo.meio': 'Medio',
    'campo.papel': 'Papel',
    'campo.credito': 'Crédito',
    'campo.estado': 'Estado',
    'campo.publicado': 'Publicado',
    'campo.atualizado': 'Actualizado',
    'campo.assunto': 'Tema',
    'campo.colofao': 'Colofón',
    'campo.duracao': 'Duración',
    'campo.equipe': 'Equipo',

    'obras.voltar': 'Volver a las obras',
    'link.estudo': 'Leer el estudio de caso',

    'sala.emCartaz': 'En exhibición',
    'nav.colecao': 'Colección',
    'colecao.titulo': 'Colección',
    'colecao.chamada':
      'El acervo entero, del más nuevo al más antiguo. Filtre por medio para encontrar rápido.',
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

    'contato.canal': 'Canal',

    'blog.titulo': 'Blog',
    'blog.chamada':
      'Textos sobre lo que construyo: lo que funcionó, lo que se trabó y lo que haría distinto.',
    'blog.vazio.titulo': 'Sala en montaje',
    'blog.vazio.texto':
      'Todavía no hay nada colgado aquí. El primero sale cuando haya algo que valga la pena leer, no antes.',
    'blog.voltar': 'Volver al blog',

    'colofao':
      'Hecho en Astro. Compuesto en Archivo y EB Garamond. Sin cookies, sin rastreo y sin formularios.',

    'meta.home':
      'Felipe Faria, desarrollador y estudiante de Análisis y Desarrollo de Sistemas en el Centro Universitário Senac, Santo Amaro. Colección de proyectos con la ficha completa: de qué están hechos, cuál fue mi papel y en qué estado están.',
    'meta.blog':
      'Textos de Felipe Faria sobre desarrollo, proyectos y lo que aprendió construyendo.',
    'meta.blogVazio':
      'Textos de Felipe Faria sobre lo que construye. La sala todavía se está montando.',
  },
} as const;

export type ChaveUI = keyof (typeof UI)['pt'];

/** Devolve a função de tradução para um idioma. */
export function traduzir(lang: Locale) {
  return function t<K extends ChaveUI>(chave: K): (typeof UI)['pt'][K] {
    return UI[lang][chave] as (typeof UI)['pt'][K];
  };
}
