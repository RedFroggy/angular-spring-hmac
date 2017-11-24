webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/account/account.events.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountEventsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AccountEventsService = (function (_super) {
    __extends(AccountEventsService, _super);
    function AccountEventsService() {
        return _super.call(this) || this;
    }
    AccountEventsService.prototype.loginSuccess = function (account) {
        if (account) {
            account.authenticated = true;
            _super.prototype.next.call(this, account);
        }
    };
    AccountEventsService.prototype.logout = function (account) {
        if (account) {
            account.authenticated = false;
            _super.prototype.next.call(this, account);
        }
    };
    AccountEventsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AccountEventsService);
    return AccountEventsService;
}(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]));



/***/ }),

/***/ "../../../../../src/app/account/account.guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountGuardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_app_utils__ = __webpack_require__("../../../../../src/app/utils/app.utils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccountGuardService = (function () {
    function AccountGuardService(router) {
        this.router = router;
    }
    AccountGuardService.prototype.canActivate = function () {
        var isLogged = !!localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */])
            || !!sessionStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */]);
        if (!isLogged) {
            this.router.navigate(['authenticate']);
            return false;
        }
        return true;
    };
    AccountGuardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]])
    ], AccountGuardService);
    return AccountGuardService;
}());



/***/ }),

/***/ "../../../../../src/app/account/account.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account_guard_service__ = __webpack_require__("../../../../../src/app/account/account.guard.service.ts");
/**
 * Account module
 * Created by Michael DESIGAUD on 11/11/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AccountModule = (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__account_events_service__["a" /* AccountEventsService */], __WEBPACK_IMPORTED_MODULE_2__account_guard_service__["a" /* AccountGuardService */]]
        })
    ], AccountModule);
    return AccountModule;
}());



/***/ }),

/***/ "../../../../../src/app/account/account.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Account; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

var Account = (function () {
    function Account(account) {
        this.authenticated = true;
        if (account) {
            __WEBPACK_IMPORTED_MODULE_0_lodash__["assignIn"](this, account);
            this.authenticated = false;
        }
    }
    return Account;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <header></header>\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_service__ = __webpack_require__("../../../../../src/app/login/login.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'hmac-app',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_1__login_login_service__["a" /* LoginService */]]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account_account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_hmac_http_client__ = __webpack_require__("../../../../../src/app/utils/hmac-http-client.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__account_account_module__ = __webpack_require__("../../../../../src/app/account/account.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__login_login_module__ = __webpack_require__("../../../../../src/app/login/login.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__users_user_module__ = __webpack_require__("../../../../../src/app/users/user.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils_utils_module__ = __webpack_require__("../../../../../src/app/utils/utils.module.ts");
/**
 * App module
 * Created by Michael DESIGAUD on 11/11/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_10__account_account_module__["a" /* AccountModule */], __WEBPACK_IMPORTED_MODULE_11__login_login_module__["a" /* LoginModule */], __WEBPACK_IMPORTED_MODULE_12__users_user_module__["a" /* UserModule */], __WEBPACK_IMPORTED_MODULE_13__utils_utils_module__["a" /* UtilsModule */], __WEBPACK_IMPORTED_MODULE_9__app_routes__["a" /* RoutesModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_8__header_header_component__["a" /* HeaderComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_8__header_header_component__["a" /* HeaderComponent */]],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_common__["g" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* HashLocationStrategy */] },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */],
                    useFactory: function (xhrBackend, requestOptions, accountEventService) {
                        return new __WEBPACK_IMPORTED_MODULE_4__utils_hmac_http_client__["a" /* HmacHttpClient */](xhrBackend, requestOptions, accountEventService);
                    },
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_2__account_account_events_service__["a" /* AccountEventsService */]],
                    multi: false
                }
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_user_component__ = __webpack_require__("../../../../../src/app/users/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users_users_component__ = __webpack_require__("../../../../../src/app/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account_guard_service__ = __webpack_require__("../../../../../src/app/account/account.guard.service.ts");





var routes = [
    { path: 'authenticate', component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_3__users_users_component__["a" /* UsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__account_account_guard_service__["a" /* AccountGuardService */]] },
    { path: 'user/:id', component: __WEBPACK_IMPORTED_MODULE_2__users_user_component__["a" /* UserComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__account_account_guard_service__["a" /* AccountGuardService */]] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */] }
];
var RoutesModule = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(routes);


