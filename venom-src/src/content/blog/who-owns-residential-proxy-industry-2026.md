---
title: "Who Owns the Residential Proxy Industry That Feeds AI Scraping in 2026"
description: "A follow-the-ownership map of the residential proxy networks behind AI scraping: the Lithuanian and Israeli conglomerates that sell consumer privacy VPNs and the scraping infrastructure that drains publishers, plus why this structure breaks per-crawler defense."
publishDate: 2026-08-11
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

The company that sells you a privacy VPN may share founders and an engineering pipeline with the company that rents your neighbor's home IP address to an AI scraper. That is not a slogan. It is the corporate structure of the residential proxy industry in 2026. A small set of holding companies in Lithuania and Israel sells consumer privacy products on one side of the building and the scraping infrastructure that drains publishers on the other. Understanding who owns what explains why blocking one crawler accomplishes almost nothing.

This post maps the ownership, the revenue, and the acquisitions. It does not give scraping advice. The point is defensive: if you know how the supply side is structured, you can see why per-IP and per-crawler blocking loses, and why value-degradation approaches matter more than cost imposition.

## Key Takeaways

- A handful of conglomerates dominate residential proxies. Bright Data (Israel) and the Oxylabs group (Lithuania, under the Tesonet holding company) are the two largest by revenue, with Bright Data roughly 2.5x Oxylabs.
- The same corporate ecosystems sell consumer privacy. Tesonet shares founders and infrastructure with Nord Security (NordVPN, Surfshark) and also owns the proxy vendors Oxylabs and Decodo. Bright Data grew directly out of Hola VPN.
- The sector is consolidating through acquisition. Oxylabs bought Webshare (over $50M) and ScrapingBee (eight figures) to span the budget and developer tiers; NetNut was acquired by a public company.
- Residential IPs come from real consumer devices through SDKs embedded in apps, a model with documented consent and security problems.
- Reddit's October 2025 lawsuit names Oxylabs UAB and AWM Proxy directly, among the first major cases to name residential proxy providers in an AI scraping matter. It is unresolved, and Oxylabs denies knowledge of misuse.
- Because a few owners control the IP pools, browser farms, and API products across every price tier, blocking one product reroutes traffic through a sister product. This is the structural case for value degradation over cost imposition.

## The conglomerate map: who owns whom

Oxylabs was founded in 2015 in Vilnius, Lithuania. It operates under Tesonet, a holding company founded in 2008 by Tomas Okmanas and Eimantas Sabaliauskas [1]. Tesonet is the shared parent of a cluster of well-known brands: Nord Security (the maker of NordVPN), Surfshark, the web host Hostinger, and the proxy vendor Smartproxy, which rebranded to Decodo in April 2025 [1][2].

The NordVPN relationship needs precision. NordVPN officially asserts independence: it is operated by the Panamanian entity Tefincom S.A., with Tesonet providing infrastructure and services on contract. NordVPN, Surfshark, Oxylabs, and Decodo sit inside the same founder and infrastructure ecosystem; the accurate claim is shared lineage, not that one owns the other. Privacy products and scraping products grow from the same root [1].

Smartproxy, now Decodo, was founded in 2018 in Vilnius as a Tesonet sister company to Oxylabs. It reported roughly $15M in annual revenue in 2025 and more than 85,000 users, positioned as the value tier for small and mid-sized buyers at roughly $1.30 to $3.00 per gigabyte of residential traffic [2]. One holding company therefore fields both the enterprise brand (Oxylabs) and the SMB brand (Decodo).

The Israeli side follows the same pattern. Bright Data, based in Netanya, began in 2014 as a division of Hola VPN, originally under the name Luminati Networks, before spinning out and rebranding. EMK Capital acquired a majority stake in 2017 at an enterprise value of roughly $200M [3]. Bright Data's network did not appear from nowhere. It grew from Hola's user base, where many people did not understand that installing a free VPN turned their connection into an exit node for other people's traffic [3].

