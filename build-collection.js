const fs = require('fs');
const path = require('path');

const root = __dirname;
const utilsDir = path.join(root, 'postman', 'utils');
const testsDir = path.join(root, 'postman', 'tests');
const outputPath = path.join(root, 'postman', 'collections', 'petstore.collection.json');

/**
 * Builds the Postman Collection JSON dynamically from modular files.
 */
function buildCollection() {
    console.log('Building Postman Collection...');

    // 1. Gather Utilities
    const utils = fs.readdirSync(utilsDir)
        .filter(f => f.endsWith('.js'))
        .map(f => fs.readFileSync(path.join(utilsDir, f), 'utf8'))
        .join('\n\n');

    // 2. Define the Collection Template
    const collection = {
        info: {
            name: "Petstore API Framework",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: []
    };

    // 3. Process Test Domains
    const domains = fs.readdirSync(testsDir);
    domains.forEach(domain => {
        const domainPath = path.join(testsDir, domain);
        if (!fs.statSync(domainPath).isDirectory()) return;

        const folder = {
            name: domain.charAt(0).toUpperCase() + domain.slice(1),
            item: []
        };

        // Helper to define execution weight
        const getWeight = (filename) => {
            if (filename.startsWith('create')) return 10;
            if (filename.startsWith('get') && !filename.includes('Missing')) return 20;
            if (filename.startsWith('update')) return 30;
            if (filename.startsWith('delete')) return 90; // Cleanup always last
            return 50; // Default for negative/boundary tests
        };

        const testFiles = fs.readdirSync(domainPath)
            .filter(f => f.endsWith('.test.js'))
            .sort((a, b) => getWeight(a) - getWeight(b));

        testFiles.forEach(file => {
            const content = fs.readFileSync(path.join(domainPath, file), 'utf8');
            const [preRequest, testScript] = content.split('// Test Script logic');

            const requestName = file.replace('.test.js', '');
            folder.item.push({
                name: requestName,
                event: [
                    {
                        listen: "prerequest",
                        script: {
                            type: "text/javascript",
                            exec: [
                                "// Global Utility Injection",
                                utils,
                                "const factory = new TestDataFactory();",
                                "const builder = new RequestBuilder();",
                                "",
                                ...preRequest.trim().split('\n'),
                                "",
                                "// Apply request overrides",
                                "if (typeof req !== 'undefined') {",
                                "    console.log(`[Framework] Request ${pm.info.requestName}: ${req.method} ${req.url}`);",
                                "    pm.request.url.update(req.url);",
                                "    pm.request.method = req.method;",
                                "    if (req.body) {",
                                "        pm.request.body.update({",
                                "            mode: 'raw',",
                                "            raw: JSON.stringify(req.body)",
                                "        });",
                                "    }",
                                "}"
                            ]
                        }
                    },
                    {
                        listen: "test",
                        script: {
                            type: "text/javascript",
                            exec: [
                                "// Global Utility Injection",
                                utils,
                                "const validator = ResponseValidator;",
                                "",
                                "console.log(`[Framework] Response ${pm.info.requestName}: ${pm.response.code} ${pm.response.status}`);",
                                ... (testScript || '').trim().split('\n')
                            ]
                        }
                    }
                ],
                request: {
                    method: "GET",
                    header: [
                        { "key": "Content-Type", "value": "application/json" }
                    ],
                    body: {
                        mode: "raw",
                        raw: ""
                    },
                    url: {
                        raw: "{{baseUrl}}",
                        host: ["{{baseUrl}}"]
                    }
                }
            });
        });

        collection.item.push(folder);
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));
    console.log(`Collection built successfully at: ${outputPath}`);
}

buildCollection();
