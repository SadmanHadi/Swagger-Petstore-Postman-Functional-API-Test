# Swagger Petstore API Tests — Postman

Automated API testing suite for the [Swagger Petstore API](https://petstore.swagger.io/).

## 🌟 Quality Standards

This project adheres to **Global Rules** for API testing:

- **Security**: No credentials in code. `.env` used locally, Secrets in CI.
- **Reporting**: Detailed HTML dashboards generated locally and in CI.
- **Robustness**: JSON Schema validations, precision handling, and automated cleanup.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation & Setup

1. Clone the repo.
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env`; edit `.env` to set `BASE_URL` if you need a different API base URL (otherwise the default in `Petstore_Environment.json` is used).

## 🛠 Running Locally

Run all tests and generate a dashboard report:

```bash
pnpm test
```

Reports are saved in `reports/postman/report.html`. Open this file in your browser to see a detailed test dashboard.

## 🤖 CI/CD

Tests run automatically on every push via GitHub Actions.

1. Go to **Actions** tab in GitHub.
2. Select the latest run.
3. Download `postman-reports` from the **Artifacts** section at the bottom.
4. Extract and open `report.html` to view the results.

## 📁 Project Structure

- `Petstore_API_Collection.json`: Main testing suite (schema checks, pre-request script, happy/negative/boundary).
- `API_Test_Cases.md`: Test case definitions (Happy, Negative, Boundary) with cleanup strategy.
- `Petstore_Environment.json`: Base URL and environment.
- `scripts/run-newman.js`: Test runner; loads `.env` so `BASE_URL` overrides base URL when set.
- `.env.example`: Template for local overrides (e.g. `BASE_URL`).

## 📝 Project Notes

### Assumptions

- The [Swagger Petstore API](https://petstore.swagger.io/) is available and stable.
- Rate limits on the public API are not exceeded during test runs.

### Known Limitations

- Public API may occasionally return 500/504 due to load.
- Global namespace collisions are possible but mitigated by `$timestamp`.

## 🔒 Security

- **Local**: All sensitive variables are stored in `.env`.
- **CI**: Secrets are managed via GitHub Actions Secrets.
- **Verification**: `.gitignore` ensures no sensitive data is committed.
