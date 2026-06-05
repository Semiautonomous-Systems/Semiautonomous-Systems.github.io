---
title: "AIPREF After Toronto: What the IETF Decided in April"
description: "The IETF AIPREF working group reached consensus on AI training scope at its April 2026 Toronto interim, made progress on AI search wording, and deferred the contested AI input category. Status update on the standard."
publishDate: 2026-05-12
keywords: [AIPREF, IETF AIPREF, AI training preferences, draft-ietf-aipref-vocab-06, AI preferences standard, IETF Toronto interim]
author: Semiautonomous Systems
---

## Key Takeaways

- The AIPREF working group held a 2.5-day interim in Toronto on April 14-16 2026, hosted at Cisco, with chairs Mark Nottingham and Suresh Krishnan running five sessions across roughly 30 in-person and remote participants<sup><a href="#ref-1">1</a></sup><sup><a href="#ref-2">2</a></sup>
- Working consensus formed on the **AI training** term, now scoped to "training of any AI model, be it initial training, fine-tuning, or any other process that modifies the model's weights," with explicit exclusion of training models used solely in a search pipeline<sup><a href="#ref-2">2</a></sup>
- **AI search** wording received the bulk of floor time but is not yet locked; the contested **AI input** category was deferred entirely<sup><a href="#ref-2">2</a></sup>
- `draft-ietf-aipref-vocab-06` was published 2026-04-27, almost certainly carrying the Toronto-driven changes, but still bears the "DO NOT REFLECT CONSENSUS" boilerplate. No Working Group Last Call has been issued<sup><a href="#ref-3">3</a></sup>
- The companion attach draft (`draft-ietf-aipref-attach`) remains expired since October 2025<sup><a href="#ref-4">4</a></sup>. The August 2026 IESG milestone is reachable but no longer comfortable<sup><a href="#ref-1">1</a></sup>

---

## What Toronto Was For

AIPREF has been close to done for almost a year. The working group converged on its two-document architecture — a vocabulary spec and an HTTP/robots.txt attachment spec — by mid-2025. The October 2025 Zurich interim reframed the vocabulary from technology-based ("can AI process this?") to purpose-based ("for what purpose may this be used?"). That pivot moved the standard forward but reopened terminology questions that the working group has been chasing since.

Toronto was meant to close those questions.

The agenda<sup><a href="#ref-5">5</a></sup> made the intent explicit. Each session was anchored to a numbered GitHub issue against the vocabulary draft: #159 on purpose versus ingestion timing, #149 on display-based preferences, #170 on hierarchical structure, #183 and #179 on Foundation Model Production scope and "fine-tune" terminology, the #173/#181/#187/#196 cluster on AI search, #151 and #152 on definitions of AI and Machine Learning, #163 on "digital assets" versus "digital content," #172 on RAG and grounding, and #150 on substitutive use. Three days of structured walk-throughs against an issue list signals that the chairs wanted closures, not exploration.

What came out of Toronto is mixed: one term closed, one term in motion, one term punted.

## The AI Training Consensus

The clearest outcome was working consensus on the scope of **AI training**.

The current text — reflected in the vocab-06 revision dated 2026-04-27<sup><a href="#ref-3">3</a></sup>, and described in the post-meeting recap from EDRLab<sup><a href="#ref-2">2</a></sup> — covers any process that modifies a model's weights. That includes initial pretraining, fine-tuning, RLHF, and any continued-training regime that updates parameters. The scope explicitly carves out training of models used exclusively inside a search pipeline (ranking, query understanding, snippet generation), which the working group has consistently treated as a distinct purpose.

This is a meaningful tightening. The earlier "train-ai" framing left ambiguity about whether fine-tuning a foundation model on a publisher's archive constituted "training." The new wording forecloses that argument: if the operation modifies weights, it is training. The carve-out for search-only pipelines preserves the architectural separation that the Zurich pivot was built around.

`train-ai=n` now means something more concrete than it did in March. A publisher setting that preference is saying: do not run any weight-updating operation on this content, regardless of whether you label it pretraining or fine-tuning, with a single exception for models deployed only in search.

## The AI Search Discussion

Most of the meeting's floor time went to AI search.

The category exists to scope the modern range of search behaviors that bleed into AI generation: rewriting query results into prose, zero-click answers, answer engines that cite without sending traffic. The vocabulary needs language that distinguishes traditional indexing from these adjacent uses without creating a category so broad that it captures legitimate search infrastructure.

Per EDRLab's observer<sup><a href="#ref-2">2</a></sup>, consensus wording on AI search is expected in the next vocabulary draft but is not yet locked. The working group reached enough alignment in Toronto that the chairs are willing to ship a revision; the next round of mailing-list discussion will determine whether the wording holds.

The implicit decision here matters. If AI search ends up scoped to include answer engines and verbatim-style summarization, then `search=y` becomes a narrow permission rather than a broad one: closer to "you may index me for traditional search results" than "you may use me however a search company wants." Publishers should track the next vocab revision closely.

![Timeline: Zurich pivot Oct 2025, IETF 124 Montreal, IETF 125 Shenzhen, virtual interim Mar 3, Toronto interim Apr 14-16, vocab-06 published Apr 27, June virtual interim, IETF 126 Vienna Jul 18-24, IESG milestone Aug 31](/images/diagrams/aipref-toronto-timeline.png)

## The AI Input Gap

The unresolved term is **AI input**, which has appeared in working drafts under several names: AI use, AI output, AI include, sometimes RAG-grounding.

The conceptual question is what to do with content that is fed into a model at inference time rather than training time — retrieval-augmented generation, real-time grounding, agent tool calls that fetch a page and pass it to a model. None of those operations modify weights, so they fall outside `train-ai=n`. None of them are search in any traditional sense. A publisher who wants to opt out of being grounded into someone else's model output today has no AIPREF vocabulary to express that.

