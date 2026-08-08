---
titulo: 'Quiz Animado: dos factores para acertar dibujos de los 2000'
tituloBusca: 'Quiz Animado: dos factores en Java y JavaFX'
resumo: Un quiz offline de doce preguntas que tiene registro validado, PIN de dos factores, recuperación de contraseña y hash BCrypt. El exceso es el tema del texto.
data: 2026-08-08T01:40:00-03:00
idioma: es
obra: quiz-animado
endereco: quiz-animado
ordem: 4
assuntos:
  - Java
  - JavaFX
  - SQLite
---

Quiz Animado es un juego de preguntas sobre dibujos animados de los años 2000.
Doce preguntas sorteadas por partida, quince segundos cada una, sonido de acierto
y de error, botón que se pone verde o rojo, y un ranking donde el podio tiene
color: oro, plata y bronce. Abre en una ventana de 1280 por 720, sin terminal
alguna.

Java con JavaFX, base SQLite, Maven. Hecho en solitario, en septiembre de 2025.

## El exceso que vale la pena explicar

Para jugar este quiz hay que crear una cuenta. El registro valida el nombre de
usuario, exige contraseña de más de cinco caracteres y verifica que el correo
tenga arroba. Después viene un **PIN de verificación en dos factores**. Hay
logout. Hay recuperación de contraseña por código. La contraseña se guarda con
hash **BCrypt**.

Nada de eso es necesario. Es un juego de una sola persona, que corre en su
computadora, con una base de datos que vive en la misma carpeta del programa. No
hay servidor que invadir, no hay otro usuario del cual protegerse, no hay nada en
juego más allá de cuántos dibujos uno recuerda.

Escribo esto sin ninguna vergüenza, porque el exceso era el punto. **El quiz era
la excusa; el sistema de cuentas era el ejercicio.** La autenticación es uno de
esos temas en los que leer no enseña casi nada e implementar lo enseña todo:
dónde guardar la contraseña, qué hacer cuando el usuario ya existe, cómo dejar
entrar de nuevo a alguien que perdió el acceso, por qué el hash necesita ser
lento a propósito. Aprender eso en un proyecto donde nadie se lastima es el
momento correcto de aprenderlo.

## La parte que es game design, no código

La dificultad es adaptativa. Al acertar, las preguntas suben a medio y después a
difícil. Al errar, vuelven a medio o fácil.

Eso parece poco y no lo es. Un quiz común sortea doce preguntas y listo: quien
sabe mucho lo encuentra fácil, quien sabe poco abandona en la tercera. El ajuste
dinámico intenta mantener a todos en la franja donde seguir todavía da ganas. Es
un lazo de realimentación simple, del tipo que existe en los juegos de verdad, y
es la diferencia entre un formulario con puntaje y algo que se juega.

La barra de quince segundos empuja en la misma dirección por otro camino: impide
que la partida se vuelva una consulta. Uno responde con lo que recuerda, y
recordar es justamente el tema de un quiz de nostalgia.

## Un contraste que apareció solo al escribir

Este proyecto es de septiembre de 2025 y guarda contraseñas con BCrypt, cada una
con su propio costo de procesamiento, de la forma correcta.

[Blucker](/es/blog/blucker), que vino después y es mucho más grande, se entregó
con **contraseñas en texto plano**. Recién se convirtió en hash meses más tarde,
cuando preparé el repositorio para hacerlo público.

La misma persona, y el más nuevo era el peor. No es falta de conocimiento: en
septiembre yo ya sabía. Es lo que pasa cuando el alcance crece y el plazo
aprieta. En un proyecto de doce preguntas uno puede esmerarse en el login, porque
el login es casi todo lo que hay. En un e-commerce con treinta y seis endpoints,
el login se vuelve un ítem más de una lista enorme, y lo que parece "solo un
detalle del registro" pasa desapercibido hasta la entrega.

La lección práctica es aburrida y verdadera: **las cosas que no pueden salir mal
tienen que estar listas antes de que el proyecto se ponga grande**, porque
después compiten por atención con funcionalidad visible, y la funcionalidad
visible gana siempre.

## Por qué sigue en la colección

Porque es el proyecto más desproporcionado que tengo, y la desproporción cuenta
algo verdadero sobre estudiar programación: **el tamaño de un proyecto rara vez
es el tamaño de lo que se aprendió con él**.

Un juego de doce preguntas sobre dibujos animados con dos factores de
autenticación es gracioso. También es donde escribí mi primer flujo de cuenta
entero, de principio a fin, sin un tutorial diciéndome el próximo paso.
