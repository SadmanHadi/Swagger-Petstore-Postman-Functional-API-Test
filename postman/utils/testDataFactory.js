/**
 * Reusable Test Data Factory
 * 
 * Generates random, domain-independent test data.
 */
class TestDataFactory {
    generateId() {
        return Math.floor(Math.random() * 1000000);
    }

    generateUsername(prefix = 'user') {
        const timestamp = new Date().getTime();
        return `${prefix}_${timestamp}`;
    }

    generateEmail(domain = 'test.com') {
        const randomStr = Math.random().toString(36).substring(7);
        return `tester_${randomStr}@${domain}`;
    }

    generateString(length = 10) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
