# Integrations

The framework interacts with external services to perform functional validation.

## External APIs
### Swagger Petstore API (v2)
- **Base URL**: `https://petstore.swagger.io/v2/`
- **Purpose**: Provides endpoints for managing Pets, Orders, and Users.
- **Usage**: The framework sends HTTP requests to these endpoints and validates the responses.

## Tools & Services
- **GitHub Actions**: Integration for automated test execution and artifact management.
- **Postman Cloud (Optional)**: Can be integrated if the collection is synced, though currently used as local JSON exports.
