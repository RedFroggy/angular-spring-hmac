/**
 * Utils module
 * Created by Michael DESIGAUD on 12/11/2016.
 */

import { NgModule }      from '@angular/core';
import { IsAuthorized } from './is-authorized.directive';

@NgModule({
    bootstrap: [ ],
    declarations: [ IsAuthorized ],
    exports: [ IsAuthorized ]
})
export class UtilsModule { }
