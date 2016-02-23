///<reference path="../../../../../typings/lodash/lodash.d.ts" />

export class Account {
    id:number;
    login:string;
    profile:string;
    authorities:Array<string>;
    authenticated = true;
    constructor(account?:{id:number,login:string,profile:string,authorities:Array<string>}) {
        if(account) {
            _.assignIn(this, account);
            this.authenticated = false;
        }
    }
}
