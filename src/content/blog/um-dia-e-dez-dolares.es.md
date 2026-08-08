---
titulo: 'Faria Gallery: un día, diez dólares y ningún servidor'
tituloBusca: 'Faria Gallery: un día y diez dólares'
resumo: BluckerTV costó R$ 8.100 en cinco meses. Este sitio cuesta US$ 10,46 al año y se armó en un día. La diferencia no es ahorro, es adecuación.
data: 2026-08-08T19:30:00-03:00
idioma: es
obra: fariagallery
endereco: um-dia-e-dez-dolares
ordem: 9
assuntos:
  - Astro
  - Cloudflare
  - Faria Gallery
---

El 6 de agosto de 2026 se cerró BluckerTV. Empresa dada de baja, tarjetas
retiradas de todos los proveedores, renovación automática apagada en todo. La
decisión de aquel día fue explícita: ningún proyecto emprendedor nuevo por
varios años, foco en terminar la carrera y entrar en un empleo formal.

Cuatro horas después ya estaba discutiendo tres ideas de SaaS para ganar dinero
rápido, incluida una montada sobre el hype de GTA 6.

Al día siguiente las abandoné todas a favor de este sitio, y por qué cambié es
el tema de este texto. Las ideas de SaaS dependían de acertar la demanda del
mercado, que es justamente lo que cinco meses de BluckerTV acababan de mostrar
que es difícil. Un portafolio no depende de ninguna demanda, porque el contenido
ya existía: eran los proyectos que ya había hecho.

## El problema era mandar tres enlaces

Cuando alguien pedía ver mi trabajo, yo mandaba tres direcciones. GitHub para el
código, LinkedIn para el historial, el canal para el resto. Tres formatos, tres
contextos, y ninguno de los tres contando la historia entera.

GitHub en particular tiene un defecto que nadie comenta: **muestra archivos, no
decisiones.** Quien abre un repositorio ve una carpeta con treinta archivos y
ninguna pista de qué fue difícil, qué casi salió mal, o por qué la cosa terminó
siendo así. Es la parte menos interesante del trabajo, presentada como si fuera
la única.

## Lo que no entró, y por qué

La parte útil de una decisión de stack no es lo que quedó. Es lo que se
descartó.

**Angular salió primero, y era el candidato obvio.** Es lo que aprendí en el
segundo semestre y lo que reaprovecharía con menos esfuerzo. No entró porque es
una herramienta para aplicaciones con mucho estado, y esto es un sitio de
contenido. Usarlo me habría obligado a montar renderizado en el servidor solo
para no romper el SEO, habría cargado un paquete pesado sin necesidad y habría
complicado el mantenimiento durante años.

**Next.js habría sido la opción con más valor de mercado**, y se descartó por
costo de aprendizaje: exigiría aprender React antes, lo que atrasaría el sitio
meses. Y el reloj del buscador solo empieza a correr cuando el sitio existe.

Queda el registro honesto: **Astro no vale casi nada como palabra clave de
currículum.** Nadie publica una vacante de "desarrollador Astro". La elección
fue por adecuación a la tarea, no por empleabilidad, y conviene saber la
diferencia entre esas dos cosas al decidir.

**Tailwind volvió después de haber sido descartado.** El argumento en contra era
"es una cosa más que aprender", y era un mal argumento: quien ya sabe CSS
aprende Tailwind en un fin de semana. Entró por tres motivos prácticos, y
ninguno es moda: una escala de espaciado y tipografía ya hecha, que da
consistencia visual a quien no es diseñador; el estilo viviendo en el marcado,
que es lo que salva el mantenimiento después de meses sin abrir el proyecto; y
el ecosistema, porque prácticamente todo tema y ejemplo de Astro ya viene con
él.

## Ningún servidor, y eso es una decisión de arquitectura

