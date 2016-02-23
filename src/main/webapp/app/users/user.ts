import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';
import {FormBuilder, Validators} from 'angular2/common';
import {ControlGroup} from 'angular2/common';
import {Account} from '../account/account';
import {UsersService} from './users.service';
import {Response} from 'angular2/http';

@Component({
    selector: 'user',
    directives:[ROUTER_DIRECTIVES],
    templateUrl: './app/users/user.html',
    providers:[UsersService]
})
export class User {
    userForm:ControlGroup;
    router: Router;
    user:Account;
    userService:UsersService;
    profiles:Array<string>;
    constructor(router: Router,routeParams:RouteParams,form: FormBuilder,userService:UsersService) {
        this.user = new Account();
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', Validators.required],
            profile: ['', Validators.required]
        });
        this.getUser(routeParams.get('id'));
        this.getProfiles();
    }
    getUser(id:string):void {
        this.userService.getById(id).subscribe((user:Account) => this.user = user);
    }
    getProfiles():void {
        this.userService.getProfiles().subscribe((profiles:Array<string>) => this.profiles = profiles);
    }
    saveUser():void {

    }
    cancel():void {
        this.router.navigate(['Users']);
    }
}
