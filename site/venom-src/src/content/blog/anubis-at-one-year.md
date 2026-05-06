---
title: "Anubis at One Year: What Production Operators Are Actually Reporting"
description: "A year of public Anubis deployments yields concrete operator numbers, a Codeberg cautionary tale, and a project trajectory shift toward layered defenses. What the data says about proof-of-work anti-scraping."
publishDate: 2026-06-23
keywords: [Anubis, proof-of-work anti-scraping, Anubis deployment data, Codeberg AI scraping, AI bot mitigation, TecharoHQ Anubis]
author: Semiautonomous Systems
---

## Key Takeaways

- Three operators with public deployment writeups show consistent infrastructure relief: GNOME halved GitLab pod scaling (6 → 3 instances), Duke Libraries blocks ~90% of unwanted traffic and filters 4M+ requests per day, and Slackware's git server logged ~550K challenges in four days with a ~71% solve rate<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup><sup><a href="#ref-3">3</a></sup>
- Codeberg's experience is the cautionary tale. Anubis blocks roughly 90% of crawler requests, but coordinated waves of ~50,000 unique IPs still get through, prompting Codeberg to stack tarpits (Iocaine, "Nam-Shub of Enki") on top of Anubis rather than rely on proof-of-work alone<sup><a href="#ref-4">4</a></sup>
- Native solvers are cheap. Tavis Ormandy's published analysis still stands: a few cents of cloud compute can clear every Anubis-protected site on the internet. AI scrapers using headless browsers absorb the cost by default<sup><a href="#ref-5">5</a></sup>
- The project itself has pivoted. Versions 1.22 through 1.25 added Proof of React, dataset poisoning honeypots, and weight-scoring rules — explicitly moving Anubis from "PoW only" to a layered challenge stack. Project velocity slowed in early 2026<sup><a href="#ref-6">6</a></sup><sup><a href="#ref-7">7</a></sup>
- The honest answer in 2026: proof-of-work raises attacker costs more than operator costs at small scale. That gap closes when attackers concentrate. The standard defensive posture is now layered.

---

## Why a One-Year Look

Anubis went from a single-author hobby project to deployed infrastructure across GNOME, kernel.org, Duke University Libraries, FFmpeg, ScummVM, OpenWRT, sourceware.org, UNESCO, and dozens of smaller forges over roughly twelve months<sup><a href="#ref-8">8</a></sup>. The deployment surface is large enough now that public outcome data exists. Earlier coverage focused on the architecture: a Hashcash-style proof-of-work challenge gating site access, with a JavaScript solver and a verified cookie<sup><a href="#ref-9">9</a></sup>. This post focuses on what the data says.

The short version: Anubis works on the bots that show up at small scale and breaks down on the bots that show up at coordinated scale. The project's response has been to add layers, not to claim PoW alone is sufficient.

## The Operator Numbers

Three deployment writeups are dense enough to anchor an honest assessment.

**GNOME GitLab.** GNOME's GitLab instance was burning compute scaling up to six pods to handle scraper load. After Anubis was added in front, scaling settled at three pods. Halved infrastructure, public confirmation, explicit attribution to Anubis<sup><a href="#ref-1">1</a></sup>.

**Duke University Libraries.** Duke deployed Anubis to protect the Duke Digital Repository, archives, and catalog after a sustained scraper wave. Their pilot report shows roughly 90% of unwanted traffic blocked and 4M+ HTTP requests per day filtered. One single-day spike shows 1.3M denials from bots forging MSIE/Trident user agents — Internet Explorer headers in 2025, which is its own signal<sup><a href="#ref-2">2</a></sup>.

**Slackware git.** The most precise numbers come from the alien-base team's August 2025 deployment of Anubis in front of cgit. Four days post-deployment: approximately 550,000 challenges issued, 390,000 validated, ~71% solve rate, and 850 GB of bandwidth processed. The 30% gap between issued and validated is the largest single quantitative signal of how many sessions abandon when challenged<sup><a href="#ref-3">3</a></sup>.

