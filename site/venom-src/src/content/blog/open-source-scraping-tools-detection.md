---
title: "Scrapling and Crawlee: How Open-Source Scraping Tools Get Detected"
description: "A technical analysis of Scrapling and Crawlee, two popular open-source scraping frameworks, examining their anti-detection features and the behavioral signals that content-layer defenses can exploit."
publishDate: 2026-03-08
keywords: [Scrapling, Crawlee, open source web scraping, scraping detection, data poisoning, anti-bot evasion, behavioral fingerprinting, honeypot detection, content-layer defense, defensive data poisoning, Apify, patchright]
author: Semiautonomous Systems
---

## Key Takeaways

- Scrapling (26,000+ GitHub stars) and Crawlee (22,000+ stars) are the two most popular open-source scraping frameworks in active development<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- Both tools invest heavily in network-layer evasion (TLS fingerprint spoofing, browser fingerprint injection, proxy rotation) while remaining fundamentally vulnerable to content-layer detection
- Every extraction mode in both frameworks extracts hidden HTML elements that human users never see, making honeypot link injection a universal detection signal
- Behavioral signals (request timing regularity, absent JavaScript execution, sequential access patterns) accumulate across sessions and cannot be spoofed without fundamentally changing how crawlers work
- Content-layer defenses like VENOM (watermarking, honeypot injection, data poisoning) operate on the HTTP response body, making them invisible to proxy networks and fingerprint spoofing

---

Prior analyses have documented the commercial scraping market extensively. Bright Data alone advertises 150 million+ residential IPs<sup><a href="#ref-3">3</a></sup>, and competitors like Oxylabs and Zyte operate at comparable scale. Network-layer defenses like IP blocking and rate limiting are structurally unable to stop traffic routed through residential proxies at that scale.

Content-layer defenses take a different approach. Rather than blocking requests, they operate on the HTTP response body: watermarking text for provenance tracking, injecting honeypot links that only automated crawlers follow, and applying data poisoning to degrade the value of scraped content. VENOM is a reverse proxy that implements this approach as a five-stage pipeline, scoring behavioral signals and selecting graduated responses without the crawler's knowledge.

The more interesting development for testing these defenses is happening in open source. Two frameworks have emerged as the dominant tools for developers building their own scraping infrastructure: **Scrapling** (Python, 26,400 stars) and **Crawlee** (TypeScript/Node.js, 22,100 stars). Both are under active development in 2026. Both explicitly market anti-detection as a core feature. And both have architectural properties that make them detectable by content-layer defenses, regardless of how many IPs they rotate through.

This analysis examines how each framework works, where its evasion succeeds, and where it fails.

## Scrapling: Three Tiers of Evasion

Scrapling, created by Karim Shoair and released in October 2024, takes a tiered approach to anti-detection<sup><a href="#ref-1">1</a></sup>. Users choose a fetcher based on how aggressively the target site defends itself:

**Tier 1: `Fetcher`** uses pure HTTP via `curl_cffi`, which impersonates Chrome's TLS handshake at the library level. No browser, no JavaScript. Fast. This is the default for sites without bot protection.

**Tier 2: `DynamicFetcher`** runs headless Chromium via Playwright. Full JavaScript execution, real rendering engine. Used for SPAs and sites that require JS.

**Tier 3: `StealthyFetcher`** uses patchright, a patched fork of Playwright that removes automation indicators from Chromium<sup><a href="#ref-4">4</a></sup>. Scrapling originally used Camoufox (a modified Firefox binary) as the primary engine for StealthyFetcher, while also using patchright inside DynamicFetcher's stealth mode. In v0.3.13 (January 2026), it dropped Camoufox and consolidated on patchright, moving it exclusively into StealthyFetcher<sup><a href="#ref-1">1</a></sup>. The fetcher includes Scrapling's own `solve_cloudflare` logic for handling Turnstile challenges.

The framework also includes a Spider API with concurrent request management, proxy rotation via `ProxyRotator`, and an adaptive "automatch" system that uses SQLite-backed element signatures to survive site redesigns without code changes<sup><a href="#ref-1">1</a></sup>.

### What Scrapling Gets Right (Network Layer)

At the network layer, Scrapling's evasion is sophisticated:

