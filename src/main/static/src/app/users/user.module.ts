/**
 * User module
 * Created by Michael DESIGAUD on 12/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { UtilsModule } from '../utils/utils.module';

import { UserComponent } from './user.component';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

@NgModule({
    imports: [ FormsModule, ReactiveFormsModule, BrowserModule, UtilsModule ],
    bootstrap: [ UserComponent, UsersComponent ],
    declarations: [ UserComponent, UsersComponent ],
    providers: [ UsersService ]
})
export class UserModule { }
