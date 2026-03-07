# Petstore API Functional Tests - Case Definitions

Comprehensive test suite covering positive, negative, and boundary scenarios for Pet and User operations.

## 1. Pet Operations

| TC ID  | Scenario           | Request                  | Expected Status | Key Assertions                          | Cleanup Strategy   |
| ------ | ------------------ | ------------------------ | --------------- | --------------------------------------- | ------------------ |
| PET-01 | Add Pet (Happy)    | POST `/pet`              | 200 OK          | Body contains name/status; ID generated | DELETE `/pet/{id}` |
| PET-02 | Add Pet (Boundary) | POST `/pet` (Long Name)  | 200 OK          | Status is available                     | DELETE `/pet/{id}` |
| PET-03 | Get Pet (Happy)    | GET `/pet/{id}`          | 200 OK          | Response ID matches request ID          | N/A                |
| PET-04 | Update Pet (Happy) | PUT `/pet`               | 200 OK          | Status updated to "sold"                | DELETE `/pet/{id}` |
| PET-05 | Get Pet (Negative) | GET `/pet/999...9`       | 404 Not Found   | Message: "Pet not found"                | N/A                |
| PET-06 | Add Pet (Negative) | POST `/pet` (Empty Body) | 405/400         | Error handling validation               | N/A                |

## 2. User Operations

| TC ID   | Scenario            | Request              | Expected Status | Key Assertions                         | Cleanup Strategy          |
| ------- | ------------------- | -------------------- | --------------- | -------------------------------------- | ------------------------- |
| USER-01 | Create User (Happy) | POST `/user`         | 200 OK          | Message contains "ok"; Username stored | DELETE `/user/{username}` |
| USER-02 | Delete User (Happy) | DELETE `/user/{un}`  | 200 OK          | Response code 200                      | N/A                       |
| USER-03 | Get User (Negative) | GET `/user/nonexist` | 404 Not Found   | Message: "User not found"              | N/A                       |

---

**Note**: All IDs and Usernames are generated using `$timestamp` to prevent collisions.
