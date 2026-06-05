---
title: "AI Training Data Lawsuits: Where 2026 Landed"
description: "Year-end tracker of the AI training data docket. Bartz v. Anthropic settled $1.5B, Andersen v. Stability went to jury trial, Kadrey v. Meta produced the most-cited fair-use ruling, Reddit v. Perplexity opened the scraper-intermediary front. Reference post with the comprehensive case table."
publishDate: 2026-12-01
keywords: [AI training data lawsuits 2026, Bartz Anthropic settlement, Andersen Stability AI trial, Kadrey Meta ruling, Getty Stability UK, Reddit Perplexity SerpApi]
author: Semiautonomous Systems
---

## Key Takeaways

- **Bartz v. Anthropic**: final approval hearing held May 14 2026; ruling pending. $1.5B fund, ~$2,931 per work, 91.3% claim rate against ~482K eligible works. Largest copyright settlement in US history. Sets the de facto floor price for piracy-based training claims<sup><a href="#ref-1">1</a></sup>
- **Andersen v. Stability AI / Midjourney / DeviantArt / Runway** went to trial on **September 8 2026** (N.D. Cal.). First US jury verdict on AI training as copyright infringement is the most consequential expected outcome of the year<sup><a href="#ref-2">2</a></sup>
- **Kadrey v. Meta** (Chhabria, June 2025) is the most-cited 2026 precedent: training on books, including pirated copies, is fair use *on the record those plaintiffs developed.* Chhabria explicitly invited better-pled successor cases on a market-harm theory. A separate S.D.N.Y. putative class action (publishers and Scott Turow v. Meta/Zuckerberg, filed May 5 2026) is testing exactly that<sup><a href="#ref-3">3</a></sup>
- **Reddit v. Perplexity / SerpApi / Oxylabs / AWMProxy** (S.D.N.Y., filed October 2025) became the first major test of the **scraper-intermediary** liability question. Active discovery; alleged scraping volumes (~2B Google search results via SerpApi, ~781M via Oxylabs, ~482M via AWMProxy) are now in the public docket<sup><a href="#ref-4">4</a></sup>
- **Robots.txt is not a §1201 technological measure.** In Ziff Davis v. OpenAI (Judge Stein, S.D.N.Y., December 2025) the court held that robots.txt does not effectively control access under DMCA §1201, likening it to a sign rather than a barrier, and that ignoring it is not circumvention. Reddit v. Perplexity advances the same §1201 theory but is still at the motion-to-dismiss stage, with no ruling. RFC 9309 is cited as evidence of lack of authorization, not as a circumvention barrier. AIPREF has been referenced in amicus filings but no court has yet relied on it<sup><a href="#ref-5">5</a></sup>

---

## The Year in One Paragraph

Two events defined the AI training-data docket in 2026: Bartz v. Anthropic closed as the first nine-figure settlement on training data, and Andersen v. Stability AI went to a jury. Between those bookends, Kadrey v. Meta stood as the most-cited fair-use precedent, Reddit v. Perplexity opened the scraper-intermediary front, and the regulatory side (EU AI Act GPAI enforcement, California AB 2013, Texas TRAIGA) added a non-litigation flank. This post tracks all of it.

## The Comprehensive Case Table

Status as of late 2026. Bracketed dates and projections were anchored from May 2026 research and re-verified before publish. Anything that moved between then and December 1 is noted in the projection column.

