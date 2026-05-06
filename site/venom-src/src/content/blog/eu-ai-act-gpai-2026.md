---
title: "GPAI After Six Weeks: Training-Data Disclosure Reaches Enforcement"
description: "August 2 2026 turned on the EU AI Office's fining power for general-purpose AI obligations. The training-data summary template requires labs to name 'most relevant domain names' — the first time AI providers must publicly disclose where they crawled. Six weeks in, what's visible."
publishDate: 2026-09-22
keywords: [EU AI Act GPAI, Article 53 training data summary, AI Office enforcement, GPAI Code of Practice, Mistral AI Act compliance, Article 53 1 c TDM opt-out]
author: Semiautonomous Systems
---

## Key Takeaways

- August 2 2026 was the **enforcement-power switch**, not the obligations switch. Substantive Article 53 duties for general-purpose AI providers entered force on August 2 2025; the AI Office's authority to impose fines under Articles 88-94 and 101 begins on August 2 2026<sup><a href="#ref-1">1</a></sup>
- The Article 53(1)(d) **training-data summary template** (finalized July 24 2025) requires GPAI providers to publish narrative disclosures of their training corpora, including "the most relevant domain names" used in scraped content. This is the closest the regulation comes to forcing labs to name the publishers they have crawled<sup><a href="#ref-2">2</a></sup>
- The Code of Practice signatory landscape is set: OpenAI, Anthropic, Google, Microsoft, Amazon, Mistral, Cohere, IBM, and ~17 others have signed the full code (26 total). xAI signed only the Safety & Security chapter. **Meta refused.** Apple's status is unclear<sup><a href="#ref-3">3</a></sup>
- Article 53(1)(c) requires GPAI providers to use "state-of-the-art technologies" to detect rightholder reservations of rights. The Commission's stakeholder consultation on machine-readable opt-out protocols closed January 23 2026; the named list is expected by Q3 2026. **AIPREF is the natural HTTP-layer candidate but is not yet on the Commission's published list**<sup><a href="#ref-4">4</a></sup>
- Penalty exposure is significant: up to **€15M or 3% of global annual turnover, whichever is higher**, for GPAI obligation breaches, applied extraterritorially to any model placed on the EU market<sup><a href="#ref-5">5</a></sup>

---

## What August 2 Actually Switched On

The EU AI Act's general-purpose AI provisions are sometimes covered as if August 2 2026 were the obligations deadline. It is not. The substantive duties under Article 53 entered force on August 2 2025. What changed on August 2 2026 is the AI Office's supervisory and fining authority under Articles 88-94 and 101.

Before August 2 2026, the AI Office could request information and engage in dialogue. After August 2 2026, it can issue formal preliminary findings, demand corrective measures, and impose financial penalties on GPAI providers that fail to comply. The substantive duties have not changed; the enforcement teeth have.

For VENOM's audience, four article-level obligations matter:

- **Article 53(1)(a)**: Internal technical documentation (Annex XI). Free and open-source models that are not classified as systemic-risk are carved out
- **Article 53(1)(b)**: Downstream documentation for integrators. Same open-source carve-out
- **Article 53(1)(c)**: Copyright policy. Providers must implement a policy to comply with EU copyright law and "in particular to identify and comply with, including through state-of-the-art technologies, a reservation of rights" expressed under the TDM exception in Article 4(3) of Directive (EU) 2019/790. Applies to **all providers**, including open-source, and applies extraterritorially
- **Article 53(1)(d)**: Training-data summary, published according to the AI Office template. Applies to all providers including open-source

Models placed on the EU market before August 2 2025 have until **August 2 2027** to publish the training-data summary. New models released after August 2 2025 must comply at release. The post-August-2026 enforcement universe is the cohort of models that shipped in the past twelve months: GPT, Claude, Gemini, and Llama family releases from the past year.

## The Training-Data Summary Template

The AI Office published the template on July 24 2025. It is a three-section narrative disclosure, designed to balance transparency against trade-secret protection<sup><a href="#ref-2">2</a></sup>:

