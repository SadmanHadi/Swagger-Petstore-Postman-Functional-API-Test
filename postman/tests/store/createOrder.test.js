/**
 * TC-STORE-01: Create Order (Happy Path)
 */

// Pre-request Script logic



const orderData = {
    id: factory.generateId(),
    petId: parseInt(pm.environment.get('petId')) || 1,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: "placed",
    complete: false
};

const req = builder.build('/store/order', 'POST', { body: orderData });

pm.variables.set('reqMethod', req.method);
pm.variables.set('reqUrl', req.url);
pm.variables.set('reqBody', JSON.stringify(req.body));

// Test Script logic
validator.assertStatusCode(200);
validator.assertFieldExists('status');
pm.environment.set('orderId', pm.response.json().id);
