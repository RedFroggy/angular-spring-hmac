import {Component} from '@angular/core';
import {AccountEventsService} from '../account/account.events.service';
import {LoginService} from '../login/login.service';

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
            if(!account.authenticated) {
                this.authenticated = false;
                this.loginService.logout(false);
            } else {
                this.authenticated = true;
            }
        });
    }
    logout(event:Event):void {
        event.preventDefault();
        this.loginService.logout();
    }
}
