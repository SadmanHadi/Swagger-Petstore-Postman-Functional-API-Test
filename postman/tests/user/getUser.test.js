// Pre-request Script logic
const username = pm.environment.get('username');
const req = builder.build(`/user/${username}`, 'GET');

// Test Script logic
validator.assertStatusCode(200);
pm.test("Username matches", () => {
    const username = pm.environment.get('username');
    pm.expect(pm.response.json().username).to.eql(username);
});