1. **General information**: modalities, total data size, training timeframe
2. **List of large publicly available datasets used**: Common Crawl snapshots, Wikipedia, LAION, Pile-derivatives, etc.
3. **Narrative description** of licensed third-party data, scraped content, user-generated data, and synthetic data (including "the most relevant domain names" used for scraped content)

The third section is the line item news publishers care about. Aggregated, narrative-style disclosure is not a per-work manifest, but it is the first time GPAI providers face a regulatory obligation to publicly identify the publisher domains they have crawled. The "most relevant" qualifier creates room for interpretation, but the floor is non-zero. A summary with no domain names risks being judged non-compliant.

Compare this against current public disclosures. Stanford's December 2025 Foundation Model Transparency Index put the industry average at 40 out of 100, down 17 points from 2024, with data acquisition and labor as the weakest categories. OpenAI's GPT-4 system card describes high-level data categories without naming sources. Anthropic's December 2025 transparency report names "Common Crawl, internet datasets, licensed datasets" without identifying domains. Google's Gemini model cards describe categories without specifics. Llama 3 named some sources; Llama 4 less so<sup><a href="#ref-6">6</a></sup>.

The August 2026 template requires more than any of those.

## The Code of Practice Landscape

The Code of Practice is the voluntary compliance pathway, published July 10 2025. Three chapters: Transparency, Copyright (both apply to all GPAI), and Safety & Security (systemic-risk only). Signing the code does not exempt a provider from Article 53; it provides a presumption of conformity until harmonized standards arrive<sup><a href="#ref-3">3</a></sup>.

Signatory state as of mid-2026:

- **Full code signed**: OpenAI, Anthropic, Google, Microsoft, Amazon, IBM, Mistral, Cohere, Aleph Alpha, and approximately 17 others (26 total)
- **Partial**: xAI signed only the Safety & Security chapter and publicly objected to the Transparency and Copyright chapters
- **Refused**: Meta publicly declined to sign
- **Apple**: no public signing record in available coverage as of May 2026

The signing decision matters less than the underlying obligation. Meta's CoP refusal is a signaling action; it does not exempt Llama from Article 53. The first AI Office enforcement letter against any non-signatory will be a notable event regardless of provider, but Meta's refusal makes it the highest-visibility candidate.

## The Article 53(1)(c) Opt-Out Question

Article 53(1)(c) is where the regulation intersects most directly with what VENOM covers: the technical signaling stack publishers use to express training-opt-out preferences.

The text requires "state-of-the-art technologies" to identify rightholder reservations. The regulation does not enumerate what counts. The Commission ran a stakeholder consultation from December 1 2025 through January 23 2026 to gather candidate protocols. The named candidates in the consultation included the W3C TDM Reservation Protocol (TDMRep), C2PA TDM Assertions, ai.txt, Spawning's "Do Not Train" registry, JPEG Trust v2, TDM.ai/Liccium, and Open Rights Data Exchange (Valunode)<sup><a href="#ref-4">4</a></sup>.

**IETF AIPREF is the natural HTTP-layer candidate but was not on the Commission's named list at the May 2026 research date.** The Commission committed to publishing a list of "generally agreed machine-readable reservation-of-rights solutions" reviewed at least every two years. As of mid-2026, the list is expected but not yet published.

Two practical implications:

First, robots.txt alone is not enough. RFC 9309 predates the TDM directive and does not express copyright reservations as such. Article 53(1)(c) effectively pushes providers toward AIPREF-class signals, even if AIPREF itself is not on the eventual list.

Second, the question of what counts as "state-of-the-art" will be litigated. A provider that ignores AIPREF, ai.txt, and TDMRep and trains on opted-out content will face a 53(1)(c) compliance argument. Whether the AI Office, national authorities, or courts treat ignoring AIPREF as a per-se breach depends on whether AIPREF reaches RFC status. The August 31 2026 IESG submission target is the milestone to watch (see [AIPREF After Toronto](/blog/aipref-after-toronto/)).

