import {Component} from 'angular2/core';
import {AccountEventsService} from '../account/account.events.service';
import {LoginService} from '../login/login.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'header',
    templateUrl: './app/header/header.html',
    providers: [LoginService],
})
export class Header {
    authenticated:boolean;
    loginService:LoginService;
    constructor(accountEventService:AccountEventsService,loginService:LoginService) {
        this.loginService = loginService;
        accountEventService.subscribe((account) => {
            this.authenticated = account.authenticated;
        });
    }
    logout(event:Event):void {
        event.preventDefault();
        this.loginService.logout();
    }
}
