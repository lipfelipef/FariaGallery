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
   *
   * Hoje toda página do site existe nos três idiomas, então isto é sempre
   * verdadeiro. O campo fica porque a página de erro ainda depende dele e
   * porque conteúdo que só exista num idioma volta a precisar disso.
   */
  exata: boolean;
}

/**
 * Para onde cada idioma leva, a partir da página atual.
 *
 * Todas as salas existem nos três idiomas, então o destino é o mesmo caminho
 * com outro prefixo.
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

  return LOCALES.map((lang) => ({
    lang,
    hreflang: HREFLANG[lang],
    href: rota(lang, aqui),
    exata: true,
  }));
}
