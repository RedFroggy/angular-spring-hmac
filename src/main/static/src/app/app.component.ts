import {Component} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
    selector: 'hmac-app',
    templateUrl:'./app.component.html',
    providers: [LoginService]
})
export class AppComponent {
    constructor(){}
}
