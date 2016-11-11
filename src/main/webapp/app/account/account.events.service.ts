import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

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
