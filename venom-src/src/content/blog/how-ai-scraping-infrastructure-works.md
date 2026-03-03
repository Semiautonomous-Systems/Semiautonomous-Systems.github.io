---
title: "How AI Scraping Infrastructure Works: Proxies, Evasion, and Scale"
description: "Inside the technical infrastructure AI companies use to scrape the web: residential proxy networks, fingerprint emulation, CAPTCHA solving, and why traditional defenses fail."
publishDate: 2026-03-03
keywords: [AI web scraping, residential proxy networks, Bright Data, Oxylabs, web scraping infrastructure, anti-bot evasion, AI training data pipeline]
author: Semiautonomous Systems
---

## Key Takeaways

- Commercial scraping infrastructure routes requests through 150 million+ residential IP addresses, making AI crawlers indistinguishable from real users at the network level<sup><a href="#ref-1">1</a></sup>
- Services like Bright Data and Oxylabs defeat robots.txt, CAPTCHAs, rate limiting, and browser fingerprinting simultaneously, charging approximately $0.01 per page at scale<sup><a href="#ref-2">2</a></sup>
- The proxy industry generated over $400 million in revenue in 2025, with AI training explicitly cited as the primary growth driver<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-3">3</a></sup>
- Traditional defenses (IP blocking, User-Agent filtering, rate limiting) are structurally ineffective against residential proxy networks. Proof-of-work and computational challenges remain effective against commodity bots but not against funded adversaries with headless browsers<sup><a href="#ref-4">4</a></sup>
- The scraping supply chain provides plausible deniability: AI companies buy cleaned datasets from intermediaries who use proxy infrastructure, separating the training lab from the crawling operation

---

## The Scraping Stack

When an AI company needs web content for training, it does not send a single crawler from a data center IP. That approach stopped working years ago. Modern AI scraping runs through a layered infrastructure designed to be indistinguishable from organic human traffic.

The stack has four layers:

1. **Proxy network**: Millions of real residential IP addresses that route scraping requests through consumer internet connections
2. **Browser emulation**: Full graphical browsers running remotely, generating authentic fingerprints
3. **Anti-detection**: Automated CAPTCHA solving, header rotation, TLS fingerprint management, and behavioral mimicry
4. **Orchestration**: APIs that coordinate all of the above, accepting a URL and returning clean HTML

Two companies dominate this market. Bright Data (Israel, formerly Luminati) operates 150 million+ residential IPs and reported over $300 million in annual revenue in 2025<sup><a href="#ref-1">1</a></sup>. Oxylabs (Lithuania, part of the Tesonet group that also operates NordVPN) has 175 million+ IPs and approximately $122 million in revenue<sup><a href="#ref-3">3</a></sup>. Together they process billions of requests per day.

Both companies have explicitly pivoted to AI. Bright Data's CEO described the company as "laser focused on AI clients and use cases, addressing them above everything else."<sup><a href="#ref-1">1</a></sup> Bright Data claims to serve 14 of the top 20 LLM labs.

![The AI scraping stack: residential proxy network with 150M+ IPs, browser emulation defeating fingerprinting, automated CAPTCHA solving, and orchestration API. Cost approximately $0.01 per page.](/images/diagrams/scraping-stack.png)

## Layer 1: The Residential Proxy Network

This is the foundation. Everything else depends on it.

A residential proxy network consists of real consumer devices (PCs, phones, smart TVs, IoT hardware) running an SDK that turns their internet connection into an exit node<sup><a href="#ref-1">1</a></sup>. When a scraping customer sends a request, it is routed through one of these devices and exits onto the public internet from a genuine residential IP address assigned by a real ISP.

From the target website's perspective, the request originates from a Comcast subscriber in Denver or a BT connection in Manchester. There is no technical signal that distinguishes it from a real person opening a browser.

### How devices get enrolled

Bright Data's residential network grew out of Hola VPN, a free consumer VPN launched in 2012<sup><a href="#ref-5">5</a></sup>. Unlike traditional VPNs that route traffic through dedicated servers, Hola operated as a peer-to-peer network: every user's device became an exit node for other users' traffic. Luminati (later Bright Data) was the commercial layer that sold access to this pool.

In 2015, security researchers revealed that most Hola users did not understand they were participating in a commercial proxy network<sup><a href="#ref-6">6</a></sup>. When asked if 100% of users knew they were on a peer-to-peer network, Hola's founder said "the answer is no." The network was used in at least one confirmed DDoS attack against 8chan, where an attacker routed thousands of POST requests through Luminati, creating a 100x traffic spike<sup><a href="#ref-7">7</a></sup>.

