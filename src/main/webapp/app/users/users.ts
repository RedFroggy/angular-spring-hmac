import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './users.service';
import {Account} from '../account/account';

@Component({
    selector: 'users',
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