![Two countries, Lithuania and Israel, account for most named revenue in the residential proxy industry that supplies AI scraping.](/images/diagrams/proxy-two-countries.png)

Lithuania (Oxylabs, Decodo, and IPRoyal) and Israel (Bright Data and NetNut) account for the bulk of named industry revenue [4]. The market is not diffuse: a short list of firms in two countries holds most of the named revenue.

## The revenue ranking: how big this quietly is

Public revenue figures for proxy firms are scarce because most are privately held, so the numbers below are third-party estimates from sources such as Owler, GetLatka, and Crunchbase, and should be read as estimates rather than audited results [5][6][7].

By those estimates, Bright Data leads at $300M or more in annual recurring revenue in 2025, with a public target of $400M by mid-2026 and growth above 50% year over year [5]. The Oxylabs group sits around $122M with roughly 428 employees and more than 100 patents [6]. Decodo is near $15M [2]. The scraping platform Apify is around $13M [7], and NetNut around $4M [8]. Zyte and IPRoyal do not disclose figures, though both are described as fast growing [4].

Bright Data is roughly 2.5x Oxylabs by revenue and growing faster, which makes it the largest by these revenue estimates [4][5]. Scale shows in traffic volume. Oxylabs reports processing about 1.5 billion requests per day and Bright Data more than 2 billion. Bright Data advertises more than 150M residential IPs across roughly 34M unique clients; Oxylabs advertises more than 175M residential IPs [3][9]. Whichever number is closest to true, the supply side measures in the hundreds of millions of addresses.

## The roll-up: one owner, every price tier

The clearest signal of where this industry is heading is the acquisition record.

Oxylabs acquired Webshare Software, announced in September 2022 and completed in December 2024. Webshare is a Silicon Valley self-service proxy company with more than 10,000 active customers, including Fortune 500 firms. The transaction exceeded $50M and was financed from cash reserves [10]. Webshare gave Oxylabs the budget end of the market. In a separate analysis, the Oxylabs group's Webshare carries the cheapest published residential tier, around $0.98 per gigabyte on an annual 3 TB commitment, which is direct evidence the acquisition bought the low-price floor (see scraping-economics-2026).

Oxylabs then acquired ScrapingBee in June 2025, an eight-figure all-cash deal. ScrapingBee is a French developer-friendly scraping API founded in 2019, with more than 2,500 customers, roughly $5M in annual recurring revenue, and a team of six [11][12]. That purchase added the developer and API tier.

Oxylabs is not alone. NetNut was acquired by Safe-T Group, now Alarum Technologies, in 2019 for $9.6M, which folded a proxy network into a publicly traded entity [8].

Read together, these deals describe a roll-up. Market leaders are buying the budget tier (Webshare) and the developer and API tier (ScrapingBee), and operating the SMB tier as a sister company (Decodo), so that a single conglomerate spans every price point from hobbyist to enterprise. This reading comes from the public acquisition record; no firm has stated the strategy in those terms. The implication for a defender is direct: there is no clean separation between a cheap scraper and an expensive one. They can be the same owner with different logos.

## The device funnel and its ethics: where the IPs come from

Residential proxy networks are valuable precisely because the IP addresses belong to ordinary home connections, which makes the traffic look like a real person browsing. Those addresses come from real consumer devices. The mechanism is a software development kit embedded in a free or paid app. The user consents, often in exchange for ad-free use or a small payment, to route third-party proxy traffic through their device when it is idle. This model powers IPRoyal (through Pawns.app), Bright Data (historically through the Hola VPN SDK), Honeygain, PacketStream, Peer2Profit, and EarnApp [3][13].

