---
title: "Who Pays the Proof-of-Work Tax: The Accessibility Cost of Anti-Scraping Walls"
description: "Proof-of-work anti-scraping like Anubis is not a flat fee. It is a regressive tax: at difficulty 5, about 2 seconds on a flagship laptop, up to 2 minutes on an old phone, and a hard wall for non-JS and screen-reader users, while AI scrapers pay near zero."
publishDate: 2026-11-10
keywords: [proof-of-work accessibility, proof-of-work anti-scraping accessibility, Anubis accessibility, proof-of-work mobile battery, proof-of-work screen reader, JavaScript-required anti-bot, regressive proof-of-work, who pays proof-of-work]
author: Semiautonomous Systems
---

## Key Takeaways

- Proof-of-work anti-scraping is not a flat fee. At difficulty 5, the same Anubis wall costs a modern laptop about 2 seconds and an old phone up to about 2 minutes. The cost falls hardest on the least capable hardware<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- The challenge does not just slow some users; by default it excludes others. Clients without JavaScript (RSS readers, curl, text browsers) are blocked, screen readers can be confused, and anti-fingerprinting extensions such as JShelter conflict with it<sup><a href="#ref-2">2</a></sup>
- The asymmetry runs the wrong way. A well-resourced AI vendor can clear every Anubis-protected site for a few cents of cloud compute, while "soul-owning humans with limited access to compute" pay the high end of the cost<sup><a href="#ref-3">3</a></sup>
- The user revolts are documented and named: a user-reported 30-minute Firefox stall on GNOME GitLab at the same difficulty Chrome cleared in seconds (a browser-engine pathology, not a representative solve time), a FreeBSD wiki backlash, and blocked access to kernel.org<sup><a href="#ref-4">4</a></sup><sup><a href="#ref-5">5</a></sup>
- Operators have real reasons to reach for it. One crawler pulled 73 TB from Read the Docs in a month, and Drew DeVault spent 20 to 100 percent of some weeks fighting crawlers. The question is not whether to defend, but who absorbs the bill<sup><a href="#ref-9">9</a></sup><sup><a href="#ref-10">10</a></sup>
- Lower-tax designs exist: memory-hard challenges, text-mode paths, and a proposed HTTP proof-of-work header. Each carries its own trade-off, and one carries a standardization paradox<sup><a href="#ref-7">7</a></sup><sup><a href="#ref-2">2</a></sup>

## The same wall, 2 seconds or 2 minutes

Proof-of-work anti-scraping is usually sold as a fair trade: humans pass for free, bots pay a tax that adds up at scale. The arithmetic is more honest if you ask which humans, and which bots.

In our analysis, proof-of-work sits in the enforcement column, not the signaling one. Voluntary signals such as robots.txt and the emerging AIPREF preference vocabulary tell a crawler what it may do; they fail when the crawler's incentives say otherwise. Proof-of-work instead imposes a cost on every request, which is why it works where signals do not, and why the question that matters is the one we keep returning to in our cost-imposition versus value-degradation work: who actually pays that cost. This post measures proof-of-work from both ends of the connection.

Anubis is the most widely deployed example. It asks the visitor's browser to find a hash with a required number of leading zero hex digits (nibbles) before serving the page. At the default difficulty 4, a current laptop solves the challenge in roughly 1.35 seconds. Mike Bommarito measured about 1.35 seconds on an Intel Core Ultra 7 165H running headless Chromium, at a hash rate near 87,600 hashes per second<sup><a href="#ref-1">1</a></sup>.

That number describes the fast end of the distribution. The slow end is where the argument lives. At difficulty 5, reported solve times spread across roughly two orders of magnitude: a modern MacBook around 2 seconds, an older notebook tens of seconds, and a mobile phone up to about 2 minutes<sup><a href="#ref-2">2</a></sup>. These are reported times consolidated from device benchmarks rather than one controlled table, so treat them as a range. The shape of the range is the point. The same wall, at the same setting, taxes one visitor 2 seconds and another 2 minutes.

That spread is not random. The slow devices belong to people on older phones, budget hardware, and metered connections, populations that correlate with lower income and with the Global South. The traffic the wall is built to stop does not. One consolidated analysis reports that the large majority of AI crawler traffic, on the order of 90 percent, originates from North American infrastructure<sup><a href="#ref-2">2</a></sup>. We have not traced that figure to the underlying measurement, so treat it as an estimate rather than a settled number; the direction of the imbalance, not the exact percentage, is what carries the argument. The people most taxed are not the people the tax is aimed at.

