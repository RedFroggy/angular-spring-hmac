"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
const login_service_1 = require("./login.service");
const account_events_service_1 = require("../account/account.events.service");
///<reference path="../../../../../typings/lodash/lodash.d.ts" />
let Login = class Login {
    constructor(router, form, loginService, accountEventService) {
        this.router = router;
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            rememberMe: false
        });
        accountEventService.subscribe((account) => {
            if (!account.authenticated) {
                if (account.error) {
                    if (account.error.indexOf('BadCredentialsException') !== -1) {
                        this.error = 'Username and/or password are invalid !';
                    }
                    else {
                        this.error = account.error;
                    }
                }
            }
        });
    }
    authenticate(event) {
        event.preventDefault();
        this.loginService.authenticate(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe(account => {
            this.account = account;
            console.log('Successfully logged', account);
            this.router.navigate(['/users']);
        });
    }
};
Login = __decorate([
    core_1.Component({
        selector: 'login',
        providers: [login_service_1.LoginService],
        templateUrl: './app/login/login.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, forms_1.FormBuilder, login_service_1.LoginService, account_events_service_1.AccountEventsService])
], Login);
exports.Login = Login;
//# sourceMappingURL=login.js.map