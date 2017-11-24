///<reference path="../../../../../typings/lodash/lodash.d.ts" />
"use strict";
class Account {
    constructor(account) {
        this.authenticated = true;
        if (account) {
            _.assignIn(this, account);
            this.authenticated = false;
        }
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map