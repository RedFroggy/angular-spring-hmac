import {Injectable} from 'angular2/core';
import {Http,Response} from 'angular2/http';
import * as AppUtils from '../utils/app.utils';

@Injectable()
export class UsersService {
    http:Http;
    constructor(http:Http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(AppUtils.BACKEND_API_ROOT_URL+'/users').map((res:Response) => res.json());
    }
}
