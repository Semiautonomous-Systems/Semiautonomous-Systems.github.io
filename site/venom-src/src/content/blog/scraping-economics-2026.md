---
title: "How Much Does It Cost to Scrape the Web at Scale?"
description: "Bulk residential proxy pricing, Web Unlocker tiers, and headless browser farms put real per-page scraping costs at $0.001-$0.005, not the widely-quoted $0.01. AI training-data licensing deals show why the economics keep working for scrapers."
publishDate: 2026-06-16
keywords: [web scraping cost, residential proxy pricing 2026, Bright Data pricing, AI training data economics, scraping vs licensing, IPIDEA disruption, Reddit Perplexity lawsuit]
author: Semiautonomous Systems
---

## Key Takeaways

- Real per-page scraping cost at scale is **$0.001-$0.005**, not the widely-cited $0.01. The latter is a self-serve list-price upper bound; bulk residential tiers at Webshare, Decodo, and Bright Data put serious operators at $1,000-$5,000 per million pages, depending on tier and page weight<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- Publisher revenue per page (general news, programmatic display) is **$0.005-$0.015** at typical RPMs. Per-page scraping cost is comparable to or below per-page ad revenue, but the comparison is misleading because the scraper isn't paying the publisher<sup><a href="#ref-3">3</a></sup>
- The right comparison is **scraping cost vs licensing value**. News Corp / OpenAI implies ~$1,250-$2,500 per licensed news article; Bartz v. Anthropic settled at ~$3,000 per book. The economic gap between scrape cost and license value is **3-6 orders of magnitude**<sup><a href="#ref-4">4</a></sup><sup><a href="#ref-5">5</a></sup>
- The 2026 enforcement delta is real but small in dollar terms: Bright Data's KYC product gates broader access; Google's January 2026 IPIDEA disruption removed millions of devices from the residential pool; Reddit v. Perplexity / Oxylabs is at First Amended Complaint with no ruling. Wholesale proxy prices have not visibly moved<sup><a href="#ref-6">6</a></sup><sup><a href="#ref-7">7</a></sup><sup><a href="#ref-8">8</a></sup>
- Cost-imposition defenses (proof-of-work, tarpits) can't close a 4-order-of-magnitude gap. The implication for publishers is that defense logic must shift from raising scraper costs to degrading scraper value

---

## The Number Most People Get Wrong

A widely repeated figure in scraping coverage is "$0.01 per page." It comes from Bright Data's self-serve list price as of 2024-2025 ($8/GB residential, ~1-2 MB per page; the list price has since dropped to $4/GB). It is not the operative cost for any serious scraping operation.

Three things move the real number down. Bulk pricing at every major residential provider is multiples cheaper than self-serve. Lean-mode crawls (image stripping, ad-domain blocking) cut per-page bandwidth from ~2 MB to ~1 MB. Volume tiers at Web Unlocker / Scraper API products, which bundle proxy + browser + CAPTCHA into a per-success price, drive the effective rate below $1.50 per thousand successful results.

The real number for an AI-scale operation is **$0.001-$0.005 per page**. This post shows the math.

## What the Providers Charge in May 2026

Pricing verified from public pricing pages on 2026-05-06. Enterprise tiers everywhere require a sales call.

**Residential proxies, $/GB self-serve:**

| Provider | Pay-as-you-go | Lowest published volume tier |
|---|---|---|
| Bright Data | $4/GB | $3/GB at 798 GB ($1,999/mo) |
| Oxylabs | $6/GB starting | Volume tiers sales-gated |
| Decodo (ex-Smartproxy) | $4/GB | $2/GB at 1 TB ($2,000/mo) |
| Webshare (Oxylabs group) | $3.50/GB | $0.98/GB on annual 3 TB |
| SOAX | $3.60/GB | $2/GB at Business tier |
| NetNut | $4.50-$14.40/GB (2025 prices) | 2026 page returned 404 on 2026-05-06 |

**Web Unlocker / Scraper API, per 1,000 successful requests:**

| Provider | Pay-as-you-go | Volume floor |
|---|---|---|
| Bright Data Web Unlocker | $1.50/1K | $1.00/1K at 2M results |
| Zyte API HTTP (Easy targets) | $0.13-$1.27/1K | $0.06-$0.61/1K at $500/mo |
| Zyte API browser-rendered | up to $16.08/1K on hardened sites | $0.48-$7.68/1K at $500/mo |
| ScrapingBee Business+ | ~$0.075/1K base; 25-75 credits per hard page | Effective $1.87-$5.62/1K on hard targets |

ISP/static residential and datacenter pricing falls in similar ranges relative to volume. Datacenter is an order of magnitude cheaper per IP but largely useless against Cloudflare/Akamai-protected targets, which is most of the AI-relevant web.

Enterprise rates at Bright Data and Oxylabs are widely rumored to land at $1-$2/GB at AI-lab volume but no public source confirms this.

