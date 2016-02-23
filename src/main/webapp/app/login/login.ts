import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {LoginService} from './login.service';
import {Account} from '../account/account';

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
    constructor(router: Router,form: FormBuilder,loginService:LoginService) {
        this.router = router;
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    authenticate(event, username, password) {
        event.preventDefault();
        this.loginService.authenticate(username,password)
            .subscribe((account) => {
                this.account = account;
                console.log('Successfully logged',account);
                this.router.navigate(['Users']);
            });
    }
}
