/**
 * TC-STORE-04: [BOUND] Create Order Quantity 0
 */

// Pre-request Script logic
const orderData = {
    id: factory.generateId(),
    petId: 1,
    quantity: 0,
    shipDate: new Date().toISOString(),
    status: "placed",
    complete: false
};

const req = builder.build('/store/order', 'POST', { body: orderData });

// Test Script logic
validator.assertStatusCode(200);
pm.test("Quantity is 0", () => {
    pm.expect(pm.response.json().quantity).to.eql(0);
});
