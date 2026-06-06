---
title: "Who Owns the Residential Proxy Industry That Feeds AI Scraping in 2026"
description: "A follow-the-ownership map of the residential proxy networks behind AI scraping: the Lithuanian and Israeli conglomerates that sell consumer privacy VPNs and the scraping infrastructure that drains publishers, plus why this structure breaks per-crawler defense."
publishDate: 2026-03-30
author: "Semiautonomous Systems"
keywords:
  - residential proxy
  - AI scraping
  - Oxylabs
  - Bright Data
  - Tesonet
  - data poisoning
  - anti-scraping
  - proxy industry consolidation
---

One vendor advertises more than 175 million residential IP addresses, sourced from ordinary consumer devices <sup><a href="#ref-3">3</a></sup><sup><a href="#ref-9">9</a></sup>. Another advertises more than 150 million <sup><a href="#ref-3">3</a></sup>. Both pools come from real home connections: phones, laptops, and smart TVs running an SDK that quietly turns the device into an exit node for someone else's traffic. This is the raw material of large-scale AI scraping, and it explains why blocking a crawler by its IP address is a losing game before you start.

The companies that own these pools are not a sprawling field of competitors. Two countries account for most of the named revenue in the industry. A short list of holding companies in Lithuania and Israel sells consumer privacy products on one side of the building and the scraping infrastructure that drains publishers on the other. The company that sells you a privacy VPN often shares founders and an engineering lineage with the company renting out your neighbor's home IP address. Follow the ownership and the defensive lesson lands hard: per-IP and per-crawler blocking cannot win against a supply side this concentrated and this deep. Value degradation can.

## Key Takeaways

- A handful of conglomerates dominate residential proxies. Bright Data (Israel) and the Oxylabs group (Lithuania, under the Tesonet holding company) are the two largest by revenue, with Bright Data roughly 2.5x Oxylabs.
- The same corporate ecosystems sell consumer privacy. Tesonet shares founders and infrastructure with Nord Security (NordVPN, Surfshark) and also owns the proxy vendors Oxylabs and Decodo. Bright Data grew directly out of Hola VPN.
- The sector is consolidating through acquisition. Oxylabs bought Webshare (over $50M) and ScrapingBee (eight figures) to span the budget and developer tiers; NetNut was acquired by a public company.
- Residential IPs come from real consumer devices through SDKs embedded in apps, a model with documented consent and security problems.
- Reddit's October 2025 lawsuit names Oxylabs UAB and AWM Proxy directly, among the first major cases to name residential proxy providers in an AI scraping matter. It is unresolved, and Oxylabs denies knowledge of misuse.
- Because a few owners control the IP pools, browser farms, and API products across every price tier, blocking one product reroutes traffic through a sister product. This is the structural case for value degradation over cost imposition.

## The conglomerate map: who owns whom

Oxylabs was founded in 2015 in Vilnius, Lithuania, under Tesonet, a holding company founded in 2008 by Tomas Okmanas and Eimantas Sabaliauskas <sup><a href="#ref-1">1</a></sup>. Tesonet is the shared parent of a cluster of recognizable brands: Nord Security (the maker of NordVPN), Surfshark, the web host Hostinger, and the proxy vendor Smartproxy, which rebranded to Decodo in April 2025 <sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>.

The NordVPN relationship needs precision. NordVPN asserts independence: it is operated by the Panamanian entity Tefincom S.A., with Tesonet providing infrastructure and services on contract. NordVPN, Surfshark, Oxylabs, and Decodo sit inside the same founder and infrastructure ecosystem. The accurate claim is shared lineage, not direct ownership. Privacy products and scraping products grow from the same root <sup><a href="#ref-1">1</a></sup>.

Decodo, founded in 2018 in Vilnius as a Tesonet sister company to Oxylabs (then called Smartproxy), reported roughly $15M in annual revenue in 2025 and more than 85,000 users. It sells the value tier to small and mid-sized buyers at roughly $1.30 to $3.00 per gigabyte of residential traffic <sup><a href="#ref-2">2</a></sup>. One holding company fields both the enterprise brand and the SMB brand.

Israel follows the same pattern. Bright Data, based in Netanya, began in 2014 as a division of Hola VPN under the name Luminati Networks, then spun out and rebranded. EMK Capital acquired a majority stake in 2017 at an enterprise value of roughly $200M <sup><a href="#ref-3">3</a></sup>. The network grew straight from Hola's user base, where many people did not understand that installing a free VPN turned their connection into an exit node for other people's traffic <sup><a href="#ref-3">3</a></sup>.

