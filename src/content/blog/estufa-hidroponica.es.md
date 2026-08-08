---
titulo: 'Invernadero Hidropónico: una lechuga controlada por trece compuertas lógicas'
tituloBusca: 'Invernadero Hidropónico: trece compuertas'
resumo: Un sistema que riega, calienta, ventila y oscurece un invernadero solo, sin procesador y sin una línea de código. La decisión entera vive en el cable.
data: 2026-08-08T01:05:00-03:00
idioma: es
obra: estufa-hidroponica
endereco: estufa-hidroponica
ordem: 6
assuntos:
  - Lógica digital
  - Logisim
  - Hardware
---

Este fue el nano proyecto de Conceptos de Computación, entregado en diciembre de
2025 en el Centro Universitário Senac, Santo Amaro. Trabajo en grupo, con Paulo
Henrique de Castro Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu,
Vinicius de Castro Marques, Eduardo Almeida Oliveira y Luciano Alves de Andrade
Neto, bajo la orientación del Prof. Ing. Jean Carlo Wagner.

El enunciado pedía un sistema de control para un invernadero hidropónico de
lechuga. Leer sensores, accionar bombas, válvulas, ventiladores, calefactor y
lámparas. El tipo de cosa que cualquiera resolvería con un microcontrolador de
cinco dólares y treinta líneas de código.

Solo que la regla era otra: **lógica combinacional pura**, en Logisim, usando
únicamente compuertas de dos entradas. Sin procesador. Sin memoria. Sin código.

## Qué cambia cuando no existe el código

Programar es escribir un orden en el tiempo: primero esto, después aquello, y si
tal condición es verdadera, haz esta otra cosa. Un circuito combinacional no
tiene tiempo ni orden. Es una afirmación permanente sobre la realidad.

No se escribe "si la temperatura sube, enciende el ventilador". Se construye un
camino por donde la corriente **solo puede llegar** al ventilador mientras el
sensor de calor está en 1. La condición no se evalúa. La condición es el cable.

Esa inversión es lo que enseña el proyecto, y al principio incomoda. Uno pasa
unos días buscando dónde quedó el `if` hasta entender que el `if` se volvió el
dibujo.

## Los rangos que el sistema mantiene

| Magnitud | Rango ideal |
| --- | --- |
| pH del agua de riego | entre 4 y 6 |
| Temperatura ambiente | entre 10 °C y 25 °C |
| Luminosidad ambiente | entre 50% y 70% |
| Presión del agua en las canaletas | por encima del 40% |

Los sensores entregan esto ya digitalizado, cada uno como un bit: `Tc` dice que
hace demasiado calor, `Tb` que hace demasiado frío, `Pg` que falta presión,
`pH_F` que el pH de las canaletas salió del rango aceptable, `Da` que hay luz de
día afuera.

## Las ocho decisiones, escritas por extenso

Después de armar las tablas de verdad y pasar cada una por mapa de Karnaugh, el
sistema entero cupo en ocho expresiones:

```
BhlC = Pg . (Tc + pH_F)      enciende la bomba central
Vlv  = BhlC                  las valvulas acompanan a la bomba
BhlS = pHT . BhlC'           inyecta abono solo con la bomba apagada
Lp   = Tb + Lb               lamparas en el frio o en la penumbra
aqD  = Tb                    calefactor en el frio
vlF  = Tc                    ventiladores en el calor
Op   = Tc                    oscurece el vidrio en el calor
Tr   = Tb . Da               aclara el vidrio en el frio, si hay sol
```

Vale la pena leer dos de ellas en voz alta, porque no son código: son frases
sobre una huerta.

`BhlS = pHT . BhlC'` dice: inyecta abono solo cuando el pH del tanque esté alto
**y** la bomba central esté apagada. La barra sobre `BhlC` es una negación, y
existe para impedir que las dos bombas tiren agua al mismo tiempo. Es un enclavamiento
de seguridad, y no es una verificación que alguien se acordó de escribir: es
físicamente imposible de violar, porque el circuito no tiene por dónde.

`Tr = Tb . Da` dice: aumenta la transparencia del vidrio cuando haga frío **y**
haya luz de día. Dejar entrar el sol para calentar es gratis; hacerlo de noche no
calentaría nada. Un `and` de dos entradas resolvió lo que, en código, sería
alguien olvidándose de mirar la hora.

## Simplificar aquí cuesta dinero, no elegancia

En software, refactorizar ahorra lectura. En hardware, ahorra **compuerta
física**, que ocupa espacio, consume energía y se compra.

La minimización por Karnaugh quitó cerca de diez compuertas de dos entradas del
proyecto. `BhlC` bajó de ocho compuertas a dos. `Lp` bajó de cinco a una.

El total final fue de **trece compuertas**: tres AND, dos OR y ocho XOR. La
disciplina de siempre, con una consecuencia material que el software esconde.

## La parte que me parece más bonita

Ocho de las trece compuertas no controlan nada en el invernadero. Se ocupan de
otra cosa: **verificar si la información llegó entera**.

El circuito genera un bit de paridad impar sobre las ocho salidas de control, en
una cadena de XOR, y el receptor lo compara con lo que recibió:

```
P = Vlv XOR BhlS XOR BhlC XOR vlF XOR Op XOR aqD XOR Tr XOR Lp
E = P XOR P_in
```

Si `E` es 0, los datos llegaron como salieron. Si es 1, un bit se dio vuelta en
el camino.

Un bit de más, y el sistema deja de confiar ciegamente en el cable. Ese es
exactamente el principio que sostiene el checksum de red, la memoria ECC y la
verificación de disco. En un trabajo de primer año, sobre lechuga, aparece la
idea de que **la transmisión es un lugar donde las cosas salen mal**, y de que se
puede saber cuándo salieron.

## Lo que quedó

El circuito está en el repositorio, junto con el informe del grupo, y abre en
Logisim 2.7.1. El video de presentación no se subió, y fue una decisión
consciente: lleva la voz de los seis compañeros, que aceptaron entregárselo al
profesor, no publicarlo en la internet abierta y permanente.

Queda un proyecto sin una línea de código en una colección que es casi toda
software. Está aquí a propósito. Es el único en el que se puede señalar con el
dedo el lugar exacto donde ocurre la decisión.
