# Tech Stack

This project is a Postman-based API automation suite designed for functional testing.

## Core Technologies
- **Postman**: Used for designing and organizing API requests, pre-request logic, and test assertions.
- **Node.js**: The underlying runtime for execution scripts.
- **Newman**: The CLI collection runner for Postman, allowing tests to run in terminal and CI/CD environments.

## Runtime Utilities
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **newman-reporter-htmlextra**: An advanced HTML reporter for Newman to generate detailed visual reports.

## CI/CD
- **GitHub Actions**: Automates the execution of tests on push or pull request to the main branch.
- **pnpm**: Package manager used for dependency management.
