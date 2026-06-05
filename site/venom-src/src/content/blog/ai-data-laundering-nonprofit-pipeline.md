---
title: "How AI Data Laundering Uses Non-Profit Research to Shield Commercial Models"
description: "AI data laundering routes web-scraped content through academic and non-profit datasets so commercial labs can train on material they could not legally collect themselves. The mechanism, the LAION case, the 2025 Hamburg ruling, and why robots.txt cannot reach it."
publishDate: 2026-10-13
keywords: [AI data laundering, LAION lawsuit, Kneschke v LAION, The Pile dataset, research exception AI training, training data provenance, non-profit AI dataset]
author: Semiautonomous Systems
---

## Key Takeaways

- AI data laundering inserts a non-profit or academic intermediary between the scrape and the model. The intermediary collects under a research exception, the commercial lab trains on the open-licensed result, and legal responsibility for the scraping evaporates at each handoff<sup><a href="#ref-1">1</a></sup>
- Andy Baio coined the term in September 2022. Original creators are never asked for consent, and no party in the chain holds direct liability for the scraping<sup><a href="#ref-1">1</a></sup>
- In Kneschke v. LAION, the Hanseatic Higher Regional Court Hamburg (OLG Hamburg, case 5 U 104/24, December 10, 2025) affirmed that LAION's dataset creation did not infringe copyright, because LAION assembled it under the EU scientific-research text-and-data-mining exception. The court held Kneschke's opt-out failed because it was not machine-readable, which means a machine-readable reservation can bind general commercial mining even where the research exception controlled here. A court has now validated the upstream half of the laundering structure<sup><a href="#ref-3">3</a></sup>
- LAION-5B, a dataset built by a German non-profit with funding from commercial AI firms, trained Stable Diffusion, Imagen, and Make-A-Video<sup><a href="#ref-2">2</a></sup>. Stanford later found 3,226 suspected CSAM links inside it, 1,008 of them externally validated, which is the clearest illustration of why a commercial lab prefers a third party to assemble the corpus<sup><a href="#ref-4">4</a></sup>
- Text-side laundering runs the same way. The Pile bundled 196,640 shadow-library books (Books3) and 173,536 transcribed YouTube videos, both consumed by major labs before takedowns arrived<sup><a href="#ref-5">5</a></sup><sup><a href="#ref-6">6</a></sup><sup><a href="#ref-7">7</a></sup>
- The structure is contested, not settled. Hamburg protects the upstream non-profit under EU text-and-data-mining law, while the U.S. Copyright Office has signaled that downstream commercial training is not automatically fair use<sup><a href="#ref-8">8</a></sup>

---

Stable Diffusion learned to generate images from a billion non-consented photographs. No part of that training was done by Stability AI. A German non-profit, LAION e.V., scraped the web and released the result as an open research dataset. Stability then trained on it and pointed to the license<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>.

Andy Baio named this pattern "AI data laundering" in September 2022, and the term is precise<sup><a href="#ref-1">1</a></sup>. A lab that scraped a billion images itself would carry the full copyright and reputational exposure of that act. A lab that downloads a research dataset claims it relied in good faith on someone else's license. The work is identical. The liability is not. Laundering is the transfer of legal responsibility away from the company that benefits, achieved by inserting a research intermediary between the scrape and the model.

This matters because it defeats consent signaling by construction. A robots.txt directive or an [AIPREF](/blog/understanding-aipref-ietf-standard/) preference is aimed at the crawler hitting your server. Laundering moves the crawl to an intermediary you never see, then hands the model a dataset rather than a scrape. The signal has nothing to attach to. This piece traces the mechanism, the German court that validated its upstream half, and which defenses can actually reach a structure built to bypass signaling.

## The Mechanism

Laundering runs as a chain, and each link sheds a layer of legal responsibility<sup><a href="#ref-1">1</a></sup>:

1. **Proxy services** rotate IP addresses and anonymize the origin of requests.
2. **[Scraping-as-a-service companies](/blog/scraping-economics-2026/)** like Bright Data and Oxylabs sell collection as a commodity.
3. **Academic or non-profit researchers** scrape the open web under a research exception and assemble a dataset.
4. **Open repositories** like Hugging Face and GitHub host the dataset, often with unclear or absent licensing.
5. **The AI company** trains on the result and claims reliance on the dataset's stated license.

