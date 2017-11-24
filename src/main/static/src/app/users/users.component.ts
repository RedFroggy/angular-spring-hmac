import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './users.service';
import {Account} from '../account/account';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers:[UsersService]
})
export class UsersComponent {
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
    getAuthorities(user: {profile:{authorities: Array<{id: number, name: string}>}}): any {
        return user.profile.authorities.map( a => a.name).join(',');
    }
}
