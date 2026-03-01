---
title: "Understanding AIPREF: The IETF Standard for AI Content Preferences"
description: "AIPREF extends robots.txt with standardized vocabulary for AI training preferences. How the IETF standard works, its syntax, and what it means for publishers."
publishDate: 2026-03-01
keywords: [AIPREF, IETF AIPREF, AI preferences standard, robots.txt AI training, Content-Usage header, AI crawling preferences]
author: Semiautonomous Systems
---

## Key Takeaways

- AIPREF is an IETF working group developing standardized vocabulary for expressing AI content usage preferences, extending robots.txt with a new `Content-Usage` rule<sup><a href="#ref-1">1</a></sup>
- The standard separates **acquisition** (can a crawler fetch this?) from **usage** (can it be used for AI training?), solving an ambiguity that robots.txt `Disallow` cannot express<sup><a href="#ref-2">2</a></sup>
- Two usage categories are defined: `train-ai` (foundation model production) and `search` (search applications with attribution), with preferences of allow (`y`), disallow (`n`), or unknown<sup><a href="#ref-3">3</a></sup>
- Preferences attach via HTTP `Content-Usage` headers or robots.txt `Content-Usage` rules, using the same path-matching logic as RFC 9309<sup><a href="#ref-2">2</a></sup>
- AIPREF improves signaling clarity but does not enforce compliance. Like robots.txt, it depends on voluntary cooperation. The value lies in creating clearer evidence for legal and reputational accountability<sup><a href="#ref-3">3</a></sup>

---

## The Problem AIPREF Solves

Robots.txt was designed in 1994 for a simpler web. A site operator could tell search engine crawlers which paths to avoid, and crawlers complied because they needed ongoing access to fresh content. The incentive structure worked.

AI training breaks this model in two ways.

First, **the vocabulary is wrong**. Robots.txt offers `Allow` and `Disallow` directives that control whether a crawler can fetch a resource. But a publisher who wants Google to index their pages for search while preventing OpenAI from using those same pages for GPT training has no way to express that distinction. `Disallow` blocks all access. `Allow` permits everything. There is no middle ground.<sup><a href="#ref-4">4</a></sup>

The result is a patchwork of ad hoc solutions. AI companies introduced proprietary user-agent strings (GPTBot, ClaudeBot, CCBot) that publishers can selectively block. But this requires publishers to maintain an ever-growing list of bot names, and new crawlers appear faster than blocklists update. The community-maintained ai-robots-txt repository tracks known AI agents, but it is a reactive, incomplete approach.<sup><a href="#ref-5">5</a></sup>

Second, **the relationship is different**. Search engines need ongoing crawl access to provide fresh results. This creates a cooperative dynamic. AI training is a one-time extraction. Once a company has scraped a dataset, the relationship ends. There is no recurring dependency that creates compliance incentives.

TollBit data from Q2 2025 shows the result: 13.26% of AI bot requests ignored robots.txt directives, a fourfold increase from 3.3% in Q4 2024.<sup><a href="#ref-6">6</a></sup> Sites blocking AI crawlers increased 336% year-over-year. Over 5.6 million websites added GPTBot to their disallow lists.<sup><a href="#ref-7">7</a></sup> Publishers are signaling preferences louder than ever, but the signals lack precision and the compliance trajectory is heading in the wrong direction.

AIPREF addresses the vocabulary problem. It does not solve the compliance problem.

![AIPREF two-layer model: acquisition via Allow/Disallow controls crawling, Content-Usage controls AI training permission independently](/images/diagrams/aipref-architecture.png)

## What AIPREF Is (and Isn't)

The IETF chartered the AI Preferences (AIPREF) Working Group in January 2025<sup><a href="#ref-1">1</a></sup> with a specific scope: standardize building blocks for expressing preferences about how content is collected and processed for AI model development, deployment, and use.

The charter explicitly defines what AIPREF covers:

- **A preference vocabulary**: standardized terms for expressing AI-related usage preferences, independent of how those preferences are delivered
- **Attachment mechanisms**: standards-track specifications for associating preferences with content via HTTP headers and robots.txt extensions
- **Reconciliation**: a method for resolving conflicts when multiple preference expressions exist

