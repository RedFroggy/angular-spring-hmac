import {Component} from 'angular2/core';
import {AccountEventsService} from '../account/account.events.service';

@Component({
    selector: 'header',
    templateUrl: './app/header/header.html'
})
export class Header {
    authenticated:boolean;
    constructor(accountEventService:AccountEventsService) {
        accountEventService.subscribe((account) => {
            this.authenticated = account.authenticated;
        });
    }
}
