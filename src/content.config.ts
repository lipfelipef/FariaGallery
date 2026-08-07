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

/**
 * Estudo de caso. É a sala de trás da obra: o que a etiqueta não cabe.
 *
 * A etiqueta responde "o que é". O estudo responde "por que ficou assim,
 * o que quebrou e o que eu faria diferente". Sem estudo escrito, a obra
 * continua na parede só com a etiqueta, e nenhuma página vazia é gerada.
 */
const estudos = defineCollection({
  loader: glob({ base: './src/content/estudos', pattern: '**/*.md' }),
  schema: z.object({
    /** Precisa bater com o `slug` da obra em src/data/obras.ts. */
    obra: z.string(),
    idioma: z.enum(LOCALES).default('pt'),
    rascunho: z.boolean().default(false),
    /** Uma linha, aparece abaixo do título e na busca. */
    chamada: z.string(),
    /** Duração e tamanho do time. É a "dimensão" da etiqueta de museu. */
    duracao: z.string().optional(),
    equipe: z.string().optional(),
  }),
});

export const collections = { blog, estudos };
