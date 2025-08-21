````instructions
# Copilot Instructions — vscode-tendr

Summary: This file contains developer/AI-agent instructions for working with the `vscode-tendr` extension and the WikiBonsai-enabled Eleventy site. Use these guidelines when editing, generating, or indexing content so the extension can read your garden correctly.

Quick checklist for agents

- [ ] Don't modify files under `_site/` (generated output).
- [ ] Prefer localized template or helper changes in `_includes/` and `wikibonsai/`.
- [ ] Ensure `configs.toml` and `t.doc.toml` exist at the repo root and are valid TOML (no code fences).
- [ ] Index files (bonsai) must live under `content/index/` and be plain markdown with CAML or YAML metadata (avoid wrapping in code fences).
- [ ] Root bonsai filename should match `configs.toml` `root` value (default `i.root`).

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

If you want, an agent can add a short example PR template and a sample front-matter checklist for new content — include only after consensus.

Integration with `vscode-tendr` (VS Code extension)

- Purpose: this repository is compatible with the `vscode-tendr` extension (WikiBonsai tooling inside VS Code). The extension enhances navigation, semantic trees, graphs, and in-editor workflows for markdown-based gardens.

- Required and recommended files (repo root)

  - `configs.toml` — garden-wide configuration (title, root filename, attr engine, etc.). Must be valid TOML (no code fences).
  - `t.doc.toml` — doctype declarations (defines `index`, `entry`, templates, prefixes, colors, emojis). Must be valid TOML.

- Metadata format: `vscode-tendr` prefers CAML attribute syntax (e.g. `: id :: <nanoid>`); YAML frontmatter is still supported but using CAML makes in-editor attribute editing and previews more consistent with the extension.

- Doctype & structure guidance

  - Keep index files (bonsai root and branch outlines) under `content/index/` (for example `content/index/i.root.md`). Index files must be plain markdown (not fenced) and use consistent indentation.
  - Use `index` and `entry` doctypes for the semantic tree and leaves. If you add new doctypes, update `t.doc.toml` accordingly.

- Workflows and VS Code interactions

  - The extension exposes commands like `tendr: sync bonsai`, `tendr: open tree graph`, `tendr: open web graph`, and treeview refresh commands. Use them from the Command Palette.
  - When editing templates or `wikibonsai/` helpers, run `npm run build` and spot-check `_site/` before committing changes that affect rendering.
  - Prefer minimal, localized changes. Update templates or `wikibonsai/` logic only when necessary and document any exports you add.

- Best practices

  - Do not edit `_site/` (generated).
  - When adding doctypes, include small sample templates and update `t.doc.toml` so the extension can create new files from templates.
  - Keep CAML attributes and wikirefs consistent across `content/` so the extension finds and indexes files reliably.

Debugging and common fixes for bonsai detection

- Make sure `configs.toml` `root` matches the actual root filename (e.g. `i.root`) and that file exists under `content/index/`.
- Ensure `t.doc.toml` paths match your repo layout (leading slash paths like `/index/` and `/entries/` are common in these docs).
- Remove any markdown files wrapped in code fences ("```" or similar) which prevents parsing.
- Normalize CAML attributes to use spaced syntax `: key :: value` for best compatibility.
- If the extension index is stale, use `tendr: clear index and rebuild from files` from the command palette.

Commands reference for agents

- Install: `npm install`
- Build site: `npm run build`
- Serve preview: `npm run serve`
- Rebuild bonsai/index: use extension command `tendr: clear index and rebuild from files` or `tendr: sync bonsai`.

Files an agent may create or update

- `configs.toml` (root-level) — small TOML with `garden.root` and `garden.attrs`.
- `t.doc.toml` (root-level) — declare `index` and `entry` doctypes and any custom types used by the site.
- Example templates under `content/template/` named `t.<typename>.md` for template-driven file creation.

Quality gates for changes

- After edits that modify templates or `wikibonsai/` behavior: run `npm run build` and confirm `_site/` renders without errors.
- After changes to `configs.toml` or `t.doc.toml`: reload VS Code or run the extension's rebuild command to ensure the index picks up the new configuration.

Closing notes

This file is intended to be the single place where Copilot-style agents (and human collaborators) can find the rules for editing this Eleventy/WikiBonsai project and for integrating with `vscode-tendr`. Keep it concise and update it when processes or file locations change.
````
