---
title: "What Defensive Coordination Actually Looks Like in 2026"
description: "A year after Poison Fountain launched anonymously, no AI lab has acknowledged it, no publisher has named it, and no one has measured it. Compared against Anubis, AIPREF, and Cloudflare Pay Per Crawl, the contrast shows what real defensive coordination requires."
publishDate: 2026-06-03
keywords: [Poison Fountain one year, defensive AI coordination, Anubis Anubis defense, AIPREF IETF, Cloudflare Pay Per Crawl, AI training data defense]
author: Semiautonomous Systems
---

## Key Takeaways

- Poison Fountain launched anonymously in January 2026 promising coordinated training-data poisoning. About five months later: no named operators, no named publisher adopters, no AI lab acknowledgment, no independent measurement. Two volunteer integrations (an Apache gist and a Discourse plugin) are the entire visible adoption surface<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- The framing on poisonfountain.org is explicit: "we want to inflict damage on machine intelligence systems." That is offense, not defensive coordination. The contrast with the three projects below is the point of this post
- **Anubis** has a named maintainer (Xe Iaso), an MIT-licensed repo, deployments at GNOME, Duke Libraries, FFmpeg, kernel.org, Slackware, and measurable infrastructure relief. We covered this in detail at [Anubis at One Year](/blog/anubis-at-one-year/)
- **AIPREF** has an IETF working group, named chairs (Mark Nottingham, Suresh Krishnan), public drafts, and a regulatory hook through EU AI Act Article 53(1)(c). Toronto interim closed the AI training scope; vocab-06 is the live document
- **Cloudflare Pay Per Crawl** has named publisher adopters (Stack Overflow), a contractual model, a verified-bot framework, and integration with the existing CDN compliance stack
- Defensive coordination requires four things: identifiable governance, measurable impact, legal clarity, and named adopters. The projects that have these four ship infrastructure. The projects that don't, don't

---

## What Poison Fountain Has Produced So Far in 2026

The Register broke the story on January 11, 2026, citing five anonymous "industry insiders" and a promise of PGP-signed proof of multiple identities. The public site went live the same day. The framing was direct: machine intelligence is a threat; the project intends to "inflict damage" on it<sup><a href="#ref-3">3</a></sup>.

About five months later, here is what is verifiable.

**No operator has been identified.** The PGP-signed proof of multiple participants was promised at launch and has not appeared. There is no foundation, no consortium, no published bylaws, no advisory board, no listed legal entity. The site continues to accept donations. Decision-making, if any happens, is opaque<sup><a href="#ref-1">1</a></sup>.

**Adoption is two volunteer integrations.** A Feb 7 2026 Apache configuration gist by jwakely (8 stars at time of writing) and an Apache-2.0-licensed Discourse plugin by elmuerte (5 stars) are the entire public adoption surface. There is no published list of named publishers running Poison Fountain. By comparison, Anubis is run by GNOME, FFmpeg, ScummVM, kernel.org, Duke Libraries, and others; Cloudflare Pay Per Crawl has Stack Overflow on the record<sup><a href="#ref-4">4</a></sup><sup><a href="#ref-5">5</a></sup>.

**Measurable impact: zero.** No independent test, no academic paper, no AI lab statement attributes any specific evaluation regression to Poison Fountain content. OpenAI, Anthropic, Google, and Meta have not commented. Poison Fountain cites Anthropic's October 2025 paper (Carlini et al., arXiv:2510.07192) showing ~250 documents can install a backdoor in models up to 13B parameters. It has not demonstrated comparable effects on production models<sup><a href="#ref-6">6</a></sup>.

**Mainstream coverage was thin.** The Register broke the story; Futurism, SC Media, and Hypertext picked it up. Wired, Ars Technica, MIT Technology Review, Bloomberg, and the Financial Times did not cover it. The story did not become a mainstream "publishers fighting back" narrative.

**No legal action.** As of mid-2026, no lawsuit, no cease-and-desist, no DMCA action. The .onion fallback exists but does not appear to have been needed. The CFAA-symmetric question — whether intentionally serving bad content to non-consenting scrapers creates liability — remains unlitigated.

This is not a story of a defensive coordination effort that took root. It is a story of an anonymous service that shipped, attracted volunteer integrators, and then stalled.

