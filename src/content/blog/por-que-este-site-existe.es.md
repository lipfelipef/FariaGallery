---
titulo: Por qué existe este sitio
resumo: Quién soy, qué es Faria Gallery y por qué cada proyecto aquí aparece con ficha de museo en vez de una captura de pantalla bonita.
data: 2026-08-07
idioma: es
endereco: por-que-este-site-existe
assuntos:
  - Faria Gallery
  - Portafolio
---

Me llamo **Felipe Faria**. Nací en 2006 y estudio Análisis y Desarrollo de
Sistemas en el Centro Universitário Senac, en Santo Amaro, São Paulo. Antes hice
la educación media técnica en Informática para Internet.

Este sitio existe porque me cansé de mandar tres enlaces.

## El problema de los tres enlaces

Cada vez que alguien pedía ver lo que hago, la respuesta era el mismo desorden:
GitHub para el código, LinkedIn para el historial, el canal para el resto. Tres
direcciones, tres formatos, tres contextos, y ninguno de los tres contando la
historia completa.

Peor: GitHub muestra archivos, no decisiones. Quien abre un repositorio ve una
carpeta con treinta archivos y ninguna pista de qué fue difícil, qué casi salió
mal, o por qué la cosa terminó así. Es la parte menos interesante del trabajo,
presentada como si fuera la única.

**Faria Gallery** es el lugar único. Proyectos, experiencia, currículum y
textos, todo en la misma dirección, con el mismo formato.

## Por qué ficha de museo

La decisión de diseño vino de un problema práctico: **mis proyectos no tienen
imagen que valga una pared.**

Un circuito armado en Logisim, un quiz en Java, un simulacro que corre en el
navegador. Una captura de pantalla de eso queda fea y genérica, y es exactamente
lo que hace todo portafolio de estudiante: una grilla de capturas que nadie mira.

Así que el sitio lo invierte. **Aquí no hay ninguna imagen.** Lo que cuelga de la
pared es la ficha, como hace un museo:

```
Medio       Angular 19, Node.js, Express
Papel       Full-stack, en pareja
Crédito     Proyecto Integrador II, Senac Santo Amaro
Estado      Código público
```

El campo **medio** es la broma que sostiene toda la idea. En una ficha de museo,
"medio" dice de qué está hecha la obra: óleo sobre tela, bronce, video de canal
único. Aquí dice "Angular 19, Node.js, Express". **Es la misma información**, y
por eso se compone igual, sin ícono, sin insignia de color, sin adorno.

El punto rojo al lado del año también es prestado de la galería: allá marca obra
vendida, aquí marca lo que se puede ir a ver ahora. Es el único color del sitio
entero.

## Qué hay aquí

**Colección** son los proyectos cerrados, con principio y fin, del más nuevo al
más antiguo y con filtro por tecnología.

**Experiencia** es lo que sigue funcionando: el canal
[Até Zerar](/es/blog/ate-zerar), con seis años y 5,7 millones de
visualizaciones, y [BluckerTV](/es/blog/bluckertv), la plataforma de video que
abrí como empresa y cerré cinco meses después.

**Blog** es donde vive el texto largo. Estudio de caso, post-mortem,
aprendizaje. Cuando un texto trata de un proyecto, la ficha de ese proyecto
apunta hacia acá.

## La parte que casi nadie publica

El texto más importante del sitio es sobre un proyecto que **no salió bien**.

BluckerTV funcionaba, tenía cumplimiento al día, marca registrada y app en la
tienda. También tenía exactamente un suscriptor de pago y una cuenta que no
cerraba de ninguna manera. Podría haberlo dejado fuera de aquí y nadie lo
sabría.

Lo dejé porque lo que aprendí armando y desarmando aquello vale más que
cualquier proyecto de facultad que salió bien. Y porque un portafolio donde todo
funciona no es un portafolio, es publicidad.

## Cómo está hecho el sitio

Estático, en Astro, alojado en Cloudflare. Sin back-end, sin base de datos, sin
formularios y sin login. La página no carga JavaScript de ningún framework, y lo
que existe son unos pocos bytes para el botón de tema y los filtros.

No usa cookies ni rastrea a nadie, así que tampoco tiene ese aviso de
consentimiento al pie. Existe en portugués, inglés y español.

El código es abierto bajo licencia MIT,
[en GitHub](https://github.com/lipfelipef/FariaGallery). Los textos y las fotos
no: la estructura es de quien quiera usarla, el contenido es mío.
