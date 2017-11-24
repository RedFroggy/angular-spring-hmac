/**
 * Utils module
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
const is_authorized_directive_1 = require("./is-authorized.directive");
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    core_1.NgModule({
        bootstrap: [],
        declarations: [is_authorized_directive_1.IsAuthorized],
        exports: [is_authorized_directive_1.IsAuthorized]
    }),
    __metadata("design:paramtypes", [])
], UtilsModule);
exports.UtilsModule = UtilsModule;
//# sourceMappingURL=utils.module.js.map