![Scraping Cost vs Licensing Value: per-page scraping cost $0.001-$0.005; News Corp/OpenAI licensed value per article $1,250-$2,500, illustrating the multi-order-of-magnitude gap between scrape cost and license value](/images/diagrams/scraping-economics-cost-per-million.png)

## Three Worked Scenarios

Page-size assumption: 1 MB per modern page on a lean crawl, 2 MB realistic. One million pages = 1-2 TB of bandwidth.

**Scenario A — bulk residential proxy, scraper handles the rest.** Webshare's annual 3 TB tier at $0.98/GB lands at $1,000-$2,000 per million pages. Decodo at $2/GB hits $2,000-$4,000. Bright Data's 798 GB tier at $3/GB is $3,000-$6,000. CAPTCHA solving at 2Captcha-class farms ($1.50 per 1,000 solves) adds ~$30 per million pages if 2% of pages hit a CAPTCHA. Negligible against bandwidth. **Realistic A range: $1,000-$5,000 per million pages.**

**Scenario B — Web Unlocker / Scraper API.** Per-success pricing hides the bandwidth question and bundles evasion. Bright Data Web Unlocker at the 2M-result tier is $1,000 per million. Zyte's Easy tier is $130 per million on static HTML targets. The same provider's Complex browser-rendered PAYG can hit $16,080 per million on hardened sites. For a representative AI-training crawl mixing easy and hard targets, **plan $1,000-$5,000 per million**.

**Scenario C — bring-your-own headless browser plus residential proxy.** This is what serious operators run when they want full fingerprint control. At Browserless overage rates ($0.0015 per 30-second block) and bulk residential bandwidth ($1/GB), one million pages is roughly $1,500 compute plus $2,000 bandwidth, before CAPTCHA solving. Browserbase is markedly more expensive on bandwidth than dedicated proxy providers, which is why operators bypass it for proxy. **Realistic C range: $3,000-$8,000 per million pages.**

The summary: $1,000-$5,000 per million pages for bulk operations, $3,000-$8,000 if you run your own browser, up to $16,000 only on the hardest targets via paid Web Unlockers. **$0.001-$0.005 per page is the operative cost** for anyone scraping at AI-training scale. Common Crawl remains free, robots.txt-respecting, and bulk-only — useful but stale, and not what the largest labs are training on at the margin.

## What Publishers Earn Per Page

Publisher economics report in RPM (revenue per mille), not per-page. eMarketer Q4 2025 benchmarks and the Digiday 2025 publisher snapshot converge on the following ranges for ad-supported pages:

| Vertical | Page RPM | Per page |
|---|---|---|
| General news | $5-$15 | $0.005-$0.015 |
| Lifestyle / entertainment | $2-$8 | $0.002-$0.008 |
| Tech tutorials / B2B | $8-$25 | $0.008-$0.025 |
| Health / finance / legal | $15-$50+ | $0.015-$0.050 |
| Long-tail / global | $0.25-$3 | $0.00025-$0.003 |

For programmatic-dominated long-form general news, $0.005-$0.010 per page view is a defensible operating number. Tech B2B and high-CPC verticals run higher; long-tail and global runs lower.

This puts per-page scraping cost ($0.001-$0.005) at or below per-page ad revenue across most general categories. The comparison is misleading, though. Scrapers don't displace ad revenue directly: bot traffic typically doesn't render ads. The publisher loses content value, not ad inventory.

## The Real Comparison: Scrape Cost vs License Value

The right question is what AI-training value one page is worth. Public licensing deals are the closest available proxy.

**News Corp ↔ OpenAI** (May 2024): $250M+ over five years for WSJ, Barron's, and MarketWatch content. WSJ alone publishes 50-100 articles per day; over five years that's roughly 100,000-200,000 articles, implying licensed value of **$1,250-$2,500 per article** for premium news.

**Reddit ↔ Google** (February 2024): roughly $60M per year. Reddit's submission volume puts the per-item value in fractions of a cent. The corpus has cumulative training value larger than any individual post.

**Bartz v. Anthropic** (settled September 2025, final approval pending): $1.5 billion across approximately 500,000 works = **~$3,000 per book**. This is the cleanest available number for what a frontier-model trainer pays when forced into a settlement-style deal for in-copyright training data.

**Shutterstock ↔ OpenAI**: announced 2023, expansion through 2024-2025, reported value up to $250M by 2027. Terms not fully public.

A frontier-model trainer paying $3,000 per book or $1,250 per news article has effectively unlimited willingness-to-pay relative to scraping costs of $0.001-$0.005 per page. **The economic gap is 3-6 orders of magnitude.** Even if only 1 in 10,000 scraped pages contains training-grade content equivalent to a licensed article, scraping remains profitable.

This is why licensing exists alongside scraping rather than replacing it. Licensing buys legal certainty and fresh, structured, exclusive feeds. Scraping covers everything else at near-zero marginal cost.

## What Changed in 2026

The legal pressure on the industry is real. Its impact on unit economics is not yet visible.

