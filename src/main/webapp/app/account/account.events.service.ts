import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Account} from '../account/account';

@Injectable()
export class AccountEventsService extends Subject<any> {
    constructor() {
        super();
    }
    loginSuccess(account:any) {
        if(account) {
            account.authenticated = true;
            super.next(account);
        }
    }
    logout(account:any) {
        if(account) {
            account.authenticated = false;
            super.next(account);
        }
    }
}
