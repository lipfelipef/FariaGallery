---
titulo: 'Virtual Library: my final project, two years on'
tituloBusca: 'Virtual Library: my final project'
resumo: A library system in Django, built at technical high school in 2024. It teaches more through the mistakes left in the repository than through what worked.
data: 2026-08-07T23:40:00-03:00
atualizado: 2026-08-08T00:30:00-03:00
idioma: en
obra: biblioteca-virtual
endereco: biblioteca-virtual
ordem: 3
assuntos:
  - Python
  - Django
  - Security
---

Virtual Library was the final project of my technical high school diploma in
Internet Computing, delivered in November 2024 at Escola Estadual Prof. Luiz
Simione Sobrinho. It was team work, with Caio Cardoso Silva, Gabriel Medeiros,
and Heloisa Teodozio.

It is a catalogue system in **Django**: books, authors, genres, and languages,
each physical copy carrying a loan status, user login, and a librarian area
that renews due dates. SQLite for the database, HTML templates, a little
custom CSS.

## The honest part, up front

The project was built **on top of the MDN LocalLibrary tutorial**, Mozilla's
Django guide. You can see it in the code without effort: the project folder is
called `locallibrary`, the models are `Book`, `BookInstance`, `Author`,
`Genre`, and the author death field is written exactly as in the tutorial,
`models.DateField('died')`.

I say that up front because it is the opposite of a weakness. **A first contact
with a web framework by following a good tutorial is how nearly everyone
learns**, and hiding it would be the odd choice on a site whose front page says
that what did not work gets the same label.

What the team added on top: the `Language` model, which the tutorial leaves as
a closing exercise rather than handing over, the rewritten index, the CSS, and
the school's identity.

## What it taught

**ORM and migrations.** There are five migration files in the repository, and
they narrate the model evolving: the first creates the skeleton, the second
swaps the example model for the four real ones, the third adds the borrower
field, the fourth changes ordering, the fifth introduces language. Reading that
sequence is reading the project being thought through.

**Real modelling.** The central idea of the system is the difference between
`Book` and `BookInstance`: the book is the work, the instance is the physical
copy on the shelf. The library has one *Dom Casmurro*, but three copies, and
only one is on loan. Anyone who has never modelled that assumes a book is a
single table, and this distinction is the first modelling lesson worth having.

**Permissions, not just login.** There is a login screen, password recovery,
and an area only a librarian can reach. That is different from "a user is
logged in": it is a user with a role.

## What I would do differently today

Here is the real reason for this text. I revisited the repository in August
2026 and found four things I would not let through now.

**The Django secret key is in the repository.** The `SECRET_KEY` from
`settings.py` was committed along with everything else, in a public repo. In
this specific case the damage is small: it is the development key Django itself
generates with the `django-insecure-` prefix, the project has `DEBUG = True`
and an empty `ALLOWED_HOSTS`, meaning it never went to production. But the
lesson holds in full: **keys go in environment variables, not in commits**, and
git history is permanent.

**The database was committed.** There is a 245 KB `db.sqlite3` in the
repository. A development database does not belong in git: it changes
constantly, pollutes the history, and depending on what is inside, publishes
data about people who never asked to be published.

**Compiled files in the repository.** All the `__pycache__` folders are there.
They are artifacts Python generates on its own, and a three line `.gitignore`
would have handled it.

**A folder called `catalog - Copia`.** A whole duplicate of the templates was
left behind, named the way Windows names things when someone hits Ctrl+C and
Ctrl+V. It is the manual backup of someone who does not yet trust version
control, and it is exactly what git exists to make unnecessary.

## What I did about it

Writing all of that and leaving the repository as it was would have been odd,
so I cleaned it up.

The database, the `__pycache__` folders, and the duplicate folder came out of
the **entire history**, not just the current state. That distinction is the
whole point: removing a file in a new commit does not remove it from the past,
and in git the past stays downloadable by anyone. The key now comes from an
environment variable. In went a `.gitignore`, a `requirements.txt` pinning the
Django version used at delivery, and a `README` explaining how to run the
project from scratch, since without a versioned database you have to create
one.

Not a line of the 2024 code changed. I compared it file by file, before and
after: the 58 files match, and the only difference in the whole repository is
the line holding the key.

And there was a surprise waiting. The repository had two commits. Once the
database left the history, the second one turned out empty: the only thing it
changed was `db.sqlite3`, which had grown 4 KB because someone opened the
system and clicked through a few screens. Months of work fit into a single
commit, and the other one was the database getting fatter.

## Why this is here

None of those four mistakes shows up in the running site. The system works, the
board approved it, the course ended.

They showed up when someone opened the repository, which is exactly what a
recruiter does. And I only spotted all four because **today I know what to look
for**, which two years ago I did not.

That is why this project stays in the collection instead of being deleted. The
distance between what I built in 2024 and what I can see in 2026 is the most
useful information that folder holds.