**Bright Data's KYC product** is the most concrete compliance shift. Without verification, residential network access is restricted to robots.txt-compliant paths, an internal allowlist, and GET-only methods. KYC unlocks broader access but is use-case-bound. LinkedIn and Google Jobs remain restricted even for KYC'd customers, per third-party reviews. Bright Data markets this explicitly as a response to litigation risk.

**Google's IPIDEA disruption** (January 28, 2026) was the first major Western enforcement action against a residential proxy operator on threat-intelligence grounds rather than IP-litigation grounds. A court order took down domains operating IPIDEA, used by 550+ tracked threat groups. Google identified 3,075 Windows binaries and 600+ Android apps that enrolled devices into IPIDEA without disclosure, and reports millions of devices removed from the available exit-node pool.

**Reddit v. Perplexity / Oxylabs / AWM Proxy / SerpApi** filed in SDNY in October 2025 reached First Amended Complaint on February 6, 2026 before Judge Engelmayer. **No ruling yet.** Oxylabs' public response denies knowledge of misuse. No motion-to-dismiss outcome. Treat as live and unresolved.

What these moves haven't done: visibly raise wholesale proxy prices. Webshare, Decodo, and SOAX continue self-serve sign-up without KYC. The non-paying tier of exit-node acquisition (free VPN apps with bundled SDKs, Tizen/webOS scraping integrations) has not contracted measurably despite the IPIDEA action.

## What This Means for Defense

If scraping costs $0.001-$0.005 per page and the marginal training value of those pages exceeds that by 3-6 orders of magnitude, cost-imposition defenses face a math problem. Anubis-class proof-of-work raises per-page cost by perhaps a factor of two for headless-browser scrapers, and far less for residential-proxy operators amortizing solves. That doesn't move a 10,000:1 gap.

The implication for defense logic is what we covered in [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/): when raising attacker cost can't reach break-even, the defense has to reduce attacker value. Data poisoning, content provenance, and structured opt-outs (AIPREF) operate on the value side of the ledger. They don't make scraping more expensive. They make what scrapers collect worth less for training.

For background on the technical scraping stack the unit-cost numbers ride on top of, see [How AI Scraping Infrastructure Works](/blog/how-ai-scraping-infrastructure-works/).

---

*Last updated: June 2026*

## References

<ol class="references">
<li id="ref-1">Bright Data. Residential Proxy Pricing. <a href="https://brightdata.com/pricing/proxy-network">https://brightdata.com/pricing/proxy-network</a></li>
<li id="ref-2">Webshare. Pricing. <a href="https://www.webshare.io/pricing">https://www.webshare.io/pricing</a></li>
<li id="ref-3">eMarketer. "US Digital Ad Spending Benchmarks Q4 2025." <a href="https://www.emarketer.com/content/us-digital-ad-spending-benchmarks-q4-2025">https://www.emarketer.com/content/us-digital-ad-spending-benchmarks-q4-2025</a></li>
<li id="ref-4">Variety (May 2024). "News Corp / OpenAI $250M+ Licensing Deal." <a href="https://variety.com/2024/digital/news/news-corp-openai-licensing-deal-1236013734/">https://variety.com/2024/digital/news/news-corp-openai-licensing-deal-1236013734/</a></li>
<li id="ref-5">Reuters AI Litigation Tracker. Bartz v. Anthropic $1.5B settlement, September 2025. The tracker landing page indexes ongoing AI cases; specific case details require navigation from there. <a href="https://www.reuters.com/legal/litigation/">https://www.reuters.com/legal/litigation/</a></li>
<li id="ref-6">Bright Data. "Trust Center: KYC." <a href="https://brightdata.com/trustcenter/kyc">https://brightdata.com/trustcenter/kyc</a></li>
<li id="ref-7">Google Cloud Threat Intelligence (Jan 28, 2026). "Disrupting the Largest Residential Proxy Network." <a href="https://cloud.google.com/blog/topics/threat-intelligence/disrupting-largest-residential-proxy-network">https://cloud.google.com/blog/topics/threat-intelligence/disrupting-largest-residential-proxy-network</a></li>
<li id="ref-8">ChatGPTIsEatingTheWorld (Feb 9, 2026). "Reddit Files First Amended Complaint v. Perplexity, Oxylabs, AWM Proxy, SerpApi." <a href="https://chatgptiseatingtheworld.com/2026/02/09/reddit-files-1st-amended-complaint-v-serpapi-oxylabs-awmproxy-perplexity-ai/">https://chatgptiseatingtheworld.com/2026/02/09/reddit-files-1st-amended-complaint-v-serpapi-oxylabs-awmproxy-perplexity-ai/</a></li>
<li id="ref-9">Zyte. API Pricing. <a href="https://www.zyte.com/pricing/">https://www.zyte.com/pricing/</a></li>
<li id="ref-10">Digiday Research (2025). "Publisher Ad Revenue Snapshot." <a href="https://digiday.com/media/digiday-researchs-2025-ad-snapshot-are-publishers-becoming-less-dependent-on-ad-revenue/">https://digiday.com/media/digiday-researchs-2025-ad-snapshot-are-publishers-becoming-less-dependent-on-ad-revenue/</a></li>
</ol>