![Two countries, Lithuania and Israel, account for most named revenue in the residential proxy industry that supplies AI scraping.](/images/diagrams/proxy-two-countries.png)

Lithuania (Oxylabs, Decodo, and IPRoyal) and Israel (Bright Data and NetNut) account for the bulk of named industry revenue <sup><a href="#ref-4">4</a></sup>. The market is not diffuse. A short list of firms in two countries holds most of it.

## The revenue ranking: how big this quietly is

Most proxy firms are privately held, so public revenue figures are scarce. The numbers below are third-party estimates from sources such as Owler, GetLatka, and Crunchbase. Read them as estimates, not audited results <sup><a href="#ref-5">5</a></sup><sup><a href="#ref-6">6</a></sup><sup><a href="#ref-7">7</a></sup>.

Bright Data leads at $300M or more in annual recurring revenue in 2025, with a public target of $400M by mid-2026 and growth above 50% year over year <sup><a href="#ref-5">5</a></sup>. The Oxylabs group sits around $122M, with roughly 428 employees and more than 100 patents <sup><a href="#ref-6">6</a></sup>. Decodo is near $15M <sup><a href="#ref-2">2</a></sup>. The scraping platform Apify is around $13M <sup><a href="#ref-7">7</a></sup>, and NetNut around $4M <sup><a href="#ref-8">8</a></sup>. Zyte and IPRoyal do not disclose figures, though both are described as fast growing <sup><a href="#ref-4">4</a></sup>.

Bright Data is roughly 2.5x Oxylabs by revenue and growing faster, which makes it the largest by these estimates <sup><a href="#ref-4">4</a></sup><sup><a href="#ref-5">5</a></sup>. The scale shows in traffic. Oxylabs reports about 1.5 billion requests per day, Bright Data more than 2 billion. Bright Data advertises more than 150M residential IPs across roughly 34M unique clients; Oxylabs advertises more than 175M <sup><a href="#ref-3">3</a></sup><sup><a href="#ref-9">9</a></sup>. Whichever figure is closest to true, the supply side measures in the hundreds of millions of addresses.

## The roll-up: one owner, every price tier

The acquisition record shows where this industry is heading.

Oxylabs acquired Webshare Software, announced September 2022 and completed December 2024. Webshare is a Silicon Valley self-service proxy company with more than 10,000 active customers, including Fortune 500 firms. The deal exceeded $50M and was paid from cash reserves <sup><a href="#ref-10">10</a></sup>. It bought Oxylabs the budget end of the market. Webshare carries the cheapest published residential tier in the group, around $0.98 per gigabyte on an annual 3 TB commitment: the low-price floor, acquired outright (see [scraping economics](/blog/scraping-economics-2026/)).

Oxylabs then acquired ScrapingBee in June 2025, an eight-figure all-cash deal. ScrapingBee is a French developer-friendly scraping API founded in 2019, with more than 2,500 customers, roughly $5M in annual recurring revenue, and a team of six <sup><a href="#ref-11">11</a></sup><sup><a href="#ref-12">12</a></sup>. That added the developer and API tier.

NetNut went the other way: Safe-T Group, now Alarum Technologies, acquired it in 2019 for $9.6M, folding a proxy network into a publicly traded entity <sup><a href="#ref-8">8</a></sup>.

These deals describe a roll-up. Market leaders are buying the budget tier (Webshare) and the developer and API tier (ScrapingBee) while operating the SMB tier as a sister company (Decodo). A single conglomerate now spans every price point from hobbyist to enterprise. No firm has stated this strategy in those words; it is the public acquisition record read end to end. For a defender, the consequence is direct. There is no clean separation between a cheap scraper and an expensive one. They can be the same owner with different logos.

## The device funnel and its ethics: where the IPs come from

Residential IPs are valuable because they belong to ordinary home connections, so the traffic looks like a real person browsing. The addresses come from real consumer devices through a software development kit embedded in a free or paid app. The user agrees, often in exchange for ad-free use or a small payment, to route third-party proxy traffic through the device while it sits idle. This model powers IPRoyal (through Pawns.app), Bright Data (historically through the Hola VPN SDK), Honeygain, PacketStream, Peer2Profit, and EarnApp <sup><a href="#ref-3">3</a></sup><sup><a href="#ref-13">13</a></sup>.

