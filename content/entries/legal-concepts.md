---
title: Legal-Concepts
aliases: ["legal-concepts", "legal-concept", "legal-concepts-index"]
date: '2023-10-05'
layout: layouts/entry.njk
---

This page describes the big picture for the site's "legal concepts" collection: a small, curated set of concept summaries, indexes and helpers that make complex legal topics discoverable across the garden.

Purpose
-------

At a high level, this collection exists to:

- capture short, linkable concept summaries (entries) that act like mini-encyclopaedia pages;
- provide index files (maps, tag trees and lists) that structure navigation and create a human-readable semantic tree;
- surface back-references and relationships so readers can follow ideas across posts and entries.

Key ideas and structure
-----------------------

- Entries: concise concept pages (the `entry` type) that explain a legal idea and link to related material using `[[wikirefs]]`.
- Index files: `index-type` lists that build the site's semantic tree and map pages. These are intentionally simple markdown lists of wikilinks.
- Back-references: each entry shows which pages link to it, improving discoverability without opaque search.
- Bloomz / public-facing content: selected entries and indexes meant to be showcased and shared.

How to use these pages
----------------------

- To create a concept, add a markdown file under `content/entries/` with front matter and wikilinks to related entries.
- Use `[[double-square-bracket]]` wikilinks for internal cross-linking; prefer linking to existing entries instead of duplicating long explanations.
- Add an entry to an index file when you want it shown in the semantic tree or on the map page.

Audience and maintenance
------------------------

This collection is aimed at practitioners, authors and editors who want to assemble a coherent, navigable knowledge base. Maintain entries as concise, link-first summaries and keep the indexes intentionally small and coherent.

See also
--------

- [[digital-garden]] — conceptual background for this site architecture.
- [[wikirefs]] — how bidirectional links are recorded and rendered.
- [[wikibonsai]] — tooling and helpers used to build the semantic-tree and map.
