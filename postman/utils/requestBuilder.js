/**
 * Dynamic Request Builder
 * 
 * Builds API requests with environment-aware configurations.
 */
class RequestBuilder {
    constructor(baseUrl) {
        let base = baseUrl || pm.environment.get('baseUrl');
        this.baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;
    }

    build(endpoint, method = 'GET', options = {}) {
        return {
            method: method,
            url: `${this.baseUrl}/${endpoint.startsWith('/') ? endpoint.substring(1) : endpoint}`,
            headers: options.headers || { 'Content-Type': 'application/json' },
            body: options.body,
            queryParams: options.queryParams
        };
    }
}
