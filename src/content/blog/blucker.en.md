---
titulo: 'Blucker: fake money, real defences'
resumo: A university e-commerce project where almost all the work went into things nobody sees on screen. Why treating a fake cart as if the money were real is the training that counts.
data: 2026-08-08T01:25:00-03:00
idioma: en
obra: blucker
endereco: blucker
ordem: 7
assuntos:
  - Angular
  - Node.js
  - Security
---

Blucker is a digital game store: catalogue, cart, checkout, orders, tracking,
reviews, and an admin panel. Angular 19 at the front, its own Node and Express
API behind it, with 36 endpoints. It was the capstone project for the second
semester of the Systems Analysis and Development course at Senac, built in a
pair with José Victor Souza, advised by Prof. Evandro Carlos Teruel.

One clarification the collection needs before going on: **Blucker is not
BluckerTV**. This one is the university project. [BluckerTV](/en/blog/bluckertv)
was a video platform, with a registered company and trademark, and it has its
own post-mortem in another text. The shared name is personal taste, nothing more.

## The hard part is not the part you see

An e-commerce site looks like CRUD with a shopping cart. The screen is
misleading: the product list, the add button, the total adding up. All of that
comes out quickly.

The time went somewhere else, and that somewhere is what is worth writing about.
Four server-side decisions, none of them visible to the user, all of them the
difference between an exercise and a system.

**The server does not believe the price the client sends.** Checkout receives the
cart, throws away the values that came with it, and recalculates everything from
the database, including the 5% PIX discount. It looks like paranoia in a school
assignment, where nobody is going to tamper with anything. It is the right habit:
the client is hostile territory, and any number it sends is a suggestion, not a
fact.

**Clicking "place order" twice does not create two orders.** Every attempt
carries an idempotency key; the same key within 60 seconds returns the order that
already exists instead of creating another. That bug is a classic, it shows up in
real shops, and the fix is not disabling the button on the front end. It is the
server recognising that this is the same intent arriving twice.

**Every write is atomic.** Write to a temporary file, then rename, and run all of
it through a promise queue so two simultaneous requests do not trample each other.
Rename is an atomic filesystem operation: either the new file is fully in place,
or the old one still is. Never half of both.

**Login takes the same time for an account that exists and one that does not.**
When the email is not registered, the server computes the hash anyway, against a
throwaway value, purely to spend the same time. Without that, you can discover
which emails have accounts in the shop just by timing the responses: the right
one is slow, the wrong one returns instantly. The comparison also runs in
constant time, with `timingSafeEqual`.

## The limitation that became the lesson

Here is the part I most like to tell, because it is the opposite of what you
expect from a university project.

**Blucker's persistence layer is a JSON file.** No PostgreSQL, no MySQL, no ORM.
It is a `db.json` that the server reads and rewrites.

It is a real limitation, and in a production system it would be the first thing
to replace. Except that it is precisely what forced the atomic write to be built
by hand. A real database solves concurrency, partial writes, and corruption for
you, and you never need to understand the problem. With a JSON file, you do. You
find out the hard way that two simultaneous writes wreck the file, and you end up
learning what a transaction is because its absence showed up in front of you.

The poor tool taught the concept that the good tool hides.

## What was wrong when it was handed in

The project was submitted, graded, and approved. Months later, while preparing
the repository to go public, I reviewed everything carefully and found two things
that could not reach GitHub in that state.

**Passwords were stored in plain text.** In the delivered database, the password
field held exactly what the user typed, readable by anyone who opened the file.
No salt, no hash, nothing. Today every user has their own salt and the password
goes through `scrypt`, using only Node's `crypto` module, with no third-party
dependency.

**The development database went along with it.** Shipped next to the code was the
actual `db.json` from when we were testing, with our own real accounts inside,
including a personal email of mine. Today `db.json` is not versioned: the
repository ships a `db.seed.json` with a catalogue and fictional accounts, and
the server builds the database from it on first run.

Writing this is embarrassing in the right measure. Both failures are textbook,
and neither showed up while the system was running during the presentation. They
showed up when someone opened the repository, which is precisely what a recruiter
does.

## The rest, in numbers

Thirty-six REST endpoints. All routes lazy-loaded, which keeps the first load at
96 kB. Sixty-five end-to-end tests passing. Custom rate limiting on the login,
write, and upload routes. Authorisation checked per resource, not just per
session: lists, reviews, and orders verify ownership, because being logged in is
not the same as having a right to that record.

On the shop side, what you would expect from one: search, filters, sales, reviews
with helpfulness votes, wishlists, multiple addresses, CPF validation by check
digit, address lookup by postcode, and simulated tracking with carriers and
delivery stages.

## Why it stays in the collection

Because the distance between "works in the presentation" and "survives being
public" is what this site is about, and Blucker shows both ends of that distance
inside one project.

What the professor graded was the shop working. What I actually trained was
distrusting the client, not losing data mid-write, and not letting response time
give away a secret. None of that has a screen.
