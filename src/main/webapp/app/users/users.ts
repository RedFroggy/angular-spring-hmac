import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {UsersService} from './users.service';
import {User} from './user';

@Component({
    selector: 'login',
    directives:[ROUTER_DIRECTIVES],
    templateUrl: './app/users/users.html',
    providers:[UsersService]
})
export class Users {
    users:Array<User>;
    constructor(userService:UsersService) {
        this.users = [];
        userService.getAll().subscribe((users:Array<User>) => {
            if(users) {
                users.forEach((user) => {
                    this.users.push(new User(user));
                });
            }
        });
    }
}
