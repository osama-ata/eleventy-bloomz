const fs = require('fs');
const path = require('path');
const buildBonsai = require('../wikibonsai/semtree');
const glob = require('glob');
const matter = require('gray-matter');

function renderNodeLines(nodesArray, bonsaiNodesMap, node, indent = 0) {
  const pad = '  '.repeat(indent);
  let lines = [];
  lines.push(`${pad}- [[${node.text}]]`);
  if (node.children && node.children.length) {
    for (let childText of node.children) {
      const childNode = bonsaiNodesMap.get(childText);
      if (childNode) {
        lines = lines.concat(renderNodeLines(nodesArray, bonsaiNodesMap, childNode, indent + 1));
      } else {
        lines.push(`${pad}  - [[${childText}]]`);
      }
    }
  }
  return lines;
}

try {
  // Build bonsai using the existing builder but defensively handle duplicate entries in index files.
  // We'll read the index files, dedupe repeated [[link]] targets per file, then call semtree.create via the module.
  const constants = require('../wikibonsai/const');
  const semtree = require('semtree');

  // Build bonsaiText similarly to the original but dedupe duplicate wikilinks per file
  const indexFiles = glob.sync(constants.INDEX_GLOB, {});
  const bonsaiText = {};
  for (let file of indexFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const yaml = matter(content);
    let body = yaml.content.replace(/^\n+/, '');
    // dedupe wiki links: find all [[name]] occurrences and remove duplicates while preserving order
    const linkRe = /\[\[([^\]]+)\]\]/g;
    const seen = new Set();
    body = body.replace(linkRe, (m, p1) => {
      if (seen.has(p1)) return '';
      seen.add(p1);
      return `[[${p1}]]`;
    });
    bonsaiText[path.basename(file, '.md')] = body;
  }

  // Now call semtree.create directly with the cleaned bonsaiText
  const opts = { virtualTrunk: true };
  let bonsai;
  try {
    bonsai = semtree.create(constants.ROOT_FNAME, bonsaiText, opts);
  } catch (e) {
    console.error('semtree.create failed:', e.message || e);
    process.exit(2);
  }

  // attach urls similarly
  const entryFiles = glob.sync(constants.ENTRIES_GLOB, {});
  // build maps for robust matching (exact and slugified)
  const entryMap = new Map();
  const slugMap = new Map();
  function slugify(s) {
    return String(s).toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  for (let file of entryFiles) {
    const base = path.basename(file, '.md');
    entryMap.set(base, file);
    slugMap.set(slugify(base), file);
  }

  for (let node of bonsai.nodes) {
    const exact = entryMap.get(node.text);
    if (exact) {
      node.url = '/entries/' + path.basename(exact, '.md');
      continue;
    }
    const slugMatch = slugMap.get(slugify(node.text));
    if (slugMatch) {
      node.url = '/entries/' + path.basename(slugMatch, '.md');
      continue;
    }
    // try fuzzy contains (case-insensitive)
    const fuzzy = [...entryMap.keys()].find(k => k.toLowerCase().includes(node.text.toLowerCase()) || node.text.toLowerCase().includes(k.toLowerCase()));
    if (fuzzy) {
      const file = entryMap.get(fuzzy);
      node.url = '/entries/' + path.basename(file, '.md');
    }
  }

  const bonsaiNodesMap = new Map(bonsai.nodes.map(n => [n.text, n]));

  // render starting from root node, or top-level nodes if no root found
  const rootText = bonsai.root;
  const rootNode = bonsaiNodesMap.get(rootText);
  let lines = [];
  lines.push('---');
  lines.push('title: knowledge bonsai');
  lines.push('---');
  lines.push('');

  if (rootNode) {
    lines = lines.concat(renderNodeLines(bonsai.nodes, bonsaiNodesMap, rootNode, 0));
  } else {
    // nodes with no ancestors
    const topNodes = bonsai.nodes.filter(n => !n.ancestors || n.ancestors.length === 0);
    for (let node of topNodes) {
      lines = lines.concat(renderNodeLines(bonsai.nodes, bonsaiNodesMap, node, 0));
    }
  }

  // Append any entry .md files that were not represented in the bonsai nodes
  const present = new Set(bonsai.nodes.map(n => n.text));
  const allEntryBases = [...entryMap.keys()];
  const missing = allEntryBases.filter(b => !present.has(b));
  if (missing.length) {
    lines.push('');
    lines.push('Unlisted entries:');
    for (let b of missing.sort()) {
      lines.push(`- [[${b}]]`);
    }
  }

  const outPath = path.join(__dirname, '..', 'content', 'index', 'i.bonsai.md');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
  console.log('Wrote', outPath);
} catch (e) {
  console.error(e);
  process.exit(1);
}