/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar navbar-default\" role=\"navigation\" *ngIf=\"authenticated\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#js-navbar-collapse\">\n                <span class=\"sr-only\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n\n            <a class=\"navbar-brand\" href=\"http://www.redfroggy.fr/\" target=\"_blank\"><img src=\"../assets/img/red_froggy.png\" width=\"36\" height=\"36\"/></a>\n        </div>\n\n        <div class=\"collapse navbar-collapse\" id=\"js-navbar-collapse\">\n\n            <ul class=\"nav navbar-nav\">\n                <li class=\"active\"><a href=\"#/users\">Users</a></li>\n                <li class=\"pull-right\"><a href=\"\" (click)=\"logout($event)\">Logout</a></li>\n            </ul>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__account_account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login_service__ = __webpack_require__("../../../../../src/app/login/login.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = (function () {
    function HeaderComponent(accountEventService, loginService) {
        var _this = this;
        this.loginService = loginService;
        accountEventService.subscribe(function (account) {
            if (!account.authenticated) {
                _this.authenticated = false;
                _this.loginService.logout();
            }
            else {
                _this.authenticated = true;
            }
        });
    }
    HeaderComponent.prototype.logout = function (event) {
        event.preventDefault();
        this.authenticated = false;
        this.loginService.logout();
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'header',
            template: __webpack_require__("../../../../../src/app/header/header.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_2__login_login_service__["a" /* LoginService */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__account_account_events_service__["a" /* AccountEventsService */], __WEBPACK_IMPORTED_MODULE_2__login_login_service__["a" /* LoginService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-4 col-md-offset-4\">\n            <div class=\"panel\">\n                <div class=\"panel-body\">\n                    <span class=\"label label-danger\" *ngIf=\"error\">{{error}}</span>\n                    <form class=\"form\" [formGroup]=\"loginForm\" (ngSubmit)=\"authenticate($event)\">\n                        <div class=\"form-group\">\n                            <label for=\"username\">Username</label>\n                            <input type=\"text\" class=\"form-control\" required formControlName=\"username\"\n                                   name=\"username\" id=\"username\" placeholder=\"username\">\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"password\">Password</label>\n                            <input type=\"password\" class=\"form-control\" required formControlName=\"password\"\n                                   name=\"password\" id=\"password\" placeholder=\"password\">\n                        </div>\n                        <div class=\"form-check\">\n                            <label class=\"form-check-label\">\n                                <input class=\"form-check-input\" id=\"rememberMe\" name=\"rememberMe\"\n                                       formControlName=\"rememberMe\" [ngModel]=\"loginForm.value.rememberMe\" type=\"checkbox\">\n                                Remember Me\n                            </label>\n                        </div>\n                        <button type=\"submit\" [disabled]=\"!loginForm.valid\" class=\"btn btn-primary\">Login</button>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_service__ = __webpack_require__("../../../../../src/app/login/login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(router, form, loginService, accountEventService) {
        var _this = this;
        this.router = router;
        this.wrongCredentials = false;
        this.loginService = loginService;
        this.loginForm = form.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            rememberMe: false
        });
        accountEventService.subscribe(function (account) {
            if (!account.authenticated) {
                if (account.error) {
                    if (account.error.indexOf('BadCredentialsException') !== -1) {
                        _this.error = 'Username and/or password are invalid !';
                    }
                    else {
                        _this.error = account.error;
                    }
                }
            }
        });
    }
    LoginComponent.prototype.authenticate = function (event) {
        var _this = this;
        event.preventDefault();
        this.loginService.authenticate(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe(function (account) {
            _this.account = account;
            console.log('Successfully logged', account);
            _this.router.navigate(['/users']);
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'login',
            providers: [__WEBPACK_IMPORTED_MODULE_3__login_service__["a" /* LoginService */]],
            template: __webpack_require__("../../../../../src/app/login/login.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__login_service__["a" /* LoginService */], __WEBPACK_IMPORTED_MODULE_4__account_account_events_service__["a" /* AccountEventsService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_service__ = __webpack_require__("../../../../../src/app/login/login.service.ts");
/**
 * Login module
 * Created by Michael DESIGAUD on 12/11/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_4__login_service__["a" /* LoginService */]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__("../../../../../src/app/account/account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__account_account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__security_securityToken__ = __webpack_require__("../../../../../src/app/security/securityToken.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__ = __webpack_require__("../../../../../src/app/utils/app.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginService = (function () {
    function LoginService(http, accountEventService, router) {
        this.http = http;
        this.accountEventService = accountEventService;
        this.router = router;
    }
    LoginService.prototype.authenticate = function (username, password, rememberMe) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["a" /* BACKEND_API_AUTHENTICATE_PATH */], JSON.stringify({ login: username, password: password }), { headers: headers })
            .map(function (res) {
            var securityToken = new __WEBPACK_IMPORTED_MODULE_5__security_securityToken__["a" /* SecurityToken */]({
                secret: res.headers.get(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["g" /* HEADER_X_SECRET */]),
                securityLevel: res.headers.get(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["d" /* HEADER_WWW_AUTHENTICATE */])
            });
            if (rememberMe) {
                localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */], res.text());
                localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */], JSON.stringify(securityToken));
            }
            else {
                sessionStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */], res.text());
                sessionStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */], JSON.stringify(securityToken));
            }
            var account = new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](res.json());
            _this.sendLoginSuccess(account);
            return account;
        });
    };
    LoginService.prototype.sendLoginSuccess = function (account) {
        if (!account) {
            account = new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](JSON.parse(this.getAccountFromStorage()));
        }
        this.accountEventService.loginSuccess(account);
    };
    LoginService.prototype.isAuthenticated = function () {
        return !!this.getAccountFromStorage();
    };
    LoginService.prototype.removeAccount = function () {
        localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */]);
        localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */]);
        sessionStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */]);
        sessionStorage.removeItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */]);
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        console.log('Logging out', __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["b" /* BACKEND_API_LOGOUT_PATH */]);
        this.http.post(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["b" /* BACKEND_API_LOGOUT_PATH */], null)
            .subscribe(function () {
            _this.http.get(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + __WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["a" /* BACKEND_API_AUTHENTICATE_PATH */])
                .subscribe(function () {
                _this.removeAccount();
                _this.router.navigate(['/authenticate']);
            });
        });
    };
    LoginService.prototype.isAuthorized = function (roles) {
        if (this.isAuthenticated() && roles) {
            var account_1 = new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](JSON.parse(this.getAccountFromStorage()));
            if (account_1 && account_1.profile) {
                var isValid_1 = true;
                roles.forEach(function (role) {
                    var filteredAuth = account_1.profile.authorities.filter(function (a) {
                        return a.name === role;
                    });
                    if (filteredAuth.length === 0) {
                        isValid_1 = false;
                    }
                });
                return isValid_1;
            }
        }
        return false;
    };
    LoginService.prototype.getAccountFromStorage = function () {
        var account = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */]);
        if (!account) {
            return sessionStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__utils_app_utils__["h" /* STORAGE_ACCOUNT_TOKEN */]);
        }
        return account;
    };
    LoginService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */], __WEBPACK_IMPORTED_MODULE_4__account_account_events_service__["a" /* AccountEventsService */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["b" /* Router */]])
    ], LoginService);
    return LoginService;
}());



