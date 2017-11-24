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
const account_1 = require("../account/account");
const users_service_1 = require("./users.service");
let User = class User {
    constructor(router, userService, route, form) {
        this.router = router;
        this.userService = userService;
        this.route = route;
        this.user = new account_1.Account();
        this.user.profile = {};
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', forms_1.Validators.required],
            profile: ['', forms_1.Validators.required]
        });
        this.getProfiles();
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => this.getUser(params['id']));
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    getUser(id) {
        this.userService.getById(id).subscribe((user) => this.user = user);
    }
    getProfiles() {
        this.userService.getProfiles().subscribe((profiles) => this.profiles = profiles);
    }
    saveUser() {
        this.userService.saveUser(this.user).subscribe(() => this.router.navigate(['/users']));
    }
    cancel() {
        this.router.navigate(['/users']);
    }
};
User = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: './app/users/user.html',
        providers: [users_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [router_1.Router, users_service_1.UsersService, router_1.ActivatedRoute, forms_1.FormBuilder])
], User);
exports.User = User;
//# sourceMappingURL=user.js.map