/**
 * Account module
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import { NgModule }      from '@angular/core';

import {AccountEventsService} from './account.events.service';

@NgModule({
    providers: [AccountEventsService]
})
export class AccountModule { }
