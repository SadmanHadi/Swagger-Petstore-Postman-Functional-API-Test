/**
 * TC-PET-05: [NEG] Get Missing Pet
 */

// Pre-request Script logic
const req = builder.build('/pet/-1', 'GET');

// Test Script logic
validator.assertStatusCode(404);
pm.test("Error message is 'Pet not found'", () => {
    pm.expect(pm.response.json().message).to.eql("Pet not found");
});
