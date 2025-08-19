# Copilot Instructions for legal-concepts

---

# Copilot instructions — eleventy-bloomz

Summary: Eleventy site extended with WikiBonsai helpers. Edit source files under `content/`, `_includes/`, and `wikibonsai/`; do not edit `_site/` (generated).

Architecture (brief)

- Source content: `content/` holds pages/posts (Markdown/Nunjucks front matter). Eleventy transforms these into `_site/`.
- Templates: `_includes/layouts/` and `_includes/` contain Nunjucks layouts (e.g. `entry.njk`, `post.njk`) used by many pages—change here for global layout updates.
- Logic: `wikibonsai/` contains site-specific JS helpers (`wikirefs.js`, `semtree.js`, `const.js`) used from templates and scripts.

Developer workflows (commands to use)

- Install deps: `npm install`
- Build (production): `npm run build` (produces `_site/` in this repo)
- Dev server / preview: `npm run serve` (serves built `_site/` on localhost:4321)
- Watch for edits: `npm run watch`
- Run Eleventy directly: `npx @11ty/eleventy --config .eleventy.js`
- Content helpers: `node scripts/populate_content.js`, `node scripts/generate_bonsai_index.js`; `fix_json.py` fixes small JSON issues.

Conventions & examples

- Posts: tag a file with `post` in front matter to treat it as a blog post. Example front matter: `---\ntitle: Foo\ntags: [post]\n---`
- Navigation: use `eleventyNavigation` in front matter to include a page in top nav.
- WikiBonsai markdown: templates and content use wiki-style attributes/embeds. See `.github/instructions/entry.instructions.md` for usage samples like `:prefixed-wikiattr::[[wikirefs]]` and `![[test-render]]`.

Integration & important files to inspect

- `.eleventy.js` — build config, passthroughs, and template formats
- `wikibonsai/` — custom processors: modify here to change semantic-tree or wikirefs output
- `_data/metadata.json`, `_data/legal_concepts.json` — global data consumed by templates and feeds
- `_includes/layouts/` & `_includes/` — components and layouts
- `content/` — canonical content source
- `scripts/` and `fix_json.py` — automation and content population helpers
- `netlify.toml` — Netlify deploy settings

AI agent rules (practical)

- Never modify files under `_site/` — they are generated.
- Prefer minimal, localized changes; update templates when a rendering change is needed across pages.
- After edits that affect rendering, run `npm run build` and spot-check `_site/` changes.
- When adding JS in `wikibonsai/`, keep exports small and document usage in a short comment and update any templates that consume them.

If you want, I can also add a short example PR template and a sample front-matter checklist for new content — tell me which to include.

---

- To add custom logic: create or update JS modules in `wikibonsai/` and reference them in `.eleventy.js` if needed.
