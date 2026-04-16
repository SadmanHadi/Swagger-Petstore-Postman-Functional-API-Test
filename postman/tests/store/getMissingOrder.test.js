/**
 * TC-STORE-03: [NEG] Get Missing Order
 */

// Pre-request Script logic
const req = builder.build('/store/order/0', 'GET');

// Test Script logic
validator.assertStatusCode(404);
pm.test("Error message exists", () => {
    pm.expect(pm.response.json().message).to.eql("Order not found");
});