Read the chain from the bottom up and the design becomes legible. The commercial lab points to the open license. The repository points to the uploader. The researcher points to the research exception. The scraping vendor points to its customer's stated purpose. The proxy points to nothing at all, because it has anonymized away the trail. No single layer holds the whole act.

Not every laundered dataset uses all five links, and the simplest cases skip the proxy and vendor layers entirely. The point is structural. Each intermediary between the creator and the model converts a question of liability into a question of provenance, and provenance is exactly what these repositories do not reliably track. The people whose work was scraped are never asked for consent and have no single party to hold responsible.

![The five-link AI data laundering chain, top to bottom: proxy services anonymize the request origin, scraping-as-a-service vendors sell collection as a commodity, non-profit researchers scrape under a research exception, open repositories host the dataset with unclear licensing, and the AI company trains on it while citing the open license. Each link sheds a layer of legal responsibility.](/images/diagrams/laundering-pipeline.png)

## LAION: The Canonical Case

LAION-5B is the clearest example. It holds roughly five billion image-text pairs, assembled by LAION e.V. with funding from commercial AI firms including Stability AI<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>. That funding detail is the crux. The beneficiary pays for the intermediary that absorbs the liability. Risk flows downstream onto the research organization and the creators whose work it ingested; value flows upstream to the lab that trains on the result. LAION-5B trained Stable Diffusion, Google's Imagen, and Meta's Make-A-Video<sup><a href="#ref-2">2</a></sup>.

The open license obscures where the content came from. Baio traced a 12-million-image sample back to Pinterest (more than one million images), WordPress blogs (roughly 819,000), Flickr (roughly 121,000), and DeviantArt (roughly 67,000). None of these sources agreed to AI-training use<sup><a href="#ref-1">1</a></sup>. The dataset does not host the images. It hosts URLs and captions, which is part of how it claims to sit inside a research exception. The images still belong to the people who posted them.

Laundering is more than a copyright convenience, and the next finding shows why. In December 2023 the Stanford Internet Observatory found 3,226 suspected links to child sexual abuse material in LAION-5B, 1,008 of them externally validated<sup><a href="#ref-4">4</a></sup>. LAION took the dataset down for re-release. A commercial lab does not only want to avoid copyright liability. It wants distance from whatever else ends up inside an unfiltered billion-item web corpus, and a research intermediary absorbs that exposure first.

![LAION-5B provenance: five billion image-text pairs, with traced sources including over one million from Pinterest, 819,000 from WordPress blogs, 121,000 from Flickr, and 67,000 from DeviantArt, and 1,008 externally validated CSAM links found by Stanford.](/images/diagrams/laundering-laion-provenance.png)

## The Hamburg Ruling

A court has now validated the upstream half of this structure. In Kneschke v. LAION, the Hanseatic Higher Regional Court Hamburg (OLG Hamburg, case 5 U 104/24, decided December 10, 2025) affirmed the first-instance judgment of the Hamburg Regional Court (LG Hamburg, 310 O 227/23, September 2024) and held that LAION's creation of the dataset did not infringe copyright<sup><a href="#ref-3">3</a></sup>.

The decision turns on which text-and-data-mining exception applies. LAION's collection fell under the scientific-research exception, Section 60d of the German Copyright Act, transposing Article 3 of the EU Copyright in the Digital Single Market Directive. That exception permits research organizations to mine lawfully accessible works, and a rightsholder opt-out does not override it. The general commercial TDM exception, Section 44b transposing Article 4, is different: it applies only where the rightsholder has not reserved use, and that reservation does take effect. The court held Kneschke's reservation failed because it was not machine-readable. A human-readable disclaimer in general terms of use was not enough.

The ruling protects the exact node the laundering structure depends on. The research intermediary is shielded by the scientific-research exception even when commercial labs are the downstream beneficiaries, and that is the one exception an opt-out cannot reach. The court did not bless the commercial training that follows. It blessed the upstream collection, the half the commercial labs cannot do for themselves.

