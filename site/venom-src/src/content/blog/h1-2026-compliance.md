---
title: "AI Crawler Compliance, Mid-2026: The Blocked-but-Cited Trap"
description: "Publishers that blocked AI crawlers via robots.txt lost 23.1% of monthly traffic on average, and got only weakly correlated reductions in AI citation. The 2026 data inverts the case for blocking-as-defense."
publishDate: 2026-06-02
keywords: [AI crawler compliance, robots.txt blocked but cited, Zhao Berman publishers, BuzzStream AI citations, Cloudflare Radar 2026, Reddit Perplexity scraping]
author: Semiautonomous Systems
---

## Key Takeaways

- Two H1 2026 studies invert the case for blocking AI crawlers via robots.txt. Zhao and Berman (Rutgers/Wharton, SSRN, Dec 2025) show publishers that blocked LLM crawlers experienced a persistent **23.1% decline in monthly visits** and a 13.9% decline in human-only browsing. BuzzStream (March 2026, 4M citations) shows AI citation rates only weakly correlate with whether a publisher allowed crawling<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- Cloudflare Radar 2026: AI crawlers now make up **~22% of all bot traffic**. Cloudflare's published figures put the training/mixed-purpose share of AI bot traffic at roughly **80%**, with search-related and user-query response making up the remainder<sup><a href="#ref-3">3</a></sup>
- TollBit's Q1 2026 quarterly was not yet published as of mid-2026. The Q4 2025 baseline (30% robots.txt non-compliance) remains the most recent industry-wide figure
- AIPREF production deployment remains effectively zero. The vocab-05 draft expired June 4 2026; vocab-06 (post-Toronto) is the live document. A competing individual draft (`draft-romm-aipref-contentsignals`) is now circulating, indicating vocabulary debate is not settled<sup><a href="#ref-4">4</a></sup>
- Reddit v. Perplexity is at the motion-to-dismiss stage. Reddit's amended complaint (Feb 6 2026) alleges SerpApi accessed ~2B Google search results containing Reddit content; Oxylabs ~781M; AWMProxy ~482M. SerpApi and Perplexity moved to dismiss (~March 13 2026); Reddit opposed (April 17 2026); oral argument is set for June 30 2026 before Judge Engelmayer. Discovery has not begun<sup><a href="#ref-5">5</a></sup>

---

## Where We Are as of Mid-2026

The March 2026 piece on AI crawler compliance ([The AI Crawler Compliance Crisis](/blog/ai-crawler-compliance-crisis/)) tracked the trajectory through Q4 2025: TollBit data showed robots.txt non-compliance climbing from 3.3% in Q4 2024 to 30% in Q4 2025, with a fourfold increase in sites adding GPTBot to disallow lists. The implicit recommendation was: keep blocking, signaling matters, the next decision points are IETF 125 Shenzhen (March) and the Toronto interim (April).

As of mid-2026, two things complicate that recommendation. The headline quarterly numbers are stale: TollBit's Q1 2026 quarterly hasn't shipped, and Q2 2026 likely won't be public until late September. And two recent studies measure something the March post couldn't: what blocking actually buys publishers.

Both studies reach the same conclusion by different methods. Blocking AI crawlers reduces traffic. It does not reliably reduce AI citation. The trade publishers thought they were making is not the trade they got.

## What the H1 Studies Found

**Zhao and Berman** (Rutgers Business School / Wharton, SSRN, December 31 2025) ran a staggered difference-in-differences analysis covering October 2022 through June 2025. Publishers that blocked LLM crawlers via robots.txt experienced a persistent **23.1% decline in log-monthly visits** (SimilarWeb) and a **13.9% decline in human-only browsing** (Comscore). The effect held across publisher categories and persisted over time. This is not a transient adjustment<sup><a href="#ref-1">1</a></sup>.

The 23.1% number is large and asymmetric. Blocking is a binary decision; the traffic loss is continuous. A publisher that blocks loses real revenue. A publisher that doesn't block has no comparable lever to pull.

**BuzzStream** (March 19, 2026) studied **4 million citations across 3,600 prompts** in AI answer engines. They found citation rates only weakly correlated with whether the publisher allowed crawling. The mechanisms identified: Common Crawl historical archives, robots.txt non-compliance among AI bots themselves, and search-API intermediaries (SerpApi-class) that decouple "did the publisher allow this bot" from "did the AI engine cite this content"<sup><a href="#ref-2">2</a></sup>.

A third data point: the **Reuters Institute** "Trends and Predictions 2026" (January 2026) put Google Search referrals to news publishers down 38% in the US. Separately, **NewzDash** (reported March 2026) found web search's share of overall referrals fell from 51% to 27% between 2023 and Q4 2025. The traffic problem is not only AI scraping. The search-traffic baseline is collapsing simultaneously.

Blocking is a costly action that does not produce the benefit publishers expected.

## What Cloudflare Radar Shows

