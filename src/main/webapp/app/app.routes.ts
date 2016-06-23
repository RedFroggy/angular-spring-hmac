import {RouterConfig,provideRouter} from '@angular/router';
import {Login} from './login/login';
import {Users} from './users/users';
import {User} from './users/user';

export const routes:RouterConfig = [
    {path: 'authenticate', component: Login},
    {path: 'users', component: Users, },
    {path: 'user/:id', component: User,},
    {path: '', component: Login}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
