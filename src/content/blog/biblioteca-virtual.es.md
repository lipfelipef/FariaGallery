---
titulo: 'Biblioteca Virtual: mi trabajo final, dos años después'
resumo: Un sistema de biblioteca en Django, hecho en la educación media técnica en 2024. Revisitado hoy, enseña más por los errores que quedaron en el repositorio que por lo que funcionaba.
data: 2026-08-07T23:40:00-03:00
atualizado: 2026-08-08T00:10:00-03:00
idioma: es
obra: biblioteca-virtual
endereco: biblioteca-virtual
assuntos:
  - Python
  - Django
  - Seguridad
---

Biblioteca Virtual fue el Trabajo de Conclusión de Curso de la educación media
técnica en Informática para Internet, hecho en grupo en noviembre de 2024, en la
Escola Estadual Prof. Luiz Simione Sobrinho.

Es un sistema de acervo en **Django**: registro de libro, autor, género e
idioma, cada ejemplar con estado de préstamo, login de usuario y un área de
bibliotecario que renueva plazos. Base en SQLite, plantillas en HTML, un poco de
CSS propio.

## La parte honesta primero

El proyecto fue construido **sobre el tutorial LocalLibrary de MDN**, la guía de
Django de Mozilla. Se ve en el código sin esfuerzo: la carpeta del proyecto se
llama `locallibrary`, los modelos son `Book`, `BookInstance`, `Author`, `Genre`,
y el campo de fallecimiento del autor está escrito exactamente como en el
tutorial, `models.DateField('died')`.

Lo digo de entrada porque es lo contrario de un demérito. **El primer contacto
con un framework web siguiendo un buen tutorial es como aprende casi todo el
mundo**, y esconderlo sería lo raro en un sitio que dice en la entrada que lo
que no salió bien entra con la misma ficha.

Lo que el grupo agregó encima: el modelo de `Language`, que el tutorial deja
como ejercicio final en vez de entregar hecho, el índice reescrito, el CSS y la
identidad de la escuela.

## Qué enseñó

**ORM y migraciones.** Hay cinco archivos de migración en el repositorio, y
cuentan la evolución del modelo: la primera crea el esqueleto, la segunda
cambia el modelo de ejemplo por los cuatro reales, la tercera agrega el campo de
quien pidió prestado, la cuarta toca el orden, la quinta introduce idioma. Leer
esa secuencia es leer el proyecto siendo pensado.

**Modelado de verdad.** La idea central del sistema es la diferencia entre
`Book` y `BookInstance`: el libro es la obra, la instancia es el ejemplar físico
en el estante. La biblioteca tiene un *Dom Casmurro*, pero tres copias, y solo
una está prestada. Quien nunca modeló eso cree que un libro es una sola tabla, y
esa distinción es la primera lección de modelado que vale.

**Permisos, no solo login.** Hay pantalla de login, recuperación de contraseña y
un área a la que solo accede el bibliotecario. Es distinto de "hay un usuario
conectado": es un usuario con rol.

## Qué haría distinto hoy

Aquí está el motivo real de este texto. Revisité el repositorio en agosto de
2026 y encontré cuatro cosas que hoy no dejaría pasar.

**La clave secreta de Django está en el repositorio.** El `SECRET_KEY` del
`settings.py` fue subido junto con el resto, en un repositorio público. En este
caso puntual el daño es pequeño: es la clave de desarrollo que el propio Django
genera con prefijo `django-insecure-`, el proyecto tiene `DEBUG = True` y
`ALLOWED_HOSTS` vacío, o sea que nunca fue a producción. Pero la lección vale
entera: **las claves van en variables de entorno, no en el commit**, y el
historial de git es permanente.

**La base de datos fue subida.** Hay un `db.sqlite3` de 245 KB en el
repositorio. Una base de desarrollo no entra en git: cambia todo el tiempo,
ensucia el historial y, según lo que tenga adentro, publica datos de gente que
no pidió ser publicada.

**Archivos compilados en el repositorio.** Todas las carpetas `__pycache__`
están ahí. Son artefactos que Python genera solo y que un `.gitignore` de tres
líneas resolvería.

**Una carpeta llamada `catalog - Copia`.** Quedó una copia entera de las
plantillas, con el nombre que Windows le da cuando alguien aprieta Ctrl+C y
Ctrl+V. Es el respaldo manual de quien todavía no confía en el control de
versiones, y es justamente lo que git existe para volver innecesario.

## Qué hice al respecto

Escribir todo esto y dejar el repositorio como estaba sería raro, así que lo
limpié.

La base, las carpetas `__pycache__` y la carpeta duplicada salieron del
**historial entero**, no solo del estado actual. Esa distinción es justamente
el punto: sacar un archivo en un commit nuevo no lo saca del pasado, y en git
el pasado sigue siendo descargable por cualquiera. La clave ahora viene de una
variable de entorno. Entraron un `.gitignore`, un `requirements.txt` con la
versión de Django de la entrega y un `README` que explica cómo correr el
proyecto desde cero, ya que sin base versionada hay que crear una.

El código de 2024 no cambió ni una línea. Lo comparé archivo por archivo, antes
y después: los 58 archivos coinciden, y la única diferencia en todo el
repositorio es la línea de la clave.

Y quedó una curiosidad que no esperaba. El repositorio tenía dos commits,
"falta algumas partes" y "90% completo". Cuando la base salió del historial, el
segundo quedó vacío: lo único que cambiaba era el `db.sqlite3`, que engordó
4 KB porque alguien abrió el sistema y pasó por algunas pantallas. Meses de
trabajo cupieron en un solo commit, y el otro era la base creciendo.

## Por qué esto está aquí

Ninguno de esos cuatro errores aparece en el sitio funcionando. El sistema
funciona, el tribunal lo aprobó, el curso terminó.

Aparecían cuando alguien abría el repositorio, que es exactamente lo que hace
un reclutador. Y vi los cuatro porque **hoy sé qué buscar**, cosa que dos años
atrás no sabía.

Por eso este proyecto sigue en la colección en vez de ser borrado. La distancia
entre lo que hice en 2024 y lo que veo en 2026 es la información más útil que
guarda esa carpeta.
