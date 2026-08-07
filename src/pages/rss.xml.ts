import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { postsPublicados } from '../lib/blog';

export async function GET(context: APIContext) {
  const posts = await postsPublicados();

  return rss({
    title: SITE.name,
    description:
      'Textos de Felipe Faria sobre desenvolvimento, projetos e o que aprendeu construindo.',
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.titulo,
      description: post.data.resumo,
      pubDate: post.data.data,
      link: `/blog/${post.id}/`,
      categories: post.data.assuntos,
    })),
    customData: '<language>pt-BR</language>',
  });
}
