/**
 * User module
 * Created by Michael DESIGAUD on 12/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UtilsModule } from '../utils/utils.module';

import { User } from './user';
import { Users } from './users';
import { UsersService } from './users.service';

@NgModule({
    imports: [ FormsModule, ReactiveFormsModule, BrowserModule, UtilsModule ],
    bootstrap: [ User, Users ],
    declarations: [ User, Users ],
    providers: [ UsersService ]
})
export class UserModule { }
