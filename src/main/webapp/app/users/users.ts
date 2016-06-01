import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {UsersService} from './users.service';
import {Account} from '../account/account';
import {IsAuthorized} from '../utils/is-authorized.directive';

@Component({
    selector: 'users',
    directives:[IsAuthorized],
    templateUrl: './app/users/users.html',
    providers:[UsersService]
})
export class Users {
    users:Array<Account>;
    router: Router;
    constructor(router: Router,userService:UsersService) {
        this.users = [];
        this.router = router;
        userService.getAll().subscribe((users:Array<Account>) => this.users = users);
    }
    onSelectUser(event:Event,id:string):void {
        event.preventDefault();
        this.router.navigate(['/user',id]);
    }
}
