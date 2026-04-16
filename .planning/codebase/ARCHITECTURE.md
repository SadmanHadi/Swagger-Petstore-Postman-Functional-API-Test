# Architecture

The framework follow a script-centric execution model using Postman and Newman.

## Overview
The architecture is designed to bridge the gap between Postman IDE development and automated CI/CD execution.

## Components
### 1. Postman Collection
- Acts as the primary repository for test logic.
- Contains request definitions, pre-request scripts (for data setup), and test scripts (for assertions).

### 2. Environment Management
- Uses Postman Environment JSON files for configuration.
- Supports local overrides via `.env` files which are injected into Newman as environment variables.

### 3. Execution Wrapper (`run-newman.js`)
- A Node.js script that orchestrates the execution.
- Handles report directory creation.
- Configures Newman with the appropriate collection, environment, and reporters.
- Passes dynamic overrides (like `baseUrl`) from the system environment.

### 4. Reporting Layer
- Uses `htmlextra` to produce a standalone HTML report summarizing test outcomes.