This is where the privacy irony becomes concrete. The conglomerates that sell consumer privacy VPNs sit structurally adjacent to the proxy networks that scrape. Nord Security and Tesonet sell NordVPN and Surfshark as privacy products and form the parent ecosystem for Oxylabs and Decodo as scraping infrastructure [1][3]. Bright Data's network grew out of Hola VPN, where most users did not understand they were exit nodes [3][14]. To be precise about scope: there is no evidence that NordVPN or Surfshark route scraping traffic today. The factual claims are shared corporate lineage and Hola's historical exit-node model, not present-day VPN exit-node use.

Security researchers at Trend Micro, Cisco Talos, and Intel 471 document concrete harms. Proxyware networks often do not police exit-node traffic, under-disclose how user bandwidth and data are used, and have at times been bundled with malware including cryptominers and information stealers. Some networks have drawn IPs from devices compromised without the owner's knowledge [13][15][16]. A defender should assume that a meaningful share of residential proxy traffic originates from people who do not fully understand what their device is doing.

![One residential proxy vendor advertises over 175 million home IP addresses sourced from consumer devices, which is why per-IP blocking does not scale.](/images/diagrams/proxy-residential-ips.png)

## Why ownership is a defense problem

Ownership changes what defense can realistically achieve.

The legal exposure is now explicit. Reddit's October 2025 suit in the Southern District of New York (1:25-cv-08736) names Oxylabs UAB as a co-defendant alongside Perplexity, SerpApi, and AWM Proxy. It is one of the first major cases to name residential proxy providers (Oxylabs and AWM Proxy) directly in an AI data-scraping matter. Reddit's chief legal officer described the conduct as industrial-scale data laundering. The docket breaks the alleged collection down per defendant: roughly 2 billion search-result pages via SerpApi, about 781 million via Oxylabs, and about 482 million via AWM Proxy, part of a broader figure of roughly 3 billion across the named intermediaries [17][18][19][22]. Reddit filed a First Amended Complaint on February 9, 2026 [19]. There is no ruling yet, and Oxylabs publicly denies knowledge of any misuse [17][18]. Treat the case as live and unresolved (full docket coverage in litigation-tracker-2026).

The incumbents also litigate each other. The Bright Data versus Oxylabs patent war ran from 2018 through 2025. A 2021 Texas jury awarded Bright Data $7.5M, but the Patent Trial and Appeal Board later invalidated the asserted claims as obvious, the Federal Circuit affirmed, and the Supreme Court declined to take the case, leaving the patents invalidated [20][21]. Two of the largest firms spent years fighting over the same residential-proxy techniques. That is a sign of a mature, contested market.

Here is the payoff for defense. Because a handful of conglomerates own the IP pools, the browser farms, and the API products across every price tier, per-crawler and per-IP defenses cannot keep up. Blocking one product reroutes the request through a sister product, or through a fresh slice of a pool that holds 150M to 175M addresses [3][9]. Rate limiting and fingerprint blocking impose some cost, but the supply side is built to absorb it. In our enforcement-versus-signaling framework, this is the structural argument for value-degradation defenses, including data poisoning and preference signaling such as AIPREF, over pure cost imposition (see cost-imposition-vs-value-degradation). If the goal is to make scraped data less useful rather than marginally more expensive, the consolidation of the supply side stops being your problem and starts being theirs.

The open question is enforcement. Signaling and litigation establish who is responsible; they do not by themselves stop the traffic. Whether Reddit v. Oxylabs produces a ruling that makes proxy providers liable for downstream misuse, and whether that changes the SDK-based supply funnel, is unknown. The way to verify is to watch the docket and to measure, on your own properties, whether traffic from these networks actually declines after a defensive change rather than simply rerouting.