/***/ }),

/***/ "../../../../../src/app/security/securityToken.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecurityToken; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

var SecurityToken = (function () {
    function SecurityToken(token) {
        __WEBPACK_IMPORTED_MODULE_0_lodash__["assignIn"](this, token);
    }
    SecurityToken.prototype.isEncoding = function (encoding) {
        return this.securityLevel
            && this.securityLevel === encoding;
    };
    return SecurityToken;
}());



/***/ }),

/***/ "../../../../../src/app/users/user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <form class=\"form\" [formGroup]=\"userForm\" (submit)=\"saveUser()\">\n            <div class=\"form-group\">\n                <label for=\"login\">Login</label>\n                <input type=\"text\" id=\"login\" required [(ngModel)]=\"user.login\" formControlName=\"login\" class=\"form-control\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"profile\">Profile</label>\n                <select id=\"profile\" [(ngModel)]=\"user.profile.id\" formControlName=\"profile\" required class=\"form-control\">\n                    <option *ngFor=\"let profile of profiles\" [value]=\"profile.id\">{{profile.name}}</option>\n                </select>\n            </div>\n            <div>\n                <button type=\"submit\" is-authorized=\"ROLE_MANAGER\" class=\"btn btn-primary\" [disabled]=\"userForm.$invalid\"><span class=\"fa fa-save\"></span>Save</button>\n                <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\"><span class=\"fa fa-save\"></span>Cancel</button>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/users/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__("../../../../../src/app/account/account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__users_service__ = __webpack_require__("../../../../../src/app/users/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserComponent = (function () {
    function UserComponent(router, userService, route, form) {
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */]();
        this.user.profile = {};
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            profile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]
        });
        this.getProfiles();
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) { return _this.getUser(params['id']); });
    };
    UserComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getById(id).subscribe(function (user) { return _this.user = user; });
    };
    UserComponent.prototype.getProfiles = function () {
        var _this = this;
        this.userService.getProfiles().subscribe(function (profiles) { return _this.profiles = profiles; });
    };
    UserComponent.prototype.saveUser = function () {
        var _this = this;
        this.userService.saveUser(this.user).subscribe(function () { return _this.router.navigate(['/users']); });
    };
    UserComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    UserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'user',
            template: __webpack_require__("../../../../../src/app/users/user.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_4__users_service__["a" /* UsersService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_4__users_service__["a" /* UsersService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "../../../../../src/app/users/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils_module__ = __webpack_require__("../../../../../src/app/utils/utils.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_component__ = __webpack_require__("../../../../../src/app/users/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__users_component__ = __webpack_require__("../../../../../src/app/users/users.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__users_service__ = __webpack_require__("../../../../../src/app/users/users.service.ts");
/**
 * User module
 * Created by Michael DESIGAUD on 12/11/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__utils_utils_module__["a" /* UtilsModule */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__user_component__["a" /* UserComponent */], __WEBPACK_IMPORTED_MODULE_5__users_component__["a" /* UsersComponent */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__user_component__["a" /* UserComponent */], __WEBPACK_IMPORTED_MODULE_5__users_component__["a" /* UsersComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__users_service__["a" /* UsersService */]]
        })
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "../../../../../src/app/users/users.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <table class=\"table table-hover\">\n            <thead></thead>\n            <tbody>\n                <tr>\n                    <th>#</th>\n                    <th>Login</th>\n                    <th>Profile</th>\n                    <th [isAuthorized]=\"'ROLE_ADMIN'\">Authorities</th>\n                </tr>\n                <tr *ngFor='let user of users'>\n                    <td>{{user.id}}</td>\n                    <td><a href=\"\" (click)=\"onSelectUser($event,user.id)\">{{user.login}}</a></td>\n                    <td>{{user.profile.name}}</td>\n                    <td [isAuthorized]=\"'ROLE_ADMIN'\">{{getAuthorities(user)}}</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/users/users.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__users_service__ = __webpack_require__("../../../../../src/app/users/users.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersComponent = (function () {
    function UsersComponent(router, userService) {
        var _this = this;
        this.users = [];
        this.router = router;
        userService.getAll().subscribe(function (users) { return _this.users = users; });
    }
    UsersComponent.prototype.onSelectUser = function (event, id) {
        event.preventDefault();
        this.router.navigate(['/user', id]);
    };
    UsersComponent.prototype.getAuthorities = function (user) {
        return user.profile.authorities.map(function (a) { return a.name; }).join(',');
    };
    UsersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'users',
            template: __webpack_require__("../../../../../src/app/users/users.component.html"),
            providers: [__WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__users_service__["a" /* UsersService */]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "../../../../../src/app/users/users.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_app_utils__ = __webpack_require__("../../../../../src/app/utils/app.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__("../../../../../src/app/account/account.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
    }
    UsersService.prototype.getAll = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + '/users')
            .map(function (res) {
            var users = [];
            var jsonResults = res.json();
            jsonResults.forEach(function (jsonResult) {
                users.push(new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](jsonResult));
            });
            return users;
        });
    };
    UsersService.prototype.getById = function (id) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + '/users/' + id).map(function (res) {
            return new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](res.json());
        });
    };
    UsersService.prototype.getProfiles = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + '/users/profiles').map(function (res) { return res.json(); });
    };
    UsersService.prototype.saveUser = function (account) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.put(__WEBPACK_IMPORTED_MODULE_2__utils_app_utils__["c" /* BACKEND_API_ROOT_URL */] + '/users/' + account.id, JSON.stringify(account), { headers: headers })
            .map(function (res) {
            return new __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* Account */](res.json());
        });
    };
    UsersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]])
    ], UsersService);
    return UsersService;
}());



