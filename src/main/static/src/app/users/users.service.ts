import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import * as AppUtils from '../utils/app.utils';
import {Observable} from 'rxjs/Observable';
import {Account} from '../account/account';

@Injectable()
export class UsersService {
    http:Http;
    constructor(http:Http) {
        this.http = http;
    }
    getAll():Observable<Array<Account>> {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL+'/users')
            .map((res:Response) => {
                let users:Array<Account> = [];
                let jsonResults:Array<any> = res.json();
                jsonResults.forEach((jsonResult) => {
                    users.push(new Account(jsonResult));
                });
                return users;
            });
    }
    getById(id:string):Observable<Account> {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL+'/users/'+id).map((res:Response) => {
            return new Account(res.json());
        });
    }
    getProfiles():Observable<Array<string>> {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL+'/users/profiles').map((res:Response) => res.json());
    }
    saveUser(account:Account):Observable<Account> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(AppUtils.BACKEND_API_ROOT_URL+'/users/'+account.id, JSON.stringify(account),{headers:headers})
            .map((res:Response) => {
                return new Account(res.json());
            });
    }
}
