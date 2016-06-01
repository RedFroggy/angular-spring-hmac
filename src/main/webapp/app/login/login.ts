import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import {LoginService} from './login.service';
import {Account} from '../account/account';
import {AccountEventsService} from '../account/account.events.service';

///<reference path="../../../../../typings/lodash/lodash.d.ts" />

@Component({
    selector: 'login',
    directives:[ROUTER_DIRECTIVES],
    providers: [LoginService],
    templateUrl: './app/login/login.html'
})
export class Login {
    username:string;
    password:string;
    router:Router;
    wrongCredentials:boolean;
    loginForm:ControlGroup;
    loginService:LoginService;
    account:Account;
    error:string;
    constructor(router: Router,form: FormBuilder,loginService:LoginService,accountEventService:AccountEventsService) {
        this.router = router;
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        accountEventService.subscribe((account) => {
            if(!account.authenticated) {
                if(account.error) {
                    if(account.error.indexOf('BadCredentialsException') !== -1) {
                        this.error = 'Username and/or password are invalid !';
                    } else {
                        this.error = account.error;
                    }
                }
            }
        });
    }
    authenticate(event, username, password) {
        event.preventDefault();
        this.loginService.authenticate(username,password)
            .subscribe((account) => {
                this.account = account;
                console.log('Successfully logged',account);
                this.router.navigate(['/users']);
            });
    }
}
