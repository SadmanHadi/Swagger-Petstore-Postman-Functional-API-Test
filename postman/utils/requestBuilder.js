/**
 * Dynamic Request Builder
 * 
 * Builds API requests with environment-aware configurations.
 */
class RequestBuilder {
    constructor(baseUrl) {
        let base = baseUrl || pm.environment.get('baseUrl') || '';
        this.baseUrl = base.replace(/\/+$/, '');
    }

    build(endpoint, method = 'GET', options = {}) {
        const cleanEndpoint = endpoint.replace(/^\/+/, '');
        const finalUrl = `${this.baseUrl}/${cleanEndpoint}`;
        
        return {
            method: method,
            url: finalUrl,
            headers: options.headers || { 'Content-Type': 'application/json' },
            body: options.body,
            queryParams: options.queryParams
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = RequestBuilder;
}
