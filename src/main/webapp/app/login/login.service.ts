import {Injectable, Component} from 'angular2/core';
import {Http,Response,Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Account,AccountUtils} from '../account/account';
import {SecurityToken} from '../security/securityToken';
import {Observable} from 'rxjs/Observable';
import {EventEmitter} from 'angular2/core';

const HEADER_X_SECRET:string = 'X-Secret';
const HEADER_X_TOKEN_ACCESS:string = 'X-TokenAccess';
const HEADER_WWW_AUTHENTICATE:string = 'WWW-Authenticate';

@Injectable()
export class LoginService {
    http:Http;
    accountUtils:AccountUtils;
    constructor(http:Http,accountUtils:AccountUtils) {
        this.http = http;
        this.accountUtils = accountUtils;
    }
    authenticate(username:string,password:string):Observable<Account> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:8080/api/authenticate', JSON.stringify({login:username,password:password}),{headers:headers})
            .map((res:Response) => {
                let securityToken:SecurityToken = new SecurityToken(res.headers.get(HEADER_X_SECRET),res.headers.get(HEADER_X_TOKEN_ACCESS),
                    res.headers.get(HEADER_WWW_AUTHENTICATE));

                localStorage.setItem('hmacApp-account',res.text());
                localStorage.setItem('hmacApp-security',JSON.stringify(securityToken));

                let account:Account = new Account(res.json());
                account.authenticated = true;
                this.accountUtils.loginSuccess(account);
                return account;
            });
    }
}
