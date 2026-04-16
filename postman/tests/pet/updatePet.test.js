/**
 * TC-PET-03: Update Pet (Happy Path)
 */

// Pre-request Script logic

const petId = pm.environment.get('petId');

const petData = {
    id: parseInt(petId),
    name: "Updated_Pet",
    status: "sold"
};

const req = builder.build('/pet', 'PUT', { body: petData });

pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', JSON.stringify(req.body));

// Test Script logic
validator.assertStatusCode(200);
pm.test("Status is updated to sold", () => {
    pm.expect(pm.response.json().status).to.eql("sold");
});
