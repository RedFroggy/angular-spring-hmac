/**
 * Login module
 * Created by Michael DESIGAUD on 12/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Login } from './login';
import { LoginService } from './login.service';

@NgModule({
    imports: [ FormsModule, ReactiveFormsModule, BrowserModule ],
    bootstrap: [ Login ],
    declarations: [ Login ],
    providers: [ LoginService ]
})
export class LoginModule { }
