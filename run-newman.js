#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

async function run() {
    const root = __dirname;
    
    // 1. Run the build step to sync JS files into the collection
    console.log('Step 1: Building collection from modular scripts...');
    const buildResult = spawnSync(process.execPath, [path.join(root, 'build-collection.js')], {
        stdio: 'inherit',
        cwd: root
    });
    if (buildResult.status !== 0) process.exit(1);

    // 2. Setup Reports
    const reportsDir = path.join(root, 'reports', 'postman');
    fs.mkdirSync(reportsDir, { recursive: true });

    // 3. Configure Newman
    const collection = path.join(root, 'postman', 'collections', 'petstore.collection.json');
    const environment = path.join(root, 'postman', 'environments', 'dev.environment.json');
    const reportHtml = path.join(reportsDir, 'newman-report.html');
    const reportJson = path.join(reportsDir, 'newman-summary.json');

    const newmanArgs = [
        'run', collection,
        '-e', environment,
        '--reporters', 'cli,htmlextra,json',
        '--reporter-htmlextra-export', reportHtml,
        '--reporter-json-export', reportJson
    ];

    // Handle Local Env Overrides
    try {
        require('dotenv').config({ path: path.join(root, '.env') });
        if (process.env.BASE_URL) {
            newmanArgs.push('--env-var', `baseUrl=${process.env.BASE_URL}`);
        }
    } catch (e) {}

    console.log('Step 2: Executing Newman tests...');
    const newmanCli = path.join(root, 'node_modules', 'newman', 'bin', 'newman.js');
    const result = spawnSync(process.execPath, [newmanCli, ...newmanArgs], {
        stdio: 'inherit',
        cwd: root
    });

    process.exit(result.status != null ? result.status : 1);
}

run();
