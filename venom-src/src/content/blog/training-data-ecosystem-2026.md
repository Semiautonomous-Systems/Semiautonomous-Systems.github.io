---
title: "Where AI Training Data Actually Comes From in 2026"
description: "A canonical reference for the six-layer AI training-data stack: Common Crawl, lab crawlers, curated open datasets, licensed feeds, contractor pipelines, and synthetic data. With the comprehensive licensing-deal table, current numbers, and what the labs do not disclose."
publishDate: 2026-08-11
keywords: [AI training data sources, Common Crawl 2026, AI licensing deals, FineWeb dataset, Bartz Anthropic settlement, RLHF contractors, synthetic data AI training]
author: Semiautonomous Systems
---

## Key Takeaways

- The 2026 frontier-model training stack has six functional layers: open web crawls, curated open datasets, licensed publisher and platform feeds, code corpora, contractor-generated data, and synthetic data. Most frontier models draw from all six<sup><a href="#ref-1">1</a></sup>
- **Composition shares for any frontier model after GPT-3 are not public.** GPT-3's disclosed 60% Common Crawl share remains the only hard public datapoint. GPT-4, GPT-5, Claude Opus/Sonnet 4.x, Gemini 2.5/3, Llama 4, and Grok all reference "publicly available data" without numeric breakdowns<sup><a href="#ref-2">2</a></sup>
- Common Crawl ran ~2.0-2.2B pages and 344-379 TiB per monthly snapshot in early 2026. Total archive: 9.5+ PB and 300B+ pages since 2008. CCBot is the second-most-blocked AI agent on top-10K domains, behind GPTBot<sup><a href="#ref-3">3</a></sup>
- Bartz v. Anthropic settled $1.5B in September 2025 — roughly $3,000 per book across ~500K works. The court drew a line: training on legally acquired books is fair use, pirated acquisition is not. The Kadrey v. Meta case is still active in 2026 on related LibGen evidence<sup><a href="#ref-4">4</a></sup><sup><a href="#ref-5">5</a></sup>
- The contractor labor market — Surge AI ($1.2B revenue, $25B valuation), Scale AI ($29B post-Meta), Mercor ($450M+ ARR) — is now plausibly comparable in spend to a meaningful fraction of GPU training compute<sup><a href="#ref-6">6</a></sup><sup><a href="#ref-7">7</a></sup>

---

## The Six-Layer Stack

Frontier-model training data in 2026 is no longer a single pipeline. It is six layers running in parallel, with the center of gravity moving away from raw web crawls and toward licensed feeds, contractor-generated data, and synthetic data.

The layers:

1. **Open web crawls** — Common Crawl plus lab-operated crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, OAI-SearchBot)
2. **Curated open datasets** — FineWeb, FineWeb-Edu, RefinedWeb, Dolma, RedPajama-V2, The Stack v2; legacy: The Pile, C4
3. **Licensed publisher and platform feeds** — News Corp, Reddit, Shutterstock, AP, FT, Vox, Axel Springer, Stack Overflow, and dozens more
4. **Code corpora** — The Stack v2 (BigCode), GitHub-derived crawls, internal lab code archives
5. **Human-curated and contractor-generated data** — RLHF preference data, SFT instruction data, expert demonstrations, red-team data from Surge, Scale, Mercor, Outlier, Invisible, Toloka
6. **Synthetic and self-generated data** — model-generated rephrasings, distillation traces, reasoning traces, multimodal pairs

The narrative people still tell, "AI is trained on the web," was accurate for GPT-3. It is misleading for any frontier model in 2026. Public web text is no longer the binding constraint. Quality, reasoning traces, and verifiable answers are.

![Six-layer AI training data stack: open web crawls, curated open datasets, licensed feeds, code corpora, contractor-generated data, synthetic data — with frontier models drawing from all six](/images/diagrams/training-data-six-layer-stack.png)

## Common Crawl in 2026

Common Crawl remains the foundation of every public dataset. Its current numbers:

- **Total archive**: 9.5+ PB cumulative, 300B+ pages captured since 2008
- **Monthly cadence**: ~2.0-2.2B pages and ~344-379 TiB uncompressed per snapshot. March 2026 ran 1.97B pages / 344.64 TiB; April 2026 ran 2.19B pages / 379.2 TiB
- **Web graph**: Combined Feb-Apr 2026 graph has 269M host nodes and 9.4B edges; 124.6M domain nodes and 4.8B edges<sup><a href="#ref-3">3</a></sup>