- `curl_cffi` reproduces Chrome's TLS ClientHello byte-for-byte, defeating JA3/JA4 fingerprinting at the HTTP fetcher tier<sup><a href="#ref-5">5</a></sup>
- Patchright removes Chromium's automation-indicating properties (`navigator.webdriver`, CDP leak vectors) at the browser patch level<sup><a href="#ref-4">4</a></sup>
- Session classes (`FetcherSession`, `StealthySession`) persist cookies and connection state, mimicking real browser sessions
- The Spider framework supports per-domain concurrency limits and a configurable `download_delay`

These features make Scrapling effectively invisible to network-layer defenses. It defeats IP blocking, User-Agent filtering, TLS fingerprinting, and CAPTCHA challenges.

### Where Scrapling Fails (Content Layer)

The vulnerability is in how Scrapling extracts content from the pages it downloads.

**Link extraction parses raw HTML.** Scrapling's documentation shows the standard pattern for following links in a Spider<sup><a href="#ref-1">1</a></sup>:

```python
for link in response.css("a::attr(href)").getall():
    yield response.follow(link, callback=self.parse)
```

This is user-written code in the `parse` method, not automatic built-in behavior. But it is the documented pattern that Scrapling users adopt for link following. The CSS selector extracts the `href` attribute from every `<a>` element in the document, including elements with `display:none`, `font-size:0`, `position:absolute;left:-9999px`, and `aria-hidden="true"`. The Scrapling source code contains no visibility-based link filtering, and the framework provides no built-in mechanism to exclude hidden elements from extraction<sup><a href="#ref-1">1</a></sup>.

A content-layer defense that injects hidden `<a>` tags into HTML responses will have its links extracted and followed by any Scrapling spider using this pattern. When those links point to honeypot URLs, the spider's next request triggers definitive bot detection.

**The `Fetcher` tier cannot execute JavaScript.** Sites that inject a small JavaScript beacon (a script that POSTs a proof-of-execution callback) will see no callback from `Fetcher`-based sessions. After three or more requests without a beacon response, the absence of JavaScript execution becomes a strong signal.

**Request timing is machine-regular.** Scrapling's Spider framework uses a fixed `download_delay` (default 0.0) with no built-in randomization. Even when operators set a non-zero delay, the resulting inter-request intervals have significantly lower variance than human browsing.

