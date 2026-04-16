// Pre-request Script logic
const orderId = pm.environment.get('orderId');
const req = builder.build(`/store/order/${orderId}`, 'GET');

// Test Script logic
validator.assertStatusCode(200);
pm.test("Order ID matches", () => {
    const orderId = pm.environment.get('orderId');
    pm.expect(pm.response.json().id.toString()).to.eql(orderId.toString());
});
