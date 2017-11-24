/**
 * User module
 * Created by Michael DESIGAUD on 12/11/2016.
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
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const utils_module_1 = require("../utils/utils.module");
const user_1 = require("./user");
const users_1 = require("./users");
const users_service_1 = require("./users.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, platform_browser_1.BrowserModule, utils_module_1.UtilsModule],
        bootstrap: [user_1.User, users_1.Users],
        declarations: [user_1.User, users_1.Users],
        providers: [users_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [])
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map