![Article 53 obligations effective Aug 2 2025; AI Office fining power switch on Aug 2 2026; CoP signatories 26 full + xAI partial; Meta refused; penalty exposure up to 3 percent global turnover or 15 million euros under Article 101](/images/diagrams/eu-ai-act-gpai-timeline.png)

## What to Watch in the First Six Weeks

By late September 2026, six categories of evidence should begin to be visible:

**Provider summaries.** OpenAI, Anthropic, Google, Mistral, Microsoft, and Amazon each shipped at least one new flagship model in the August 2025 - August 2026 window. Each must publish an Article 53(1)(d) summary at release per the AI Office template. The cascade of "EU training-data summary" pages on provider sites is the first concrete artifact to track.

**Mistral as the first test case.** Mistral is EU-domiciled and has historically minimized training-data disclosure. Mistral publicly requested a two-year delay on the GPAI obligations and was rejected. Their first published summary is the most newsworthy single artifact for the AI Office's enforcement posture.

**Meta's response.** Meta refused the CoP. Meta cannot refuse Article 53. Either Meta publishes a summary for any post-August-2025 Llama release, or the absence becomes the AI Office's first public preliminary-finding letter under Articles 88-93.

**The Commission's TDM opt-out protocol list.** Expected Q3 2026. AIPREF inclusion or exclusion is the signal VENOM readers should track. Inclusion strengthens the standardized HTTP-layer path; exclusion creates space for a competing protocol.

**The first AI Office information requests.** Articles 91 and 92 give the office authority to demand information and request model evaluations. Formal fines are unlikely inside six weeks (procedurally, the Article 88-93 process requires preliminary findings plus a right to respond), but information requests are realistic. Whether any of these become public is the open question.

**Domain-list quality.** The "most relevant domain names" requirement creates the first regulatory window into which publishers each lab has crawled. Whether the published summaries name specific publishers (the Wall Street Journal, Le Monde, Reddit, Stack Overflow, GitHub) or remain at category level (general news, code repositories) determines whether the disclosure has bite.

## Penalty Exposure and Procedure

Article 101 sets the GPAI-specific cap: up to **€15M or 3% of global annual turnover, whichever is higher**, for GPAI obligation breaches. Article 99 governs broader AI Act breaches (prohibited uses) at a higher cap of €35M or 7%, whichever is higher<sup><a href="#ref-5">5</a></sup>.

Procedure under Articles 88-94:

1. AI Office investigation, possibly triggered by complaint, monitoring, or information request
2. Preliminary findings issued to the provider
3. Right to respond
4. Final decision, with corrective measures or fine
5. Right of judicial review at the European Court of Justice

Open-source models receive the carve-out on Article 53(1)(a) and (b) only. The copyright policy and training-data summary obligations apply to open-source providers as well. Apple's open-weights releases, Mistral's open-weight families, and any Llama release that remains open are all in scope.

Extraterritoriality matters for the global picture. Any GPAI model placed on the EU market is subject to Article 53 regardless of where training occurred. A model trained in California and deployed via API to EU customers is subject to the same disclosure obligations as one trained in Paris.

## Implications for Publishers and the Signaling Stack

Three concrete implications for the publishers and infrastructure operators VENOM covers.

**Publishers gain a regulatory hook for opt-out compliance.** Before Article 53(1)(c) became enforceable, a publisher who blocked GPTBot via robots.txt and saw their content cited anyway had no clean recourse beyond litigation. After August 2 2026, the publisher has a complaint pathway through the AI Office. Whether this translates to actionable enforcement is the open question, but the legal architecture exists.

**AIPREF's standards trajectory now has regulatory leverage.** If AIPREF lands on the Commission's TDM-opt-out list, providers who ignore it face a stronger 53(1)(c) compliance argument than providers who ignore robots.txt alone. The August 31 2026 IESG submission target for the AIPREF vocabulary is the milestone that matters most for whether AIPREF becomes the EU's de facto opt-out signal.