/***/ }),

/***/ "../../../../../src/app/utils/app.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return HEADER_X_SECRET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HEADER_X_DIGEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return HEADER_X_ONCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HEADER_WWW_AUTHENTICATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return STORAGE_ACCOUNT_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return STORAGE_SECURITY_TOKEN; });
/* unused harmony export BACKEND_API_PATH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BACKEND_API_AUTHENTICATE_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BACKEND_API_LOGOUT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BACKEND_API_ROOT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UrlMatcher; });
//Headers HTTP
var HEADER_X_SECRET = 'X-Secret';
var HEADER_X_DIGEST = 'X-Digest';
var HEADER_X_ONCE = 'X-Once';
var HEADER_WWW_AUTHENTICATE = 'WWW-Authenticate';
//Local storage keys
var STORAGE_ACCOUNT_TOKEN = 'hmacApp-account';
var STORAGE_SECURITY_TOKEN = 'hmacApp-security';
//Common http root api
var BACKEND_API_PATH = '/api';
var BACKEND_API_AUTHENTICATE_PATH = '/authenticate';
var BACKEND_API_LOGOUT_PATH = '/logout';
var BACKEND_API_ROOT_URL = 'http://localhost:8080' + BACKEND_API_PATH;
var UrlMatcher = (function () {
    function UrlMatcher() {
    }
    UrlMatcher.matches = function (url) {
        return url.indexOf(BACKEND_API_PATH) !== -1
            && url.indexOf(BACKEND_API_PATH + BACKEND_API_AUTHENTICATE_PATH) === -1;
    };
    return UrlMatcher;
}());



/***/ }),

