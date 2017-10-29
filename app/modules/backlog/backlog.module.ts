import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { ModalDialogService } from 'nativescript-angular';


import { BacklogService } from './backlog.service';

import { BacklogPageComponent } from './pages/backlog/backlog.page.component';
import { DetailPageComponent } from './pages/detail/detail.page.component';
import { PtListComponent, PtListItemComponent } from './components/backlog';
import {
    PtItemDetailsComponent,
    PtItemChitchatComponent,
    PtItemTasksComponent
} from './components/detail';
import { SharedModule } from '../../shared/shared.module';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';
import { BacklogRepository } from './backlog.repository';
import { MyListSelectorModalViewComponent } from './components/detail/my-list-selector/my-list-selector-modal-view.component';
import { MyListSelectorComponent } from './components/detail/my-list-selector/my-list-selector.component';



@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        CommonModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        BacklogPageComponent,
        DetailPageComponent,
        PtListComponent,
        PtListItemComponent,
        PtItemDetailsComponent,
        PtItemChitchatComponent,
        PtItemTasksComponent,
        NewItemFormComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        ModalDialogService,
        BacklogRepository,
        BacklogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BacklogModule { }
