# VENOM Launch Project Context

VENOM is a company focused on defensive data poisoning and anti-extraction techniques in the context of unauthorized automated collection and machine learning model training. The project objective is to build a content engine and execute a four-week launch plan culminating in a public launch at the end of week four.

Primary goals:

* Become the top authoritative source for "data poisoning" in the context of AI model training, unauthorized scraping, and defensive countermeasures.
* Dominate search results for the keywords: data poisoning, AI data poisoning, training data poisoning, defensive data poisoning, web crawling for training, anti-scraping, anti-bot, proof-of-work anti-scraping, Anubis proof-of-work, Poison Fountain, and IETF AI Preferences (AIPREF).
* Produce credible content that is fact-based, cites sources, and can be referenced by journalists, researchers, and standards bodies.
* Build reusable content assets: blogs, tweet threads, press materials, frequently asked questions, and an editorial calendar.

Tone and constraints:

* Technical, credible, and precise. Avoid hype and vague marketing language.
* Do not speculate. If something is unknown, say so.
* Prefer concrete, verifiable claims. Provide citations or links when making factual statements.
* Never encourage wrongdoing. Content should focus on defense, governance, measurement, and safe mitigations.
* Write in plain text and standard ASCII characters.

Content pillars:

* Data poisoning: definitions, threat models, real-world examples, defensive framing, ethics, and governance.
* Web crawling and model training from public websites: incentives, compliance and non-compliance with preference signals, and the economic impact on publishers.
* Anti-bot and anti-scraping measures: proof-of-work, rate limiting, fingerprinting, authenticated access, and measurement.
* Standards and signaling: robots.txt limitations, emerging preference signaling work, and IETF AIPREF discussions.

Operational principle:

* Separate "instructions" from "outputs."
* Instructions live in this file, the personas files, and the weekly briefs.
* Outputs are written into outputs/weekN/ as Markdown files.
* Scripts in scripts/ orchestrate the creation of outputs using persona prompts.

Output format:

* Drafts should be Markdown unless otherwise specified.
* Social media content should be formatted as numbered posts suitable for copy-paste into X and Bluesky.
* Press materials should be concise and suitable for journalist consumption.

Visual content requirements (MUST follow):

* Blog posts MUST include inline images at a density of roughly 1 per 1000-1500 words.
* Images MUST use the photo-backed style: Unsplash stock photo background with dark CSS gradient overlay and browser-rendered text (HTML screenshot via Playwright). NEVER use Pillow/PIL for text rendering.
* Images MUST be direct and impactful: big numbers, minimal labels. NO footers, NO taglines, NO slide-like proportions.
* All images MUST have descriptive alt text.
* Image pipeline: write HTML (720px body, base64 photo bg, Google Fonts), screenshot via Playwright, save PNG to `site/venom-src/public/images/diagrams/`.
* Design tokens: overlay rgba(10,14,20,0.82-0.92), red #b72115, teal #2dd4bf, font Red Hat Display.
* Stock photos in `~/claude/tmp/stock/`, generation script at `~/claude/tmp/write_html.py`.

Social media platform limits (MUST follow):

* X/Twitter: 280 chars per post (URLs count as 23 chars)
* BlueSky: 300 chars per post (3000 grapheme limit)
* LinkedIn: 3000 chars (no threading)
* Reserve 5-7 chars for thread numbering (e.g., "12/15 ")
* See `personas/references/social-platforms.md` for full details

Anchor post discovery:

* Use `~/claude/social-crawler/search.py` to find posts to engage with
* Commands: `search.py --keywords` or `search.py -q "topic"`
* Target: high-engagement posts (>50 likes) from journalists/researchers
* Engagement types: quote post, reply thread, or reference in own thread
* Assign to Fred Pontino via `scripts/create_fred_task.py`

Skills (use /workflow, /tweet, /engage, /linkedin, etc.):

* `/workflow` - Explains the 12-stage content pipeline with quality gates
  - Registered at `~/.claude/commands/workflow.md`
  - Full spec: `WORKFLOW_STATE_MACHINE.md`
  - Stages: Research -> Draft -> StyleReview -> EditorReview -> HarshReview -> ThematicReview -> PhilosophicalCheck -> ManualReview -> FormatValidation -> NotionOrganization -> ReadyToPublish -> Published
  - All REVISE/FAIL verdicts return to Draft (central revision hub)
  - Human has final authority at ManualReview

* `/tweet` - Draft and validate X threads for @semiautonomous_
  - Registered at `~/.claude/commands/tweet.md`
  - Input: blog URL, slug, or topic
  - Reads blog content, drafts 3-5 tweet thread, validates 280 char limit
  - Outputs copy-paste-ready text, opens X compose
  - API posting via `~/claude/tmp/tweet.py` when X credits available
  - Credentials in `venom_launch/.env` (X_API_KEY, etc.)

* `/engage` - Find and draft replies to relevant X posts
  - Registered at `~/.claude/commands/engage.md`
  - Searches for data poisoning / AI crawler discussions on X
  - Drafts contextual replies linking to VENOM blog content
  - Opens target posts in browser for manual reply

* `/linkedin` - Draft LinkedIn posts for Semiautonomous Systems
  - Registered at `~/.claude/commands/linkedin.md`
  - Input: blog URL, slug, or topic
  - 3000 char limit, professional tone, max 3 hashtags
  - Opens LinkedIn company page for posting

Content workflow integration:

* **New content** enters at Research stage
* **Anchor posts** (from social crawler) feed into Research for reactive threads
* **Approved content** reaches SocialMediaCoordinator at ReadyToPublish
* **Quality gates**: 7 total, average 2-3 rounds before passing all automated gates
* **Philosophy checks**: Power rebalancing, de-escalation principle, analytical (not advocacy) tone
