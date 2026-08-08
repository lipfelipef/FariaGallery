---
titulo: 'Hydroponic Greenhouse: lettuce run by thirteen logic gates'
tituloBusca: 'Hydroponic Greenhouse: thirteen logic gates'
resumo: A system that waters, heats, ventilates, and shades a greenhouse on its own, with no processor and no code. The whole decision lives in the wire.
data: 2026-08-08T01:05:00-03:00
idioma: en
obra: estufa-hidroponica
endereco: estufa-hidroponica
ordem: 5
assuntos:
  - Digital logic
  - Logisim
  - Hardware
---

This was the short project for Computing Concepts, submitted in December 2025 at
Centro Universitário Senac, Santo Amaro. Team work, with Paulo Henrique de Castro
Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu, Vinicius de Castro
Marques, Eduardo Almeida Oliveira, and Luciano Alves de Andrade Neto, advised by
Prof. Eng. Jean Carlo Wagner.

The brief asked for a control system for a hydroponic lettuce greenhouse. Read
sensors, drive pumps, valves, fans, a heater, and lamps. The kind of thing anyone
would solve with a five-dollar microcontroller and thirty lines of code.

Except the rule was different: **pure combinational logic**, in Logisim, using
two-input gates only. No processor. No memory. No code.

## What changes when there is no code

Programming is writing an order in time: first this, then that, and if some
condition holds, do this other thing. A combinational circuit has no time and no
order. It is a permanent statement about reality.

You do not write "if the temperature rises, turn on the fan". You build a path
where current **can only reach** the fan while the heat sensor sits at 1. The
condition is never evaluated. The condition is the wire.

That inversion is what the project teaches, and it is uncomfortable at first. You
spend a few days looking for where the `if` went, until you understand that the
`if` became the drawing.

## The ranges the system keeps

| Quantity | Ideal range |
| --- | --- |
| Irrigation water pH | between 4 and 6 |
| Ambient temperature | between 10 °C and 25 °C |
| Ambient light | between 50% and 70% |
| Water pressure in the channels | above 40% |

Sensors hand this over already digitised, one bit each: `Tc` says it is too hot,
`Tb` too cold, `Pg` that pressure is missing, `pH_F` that the channel pH left the
acceptable band, `Da` that there is daylight outside.

## The eight decisions, spelled out

After building the truth tables and running each one through a Karnaugh map, the
entire system fit into eight expressions:

```
BhlC = Pg . (Tc + pH_F)      turns on the central pump
Vlv  = BhlC                  valves follow the pump
BhlS = pHT . BhlC'           feeds nutrient only with the pump off
Lp   = Tb + Lb               lamps in the cold or in low light
aqD  = Tb                    heater in the cold
vlF  = Tc                    fans in the heat
Op   = Tc                    darkens the glass in the heat
Tr   = Tb . Da               clears the glass in the cold, if the sun is up
```

Two of these are worth reading out loud, because they are not code. They are
sentences about a vegetable garden.

`BhlS = pHT . BhlC'` says: only inject nutrient when the tank pH is high **and**
the central pump is off. The bar over `BhlC` is a negation, and it exists to stop
both pumps from drawing water at once. It is a safety interlock, and it is not a
check somebody remembered to write: it is physically impossible to violate,
because the circuit offers no path for it.

`Tr = Tb . Da` says: make the glass more transparent when it is cold **and**
there is daylight. Letting the sun in to warm the place is free; doing it at
night would warm nothing. A two-input `and` solved what, in code, would be
somebody forgetting to check the clock.

## Simplifying here costs money, not elegance

In software, refactoring saves reading. In hardware, it saves a **physical gate**,
which takes space, draws power, and has to be bought.

Karnaugh minimisation removed roughly ten two-input gates from the project.
`BhlC` went from eight gates down to two. `Lp` went from five down to one.

The final count was **thirteen gates**: three AND, two OR, and eight XOR. Same old
discipline, with a material consequence that software hides.

## The part I find most beautiful

Eight of the thirteen gates control nothing in the greenhouse. They do something
else: **check whether the information arrived intact**.

The circuit generates an odd parity bit over the eight control outputs, in a chain
of XORs, and the receiver compares it against what it got:

```
P = Vlv XOR BhlS XOR BhlC XOR vlF XOR Op XOR aqD XOR Tr XOR Lp
E = P XOR P_in
```

If `E` is 0, the data arrived as it left. If it is 1, a bit flipped on the way.

One extra bit, and the system stops trusting the cable blindly. That is exactly
the principle behind network checksums, ECC memory, and disk verification. In a
first-year assignment about lettuce, up comes the idea that **transmission is a
place where things go wrong**, and that you can know when they did.

## What remains

The circuit is in the repository, along with the team report, and opens in
Logisim 2.7.1. The presentation video was not uploaded, and that was a deliberate
call: it carries the voices of the six classmates, who agreed to hand it to the
professor, not to publish it on the open and permanent internet.

So there is a project without a single line of code sitting in a collection that
is almost all software. It is here on purpose. It is the only one where you can
point at the exact place where the decision happens.
