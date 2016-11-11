import {Component} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Account} from '../account/account';
import {UsersService} from './users.service';

@Component({
    selector: 'user',
    templateUrl: './app/users/user.html',
    providers:[UsersService]
})
export class User {
    userForm:FormGroup;
    user:Account;
    profiles:Array<string>;
    private sub:any;
    constructor(private router: Router,private userService:UsersService,private route: ActivatedRoute,form: FormBuilder) {
        this.user = new Account();
        this.profiles = [];
        this.router = router;
        this.userService = userService;
        this.userForm = form.group({
            login: ['', Validators.required],
            profile: ['', Validators.required]
        });
        this.getProfiles();
    }
    ngOnInit():void {
        this.sub = this.route.params.subscribe(params => this.getUser(params['id']));
    }
    ngOnDestroy():void {
        this.sub.unsubscribe();
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
