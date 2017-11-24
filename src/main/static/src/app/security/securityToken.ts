import * as _ from 'lodash';

export class SecurityToken {
    secret:string;
    securityLevel:string;
    constructor(token:{secret:string,securityLevel:string}) {
        _.assignIn(this, token);
    }
    isEncoding(encoding:string):boolean {
        return this.securityLevel
            && this.securityLevel === encoding;
    }
}
