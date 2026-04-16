# Testing Strategy

The testing strategy focuses on functional validation of the API surface.

## Test Types
- **Functional Testing**: Validating the correctness of API responses based on specific inputs.
- **Negative Testing**: Ensuring the API handles invalid inputs gracefully (4xx errors).
- **Boundary Testing**: Checking limits such as payload size or field lengths.

## Coverage Domains
- **Pet Operations**: CRUD operations for pet resources.
- **User Operations**: User creation and lifecycle management.
- **Store Operations**: (Planned but currently minimal/missing in the initial map).

## Execution
- Local: `pnpm test` or `node scripts/run-newman.js`.
- CI/CD: Automated on every push/PR via GitHub Actions.

## Reporting
- Human-readable HTML reports generated after every run.
- CLI output for immediate feedback during development.
