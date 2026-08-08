---
titulo: 'One day, ten dollars, and no server'
resumo: BluckerTV cost R$ 8,100 over five months. This site costs US$ 10.46 a year and was built in a day. The difference is not thrift, it is fit.
data: 2026-08-08T19:30:00-03:00
idioma: en
obra: fariagallery
endereco: um-dia-e-dez-dolares
ordem: 9
assuntos:
  - Astro
  - Cloudflare
  - Faria Gallery
---

On 6 August 2026 BluckerTV was shut down. Company closed, cards removed from
every supplier, auto-renewal switched off everywhere. The decision that day was
explicit: no new venture for several years, focus on finishing university and
getting a full-time job.

Four hours later I was already discussing three SaaS ideas to make money
quickly, one of them a site riding the GTA 6 hype.

The next day I dropped all of them in favour of this site, and why I swapped is
what this piece is about. The SaaS ideas all depended on guessing market demand
right, which is exactly the thing five months of BluckerTV had just shown to be
hard. A portfolio depends on no demand at all, because the content already
existed: it was the projects I had already built.

## The problem was sending three links

When someone asked to see my work, I sent three addresses. GitHub for the code,
LinkedIn for the history, the channel for the rest. Three formats, three
contexts, and none of the three telling the whole story.

GitHub in particular has a flaw nobody mentions: **it shows files, not
decisions.** Open a repository and you get a folder with thirty files and no
hint of what was hard, what nearly went wrong, or why the thing ended up that
way. It is the least interesting part of the work, presented as if it were the
only part.

## What did not make it, and why

The useful part of a stack decision is not what stayed. It is what was ruled
out.

**Angular went first, and it was the obvious candidate.** It is what I learned
in my second semester and what I would reuse with the least effort. It did not
make it because it is a tool for state-heavy applications, and this is a content
site. Using it would have forced me to set up server rendering purely to avoid
breaking SEO, would have shipped a heavy bundle for no reason, and would have
made maintenance harder for years.

**Next.js would have been the choice with the most market value**, and it was
ruled out on learning cost: it would have meant learning React first, delaying
the site by months. And the search engine clock only starts once the site
exists.

For the record, honestly: **Astro is worth almost nothing as a CV keyword.** No
one posts a job for an "Astro developer". This was a choice about fit for the
task, not about employability, and it is worth knowing the difference between
those two when deciding.

**Tailwind came back after being ruled out.** The argument against it was "one
more thing to learn", and that argument was weak: anyone who already knows CSS
picks up Tailwind in a weekend. It came in for three practical reasons, none of
them fashion: a ready scale for spacing and type, which gives visual consistency
to someone who is not a designer; styles living in the markup, which is what
saves maintenance after months away from the project; and the ecosystem, since
nearly every Astro theme and example already uses it.

## No server, and that is an architectural decision

The site is published on Cloudflare Workers rather than Pages, which was the old
recommendation. Since March 2026 Workers has feature parity for static sites,
and the official guidance for a new project is to start there.

Here is the detail that changes the maths: **a request for a static file does
not consume quota.** The free plan's hundred thousand requests a day apply to
requests that execute code, and this site executes none. It is a pile of
ready-made HTML.

And there is a gain that only shows up years from now: if this ever needs an API
or a database, I can add one without changing platform.

## The newsletter that died before it was born

A newsletter was in the original plan. It was cut for legal reasons, not out of
laziness.

A newsletter means collecting email addresses, and an email address is personal
data. That brings back a privacy policy, explicit consent on the form, and an
unsubscribe link in every message, which is exactly the package that had eaten
months of BluckerTV. RSS took its place: anyone who wants to follow along
subscribes in a reader, and the address never passes through here.

The real cost of that decision was zero, because there was no audience for a
newsletter anyway.

The parallel with the platform that just closed is worth drawing. There, doing
everything through plugins instead of touching the PeerTube core was an
architectural decision made because of the AGPL licence. Here, having no form at
all was an architectural decision made because of Brazil's data protection law.
It is the same pattern in both: **a legal constraint drawing the technical
solution**, and in both cases the result came out simpler than it would have
been otherwise.

There are no terms of use either, and that is deliberate: nobody accepts
anything here, there is no account and no service being provided.

## What it does not have, on purpose

No back end. No database. No forms. No login. No admin panel. No cookies.

The consequence is a short, good list: free hosting, an almost non-existent
attack surface, nothing to patch for security, and a site that stays up even if
nobody touches it for six months.

## The numbers

| | BluckerTV | This site |
| --- | --- | --- |
| Time to go live | 5 months | 1 day |
| Cost | R$ 8,100 | US$ 10.46 a year |
| Hosting | VPS, CDN, and object storage | R$ 0 |
| Servers to maintain | 1 | none |
| Databases | 2 | none |
| Result | 1 paying subscriber | 40 pages in 3 languages |

The comparison is unfair on purpose, and that is where the lesson is. These are
not the same kind of project, and they should not cost the same. A video
platform genuinely needs servers, transcoding, and databases. A portfolio needs
none of that, and spending on it would have been a mistake, not diligence.

**The gap between those two numbers is not thrift. It is asking what the problem
is made of before picking the tool.** BluckerTV was expensive because it was an
expensive problem; this site is cheap because its problem is cheap. The mistake
available here would be the opposite one: standing up a server, a database, and
an admin panel to publish text that does not change.

## What came for free

Writing the label for each project forced me to reopen old repositories, and
reopening code with two more years of experience shows things that were
invisible while the system was running.

I found passwords stored in plain text, a config key committed, a database
versioned with real people's accounts inside. None of those problems gave any
sign while the system worked. All of them showed up on opening the repository,
which is exactly what a recruiter does.

The portfolio existed to show the projects off and ended up auditing them
instead. That is worth a whole piece on its own, and it will be the next one.
