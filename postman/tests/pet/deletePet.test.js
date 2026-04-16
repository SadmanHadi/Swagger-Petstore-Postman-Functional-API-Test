/**
 * TC-PET-04: Delete Pet (Happy Path)
 */

// Pre-request Script logic

const petId = pm.environment.get('petId');

const req = builder.build(`/pet/${petId}`, 'DELETE');

pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', null);

// Test Script logic
validator.assertStatusCode(200);
pm.environment.unset('petId');
