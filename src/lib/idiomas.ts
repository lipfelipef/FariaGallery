import { getCollection } from 'astro:content';
import { LOCALES, type Locale } from '../consts';
import { caminhoSemIdioma, rota, HREFLANG } from '../i18n/utils';

export interface DestinoIdioma {
  lang: Locale;
  hreflang: string;
  href: string;
  /**
   * Falso quando aquele idioma não tem esta página e o link cai num lugar
   * próximo. Serve para o hreflang não mentir para o buscador e para o
   * seletor avisar quem clicou.
   */
  exata: boolean;
}

/**
 * Para onde cada idioma leva, a partir da página atual.
 *
 * Página fixa (home, coleção, blog, contato) existe nos três idiomas, então o
 * destino é o mesmo caminho. Post de blog é diferente: ele pode existir só em
 * português, porque a regra é não obrigar tradução para o texto sair. Nesse
 * caso o idioma que não tem o post cai na lista do blog daquele idioma, em vez
 * de num endereço que não existe.
 */
export async function destinosPorIdioma(url: URL): Promise<DestinoIdioma[]> {
  const aqui = caminhoSemIdioma(url);
  const partes = aqui.split('/').filter(Boolean);

  /**
   * A página de erro é uma só, em português, porque não dá para saber o idioma
   * de um endereço que não existe. Sem esta saída o seletor de idioma dela
   * oferecia `/en/404/` e `/es/404/`, que não são páginas: quem estava perdido
   * e clicava num idioma caía em outro erro, agora sem página nenhuma para
   * mostrar. Daqui, trocar de idioma leva à entrada da galeria naquele idioma,
   * que é o lugar certo para quem se perdeu.
   */
  if (partes[0] === '404') {
    return LOCALES.map((lang) => ({
      lang,
      hreflang: HREFLANG[lang],
      href: rota(lang, '/'),
      exata: true,
    }));
  }

  const ehPost = partes[0] === 'blog' && partes.length > 1;
  const slug = ehPost ? partes.slice(1).join('/') : null;

  const posts = slug ? await getCollection('blog', ({ data }) => !data.rascunho) : [];

  return LOCALES.map((lang) => {
    const exata =
      !slug || posts.some((p) => (p.data.endereco ?? p.id) === slug && p.data.idioma === lang);
    return {
      lang,
      hreflang: HREFLANG[lang],
      href: rota(lang, exata ? aqui : '/blog'),
      exata,
    };
  });
}
