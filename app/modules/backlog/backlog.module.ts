import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { ModalDialogService } from 'nativescript-angular';


import { SharedModule } from '../../shared/shared.module';
import { BacklogRoutingModule } from './backlog.routing';
import { BacklogService } from './services/backlog.service';
import { BacklogRepository } from './repositories/backlog.repository';

import { BacklogPageComponent } from './pages/backlog/backlog.page.component';
import { DetailPageComponent } from './pages/detail/detail.page.component';
import { PtListComponent, PtListItemComponent } from './components/backlog';
import { PtItemDetailsComponent } from './components/detail/item-details/pt-item-details.component';
import { PtItemChitchatComponent } from './components/detail/item-chitchat/pt-item-chitchat.component';
import { PtItemTasksComponent } from './components/detail/item-tasks/pt-item-tasks.component';
import { NewItemFormComponent } from './components/new-item-form/new-item-form.component';
import { DetailSectionSelectorComponent } from './components/detail/detail-section-selector/detail-section-selector.component';
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
        BacklogPageComponent,
        DetailPageComponent,
        DetailSectionSelectorComponent,
        PtListComponent,
        PtListItemComponent,
        PtItemDetailsComponent,
        PtItemChitchatComponent,
        PtItemTasksComponent,
        NewItemFormComponent,
        NewItemModalComponent
    ],
    entryComponents: [
        NewItemModalComponent
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
