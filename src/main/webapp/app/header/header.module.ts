/**
 * Header module
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import { NgModule }      from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Header } from './header';

@NgModule({
    imports: [ FormsModule, ReactiveFormsModule, BrowserModule ],
    bootstrap: [ Header ],
    declarations: [ Header ]
})
export class HeaderModule { }
