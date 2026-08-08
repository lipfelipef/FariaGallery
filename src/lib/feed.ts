import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, type Locale } from '../consts';
import { traduzir } from '../i18n/ui';
import { rota, HREFLANG } from '../i18n/utils';
import { postsPublicados, slugDoPost } from './blog';

/** Um feed por idioma. Quem assina em inglês não recebe post em português. */
export async function feed(context: APIContext, lang: Locale) {
  const t = traduzir(lang);
  const posts = await postsPublicados(lang);

  return rss({
    title: SITE.name,
    description: t('meta.blog'),
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.titulo,
      description: post.data.resumo,
      pubDate: post.data.data,
      link: rota(lang, `/blog/${slugDoPost(post)}`),
      categories: post.data.assuntos,
    })),
    customData: `<language>${HREFLANG[lang]}</language>`,
  });
}
