---
titulo: 'Faria Gallery: the portfolio audited the projects'
tituloBusca: 'The portfolio audited the projects'
resumo: Writing the label for each project forced me to reopen old repositories. I found plain-text passwords, a committed key, and a database with real accounts.
data: 2026-08-08T23:40:00-03:00
idioma: en
obra: fariagallery
endereco: o-portfolio-auditou
ordem: 10
assuntos:
  - Security
  - Git
  - Faria Gallery
---

This site exists to show what I have built. The side effect was not part of the
plan: to write the label for each work, I had to reopen repositories that had
been sitting untouched for months or years. And reopening code with two more
years of experience shows things that were invisible while the system was
running.

None of the problems below gave any sign while the system worked. All of them
showed up on opening the repository, which is exactly what a recruiter does.

## Virtual Library, the 2024 final project

My technical high school capstone, in Django. Four findings.

**The Django secret key was committed in `settings.py`**, in a public
repository. The concrete damage is small, and it is worth explaining why: it was
a development key, the kind Django itself generates with the
`django-insecure-` prefix, with `DEBUG = True` and an empty `ALLOWED_HOSTS`. It
never went to production. The lesson stands whole anyway, because the habit is
the same with a key that matters: git history is permanent, and deleting it in a
later commit fixes nothing.

**The database was versioned**, a 245 KB `db.sqlite3`. **So were the
`__pycache__` folders**, entirely. And there was **a folder named
`catalog - Copia`**, carrying the name Windows gives to Ctrl+C Ctrl+V: a manual
backup by someone who did not yet trust version control.

The fix was not to delete them from the current state, which would be pretending.
Database, `__pycache__`, and the duplicated folder came out of the **entire
history**, and the key moved to an environment variable. In came a `.gitignore`,
a `requirements.txt` with the Django version from the submission, and a README.

**Not one line of the 2024 code changed.** I checked all 58 files one by one,
and the only difference in the whole repository is the key line. The work that
was submitted is still the work that was submitted.

### The commit that was just the database growing

A curiosity that turned up along the way, and it says a lot. The repository had
two commits. When the database came out of the history, the second became
**empty**: the only thing it changed was `db.sqlite3` putting on 4 KB after
someone opened the system and clicked through a few screens.

Months of work fit in one commit. The other one was the database growing.

## Blucker, the 2026 capstone

This one is more recent, and that makes it sting more. Two findings while
getting the repository ready to go public.

**Passwords were stored in plain text in the submitted database.** No hash, no
salt, nothing: anyone opening the file could read everybody's password. Today
each user has their own salt and the password goes through scrypt, using only
Node's `crypto` module, with no new dependency.

**And the real development database was versioned along with it**, holding the
pair's actual accounts, including a personal email address. Today the working
database is not versioned, and the repository ships a sample file with made-up
data.

I wrote the paragraph above after opening the submission backup and reading the
file, rather than trusting my memory. I believed the passwords were in plain
text; I wanted to be certain before stating that publicly about work done in a
pair. The personal email inside the database was an extra finding, and it only
turned up because I went to check.

## What this teaches, and it is not about security

The mistakes are about security, but the lesson is about **exposure**.

A working system hides all of it. The screen opens, the login works, the sign-up
saves, and nobody sees the key in the config file or the readable password in
the database. As long as the only judge is a professor running the system at the
presentation, the repository can be in whatever state it is in.

A portfolio changes the judge. When the work becomes a public link, the
repository starts being read by someone who will not run anything: someone who
opens the folder, looks at the structure, reads a file or two, and forms an
opinion in three minutes. What was never looked at becomes the first thing
looked at.

And so a portfolio, which exists to display, ends up working as an audit. Not
because I decided to audit anything, but because **writing about a piece of work
forces you to reopen it**, and reopening is enough.

If you have university repositories sitting on GitHub, the exercise pays off:
open one and read it as if it were someone else's. Odds are there is a
`settings.py` with something inside, a versioned database, and a folder with
"Copy" in the name.
