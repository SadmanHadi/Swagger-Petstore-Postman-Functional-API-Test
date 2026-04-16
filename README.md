# API Automation Framework

A production-grade, domain-agnostic API automation framework using Postman, Newman, and a modular JavaScript utility layer.

## 🚀 Key Features
- **Domain Agnostic**: Utilities are designed to work with any REST API.
- **Modular JavaScript**: Local JS files for utilities and tests are synced to the Postman collection via a build step.
- **Deep Validation**: Integrated schema validation and generic response assertions.
- **CI/CD Ready**: GitHub Actions pipeline integrated with advanced HTML and JSON reporting.
- **Data Driven**: Test data factory for random, conflict-free data generation.

## 🏗️ Architecture
The framework uses a "Build-Time Sync" approach:
1.  **`/postman/utils`**: Reusable JS modules (apiClient, validators, etc.).
2.  **`/postman/tests`**: Modular test scripts organized by domain.
3.  **`scripts/build-collection.js`**: Bundles JS files into the final `petstore.collection.json`.
4.  **`scripts/run-newman.js`**: Execution wrapper that triggers the build and runs Newman.

## 📋 Prerequisites
- **Node.js**: v20.x or higher
- **pnpm**: v9.x or higher (recommended) or npm v10.x+

## 🛠️ Setup & Local Execution
1.  **Install dependencies**:
    ```bash
    pnpm install
    ```
2.  **Set environment variables**:
    Create a `.env` file based on `.env.example`.
3.  **Run tests**:
    ```bash
    pnpm test
    ```

## ⚙️ CI/CD Execution
This project is integrated with **GitHub Actions**.
- **Workflow**: `.github/workflows/api-tests.yml`
- **Trigger**: Runs on every push to `main` or `master` and all Pull Requests.
- **Execution**: The pipeline installs Node.js, pnpm, and runs the `pnpm test` command.
- **Artifacts**: HTML and JSON reports are automatically uploaded as GitHub artifacts at the end of each run.

## 📊 Reports
Reports are generated after every run in `/reports/postman/`:
- `newman-report.html`: Detailed visual report with request/response traces.
- `newman-summary.json`: Machine-readable summary for CI/CD metrics.

## 💡 Known Limitations & Assumptions
- **Public API Flakiness**: The Swagger Petstore API is a public resource with shared state. Occasional 404s or 500s (especially in the User domain) are environmental artifacts and do not reflect framework logic failures.
- **Shared Environment**: Tests assume a clean start when possible, but concurrent runs by other users may occasionally cause data conflicts.

## 🔒 Security
- **No Credentials in Code**: All sensitive data is managed via `.env` or CI secrets.
- **Environment Aware**: Variables are dynamically injected based on the execution context.
