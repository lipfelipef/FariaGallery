import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../consts';

export { dataPorExtenso, dataComHora, dataISO, diaISO, tempoRelativo } from './tempo';

export type Post = CollectionEntry<'blog'>;

/**
 * O endereço do post.
 *
 * Vem do campo `endereco` do arquivo, e cai no nome do arquivo quando ele não
 * existe. As três traduções do mesmo texto declaram o mesmo `endereco`, e é
 * isso que faz `/blog/bluckertv`, `/en/blog/bluckertv` e `/es/blog/bluckertv`
 * serem a mesma página em idiomas diferentes.
 *
 * Não dá para deduzir do nome do arquivo: o Astro come o ponto ao gerar o id,
 * então `bluckertv.en.md` vira `bluckertven`, e não `bluckertv.en`.
 */
export const slugDoPost = (post: Post) => post.data.endereco ?? post.id;

/** Rascunho nunca sai daqui: fica no repositório e fora do site e do RSS. */
export async function postsPublicados(idioma: Locale = DEFAULT_LOCALE): Promise<Post[]> {
  const todos = await getCollection('blog', ({ data }) => !data.rascunho);
  return todos
    .filter((post) => post.data.idioma === idioma)
    .sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

export async function temBlog(idioma: Locale = DEFAULT_LOCALE): Promise<boolean> {
  return (await postsPublicados(idioma)).length > 0;
}

/**
 * Os textos no percurso escolhido pelo Felipe, do primeiro ao último.
 *
 * É a ordem da lista do blog, e não a do RSS: feed se ordena por data de
 * publicação, porque é isso que um leitor de feed espera. Aqui a data não
 * serviria, já que quase todos os textos saíram na mesma madrugada e a
 * diferença entre eles é de minutos.
 *
 * Texto sem `ordem` cai no fim, e entre os sem ordem vale o mais recente
 * primeiro, para um texto novo nunca sumir no meio da lista por esquecimento.
 */
export async function postsEmPercurso(idioma: Locale = DEFAULT_LOCALE): Promise<Post[]> {
  const posts = await postsPublicados(idioma);
  return posts.slice().sort((a, b) => {
    const oa = a.data.ordem ?? Number.MAX_SAFE_INTEGER;
    const ob = b.data.ordem ?? Number.MAX_SAFE_INTEGER;
    if (oa !== ob) return oa - ob;
    return b.data.data.getTime() - a.data.data.getTime();
  });
}

/**
 * O post escrito sobre uma obra, se existir naquele idioma. É o que faz a
 * etiqueta na parede ganhar um "ler o texto" apontando para o blog.
 */
export async function postDaObra(slug: string, lang: Locale): Promise<Post | undefined> {
  return (await postsPublicados(lang)).find((p) => p.data.obra === slug);
}

/** Mapa slug da obra -> endereço do post, para a home não consultar um por um. */
export async function postsPorObra(lang: Locale): Promise<Map<string, string>> {
  const mapa = new Map<string, string>();
  for (const post of await postsPublicados(lang)) {
    if (post.data.obra) mapa.set(post.data.obra, slugDoPost(post));
  }
  return mapa;
}

