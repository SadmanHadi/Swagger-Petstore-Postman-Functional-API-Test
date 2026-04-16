// Pre-request Script logic
const petId = pm.environment.get('petId');
const req = builder.build(`/pet/${petId}`, 'GET');

// Test Script logic
validator.assertStatusCode(200);
validator.assertFieldExists('id');
pm.test("ID matches environment petId", () => {
    const petId = pm.environment.get('petId');
    pm.expect(pm.response.json().id).to.eql(parseInt(petId));
});
