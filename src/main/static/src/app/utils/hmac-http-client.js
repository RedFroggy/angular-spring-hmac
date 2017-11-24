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
const Observable_1 = require("rxjs/Observable");
const securityToken_1 = require("../security/securityToken");
const AppUtils = require("../utils/app.utils");
const account_events_service_1 = require("../account/account.events.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/share");
///<reference path="../../../../../typings/cryptojs/cryptojs.d.ts" />
let HmacHttpClient = class HmacHttpClient extends http_1.Http {
    constructor(_backend, _defaultOptions, accountEventsService) {
        super(_backend, _defaultOptions);
        this.accountEventsService = accountEventsService;
    }
    addSecurityHeader(url, method, options, body) {
        if (AppUtils.UrlMatcher.matches(url)) {
            let securityToken = new securityToken_1.SecurityToken(JSON.parse(this.getFromStorage(AppUtils.STORAGE_SECURITY_TOKEN)));
            let date = new Date().toISOString();
            let secret = securityToken.secret;
            let message = '';
            if (body !== null && body !== '' && (method === 'PUT' || method === 'POST' || method === 'PATCH')) {
                message = method + body + url + date;
            }
            else {
                message = method + url + date;
            }
            console.log('securityToken', securityToken);
            if (securityToken.isEncoding('HmacSHA256')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA256(message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacSHA1')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA1(message, secret).toString());
            }
            else if (securityToken.isEncoding('HmacMD5')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacMD5(message, secret).toString());
            }
            options.headers.set(AppUtils.HEADER_X_ONCE, date);
            console.log('url', url);
            console.log('message', message);
            console.log('secret', secret);
            console.log('hmac message', options.headers.get(AppUtils.HEADER_X_DIGEST));
        }
    }
    setOptions(options) {
        if (!options) {
            options = {};
        }
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        return options;
    }
    mapResponse(res, observer) {
        if (res.ok && res.headers) {
            let securityToken = new securityToken_1.SecurityToken(JSON.parse(this.getFromStorage(AppUtils.STORAGE_SECURITY_TOKEN)));
            if (securityToken) {
                this.setToStorage(AppUtils.STORAGE_SECURITY_TOKEN, securityToken);
            }
        }
        observer.next(res);
        observer.complete();
    }
    catchResponse(res, observer) {
        if (res.status === 403) {
            console.log('Unauthorized request:', res.text());
        }
        observer.complete();
    }
    get(url, options) {
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'GET', options, null);
        return Observable_1.Observable.create((observer) => {
            super.get(url, options)
                .subscribe((res) => {
                this.mapResponse(res, observer);
            }, (res) => {
                this.catchResponse(res, observer);
            });
        });
    }
    post(url, body, options) {
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'POST', options, body);
        return Observable_1.Observable.create((observer) => {
            super.post(url, body, options)
                .subscribe((res) => {
                this.mapResponse(res, observer);
            }, (res) => {
                this.catchResponse(res, observer);
            });
        });
    }
    put(url, body, options) {
        options = this.setOptions(options);
        this.addSecurityHeader(url, 'PUT', options, body);
        return Observable_1.Observable.create((observer) => {
            super.put(url, body, options)
                .subscribe((res) => {
                this.mapResponse(res, observer);
            }, (res) => {
                this.catchResponse(res, observer);
            });
        });
    }
    setToStorage(key, value) {
        let elem = localStorage.getItem(key);
        if (!elem) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
    getFromStorage(key) {
        let elem = localStorage.getItem(key);
        if (!elem) {
            return sessionStorage.getItem(key);
        }
        return elem;
    }
};
HmacHttpClient = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.ConnectionBackend, http_1.RequestOptions, account_events_service_1.AccountEventsService])
], HmacHttpClient);
exports.HmacHttpClient = HmacHttpClient;
//# sourceMappingURL=hmac-http-client.js.map