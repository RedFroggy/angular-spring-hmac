import {Component} from '@angular/core';
import {AccountEventsService} from '../account/account.events.service';
import {LoginService} from '../login/login.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    providers: [LoginService],
})
export class HeaderComponent {
    authenticated:boolean;
    loginService:LoginService;
    constructor(accountEventService:AccountEventsService,loginService:LoginService) {
        this.loginService = loginService;
        accountEventService.subscribe((account) => {
            if(!account.authenticated) {
                this.authenticated = false;
                this.loginService.logout();
            } else {
                this.authenticated = true;
            }
        });
    }
    logout(event:Event):void {
        event.preventDefault();
        this.authenticated = false;
        this.loginService.logout();
    }
}
