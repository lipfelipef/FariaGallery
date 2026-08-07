import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../consts';

export type Post = CollectionEntry<'blog'>;

/** Rascunho nunca sai daqui: fica no repositório e fora do site e do RSS. */
export async function postsPublicados(idioma: Locale = DEFAULT_LOCALE): Promise<Post[]> {
  const todos = await getCollection('blog', ({ data }) => !data.rascunho);
  return todos
    .filter((post) => post.data.idioma === idioma)
    .sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

/** O menu só mostra Blog quando existe post de verdade para ler. */
export async function temBlog(idioma: Locale = DEFAULT_LOCALE): Promise<boolean> {
  return (await postsPublicados(idioma)).length > 0;
}

const FORMATO = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const dataPorExtenso = (d: Date) => FORMATO.format(d);
export const dataISO = (d: Date) => d.toISOString().slice(0, 10);
