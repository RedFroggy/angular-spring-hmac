import {Injectable} from 'angular2/core';
import {Http,Response,RequestOptionsArgs, Headers, RequestOptions, ConnectionBackend} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {SecurityToken} from '../security/securityToken';
import * as AppUtils from '../utils/app.utils';

///<reference path="../../../../../typings/cryptojs/cryptojs.d.ts" />

@Injectable()
export class HmacHttpClient extends Http {
    http:Http;
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend,_defaultOptions);
    }
    addSecurityHeader(url:string,method:string,options: RequestOptionsArgs):void {
        let securityToken:SecurityToken = new SecurityToken(JSON.parse(localStorage.getItem(AppUtils.STORAGE_SECURITY_TOKEN)));
        let date:string = new Date().toISOString();
        let secret:string = atob(securityToken.secretKey);

        let message = method+url+date;
        options.headers.set(AppUtils.HEADER_AUTHENTICATION,securityToken.token);

        if(securityToken.isEncoding('HmacSHA256')) {
            options.headers.set(AppUtils.HEADER_X_DIGEST,CryptoJS.HmacSHA256(message,secret).toString());
        } else if(securityToken.isEncoding('HmacSHA1')) {
            options.headers.set(AppUtils.HEADER_X_DIGEST,CryptoJS.HmacSHA1(message,secret).toString());
        } else if(securityToken.isEncoding('HmacMD5')) {
            options.headers.set(AppUtils.HEADER_X_DIGEST,CryptoJS.HmacMD5(message,secret).toString());
        }
        options.headers.set(AppUtils.HEADER_X_ONCE,date);

    }
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if(!options) {
            options = {};
        }
        if(!options.headers) {
            options.headers = new Headers();
        }
        this.addSecurityHeader(url,'GET',options);
        return super.get(url,options);
    }
}