![Stat card contrasting a 2-second proof-of-work solve time on a flagship laptop against a 2-minute solve time on an old phone at the same Anubis difficulty level 5.](/images/diagrams/pow-device-disparity.png)

The curve is also steep, though theory and measurement diverge and it is worth keeping them apart. In theory, each added difficulty level requires the client to find one more leading zero hex digit, which means searching a hash space 16 times larger (one hexadecimal nibble). So the expected work per added level is 16x, not the often-repeated 10x. The measured wall-clock solve times scale more slowly than that, because fixed browser and JavaScript overhead and per-device variance dominate at low difficulty: the Bommarito benchmark reports difficulty 1 under 100 milliseconds, difficulty 4 around 1.35 seconds, difficulty 8 around 11 seconds, and difficulty 10 around 114 seconds on capable hardware<sup><a href="#ref-1">1</a></sup>. That is roughly 84x from difficulty 4 to difficulty 10 over six levels, closer to an order of magnitude per level near the high end than to a clean 16x per level. Either way the practical lesson holds: a small difficulty bump, chosen by an operator to fend off a crawler surge, multiplies the wait for every visitor and multiplies it most painfully for the one whose device is already slow.

A hardware twist bends the curve further against humans. Anubis uses plain SHA-256, which runs efficiently on GPUs. A scraper operator using GPUs is reported to gain a throughput advantage of 100x or more over a commodity browser hashing in JavaScript<sup><a href="#ref-2">2</a></sup>; we cite that figure as reported rather than independently benchmarked, though the direction is uncontroversial given SHA-256's known GPU friendliness. The function meant to be expensive for the adversary is, by construction, cheaper for the adversary who can afford specialized hardware than for the human stuck in a browser tab.

## Beyond slow: excluded

Time cost is the visible half. The hard exclusions rarely show up in operator dashboards, because excluded clients never appear as satisfied page loads.

By default, Anubis requires JavaScript. Clients that do not run it are not slowed; they are blocked. That set includes RSS and feed readers, command-line tools such as curl and wget, and text-mode browsers such as Lynx<sup><a href="#ref-2">2</a></sup>. This is default behavior, not an absolute. Anubis added a meta-refresh, non-JavaScript challenge path in v1.20.0, and the go-away project supports text-mode browsers explicitly<sup><a href="#ref-2">2</a></sup><sup><a href="#ref-6">6</a></sup>. But the default still draws the line at JavaScript, and defaults are what most deployments ship.

Screen readers hit a second wall. The challenge page, originally anime-styled, was not designed with accessibility in mind and can confuse assistive technology<sup><a href="#ref-2">2</a></sup>. A sighted user sees an animation and a spinner; a screen-reader user can be left without a clear path forward.

The third exclusion is the sharpest, because it pits one defensive value against another. Anubis can require users to disable anti-fingerprinting extensions such as JShelter, and it can redirect after solving without letting the user re-enable that protection<sup><a href="#ref-2">2</a></sup>. A defense premised on JavaScript execution and on signals that resemble fingerprinting is in direct tension with the privacy tooling that protects the cautious users least able to absorb risk. There is a battery and thermal cost too: a phone grinding for two minutes at difficulty 5 drains power and heats up, a charge a desktop user never notices<sup><a href="#ref-2">2</a></sup>.

## The receipts

These are not hypothetical edge cases. They have names and dates.

On GNOME's GitLab, users reported Firefox stuck calculating a challenge for 30 minutes at difficulty 4, while Chrome cleared the same difficulty in seconds. Some users were blocked entirely<sup><a href="#ref-4">4</a></sup>. This is a user-reported outlier, and the magnitude is the giveaway: 30 minutes is three orders of magnitude beyond this draft's own slow-end estimate for ordinary devices, so it reflects a Firefox calculation pathology, an engine-dependent hang, not a representative point on the difficulty cost curve. What it cleanly illustrates is brittleness: identical difficulty, one engine clearing in seconds and another stalling for half an hour, a failure the visitor did not choose and cannot diagnose.

On the FreeBSD forums, a thread titled "What bizarre idiocy has lead to Anubus gatekeeping access to the Wiki?" [sic] captured a community's frustration at finding documentation gated behind proof-of-work<sup><a href="#ref-5">5</a></sup>. Anubis also blocked access to git.kernel.org and lore.kernel.org, reaching the kernel developers who depend on those archives<sup><a href="#ref-2">2</a></sup>.

Then there is the bitter coda. On Codeberg, the bots that proof-of-work targeted eventually learned to solve the challenges, renewing the slowdowns the wall was meant to end<sup><a href="#ref-8">8</a></sup>. Humans paid the tax in the meantime; the scrapers adapted around it.

