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
    /**
     * Versão curta do título, só para a aba do navegador e para o resultado
     * de busca. O H1, a lista do blog e o texto continuam com o `titulo`
     * inteiro.
     *
     * Existe porque o `<title>` termina sempre em " | Felipe Faria", que são
     * quinze caracteres, e o buscador corta o título perto de sessenta. Num
     * título longo o corte comia o próprio assunto do texto: "Invernadero
     * Hidropónico: una lechuga controlada por trece compuertas lógicas" com o
     * sufixo dava 91 caracteres, e o que aparecia na busca terminava no meio
     * da frase.
     *
     * Só preencher quando o título passar disso. Sem valor, vale o `titulo`.
     */
    tituloBusca: z.string().optional(),
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
     * A posição do texto no percurso do blog, do primeiro ao último. É
     * curadoria, não cronologia: quem escolhe é o Felipe.
     *
     * Existe porque a data não serve para isso. Os textos foram escritos quase
     * todos na mesma madrugada, então ordenar por data compara diferenças de
     * minutos, e o texto de abertura, que explica o site inteiro, cairia no
     * meio da pilha. A data continua sendo a data real de publicação, e é ela
     * que vai no RSS e no `datePublished` do Schema.org.
     *
     * Sem valor, o texto vai para o fim do percurso.
     */
    ordem: z.number().optional(),
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