After a 2017 private equity acquisition, Bright Data implemented consent mechanisms and KYC requirements. The current model works through SDK partnerships:

- **App developers** integrate Bright Data's SDK into their apps. Users see a consent prompt. In exchange, the developer receives revenue per active user as an alternative to advertising.
- **Smart TV apps** embed the SDK on Samsung Tizen and LG webOS platforms. A February 2026 investigation revealed that smart TVs with these apps route web scraping traffic through the viewer's home network<sup><a href="#ref-8">8</a></sup>. Bright Data pitches developers "100% monetization" of their audience. Google has begun restricting apps that run persistent background SDK processes.
- **Mobile SDKs** enroll phones on 3G/4G/5G connections, providing mobile carrier IP addresses.

The result is a pool of 150 million+ IP addresses across 195 countries, selectable by country, city, carrier, and ASN. Oxylabs operates a comparable network of 175 million+ IPs through similar SDK partnerships<sup><a href="#ref-3">3</a></sup>.

### Why this defeats IP-based defenses

Every IP-based defense fails against this architecture:

- **IP blocklists** are useless. The IPs belong to genuine ISP subscribers. Blocking them means blocking real users.
- **Rate limiting per IP** is meaningless. With 150 million IPs available, a scraper can rotate to a fresh address on every single request. No per-IP threshold is ever triggered.
- **ASN/CIDR blocking** would require blocking entire residential ISPs. Comcast, Verizon, AT&T, BT, Deutsche Telekom -- blocking their address space blocks your actual audience.
- **GeoIP filtering** is defeated by selecting proxy nodes in the target country or city.

The only signal that could distinguish a proxied request from organic traffic is behavioral analysis at the application layer. Which is why the stack has additional layers.

## Layer 2: Browser Emulation