/***/ "../../../../../src/app/utils/hmac-http-client.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HmacHttpClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__security_securityToken__ = __webpack_require__("../../../../../src/app/security/securityToken.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_app_utils__ = __webpack_require__("../../../../../src/app/utils/app.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account_events_service__ = __webpack_require__("../../../../../src/app/account/account.events.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_share__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js__ = __webpack_require__("../../../../crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_crypto_js__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HmacHttpClient = (function (_super) {
    __extends(HmacHttpClient, _super);
    function HmacHttpClient(_backend, _defaultOptions, accountEventsService) {
        var _this = _super.call(this, _backend, _defaultOptions) || this;
        _this.accountEventsService = accountEventsService;
        return _this;
    }
    HmacHttpClient.prototype.addSecurityHeader = function (url, method, options, body) {
        if (__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["j" /* UrlMatcher */].matches(url)) {
            var securityToken = new __WEBPACK_IMPORTED_MODULE_3__security_securityToken__["a" /* SecurityToken */](JSON.parse(this.getFromStorage(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */])));
            var date = new Date().toISOString();
            var secret = securityToken.secret;
            var message = '';
            if (body !== null && body !== '' && (method === 'PUT' || method === 'POST' || method === 'PATCH')) {
                message = method + body + url + date;
            }
            else {
                message = method + url + date;
            }
            console.log('securityToken', securityToken);
            if (securityToken.isEncoding('HmacSHA256')) {
                options.headers.set(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["e" /* HEADER_X_DIGEST */], __WEBPACK_IMPORTED_MODULE_9_crypto_js__["HmacSHA256"](message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacSHA1')) {
                options.headers.set(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["e" /* HEADER_X_DIGEST */], __WEBPACK_IMPORTED_MODULE_9_crypto_js__["HmacSHA1"](message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacMD5')) {
                options.headers.set(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["e" /* HEADER_X_DIGEST */], __WEBPACK_IMPORTED_MODULE_9_crypto_js__["HmacMD5"](message, secret).toString());
            }
            options.headers.set(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["f" /* HEADER_X_ONCE */], date);
            console.log('url', url);
            console.log('message', message);
            console.log('secret', secret);
            console.log('hmac message', options.headers.get(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["e" /* HEADER_X_DIGEST */]));
        }
    };
    HmacHttpClient.prototype.setOptions = function (options) {
        if (!options) {
            options = {};
        }
        if (!options.headers) {
            options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        }
        return options;
    };
    HmacHttpClient.prototype.mapResponse = function (res, observer) {
        if (res.ok && res.headers) {
            var securityToken = new __WEBPACK_IMPORTED_MODULE_3__security_securityToken__["a" /* SecurityToken */](JSON.parse(this.getFromStorage(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */])));
            if (securityToken) {
                this.setToStorage(__WEBPACK_IMPORTED_MODULE_4__utils_app_utils__["i" /* STORAGE_SECURITY_TOKEN */], securityToken);
            }
        }
        observer.next(res);
        observer.complete();
    };
    HmacHttpClient.prototype.catchResponse = function (res, observer) {
        if (res.status === 403) {
            console.log('Unauthorized request:', res.text());
            //this.accountEventsService.logout({error:res.text()});
        }
        observer.complete();
    };
    HmacHttpClient.prototype.get = function (url, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'GET', options, null);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _super.prototype.get.call(_this, url, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient.prototype.post = function (url, body, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'POST', options, body);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _super.prototype.post.call(_this, url, body, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient.prototype.put = function (url, body, options) {
        var _this = this;
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'PUT', options, body);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            _super.prototype.put.call(_this, url, body, options)
                .subscribe(function (res) {
                _this.mapResponse(res, observer);
            }, function (res) {
                _this.catchResponse(res, observer);
            });
        });
    };
    HmacHttpClient.prototype.setToStorage = function (key, value) {
        var elem = localStorage.getItem(key);
        if (!elem) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };
    HmacHttpClient.prototype.getFromStorage = function (key) {
        var elem = localStorage.getItem(key);
        if (!elem) {
            return sessionStorage.getItem(key);
        }
        return elem;
    };
    HmacHttpClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* ConnectionBackend */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_5__account_account_events_service__["a" /* AccountEventsService */]])
    ], HmacHttpClient);
    return HmacHttpClient;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]));



