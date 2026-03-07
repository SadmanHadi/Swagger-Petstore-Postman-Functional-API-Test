# Swagger Petstore API Tests — Postman

Automated API testing suite for the [Swagger Petstore API](https://petstore.swagger.io/).

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Installation & Setup

1. Clone the repo.
2. Install dependencies: `pnpm install`
3. Initialize environment: `cp .env.example .env`

## 🛠 Running Locally

Run all tests and generate a report using `pnpm`:

```bash
pnpm test
```

Reports are saved in `/reports/postman/`.

## 🤖 CI/CD

Tests run automatically on every push via GitHub Actions.

1. Go to **Actions** tab.
2. Select the latest run.
3. Download `postman-reports` from the **Artifacts** section.

## 📁 Project Structure

- `Petstore_API_Collection.json`: Main testing suite with 10+ test cases.
- `API_Test_Cases.md`: Detailed test definitions (Happy, Negative, Boundary).
- `Petstore_Environment.json`: Base configuration.

## 📝 Project Notes

### Assumptions

- The [Swagger Petstore API](https://petstore.swagger.io/) is available and stable.
- Data created during tests (Pets, Users) can be deleted or ignored without systemic impact.
- Rate limits on the public API are not exceeded during test runs.

### Known Limitations

- Public API may occasionally return 500 or 504 due to heavy load; tests are designed to handle common failures but may fail on server-side instability.
- Data is isolated using `$timestamp`, but global namespace collisions are theoretically possible.

## 🛠 Features

- **Simple Logic**: Uses built-in Postman features for data generation.
- **Robustness**: Handles large ID precision and environment inconsistencies.
- **CI Ready**: Integrated with GitHub Actions via Newman.
