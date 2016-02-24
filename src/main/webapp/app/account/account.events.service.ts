import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Account} from '../account/account';

@Injectable()
export class AccountEventsService extends Subject<Account> {
    constructor() {
        super();
    }
    loginSuccess(account:Account) {
        if(account) {
            account.authenticated = true;
            super.next(account);
        }
    }
    logout(account:Account) {
        if(account) {
            account.authenticated = false;
            super.next(account);
        }
    }
}
