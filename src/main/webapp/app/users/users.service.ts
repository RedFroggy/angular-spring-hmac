import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';
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
}
