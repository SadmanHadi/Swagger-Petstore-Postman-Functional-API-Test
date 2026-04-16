/**
 * TC-USER-01: Create User (Happy Path)
 */

// Pre-request Script logic



const userData = {
    id: factory.generateId(),
    username: factory.generateUsername(),
    firstName: "Test",
    lastName: "User",
    email: factory.generateEmail(),
    password: "Password123",
    phone: "123456789",
    userStatus: 0
};

const req = builder.build('/user', 'POST', { body: userData });

pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', JSON.stringify(req.body));
pm.environment.set('username', userData.username);

// Test Script logic
validator.assertStatusCode(200);
validator.assertFieldExists('message');
