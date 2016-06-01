import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators,ControlGroup} from '@angular/common';
import {Account} from '../account/account';
import {UsersService} from './users.service';
import {Response} from '@angular/http';

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
    constructor(router: Router,routeSegment:RouteSegment,form: FormBuilder,userService:UsersService) {
        this.user = new Account();
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', Validators.required],
            profile: ['', Validators.required]
        });
        this.getUser(routeSegment.getParam('id'));
        this.getProfiles();
    }
    getUser(id:string):void {
        this.userService.getById(id).subscribe((user:Account) => this.user = user);
    }
    getProfiles():void {
        this.userService.getProfiles().subscribe((profiles:Array<string>) => this.profiles = profiles);
    }
    saveUser():void {
        this.userService.saveUser(this.user).subscribe(() => this.router.navigate(['/users']));
    }
    cancel():void {
        this.router.navigate(['/users']);
    }
}