El sitio se publica en Cloudflare Workers y no en Pages, que era la
recomendación vieja. Desde marzo de 2026 Workers tiene paridad de recursos para
sitio estático, y la orientación oficial para proyecto nuevo es empezar
directamente por ahí.

El detalle que cambia la cuenta es este: **una petición a un archivo estático no
consume cuota.** El límite de cien mil peticiones diarias del plan gratuito vale
para peticiones que ejecutan código, y este sitio no ejecuta ninguna. Es un
montón de HTML ya listo.

Y hay una ganancia que solo aparece dentro de algunos años: si algún día esto
necesita una API o una base de datos, se agrega sin cambiar de plataforma.

## El boletín que murió antes de nacer

El boletín estaba en el plan original. Se cortó por motivo jurídico, no por
pereza.

Un boletín significa recoger correos, y un correo es dato personal. Eso trae de
vuelta política de privacidad, consentimiento explícito en el formulario y
enlace de baja en cada mensaje, que es exactamente el paquete que había
consumido meses de BluckerTV. Entró RSS en su lugar: quien quiera seguir se
suscribe en su lector, y el correo nunca pasa por aquí.

El costo real de esa decisión fue cero, porque no había audiencia para un
boletín.

Vale el paralelo con la plataforma que acaba de cerrar. Allá, la decisión de
hacer todo por complementos en vez de tocar el núcleo de PeerTube fue una
decisión de arquitectura tomada por la licencia AGPL. Aquí, la decisión de no
tener formulario fue una decisión de arquitectura tomada por la ley de
protección de datos. Es el mismo patrón en los dos: **la restricción jurídica
dibujando la solución técnica**, y en ambos casos el resultado salió más simple
de lo que habría sido sin ella.

Términos de uso tampoco existen, y no existen a propósito: nadie acepta nada
aquí, no hay cuenta ni servicio prestado.

## Lo que no tiene, a propósito

Sin back-end. Sin base de datos. Sin formulario. Sin login. Sin panel de
administración. Sin cookies.

La consecuencia es una lista corta y buena: alojamiento gratis, superficie de
ataque casi nula, nada que actualizar por seguridad, y un sitio que sigue al
aire aunque pasen seis meses sin que nadie lo toque.

## Los números

| | BluckerTV | Este sitio |
| --- | --- | --- |
| Tiempo hasta estar al aire | 5 meses | 1 día |
| Costo | R$ 8.100 | US$ 10,46 al año |
| Alojamiento | VPS, CDN y object storage | R$ 0 |
| Servidores que mantener | 1 | ninguno |
| Bases de datos | 2 | ninguna |
| Resultado | 1 suscriptor de pago | 40 páginas en 3 idiomas |

La comparación es injusta a propósito, y ahí está la lección. No son proyectos
del mismo tipo, y no deberían costar lo mismo. Una plataforma de video sí
necesita servidor, transcodificación y base de datos. Un portafolio no necesita
nada de eso, y gastar en ello habría sido un error, no cuidado.

**La diferencia entre esos dos números no es ahorro. Es preguntar de qué está
hecho el problema antes de elegir la herramienta.** BluckerTV costó caro porque
era cara; este sitio es barato porque su problema es barato. El error posible
aquí sería el inverso: montar servidor, base de datos y panel para publicar
texto que no cambia.

## Lo que vino de regalo

Escribir la ficha de cada proyecto me obligó a reabrir repositorios viejos, y
reabrir código con dos años más de experiencia muestra cosas que no aparecían
mientras el sistema estaba funcionando.

Encontré contraseñas guardadas en texto plano, una clave de configuración
commiteada, una base de datos versionada con cuentas de gente real adentro.
Ninguno de esos problemas daba señal con el sistema funcionando. Todos aparecían
al abrir el repositorio, que es exactamente lo que hace un reclutador.

El portafolio existía para exhibir los proyectos y terminó auditándolos. Eso da
para un texto entero por sí solo, y quedará para el próximo.
