import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Route} from 'angular2/router';
import {Login} from './login/login';
import {Users} from './users/users';
import {Header} from './header/header';

@Component({
    selector: 'hmac-app',
    templateUrl:'./app/app.html',
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/authenticate', component: Login, name: 'Login',useAsDefault: true}),
    new Route({path: '/users', component: Users, name: 'Users'})
])
export class AppComponent {

}