Simple HTTP clients (curl, Python requests, Go's net/http) are easy to detect. They lack JavaScript execution, produce distinctive TLS fingerprints, and do not generate the browser-specific signals that anti-bot systems check.

Commercial scraping services solve this with full graphical browsers running on remote infrastructure<sup><a href="#ref-1">1</a></sup>. Bright Data's "Scraping Browser" and Oxylabs' "Browser Pool" provide Chromium instances that:

- Execute JavaScript normally, triggering all page-load events and dynamic rendering
- Run as GUI browsers (not headless), passing checks for `navigator.webdriver`, Chrome DevTools protocol detection, and headless mode indicators
- Generate authentic canvas fingerprints, WebGL renderer strings, AudioContext outputs, and font enumeration results
- Maintain realistic screen resolutions, device memory values, CPU core counts, and hardware concurrency reports
- Produce TLS ClientHello fingerprints (JA3/JA4) that match genuine Chrome, Safari, or Firefox distributions

These browsers are controlled remotely via Puppeteer or Playwright APIs. The customer writes standard browser automation code; the execution happens on Bright Data's infrastructure and exits through the residential proxy network.

### The fingerprint arms race

Anti-bot vendors like DataDome, Cloudflare Bot Management, and Akamai Bot Manager collect hundreds of browser signals to build a fingerprint<sup><a href="#ref-9">9</a></sup>. Key signals include:

- **TLS fingerprint**: The order and selection of cipher suites, extensions, and supported groups in the TLS ClientHello message. Each browser version produces a distinctive pattern.
- **HTTP/2 settings**: Initial window size, header table size, max concurrent streams. Browsers have characteristic defaults.
- **Canvas fingerprint**: Drawing specific shapes and text to an HTML5 canvas element and hashing the pixel output. Varies by GPU, driver, and OS.
- **WebGL renderer**: The GPU model and driver version reported by WebGL. `ANGLE (Apple, Apple M2, OpenGL 4.1)` identifies a specific hardware configuration.
- **Font enumeration**: Measuring which system fonts are installed by rendering text and checking widths.
- **Navigator properties**: `navigator.hardwareConcurrency`, `navigator.deviceMemory`, `navigator.platform`, and dozens of others.

Commercial scraping browsers maintain databases of real fingerprint profiles collected from genuine browser populations. When a scraping session starts, the browser loads a consistent profile -- matching GPU, fonts, screen size, OS, and browser version into a coherent identity. This is not randomization (which produces detectable inconsistencies) but impersonation of real device configurations.

The anti-bot vendor perspective, from DataDome's analysis of Bright Data: the detection challenge is that "the line between a highly sophisticated bot and a real user has become extremely thin."<sup><a href="#ref-9">9</a></sup>

## Layer 3: Anti-Detection

Even with residential IPs and authentic browser fingerprints, a scraper must handle active challenges.

### CAPTCHA solving

The major proxy services integrate automated solvers for every major CAPTCHA system<sup><a href="#ref-1">1</a></sup>:

- **reCAPTCHA v2/v3**: Solved via a combination of accumulated browser cookies (building a "reputation score" over time), audio challenge transcription, and human solver farms as fallback
- **hCaptcha**: Similar approach, with image classification models handling visual challenges
- **Cloudflare Turnstile**: Bypassed by running in a real browser environment that passes Turnstile's browser integrity checks
- **FunCaptcha, DataDome CAPTCHA, PerimeterX**: Service-specific solvers

Bright Data's Web Unlocker claims a "near 100% success rate" on CAPTCHAs. The system tries automated solving first and falls back to human CAPTCHA farms (services like 2Captcha and Anti-Captcha where humans solve challenges for $1-3 per thousand).

### Behavioral mimicry

Anti-bot systems analyze not just individual requests but patterns:

- **Request timing**: Bots tend to make requests at regular intervals. Scraping services add randomized delays drawn from distributions that model human browsing patterns.
- **Navigation paths**: A real user arrives at a page through search results or internal links. Scraping services can simulate referrer chains and multi-page navigation.
- **Mouse and keyboard events**: Some anti-bot systems inject JavaScript that monitors mouse movement, scroll behavior, and click patterns. Scraping browsers can replay recorded human interaction sequences.
- **Cookie and session management**: Maintaining login sessions, accepting consent banners, and managing cookies across requests.

### Header rotation

Each request carries HTTP headers that match the fingerprint profile:

```
GET /article/example HTTP/2
Host: publisher.example.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
  AppleWebKit/537.36 (KHTML, like Gecko)
  Chrome/122.0.0.0 Safari/537.36
Accept-Language: en-US,en;q=0.9
Accept: text/html,application/xhtml+xml
Sec-CH-UA: "Chromium";v="122", "Not(A:Brand";v="24",
  "Google Chrome";v="122"
Sec-CH-UA-Platform: "macOS"
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
```

The `Sec-CH-UA` client hints, `Accept-Language` preferences, and `Sec-Fetch-*` metadata all align with the browser profile. A Chrome 122 fingerprint carries Chrome 122 headers. Inconsistencies between these signals are a primary detection vector; commercial services eliminate them.

## Layer 4: Orchestration

The customer-facing product bundles all of this into a simple API call.

Bright Data's Web Unlocker accepts a URL and returns rendered HTML<sup><a href="#ref-2">2</a></sup>. Behind the API:

1. Select a residential proxy node matching the target's geography
2. Launch a Scraping Browser with a coherent fingerprint profile
3. Navigate to the URL through the proxy
4. Handle any CAPTCHA or bot challenge automatically
5. Wait for JavaScript rendering to complete
6. Extract and return the page content
7. If blocked, automatically retry with a different IP, profile, and approach

The customer never sees the proxy rotation, CAPTCHA solving, or fingerprint management. They send URLs, receive HTML. Pricing runs $1.50-3.00 per thousand requests through Web Unlocker, or $5.88+ per gigabyte for raw residential proxy bandwidth<sup><a href="#ref-2">2</a></sup>.

At scale, the economics are straightforward. An average web page is roughly 2MB. At $5.88 per gigabyte for residential proxy bandwidth, that is approximately $0.01 per page. Scraping one billion pages -- a reasonable scope for an LLM training corpus -- costs roughly $10 million in proxy fees. This is a rounding error against the $100 million+ GPU compute costs of training a frontier model.

![Cost to scrape 1 billion web pages through residential proxies: approximately $10M in proxy fees versus $100M+ in GPU training compute. Scraping costs are a rounding error.](/images/diagrams/scraping-economics.png)

## The Supply Chain

The proxy infrastructure enables a supply chain that separates the AI lab from the scraping operation.

The chain works like this:

1. **Proxy provider** (Bright Data, Oxylabs) provides the residential IP network and browser infrastructure
2. **Data intermediary** (broker, contractor, or internal team) uses the proxy infrastructure to crawl target websites
3. **Dataset packager** cleans, deduplicates, and formats the scraped content into training-ready datasets
4. **AI lab** purchases or receives the packaged dataset

At each step, the entity doing the work has plausible deniability about the step before it. The AI lab buys a "dataset." The packager provides "publicly available web content." The intermediary uses "commercial proxy services." The proxy provider offers "data collection infrastructure."

Reddit alleged this exact pattern in its October 2025 lawsuit, naming Oxylabs as a co-defendant alongside Perplexity and SerpApi<sup><a href="#ref-10">10</a></sup>. Reddit's chief legal officer described it as "industrial-scale data laundering." The complaint documented 2.8 billion search result pages harvested in a two-week span.

There is also the Common Crawl pathway. Common Crawl is a non-profit that has been crawling the web since 2007, maintaining an archive of 9.5+ petabytes<sup><a href="#ref-11">11</a></sup>. Monthly crawls capture approximately 2.8 billion pages across 38 million domains. CCBot respects robots.txt going forward, but past crawl archives are permanent. Blocking CCBot today does nothing about content already in prior dumps. GPT-3's training data was 60% Common Crawl<sup><a href="#ref-12">12</a></sup>.

Most large-scale pipelines use both paths: Common Crawl for the broad base, commercial scraping infrastructure for targeted, fresh, or robots.txt-protected content.

## What This Means for Defenses

Understanding the scraping stack clarifies which defenses work and which do not.

### What does not work

**robots.txt**: Parsed and ignored. Commercial scraping services offer robots.txt compliance as a toggle: on by default for unverified users, removable after KYC verification<sup><a href="#ref-1">1</a></sup>. The compliance is a gate, not a principle.

**IP blocking and rate limiting**: Structurally defeated by 150 million+ residential IPs. There is no IP-based signal to block.

**User-Agent filtering**: Trivially spoofed. No serious scraping operation identifies itself honestly.

**CAPTCHAs**: Solved automatically at near-100% rates by commercial services. Human solver farms handle the remainder at $1-3 per thousand challenges.

**Headless browser detection**: Defeated by GUI browsers with authentic fingerprints. The `navigator.webdriver` flag, Chrome DevTools protocol detection, and headless mode checks all pass.

### What partially works

**Proof-of-work challenges (Anubis)**: Effective against commodity bots and simple HTTP scrapers. Duke University reported blocking 90% of unwanted traffic<sup><a href="#ref-4">4</a></sup>. But any service already running headless browsers can solve SHA-256 challenges trivially: the computational cost is negligible compared to the value of the data. Codeberg documented bots bypassing Anubis within months of deployment<sup><a href="#ref-4">4</a></sup>. PoW raises the floor but does not stop funded adversaries.

**Tarpits (Nepenthes, AI Labyrinth)**: Waste scraper resources by serving infinite procedurally generated content<sup><a href="#ref-13">13</a></sup>. Effective when the scraper cannot distinguish real content from synthetic filler. But scraping services can detect tarpits through content quality scoring and URL pattern analysis. The arms race continues.

**Behavioral analysis at the application layer**: The most promising technical defense, but also the most expensive to implement. Monitoring mouse movement patterns, scroll velocity, click coordinates, and navigation timing can detect even sophisticated bots. Commercial services are evolving to replay recorded human interactions. False positive rates on legitimate users create business cost.

### What changes the economics

**Litigation**: The $1.5 billion Bartz v. Anthropic settlement and the $3.1 billion UMG v. Anthropic lawsuit are the most consequential developments<sup><a href="#ref-14">14</a></sup>. Reddit's lawsuit naming Oxylabs directly targets the proxy infrastructure layer for the first time. If courts hold proxy providers liable as enablers, the supply chain's plausible deniability collapses.

**Market mechanisms**: Cloudflare's Pay Per Crawl experiment (HTTP 402) creates a legitimate transaction path<sup><a href="#ref-15">15</a></sup>. If AI companies can pay publishers directly for access, the economic incentive shifts from circumvention to commerce. Licensing deals are emerging: Reddit-Google at $60 million per year, News Corp-OpenAI at $250 million+ over five years, Shutterstock-OpenAI at up to $250 million by 2027<sup><a href="#ref-16">16</a></sup>.

**Data poisoning**: Degrades the value of scraped content rather than preventing its collection<sup><a href="#ref-17">17</a></sup>. This is the one defense that the scraping stack cannot route around, because the corruption is embedded in the content itself. If scraped data is unreliable, the economic value of scraping drops regardless of how sophisticated the infrastructure is. For background on how data poisoning works in this context, see our [defensive data poisoning techniques](/blog/defensive-data-poisoning-techniques/) overview.

![Defense effectiveness against commercial scraping infrastructure: robots.txt and IP blocking fail, proof-of-work raises the floor, litigation and data poisoning change the economics](/images/diagrams/scraping-defense-effectiveness.png)

No single layer is sufficient. Signaling (AIPREF) establishes intent. Technical defenses (proof-of-work, tarpits) filter commodity bots and raise costs. Legal action targets infrastructure providers. Data poisoning degrades the value of what gets through. Together, they shift the cost-benefit calculation. For the full framework, see our [cost imposition vs value degradation](/blog/cost-imposition-vs-value-degradation/) analysis.

---

*Last updated: March 2026*

## References

<ol class="references">
<li id="ref-1">Bright Data. Corporate documentation and pricing. <a href="https://brightdata.com/about">https://brightdata.com/about</a></li>
<li id="ref-2">Bright Data. Web Unlocker documentation. <a href="https://docs.brightdata.com/scraping-automation/web-unlocker/introduction">https://docs.brightdata.com/scraping-automation/web-unlocker/introduction</a></li>
<li id="ref-3">Oxylabs. Corporate documentation and proxy network. <a href="https://oxylabs.io/about">https://oxylabs.io/about</a></li>
<li id="ref-4">Anubis GitHub Repository. TecharoHQ. <a href="https://github.com/TecharoHQ/anubis">https://github.com/TecharoHQ/anubis</a></li>
<li id="ref-5">Fortune (2015). "Hola's Luminati Network: How a Free VPN Became a Commercial Proxy." <a href="https://fortune.com/2015/05/29/hola-luminati-vpn/">https://fortune.com/2015/05/29/hola-luminati-vpn/</a></li>
<li id="ref-6">PCWorld (2015). "Ultra-Popular Hola VPN Extension Sold Your Bandwidth for Use in a Botnet Attack." <a href="https://www.pcworld.com/article/427726/ultra-popular-hola-vpn-extension-sold-your-bandwidth-for-use-in-a-botnet-attack.html">https://www.pcworld.com/article/427726/ultra-popular-hola-vpn-extension-sold-your-bandwidth-for-use-in-a-botnet-attack.html</a></li>
<li id="ref-7">The Register (2015). "Hola VPN Used to Create Botnet for DDoS Attack." <a href="https://www.theregister.com/2015/05/29/hola_vpn_used_8chan_takedown_botnet_or_not/">https://www.theregister.com/2015/05/29/hola_vpn_used_8chan_takedown_botnet_or_not/</a></li>
<li id="ref-8">TechSpot (2026). "Smart TV Apps Quietly Scraping Web Data for AI Training." <a href="https://www.techspot.com/news/111492-smart-tv-apps-quietly-scraping-web-data-ai.html">https://www.techspot.com/news/111492-smart-tv-apps-quietly-scraping-web-data-ai.html</a></li>
<li id="ref-9">DataDome. "Bright Data Web Unlocker Analysis." <a href="https://datadome.co/web-unblockers/bright-data/">https://datadome.co/web-unblockers/bright-data/</a></li>
<li id="ref-10">CNBC (2025). "Reddit Sues Perplexity, Oxylabs Over AI Data Scraping." <a href="https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts-openai-chatgpt-google-gemini-lawsuit.html">https://www.cnbc.com/2025/10/23/reddit-user-data-battle-ai-industry-sues-perplexity-scraping-posts-openai-chatgpt-google-gemini-lawsuit.html</a></li>
<li id="ref-11">Common Crawl. "Overview." <a href="https://commoncrawl.org/overview">https://commoncrawl.org/overview</a></li>
<li id="ref-12">Brown, T. et al. (2020). "Language Models are Few-Shot Learners." GPT-3 paper. <a href="https://arxiv.org/abs/2005.14165">https://arxiv.org/abs/2005.14165</a></li>
<li id="ref-13">Cloudflare (2025). "AI Labyrinth: Trapping AI Crawlers with Procedurally Generated Content." <a href="https://blog.cloudflare.com/ai-labyrinth">https://blog.cloudflare.com/ai-labyrinth</a></li>
<li id="ref-14">Reuters (2025-2026). AI Copyright Litigation. <a href="https://www.reuters.com/legal/litigation/">https://www.reuters.com/legal/litigation/</a></li>
<li id="ref-15">Cloudflare (2025). "AI Audit and Pay Per Crawl." <a href="https://blog.cloudflare.com/ai-audit">https://blog.cloudflare.com/ai-audit</a></li>
<li id="ref-16">Various. AI Training Data Licensing Deals. Reddit-Google ($60M/yr, 2024), News Corp-OpenAI ($250M+, 2024), Shutterstock-OpenAI (up to $250M by 2027).</li>
<li id="ref-17">Shan, S. et al. (2023). "Nightshade: Prompt-Specific Poisoning Attacks on Text-to-Image Generative Models." <a href="https://nightshade.cs.uchicago.edu/whatis.html">https://nightshade.cs.uchicago.edu/whatis.html</a></li>
</ol>
