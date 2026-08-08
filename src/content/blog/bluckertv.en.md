---
titulo: 'BluckerTV: five months, a whole platform, one subscriber'
resumo: Post-mortem of a Brazilian video on demand platform built alone and shut down as a business decision, not a technical failure. What the numbers taught, and why stopping early was the right call.
data: 2026-08-07
idioma: en
obra: bluckertv
endereco: bluckertv
assuntos:
  - PeerTube
  - Infrastructure
  - Post-mortem
---

BluckerTV was a Brazilian general purpose video on demand platform. Not a
gameplay site: video infrastructure, built on [PeerTube](https://joinpeertube.org),
with its own interface, its own plugins, its own delivery stack, a registered
trademark, a registered company, and an app published on Google Play.

The idea came from a real loss. Videolog, a Brazilian platform that ran from
2004 to 2015, shut down and took its archive with it. BluckerTV promised the
opposite: **what you publish does not disappear**. That was the differentiator,
and as you will see, it was also the problem.

All of it was built by one person. Development, infrastructure, DevOps,
product, legal, compliance, moderation, and support.

## What ran underneath

PeerTube 8.2.3 pinned to the 8.2.x line, with a patches-only policy. Node 22
LTS, PostgreSQL 16, Redis 7, nginx, FFmpeg, Ubuntu Server 24.04 on a KVM4 VPS.
Delivery over HLS with WebRTC peer to peer, and transcoding kept deliberately
lean: **two rungs only, 360p30 and 1080p60**. No 1440p, no 4K, because every
extra rung multiplies CPU and storage cost without multiplying the audience.

At the edge, Bunny CDN with an origin shield in Chicago and an 88.8% cache hit
rate, backed by Backblaze B2 for object storage. Cloudflare on DNS, orange
cloud at the apex, SSL Full Strict.

The Android app was a TWA wrapped around the PWA. iOS was evaluated and
postponed on purpose, not forgotten.

### Nine in-house plugins, and an architecture decision with a legal job

All in TypeScript, under the `peertube-plugin-blucker-*` namespace. **Nothing
in the PeerTube core was modified**, and that was not just hygiene: PeerTube is
AGPLv3, and touching the core opens the derivative work reading, which would
require opening the plugin source. Doing everything through plugins defused
that risk.

- **`blucker-copyright`** ran the full DMCA and trademark flow: notice,
  counter-notice within 10 business days, and a case dashboard. It started full
  of crons and automation and was later refactored to 100% manual, which
  **deleted more than 1,500 lines of its own code**. It ended with an automatic
  purge that anonymises the data five years after each case closes.
- **`blucker-monetizacao`** capped views per IP per video per day as an
  anti-fraud measure. The IP moved from plain text to a SHA-256 hash: keeps the
  anti-fraud function, stops retaining personal data.
- **`blucker-age-verification`** implemented Brazil's Law 15.211/2025. The
  architecture was chosen carefully: **the national ID never entered signup or
  login**. The gate only fired when opening a sensitive video, once per
  account, stored as a hash.
- **`blucker-blucks`** was the short video feed, with its own ranking
  algorithm.
- **`blucker-ads`** was advertising with no cookies, no metrics, and no
  targeting: a static banner served from the platform's own server, with
  display time bought by rotation.

Plus `blucker-ganhos`, `blucker-voice-search`, `blucker-blust`, and
`blucker-livechat`, the last one discontinued along with live streaming.

## The legal work, written from scratch

This is the least common part of a solo project, and the one that consumed the
most time.

Terms of Use at **29,998 characters** across 10 sections, compressed down from
roughly 83,000 in the first draft, with every legal citation audited against
an official source. A Privacy Policy of 9,988 characters, mapping the legal
bases and data subject rights of Brazil's data protection law.

The most interesting finding was an error in the text itself: the clause on
liability for third party content still described the old regime of Brazil's
internet framework law. The Supreme Court had declared that provision partly
unconstitutional, with the ruling handed down in June 2026. **The text was
legally out of date before the site even opened**, and was rewritten to follow
the interpretation the Court had fixed.

The trademark was filed in November 2024, class 41, and **granted in June
2026**, unopposed. It is held by a natural person, so it survived the company's
closure.

## The numbers

Public snapshot from July 2026, taken from the platform's own transparency
page:

| Metric | July 2026 |
| --- | --- |
| Users | 72 |
| Videos | 270 |
| Views | 3,361 |
| Hosted | 1.8 TB |
| Paying subscribers | **1** |

The Blucker+ plan cost R$ 6.90 a month and raised the storage quota from 50 GB
to 1 TB. A single subscriber signed up, on 31 May. The final balance in the
payment gateway account, at shutdown, was **R$ 6.18**.

On the other side, total cost landed around **R$ 8,100**: roughly R$ 4,250 in
development tooling, R$ 2,850 in server and domains, about 40 dollars a month
in CDN and storage, plus a registered address and taxes.

How that spending clustered tells its own story: **April alone was 75% of all
tooling spend**, and from April to July it dropped 96%. The build-out peak and
the cooling off show up in the bank statement before they show up anywhere
else.

## Why it ended

It was not a technical failure. The platform was live, working, compliant, and
had a published app. It ended on arithmetic.

**The maths did not work.** With marketing projected at around R$ 1,045 a
month, it would take **145 subscriptions at R$ 6.90 just to break even**. A
single cancellation put the operation in the red.

**And the differentiator was a liability.** "What you publish does not
disappear" plus a generous quota means paying for storage forever, for people
who already cancelled. Even at 200 or 300 subscribers, a wave of cancellations
would leave the operator paying to host the entire archive with no revenue at
all. The promise that sold the product was the same one that sank it long
term. That is why the unlimited quota idea died before it shipped.

**The central question had no answer.** There was never a good answer to "why
would anyone use this instead of YouTube". The original use case, archiving my
own videos, had already been abandoned before that.

**The risk was inverted.** The platform was funded by revenue from the YouTube
channel. So the project that existed as a hedge against demonetisation was
consuming exactly the income it was meant to protect. It amplified the risk
instead of spreading it.

**The build order was wrong.** Infrastructure, compliance, and trademark came
before demand was validated. By the time marketing came up, there were five
months of fixed cost on the board and no market signal at all.

## What stopping early saved

The decision came **before** spending the R$ 500 to R$ 1,000 a month budgeted
for ads. Over a year that would have added R$ 6,000 to R$ 12,000, with the same
outcome. Stopping in August cost far less than stopping in December would have.

The shutdown was executed in full, not abandoned: company formally dissolved
with a certificate, final tax declaration filed, bank account closed, registered
address cancelled in writing, cards removed from every vendor, and auto-renewal
turned off everywhere. The trademark was kept.

Real net loss came to about **R$ 5,500**, after discounting the server still
usable until March 2027 and the share of taxes that went to social security.

## What it left behind

**Production incidents resolved**, which is where the real learning happens:

- A database backup was left publicly reachable through the CDN. Found and
  removed.
- Broken DKIM selectors destroyed email deliverability for the whole domain and
  led to a Spamhaus listing. Fixed by realigning SPF, DKIM, and DMARC, ending at
  9.5 out of 10 on mail-tester.
- An `npm install` fired in the wrong directory almost took the installation
  with it. Recovered from backup, with zero downtime.
- A storage lifecycle rule was left at 1 day after a test and stayed that way
  for over a month. Found and corrected, with the bonus discovery that the
  vendor's web panel silently overwrites a field it does not even display.

**Contributions to PeerTube**, under the handle
[@lipfelipef](https://github.com/lipfelipef): two issues resolved, five opened,
and one pull request. One of them, about the channel statistics window, was
picked up by another contributor with the maintainer's blessing and became a
full feature in the project, with a period selector and weekly and monthly
aggregation.

**A security report** to Framasoft, PeerTube's maintainer: an account
verification flaw in version 8.2.3, medium severity at CVSS 4.3, sent through
the official security channel. The technical details are left out of this text
on purpose, because other instances run the same version.

## The honest summary

Five months, a whole platform in production, nine plugins, a granted trademark,
a company opened and closed properly, a published app, an accepted security
report, and a contribution merged into a serious open source project.

And one subscriber.

Both halves are true at the same time, and that is exactly why this text
exists. The technical half taught infrastructure, video, licensing, and
regulation. The business half taught something harder: **building it well is
not the same as building something anyone wants**, and the time to find that
out is before the first invoice, not after the fifth.
