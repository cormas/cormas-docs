---
title: Why we migrated Cormas docs to Docusaurus
description: Cormas has moved its documentation from Docsify to Docusaurus. Here’s why it matters.
authors: [oleks]
---

For the past year, the Cormas website relied on [Docsify](https://docsify.js.org/). It was simple, lightweight, and easy to set up. But as our our documentation grows and becomes more mature, we decided to migrate to [Docusaurus](https://docusaurus.io/). Here are the main reasons:

<!-- truncate -->

## 1. Better SEO & Discoverability

Docsify renders content client‑side, which makes it harder for search engines to index pages. Docusaurus generates **static HTML** for every page, complete with metadata and sitemaps. This means our documentation is easier to find, share, and rank. This has significant impact on the discoverability of our documentation search engines (Google) and large language models (ChatGPT).

## 2. Rich Features Out‑of‑the‑Box

Docusaurus provides built‑in support for:
- **Versioning** (perfect for software that evolves over time)
- **Internationalization** (future-proof for multilingual docs)
- **Search** (via Algolia or local plugins)
- **Custom pages** (like this blog!)

## 3. A Custom Landing Page

We wanted a proper **homepage** to introduce Cormas - not just a docs index. Docusaurus makes it simple to build a modern landing page using [React](https://react.dev/).

## 4. Extensibility

Because Docusaurus uses **React + MDX**, we can embed code snippets, interactive components, or even simulation demos directly into our docs.

## 5. Strong Ecosystem & Community

Docusaurus is widely adopted across open-source projects, with an active plugin ecosystem and regular updates. It's a safer long-term bet for Cormas than Docsify, which is lighter but less actively developed. For example, the website of the [GAMA Platform](https://gama-platform.org/) is also built with Docsaurus.

---

### What's Next

Our migration is just the beginning. Expect:
- Cleaner navigation
- More documentation pages and hands-on tutorials
- A growing collection of example models
- More blog posts! 

We believe that good documentation will make Cormas more accessible - to researchers, students, and practitioners alike. 🚀