/***/ }),

/***/ "../../../../../src/app/utils/is-authorized.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IsAuthorized; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_service__ = __webpack_require__("../../../../../src/app/login/login.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IsAuthorized = (function () {
    function IsAuthorized(_elementRef, loginService) {
        this._elementRef = _elementRef;
        this.loginService = loginService;
    }
    IsAuthorized.prototype.ngOnInit = function () {
        if (this.role && this.role.trim() !== '' && !this.loginService.isAuthorized([this.role])) {
            var el = this._elementRef.nativeElement;
            el.parentNode.removeChild(el);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('isAuthorized'),
        __metadata("design:type", String)
    ], IsAuthorized.prototype, "role", void 0);
    IsAuthorized = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[isAuthorized]',
            providers: [__WEBPACK_IMPORTED_MODULE_1__login_login_service__["a" /* LoginService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_1__login_login_service__["a" /* LoginService */]])
    ], IsAuthorized);
    return IsAuthorized;
}());



/***/ }),

/***/ "../../../../../src/app/utils/utils.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is_authorized_directive__ = __webpack_require__("../../../../../src/app/utils/is-authorized.directive.ts");
/**
 * Utils module
 * Created by Michael DESIGAUD on 12/11/2016.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var UtilsModule = (function () {
    function UtilsModule() {
    }
    UtilsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            bootstrap: [],
            declarations: [__WEBPACK_IMPORTED_MODULE_1__is_authorized_directive__["a" /* IsAuthorized */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__is_authorized_directive__["a" /* IsAuthorized */]]
        })
    ], UtilsModule);
    return UtilsModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map