import type { Locale } from '../consts';
import {
  fimDaObra,
  inicioDaObra,
  linhasDe,
  meioDe,
  numeroColado,
  type Obra,
} from '../data/obras';
import { traduzir } from '../i18n/ui';
import { duracao } from '../lib/tempo';

export interface CampoDaFicha {
  campo: string;
  /** Cada valor é uma lista de linhas, mesmo quando tem só uma. */
  linhas: readonly string[];
  /**
   * A medida tipográfica: a largura que a linha pode ocupar. Marca o campo que
   * enumera em vez de narrar, como as dimensões e o papel. Ali a medida de
   * leitura confortável atrapalha, porque dobra a enumeração no meio e pendura
   * a última palavra sozinha na linha de baixo.
   */
  medida?: boolean;
}

/**
 * Os campos da ficha de uma obra, na ordem da etiqueta de museu.
 *
 * Só a lógica mora aqui. Cada lugar que mostra a ficha escreve a própria
 * marcação e o próprio estilo, e é de propósito: o CSS de componente no Astro
 * é escopado por atributo, então marcação criada dentro de um componente
 * deixa de casar com o estilo escrito em quem o usa. Já quebrou o site uma vez.
 * Compartilhar a lista de campos é seguro; compartilhar as tags não é.
 */
export function fichaDaObra(obra: Obra, lang: Locale): CampoDaFicha[] {
  const t = traduzir(lang);

  /** Calculada da data, não escrita à mão: assim ela não envelhece sozinha. */
  const inicio = inicioDaObra(obra);
  const quanto = inicio ? duracao(inicio, fimDaObra(obra), lang) : undefined;

  return [
    { campo: t('campo.meio'), linhas: [meioDe(obra, lang)] },
    ...(quanto ? [{ campo: t('campo.duracao'), linhas: [quanto] }] : []),
    ...(obra.dimensoes
      ? [
          {
            campo: t('campo.dimensoes'),
            linhas: linhasDe(obra.dimensoes[lang]).map(numeroColado),
            medida: true,
          },
        ]
      : []),
    { campo: t('campo.papel'), linhas: [obra.papel[lang]], medida: true },
    { campo: t('campo.credito'), linhas: linhasDe(obra.credito[lang]) },
    { campo: t('campo.estado'), linhas: [t(`estado.${obra.estado}` as 'estado.publico')] },
  ];
}