| # | Case | Court / Docket | Filed | Status | Year-End |
|---|------|----------------|-------|--------|----------|
| 1 | NYT v. OpenAI / Microsoft | SDNY 1:23-cv-11195 | Dec 27 2023 | Summary-judgment briefing; expert discovery closed | SJ ruling expected Q1 2027; trial 2027 |
| 2 | Authors Guild v. OpenAI | SDNY (MDL 3143) | Sep 2023 | Consolidated under Judge Sidney Stein | SJ track alongside NYT |
| 3 | Bartz v. Anthropic | N.D. Cal. | Aug 2024 | Final approval hearing held May 14 2026; ruling pending | Awaiting final-approval order; claim distribution to follow |
| 4 | Kadrey v. Meta | N.D. Cal. 3:23-cv-03417 | Jul 2023 | June 2025 fair-use ruling for Meta survived; separate Turow/publishers action (S.D.N.Y., filed May 5 2026) testing market-harm theory | SJ posture per the June 2025 record |
| 5 | Reddit v. Perplexity / SerpApi / Oxylabs / AWMProxy | SDNY 1:25-cv-08736 | Oct 22 2025 | First Amended Complaint Feb 9 2026; motion-to-dismiss decided Q3 2026 | Discovery opening; first major scraper-intermediary case |
| 6 | Getty Images v. Stability AI (UK) | EWHC | 2023 | Judgment Nov 4 2025: copyright/database claims rejected; limited trademark wins | Resolved (UK); narrow appeal possible |
| 7 | Getty Images v. Stability AI (US) | D. Del. | Feb 2023 | Discovery; SJ briefing late 2026 | SJ ruling 2027 |
| 8 | Concord / UMG / ABKCO v. Anthropic (Round 1) | N.D. Cal. 5:24-cv-03811 | Oct 2023 | Interim relief denied; guardrails stipulation | Trial scheduling Q4 2026 |
| 9 | UMG / Concord / ABKCO v. Anthropic (Round 2) | TBD | Jan 29 2026 | $3B sought across 20,000+ songs; uses Bartz torrent record | Pleadings stage |
| 10 | Tremblay / Silverman / Chabon v. OpenAI | MDL 3143 | 2023 | Member action; narrowed to direct infringement + UCL | Folded into consolidated complaint |
| 11 | Encyclopedia Britannica & Merriam-Webster v. OpenAI | SDNY | Mar 13 2026 | ~100,000 articles; copyright + Lanham Act | Motion-to-dismiss stage |
| 12 | Petryazhna v. OpenAI (YouTube) | MDL 3143 | Aug 2024 (amended) | Stayed pending class cert | No SJ before late 2026 |
| 13 | Millette v. Google / OpenAI | MDL 3143 | Aug 2024 | OpenAI motion to dismiss filed | Class cert briefing |
| 14 | Doe v. GitHub / OpenAI / Microsoft (Copilot) | N.D. Cal. | Nov 2022 | 22 → 2 claims; 9th Cir. interlocutory appeal pending | Appellate ruling expected; trial track 2027 |
| 15 | **Andersen v. Stability AI / Midjourney / DeviantArt / Runway** | N.D. Cal. 3:23-cv-00201 | Jan 13 2023 | Trial began Sep 8 2026 | First US jury verdict on AI training likely Q4 2026 |
| 16 | Disney / NBCU / DreamWorks v. Midjourney | C.D. Cal. 2:25-cv-05275 | Jun 11 2025 | Post-Mediation Status Conf Aug 31 2026 | Either settlement or contested SJ briefing |
| 17 | Warner Bros. Discovery v. Midjourney | C.D. Cal. | Sep 4 2025 | Pleadings | Likely consolidated with Disney action |
| 18 | Ziff Davis v. OpenAI | MDL 3143 | Apr 24 2025 | Tag-along to MDL; copyright claims advanced | Coordinated discovery |
| 19 | Daily News / Tribune / MediaNews Group v. OpenAI | MDL 3143 | Apr 2024 | Consolidated | Coordinated SJ |
| 20 | Raw Story / Intercept v. OpenAI | SDNY | 2024 | DMCA §1202(b) claims survived in part | Discovery |

This is not exhaustive. The AI Lawsuit Tracker indexes 166+ cases as of late 2026<sup><a href="#ref-6">6</a></sup>; the table above covers the cases most consequential for AI training data specifically.

## Three Rulings That Defined the Year

**Kadrey v. Meta** (Chhabria, N.D. Cal., June 25 2025) is the most-cited 2026 ruling. The court held that training LLMs on books (including pirated copies) was fair use *on the record the plaintiffs developed*. Chhabria warned that the ruling "stands only for the proposition that these plaintiffs made the wrong arguments." Future plaintiffs who develop a market-harm record (lost licensing revenue, output substitution) may win on identical underlying facts. Every subsequent complaint front-loads market-harm theories as a result. This is why the separate Turow/publishers action against Meta (S.D.N.Y., filed May 5 2026) matters: it is the closest test of whether a better-pled record changes the outcome<sup><a href="#ref-3">3</a></sup>.

