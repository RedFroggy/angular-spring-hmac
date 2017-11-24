"use strict";
//Headers HTTP
exports.HEADER_X_SECRET = 'X-Secret';
exports.HEADER_X_DIGEST = 'X-Digest';
exports.HEADER_X_ONCE = 'X-Once';
exports.HEADER_WWW_AUTHENTICATE = 'WWW-Authenticate';
//Local storage keys
exports.STORAGE_ACCOUNT_TOKEN = 'hmacApp-account';
exports.STORAGE_SECURITY_TOKEN = 'hmacApp-security';
//Common http root api
exports.BACKEND_API_PATH = '/api';
exports.BACKEND_API_AUTHENTICATE_PATH = '/authenticate';
exports.BACKEND_API_LOGOUT_PATH = '/logout';
exports.BACKEND_API_ROOT_URL = 'http://localhost:8080' + exports.BACKEND_API_PATH;
class UrlMatcher {
    static matches(url) {
        return url.indexOf(exports.BACKEND_API_PATH) !== -1
            && url.indexOf(exports.BACKEND_API_PATH + exports.BACKEND_API_AUTHENTICATE_PATH) === -1;
    }
}
exports.UrlMatcher = UrlMatcher;
//# sourceMappingURL=app.utils.js.map