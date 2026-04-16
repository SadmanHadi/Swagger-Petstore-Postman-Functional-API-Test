/**
 * TC-USER-03: Update User (Happy Path)
 */

// Pre-request Script logic

const username = pm.environment.get('username');

const userData = {
    username: username,
    firstName: "Updated",
    lastName: "User"
};

const req = builder.build(`/user/${username}`, 'PUT', { body: userData });

pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', JSON.stringify(req.body));

// Test Script logic
validator.assertStatusCode(200);
