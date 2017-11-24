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
const users_service_1 = require("./users.service");
let Users = class Users {
    constructor(router, userService) {
        this.users = [];
        this.router = router;
        userService.getAll().subscribe((users) => this.users = users);
    }
    onSelectUser(event, id) {
        event.preventDefault();
        this.router.navigate(['/user', id]);
    }
    getAuthorities(user) {
        return user.profile.authorities.map(a => a.name).join(',');
    }
};
Users = __decorate([
    core_1.Component({
        selector: 'users',
        templateUrl: './app/users/users.html',
        providers: [users_service_1.UsersService]
    }),
    __metadata("design:paramtypes", [router_1.Router, users_service_1.UsersService])
], Users);
exports.Users = Users;
//# sourceMappingURL=users.js.map