![The Hamburg ruling split: the non-commercial research organization is protected upstream under the EU text-and-data-mining exception, while commercial labs reap the benefit downstream, with the ruling validating only the upstream collection.](/images/diagrams/laundering-hamburg-split.png)

## Text-Side Laundering: The Pile

Laundering is not unique to images. [The Pile](/blog/training-data-ecosystem-2026/), released by EleutherAI on December 31, 2020, is an 825 GiB text corpus, and two of its components show the same pattern<sup><a href="#ref-5">5</a></sup>.

The first is Books3, a subset of 196,640 books scraped from the Bibliotik shadow library. The host pulled Books3 in mid-2023 after a takedown notice from the Danish Rights Alliance<sup><a href="#ref-6">6</a></sup>. By then it had already been ingested into multiple models. This is the takedown-too-late problem: laundered content persists in trained weights and archived dataset copies long after the source is gone. Removing the file does not remove the training.

The second is a "YouTube Subtitles" dataset of 173,536 transcribed videos, packaged into The Pile and reportedly used by Apple, Anthropic, Nvidia, and Salesforce. The transcription violated YouTube's Terms of Service, which bar automated access. None of the downstream companies accepts direct responsibility, because none performed the scraping<sup><a href="#ref-7">7</a></sup>. The same deniability structure, applied to text.

## Why It Works, and Why It Is Contested

Two conditions keep the mechanism running. The first is the research exception, which gives the upstream collector a legal basis the commercial lab lacks. The second is weak provenance. Many Hugging Face datasets carry no clear commercial-use license, and scraped content can enter without any provenance tracking at all<sup><a href="#ref-2">2</a></sup>. That ambiguity is what lets a downstream lab claim good-faith reliance on a dataset's stated license. Track provenance end to end and good-faith reliance becomes far harder to assert.

Common Crawl sharpens the point by contrast. Its crawler, CCBot, respects robots.txt and applies a generous request delay. It is the transparent, robots-compliant baseline of the training-data ecosystem, and it will not knowingly host shadow-library books, Terms-of-Service-violating YouTube transcripts, or non-consented image scrapes. The laundering pipeline exists to supply what the compliant crawler deliberately omits<sup><a href="#ref-9">9</a></sup>. Laundering routes around the compliant crawler, not through it.

The structure is contested. Hamburg protects the upstream non-profit under EU text-and-data-mining law, a posture tracked alongside the broader [EU AI Act GPAI obligations](/blog/eu-ai-act-gpai-2026/). In the United States, where the [training-data litigation](/blog/litigation-tracker-2026/) is still resolving, the Copyright Office has concluded that using copyrighted works to train generative models implicates copyright and that training is not inherently transformative<sup><a href="#ref-8">8</a></sup>. The two signals point in opposite directions. The upstream collection may be lawful in one jurisdiction while the downstream commercial use stays unsettled in another. No single legal system has endorsed the structure end to end.

## What This Means for Defense

The defensive question is which signal can reach which actor. The Hamburg ruling draws that line, and it is not the line the simple "robots.txt cannot reach laundering" story suggests.

Against general commercial mining, machine-readable signals have teeth. The OLG Hamburg held that a machine-readable opt-out binds Section 44b collection. Kneschke lost only because his reservation was human-readable. That is the case for [AIPREF](/blog/understanding-aipref-ietf-standard/)-style consent signals: where the collector relies on the commercial TDM exception, a machine-readable preference that travels with the content defeats the legal basis directly. This is signaling that does enforcement work, because a statute attaches consequences to it.

The harder node is the scientific-research exception. Section 60d, the basis LAION won on, is read more broadly, and an opt-out does not override it. A research crawler claiming that exception, and a downstream lab that never touches the publisher's server, both sit outside a robots.txt directive aimed at GPTBot or ClaudeBot. A research-side opt-out may not bind them either. That specific layer is what signaling struggles to reach, not laundering wholesale.

Three remedies get proposed, and each carries a cost the proposal usually omits. Consent signaling through standards like the IETF AI preferences work is the cheapest to publishers, but it bites the commercial exception harder than the research one. Provenance tracking through the dataset chain would close the good-faith-reliance gap, but it shifts the compliance burden onto repositories and uploaders and is unproven at billion-item scale; whether it works at five billion items is an open question. Value-degradation defenses operate on the content directly and survive the handoffs that strip away liability, but they impose a quality cost on the publisher's own legitimate users, who consume the same degraded content the scraper does.