<ol class="references">
  <li>Tesonet, Wikipedia, accessed 2026-06-05. https://en.wikipedia.org/wiki/Tesonet and Tesonet Companies, https://tesonet.com/companies/</li>
  <li>Decodo (Smartproxy) About, accessed 2026-06-05. https://smartproxy.com/about and Proxyway, "Smartproxy Review," https://proxyway.com/reviews/smartproxy-proxies</li>
  <li>Bright Data, Wikipedia, accessed 2026-06-05. https://en.wikipedia.org/wiki/Bright_Data</li>
  <li>Semiautonomous Systems research archive, "Oxylabs and the Scraping Industry," 2026-03-03 (industry revenue ranking and geography).</li>
  <li>Calcalist, "Bright Data hits $300M ARR," accessed 2026-06-05. https://www.calcalistech.com/ctechnews/article/sjeyg2ezwe</li>
  <li>Owler company profile, Oxylabs, accessed 2026-06-05. https://www.owler.com/company/oxylabs</li>
  <li>GetLatka company profile, Apify, accessed 2026-06-05. https://getlatka.com/companies/apify</li>
  <li>Crunchbase, NetNut, accessed 2026-06-05. https://www.crunchbase.com/organization/netnut and NetNut About, https://netnut.io/about/</li>
  <li>Bright Data blog, "Data for AI is fueling massive growth at Bright Data," accessed 2026-06-05. https://brightdata.com/blog/general/data-for-ai-is-fueling-massive-growth-at-bright-data</li>
  <li>Oxylabs blog, "Oxylabs acquires Webshare Software company," accessed 2026-06-05. https://oxylabs.io/blog/oxylabs-acquires-webshare-software-company</li>
  <li>ScrapingBee blog, "ScrapingBee acquisition," accessed 2026-06-05. https://www.scrapingbee.com/blog/scrapingbee-acquisition/</li>
  <li>Tech.eu, "Oxylabs Group strengthens position with eight-figure acquisition of ScrapingBee," 2025-06-20. https://tech.eu/2025/06/20/oxylabs-group-strengthens-position-with-eight-figure-acquisition-of-scrapingbee/</li>
  <li>Trend Micro Research, "Hijacking Your Bandwidth: How Proxyware Apps Open You Up to Risk," accessed 2026-06-05. https://www.trendmicro.com/en/research/23/b/hijacking-your-bandwidth-how-proxyware-apps-open-you-up-to-risk.html</li>
  <li>PCWorld, "Hola VPN extension sold your bandwidth," 2015. https://www.pcworld.com/article/427726/hola-vpn-extension-sold-your-bandwidth.html</li>
  <li>Cisco Talos, "Proxyware abuse," accessed 2026-06-05. https://blog.talosintelligence.com/proxyware-abuse/</li>
  <li>Intel 471, "A look at the residential proxy market," accessed 2026-06-05. https://www.intel471.com/blog/a-look-at-the-residential-proxy-market</li>
  <li>CNBC, "Reddit sues Perplexity and others over scraping," 2025-10-23. https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts.html</li>
  <li>Dataconomy, "Reddit sues Perplexity over alleged large-scale data scraping," 2025-10-23. https://dataconomy.com/2025/10/23/reddit-sues-perplexity-over-alleged-large-scale-data-scraping/</li>
  <li>ChatGPT Is Eating the World, "Reddit files 1st amended complaint v. SerpApi, Oxylabs, AWMProxy, Perplexity AI," 2026-02-09. https://chatgptiseatingtheworld.com/2026/02/09/reddit-files-1st-amended-complaint-v-serpapi-oxylabs-awmproxy-perplexity-ai/</li>
  <li>Oxylabs Legal Timeline, accessed 2026-06-05. https://oxylabs.io/legal-timeline</li>
  <li>USA Herald, "Supreme Court leaves Bright Data patent invalidation ruling intact," accessed 2026-06-05. https://usaherald.com/supreme-court-leaves-bright-data-patent-invalidation-ruling-intact/</li>
  <li>Reddit Inc. v. SerpApi LLC et al., S.D.N.Y. 1:25-cv-08736, CourtListener docket (per-defendant collection volumes), accessed 2026-06-05. https://www.courtlistener.com/docket/71720563/reddit-inc-v-serpapi-llc/</li>
</ol>
