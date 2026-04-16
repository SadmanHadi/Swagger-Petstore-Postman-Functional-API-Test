# Coding Conventions

The project adheres to several coding and naming conventions to maintain consistency.

## Postman Conventions
- **Naming**: Requests are named after their operation (e.g., "Add Pet", "Get Pet").
- **Variables**: Use of double curly braces `{{variableName}}` for environment and collection variables.
- **Scripts**: JavaScript in Postman uses the `pm.*` API.

## JavaScript Conventions
- **Modular Scripts**: Logic should be kept thin in scripts/ to delegate to Postman where possible, or moved to standalone utilities.
- **Variables**: CamelCase for local variables.
- **Errors**: Proper exit codes are returned by the runner for CI/CD integration.

## Documentation
- Markdown files for project guides and test definitions.
- Table-based test case documentation in `API_Test_Cases.md`.
