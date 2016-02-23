export class SecurityToken {
    secretKey:string;
    token:string;
    securityLevel:string;
    constructor(token:{secretKey:string,token:string,securityLevel:string}) {
        _.assignIn(this, token);
    }
    isEncoding(encoding:string):boolean {
        return this.securityLevel
            && this.securityLevel === encoding;
    }
}
