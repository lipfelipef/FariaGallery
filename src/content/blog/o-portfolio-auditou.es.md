---
titulo: 'Faria Gallery: el portafolio auditó los proyectos'
tituloBusca: 'El portafolio auditó los proyectos'
resumo: Escribir la ficha de cada proyecto me obligó a reabrir repositorios viejos. Encontré contraseñas en texto plano, una clave commiteada y cuentas reales.
data: 2026-08-08T23:40:00-03:00
idioma: es
obra: fariagallery
endereco: o-portfolio-auditou
ordem: 10
assuntos:
  - Seguridad
  - Git
  - Faria Gallery
---

Este sitio existe para mostrar lo que construí. El efecto colateral no estaba en
el plan: para escribir la ficha de cada obra tuve que reabrir repositorios que
llevaban meses o años quietos. Y reabrir código con dos años más de experiencia
muestra cosas que no aparecían mientras el sistema estaba funcionando.

Ninguno de los problemas de abajo daba señal con el sistema funcionando. Todos
aparecieron al abrir el repositorio, que es exactamente lo que hace un
reclutador.

## Biblioteca Virtual, el trabajo final de 2024

El trabajo de conclusión del técnico, en Django. Cuatro hallazgos.

**La clave secreta de Django estaba commiteada en `settings.py`**, en un
repositorio público. El daño concreto es pequeño, y vale explicar por qué: era
una clave de desarrollo, de las que el propio Django genera con el prefijo
`django-insecure-`, con `DEBUG = True` y `ALLOWED_HOSTS` vacío. Nunca fue a
producción. La lección queda entera igual, porque el hábito es el mismo con una
clave que sí importa: el historial de git es permanente, y borrarla en un commit
posterior no arregla nada.

**La base de datos estaba versionada**, un `db.sqlite3` de 245 KB. **Las
carpetas `__pycache__` también**, enteras. Y había **una carpeta llamada
`catalog - Copia`**, con el nombre que Windows le da al Ctrl+C Ctrl+V: respaldo
manual de quien todavía no confiaba en el control de versiones.

La corrección no fue borrar del estado actual, que sería fingir. Base de datos,
`__pycache__` y carpeta duplicada salieron del **historial entero**, y la clave
pasó a variable de entorno. Entraron un `.gitignore`, un `requirements.txt` con
la versión de Django de la entrega, y un README.

**El código de 2024 no cambió una línea.** Revisé los 58 archivos uno por uno, y
la única diferencia en todo el repositorio es la línea de la clave. El trabajo
entregado sigue siendo el trabajo entregado.

### El commit que era solo la base engordando

Una curiosidad que apareció en el proceso y dice mucho. El repositorio tenía dos
commits. Cuando la base salió del historial, el segundo quedó **vacío**: lo
único que cambiaba era `db.sqlite3` ganando 4 KB después de que alguien abriera
el sistema y pinchara algunas pantallas.

Meses de trabajo cupieron en un commit. El otro era la base creciendo.

## Blucker, el proyecto integrador de 2026

Este es más reciente, y por eso incomoda más. Dos hallazgos al preparar el
repositorio para hacerlo público.

**Las contraseñas estaban en texto plano en la base entregada.** Sin hash, sin
salt, sin nada: quien abriera el archivo leía la contraseña de todos. Hoy cada
usuario tiene su propio salt y la contraseña pasa por scrypt, usando solo el
módulo `crypto` de Node, sin dependencia nueva.

**Y la base real del desarrollo fue versionada junto**, con cuentas de verdad de
la pareja adentro, incluido un correo personal. Hoy la base de trabajo no se
versiona, y el repositorio trae un archivo de ejemplo con datos ficticios.

Escribí el párrafo de arriba después de abrir el respaldo de la entrega y leer
el archivo, en vez de confiar en la memoria. Creía que la contraseña estaba en
texto plano; quería estar seguro antes de afirmarlo públicamente sobre un
trabajo hecho en pareja. El correo personal dentro de la base fue un hallazgo
extra, y solo apareció porque fui a comprobar.

## Lo que esto enseña, y no es sobre seguridad

Los errores son de seguridad, pero la lección es sobre **exposición**.

Un sistema que funciona esconde todo eso. La pantalla abre, el login entra, el
registro guarda, y nadie ve la clave en el archivo de configuración ni la
contraseña legible en la base. Mientras el único juez sea el profesor ejecutando
el sistema en la presentación, el repositorio puede estar como esté.

Un portafolio cambia al juez. Cuando el trabajo se vuelve un enlace público, el
repositorio pasa a ser leído por alguien que no va a ejecutar nada: alguien que
abre la carpeta, mira la estructura, lee un archivo o dos y se forma una opinión
en tres minutos. Lo que nunca fue mirado pasa a ser lo primero que se mira.

Y así un portafolio, que existe para exhibir, termina funcionando como
auditoría. No porque yo haya decidido auditar nada, sino porque **escribir sobre
un trabajo obliga a reabrirlo**, y reabrir alcanza.

Si tienes repositorios de la facultad quietos en GitHub, el ejercicio rinde:
abre uno y léelo como si fuera de otra persona. Lo más probable es que haya un
`settings.py` con algo adentro, una base versionada y una carpeta con "Copia" en
el nombre.
