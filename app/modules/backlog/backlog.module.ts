import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { SharedModule } from '../../shared/shared.module';
import { BacklogRoutingModule } from './backlog.routing';
import { BacklogService } from './services/backlog.service';
import { BacklogRepository } from './repositories/backlog.repository';

import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { NewItemModalComponent } from './modals/new-item/new-item.modal.component';

console.log('BacklogModule');

@NgModule({
    imports: [
        NativeScriptModule,
        BacklogRoutingModule,
        SharedModule,
        TranslateModule.forChild()
    ],
    exports: [],
    declarations: [
        ...PAGES,
        ...COMPONENTS,
        NewItemModalComponent
    ],
    entryComponents: [
        NewItemModalComponent
    ],
    providers: [
        BacklogRepository,
        BacklogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BacklogModule {
    constructor() {
        console.log('BacklogModule constructor');
    }
}
