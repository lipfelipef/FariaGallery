---
titulo: 'Quiz Animado: two-factor authentication to name a 2000s cartoon'
resumo: An offline twelve-question quiz with validated signup, a two-factor PIN, password recovery, and BCrypt hashing. The overkill is the point of the text.
data: 2026-08-08T01:40:00-03:00
idioma: en
obra: quiz-animado
endereco: quiz-animado
ordem: 4
assuntos:
  - Java
  - JavaFX
  - SQLite
---

Quiz Animado is a trivia game about 2000s cartoons. Twelve questions drawn per
round, fifteen seconds each, a sound for right and wrong, a button that turns
green or red, and a leaderboard where the podium has colour: gold, silver, and
bronze. It opens in a 1280 by 720 window, no terminal involved.

Java with JavaFX, a SQLite database, Maven. Built solo, in September 2025.

## The overkill worth explaining

To play this quiz, you have to create an account. Signup validates the username,
requires a password longer than five characters, and checks that the email has an
at sign. Then comes a **two-factor verification PIN**. There is a logout. There
is password recovery by code. The password is stored as a **BCrypt** hash.

None of that is necessary. It is a single-player game running on one person's
computer, with a database living in the same folder as the program. There is no
server to break into, no other user to be protected from, nothing at stake beyond
how many cartoons you remember.

I write this without embarrassment, because the overkill was the point. **The
quiz was the excuse; the account system was the exercise.** Authentication is one
of those subjects where reading teaches almost nothing and implementing teaches
everything: where to keep the password, what to do when the user already exists,
how to let someone back in after they lose access, why the hash needs to be slow
on purpose. Learning that in a project where nobody gets hurt is the right time
to learn it.

## The part that is game design, not code

Difficulty is adaptive. Get answers right and questions climb to medium and then
hard. Get them wrong and they fall back to medium or easy.

That sounds small and is not. A plain quiz draws twelve questions and that is
that: people who know a lot find it easy, people who know little give up on the
third. Dynamic adjustment tries to keep everyone in the band where continuing
still feels worth it. It is a simple feedback loop, the kind real games have, and
it is the difference between a scored form and something you actually play.

The fifteen-second bar pushes in the same direction by another route: it stops the
round from turning into a lookup. You answer with what you remember, and
remembering is exactly the subject of a nostalgia quiz.

## A contrast that only showed up while writing

This project is from September 2025 and stores passwords with BCrypt, each with
its own work factor, done properly.

[Blucker](/en/blog/blucker), which came later and is far bigger, was handed in
with **passwords in plain text**. It only became hashed months afterwards, when I
prepared the repository to go public.

Same person, and the newer one was the worse one. It is not a knowledge gap: by
September I already knew. It is what happens when scope grows and deadlines
tighten. In a twelve-question project you can take care over the login, because
the login is nearly all there is. In an e-commerce site with thirty-six
endpoints, the login becomes one item on a long list, and what reads as "just a
signup detail" slips through to submission.

The practical lesson is dull and true: **the things that cannot go wrong need to
be finished before the project gets big**, because after that they compete for
attention with visible features, and visible features always win.

## Why it stays in the collection

Because it is the most disproportionate project I have, and the disproportion says
something true about learning to program: **the size of a project is rarely the
size of what you learned from it**.

A twelve-question game about cartoons with two-factor authentication is funny. It
is also where I wrote my first complete account flow, start to finish, with no
tutorial telling me the next step.
