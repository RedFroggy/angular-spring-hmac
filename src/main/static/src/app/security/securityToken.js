"use strict";
class SecurityToken {
    constructor(token) {
        _.assignIn(this, token);
    }
    isEncoding(encoding) {
        return this.securityLevel
            && this.securityLevel === encoding;
    }
}
exports.SecurityToken = SecurityToken;
//# sourceMappingURL=securityToken.js.map