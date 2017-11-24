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
const login_service_1 = require("../login/login.service");
let IsAuthorized = class IsAuthorized {
    constructor(_elementRef, loginService) {
        this._elementRef = _elementRef;
        this.loginService = loginService;
    }
    ngOnInit() {
        if (this.role && this.role.trim() !== '' && !this.loginService.isAuthorized([this.role])) {
            let el = this._elementRef.nativeElement;
            el.parentNode.removeChild(el);
        }
    }
};
__decorate([
    core_1.Input('isAuthorized'),
    __metadata("design:type", String)
], IsAuthorized.prototype, "role", void 0);
IsAuthorized = __decorate([
    core_1.Directive({
        selector: '[isAuthorized]',
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, login_service_1.LoginService])
], IsAuthorized);
exports.IsAuthorized = IsAuthorized;
//# sourceMappingURL=is-authorized.directive.js.map