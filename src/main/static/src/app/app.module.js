/**
 * App module
 * Created by Michael DESIGAUD on 11/11/2016.
 */
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
const http_1 = require("@angular/http");
const account_events_service_1 = require("./account/account.events.service");
const common_1 = require("@angular/common");
const hmac_http_client_1 = require("./utils/hmac-http-client");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const header_1 = require("./header/header");
const app_routes_1 = require("./app.routes");
const account_module_1 = require("./account/account.module");
const login_module_1 = require("./login/login.module");
const user_module_1 = require("./users/user.module");
const utils_module_1 = require("./utils/utils.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule, router_1.RouterModule, platform_browser_1.BrowserModule, account_module_1.AccountModule, login_module_1.LoginModule, user_module_1.UserModule, utils_module_1.UtilsModule, app_routes_1.RoutesModule],
        declarations: [app_component_1.AppComponent, header_1.Header],
        bootstrap: [app_component_1.AppComponent, header_1.Header],
        providers: [
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            {
                provide: http_1.Http,
                useFactory: (xhrBackend, requestOptions, accountEventService) => {
                    return new hmac_http_client_1.HmacHttpClient(xhrBackend, requestOptions, accountEventService);
                },
                deps: [http_1.XHRBackend, http_1.RequestOptions, account_events_service_1.AccountEventsService],
                multi: false
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map