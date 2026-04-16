/**
 * TC-PET-06: [BOUND] Create Pet Empty Name
 */

// Pre-request Script logic
const petData = {
    id: factory.generateId(),
    name: "",
    photoUrls: ["https://example.com/photo.jpg"],
    status: "available"
};

const req = builder.build('/pet', 'POST', { body: petData });

// Test Script logic
validator.assertStatusCode(200);
pm.test("Name is empty string", () => {
    pm.expect(pm.response.json().name).to.eql("");
});
// Cleanup - Optional since it's just one pet
pm.environment.set('petIdToDelete', pm.response.json().id);