## Humans pay high, bots pay near zero

Strip the incidents down and one fact remains: the cost lands on the wrong party. Tavis Ormandy put numbers to it. A soulless AI vendor faces a cost near zero to bypass every Anubis site, because solving SHA-256 challenges in bulk on rented hardware is cheap, while "real soul-owning humans with limited access to compute" pay the high end of the per-visit cost<sup><a href="#ref-3">3</a></sup>. Pair that with the GPU asymmetry and the device variance, and the tax is not a flat toll bots happen to find expensive. It is a cost transfer from the server operator to the lowest-capacity visitor, while the best-resourced adversary is the least burdened.

That is the cost-externalization framing, and it cuts in two directions. Critics of proof-of-work describe it bluntly: visitors pay the cost in battery life, power bills, device lag, and heat, and servers pocket the gain in lower maintenance cost<sup><a href="#ref-2">2</a></sup>. The phrasing deliberately echoes the operators' own complaint, that crawlers externalize costs onto them. Proof-of-work answers one externality by creating another, pointed at a different and less powerful group.

## Why operators still reach for it

None of this means operators are wrong to defend themselves. The pressure that drives them to reach for proof-of-work walls is real and measurable, and an honest account has to weigh it.

![Stat card showing one AI crawler pulled 73 terabytes from Read the Docs in a single month, and that blocking AI crawlers cut daily bandwidth from 800 gigabytes to 200 gigabytes, about a 75 percent reduction.](/images/diagrams/pow-bandwidth.png)

Read the Docs reported that blocking AI crawlers cut daily bandwidth from 800 GB to 200 GB, a 75 percent reduction worth about 1,500 dollars a month. One crawler pulled 73 TB in a single month<sup><a href="#ref-9">9</a></sup>. Drew DeVault wrote that he spent 20 to 100 percent of his time in some weeks on crawler mitigation, with dozens of brief outages per week<sup><a href="#ref-10">10</a></sup>. Duke University Libraries reported blocking around 90 percent of unwanted traffic and filtering more than 4 million requests per day, with what the library called negligible impact on legitimate users<sup><a href="#ref-11">11</a></sup>.

That last claim is the one this post is built to test. Negligible impact is an aggregate seen from the server. It counts the visitors who got through, not the screen-reader user who gave up, the curl script that 403'd, or the overheated phone whose tab was closed. The operator's relief is real. So is the tax. They are measured from different ends of the same connection, which is why operator dashboards and user revolts can both be telling the truth.

## Lowering the tax

If the cost is regressive, the constructive question is whether it can be made less so without surrendering the defense. Several paths exist, each with a trade-off.

Memory-hard challenges narrow the hardware gap. ALTCHA uses Argon2 or Scrypt, which are memory-bound rather than compute-bound like plain SHA-256<sup><a href="#ref-7">7</a></sup>. Memory-bound functions resist the GPU and ASIC speedups that let a well-funded scraper outpace a browser by 100x, so the gap between a commodity client and optimized attacker hardware shrinks. The trade-off is that memory-hard work can be heavier on the constrained mobile devices the regressive curve already punishes, so it must be tuned, not assumed.

Text-mode and non-JavaScript paths address the hard exclusions directly. The Anubis meta-refresh challenge and go-away's text-mode support let minimal clients comply<sup><a href="#ref-2">2</a></sup><sup><a href="#ref-6">6</a></sup>. The project's trajectory is not uniformly in that direction. Proof of React, added in v1.22.0, demands more browser capability rather than less, which worsens the exclusion problem for minimal clients even as it raises the bar for cheap bots<sup><a href="#ref-2">2</a></sup>.

The most ambitious idea is to standardize a `WWW-Authenticate: Proof-Of-Work` HTTP header, so a non-browser client such as curl could solve a challenge and comply without executing a page of JavaScript<sup><a href="#ref-2">2</a></sup>. That would dissolve exclusion at the protocol layer. It also surfaces a standardization paradox the proposal's author names directly: proof-of-work defenses work in part because attackers have not bothered to adapt their tooling to them. Standardize the scheme, ship a solver in every HTTP library, and the asymmetry that made it effective evaporates for everyone, including the scrapers.

## The implication

Proof-of-work is not free for humans and expensive for bots. It is a power transfer, from server operators who need relief to the lowest-capacity visitors who can least afford to pay, while the best-resourced scraper is the least taxed. That is not an argument to abandon the defense. It is an argument to measure it from both ends of the connection before calling its impact negligible.

