---
titulo: 'Blucker: dinero de mentira, defensas de verdad'
resumo: Un e-commerce de facultad donde casi todo el trabajo se fue en cosas que nadie ve en pantalla. Tratar dinero falso como real es el entrenamiento que sirve.
data: 2026-08-08T01:25:00-03:00
idioma: es
obra: blucker
endereco: blucker
ordem: 7
assuntos:
  - Angular
  - Node.js
  - Seguridad
---

Blucker es una tienda de juegos digitales: catálogo, carrito, checkout, pedido,
seguimiento, reseñas y panel administrativo. Angular 19 al frente, una API propia
en Node y Express detrás, con 36 endpoints. Fue el Proyecto Integrador del 2.º
semestre de Análisis y Desarrollo de Sistemas en el Senac, hecho en pareja con
José Victor Souza, bajo la orientación del Prof. Evandro Carlos Teruel.

Antes de seguir, una aclaración que la colección pide: **Blucker no es
BluckerTV**. Este es el trabajo de facultad. [BluckerTV](/es/blog/bluckertv) era
una plataforma de video, con empresa abierta y marca registrada, y tiene su
post-mortem en otro texto. El nombre compartido es gusto personal, nada más.

## Lo que da trabajo no es lo que se ve

Un e-commerce parece un CRUD con carrito. La pantalla engaña: la lista de
productos, el botón de agregar, el total sumando. Todo eso sale rápido.

El tiempo se fue a otro lugar, y sobre ese lugar vale la pena escribir. Cuatro
decisiones del servidor, ninguna visible para quien usa, todas ellas la
diferencia entre un ejercicio y un sistema.

**El servidor no cree en el precio que manda el cliente.** El checkout recibe el
carrito, tira los valores que vinieron con él y recalcula todo a partir de la
base, incluido el 5% de descuento del PIX. Parece paranoia en un trabajo escolar,
donde nadie va a adulterar nada. Es el hábito correcto: el cliente es territorio
enemigo, y cualquier número que mande es una sugerencia, no un hecho.

**Hacer doble clic en "finalizar" no genera dos pedidos.** Cada intento lleva una
clave de idempotencia; la misma clave dentro de 60 segundos devuelve el pedido
que ya existe en vez de crear otro. Ese bug es clásico, aparece en tiendas de
verdad, y la corrección no es deshabilitar el botón en el front. Es que el
servidor sepa reconocer que esa es la misma intención llegando dos veces.

**Toda escritura es atómica.** Escribe en un archivo temporal, después renombra,
y todo eso pasa por una cola de promesas para que dos solicitudes simultáneas no
se atropellen. Renombrar es una operación atómica del sistema de archivos: o el
archivo nuevo está entero en su lugar, o sigue el anterior. Nunca la mitad de los
dos.

**El login tarda igual para una cuenta que existe y una que no.** Cuando el
correo no está registrado, el servidor calcula el hash igual, contra un valor
descartable, solo para gastar el mismo tiempo. Sin eso, se puede descubrir qué
correos tienen cuenta en la tienda apenas cronometrando las respuestas: el
correcto tarda, el equivocado vuelve al instante. La comparación también se hace
en tiempo constante, con `timingSafeEqual`.

## La limitación que se volvió el aprendizaje

Aquí está la parte que más me gusta contar, porque es lo contrario de lo que se
espera de un trabajo de facultad.

**La persistencia de Blucker es un archivo JSON.** No hay PostgreSQL, no hay
MySQL, no hay ORM. Es un `db.json` que el servidor lee y reescribe.

Es una limitación real, y en un sistema de verdad sería lo primero a cambiar.
Solo que fue exactamente ella la que obligó a hacer la escritura atómica a mano.
Una base de datos de verdad resuelve concurrencia, escritura parcial y corrupción
por vos, y nunca necesitás entender el problema. Con un archivo JSON, sí. Uno
descubre a los golpes que dos escrituras al mismo tiempo arruinan el archivo, y
termina aprendiendo qué es una transacción porque su ausencia apareció enfrente.

La herramienta pobre enseñó el concepto que la herramienta buena esconde.

## Lo que estaba mal cuando se entregó

El trabajo fue entregado, evaluado y aprobado. Meses después, al preparar el
repositorio para hacerlo público, revisé todo con calma y encontré dos cosas que
no podían llegar a GitHub de esa forma.

**Las contraseñas estaban en texto plano.** En la base entregada, el campo de
contraseña guardaba exactamente lo que el usuario escribió, legible para
cualquiera que abriera el archivo. No había salt, no había hash, no había nada.
Hoy cada usuario tiene su propio salt y la contraseña pasa por `scrypt`, usando
solo el módulo `crypto` de Node, sin dependencia de terceros.

**La base de desarrollo se fue junto.** Junto con el código fue también el
`db.json` real de cuando estábamos probando, con cuentas nuestras de verdad
adentro, incluido un correo personal mío. Hoy el `db.json` no se versiona: el
repositorio trae un `db.seed.json` con catálogo y cuentas ficticias, y el
servidor crea la base a partir de él en la primera ejecución.

Escribir esto da una vergüenza en la medida justa. Las dos fallas son de manual,
y ninguna apareció mientras el sistema corría en la presentación. Aparecieron
cuando alguien abrió el repositorio, que es precisamente lo que hace un
reclutador.

## El resto, en números

Treinta y seis endpoints REST. Rutas todas cargadas bajo demanda, lo que deja la
primera carga en 96 kB. Sesenta y cinco pruebas de punta a punta pasando. Rate
limiting propio en las rutas de login, escritura y subida. Autorización revisada
por recurso, y no solo por estar logueado: listas, reseñas y pedidos verifican
quién es el dueño, porque estar autenticado no es lo mismo que tener derecho a
ese registro.

Del lado de la tienda, lo que se espera de una: búsqueda, filtros, promociones,
reseñas con voto de utilidad, listas de deseos, múltiples direcciones, validación
de CPF por dígito verificador, dirección completada por código postal y un
seguimiento simulado con transportistas y etapas de entrega.

## Por qué sigue en la colección

Porque la distancia entre "funciona en la presentación" y "aguanta ser público"
es el tema de este sitio, y Blucker muestra las dos puntas de esa distancia en un
mismo proyecto.

Lo que el profesor evaluó fue la tienda funcionando. Lo que yo entrené de verdad
fue desconfiar del cliente, no perder datos en medio de una escritura, y no dejar
que el tiempo de respuesta cuente un secreto. Nada de eso tiene pantalla.
