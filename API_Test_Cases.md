# Petstore API Functional Tests

Functional test cases for Pet and User operations using Postman.

## Test Cases

### Pet Operations

- **Add Pet**: POST `/pet` | Assert 200 OK + Capture ID.
- **Boundary Check**: POST `/pet` (Long name) | Assert 200 OK.
- **Get Pet**: GET `/pet/{{pet_id}}` | Assert 200 OK.
- **Update Pet**: PUT `/pet` | Assert 200 OK.
- **Cleanup**: DELETE `/pet/{{pet_id}}` | Assert 200/404.

### User Operations

- **Create User**: POST `/user` | Assert 200 OK + Capture Username.
- **Delete User**: DELETE `/user/{{user_name}}` | Assert 200 OK.

---

_Note: Implemented using $timestamp for data isolation._
