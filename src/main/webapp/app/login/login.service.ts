import {Injectable} from '@angular/core';
import {Response,Headers,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Account} from '../account/account';
import {AccountEventsService} from '../account/account.events.service';
import {SecurityToken} from '../security/securityToken';
import {Observable} from 'rxjs/Observable';
import * as AppUtils from '../utils/app.utils';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {
    constructor(private http:Http,private accountEventService:AccountEventsService,private router: Router) {
    }
    authenticate(username:string,password:string):Observable<Account> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(AppUtils.BACKEND_API_ROOT_URL+AppUtils.BACKEND_API_AUTHENTICATE_PATH, JSON.stringify({login:username,password:password}),{headers:headers})
            .map((res:Response) => {
                let securityToken:SecurityToken = new SecurityToken(
                    {
                    publicSecret:res.headers.get(AppUtils.HEADER_X_SECRET),
                    securityLevel:res.headers.get(AppUtils.HEADER_WWW_AUTHENTICATE)
                    }
                );

                localStorage.setItem(AppUtils.CSRF_CLAIM_HEADER, res.headers.get(AppUtils.CSRF_CLAIM_HEADER));
                localStorage.setItem(AppUtils.STORAGE_ACCOUNT_TOKEN,res.text());
                localStorage.setItem(AppUtils.STORAGE_SECURITY_TOKEN,JSON.stringify(securityToken));

                let account:Account = new Account(res.json());
                this.sendLoginSuccess(account);
                return account;
            });
    }
    sendLoginSuccess(account?:Account):void {
        if(!account) {
            account = new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
        }
        this.accountEventService.loginSuccess(account);
    }
    isAuthenticated():boolean {
        return !!localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
    }
    removeAccount():void {
        localStorage.removeItem(AppUtils.STORAGE_ACCOUNT_TOKEN);
        localStorage.removeItem(AppUtils.STORAGE_SECURITY_TOKEN);
        localStorage.removeItem(AppUtils.CSRF_CLAIM_HEADER);
    }
    logout(callServer:boolean = true):void {
        console.log('Logging out');

        if(callServer) {
            this.http.get(AppUtils.BACKEND_API_ROOT_URL + '/logout').subscribe(() => {
                this.accountEventService.logout(new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN))));
                this.removeAccount();
                this.router.navigate(['/authenticate']);
            });
        } else {
            this.removeAccount();
            this.router.navigate(['/authenticate']);
        }
    }
    isAuthorized(roles:Array<string>):boolean {
        let authorized:boolean = false;
        if(this.isAuthenticated() && roles) {
            let account:Account = new Account(JSON.parse(localStorage.getItem(AppUtils.STORAGE_ACCOUNT_TOKEN)));
            if(account && account.authorities) {

                roles.forEach((role:string) => {
                    if(account.authorities.indexOf(role) !== -1) {
                        authorized = true;
                    }
                });
            }
        }
        return authorized;
    }
}
