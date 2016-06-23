import {bootstrap}    from '@angular/platform-browser-dynamic';
import {provide}    from '@angular/core';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {APP_BASE_HREF, LocationStrategy,HashLocationStrategy } from '@angular/common';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS, Http,RequestOptions, XHRBackend} from '@angular/http';
import {AccountEventsService} from './account/account.events.service';
import {HmacHttpClient} from './utils/hmac-http-client';
import {MockBackend} from '@angular/http/testing';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    HmacHttpClient,
    AccountEventsService,
    Http,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(Http, {useFactory:(xhrBackend: XHRBackend, requestOptions: RequestOptions,accountEventService:AccountEventsService) => {
            return new HmacHttpClient(xhrBackend, requestOptions,accountEventService);
        },
        deps: [XHRBackend, RequestOptions, AccountEventsService],
        multi:false
    })
]);
