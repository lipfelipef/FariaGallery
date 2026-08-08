---
titulo: Why this site exists
resumo: Who I am, what Faria Gallery is, and why every project here shows up with a museum label instead of a pretty screenshot.
data: 2026-08-07T18:09:00-03:00
atualizado: 2026-08-07T23:10:00-03:00
idioma: en
endereco: por-que-este-site-existe
ordem: 1
assuntos:
  - Faria Gallery
  - Portfolio
---

My name is **Felipe Faria**. I was born in 2006 and I study Systems Analysis and
Development at Centro Universitário Senac, in Santo Amaro, São Paulo. Before
that I took a technical high school course in Internet Computing.

This site exists because I was tired of sending three links.

## The three link problem

Every time someone asked to see what I do, the answer was the same mess: GitHub
for the code, LinkedIn for the history, the channel for the rest. Three
addresses, three formats, three contexts, and none of the three telling the
whole story.

Worse: GitHub shows files, not decisions. Open a repository and you see a folder
with thirty files and no hint of what was hard, what nearly went wrong, or why
the thing ended up that way. It is the least interesting part of the work,
presented as if it were the only part.

**Faria Gallery** is the single place. Projects, experience, and writing,
all at one address, in one format.

## Why a museum label

The design decision came from a practical problem: **my projects have no image
worth hanging on a wall.**

A circuit built in Logisim, a quiz in Java, a practice test that runs in the
browser. Screenshots of those look ugly and generic, and that is exactly what
every student portfolio does: a grid of screen captures nobody looks at.

So the site inverts it. **There is no image here at all.** What hangs on the
wall is the label, the way a museum does it:

```
Medium      Angular 19, Node.js, Express
Role        Full-stack, in a pair
Credit      Capstone project II, Senac Santo Amaro
Status      Public source
```

The **medium** field is the joke that holds the whole idea up. On a museum
label, "medium" says what the work is made of: oil on canvas, bronze, single
channel video. Here it says "Angular 19, Node.js, Express". **It is the same
information**, so it is typeset the same way, with no icons, no coloured badges,
no decoration.

The red dot next to the year is borrowed from the gallery too: there it marks a
sold work, here it marks what you can go and see right now. It is the only
colour on the entire site.

## What is here

**Collection** holds the finished projects, with a beginning and an end, newest
first and filterable by technology.

**Experience** is what keeps running: the [Até Zerar](/en/blog/ate-zerar)
channel, six years old with 5.7 million views, and
[BluckerTV](/en/blog/bluckertv), the video platform I opened as a company and
shut down five months later.

**Blog** is where the long writing lives. Case studies, post-mortems, lessons.
When a piece is about a project, that project's label points here.

## The part almost nobody publishes

The most important text on this site is about a project that **did not work**.

BluckerTV ran, was compliant, had a registered trademark and an app in the
store. It also had exactly one paying subscriber and arithmetic that never
added up. I could have left it out and nobody would have known.

I kept it because what I learned building and dismantling that thing is worth
more than any coursework project that went fine. And because a portfolio where
everything works is not a portfolio, it is advertising.

## How the site is built

Static, in Astro, hosted on Cloudflare. No back end, no database, no forms, no
login. The page loads no framework JavaScript at all, and what does exist is a
few bytes for the theme toggle and the filters.

It sets no cookies and tracks nobody, so there is no consent banner at the
bottom either. It exists in Portuguese, English, and Spanish.

The source is open under the MIT licence,
[on GitHub](https://github.com/lipfelipef/FariaGallery). The writing and the
photos are not: the structure is yours to use, the content is mine.
