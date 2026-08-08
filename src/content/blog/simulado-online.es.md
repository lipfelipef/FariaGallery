---
titulo: 'Simulado Online: hecho para el compañero con examen mañana'
tituloBusca: 'Simulado Online: sin back-end ni build'
resumo: Sin framework, sin build, sin servidor y sin cuenta. Cada una de esas ausencias fue elegida pensando en quien lo iba a usar, y no en quien lo iba a escribir.
data: 2026-08-08T01:50:00-03:00
idioma: es
obra: simulado-online
endereco: simulado-online
ordem: 8
assuntos:
  - JavaScript
  - localStorage
  - Arquitectura
---

Simulado Online arma listas de preguntas y aplica simulacros sobre ellas, con
panel de desempeño e historial. Lo hice para que mis compañeros lo usaran en la
recta final del semestre, y terminó prendiendo por un motivo que yo no había
planeado: **sirve para cualquier materia**. No es el simulacro de mi examen, es
un programa que aplica el simulacro que vos armes.

HTML, CSS y JavaScript puro. Sin framework, sin dependencias, sin etapa de build.

## Las restricciones las eligió el usuario, no yo

Ese es el tema real de este texto. Casi toda decisión técnica acá salió de la
misma pregunta: ¿cómo llega esto a manos de un compañero a las once de la noche,
la víspera del examen?

**Nada de build.** Si el proyecto necesitara `npm install` y `npm run build`, la
mitad de la gente se frenaría ahí. La app es un HTML que se abre.

**Nada de servidor y nada de cuenta.** No existe registro, login ni "crear
perfil". Uno abre y usa. Nadie quiere hacerse una cuenta la víspera del examen.

**Scripts clásicos en vez de módulos ES**, y esa es la decisión más
contraintuitiva del proyecto. El módulo ES es la forma moderna y correcta de
organizar JavaScript, pero el navegador **bloquea los módulos en el protocolo
`file://`** por política de origen. Es decir: si usara la forma correcta, el
doble clic en el archivo dejaría de funcionar. Como abrir con doble clic era un
requisito, los archivos son scripts clásicos que comparten el ámbito global y
cargan en un orden deliberado:

```
core -> persistence -> ui -> features -> events -> main
```

Elegir la técnica peor porque atiende mejor al usuario es un tipo de decisión que
no aparece en los tutoriales, y es la que más me marcó en este proyecto.

## De un archivo de mil líneas a capas

La primera versión era un único HTML de unas **1.060 líneas**: marcado, estilo y
lógica en el mismo lugar. Funcionaba, y se volvió imposible de tocar.

La modularización lo separó en `core` (utilidades, estado, almacenamiento,
persistencia), `ui` (tema, modal, toast, cambio de pantallas) y `features`
(listas, editor, quiz, panel, tour), más un archivo solo de eventos y uno de
arranque.

La parte que recomiendo copiar no es la división en sí, es **cómo verificar que
una refactorización así no rompió nada**:

- `node --check` en cada archivo, para garantizar que todo siga siendo
  JavaScript válido;
- **comparación línea por línea entre el archivo original y los módulos
  extraídos**, para probar que ninguna línea se perdió, duplicó ni cambió en el
  camino;
- un conjunto de pruebas con jsdom que carga el HTML, ejecuta los scripts en su
  orden real y recorre los flujos de punta a punta: crear lista, importar en
  lote, hacer el simulacro entero, verificar el puntaje, cambiar el tema, abrir
  el panel.

Refactorizar sin verificación es reescribir con esperanza. La comparación línea
por línea es aburrida, y es lo que convierte "creo que quedó igual" en "quedó
igual".

## Dónde viven los datos, y qué significa eso

Todo vive en el `localStorage` del navegador de quien usa. Listas, preguntas,
historial de intentos, tema.

La consecuencia es que **la app no sabe nada de nadie**. No hay base de datos, no
hay servidor, no hay nada que filtrar, porque no hay nada del otro lado. Cuando
publiqué el repositorio tenía una preocupación concreta: ya tenía unas doscientas
preguntas mías de JavaScript guardadas ahí de cuando estudié, y no quería que se
fueran junto. No se fueron, y no fue suerte: no existe archivo de datos en el
proyecto. Quien lo descarga recibe tres preguntas de ejemplo y una pantalla vacía
para llenar.

El almacenamiento tiene una consecuencia curiosa que vale saber: `file://` y
`http://localhost` son orígenes distintos para el navegador, así que tienen
`localStorage` separados. Cambiar la forma de ejecución hace que el historial
parezca perdido. No se perdió, está en el otro origen.

## Lo que no hace

No se puede exportar ni importar una lista como archivo. Uno arma las preguntas
en el navegador y quedan ahí. Si borra los datos del navegador, se fueron, y no
hay copia en ningún lado. Para una app cuya gracia es armar tu propia lista, esa
es la limitación que más molesta, y es lo primero que agregaría.

Las fuentes vienen de Google Fonts, así que existe **una** solicitud externa. Sin
internet la app cae a las fuentes del sistema y sigue funcionando, pero decir que
es cien por ciento offline sería mentira, y el README lo dice con todas las
letras.

## Por qué está en la colección

Porque es el único proyecto mío que otras personas usaron sin que yo lo pidiera,
y el motivo no fue técnico. Fue darme cuenta, a mitad de camino, de que un
simulador de una materia específica sirve para un curso y un mes, y que un
simulador de ninguna materia en particular sirve para cualquiera, siempre.

La parte de ingeniería fue solo eliminar, una por una, todas las excusas que
alguien podría tener para no abrir el archivo.
