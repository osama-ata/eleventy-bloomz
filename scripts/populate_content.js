const fs = require('fs');
const path = require('path');

const legalConceptsPath = path.join(__dirname, '_data/legal_concepts.json');
const contentEntriesPath = path.join(__dirname, 'content/entries');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

fs.readFile(legalConceptsPath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading legal_concepts.json:", err);
    return;
  }

  const legalData = JSON.parse(data);
  const principles = legalData.principles;

  principles.forEach(principle => {
    if (!principle.principleName) {
      return;
    }

    const fileName = `${slugify(principle.principleName)}.md`;
    const filePath = path.join(contentEntriesPath, fileName);

    let content = `---
title: "${principle.principleName}"
`;

    if (principle.aliases && principle.aliases.length > 0) {
      content += `aliases: [${principle.aliases.map(a => `"${a}"`).join(', ')}]\n`;
    }
    content += `jurisdiction: "${principle.primaryJurisdiction}"
fieldOfLaw: "${principle.fieldOfLaw}"
tags:
  - legal-concept
  - ${slugify(principle.fieldOfLaw)}
---

# ${principle.principleName}

`;

    if (principle.coreConcept && principle.coreConcept.underlyingRationale) {
      content += `## Core Concept

**Underlying Rationale:** ${principle.coreConcept.underlyingRationale}

`;
    }

    if (principle.deployment && principle.deployment.legalConsequence) {
      content += `## Legal Consequence

${principle.deployment.legalConsequence}

`;
    }

    if (principle.relevantPrinciples) {
      content += `## Relevant Principles\n\n`;
      for (const pName in principle.relevantPrinciples) {
        content += `* [[${pName}]]\n`;
      }
      content += `\n`;
    }

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(`Error writing file for ${principle.principleName}:`, err);
      } else {
        console.log(`Successfully created ${fileName}`);
      }
    });
  });
});
