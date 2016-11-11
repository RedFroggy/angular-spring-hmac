import {Component} from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'hmac-app',
    templateUrl:'./app/app.html',
    providers: [LoginService]
})
export class AppComponent {
    constructor(router:Router,loginService:LoginService) {
        router.events.subscribe(e => {
            if(e.url !== '/authenticate') {
                if(!loginService.isAuthenticated()) {
                    router.navigate(['/authenticate']);
                } else {
                    loginService.sendLoginSuccess();
                }
            }
        });
    }
}
