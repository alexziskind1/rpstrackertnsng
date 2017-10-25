import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

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


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
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
        NewItemFormComponent
    ],
    providers: [
        BacklogRepository,
        BacklogService
    ]
})
export class BacklogModule { }
