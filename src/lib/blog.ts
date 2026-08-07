import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../consts';
import { LOCALE_DATA } from '../i18n/utils';

export type Post = CollectionEntry<'blog'>;

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

/** Data por extenso no idioma da página. Fuso em UTC para o dia não escorregar. */
export function dataPorExtenso(d: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_DATA[lang], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export const dataISO = (d: Date) => d.toISOString().slice(0, 10);