EDRLab's recap is blunt: most floor time went to AI search while the "more important" AI input term was deferred<sup><a href="#ref-2">2</a></sup>. That is a substantive gap. RAG and agent grounding are the dominant non-training use of public content in 2026, and the standard has no way to address them yet.

The relevant GitHub issue is #172 (RAG and grounding category). It remains open. The substitutive-use individual draft<sup><a href="#ref-6">6</a></sup> proposes adjacent territory but does not cover the full scope.

## Where the Attach Document Went

`draft-ietf-aipref-attach`, the companion document that defines how preferences ride on HTTP responses and robots.txt, is **expired**<sup><a href="#ref-4">4</a></sup>. Its last revision (-04) lapsed on 2025-10-28. No shepherd is assigned. The Toronto agenda allocated no session time to it.

This is consistent with the chairs sequencing vocabulary before protocol: no point finalizing a transport for terms still in flux. The chartered milestone splits the deliverables into a vocabulary spec (due to IESG by August 31 2026) and a separate protocol spec on the same target. If attach has to be revived, edited, last-called, and shepherded between now and August, the protocol half of the milestone will slip.

## The August Milestone Math

The chairs announced two more sessions before IETF 126: a virtual interim in June 2026 (date not yet posted to Datatracker as of 2026-05-06) and a hybrid session at IETF 126 in Vienna, July 18-24 2026<sup><a href="#ref-7">7</a></sup>. The vocabulary IESG submission target is August 31 2026<sup><a href="#ref-1">1</a></sup>.

EDRLab characterized that target as a "slight chance," contingent on closing AI input<sup><a href="#ref-2">2</a></sup>. That assessment matches the public record. Vocab-06 still carries the no-consensus disclaimer. No Working Group Last Call has been issued. AI input has no draft text. The attach document is expired.

The vocabulary half of the milestone is reachable if AI input gets a workable definition at the June virtual or in the Vienna hybrid. The protocol half requires reviving a dead draft on a compressed schedule. Neither is impossible. Neither is comfortable.

## What's Missing from the Public Record

Formal minutes for the five Toronto sessions had not been posted to Datatracker as of 2026-05-06. Bluesheets, slides, agenda, and YouTube recordings are available; structured minutes documents are not<sup><a href="#ref-1">1</a></sup>. The HedgeDoc collaborative notes pad is not publicly retrievable.

Individual-level attribution (who raised which objection, who proposed which wording) is not yet on the public record beyond the chairs and document editors. No IETF blog post recapping Toronto exists; the most recent ai-pref post on ietf.org/blog is from February 2025. No vendor statements from Cloudflare, Google, OpenAI, or news industry coalitions have surfaced publicly. Gary Illyes (Google) remains on the attach draft and on the individual `draft-illyes-aipref-cbcp` draft, which is the only direct vendor signal in the document set.

## Implications for Publishers

A `train-ai=n` declaration today carries more weight than it did in March. The vocabulary scope is concrete enough that a non-compliant fine-tuning operation cannot be relabeled as something else. That is a real improvement in signaling clarity, even before the standard reaches RFC.

The gap on AI input means publishers cannot yet express opposition to retrieval-augmented use of their content through AIPREF alone. That capability, if it lands, will land in vocab-07 or later: not in time for the August milestone unless the working group moves faster than its current pace.

For publishers building defenses today, this is a continuation of the layered-defense logic from our [Cost Imposition vs Value Degradation](/blog/cost-imposition-vs-value-degradation/) analysis: AIPREF gives you the cleanest signal available for training opt-out, but inference-time uses still require enforcement at the network or content layer. For background on the standard's structure and the Zurich pivot, see [Understanding AIPREF](/blog/understanding-aipref-ietf-standard/).

---

*Last updated: May 2026*

## References

<ol class="references">
<li id="ref-1">IETF. "AI Preferences (aipref) Working Group." <a href="https://datatracker.ietf.org/wg/aipref/about/">https://datatracker.ietf.org/wg/aipref/about/</a></li>
<li id="ref-2">EDRLab (2026). "Notes from the IETF AI-Pref Toronto meeting, April 2026." <a href="https://www.edrlab.org/2026/04/17/notes-from-the-ietf-ai-pref-toronto-meeting-april-2026/">https://www.edrlab.org/2026/04/17/notes-from-the-ietf-ai-pref-toronto-meeting-april-2026/</a></li>
<li id="ref-3">Keller, P., Thomson, M. "A Vocabulary For Expressing AI Usage Preferences." draft-ietf-aipref-vocab-06. <a href="https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab-06">https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab-06</a></li>
<li id="ref-4">Illyes, G., Thomson, M. "Associating AI Usage Preferences with Content in HTTP." draft-ietf-aipref-attach. <a href="https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/">https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/</a></li>
<li id="ref-5">AIPREF Working Group. "Toronto Interim Agenda, April 14-16 2026." <a href="https://ietf-wg-aipref.github.io/wg-materials/interim-26-04/agenda.html">https://ietf-wg-aipref.github.io/wg-materials/interim-26-04/agenda.html</a></li>
<li id="ref-6">Silver, B. "Substitutive Use Category for AI Preferences Vocabulary." draft-silver-aipref-vocab-substitutive. <a href="https://datatracker.ietf.org/doc/draft-silver-aipref-vocab-substitutive/">https://datatracker.ietf.org/doc/draft-silver-aipref-vocab-substitutive/</a></li>
<li id="ref-7">IETF. "IETF 126 Vienna, 18-24 July 2026." <a href="https://www.ietf.org/meeting/126/">https://www.ietf.org/meeting/126/</a></li>
</ol>
