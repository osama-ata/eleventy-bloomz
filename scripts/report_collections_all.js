#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const tmpConfig = path.join(repoRoot, '.eleventy-count-config.cjs');
const outFile = path.join(repoRoot, '.eleventy-collection-count.json');

// Create a temporary Eleventy config that imports the project's .eleventy.js
// and then adds a collection that writes the exact collections.all length to a file.
const configContent = `module.exports = function(eleventyConfig) {
  // load the project's configured eleventy behavior first
  try {
    const projectConfig = require('./.eleventy.js');
    if (typeof projectConfig === 'function') {
      projectConfig(eleventyConfig);
    } else if (projectConfig && typeof projectConfig.default === 'function') {
      projectConfig.default(eleventyConfig);
    }
  } catch (e) {
    // ignore - we'll still add our counting collection
  }

  eleventyConfig.addCollection('__eleventy_count_all', function(collectionApi) {
    const arr = collectionApi.getAll();
    try {
      require('fs').writeFileSync(${JSON.stringify(outFile)}, JSON.stringify({ count: arr.length }, null, 2), 'utf8');
    } catch (e) {
      // swallow
    }
    return arr;
  });
};
`;

fs.writeFileSync(tmpConfig, configContent, 'utf8');

console.log('Running Eleventy to compute collections.all length (this may take a few seconds)...');

// Run Eleventy CLI with the temporary config. Use the project's local dependency via npx.
const cmd = 'npx @11ty/eleventy --config ' + JSON.stringify(tmpConfig) + ' --quiet';
exec(cmd, { cwd: repoRoot, env: process.env }, (err, stdout, stderr) => {
  // Remove the temporary config file
  try { fs.unlinkSync(tmpConfig); } catch (e) { }

  if (err) {
    console.error('Eleventy run failed:', err.message);
    if (stderr) console.error(stderr);
    process.exit(1);
  }

  // Read the output file written by the collection
  try {
    const data = fs.readFileSync(outFile, 'utf8');
    const obj = JSON.parse(data);
    console.log('\nExact collections.all.length (from Eleventy):', obj.count);
    console.log('Saved to', outFile);
    process.exit(0);
  } catch (e) {
    console.error('Unable to read count file. Eleventy ran but did not emit the count file.');
    process.exit(1);
  }
});
