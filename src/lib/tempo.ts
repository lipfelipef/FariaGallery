import type { Locale } from '../consts';
import { LOCALE_DATA } from '../i18n/utils';

/**
 * Tudo que envolve tempo no site.
 *
 * O fuso é fixo em São Paulo de propósito. Data de publicação é fato do
 * autor, não do visitante: um post publicado às 22h aqui não vira 03h da
 * manhã porque alguém abriu de Lisboa.
 */
const FUSO = 'America/Sao_Paulo';

/** "07 de agosto de 2026" */
export function dataPorExtenso(d: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_DATA[lang], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: FUSO,
  }).format(d);
}

/** "07 de agosto de 2026, 22:25" */
export function dataComHora(d: Date, lang: Locale): string {
  const data = dataPorExtenso(d, lang);
  const hora = new Intl.DateTimeFormat(LOCALE_DATA[lang], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: FUSO,
  }).format(d);
  return `${data}, ${hora}`;
}

/** Data completa em ISO, para o atributo datetime e para o Schema.org. */
export const dataISO = (d: Date) => d.toISOString();

/** Só o dia, sem hora. Serve para ordenar e agrupar. */
export const diaISO = (d: Date) => d.toISOString().slice(0, 10);

const MINUTO = 60_000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;
const MES = 30.436875 * DIA;
const ANO = 365.2425 * DIA;

/**
 * "há 2 horas", "há 3 dias", "há 6 anos".
 *
 * Escolhe sozinho a maior unidade que ainda faz sentido: não adianta dizer
 * "há 52.560 minutos" quando "há 1 mês" comunica melhor.
 *
 * Não existe "década" aqui de propósito: o `Intl.RelativeTimeFormat` não tem
 * essa unidade, e "há 20 anos" comunica melhor que "há 2 décadas" em todos os
 * três idiomas.
 */
export function tempoRelativo(d: Date, lang: Locale, agora = new Date()): string {
  const fmt = new Intl.RelativeTimeFormat(LOCALE_DATA[lang], { numeric: 'auto' });
  const ms = d.getTime() - agora.getTime();
  const abs = Math.abs(ms);

  if (abs >= ANO) return fmt.format(Math.round(ms / ANO), 'year');
  if (abs >= MES) return fmt.format(Math.round(ms / MES), 'month');
  if (abs >= 7 * DIA) return fmt.format(Math.round(ms / (7 * DIA)), 'week');
  if (abs >= DIA) return fmt.format(Math.round(ms / DIA), 'day');
  if (abs >= HORA) return fmt.format(Math.round(ms / HORA), 'hour');
  if (abs >= MINUTO) return fmt.format(Math.round(ms / MINUTO), 'minute');
  return fmt.format(Math.round(ms / 1000), 'second');
}

/**
 * "este ano", "ano passado", "há 2 anos", contando ANO DE CALENDÁRIO.
 *
 * O `tempoRelativo` não serve para rótulo de ano, e o erro é visível: ele mede
 * a distância em milissegundos desde 1º de janeiro e arredonda, então em agosto
 * de 2026 o ano de 2025 ficava a 19 meses e virava "há 2 anos", e 2024 virava
 * "há 3 anos". Quem lê "2025, há 2 anos" no ano seguinte estranha, com razão.
 *
 * Aqui a conta é só uma subtração de anos, que é o que a pessoa faz de cabeça.
 */
export function anosAtras(ano: number, lang: Locale, agora = new Date()): string {
  const atual = Number(
    new Intl.DateTimeFormat('en-CA', { year: 'numeric', timeZone: FUSO }).format(agora)
  );
  const fmt = new Intl.RelativeTimeFormat(LOCALE_DATA[lang], { numeric: 'auto' });
  return fmt.format(ano - atual, 'year');
}

/**
 * Quanto tempo durou, de um início até um fim (ou até hoje, se ainda roda).
 * Devolve a unidade que comunica: "5 meses", "6 anos", "1 ano e 3 meses".
 */
export function duracao(
  inicio: Date,
  fim: Date | undefined,
  lang: Locale,
  agora = new Date()
): string {
  const ate = fim ?? agora;
  const ms = Math.max(0, ate.getTime() - inicio.getTime());

  const anos = Math.floor(ms / ANO);
  const mesesRestantes = Math.floor((ms - anos * ANO) / MES);

  const plural = (n: number, um: string, muitos: string) => `${n} ${n === 1 ? um : muitos}`;

  const rotulos = {
    pt: { ano: 'ano', anos: 'anos', mes: 'mês', meses: 'meses', dia: 'dia', dias: 'dias', e: 'e' },
    en: { ano: 'year', anos: 'years', mes: 'month', meses: 'months', dia: 'day', dias: 'days', e: 'and' },
    es: { ano: 'año', anos: 'años', mes: 'mes', meses: 'meses', dia: 'día', dias: 'días', e: 'y' },
  }[lang];

  if (anos >= 1) {
    const parteAnos = plural(anos, rotulos.ano, rotulos.anos);
    if (mesesRestantes === 0) return parteAnos;
    return `${parteAnos} ${rotulos.e} ${plural(mesesRestantes, rotulos.mes, rotulos.meses)}`;
  }

  const meses = Math.floor(ms / MES);
  if (meses >= 1) return plural(meses, rotulos.mes, rotulos.meses);

  const dias = Math.max(1, Math.floor(ms / DIA));
  return plural(dias, rotulos.dia, rotulos.dias);
}
