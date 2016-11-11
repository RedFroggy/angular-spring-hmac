import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {Login} from './login/login';
import {Users} from './users/users';
import {User} from './users/user';

export const routes:Routes = [
    {path: 'authenticate', component: Login},
    {path: 'users', component: Users, },
    {path: 'user/:id', component: User,},
    {path: '', component: Login}
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(routes);

