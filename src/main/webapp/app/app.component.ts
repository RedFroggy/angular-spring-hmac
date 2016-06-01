import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Route, Router,RouteSegment} from '@angular/router';
import {Login} from './login/login';
import {Users} from './users/users';
import {User} from './users/user';
import {Header} from './header/header';
import {LoginService} from './login/login.service';

@Component({
    selector: 'hmac-app',
    templateUrl:'./app/app.html',
    providers: [LoginService],
    directives: [ROUTER_DIRECTIVES,Header]
})
@Routes([
    new Route({path: '/authenticate', component: Login}),
    new Route({path: '/users', component: Users, }),
    new Route({path: '/user/:id', component: User,}),
    new Route({path: '*', component: Login})
])
export class AppComponent {
    constructor(router:Router,loginService:LoginService) {
        router.changes.subscribe(() => {
            if(window.location.hash !== '#/authenticate') {
                if(!loginService.isAuthenticated()) {
                    router.navigate(['/authenticate']);
                } else {
                    loginService.sendLoginSuccess();
                }
            }
        });
    }
}
