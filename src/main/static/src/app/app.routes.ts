import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './users/user.component';
import {UsersComponent} from './users/users.component';
import {AccountGuardService} from './account/account.guard.service';

export const routes:Routes = [
    {path: 'authenticate', component: LoginComponent},
    {path: 'users', component: UsersComponent, canActivate: [AccountGuardService] },
    {path: 'user/:id', component: UserComponent, canActivate: [AccountGuardService]},
    {path: '', component: LoginComponent}
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(routes);

