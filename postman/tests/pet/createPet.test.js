/**
 * TC-PET-01: Create Pet (Happy Path)
 */

// Pre-request Script logic
const petData = {
    id: factory.generateId(),
    name: "Pet_" + factory.generateString(5),
    photoUrls: ["https://example.com/photo.jpg"],
    status: "available"
};

const req = builder.build('/pet', 'POST', { body: petData });

// Set variables for the Postman request object
pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', JSON.stringify(req.body));

// Test Script logic
const schema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "status": { "type": "string" }
    },
    "required": ["id", "name"]
};

validator.assertStatusCode(200);
SchemaValidator.validate(schema);
validator.assertFieldExists('id');
pm.environment.set('petId', pm.response.json().id);
