import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from '../consts';

export type Estudo = CollectionEntry<'estudos'>;

/** Estudos prontos, no idioma pedido. Rascunho não sai daqui. */
export async function estudosPublicados(lang: Locale = DEFAULT_LOCALE): Promise<Estudo[]> {
  const todos = await getCollection('estudos', ({ data }) => !data.rascunho);
  return todos.filter((e) => e.data.idioma === lang);
}

/** O estudo de uma obra, se existir escrito naquele idioma. */
export async function estudoDaObra(slug: string, lang: Locale): Promise<Estudo | undefined> {
  return (await estudosPublicados(lang)).find((e) => e.data.obra === slug);
}

/** Os slugs que têm estudo escrito, para a etiqueta saber se vira link. */
export async function obrasComEstudo(lang: Locale): Promise<Set<string>> {
  return new Set((await estudosPublicados(lang)).map((e) => e.data.obra));
}
