import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// O `z` reexportado pelo astro:content está deprecado no Astro 7.
import { z } from 'zod';
import { LOCALES } from './consts';

/**
 * Blog. É o único lugar onde texto mora: post, estudo de caso, post-mortem,
 * aprendizado de carreira, tudo vira arquivo .md aqui.
 *
 * Três decisões que evitam o abandono em três meses:
 *  - `idioma` fica no post, não na pasta. Post pode existir só em português
 *    sem quebrar o build e sem obrigar a traduzir os outros dois.
 *  - `rascunho: true` mantém o arquivo no repositório e fora do site.
 *  - `obra` é opcional. Preenchido, a obra ganha um "ler o texto" apontando
 *    para cá, e a ponte entre projeto e profundidade existe sem duplicar
 *    página nem conteúdo.
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
    /** Vira a linha ASSUNTO da ficha do post. Ex.: "Astro, Cloudflare". */
    assuntos: z.array(z.string()).default([]),
    /** Slug de uma obra em src/data/obras.ts, quando o texto é sobre ela. */
    obra: z.string().optional(),
    /**
     * Endereço do post na URL. Sem isto, o endereço vem do nome do arquivo,
     * e o mesmo texto em três idiomas geraria três endereços diferentes
     * (`bluckertven`, `bluckertves`). Declarar o mesmo `endereco` nas três
     * traduções é o que faz o seletor de idioma achar o par.
     *
     * NÃO chamar de `slug`: esse nome é reservado pelo glob loader do Astro,
     * que o usa como id da entrada. Com ele, as três traduções virariam a
     * mesma entrada e duas seriam descartadas em silêncio.
     */
    endereco: z.string().optional(),
  }),
});

export const collections = { blog };
