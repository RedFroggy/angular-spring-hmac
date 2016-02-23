import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';

///<reference path="../../../../../typings/lodash/lodash.d.ts" />

export class Account {
    id:number;
    login:string;
    profile:string;
    authorities:Array<string>;
    authenticated = true;
    constructor(account:{id:number,login:string,profile:string,authorities:Array<string>}) {
        _.assignIn(this, account);
        this.authenticated = false;
    }
}

@Injectable()
export class AccountUtils extends Subject<Account> {
    constructor() {
        super();
    }
    loginSuccess(account:Account) {
        super.next(account);
    }
}