Cloudflare Radar's 2026 numbers describe the bot ecosystem publishers are actually facing<sup><a href="#ref-3">3</a></sup>:

- AI crawlers account for **~22% of all bot traffic**, second-largest category behind search engines
- Of that AI traffic, Cloudflare's published figures put the training/mixed-purpose share at roughly **80%**, with the remainder split between search-related and user-query response
- GPTBot accounted for roughly **9.84%** of AI bot traffic as of April 2026, on a declining trend

The GPTBot share decline does not mean OpenAI is scraping less. **ChatGPT-User**, the RAG/inference-time bot distinct from GPTBot, remained the worst offender on per-page scrape rate through Q4 2025 (5x Meta and 16x Perplexity). The composition of AI bot traffic is shifting from training-time scrapes to inference-time retrieval. That shift sits outside the bot-name blocklists most operators have built around.

**Meta-ExternalAgent** continues to lead total share. **Googlebot reclassification** affects the numbers: Cloudflare now treats Googlebot as partially AI-purpose due to AI Overviews and Gemini grounding, which has increased "AI bot" totals without a real volume change.

![AI bot traffic, Cloudflare Radar Q1 2026: 22 percent of all bot traffic is AI crawlers, roughly 80 percent of AI bot traffic is training or mixed-purpose, GPTBot about 9.84 percent and declining as of April 2026](/images/diagrams/ai-bot-traffic-q1-2026.png)

## The Pleadings That Matter

Reddit v. Perplexity, SerpApi, Oxylabs, and AWMProxy (filed SDNY, October 2025) is at the motion-to-dismiss stage. Reddit's amended complaint (February 6 2026) alleges the following scraping volumes<sup><a href="#ref-5">5</a></sup>:

- **SerpApi** allegedly accessed ~2 billion Google search results containing Reddit content
- **Oxylabs** allegedly accessed ~781 million
- **AWMProxy** allegedly accessed ~482 million

SerpApi and Perplexity moved to dismiss in March 2026 (~March 13), denying the allegations; Reddit filed its opposition on April 17 2026; oral argument is set for June 30 2026 before Judge Engelmayer. Discovery has not begun, and there is no ruling yet. The volume figures are amended-complaint allegations in the public docket regardless, and they will appear in coverage of every adjacent compliance question.

This formalizes a hypothesis the BuzzStream data already implies. AI citation does not require AI training scrapers to crawl publisher content directly. It can route through Google search results the publisher has *not* opted out of, then through a SerpApi-class intermediary, then to an answer engine. Publisher blocking of `GPTBot` catches none of that chain.

## The AIPREF Status Check

The standard publishers were told to track is still in draft. As of mid-2026:

- `draft-ietf-aipref-vocab-05` expired June 4 2026; the post-Toronto vocab-06 is the active document. Working consensus on AI training scope reached at the April 14-16 Toronto interim<sup><a href="#ref-6">6</a></sup>
- The companion attach draft (`draft-ietf-aipref-attach`) remains expired since October 2025
- A competing individual draft, `draft-romm-aipref-contentsignals`, is circulating, indicating the vocabulary debate is not closed
- IETF 126 in Vienna (July 18-24 2026) is the next decision point

**Production AIPREF deployment is effectively zero.** No publisher count exists. Cloudflare's "Managed Robots.txt" (October 2025) propagates blocklists at platform scale but uses legacy `User-agent` / `Disallow` vocabulary, not `Content-Usage` headers. Fastly's early-2026 "The Truth About Blocking AI" offers AI bot management but no Content-Usage tooling. Search Engine Land reported in March 2026 that managed-WordPress hosts are silently blocking AI bots without admin visibility. That is the opposite of standardized signaling.

For background on the standard's structure and the Toronto outcomes, see [AIPREF After Toronto](/blog/aipref-after-toronto/).

## What Cloudflare and Stack Overflow Did Build

Cloudflare's Agents Week 2026 (April) launched two production features<sup><a href="#ref-7">7</a></sup>:

- **Redirects for AI Training**: serves a canonical content version to verified AI crawlers. This is not blocking. It is "if you crawl, here is the version we want represented."
- **AI Crawl Control** went GA. **Pay Per Crawl** remains in private beta; **Stack Overflow** is the most prominent adopter (announced February 2026)<sup><a href="#ref-8">8</a></sup>.

The Cloudflare WAF release on 2026-04-21 covered an Apache ActiveMQ RCE (CVE-2026-34197) and a Magento 2 signature, not AI bot heuristics. Whether the Agents Week features above materially shift the compliance picture for Cloudflare-fronted sites in H2 2026 is the open question.

## What Publishers Actually Have to Decide

The H1 2026 data redraws the publisher decision tree.

**Blocking has a measurable cost.** The Zhao/Berman 23.1% traffic decline is the most-cited number now and will appear in every publisher's internal deck through 2026. A publisher choosing to block AI crawlers is choosing to absorb that cost.

