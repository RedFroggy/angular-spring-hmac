/**
 * Login module
 * Created by Michael DESIGAUD on 12/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
    imports: [ FormsModule, ReactiveFormsModule, BrowserModule ],
    bootstrap: [ LoginComponent ],
    declarations: [ LoginComponent ],
    providers: [ LoginService ]
})
export class LoginModule { }
