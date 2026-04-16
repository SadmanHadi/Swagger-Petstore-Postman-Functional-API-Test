# Project Structure

The repository is organized following a standard API automation layout.

## Directory Map
- **`.github/workflows/`**: Contains GitHub Actions workflow definitions (e.g., `newman_tests.yml`).
- **`.planning/`**: Internal directory for project documentation and mapping (GSD).
- **`reports/postman/`**: Destination for generated test reports (HTML, CLI output).
- **`scripts/`**: Contains execution scripts and utilities.
  - `run-newman.js`: The main entry point for running the test suite.
- **Root Directory**:
  - `Petstore_API_Collection.json`: The Postman collection exported in v2.1 format.
  - `Petstore_Environment.json`: Environment configuration variables.
  - `package.json`: Project manifest and dependency list.
  - `API_Test_Cases.md`: Human-readable documentation of test scenarios.
  - `README.md`: Project overview and setup instructions.
