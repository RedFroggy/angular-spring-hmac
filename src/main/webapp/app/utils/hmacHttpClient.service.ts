import {Injectable,Injector} from 'angular2/core';
import {Http,Response,RequestOptionsArgs, Headers, RequestOptions, ConnectionBackend} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {SecurityToken} from '../security/securityToken';
import * as AppUtils from '../utils/app.utils';
import {LoginService} from '../login/login.service';
import {AccountEventsService} from '../account/account.events.service';


///<reference path="../../../../../typings/cryptojs/cryptojs.d.ts" />

@Injectable()
export class HmacHttpClient extends Http {
    http:Http;
    loginService:LoginService;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions,loginService:LoginService) {
        super(_backend,_defaultOptions);
        this.loginService = loginService;
    }
    addSecurityHeader(url:string,method:string,options: RequestOptionsArgs):void {

        //TODO externalize
        if(url.indexOf('/api') !== -1 && url.indexOf('/api/authenticate') === -1) {

            let securityToken:SecurityToken = new SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
            let date:string = new Date().toISOString();
            let secret:string = atob(securityToken.secretKey);

            let message = method + url + date;
            options.headers.set(AppUtils.HEADER_AUTHENTICATION, securityToken.token);

            if (securityToken.isEncoding('HmacSHA256')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA256(message, secret).toString());
            } else if (securityToken.isEncoding('HmacSHA1')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacSHA1(message, secret).toString());
            } else if (securityToken.isEncoding('HmacMD5')) {
                options.headers.set(AppUtils.HEADER_X_DIGEST, CryptoJS.HmacMD5(message, secret).toString());
            }
            options.headers.set(AppUtils.HEADER_X_ONCE, date);
        }

    }
    setOptions(options?: RequestOptionsArgs):RequestOptionsArgs {
        if(!options) {
            options = {};
        }
        if(!options.headers) {
            options.headers = new Headers();
        }
        return options;
    }
    observeResponse(observer:Observable<Response>):void {
        observer.subscribe((res:Response) => {
            if(res.ok && res.headers) {
                let securityToken:SecurityToken = new SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
                if(securityToken) {
                    securityToken.token = res.headers.get(AppUtils.HEADER_X_TOKEN_ACCESS);
                    localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN,JSON.stringify(securityToken));
                }
            }
        },(res:Response)=> {
            if(res.status === 403) {
                console.log('Unauthorized request: redirected to the login page');
                this.loginService.logout();
            }
        });
    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setOptions(options);
        this.addSecurityHeader(url,'GET',options);

        let observer:Observable<Response> = super.get(url,options);
        this.observeResponse(observer);
        return observer;
    }
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setOptions(options);
        this.addSecurityHeader(url,'POST',options);

        let observer:Observable<Response> = super.post(url,body,options);
        this.observeResponse(observer);
        return observer;
    }
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.setOptions(options);
        this.addSecurityHeader(url,'PUT',options);

        let observer:Observable<Response> = super.put(url,body,options);
        this.observeResponse(observer);
        return observer;
    }
}
