const fs = require('fs');
const path = require('path');

const legalConceptsPath = path.join(__dirname, '..', '_data', 'legal_concepts.json');
const contentEntriesPath = path.join(__dirname, '..', 'content', 'entries');

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

  const generated = [];

  principles.forEach(principle => {
    if (!principle.principleName) {
      return;
    }

    const fileName = `${slugify(principle.principleName)}.md`;
    const filePath = path.join(contentEntriesPath, fileName);

    // Ensure output directory exists
    fs.mkdirSync(contentEntriesPath, { recursive: true });

    const now = new Date().toISOString().split('T')[0];

    // Build frontmatter
    let content = `---\n`;
    content += `title: "${principle.principleName}"\n`;
    if (principle.aliases && principle.aliases.length > 0) {
      content += `aliases: [${principle.aliases.map(a => `"${a}"`).join(', ')}]\n`;
    }
    content += `date: '${principle.date || now}'\n`;
    content += `jurisdiction: "${principle.primaryJurisdiction || ''}"\n`;
    content += `fieldOfLaw: "${principle.fieldOfLaw || ''}"\n`;
    content += `layout: layouts/entry.njk\n`;
    content += `tags:\n  - legal-concept\n  - ${slugify(principle.fieldOfLaw || 'general')}\n`;
    content += `---\n\n`;

    // Add wiki attributes expected by templates
    content += `:type::[[legal-concepts]]\n`;
    content += `:plugin::[[contracts-wiki]]\n\n`;

    // Core Concept
    if (principle.coreConcept) {
      content += `## Core Concept\n\n`;
      if (principle.coreConcept.elevatorPitch) {
        content += `**Elevator Pitch:** ${principle.coreConcept.elevatorPitch}\n\n`;
      }
      if (principle.coreConcept.underlyingRationale) {
        content += `**Underlying Rationale:** ${principle.coreConcept.underlyingRationale}\n\n`;
      }
    }

    // Discovery / Origin
    if (principle.discovery) {
      content += `## Discovery\n\n`;
      if (principle.discovery.origin && principle.discovery.origin.summary) {
        content += `${principle.discovery.origin.summary}\n\n`;
      }
      if (principle.discovery.evolution && principle.discovery.evolution.length) {
        content += `### Evolution / Key Cases and Sources\n\n`;
        principle.discovery.evolution.forEach(e => {
          if (e.caseName) {
            content += `- **${e.caseName}** (${e.year || ''}) — ${e.summary || ''}\n`;
          }
        });
        content += `\n`;
      }
    }

    // Deconstruction
    if (principle.deconstruction) {
      content += `## Deconstruction\n\n`;
      if (principle.deconstruction.essentialElementsTest && principle.deconstruction.essentialElementsTest.length) {
        content += `### Essential Elements Test\n\n`;
        principle.deconstruction.essentialElementsTest.forEach(el => {
          content += `- **${el.element}** — ${el.description || ''}\n`;
        });
        content += `\n`;
      }
      if (principle.deconstruction.scopeAndLimitations) {
        const sc = principle.deconstruction.scopeAndLimitations;
        if (sc.triggers && sc.triggers.length) {
          content += `**Triggers:** ${sc.triggers.join(', ')}\n\n`;
        }
        if (sc.limitations && sc.limitations.length) {
          content += `**Limitations:** ${sc.limitations.join('; ')}\n\n`;
        }
      }
    }

    // Dissemination / Examples
    if (principle.dissemination) {
      content += `## Dissemination\n\n`;
      if (principle.dissemination.hypotheticalExample && principle.dissemination.hypotheticalExample.scenario) {
        content += `### Hypothetical Example\n\n`;
        content += `**Scenario:** ${principle.dissemination.hypotheticalExample.scenario}\n\n`;
        if (principle.dissemination.hypotheticalExample.outcome) {
          content += `**Outcome:** ${principle.dissemination.hypotheticalExample.outcome}\n\n`;
        }
      }
      if (principle.dissemination.audienceAdaptation) {
        content += `### Audience Adaptation\n\n`;
        if (principle.dissemination.audienceAdaptation.forClient) {
          content += `**For Client:** ${principle.dissemination.audienceAdaptation.forClient}\n\n`;
        }
        if (principle.dissemination.audienceAdaptation.forLawyer) {
          content += `**For Lawyer:** ${principle.dissemination.audienceAdaptation.forLawyer}\n\n`;
        }
      }
    }

    // Deployment / Application
    if (principle.deployment) {
      content += `## Deployment\n\n`;
      if (principle.deployment.application) {
        content += `### Application\n\n`;
        if (principle.deployment.application.affirmativeArgument) {
          content += `**Affirmative argument:** ${principle.deployment.application.affirmativeArgument}\n\n`;
        }
        if (principle.deployment.application.defensiveArgument) {
          content += `**Defensive argument:** ${principle.deployment.application.defensiveArgument}\n\n`;
        }
      }
      if (principle.deployment.legalConsequence) {
        content += `### Legal Consequence\n\n${principle.deployment.legalConsequence}\n\n`;
      }
    }

    // Relevant Principles
    if (principle.relevantPrinciples) {
      content += `## Relevant Principles\n\n`;
      for (const pName in principle.relevantPrinciples) {
        content += `* [[${pName}]] - ${principle.relevantPrinciples[pName]}\n`;
      }
      content += `\n`;
    }

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully created ${fileName}`);
      generated.push({ slug: slugify(principle.principleName), title: principle.principleName });
    } catch (err) {
      console.error(`Error writing file for ${principle.principleName}:`, err);
    }
  });

  // Sync an index bonsai file with generated entries
  try {
    const bonsaiPath = path.join(__dirname, '..', 'content', 'index', 'i.bonsai.md');
    const header = `---\ntitle: knowledge bonsai\n---\n\n`;
    let body = `- [[legal-concepts]]\n  - [[test]]\n    - [[test-render]]\n  - [[digital-garden]]\n    - [[wikirefs]]\n  - [[wikibonsai]]\n    - [[semantic-tree]]\n    - [[package]]\n      - [[semtree]]\n      - [[markdown-it-wikirefs]]\n  - [[doctype]]\n    - [[index-type]]\n    - [[entry-type]]\n    - [[page-type]]\n      - [[map-page]]\n  - [[sample-entry]]\n`;

    // append generated entries
    generated.forEach(g => {
      body += `  - [[${g.slug}]]\n`;
    });

    const full = header + body + `\n`;
    fs.mkdirSync(path.dirname(bonsaiPath), { recursive: true });
    fs.writeFileSync(bonsaiPath, full, 'utf8');
    console.log(`Updated bonsai index at ${bonsaiPath}`);
  } catch (err) {
    console.error('Error updating bonsai index:', err);
  }
});