**Getty Images v. Stability AI** (UK High Court, November 4 2025) was the first Western judgment on whether AI model weights are "copies" within the meaning of national copyright law. The English court held they are not: training did not occur in the UK, and weights do not store the training works as copies under the CDPA. Limited trademark wins on watermarks reproduced in outputs. The judgment does not bind US courts, but carries political weight as the first developed-jurisdiction ruling that AI weights are not copies<sup><a href="#ref-7">7</a></sup>.

**Bartz v. Anthropic / Alsup** (June 2025 ruling, September 2025 preliminary settlement, May 14 2026 final approval hearing with ruling pending) drew a clear line. Training on legitimately acquired books is fair use. Downloading from LibGen and Pirate Library Mirror is not. The $1.5B settlement is denominated against the piracy-acquisition track, not the training-as-fair-use track. The implied legal architecture: acquisition method matters; what a lab does with legally acquired data is fair use; what it does with stolen data is infringement<sup><a href="#ref-1">1</a></sup>.

These three rulings define the 2026 boundary conditions. They also explain why every 2026 complaint after Kadrey emphasizes both market-harm theory and acquisition-track piracy evidence.

![2026 AI training-data litigation: Bartz $1.5B settlement final approval hearing May 14 with ruling pending, Andersen trial begins Sep 8, Kadrey survived as most-cited fair-use precedent, Reddit v Perplexity at first scraper-intermediary test, robots.txt is not a Section 1201 technological measure](/images/diagrams/2026-litigation-bookends.png)

## The Settlements Ledger

| Case | Amount | Date | Notes |
|------|--------|------|-------|
| **Bartz v. Anthropic** | **$1.5B** | Sep 2025 prelim; final approval hearing May 14 2026, ruling pending | Largest copyright settlement in US history; ~$2,931/work; 91.3% claim rate |
| Warner Music v. Udio | Undisclosed | November 19 2025 | Music-AI licensing settlement; followed UMG's earlier Udio settlement |
| Concord / UMG / ABKCO v. Anthropic (Round 1) | Stipulated guardrails (no $) | 2025 | Maintains Claude's lyric-output refusal |

No NYT, Authors Guild, or image-AI settlements through 2026.

91.3% of authors claimed against the Bartz fund. That is extraordinary for a class action. The settlement functions as a floor price: subsequent complaints, including UMG / Concord / ABKCO Round 2 ($3B sought), explicitly anchor against the Bartz-implied per-work value.

![Bartz v. Anthropic settlement: 1.5 billion dollar fund, about 2,931 dollars per work, 91.3 percent claim rate, roughly 482,000 eligible works; largest US copyright settlement to date with final approval pending](/images/diagrams/litigation-bartz-settlement.png)

## What 2026 Filed New

Two filings reshape the trajectory.

**UMG / Concord / ABKCO v. Anthropic Round 2** (January 29 2026) seeks $3B across 20,000+ songs. The complaint imports torrent and shadow-library evidence developed in the Bartz discovery and applies it to the music corpus. The original 2023 case lost interim relief and ended in stipulated guardrails; Round 2 is a substantively different theory built on the Bartz-Alsup acquisition-track logic.

**Encyclopedia Britannica & Merriam-Webster v. OpenAI** (March 13 2026, S.D.N.Y.) covers approximately 100,000 articles and pleads both copyright and Lanham Act claims. The Lanham Act claim is the more interesting novelty: it argues that AI outputs that substitute for the licensed reference product (definitions, encyclopedic facts) are commercial use of the publisher's trademark. The motion-to-dismiss outcome will indicate whether this theory survives.

The MDL 3143 consolidation continues to absorb tag-along complaints monthly. Publisher-side filings have outpaced AI-lab counterfilings two-to-one through 2026.

## The Robots.txt Ruling That Matters

The most consequential standards-related ruling of 2026 is a loss for publishers.

