/**
 * JSON Schema Validation Engine
 * 
 * Validates responses against provided JSON schemas.
 */
class SchemaValidator {
    /**
     * Validates a JSON schema
     * @param {Object} schema - JSON schema object
     * @param {Object} data - Optional data to validate (defaults to pm.response.json())
     */
    static validate(schema, data) {
        pm.test('Response schema is valid', () => {
            const traceData = data || pm.response.json();
            pm.expect(traceData).to.have.jsonSchema(schema);
        });
    }
}
