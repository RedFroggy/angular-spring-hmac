import {Component} from 'angular2/core';
import {AccountUtils} from '../account/account';

@Component({
    selector: 'header',
    templateUrl: './app/header/header.html'
})
export class Header {
    authenticated:boolean;
    constructor(accountUtils:AccountUtils) {
        accountUtils.subscribe((account) => {
            this.authenticated = account.authenticated;
        });
    }
}
