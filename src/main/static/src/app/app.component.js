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
const login_service_1 = require("./login/login.service");
const router_1 = require("@angular/router");
let AppComponent = class AppComponent {
    constructor(router, loginService) {
        router.events.subscribe(e => {
            if (e['url'] !== '/authenticate') {
                if (!loginService.isAuthenticated()) {
                    router.navigate(['/authenticate']);
                }
                else {
                    loginService.sendLoginSuccess();
                }
            }
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'hmac-app',
        templateUrl: './app/app.html',
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [router_1.Router, login_service_1.LoginService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map