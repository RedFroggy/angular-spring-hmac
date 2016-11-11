/**
 * App module
 * Created by Michael DESIGAUD on 11/11/2016.
 */

import { NgModule }      from '@angular/core';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { AccountEventsService } from './account/account.events.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HmacHttpClient } from './utils/hmac-http-client';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { RoutesModule } from './app.routes';
import { HeaderModule } from './header/header.module';
import { AccountModule } from './account/account.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './users/user.module';
import { UtilsModule } from './utils/utils.module';

@NgModule({
    imports:        [ HttpModule, RouterModule, HeaderModule, AccountModule, LoginModule, UserModule, UtilsModule, RoutesModule ],
    declarations:   [ AppComponent ],
    bootstrap:      [ AppComponent ],
    providers:      [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: Http,
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, accountEventService: AccountEventsService) => {
               return new HmacHttpClient(xhrBackend, requestOptions, accountEventService);
            },
            deps: [XHRBackend, RequestOptions, AccountEventsService],
            multi: false
        }]
})
export class AppModule { }
