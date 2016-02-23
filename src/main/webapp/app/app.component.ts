import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route, Router} from 'angular2/router';
import {Login} from './login/login';
import {Users} from './users/users';
import {Header} from './header/header';
import {LoginService} from './login/login.service';

@Component({
    selector: 'hmac-app',
    templateUrl:'./app/app.html',
    providers: [LoginService],
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/authenticate', component: Login, name: 'Login',useAsDefault: true}),
    new Route({path: '/users', component: Users, name: 'Users'})
])
export class AppComponent {
    constructor(router:Router,loginService:LoginService) {
        router.subscribe((route) => {
            if(route !== 'authenticate') {
                if(!loginService.isAuthenticated()) {
                    router.navigate(['Login']);
                } else {
                    loginService.sendLoginSuccess();
                }
            }
        });
    }
}