The privacy irony is structural. The same conglomerates that sell consumer privacy VPNs sit next to the proxy networks that scrape. Nord Security and Tesonet sell NordVPN and Surfshark as privacy products and form the parent ecosystem for Oxylabs and Decodo as scraping infrastructure <sup><a href="#ref-1">1</a></sup><sup><a href="#ref-3">3</a></sup>. Bright Data's network grew out of Hola VPN, where most users did not understand they were exit nodes <sup><a href="#ref-3">3</a></sup><sup><a href="#ref-14">14</a></sup>. Scope matters here: there is no evidence that NordVPN or Surfshark route scraping traffic today. The verifiable claims are shared corporate lineage and Hola's historical exit-node model, not present-day VPN exit-node use.

Consent is also thinner than the SDK prompts suggest. Researchers at Trend Micro, Cisco Talos, and Intel 471 document proxyware networks that do not police exit-node traffic, under-disclose how user bandwidth and data are used, and have at times shipped bundled with malware, including cryptominers and information stealers. Some networks draw IPs from devices compromised without the owner's knowledge <sup><a href="#ref-13">13</a></sup><sup><a href="#ref-15">15</a></sup><sup><a href="#ref-16">16</a></sup>. Assume that a meaningful share of residential proxy traffic originates from people who do not understand what their device is doing.

![One residential proxy vendor advertises over 175 million home IP addresses sourced from consumer devices, which is why per-IP blocking does not scale.](/images/diagrams/proxy-residential-ips.png)

## Why ownership is a defense problem

The legal exposure is now explicit. Reddit's October 2025 suit in the Southern District of New York (1:25-cv-08736) names Oxylabs UAB as a co-defendant alongside Perplexity, SerpApi, and AWM Proxy. It is one of the first major cases to name residential proxy providers directly in an AI data-scraping matter. Reddit's chief legal officer called the conduct industrial-scale data laundering. The docket breaks the alleged collection down per defendant: roughly 2 billion search-result pages via SerpApi, about 781 million via Oxylabs, and about 482 million via AWM Proxy, part of a broader figure of roughly 3 billion across the named intermediaries <sup><a href="#ref-17">17</a></sup><sup><a href="#ref-18">18</a></sup><sup><a href="#ref-19">19</a></sup><sup><a href="#ref-22">22</a></sup>. Reddit filed a First Amended Complaint on February 9, 2026 <sup><a href="#ref-19">19</a></sup>. There is no ruling yet, and Oxylabs denies knowledge of any misuse <sup><a href="#ref-17">17</a></sup><sup><a href="#ref-18">18</a></sup>. Treat the case as live and unresolved.

The incumbents also litigate each other. The Bright Data versus Oxylabs patent war ran from 2018 through 2025. A 2021 Texas jury awarded Bright Data $7.5M, but the Patent Trial and Appeal Board invalidated the asserted claims as obvious, the Federal Circuit affirmed, and the Supreme Court declined the case, leaving the patents dead <sup><a href="#ref-20">20</a></sup><sup><a href="#ref-21">21</a></sup>. Two of the largest firms spent seven years fighting over the same residential-proxy techniques. That is the signature of a mature, contested, lucrative market.

Now the payoff for defense. A handful of conglomerates own the IP pools, the browser farms, and the API products across every price tier. Block one product and the request reroutes through a sister product, or through a fresh slice of a pool holding 150M to 175M addresses <sup><a href="#ref-3">3</a></sup><sup><a href="#ref-9">9</a></sup>. Rate limiting and fingerprint blocking impose some cost, but the supply side is engineered to absorb it. Per-IP and per-crawler defense is fighting the wrong layer.

Value degradation flips the geometry. If the goal is to make scraped data less useful rather than marginally more expensive, consolidation stops being your problem and becomes theirs. Poison or preference-signal your content once, and every tier of the conglomerate inherits the same degraded data, no matter which logo collected it. This is the structural case for value-degradation defenses, including data poisoning and preference signaling such as [AIPREF](/blog/understanding-aipref-ietf-standard/), over pure cost imposition (see [cost imposition versus value degradation](/blog/cost-imposition-vs-value-degradation/)).

Enforcement is the open question. Signaling and litigation establish who is responsible; they do not by themselves stop the traffic. Whether Reddit v. Oxylabs produces a ruling that makes proxy providers liable for downstream misuse, and whether that reshapes the SDK supply funnel, is unknown. Verify it the only honest way: watch the docket, and measure on your own properties whether traffic from these networks actually drops after a defensive change, rather than quietly rerouting.