These are three operators reporting publicly. They are not an industry average. But they are consistent: Anubis cuts crawler load enough that operators choose to keep running it. The magnitudes (half the pods, 90% of requests filtered, four-fifths of sessions either passing or abandoning) are large enough to matter for infrastructure cost.

![Operator outcomes: GNOME GitLab pods 6 to 3, Duke Libraries 4M+ requests filtered per day, Slackware git 550K challenges 71 percent solve rate over 4 days, Codeberg 90 percent blocked but bypassed by 50K-IP waves](/images/diagrams/anubis-operator-outcomes.png)

## The Codeberg Story

Codeberg's deployment is where the story complicates.

Codeberg runs Forgejo and was an early Anubis adopter. By August 2025, a coordinated AI scraper campaign had bypassed Anubis at scale. The bypass wasn't analytical: crawlers spread challenge solutions across roughly 50,000 unique IP addresses, enough that the residual 10% of requests Anubis didn't block was still a flood. Some traffic traced back to Huawei-controlled networks<sup><a href="#ref-4">4</a></sup>.

Codeberg did not abandon Anubis. They kept it as the first layer and stacked Iocaine and a tarpit ("Nam-Shub of Enki") behind it. The argument is no longer "Anubis stops AI scrapers." It is "Anubis stops most of them, and what gets through becomes a smaller problem to handle with other tools."

This matters because Codeberg is a high-value target — public Forgejo source hosting, a clean alternative to GitHub, exactly the kind of corpus AI scraping operations want. Smaller deployers don't see this scale of pressure and don't need the layering. The lesson is asymmetric: defenders calibrate to what shows up at their site, attackers calibrate to economic value.

## The Bypass Economics

Tavis Ormandy's analysis of Anubis's PoW algorithm landed in 2025 and remains the canonical bypass reference. Implemented natively in C, the default-difficulty Anubis challenge takes about 17 milliseconds to solve. The attacker cost to clear every Anubis-protected site on the internet, on a single e2-micro instance, is functionally zero<sup><a href="#ref-5">5</a></sup>.

Independent operators have pushed this further. Yumechi published a multi-core, AVX-512-accelerated implementation hitting 1.485 GH/s on a Ryzen 7950X. These bypass demonstrations don't show Anubis is broken. They show that proof-of-work shifts cost asymmetrically, and the asymmetry favors attackers willing to write a native solver.

Practically, AI scrapers running on headless browser farms (Playwright, Puppeteer) absorb the cost without optimizing. The browser solves the challenge as it would in a human session. Cost-per-page rises, but the architecture works without modification. The Crawlee, Scrapling, and similar tool ecosystems do not ship "Anubis bypass" features as labeled features. They don't need to.

The operator implication: Anubis filters out lazy scrapers, low-margin scrapers, and scrapers running raw HTTP requests. It does not filter out scrapers running headless browsers, or scrapers that have decided the corpus is worth the compute.

## Where the Project Is Going

Anubis has changed substantially over the past nine months. The release notes show where the maintainers think the answer lives.

- **v1.22.0 (Sep 2025)** introduced **Proof of React**, a challenge that requires the browser to render React. Pure-JS SHA-256 fallback. Multi-core solving on the client side<sup><a href="#ref-6">6</a></sup>.
- **v1.23.0 (Oct 2025)** added S3 storage and AND-stacking rules — composing challenges, not just running them in series.
- **v1.24.0 (Dec 2025)** added a **dataset poisoning honeypot subsystem**, plus CEL-based DNS validation. The honeypot generates trap content for bots that bypass earlier layers.
- **v1.25.0 (Feb 2026)** shipped iplist2rule, a PoW solver overhaul, a CPU-core bug fix, and operator usability work<sup><a href="#ref-6">6</a></sup>.
- **v1.26+** has not shipped as of June 2026. Xe Iaso, Anubis's primary author, publicly disclosed in a January 2026 podcast appearance that Anubis revenue runs at "about 60% of a junior person's salary," and that v1.25 release notes call out development slowdown<sup><a href="#ref-7">7</a></sup>.

