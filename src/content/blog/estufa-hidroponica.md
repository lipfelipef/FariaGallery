---
titulo: 'Estufa Hidropônica: uma alface controlada por treze portas lógicas'
resumo: Um sistema que rega, aquece, ventila e escurece uma estufa sozinho, sem processador e sem uma linha de código. A decisão inteira mora no fio.
data: 2026-08-08T01:05:00-03:00
idioma: pt
obra: estufa-hidroponica
endereco: estufa-hidroponica
assuntos:
  - Lógica digital
  - Logisim
  - Hardware
---

Este foi o nano projeto de Conceitos de Computação, entregue em dezembro de 2025
no Centro Universitário Senac, Santo Amaro. Trabalho de grupo, com Paulo Henrique
de Castro Lima, Gabriel Quaresma da Silva, José Victor Souza de Abreu, Vinicius
de Castro Marques, Eduardo Almeida Oliveira e Luciano Alves de Andrade Neto, sob
orientação do Prof. Eng. Jean Carlo Wagner.

O enunciado pedia um sistema de controle para uma estufa hidropônica de alface.
Ler sensores, acionar bombas, válvulas, ventiladores, aquecedor e lâmpadas. O
tipo de coisa que qualquer um resolveria com um microcontrolador de vinte reais e
trinta linhas de código.

Só que a regra era outra: **lógica combinacional pura**, no Logisim, usando
apenas portas de duas entradas. Sem processador. Sem memória. Sem código.

## O que muda quando não existe código

Programar é escrever uma ordem no tempo: primeiro isto, depois aquilo, e se tal
condição for verdadeira, faça isto outro. Um circuito combinacional não tem
tempo nem ordem. Ele é uma afirmação permanente sobre a realidade.

Não se escreve "se a temperatura subir, ligue o ventilador". Constrói-se um
caminho por onde a corrente **só consegue chegar** no ventilador quando o sensor
de calor está em 1. A condição não é avaliada. Ela é o próprio fio.

Essa inversão é o que o projeto ensina, e ela é desconfortável no começo. Você
passa uns dias procurando onde fica o `if` até entender que o `if` virou o
desenho.

## As faixas que o sistema procura manter

| Grandeza | Faixa ideal |
| --- | --- |
| pH da água de irrigação | entre 4 e 6 |
| Temperatura ambiente | entre 10 °C e 25 °C |
| Luminosidade ambiente | entre 50% e 70% |
| Pressão da água nas canaletas | acima de 40% |

Os sensores entregam isso já digitalizado, cada um como um bit: `Tc` diz que
está quente demais, `Tb` que está frio demais, `Pg` que falta pressão, `pH_F`
que o pH das canaletas saiu da faixa, `Da` que existe luz do dia lá fora.

## As oito decisões, escritas por extenso

Depois de montar as tabelas-verdade e passar cada uma por mapa de Karnaugh, o
sistema inteiro coube em oito expressões:

```
BhlC = Pg . (Tc + pH_F)      liga a bomba central
Vlv  = BhlC                  as valvulas acompanham a bomba
BhlS = pHT . BhlC'           injeta adubo so com a bomba desligada
Lp   = Tb + Lb               lampadas no frio ou na penumbra
aqD  = Tb                    aquecedor no frio
vlF  = Tc                    ventiladores no calor
Op   = Tc                    escurece o vidro no calor
Tr   = Tb . Da               clareia o vidro no frio, se houver sol
```

Vale ler duas dessas em voz alta, porque elas não são código, são frases sobre
uma horta.

`BhlS = pHT . BhlC'` diz: só injete adubo quando o pH do tanque estiver alto
**e** a bomba central estiver desligada. A linha em `BhlC'` é uma negação, e ela
existe para impedir que as duas bombas puxem água ao mesmo tempo. É uma trava de
segurança, e ela não é uma verificação que alguém lembrou de escrever: ela é
fisicamente impossível de violar, porque o circuito não tem por onde.

`Tr = Tb . Da` diz: aumente a transparência do vidro quando estiver frio **e**
houver luz do dia. Deixar o sol entrar para aquecer é grátis; fazer isso de noite
não aqueceria nada. Um `and` de duas entradas resolveu o que, em código, seria
alguém esquecendo de checar o horário.

## Simplificar aqui custa dinheiro, não elegância

Em software, refatorar economiza leitura. Em hardware, economiza **porta física**,
que ocupa espaço, consome energia e é comprada.

A minimização por Karnaugh tirou cerca de dez portas de duas entradas do projeto.
`BhlC` caiu de oito portas para duas. `Lp` caiu de cinco para uma.

O total final foi de **treze portas**: três AND, duas OR e oito XOR. É a
disciplina de sempre, com uma consequência material que o software esconde.

## A parte que eu acho mais bonita

Oito das treze portas não controlam nada na estufa. Elas cuidam de outra coisa:
**verificar se a informação chegou inteira**.

O circuito gera um bit de paridade ímpar sobre as oito saídas de controle, numa
cadeia de XOR, e o receptor compara com o que recebeu:

```
P = Vlv XOR BhlS XOR BhlC XOR vlF XOR Op XOR aqD XOR Tr XOR Lp
E = P XOR P_in
```

Se `E` for 0, os dados chegaram como saíram. Se for 1, um bit virou no caminho.

Um bit a mais, e o sistema deixa de confiar cegamente no cabo. Esse é exatamente
o princípio que sustenta checksum de rede, memória ECC e verificação de disco.
Num trabalho de primeiro ano, sobre alface, aparece a ideia de que **transmissão
é um lugar onde as coisas dão errado**, e que dá para saber quando deram.

## O que ficou

O circuito está no repositório, junto com o relatório do grupo, e abre no
Logisim 2.7.1. O vídeo de apresentação não subiu, e isso foi decisão consciente:
ele tem a voz dos seis colegas, que consentiram em entregar aquilo ao professor,
não em publicar na internet aberta e permanente.

Fica um projeto sem uma linha de código numa coleção que é quase toda software.
Ele está aqui de propósito. É o único em que dá para apontar o dedo para o lugar
exato onde a decisão acontece.
