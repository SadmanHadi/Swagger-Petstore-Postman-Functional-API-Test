/**
 * This module provides a standardized way to send HTTP requests within the Postman sandbox.
 */
class ApiClient {
    /**
     * Sends an HTTP request using Postman pm.sendRequest
     * @param {Object} options - Request configuration (method, url, headers, body, queryParams)
     * @param {Function} callback - Postman callback function
     */
    send(options, callback) {
        const { method, url, headers, body, queryParams } = options;
        
        const request = {
            url: this._buildUrl(url, queryParams),
            method: method || 'GET',
            header: headers || {},
            body: body ? {
                mode: 'raw',
                raw: typeof body === 'string' ? body : JSON.stringify(body),
                options: {
                    raw: {
                        language: 'json'
                    }
                }
            } : undefined
        };

        pm.sendRequest(request, callback);
    }

    _buildUrl(baseUrl, queryParams) {
        if (!queryParams) return baseUrl;
        const query = Object.keys(queryParams)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
            .join('&');
        return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${query}`;
    }
}