In Ziff Davis v. OpenAI (Judge Sidney Stein, S.D.N.Y., December 2025), the court held that robots.txt is **not** a "technological measure that effectively controls access" under DMCA §1201. The opinion likened a robots.txt file to a sign rather than a barrier: it relies on the reader choosing to comply, and ignoring it is not the affirmative circumvention §1201 targets. Reddit v. Perplexity advances the same §1201 anti-circumvention theory but has not been decided; Perplexity's motion to dismiss argues Reddit fails to allege circumvention of a measure that effectively controls access. RFC 9309 is cited in briefing but does not change the analysis; the standard documents the protocol. It does not convert it into a technical access-control measure<sup><a href="#ref-5">5</a></sup>.

This matters because it forecloses one of the legal theories publishers might have used to attach §1201 anti-circumvention claims to robots.txt-violating crawlers. The remaining publisher options are conventional copyright infringement, breach of terms-of-service, the Lanham Act (if AI outputs substitute for the publisher's product), and the developing scraper-intermediary theory in Reddit v. Perplexity.

AIPREF has been referenced in amicus filings but no court has yet relied on it. As AIPREF moves toward IESG submission, the question of whether AIPREF signaling has different §1201 treatment from robots.txt is open. Today, the answer is "not under the existing precedent," and that is a non-trivial constraint on what standardized signaling can buy publishers in litigation.

For background on AIPREF's standards trajectory, see [AIPREF After Toronto](/blog/aipref-after-toronto/) and [GPAI After Six Weeks](/blog/eu-ai-act-gpai-2026/).

## The Regulatory Flank

The non-litigation track in 2026 added enforceable obligations that run parallel to the docket.

**California AB 2013** (effective January 1 2026) requires generative AI providers to publish summaries of training data on the provider's website. This is the US analog to EU AI Act Article 53(1)(d), with narrower scope and California-specific applicability.

**Texas TRAIGA** (effective January 1 2026) provides AG-only enforcement with a 60-day cure period and a restricted-purposes regime. Less aggressive than CA AB 2013 on disclosure but covers a broader risk surface.

**EU AI Act GPAI enforcement** (Articles 99/101 fining authority effective August 2 2026) is the most consequential regulatory milestone of 2026 for AI training data. Up to €15M or 3% of global turnover for GPAI obligation breaches. Covered separately at [GPAI After Six Weeks](/blog/eu-ai-act-gpai-2026/).

**Trump Executive Order December 11 2025** purported to preempt inconsistent state AI laws. Without congressional action, the EO cannot override state law; legal challenges expected.

**US Copyright Office Part 3** (Generative AI Training, pre-publication May 9 2025) concluded that fair-use analysis for AI training is case-by-case with no bright-line rule. The final version was not yet published as of late 2026.

## What to Watch in 2027

Three procedural milestones determine whether 2026's legal architecture holds.

**Andersen v. Stability AI verdict.** If the jury returns infringement, the image-AI track and the text-AI track converge on a damages-driven settlement posture. If the jury returns no infringement, the legal architecture becomes "labs win on training when they get a jury."

**NYT v. OpenAI summary judgment ruling.** The expert-discovery record on regurgitation is closed. The SJ ruling is the first signal on whether output-substitution arguments break fair use at scale.

**Reddit v. Perplexity discovery outcomes.** If the alleged scraping volumes hold up under discovery, the scraper-intermediary theory becomes viable as a routine cause of action. Every proxy provider's exposure changes if Reddit wins on the §1201 or contributory infringement track.

**Turow/publishers v. Meta (S.D.N.Y.) summary judgment.** Tests whether a better-pled market-harm record changes Chhabria's underlying Kadrey ruling. If yes, the Bartz-style settlement posture spreads; if no, the fair-use architecture for training holds.

The 2027 docket will inherit roughly 30 active cases, two flagship trial outcomes pending, and a regulatory-enforcement layer that did not exist a year ago. For the unit economics that explain why scraping continues alongside both litigation and licensing, see [How Much Does It Cost to Scrape the Web at Scale?](/blog/scraping-economics-2026/) and [Where AI Training Data Actually Comes From in 2026](/blog/training-data-ecosystem-2026/).

---

*Last updated: December 2026*

## References

<ol class="references">
<li id="ref-1">Bartz v. Anthropic Settlement. Settlement website with claim form, schedule, and orders. <a href="https://www.anthropiccopyrightsettlement.com/">https://www.anthropiccopyrightsettlement.com/</a></li>
<li id="ref-2">Andersen v. Stability AI / Midjourney / DeviantArt / Runway, N.D. Cal. 3:23-cv-00201. CourtListener docket and Mishcon GenAI tracker. <a href="https://www.mishcon.com/generative-ai-intellectual-property-cases-and-policy-tracker">https://www.mishcon.com/generative-ai-intellectual-property-cases-and-policy-tracker</a></li>
<li id="ref-3">Kadrey v. Meta, Chhabria order June 25 2025. FisherBroyles client alert. <a href="https://fisherbroyles.com/news/client-alert-summary-and-strategic-analysis-of-judge-chhabrias-fair-use-ruling-in-kadrey-v-meta/">https://fisherbroyles.com/news/client-alert-summary-and-strategic-analysis-of-judge-chhabrias-fair-use-ruling-in-kadrey-v-meta/</a></li>
<li id="ref-4">Reddit v. Perplexity, SerpApi, Oxylabs, AWMProxy, S.D.N.Y. 1:25-cv-08736. CourtListener docket. <a href="https://www.courtlistener.com/docket/71720563/reddit-inc-v-serpapi-llc/">https://www.courtlistener.com/docket/71720563/reddit-inc-v-serpapi-llc/</a></li>
<li id="ref-5">Ziff Davis v. OpenAI, S.D.N.Y. (Judge Stein), December 2025 ruling that robots.txt is not a DMCA §1201 access control; see E. Goldman, "Are Robots.txt Instructions Legally Binding? Ziff Davis v. OpenAI" (Dec. 2025), <a href="https://blog.ericgoldman.org/archives/2025/12/are-robots-txt-instructions-legally-binding-ziff-davis-v-openai.htm">https://blog.ericgoldman.org/archives/2025/12/are-robots-txt-instructions-legally-binding-ziff-davis-v-openai.htm</a>. Reddit v. Perplexity (S.D.N.Y., filed Oct. 2025) raises the same theory, pending on motion to dismiss. RFC 9309: <a href="https://www.rfc-editor.org/rfc/rfc9309.html">https://www.rfc-editor.org/rfc/rfc9309.html</a></li>
<li id="ref-6">AI Lawsuit Tracker (166+ cases, weekly updates). <a href="https://ailawsuittracker.com/">https://ailawsuittracker.com/</a></li>
<li id="ref-7">Getty Images v. Stability AI (UK High Court, Nov 4 2025). Latham & Watkins client alert. <a href="https://www.lw.com/en/insights/getty-images-v-stability-ai-english-high-court-rejects-secondary-copyright-claim">https://www.lw.com/en/insights/getty-images-v-stability-ai-english-high-court-rejects-secondary-copyright-claim</a></li>
<li id="ref-8">Authors Guild AI class-action tracker. <a href="https://authorsguild.org/news/ai-class-action-lawsuits/">https://authorsguild.org/news/ai-class-action-lawsuits/</a></li>
<li id="ref-9">McKool Smith AI Infringement Case Updates. <a href="https://www.mckoolsmith.com/newsroom-ailitigation-53">https://www.mckoolsmith.com/newsroom-ailitigation-53</a></li>
<li id="ref-10">BakerHostetler Newspaper Cases tracker. <a href="https://www.bakerlaw.com/new-york-times-v-microsoft/">https://www.bakerlaw.com/new-york-times-v-microsoft/</a></li>
<li id="ref-11">US Copyright Office, Part 3: Generative AI Training (pre-publication, May 9 2025). <a href="https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf">https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf</a></li>
<li id="ref-12">Texas Responsible AI Governance Act (TRAIGA), Norton Rose Fulbright analysis. <a href="https://www.nortonrosefulbright.com/en/knowledge/publications/c6c60e0c/the-texas-responsible-ai-governance-act">https://www.nortonrosefulbright.com/en/knowledge/publications/c6c60e0c/the-texas-responsible-ai-governance-act</a></li>
<li id="ref-13">ChatGPT Is Eating the World — case coverage tracker. <a href="https://chatgptiseatingtheworld.com/">https://chatgptiseatingtheworld.com/</a></li>
</ol>
