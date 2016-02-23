import {bootstrap}    from 'angular2/platform/browser';
import {provide}    from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy,HashLocationStrategy } from 'angular2/router';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AccountEventsService} from './account/account.events.service';

bootstrap(AppComponent, [HTTP_PROVIDERS,ROUTER_PROVIDERS,AccountEventsService,provide(LocationStrategy, {useClass: HashLocationStrategy})]);
