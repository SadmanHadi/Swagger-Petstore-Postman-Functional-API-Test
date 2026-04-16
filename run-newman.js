#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

async function run() {
    const root = __dirname;
    
    // 1. Setup Local Overrides (to detect Cloud IDs)
    try {
        require('dotenv').config({ path: path.join(root, '.env') });
    } catch (e) {}

    const {
        POSTMAN_API_KEY,
        COLLECTION_UID,
        ENVIRONMENT_UID,
        BASE_URL
    } = process.env;

    // 2. Build local collection (Always keep the modular JS framework as source of truth)
    console.log('Step 1: Building collection from modular scripts...');
    const buildResult = spawnSync(process.execPath, [path.join(root, 'build-collection.js')], {
        stdio: 'inherit',
        cwd: root
    });
    if (buildResult.status !== 0) process.exit(1);

    // 3. Setup Reports
    const reportsDir = path.join(root, 'reports', 'postman');
    fs.mkdirSync(reportsDir, { recursive: true });

    // 4. Determine Resource Sources
    // Priority: Valid Cloud UID > Local File
    let collectionSource = path.join(root, 'postman', 'collections', 'petstore.collection.json');
    let envSource = path.join(root, 'postman', 'environments', 'dev.environment.json');

    const hasCloudEnv = ENVIRONMENT_UID && ENVIRONMENT_UID.trim() !== '';
    const hasApiKey = POSTMAN_API_KEY && POSTMAN_API_KEY.trim() !== '';
    
    if (hasCloudEnv && hasApiKey) {
        const cloudUrl = `https://api.getpostman.com/environments/${ENVIRONMENT_UID}?apikey=${POSTMAN_API_KEY}`;
        console.log(`[Cloud] Validating Postman Environment: ${ENVIRONMENT_UID}...`);
        
        // Pre-flight check to see if the Cloud URL is actually accessible
        const check = spawnSync('curl', ['-I', '-s', '-L', cloudUrl], { encoding: 'utf8' });
        const success = check.stdout && (check.stdout.includes('200 OK') || check.stdout.includes('HTTP/1.1 200') || check.stdout.includes('HTTP/2 200'));

        if (success) {
            console.log(`[Cloud] SUCCESS: Using remote environment.`);
            envSource = cloudUrl;
        } else {
            console.warn(`[Cloud] WARNING: Could not access Postman Cloud Environment. Falling back to LOCAL file.`);
            console.warn(`[Cloud] Reason: Postman API returned an error or ID is invalid.`);
        }
    }

    const reportHtml = path.join(reportsDir, 'newman-report.html');
    const reportJson = path.join(reportsDir, 'newman-summary.json');

    const newmanArgs = [
        'run', collectionSource,
        '-e', envSource,
        '--reporters', 'cli,htmlextra,json',
        '--reporter-htmlextra-export', reportHtml,
        '--reporter-json-export', reportJson
    ];

    // Global Variable Overrides (Highest Priority)
    if (BASE_URL) {
        console.log(`[Override] Setting baseUrl to: ${BASE_URL}`);
        newmanArgs.push('--env-var', `baseUrl=${BASE_URL}`);
    }

    console.log('Step 2: Executing Newman tests...');
    const newmanCli = path.join(root, 'node_modules', 'newman', 'bin', 'newman.js');
    const result = spawnSync(process.execPath, [newmanCli, ...newmanArgs], {
        stdio: 'inherit',
        cwd: root
    });

    process.exit(result.status != null ? result.status : 1);
}

run();
