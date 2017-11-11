import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from '../../shared/shared.module';
import { BacklogRoutingModule } from './backlog.routing';
import { BacklogService } from './services/backlog.service';
import { BacklogRepository } from './repositories/backlog.repository';

import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { NewItemModalComponent } from './modals/new-item/new-item.modal.component';


@NgModule({
    imports: [
        CommonModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        BacklogRoutingModule,
        SharedModule
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
export class BacklogModule { }
