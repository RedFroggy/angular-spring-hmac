
export class SecurityToken {
    secretKey:string;
    token:string;
    securityLevel:string;
    constructor(secretKey:string,token:string,securityLevel:string) {
        this.token = token;
        this.secretKey = secretKey;
        this.securityLevel = securityLevel;
    }
}