This is the evidence-based nuance to the claim, made in our [cost imposition versus value degradation analysis](/blog/cost-imposition-vs-value-degradation/), that proof-of-work friction is trivial for human users. It is trivial for some humans. For the user on an old phone, the screen-reader user, the curl script, and the privacy-extension user, it is not. (That companion post draws the same Bommarito benchmark; measured from Anubis's lowest difficulty the multiple runs into the hundreds, while the roughly 84x cited here is measured from the difficulty-4 default to difficulty 10. Same data, different baseline, which is exactly why this post states the cost as a measured range tied to a named device and difficulty rather than one headline multiplier.) For the server-side picture of how operators actually fare a year into deployment, see [Anubis at one year](/blog/anubis-at-one-year/).

The open question is not whether operators should defend against industrial crawling. They clearly must. It is whether the next generation of challenges can be designed so the bill lands on the adversary it was written for, not on the visitor with the slowest device in the room. The benchmarks to answer that exist. Measuring an enforcement mechanism from both ends of the connection, and reporting impact by device class and assistive-technology path rather than aggregate block rate alone, is the standard we hold these defenses to. That is the test to apply before deploying proof-of-work, and the discipline that separates a defense that earns its place from one that quietly shifts its bill onto the least-resourced visitor.

<ol class="references">
<li id="ref-1">Bommarito, M. (2025). "Anubis Benchmark Analysis." <a href="https://michaelbommarito.com/wiki/ai-society/anubis-benchmark-analysis/">https://michaelbommarito.com/wiki/ai-society/anubis-benchmark-analysis/</a></li>
<li id="ref-2">ce9e.org (2025-05-24). "Should proof-of-work be standardized for HTTP?" and consolidated device-variance and accessibility analysis. <a href="https://blog.ce9e.org/posts/2025-05-24-anubis/">https://blog.ce9e.org/posts/2025-05-24-anubis/</a></li>
<li id="ref-3">Ormandy, T. (2025). "Anubis PoW Cost Analysis." <a href="https://lock.cmpxchg8b.com/anubis.html">https://lock.cmpxchg8b.com/anubis.html</a></li>
<li id="ref-4">GNOME Discourse (2025). "Difficulty accessing GitLab through proof-of-work Anubis." <a href="https://discourse.gnome.org/t/difficulty-accessing-gitlab-through-proof-of-work-anubis/27924">https://discourse.gnome.org/t/difficulty-accessing-gitlab-through-proof-of-work-anubis/27924</a></li>
<li id="ref-5">FreeBSD Forums (2025). "What bizarre idiocy has lead to Anubus gatekeeping access to the Wiki?" <a href="https://forums.freebsd.org/threads/what-bizarre-idiocy-has-lead-to-anubus-gatekeeping-access-to-the-wiki.99957/">https://forums.freebsd.org/threads/what-bizarre-idiocy-has-lead-to-anubus-gatekeeping-access-to-the-wiki.99957/</a></li>
<li id="ref-6">SourceHut (2025-05-29). "What's cooking Q2 2025." Describes the switch from Anubis to go-away and its text-mode support. <a href="https://sourcehut.org/blog/2025-05-29-whats-cooking-q2/">https://sourcehut.org/blog/2025-05-29-whats-cooking-q2/</a></li>
<li id="ref-7">ALTCHA. Project site (Argon2/Scrypt memory-hard proof-of-work). <a href="https://altcha.org/">https://altcha.org/</a></li>
<li id="ref-8">The Register (2025-08-15). "Codeberg beset by AI bots." <a href="https://www.theregister.com/2025/08/15/codeberg_beset_by_ai_bots/">https://www.theregister.com/2025/08/15/codeberg_beset_by_ai_bots/</a></li>
<li id="ref-9">Read the Docs (2024-07). "AI crawlers abuse." <a href="https://about.readthedocs.com/blog/2024/07/ai-crawlers-abuse/">https://about.readthedocs.com/blog/2024/07/ai-crawlers-abuse/</a></li>
<li id="ref-10">DeVault, D. (2025-03-17). "Stop externalizing your costs on me." <a href="https://drewdevault.com/2025/03/17/2025-03-17-Stop-externalizing-your-costs-on-me.html">https://drewdevault.com/2025/03/17/2025-03-17-Stop-externalizing-your-costs-on-me.html</a></li>
<li id="ref-11">Duke University Libraries (2025-06). "Anubis Pilot Project Report." <a href="https://dukespace.lib.duke.edu/items/a99a4736-6542-4ef1-8492-41c80e58e1be">https://dukespace.lib.duke.edu/items/a99a4736-6542-4ef1-8492-41c80e58e1be</a></li>
</ol>