Equally important is what AIPREF explicitly excludes:

- **No technical enforcement.** AIPREF defines how to express preferences, not how to enforce them. A crawler that ignores `Content-Usage: train-ai=n` faces no technical barrier.
- **No crawler authentication.** AIPREF does not verify that a crawler is who it claims to be. User-agent spoofing remains possible.
- **No preference registries.** There is no central database of publisher preferences.
- **No auditing or transparency measures.** AIPREF does not define how to verify that preferences were respected.

This scope is deliberate. Standards that try to solve too many problems at once tend to solve none of them. AIPREF focuses on one thing: giving publishers a precise, machine-readable way to say what they want.

## The Vocabulary

The vocabulary specification, `draft-ietf-aipref-vocab-05`<sup><a href="#ref-3">3</a></sup>, defines the terms and preference model that AIPREF uses.

### Usage Categories

The current draft defines two usage categories:

**Foundation Model Production** (`train-ai`): Using assets to train or fine-tune foundation models. This includes large language models, image generation models, and any machine learning system trained on the content. It also covers specialized applications built through fine-tuning of foundation models.

**Search** (`search`): Presenting assets in search output that directs users to the original source. Search use requires verbatim excerpts and attribution. Notably, internal AI model training for search ranking purposes is permitted under this category, recognizing that modern search engines use ML throughout their pipelines.

### Preference Values

For each usage category, a declaring party assigns one of three values:

- **Allow** (`y`): Usage is permitted
- **Disallow** (`n`): Usage is not permitted
- **Unknown**: No preference stated (the default when nothing is declared)

A preference statement looks like: `train-ai=n, search=y`. This says: do not use my content for foundation model training, but search indexing with attribution is fine.

### Combination Rules

When multiple preference statements apply to the same resource, the most restrictive preference wins. Any `disallow` overrides any `allow`. This conservative default means that if any legitimate stakeholder objects to a particular use, that objection is respected.

### The Declaring Party