**Blocking does not reliably reduce AI citation.** The BuzzStream finding plus the Reddit v. Perplexity volume disclosures show why. Crawl access is not the chokepoint citation flows through.

**The signaling-only framing has weakened.** The March piece argued that even imperfect signaling matters because regulators and courts use it as evidence of intent. That argument still holds. It now has to compete with a 23.1% revenue cost.

The implication is the same one we've outlined elsewhere: if cost-imposition can't close the gap and signaling alone has weakened, defense logic has to extend to the value side of the ledger. For the unit economics behind why pure blocking will not work, see [How Much Does It Cost to Scrape the Web at Scale?](/blog/scraping-economics-2026/) and [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/).

## What's Still Coming

Three things that will reshape this post if they land before year-end:

- **TollBit Q2 2026 State of the Bots** (expected late September): the next industry-wide non-compliance baseline. It will determine whether the 30% Q4 2025 figure was an inflection or a peak.
- **Reddit v. Perplexity motion-to-dismiss outcome**: oral argument is set for June 30 2026. Any ruling will be cited as precedent in adjacent cases.
- **AIPREF vocab-06 to IESG submission**: target was August 31 2026. Whether that hits or slips determines whether publishers have a standardized signal by year-end.

The H1 2026 picture is the one publishers have to plan against. The trade is worse than it looked in March. The defenses that work are not the ones publishers were told to deploy.

---

*Last updated: June 2026*

## References

<ol class="references">
<li id="ref-1">Zhao, R. and Berman, R. (December 31 2025). "Blocking LLM Crawlers and Publisher Traffic." SSRN working paper. Summary coverage: <a href="https://ppc.land/blocking-ai-crawlers-backfired-news-publishers-lost-23-of-traffic/">https://ppc.land/blocking-ai-crawlers-backfired-news-publishers-lost-23-of-traffic/</a> (search SSRN by author for primary)</li>
<li id="ref-2">BuzzStream (March 19 2026). "Blocking AI Crawlers Doesn't Stop Citations: New Data Shows Why." <a href="https://ppc.land/blocking-ai-crawlers-doesnt-stop-citations-new-data-shows-why/">https://ppc.land/blocking-ai-crawlers-doesnt-stop-citations-new-data-shows-why/</a></li>
<li id="ref-3">Cloudflare Radar bot statistics. Training/mixed-purpose share (~80%) and April 2026 GPTBot share (~9.84%) reflect Cloudflare's published figures; the live dashboard does not corroborate the higher Q1 figures circulated elsewhere (89.4% training, 12.13%-11.05% GPTBot, 476/4,055 domains). <a href="https://radar.cloudflare.com/bots">https://radar.cloudflare.com/bots</a></li>
<li id="ref-4">IETF AIPREF Working Group. <a href="https://datatracker.ietf.org/wg/aipref/about/">https://datatracker.ietf.org/wg/aipref/about/</a></li>
<li id="ref-5">Reddit v. Perplexity / SerpApi / Oxylabs / AWMProxy (SDNY, Oct 2025). Coverage of discovery filings: <a href="https://searchengineland.com/reddit-sues-perplexity-serpapi-scraping-google-463681">https://searchengineland.com/reddit-sues-perplexity-serpapi-scraping-google-463681</a></li>
<li id="ref-6">Keller, P., Thomson, M. "A Vocabulary For Expressing AI Usage Preferences." draft-ietf-aipref-vocab-06. <a href="https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab-06">https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab-06</a></li>
<li id="ref-7">Cloudflare Blog (Agents Week 2026). "Redirects for AI Training." <a href="https://blog.cloudflare.com/ai-redirects/">https://blog.cloudflare.com/ai-redirects/</a></li>
<li id="ref-8">Stack Overflow + Cloudflare (Feb 2026). "Pay Per Crawl Adoption." <a href="https://stackoverflow.blog/2026/02/19/stack-overflow-cloudflare-pay-per-crawl/">https://stackoverflow.blog/2026/02/19/stack-overflow-cloudflare-pay-per-crawl/</a></li>
<li id="ref-9">Reuters Institute (Jan 2026). "Journalism, Media, and Technology Trends and Predictions 2026." 38% US Google Search referral decline. <a href="https://reutersinstitute.politics.ox.ac.uk/">https://reutersinstitute.politics.ox.ac.uk/</a></li>
<li id="ref-11">NewzDash (reported March 2026). Web search share of overall referrals falling from 51% to 27% (2023 to Q4 2025). <a href="https://www.newzdash.com/">https://www.newzdash.com/</a></li>
<li id="ref-10">The Register (Feb 4 2026). "AI Bot Traffic Closing in on Human Web Visits." <a href="https://www.theregister.com/2026/02/04/ai_bot_traffic_web_browsers/">https://www.theregister.com/2026/02/04/ai_bot_traffic_web_browsers/</a></li>
</ol>
