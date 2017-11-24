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
const AppUtils = require("../utils/app.utils");
const account_1 = require("../account/account");
let UsersService = class UsersService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users')
            .map((res) => {
            let users = [];
            let jsonResults = res.json();
            jsonResults.forEach((jsonResult) => {
                users.push(new account_1.Account(jsonResult));
            });
            return users;
        });
    }
    getById(id) {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/' + id).map((res) => {
            return new account_1.Account(res.json());
        });
    }
    getProfiles() {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/users/profiles').map((res) => res.json());
    }
    saveUser(account) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(AppUtils.BACKEND_API_ROOT_URL + '/users/' + account.id, JSON.stringify(account), { headers: headers })
            .map((res) => {
            return new account_1.Account(res.json());
        });
    }
};
UsersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map