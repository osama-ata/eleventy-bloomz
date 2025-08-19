# Copilot Instructions for Eleventy-Bloomz

## Project Overview

This is an [11ty](https://www.11ty.dev/) static site template extended with [WikiBonsai](https://github.com/wikibonsai/wikibonsai) features. It supports digital garden-style content, custom layouts, and blog post collections. The codebase is organized for extensibility and content-driven workflows.

## Key Architecture & Patterns

- **Content Source**: All site content lives in `content/` (markdown, njk, etc.), with posts in `posts/` and pages in `about/`, `entries/`, etc.
- **Layouts & Includes**: Nunjucks templates in `_includes/layouts/` define site structure. Reusable components (e.g., `postlist.njk`) are in `_includes/`.
- **Global Data**: Shared site metadata is in `_data/metadata.json` and used in templates like `feed/feed.njk`.
- **Static Assets**: `css/` and `img/` are copied to output via Eleventy passthrough config in `.eleventy.js`.
- **Custom Logic**: The `wikibonsai/` directory contains custom JS modules for WikiBonsai features (e.g., `wikirefs.js`, `semtree.js`).

## Developer Workflows

- **Install dependencies**: `npm install`
- **Build site**: `npm run build` (output to `./dist/`)
- **Local preview**: `npm run serve` (dev server at `localhost:4321`)
- **Watch for changes**: `npm run watch`
- **Debug mode**: `npm run debug`
- **Benchmarks**: `npm run bench`
- **Direct Eleventy commands**: Use `npx @11ty/eleventy [options]` for advanced usage (see README for examples)

## Project-Specific Conventions

- **Posts**: Any file with the `post` tag is treated as a blog post, regardless of location or format.
- **Navigation**: Use the `eleventyNavigation` key in front matter to add pages to the top-level nav.
- **Template Formats**: Supported formats are configured in `.eleventy.js` (`templateFormats`).
- **Feed Generation**: The feed templates (`feed/feed.njk`) use global data and custom logic for RSS/JSON feeds.
- **Custom JS**: Extend WikiBonsai features by editing or adding modules in `wikibonsai/`.

## Integration Points

- **Eleventy**: Core build and templating engine.
- **WikiBonsai**: Digital garden features via custom JS modules.
- **Netlify**: Deployment configuration in `netlify.toml`.

## Examples

- To add a new page: create a markdown file in `content/about/` and add `eleventyNavigation` in front matter.
- To add a new post: create a markdown file in `content/posts/` with the `post` tag.
- To extend layouts: edit or add templates in `_includes/layouts/`.
- To add custom logic: create or update JS modules in `wikibonsai/` and reference them in `.eleventy.js` if needed.

## References

- Key files: `.eleventy.js`, `_data/metadata.json`, `_includes/layouts/`, `wikibonsai/`, `netlify.toml`, `package.json`, `README.md`

---

If any conventions or workflows are unclear, please provide feedback so this guide can be improved for future AI agents.
