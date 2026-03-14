#!/usr/bin/env node
/**
 * Runs Newman; loads .env so BASE_URL overrides baseUrl when running locally.
 * CI uses the environment file only (no .env).
 */
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const reportsDir = path.join(root, 'reports', 'postman');
fs.mkdirSync(reportsDir, { recursive: true });
try {
  require('dotenv').config({ path: path.join(root, '.env') });
} catch (_) {
  // dotenv optional when not installed or in CI
}

const newmanCli = path.join(root, 'node_modules', 'newman', 'bin', 'newman.js');
const collection = path.join(root, 'Petstore_API_Collection.json');
const environment = path.join(root, 'Petstore_Environment.json');
const reportPath = path.join(root, 'reports', 'postman', 'report.html');

const args = [
  'run', collection,
  '-e', environment,
  '--reporters', 'cli,htmlextra',
  '--reporter-htmlextra-export', reportPath,
];
if (process.env.BASE_URL) {
  args.push('--env-var', `baseUrl=${process.env.BASE_URL}`);
}

const result = spawnSync(process.execPath, [newmanCli, ...args], {
  stdio: 'inherit',
  cwd: root,
});
process.exit(result.status != null ? result.status : 1);