<ol class="references">
  <li id="ref-1">Tesonet, Wikipedia. https://en.wikipedia.org/wiki/Tesonet and Tesonet Companies, https://tesonet.com/companies/</li>
  <li id="ref-2">Decodo (Smartproxy) About. https://smartproxy.com/about and Proxyway, "Smartproxy Review," https://proxyway.com/reviews/smartproxy-proxies</li>
  <li id="ref-3">Bright Data, Wikipedia. https://en.wikipedia.org/wiki/Bright_Data</li>
  <li id="ref-4">Semiautonomous Systems research archive, "Oxylabs and the Scraping Industry," 2026-03-03 (industry revenue ranking and geography).</li>
  <li id="ref-5">Calcalist, "Bright Data hits $300M ARR," accessed 2026-06-05. https://www.calcalistech.com/ctechnews/article/sjeyg2ezwe</li>
  <li id="ref-6">Owler company profile, Oxylabs. https://www.owler.com/company/oxylabs</li>
  <li id="ref-7">GetLatka company profile, Apify. https://getlatka.com/companies/apify</li>
  <li id="ref-8">Crunchbase, NetNut. https://www.crunchbase.com/organization/netnut and NetNut About, https://netnut.io/about/</li>
  <li id="ref-9">Bright Data blog, "Data for AI is fueling massive growth at Bright Data," accessed 2026-06-05. https://brightdata.com/blog/general/data-for-ai-is-fueling-massive-growth-at-bright-data</li>
  <li id="ref-10">Oxylabs blog, "Oxylabs acquires Webshare Software company," accessed 2026-06-05. https://oxylabs.io/blog/oxylabs-acquires-webshare-software-company</li>
  <li id="ref-11">ScrapingBee blog, "ScrapingBee acquisition," accessed 2026-06-05. https://www.scrapingbee.com/blog/scrapingbee-acquisition/</li>
  <li id="ref-12">Tech.eu, "Oxylabs Group strengthens position with eight-figure acquisition of ScrapingBee," 2025-06-20. https://tech.eu/2025/06/20/oxylabs-group-strengthens-position-with-eight-figure-acquisition-of-scrapingbee/</li>
  <li id="ref-13">Trend Micro Research, "Hijacking Your Bandwidth: How Proxyware Apps Open You Up to Risk," accessed 2026-06-05. https://www.trendmicro.com/en/research/23/b/hijacking-your-bandwidth-how-proxyware-apps-open-you-up-to-risk.html</li>
  <li id="ref-14">PCWorld, "Hola VPN extension sold your bandwidth," 2015. https://www.pcworld.com/article/427726/hola-vpn-extension-sold-your-bandwidth.html</li>
  <li id="ref-15">Cisco Talos, "Proxyware abuse," accessed 2026-06-05. https://blog.talosintelligence.com/proxyware-abuse/</li>
  <li id="ref-16">Intel 471, "A look at the residential proxy market," accessed 2026-06-05. https://www.intel471.com/blog/a-look-at-the-residential-proxy-market</li>
  <li id="ref-17">CNBC, "Reddit sues Perplexity and others over scraping," 2025-10-23. https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts.html</li>
  <li id="ref-18">Dataconomy, "Reddit sues Perplexity over alleged large-scale data scraping," 2025-10-23. https://dataconomy.com/2025/10/23/reddit-sues-perplexity-over-alleged-large-scale-data-scraping/</li>
  <li id="ref-19">ChatGPT Is Eating the World, "Reddit files 1st amended complaint v. SerpApi, Oxylabs, AWMProxy, Perplexity AI," 2026-02-09. https://chatgptiseatingtheworld.com/2026/02/09/reddit-files-1st-amended-complaint-v-serpapi-oxylabs-awmproxy-perplexity-ai/</li>
  <li id="ref-20">Oxylabs Legal Timeline. https://oxylabs.io/legal-timeline</li>
  <li id="ref-21">USA Herald, "Supreme Court leaves Bright Data patent invalidation ruling intact," accessed 2026-06-05. https://usaherald.com/supreme-court-leaves-bright-data-patent-invalidation-ruling-intact/</li>
  <li id="ref-22">Reddit Inc. v. SerpApi LLC et al., S.D.N.Y. 1:25-cv-08736, CourtListener docket (per-defendant collection volumes). https://www.courtlistener.com/docket/71720563/reddit-inc-v-serpapi-llc/</li>
</ol>
