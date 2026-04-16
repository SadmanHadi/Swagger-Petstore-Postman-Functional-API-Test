# API Test case Document (SQA Traceability Matrix)

| TestCaseID | Scenario | Request | ExpectedStatus | Key Assertions (Schema + Rules) | Cleanup Strategy |
|------------|----------|---------|----------------|---------------------------------|-----------------|
| **PET-01** | Create Pet | `POST /pet` | 200 OK | Schema Valid, ID generated, Name Matches | **PET-04 (Delete by ID)** |
| **PET-02** | Get Pet | `GET /pet/{id}` | 200 OK | ID matches environment variable | N/A (Read-only) |
| **PET-03** | Update Pet | `PUT /pet` | 200 OK | Status updated to 'sold' | N/A (Modification) |
| **PET-04** | Delete Pet | `DELETE /pet/{id}` | 200 OK | Response contains deleted ID | N/A (Cleanup) |
| **PET-05** | [NEG] Get Missing Pet | `GET /pet/-1` | 404 Not Found | Message == 'Pet not found' | N/A |
| **PET-06** | [BOUND] Create Pet Empty Name | `POST /pet` | 200 OK | API accepts empty string name | PET-04 (Cleanup) |
| **PET-07** | [NEG] Delete Non-existent | `DELETE /pet/0` | 404 Not Found | Status code 404 validation | N/A |
| **STORE-01** | Create Order | `POST /store/order` | 200 OK | ID generated, Valid Order Schema | **Manual/Expiry cleanup** |
| **STORE-02** | Get Order | `GET /store/order/{id}` | 200 OK | Order ID matches created data | N/A |
| **STORE-03** | [NEG] Get Missing Order | `GET /store/order/-1` | 404 Not Found | Message == 'Order not found' | N/A |
| **STORE-04** | [BOUND] Create Order IQ 0 | `POST /store/order` | 200 OK | Accepts quantity 0 | N/A |
| **USER-01** | Create User | `POST /user` | 200 OK | Message contains "ok", Valid code | **Manual/Reset cleanup** |
| **USER-02** | Get User | `GET /user/{user}` | 200 OK | Username matches environment | N/A |
| **USER-03** | Update User | `PUT /user/{user}` | 200 OK | Success message confirmed | N/A |
| **USER-04** | [NEG] Get Missing User | `GET /user/unknown` | 404 Not Found | Error code 404 confirmed | N/A |
| **USER-05** | [BOUND] User Long Bio | `POST /user` | 200 OK | Supports large string payloads | N/A |
