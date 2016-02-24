import {bootstrap}    from 'angular2/platform/browser';
import {provide}    from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy,HashLocationStrategy } from 'angular2/router';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http,RequestOptions, XHRBackend} from 'angular2/http';
import {AccountEventsService} from './account/account.events.service';
import {HmacHttpClient} from './utils/HmacHttpClient.ts';
import {MockBackend} from 'angular2/http/testing';
import {LoginService} from './login/login.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    HmacHttpClient,
    AccountEventsService,
    Http,
    LoginService,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(Http, {useFactory:(xhrBackend: XHRBackend, requestOptions: RequestOptions,loginService:LoginService) => {
            return new HmacHttpClient(xhrBackend, requestOptions,loginService);
        },
        deps: [XHRBackend, RequestOptions, AccountEventsService],
        multi:false
    })
]);