The trajectory is unambiguous. The maintainers are not betting the project on PoW. They are building a layered challenge stack: PoW, behavioral checks, JavaScript-execution gates, honeypots, IP-list integrations, dataset poisoning. PoW is the entry filter. Everything after it is what catches what the entry filter misses.

This matches what Codeberg already does in production. The architecture is moving toward what serious deployers already had to build by hand.

The funding situation is its own data point. Anubis is widely deployed and addresses a threat large enough to drive Cloudflare's product roadmap. It runs on roughly 60% of a junior developer's salary. That's a structural problem for the FOSS-defends-the-web model. BotStopper, Techaro's commercial tier, exists in part because hobby economics will not sustain enterprise-grade development<sup><a href="#ref-10">10</a></sup>.

## Implications for Operators

Three pragmatic conclusions if you are deploying or evaluating Anubis in 2026:

**Anubis is correctly priced as a first layer, not a complete defense.** GNOME, Duke, and Slackware all report meaningful infrastructure relief. None of them are claiming AI scrapers are stopped. They are claiming the volume is reduced enough to matter.

**Calibrate to your site's economic value to scrapers.** Codeberg is a high-value target and saw bypass pressure that smaller deployers don't. If your corpus is large, public, and useful for AI training, plan for the Codeberg case. If it's not, the entry filter alone may be sufficient for years.

**Plan for layered defenses now.** The project itself is moving this direction. Iocaine, tarpits, dataset poisoning, and IP-list filtering are all becoming standard parts of the production posture. Treating Anubis as a single-shot solution is reading the architecture from a year ago.

For background on the cost imposition framing (why proof-of-work shifts burden to attackers without quite moving it far enough), see our [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/) analysis. For context on the headless browser ecosystem that absorbs PoW costs by default, see [How AI Scraping Infrastructure Works](/blog/how-ai-scraping-infrastructure-works/).

---

*Last updated: June 2026*

## References

<ol class="references">
<li id="ref-1">GNOME GitLab pod-scaling reduction is referenced in TechCrunch's March 2025 coverage of Anubis and in the Anubis project documentation. <a href="https://github.com/TecharoHQ/anubis">https://github.com/TecharoHQ/anubis</a></li>
<li id="ref-2">Duke University Libraries (Jun 2025). "Pilot Report: Anubis Deployment for the Duke Digital Repository." Available via DukeSpace. <a href="https://dukespace.lib.duke.edu/">https://dukespace.lib.duke.edu/</a></li>
<li id="ref-3">Slackware (2025). "Anubis Is Now Guarding the Git Server." <a href="https://blog.slackware.nl/anubis-is-now-guarding-the-git-server/">https://blog.slackware.nl/anubis-is-now-guarding-the-git-server/</a></li>
<li id="ref-4">Forgejo Discussion #421 (2025-2026). "Crawler Abuse Trend Returns." <a href="https://codeberg.org/forgejo/discussions/issues/421">https://codeberg.org/forgejo/discussions/issues/421</a></li>
<li id="ref-5">Ormandy, T. (2025). "Anubis PoW Cost Analysis." <a href="https://lock.cmpxchg8b.com/">https://lock.cmpxchg8b.com/</a></li>
<li id="ref-6">TecharoHQ. "Anubis Releases (v1.22 through v1.25)." <a href="https://github.com/TecharoHQ/anubis/releases">https://github.com/TecharoHQ/anubis/releases</a></li>
<li id="ref-7">Open Source Security Podcast (2026-01). "Anubis with Xe Iaso." <a href="https://opensourcesecurity.io/2026/2026-01-anubis-xe/">https://opensourcesecurity.io/2026/2026-01-anubis-xe/</a></li>
<li id="ref-8">Wikipedia. "Anubis (software)." <a href="https://en.wikipedia.org/wiki/Anubis_(software)">https://en.wikipedia.org/wiki/Anubis_(software)</a></li>
<li id="ref-9">Anubis Project Documentation. <a href="https://anubis.techaro.lol/">https://anubis.techaro.lol/</a></li>
<li id="ref-10">Techaro. "Products: Anubis and BotStopper." <a href="https://techaro.lol/products">https://techaro.lol/products</a></li>
</ol>
