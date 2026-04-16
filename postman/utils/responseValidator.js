/**
 * Generic Response Validator
 * 
 * Standardized assertions for API responses.
 */
class ResponseValidator {
    /**
     * Asserts internal status code
     * @param {number} code 
     */
    static assertStatusCode(code) {
        pm.test(`Status code is ${code}`, () => {
            pm.response.to.have.status(code);
        });
    }

    /**
     * Asserts field existence in response body
     * @param {string} fieldName 
     */
    static assertFieldExists(fieldName) {
        pm.test(`Response contains field: ${fieldName}`, () => {
            const jsonData = pm.response.json();
            pm.expect(jsonData).to.have.property(fieldName);
        });
    }

    /**
     * Asserts field type
     * @param {string} fieldName 
     * @param {string} type - 'string', 'number', 'boolean', etc.
     */
    static assertFieldType(fieldName, type) {
        pm.test(`${fieldName} should be of type ${type}`, () => {
            const jsonData = pm.response.json();
            pm.expect(jsonData[fieldName]).to.be.a(type);
        });
    }

    /**
     * Asserts response body structure matches expected keys
     * @param {string[]} requiredKeys 
     */
    static assertStructure(requiredKeys) {
        pm.test('Response structure is valid', () => {
            const jsonData = pm.response.json();
            requiredKeys.forEach(key => {
                pm.expect(jsonData).to.have.property(key);
            });
        });
    }
}