**The training-data summary creates a new public artifact for journalism and research.** "Most relevant domain names" disclosed in compliance with Article 53(1)(d) becomes citable evidence in adjacent cases. NYT v. OpenAI, Reddit v. Perplexity, and Kadrey v. Meta will all reference whichever summaries land in 2026-2027. The disclosure obligation creates a forensic record that didn't exist before.

For background on the broader signaling stack, see [Understanding AIPREF](/blog/understanding-aipref-ietf-standard/) and [AIPREF After Toronto](/blog/aipref-after-toronto/). For where the data the regulation now requires labs to disclose actually comes from, see [Where AI Training Data Actually Comes From in 2026](/blog/training-data-ecosystem-2026/).

---

*Last updated: September 2026*

## References

<ol class="references">
<li id="ref-1">EU Artificial Intelligence Act, Articles 53, 55, 88-94, 99, 101. <a href="https://artificialintelligenceact.eu/article/53/">https://artificialintelligenceact.eu/article/53/</a></li>
<li id="ref-2">European Commission, AI Office (July 24 2025). "Template for the Public Summary of Training Content for General-Purpose AI Models." <a href="https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their">https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their</a></li>
<li id="ref-3">European Commission. "GPAI Code of Practice." <a href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai">https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai</a> and <a href="https://code-of-practice.ai/">https://code-of-practice.ai/</a></li>
<li id="ref-4">European Commission (Dec 1 2025 - Jan 23 2026). "Consultation on Protocols for Reserving Rights for Text and Data Mining." <a href="https://digital-strategy.ec.europa.eu/en/consultations/commission-launches-consultation-protocols-reserving-rights-text-and-data-mining-under-ai-act-and">https://digital-strategy.ec.europa.eu/en/consultations/commission-launches-consultation-protocols-reserving-rights-text-and-data-mining-under-ai-act-and</a></li>
<li id="ref-5">EU AI Act Article 101 (GPAI penalties): up to €15M or 3% of global annual turnover, whichever is higher. <a href="https://artificialintelligenceact.eu/article/101/">https://artificialintelligenceact.eu/article/101/</a></li>
<li id="ref-6">Stanford HAI / FMTI (Dec 2025). "Foundation Model Transparency Index." <a href="https://crfm.stanford.edu/fmti/December-2025/index.html">https://crfm.stanford.edu/fmti/December-2025/index.html</a></li>
<li id="ref-7">Mayer Brown (Aug 2025). "EU AI Act: New Rules on General-Purpose AI." <a href="https://www.mayerbrown.com/en/insights/publications/2025/08/eu-ai-act-news-rules-on-general-purpose-ai-start-applying-guidelines-and-template-for-summary-of-training-data-finalized">https://www.mayerbrown.com/en/insights/publications/2025/08/eu-ai-act-news-rules-on-general-purpose-ai-start-applying-guidelines-and-template-for-summary-of-training-data-finalized</a></li>
<li id="ref-8">Clifford Chance (Oct 2025). "Copyright Compliance under the EU AI Act for GPAI Model Providers." <a href="https://www.cliffordchance.com/insights/resources/blogs/ip-insights/2025/10/copyright-compliance-under-the-eu-ai-act-for-gpai-model-providers.html">https://www.cliffordchance.com/insights/resources/blogs/ip-insights/2025/10/copyright-compliance-under-the-eu-ai-act-for-gpai-model-providers.html</a></li>
<li id="ref-9">Euronews (Jul 2025). "Meta Won't Sign EU's AI Code." <a href="https://www.euronews.com/my-europe/2025/07/23/meta-wont-sign-eus-ai-code-but-who-will">https://www.euronews.com/my-europe/2025/07/23/meta-wont-sign-eus-ai-code-but-who-will</a></li>
<li id="ref-10">IAPP. "AI Act Omnibus: What Just Happened and What Comes Next." <a href="https://iapp.org/news/a/ai-act-omnibus-what-just-happened-and-what-comes-next">https://iapp.org/news/a/ai-act-omnibus-what-just-happened-and-what-comes-next</a></li>
</ol>