The vocabulary defines a "declaring party" as the entity expressing preferences about an asset. This is typically the site operator or content creator. The specification does not attempt to resolve complex ownership questions (e.g., when a photographer's work appears on a platform they do not control). Those questions remain in the domain of copyright law and contractual agreements.

### Important Limitations

The vocabulary specification is explicit about what preferences are not:

- Expressing a preference creates no legal right or prohibition<sup><a href="#ref-3">3</a></sup>
- Recipients may legitimately ignore preferences due to statutory exceptions, accessibility requirements, scholarly use, preservation, or safety considerations
- Preferences are not a substitute for licensing agreements or legal frameworks

## The Attachment Mechanism

The attachment specification, `draft-ietf-aipref-attach-04`<sup><a href="#ref-2">2</a></sup>, defines how preferences are delivered to crawlers. It provides two mechanisms: an HTTP header and a robots.txt extension.

### The Content-Usage HTTP Header

The `Content-Usage` header is a structured field dictionary per RFC 9651<sup><a href="#ref-8">8</a></sup>. It appears in HTTP responses and communicates usage preferences about the content being served.

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Usage: train-ai=n
```

This tells any automated system receiving this response: this content should not be used for foundation model training.

The header applies to the specific representation being served. Different resources on the same origin can have different preferences. A news site might allow training on public articles but disallow it on premium content, with the header reflecting the appropriate preference per request.

### robots.txt Content-Usage Rules

The attachment draft updates RFC 9309 to add a new `Content-Usage` rule that can appear alongside existing `Allow` and `Disallow` directives:

```
User-Agent: *
Allow: /
Disallow: /private/
Content-Usage: train-ai=n
Content-Usage: /blog/ train-ai=y
```

This configuration says:
- All paths are crawlable except `/private/`
- By default, content should not be used for AI training (`train-ai=n`)
- Content under `/blog/` may be used for AI training (`train-ai=y`)
- `/private/` paths are not crawlable, so usage preferences do not apply to them

Path matching follows the same rules as RFC 9309 `Allow` and `Disallow`: longest prefix match by byte count, with identical percent-encoding rules.<sup><a href="#ref-9">9</a></sup>

### Acquisition vs Usage

The key conceptual innovation in AIPREF is separating **acquisition** from **usage**<sup><a href="#ref-2">2</a></sup>. In RFC 9309, `Disallow` conflates the two: if you cannot fetch it, the question of usage never arises. AIPREF decouples them:

- `Allow` / `Disallow` controls whether a crawler may fetch the resource (acquisition)
- `Content-Usage` controls what the crawler may do with fetched content (usage)

This means a publisher can say: "Yes, you may crawl my site for search indexing. No, you may not use the content you crawl for AI training." This was impossible with robots.txt alone.

Usage preferences only apply to resources that are already crawlable. If a resource is `Disallow`ed, there are no usage preferences to consider because the crawler should not be fetching it in the first place.

![What AIPREF adds to robots.txt: path-specific AI training preferences with standard vocabulary, separating crawl permission from usage rights](/images/diagrams/aipref-vs-robots.png)

### Reconciliation

When both an HTTP header and a robots.txt rule express preferences for the same resource, the attachment specification defers to the vocabulary's combination rules: the most restrictive preference applies<sup><a href="#ref-3">3</a></sup>. If robots.txt says `train-ai=y` but the HTTP header says `train-ai=n`, the result is `disallow`.

This conservative approach means publishers can set a baseline in robots.txt and override with more restrictive per-resource preferences via HTTP headers. They cannot use headers to loosen restrictions set in robots.txt.

## The October 2025 Pivot

AIPREF's development was not linear. The working group underwent a significant reconceptualization in late 2025 that reshaped the standard's approach.<sup><a href="#ref-10">10</a></sup>

The original framing focused on whether "AI" could be used with content. During Working Group Last Call in September 2025, participants identified a fundamental problem with this approach: AI is becoming pervasive across computing. Restricting whether "AI" can process content is analogous to restricting whether a programming language can be used. It targets a technique rather than a purpose, and techniques evolve faster than standards.

At an interim meeting in Zurich in October 2025, the group pivoted to a **purpose-based framework**<sup><a href="#ref-10">10</a></sup>. Instead of asking "can AI be used?", the revised vocabulary asks "for what purpose may this content be used?" This shift produced the current two-category model:

- **Foundation model production**: the purpose of building or improving ML models
- **Search**: the purpose of helping users find and access content

This reframing has practical implications. It allows publishers to say "you may use ML to rank my content in search results, but you may not use my content to train a general-purpose language model." The previous technology-based framing could not express this distinction cleanly.

The pivot initially proposed additional categories ("AI Output" for generative AI responses, "Automated Processing" for bot-like usage), but these were removed in November 2025 after the working group determined they were either too broad or insufficiently distinct. The vocabulary narrowed back to the two core categories: `train-ai` and `search`.

The pivot also means the drafts are still evolving. The current vocabulary (version 05, December 2025) and attachment mechanism (version 04, October 2025) reflect the new approach but have not yet achieved consensus<sup><a href="#ref-10">10</a></sup>. At IETF 124 in Montreal (November 2025), the working group held two sessions on the vocabulary and attachment mechanism. One key unresolved question: whether to add a top-level opt-out category that would let publishers reject all AI-related uses with a single preference. Proponents want a broad opt-out mechanism; opponents argue it could inhibit beneficial uses like accessibility tools. The chairs committed to gathering specific use cases on the mailing list before deciding.

## Timeline and Current Status

![AIPREF timeline from January 2025 charter through Brussels, Bangkok, London, Madrid, WGLC, Zurich pivot, IETF 124 Montreal, to IETF 125 Shenzhen](/images/diagrams/aipref-timeline.png)

- **January 2025**: IETF charters the AIPREF Working Group<sup><a href="#ref-1">1</a></sup>
- **IETF 122, Bangkok**: First official WG meeting
- **April 2025, Brussels**: Interim meeting; group converges on simple vocabulary plus robots.txt/HTTP attachment<sup><a href="#ref-11">11</a></sup>
- **June 2025**: Online meeting to resolve outstanding issues; group reports near completion of chartered goals
- **July 2025, London**: Two-day design team meeting for detailed technical work<sup><a href="#ref-11">11</a></sup>
- **IETF 123, Madrid**: Follow-up meeting
- **August 2025**: Original target for IESG submission (missed)
- **September 2025**: Working Group Last Call issued on both drafts
- **October 2025, Zurich**: Interim meeting; fundamental reconceptualization from technology-based to purpose-based framework<sup><a href="#ref-10">10</a></sup>
- **IETF 124, Montreal** (November 2025): Two sessions; consensus reached on separating "search" from other AI uses, but no consensus on a top-level opt-out category
- **November 2025**: "AI Output" and "Automated Processing" categories removed from vocabulary draft, narrowing back to two categories (`train-ai`, `search`)
- **December 2025**: Updated vocabulary draft (v05) published reflecting refined purpose-based approach<sup><a href="#ref-3">3</a></sup>
- **IETF 125, Shenzhen** (March 2026): Next scheduled AIPREF session
- **August 2026**: Current IESG submission target for both drafts

The original ambitious timeline (IESG submission by August 2025) slipped after the October pivot and has been rescheduled to August 2026. This is not unusual for IETF standards work. The pivot reflects genuine engagement with the problem rather than rushing to publish something inadequate. Getting the vocabulary right matters more than shipping quickly, because changing fundamental terms after deployment creates confusion rather than resolving it.

## AIPREF vs robots.txt

| Feature | robots.txt (RFC 9309) | AIPREF |
|---------|----------------------|--------|
| Controls | Crawl access (fetch/don't fetch) | Usage preferences (what you may do with fetched content) |
| Vocabulary | `Allow`, `Disallow` | `train-ai`, `search` with `y`/`n` values |
| Granularity | Per-path, per-user-agent | Per-path, per-user-agent, plus HTTP header per-resource |
| AI-specific | No (same rules for all crawlers) | Yes (purpose-specific categories) |
| Enforcement | Voluntary | Voluntary |
| Legal weight | Increasingly cited in litigation<sup><a href="#ref-12">12</a></sup> | Clearer signal of intent may strengthen legal claims |
| Standard status | RFC (published 2022)<sup><a href="#ref-9">9</a></sup> | Internet-Draft (in progress) |

AIPREF does not replace robots.txt. It extends it. A publisher using AIPREF still uses `Allow`/`Disallow` for crawl control and adds `Content-Usage` rules for AI training preferences. The two work together.

The critical thing AIPREF adds is **semantic precision**. When a publisher writes `Disallow: /` for GPTBot in robots.txt today, they are saying "do not crawl my site." But what they often mean is "do not use my content for AI training." With AIPREF, they can say exactly that: `Allow: /` (crawl is fine) plus `Content-Usage: train-ai=n` (but don't train on it).

This precision matters for legal clarity. If a publisher's robots.txt blocks GPTBot but allows Googlebot, and Google later uses crawled content for Gemini training, the publisher's intent was ambiguous. With AIPREF, `Content-Usage: train-ai=n` applies to all crawlers regardless of user-agent, making the publisher's position unambiguous.

## The Enforcement Gap

AIPREF is a signaling standard. It tells crawlers what publishers want. It does not make crawlers comply.

This is the same fundamental limitation as robots.txt<sup><a href="#ref-9">9</a></sup>, which explicitly states it is "not a substitute for valid content security measures." AIPREF inherits this limitation by design. The working group's charter explicitly excludes technical enforcement mechanisms.

So what is the point?

**Clearer signals create stronger legal standing.** When robots.txt compliance data is cited in litigation (NYT v. OpenAI<sup><a href="#ref-13">13</a></sup>, Reddit v. Perplexity<sup><a href="#ref-14">14</a></sup>), judges must interpret whether "Disallow" for a named bot constitutes a clear expression of the publisher's wishes. AIPREF removes this ambiguity. `Content-Usage: train-ai=n` is an unequivocal statement.

**Clearer signals enable regulatory enforcement.** The EU AI Act requires GPAI providers to respect "reservations of rights expressed by rightholders."<sup><a href="#ref-15">15</a></sup> A standardized, machine-readable preference expression is stronger evidence of a reservation of rights than an ad hoc robots.txt entry.

**Clearer signals create reputational costs.** When non-compliance is measurable and unambiguous, it becomes harder for AI companies to claim they did not understand the publisher's intent.

But signals alone do not change behavior when incentives are misaligned. The 13.26% non-compliance rate for robots.txt<sup><a href="#ref-6">6</a></sup> demonstrates this. AIPREF makes violations clearer, but does not prevent them.

This is where AIPREF fits into a layered defense strategy alongside technical enforcement mechanisms:

1. **AIPREF / robots.txt**: Express preferences clearly (signaling)
2. **Proof-of-work (Anubis)**: Impose computational costs on high-volume scrapers<sup><a href="#ref-16">16</a></sup>
3. **Rate limiting / bot detection**: Identify and throttle non-compliant crawlers
4. **Data poisoning (Nightshade, Poison Fountain)**: Degrade the value of unauthorized training data<sup><a href="#ref-17">17</a></sup>
5. **Litigation**: Impose legal and financial costs for non-compliance

AIPREF is the foundation layer. It provides the evidence and clarity that makes enforcement at higher layers more effective. For a deeper analysis of these enforcement mechanisms, see our [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/) analysis.

## Getting Started

Publishers who want to adopt AIPREF today can start with two steps:

**1. Add Content-Usage rules to robots.txt:**

```
User-Agent: *
Allow: /
Content-Usage: train-ai=n
Content-Usage: /public-data/ train-ai=y
```

This allows all crawling but disallows AI training by default, with an exception for content you are willing to share.

**2. Add Content-Usage HTTP headers** for per-resource control. This requires server configuration (Nginx, Apache, Cloudflare Workers, etc.) to set headers based on content type or path.

The AIPREF Generator at aipref.dev<sup><a href="#ref-18">18</a></sup> provides a tool for generating configurations. Note that the generator's interface currently shows categories from an earlier draft version (including "automated processing" and "generative AI training" which have since been removed). The core `train-ai` and `search` categories remain valid.

Note that AIPREF is still an Internet-Draft, not a published RFC. The syntax and vocabulary may change before finalization. Early adoption helps shape the standard through real-world feedback, but implementations should be prepared to update as the drafts evolve.

For foundational context on why these preference signals matter, see our [Why VENOM Exists](/blog/why-venom-exists/) post on the enforcement vs signaling framework. For practical implementation of alternative defense mechanisms, see our [Data Poisoning FAQ](/blog/data-poisoning-faq/).

---

*Last updated: March 2026*

## References

<ol class="references">
<li id="ref-1">IETF. "AI Preferences (aipref) Working Group Charter." <a href="https://datatracker.ietf.org/wg/aipref/about/">https://datatracker.ietf.org/wg/aipref/about/</a></li>
<li id="ref-2">Illyes, G., Thomson, M. "Associating AI Usage Preferences with Content in HTTP." draft-ietf-aipref-attach-04. <a href="https://datatracker.ietf.org/doc/html/draft-ietf-aipref-attach-04">https://datatracker.ietf.org/doc/html/draft-ietf-aipref-attach-04</a></li>
<li id="ref-3">Keller, P., Thomson, M. "A Vocabulary For Expressing AI Usage Preferences." draft-ietf-aipref-vocab-05. <a href="https://datatracker.ietf.org/doc/html/draft-ietf-aipref-vocab-05">https://datatracker.ietf.org/doc/html/draft-ietf-aipref-vocab-05</a></li>
<li id="ref-4">IETF Blog. "IETF Setting Standards for AI Preferences." <a href="https://www.ietf.org/blog/aipref-wg/">https://www.ietf.org/blog/aipref-wg/</a></li>
<li id="ref-5">GitHub. "ai-robots-txt: A List of AI Agents and Robots to Block." <a href="https://github.com/ai-robots-txt/ai.robots.txt">https://github.com/ai-robots-txt/ai.robots.txt</a></li>
<li id="ref-6">The Register (2025). "Publishers Say No to AI Scrapers, Block Bots at Server Level." <a href="https://www.theregister.com/2025/12/08/publishers_say_no_ai_scrapers/">https://www.theregister.com/2025/12/08/publishers_say_no_ai_scrapers/</a></li>
<li id="ref-7">Stytch Blog (2025). "How to Block AI Web Crawlers." <a href="https://stytch.com/blog/how-to-block-ai-web-crawlers/">https://stytch.com/blog/how-to-block-ai-web-crawlers/</a></li>
<li id="ref-8">Nottingham, M., Kamp, P-H. "Structured Field Values for HTTP." RFC 9651. <a href="https://datatracker.ietf.org/doc/html/rfc9651">https://datatracker.ietf.org/doc/html/rfc9651</a></li>
<li id="ref-9">Koster, M., Illyes, G., Zeller, H., Sassman, L. "Robots Exclusion Protocol." RFC 9309. <a href="https://datatracker.ietf.org/doc/html/rfc9309">https://datatracker.ietf.org/doc/html/rfc9309</a></li>
<li id="ref-10">IETF Blog. "Enabling Publishers to Express Preferences for AI Crawlers: An Update on the AIPREF Working Group." <a href="https://www.ietf.org/blog/ai-pref-update/">https://www.ietf.org/blog/ai-pref-update/</a></li>
<li id="ref-11">IETF Blog. "Progress on AI Preferences." <a href="https://www.ietf.org/blog/ai-pref-progress/">https://www.ietf.org/blog/ai-pref-progress/</a></li>
<li id="ref-12">DG Law (2025). "Court Rules AI Training on Copyrighted Works Is Not Fair Use." <a href="https://www.dglaw.com/court-rules-ai-training-on-copyrighted-works-is-not-fair-use-what-it-means-for-generative-ai/">https://www.dglaw.com/court-rules-ai-training-on-copyrighted-works-is-not-fair-use-what-it-means-for-generative-ai/</a></li>
<li id="ref-13">Harvard Law Review (2024). "NYT v. OpenAI: The Times's About-Face." <a href="https://harvardlawreview.org/blog/2024/04/nyt-v-openai-the-timess-about-face/">https://harvardlawreview.org/blog/2024/04/nyt-v-openai-the-timess-about-face/</a></li>
<li id="ref-14">CNBC (2025). "Reddit User Data Battle: AI Industry Sues Perplexity Over Scraping Posts." <a href="https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts-openai-chatgpt-google-gemini-lawsuit.html">https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts-openai-chatgpt-google-gemini-lawsuit.html</a></li>
<li id="ref-15">European Commission. "Regulatory Framework for AI." <a href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai">https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai</a></li>
<li id="ref-16">Anubis GitHub Repository. TecharoHQ. <a href="https://github.com/TecharoHQ/anubis">https://github.com/TecharoHQ/anubis</a></li>
<li id="ref-17">Nightshade Project Page. University of Chicago. <a href="https://nightshade.cs.uchicago.edu/whatis.html">https://nightshade.cs.uchicago.edu/whatis.html</a></li>
<li id="ref-18">AIPREF Generator. <a href="https://www.aipref.dev/">https://www.aipref.dev/</a></li>
<li id="ref-19">Cloudflare (2025). "Control Content Use for AI Training with Cloudflare's Managed Robots.txt." <a href="https://blog.cloudflare.com/control-content-use-for-ai-training/">https://blog.cloudflare.com/control-content-use-for-ai-training/</a></li>
<li id="ref-20">APNIC Blog (2025). "IETF Setting Standards for AI Preferences." <a href="https://blog.apnic.net/2025/04/08/ietf-setting-standards-for-ai-preferences/">https://blog.apnic.net/2025/04/08/ietf-setting-standards-for-ai-preferences/</a></li>
<li id="ref-21">Computerworld (2025). "IETF Hatching a New Way to Tame Aggressive AI Website Scraping." <a href="https://www.computerworld.com/article/3958587/ietf-hatching-a-new-way-to-tame-aggressive-ai-website-scraping.html">https://www.computerworld.com/article/3958587/ietf-hatching-a-new-way-to-tame-aggressive-ai-website-scraping.html</a></li>
</ol>
