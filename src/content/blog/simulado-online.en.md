---
titulo: 'Simulado Online: built for the classmate with an exam tomorrow'
resumo: No framework, no build, no server, no account. Every one of those absences was chosen for the person using it, not the person writing it.
data: 2026-08-08T01:50:00-03:00
idioma: en
obra: simulado-online
endereco: simulado-online
assuntos:
  - JavaScript
  - localStorage
  - Architecture
---

Simulado Online builds question lists and runs practice tests on them, with a
performance panel and history. I made it for classmates to use in the final
stretch of the semester, and it caught on for a reason I had not planned:
**it works for any subject**. It is not a practice test for my exam, it is a
program that runs whatever practice test you build.

HTML, CSS, and plain JavaScript. No framework, no dependencies, no build step.

## The constraints were chosen by the user, not by me

That is the real subject of this text. Almost every technical decision here came
out of the same question: how does this reach a classmate at eleven at night, the
day before the exam?

**No build.** If the project needed `npm install` and `npm run build`, half the
people would stop right there. The app is an HTML file that opens.

**No server and no account.** There is no signup, no login, no "create a
profile". You open it and use it. Nobody wants to register for anything the night
before an exam.

**Classic scripts instead of ES modules**, and that is the most counterintuitive
decision in the project. ES modules are the modern, correct way to organise
JavaScript, but browsers **block modules on the `file://` protocol** under
origin policy. Which means: if I used the correct approach, double-clicking the
file would stop working. Since opening by double click was a requirement, the
files are classic scripts sharing a global scope, loading in a deliberate order:

```
core -> persistence -> ui -> features -> events -> main
```

Choosing the worse technique because it serves the user better is the kind of
decision that does not show up in tutorials, and it is the one that stuck with me
most on this project.

## From a thousand-line file to layers

The first version was a single HTML file of about **1,060 lines**: markup, style,
and logic in the same place. It worked, and it became impossible to touch.

Modularising split it into `core` (helpers, state, storage, persistence), `ui`
(theme, modal, toast, view switching), and `features` (lists, editor, quiz,
dashboard, tour), plus one file just for events and one for bootstrapping.

The part I would recommend copying is not the split itself, it is **how to check
that a refactor like that broke nothing**:

- `node --check` on every file, to make sure it is all still valid JavaScript;
- **a line-by-line comparison between the original file and the extracted
  modules**, proving that no line was lost, duplicated, or altered on the way;
- a set of jsdom tests that loads the HTML, runs the scripts in their real order,
  and walks the flows end to end: create a list, bulk import, run a whole
  practice test, check the score, switch themes, open the dashboard.

Refactoring without verification is rewriting with hope. The line-by-line
comparison is tedious, and it is what turns "I think it is the same" into "it is
the same".

## Where the data lives, and what that means

Everything lives in the `localStorage` of the browser being used. Lists,
questions, attempt history, theme.

The consequence is that **the app knows nothing about anyone**. There is no
database, no server, nothing to leak, because there is nothing on the other side.
When I published the repository I had a concrete worry: I already had about two
hundred of my own JavaScript questions saved in there from when I was studying,
and I did not want them going along. They did not, and that is not luck: there is
no data file in the project. Whoever downloads it gets three sample questions and
an empty screen to fill.

Storage has one curious consequence worth knowing: `file://` and
`http://localhost` are different origins to the browser, so they have separate
`localStorage`. Switching how you run it makes the history look gone. It is not
gone, it is in the other origin.

## What it does not do

You cannot export or import a list as a file. You build the questions in the
browser and they stay there. Clear your browser data and they are gone, with no
copy anywhere. For an app whose whole appeal is building your own list, that is
the limitation that bothers me most, and it is the first thing I would add.

The fonts come from Google Fonts, so there is **one** external request. Without
internet the app falls back to system fonts and keeps working, but calling it
one hundred percent offline would be a lie, and the README says so plainly.

## Why it is in the collection

Because it is the only project of mine that other people used without me asking,
and the reason was not technical. It was realising, halfway through, that a
practice tool for one specific subject serves one class for one month, and that a
practice tool for no subject in particular serves anyone, always.

The engineering part was just removing, one by one, every excuse somebody might
have for not opening the file.
