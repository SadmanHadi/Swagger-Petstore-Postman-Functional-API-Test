/**
 * TC-USER-04: [NEG] Get Missing User
 */

// Pre-request Script logic
const req = builder.build('/user/unknown_user_99999', 'GET');

// Test Script logic
validator.assertStatusCode(404);
pm.test("Status code is 404", () => {
    pm.response.to.have.status(404);
});
