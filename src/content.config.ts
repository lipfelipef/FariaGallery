import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// O `z` reexportado pelo astro:content está deprecado no Astro 7.
import { z } from 'zod';
import { LOCALES } from './consts';

/**
 * Blog. Um arquivo .md em src/content/blog vira um post.
 *
 * Duas decisões que evitam o abandono em três meses:
 *  - `idioma` fica no post, não na pasta. Post pode existir só em português
 *    sem quebrar o build e sem obrigar a traduzir os outros dois.
 *  - `rascunho: true` mantém o arquivo no repositório e fora do site.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    idioma: z.enum(LOCALES).default('pt'),
    rascunho: z.boolean().default(false),
    /** Vira a linha MEIO da etiqueta do post. Ex.: "Astro, Cloudflare". */
    assuntos: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