## What Coordination Requires

Three other 2026 efforts in this space did take root, and the contrast is instructive.

**Anubis** has a named maintainer in Xe Iaso, an MIT-licensed repo with public commit history, and a tracked release cadence. Deployments are public and operator-attributed: GNOME's GitLab pod scaling halved (6 → 3), Duke Libraries blocks roughly 90% of unwanted traffic and filters 4M+ requests per day, Slackware's git server logged a 71% solve rate over 4 days. The bypass story is equally concrete: Tavis Ormandy's published cost analysis, Codeberg's documented pressure under coordinated waves of ~50,000 IPs. Named maintainers, named users, measured outcomes, published critiques. We covered the year of operator data at [Anubis at One Year](/blog/anubis-at-one-year/)<sup><a href="#ref-7">7</a></sup>.

**AIPREF** has the IETF process behind it. Mark Nottingham and Suresh Krishnan chair the working group. The drafts (`draft-ietf-aipref-vocab-06`, `draft-ietf-aipref-attach`) are public, version-tracked, and openly debated. The Toronto interim in April 2026 produced working consensus on the AI training scope; AI search wording is in motion; AI input is openly flagged as deferred. The standards process gives AIPREF something Poison Fountain cannot have without an institution: a public record of decisions, public dissent, and a path to formal adoption. EU AI Act Article 53(1)(c) creates regulatory leverage: providers must use "state-of-the-art technologies" to identify rightholder reservations, and AIPREF is the natural HTTP-layer candidate for the Commission's named list. See [AIPREF After Toronto](/blog/aipref-after-toronto/) for the regulatory tie-in<sup><a href="#ref-8">8</a></sup>.

**Cloudflare Pay Per Crawl** is the contractual model. Cloudflare announced AI Crawl Control GA at Agents Week 2026 in April; Pay Per Crawl is in private beta with Stack Overflow as a named adopter (announced February 2026). The framework binds verified-bot identity to a payment relationship, which addresses the question Poison Fountain cannot answer: how does the publisher know which bot is which, and how is non-payment enforced? Cloudflare's network and verified-bot infrastructure carry the trust layer; the publishers carry the pricing decision; AI providers carry the choice to participate or not. Each side is named<sup><a href="#ref-5">5</a></sup>.

The pattern is the same in all three cases. Defensive coordination that ships has four things in common.

![What defensive coordination requires: identifiable governance, measurable impact, legal clarity, named adopters — Anubis, AIPREF, Cloudflare Pay Per Crawl have these; Poison Fountain does not](/images/diagrams/defensive-coordination-checklist.png)

## The Four Things

**Identifiable governance.** Someone has to be in charge in a way that is publicly checkable. Xe Iaso for Anubis. Nottingham and Krishnan for AIPREF. Cloudflare's product team and the publishers under contract. When governance is anonymous, three things follow: maintenance commitments are not enforceable, security-relevant decisions cannot be reviewed, and legal accountability does not attach. These are structural properties of anonymity, not judgments about any operator's intentions.

**Measurable impact.** A defensive system that no one has measured is not a defensive system. It is a hope. Anubis has Slackware's 550K-challenge / 71%-solve numbers, Duke's 4M-requests-per-day filter, GNOME's pod-scaling halving. AIPREF will have, when it ships, the EU AI Office's enforcement record on Article 53(1)(c) compliance with the named list of opt-out protocols. Cloudflare Pay Per Crawl has the per-publisher payment record. Poison Fountain has none of these.

**Legal clarity.** The CFAA-symmetric question — whether deliberately serving bad data to non-consenting scrapers creates liability — is the largest legal uncertainty in the defensive-poisoning posture. *Van Buren* (2021) and *hiQ v. LinkedIn* narrowed CFAA significantly for scraping, but the symmetric direction has no clean precedent. AIPREF's signaling-only architecture is structured around explicitly *not* creating new legal hooks; it leaves that work to copyright and TDM-opt-out frameworks. Cloudflare Pay Per Crawl operates under contract law. Anubis is a challenge, not a deception. Poison Fountain is the only one of the four that creates the unresolved-CFAA exposure, and there is no defense fund, no named operator, and no test case to clarify it.