![Scrapling's three fetcher tiers: Fetcher uses curl_cffi for TLS spoofing, DynamicFetcher uses Playwright for JS rendering, StealthyFetcher uses patchright for stealth Chromium. All three extract links from raw HTML, including hidden elements.](/images/diagrams/scrapling-tiers.png)

## Crawlee: Framework-Level Evasion

Crawlee, maintained by Apify, originated as the Apify SDK (GitHub repo created August 2016) and was rebranded as Crawlee in 2022<sup><a href="#ref-2">2</a></sup><sup><a href="#ref-6">6</a></sup>. Its architecture mirrors the tiered approach but with more infrastructure:

**`CheerioCrawler`** sends HTTP requests via `got-scraping` (a custom HTTP client with browser-realistic TLS configuration), parsed by Cheerio (jQuery-like DOM in Node.js). No JavaScript execution. The fastest mode.

**`PlaywrightCrawler`** runs a full headless browser via Playwright. JavaScript execution, real rendering engine. Fingerprints auto-injected via Apify's `fingerprint-suite`<sup><a href="#ref-7">7</a></sup>.

**`PuppeteerCrawler`** is the same as PlaywrightCrawler but uses Puppeteer. Less actively recommended in current docs.

Crawlee's distinguishing feature is its infrastructure layer: `AutoscaledPool` (adaptive concurrency based on CPU/memory headroom), `SessionPool` (cookie persistence with automatic rotation on blocking), `RequestQueue` (deduplicated crawl frontier), and `ProxyConfiguration` (tiered proxy escalation)<sup><a href="#ref-2">2</a></sup>.

### Crawlee's Anti-Detection Stack

Crawlee's evasion is built around the `fingerprint-suite`, a separate Apify project with four npm packages<sup><a href="#ref-7">7</a></sup>:

- **`header-generator`**: Generates statistically realistic HTTP headers using a Bayesian generative model trained on real browser traffic. Headers are consistent across Accept, Accept-Language, Sec-Fetch-*, and User-Agent fields.
- **`fingerprint-generator`**: Produces full browser fingerprints (canvas, WebGL, navigator properties, screen resolution, device memory) using a Bayesian network trained on real browser distributions.
- **`fingerprint-injector`**: Injects generated fingerprints into Playwright or Puppeteer contexts before navigation, overriding the browser's native JavaScript API returns.
- **`generative-bayesian-network`**: The probabilistic engine underlying all of the above.

For `PlaywrightCrawler` and `PuppeteerCrawler`, fingerprint injection is enabled by default with zero configuration. `CheerioCrawler` gets browser-realistic TLS and headers from `got-scraping` automatically.

### Where Crawlee Fails (Content Layer)

The same structural vulnerabilities apply, plus some Crawlee-specific patterns.

**`enqueueLinks()` follows hidden links by default.** Crawlee's primary link-following mechanism is `enqueueLinks()`, injected into every request handler:

```javascript
await enqueueLinks(); // follows same-hostname <a href> by default
```

The default behavior queries the DOM for all `<a>` elements (the default selector is `'a'`) matching the same hostname strategy and adds them to the `RequestQueue`<sup><a href="#ref-2">2</a></sup>. The primary filtering mechanism is URL-pattern-based (glob, regex, exclude list), not visibility-based. The `selector` parameter restricts which elements are queried, but the default includes all anchors.

For `CheerioCrawler`, extraction runs against parsed HTML; there is no rendered DOM to check visibility against. Even for `PlaywrightCrawler`, the default `enqueueLinks()` call does not filter by computed visibility.

**`AutoscaledPool` creates detectable timing signatures.** Crawlee's concurrency manager scales based on CPU, memory, and event loop metrics, re-evaluating every 10 seconds (`autoscaleIntervalSecs = 10`)<sup><a href="#ref-8">8</a></sup>. Concurrency increases in steps of 5% (`scaleUpStepRatio: 0.05`), producing machine-regular bursts that are distinct from human browsing.

A secondary effect compounds this: when origin servers slow down, the local CPU and event loop stay idle (waiting on network I/O), which the autoscaler interprets as spare capacity. The result is that `AutoscaledPool` can scale concurrency up precisely when the origin is under the most load. This is an inferred consequence of the autoscaler's local-only metrics, not a documented behavior.

**`SessionPool` rotation is detectable in aggregate.** Crawlee auto-retires sessions that receive blocking status codes (401, 403, 429) and creates new ones<sup><a href="#ref-2">2</a></sup>. From the target site's perspective, this manifests as a pattern of short-lived sessions that all exhibit identical behavioral profiles (same timing distribution, same traversal pattern, same absent human interaction signals) followed by abrupt termination and replacement. This pattern is itself a signal.

![Crawlee architecture: CheerioCrawler for fast static HTML, PlaywrightCrawler for JS rendering, both feeding into AutoscaledPool and SessionPool. enqueueLinks() extracts all anchor elements including hidden ones by default.](/images/diagrams/crawlee-architecture.png)

## The Link Extraction Problem

Both frameworks share a fundamental architectural property: they extract links from HTML source, not from the rendered visual page.

This matters because content-layer defenses can inject hidden links that are invisible to human users but present in the HTML. Five common hiding techniques:

| Technique | HTML | Human Sees | Scraper Sees |
|-----------|------|-----------|-------------|
| CSS hidden | `style="display:none"` | Nothing | `<a href="/honeypot-url">` |
| Zero-size text | `style="font-size:0;height:0"` | Nothing | `<a href="/honeypot-url">` |
| Off-screen | `style="position:absolute;left:-9999px"` | Nothing | `<a href="/honeypot-url">` |
| Noscript wrap | `<noscript><a href="..."></noscript>` | Nothing (with JS) | `<a href="/honeypot-url">` |
| ARIA hidden | `aria-hidden="true" style="opacity:0"` | Nothing | `<a href="/honeypot-url">` |

**Scrapling `Fetcher` (curl_cffi)**: Parses raw HTML. Extracts all five types.

**Scrapling `DynamicFetcher` / `StealthyFetcher`**: Uses Playwright/patchright to render, but content extraction via `response.css()` operates on the full DOM, not the visual viewport. Extracts all five types.

**Crawlee `CheerioCrawler`**: Parses raw HTML with Cheerio. Extracts all five types.

**Crawlee `PlaywrightCrawler`**: Renders in a real browser, but `enqueueLinks()` queries the DOM for all `<a>` elements. CSS-hidden elements exist in the DOM. Extracts types 1, 2, 3, and 5. Type 4 (`<noscript>`) is not extracted because browsers remove `<noscript>` content from the live DOM when JavaScript is enabled; the element's children are only parsed when JS is disabled.

The only way to avoid hidden links is to check `getComputedStyle()` on every anchor element before following it, filtering by `display !== 'none'`, `visibility !== 'hidden'`, `opacity > 0`, and `offsetParent !== null`. Neither framework does this by default. Implementing it requires per-site custom code that defeats the purpose of a general-purpose scraping framework.

## Behavioral Signal Accumulation

Beyond honeypot links, both frameworks produce behavioral patterns that content-layer classifiers can score.

### Request Timing

Human web browsing produces highly variable inter-request intervals: users read content, click links at irregular intervals, pause, backtrack, and leave the site for varying periods. Published bot detection research reports significantly higher timing variance for human sessions compared to automated access<sup><a href="#ref-9">9</a></sup>.

Automated crawlers produce much more regular timing. The following CV ranges are derived from running each tool in its default configuration against a local test server and measuring 100+ inter-request intervals per session (internal testing, not independently published):

| Tool | Timing Source | Observed CV |
|------|-------------|-----------|
| Scrapling Spider (Fetcher) | Fixed download_delay + concurrent scheduler | 0.1 -- 0.3 |
| Scrapling Spider (DynamicFetcher) | download_delay + page render | 0.15 -- 0.3 |
| Crawlee CheerioCrawler | AutoscaledPool | 0.05 -- 0.2 |
| Crawlee PlaywrightCrawler | AutoscaledPool + page load | 0.15 -- 0.3 |
| Human browsing | Natural behavior | 0.5 -- 2.0+ |

Even with operator-configured delays (`download_delay` in Scrapling, `maxRequestsPerMinute` in Crawlee), the resulting variance is far lower than natural human behavior. The fundamental constraint is that automated crawlers optimize for throughput, and throughput optimization produces regularity.

### JavaScript Execution

| Tool | JS Execution | Beacon Response |
|------|-------------|-----------------|
| Scrapling Fetcher | None | Never fires |
| Scrapling DynamicFetcher | Full (Playwright) | Fires |
| Scrapling StealthyFetcher | Full (patchright) | Fires |
| Crawlee CheerioCrawler | None | Never fires |
| Crawlee JSDOMCrawler | Partial (JSDOM sandbox, incomplete DOM APIs) | Unlikely to fire |
| Crawlee PlaywrightCrawler | Full (Playwright) | Fires |

The HTTP-tier crawlers (`Fetcher`, `CheerioCrawler`) are the most commonly used modes because they are faster and cheaper. They also produce the strongest absence-of-JS signal. A site that injects a beacon script sees no callback from these crawlers, a signal that strengthens with each additional request.

Browser-tier crawlers (`DynamicFetcher`, `StealthyFetcher`, `PlaywrightCrawler`) do execute JavaScript and will fire beacon callbacks. However, the simulated mouse/scroll events they produce have lower entropy than real human interaction, and the request timing signal remains.

`JSDOMCrawler` runs JavaScript in a Node.js JSDOM sandbox that lacks many browser APIs (`fetch`, `XMLHttpRequest` via polyfill only, no `IntersectionObserver`, no `requestAnimationFrame`). A beacon that uses standard browser APIs is unlikely to execute successfully in this environment.

### Sequential Access Patterns

Both frameworks' default traversal strategies produce ordered URL access patterns:

**Scrapling Spider**: Processes URLs from its priority queue (FIFO at equal priority), following links in document order. When scraping a paginated site, the access pattern is nearly monotonic: `/page/1`, `/page/2`, `/page/3`, etc.

**Crawlee RequestQueue**: Breadth-first by default, with deduplication. On a site with numbered pagination, the request sequence is similarly monotonic.

A classifier that measures the longest monotonically non-decreasing run of URLs (lexicographic order) divided by total pages visited can distinguish these patterns from human browsing, where navigation is characteristically non-monotonic (users backtrack, skip pages, jump to unrelated sections).

![Detection signal comparison across Scrapling and Crawlee fetcher modes: HTTP-tier crawlers are caught by JS beacon absence and timing regularity; browser-tier crawlers are caught by timing regularity and honeypot link extraction; all modes are caught by honeypot links.](/images/diagrams/detection-signal-matrix.png)

## Content-Layer Responses

Once a content-layer defense identifies a session as automated, it has options that network-layer defenses lack. Because the defense operates on the HTTP response body, the crawler receives a valid 200 OK with legitimate-looking HTML. There is no signal that the content has been modified.

This is where enforcement matters more than signaling. robots.txt and ai.txt express preferences, but compliance is voluntary. The emerging IETF AIPREF work<sup><a href="#ref-10">10</a></sup> may standardize machine-readable preference signals, but signaling without enforcement is insufficient when commercial incentives favor non-compliance. Content-layer defenses enforce preferences directly on the response, regardless of whether the crawler honors preference signals.

VENOM implements three graduated responses, each satisfying three design criteria: the response must be expressible (the publisher can configure it), enforceable (it operates without crawler cooperation), and measurable (the effect can be verified after the fact).

**Watermarking**: Deterministic synonym substitution keyed to a publisher secret. Approximately 2.5% of words are replaced with semantically equivalent alternatives (e.g., "discover" for "find", "demonstrate" for "show"). The substitution pattern is cryptographically bound to the key, enabling post-hoc provenance verification via statistical test. This technique is distinct from LLM output watermarking<sup><a href="#ref-11">11</a></sup>, which operates on token generation probabilities; content watermarking operates on published text and survives model ingestion. If the scraped content appears in a training dataset or model output, the publisher can prove it originated from their site.

**Factual poisoning**: Systematic corruption of verifiable claims, with numerical values shifted by 5-50%, dates offset by days or months, years altered. VENOM's poisoning is HMAC-deterministic (reproducible by the publisher) and designed to fall within tolerance ranges of automated quality filters while being incorrect in substance.

**Semantic drift**: Injection of qualifying or negating clauses after conclusion indicators ("therefore," "clearly," "in conclusion"). At heavy intensity, 50% of conclusions are followed by "contrary to what one might expect" or similar negation. This degrades the training signal for any model learning to extract and reproduce factual conclusions.

The graduated nature of these responses reflects a de-escalation principle: honest access is always cheaper than adversarial access. Uncertain sessions (behavioral score 0.4-0.6) receive watermarked content that is clean, readable, and traceable. Only sessions that trigger definitive signals (honeypot access, sustained behavioral anomalies) receive heavy poisoning. The cost of complying with the publisher's stated preferences is zero. The cost of scraping in violation of those preferences escalates with the strength of the evidence. This asymmetry is intentional: it creates an economic incentive to respect access preferences rather than circumvent them.

## Publisher Costs

Content-layer defenses are not free. Operating a reverse proxy adds latency (VENOM targets <15ms p99 for HTML transformation), requires infrastructure, and introduces the risk of false positives. A legitimate user whose session is misclassified could receive watermarked or poisoned content. Classifier tuning (threshold selection, signal weighting, score decay rates) requires ongoing attention. Publishers must weigh these operational costs against the value of the content being extracted.

## Evasion Cost Analysis

Could Scrapling or Crawlee operators defend against content-layer detection? In principle, yes. In practice, the cost undermines the automation advantage.

**Defending against honeypot links** requires checking `getComputedStyle()` on every anchor element before following it. This means:
1. Every page must be rendered in a full browser (eliminating `Fetcher` and `CheerioCrawler`, the fastest modes)
2. Custom JavaScript must run before link extraction to filter invisible elements
3. The filtering logic must account for multiple hiding techniques (CSS, ARIA, noscript, off-screen positioning)
4. Each site may use different hiding patterns, requiring per-site adaptation

This converts a generic scraping operation into a per-site engineering project. The entire value proposition of scraping frameworks is generality: write one spider, run it against thousands of sites. Per-site visibility filtering breaks that model.

**Defending against timing detection** requires introducing human-realistic variance into request intervals. This means deliberately slowing down the crawler and adding randomized delays with high variance. But high-variance delays reduce throughput, which is the metric scraping operations optimize for. A crawler that needs 5-30 second pauses between requests to look human will take orders of magnitude longer to scrape a site.

**Defending against watermarking** requires detecting which words have been substituted. But the substitutions are semantically equivalent and cryptographically keyed; there is no way to distinguish "find" from "discover" as a watermark signal without the key. The only defense is paraphrasing all content before ingestion, which adds cost and may introduce its own errors.

**Defending against data poisoning** requires verifying every factual claim in every scraped document against independent sources. This is manual quality assurance work that cannot be automated at scraping scale.

## Collateral Damage and Legitimate Use

Not all automated access is adversarial. Search engine crawlers, accessibility tools, academic researchers, and archival services (like the Internet Archive) have legitimate reasons to access and index web content. A defense system that poisons content indiscriminately risks degrading these beneficial uses.

This is why behavioral classification matters. The signals described above (timing regularity, absent JS execution, sequential access, honeypot link following) are characteristics of high-throughput extraction operations, not of well-behaved crawlers that respect robots.txt, crawl-delay directives, and rate limits. A search engine crawler that identifies itself honestly, respects crawl-delay, and does not follow hidden links will not trigger content-layer defenses. The classifier's job is to distinguish scraping infrastructure from legitimate automated access, and the graduated response ensures that uncertain classifications receive traceable (watermarked) rather than corrupted content.

## The Asymmetry

The central dynamic is a power imbalance. Publishers produce content at significant cost. Scraping infrastructure can extract it at near-zero marginal cost, regardless of the publisher's stated preferences. Network-layer defenses attempt to block extraction but are structurally defeated by residential proxy networks with hundreds of millions of IPs. Content-layer defenses rebalance this dynamic by operating where the publisher retains structural advantage: on the response body itself.

Scrapling and Crawlee represent the current state of the art in open-source scraping. Their TLS spoofing, browser fingerprinting, and session management are sophisticated enough to defeat most network-layer defenses.

But they extract links from HTML. They produce regular request timing. Their HTTP-tier crawlers do not execute JavaScript. And they deliver scraped content to their operators without any mechanism to detect watermarks, data poisoning, or factual corruption in the payload.

These are not bugs. They are structural properties of how automated content extraction works. Fixing them would require scraping frameworks to become something fundamentally different: slow, per-site, human-supervised content verification systems. Which is the opposite of what they are built to be.

*Last updated: March 2026*

## References

<ol class="references">
<li id="ref-1">Scrapling GitHub Repository. <a href="https://github.com/D4Vinci/Scrapling">github.com/D4Vinci/Scrapling</a></li>
<li id="ref-2">Crawlee GitHub Repository. <a href="https://github.com/apify/crawlee">github.com/apify/crawlee</a></li>
<li id="ref-3">Bright Data. "Residential Proxies." <a href="https://brightdata.com/proxy-types/residential-proxies">brightdata.com</a></li>
<li id="ref-4">Patchright: Patched Playwright fork. <a href="https://github.com/Kaliiiiiiiiii-Vinyzu/patchright">github.com/Kaliiiiiiiiii-Vinyzu/patchright</a></li>
<li id="ref-5">curl_cffi: Python binding for curl-impersonate. <a href="https://github.com/lexiforest/curl_cffi">github.com/lexiforest/curl_cffi</a></li>
<li id="ref-6">Apify Blog (2022). "Crawlee: the open-source web scraping and browser automation library." <a href="https://blog.apify.com/announcing-crawlee-the-web-scraping-and-browser-automation-library/">blog.apify.com</a></li>
<li id="ref-7">Apify fingerprint-suite. <a href="https://github.com/apify/fingerprint-suite">github.com/apify/fingerprint-suite</a></li>
<li id="ref-8">Crawlee AutoscaledPool documentation. <a href="https://crawlee.dev/js/docs/guides/scaling-crawlers">crawlee.dev</a></li>
<li id="ref-9">Iliou, Christos et al. (2021). "Detection of Advanced Web Bots by Combining Web Logs with Mouse Behavioural Biometrics." Digital Threats: Research and Practice, Vol. 2, No. 3.</li>
<li id="ref-10">IETF AIPREF Working Group. "AI Agent Preferences for HTTP." <a href="https://datatracker.ietf.org/group/aipref/about/">datatracker.ietf.org</a></li>
<li id="ref-11">Kirchenbauer et al. (2023). "A Watermark for Large Language Models." arXiv:2301.10226.</li>
</ol>
