/**
 * Account module
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import { NgModule }      from '@angular/core';

import {AccountEventsService} from './account.events.service';
import {AccountGuardService} from './account.guard.service';

@NgModule({
    providers: [AccountEventsService, AccountGuardService]
})
export class AccountModule { }