None of these is a finished answer. The laundering structure is validated upstream, contested downstream, and routed around the one widely deployed signal publishers control. VENOM's role is to measure which enforcement mechanism actually reaches it, and to keep the Section 60d and Section 44b cases separate rather than collapsing them. Three questions decide the outcome: whether provenance can be made to travel with content at scale, whether courts treat downstream reliance on a laundered dataset as a defense or as willful blindness, and whether a consent signal can bind the research intermediary that robots.txt cannot. Those are the questions worth measuring, not the ones worth assuming.

<ol class="references">
<li id="ref-1">Andy Baio, "AI Data Laundering: How Academic and Nonprofit Researchers Shield Tech Companies from Accountability," Waxy.org, September 2022. <a href="https://waxy.org/2022/09/ai-data-laundering-how-academic-and-nonprofit-researchers-shield-tech-companies-from-accountability/">https://waxy.org/2022/09/ai-data-laundering-how-academic-and-nonprofit-researchers-shield-tech-companies-from-accountability/</a></li>
<li id="ref-2">LAION (Large-scale Artificial Intelligence Open Network), overview and dataset history. Wikipedia. <a href="https://en.wikipedia.org/wiki/LAION">https://en.wikipedia.org/wiki/LAION</a></li>
<li id="ref-3">Kneschke v. LAION, Hanseatic Higher Regional Court Hamburg (OLG Hamburg), case 5 U 104/24, decided December 10, 2025, affirming Hamburg Regional Court (LG Hamburg), 310 O 227/23, September 2024. Analysis: Bird &amp; Bird, "Higher Regional Court Hamburg confirms AI training was permitted (Kneschke v. LAION)," 2025. <a href="https://www.twobirds.com/en/insights/2025/germany/higher-regional-court-hamburg-confirms-ai-training-was-permitted-(kneschke-v,-d-,-laion)">https://www.twobirds.com/en/insights/2025/germany/higher-regional-court-hamburg-confirms-ai-training-was-permitted-(kneschke-v,-d-,-laion)</a></li>
<li id="ref-4">Stanford Internet Observatory, "Identifying and Eliminating CSAM in Generative ML Training Data and Models," December 2023 (3,226 suspected links, 1,008 externally validated via PhotoDNA). Stanford Cyber Policy Center. <a href="https://cyber.fsi.stanford.edu/io/news/investigation-finds-ai-image-generation-models-trained-child-abuse">https://cyber.fsi.stanford.edu/io/news/investigation-finds-ai-image-generation-models-trained-child-abuse</a></li>
<li id="ref-5">The Pile, EleutherAI. Dataset page and paper. <a href="https://pile.eleuther.ai/">https://pile.eleuther.ai/</a></li>
<li id="ref-6">Gizmodo, "Anti-Piracy Group Takes AI Training Dataset Books3 Offline," August 2023. <a href="https://gizmodo.com/anti-piracy-group-takes-ai-training-dataset-books3-off-1850743763">https://gizmodo.com/anti-piracy-group-takes-ai-training-dataset-books3-off-1850743763</a></li>
<li id="ref-7">The Register, "YouTube video subtitles used to train AI without creators' consent," July 2024. <a href="https://www.theregister.com/2024/07/17/youtube_video_subtitles_ai/">https://www.theregister.com/2024/07/17/youtube_video_subtitles_ai/</a></li>
<li id="ref-8">U.S. Copyright Office, "Copyright and Artificial Intelligence, Part 3: Generative AI Training," pre-publication report, May 2025. <a href="https://www.copyright.gov/ai/">https://www.copyright.gov/ai/</a></li>
<li id="ref-9">Common Crawl, "Setting the Record Straight: Common Crawl's Commitment to Transparency, Fair Use, and the Public Good." <a href="https://commoncrawl.org/blog/setting-the-record-straight-common-crawls-commitment-to-transparency-fair-use-and-the-public-good">https://commoncrawl.org/blog/setting-the-record-straight-common-crawls-commitment-to-transparency-fair-use-and-the-public-good</a></li>
</ol>