**Named adopters.** Defense is not credible without operators willing to publicly say they run it. Public adopters create observability for everyone else. They also create the incentive structure that drives investment. Anubis's GNOME, Duke, kernel.org, FFmpeg list is a recruiting tool. AIPREF's working-group participants are. Cloudflare Pay Per Crawl's published publisher list is. A defensive system run only by anonymous operators publishes none of those signals; it provides a service rather than building a coalition.

## Why This Matters

The deeper point is that defensive coordination is harder than building a service. It requires institutional commitment, public accountability, and willingness to be named. Tools that meet those bars create the infrastructure publishers can plan against. Tools that don't, can't.

This is consistent with what we have argued elsewhere in our coverage. [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/) showed why proof-of-work-class defenses can't carry the load alone. [How Much Does It Cost to Scrape the Web at Scale?](/blog/scraping-economics-2026/) showed the unit economics that make the gap structural. [AI Crawler Compliance, Mid-2026](/blog/h1-2026-compliance/) showed that pure blocking trades 23.1% of publisher traffic for weakly correlated reductions in AI citation. The honest defensive playbook in 2026 is layered, named, measurable, and legally clean. Anubis, AIPREF, and Cloudflare Pay Per Crawl each contribute one slice of that playbook.

A defensive ecosystem that depended on anonymous services would not be defensive infrastructure. It would be a slow-motion attribution problem. The record so far shows the publishers and operators who actually built the layered defense did the slower, harder work: they put their names on it, they measured it, they kept it within legal lines, and they recruited adopters who were willing to be named too.

That is what defensive coordination looks like when it works.

---

*Last updated: June 2026*

## References

<ol class="references">
<li id="ref-1">Poison Fountain. <a href="https://www.poisonfountain.org/">https://www.poisonfountain.org/</a></li>
<li id="ref-2">elmuerte. "discourse-poison-fountain" (Apache-2.0). <a href="https://github.com/elmuerte/discourse-poison-fountain">https://github.com/elmuerte/discourse-poison-fountain</a></li>
<li id="ref-3">The Register (Jan 11 2026). "AI Insiders Seek to Poison the Data That Feeds Them." <a href="https://www.theregister.com/2026/01/11/industry_insiders_seek_to_poison/">https://www.theregister.com/2026/01/11/industry_insiders_seek_to_poison/</a></li>
<li id="ref-4">jwakely. "Apache configuration for Poison Fountain" (gist, Feb 7 2026). <a href="https://gist.github.com/jwakely/a511a5cab5eb36d088ecd1659fcee1d5">https://gist.github.com/jwakely/a511a5cab5eb36d088ecd1659fcee1d5</a></li>
<li id="ref-5">Stack Overflow + Cloudflare (Feb 2026). "Pay Per Crawl Adoption." <a href="https://stackoverflow.blog/2026/02/19/stack-overflow-cloudflare-pay-per-crawl/">https://stackoverflow.blog/2026/02/19/stack-overflow-cloudflare-pay-per-crawl/</a></li>
<li id="ref-6">Carlini, N. et al. (Oct 2025). "Poisoning Attacks on LLMs Require a Near-Constant Number of Poison Samples." arXiv:2510.07192. <a href="https://arxiv.org/pdf/2510.07192">https://arxiv.org/pdf/2510.07192</a></li>
<li id="ref-7">TecharoHQ. Anubis project. <a href="https://github.com/TecharoHQ/anubis">https://github.com/TecharoHQ/anubis</a></li>
<li id="ref-8">IETF AIPREF Working Group. <a href="https://datatracker.ietf.org/wg/aipref/about/">https://datatracker.ietf.org/wg/aipref/about/</a></li>
<li id="ref-9">Hacker News launch thread on Poison Fountain (Jan 2026). <a href="https://news.ycombinator.com/item?id=46577464">https://news.ycombinator.com/item?id=46577464</a></li>
<li id="ref-10">Hypertext (Jan 2026). "The Poison Fountain Wants to Infect the Web and Destroy AI." <a href="https://htxt.co.za/2026/01/the-poison-fountain-wants-to-infect-the-web-and-destroy-ai/">https://htxt.co.za/2026/01/the-poison-fountain-wants-to-infect-the-web-and-destroy-ai/</a></li>
</ol>