The blocking trajectory is the more interesting story. Reputable-site AI blocking rose from 23% in September 2023 to roughly 60% by May 2025 per a public arXiv study. By August 2025, Cloudflare reported 2.5M+ websites had opted out of AI crawling. CCBot (Common Crawl's bot) is the second-most-blocked AI agent on top-10K domains, behind only GPTBot<sup><a href="#ref-8">8</a></sup>.

Two important caveats. First, blocking CCBot prevents future inclusion but does not remove content from prior snapshots. AI labs retain access to historical dumps regardless of current robots.txt posture. Second, publishers blocking AI crawlers via robots.txt experienced a roughly 23.1% monthly visit decline in early 2026, with no corresponding drop in AI citations. Blocking exits the pipeline going forward but loses the traffic too.

The frontier-model share question (what percentage of any specific 2026 model's training is Common Crawl) is unanswerable from public data. Mozilla Foundation's analysis showed Common Crawl was 60% of GPT-3's weighted training mix. No equivalent disclosure exists for any successor. Best inference: Common Crawl (or CC-derived sets like FineWeb / RefinedWeb) remains a foundational input but its proportion has fallen as licensed feeds and synthetic data have grown. The exact share is unknown.

## What Each Lab Discloses

What each lab discloses, drawn from public model cards, court filings, and announced deals:

- **OpenAI.** GPT-3 (2020) was 60% Common Crawl filtered, 22% WebText2, 16% Books1+Books2, 3% Wikipedia. GPT-4 and GPT-5 have no composition disclosed. Crawlers: GPTBot, OAI-SearchBot, ChatGPT-User. OpenAI internally acknowledged using Whisper to transcribe 1M+ hours of YouTube as ToS-violating; class actions are ongoing<sup><a href="#ref-9">9</a></sup>. 18+ publisher deals globally.

- **Anthropic.** Stanford's Foundation Model Transparency Index (December 2025) confirms five training inputs: publicly available internet data (cutoff March 2025 for Opus 4 / Sonnet 4), third-party non-public data, contractor-labeled data, opted-in user data (policy from September 2025), and internally generated data. Crawlers: ClaudeBot, anthropic-ai. The Bartz settlement (see below) is the defining input on books<sup><a href="#ref-10">10</a></sup>.

- **Google / DeepMind.** Gemini draws from web crawl, licensed corpora, Google product data, YouTube transcripts and frames, and synthetic data. Google confirmed the YouTube use to CNBC in June 2025: a "subset" of videos, used for both Gemini and Veo 3. Google-Extended is the AI-training opt-out, separate from search indexing. The Reddit deal ($60M/yr, February 2024) is in renewal negotiation with Reddit pushing for dynamic pricing. Springer Nature licensed for $23M one-time (July 2024)<sup><a href="#ref-11">11</a></sup>.

- **Meta.** Llama (disclosed 2023) trains on Common Crawl via CCNet, plus C4, GitHub, Wikipedia (20 languages), Project Gutenberg, Books3, ArXiv, and Stack Exchange. Court filings in Kadrey v. Meta (unsealed March 2024) showed CEO sign-off on a LibGen download of 7.5M+ books and engineer scripts to strip copyright notices. The case is active in 2026 with Turow et al. proceeding<sup><a href="#ref-5">5</a></sup>. Meta acquired a 49% stake in Scale AI for $14.8B in June 2025 ($29B implied valuation). A multi-publisher push in late 2025 added People Inc, CNN, Fox News, Fox Sports, USA Today network, Le Monde, and others; the News Corp deal runs up to $50M/yr (March 2026)<sup><a href="#ref-12">12</a></sup>.

- **xAI.** Minimal disclosure. Grok trains on the X corpus (proprietary, real-time), web crawl, and synthetic data per public statements. No publisher deals publicly disclosed as of May 2026.

- **Apple.** Applebot crawl ("hundreds of billions of pages"), licensed publisher data, curated open-source datasets, and synthetic data. Does not use private user data. Applebot-Extended is the AI-training opt-out. Named in Books3 / YouTube Subtitles-derived suits via The Pile.

- **Mistral.** No historical dataset disclosure. Under EU AI Act, Mistral Large must publish a summary of copyrighted training data. AFP multi-year deal (2025) supplies Le Chat with 2,300 stories per day across six languages.

## The Licensing Deals Table

This is the most-requested artifact in coverage of AI training data, because it shows where the money has actually flowed. Public deals as of May 2026:

| Counterparty | Lab | Value | Year | Scope |
|---|---|---|---|---|
| News Corp | OpenAI | $250M+ over 5 yrs | May 2024 | WSJ, NY Post, Times of London, archives |
| News Corp | Meta | up to $50M/yr | Mar 2026 | AI products |
| Reddit | Google | $60M/yr (renegotiating) | Feb 2024 → 2026 | Real-time content for Gemini |
| Reddit | OpenAI | ~$70M/yr (est.) | 2024 | Comparable structure |
| Axel Springer | OpenAI | "tens of millions EUR/yr" | Dec 2023 | Politico, Bild, Business Insider |
| Financial Times | OpenAI | $5-10M/yr | Apr 2024 | Full archive incl. paywall |
| Le Monde | OpenAI | undisclosed | Mar 2024 | Full corpus |
| AP | OpenAI | undisclosed | Jul 2023 | First major news deal |
| AP | Google | undisclosed | 2025 | Gemini real-time |
| Vox Media | OpenAI | undisclosed | May 2024 | Vox, Verge, Eater, NY Mag |
| The Atlantic | OpenAI | undisclosed | May 2024 | Articles + product input |
| Dotdash Meredith | OpenAI | $16M+/yr fixed | May 2024 | People, Investopedia, Allrecipes |
| Reuters | (Meta likely) | undisclosed (multi-tier, inferred from filings) | 2024 | Inferred from filings |
| Springer Nature | Google | $23M one-time | Jul 2024 | Academic |
| Wiley | undisclosed lab | $23M one-time | 2024 | Academic |
| Taylor & Francis | Microsoft | $10M upfront + recurring | 2024 | Academic |
| Shutterstock | OpenAI | up to $250M by 2027 | 2024 | Visual; 6-yr |
| Shutterstock | Meta, Amazon, Google, Apple | $104M (2023) → $138M (2024) | Ongoing | Visual |
| Getty Images | Perplexity | undisclosed | Oct 2025 | Image display |
| Stack Overflow | Google, OpenAI | undisclosed | 2024 | Q&A |
| AFP | Mistral | multi-year | 2025 | 2,300 stories/day, 6 langs |
| The Guardian | OpenAI | undisclosed | 2025 | Citations + summaries |
| Washington Post | OpenAI | undisclosed | 2025 | Summaries, quotes, links |
| Schibsted Media | OpenAI | undisclosed | 2025 | Norwegian news |
| Axios | OpenAI | 3-yr deal + newsroom funding | 2025 | First newsroom-funding deal |
| NYT | Amazon | undisclosed | 2025 | Alexa / Rufus (NYT separately suing OpenAI) |
| Condé Nast | Amazon | multi-year | 2025 | Rufus shopping assistant |
| Hearst | Amazon | multi-year | 2025 | Rufus shopping assistant |
| People Inc, CNN, Fox News, USA Today, Le Monde, etc. | Meta | undisclosed | Dec 2025 | Multi-publisher push |

OpenAI maintains 18+ publisher deals globally. Microsoft's Publisher Content Marketplace (pilot September 2025) introduces usage-based royalties paid per token. Perplexity Revenue Share (July 2024) pays variable ad-revenue share to cited publishers. Reddit was the most-cited domain by Google AI Overviews and Perplexity from August 2024 to June 2025, which strengthens its negotiating leverage<sup><a href="#ref-13">13</a></sup>.

## Public Dataset Trajectories

Composition of the largest open datasets a non-frontier lab could train on today:

| Dataset | Tokens | Year | Notes |
|---|---|---|---|
| FineWeb | 18.5T (orig 15T) | Apr 2024 | 96 CC dumps 2013-2024; ODC-By 1.0 |
| FineWeb-Edu | 1.3T | 2024 | Quality-filtered FineWeb (~92% removed); matches MMLU of models trained on 10× more C4/Dolma tokens |
| FineWeb-2 | multilingual | 2025 | Multilingual extension |
| RedPajama-V2 | 30T raw (~20T post-filter) | 2023 | 84 CC crawls; largest by raw token count |
| Dolma (AI2) | 3T → 5T+ | 2023-25 | Web + academic + code + books; powers OLMo |
| RefinedWeb (TII) | 600B public / 3-6T full | 2023 | CC + MDR pipeline |
| The Stack v2 (BigCode) | 67.5TB / 3.3-4.3T training tokens | 2024 | 600+ languages, permissive licenses |
| The Pile (legacy) | ~340B | Dec 2020 | Books3 DMCA'd Aug 2023 |
| C4 (legacy) | ~150B | 2019 | CC filtered |

The largest open dataset in 2026 is **RedPajama-V2 by raw tokens (30T)** and **FineWeb by clean tokens (18.5T)**. The most consequential finding is that quality-filtered subsets like FineWeb-Edu (1.3T tokens) demonstrably outperform 10× larger raw datasets on reasoning benchmarks. Frontier labs have moved decisively toward filter-then-mix pipelines over scale-only ingestion<sup><a href="#ref-14">14</a></sup>.

## Synthetic Data

Synthetic data is the layer growing fastest. The strongest public case study is Microsoft's Phi-4 (December 2024): 400B synthetic tokens across 50 categories, 14B parameters, matches Llama-3.1-405B on reasoning benchmarks<sup><a href="#ref-15">15</a></sup>. A separate scaling-law paper (arXiv 2510.01631) found that 1/3 rephrased synthetic plus 2/3 natural web speeds convergence by 5-10× to equal validation loss at large data budgets.

Gartner reported in 2024 that 60% of data used in AI/analytics projects was synthetic, up from 1% in 2021 — but this figure includes non-frontier-pretraining uses and deserves caution. Epoch AI's analysis projects exhaustion of quality public text between 2026 and 2032 with 80% confidence, with the effective stock estimated at ~300T tokens<sup><a href="#ref-16">16</a></sup>.

For frontier pretraining specifically, no lab discloses synthetic share. Best-public-knowledge inference range for synthetic share of frontier pretraining plus post-training compute: **20-50%**, growing. **This range is an inference, not a disclosure.**

## The Contractor Layer

The fastest-growing and least-discussed input is human-curated data from contractor pipelines. Current revenue and valuation figures:

| Vendor | Revenue / Run-rate | Valuation | Notes |
|---|---|---|---|
| Surge AI | $1.0-1.2B (2024) | $25B (Jul 2025) | Bootstrapped; surpassed Scale; 50K experts |
| Scale AI | $870M (2024), $2B target (2025) | $29B (Jun 2025) | Meta 49% stake |
| Mercor | $450-500M ARR (Oct 2025) | $10B (Series C) | 30K+ experts; $1.5M/day to contractors |
| Snorkel AI | $36.8M (2024) → $148M (2025) | $1B (2021) | Programmatic labeling |
| Toloka AI | undisclosed | n/a | 195+ countries; Yandex spinoff |
| Appen | $198.1M (2025, -12.8%) | down 99% from peak | Lost Google Jan 2024; in decline |

The RLHF platform market is projected to grow from $2.8B in 2025 to $18.6B by 2034<sup><a href="#ref-7">7</a></sup>. The structural shift is what matters. Pre-2023 frontier training was bottlenecked by tokens; post-2024 it is bottlenecked by quality tokens — meaning licensed data, expert-generated demonstrations, and synthetic / distilled reasoning. Compute spend on labeling contractors plus licensing is now plausibly comparable to a meaningful fraction of GPU spend at the marginal model.

## The Lawsuits That Set the Boundary

Two 2025 rulings define the legal posture for 2026.

**Bartz v. Anthropic** settled $1.5B in September 2025, preliminarily approved by Judge Alsup on September 25. The settlement covered ~500,000 books from LibGen and Pirate Library Mirror at roughly $3,000 per book. Anthropic must destroy the original torrented files. Judge Alsup's reasoning matters more than the dollar figure: training on legally acquired books is fair use; pirated acquisition is not. The settlement does not release future-act claims or output-based claims<sup><a href="#ref-4">4</a></sup>.

**Getty Images v. Stability AI** (UK High Court, November 4 2025) rejected secondary copyright infringement and confirmed Getty works were used in training, but ruled the model itself does not "store" the works as infringing copies. The court upheld trademark infringement for outputs containing Getty marks<sup><a href="#ref-17">17</a></sup>.

Active in 2026: Kadrey v. Meta on LibGen evidence; New York Times v. OpenAI / Microsoft; Britannica / Merriam-Webster v. OpenAI (March 2026); David Millette class actions vs. Google and OpenAI on YouTube transcription; Petryazhna v. OpenAI on YouTube. The Anthropic settlement is the precedent everyone is litigating around.

## What's Still Not Public

Six things the public record does not contain:

- **Composition shares for any post-GPT-3 frontier model.** No numeric breakdown for GPT-4 / 5, Claude 4.x, Gemini 2.5 / 3, Llama 4, or Grok.
- **Licensing values** for many deals: AP/OpenAI, Atlantic, Vox, Le Monde, Reuters, Apple's publisher list, all 2025 Meta deals.
- **Synthetic data share of frontier pretraining.** No lab discloses.
- **YouTube subset sizes** Google uses for Gemini / Veo training.
- **Internal lab crawler corpora.** GPTBot, ClaudeBot, Applebot-Extended dataset sizes never disclosed.
- **Books and academic sources beyond licensed deals.** Strong inference of pirate-library ingestion across multiple labs; only Anthropic and Meta have litigated specifics.

What is blocked or restricted: News Corp content for non-licensed labs; Reddit for non-Google, non-OpenAI labs; paywalled academic journals; most major newsrooms post-2024; Cloudflare-managed sites under default-deny robots.txt; 2.5M+ sites that opted out of AI crawling.

## What This Means

"Where AI training data comes from" in 2026 is a question about *which deals, which contractors, and which synthetic pipelines* — far more than "which crawl." The center of gravity is no longer the open web. It is licensed publisher feeds, contractor-curated demonstrations, and self-generated reasoning traces. The web is still there in the foundation, but it is a smaller share of what makes a frontier model better than its predecessor.

For publishers, the implication is that the licensing path matters more than the blocking path. Blocking AI crawlers via robots.txt prevents future inclusion but loses the traffic too. Licensing extracts value but binds the lab. The choice is strategic, not technical. For background on the standardized signaling layer that makes both paths cleaner, see [Understanding AIPREF](/blog/understanding-aipref-ietf-standard/) and [AIPREF After Toronto](/blog/aipref-after-toronto/). For the unit economics behind why scraping continues alongside licensing, see [How Much Does It Cost to Scrape the Web at Scale?](/blog/scraping-economics-2026/).

---

*Last updated: August 2026*

## References

<ol class="references">
<li id="ref-1">Common Crawl Foundation. "Overview." <a href="https://commoncrawl.org/overview">https://commoncrawl.org/overview</a></li>
<li id="ref-2">Mozilla Foundation. "Common Crawl and Generative AI." <a href="https://www.mozillafoundation.org/en/research/library/generative-ai-training-data/common-crawl/">https://www.mozillafoundation.org/en/research/library/generative-ai-training-data/common-crawl/</a></li>
<li id="ref-3">Common Crawl. "Crawl Statistics 2026." <a href="https://commoncrawl.github.io/cc-crawl-statistics/">https://commoncrawl.github.io/cc-crawl-statistics/</a></li>
<li id="ref-4">NPR (Sept 2025). "Anthropic's $1.5B Authors Settlement." <a href="https://www.npr.org/2025/09/05/g-s1-87367/anthropic-authors-settlement-pirated-chatbot-training-material">https://www.npr.org/2025/09/05/g-s1-87367/anthropic-authors-settlement-pirated-chatbot-training-material</a></li>
<li id="ref-5">TechCrunch (Jan 2025). "Zuckerberg Approved LibGen for Llama, Filing Claims." <a href="https://techcrunch.com/2025/01/09/mark-zuckerberg-gave-metas-llama-team-the-ok-to-train-on-copyrighted-works-filing-claims/">https://techcrunch.com/2025/01/09/mark-zuckerberg-gave-metas-llama-team-the-ok-to-train-on-copyrighted-works-filing-claims/</a></li>
<li id="ref-6">Sacra. "Surge AI Revenue and Valuation." <a href="https://sacra.com/c/surge-ai/">https://sacra.com/c/surge-ai/</a></li>
<li id="ref-7">TechCrunch (Oct 2025). "Mercor Quintuples Valuation to $10B in Series C." <a href="https://techcrunch.com/2025/10/27/mercor-quintuples-valuation-to-10b-with-350m-series-c/">https://techcrunch.com/2025/10/27/mercor-quintuples-valuation-to-10b-with-350m-series-c/</a></li>
<li id="ref-8">Cloudflare. "AI Bot Blocking Statistics 2025." <a href="https://blog.cloudflare.com/">https://blog.cloudflare.com/</a></li>
<li id="ref-9">New York Times (Apr 2024). "How Tech Giants Cut Corners to Harvest Data for AI." YouTube Whisper transcription coverage. <a href="https://www.nytimes.com/">https://www.nytimes.com/</a></li>
<li id="ref-10">Stanford HAI / FMTI (Dec 2025). "Anthropic Transparency Report." <a href="https://crfm.stanford.edu/fmti/December-2025/company-reports/Anthropic_FinalReport_FMTI2025.html">https://crfm.stanford.edu/fmti/December-2025/company-reports/Anthropic_FinalReport_FMTI2025.html</a></li>
<li id="ref-11">CNBC (Jun 2025). "Google Used YouTube Videos to Train Gemini and Veo 3." <a href="https://www.cnbc.com/2025/06/19/google-youtube-ai-training-veo-3.html">https://www.cnbc.com/2025/06/19/google-youtube-ai-training-veo-3.html</a></li>
<li id="ref-12">Press Gazette. "People Inc Signs AI Licensing Deal with Meta." <a href="https://pressgazette.co.uk/north-america/people-inc-signs-ai-licensing-deal-with-meta/">https://pressgazette.co.uk/north-america/people-inc-signs-ai-licensing-deal-with-meta/</a></li>
<li id="ref-13">Columbia Journalism Review. "Reddit's AI Licensing Position." <a href="https://www.cjr.org/analysis/reddit-winning-ai-licensing-deals-openai-google-gemini-answers-rsl.php">https://www.cjr.org/analysis/reddit-winning-ai-licensing-deals-openai-google-gemini-answers-rsl.php</a></li>
<li id="ref-14">HuggingFace. "FineWeb Dataset." <a href="https://huggingface.co/datasets/HuggingFaceFW/fineweb">https://huggingface.co/datasets/HuggingFaceFW/fineweb</a></li>
<li id="ref-15">Microsoft Research (Dec 2024). "Phi-4 Technical Report." <a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2024/12/P4TechReport.pdf">https://www.microsoft.com/en-us/research/wp-content/uploads/2024/12/P4TechReport.pdf</a></li>
<li id="ref-16">Epoch AI. "Will We Run Out of Data?" <a href="https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data">https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data</a></li>
<li id="ref-17">Mayer Brown (Nov 2025). "Getty Images v. Stability AI: What the High Court's Decision Means." <a href="https://www.mayerbrown.com/en/insights/publications/2025/11/getty-images-v-stability-ai-what-the-high-courts-decision-means-for-rights-holders-and-ai-developers">https://www.mayerbrown.com/en/insights/publications/2025/11/getty-images-v-stability-ai-what-the-high-courts-decision-means-for-rights-holders-and-ai-developers</a></li>
<li id="ref-18">Authors Guild. "What Authors Need to Know About the Anthropic Settlement." <a href="https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/">https://authorsguild.org/advocacy/artificial-intelligence/what-authors-need-to-know-about-the-anthropic-settlement/</a></li>
<li id="ref-19">Digiday. "Timeline of Major Publisher-AI Deals 2025." <a href="https://digiday.com/media/a-timeline-of-the-major-deals-between-publishers-and-ai-tech-companies-in-2025/">https://digiday.com/media/a-timeline-of-the-major-deals-between-publishers-and-ai-tech-companies-in-2025/</a></li>
<li id="ref-20">Together AI. "RedPajama-V2 Announcement." <a href="https://www.together.ai/blog/redpajama-data-v2">https://www.together.ai/blog/redpajama-data-v2</a></li>
</ol>
